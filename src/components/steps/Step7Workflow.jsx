// generateBlueprint removed; use parent onSubmit to trigger generation/paywall
import {
  reportingFrequencies,
  approvalFlows,
  automationLevels,
  aiPreferences,
  crmOptions,
  toolsList,
} from "../../data/workflowOptions";
export const accessOptions = [
  {
    value: "meta_business_suite",
    label: "Meta Business Suite",
  },
  {
    value: "youtube_studio",
    label: "YouTube Studio",
  },
  {
    value: "ga4",
    label: "Google Analytics 4",
  },
  {
    value: "search_console",
    label: "Google Search Console",
  },
  {
    value: "google_ads",
    label: "Google Ads Account",
  },
  {
    value: "wordpress",
    label: "Website CMS / WordPress",
  },
  {
    value: "crm",
    label: "CRM / Lead System",
  },
  {
    value: "nothing_yet",
    label: "Nothing Yet — Will Set Up",
  },
];
export const servicesNeeded = [
  {
    value: "social_media_management",
    title: "Social Media Management",
    description: "Daily posting, scheduling, community",
  },
  {
    value: "content_production",
    title: "Content Production",
    description: "Graphics, videos, copywriting",
  },
  {
    value: "seo",
    title: "SEO / Google Ranking",
    description: "On-page, off-page, technical SEO",
  },
  {
    value: "meta_ads",
    title: "Meta Ads Management",
    description: "Facebook & Instagram campaigns",
  },
  {
    value: "google_ads",
    title: "Google Ads",
    description: "Search, display, YouTube ads",
  },
  {
    value: "youtube_growth",
    title: "YouTube Growth Strategy",
    description: "SEO, thumbnails, ranking",
  },
  {
    value: "website",
    title: "Website Design / Revamp",
    description: "UI/UX, landing pages, CRO",
  },
  {
    value: "analytics",
    title: "Analytics & Reporting",
    description: "Custom dashboards, insights",
  },
  {
    value: "influencer",
    title: "Influencer Marketing",
    description: "Identify, negotiate, manage",
  },
  {
    value: "email_marketing",
    title: "Email / WhatsApp Marketing",
    description: "Campaigns, automation, funnels",
  },
  {
    value: "clickup_setup",
    title: "ClickUp Workspace Setup",
    description: "Project management workflows",
  },
  {
    value: "training",
    title: "Team Training",
    description: "Digital marketing upskilling",
  },
];
export default function Step7Workflow({
  formData,
  updateField,
  previousStep,
  onSubmit,
}) {
  const selectedServices =
  formData.services_needed || [];

const selectedAccess =
  formData.access_provided || [];

const toggleService = (value) => {
  const exists =
    selectedServices.includes(value);

  updateField(
    "services_needed",
    exists
      ? selectedServices.filter(
          (v) => v !== value
        )
      : [...selectedServices, value]
  );
};
const toggleAccess = (value) => {
  const exists =
    selectedAccess.includes(value);

  updateField(
    "access_provided",
    exists
      ? selectedAccess.filter(
          (v) => v !== value
        )
      : [...selectedAccess, value]
  );
};
  return (
  <div>
    {/* HEADER */}

    <div className="pt-[60px] pb-10 border-b border-[rgba(255,255,255,.07)] mb-11">
      <div className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#E8192C] mb-[10px]">
        Section 07 — Services & Collaboration
      </div>

      <h2 className="text-[30px] font-extrabold text-white mb-[10px]">
        How Can SocialBureau Help?
      </h2>

      <p className="text-[14px] text-[#A8A49C] max-w-[560px] leading-[1.75]">
        Select the services you need, how you'd
        like to communicate, and what access can
        be provided to our team.
      </p>
    </div>

    {/* SERVICES */}

    <div className="mb-12">
      <div className="flex items-center gap-3 mb-5">
        <h3 className="uppercase tracking-[0.1em] text-[11px] font-bold text-[#A8A49C]">
          SocialBureau Services You Need
        </h3>

        <span className="px-3 py-1 text-[10px] rounded-full bg-[rgba(232,25,44,.12)] border border-[rgba(232,25,44,.2)] text-[#F6C15A] uppercase tracking-[0.1em]">
          Multi-Select
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {servicesNeeded.map((item) => {
          const active =
            selectedServices.includes(
              item.value
            );

          return (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                toggleService(item.value)
              }
              className={`
                p-5
                rounded-[14px]
                border
                text-left
                transition-all

                ${
                  active
                    ? "border-[#E8192C] bg-[rgba(232,25,44,.12)]"
                    : "border-[rgba(255,255,255,.07)] bg-[#111110]"
                }
              `}
            >
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  checked={active}
                  readOnly
                />

                <div>
                  <h4 className="font-semibold text-white mb-1">
                    {item.title}
                  </h4>

                  <p className="text-sm text-[#8E8A82]">
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>

    {/* REPORTING + COMMUNICATION */}

    <div className="grid md:grid-cols-2 gap-6 mb-12">
      <div>
        <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-3">
          Preferred Reporting Frequency
        </label>

        <select
          value={
            formData.reporting_frequency ||
            ""
          }
          onChange={(e) =>
            updateField(
              "reporting_frequency",
              e.target.value
            )
          }
          className="w-full bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[12px] p-4"
        >
          <option value="">Select</option>
          <option value="weekly">
            Weekly
          </option>
          <option value="biweekly">
            Bi-Weekly
          </option>
          <option value="monthly">
            Monthly
          </option>
          <option value="quarterly">
            Quarterly
          </option>
        </select>
      </div>

      <div>
        <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-3">
          Preferred Communication Channel
        </label>

        <select
          value={
            formData.communication_channel ||
            ""
          }
          onChange={(e) =>
            updateField(
              "communication_channel",
              e.target.value
            )
          }
          className="w-full bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[12px] p-4"
        >
          <option value="">Select</option>
          <option value="whatsapp">
            WhatsApp
          </option>
          <option value="email">
            Email
          </option>
          <option value="phone">
            Phone Call
          </option>
          <option value="google_meet">
            Google Meet
          </option>
          <option value="google_meet">
            Clickup
          </option>
        </select>
      </div>
    </div>

    {/* ACCESS */}

    <div className="mb-12">
      <div className="flex items-center gap-3 mb-5">
        <h3 className="uppercase tracking-[0.1em] text-[11px] font-bold text-[#A8A49C]">
          Access You Can Provide To SocialBureau
        </h3>

        <span className="px-3 py-1 text-[10px] rounded-full bg-[rgba(232,25,44,.12)] border border-[rgba(232,25,44,.2)] text-[#F6C15A] uppercase tracking-[0.1em]">
          Multi-Select
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {accessOptions.map((item) => {
          const active =
            selectedAccess.includes(
              item.value
            );

          return (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                toggleAccess(item.value)
              }
              className={`
                p-4
                rounded-[12px]
                border
                text-left

                ${
                  active
                    ? "border-[#E8192C] bg-[rgba(232,25,44,.12)]"
                    : "border-[rgba(255,255,255,.07)] bg-[#111110]"
                }
              `}
            >
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  checked={active}
                  readOnly
                />
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>

    {/* NOTES */}

    <div className="mb-8">
      <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-3">
        Any Final Notes, Upcoming Events,
        or Special Requirements?
      </label>

      <textarea
        rows={5}
        value={formData.final_notes || ""}
        onChange={(e) =>
          updateField(
            "final_notes",
            e.target.value
          )
        }
        placeholder="Upcoming launches, seasonal campaigns, partnerships, compliance requirements, or anything that may affect your strategy..."
        className="w-full bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[12px] p-4"
      />
    </div>

    {/* FOOTER */}

    <div className="flex justify-between items-center mt-12 pt-8 border-t border-[rgba(255,255,255,.07)]">
      <button
        onClick={previousStep}
        className="border border-[rgba(255,255,255,.07)] px-6 py-3 rounded-[10px]"
      >
        ← Back
      </button>

      <div className="uppercase text-[11px] tracking-[0.1em] text-[#5C5850]">
        Step 7 of 7
      </div>

      <button
        type="button"
        onClick={() => onSubmit && onSubmit()}
        className="px-6 py-3 bg-[#E8192C] rounded-[10px]"
      >
        ⚡ Generate My Workflow Plan
      </button>
    </div>
  </div>
);
}