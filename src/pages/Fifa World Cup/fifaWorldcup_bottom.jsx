
  /* ── LOADING STATE ── */
  if (loading) {
    return (
      <div className="fifa-body min-h-screen bg-[#040d1a] flex flex-col items-center justify-center text-white gap-8 px-6">
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700;900&family=Montserrat:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&display=swap');
          @keyframes shimmer { to { transform: translateX(200%); } }
          .fifa-body { font-family: 'Roboto', sans-serif; background-color: #040d1a; }
        `}} />
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-14 h-14 border-[3px] border-[#1a6fff]/20 border-t-[#1a6fff] rounded-full" />
        <div className="w-full max-w-md space-y-3">
          <Shimmer className="h-8 w-3/4 mx-auto" />
          <Shimmer className="h-4 w-1/2 mx-auto" />
          <div className="grid grid-cols-3 gap-3 mt-6">
            <Shimmer className="h-24" />
            <Shimmer className="h-24" />
            <Shimmer className="h-24" />
          </div>
        </div>
        <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}
          className="font-inter text-slate-400 text-xs tracking-[0.25em] uppercase">
          Synchronizing Arena Data...
        </motion.p>
      </div>
    );
  }

  const heroVotes = heroMatch ? getVotePercentages(heroMatch) : { teamA: 33, teamB: 33, draw: 34 };
  const currentLeaderboard = leaderboardSubTab === "accuracy" ? leaderboard : votesLeaderboard;
  const isAccuracy = leaderboardSubTab === "accuracy";

  return (
    <div className="fifa-body font-roboto overflow-x-hidden relative min-h-screen" style={{ backgroundColor: "#040d1a", color: "#e1e3e4" }}>

      {/* ── GLOBAL STYLES ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700;900&family=Montserrat:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .fifa-body { font-family: 'Roboto', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-roboto { font-family: 'Roboto', sans-serif; }
        .font-display-xl { font-family: 'Montserrat', sans-serif; }
        @keyframes shimmer { to { transform: translateX(200%); } }
        @keyframes floatY { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes gradientShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes pulse-ring { 0% { box-shadow: 0 0 0 0 rgba(42,229,0,0.35); } 70% { box-shadow: 0 0 0 14px rgba(42,229,0,0); } 100% { box-shadow: 0 0 0 0 rgba(42,229,0,0); } }
        .glass-card { background: rgba(6,18,42,0.7) !important; backdrop-filter: blur(30px) !important; border: 1px solid rgba(26,111,255,0.15) !important; box-shadow: 0 24px 64px 0 rgba(0,0,0,0.5) !important; }
        .glass-card-hover { transition: all 0.3s ease; }
        .glass-card-hover:hover { background: rgba(8,24,55,0.8) !important; border-color: rgba(26,111,255,0.25) !important; transform: translateY(-2px); }
        .green-gradient-text { background: linear-gradient(135deg,#2ae500,#79ff5b,#2ae500); background-size:200% 200%; animation: gradientShift 2s ease infinite; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .blue-gradient-text { background: linear-gradient(135deg,#4da3ff,#7ec8ff,#1a6fff); background-size:200% 200%; animation: gradientShift 3s ease infinite; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .pulse-glow { animation: pulse-ring 2s infinite; }
        .float-anim { animation: floatY 4s ease-in-out infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(26,111,255,0.3); border-radius: 4px; }
        .btn-glow-green:hover { box-shadow: 0 0 40px rgba(42,229,0,0.6), 0 0 80px rgba(42,229,0,0.2) !important; }
        .network-bg {
          background-image: 
            linear-gradient(rgba(26,111,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,111,255,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}} />

      <main className="relative z-10">

        {/* ═══════════════════════════════════════
            HERO SECTION — Reference Design
        ═══════════════════════════════════════ */}
        {heroMatch && (
          <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 pb-8 px-4">

            {/* Deep blue base */}
            <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(160deg, #040d1a 0%, #071530 40%, #030b1e 70%, #040d1a 100%)" }} />

            {/* Network grid overlay */}
            <div className="absolute inset-0 z-[1] network-bg opacity-60" />

            {/* SVG network lines */}
            <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
              <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="none">
                <defs>
                  <radialGradient id="centerGlow" cx="50%" cy="52%" r="45%">
                    <stop offset="0%" stopColor="#1a6fff" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#1a6fff" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="leftGlow" cx="15%" cy="60%" r="35%">
                    <stop offset="0%" stopColor="#1a6fff" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#1a6fff" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="rightGlow" cx="85%" cy="60%" r="35%">
                    <stop offset="0%" stopColor="#1a6fff" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#1a6fff" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* Diagonal network lines */}
                <line x1="0" y1="100%" x2="50%" y2="0" stroke="#1a6fff" strokeWidth="0.8" strokeOpacity="0.3"/>
                <line x1="100%" y1="100%" x2="50%" y2="0" stroke="#1a6fff" strokeWidth="0.8" strokeOpacity="0.3"/>
                <line x1="0" y1="40%" x2="100%" y2="70%" stroke="#1a6fff" strokeWidth="0.5" strokeOpacity="0.2"/>
                <line x1="0" y1="70%" x2="60%" y2="20%" stroke="#1a6fff" strokeWidth="0.5" strokeOpacity="0.15"/>
                <line x1="40%" y1="100%" x2="100%" y2="30%" stroke="#1a6fff" strokeWidth="0.5" strokeOpacity="0.15"/>
                <line x1="15%" y1="0" x2="0" y2="60%" stroke="#1a6fff" strokeWidth="0.6" strokeOpacity="0.2"/>
                <line x1="85%" y1="0" x2="100%" y2="60%" stroke="#1a6fff" strokeWidth="0.6" strokeOpacity="0.2"/>
                {/* Connecting lines from center to sides */}
                <line x1="50%" y1="52%" x2="5%" y2="62%" stroke="#2a7fff" strokeWidth="1.2" strokeOpacity="0.35"/>
                <line x1="50%" y1="52%" x2="95%" y2="62%" stroke="#2a7fff" strokeWidth="1.2" strokeOpacity="0.35"/>
                <line x1="50%" y1="52%" x2="22%" y2="20%" stroke="#2a7fff" strokeWidth="0.8" strokeOpacity="0.25"/>
                <line x1="50%" y1="52%" x2="78%" y2="20%" stroke="#2a7fff" strokeWidth="0.8" strokeOpacity="0.25"/>
                <line x1="50%" y1="52%" x2="10%" y2="35%" stroke="#2a7fff" strokeWidth="0.6" strokeOpacity="0.2"/>
                <line x1="50%" y1="52%" x2="90%" y2="35%" stroke="#2a7fff" strokeWidth="0.6" strokeOpacity="0.2"/>
                {/* Glow ellipses */}
                <ellipse cx="50%" cy="52%" rx="40%" ry="28%" fill="url(#centerGlow)"/>
                <ellipse cx="15%" cy="60%" rx="25%" ry="20%" fill="url(#leftGlow)"/>
                <ellipse cx="85%" cy="60%" rx="25%" ry="20%" fill="url(#rightGlow)"/>
                {/* Dots at network nodes */}
                {[[5,62],[95,62],[22,20],[78,20],[10,35],[90,35],[50,10],[30,80],[70,80]].map(([x,y], i) => (
                  <circle key={i} cx={`${x}%`} cy={`${y}%`} r="3" fill="#3a8fff" fillOpacity="0.55"/>
                ))}
                {[[5,62],[95,62],[22,20],[78,20],[10,35],[90,35]].map(([x,y], i) => (
                  <circle key={`outer${i}`} cx={`${x}%`} cy={`${y}%`} r="6" fill="none" stroke="#3a8fff" strokeWidth="0.8" strokeOpacity="0.3"/>
                ))}
              </svg>
            </div>

            {/* Hero background image (boot) with heavy fade */}
            <motion.div
              style={{ y: heroParallax }}
              className="absolute inset-0 z-[3] bg-cover bg-top"
              style={{
                backgroundImage: `url('https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/FIFA%20World%20Cup/Please_create_a_hero_image_ple_1.jpg')`,
                opacity: 0.12,
                y: heroParallax,
              }}
            />
            {/* Bottom fade to section bg */}
            <div className="absolute inset-0 z-[4]" style={{ background: "linear-gradient(to bottom, rgba(4,13,26,0) 0%, rgba(4,13,26,0.4) 50%, rgba(4,13,26,0.96) 90%, rgba(4,13,26,1) 100%)" }}/>
            {/* Blue vignette corners */}
            <div className="absolute inset-0 z-[4]" style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(4,13,26,0.5) 100%)" }}/>

            {/* Content */}
            <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-6">


              {/* Match card */}
              <motion.div variants={scaleIn} initial="hidden" animate="show" custom={0.1}
                className="w-full rounded-3xl p-6 md:p-10 relative overflow-hidden"
                style={{ background: "rgba(5,15,38,0.75)", border: "1px solid rgba(26,111,255,0.25)", backdropFilter: "blur(40px)", boxShadow: "0 0 100px rgba(26,111,255,0.1), 0 30px 80px rgba(0,0,0,0.7)" }}>

                {/* Top glow accent */}
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(26,111,255,0.6), rgba(42,229,0,0.3), rgba(26,111,255,0.6), transparent)" }}/>
                <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% -10%, rgba(26,111,255,0.12) 0%, transparent 55%)" }}/>

                {/* Teams row */}
                <div className="relative z-10 grid grid-cols-7 items-center gap-4">

                  {/* Team A */}
                  <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.25}
                    className="col-span-3 flex flex-col items-center gap-4">
                    <motion.div whileHover={{ scale: 1.08 }} transition={{ type: "spring", stiffness: 280, damping: 16 }} className="relative">
                      <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(26,111,255,0.4) 0%, transparent 65%)", transform: "scale(1.5)", filter: "blur(16px)" }}/>
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, rgba(20,50,110,0.95), rgba(8,22,58,0.98))", border: "2px solid rgba(26,111,255,0.5)", boxShadow: "0 0 35px rgba(26,111,255,0.3), inset 0 0 25px rgba(26,111,255,0.08)" }}>
                        {heroMatch.teamACrest ? (
                          <img className="w-16 h-16 md:w-24 md:h-24 object-contain p-2" src={heroMatch.teamACrest} alt={heroMatch.teamA}/>
                        ) : (
                          <span className="font-display-xl font-black text-2xl" style={{ color: "#4da3ff" }}>{heroMatch.teamA.slice(0,3).toUpperCase()}</span>
                        )}
                      </div>
                    </motion.div>
                    <span className="font-display-xl text-xl md:text-2xl font-black text-white uppercase tracking-wider leading-tight text-center"
                      style={{ textShadow: "0 0 30px rgba(255,255,255,0.2)" }}>
                      {heroMatch.teamA}
                    </span>
                  </motion.div>

                  {/* VS / Score */}
                  <motion.div variants={scaleIn} initial="hidden" animate="show" custom={0.3}
                    className="col-span-1 flex flex-col items-center gap-3">
                    {heroMatch.status === "Live" || heroMatch.status === "Completed" ? (
                      <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}
                        className="font-display-xl text-4xl md:text-5xl font-black leading-none"
                        style={{ color: "#2ae500", textShadow: "0 0 25px rgba(42,229,0,0.7), 0 0 50px rgba(42,229,0,0.3)" }}>
                        {heroMatch.scores?.home ?? 0}:{heroMatch.scores?.away ?? 0}
                      </motion.div>
                    ) : (
                      <motion.div
                        animate={{ textShadow: ["0 0 20px rgba(42,229,0,0.5)","0 0 55px rgba(42,229,0,0.9)","0 0 20px rgba(42,229,0,0.5)"] }}
                        transition={{ repeat: Infinity, duration: 2.5 }}
                        className="font-display-xl text-5xl md:text-6xl font-black leading-none"
                        style={{ color: "#2ae500" }}>
                        VS
                      </motion.div>
                    )}
                    <div className="px-3 py-1.5 rounded-full font-inter text-[9px] font-bold uppercase tracking-widest"
                      style={{ background: "rgba(26,111,255,0.18)", border: "1px solid rgba(26,111,255,0.4)", color: "#7eb8ff" }}>
                      {heroMatch.kickoffTime} UTC
                    </div>
                  </motion.div>

                  {/* Team B */}
                  <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.25}
                    className="col-span-3 flex flex-col items-center gap-4">
                    <motion.div whileHover={{ scale: 1.08 }} transition={{ type: "spring", stiffness: 280, damping: 16 }} className="relative">
                      <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(26,111,255,0.4) 0%, transparent 65%)", transform: "scale(1.5)", filter: "blur(16px)" }}/>
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, rgba(20,50,110,0.95), rgba(8,22,58,0.98))", border: "2px solid rgba(26,111,255,0.5)", boxShadow: "0 0 35px rgba(26,111,255,0.3), inset 0 0 25px rgba(26,111,255,0.08)" }}>
                        {heroMatch.teamBCrest ? (
                          <img className="w-16 h-16 md:w-24 md:h-24 object-contain p-2" src={heroMatch.teamBCrest} alt={heroMatch.teamB}/>
                        ) : (
                          <span className="font-display-xl font-black text-2xl" style={{ color: "#4da3ff" }}>{heroMatch.teamB.slice(0,3).toUpperCase()}</span>
                        )}
                      </div>
                    </motion.div>
                    <span className="font-display-xl text-xl md:text-2xl font-black text-white uppercase tracking-wider leading-tight text-center"
                      style={{ textShadow: "0 0 30px rgba(255,255,255,0.2)" }}>
                      {heroMatch.teamB}
                    </span>
                  </motion.div>
                </div>

                {/* Vote Share Bar */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.5}
                  className="mt-8 space-y-3 max-w-xl mx-auto">
                  <div className="flex justify-between font-inter text-[10px]">
                    <span className="flex items-center gap-1.5 font-semibold" style={{ color: "#4da3ff" }}>
                      <motion.span animate={{ opacity: [1,0.3,1] }} transition={{ repeat:Infinity, duration:1.5 }} className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#4da3ff" }}/>
                      {heroMatch.teamA} (<AnimatedNumber value={heroVotes.teamA} />%)
                    </span>
                    <span className="flex items-center gap-1.5 font-medium" style={{ color: "#64748b" }}>
                      <span className="w-1.5 h-1.5 rounded-full inline-block bg-slate-600"/>
                      Draw (<AnimatedNumber value={heroVotes.draw} />%)
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold" style={{ color: "#2ae500" }}>
                      <motion.span animate={{ opacity: [1,0.3,1] }} transition={{ repeat:Infinity, duration:1.5, delay:0.6 }} className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#2ae500" }}/>
                      {heroMatch.teamB} (<AnimatedNumber value={heroVotes.teamB} />%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full overflow-hidden flex" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${heroVotes.teamA}%` }} transition={{ duration: 1.4, ease: [0.22,1,0.36,1], delay: 0.6 }}
                      className="h-full rounded-l-full" style={{ background: "linear-gradient(90deg, #003bb5, #4da3ff)" }}/>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${heroVotes.draw}%` }} transition={{ duration: 1.4, ease: [0.22,1,0.36,1], delay: 0.85 }}
                      className="h-full" style={{ background: "linear-gradient(90deg, #1e293b, #334155)" }}/>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${heroVotes.teamB}%` }} transition={{ duration: 1.4, ease: [0.22,1,0.36,1], delay: 1.1 }}
                      className="h-full rounded-r-full" style={{ background: "linear-gradient(90deg, #166600, #2ae500)" }}/>
                  </div>
                </motion.div>

                {/* VOTE NOW Button */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.65}
                  className="mt-8 flex justify-center">
                  {isMatchLocked(heroMatch) ? (
                    <div className="px-10 py-3.5 rounded-xl font-inter text-[10px] font-bold uppercase tracking-widest"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#64748b" }}>
                      {heroMatch.status === "Completed" ? "🏆 Match Closed" : "🔒 Forecast Locked"}
                    </div>
                  ) : (
                    <motion.a href="#predict"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      onClick={(e) => { e.preventDefault(); const el = document.getElementById("predict"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                      className="inline-flex items-center justify-center gap-3 px-16 py-4 font-display-xl font-black text-sm tracking-[0.28em] uppercase cursor-pointer rounded-xl btn-glow-green"
                      style={{
                        background: "linear-gradient(135deg, #2ae500 0%, #1db800 100%)",
                        color: "#01200a",
                        boxShadow: "0 0 35px rgba(42,229,0,0.55), 0 0 70px rgba(42,229,0,0.2), inset 0 1px 0 rgba(255,255,255,0.25)",
                        border: "1px solid rgba(100,255,60,0.35)",
                      }}>
                      <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: '"FILL" 1' }}>sports_soccer</span>
                      VOTE NOW
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>

         
          </section>
        )}

        {/* ═══════════════════════════════════════
            PREDICTIONS HUB
        ═══════════════════════════════════════ */}
        <section className="py-24 px-4 md:px-12 relative" id="predict"
          style={{ background: "linear-gradient(180deg, #040d1a 0%, #060f20 100%)" }}>
          <div className="max-w-7xl mx-auto space-y-12">

            {/* Section Header */}
            <ScrollReveal>
              <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 pb-8"
                style={{ borderBottom: "1px solid rgba(26,111,255,0.1)" }}>
                <div>
                  <h2 className="font-display-xl text-3xl md:text-4xl font-black tracking-tight text-white uppercase italic">
                    YOUR <span className="green-gradient-text">PREDICTION</span>
                  </h2>
                  <p className="font-inter text-xs mt-2 max-w-2xl leading-relaxed" style={{ color: "#64748b" }}>
                    Configure your tactical forecast. Top predictors earn global rank and exclusive digital collectibles.
                  </p>
                </div>
                {selectedMatch && (
                  <div className="font-inter text-[10px] uppercase tracking-widest flex items-center gap-1.5 pb-1" style={{ color: "#4da3ff" }}>
                    <span className="w-1 h-1 rounded-full inline-block" style={{ backgroundColor: "#4da3ff" }}/>
                    PHASE: {selectedMatch.stage ? selectedMatch.stage.toUpperCase() : "GROUP STAGE"} | MATCH #{
                      matches.findIndex(m => m._id === selectedMatch._id) !== -1
                        ? matches.findIndex(m => m._id === selectedMatch._id) + 1
                        : (selectedMatch.matchNumber || selectedMatch.apiMatchId || "42")
                    }
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Grid */}
            <div className="grid lg:grid-cols-3 gap-8 items-start" id="predict-panel">

              {/* Predictor Slip */}
              <ScrollReveal delay={0.05} className="lg:col-span-2">
                <div className="glass-card rounded-[2rem] p-6 md:p-8 space-y-8 relative overflow-hidden">
                  <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(26,111,255,0.08) 0%, transparent 70%)" }}/>

                  {/* Lock overlay */}
                  <AnimatePresence>
                    {!isAuthenticated && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, backdropFilter: "blur(16px)" }} exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 rounded-[2rem]"
                        style={{ background: "rgba(4,13,26,0.82)", backdropFilter: "blur(20px)" }}>
                        <motion.div animate={{ y: [0,-6,0] }} transition={{ repeat: Infinity, duration: 3 }}
                          className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                          style={{ border: "1px solid rgba(26,111,255,0.2)", background: "rgba(26,111,255,0.08)" }}>
                          <span className="material-symbols-outlined text-white text-2xl">lock</span>
                        </motion.div>
                        <h3 className="font-display-xl text-2xl font-extrabold text-white tracking-tight mb-2 uppercase italic">Access Denied</h3>
                        <p className="font-roboto text-xs max-w-sm mb-6 leading-relaxed" style={{ color: "#64748b" }}>
                          You must be signed in to access the Global Prediction Hub.
                        </p>
                        <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          href={`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`}
                          className="px-8 py-3 font-display-xl font-black rounded-full text-xs uppercase tracking-widest transition-all duration-300"
                          style={{ background: "linear-gradient(135deg, #1a6fff, #4da3ff)", color: "#040d1a", boxShadow: "0 0 25px rgba(26,111,255,0.4)" }}>
                          Sign In Now
                        </motion.a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {selectedMatch ? (
                    <div className="space-y-8">
                      <AnimatePresence>
                        {isMatchLocked(selectedMatch) && (
                          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }}
                            className="p-4 rounded-xl flex items-center gap-2 font-inter text-xs overflow-hidden"
                            style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)", color: "#f87171" }}>
                            <span className="material-symbols-outlined text-base flex-shrink-0">error</span>
                            Predictions are closed for this fixture. Match has started or completed.
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Team Selectors */}
                      <div className="flex flex-col md:flex-row items-center gap-4 relative">

                        {/* Team A */}
                        <div className="w-full flex-1 flex flex-col gap-2">
                          <label className="font-inter text-[10px] uppercase tracking-wider font-medium" style={{ color: "#4da3ff" }}>Select Team A</label>
                          <div className="relative">
                            <motion.button type="button" whileTap={!isMatchLocked(selectedMatch) ? { scale: 0.98 } : {}}
                              onClick={() => { if (!isMatchLocked(selectedMatch)) setPredictionChoice("TeamA"); }}
                              className="w-full p-5 rounded-2xl text-left transition-all duration-300 flex items-center justify-between cursor-pointer"
                              style={{
                                background: predictionChoice === "TeamA" ? "rgba(26,111,255,0.12)" : "rgba(6,18,42,0.6)",
                                border: `1px solid ${predictionChoice === "TeamA" ? "rgba(26,111,255,0.5)" : "rgba(26,111,255,0.1)"}`,
                                opacity: isMatchLocked(selectedMatch) ? 0.5 : 1,
                                cursor: isMatchLocked(selectedMatch) ? "not-allowed" : "pointer",
                              }}>
                              <div className="flex items-center gap-4">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all`}
                                  style={{ borderColor: predictionChoice === "TeamA" ? "#4da3ff" : "#334155" }}>
                                  <AnimatePresence>
                                    {predictionChoice === "TeamA" && (
                                      <motion.div initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}
                                        className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#4da3ff" }}/>
                                    )}
                                  </AnimatePresence>
                                </div>
                                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center p-0.5"
                                  style={{ border: "1px solid rgba(26,111,255,0.2)", background: "rgba(0,0,0,0.3)" }}>
                                  {selectedMatch.teamACrest ? <img src={selectedMatch.teamACrest} alt="" className="w-full h-full object-cover"/> : <span className="font-inter text-xs text-white/60">{selectedMatch.teamA.slice(0,3).toUpperCase()}</span>}
                                </div>
                                <span className="font-roboto font-bold text-sm text-white uppercase truncate max-w-[120px]">{selectedMatch.teamA}</span>
                              </div>
                              <div onClick={(e) => { e.stopPropagation(); setShowTeamADropdown(!showTeamADropdown); setShowTeamBDropdown(false); }}
                                className="p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-white/10">
                                <motion.span animate={{ rotate: showTeamADropdown ? 180 : 0 }} transition={{ duration: 0.2 }}
                                  className="material-symbols-outlined text-lg block" style={{ color: "#4da3ff" }}>expand_more</motion.span>
                              </div>
                            </motion.button>
                            <AnimatePresence>
                              {showTeamADropdown && (
                                <motion.div initial={{ opacity:0, y:-8, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:-8, scale:0.97 }} transition={{ duration:0.18 }}
                                  className="absolute left-0 right-0 mt-2 rounded-2xl shadow-2xl z-30 max-h-64 overflow-y-auto custom-scrollbar"
                                  style={{ background: "#060f20", border: "1px solid rgba(26,111,255,0.2)" }}>
                                  <div className="p-2 border-b font-inter text-[9px] uppercase tracking-widest px-4" style={{ color: "#4da3ff", borderColor: "rgba(26,111,255,0.1)" }}>Switch Match</div>
                                  {matches.map((m) => (
                                    <button key={m._id} type="button" onClick={() => { handleSelectMatch(m); setShowTeamADropdown(false); }}
                                      className="w-full px-4 py-3 text-left transition flex items-center gap-3 border-b last:border-b-0 hover:bg-white/5"
                                      style={{ borderColor: "rgba(255,255,255,0.03)", opacity: isMatchLocked(m) ? 0.5 : 1 }}>
                                      <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center p-0.5 flex-shrink-0" style={{ background: "rgba(0,0,0,0.3)" }}>
                                        {m.teamACrest ? <img src={m.teamACrest} alt="" className="w-full h-full object-cover"/> : <span className="font-inter text-[8px] text-white/50">{m.teamA.slice(0,2)}</span>}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="font-roboto text-xs font-bold text-white truncate">{m.teamA} vs {m.teamB}</div>
                                        <div className="font-inter text-[8px]" style={{ color: "#4da3ff" }}>{m.kickoffTime} · {new Date(m.date).toLocaleDateString([],{month:"short",day:"numeric"})}</div>
                                      </div>
                                      <span className="font-inter text-[8px] uppercase tracking-wider font-semibold flex-shrink-0"
                                        style={{ color: isMatchLocked(m) ? "#ef4444" : "#2ae500" }}>
                                        {isMatchLocked(m) ? (m.status === "Completed" ? "Ended" : "Locked") : "Open"}
                                      </span>
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Draw Button */}
                        <div className="flex items-center justify-center z-10 md:mt-6">
                          <motion.button type="button" whileHover={!isMatchLocked(selectedMatch) ? { scale: 1.1 } : {}} whileTap={!isMatchLocked(selectedMatch) ? { scale: 0.9 } : {}}
                            onClick={() => { if (!isMatchLocked(selectedMatch)) setPredictionChoice("Draw"); }}
                            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
                            style={{
                              background: predictionChoice === "Draw" ? "rgba(26,111,255,0.15)" : "rgba(6,18,42,0.8)",
                              border: `1px solid ${predictionChoice === "Draw" ? "rgba(26,111,255,0.5)" : "rgba(26,111,255,0.12)"}`,
                              boxShadow: predictionChoice === "Draw" ? "0 0 20px rgba(26,111,255,0.2)" : "none",
                              opacity: isMatchLocked(selectedMatch) ? 0.5 : 1,
                            }} title="Predict Draw">
                            {!isAuthenticated || isMatchLocked(selectedMatch) ? (
                              <span className="material-symbols-outlined text-base" style={{ color: "#4da3ff" }}>lock</span>
                            ) : (
                              <span className="font-inter text-xs font-black" style={{ color: predictionChoice === "Draw" ? "#4da3ff" : "#64748b" }}>VS</span>
                            )}
                          </motion.button>
                        </div>

                        {/* Team B */}
                        <div className="w-full flex-1 flex flex-col gap-2">
                          <label className="font-inter text-[10px] uppercase tracking-wider font-medium" style={{ color: "#4da3ff" }}>Select Team B</label>
                          <div className="relative">
                            <motion.button type="button" whileTap={!isMatchLocked(selectedMatch) ? { scale: 0.98 } : {}}
                              onClick={() => { if (!isMatchLocked(selectedMatch)) setPredictionChoice("TeamB"); }}
                              className="w-full p-5 rounded-2xl text-left transition-all duration-300 flex items-center justify-between cursor-pointer"
                              style={{
                                background: predictionChoice === "TeamB" ? "rgba(26,111,255,0.12)" : "rgba(6,18,42,0.6)",
                                border: `1px solid ${predictionChoice === "TeamB" ? "rgba(26,111,255,0.5)" : "rgba(26,111,255,0.1)"}`,
                                opacity: isMatchLocked(selectedMatch) ? 0.5 : 1,
                                cursor: isMatchLocked(selectedMatch) ? "not-allowed" : "pointer",
                              }}>
                              <div className="flex items-center gap-4">
                                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                                  style={{ borderColor: predictionChoice === "TeamB" ? "#4da3ff" : "#334155" }}>
                                  <AnimatePresence>
                                    {predictionChoice === "TeamB" && (
                                      <motion.div initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}
                                        className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#4da3ff" }}/>
                                    )}
                                  </AnimatePresence>
                                </div>
                                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center p-0.5"
                                  style={{ border: "1px solid rgba(26,111,255,0.2)", background: "rgba(0,0,0,0.3)" }}>
                                  {selectedMatch.teamBCrest ? <img src={selectedMatch.teamBCrest} alt="" className="w-full h-full object-cover"/> : <span className="font-inter text-xs text-white/60">{selectedMatch.teamB.slice(0,3).toUpperCase()}</span>}
                                </div>
                                <span className="font-roboto font-bold text-sm text-white uppercase truncate max-w-[120px]">{selectedMatch.teamB}</span>
                              </div>
                              <div onClick={(e) => { e.stopPropagation(); setShowTeamBDropdown(!showTeamBDropdown); setShowTeamADropdown(false); }}
                                className="p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-white/10">
                                <motion.span animate={{ rotate: showTeamBDropdown ? 180 : 0 }} transition={{ duration: 0.2 }}
                                  className="material-symbols-outlined text-lg block" style={{ color: "#4da3ff" }}>expand_more</motion.span>
                              </div>
                            </motion.button>
                            <AnimatePresence>
                              {showTeamBDropdown && (
                                <motion.div initial={{ opacity:0, y:-8, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:-8, scale:0.97 }} transition={{ duration:0.18 }}
                                  className="absolute left-0 right-0 mt-2 rounded-2xl shadow-2xl z-30 max-h-64 overflow-y-auto custom-scrollbar"
                                  style={{ background: "#060f20", border: "1px solid rgba(26,111,255,0.2)" }}>
                                  <div className="p-2 border-b font-inter text-[9px] uppercase tracking-widest px-4" style={{ color: "#4da3ff", borderColor: "rgba(26,111,255,0.1)" }}>Switch Match</div>
                                  {matches.map((m) => (
                                    <button key={m._id} type="button" onClick={() => { handleSelectMatch(m); setShowTeamBDropdown(false); }}
                                      className="w-full px-4 py-3 text-left transition flex items-center gap-3 border-b last:border-b-0 hover:bg-white/5"
                                      style={{ borderColor: "rgba(255,255,255,0.03)", opacity: isMatchLocked(m) ? 0.5 : 1 }}>
                                      <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center p-0.5 flex-shrink-0" style={{ background: "rgba(0,0,0,0.3)" }}>
                                        {m.teamBCrest ? <img src={m.teamBCrest} alt="" className="w-full h-full object-cover"/> : <span className="font-inter text-[8px] text-white/50">{m.teamB.slice(0,2)}</span>}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="font-roboto text-xs font-bold text-white truncate">{m.teamA} vs {m.teamB}</div>
                                        <div className="font-inter text-[8px]" style={{ color: "#4da3ff" }}>{m.kickoffTime} · {new Date(m.date).toLocaleDateString([],{month:"short",day:"numeric"})}</div>
                                      </div>
                                      <span className="font-inter text-[8px] uppercase tracking-wider font-semibold flex-shrink-0"
                                        style={{ color: isMatchLocked(m) ? "#ef4444" : "#2ae500" }}>
                                        {isMatchLocked(m) ? (m.status === "Completed" ? "Ended" : "Locked") : "Open"}
                                      </span>
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>

                      {/* Momentum chips */}
                      <div className="space-y-4 pt-2">
                        <label className="font-inter text-[10px] uppercase tracking-wider font-medium block" style={{ color: "#4da3ff" }}>
                          Match Momentum — Expected Time of First Goal
                        </label>
                        <div className="flex gap-2.5 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                          {["0'-15'","16'-30'","31'-45'","46'-60'","61'-75'","76'-90'"].map((slot) => (
                            <motion.button key={slot} type="button" disabled={isMatchLocked(selectedMatch)}
                              whileHover={!isMatchLocked(selectedMatch) ? { y: -2 } : {}} whileTap={!isMatchLocked(selectedMatch) ? { scale: 0.94 } : {}}
                              onClick={() => setMomentumChoice(slot)}
                              className="flex-none px-5 py-3 rounded-xl font-inter text-xs font-semibold transition-all cursor-pointer"
                              style={{
                                background: momentumChoice === slot ? "rgba(26,111,255,0.15)" : "rgba(6,18,42,0.6)",
                                border: `1px solid ${momentumChoice === slot ? "rgba(26,111,255,0.4)" : "rgba(26,111,255,0.1)"}`,
                                color: momentumChoice === slot ? "#7eb8ff" : "#64748b",
                              }}>
                              {slot}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Submit */}
                      <div className="pt-6" style={{ borderTop: "1px solid rgba(26,111,255,0.08)" }}>
                        <motion.button type="button" disabled={isMatchLocked(selectedMatch) || submitting}
                          whileHover={!isMatchLocked(selectedMatch) && !submitting ? { scale: 1.02, y: -1 } : {}}
                          whileTap={!isMatchLocked(selectedMatch) && !submitting ? { scale: 0.97 } : {}}
                          onClick={handleSubmitPrediction}
                          className="relative w-full py-4 font-display-xl font-black rounded-2xl text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2.5 overflow-hidden cursor-pointer"
                          style={{
                            background: isMatchLocked(selectedMatch) ? "rgba(6,18,42,0.6)" : "rgba(5,30,10,0.8)",
                            border: `1px solid ${isMatchLocked(selectedMatch) ? "rgba(255,255,255,0.05)" : "rgba(42,229,0,0.3)"}`,
                            color: isMatchLocked(selectedMatch) ? "#334155" : "#2ae500",
                            boxShadow: isMatchLocked(selectedMatch) ? "none" : "0 0 25px rgba(42,229,0,0.12)",
                            opacity: isMatchLocked(selectedMatch) ? 0.5 : 1,
                          }}>
                          {submitting ? (
                            <>
                              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                className="w-3.5 h-3.5 border-2 border-t-transparent rounded-full" style={{ borderColor: "#2ae500 #2ae500 transparent" }}/>
                              PUBLISHING FORECAST...
                            </>
                          ) : justSubmitted ? (
                            <motion.span initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }} className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                              PREDICTION RECORDED!
                            </motion.span>
                          ) : (
                            <>
                              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>bolt</span>
                              PUBLISH PREDICTION &gt;
                            </>
                          )}
                        </motion.button>
                        <AnimatePresence>
                          {getExistingPrediction(selectedMatch._id) && (
                            <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                              className="mt-3 flex items-center justify-center gap-2 font-inter text-[10px] font-semibold uppercase tracking-wider"
                              style={{ color: "#2ae500" }}>
                              <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                              Prediction Locked · Click to Update
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16 font-roboto italic" style={{ color: "#334155" }}>
                      Select an upcoming fixture from the schedule to place forecasts.
                    </div>
                  )}
                </div>
              </ScrollReveal>

              {/* Leaderboard Widget */}
              <ScrollReveal delay={0.12}>
                <div className="glass-card rounded-[2rem] p-6 space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(26,111,255,0.06) 0%, transparent 70%)" }}/>

                  <div className="flex items-center justify-between pb-4" style={{ borderBottom: "1px solid rgba(26,111,255,0.1)" }}>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display-xl text-base font-black flex items-center gap-1.5 text-white uppercase italic">
                        <span className="material-symbols-outlined text-lg" style={{ color: "#fbbf24", fontVariationSettings: '"FILL" 1' }}>emoji_events</span>
                        Top Predictors
                      </h3>
                      <motion.span animate={{ opacity:[1,0.5,1] }} transition={{ repeat:Infinity, duration:2 }}
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-inter text-[8px] font-bold uppercase tracking-wider"
                        style={{ background: "rgba(42,229,0,0.1)", border: "1px solid rgba(42,229,0,0.2)", color: "#2ae500" }}>
                        <span className="w-1 h-1 rounded-full inline-block" style={{ backgroundColor: "#2ae500" }}/>
                        Live
                      </motion.span>
                    </div>
                    <div className="flex gap-1 p-0.5 rounded-lg" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(26,111,255,0.1)" }}>
                      {["accuracy","votes"].map(tab => (
                        <button key={tab} onClick={() => setLeaderboardSubTab(tab)}
                          className="px-2.5 py-1 font-inter text-[8px] font-bold uppercase tracking-wider rounded transition-all"
                          style={{ background: leaderboardSubTab === tab ? "rgba(26,111,255,0.2)" : "transparent", color: leaderboardSubTab === tab ? "#7eb8ff" : "#475569" }}>
                          {tab === "accuracy" ? "Acc" : "Act"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-2.5">
                    {currentLeaderboard.slice(0,5).map((user,idx) => (
                      <motion.div key={user._id || idx} variants={childItem} whileHover={{ x: 3 }}
                        className="flex items-center justify-between p-4 rounded-2xl transition-all cursor-default"
                        style={{ background: "rgba(6,18,42,0.6)", border: "1px solid rgba(26,111,255,0.08)" }}>
                        <div className="flex items-center gap-4">
                          <span className="font-display-xl text-lg font-black italic w-4 text-center"
                            style={{ color: idx===0?"#fbbf24":idx===1?"#94a3b8":idx===2?"#b45309":"#334155" }}>{idx+1}</span>
                          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center font-roboto font-bold text-sm"
                            style={{ border: `1px solid ${idx===0?"rgba(251,191,36,0.3)":"rgba(26,111,255,0.15)"}`, background: "#060f20", boxShadow: idx===0?"0 0 12px rgba(251,191,36,0.12)":"none" }}>
                            {user.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover"/> : user.name.slice(0,2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-roboto font-bold text-xs text-white max-w-[100px] truncate">{user.name}</div>
                            <div className="font-inter text-[9px] mt-0.5 uppercase tracking-wider" style={{ color: "#334155" }}>{user.role || "Forecaster"}</div>
                          </div>
                        </div>
                        <div className="font-display-xl text-base font-black" style={{ color: "#4da3ff" }}>
                          {isAccuracy ? user.fifaPoints || 0 : user.votesCount || 0}
                        </div>
                      </motion.div>
                    ))}
                    {currentLeaderboard.length === 0 && (
                      <div className="text-center py-10 font-roboto italic text-xs" style={{ color: "#334155" }}>No records available.</div>
                    )}
                  </motion.div>

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={() => { const el = document.getElementById("ranks-panel"); if (el) el.scrollIntoView({ behavior: "smooth" }); setActiveTab("leaderboard"); }}
                    className="w-full py-3.5 rounded-xl font-inter text-[9px] font-semibold uppercase tracking-widest transition duration-300 flex items-center justify-center gap-2"
                    style={{ border: "1px solid rgba(26,111,255,0.2)", color: "#4da3ff" }}>
                    <span className="material-symbols-outlined text-sm">leaderboard</span>
                    VIEW FULL LEADERBOARD
                  </motion.button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            RANKINGS & FIXTURES PANEL
        ═══════════════════════════════════════ */}
        <section className="py-24 px-4 md:px-12 relative" id="ranks-panel"
          style={{ background: "linear-gradient(180deg, #060f20 0%, #040d1a 100%)" }}>
          <div className="max-w-5xl mx-auto space-y-12">

            <ScrollReveal>
              <div className="flex justify-center">
                <div className="flex p-1 gap-1 rounded-2xl" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(26,111,255,0.12)" }}>
                  {["leaderboard","matches"].map(tab => (
                    <motion.button key={tab} type="button" onClick={() => setActiveTab(tab)} whileTap={{ scale: 0.96 }}
                      className="relative px-6 py-2.5 rounded-xl font-inter text-[10px] font-bold uppercase tracking-wider transition-all"
                      style={{ color: activeTab === tab ? "#7eb8ff" : "#475569" }}>
                      {activeTab === tab && (
                        <motion.div layoutId="tab-pill" className="absolute inset-0 rounded-xl" transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          style={{ background: "rgba(26,111,255,0.18)", border: "1px solid rgba(26,111,255,0.25)" }}/>
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">{tab === "leaderboard" ? "leaderboard" : "calendar_month"}</span>
                        {tab === "leaderboard" ? "Rankings" : "Fixtures"}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <AnimatePresence mode="wait">
              {activeTab === "leaderboard" && (
                <motion.div key="lb" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} transition={{ duration:0.35 }}
                  className="glass-card rounded-[2rem] overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="font-inter text-[9px] uppercase tracking-widest"
                      style={{ background: "rgba(4,13,26,0.8)", color: "#475569", borderBottom: "1px solid rgba(26,111,255,0.1)" }}>
                      <tr>
                        <th className="p-5">Position</th>
                        <th className="p-5">Forecaster</th>
                        <th className="p-5">Tier</th>
                        <th className="p-5 text-right">{isAccuracy ? "Correct Predictions" : "Total Votes Cast"}</th>
                      </tr>
                    </thead>
                    <tbody className="font-roboto text-xs" style={{ borderTop: "1px solid rgba(26,111,255,0.06)" }}>
                      {currentLeaderboard.map((user, idx) => (
                        <motion.tr key={user._id || idx} initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ delay: idx*0.04 }}
                          className="transition" style={{ borderBottom: "1px solid rgba(26,111,255,0.04)" }}>
                          <td className="p-5 font-inter font-bold" style={{ color: "#334155" }}>#{idx+1}</td>
                          <td className="p-5">
                            <div className="font-bold text-white flex items-center gap-2">
                              {user.name}
                              {idx === 0 && <span className="px-1.5 py-0.5 rounded font-inter text-[7px] uppercase tracking-wider font-bold"
                                style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24" }}>Leader</span>}
                            </div>
                          </td>
                          <td className="p-5 font-inter uppercase tracking-wider" style={{ color: "#475569" }}>{user.role || "User"}</td>
                          <td className="p-5 text-right font-inter font-bold" style={{ color: "#4da3ff" }}>
                            {isAccuracy ? user.fifaPoints || 0 : user.votesCount || 0}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}

              {activeTab === "matches" && (
                <motion.div key="matches" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} transition={{ duration:0.35 }}
                  className="space-y-4 max-w-4xl mx-auto">
                  {matches.map((match, i) => {
                    const isHero = heroMatch && heroMatch._id === match._id;
                    const hasPred = getExistingPrediction(match._id);
                    return (
                      <motion.div key={match._id}
                        initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.05 }}
                        whileHover={{ y:-2 }}
                        onClick={() => handleSelectMatch(match)}
                        className="p-4 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 cursor-pointer transition duration-300"
                        style={{ background: "rgba(6,18,42,0.6)", border: `1px solid ${isHero ? "rgba(26,111,255,0.4)" : "rgba(26,111,255,0.1)"}`, boxShadow: isHero ? "0 0 20px rgba(26,111,255,0.08)" : "none" }}>
                        <div className="min-w-[120px] text-center md:text-left md:pr-4 flex flex-col" style={{ borderRight: "1px solid rgba(26,111,255,0.08)" }}>
                          <span className="font-roboto text-sm font-bold text-white">{match.kickoffTime}</span>
                          <span className="font-inter text-[9px] mt-0.5" style={{ color: "#4da3ff" }}>{new Date(match.date).toLocaleDateString([],{month:"short",day:"numeric"})}</span>
                        </div>
                        <div className="flex-1 flex items-center justify-center md:justify-start gap-6 w-full">
                          <div className="flex items-center gap-2.5 justify-end flex-1 md:flex-initial min-w-[110px]">
                            <span className="font-roboto font-bold text-xs text-white uppercase truncate max-w-[90px]">{match.teamA}</span>
                            <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center p-0.5"
                              style={{ border: "1px solid rgba(26,111,255,0.2)", background: "rgba(0,0,0,0.3)" }}>
                              {match.teamACrest ? <img src={match.teamACrest} alt="" className="w-full h-full object-cover"/> : <span className="font-inter text-[9px] text-white/50">{match.teamA.slice(0,3).toUpperCase()}</span>}
                            </div>
                          </div>
                          <div className="font-inter font-black italic text-xs px-2.5 py-1 rounded-lg text-center min-w-[50px]"
                            style={{ background: "rgba(6,18,42,0.8)", border: "1px solid rgba(26,111,255,0.12)" }}>
                            {match.status === "Live" || match.status === "Completed" ? (
                              <span style={{ color: "#fbbf24" }}>{match.scores?.home ?? 0} - {match.scores?.away ?? 0}</span>
                            ) : (
                              <span style={{ color: "rgba(255,255,255,0.15)" }}>VS</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2.5 justify-start flex-1 md:flex-initial min-w-[110px]">
                            <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center p-0.5"
                              style={{ border: "1px solid rgba(26,111,255,0.2)", background: "rgba(0,0,0,0.3)" }}>
                              {match.teamBCrest ? <img src={match.teamBCrest} alt="" className="w-full h-full object-cover"/> : <span className="font-inter text-[9px] text-white/50">{match.teamB.slice(0,3).toUpperCase()}</span>}
                            </div>
                            <span className="font-roboto font-bold text-xs text-white uppercase truncate max-w-[90px]">{match.teamB}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 justify-end min-w-[150px]">
                          {hasPred && <span className="px-2 py-0.5 rounded-md font-inter text-[8px] uppercase tracking-wider font-semibold" style={{ background: "rgba(42,229,0,0.08)", border: "1px solid rgba(42,229,0,0.2)", color: "#2ae500" }}>Voted</span>}
                          {match.status === "Live" ? (
                            <motion.span animate={{ opacity:[1,0.5,1] }} transition={{ repeat:Infinity, duration:1.5 }}
                              className="px-2 py-0.5 rounded-md font-inter text-[8px] uppercase tracking-wider font-bold"
                              style={{ background: "rgba(42,229,0,0.12)", color: "#2ae500" }}>Live</motion.span>
                          ) : match.status === "Completed" ? (
                            <span className="px-2 py-0.5 rounded-md font-inter text-[8px] uppercase tracking-wider" style={{ background: "rgba(255,255,255,0.04)", color: "#475569" }}>Ended</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md font-inter text-[8px] uppercase tracking-wider font-semibold" style={{ background: "rgba(26,111,255,0.1)", border: "1px solid rgba(26,111,255,0.25)", color: "#4da3ff" }}>Timed</span>
                          )}
                          <span className="material-symbols-outlined text-sm" style={{ color: "#334155" }}>chevron_right</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Mobile HUD Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 rounded-t-2xl"
        style={{ background: "rgba(4,13,26,0.95)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(26,111,255,0.15)", boxShadow: "0 -4px 24px rgba(0,0,0,0.6)" }}>
        {[
          { href: "#predict", icon: "sports_soccer", label: "Predict", active: true },
          { onClick: () => { const el = document.getElementById("ranks-panel"); if (el) el.scrollIntoView({ behavior: "smooth" }); setActiveTab("leaderboard"); }, icon: "leaderboard", label: "Rankings" },
          { onClick: () => { const el = document.getElementById("ranks-panel"); if (el) el.scrollIntoView({ behavior: "smooth" }); setActiveTab("matches"); }, icon: "calendar_month", label: "Schedule" },
          { href: "/profile", icon: "person", label: "Profile" },
        ].map((item, i) => {
          const Comp = item.href ? "a" : "button";
          return (
            <motion.div key={i} whileTap={{ scale: 0.88 }}>
              <Comp href={item.href} onClick={item.onClick}
                className="flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors"
                style={{ color: item.active ? "#4da3ff" : "#475569" }}>
                <span className="material-symbols-outlined text-xl" style={item.active ? { fontVariationSettings: '"FILL" 1' } : {}}>{item.icon}</span>
                <span className="font-inter text-[8px] tracking-wider uppercase font-semibold">{item.label}</span>
              </Comp>
            </motion.div>
          );
        })}
      </nav>
    </div>
  );
}
