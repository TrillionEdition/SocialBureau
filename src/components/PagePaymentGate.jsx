import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/urls";
import loadRazorpay from "@/utils/loadRazorpay";
import { useAuth } from "@/utils/authUtils";

/**
 * Reusable gate: requires login, then a one-time Razorpay payment to unlock
 * `children`. Access is persisted per user (via `paidPages` on the account),
 * so once paid the page stays unlocked on future logins.
 */
export default function PagePaymentGate({ pageSlug, amount, title, description, children }) {
  const { currentUser, isAuthenticated, loading: authLoading } = useAuth();
  const location = useLocation();

  const [checking, setChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading || !isAuthenticated) {
      setChecking(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        setChecking(true);
        const res = await fetch(`${BASE_URL}/payment/page-access/${pageSlug}`, {
          credentials: "include",
        });
        const data = await res.json().catch(() => ({}));
        if (!cancelled) setHasAccess(!!data.hasAccess);
      } catch (err) {
        console.error("Error checking page access:", err);
        if (!cancelled) setHasAccess(false);
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pageSlug, isAuthenticated, authLoading]);

  const handlePay = async () => {
    try {
      setError(null);
      setProcessing(true);

      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Failed to load Razorpay checkout");

      const orderRes = await fetch(`${BASE_URL}/payment/create-order`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "INR" }),
      });
      const orderData = await orderRes.json().catch(() => ({}));
      if (!orderRes.ok || !orderData.success || !orderData.order) {
        throw new Error(orderData.message || "Failed to create payment order");
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        order_id: orderData.order.id,
        name: "Social Bureau",
        description: title || "Unlock page",
        prefill: { name: currentUser?.name, email: currentUser?.email },
        theme: { color: "#E31E24" },
        handler: async (response) => {
          try {
            const token = localStorage.getItem("token");

            const verifyRes = await fetch(`${BASE_URL}/payment/verify-page`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ ...response, pageSlug }),
            });
            const verifyData = await verifyRes.json().catch(() => ({}));
            if (verifyRes.ok && verifyData.success) {
              setHasAccess(true);
            } else {
              toast.error(verifyData.message || "Payment verification failed");
            }
          } catch (err) {
            console.error("Error verifying page payment:", err);
            toast.error("Payment verification error");
          } finally {
            setProcessing(false);
          }
        },
        modal: { ondismiss: () => setProcessing(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error starting payment:", err);
      setError(err.message || "Failed to start payment");
      setProcessing(false);
    }
  };

  if (authLoading || checking) {
    return (
      <div className="min-h-screen w-full bg-[#08080c] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white/40" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-[#08080c] text-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center border border-white/10 rounded-2xl p-10 bg-white/5">
          <h1 className="text-2xl font-semibold mb-3">Login Required</h1>
          <p className="text-white/60 mb-8">Please log in to view this page.</p>
          <Link
            to="/login"
            state={{ from: location }}
            className="inline-flex w-full items-center justify-center px-6 py-3 rounded-lg bg-[#E31E24] text-white font-medium hover:bg-[#c40016] transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (hasAccess) {
    return children;
  }

  return (
    <div className="min-h-screen w-full bg-[#08080c] text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center border border-white/10 rounded-2xl p-10 bg-white/5">
        <h1 className="text-2xl font-semibold mb-3">{title || "Unlock this page"}</h1>
        <p className="text-white/60 mb-8">
          {description || `Pay \u20b9${amount} once to unlock permanent access to this page.`}
        </p>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <button
          onClick={handlePay}
          disabled={processing}
          className="w-full px-6 py-3 rounded-lg bg-[#E31E24] text-white font-medium hover:bg-[#c40016] transition disabled:opacity-50"
        >
          {processing ? "Processing..." : `Pay \u20b9${amount} to Unlock`}
        </button>
      </div>
    </div>
  );
}
