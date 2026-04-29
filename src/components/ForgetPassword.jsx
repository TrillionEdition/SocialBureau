import React, { useState } from "react";
import { BASE_URL } from "@/utils/urls";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck, Mail, Lock, CheckCircle2, Loader2, Sparkles } from "lucide-react";

export const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const fromPartner = queryParams.get("from") === "partners";

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/user/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Email not recognized");

      setSuccess("Verification code dispatched.");
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/user/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Invalid verification code");

      setResetToken(data.resetToken);
      setSuccess("Identity confirmed.");
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 5) {
      setError("Password must be at least 5 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/user/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: resetToken, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Reset failed");

      setSuccess("Vault secured.");
      setStep(4);
      setTimeout(() => {
        if (fromPartner) {
          navigate("/partners/login" + location.search, { state: location.state });
        } else {
          navigate("/login" + location.search, { state: location.state });
        }
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex overflow-hidden font-sans selection:bg-[#E8001A]">
      {/* Left Column: Artistic Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden group">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img 
            src="/minimalist_digital_agency_hero_1777439418340.png" 
            alt="Minimalist Architecture" 
            className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-[3s]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#080808]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/20 via-transparent to-[#080808]" />
        </motion.div>

        <div className="relative z-10 p-20 flex flex-col justify-between h-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <img src="/assets/logo.webp" alt="SocialBureau" className="w-32 opacity-80" />
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-xs font-bold tracking-wider text-[#E8001A] block mb-4">Security verification</span>
              <h2 className="text-5xl font-bold tracking-tight leading-tight">
                Recover your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/70 to-white/30">account access.</span>
              </h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-white/50 text-base font-light leading-relaxed max-w-sm"
            >
              Follow the steps to securely reset your password and regain access to your dashboard.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex items-center gap-6"
          >
            <div className="h-[1px] w-12 bg-[#E8001A]" />
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 italic">Clinical Architecture // Permanent Identity</span>
          </motion.div>
        </div>
      </div>

      {/* Right Column: Minimal Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 relative">
        {/* Background Ambience for Mobile */}
        <div className="absolute top-0 right-0 w-[80%] h-[40%] bg-[#E8001A]/5 blur-[120px] rounded-full pointer-events-none lg:hidden" />
        
        <div className="w-full max-w-md relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-[1px] bg-[#E8001A]" />
               <span className="text-[9px] font-black tracking-[0.4em] text-[#E8001A] uppercase italic">System Access</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              {step === 4 ? "Password reset" : "Reset your password"}
            </h1>
            <p className="text-white/60 text-sm">
              {step === 1 && "Enter your email address to receive a verification code."}
              {step === 2 && "We've sent a 6-digit code to your email inbox."}
              {step === 3 && "Please choose a new strong password for your account."}
              {step === 4 && "Your password has been updated successfully."}
            </p>
          </motion.div>

          <div className="relative">
            {/* Animated Progress Bar */}
            <div className="absolute -top-6 left-0 w-full h-[1px] bg-white/5">
              <motion.div 
                animate={{ width: `${(step / 4) * 100}%` }}
                className="h-full bg-[#E8001A] shadow-[0_0_10px_#E8001A]"
              />
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="mb-8 p-5 bg-[#E8001A]/10 border-l-2 border-[#E8001A] flex items-center justify-between group"
                >
                  <span className="text-xs text-[#E8001A] font-bold tracking-tight italic uppercase">{error}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E8001A] animate-pulse" />
                </motion.div>
              )}

              {success && step !== 4 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 p-5 bg-white/5 border-l-2 border-white/20 flex items-center gap-4"
                >
                  <CheckCircle2 size={16} className="text-white/40" />
                  <span className="text-xs text-white/60 font-bold tracking-tight italic uppercase">{success}</span>
                </motion.div>
              )}

              {/* Step 1: Email */}
              {step === 1 && (
                <motion.form 
                  key="step1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSendOTP} 
                  className="space-y-10"
                >
                  <div className="group relative">
                    <label className="text-xs font-bold text-white/40 mb-3 block group-focus-within:text-[#E8001A] transition-colors">Email address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@company.com"
                      className="w-full bg-transparent border-b border-white/10 py-4 text-lg font-medium placeholder:text-white/5 focus:outline-none focus:border-[#E8001A] transition-all"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-6 rounded-none bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#E8001A] hover:text-white transition-all flex items-center justify-center gap-6 group italic"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : "Initiate Protocol"}
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </motion.form>
              )}

              {/* Step 2: OTP */}
              {step === 2 && (
                <motion.form 
                  key="step2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleVerifyOTP} 
                  className="space-y-10"
                >
                  <div className="group relative">
                    <label className="text-xs font-bold text-white/40 mb-3 block group-focus-within:text-[#E8001A] transition-colors">Verification code</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="000000"
                      className="w-full bg-transparent border-b border-white/10 py-4 text-4xl font-bold text-center tracking-[0.5em] placeholder:text-white/5 focus:outline-none focus:border-[#E8001A] transition-all"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-6 rounded-none bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#E8001A] hover:text-white transition-all flex items-center justify-center gap-6 group italic"
                  >
                    {loading ? "Verifying..." : "Validate Signature"}
                    <ShieldCheck size={16} />
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="w-full text-center text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-[#E8001A] transition-colors italic"
                  >
                    ← Re-initialize Sequence
                  </button>
                </motion.form>
              )}

              {/* Step 3: Reset */}
              {step === 3 && (
                <motion.form 
                  key="step3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleResetPassword} 
                  className="space-y-8"
                >
                  <div className="group relative">
                    <label className="text-xs font-bold text-white/40 mb-3 block group-focus-within:text-[#E8001A] transition-colors">New password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-transparent border-b border-white/10 py-4 text-lg font-medium placeholder:text-white/5 focus:outline-none focus:border-[#E8001A] transition-all"
                      required
                    />
                  </div>
                  <div className="group relative">
                    <label className="text-xs font-bold text-white/40 mb-3 block group-focus-within:text-[#E8001A] transition-colors">Confirm new password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-transparent border-b border-white/10 py-4 text-lg font-medium placeholder:text-white/5 focus:outline-none focus:border-[#E8001A] transition-all"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-6 rounded-none bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#E8001A] hover:text-white transition-all flex items-center justify-center gap-6 group italic"
                  >
                    {loading ? "Securing..." : "Establish Identity"}
                    <Sparkles size={16} />
                  </button>
                </motion.form>
              )}

              {/* Step 4: Success */}
              {step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-10"
                >
                  <div className="relative mx-auto w-24 h-24">
                     <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 bg-[#E8001A] rounded-full blur-2xl"
                     />
                     <div className="relative w-full h-full bg-[#E8001A] flex items-center justify-center">
                        <CheckCircle2 size={40} className="text-white" strokeWidth={3} />
                     </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">Authorized.</h2>
                    <p className="text-white/40 text-xs italic uppercase tracking-widest">Permanent identity established. Redirecting...</p>
                  </div>
                  <div className="flex justify-center gap-1">
                     {[...Array(3)].map((_, i) => (
                       <motion.div 
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                        className="w-1.5 h-1.5 bg-[#E8001A]"
                       />
                     ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 flex justify-between items-center">
            <Link 
              to={fromPartner ? "/partners/login" : "/login"} 
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-all group italic"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Abort Protocol
            </Link>
            <div className="flex gap-2">
               <div className="w-1.5 h-1.5 bg-[#E8001A]" />
               <div className="w-1.5 h-1.5 bg-white/10" />
               <div className="w-1.5 h-1.5 bg-white/10" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @font-face {
          font-family: 'Inter';
          font-display: swap;
        }
        input::placeholder {
          text-transform: none;
        }
      `}</style>
    </div>
  );
};
