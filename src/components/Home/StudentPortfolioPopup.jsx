import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/utils/urls';

const StudentPortfolioPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('quiz'); // 'quiz' or 'congrats'
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [correctStatus, setCorrectStatus] = useState({ q1: false, q2: false, q3: false });
  const [error, setError] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [stats, setStats] = useState({ totalCount: 0, recentStudents: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${BASE_URL}/partners/student-stats`);
        const data = await res.json();
        if (data.success) {
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch student stats:", err);
      }
    };
    fetchStats();
    // Refresh stats every minute
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const questions = [
    {
      id: 'q1',
      label: '01. Capital of France?',
      options: ['London', 'Paris', 'Berlin'],
      answer: 'Paris'
    },
    {
      id: 'q2',
      label: '02. Capital of India?',
      options: ['Mumbai', 'New Delhi', 'Kolkata'],
      answer: 'New Delhi'
    },
    {
      id: 'q3',
      label: '03. The "Red Planet"?',
      options: ['Venus', 'Mars', 'Jupiter'],
      answer: 'Mars'
    }
  ];

  useEffect(() => {
    const hasCompleted = localStorage.getItem('student_portfolio_quiz_completed');
    if (hasCompleted) {
      setIsCompleted(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (step !== 'congrats') {
      setStep('quiz');
      setAnswers({ q1: '', q2: '', q3: '' });
      setCorrectStatus({ q1: false, q2: false, q3: false });
      setError('');
    }
  };

  const handleOptionSelect = (qid, option) => {
    const question = questions.find(q => q.id === qid);
    const isCorrect = option === question.answer;
    
    setAnswers(prev => ({ ...prev, [qid]: option }));
    setCorrectStatus(prev => ({ ...prev, [qid]: isCorrect }));
    
    if (!isCorrect) {
      setError(`Incorrect answer for ${question.label.split('.')[0]}. Try again!`);
    } else {
      // Clear error if they picked a correct one and no others are currently in error
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (correctStatus.q1 && correctStatus.q2 && correctStatus.q3) {
      setStep('congrats');
      setError('');
      setIsCompleted(true);
      localStorage.setItem('student_portfolio_quiz_completed', 'true');
    } else {
      setError('Please ensure all answers are correct before claiming!');
    }
  };

  const handleRedirect = () => {
    const token = localStorage.getItem('partnerToken') || localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (token && (user.role === 'admin' || localStorage.getItem('partnerToken'))) {
      navigate('/partners/dashboard');
    } else if (!token) {
      navigate('/partners/login?redirect=/partners/create-portfolio');
    } else {
      navigate('/partners/dashboard');
    }
    handleClose();
  };

  const handleTriggerClick = () => {
    const token = localStorage.getItem('partnerToken') || localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (token && (user.role === 'admin' || localStorage.getItem('partnerToken'))) {
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTriggerClick}
          className="fixed bottom-24 right-6 z-[10001] cursor-pointer group"
        >
          {/* Floating Student Circles */}
          <div className="absolute bottom-full mb-4 right-0 w-64 h-48 pointer-events-none overflow-visible scale-75 md:scale-100 origin-bottom-right">
            <AnimatePresence>
              {stats.recentStudents.map((student, index) => {
                // Determine random-ish but deterministic positions
                const angle = (index * (360 / stats.recentStudents.length)) * (Math.PI / 180);
                const radius = 70 + (index % 3) * 25;
                const x = Math.cos(angle) * radius;
                // Lift them significantly higher (changed -40 to -110)
                const y = Math.sin(angle) * (radius * 0.6) - 110;
                
                return (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      x: x,
                      y: [y, y - 15, y],
                    }}
                    whileHover={{ scale: 1.2, zIndex: 50 }}
                    transition={{ 
                      opacity: { duration: 0.5 },
                      scale: { duration: 0.5, delay: index * 0.1 },
                      y: { 
                        duration: 3 + (index % 4), 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: index * 0.3
                      }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Use param if it exists, otherwise fallback to ID
                      const slug = student.param || student.id;
                      navigate(`/partnership/${slug}`);
                    }}
                    className="absolute bottom-0 right-1/2 translate-x-1/2 z-30 cursor-pointer group/bubble pointer-events-auto"
                  >
                    <div className="relative">
                      {/* Name Tooltip */}
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg text-[8px] text-white font-bold opacity-0 group-hover/bubble:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {student.name}
                      </div>
                      
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/20 overflow-hidden shadow-lg bg-[#111] group-hover/bubble:border-[#E8001A] transition-colors">
                        <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 md:w-3 md:h-3 bg-[#E8001A] rounded-full border border-[#0A0A0A]" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Main Total Count Circle */}
            {stats.totalCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/partners/students');
                }}
                className="absolute -bottom-2 right-0 bg-[#E8001A] text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(232,0,26,0.5)] border-2 border-white/20 z-20 cursor-pointer pointer-events-auto hover:scale-110 transition-transform"
              >
                <span className="text-xs md:text-[14px] font-black leading-none">{stats.totalCount}</span>
                <span className="text-[6px] md:text-[7px] font-bold uppercase tracking-tighter opacity-80">Students</span>
              </motion.div>
            )}
          </div>

          <div className="relative overflow-hidden bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/20 p-3 md:p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-3 md:gap-4 border-l-4 border-l-[#E8001A]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#E8001A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#E8001A] to-[#FF4444] rounded-2xl flex items-center justify-center text-white shadow-lg">
              <i className="fas fa-graduation-cap text-lg md:text-xl"></i>
            </div>
            
            <div>
              <div className="text-white font-black text-[11px] md:text-sm tracking-tight">Free Student Portfolio</div>
              <div className="flex items-center gap-2">
                <span className="text-[#E8001A] text-[9px] md:text-[10px] font-black uppercase tracking-widest">Unlock Now</span>
                <motion.span 
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-white/40 text-[9px] md:text-[10px]"
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
                      <div className="space-y-6">
                        {questions.map((q) => (
                          <div key={q.id} className="group">
                            <label className="block text-white/70 text-[10px] font-bold mb-3 ml-1 uppercase tracking-[0.15em] group-focus-within:text-[#E8001A] transition-colors flex items-center gap-2">
                              {q.label}
                              {correctStatus[q.id] && (
                                <motion.span 
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="text-[#E8001A]"
                                >
                                  <i className="fas fa-check-circle text-[10px]"></i>
                                </motion.span>
                              )}
                            </label>
                            
                            <div className="grid grid-cols-3 gap-2">
                              {q.options.map((option) => {
                                const isSelected = answers[q.id] === option;
                                const isCorrect = q.answer === option;
                                const showAsError = isSelected && !isCorrect;
                                const showAsSuccess = isSelected && isCorrect;

                                return (
                                  <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleOptionSelect(q.id, option)}
                                    className={`px-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                                      showAsSuccess 
                                        ? 'bg-[#E8001A] border-[#E8001A] text-white shadow-[0_8px_16px_rgba(232,0,26,0.2)]'
                                        : showAsError
                                        ? 'bg-red-500/10 border-red-500/40 text-red-500'
                                        : isSelected
                                        ? 'bg-white/10 border-white/20 text-white'
                                        : 'bg-white/[0.03] border-white/5 text-white/30 hover:bg-white/[0.06] hover:border-white/10 hover:text-white'
                                    }`}
                                  >
                                    {option}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
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

