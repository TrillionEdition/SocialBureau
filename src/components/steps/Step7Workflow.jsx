import {
  reportingFrequencies,
  approvalFlows,
  automationLevels,
  aiPreferences,
  crmOptions,
  toolsList,
} from "../../data/workflowOptions";

export default function Step7Workflow({
  formData,
  updateField,
  previousStep,
  onSubmit,
}) {
  const selectedTools =
    formData.tools || [];

  const toggleTool = (tool) => {
    const exists =
      selectedTools.includes(tool);

    if (exists) {
      updateField(
        "tools",
        selectedTools.filter(
          (item) => item !== tool
        )
      );
    } else {
      updateField("tools", [
        ...selectedTools,
        tool,
      ]);
    }
  };

  const validateBeforeSubmit = () => {
    if (!formData.company_name) {
      alert(
        "Company name is required."
      );
      return;
    }

    if (!formData.contact_name) {
      alert(
        "Contact person name is required."
      );
      return;
    }

    if (!formData.contact_email) {
      alert(
        "Email address is required."
      );
      return;
    }

    onSubmit();
  };

  return (
    <div>
      {/* HEADER */}

      <div className="pt-[60px] pb-10 border-b border-[rgba(255,255,255,.07)] mb-11">

        <div className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#E8192C] mb-[10px]">
          Section 07 — Workflow Preferences
        </div>

        <h2 className="text-[30px] font-extrabold text-white mb-[10px]">
          How should your workflow operate?
        </h2>

        <p className="text-[14px] text-[#A8A49C] max-w-[560px] leading-[1.75]">
          These preferences determine
          approvals, reporting, automation,
          AI adoption, and recommended tools.
        </p>

      </div>

      {/* REPORTING */}

      <div className="mb-10">

        <h3 className="font-semibold text-white mb-4">
          Reporting Frequency
        </h3>

        <div className="grid md:grid-cols-3 gap-4">

          {reportingFrequencies.map(
            (item) => (
              <button
                key={item.value}
                type="button"
                onClick={() =>
                  updateField(
                    "reporting_frequency",
                    item.value
                  )
                }
                className={`
                  p-5
                  rounded-[12px]
                  border
                  text-left

                  ${
                    formData.reporting_frequency ===
                    item.value
                      ? "border-[#E8192C] bg-[rgba(232,25,44,.12)]"
                      : "border-[rgba(255,255,255,.07)] bg-[#111110]"
                  }
                `}
              >
                <div className="font-semibold text-white">
                  {item.title}
                </div>

                <div className="text-sm text-[#A8A49C] mt-1">
                  {item.description}
                </div>
              </button>
            )
          )}

        </div>

      </div>

      {/* APPROVAL FLOW */}

      <div className="mb-10">

        <h3 className="font-semibold text-white mb-4">
          Approval Workflow
        </h3>

        <div className="grid md:grid-cols-2 gap-4">

          {approvalFlows.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                updateField(
                  "approval_flow",
                  item.value
                )
              }
              className={`
                p-4
                rounded-[10px]
                border
                text-left

                ${
                  formData.approval_flow ===
                  item.value
                    ? "border-[#E8192C] bg-[rgba(232,25,44,.12)]"
                    : "border-[rgba(255,255,255,.07)] bg-[#111110]"
                }
              `}
            >
              {item.title}
            </button>
          ))}

        </div>

      </div>

      {/* AUTOMATION */}

      <div className="mb-10">

        <h3 className="font-semibold text-white mb-4">
          Automation Level
        </h3>

        <div className="grid md:grid-cols-2 gap-4">

          {automationLevels.map(
            (item) => (
              <button
                key={item.value}
                type="button"
                onClick={() =>
                  updateField(
                    "automation_level",
                    item.value
                  )
                }
                className={`
                  p-4
                  rounded-[10px]
                  border
                  text-left

                  ${
                    formData.automation_level ===
                    item.value
                      ? "border-[#E8192C] bg-[rgba(232,25,44,.12)]"
                      : "border-[rgba(255,255,255,.07)] bg-[#111110]"
                  }
                `}
              >
                {item.title}
              </button>
            )
          )}

        </div>

      </div>

      {/* AI */}

      <div className="mb-10">

        <h3 className="font-semibold text-white mb-4">
          AI Adoption
        </h3>

        <div className="grid md:grid-cols-3 gap-4">

          {aiPreferences.map(
            (item) => (
              <button
                key={item.value}
                type="button"
                onClick={() =>
                  updateField(
                    "ai_preference",
                    item.value
                  )
                }
                className={`
                  p-4
                  rounded-[10px]
                  border

                  ${
                    formData.ai_preference ===
                    item.value
                      ? "border-[#E8192C] bg-[rgba(232,25,44,.12)]"
                      : "border-[rgba(255,255,255,.07)] bg-[#111110]"
                  }
                `}
              >
                {item.title}
              </button>
            )
          )}

        </div>

      </div>

      {/* CRM */}

      <div className="mb-10">

        <h3 className="font-semibold text-white mb-4">
          CRM Preference
        </h3>

        <div className="grid md:grid-cols-3 gap-4">

          {crmOptions.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                updateField(
                  "crm",
                  item.value
                )
              }
              className={`
                p-4
                rounded-[10px]
                border

                ${
                  formData.crm ===
                  item.value
                    ? "border-[#E8192C] bg-[rgba(232,25,44,.12)]"
                    : "border-[rgba(255,255,255,.07)] bg-[#111110]"
                }
              `}
            >
              {item.title}
            </button>
          ))}

        </div>

      </div>

      {/* TOOLS */}

      <div className="mb-10">

        <h3 className="font-semibold text-white mb-4">
          Existing Tools
        </h3>

        <div className="grid md:grid-cols-3 gap-3">

          {toolsList.map((tool) => {
            const active =
              selectedTools.includes(tool);

            return (
              <button
                key={tool}
                type="button"
                onClick={() =>
                  toggleTool(tool)
                }
                className={`
                  p-3
                  rounded-[10px]
                  border
                  text-left

                  ${
                    active
                      ? "border-[#E8192C] bg-[rgba(232,25,44,.12)]"
                      : "border-[rgba(255,255,255,.07)] bg-[#111110]"
                  }
                `}
              >
                {tool}
              </button>
            );
          })}

        </div>

      </div>

      {/* NOTES */}

      <div className="mb-8">

        <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-3">
          Additional Workflow Notes
        </label>

        <textarea
          rows={6}
          value={
            formData.workflow_notes || ""
          }
          onChange={(e) =>
            updateField(
              "workflow_notes",
              e.target.value
            )
          }
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
          Step 7 of 7
        </div>

        <button
          onClick={validateBeforeSubmit}
          className="
            bg-[#E8192C]
            px-10
            py-4
            rounded-[10px]
            font-bold
            uppercase
            tracking-[0.08em]
          "
        >
          Generate Blueprint →
        </button>

      </div>
    </div>
  );
}