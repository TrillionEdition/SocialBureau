import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { BASE_URL } from "@/utils/urls";
import { setUserData } from "@/utils/authUtils";

const PartnerLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [captchaToken, setCaptchaToken] = useState(null);
  const turnstileWidgetId = useRef(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      const checkPortfolio = async () => {
        try {
          const response = await fetch(`${BASE_URL}/partners/my-partnership`, {
            headers: { "Authorization": `Bearer ${token}` }
          });
          const data = await response.json();
          if (data.success && data.data) {
            navigate("/partners/dashboard", { replace: true });
          } else {
            navigate("/partners/select-template", { replace: true });
          }
        } catch (err) {
          navigate("/partners/select-template", { replace: true });
        }
      };
      checkPortfolio();
    }
  }, [navigate]);

  const handleGoogleLogin = async (idToken) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch(`${BASE_URL}/user/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, role: "partner" }),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Google Login failed");
      
      if (data.user) {
        setUserData(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.token) localStorage.setItem('token', data.token);
      }
      
      setSuccess("Welcome back!");
      window.dispatchEvent(new Event("authChange"));
      
      // Check if user has an existing portfolio to decide redirection
      let hasPortfolio = false;
      try {
        const portResponse = await fetch(`${BASE_URL}/partners/my-partnership`, {
          headers: { "Authorization": `Bearer ${data.token}` }
        });
        const portData = await portResponse.json();
        if (portData.success && portData.data) {
          hasPortfolio = true;
        }
      } catch (err) {
        console.error("Portfolio check failed", err);
      }
      
      const queryParams = new URLSearchParams(location.search);
      const redirectParam = queryParams.get("redirect");
      const isAdmin = data.user?.role?.toLowerCase() === "admin";
      
      let destination = "/partners/select-template";
      if (hasPortfolio || isAdmin) {
        destination = "/partners/dashboard";
      } else if (redirectParam) {
        destination = redirectParam;
      }
      
      setTimeout(() => {
        navigate(destination, { replace: true });
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    let script;
    const initGoogleSignIn = () => {
      if (window.google) {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
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
            text: "signin_with",
            shape: "pill",
            width: "320",
          });
        }
      }
    };

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
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      setError("Please complete the captcha verification");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, captchaToken }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.user) {
        setUserData(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.token) localStorage.setItem('token', data.token);
      }

      setSuccess("Welcome back!");
      window.dispatchEvent(new Event("authChange"));

      // Check if user has an existing portfolio to decide redirection
      let hasPortfolio = false;
      try {
        const portResponse = await fetch(`${BASE_URL}/partners/my-partnership`, {
          headers: { "Authorization": `Bearer ${data.token}` }
        });
        const portData = await portResponse.json();
        if (portData.success && portData.data) {
          hasPortfolio = true;
        }
      } catch (err) {
        console.error("Portfolio check failed", err);
      }

      const queryParams = new URLSearchParams(location.search);
      const redirectParam = queryParams.get("redirect");
      const isAdmin = data.user?.role?.toLowerCase() === "admin";
      
      // If they have a portfolio or are admin, go to dashboard
      // Otherwise use the redirect param or default to template selection
      let destination = "/partners/select-template";
      if (hasPortfolio || isAdmin) {
        destination = "/partners/dashboard";
      } else if (location.state?.from?.pathname || redirectParam) {
        destination = location.state?.from?.pathname || redirectParam;
      }

      setTimeout(() => {
        navigate(destination, { replace: true });
      }, 1000);
    } catch (err) {
      setError(err.message || "Invalid credentials");
      setCaptchaToken(null);
      if (window.turnstile && turnstileWidgetId.current !== null) {
        try {
          window.turnstile.reset(turnstileWidgetId.current);
        } catch (e) {
          // ignore
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-lime-400/10 rounded-full blur-[100px] md:blur-[120px] -ml-32 md:-ml-64 -mt-32 md:-mt-64" />
      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-400/10 rounded-full blur-[100px] md:blur-[120px] -mr-32 md:-mr-64 -mb-32 md:-mb-64" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10 py-4 md:py-8"
      >
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-black mb-1">Partner Login</h1>
          <p className="text-zinc-500 font-medium text-xs md:text-sm">Sign in to continue your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3 bg-zinc-900/50 backdrop-blur-xl p-5 md:p-8 rounded-[24px] md:rounded-[32px] border border-zinc-800 shadow-2xl">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 md:p-4 bg-red-400/10 border border-red-400/20 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 text-red-400 text-[11px] md:text-sm"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-lime-400/10 border border-lime-400/20 rounded-2xl flex items-center gap-3 text-lime-400 text-sm"
            >
              <CheckCircle2 size={18} />
              {success}
            </motion.div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input 
                    type="email" 
                    name="email"
                    placeholder="john@example.com"
                    className="w-full bg-black border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-lime-400/50 transition-all font-medium text-sm"
                    onChange={handleChange}
                    required
                  />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    placeholder="••••••••"
                    className="w-full bg-black border border-zinc-800 rounded-xl pl-12 pr-12 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-lime-400/50 transition-all font-medium text-sm"
                    onChange={handleChange}
                    required
                  />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Link to="/forgot-password?from=partners" className="text-xs text-zinc-600 hover:text-lime-400 transition-colors">
              Forgot password?
            </Link>
          </div>

          {/* Cloudflare Turnstile Container */}
          <div id="cf-turnstile-container" className="w-full flex justify-center mt-3 min-h-[70px]" />

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-lime-400 text-black font-black py-3 rounded-xl mt-4 hover:bg-white hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_30px_rgba(163,230,53,0.2)]"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight size={20} />
              </>
            )}
          </button>

          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-zinc-800"></div>
            <span className="flex-shrink mx-4 text-zinc-500 text-xs font-bold uppercase tracking-widest">or</span>
            <div className="flex-grow border-t border-zinc-800"></div>
          </div>

          {/* Google Sign-in Button Container */}
          <div id="google-signin-button" className="w-full flex justify-center min-h-[44px]" />

          <p className="text-center text-zinc-500 text-[12px] mt-4">
            New partner?{" "}
            <Link to="/partners/register" className="text-lime-400 font-bold hover:text-white transition-colors">
              Create Account
            </Link>
          </p>
        </form>

        <div className="mt-6 md:mt-8 text-center">
          <a href="/" className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 hover:text-white transition-colors">
            ← Back to Social Bureau
          </a>
        </div>
      </motion.div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(163, 230, 53, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(163, 230, 53, 0.4);
        }
      `}</style>
    </div>
  );
};

export default PartnerLogin;


