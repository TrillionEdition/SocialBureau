import React, { useState } from "react";
import { BASE_URL } from "@/utils/urls";

/**
 * Email one-time code step for member sign-in. The server decides whether the code is valid;
 * a session exists only once the server sets the HttpOnly cookie.
 */
export const LoginOtpStep = ({ otpToken, sentTo, onComplete, onCancel }) => {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const verify = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/user/login/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ otpToken, otp: code.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Verification failed");
      onComplete(data);
    } catch (err) {
      setError(err.message || "Verification failed");
      setCode("");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={verify} className="space-y-4">
      <h2 className="text-xl font-semibold">Enter your verification code</h2>
      <p className="text-sm text-gray-600">
        We sent a 6-digit code to {sentTo || "your email"}. It expires in 5 minutes.
      </p>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        className="w-full border rounded p-3 tracking-widest text-center text-lg"
        placeholder="000000"
        required
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={busy || code.length !== 6} className="w-full bg-red-500 text-white py-3 rounded disabled:opacity-50">
        {busy ? "Verifying..." : "Verify and sign in"}
      </button>
      <button type="button" className="text-sm underline block" onClick={onCancel}>
        Back to sign in
      </button>
    </form>
  );
};

export default LoginOtpStep;
