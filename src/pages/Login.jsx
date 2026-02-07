// // // import React, { useState } from "react";
// // // import { useNavigate, useLocation, Link } from "react-router-dom";
// // // import { BASE_URL } from "../../utils/urls";
// // // import { setUserData } from "../../utils/authUtils";

// // // export const Login = () => {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState("");
// // //   const [success, setSuccess] = useState("");

// // //   const [form, setForm] = useState({
// // //     email: "",
// // //     password: "",
// // //   });

// // //   const handleChange = (e) =>
// // //     setForm({ ...form, [e.target.name]: e.target.value });

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     setSuccess("");

// // //     try {
// // //       setLoading(true);

// // //       if (!form.email || !form.password) {
// // //         throw new Error("Email and password are required");
// // //       }

// // //       const response = await fetch(`${BASE_URL}/user/login`, {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify({
// // //           email: form.email,
// // //           password: form.password,
// // //         }),
// // //         credentials: "include",
// // //       });

// // //       const data = await response.json();

// // //       if (!response.ok) {
// // //         throw new Error(data.message || "Login failed");
// // //       }

// // //       console.log("Response from backend:", data);
// // //       console.log("User object:", data.user);

// // //       // if (data.user) {
// // //       //   setUserData(data.user);
// // //       // }
// // //       if (data.user) {
// // //         setUserData(data.user);
// // //         localStorage.setItem('user', JSON.stringify(data.user));

// // //         // ✅ Store token if provided in response
// // //         if (data.token) {
// // //           localStorage.setItem('token', data.token);
// // //         }
// // //       }
// // //       setSuccess("Login successful ✅");
// // //       window.dispatchEvent(new Event("authChange"));

// // //       // ✅ Get the page user came from
// // //       const queryParams = new URLSearchParams(location.search);
// // //       const redirectParam = queryParams.get("redirect");
// // //       const from = location.state?.from?.pathname || redirectParam || "/";

// // //       setTimeout(() => {
// // //         if (data.user?.isEmployee && !data.user?.isVerified) {
// // //           console.log("Employee not verified – navigating to verification");
// // //           navigate("/verify-employee");
// // //         } else {
// // //           // ✅ Redirect to previous page
// // //           console.log(`Redirecting to previous page: ${from}`);
// // //           navigate(from, { replace: true });
// // //         }
// // //       }, 1000);
// // //     } catch (err) {
// // //       setError(err.message || "Something went wrong");
// // //       setForm((prev) => ({ ...prev, password: "" }));
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="relative min-h-screen bg-black text-white overflow-hidden">
// // //       {/* Background Glow */}
// // //       <div
// // //         className="absolute inset-0 z-0"
// // //         style={{
// // //           backgroundImage:
// // //             "radial-gradient(circle at 75% 0%, rgba(255, 0, 0, 0.15) 0%, transparent 50%)",
// // //         }}
// // //       />

// // //       {/* Floating Dots */}
// // //       <div className="absolute inset-0 pointer-events-none">
// // //         <div
// // //           className="absolute w-5 h-5 bg-red-500 rounded-full opacity-20 animate-float"
// // //           style={{ top: "10%", left: "10%" }}
// // //         />
// // //         <div
// // //           className="absolute w-4 h-4 bg-red-500 rounded-full opacity-15 animate-float"
// // //           style={{ top: "80%", left: "85%", animationDelay: "1s" }}
// // //         />
// // //       </div>

// // //       {/* Content */}
// // //       <div className="relative z-10">
// // //         <div className="flex items-center justify-center pt-20 pb-10">
// // //           <div className="text-center">
// // //             <h1 className="text-3xl md:text-4xl font-bold mb-2">LOGIN</h1>
// // //             <img src="/assets/logo.webp" alt="Logo" className="mx-auto w-40" />
// // //           </div>
// // //         </div>

// // //         <form onSubmit={handleSubmit} className="max-w-xl mx-auto px-4 pb-24">
// // //           <div className="relative bg-neutral-950/80 backdrop-blur-xl rounded-3xl p-8 space-y-6 shadow-2xl ring-1 ring-red-900/30">
// // //             {/* Animated Border */}
// // //             <div className="absolute inset-0 rounded-3xl p-[2px] pointer-events-none overflow-hidden">
// // //               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-red-600 to-transparent animate-slideRight bg-[length:200%_100%]" />
// // //               <div className="absolute inset-[2px] rounded-3xl bg-neutral-950/80" />
// // //             </div>

// // //             <div className="relative z-10 space-y-5">
// // //               {error && (
// // //                 <div className="p-4 bg-red-950/30 border border-red-700/50 rounded-lg text-center text-red-400">
// // //                   {error}
// // //                 </div>
// // //               )}
// // //               {success && (
// // //                 <div className="p-4 bg-green-950/30 border border-green-700/50 rounded-lg text-center text-green-400">
// // //                   {success}
// // //                 </div>
// // //               )}

// // //               <div>
// // //                 <label className="block mb-2 text-sm text-gray-400">
// // //                   Email <span className="text-red-500">*</span>
// // //                 </label>
// // //                 <input
// // //                   type="email"
// // //                   name="email"
// // //                   value={form.email}
// // //                   onChange={handleChange}
// // //                   className="w-full p-3 rounded-lg bg-black text-white border border-red-900/30 focus:border-red-500 focus:outline-none focus:shadow-lg focus:shadow-red-900/20 transition"
// // //                   required
// // //                 />
// // //               </div>

// // //               <div>
// // //                 <label className="block mb-2 text-sm text-gray-400">
// // //                   Password <span className="text-red-500">*</span>
// // //                 </label>
// // //                 <input
// // //                   type="password"
// // //                   name="password"
// // //                   value={form.password}
// // //                   onChange={handleChange}
// // //                   className="w-full p-3 rounded-lg bg-black text-white border border-red-900/30 focus:border-red-500 focus:outline-none focus:shadow-lg focus:shadow-red-900/20 transition"
// // //                   required
// // //                 />
// // //               </div>

// // //               <button
// // //                 type="submit"
// // //                 disabled={loading}
// // //                 className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-semibold text-lg shadow-lg hover:shadow-red-900/40 transition disabled:opacity-50"
// // //               >
// // //                 {loading ? "Signing in..." : "Sign In"}
// // //               </button>

// // //               <p className="text-center text-sm text-gray-400">
// // //                 Don't have an account?{" "}
// // //                 <Link
// // //                   to={"/user-register" + location.search}
// // //                   state={location.state}
// // //                   className="text-red-500 hover:underline"
// // //                 >
// // //                   Create Account
// // //                 </Link>
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </form>
// // //       </div>

// // //       {/* Animations */}
// // //       <style>{`
// // //         @keyframes float {
// // //           0%, 100% { transform: translateY(0); }
// // //           50% { transform: translateY(-15px); }
// // //         }
// // //         @keyframes slideRight {
// // //           0% { background-position: -200% 0; }
// // //           100% { background-position: 200% 0; }
// // //         }
// // //         .animate-float { animation: float 3s ease-in-out infinite; }
// // //         .animate-slideRight { animation: slideRight 3s linear infinite; }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // import React, { useState } from "react";
// // import { useNavigate, useLocation, Link } from "react-router-dom";
// // import { BASE_URL } from "../../utils/urls";
// // import { setUserData } from "../../utils/authUtils";
// // import { Mail, Lock } from "lucide-react";

// // export const Login = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");

// //   const [form, setForm] = useState({
// //     email: "",
// //     password: "",
// //   });

// //   const handleChange = (e) =>
// //     setForm({ ...form, [e.target.name]: e.target.value });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setSuccess("");

// //     try {
// //       setLoading(true);

// //       if (!form.email || !form.password) {
// //         throw new Error("Email and password are required");
// //       }

// //       const response = await fetch(`${BASE_URL}/user/login`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           email: form.email,
// //           password: form.password,
// //         }),
// //         credentials: "include",
// //       });

// //       const data = await response.json();

// //       if (!response.ok) {
// //         throw new Error(data.message || "Login failed");
// //       }

// //       console.log("Response from backend:", data);
// //       console.log("User object:", data.user);

// //       if (data.user) {
// //         setUserData(data.user);
// //         localStorage.setItem('user', JSON.stringify(data.user));

// //         if (data.token) {
// //           localStorage.setItem('token', data.token);
// //         }
// //       }
// //       setSuccess("Login successful ✅");
// //       window.dispatchEvent(new Event("authChange"));

// //       const queryParams = new URLSearchParams(location.search);
// //       const redirectParam = queryParams.get("redirect");
// //       const from = location.state?.from?.pathname || redirectParam || "/";

// //       setTimeout(() => {
// //         if (data.user?.isEmployee && !data.user?.isVerified) {
// //           console.log("Employee not verified – navigating to verification");
// //           navigate("/verify-employee");
// //         } else {
// //           console.log(`Redirecting to previous page: ${from}`);
// //           navigate(from, { replace: true });
// //         }
// //       }, 1000);
// //     } catch (err) {
// //       setError(err.message || "Something went wrong");
// //       setForm((prev) => ({ ...prev, password: "" }));
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex bg-white overflow-hidden">
// //       {/* Left Side - Red Gradient with Diagonal Stripe Pattern */}
// //       <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-red-400 via-red-300 to-red-100 relative overflow-hidden items-center justify-center">
// //         {/* Diagonal Stripe Pattern */}
// //         <div className="absolute inset-0 opacity-20">
// //           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
// //             <defs>
// //               <pattern id="diagonalStripe" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
// //                 <line x1="0" y1="0" x2="0" y2="60" stroke="#ffffff" strokeWidth="20" />
// //               </pattern>
// //             </defs>
// //             <rect width="100%" height="100%" fill="url(#diagonalStripe)" />
// //           </svg>
// //         </div>

// //         {/* Decorative Shapes */}
// //         <div className="absolute top-0 left-0 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
// //         <div className="absolute top-0 right-0 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
// //         <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

// //         {/* Left Side Text */}
// //         <div className="relative z-10 text-center">
// //           <h2 className="text-5xl font-bold text-white mb-4">LOGIN</h2>
// //           <p className="text-2xl font-semibold text-white opacity-90">SIGN IN</p>
// //         </div>
// //       </div>

// //       {/* Right Side - Login Form */}
// //       <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
// //         <div className="w-full max-w-md">
// //           {/* Logo & Title */}
// //           <div className="text-center mb-8 lg:hidden">
// //             <h1 className="text-3xl font-bold text-red-500 mb-2">LOGIN</h1>
// //             <img src="/assets/logo.webp" alt="Logo" className="mx-auto w-32" />
// //           </div>

// //           {/* Form Container */}
// //           <form onSubmit={handleSubmit} className="space-y-6">
// //             {error && (
// //               <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-sm">
// //                 {error}
// //               </div>
// //             )}
// //             {success && (
// //               <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded text-green-700 text-sm">
// //                 {success}
// //               </div>
// //             )}

// //             {/* Email Input */}
// //             <div>
// //               <div className="flex items-center gap-3 pb-2 border-b-2 border-gray-300 focus-within:border-red-500 transition-colors">
// //                 <Mail size={20} className="text-gray-400" />
// //                 <input
// //                   type="email"
// //                   name="email"
// //                   placeholder="Email"
// //                   value={form.email}
// //                   onChange={handleChange}
// //                   className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             {/* Password Input */}
// //             <div>
// //               <div className="flex items-center gap-3 pb-2 border-b-2 border-gray-300 focus-within:border-red-500 transition-colors">
// //                 <Lock size={20} className="text-gray-400" />
// //                 <input
// //                   type="password"
// //                   name="password"
// //                   placeholder="Password"
// //                   value={form.password}
// //                   onChange={handleChange}
// //                   className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             {/* Forgot Password */}
// //             <div className="text-right">
// //               <Link to="/forgot-password" className="text-red-400 text-sm hover:text-red-500 transition">
// //                 Forgot Password?
// //               </Link>
// //             </div>

// //             {/* Login Button */}
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="w-full py-3 rounded-full bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold text-lg shadow-lg hover:shadow-red-300/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
// //             >
// //               {loading ? "Signing in..." : "LOGIN"}
// //             </button>

// //             {/* Signup Link */}
// //             <p className="text-center text-gray-600 text-sm">
// //               Don't have an account?{" "}
// //               <Link
// //                 to={"/user-register" + location.search}
// //                 state={location.state}
// //                 className="text-red-500 hover:text-red-600 font-semibold"
// //               >
// //                 Create Account
// //               </Link>
// //             </p>

// //             {/* Social Login Divider */}
// //             <div className="relative my-8">
// //               <div className="absolute inset-0 flex items-center">
// //                 <div className="w-full border-t border-gray-300" />
// //               </div>
// //               <div className="relative flex justify-center text-sm">
// //                 <span className="px-4 bg-white text-gray-500">Or Login with</span>
// //               </div>
// //             </div>

// //             {/* Social Buttons */}
// //             <div className="flex gap-4 justify-center">
// //               <button
// //                 type="button"
// //                 className="flex items-center justify-center gap-2 px-6 py-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition text-gray-700 font-medium"
// //               >
// //                 <svg className="w-5 h-5" viewBox="0 0 24 24">
// //                   <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
// //                   <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
// //                   <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
// //                   <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
// //                 </svg>
// //                 Google
// //               </button>
// //               <button
// //                 type="button"
// //                 className="flex items-center justify-center gap-2 px-6 py-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition text-gray-700 font-medium"
// //               >
// //                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
// //                   <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
// //                 </svg>
// //                 Facebook
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>

// //       {/* Animations */}
// //       <style>{`
// //         @keyframes blob {
// //           0%, 100% {
// //             transform: translate(0, 0) scale(1);
// //           }
// //           33% {
// //             transform: translate(30px, -50px) scale(1.1);
// //           }
// //           66% {
// //             transform: translate(-20px, 20px) scale(0.9);
// //           }
// //         }
// //         .animate-blob {
// //           animation: blob 7s infinite;
// //         }
// //         .animation-delay-2000 {
// //           animation-delay: 2s;
// //         }
// //         .animation-delay-4000 {
// //           animation-delay: 4s;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// import React, { useState, useRef } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { BASE_URL } from "../../utils/urls";
// import { setUserData } from "../../utils/authUtils";
// import { Mail, Lock, ArrowRight } from "lucide-react";

// export const Login = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [step, setStep] = useState("email"); // "email" or "password"
//   const passwordInputRef = useRef(null);

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleEmailKeyPress = (e) => {
//     if (e.key === "Enter" && form.email.trim()) {
//       e.preventDefault();
//       setStep("password");
//       setTimeout(() => passwordInputRef.current?.focus(), 100);
//     }
//   };

//   const handlePasswordKeyPress = (e) => {
//     if (e.key === "Enter" && form.password.trim()) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       setLoading(true);

//       if (!form.email || !form.password) {
//         throw new Error("Email and password are required");
//       }

//       const response = await fetch(`${BASE_URL}/user/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: form.email,
//           password: form.password,
//         }),
//         credentials: "include",
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       console.log("Response from backend:", data);
//       console.log("User object:", data.user);

//       if (data.user) {
//         setUserData(data.user);
//         localStorage.setItem('user', JSON.stringify(data.user));

//         if (data.token) {
//           localStorage.setItem('token', data.token);
//         }
//       }
//       setSuccess("Login successful ✅");
//       window.dispatchEvent(new Event("authChange"));

//       const queryParams = new URLSearchParams(location.search);
//       const redirectParam = queryParams.get("redirect");
//       const from = location.state?.from?.pathname || redirectParam || "/";

//       setTimeout(() => {
//         if (data.user?.isEmployee && !data.user?.isVerified) {
//           console.log("Employee not verified – navigating to verification");
//           navigate("/verify-employee");
//         } else {
//           console.log(`Redirecting to previous page: ${from}`);
//           navigate(from, { replace: true });
//         }
//       }, 1000);
//     } catch (err) {
//       setError(err.message || "Something went wrong");
//       setForm((prev) => ({ ...prev, password: "" }));
//       setStep("email");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-white overflow-hidden">
//       {/* Left Side - Red Gradient with Diagonal Stripe Pattern */}
//       <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-red-400 via-red-300 to-red-100 relative overflow-hidden items-center justify-center">
//         {/* Diagonal Stripe Pattern */}
//         <div className="absolute inset-0 opacity-20">
//           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <pattern id="diagonalStripe" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
//                 <line x1="0" y1="0" x2="0" y2="60" stroke="#ffffff" strokeWidth="20" />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#diagonalStripe)" />
//           </svg>
//         </div>

//         {/* Decorative Shapes */}
//         <div className="absolute top-0 left-0 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
//         <div className="absolute top-0 right-0 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
//         <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

//         {/* Left Side Text */}
//         <div className="relative z-10 text-center">
//           <h2 className="text-5xl font-bold text-white mb-4">LOGIN</h2>
//           <p className="text-2xl font-semibold text-white opacity-90">SIGN IN</p>
//         </div>
//       </div>

//       {/* Right Side - Login Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
//         <div className="w-full max-w-md">
//           {/* Social Bureau Header */}
//           <div className="mb-8 text-center">
//             <h1 className="text-4xl font-bold text-red-500 mb-2">LOGIN</h1>
//           <span className="font-bold">Social
//             <span className="text-red-500">B
//             </span>ureau
//           </span>
//         </div>

//           {/* Form Container */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && (
//               <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-sm animate-pulse">
//                 {error}
//               </div>
//             )}
//             {success && (
//               <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded text-green-700 text-sm animate-pulse">
//                 {success}
//               </div>
//             )}

//             {/* Email Input - Shows when step is "email" */}
//             {step === "email" && (
//               <div className="animate-fadeIn">
//                 <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-300 focus-within:border-red-500 transition-all duration-300">
//                   <Mail size={24} className="text-gray-400" />
//                   <input
//                     autoFocus
//                     type="email"
//                     name="email"
//                     placeholder="Enter your email"
//                     value={form.email}
//                     onChange={handleChange}
//                     onKeyPress={handleEmailKeyPress}
//                     className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-lg"
//                     required
//                   />
//                 </div>
//                 <p className="text-xs text-gray-400 mt-2">Press Enter to continue</p>
//               </div>
//             )}

//             {/* Password Input - Shows when step is "password" */}
//             {step === "password" && (
//               <div className="space-y-4 animate-fadeIn">
//                 {/* Display submitted email as read-only */}
//                 <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-300 bg-gray-50 px-3 py-2 rounded">
//                   <Mail size={20} className="text-gray-400" />
//                   <input
//                     type="email"
//                     disabled
//                     value={form.email}
//                     className="flex-1 bg-transparent text-gray-600 text-sm focus:outline-none"
//                   />
//                 </div>

//                 {/* Password Input */}
//                 <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-300 focus-within:border-red-500 transition-all duration-300">
//                   <Lock size={24} className="text-gray-400" />
//                   <input
//                     ref={passwordInputRef}
//                     type="password"
//                     name="password"
//                     placeholder="Enter your password"
//                     value={form.password}
//                     onChange={handleChange}
//                     onKeyPress={handlePasswordKeyPress}
//                     className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-lg"
//                     required
//                   />
//                 </div>
//                 <p className="text-xs text-gray-400">Press Enter to login</p>

//                 {/* Back Button */}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setStep("email");
//                     setError("");
//                   }}
//                   className="text-sm text-red-500 hover:text-red-600 transition"
//                 >
//                   ← Back to email
//                 </button>
//               </div>
//             )}

//             {/* Forgot Password - Show only on password step */}
//             {step === "password" && (
//               <div className="text-right">
//                 <Link to="/forgot-password" className="text-red-400 text-sm hover:text-red-500 transition">
//                   Forgot Password?
//                 </Link>
//               </div>
//             )}

//             {/* Login Button - Only show on password step */}
//             {step === "password" && (
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3 rounded-full bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold text-lg shadow-lg hover:shadow-red-300/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {loading ? "Signing in..." : (
//                   <>
//                     LOGIN
//                     <ArrowRight size={20} />
//                   </>
//                 )}
//               </button>
//             )}

//             {/* Signup Link */}
//             <p className="text-center text-gray-600 text-sm">
//               Don't have an account?{" "}
//               <Link
//                 to={"/user-register" + location.search}
//                 state={location.state}
//                 className="text-red-500 hover:text-red-600 font-semibold"
//               >
//                 Create Account
//               </Link>
//             </p>

//             {/* Social Login Divider - Show only on password step */}
//             {step === "password" && (
//               <>
//                 <div className="relative my-8">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-gray-300" />
//                   </div>
//                   <div className="relative flex justify-center text-sm">
//                     <span className="px-4 bg-white text-gray-500">Or Login with</span>
//                   </div>
//                 </div>

//                 {/* Social Buttons */}
//                 <div className="flex gap-4 justify-center">
//                   <button
//                     type="button"
//                     className="flex items-center justify-center gap-2 px-6 py-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition text-gray-700 font-medium"
//                   >
//                     <svg className="w-5 h-5" viewBox="0 0 24 24">
//                       <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                       <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                       <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                       <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                     </svg>
//                     Google
//                   </button>
//                   <button
//                     type="button"
//                     className="flex items-center justify-center gap-2 px-6 py-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition text-gray-700 font-medium"
//                   >
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                     </svg>
//                     Facebook
//                   </button>
//                 </div>
//               </>
//             )}
//           </form>
//         </div>
//       </div>

//       {/* Animations */}
//       <style>{`
//         @keyframes blob {
//           0%, 100% {
//             transform: translate(0, 0) scale(1);
//           }
//           33% {
//             transform: translate(30px, -50px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.4s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

import React, { useState, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { BASE_URL } from "../../utils/urls";
import { setUserData } from "../../utils/authUtils";
import { Mail, Lock, ArrowRight } from "lucide-react";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState("email"); // "email" or "password"
  const passwordInputRef = useRef(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleEmailKeyPress = (e) => {
    if (e.key === "Enter" && form.email.trim()) {
      e.preventDefault();
      setStep("password");
      setTimeout(() => passwordInputRef.current?.focus(), 100);
    }
  };

  const handlePasswordKeyPress = (e) => {
    if (e.key === "Enter" && form.password.trim()) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      if (!form.email || !form.password) {
        throw new Error("Email and password are required");
      }

      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log("Response from backend:", data);
      console.log("User object:", data.user);

      if (data.user) {
        setUserData(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));

        if (data.token) {
          localStorage.setItem('token', data.token);
        }
      }
      setSuccess("Login successful ✅");
      window.dispatchEvent(new Event("authChange"));

      const queryParams = new URLSearchParams(location.search);
      const redirectParam = queryParams.get("redirect");
      const from = location.state?.from?.pathname || redirectParam || "/";

      setTimeout(() => {
        if (data.user?.isEmployee && !data.user?.isVerified) {
          console.log("Employee not verified – navigating to verification");
          navigate("/verify-employee");
        } else {
          console.log(`Redirecting to previous page: ${from}`);
          navigate(from, { replace: true });
        }
      }, 1000);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setForm((prev) => ({ ...prev, password: "" }));
      setStep("email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white overflow-hidden">
      {/* Left Side - Red Gradient with Diagonal Stripe Pattern */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-red-400 via-red-300 to-red-100 relative overflow-hidden items-center justify-center">
        {/* Diagonal Stripe Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="diagonalStripe" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
                <line x1="0" y1="0" x2="0" y2="60" stroke="#ffffff" strokeWidth="20" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonalStripe)" />
          </svg>
        </div>

        {/* Decorative Shapes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

        {/* Left Side Text */}
        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-bold text-white mb-4">LOGIN</h2>
          <p className="text-2xl font-semibold text-white opacity-90">SIGN IN</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Social Bureau Header */}
          <div className="mb-8 text-center">            <h1 className="text-4xl font-bold text-red-500 mb-2">LOGIN</h1>
           <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a>
          </div>

          {/* Form Container */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-sm animate-pulse">
                {error}
              </div>
            )}
            {success && (
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded text-green-700 text-sm animate-pulse">
                {success}
              </div>
            )}

            {/* Email Input - Shows when step is "email" */}
            {step === "email" && (
              <div className="animate-fadeIn">
                <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-300 focus-within:border-red-500 transition-all duration-300">
                  <Mail size={24} className="text-gray-400" />
                  <input
                    autoFocus
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    onKeyPress={handleEmailKeyPress}
                    className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-lg"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">Press Enter to continue</p>
              </div>
            )}

            {/* Password Input - Shows when step is "password" */}
            {step === "password" && (
              <div className="animate-fadeIn">
                <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-300 focus-within:border-red-500 transition-all duration-300">
                  <Lock size={24} className="text-gray-400" />
                  <input
                    ref={passwordInputRef}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    onKeyPress={handlePasswordKeyPress}
                    className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-lg"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">Press Enter to login</p>

                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setError("");
                  }}
                  className="text-sm text-red-500 hover:text-red-600 transition mt-3"
                >
                  ← Back to email
                </button>
              </div>
            )}

            {/* Login Button - Only show on password step */}
            {step === "password" && (
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold text-lg shadow-lg hover:shadow-red-300/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? "Signing in..." : (
                  <>
                    LOGIN
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            )}

            {/* Signup Link */}
            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to={"/user-register" + location.search}
                state={location.state}
                className="text-red-500 hover:text-red-600 font-semibold"
              >
                Create Account
              </Link>
            </p>

            {/* Social Login Divider - Show only on password step */}
            {step === "password" && (
              <>
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or Login with</span>
                  </div>
                </div>

                {/* Social Buttons */}
                <div className="flex gap-4 justify-center">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 px-6 py-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition text-gray-700 font-medium"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 px-6 py-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition text-gray-700 font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};