import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Sparkles, Check, AlertCircle, ArrowRight, Building2, Star, ArrowLeft, MessageSquare } from "lucide-react";

export default function ReviewModal({ onClose, partnerName, employeeId, reviewsList = [], onReviewSubmit, initialMode = "read" }) {
  const [mode, setMode] = useState(initialMode); // "read" or "write"
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCompany, setUserCompany] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Load user name/email from localStorage if they have used chatbots/forms before
  useEffect(() => {
    const savedName = localStorage.getItem("sb_chatbot_name");
    const savedEmail = localStorage.getItem("sb_chatbot_email");
    if (savedName) setUserName(savedName);
    if (savedEmail) setUserEmail(savedEmail);
  }, []);

  const averageRating = reviewsList.length > 0
    ? (reviewsList.reduce((acc, curr) => acc + (curr.rating || 0), 0) / reviewsList.length).toFixed(1)
    : "0.0";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim() || !reviewText.trim() || !rating) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      
      // If we don't have a real employee ID (e.g. mock demo mode), simulate success
      if (!employeeId || employeeId === "000000000" || employeeId.length < 12) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        localStorage.setItem("sb_chatbot_name", userName);
        localStorage.setItem("sb_chatbot_email", userEmail);
        
        const newReview = {
          name: userName,
          company: userCompany || "Client Partner",
          rating: rating,
          review: reviewText,
          createdAt: new Date().toISOString(),
        };

        if (onReviewSubmit) {
          onReviewSubmit(newReview);
        }
        
        setSuccess(true);
        // Clear form
        setReviewText("");
        setRating(5);
        
        // Wait and redirect back to read list
        setTimeout(() => {
          setSuccess(false);
          setMode("read");
        }, 1500);
        return;
      }

      const response = await fetch(`${apiUrl}/review/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          company: userCompany,
          rating: rating,
          review: reviewText,
          employee: employeeId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("sb_chatbot_name", userName);
        localStorage.setItem("sb_chatbot_email", userEmail);
        
        const newReview = {
          name: userName,
          company: userCompany || "Client Partner",
          rating: rating,
          review: reviewText,
          createdAt: new Date().toISOString(),
        };

        if (onReviewSubmit) {
          onReviewSubmit(newReview);
        }
        
        setSuccess(true);
        // Clear form
        setReviewText("");
        setRating(5);
        
        // Redirect back to reviews list view after success animation
        setTimeout(() => {
          setSuccess(false);
          setMode("read");
        }, 1500);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      // Local demo fallback
      localStorage.setItem("sb_chatbot_name", userName);
      localStorage.setItem("sb_chatbot_email", userEmail);
      
      const newReview = {
        name: userName,
        company: userCompany || "Client Partner",
        rating: rating,
        review: reviewText,
        createdAt: new Date().toISOString(),
      };

      if (onReviewSubmit) {
        onReviewSubmit(newReview);
      }
      setSuccess(true);
      setReviewText("");
      setRating(5);
      
      setTimeout(() => {
        setSuccess(false);
        setMode("read");
      }, 1500);
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
          className="relative w-full max-w-xl bg-gradient-to-b from-[#1c0f2e] to-[#0c0415] border border-white/10 rounded-t-[24px] sm:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 overflow-hidden"
        >
          {/* Subtle Accent Glows */}
          <div className="absolute top-0 left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#ff3358] to-transparent opacity-60" />
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#ff3358]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all z-20"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-5 sm:p-8 md:p-10 select-none max-h-[85vh] overflow-y-auto custom-scrollbar-modal">
            <style>{`
              .custom-scrollbar-modal::-webkit-scrollbar {
                width: 4px;
              }
              .custom-scrollbar-modal::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.02);
              }
              .custom-scrollbar-modal::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
              }
              .custom-scrollbar-modal::-webkit-scrollbar-thumb:hover {
                background: #ff3358;
              }
            `}</style>

            {mode === "read" ? (
              /* --- READ MODE: REVIEWS LIST --- */
              <div>
                <div className="mb-6 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#ff3358] shrink-0" />
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white font-display">
                      Reviews for {partnerName}
                    </h3>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-widest leading-relaxed">
                    Check out what our client partners say about their collaboration.
                  </p>
                </div>

                {/* Rating Summary Bar */}
                <div className="bg-black/30 border border-white/5 rounded-2xl p-4 mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl sm:text-4xl font-black text-white">{averageRating}</span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-3.5 h-3.5 ${
                              idx < Math.round(Number(averageRating))
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-white/10"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                        {reviewsList.length} Total {reviewsList.length === 1 ? "Review" : "Reviews"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setMode("write")}
                    className="bg-[#ff3358] hover:bg-[#e02447] text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-md shadow-red-500/10 flex items-center gap-1.5"
                  >
                    <PlusIcon className="w-3.5 h-3.5" /> Write Review
                  </button>
                </div>

                {/* Reviews List */}
                {reviewsList.length > 0 ? (
                  <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1 custom-scrollbar-modal">
                    {reviewsList.map((r, idx) => (
                      <div
                        key={idx}
                        className="bg-white/[0.02] border border-white/5 hover:border-white/10 p-4 rounded-xl transition-all duration-300 relative group overflow-hidden"
                      >
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h4 className="text-xs font-black text-white">{r.name}</h4>
                            {r.company && (
                              <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest block mt-0.5">
                                {r.company}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, sIdx) => (
                              <Star
                                key={sIdx}
                                className={`w-3 h-3 ${
                                  sIdx < r.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-white/10"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-gray-300 text-xs italic leading-relaxed font-medium">
                          "{r.review}"
                        </p>
                        
                        <div className="text-right text-[8px] text-gray-600 font-bold uppercase tracking-widest mt-2">
                          {r.createdAt
                            ? new Date(r.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "Recently"}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-4">
                    <Star className="w-8 h-8 text-gray-600 mb-2" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">No reviews yet</h4>
                    <p className="text-[10px] text-gray-500 max-w-xs leading-normal mb-4">
                      No client reviews have been logged. Be the first to share your feedback!
                    </p>
                    <button
                      onClick={() => setMode("write")}
                      className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                    >
                      Write First Review
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* --- WRITE MODE: REVIEW FORM --- */
              <div>
                {!success ? (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-5 flex items-center gap-3 pr-8">
                      <button
                        type="button"
                        onClick={() => setMode("read")}
                        className="p-1 rounded-lg border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all active:scale-90 shrink-0"
                        title="Back to reviews"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <div>
                        <h3 className="text-md sm:text-lg font-bold uppercase tracking-wider text-white font-display">
                          Write a Review
                        </h3>
                        <p className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">
                          Share your experience working with {partnerName}
                        </p>
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-red-400 tracking-wide uppercase leading-normal">
                          {error}
                        </span>
                      </motion.div>
                    )}

                    <div className="space-y-4 sm:space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {/* Name */}
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
                            className="bg-black/40 border border-white/10 hover:border-white/20 focus:border-[#ff3358]/50 text-white rounded-xl px-3 py-2.5 text-xs font-semibold outline-none transition-all placeholder:text-gray-600 focus:shadow-[0_0_12px_rgba(255,51,88,0.1)]"
                          />
                        </div>

                        {/* Email */}
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
                            className="bg-black/40 border border-white/10 hover:border-white/20 focus:border-purple-500/50 text-white rounded-xl px-3 py-2.5 text-xs font-semibold outline-none transition-all placeholder:text-gray-600 focus:shadow-[0_0_12px_rgba(168,85,247,0.1)]"
                          />
                        </div>
                      </div>

                      {/* Company */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-blue-400" /> Company Name (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Acme Corp"
                          value={userCompany}
                          onChange={(e) => setUserCompany(e.target.value)}
                          className="bg-black/40 border border-white/10 hover:border-white/20 focus:border-blue-500/50 text-white rounded-xl px-3 py-2.5 text-xs font-semibold outline-none transition-all placeholder:text-gray-600 focus:shadow-[0_0_12px_rgba(59,130,246,0.1)]"
                        />
                      </div>

                      {/* Rating Select */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                          Overall Rating
                        </label>
                        <div className="flex items-center gap-1.5">
                          {[1, 2, 3, 4, 5].map((star) => {
                            const isHighlighted = star <= (hoverRating || rating);
                            return (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="p-1 transition-transform active:scale-90 hover:scale-125 focus:outline-none"
                              >
                                <Star
                                  className={`w-7 h-7 transition-colors ${
                                    isHighlighted
                                      ? "text-yellow-400 fill-yellow-400 filter drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]"
                                      : "text-gray-600 hover:text-yellow-500/80"
                                  }`}
                                />
                              </button>
                            );
                          })}
                          <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider ml-3 shrink-0">
                            {rating === 5
                              ? "Excellent! (5/5)"
                              : rating === 4
                                ? "Very Good (4/5)"
                                : rating === 3
                                  ? "Good (3/5)"
                                  : rating === 2
                                    ? "Fair (2/5)"
                                    : "Poor (1/5)"}
                          </span>
                        </div>
                      </div>

                      {/* Comments */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                          Your Review
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Describe your working relationship, execution speed, quality of results..."
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          className="bg-black/40 border border-white/10 hover:border-white/20 focus:border-[#ff3358]/50 text-white rounded-xl px-3 py-2.5 text-xs font-semibold outline-none transition-all placeholder:text-gray-600 focus:shadow-[0_0_12px_rgba(255,51,88,0.1)] resize-none"
                        />
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 border-t border-white/5 pt-4">
                      <button
                        type="button"
                        onClick={() => setMode("read")}
                        className="bg-white/5 hover:bg-white/10 text-gray-400 border border-white/5 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all w-full sm:w-auto"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#ff3358] hover:bg-[#e02447] disabled:opacity-50 text-white px-7 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-red-500/10 active:scale-95 w-full sm:w-auto"
                      >
                        {loading ? (
                          <>
                            <div className="w-3 border border-white border-t-transparent rounded-full animate-spin h-3" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Review <ArrowRight className="w-3 h-3" />
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
                    className="text-center py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/5 border border-green-500/30 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(34,197,94,0.15)] animate-bounce">
                      <Check className="w-6 h-6 text-green-400 stroke-[3]" />
                    </div>

                    <h3 className="text-md sm:text-lg font-bold uppercase tracking-wider text-white font-display mb-2">
                      Review Logged!
                    </h3>
                    <p className="text-[10px] text-gray-500 max-w-xs mx-auto leading-relaxed mb-6">
                      Thank you! Your feedback for {partnerName} has been successfully recorded and is visible in the reviews list.
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Micro icons inline definitions
function PlusIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}
