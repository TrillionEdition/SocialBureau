import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/utils/urls';
import { Sparkles, GraduationCap, ArrowRight, UserCheck, X } from 'lucide-react';

const PortfolioPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('choice'); // 'choice', 'quiz', 'congrats'
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [correctStatus, setCorrectStatus] = useState({ q1: false, q2: false, q3: false });
  const [error, setError] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [stats, setStats] = useState({ totalCount: 0, recentStudents: [] });
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const questions = [
    { id: 'q1', label: '01. Capital of France?', options: ['London', 'Paris', 'Berlin'], answer: 'Paris' },
    { id: 'q2', label: '02. Capital of India?', options: ['Mumbai', 'New Delhi', 'Kolkata'], answer: 'New Delhi' },
    { id: 'q3', label: '03. The "Red Planet"?', options: ['Venus', 'Mars', 'Jupiter'], answer: 'Mars' }
  ];

  const handleClose = () => {
    setIsOpen(false);
    if (view !== 'congrats') {
      setView('choice');
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
    setError(isCorrect ? '' : `Incorrect answer for ${question.label.split('.')[0]}. Try again!`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (correctStatus.q1 && correctStatus.q2 && correctStatus.q3) {
      setView('congrats');
      setError('');
      setIsCompleted(true);
      localStorage.setItem('student_portfolio_quiz_completed', 'true');
    } else {
      setError('Please ensure all answers are correct before claiming!');
    }
  };

  const handleRedirect = () => {
    const token = localStorage.getItem('partnerToken') || localStorage.getItem('token');
    if (token) {
      navigate('/partners/dashboard');
    } else {
      navigate('/partners/login?redirect=/partners/create-portfolio');
    }
    handleClose();
  };

  const handleStudentChoice = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.role === 'student' || user.role === 'admin') {
        // If already a student (or admin), skip the quiz
        setView('congrats');
        setIsCompleted(true);
        localStorage.setItem('student_portfolio_quiz_completed', 'true');
        return;
      }
    }
    setView('quiz');
  };

  const handleInfluencerRedirect = () => {
    const token = localStorage.getItem('partnerToken') || localStorage.getItem('token');
    if (token) {
      navigate('/partners/dashboard');
    } else {
      navigate('/partners/login');
    }
    handleClose();
  };

  return (
    <>
      {/* Main Trigger Card */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed bottom-6 right-6 z-[10001] flex flex-col items-end gap-3"
          >
            {/* Small Mobile Trigger (Icon only) */}
            <AnimatePresence>
              {isMobile && !mobileExpanded && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={() => setMobileExpanded(true)}
                  className="w-14 h-14 bg-[#E8001A] rounded-full flex items-center justify-center text-white shadow-2xl border-2 border-white/20 cursor-pointer"
                >
                  <Sparkles size={24} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Full Card (Desktop always, Mobile only when expanded) */}
            <AnimatePresence>
              {(!isMobile || mobileExpanded) && (
                <motion.div
                  initial={isMobile ? { scale: 0.8, opacity: 0, y: 20 } : { opacity: 0, x: 50 }}
                  animate={isMobile ? { scale: 1, opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
                  exit={isMobile ? { scale: 0.8, opacity: 0, y: 20 } : { opacity: 0, x: 50 }}
                  className="relative"
                >
                  {/* Close button for mobile expanded state */}
                  {isMobile && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileExpanded(false);
                      }}
                      className="absolute -top-3 -left-3 w-8 h-8 bg-black/50 backdrop-blur-md rounded-full border border-white/20 text-white flex items-center justify-center z-[10002] shadow-xl"
                    >
                      <ArrowRight className="rotate-180" size={14} />
                    </button>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="cursor-pointer group relative"
                  >
                    {/* Floating Bubbles (Bubbling Thing) */}
                    <div className="absolute bottom-full -mb-4 right-0 w-64 h-24 pointer-events-none overflow-visible scale-95 md:scale-100 origin-bottom-right z-20">
                      {/* Total Count Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/partners/students');
                        }}
                        className="absolute -bottom-2 -right-2 w-14 h-14 md:w-16 md:h-16 bg-[#E8001A] rounded-full flex flex-col items-center justify-center text-white shadow-[0_0_20px_rgba(232,0,26,0.4)] border-2 border-white/20 z-40 cursor-pointer pointer-events-auto"
                      >
                        <span className="text-lg md:text-xl font-black leading-none">{stats.totalCount || 7}</span>
                        <span className="text-[7px] md:text-[8px] font-black uppercase tracking-tighter">Students</span>
                      </motion.div>

                      {stats.recentStudents.map((student, index) => {
                        const angle = (index * (360 / Math.max(stats.recentStudents.length, 1))) * (Math.PI / 180);
                        const radius = 50 + (index % 3) * 20;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * (radius * 0.4) - 40;
                        return (
                          <motion.div
                            key={student.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1, x, y: [y, y - 10, y] }}
                            whileHover={{ scale: 1.2, zIndex: 50 }}
                            transition={{ y: { duration: 3 + (index % 4), repeat: Infinity, ease: "easeInOut", delay: index * 0.3 } }}
                            className="absolute bottom-0 right-1/2 translate-x-1/2 pointer-events-auto cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/partnership/${student.param || student.id}`);
                            }}
                          >
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/20 hover:border-[#E8001A] overflow-hidden shadow-lg bg-[#111] transition-all">
                              <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* The Card */}
                    <div className="relative overflow-hidden bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/20 p-3 md:p-4 rounded-[24px] md:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-3 md:gap-4 border-l-4 border-l-[#E8001A]">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#E8001A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#E8001A] to-[#FF4444] rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
                        <Sparkles size={20} className="animate-pulse" />
                      </div>
                      <div>
                        <div className="text-white font-black text-xs md:text-lg tracking-tighter uppercase italic leading-none">Portfolio</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[#E8001A] text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em]">Launch Studio</span>
                          <ArrowRight size={10} className="text-white/40 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="fixed inset-0 bg-[#0A0A0A]/95 backdrop-blur-xl" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-[32px] shadow-2xl overflow-hidden"
            >
              <button onClick={handleClose} className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-[#E8001A] hover:text-white transition-all z-20">
                <X size={16} />
              </button>

              <div className="p-6 sm:p-10">
                {view === 'choice' && (
                  <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 italic">Choose Your <span className="text-[#E8001A]">Identity.</span></h2>
                    <p className="text-white/40 mb-8 sm:mb-12 italic text-xs sm:text-sm px-4">Select a path to build your professional presence.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <motion.div 
                        whileHover={{ y: -5 }} 
                        onClick={handleStudentChoice}
                        className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-[24px] sm:rounded-[32px] cursor-pointer hover:border-[#E8001A] transition-all group"
                      >
                        <GraduationCap size={32} className="text-[#E8001A] mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform sm:w-10 sm:h-10" />
                        <h3 className="text-lg sm:text-xl font-black text-white mb-2 uppercase tracking-tight italic">Student</h3>
                        <p className="text-white/40 text-[10px] sm:text-xs leading-relaxed">Free portfolio with quiz unlock. Build your first site.</p>
                      </motion.div>
                      <motion.div 
                        whileHover={{ y: -5 }} 
                        onClick={handleInfluencerRedirect}
                        className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-[24px] sm:rounded-[32px] cursor-pointer hover:border-yellow-500 transition-all group"
                      >
                        <Sparkles size={32} className="text-yellow-500 mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform sm:w-10 sm:h-10" />
                        <h3 className="text-lg sm:text-xl font-black text-white mb-2 uppercase tracking-tight italic">Influencer</h3>
                        <p className="text-white/40 text-[10px] sm:text-xs leading-relaxed">Premium Studio. Professional monetized portfolios.</p>
                      </motion.div>
                    </div>
                  </div>
                )}

                {view === 'quiz' && (
                  <div className="flex flex-col h-full">
                    {/* Header with Badge */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8001A]/10 border border-[#E8001A]/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E8001A] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#E8001A]">Student Exclusive</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h2 className="text-3xl sm:text-5xl font-black text-white mb-3 italic tracking-tighter leading-[0.9]">
                        Build Your Future <br />
                        <span className="text-[#E8001A] not-italic">For Free.</span>
                      </h2>
                      <p className="text-white/40 italic text-xs sm:text-sm max-w-sm leading-relaxed">
                        Pass this quick intelligence check to unlock your professional portfolio website.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 flex-1">
                      {questions.map(q => (
                        <div key={q.id} className="space-y-2 sm:space-y-3">
                          <label className="block text-white/50 text-[10px] font-black uppercase tracking-widest italic">{q.label}</label>
                          <div className="grid grid-cols-3 gap-2 sm:gap-4">
                            {q.options.map(opt => (
                              <button
                                key={opt} type="button"
                                onClick={() => handleOptionSelect(q.id, opt)}
                                className={`py-3 sm:py-3.5 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all border ${
                                  answers[q.id] === opt 
                                    ? (correctStatus[q.id] ? 'bg-[#E8001A] border-[#E8001A] text-white shadow-[0_0_20px_rgba(232,0,26,0.3)]' : 'bg-red-500/10 border-red-500/20 text-red-500') 
                                    : 'bg-white/5 border-white/10 text-white/30 hover:border-white/30 hover:bg-white/[0.08]'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-2 sm:pt-4">
                        {error && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[#E8001A] text-[10px] font-black uppercase tracking-tight mb-4 text-center"
                          >
                            {error}
                          </motion.p>
                        )}
                        <button 
                          type="submit" 
                          className="w-full bg-white text-black py-5 sm:py-6 rounded-[20px] sm:rounded-[24px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all text-xs sm:text-sm shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
                        >
                          CLAIM MY PORTFOLIO
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {view === 'congrats' && (
                  <div className="text-center">
                    <UserCheck size={48} className="text-[#E8001A] mb-6 sm:mb-8 mx-auto sm:w-14 sm:h-14" />
                    <h2 className="text-3xl sm:text-5xl font-black text-white mb-3 sm:mb-4 italic tracking-tighter">Access Granted.</h2>
                    <p className="text-white/40 mb-8 sm:mb-12 italic text-xs sm:text-sm">Your free toolkit is now active.</p>
                    <button onClick={handleRedirect} className="w-full bg-white text-black py-5 sm:py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-[#E8001A] hover:text-white transition-all text-xs sm:text-sm">Create Now</button>
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

export default PortfolioPopup;
