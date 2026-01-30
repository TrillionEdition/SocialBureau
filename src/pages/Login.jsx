import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { BASE_URL } from "../../utils/urls";
import { setUserData } from "../../utils/authUtils";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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

      // if (data.user) {
      //   setUserData(data.user);
      // }
      if (data.user) {
        setUserData(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));

        // ✅ Store token if provided in response
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
      }
      setSuccess("Login successful ✅");
      window.dispatchEvent(new Event("authChange"));

      // ✅ Get the page user came from
      const queryParams = new URLSearchParams(location.search);
      const redirectParam = queryParams.get("redirect");
      const from = location.state?.from?.pathname || redirectParam || "/";

      setTimeout(() => {
        if (data.user?.isEmployee && !data.user?.isVerified) {
          console.log("Employee not verified – navigating to verification");
          navigate("/verify-employee");
        } else {
          // ✅ Redirect to previous page
          console.log(`Redirecting to previous page: ${from}`);
          navigate(from, { replace: true });
        }
      }, 1000);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setForm((prev) => ({ ...prev, password: "" }));
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
            "radial-gradient(circle at 75% 0%, rgba(255, 0, 0, 0.15) 0%, transparent 50%)",
        }}
      />

      {/* Floating Dots */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-5 h-5 bg-red-500 rounded-full opacity-20 animate-float"
          style={{ top: "10%", left: "10%" }}
        />
        <div
          className="absolute w-4 h-4 bg-red-500 rounded-full opacity-15 animate-float"
          style={{ top: "80%", left: "85%", animationDelay: "1s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-center pt-20 pb-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">LOGIN</h1>
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

              <div>
                <label className="block mb-2 text-sm text-gray-400">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-black text-white border border-red-900/30 focus:border-red-500 focus:outline-none focus:shadow-lg focus:shadow-red-900/20 transition"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-400">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-black text-white border border-red-900/30 focus:border-red-500 focus:outline-none focus:shadow-lg focus:shadow-red-900/20 transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-semibold text-lg shadow-lg hover:shadow-red-900/40 transition disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <p className="text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <Link
                  to={"/user-register" + location.search}
                  state={location.state}
                  className="text-red-500 hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
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