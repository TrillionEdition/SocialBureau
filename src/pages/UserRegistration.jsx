import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Phone, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { BASE_URL } from "@/utils/urls";
import { setUserData } from "@/utils/authUtils";
import { registerUserAPI } from "@/services/userServices";

export const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [direction, setDirection] = useState(0);
  const isTransitioning = useRef(false);

  const [captchaToken, setCaptchaToken] = useState(null);
  const turnstileWidgetId = useRef(null);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    emailOtp: "",
  });

  const signupFields = [
    { name: "name", label: "Full Name", placeholder: "John Doe", icon: User, type: "text" },
    { name: "email", label: "Email Address", placeholder: "name@example.com", icon: Mail, type: "email" },
    { name: "phone", label: "Phone Number", placeholder: "+1 (555) 123-4567", icon: Phone, type: "tel" },
    { name: "password", label: "Password", placeholder: "••••••••", icon: Lock, type: "password" },
    { name: "confirmPassword", label: "Confirm Password", placeholder: "••••••••", icon: Lock, type: "password" },
    ...(signupForm.email.toLowerCase().includes("gmail.com") ? [
      { name: "emailOtp", label: "Email Verification Code", placeholder: "Enter 6-digit OTP", icon: Mail, type: "text" }
    ] : [])
  ];

  const loginFields = [
    { name: "email", label: "Email Address", placeholder: "name@example.com", icon: Mail, type: "email" },
    { name: "password", label: "Password", placeholder: "••••••••", icon: Lock, type: "password" },
  ];

  const currentFields = isLogin ? loginFields : signupFields;
  const currentField = currentFields[step];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginForm(prev => ({ ...prev, [name]: value }));
    } else {
      setSignupForm(prev => ({ ...prev, [name]: value }));
    }
    setError("");
  };

  const validateCurrentField = () => {
    const value = isLogin ? loginForm[currentField.name] : signupForm[currentField.name];
    if (!value) {
      setError(`${currentField.label} is required`);
      return false;
    }
    if (currentField.name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      setError("Please enter a valid email");
      return false;
    }
    if (currentField.name === "password" && value.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (currentField.name === "confirmPassword" && value !== signupForm.password) {
      setError("Passwords do not match");
      return false;
    }
    if (currentField.name === "emailOtp" && !/^\d{6}$/.test(value)) {
      setError("Code must be a 6-digit number");
      return false;
    }
    return true;
  };

  const nextStep = async () => {
    if (isTransitioning.current) return;
    if (!validateCurrentField()) return;

    if (step === 0 && !captchaToken) {
      setError("Please complete the captcha verification");
      return;
    }

    isTransitioning.current = true;
    try {
      // If we are on step 4 (Confirm Password), send Email OTP first (only for Gmail)
      if (!isLogin && step === 4 && signupForm.email.toLowerCase().includes("gmail.com")) {
        setLoading(true);
        setError("");
        try {
          const response = await fetch(`${BASE_URL}/user/send-signup-email-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: signupForm.email }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || "Failed to send Email OTP");

          setSuccess("Verification OTP sent to " + signupForm.email);
          setTimeout(() => setSuccess(""), 3000);

          setDirection(1);
          setStep(5);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
        return;
      }

      // If we are on step 5 (Email OTP), verify it first, then proceed to register (for Gmail)
      if (!isLogin && step === 5) {
        setLoading(true);
        setError("");
        try {
          const emailOtp = signupForm.emailOtp;
          const response = await fetch(`${BASE_URL}/user/verify-signup-email-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: signupForm.email, otp: emailOtp }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || "Invalid Email OTP");

          // Verify successful, proceed directly to register
          await handleSignup();
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
        return;
      }

      if (step < currentFields.length - 1) {
        setDirection(1);
        setStep(s => s + 1);
        setError("");
      } else {
        if (isLogin) {
          await handleLogin();
        } else {
          await handleSignup();
        }
      }
    } finally {
      isTransitioning.current = false;
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(s => s - 1);
      setError("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextStep();
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...loginForm, captchaToken }),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");
      if (data.user) {
        setUserData(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.token) localStorage.setItem('token', data.token);
      }
      setSuccess("Welcome back");
      window.dispatchEvent(new Event("authChange"));
      const queryParams = new URLSearchParams(location.search);
      const redirectParam = queryParams.get("redirect");
      let from = location.state?.from?.pathname || redirectParam;

      if (!from) {
        if (data.user.role === 'admin') {
          from = "/admin";
        } else if (data.user.isEmployee) {
          from = "/team/dashboard";
        } else {
          from = "/";
        }
      }

      setTimeout(() => navigate(from, { replace: true }), 1500);
    } catch (err) {
      setError(err.message);
      setDirection(-1);
      setStep(0);
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      // Register user
      await registerUserAPI({ ...signupForm, role: "user", captchaToken });
      setSuccess("Account created successfully! Redirecting to login...");

      // Redirect to login page internally after 2 seconds
      setTimeout(() => {
        setIsLogin(true);
        setStep(0);
        setLoginForm({ email: signupForm.email, password: "" });
        setSuccess("");
        setError("");
        setCaptchaToken(null);
        setLoading(false);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed");
      setStep(0);
      setCaptchaToken(null);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (idToken) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch(`${BASE_URL}/user/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Google Login failed");
      
      if (data.user) {
        setUserData(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.token) localStorage.setItem('token', data.token);
      }
      
      setSuccess(data.message || "Welcome back");
      window.dispatchEvent(new Event("authChange"));
      
      const queryParams = new URLSearchParams(location.search);
      const redirectParam = queryParams.get("redirect");
      let from = location.state?.from?.pathname || redirectParam;

      if (!from) {
        if (data.user.role === 'admin') {
          from = "/admin";
        } else if (data.user.isEmployee) {
          from = "/team/dashboard";
        } else {
          from = "/";
        }
      }

      setTimeout(() => navigate(from, { replace: true }), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step !== 0) {
      return;
    }

    let isMounted = true;

    const renderTurnstile = () => {
      if (!isMounted) return;
      const container = document.getElementById("cf-turnstile-container");
      const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
      
      if (!window.turnstile) {
        setTimeout(renderTurnstile, 100);
        return;
      }

      if (container && siteKey) {
        container.innerHTML = "";
        try {
          turnstileWidgetId.current = window.turnstile.render("#cf-turnstile-container", {
            sitekey: siteKey,
            theme: "dark",
            callback: (token) => {
              if (isMounted) {
                setCaptchaToken(token);
                setError("");
              }
            },
            "expired-callback": () => {
              if (isMounted) setCaptchaToken(null);
            },
            "error-callback": () => {
              if (isMounted) setCaptchaToken(null);
            },
          });
        } catch (e) {
          console.error("Turnstile render error:", e);
        }
      }
    };

    const existingScript = document.getElementById("cf-turnstile-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "cf-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setTimeout(renderTurnstile, 100);
      };
      document.body.appendChild(script);
    } else {
      if (window.turnstile) {
        setTimeout(renderTurnstile, 50);
      } else {
        existingScript.addEventListener("load", renderTurnstile);
      }
    }

    return () => {
      isMounted = false;
      const scriptEl = document.getElementById("cf-turnstile-script");
      if (scriptEl) {
        scriptEl.removeEventListener("load", renderTurnstile);
      }
      if (window.turnstile && turnstileWidgetId.current !== null) {
        try {
          window.turnstile.remove(turnstileWidgetId.current);
        } catch (e) {
          // ignore
        }
        turnstileWidgetId.current = null;
      }
    };
  }, [step, isLogin]);

  useEffect(() => {
    let script;
    const initGoogleSignIn = () => {
      if (window.google && step === 0) {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        if (!clientId) {
          console.warn("⚠️ VITE_GOOGLE_CLIENT_ID is not configured in frontend environment variables.");
        }
        
        window.google.accounts.id.initialize({
          client_id: clientId || "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
          callback: (response) => {
            if (response.credential) {
              handleGoogleLogin(response.credential);
            }
          },
        });
        
        const container = document.getElementById("google-signin-button");
        if (container) {
          window.google.accounts.id.renderButton(container, {
            theme: "outline",
            size: "large",
            text: isLogin ? "signin_with" : "signup_with",
            shape: "pill",
            width: "320",
          });
        }
      }
    };

    // Check if script already exists
    const existingScript = document.getElementById("google-gsi-script");
    if (!existingScript) {
      script = document.createElement("script");
      script.id = "google-gsi-script";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initGoogleSignIn;
      document.body.appendChild(script);
    } else {
      if (window.google) {
        initGoogleSignIn();
      } else {
        existingScript.addEventListener("load", initGoogleSignIn);
      }
    }

    const timer = setTimeout(initGoogleSignIn, 50);

    return () => {
      clearTimeout(timer);
      const scriptEl = document.getElementById("google-gsi-script");
      if (scriptEl) {
        scriptEl.removeEventListener("load", initGoogleSignIn);
      }
    };
  }, [step, isLogin]);

  const toggleAuth = () => {
    setIsLogin(!isLogin);
    setStep(0);
    setError("");
    setSuccess("");
    setCaptchaToken(null);
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4 overflow-hidden">

      <div className="w-full max-w-2xl z-10">
        {/* Header - Apple TV Style */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="inline-block mb-8">
            <h1 className="text-6xl md:text-7xl font-black tracking-tight text-white">
              <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
                Social<span className="text-[#ff0000]">B</span>ureau
              </a>
            </h1>
            <p className="text-sm font-light text-gray-400 mt-3 tracking-widest uppercase">
              World’s First API-Driven Marketing Agency
            </p>
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/10 p-12 md:p-16 overflow-hidden"
        >
          {/* Subtle Corner Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl -mr-48 -mt-48" />

          <AnimatePresence mode="wait">
            {success ? (
              // Success State
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mb-8"
                >
                  <CheckCircle2 className="w-20 h-20 text-emerald-500" strokeWidth={1} />
                </motion.div>
                <h2 className="text-4xl font-light text-white mb-2">{success}</h2>
                <p className="text-gray-500 text-sm tracking-wide">Entering your account...</p>
              </motion.div>
            ) : (
              // Form State
              <motion.div
                key={`${isLogin ? 'login' : 'signup'}-${step}`}
                initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                {/* Form Header */}
                <div className="space-y-4">
                  <h2 className="text-5xl md:text-6xl font-light text-white tracking-tight">
                    {isLogin ? "Sign In" : "Create Account"}
                  </h2>
                  <p className="text-gray-500 text-lg font-light">
                    {currentField.label}
                  </p>
                </div>

                {/* Input Field - Apple Style */}
                <div className="space-y-4">
                  <div className="relative group">
                    <input
                      autoFocus
                      type={currentField.name === "password" || currentField.name === "confirmPassword" ? (showPassword ? "text" : "password") : currentField.type}
                      name={currentField.name}
                      placeholder={currentField.placeholder}
                      value={isLogin ? loginForm[currentField.name] : signupForm[currentField.name]}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyPress}
                      autoComplete="off"
                      className="w-full bg-white/[0.03] border-b border-white/10 px-0 py-5 text-white text-2xl font-light outline-none placeholder:text-gray-700 transition-all duration-300 focus:border-white/30 focus:bg-white/[0.05]"
                    />

                    {(currentField.name === "password" || currentField.name === "confirmPassword") && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff size={24} strokeWidth={1.5} /> : <Eye size={24} strokeWidth={1.5} />}
                      </button>
                    )}
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-1 pt-4">
                      {currentFields.map((_, i) => (
                        <motion.div
                          key={i}
                          className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-white/40' : 'bg-white/10'
                            }`}
                        />
                      ))}
                    </div>

                    {isLogin && step === 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-end"
                      >
                        <button
                          type="button"
                          onClick={() => navigate("/forgot-password?from=user")}
                          className="text-sm text-gray-500 hover:text-white transition-colors animate-pulse"
                        >
                          Forgot password?
                        </button>
                      </motion.div>
                    )}
                  </div>

                  {step === 0 && (
                    <div id="cf-turnstile-container" className="w-full flex justify-center mt-6 min-h-[70px]" />
                  )}
                </div>

                {step === 0 && (
                  <div className="mt-8 flex flex-col items-center gap-6">
                    <div className="flex items-center gap-4 w-full">
                      <div className="h-[1px] bg-white/10 flex-1" />
                      <span className="text-gray-500 text-xs font-light tracking-widest uppercase">Or</span>
                      <div className="h-[1px] bg-white/10 flex-1" />
                    </div>
                    <div className="w-full flex justify-center">
                      <div id="google-signin-button" className="w-full flex justify-center" />
                    </div>
                  </div>
                )}

                {/* Error State */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl"
                    >
                      <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <p className="text-red-400 text-sm font-light">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Controls */}
                <div className="flex gap-4 pt-8">
                  {step > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={prevStep}
                      className="px-8 py-3 rounded-full border border-white/20 text-white hover:border-white/40 transition-all text-sm font-light"
                    >
                      Back
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextStep}
                    disabled={loading}
                    className="flex-1 py-4 px-8 rounded-full bg-white text-black font-semibold text-lg hover:bg-gray-100 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      <span>{step === currentFields.length - 1 ? "Complete" : "Continue"}</span>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Toggle Auth Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center flex flex-col items-center gap-4"
        >
          <p className="text-gray-500 text-sm font-light">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={toggleAuth}
            className="text-white text-sm font-semibold hover:text-gray-300 transition-colors"
          >
            {isLogin ? "Create Account" : "Sign In"}
          </button>
        </motion.div>
      </div>

      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: white;
          -webkit-box-shadow: 0 0 0px 1000px transparent inset;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;


