import {
  teamRoles,
  budgetRanges,
  teamModels,
} from "../../data/teamOptions";

export default function Step6TeamBudget({
  formData,
  updateField,
  nextStep,
  previousStep,
}) {
  const selectedRoles =
    formData.team_roles || [];

  const toggleRole = (role) => {
    const exists =
      selectedRoles.includes(role);

    if (exists) {
      updateField(
        "team_roles",
        selectedRoles.filter(
          (item) => item !== role
        )
      );
    } else {
      updateField("team_roles", [
        ...selectedRoles,
        role,
      ]);
    }
  };

  return (
    <div>
      {/* HEADER */}

      <div className="pt-[60px] pb-10 border-b border-[rgba(255,255,255,.07)] mb-11">

        <div className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#E8192C] mb-[10px]">
          Section 06 — Team & Budget
        </div>

        <h2 className="text-[30px] font-extrabold text-white mb-[10px]">
          Resources you can commit
        </h2>

        <p className="text-[14px] text-[#A8A49C] max-w-[560px] leading-[1.75]">
          This determines your recommended digital team structure — how many people, which roles, how they're organised inside your workflow.
        </p>

      </div>

      {/* CURRENT TEAM */}

      <div className="mb-10">

        <div className="uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-4">
          Existing in-house digital team roles
        </div>

        <div className="grid md:grid-cols-3 gap-3">

          {teamRoles.map((role) => {
            const active =
              selectedRoles.includes(
                role.value
              );

            return (
              <button
                key={role.value}
                type="button"
                onClick={() =>
                  toggleRole(role.value)
                }
                className={`
                  p-4
                  rounded-[10px]
                  border
                  text-left
                  transition-all

                  ${
                    active
                      ? "bg-[rgba(232,25,44,.12)] border-[#E8192C] text-white"
                      : "bg-[#111110] border-[rgba(255,255,255,.07)] text-[#A8A49C]"
                  }
                `}
              >
                {role.label}
              </button>
            );
          })}

        </div>

      </div>

      {/* TEAM SIZE */}

      <div className="grid md:grid-cols-2 gap-5 mb-8">

        <div>
          <label className="block text-sm text-[#A8A49C] mb-2">
            Total Employees
          </label>

          <input
            type="number"
            value={
              formData.employee_count || ""
            }
            onChange={(e) =>
              updateField(
                "employee_count",
                e.target.value
              )
            }
            className="
              w-full
              bg-[#111110]
              border
              border-[rgba(255,255,255,.07)]
              rounded-[10px]
              p-3
            "
          />
        </div>

        <div>
          <label className="block text-sm text-[#A8A49C] mb-2">
            Marketing Team Size
          </label>

          <input
            type="number"
            value={
              formData.marketing_team ||
              ""
            }
            onChange={(e) =>
              updateField(
                "marketing_team",
                e.target.value
              )
            }
            className="
              w-full
              bg-[#111110]
              border
              border-[rgba(255,255,255,.07)]
              rounded-[10px]
              p-3
            "
          />
        </div>

      </div>

      {/* BUDGET */}

      <div className="bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[18px] p-7 mb-8">

        <h3 className="font-bold text-white mb-5">
          Monthly Budget Allocation
        </h3>

        <div className="space-y-5">

          <div>
            <label className="block text-sm text-[#A8A49C] mb-3">
              Marketing Budget
            </label>

            <div className="grid md:grid-cols-2 gap-3">

              {budgetRanges.map(
                (budget) => (
                  <button
                    key={budget.value}
                    type="button"
                    onClick={() =>
                      updateField(
                        "marketing_budget",
                        budget.value
                      )
                    }
                    className={`
                      p-4
                      rounded-[10px]
                      border
                      text-left

                      ${
                        formData.marketing_budget ===
                        budget.value
                          ? "border-[#E8192C] bg-[rgba(232,25,44,.12)]"
                          : "border-[rgba(255,255,255,.07)]"
                      }
                    `}
                  >
                    {budget.label}
                  </button>
                )
              )}

            </div>
          </div>

          <div>
            <label className="block text-sm text-[#A8A49C] mb-3">
              Monthly Ad Spend
            </label>

            <input
              type="number"
              value={
                formData.ad_budget || ""
              }
              onChange={(e) =>
                updateField(
                  "ad_budget",
                  e.target.value
                )
              }
              placeholder="e.g. 50000"
              className="
                w-full
                bg-[#181614]
                border
                border-[rgba(255,255,255,.07)]
                rounded-[10px]
                p-3
              "
            />
          </div>

        </div>

      </div>

      {/* EXECUTION MODEL */}

      <div className="mb-8">

        <div className="uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-4">
          Preferred Execution Model
        </div>

        <div className="grid md:grid-cols-3 gap-4">

          {teamModels.map((model) => (
            <button
              key={model.value}
              type="button"
              onClick={() =>
                updateField(
                  "team_model",
                  model.value
                )
              }
              className={`
                p-5
                rounded-[12px]
                border
                text-left

                ${
                  formData.team_model ===
                  model.value
                    ? "border-[#E8192C] bg-[rgba(232,25,44,.12)]"
                    : "border-[rgba(255,255,255,.07)] bg-[#111110]"
                }
              `}
            >
              <h4 className="font-semibold text-white mb-2">
                {model.title}
              </h4>

              <p className="text-sm text-[#A8A49C]">
                {model.description}
              </p>
            </button>
          ))}

        </div>

      </div>

{/* TEAM CAPACITY */}

<div className="grid md:grid-cols-2 gap-6 mb-10">

  <div>
    <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-3">
      People You Can Dedicate To Digital (Full-Time)
    </label>

    <select
      value={formData.digital_team_size || ""}
      onChange={(e) =>
        updateField(
          "digital_team_size",
          e.target.value
        )
      }
      className="w-full bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[12px] p-4 text-white"
    >
      <option value="">Select</option>
      <option value="0">None</option>
      <option value="1">1 Person</option>
      <option value="2">2 People</option>
      <option value="3_5">3 - 5 People</option>
      <option value="6_10">6 - 10 People</option>
      <option value="10_plus">10+ People</option>
    </select>
  </div>

  <div>
    <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-3">
      Preferred Engagement Model With SocialBureau
    </label>

    <select
      value={formData.engagement_model || ""}
      onChange={(e) =>
        updateField(
          "engagement_model",
          e.target.value
        )
      }
      className="w-full bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[12px] p-4 text-white"
    >
      <option value="">Select</option>
      <option value="full_service">
        Full-Service Digital Partner
      </option>
      <option value="consulting">
        Strategic Consulting
      </option>
      <option value="content_only">
        Content Creation Only
      </option>
      <option value="ads_only">
        Performance Marketing Only
      </option>
      <option value="seo_only">
        SEO Only
      </option>
      <option value="website">
        Website & Funnel Development
      </option>
      <option value="not_sure">
        Not Sure Yet
      </option>
    </select>
  </div>

</div>

{/* BUDGET PLANNING */}

<div className="flex items-center gap-4 mb-8">
  <div className="flex-1 h-[1px] bg-[rgba(255,255,255,.08)]" />
  <span className="uppercase text-[11px] tracking-[0.12em] font-bold text-[#A8A49C]">
    Budget Planning
  </span>
  <div className="flex-1 h-[1px] bg-[rgba(255,255,255,.08)]" />
</div>

<div className="grid md:grid-cols-3 gap-6 mb-10">

  <div>
    <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-3">
      Total Monthly Marketing Budget *
    </label>

    <select
      value={formData.marketing_budget || ""}
      onChange={(e) =>
        updateField(
          "marketing_budget",
          e.target.value
        )
      }
      className="w-full bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[12px] p-4 text-white"
    >
      <option value="">Select Range</option>
      <option value="below_25k">Below ₹25,000</option>
      <option value="25k_50k">₹25,000 - ₹50,000</option>
      <option value="50k_1l">₹50,000 - ₹1 Lakh</option>
      <option value="1l_3l">₹1 Lakh - ₹3 Lakhs</option>
      <option value="3l_5l">₹3 Lakhs - ₹5 Lakhs</option>
      <option value="5l_plus">₹5 Lakhs+</option>
    </select>
  </div>

  <div>
    <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-3">
      Paid Ads Budget (Within Total)
    </label>

    <select
      value={formData.ads_budget || ""}
      onChange={(e) =>
        updateField(
          "ads_budget",
          e.target.value
        )
      }
      className="w-full bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[12px] p-4 text-white"
    >
      <option value="">Select</option>
      <option value="none">No Ads Budget</option>
      <option value="below_25k">Below ₹25,000</option>
      <option value="25k_50k">₹25,000 - ₹50,000</option>
      <option value="50k_1l">₹50,000 - ₹1 Lakh</option>
      <option value="1l_3l">₹1 Lakh - ₹3 Lakhs</option>
      <option value="3l_plus">₹3 Lakhs+</option>
    </select>
  </div>

  <div>
    <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-3">
      Expected ROI Timeframe
    </label>

    <select
      value={formData.roi_timeframe || ""}
      onChange={(e) =>
        updateField(
          "roi_timeframe",
          e.target.value
        )
      }
      className="w-full bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[12px] p-4 text-white"
    >
      <option value="">Select</option>
      <option value="1_3_months">1 - 3 Months</option>
      <option value="3_6_months">3 - 6 Months</option>
      <option value="6_12_months">6 - 12 Months</option>
      <option value="long_term">
        Long-Term Brand Building
      </option>
    </select>
  </div>

</div>

{/* TOOLS */}

<div className="mb-8">

  <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-3">
    Tools Your Team Already Uses
  </label>

  <div className="inline-flex text-[10px] uppercase tracking-[0.12em] font-semibold px-3 py-1 rounded-full bg-[rgba(255,255,255,.05)] text-[#A8A49C] mb-4">
    Skip If None
  </div>

  <input
    type="text"
    value={formData.current_tools || ""}
    onChange={(e) =>
      updateField(
        "current_tools",
        e.target.value
      )
    }
    placeholder="e.g. Canva, ClickUp, Meta Ads Manager, SEMrush, HubSpot..."
    className="w-full bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[12px] p-4 text-white"
  />

</div>

      {/* FOOTER */}

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
    Step 6 of 7
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
    Next: Workflow →
  </button>

</div>
    </div>
  );
}