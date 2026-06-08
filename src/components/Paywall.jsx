import { useState } from "react";

export default function Paywall({
  companyName,
  onPaymentSuccess,
}) {
  const [loading, setLoading] =
    useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      /**
       * Replace with Razorpay
       * Stripe
       * PhonePe
       * Cashfree
       * API call
       */

      setTimeout(() => {
        onPaymentSuccess();
      }, 1500);
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

        {/* <div className="
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
            ₹999
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

        </div> */}
<div style="max-width: 420px; margin: 0 auto; padding: 1.5rem 0;">
  <div style="background: var(--color-background-secondary); border-radius: var(--border-radius-lg); border: 0.5px solid var(--color-border-tertiary); padding: 2rem; text-align: center; position: relative; overflow: hidden;">

    <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: #E8192C; border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;"></div>

    <span style="display: inline-block; background: #E8192C; color: #fff; font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 14px; border-radius: 999px; margin-bottom: 1.25rem;">Limited time offer</span>

    <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 4px;">
      <span style="font-size: 14px; color: var(--color-text-secondary); text-decoration: line-through;">₹9,999</span>
      <span style="background: var(--color-background-danger); color: var(--color-text-danger); font-size: 12px; font-weight: 500; padding: 2px 8px; border-radius: var(--border-radius-md);">100% off</span>
    </div>

    <div style="font-size: 72px; font-weight: 500; line-height: 1; color: var(--color-text-primary); margin-bottom: 6px;">FREE</div>

    <div style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-text-secondary); margin-bottom: 1.75rem;">One-time · completely free</div>

    <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 1.75rem; text-align: left;">
      <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--color-text-secondary);">
        <i class="ti ti-check" style="font-size: 16px; color: #E8192C;" aria-hidden="true"></i>
        Full blueprint access
      </div>
      <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--color-text-secondary);">
        <i class="ti ti-check" style="font-size: 16px; color: #E8192C;" aria-hidden="true"></i>
        Lifetime updates included
      </div>
      <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--color-text-secondary);">
        <i class="ti ti-check" style="font-size: 16px; color: #E8192C;" aria-hidden="true"></i>
        Instant download
      </div>
    </div>

    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full py-5 rounded-[10px] bg-[#E8192C] font-bold uppercase tracking-[0.08em] hover:bg-red-700 transition-all mt-8"
    >
      {loading ? "Processing..." : "Get it free"}
    </button>

    <p style="font-size: 12px; color: var(--color-text-tertiary); margin-top: 14px; margin-bottom: 0;">
      <i class="ti ti-lock" style="font-size: 13px; vertical-align: -1px; margin-right: 4px;" aria-hidden="true"></i>
      Secure checkout · 7-day refund guarantee
    </p>
  </div>

  <p style="text-align: center; font-size: 12px; color: var(--color-text-tertiary); margin-top: 12px;">
    <i class="ti ti-clock" style="font-size: 13px; vertical-align: -1px; margin-right: 4px;" aria-hidden="true"></i>
    Offer expires soon
  </p>
</div>
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