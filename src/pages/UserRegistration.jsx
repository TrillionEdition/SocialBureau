import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import Footer from "../components/Footer";
import { registerUserAPI, checkEmailExistsAPI } from "../../services/userServices";

export const UserRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setSuccess("");

    if (!form.name.trim()) return setError("Name is required");
    if (!form.email.trim()) return setError("Email is required");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters");
    if (form.phone && form.phone.length !== 10)
      return setError("Mobile number must be exactly 10 digits");
    if (form.password !== form.confirmPassword)
      return setError("Passwords do not match");

    try {
      setLoading(true);

      // ✅ FIX: Only call checkEmailExists if your API actually needs it
      // If your backend already checks for duplicate emails, REMOVE this entire block
      // const emailExists = await checkEmailExistsAPI(form.email);
      // if (emailExists) {
      //   setLoading(false);
      //   return setError("Email already registered");
      // }

      await registerUserAPI({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone || undefined,
        role: "user",
      });

      setSuccess("Account created successfully");

      setTimeout(() => navigate("/login" + location.search, { state: location.state }), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Background Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 0%, rgba(255,0,0,0.15) 0%, transparent 50%)",
        }}
      />

      {/* Floating Dots */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-5 h-5 bg-red-500 rounded-full opacity-20 animate-float"
          style={{ top: "10%", left: "10%" }} />
        <div className="absolute w-4 h-4 bg-red-500 rounded-full opacity-15 animate-float"
          style={{ top: "80%", left: "85%", animationDelay: "1s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-center pt-20 pb-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">CREATE ACCOUNT</h1>
            <img src="/assets/logo.webp" alt="Logo" className="mx-auto w-40" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto px-4 pb-24">
          <div className="relative bg-neutral-950/80 backdrop-blur-xl rounded-3xl p-8 space-y-6 shadow-2xl ring-1 ring-red-900/30">

            {/* Animated Border */}
            <div className="absolute inset-0 rounded-3xl p-[2px] pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-red-600 to-transparent animate-slideRight bg-[length:200%_100%]" />
              <div className="absolute inset-[2px] rounded-3xl bg-neutral-950/80" />
            </div>

            <div className="relative z-10 space-y-5">
              {error && (
                <div className="p-4 bg-red-950/30 border border-red-700/50 rounded-lg text-center text-red-400">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-4 bg-green-950/30 border border-green-700/50 rounded-lg text-center text-green-400">
                  {success}
                </div>
              )}

              <Input label="Full Name" name="name" value={form.name} onChange={handleChange} required />
              <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
              <Input label="Phone (optional)" name="phone" value={form.phone} onChange={handleChange} />
              <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} required />
              <Input label="Confirm Password" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition
            ${loading
                    ? "bg-red-800 opacity-60 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"}
          `}
              >
                {loading ? "Creating..." : "Create Account"}
              </button>

              <p className="text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  to={"/login" + location.search}
                  state={location.state}
                  className="text-red-500 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>

      <Footer />

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes slideRight {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-slideRight { animation: slideRight 3s linear infinite; }
      `}</style>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block mb-2 text-sm text-gray-400">
      {label} {props.required && <span className="text-red-500">*</span>}
    </label>
    <input
      {...props}
      className="w-full p-3 rounded-lg bg-black text-white border border-red-900/30 focus:border-red-500 focus:outline-none focus:shadow-lg focus:shadow-red-900/20 transition"
    />
  </div>
);

export default UserRegister;