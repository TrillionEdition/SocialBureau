import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Briefcase, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { BASE_URL } from "@/utils/urls";
import { setUserData } from "@/utils/authUtils";
import { registerUserAPI } from "@/services/userServices";

const PartnerRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    category: "",
    role: "partner"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError("");

    try {
      // Register the user
      const data = await registerUserAPI(form);
      
      setSuccess("Account created successfully! Redirecting to login...");
      
      setTimeout(() => {
        navigate("/partners/login" + location.search);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-lime-400/10 rounded-full blur-[100px] md:blur-[120px] -mr-32 md:-mr-64 -mt-32 md:-mt-64" />
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-400/10 rounded-full blur-[100px] md:blur-[120px] -ml-32 md:-ml-64 -mb-32 md:-mb-64" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10 py-4 md:py-8"
      >
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-black mb-1">Partner Signup</h1>
          <p className="text-zinc-500 font-medium text-xs md:text-sm">Create your account to build your portfolio</p>
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

          <div className="space-y-3">
            <div>
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input 
                  type="text" 
                  name="name"
                  placeholder="John Doe"
                  className="w-full bg-black border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-lime-400/50 transition-all font-medium text-sm"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

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

            <div>
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1 ml-1">Category (Optional)</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input 
                  type="text" 
                  name="category"
                  placeholder="Media, Designer, Photographer..."
                  className="w-full bg-black border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-lime-400/50 transition-all font-medium text-sm"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-lime-400 text-black font-black py-3 rounded-xl mt-4 hover:bg-white hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_30px_rgba(163,230,53,0.2)]"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight size={20} />
              </>
            )}
          </button>

          <p className="text-center text-zinc-500 text-[12px] mt-4">
            Already have an account?{" "}
            <Link to="/partners/login" className="text-lime-400 font-bold hover:text-white transition-colors">
              Sign In
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

export default PartnerRegister;


