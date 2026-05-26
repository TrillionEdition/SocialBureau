import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Mail, Sparkles, Clock, Check, AlertCircle, ArrowRight } from "lucide-react";

export default function BookSessionModal({ onClose, partnerName, partnerEmail }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [selectedService, setSelectedService] = useState("Social Media Marketing");
  const [userDate, setUserDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState(null);

  // Load from localStorage if available (similar to chatbot)
  useEffect(() => {
    const savedName = localStorage.getItem("sb_chatbot_name");
    const savedEmail = localStorage.getItem("sb_chatbot_email");
    if (savedName) setUserName(savedName);
    if (savedEmail) setUserEmail(savedEmail);
  }, []);

  const services = [
    { id: "SMM", name: "Social Media Marketing", desc: "Growth, organic outreach, and brand positioning." },
    { id: "WebDev", name: "Web Development", desc: "Next-gen frontends, portals, and robust architectures." },
    { id: "SEO", name: "SEO & Paid Ads", desc: "Traffic acquisition, optimization, and scaling KPIs." },
    { id: "Other", name: "Other Consultation", desc: "Custom systems, automation, and tech integration." }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim() || !userDate) {
      setError("Please fill out all required fields.");
      return;
    }

    const selectedDateTime = new Date(userDate);
    if (selectedDateTime.getTime() <= Date.now()) {
      setError("Please select a date and time in the future.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/partners/schedule-meeting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userName,
          userEmail,
          selectedService,
          userDate: selectedDateTime.toISOString(),
          partnerEmail,
          partnerName
        })
      });

      const data = await response.json();

      if (data.alreadyScheduled) {
        setSuccessData({
          alreadyScheduled: true,
          userDate: data.data.userDate,
          selectedService: data.data.selectedService,
          gmeetLink: data.data.gmeetLink
        });
        // Save to localStorage for chatbot synchronization
        localStorage.setItem("sb_chatbot_name", userName);
        localStorage.setItem("sb_chatbot_email", userEmail);
      } else if (response.ok && data.success) {
        setSuccessData({
          alreadyScheduled: false,
          userDate,
          selectedService,
          gmeetLink: data.gmeetLink
        });
        localStorage.setItem("sb_chatbot_name", userName);
        localStorage.setItem("sb_chatbot_email", userEmail);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error booking session:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop Blur Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#06010b]/80 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="relative w-full max-w-xl max-h-[100dvh] sm:max-h-[90dvh] bg-gradient-to-b from-[#1c0f2e] to-[#0c0415] border border-white/10 rounded-t-[24px] sm:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-y-auto overflow-x-hidden z-10"
        >
          {/* Subtle Accent Glows */}
          <div className="absolute top-0 left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#ff3358] to-transparent opacity-60" />
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#ff3358]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {!successData ? (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="p-5 sm:p-8 md:p-10 select-none">
              <div className="mb-4 sm:mb-6 flex items-center gap-2 pr-8">
                <Sparkles className="w-5 h-5 text-[#ff3358] animate-pulse shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white font-display">
                  Book a Session
                </h3>
              </div>

              <p className="text-[10px] sm:text-xs text-gray-400 font-medium mb-5 sm:mb-8 uppercase tracking-widest leading-relaxed">
                Schedule a 1-on-1 strategic session with <span className="text-white font-bold">{partnerName}</span> to discuss your projects, API architectures, or marketing strategy.
              </p>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-red-400 tracking-wide uppercase leading-normal">
                    {error}
                  </span>
                </motion.div>
              )}

              <div className="space-y-4 sm:space-y-6">
                {/* Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                  {/* Visitor Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#ff3358]/70" /> Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="bg-black/40 border border-white/10 hover:border-white/20 focus:border-[#ff3358]/50 text-white rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-semibold outline-none transition-all placeholder:text-gray-600 focus:shadow-[0_0_15px_rgba(255,51,88,0.1)]"
                    />
                  </div>

                  {/* Visitor Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-purple-400" /> Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="bg-black/40 border border-white/10 hover:border-white/20 focus:border-purple-500/50 text-white rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-semibold outline-none transition-all placeholder:text-gray-600 focus:shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                    />
                  </div>
                </div>

                {/* Service Cards (Selectable list) */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Select Strategic Service
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {services.map((service) => {
                      const isSelected = selectedService === service.name;
                      return (
                        <div
                          key={service.id}
                          onClick={() => setSelectedService(service.name)}
                          className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer select-none flex flex-col gap-1 ${
                            isSelected
                              ? "bg-[#ff3358]/5 border-[#ff3358] shadow-[0_0_15px_rgba(255,51,88,0.15)]"
                              : "bg-black/30 border-white/5 hover:border-white/10 hover:bg-white/2"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? "text-[#ff3358]" : "text-white"}`}>
                              {service.name}
                            </span>
                            {isSelected && (
                              <div className="w-4 h-4 rounded-full bg-[#ff3358] flex items-center justify-center">
                                <Check className="w-3 h-3 text-white stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-500 font-medium leading-relaxed mt-1">
                            {service.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Date & Time Select */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" /> Preferred Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={userDate}
                    onChange={(e) => setUserDate(e.target.value)}
                    className="bg-black/40 border border-white/10 hover:border-white/20 focus:border-blue-500/50 text-white rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-semibold outline-none transition-all focus:shadow-[0_0_15px_rgba(59,130,246,0.1)] scheme-dark"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 sm:mt-8 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 border-t border-white/5 pt-4 sm:pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-white/5 hover:bg-white/10 text-gray-400 border border-white/5 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#ff3358] hover:bg-[#e02447] disabled:opacity-50 text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 active:scale-95 w-full sm:w-auto"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    <>
                      Schedule Session <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Success Confirmation Screen */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-5 sm:p-8 md:p-10 text-center select-none"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/5 border border-green-500/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.15)] animate-bounce">
                <Calendar className="w-8 h-8 text-green-400" />
              </div>

              {successData.alreadyScheduled ? (
                <>
                  <h3 className="text-xl font-bold uppercase tracking-wider text-white font-display mb-3">
                    Already Scheduled!
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium uppercase tracking-widest max-w-sm mx-auto mb-8">
                    You already registered a meeting with <span className="text-white font-bold">{partnerName}</span> in the last 24 hours. Let's make the best use of that session!
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold uppercase tracking-wider text-white font-display mb-3">
                    Session Registered!
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium uppercase tracking-widest max-w-sm mx-auto mb-8">
                    Your session with <span className="text-white font-bold">{partnerName}</span> has been successfully locked in. Check your email inbox for a calendar invite!
                  </p>
                </>
              )}

              {/* Details Card */}
              <div className="bg-black/35 border border-white/5 rounded-2xl p-6 mb-8 text-left max-w-md mx-auto relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/2 rounded-bl-full pointer-events-none" />
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                    <div>
                      <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Scheduled Time</div>
                      <div className="text-xs font-semibold text-white mt-0.5">
                        {new Date(successData.userDate).toLocaleString()} (IST)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-[#ff3358] shrink-0" />
                    <div>
                      <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Selected Focus Area</div>
                      <div className="text-xs font-semibold text-white mt-0.5">
                        {successData.selectedService}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Banner / Direct Action */}
              {successData.gmeetLink ? (
                <div className="max-w-md mx-auto mb-8 flex flex-col gap-3">
                  <a
                    href={successData.gmeetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-green-500/20 select-none active:scale-95 no-underline border border-green-500/20"
                  >
                    <Sparkles className="w-4 h-4 animate-pulse text-white" /> Join Session Now
                  </a>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
                    You can join the room early or at the scheduled time!
                  </p>
                </div>
              ) : (
                <div className="max-w-md mx-auto p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-semibold tracking-wider text-[10px] uppercase leading-relaxed mb-8 flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0" />
                  The official Google Meet link will be sent to your email 10 minutes before the session starts.
                </div>
              )}

              <button
                type="button"
                onClick={onClose}
                className="bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95"
              >
                Close & Return
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
