import {
  businessGoals,
  growthTimeframes,
} from "../../data/goals";

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
          Define success
        </h2>

        <p className="text-[14px] text-[#A8A49C] max-w-[560px] leading-[1.75]">
          Tell us what growth looks like for
          your business so the workflow can be
          designed backwards from those outcomes.
        </p>

      </div>

      {/* GOALS */}

      <div className="mb-10">

        <div className="uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-4">
          Business Goals
        </div>

        <div className="grid md:grid-cols-2 gap-4">

          {businessGoals.map((goal) => {
            const active =
              selectedGoals.includes(
                goal.value
              );

            return (
              <button
                key={goal.value}
                type="button"
                onClick={() =>
                  toggleGoal(goal.value)
                }
                className={`
                  p-5
                  rounded-[12px]
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
                <h4 className="font-bold text-white mb-2">
                  {goal.title}
                </h4>

                <p className="text-sm text-[#A8A49C]">
                  {goal.description}
                </p>
              </button>
            );
          })}

        </div>
      </div>

      {/* REVENUE TARGETS */}

      <div className="bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[18px] p-7 mb-6">

        <h3 className="font-bold text-white mb-5">
          Revenue Targets
        </h3>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm text-[#A8A49C] mb-2">
              Current Monthly Revenue
            </label>

            <input
              type="number"
              value={
                formData.current_revenue ||
                ""
              }
              onChange={(e) =>
                updateField(
                  "current_revenue",
                  e.target.value
                )
              }
              className="w-full bg-[#181614] border border-[rgba(255,255,255,.07)] rounded-[10px] p-3"
            />
          </div>

          <div>
            <label className="block text-sm text-[#A8A49C] mb-2">
              Target Monthly Revenue
            </label>

            <input
              type="number"
              value={
                formData.target_revenue ||
                ""
              }
              onChange={(e) =>
                updateField(
                  "target_revenue",
                  e.target.value
                )
              }
              className="w-full bg-[#181614] border border-[rgba(255,255,255,.07)] rounded-[10px] p-3"
            />
          </div>

        </div>

      </div>

      {/* LEAD TARGETS */}

      <div className="bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[18px] p-7 mb-6">

        <h3 className="font-bold text-white mb-5">
          Lead Targets
        </h3>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm text-[#A8A49C] mb-2">
              Current Leads / Month
            </label>

            <input
              type="number"
              value={
                formData.current_leads ||
                ""
              }
              onChange={(e) =>
                updateField(
                  "current_leads",
                  e.target.value
                )
              }
              className="w-full bg-[#181614] border border-[rgba(255,255,255,.07)] rounded-[10px] p-3"
            />
          </div>

          <div>
            <label className="block text-sm text-[#A8A49C] mb-2">
              Target Leads / Month
            </label>

            <input
              type="number"
              value={
                formData.target_leads ||
                ""
              }
              onChange={(e) =>
                updateField(
                  "target_leads",
                  e.target.value
                )
              }
              className="w-full bg-[#181614] border border-[rgba(255,255,255,.07)] rounded-[10px] p-3"
            />
          </div>

        </div>

      </div>

      {/* TIMEFRAME */}

      <div className="mb-8">

        <div className="uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-4">
          Expected Growth Timeframe
        </div>

        <div className="grid md:grid-cols-2 gap-4">

          {growthTimeframes.map(
            (timeframe) => (
              <button
                key={timeframe.value}
                type="button"
                onClick={() =>
                  updateField(
                    "growth_timeframe",
                    timeframe.value
                  )
                }
                className={`
                  p-5
                  rounded-[12px]
                  border
                  text-left

                  ${
                    formData.growth_timeframe ===
                    timeframe.value
                      ? "border-[#E8192C] bg-[rgba(232,25,44,.12)]"
                      : "border-[rgba(255,255,255,.07)] bg-[#111110]"
                  }
                `}
              >
                <span className="font-semibold text-white">
                  {timeframe.label}
                </span>
              </button>
            )
          )}

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