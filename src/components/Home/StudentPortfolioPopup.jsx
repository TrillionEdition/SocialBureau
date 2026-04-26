import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const StudentPortfolioPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('quiz'); // 'quiz' or 'congrats'
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [error, setError] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasCompleted = localStorage.getItem('student_portfolio_quiz_completed');
    if (hasCompleted) {
      setIsCompleted(true);
    } else {
      // Optional: auto-show after 5 seconds if not completed
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Reset to quiz step if they didn't complete it
    if (step !== 'congrats') {
      setStep('quiz');
      setAnswers({ q1: '', q2: '', q3: '' });
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const normalize = (str) => str.toLowerCase().trim().replace(/\s+/g, '');
    
    const checkAnswer = (input, correct) => {
      const normalizedInput = normalize(input);
      const normalizedCorrect = normalize(correct);
      
      // Basic check: exact match or contains (for multi-word answers)
      if (normalizedInput === normalizedCorrect) return true;
      
      // For multi-word like New Delhi, check if both parts are present
      if (correct.toLowerCase() === 'new delhi') {
        return normalizedInput.includes('delhi') || normalizedInput.includes('newdelhi');
      }
      
      // For single word answers, maybe check if it's very close (optional, keeping it simple for now)
      return normalizedInput === normalizedCorrect;
    };

    const isQ1Correct = checkAnswer(answers.q1, 'paris');
    const isQ2Correct = checkAnswer(answers.q2, 'new delhi');
    const isQ3Correct = checkAnswer(answers.q3, 'mars');

    if (isQ1Correct && isQ2Correct && isQ3Correct) {
      setStep('congrats');
      setError('');
      setIsCompleted(true);
      localStorage.setItem('student_portfolio_quiz_completed', 'true');
    } else {
      setError('Some answers are incorrect. Please try again!');
    }
  };

  const handleRedirect = () => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!user || !token) {
      // Redirect to login with a return path
      navigate('/partners/login?redirect=/partners/create-portfolio');
    } else {
      // Logged in users go to their portfolio dashboard
      navigate('/partners/dashboard');
    }
    handleClose();
  };

  const handleTriggerClick = () => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (user && token) {
      navigate('/partners/dashboard');
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      {/* Floating Trigger Card */}
      {!isOpen && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTriggerClick}
          className="fixed bottom-24 right-6 z-[999] cursor-pointer group"
        >
          <div className="relative overflow-hidden bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4 border-l-4 border-l-[#E8001A]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#E8001A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-12 h-12 bg-gradient-to-br from-[#E8001A] to-[#FF4444] rounded-2xl flex items-center justify-center text-white shadow-lg">
              <i className="fas fa-graduation-cap text-xl"></i>
            </div>
            
            <div>
              <div className="text-white font-black text-sm tracking-tight">Free Student Portfolio</div>
              <div className="flex items-center gap-2">
                <span className="text-[#E8001A] text-[10px] font-black uppercase tracking-widest">Unlock Now</span>
                <motion.span 
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-white/40 text-[10px]"
                >
                  <i className="fas fa-arrow-right"></i>
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-[#0A0A0A]/90 backdrop-blur-lg"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#111111] border border-white/10 rounded-[32px] sm:rounded-[44px] shadow-[0_32px_120px_rgba(232,0,26,0.2)] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-[#E8001A] hover:border-[#E8001A] transition-all z-20"
              >
                <i className="fas fa-times"></i>
              </button>

              {/* Content */}
              <div className="p-10 sm:p-14 relative">
                {/* Glow effects */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#E8001A]/10 to-transparent pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#E8001A]/10 blur-[100px] rounded-full pointer-events-none" />

                {step === 'quiz' ? (
                  <div className="relative z-10">
                    <div className="mb-10">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8001A]/10 border border-[#E8001A]/20 text-[#E8001A] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] mb-6">
                        <span className="w-1.5 h-1.5 bg-[#E8001A] rounded-full animate-pulse" />
                        Student Exclusive
                      </div>
                      <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter leading-[0.95] mb-4">
                        Build Your Future <br/>
                        <span className="bg-gradient-to-r from-[#E8001A] via-[#FF5C35] to-[#FF1493] bg-clip-text text-transparent italic">For Free.</span>
                      </h2>
                      <p className="text-white/50 text-sm sm:text-base font-light italic leading-relaxed">
                        Pass this quick intelligence check to unlock your professional portfolio website.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-5">
                        {/* Q1 */}
                        <div className="group">
                          <label className="block text-white/70 text-[12px] font-bold mb-2 ml-1 uppercase tracking-wider group-focus-within:text-[#E8001A] transition-colors">
                            01. Capital of France?
                          </label>
                          <input
                            type="text"
                            required
                            value={answers.q1}
                            onChange={(e) => setAnswers({ ...answers, q1: e.target.value })}
                            placeholder="Type here..."
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#E8001A]/40 focus:bg-white/[0.06] transition-all"
                          />
                        </div>

                        {/* Q2 */}
                        <div className="group">
                          <label className="block text-white/70 text-[12px] font-bold mb-2 ml-1 uppercase tracking-wider group-focus-within:text-[#E8001A] transition-colors">
                            02. Capital of India?
                          </label>
                          <input
                            type="text"
                            required
                            value={answers.q2}
                            onChange={(e) => setAnswers({ ...answers, q2: e.target.value })}
                            placeholder="Type here..."
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#E8001A]/40 focus:bg-white/[0.06] transition-all"
                          />
                        </div>

                        {/* Q3 */}
                        <div className="group">
                          <label className="block text-white/70 text-[12px] font-bold mb-2 ml-1 uppercase tracking-wider group-focus-within:text-[#E8001A] transition-colors">
                            03. The "Red Planet"?
                          </label>
                          <input
                            type="text"
                            required
                            value={answers.q3}
                            onChange={(e) => setAnswers({ ...answers, q3: e.target.value })}
                            placeholder="Planet name..."
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#E8001A]/40 focus:bg-white/[0.06] transition-all"
                          />
                        </div>
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-[#E8001A]/10 border border-[#E8001A]/20 rounded-xl p-3 flex items-center gap-3"
                        >
                          <i className="fas fa-times-circle text-[#E8001A]"></i>
                          <p className="text-[#E8001A] text-[11px] font-bold uppercase tracking-tight">
                            {error}
                          </p>
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-white text-[#0A0A0A] py-5 rounded-2xl font-black text-base uppercase tracking-widest shadow-2xl hover:bg-[#E8001A] hover:text-white transition-all transform hover:scale-[1.02] active:scale-95"
                      >
                        Claim My Portfolio
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="relative z-10 text-center py-4">
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                      className="w-28 h-28 bg-gradient-to-br from-[#E8001A] to-[#FF4444] rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-[0_30px_70px_rgba(232,0,26,0.4)]"
                    >
                      <i className="fas fa-award text-5xl text-white"></i>
                    </motion.div>

                    <h2 className="text-5xl font-black text-white tracking-tighter mb-4 leading-tight">
                      Access Granted!
                    </h2>
                    <p className="text-white/40 text-lg font-light italic mb-12">
                      You've proven your intelligence. Your professional portfolio toolkit is now unlocked.
                    </p>

                    <button
                      onClick={handleRedirect}
                      className="w-full bg-white text-[#0A0A0A] py-6 rounded-2xl font-black text-xl uppercase tracking-widest shadow-2xl hover:bg-[#E8001A] hover:text-white transition-all transform hover:scale-[1.05]"
                    >
                      Create Now →
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StudentPortfolioPopup;

