import {
  businessGoals,
  growthTimeframes,
} from "../../data/goals";
const InputField = ({
  label,
  value,
  onChange,
  placeholder,
}) => (
  <div>
    <label className="block uppercase text-[11px] tracking-[0.08em] font-bold text-[#A8A49C] mb-3">
      {label}
    </label>

    <input
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="
        w-full
        bg-[#111110]
        border
        border-[rgba(255,255,255,.08)]
        rounded-[12px]
        p-4
        text-white
        placeholder:text-[#5C5852]
      "
    />
  </div>
);
export default function Step5Goals({
  formData,
  updateField,
  nextStep,
  previousStep,
}) {
  const selectedGoals =
    formData.goals || [];

  const toggleGoal = (goal) => {
    const exists =
      selectedGoals.includes(goal);

    if (exists) {
      updateField(
        "goals",
        selectedGoals.filter(
          (item) => item !== goal
        )
      );
    } else {
      updateField("goals", [
        ...selectedGoals,
        goal,
      ]);
    }
  };

  return (
    <div>
      {/* HEADER */}

      <div className="pt-[60px] pb-10 border-b border-[rgba(255,255,255,.07)] mb-11">

        <div className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#E8192C] mb-[10px]">
          Section 05 — Goals & Targets
        </div>

        <h2 className="text-[30px] font-extrabold text-white mb-[10px]">
          Where do you want to go?
        </h2>

        <p className="text-[14px] text-[#A8A49C] max-w-[560px] leading-[1.75]">
          Define your 3, 6, and 12-month targets. These drive your workflow priorities, team size recommendations, and platform strategy.
        </p>

      </div>

      {/* GOALS */}

{/* 3 MONTH TARGETS */}

<div className="bg-[#0F0F0F] border border-[rgba(255,255,255,.08)] rounded-[24px] p-7 mb-6">
  <div className="flex items-center gap-3 mb-6">
    <h3 className="text-white font-semibold text-lg">
      3-Month Targets
    </h3>
  </div>

  <div className="grid md:grid-cols-3 gap-4">
    <InputField
      label="Total Followers Target"
      value={formData.target_3m_followers}
      onChange={(e) =>
        updateField("target_3m_followers", e.target.value)
      }
      placeholder="e.g. 50,000 across platforms"
    />

    <InputField
      label="Monthly Leads Target"
      value={formData.target_3m_leads}
      onChange={(e) =>
        updateField("target_3m_leads", e.target.value)
      }
      placeholder="e.g. 200 leads/month"
    />

    <InputField
      label="Revenue From Digital (₹/Month)"
      value={formData.target_3m_revenue}
      onChange={(e) =>
        updateField("target_3m_revenue", e.target.value)
      }
      placeholder="e.g. 2,00,000"
    />
  </div>
</div>

{/* 6 MONTH TARGETS */}

<div className="bg-[#0F0F0F] border border-[rgba(255,255,255,.08)] rounded-[24px] p-7 mb-6">
  <div className="flex items-center gap-3 mb-6">
    <h3 className="text-white font-semibold text-lg">
      6-Month Targets
    </h3>
  </div>

  <div className="grid md:grid-cols-3 gap-4">
    <InputField
      label="Total Followers Target"
      value={formData.target_6m_followers}
      onChange={(e) =>
        updateField("target_6m_followers", e.target.value)
      }
      placeholder="e.g. 1,50,000 total"
    />

    <InputField
      label="Monthly Leads Target"
      value={formData.target_6m_leads}
      onChange={(e) =>
        updateField("target_6m_leads", e.target.value)
      }
      placeholder="e.g. 500 leads/month"
    />

    <InputField
      label="Revenue From Digital (₹/Month)"
      value={formData.target_6m_revenue}
      onChange={(e) =>
        updateField("target_6m_revenue", e.target.value)
      }
      placeholder="e.g. 5,00,000"
    />
  </div>
</div>

{/* 12 MONTH VISION */}

<div className="bg-[#0F0F0F] border border-[rgba(255,255,255,.08)] rounded-[24px] p-7 mb-6">
  <div className="flex items-center gap-3 mb-6">
    <h3 className="text-white font-semibold text-lg">
      12-Month Vision
    </h3>
  </div>

  <div className="grid md:grid-cols-3 gap-4">
    <InputField
      label="Total Followers Target"
      value={formData.target_12m_followers}
      onChange={(e) =>
        updateField("target_12m_followers", e.target.value)
      }
      placeholder="e.g. 5,00,000 total"
    />

    <InputField
      label="Monthly Revenue Target (₹)"
      value={formData.target_12m_revenue}
      onChange={(e) =>
        updateField("target_12m_revenue", e.target.value)
      }
      placeholder="e.g. 20,00,000"
    />

    <select
      value={formData.market_position || ""}
      onChange={(e) =>
        updateField("market_position", e.target.value)
      }
      className="w-full bg-[#111110] border border-[rgba(255,255,255,.08)] rounded-[12px] p-4 text-white"
    >
      <option value="">Select ambition</option>
      <option value="local_leader">
        Become Local Market Leader
      </option>
      <option value="state_leader">
        Become State Leader
      </option>
      <option value="national_brand">
        Become National Brand
      </option>
      <option value="industry_authority">
        Industry Authority
      </option>
    </select>
  </div>
</div>

{/* BOTTOM SECTION */}

<div className="grid md:grid-cols-2 gap-6">
  <div>
    <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-3">
      Priority Platform Focus *
    </label>

    <select
      value={formData.priority_platform || ""}
      onChange={(e) =>
        updateField("priority_platform", e.target.value)
      }
      className="w-full bg-[#111110] border border-[rgba(255,255,255,.08)] rounded-[12px] p-4 text-white"
    >
      <option value="">
        Where should we focus most?
      </option>
      <option>Instagram</option>
      <option>Facebook</option>
      <option>YouTube</option>
      <option>LinkedIn</option>
      <option>Google Search</option>
      <option>Website</option>
      <option>Multi-Platform</option>
    </select>
  </div>

  <div>
    <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-3">
      Urgency Level
    </label>

    <select
      value={formData.urgency_level || ""}
      onChange={(e) =>
        updateField("urgency_level", e.target.value)
      }
      className="w-full bg-[#111110] border border-[rgba(255,255,255,.08)] rounded-[12px] p-4 text-white"
    >
      <option value="">Select</option>
      <option value="immediate">
        Immediate (0-30 days)
      </option>
      <option value="soon">
        Soon (1-3 months)
      </option>
      <option value="planned">
        Planned (3-6 months)
      </option>
    </select>
  </div>
</div>

      {/* SUCCESS DEFINITION */}

      <div className="mb-8">

        <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-3">
          What would make this project a success?
        </label>

        <textarea
          rows={6}
          value={
            formData.success_definition ||
            ""
          }
          onChange={(e) =>
            updateField(
              "success_definition",
              e.target.value
            )
          }
          placeholder="Describe what success looks like after implementing the workflow..."
          className="
            w-full
            bg-[#111110]
            border
            border-[rgba(255,255,255,.07)]
            rounded-[12px]
            p-4
          "
        />

      </div>

      {/* FOOTER */}

      <div className="flex justify-between items-center mt-12 pt-8 border-t border-[rgba(255,255,255,.07)]">

        <button
          onClick={previousStep}
          className="
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
          Step 5 of 7
        </div>

        <button
          onClick={nextStep}
          className="
            bg-[#E8192C]
            px-8
            py-4
            rounded-[10px]
            font-bold
            uppercase
          "
        >
          Next: Team & Budget →
        </button>

      </div>
    </div>
  );
}