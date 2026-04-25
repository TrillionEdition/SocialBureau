import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Briefcase, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { BASE_URL } from "../../../../utils/urls";
import { setUserData } from "../../../../utils/authUtils";
import { registerUserAPI } from "../../../../services/userServices";

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
      
      // Auto-login: save user data if returned
      if (data.user) {
        setUserData(data.user);
        // Dispatch event to update authenticated state across the app
        window.dispatchEvent(new Event("authChange"));
      }

      setSuccess("Account created successfully! Preparing your studio...");
      
      setTimeout(() => {
        navigate("/partners/select-template" + location.search);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime-400/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -ml-64 -mb-64" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-block p-3 rounded-2xl bg-lime-400/10 border border-lime-400/20 mb-4">
            <User size={32} className="text-lime-400" />
          </div>
          <h1 className="text-4xl font-black mb-2">Partner Signup</h1>
          <p className="text-zinc-500 font-medium">Create your account to build your portfolio</p>
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
              <label className="block text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input 
                  type="text" 
                  name="name"
                  placeholder="John Doe"
                  className="w-full bg-black border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-lime-400/50 transition-all font-medium"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

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

            <div>
              <label className="block text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 ml-1">Category (Optional)</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input 
                  type="text" 
                  name="category"
                  placeholder="Media, Designer, Photographer..."
                  className="w-full bg-black border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-lime-400/50 transition-all font-medium"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-lime-400 text-black font-black py-4 rounded-2xl mt-8 hover:bg-white hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_30px_rgba(163,230,53,0.2)]"
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

          <p className="text-center text-zinc-500 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/partners/login" className="text-lime-400 font-bold hover:text-white transition-colors">
              Sign In
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

export default PartnerRegister;
