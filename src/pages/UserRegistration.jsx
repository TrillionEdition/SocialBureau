import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Mail, Lock, User, Phone, Eye, EyeOff,
  CheckCircle2, AlertCircle, ArrowLeft, ArrowRight,
} from "lucide-react";
import { BASE_URL } from "@/utils/urls";
import { setUserData } from "@/utils/authUtils";
import { registerUserAPI } from "@/services/userServices";

const LOGIN_FIELDS = [
  { name: "email",    label: "Email address", placeholder: "name@example.com", icon: Mail,  type: "email"    },
  { name: "password", label: "Password",       placeholder: "••••••••",         icon: Lock,  type: "password" },
];

const SIGNUP_FIELDS = [
  { name: "name",            label: "Full name",        placeholder: "John Doe",          icon: User,  type: "text"     },
  { name: "email",           label: "Email address",    placeholder: "name@example.com",  icon: Mail,  type: "email"    },
  { name: "phone",           label: "Phone number",     placeholder: "+1 (555) 123-4567", icon: Phone, type: "tel"      },
  { name: "password",        label: "Password",         placeholder: "••••••••",          icon: Lock,  type: "password" },
  { name: "confirmPassword", label: "Confirm password", placeholder: "••••••••",          icon: Lock,  type: "password" },
];

const EMPTY_SIGNUP = { name: "", email: "", phone: "", password: "", confirmPassword: "", emailOtp: "" };
const EMPTY_LOGIN  = { email: "", password: "" };

function ProgressDots({ total, current }) {
  return (
    <div className="flex gap-1 pt-2">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="h-[2px] flex-1 rounded-full"
          animate={{ backgroundColor: i <= current ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.1)" }}
          transition={{ duration: 0.4 }}
        />
      ))}
    </div>
  );
}

function Spinner() {
  return <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />;
}

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin,      setIsLogin]      = useState(true);
  const [step,         setStep]         = useState(0);
  const [direction,    setDirection]    = useState(0);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState("");
  const [success,      setSuccess]      = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [turnstileAvailable, setTurnstileAvailable] = useState(true);
  const [loginForm,    setLoginForm]    = useState(EMPTY_LOGIN);
  const [signupForm,   setSignupForm]   = useState(EMPTY_SIGNUP);

  const isTransitioning = useRef(false);
  const turnstileId     = useRef(null);

  const gmailOtpField = signupForm.email.toLowerCase().includes("gmail.com")
    ? [{ name: "emailOtp", label: "Email verification code", placeholder: "6-digit code", icon: Mail, type: "text" }]
    : [];

  const fields      = isLogin ? LOGIN_FIELDS : [...SIGNUP_FIELDS, ...gmailOtpField];
  const currentF    = fields[step];
  const isLastStep  = step === fields.length - 1;
  const isPassField = currentF.name === "password" || currentF.name === "confirmPassword";

  const getValue = (name) => (isLogin ? loginForm[name] : signupForm[name]) ?? "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    isLogin
      ? setLoginForm((p) => ({ ...p, [name]: value }))
      : setSignupForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const v = getValue(currentF.name);
    if (!v)                                                               return `${currentF.label} is required`;
    if (currentF.name === "email" && !/\S+@\S+\.\S+/.test(v))           return "Please enter a valid email";
    if (currentF.name === "password" && v.length < 6)                    return "Password must be at least 6 characters";
    if (currentF.name === "confirmPassword" && v !== signupForm.password) return "Passwords do not match";
    if (currentF.name === "emailOtp" && !/^\d{6}$/.test(v))              return "Code must be 6 digits";
    return null;
  };

  const next = async () => {
    if (isTransitioning.current) return;
    const err = validate();
    if (err) { setError(err); return; }
    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    if (step === 0 && siteKey && turnstileAvailable && !captchaToken) { setError("Please complete the captcha"); return; }

    isTransitioning.current = true;
    try {
      if (!isLogin && step === 4 && signupForm.email.toLowerCase().includes("gmail.com")) {
        setLoading(true);
        try {
          const res  = await fetch(`${BASE_URL}/user/send-signup-email-otp`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: signupForm.email }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Failed to send OTP");
          setDirection(1); setStep(5);
        } catch (e) { setError(e.message); }
        finally     { setLoading(false); }
        return;
      }
      if (!isLogin && step === 5) {
        setLoading(true);
        try {
          const res  = await fetch(`${BASE_URL}/user/verify-signup-email-otp`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: signupForm.email, otp: signupForm.emailOtp }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Invalid OTP");
          await handleSignup();
        } catch (e) { setError(e.message); setLoading(false); }
        return;
      }
      if (!isLastStep) {
        setDirection(1); setStep((s) => s + 1); setError("");
      } else {
        isLogin ? await handleLogin() : await handleSignup();
      }
    } finally { isTransitioning.current = false; }
  };

  const prev = () => {
    if (step > 0) { setDirection(-1); setStep((s) => s - 1); setError(""); }
  };

  const handleLogin = async () => {
    setLoading(true); setError("");
    try {
      const res  = await fetch(`${BASE_URL}/user/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...loginForm, captchaToken }), credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      if (data.user) {
        setUserData(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.token) localStorage.setItem("token", data.token);
      }
      setSuccess("Welcome back");
      window.dispatchEvent(new Event("authChange"));
      const redirect = new URLSearchParams(location.search).get("redirect");
      const from = location.state?.from?.pathname || redirect
        || (data.user.role === "admin" ? "/admin" : data.user.isEmployee ? "/team/dashboard" : "/");
      setTimeout(() => navigate(from, { replace: true }), 1500);
    } catch (e) {
      setError(e.message); setDirection(-1); setStep(0); setCaptchaToken(null);
    } finally { setLoading(false); }
  };

  const handleSignup = async () => {
    setLoading(true); setError("");
    try {
      await registerUserAPI({ ...signupForm, role: "user", captchaToken });
      setSuccess("Account created! Redirecting…");
      setTimeout(() => {
        setIsLogin(true); setStep(0);
        setLoginForm({ email: signupForm.email, password: "" });
        setSignupForm(EMPTY_SIGNUP); setSuccess(""); setCaptchaToken(null); setLoading(false);
      }, 2000);
    } catch (e) {
      setError(e.response?.data?.message || e.message || "Registration failed");
      setStep(0); setCaptchaToken(null); setLoading(false);
    }
  };

  const handleGoogleLogin = async (idToken) => {
    setLoading(true); setError("");
    try {
      const res  = await fetch(`${BASE_URL}/user/google-login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }), credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Google login failed");
      if (data.user) {
        setUserData(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.token) localStorage.setItem("token", data.token);
      }
      setSuccess(data.message || "Welcome back");
      window.dispatchEvent(new Event("authChange"));
      const redirect = new URLSearchParams(location.search).get("redirect");
      const from = location.state?.from?.pathname || redirect
        || (data.user.role === "admin" ? "/admin" : data.user.isEmployee ? "/team/dashboard" : "/");
      setTimeout(() => navigate(from, { replace: true }), 1500);
    } catch (e) { setError(e.message); }
    finally     { setLoading(false); }
  };

  const toggleMode = () => {
    setIsLogin((v) => !v); setStep(0);
    setError(""); setSuccess("");
  };

  useEffect(() => {
    if (step !== 0) return;
    if (captchaToken) return; // Keep existing solved captcha
    let alive = true;
    let retries = 0;
    const renderWidget = () => {
      if (!alive) return;
      const container = document.getElementById("cf-turnstile-container");
      const siteKey   = import.meta.env.VITE_TURNSTILE_SITE_KEY;
      if (!siteKey) {
        console.warn("VITE_TURNSTILE_SITE_KEY is not defined in the environment variables!");
        setTurnstileAvailable(false);
        return;
      }
      if (!window.turnstile) {
        retries++;
        if (retries > 30) {
          console.warn("Cloudflare Turnstile script failed to load. Bypassing captcha verification.");
          setTurnstileAvailable(false);
          return;
        }
        setTimeout(renderWidget, 100);
        return;
      }
      if (!container) {
        setTimeout(renderWidget, 100);
        return;
      }
      if (container.children.length === 0) {
        try {
          setTurnstileAvailable(true);
          turnstileId.current = window.turnstile.render("#cf-turnstile-container", {
            sitekey: siteKey, theme: "dark",
            callback:           (t) => { if (alive) { setCaptchaToken(t); setError(""); } },
            "expired-callback": ()  => { if (alive) setCaptchaToken(null); },
            "error-callback":   ()  => { 
              if (alive) {
                setCaptchaToken(null); 
                setTurnstileAvailable(false); 
              }
            },
          });
        } catch (e) {
          console.error("Turnstile render error:", e);
          setTurnstileAvailable(false);
        }
      }
    };
    const existing = document.getElementById("cf-turnstile-script");
    if (!existing) {
      const s = document.createElement("script");
      s.id = "cf-turnstile-script";
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = s.defer = true;
      s.onload = () => setTimeout(renderWidget, 100);
      document.body.appendChild(s);
    } else {
      window.turnstile ? setTimeout(renderWidget, 50) : existing.addEventListener("load", renderWidget);
    }
    return () => {
      alive = false;
      if (window.turnstile && turnstileId.current != null) {
        try { window.turnstile.remove(turnstileId.current); } catch {}
        turnstileId.current = null;
      }
    };
  }, [step]);

  useEffect(() => {
    if (step !== 0) return;
    const init = () => {
      if (!window.google) return;
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      window.google.accounts.id.initialize({
        client_id: clientId || "YOUR_CLIENT_ID.apps.googleusercontent.com",
        callback: (r) => { if (r.credential) handleGoogleLogin(r.credential); },
      });
      const btn = document.getElementById("google-signin-button");
      if (btn) {
        window.google.accounts.id.renderButton(btn, {
          theme: "outline", size: "large",
          text: isLogin ? "signin_with" : "signup_with",
          shape: "pill", width: "300",
        });
      }
    };
    const existing = document.getElementById("google-gsi-script");
    const timer = setTimeout(init, 50);
    if (!existing) {
      const s = document.createElement("script");
      s.id = "google-gsi-script"; s.src = "https://accounts.google.com/gsi/client";
      s.async = s.defer = true; s.onload = init;
      document.body.appendChild(s);
    } else {
      window.google ? init() : existing.addEventListener("load", init);
    }
    return () => {
      clearTimeout(timer);
      document.getElementById("google-gsi-script")?.removeEventListener("load", init);
    };
  }, [step, isLogin]);

  return (
    <div className="min-h-screen w-full bg-black flex overflow-hidden">

      {/* ── LEFT PANEL — auth form ───────────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-1/2 px-8 sm:px-14 py-12 bg-black">

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-3xl bg-white/[0.03] border border-white/10 px-8 py-8 backdrop-blur-xl relative overflow-hidden"
        >
          {/* Glow accent top-right */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-[#dc1e1e]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          {/* Mode tabs */}
          <div className="flex gap-1 bg-white/[0.05] rounded-full p-1 mb-7">
            {["Sign in", "Create account"].map((label, i) => {
              const active = isLogin ? i === 0 : i === 1;
              return (
                <button
                  key={label}
                  onClick={() => { setIsLogin(i === 0); setStep(0); setError(""); setSuccess(""); }}
                  className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    active ? "bg-white text-black" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center py-14 text-center gap-4"
              >
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: "spring" }}>
                  <CheckCircle2 className="w-14 h-14 text-emerald-400" strokeWidth={1} />
                </motion.div>
                <h2 className="text-3xl font-light text-white">{success}</h2>
                <p className="text-sm text-white/30 tracking-wide">Entering your account…</p>
              </motion.div>
            ) : (
              <motion.div
                key={`${isLogin}-${step}`}
                initial={{ opacity: 0, x: direction > 0 ? 28 : -28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -28 : 28 }}
                transition={{ duration: 0.32 }}
                className="space-y-7"
              >
                {/* Header */}
                <div>
                  <h2 className="text-3xl font-light text-white tracking-tight">
                    {isLogin ? "Welcome back" : "Join us"}
                  </h2>
                  <p className="text-sm text-white/35 mt-1">{currentF.label}</p>
                </div>

                {/* Input */}
                <div className="space-y-3">
                  <div className="relative">
                    <currentF.icon size={17} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/25" />
                    <input
                      autoFocus
                      name={currentF.name}
                      type={isPassField ? (showPassword ? "text" : "password") : currentF.type}
                      placeholder={currentF.placeholder}
                      value={getValue(currentF.name)}
                      onChange={handleChange}
                      onKeyDown={(e) => e.key === "Enter" && next()}
                      autoComplete="off"
                      className="w-full bg-transparent border-b border-white/10 pl-6 pr-9 py-3.5 text-white text-lg font-light outline-none placeholder:text-white/15 focus:border-white/30 transition-colors duration-300"
                    />
                    {isPassField && (
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-white/30 hover:text-white/60 transition-colors"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
                      </button>
                    )}
                  </div>

                  <ProgressDots total={fields.length} current={step} />

                  {isLogin && step === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => navigate("/forgot-password?from=user")}
                        className="text-xs text-white/30 hover:text-white/70 transition-colors"
                      >
                        Forgot password?
                      </button>
                    </motion.div>
                  )}
                </div>

                {step === 0 && (
                  <div 
                    key="cf-turnstile-shared" 
                    id="cf-turnstile-container" 
                    className="flex justify-center min-h-[65px]" 
                  />
                )}

                {step === 0 && (
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex-1 h-px bg-white/8" />
                      <span className="text-[10px] text-white/25 tracking-[2px] uppercase">Or</span>
                      <div className="flex-1 h-px bg-white/8" />
                    </div>
                    <div id="google-signin-button" className="w-full flex justify-center" />
                  </div>
                )}

                <AnimatePresence>
                  {error && (
                    <motion.div
                      key="err"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-3 p-3.5 bg-red-500/10 border border-red-500/20 rounded-2xl"
                    >
                      <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0" strokeWidth={1.5} />
                      <p className="text-red-400 text-sm font-light">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-3 pt-1">
                  {step > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={prev}
                      className="px-4 py-3.5 rounded-full border border-white/15 text-white hover:border-white/40 transition-colors"
                      aria-label="Go back"
                    >
                      <ArrowLeft size={17} strokeWidth={1.5} />
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={next}
                    disabled={loading}
                    className="flex-1 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-100 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {loading
                      ? <Spinner />
                      : <><span>{isLastStep ? "Complete" : "Continue"}</span><ArrowRight size={15} strokeWidth={2} /></>}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="mt-6 flex items-center gap-3 justify-center"
        >
          <p className="text-xs text-white/30">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={toggleMode}
            className="text-xs font-semibold text-white hover:text-white/60 transition-colors"
          >
            {isLogin ? "Create account" : "Sign in"}
          </button>
        </motion.div>
      </div>

      {/* ── RIGHT PANEL — video ──────────────────────────────────── */}
      <div className="hidden lg:block relative w-1/2 overflow-hidden">
        {/* Gradient fade on left edge to blend into the form panel */}
        <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />

        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full"
        >
          <source src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/image_picker_9EE3055C-FCF2-4382-AE9A-CB6487398069-92697-00001414A63D736B4.mp4" type="video/mp4" />
        </video>

        {/* Subtle dark tint so it doesn't blow out */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Tagline overlay bottom-left of the video panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-10 left-10 z-20"
        >
          <p className="text-white/70 text-xs tracking-[3px] uppercase mb-1">Define · Design · Deliver</p>
          <div className="h-px w-16 bg-[#dc1e1e]" />
        </motion.div>
      </div>

    </div>
  );
}