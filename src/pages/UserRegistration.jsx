import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../../utils/urls";
import { setUserData } from "../../utils/authUtils";
import { Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import { registerUserAPI } from "../../services/userServices";

export const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState("email");
  const [fieldErrors, setFieldErrors] = useState({});

  const passwordInputRef = useRef(null);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const signupFields = [
    { name: "name", label: "Full Name", icon: User },
    { name: "email", label: "Email", icon: Mail },
    { name: "phone", label: "Phone", icon: Phone },
    { name: "password", label: "Password", icon: Lock },
    { name: "confirmPassword", label: "Confirm Password", icon: Lock },
  ];

  const currentSignupField = signupFields.find(f => f.name === step);

  // ==================== LOGIN HANDLERS ====================
  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLoginEmailKeyPress = (e) => {
    if (e.key === "Enter" && loginForm.email.trim()) {
      e.preventDefault();
      setStep("password");
      setTimeout(() => passwordInputRef.current?.focus(), 100);
    }
  };

  const handleLoginPasswordKeyPress = (e) => {
    if (e.key === "Enter" && loginForm.password.trim()) {
      e.preventDefault();
      handleLoginSubmit(e);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      if (!loginForm.email || !loginForm.password) {
        throw new Error("Email and password are required");
      }

      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

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
          navigate("/verify-employee");
        } else {
          navigate(from, { replace: true });
        }
      }, 1000);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setLoginForm((prev) => ({ ...prev, password: "" }));
      setStep("email");
    } finally {
      setLoading(false);
    }
  };

  // ==================== SIGNUP HANDLERS ====================
  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    setError("");
  };

  const validateSignupField = (fieldName) => {
    const value = signupForm[fieldName];

    if (fieldName === "name" && !value.trim()) {
      setFieldErrors(prev => ({ ...prev, name: "Name is required" }));
      return false;
    }
    if (fieldName === "email" && !value.trim()) {
      setFieldErrors(prev => ({ ...prev, email: "Email is required" }));
      return false;
    }
    if (fieldName === "password" && value.length < 6) {
      setFieldErrors(prev => ({ ...prev, password: "Password must be at least 6 characters" }));
      return false;
    }
    if (fieldName === "phone" && value && value.length !== 10) {
      setFieldErrors(prev => ({ ...prev, phone: "Mobile must be 10 digits" }));
      return false;
    }
    if (fieldName === "confirmPassword" && value !== signupForm.password) {
      setFieldErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      return false;
    }

    return true;
  };

  const handleSignupNext = () => {
    const currentFieldName = step;

    if (!validateSignupField(currentFieldName)) return;

    const fieldIndex = signupFields.findIndex(f => f.name === currentFieldName);
    if (fieldIndex < signupFields.length - 1) {
      setStep(signupFields[fieldIndex + 1].name);
    } else {
      handleSignupSubmit();
    }
  };

  const handleSignupPrevious = () => {
    const fieldIndex = signupFields.findIndex(f => f.name === step);
    if (fieldIndex > 0) {
      setStep(signupFields[fieldIndex - 1].name);
      setError("");
    }
  };

  const handleSignupSubmit = async () => {
    setError("");
    setSuccess("");

    if (!signupForm.name.trim()) return setError("Name is required");
    if (!signupForm.email.trim()) return setError("Email is required");
    if (signupForm.password.length < 6) return setError("Password must be at least 6 characters");
    if (signupForm.phone && signupForm.phone.length !== 10) return setError("Mobile must be 10 digits");
    if (signupForm.password !== signupForm.confirmPassword) return setError("Passwords do not match");

    try {
      setLoading(true);

      await registerUserAPI({
        name: signupForm.name,
        email: signupForm.email,
        password: signupForm.password,
        phone: signupForm.phone || undefined,
        role: "user",
      });

      setSuccess("Account created successfully ✅");
      setTimeout(() => {
        setIsLogin(true);
        setStep("email");
        setLoginForm({ email: signupForm.email, password: "" });
        setSignupForm({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleTabSwitch = (newTab) => {
    setIsLogin(newTab);
    setError("");
    setSuccess("");
    setStep("email");
    setFieldErrors({});
  };

  const currentSignupFieldIndex = signupFields.findIndex(f => f.name === step);
  const signupProgress = ((currentSignupFieldIndex + 1) / signupFields.length) * 100;

  return (
    <div className="min-h-screen flex bg-white overflow-hidden relative">
      {/* SocialBureau Branding - Top Left */}
      <div className="absolute top-6 left-6 z-30">
        <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in' className="text-2xl md:text-3xl font-bold text-gray-800 hover:text-gray-900 transition-colors">
          Social<span className="text-[#ff0000]">B</span>ureau
        </a>
      </div>

      {/* ==================== LOGIN LAYOUT ==================== */}
      {isLogin ? (
        <>
          {/* Left Side - Form Container (Login) */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 order-1 lg:order-1 relative z-10">
            <div className="w-full max-w-md">
              {/* Mobile Header & Toggle */}
              <div className="lg:hidden text-center mb-8">
                <h1 className="text-4xl font-bold text-red-500 mb-4">LOGIN</h1>
                
                <div className="flex gap-2 bg-red-100 rounded-full p-1 mb-6 justify-center">
                  <button
                    onClick={() => handleTabSwitch(true)}
                    className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                      isLogin ? "bg-red-500 text-white" : "text-red-500"
                    }`}
                  >
                    LOGIN
                  </button>
                  <button
                    onClick={() => handleTabSwitch(false)}
                    className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                      !isLogin ? "bg-red-500 text-white" : "text-red-500"
                    }`}
                  >
                    SIGN UP
                  </button>
                </div>
              </div>

              {/* LOGIN FORM */}
              <form onSubmit={handleLoginSubmit} className="space-y-6 animate-slideInLeft">
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

                {/* Email Input */}
                {step === "email" && (
                  <div className="animate-fadeIn">
                    <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-300 focus-within:border-red-500 transition-all duration-300">
                      <Mail size={24} className="text-gray-400" />
                      <input
                        autoFocus
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                        onKeyPress={handleLoginEmailKeyPress}
                        className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-lg"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Press Enter to continue</p>
                  </div>
                )}

                {/* Password Input */}
                {step === "password" && (
                  <div className="animate-fadeIn">
                    <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-300 focus-within:border-red-500 transition-all duration-300">
                      <Lock size={24} className="text-gray-400" />
                      <input
                        ref={passwordInputRef}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                        onKeyPress={handleLoginPasswordKeyPress}
                        className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-lg"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Press Enter to login</p>

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

                {/* Forgot Password */}
                {step === "password" && (
                  <div className="text-right">
                    <a href="/forgot-password" className="text-red-400 text-sm hover:text-red-500 transition">
                      Forgot Password?
                    </a>
                  </div>
                )}

                {/* Login Button */}
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

                {/* Social Buttons */}
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

                    <div className="flex gap-4 justify-center">
                      <button type="button" className="flex items-center justify-center gap-2 px-6 py-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition text-gray-700 font-medium">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                      </button>
                      <button type="button" className="flex items-center justify-center gap-2 px-6 py-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition text-gray-700 font-medium">
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

          {/* Right Side - Red Gradient (Login) */}
          <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-red-500 via-red-400 to-red-300 relative overflow-hidden items-center justify-center flex-col order-2 lg:order-2">
            {/* Diagonal Stripe Pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="diagonalStripeLogin" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
                    <line x1="0" y1="0" x2="0" y2="60" stroke="#ffffff" strokeWidth="20" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diagonalStripeLogin)" />
              </svg>
            </div>

            {/* Decorative Shapes */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

            {/* Content */}
            <div className="relative z-10 text-center text-white px-6">
              <div className="mb-16">
                <h1 className="text-6xl font-bold mb-2 tracking-tight">LOGIN</h1>
                <p className="text-2xl font-semibold opacity-90 tracking-wide">SIGN IN</p>
              </div>
              
              {/* Welcome Text */}
              <div className="max-w-md mx-auto">
                <p className="text-lg opacity-90 mb-2">Welcome Back!</p>
                <p className="text-base opacity-80">Sign in to access your personalized dashboard and continue your journey with us.</p>
              </div>
            </div>

            {/* Toggle Buttons - Positioned at the boundary */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-60">
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => handleTabSwitch(true)}
                  className={`w-45 h-15 rounded-full shadow-xl transition-all duration-500 flex items-center justify-center text-lg font-bold ${
                    isLogin
                      ? "bg-white text-red-500 scale-110"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  <span className="whitespace-nowrap">LOGIN</span>
                </button>
                <button
                  onClick={() => handleTabSwitch(false)}
                  className={`w-50 h-15 rounded-full shadow-xl transition-all duration-500 flex items-center justify-center text-lg font-bold ${
                    !isLogin
                      ? "bg-white text-red-500 scale-110"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  <span className="whitespace-nowrap">SIGN UP</span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* ==================== SIGNUP LAYOUT ==================== */
        <>
          {/* Left Side - Red Gradient (Signup) */}
          <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-red-500 via-red-400 to-red-300 relative overflow-hidden items-center justify-center flex-col order-1 lg:order-1">
            {/* Diagonal Stripe Pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="diagonalStripeSignup" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
                    <line x1="0" y1="0" x2="0" y2="60" stroke="#ffffff" strokeWidth="20" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diagonalStripeSignup)" />
              </svg>
            </div>

            {/* Decorative Shapes */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

            {/* Content */}
            <div className="relative z-10 text-center text-white px-6">
              <div className="mb-16">
                <h1 className="text-6xl font-bold mb-2 tracking-tight">SIGN UP</h1>
                <p className="text-2xl font-semibold opacity-90 tracking-wide">CREATE ACCOUNT</p>
              </div>
              
              {/* Welcome Text */}
              <div className="max-w-md mx-auto">
                <p className="text-lg opacity-90 mb-2">Join Us Today!</p>
                <p className="text-base opacity-80">Create your account to unlock exclusive features and start your journey with us.</p>
              </div>
            </div>

            {/* Toggle Buttons - Positioned at the boundary */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-/2 z-30">
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => handleTabSwitch(true)}
                  className={`w-50 h-15 rounded-full shadow-xl transition-all duration-500 flex items-center justify-center text-sm font-bold ${
                    isLogin
                      ? "bg-white text-red-500 scale-110"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  <span className="whitespace-nowrap">LOGIN</span>
                </button>
                <button
                  onClick={() => handleTabSwitch(false)}
                  className={`w-50 h-15 rounded-full shadow-xl transition-all duration-500 flex items-center justify-center text-sm font-bold ${
                    !isLogin
                      ? "bg-white text-red-500 scale-110"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  <span className="whitespace-nowrap">SIGN UP</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Form Container (Signup) */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 order-2 lg:order-2 relative z-10">
            <div className="w-full max-w-md">
              {/* Mobile Header & Toggle */}
              <div className="lg:hidden text-center mb-8">
                <h1 className="text-4xl font-bold text-red-500 mb-4 p-4">SIGN UP</h1>
                
                <div className="flex gap-2 bg-red-100 rounded-full p-1 mb-6 justify-center">
                  <button
                    onClick={() => handleTabSwitch(true)}
                    className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                      isLogin ? "bg-red-500 text-white" : "text-red-500"
                    }`}
                  >
                    LOGIN
                  </button>
                  <button
                    onClick={() => handleTabSwitch(false)}
                    className={`px-6 py-2 rounded-full font-semibold text-sm transition-all p-4 ${
                      !isLogin ? "bg-red-500 text-white" : "text-red-500"
                    }`}
                  >
                    SIGN UP
                  </button>
                </div>
              </div>

              {/* SIGNUP FORM */}
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6 animate-slideInRight">
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="h-1 bg-red-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-500"
                      style={{ width: `${signupProgress}%` }}
                    />
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-2">
                    Step {currentSignupFieldIndex + 1} of {signupFields.length}
                  </p>
                </div>

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

                {/* Single Field */}
                {currentSignupField && (
                  <div className="animate-fadeIn">
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-semibold text-red-500 mb-2">
                        {currentSignupField.label}
                      </h2>
                    </div>

                    <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-300 focus-within:border-red-500 transition-all duration-300">
                      {currentSignupField.icon && <currentSignupField.icon size={24} className="text-gray-400" />}
                      <input
                        autoFocus
                        type={step === "confirmPassword" ? "password" : (step === "email" ? "email" : step === "phone" ? "tel" : "text")}
                        name={step}
                        placeholder={currentSignupField.label}
                        value={signupForm[step] || ""}
                        onChange={handleSignupChange}
                        className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-lg"
                      />
                    </div>
                    {fieldErrors[step] && (
                      <p className="text-red-500 text-sm mt-2">{fieldErrors[step]}</p>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-3 mt-8">
                  <button
                    type="button"
                    onClick={handleSignupPrevious}
                    disabled={currentSignupFieldIndex === 0}
                    className={`flex-1 py-3 rounded-full font-semibold transition ${
                      currentSignupFieldIndex === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                        : "bg-gray-400 text-white hover:bg-gray-500"
                    }`}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSignupNext}
                    disabled={loading}
                    className="flex-1 py-3 rounded-full bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? "Creating..." : currentSignupFieldIndex === signupFields.length - 1 ? "Create Account" : "Next"}
                    <ArrowRight size={20} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Mobile Bottom Toggle */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex justify-center p-4">
          <div className="flex gap-2 bg-red-100 rounded-full p-1">
            <button
              onClick={() => handleTabSwitch(true)}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                isLogin ? "bg-red-500 text-white" : "text-red-500"
              }`}
            >
              LOGIN
            </button>
            <button
              onClick={() => handleTabSwitch(false)}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                !isLogin ? "bg-red-500 text-white" : "text-red-500"
              }`}
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.5s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.5s ease-out; }
        
        /* Custom font */
        @font-face {
          font-family: 'MyFont';
          src: url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
        }
      `}</style>
    </div>
  );
};

export default AuthPage;