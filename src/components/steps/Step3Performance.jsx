export default function Step3Performance({
  formData,
  updateField,
  nextStep,
  previousStep,
}) {
  return (
    <div>
      {/* HEADER */}

      <div className="pt-[60px] pb-10 border-b border-[rgba(255,255,255,.07)] mb-11">
        <div className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#E8192C] mb-[10px]">
          Section 03 — Current Performance
        </div>

        <h2 className="text-[30px] font-extrabold text-white mb-[10px]">
          Your numbers today
        </h2>

        <p className="text-[14px] text-[#A8A49C] max-w-[560px] leading-[1.75]">
          Rough estimates are fine. These become the
          baseline that every recommendation and KPI
          is built around.
        </p>
      </div>

      {/* SOCIAL REACH */}

      <div className="bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[18px] p-7 mb-5 border-l-[3px] border-l-[#E8192C]">
        <div className="flex items-center gap-3 text-white font-semibold mb-5">
          
          Social Media Reach
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <MetricInput
            label="Instagram Followers"
            field="ig_f"
            formData={formData}
            updateField={updateField}
          />

          <MetricInput
            label="Facebook Page Likes"
            field="fb_f"
            formData={formData}
            updateField={updateField}
          />

          <MetricInput
            label="YouTube Subscribers"
            field="yt_s"
            formData={formData}
            updateField={updateField}
          />

          <MetricInput
            label="LinkedIn Followers"
            field="li_f"
            formData={formData}
            updateField={updateField}
          />

          <MetricInput
            label="WhatsApp / Telegram"
            field="wa_s"
            formData={formData}
            updateField={updateField}
          />

          <MetricInput
            label="Monthly Website Visitors"
            field="web_v"
            formData={formData}
            updateField={updateField}
          />
        </div>
      </div>

      {/* ENGAGEMENT */}

      <div className="bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[18px] p-7 mb-5 border-l-[3px] border-l-[#E8192C]">

        <div className="flex items-center gap-3 text-white font-semibold mb-5">
          
          Engagement & Conversion
        </div>

        <div className="grid md:grid-cols-3 gap-4">

          <MetricInput
            label="Avg Post Reach"
            field="avg_r"
            formData={formData}
            updateField={updateField}
          />

          <MetricInput
            label="Engagement Rate (%)"
            field="eng_r"
            formData={formData}
            updateField={updateField}
            step="0.1"
          />

          <MetricInput
            label="Monthly Leads"
            field="cur_leads"
            formData={formData}
            updateField={updateField}
          />

          <MetricInput
            label="Website Conversion (%)"
            field="web_conv"
            formData={formData}
            updateField={updateField}
            step="0.1"
          />

          <MetricInput
            label="Digital Customers"
            field="dig_cust"
            formData={formData}
            updateField={updateField}
          />

          <MetricInput
            label="Revenue from Digital"
            field="dig_rev"
            formData={formData}
            updateField={updateField}
          />

        </div>
      </div>
<div className="mt-10">

  <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-4">
    How do you rate your current digital performance overall?
  </label>

  <div className="bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[18px] p-6">

    <div className="flex justify-between text-sm text-[#A8A49C] mb-4">
      <span>Very poor</span>
      <span>
        {formData.digital_rating || 7} / 10
      </span>
      <span>Excellent</span>
    </div>

    <input
      type="range"
      min="1"
      max="10"
      value={formData.digital_rating || 7}
      onChange={(e) =>
        updateField(
          "digital_rating",
          Number(e.target.value)
        )
      }
      className="w-full accent-[#E8192C]"
    />
  </div>

</div>
<div className="mt-10">

  <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-4">
    Top 3 Competitors You Benchmark Against
  </label>

  <div className="grid md:grid-cols-3 gap-4">

    <input
      type="text"
      placeholder="Competitor 1"
      value={formData.competitor_1 || ""}
      onChange={(e) =>
        updateField(
          "competitor_1",
          e.target.value
        )
      }
      className="
        bg-[#111110]
        border
        border-[rgba(255,255,255,.07)]
        rounded-[10px]
        p-3
      "
    />

    <input
      type="text"
      placeholder="Competitor 2"
      value={formData.competitor_2 || ""}
      onChange={(e) =>
        updateField(
          "competitor_2",
          e.target.value
        )
      }
      className="
        bg-[#111110]
        border
        border-[rgba(255,255,255,.07)]
        rounded-[10px]
        p-3
      "
    />

    <input
      type="text"
      placeholder="Competitor 3"
      value={formData.competitor_3 || ""}
      onChange={(e) =>
        updateField(
          "competitor_3",
          e.target.value
        )
      }
      className="
        bg-[#111110]
        border
        border-[rgba(255,255,255,.07)]
        rounded-[10px]
        p-3
      "
    />

  </div>

</div>
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-[rgba(255,255,255,.07)]">

  <button
    onClick={previousStep}
    className="
      w-full sm:w-auto
      border
      border-[rgba(255,255,255,.07)]
      px-6
      py-3
      rounded-[10px]
    "
  >
    ← Back
  </button>

  <div className="uppercase text-[11px] tracking-[0.1em] text-[#5C5850]">
    Step 3 of 7
  </div>

  <button
    onClick={nextStep}
    className="
      w-full sm:w-auto
      bg-[#E8192C]
      px-8
      py-4
      rounded-[10px]
      font-bold
      uppercase
    "
  >
    Next: Challenges →
  </button>

</div>
    </div>
  );
}

/* Reusable Metric Field */

function MetricInput({
  label,
  field,
  formData,
  updateField,
  step,
}) {
  return (
    <div>
      <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-2">
        {label}
      </label>

      <input
        type="number"
        step={step}
        value={formData[field] || ""}
        onChange={(e) =>
          updateField(field, e.target.value)
        }
        className="
          w-full
          bg-[#181614]
          border
          border-[rgba(255,255,255,.07)]
          rounded-[10px]
          p-3
          text-white
        "
      />
    </div>
  );
}