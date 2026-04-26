import React, { useState } from "react";
import { Mail, Phone, ShieldCheck } from "lucide-react";

import Footer from "../components/Footer";

export default function Verification() {
  const [method, setMethod] = useState("email");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  /* ---------- Toast ---------- */
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* ---------- Actions ---------- */
  const sendOtp = async () => {
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      showToast("OTP sent successfully");
    }, 1000);
  };

  const verifyOtp = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Verification successful");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black">
   

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50
            px-4 py-3 rounded-xl text-sm shadow-lg
            border backdrop-blur
            ${
              toast.type === "success"
                ? "bg-green-900/40 border-green-500/30 text-green-300"
                : "bg-red-900/40 border-red-500/30 text-red-300"
            }`}
        >
          {toast.message}
        </div>
      )}

      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none flex justify-center">
          <div className="w-[32rem] h-[32rem] bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-40 blur-3xl" />
        </div>

        {/* Card */}
        <div className="relative z-10 w-full max-w-md rounded-3xl
            bg-gradient-to-b from-[#0d1016] to-[#07090d]
            border border-white/10 shadow-2xl p-8">

          <div className="flex flex-col items-center text-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <ShieldCheck className="text-black" />
            </div>
            <h2 className="text-2xl font-semibold text-white">
              Verify Your Identity
            </h2>
            <p className="text-sm text-white/60">
              Verify via email or mobile number
            </p>
          </div>

          {/* Method Switch */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMethod("email")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm transition
                ${method === "email"
                  ? "bg-purple-600 text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"}`}
            >
              <Mail size={16} /> Email
            </button>

            <button
              onClick={() => setMethod("mobile")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm transition
                ${method === "mobile"
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"}`}
            >
              <Phone size={16} /> Mobile
            </button>
          </div>

          {/* Input */}
          {!sent && (
            <input
              type={method === "email" ? "email" : "tel"}
              placeholder={
                method === "email"
                  ? "Enter your email address"
                  : "Enter mobile number"
              }
              className="w-full px-4 py-3 rounded-xl bg-black/60
                border border-white/10 text-white outline-none
                focus:border-purple-500 mb-4"
            />
          )}

          {/* OTP */}
          {sent && (
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="w-full px-4 py-3 rounded-xl bg-black/60
                border border-white/10 text-white outline-none
                focus:border-blue-500 mb-4 tracking-widest text-center"
            />
          )}

          {/* Action */}
          <button
            onClick={sent ? verifyOtp : sendOtp}
            disabled={loading}
            className="w-full py-3 rounded-xl
              bg-gradient-to-r from-purple-600 to-blue-600
              text-white font-medium hover:opacity-90
              transition disabled:opacity-50"
          >
            {loading ? "Please wait..." : sent ? "Verify OTP" : "Send OTP"}
          </button>
        </div>
      </section>

       
    </div>
  );
}

