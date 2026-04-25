import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { BASE_URL } from "../../../../utils/urls";
import { setUserData } from "../../../../utils/authUtils";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
      
      // Default redirection logic
      let destination = "/partners/select-template";
      if (hasPortfolio) {
        destination = "/partners/dashboard";
      }

      const from = location.state?.from?.pathname || redirectParam || destination;

      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-lime-400/10 rounded-full blur-[120px] -ml-64 -mt-64" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[120px] -mr-64 -mb-64" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-block p-3 rounded-2xl bg-lime-400/10 border border-lime-400/20 mb-4">
            <LogIn size={32} className="text-lime-400" />
          </div>
          <h1 className="text-4xl font-black mb-2">Partner Login</h1>
          <p className="text-zinc-500 font-medium">Sign in to continue your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-900/50 backdrop-blur-xl p-8 rounded-[32px] border border-zinc-800 shadow-2xl">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-red-400/10 border border-red-400/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm"
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
              <label className="block text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input 
                  type="email" 
                  name="email"
                  placeholder="john@example.com"
                  className="w-full bg-black border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-lime-400/50 transition-all font-medium"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  placeholder="••••••••"
                  className="w-full bg-black border border-zinc-800 rounded-2xl pl-12 pr-12 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-lime-400/50 transition-all font-medium"
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
            <Link to="/forgot-password" size="sm" className="text-xs text-zinc-600 hover:text-lime-400 transition-colors">
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-lime-400 text-black font-black py-4 rounded-2xl mt-6 hover:bg-white hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_30px_rgba(163,230,53,0.2)]"
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

          <p className="text-center text-zinc-500 text-sm mt-6">
            New partner?{" "}
            <Link to="/partners/register" className="text-lime-400 font-bold hover:text-white transition-colors">
              Create Account
            </Link>
          </p>
        </form>

        <div className="mt-12 text-center">
          <a href="/" className="text-xs uppercase tracking-[0.3em] text-zinc-600 hover:text-white transition-colors">
            ← Back to Social Bureau
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default PartnerLogin;
