// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Mail, Lock, User, Phone, ArrowLeft, Eye, EyeOff, CheckCircle2, AlertCircle, ChevronRight, Sparkles } from "lucide-react";
// import { BASE_URL } from "../../utils/urls";
// import { setUserData } from "../../utils/authUtils";
// import { registerUserAPI } from "../../services/userServices";

// export const AuthPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isLogin, setIsLogin] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [step, setStep] = useState(0);
//   const [showPassword, setShowPassword] = useState(false);
//   const [direction, setDirection] = useState(0); // For 3D flip direction

//   const [loginForm, setLoginForm] = useState({ email: "", password: "" });
//   const [signupForm, setSignupForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const signupFields = [
//     { name: "name", label: "What's your name?", placeholder: "John Doe", icon: User, type: "text" },
//     { name: "email", label: "What's your email?", placeholder: "john@example.com", icon: Mail, type: "email" },
//     { name: "phone", label: "Your phone number?", placeholder: "1234567890", icon: Phone, type: "tel" },
//     { name: "password", label: "Create a password", placeholder: "••••••••", icon: Lock, type: "password" },
//     { name: "confirmPassword", label: "Confirm password", placeholder: "••••••••", icon: Lock, type: "password" },
//   ];

//   const loginFields = [
//     { name: "email", label: "Welcome back!", placeholder: "Your email address", icon: Mail, type: "email" },
//     { name: "password", label: "Security Key", placeholder: "Your password", icon: Lock, type: "password" },
//   ];

//   const currentFields = isLogin ? loginFields : signupFields;
//   const currentField = currentFields[step];

//   // --- 3D PAGE TURN ANIMATION VARIANTS ---
//   const pageFlipVariants = {
//     enter: (direction) => ({
//       rotateY: direction > 0 ? 90 : -90,
//       opacity: 0,
//       x: direction > 0 ? '50%' : '-50%',
//       scale: 0.8,
//       filter: "blur(5px)",
//     }),
//     center: {
//       rotateY: 0,
//       opacity: 1,
//       x: 0,
//       scale: 1,
//       filter: "blur(0px)",
//       transition: {
//         duration: 0.7,
//         ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for smooth book turn
//         opacity: { duration: 0.3 }
//       }
//     },
//     exit: (direction) => ({
//       rotateY: direction < 0 ? 90 : -90,
//       opacity: 0,
//       x: direction < 0 ? '50%' : '-50%',
//       scale: 0.8,
//       filter: "blur(5px)",
//       transition: {
//         duration: 0.5,
//         ease: [0.7, 0, 0.84, 0]
//       }
//     })
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (isLogin) {
//       setLoginForm(prev => ({ ...prev, [name]: value }));
//     } else {
//       setSignupForm(prev => ({ ...prev, [name]: value }));
//     }
//     setError("");
//   };

//   const validateCurrentField = () => {
//     const value = isLogin ? loginForm[currentField.name] : signupForm[currentField.name];
//     if (!value) {
//       setError(`${currentField.label.split(' ').pop().replace('?', '')} is required`);
//       return false;
//     }
//     if (currentField.name === "email" && !/\S+@\S+\.\S+/.test(value)) {
//       setError("Please enter a valid email");
//       return false;
//     }
//     if (currentField.name === "password" && value.length < 6) {
//       setError("Password must be at least 6 characters");
//       return false;
//     }
//     if (currentField.name === "confirmPassword" && value !== signupForm.password) {
//       setError("Passwords do not match");
//       return false;
//     }
//     return true;
//   };

//   const nextStep = () => {
//     if (!validateCurrentField()) return;
//     if (step < currentFields.length - 1) {
//       setDirection(1);
//       setStep(s => s + 1);
//       setError("");
//     } else {
//       isLogin ? handleLogin() : handleSignup();
//     }
//   };

//   const prevStep = () => {
//     if (step > 0) {
//       setDirection(-1);
//       setStep(s => s - 1);
//       setError("");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       nextStep();
//     }
//   };

//   const handleLogin = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await fetch(`${BASE_URL}/user/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(loginForm),
//         credentials: "include",
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Login failed");
//       if (data.user) {
//         setUserData(data.user);
//         localStorage.setItem('user', JSON.stringify(data.user));
//         if (data.token) localStorage.setItem('token', data.token);
//       }
//       setSuccess("Welcome back! ✨");
//       window.dispatchEvent(new Event("authChange"));
//       const queryParams = new URLSearchParams(location.search);
//       const redirectParam = queryParams.get("redirect");
//       const from = location.state?.from?.pathname || redirectParam || "/";
//       setTimeout(() => navigate(from, { replace: true }), 1500);
//     } catch (err) {
//       setError(err.message);
//       setDirection(-1);
//       setStep(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignup = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       await registerUserAPI({ ...signupForm, role: "user" });
//       setSuccess("Account secured! 🛡️");
//       setTimeout(() => {
//         setIsLogin(true);
//         setStep(0);
//         setLoginForm({ email: signupForm.email, password: "" });
//         setSuccess("");
//       }, 2000);
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleAuth = () => {
//     setDirection(isLogin ? 1 : -1);
//     setIsLogin(!isLogin);
//     setStep(0);
//     setError("");
//     setSuccess("");
//   };

//   return (
//     <div className="min-h-screen w-full bg-[#050510] flex items-center justify-center p-4 relative overflow-hidden selection:bg-cyan-500/30">
//       {/* Animated Aura Background */}
//       <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[160px] animate-pulse" />
//       <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] bg-cyan-600/10 rounded-full blur-[160px] animate-pulse delay-1000" />
//       <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] bg-violet-600/5 rounded-full blur-[120px] animate-bounce duration-[8s]" />

//       {/* High-End Branding Top */}
//       <motion.div
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="absolute top-8 left-8 hidden md:flex items-center gap-2"
//       >
//         <Sparkles className="text-cyan-400 w-5 h-5" />
//         <span className="text-white font-bold tracking-[0.2em] text-sm md:text-md uppercase opacity-80" style={{ fontFamily: "MyFont, sans-serif" }}>
//           SocialBureau <span className="text-indigo-500">Premium</span>
//         </span>
//       </motion.div>

//       <div className="w-full max-w-xl z-10 perspective-[2000px]">
//         {/* Main 3D Card Wrapper */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
//           animate={{ opacity: 1, scale: 1, rotateX: 0 }}
//           transition={{ duration: 1, ease: "backOut" }}
//           className="relative rounded-[3rem] bg-indigo-950/20 backdrop-blur-3xl border border-white/10 p-10 md:p-14 shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden"
//         >
//           {/* Subtle Shine Effect */}
//           <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />

//           <AnimatePresence mode="wait" custom={direction}>
//             {success ? (
//               <motion.div
//                 key="success"
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="flex flex-col items-center justify-center py-16 text-center"
//               >
//                 <div className="w-24 h-24 bg-cyan-500/10 rounded-3xl flex items-center justify-center mb-8 border border-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
//                   <CheckCircle2 className="w-12 h-12 text-cyan-400" />
//                 </div>
//                 <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">{success}</h2>
//                 <p className="text-indigo-200/60 font-medium">Entering secure workspace...</p>
//               </motion.div>
//             ) : (
//               <motion.div
//                 key={`${isLogin ? 'login' : 'signup'}-${step}`}
//                 custom={direction}
//                 variants={pageFlipVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 className="flex flex-col gap-10"
//                 style={{ transformStyle: 'preserve-3d' }}
//               >
//                 {/* Visual Header */}
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3">
//                     <div className="h-[2px] w-12 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
//                     <span className="text-cyan-400 text-xs font-black tracking-[0.3em] uppercase">
//                       {isLogin ? "Digital ID" : `Protocol Step 0${step + 1}`}
//                     </span>
//                   </div>
//                   <h2 className="text-4xl md:text-5xl font-bold text-white leading-none tracking-tighter">
//                     {currentField.label}
//                   </h2>
//                 </div>

//                 {/* Cyber Input Field */}
//                 <div className="relative group">
//                   <div className="absolute inset-0 bg-cyan-400/5 rounded-2xl blur-xl group-focus-within:bg-indigo-400/10 transition-all duration-500" />

//                   <div className="relative flex items-center gap-5 px-8 bg-black/40 border border-white/5 rounded-2xl h-20 focus-within:border-cyan-500/50 focus-within:ring-4 ring-cyan-500/10 transition-all duration-300">
//                     <currentField.icon className="w-7 h-7 text-indigo-400/60 group-focus-within:text-cyan-400 transition-colors" />

//                     <input
//                       autoFocus
//                       type={currentField.name === "password" || currentField.name === "confirmPassword" ? (showPassword ? "text" : "password") : currentField.type}
//                       name={currentField.name}
//                       placeholder={currentField.placeholder}
//                       value={isLogin ? loginForm[currentField.name] : signupForm[currentField.name]}
//                       onChange={handleInputChange}
//                       onKeyDown={handleKeyPress}
//                       autoComplete="off"
//                       className="flex-1 bg-transparent text-white text-2xl outline-none placeholder:text-gray-700 font-medium"
//                     />

//                     {(currentField.name === "password" || currentField.name === "confirmPassword") && (
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="p-3 bg-white/5 rounded-xl text-indigo-300 hover:text-cyan-400 transition-all"
//                       >
//                         {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {/* Animated Alerts */}
//                 <AnimatePresence>
//                   {error && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="flex items-center gap-3 px-6 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-semibold"
//                     >
//                       <AlertCircle size={18} />
//                       {error}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* High-Performance Action Controls */}
//                 <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
//                   <div className="flex gap-4">
//                     {step > 0 && (
//                       <button
//                         onClick={prevStep}
//                         className="h-16 w-16 rounded-2xl bg-white/5 text-white hover:bg-white/10 transition-all active:scale-90 flex items-center justify-center border border-white/5 group"
//                       >
//                         <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
//                       </button>
//                     )}
//                   </div>

//                   <button
//                     onClick={nextStep}
//                     disabled={loading}
//                     className="flex-1 max-w-[280px] h-16 group relative flex items-center justify-center gap-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg transition-all active:scale-[0.96] disabled:opacity-50 shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:shadow-indigo-500/40"
//                   >
//                     {loading ? (
//                       <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
//                     ) : (
//                       <>
//                         <span className="tracking-widest uppercase text-sm">
//                           {step === currentFields.length - 1 ? "Initialize" : "Confirm"}
//                         </span>
//                         <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Minimalist Progress Indicator */}
//           {!success && (
//             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
//               {currentFields.map((_, i) => (
//                 <motion.div
//                   key={i}
//                   className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-10 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'w-2 bg-white/10'}`}
//                 />
//               ))}
//             </div>
//           )}
//         </motion.div>

//         {/* Global Redirect Toggle */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1 }}
//           className="mt-12 text-center"
//         >
//           <button
//             onClick={toggleAuth}
//             className="group inline-flex items-center gap-4 text-indigo-300/60 transition-all hover:text-white"
//           >
//             <span className="text-sm font-bold tracking-[0.2em] uppercase">
//               {isLogin ? "No Secure Node?" : "Authorized Access?"}
//             </span>
//             <div className="px-5 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 group-hover:bg-indigo-500/20 transition-all group-hover:border-indigo-500/40 text-sm font-black text-cyan-400">
//               {isLogin ? "Generate Access" : "Portal Gate"}
//             </div>
//           </button>
//         </motion.div>
//       </div>

//       <style>{`
//         @font-face {
//           font-family: 'MyFont';
//           src: url('/assets/logo.otf') format('opentype');
//         }
//         .perspective-[2000px] {
//           perspective: 2000px;
//         }
//         input:-webkit-autofill,
//         input:-webkit-autofill:hover, 
//         input:-webkit-autofill:focus {
//           -webkit-text-fill-color: white;
//           -webkit-box-shadow: 0 0 0px 1000px transparent inset;
//           transition: background-color 5000s ease-in-out 0s;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AuthPage;



import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Phone, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { BASE_URL } from "../../utils/urls";
import { setUserData } from "../../utils/authUtils";
import { registerUserAPI } from "../../services/userServices";

export const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [direction, setDirection] = useState(0);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const signupFields = [
    { name: "name", label: "Full Name", placeholder: "John Doe", icon: User, type: "text" },
    { name: "email", label: "Email Address", placeholder: "name@example.com", icon: Mail, type: "email" },
    { name: "phone", label: "Phone Number", placeholder: "+1 (555) 123-4567", icon: Phone, type: "tel" },
    { name: "password", label: "Password", placeholder: "••••••••", icon: Lock, type: "password" },
    { name: "confirmPassword", label: "Confirm Password", placeholder: "••••••••", icon: Lock, type: "password" },
  ];

  const loginFields = [
    { name: "email", label: "Email Address", placeholder: "name@example.com", icon: Mail, type: "email" },
    { name: "password", label: "Password", placeholder: "••••••••", icon: Lock, type: "password" },
  ];

  const currentFields = isLogin ? loginFields : signupFields;
  const currentField = currentFields[step];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginForm(prev => ({ ...prev, [name]: value }));
    } else {
      setSignupForm(prev => ({ ...prev, [name]: value }));
    }
    setError("");
  };

  const validateCurrentField = () => {
    const value = isLogin ? loginForm[currentField.name] : signupForm[currentField.name];
    if (!value) {
      setError(`${currentField.label} is required`);
      return false;
    }
    if (currentField.name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      setError("Please enter a valid email");
      return false;
    }
    if (currentField.name === "password" && value.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (currentField.name === "confirmPassword" && value !== signupForm.password) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (!validateCurrentField()) return;
    if (step < currentFields.length - 1) {
      setDirection(1);
      setStep(s => s + 1);
      setError("");
    } else {
      isLogin ? handleLogin() : handleSignup();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(s => s - 1);
      setError("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextStep();
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");
      if (data.user) {
        setUserData(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.token) localStorage.setItem('token', data.token);
      }
      setSuccess("Welcome back");
      window.dispatchEvent(new Event("authChange"));
      const queryParams = new URLSearchParams(location.search);
      const redirectParam = queryParams.get("redirect");
      const from = location.state?.from?.pathname || redirectParam || "/";
      setTimeout(() => navigate(from, { replace: true }), 1500);
    } catch (err) {
      setError(err.message);
      setDirection(-1);
      setStep(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      await registerUserAPI({ ...signupForm, role: "user" });
      setSuccess("Account created");
      setTimeout(() => {
        setIsLogin(true);
        setStep(0);
        setLoginForm({ email: signupForm.email, password: "" });
        setSuccess("");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleAuth = () => {
    setIsLogin(!isLogin);
    setStep(0);
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Gradient Background - Subtle */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse duration-8000" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-4000 duration-8000" />
      </div>

      <div className="w-full max-w-2xl z-10">
        {/* Header - Apple TV Style */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="inline-block mb-8">
            <h1 className="text-6xl md:text-7xl font-black tracking-tight text-white">
              <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
                Social<span className="text-[#ff0000]">B</span>ureau
              </a>
            </h1>
            <p className="text-sm font-light text-gray-400 mt-3 tracking-widest uppercase">
              World’s First API-Driven Marketing Agency
            </p>
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/10 p-12 md:p-16 overflow-hidden"
        >
          {/* Subtle Corner Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl -mr-48 -mt-48" />

          <AnimatePresence mode="wait">
            {success ? (
              // Success State
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mb-8"
                >
                  <CheckCircle2 className="w-20 h-20 text-emerald-500" strokeWidth={1} />
                </motion.div>
                <h2 className="text-4xl font-light text-white mb-2">{success}</h2>
                <p className="text-gray-500 text-sm tracking-wide">Entering your account...</p>
              </motion.div>
            ) : (
              // Form State
              <motion.div
                key={`${isLogin ? 'login' : 'signup'}-${step}`}
                initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                {/* Form Header */}
                <div className="space-y-4">
                  <h2 className="text-5xl md:text-6xl font-light text-white tracking-tight">
                    {isLogin ? "Sign In" : "Create Account"}
                  </h2>
                  <p className="text-gray-500 text-lg font-light">
                    {currentField.label}
                  </p>
                </div>

                {/* Input Field - Apple Style */}
                <div className="space-y-4">
                  <div className="relative group">
                    <input
                      autoFocus
                      type={currentField.name === "password" || currentField.name === "confirmPassword" ? (showPassword ? "text" : "password") : currentField.type}
                      name={currentField.name}
                      placeholder={currentField.placeholder}
                      value={isLogin ? loginForm[currentField.name] : signupForm[currentField.name]}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyPress}
                      autoComplete="off"
                      className="w-full bg-white/[0.03] border-b border-white/10 px-0 py-5 text-white text-2xl font-light outline-none placeholder:text-gray-700 transition-all duration-300 focus:border-white/30 focus:bg-white/[0.05]"
                    />

                    {(currentField.name === "password" || currentField.name === "confirmPassword") && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff size={24} strokeWidth={1.5} /> : <Eye size={24} strokeWidth={1.5} />}
                      </button>
                    )}
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-1 pt-4">
                      {currentFields.map((_, i) => (
                        <motion.div
                          key={i}
                          className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-white/40' : 'bg-white/10'
                            }`}
                        />
                      ))}
                    </div>

                    {isLogin && step === 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-end"
                      >
                        <button
                          type="button"
                          onClick={() => navigate("/forgot-password")}
                          className="text-sm text-gray-500 hover:text-white transition-colors animate-pulse"
                        >
                          Forgot password?
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Error State */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl"
                    >
                      <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <p className="text-red-400 text-sm font-light">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Controls */}
                <div className="flex gap-4 pt-8">
                  {step > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={prevStep}
                      className="px-8 py-3 rounded-full border border-white/20 text-white hover:border-white/40 transition-all text-sm font-light"
                    >
                      Back
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextStep}
                    disabled={loading}
                    className="flex-1 py-4 px-8 rounded-full bg-white text-black font-semibold text-lg hover:bg-gray-100 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      <span>{step === currentFields.length - 1 ? "Complete" : "Continue"}</span>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Toggle Auth Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center flex flex-col items-center gap-4"
        >
          <p className="text-gray-500 text-sm font-light">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={toggleAuth}
            className="text-white text-sm font-semibold hover:text-gray-300 transition-colors"
          >
            {isLogin ? "Create Account" : "Sign In"}
          </button>
        </motion.div>
      </div>

      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: white;
          -webkit-box-shadow: 0 0 0px 1000px transparent inset;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;