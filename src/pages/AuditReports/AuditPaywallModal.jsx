import React, { useState } from "react";
import { BASE_URL } from "@/utils/urls";
import loadRazorpay from "@/utils/loadRazorpay";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export default function AuditPaywallModal({ isOpen, onClose, report, onPaymentSuccess }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !report) return null;

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Load Razorpay script
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        toast.error("Failed to load payment gateway script.");
        setLoading(false);
        return;
      }

      // 2. Create Razorpay order on backend (amount in rupees, e.g. 2 INR)
      const resp = await fetch(`${BASE_URL}/payment/create-order`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 2, currency: "INR" }),
      });

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || !data.success || !data.order) {
        throw new Error(data.message || "Failed to create payment order");
      }

      // 3. Configure Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "SocialBureau",
        description: `Audit Briefing - ${report.title}`,
        image: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/yindrl07mz3adjek2mmq.webp",
        order_id: data.order.id,
        handler: async (response) => {
          setLoading(true);
          try {
            // 4. Verify payment on backend, passing reportId
            const verifyRes = await fetch(`${BASE_URL}/payment/verify`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...response,
                reportId: report._id,
              }),
            });

            const verifyData = await verifyRes.json().catch(() => ({}));
            if (verifyRes.ok && verifyData.success) {
              toast.success("Payment verified! Unlocking report download.");
              onPaymentSuccess(report._id);
              onClose();
            } else {
              console.error("Payment verification failed", verifyData);
              toast.error(verifyData.message || "Payment verification failed");
            }
          } catch (err) {
            console.error("Verification error:", err);
            toast.error("Payment verification error");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: report.uploadedBy || "",
        },
        theme: { color: "#b90012" },
        modal: { ondismiss: () => setLoading(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment process interrupted.");
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[12000] flex items-center justify-center p-4 backdrop-blur-md"
      style={{ background: "rgba(10, 10, 10, 0.85)" }}
    >
      <div
        className="w-full max-w-md relative overflow-hidden"
        style={{
          background: "#121214",
          border: "1px solid rgba(185, 0, 18, 0.3)",
          boxShadow: "0 25px 50px -12px rgba(185, 0, 18, 0.4)",
          borderRadius: "4px",
          color: "#FFFFFF",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Absolute Red Glow Element */}
        <div
          className="absolute -top-32 -left-32 w-64 h-64 rounded-full blur-[100px]"
          style={{ background: "rgba(185, 0, 18, 0.3)" }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors z-50"
          style={{ background: "transparent", border: "none", cursor: "pointer", zIndex: 50 }}
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Modal Content */}
        <div className="p-8 relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span
              className="px-3 py-1 text-[9px] uppercase tracking-[0.25em] font-bold"
              style={{
                background: "rgba(185, 0, 18, 0.12)",
                color: "#e8001a",
                border: "1px solid rgba(185, 0, 18, 0.25)",
              }}
            >
              Secure Release Protocol
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-2xl font-semibold text-center mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Audit Briefing Release
          </h3>
          <p className="text-zinc-400 text-xs text-center mb-8 max-w-xs mx-auto">
            A nominal platform release fee is required to unlock and transmit this official briefing.
          </p>

          {/* Details Box */}
          <div
            className="p-6 mb-8 text-center"
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <div className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Total Due</div>
            <div className="text-4xl font-black text-white" style={{ fontFamily: "Inter, sans-serif" }}>
              ₹2.00
            </div>
            <div className="text-[10px] text-zinc-500 mt-2">ONE-TIME ACCESS FEE</div>
          </div>

          {/* List of features */}
          <div className="flex flex-col gap-4 mb-8">
            {[
              { icon: "verified", text: "High-Fidelity PDF Briefing" },
              { icon: "vpn_key", text: "Official Cryptographic Digital Stamp" },
              { icon: "security", text: "Secure Audit Ledger Transmission" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg" style={{ color: "#e8001a" }}>
                  {item.icon}
                </span>
                <span className="text-xs text-zinc-300 font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-4 px-6 text-white text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-red-800 disabled:opacity-50"
              style={{
                background: "#b90012",
                boxShadow: "0 0 20px rgba(185, 0, 18, 0.4)",
                border: "none",
                cursor: "pointer",
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Unlock & Download</span>
                  <span className="material-symbols-outlined text-lg">lock_open</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              disabled={loading}
              className="w-full py-3 text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
              style={{ background: "transparent", border: "none", cursor: "pointer" }}
            >
              Cancel
            </button>
          </div>

          {/* Secure Message */}
          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-zinc-600">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span>Secured via Razorpay Checkout Protocol.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
