import React, { useState } from "react";
import { startAuthentication, startRegistration } from "@simplewebauthn/browser";
import { BASE_URL } from "@/utils/urls";

const post = async (path, body) => {
  const res = await fetch(`${BASE_URL}/user/admin/mfa${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

/**
 * Second step of administrator sign-in. The server decides what is required; nothing here can
 * grant access: a session only exists once the server sets the HttpOnly cookie.
 */
export const AdminMfaStep = ({ mfaToken, enrollmentRequired, onComplete, onCancel }) => {
  const [code, setCode] = useState("");
  const [authorized, setAuthorized] = useState(!enrollmentRequired ? null : false);
  const [useRecovery, setUseRecovery] = useState(false);
  const [codes, setCodes] = useState(null);
  const [pending, setPending] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const run = async (fn) => {
    setBusy(true);
    setError("");
    try {
      await fn();
    } catch (e) {
      setError(e?.name === "NotAllowedError" ? "Security key prompt was cancelled." : e.message);
    } finally {
      setBusy(false);
    }
  };

  const signIn = () => run(async () => {
    const { options } = await post("/login/options", { mfaToken });
    const response = await startAuthentication({ optionsJSON: options });
    const data = await post("/login/verify", { mfaToken, response });
    onComplete(data);
  });

  const authorize = () => run(async () => {
    await post("/enroll/authorize", { mfaToken, [useRecovery ? "recoveryCode" : "enrollmentCode"]: code.trim() });
    setCode("");
    setAuthorized(true);
  });

  const enroll = () => run(async () => {
    const { options } = await post("/enroll/options", { mfaToken });
    const response = await startRegistration({ optionsJSON: options });
    const data = await post("/enroll/verify", { mfaToken, response, label: "Security key" });
    setPending(data);
    setCodes(data.recoveryCodes);
  });

  if (codes) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Save your recovery codes</h2>
        <p className="text-sm text-gray-600">Each code works once and is shown only now. Store them offline.</p>
        <pre className="bg-gray-100 p-3 rounded text-sm select-all">{codes.join("\n")}</pre>
        <button className="w-full bg-red-500 text-white py-3 rounded" onClick={() => onComplete(pending)}>
          I have saved them
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Administrator verification</h2>
      {authorized === null || authorized === true ? (
        <button disabled={busy} onClick={authorized ? enroll : signIn} className="w-full bg-red-500 text-white py-3 rounded">
          {authorized ? "Register security key / passkey" : "Verify with security key / passkey"}
        </button>
      ) : (
        <>
          <p className="text-sm text-gray-600">
            {useRecovery
              ? "Enter one of your single-use recovery codes to register a new security key."
              : "Enter the one-time enrollment code issued to you by the site operator."}
          </p>
          <input value={code} onChange={(e) => setCode(e.target.value)} autoComplete="off" className="w-full border rounded p-3" />
          <button disabled={busy || !code.trim()} onClick={authorize} className="w-full bg-red-500 text-white py-3 rounded">
            Continue
          </button>
        </>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {enrollmentRequired !== true && authorized === null && (
        <button className="text-sm underline" onClick={() => { setUseRecovery(true); setAuthorized(false); }}>
          Lost your key? Use a recovery code
        </button>
      )}
      <button className="text-sm underline block" onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default AdminMfaStep;
