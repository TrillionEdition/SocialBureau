import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { Eye, EyeOff } from "lucide-react";

const CodeProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [loading] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const requiredCode = "SB#2026";

  if (loading) return <LoadingSpinner />;

  if (authorized) return children;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!codeInput.trim()) {
      setError("Please enter the access code.");
      return;
    }

    if (codeInput === requiredCode) {
      setAuthorized(true);
    } else {
      setError("Invalid code. Please try again.");
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="bg-[#0F1117] border border-[#C5A059]/20 rounded-[2rem] p-8 shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4">
          Enter Access Code
        </h2>

        <p className="text-slate-400 mb-6">
          This page is protected. Please enter the access code to continue.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              autoFocus
              type={showPassword ? "text" : "password"}
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="Enter code"
              className="w-full px-4 py-3 pr-12 rounded-lg bg-[#0B0C0F] border border-[#C5A059]/10 text-white focus:outline-none focus:border-[#C5A059]/50"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <div className="text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-3 bg-[#C5A059] text-black font-bold rounded-lg hover:opacity-90 transition"
            >
              Unlock
            </button>

            <button
              type="button"
              onClick={() => {
                setCodeInput("");
                setError("");
              }}
              className="px-4 py-3 bg-transparent border border-[#C5A059]/20 text-white rounded-lg"
            >
              Clear
            </button>
          </div>

          <p className="text-xs text-slate-500 mt-2">
            If you don't have the code, contact the site administrator.
          </p>
        </form>
      </div>
    </div>
  );
};

export default CodeProtectedRoute;