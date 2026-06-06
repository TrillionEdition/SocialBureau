import { industries } from "../../data/industries";

export default function Step1Business({
  formData,
  updateField,
  nextStep,
}) {
  return (
    <div>

      {/* HEADER */}

      <div className="pt-[60px] pb-10 border-b border-[rgba(255,255,255,.07)] mb-11">

        <div className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#E8192C] mb-[10px]">
          Section 01 — Business Identity
        </div>

        <h2 className="text-[30px] font-extrabold text-white mb-[10px]">
          Tell us about your business
        </h2>

        <p className="text-[14px] text-[#A8A49C] max-w-[560px] leading-[1.75]">
          This shapes every recommendation —
          from team size to platform priorities.
          Fill in as much detail as possible.
        </p>

      </div>

      {/* COMPANY */}

      <div className="mb-7">
        <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-2">
          Company / Brand Name
          <span className="text-[#E8192C] ml-1">*</span>
        </label>

        <input
          type="text"
          value={formData.company_name}
          onChange={(e) =>
            updateField(
              "company_name",
              e.target.value
            )
          }
          placeholder="Your official brand or company name"
          className="w-full bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[10px] px-4 py-3 outline-none text-white"
        />
      </div>

      {/* CONTACT GRID */}

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-2">
            Contact Person Name
            <span className="text-[#E8192C] ml-1">*</span>
          </label>

          <input
            type="text"
            value={formData.contact_name}
            onChange={(e) =>
              updateField(
                "contact_name",
                e.target.value
              )
            }
            placeholder="Full Name"
            className="w-full bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[10px] px-4 py-3 text-white"
          />
        </div>

        <div>
          <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-2">
            Designation / Role
          </label>

          <input
            type="text"
            value={formData.contact_role}
            onChange={(e) =>
              updateField(
                "contact_role",
                e.target.value
              )
            }
            placeholder="CEO, Founder..."
            className="w-full bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[10px] px-4 py-3 text-white"
          />
        </div>

        <div>
          <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-2">
            Email Address
          </label>

          <input
            type="email"
            value={formData.contact_email}
            onChange={(e) =>
              updateField(
                "contact_email",
                e.target.value
              )
            }
            placeholder="your@company.com"
            className="w-full bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[10px] px-4 py-3 text-white"
          />
        </div>

        <div>
          <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-2">
            Phone / WhatsApp
          </label>

          <input
            type="text"
            value={formData.contact_phone}
            onChange={(e) =>
              updateField(
                "contact_phone",
                e.target.value
              )
            }
            placeholder="+91 XXXXX XXXXX"
            className="w-full bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[10px] px-4 py-3 text-white"
          />
        </div>

      </div>

      {/* SEPARATOR */}

      <div className="flex items-center gap-4 my-10">
        <div className="flex-1 h-px bg-[rgba(255,255,255,.07)]" />
        <span className="uppercase text-[10px] tracking-[0.2em] text-[#5C5850]">
          Industry & Scale
        </span>
        <div className="flex-1 h-px bg-[rgba(255,255,255,.07)]" />
      </div>

      {/* INDUSTRIES */}

      <div className="mb-8">

        <div className="uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-4">
          Select Your Industry
        </div>

        <div className="grid md:grid-cols-3 gap-3">

          {industries.map((industry) => (
            <label
              key={industry.value}
              className={`
                p-4 rounded-[10px]
                border cursor-pointer
                transition-all

                ${
                  formData.industry === industry.value
                    ? "border-[#E8192C] bg-[rgba(232,25,44,.12)]"
                    : "border-[rgba(255,255,255,.07)] bg-[#111110]"
                }
              `}
            >
              <input
                type="radio"
                name="industry"
                value={industry.value}
                checked={
                  formData.industry ===
                  industry.value
                }
                onChange={(e) =>
                  updateField(
                    "industry",
                    e.target.value
                  )
                }
                className="hidden"
              />

              <div className="font-semibold text-white mb-1">
                {industry.title}
              </div>

              <div className="text-[12px] text-[#5C5850]">
                {industry.description}
              </div>

            </label>
          ))}

        </div>
      </div>

      {/* DROPDOWNS */}

      <div className="grid md:grid-cols-2 gap-4">

        <select
          value={formData.biz_size}
          onChange={(e) =>
            updateField(
              "biz_size",
              e.target.value
            )
          }
          className="bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[10px] p-3"
        >
          <option value="">
            Select Company Size
          </option>
          <option value="solo">
            Solo / Freelancer
          </option>
          <option value="micro">
            Micro (2–10)
          </option>
          <option value="small">
            Small (11–50)
          </option>
          <option value="mid">
            Mid-size (51–200)
          </option>
          <option value="large">
            Large (200+)
          </option>
        </select>

        <select
          value={formData.biz_stage}
          onChange={(e) =>
            updateField(
              "biz_stage",
              e.target.value
            )
          }
          className="bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[10px] p-3"
        >
          <option value="">
            Select Stage
          </option>

          <option value="new">
            New Launch
          </option>

          <option value="growth">
            Growing
          </option>

          <option value="established">
            Established
          </option>

          <option value="mature">
            Mature
          </option>
        </select>

      </div>
<div className="mt-8">
  <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-2">
    Target Geography
  </label>

  <select
    value={formData.geography}
    onChange={(e) => updateField("geography", e.target.value)}
    className="
      w-full
      bg-[#111110]
      text-white
      border
      border-red-500
      rounded-[18px]
      px-6
      py-4
      text-[18px]
      outline-none
      appearance-none
      cursor-pointer
    "
  >
    <option value="">Primary market</option>
    <option value="Single city / local">Single city / local</option>
    <option value="State-wide">State-wide</option>
    <option value="Multi-state / regional">Multi-state / regional</option>
    <option value="Pan-India">Pan-India</option>
    <option value="International / Global">International / Global</option>
  </select>
</div>
<div className="mt-8">
  <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-2">
    Primary Target Audience
  </label>

  <select
    value={formData.audience}
    onChange={(e) => updateField("audience", e.target.value)}
    className="
      w-full
      bg-[#111110]
      text-white
      border
      border-red-500
      rounded-[18px]
      px-6
      py-4
      text-[18px]
      outline-none
      appearance-none
      cursor-pointer
    "
  >
    <option value="">Who are your customers?</option>
    <option value="B2C — Youth (18–30)">B2C — Youth (18–30)</option>
    <option value="B2C — Adults (30–55)">B2C — Adults (30–55)</option>
    <option value="B2C — General public">B2C — General public</option>
    <option value="B2B — SMEs / Small businesses">
      B2B — SMEs / Small businesses
    </option>
    <option value="B2B — Corporates / Enterprise">
      B2B — Corporates / Enterprise
    </option>
    <option value="B2B2C — Both">B2B2C — Both</option>
  </select>
</div>
<div className="mt-8">

  <div className="uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-4">
    Primary Business Objective Right Now
  </div>

  <div className="grid md:grid-cols-2 gap-3">

    {[
      {
        value: "brand_awareness",
        label: "Build brand awareness",
      },
      {
        value: "lead_generation",
        label: "Generate leads / enquiries",
      },
      {
        value: "sales",
        label: "Drive direct sales / revenue",
      },
      {
        value: "community",
        label: "Build community / following",
      },
      {
        value: "retention",
        label: "Retain existing customers",
      },
      {
        value: "authority",
        label: "Build authority / credibility",
      },
    ].map((item) => (
      <button
        key={item.value}
        type="button"
        onClick={() =>
          updateField("main_obj", item.value)
        }
        className={`
          p-4
          rounded-[10px]
          border
          text-left
          transition-all

          ${
            formData.main_obj === item.value
              ? "border-[#E8192C] bg-[rgba(232,25,44,.12)] text-white"
              : "border-[rgba(255,255,255,.07)] bg-[#111110] text-[#A8A49C]"
          }
        `}
      >
        {item.label}
      </button>
    ))}

  </div>
</div>
      {/* USP */}

      <div className="mt-8">

        <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-2">
          What makes your business unique?
        </label>

        <textarea
          rows={5}
          value={formData.usp}
          onChange={(e) =>
            updateField("usp", e.target.value)
          }
          placeholder="Your differentiator..."
          className="w-full bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[10px] p-4 text-white"
        />
      </div>

      {/* FOOTER */}

    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-[rgba(255,255,255,.07)]">

  <div className="uppercase text-[11px] tracking-[0.1em] text-[#5C5850] self-start sm:self-auto">
    Step 1 of 7
  </div>

  <button
    onClick={nextStep}
    className="
      w-full sm:w-auto
      bg-[#E8192C]
      px-5
      py-4
      rounded-[10px]
      font-bold
      uppercase
      tracking-[0.08em]
      hover:bg-red-700
      transition-all
    "
  >
    Next: Digital Presence →
  </button>

</div>

    </div>
  );
}