import { useState } from "react";
import { BASE_URL } from "@/utils/urls";
import { toast } from "react-toastify";

export default function Paywall({
  companyName,
  onPaymentSuccess,
}) {
  const [loading, setLoading] =
    useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // 1. Create order on backend (amount in rupees)
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

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "SocialBureau",
        description: "Workflow Architect Blueprint",
        image: "/assets/logo.webp",
        order_id: data.order.id,
        handler: async (response) => {
          setLoading(true);
          try {
            const verifyRes = await fetch(`${BASE_URL}/payment/verify`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            });

            const verifyData = await verifyRes.json().catch(() => ({}));
            if (verifyRes.ok && verifyData.success) {
              onPaymentSuccess();
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
          name: companyName || "",
        },
        theme: { color: "#E8192C" },
        modal: { ondismiss: () => setLoading(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">

      <div className="max-w-[760px] mx-auto px-10 pt-24">

        {/* HEADER */}

        <div className="text-center">

          <div className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            border
            border-[rgba(232,25,44,.22)]
            bg-[rgba(232,25,44,.12)]
            text-[#E8192C]
            uppercase
            tracking-[0.16em]
            text-[10px]
            font-bold
          ">
            Blueprint Ready
          </div>

          <h1 className="
            mt-6
            font-black
            text-[clamp(48px,6vw,72px)]
            leading-[0.9]
          ">
            YOUR WORKFLOW
            <span className="block text-[#E8192C]">
              BLUEPRINT
            </span>
          </h1>

          <p className="mt-4 text-[#A8A49C]">
            Prepared for
          </p>

          <h3 className="text-xl font-bold mt-2">
            {companyName}
          </h3>

        </div>

        {/* PREVIEW */}

        <div className="
          mt-10
          border
          border-[rgba(255,255,255,.07)]
          rounded-[18px]
          overflow-hidden
        ">

          <div className="
            grid
            md:grid-cols-4
            bg-[rgba(255,255,255,.03)]
          ">

            <Stat
              title="Team Roles"
              value="12+"
            />

            <Stat
              title="KPIs"
              value="35+"
            />

            <Stat
              title="Processes"
              value="50+"
            />

            <Stat
              title="Roadmap"
              value="90 Days"
            />
          </div>

        </div>

        {/* WHAT YOU GET */}

        <div className="mt-10">

          <h3 className="
            uppercase
            tracking-[0.15em]
            text-[11px]
            text-[#A8A49C]
            mb-5
          ">
            Included in your Blueprint
          </h3>

          <div className="grid md:grid-cols-2 gap-4">

            <Feature>
              Complete Team Structure
            </Feature>

            <Feature>
              Role-by-Role Responsibilities
            </Feature>

            <Feature>
              KPI Framework
            </Feature>

            <Feature>
              Weekly Workflow System
            </Feature>

            <Feature>
              Platform Strategy
            </Feature>

            <Feature>
              90-Day Execution Roadmap
            </Feature>

            <Feature>
              Recommended Tool Stack
            </Feature>

            <Feature>
              Automation Recommendations
            </Feature>

          </div>

        </div>

        {/* PAYMENT */}

        <div className="
          mt-10
          rounded-[18px]
          border
          border-[rgba(232,25,44,.22)]
          bg-gradient-to-br
          from-[#1A0507]
          to-[#0F0D0C]
          p-10
          text-center
        ">

          <div className="text-[#A8A49C] line-through">
            ₹9,999
          </div>

          <div className="
            text-[80px]
            font-black
            leading-none
          ">
            ₹2
          </div>

          <div className="
            uppercase
            tracking-[0.15em]
            text-[11px]
            text-[#A8A49C]
          ">
            One-Time Payment
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="
              mt-8
              w-full
              py-5
              rounded-[10px]
              bg-[#E8192C]
              font-bold
              uppercase
              tracking-[0.08em]
              hover:bg-red-700
              transition-all
            "
          >
            {loading
              ? "Processing..."
              : "Unlock Blueprint"}
          </button>

        </div>
{/* <div style={{ maxWidth: "420px", margin: "0 auto", padding: "1.5rem 0" }}>
  <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-lg)", border: "0.5px solid var(--color-border-tertiary)", padding: "2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>

    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#E8192C", borderRadius: "var(--border-radius-lg) var(--border-radius-lg) 0 0" }} />

    <span style={{ display: "inline-block", background: "#E8192C", color: "#fff", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 14px", borderRadius: "999px", marginBottom: "1.25rem" }}>Limited time offer</span>

    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "4px" }}>
      <span style={{ fontSize: "14px", color: "var(--color-text-secondary)", textDecoration: "line-through" }}>₹9,999</span>
      <span style={{ background: "var(--color-background-danger)", color: "var(--color-text-danger)", fontSize: "12px", fontWeight: 500, padding: "2px 8px", borderRadius: "var(--border-radius-md)" }}>100% off</span>
    </div>

    <div style={{ fontSize: "72px", fontWeight: 500, lineHeight: 1, color: "var(--color-text-primary)", marginBottom: "6px" }}>FREE</div>

    <div style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-secondary)", marginBottom: "1.75rem" }}>One-time · completely free</div>

    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "1.75rem", textAlign: "left" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--color-text-secondary)" }}>
        ✓ Full blueprint access
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--color-text-secondary)" }}>
        ✓ Lifetime updates included
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--color-text-secondary)" }}>
        ✓ Instant download
      </div>
    </div>

    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full py-5 rounded-[10px] bg-[#E8192C] font-bold uppercase tracking-[0.08em] hover:bg-red-700 transition-all mt-8"
    >
      {loading ? "Processing..." : "Get it free"}
    </button>

    <p style={{ fontSize: "12px", color: "var(--color-text-tertiary)", marginTop: "14px", marginBottom: 0 }}>
      🔒 Secure checkout · 7-day refund guarantee
    </p>
  </div>

  <p style={{ textAlign: "center", fontSize: "12px", color: "var(--color-text-tertiary)", marginTop: "12px" }}>
    ⏳ Offer expires soon
  </p>
</div> */}
      </div>
    </div>
  );
}

function Stat({
  title,
  value,
}) {
  return (
    <div className="p-6 bg-[#111110]">
      <div className="
        text-[10px]
        uppercase
        tracking-[0.15em]
        text-[#5C5850]
      ">
        {title}
      </div>

      <div className="
        mt-2
        text-lg
        font-bold
      ">
        {value}
      </div>
    </div>
  );
}

function Feature({ children }) {
  return (
    <div className="
      flex
      items-center
      gap-3
      p-4
      rounded-[10px]
      bg-[#111110]
      border
      border-[rgba(255,255,255,.07)]
    ">
      <div className="
        w-5
        h-5
        rounded-full
        bg-[rgba(232,25,44,.12)]
        border
        border-[rgba(232,25,44,.22)]
        flex
        items-center
        justify-center
        text-[#E8192C]
        text-xs
      ">
        ✓
      </div>

      <span>{children}</span>
    </div>
  );
}