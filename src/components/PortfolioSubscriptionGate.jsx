import React, { useEffect, useState } from "react";
import loadRazorpay from "../utils/loadRazorpay";
import { useAuth } from "../utils/authUtils";
import {
  getPortfolioVisibility,
  startCheckout,
  verifySubscription,
} from "../services/subscriptionApi";

/**
 * Reusable gate that only renders `children` (a portfolio page) while its
 * Razorpay monthly subscription is active. Otherwise shows a subscribe CTA —
 * visible only to the portfolio owner (matched by `customerEmail`) or an admin.
 * Works for any portfolio owner by passing a unique `portfolioSlug`.
 */
export default function PortfolioSubscriptionGate({
  portfolioSlug,
  customerName,
  customerEmail,
  children,
}) {
  const [visible, setVisible] = useState(null); // null = loading
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser, isAdmin } = useAuth();

  const isOwner =
    isAdmin ||
    (!!currentUser?.email &&
      currentUser.email.toLowerCase() === customerEmail.toLowerCase());


  const checkVisibility = async () => {
    try {
      const { visible } = await getPortfolioVisibility(portfolioSlug);
      setVisible(visible);
    } catch (err) {
      console.error("Error checking portfolio visibility:", err);
      setVisible(false);
    }
  };

  useEffect(() => {
    checkVisibility();
  }, [portfolioSlug]);

  const handleSubscribe = async () => {
    try {
      setError(null);
      setProcessing(true);

      const loaded = await loadRazorpay();
      if (!loaded) {
        throw new Error("Failed to load Razorpay checkout");
      }

      const {
        keyId,
        subscriptionId,
        customerName: name,
        customerEmail: email,
      } = await startCheckout({ portfolioSlug, customerName, customerEmail });

      const options = {
        key: keyId,
        subscription_id: subscriptionId,
        name: "Social Bureau",
        description: "Portfolio display — ₹500/month",
        prefill: { name, email },
        theme: { color: "#E8001A" },
        handler: async (response) => {
          try {
            await verifySubscription({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_subscription_id: response.razorpay_subscription_id,
              razorpay_signature: response.razorpay_signature,
            });
          } catch (err) {
            console.error("Error verifying subscription:", err);
          } finally {
            await checkVisibility();
            setProcessing(false);
          }
        },
        modal: {
          ondismiss: () => setProcessing(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error starting subscription checkout:", err);
      setError(err.message || "Failed to start subscription checkout");
      setProcessing(false);
    }
  };

  if (visible === null) {
    return (
      <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white/40" />
      </div>
    );
  }

  if (visible) {
    return children;
  }

  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#f5f2ec] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center border border-white/10 rounded-2xl p-10 bg-white/5">
        <h1 className="text-2xl font-semibold mb-3">Portfolio Currently Unavailable</h1>
        <p className="text-white/60 mb-8">
          {isOwner
            ? "This portfolio is temporarily hidden. Subscribe for ₹500/month to keep it publicly visible on Social Bureau."
            : "This portfolio is temporarily unavailable."}
        </p>
        {isOwner && (
          <>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <button
              onClick={handleSubscribe}
              disabled={processing}
              className="w-full px-6 py-3 rounded-lg bg-[#E8001A] text-white font-medium hover:bg-[#c40016] transition disabled:opacity-50"
            >
              {processing ? "Processing..." : "Subscribe for ₹500/month"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
