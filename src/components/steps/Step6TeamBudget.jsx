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
          Current resources & budget
        </h2>

        <p className="text-[14px] text-[#A8A49C] max-w-[560px] leading-[1.75]">
          This helps determine whether the
          blueprint should recommend an
          in-house team, agency structure,
          or hybrid execution model.
        </p>

      </div>

      {/* CURRENT TEAM */}

      <div className="mb-10">

        <div className="uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-4">
          Current Team Members
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

      {/* NOTES */}

      <div>

        <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-3">
          Team Notes
        </label>

        <textarea
          rows={5}
          value={
            formData.team_notes || ""
          }
          onChange={(e) =>
            updateField(
              "team_notes",
              e.target.value
            )
          }
          placeholder="Anything else we should know about your team?"
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
          Step 6 of 7
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
          Next: Workflow →
        </button>

      </div>
    </div>
  );
}