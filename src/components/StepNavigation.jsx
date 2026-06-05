const steps = [
  "Your Business",
  "Digital Presence",
  "Current Performance",
  "Challenges",
  "Goals & Targets",
  "Team & Budget",
  "Workflow Preferences",
];

export default function StepNavigation({
  currentStep,
  goStep,
}) {
  return (
    <nav className="sticky top-[62px] z-[100] bg-[rgba(10,10,10,.92)] backdrop-blur-[20px] border-b border-[rgba(255,255,255,.07)] overflow-x-auto">

      <div className="flex items-center px-10 min-w-max">

        {steps.map((step, index) => {
          const stepNumber = index + 1;

          const active =
            currentStep === stepNumber;

          const done =
            currentStep > stepNumber;

          return (
            <button
              key={step}
              onClick={() =>
                goStep(stepNumber)
              }
              className={`
                flex items-center gap-2
                px-[18px]
                py-[13px]
                text-[10px]
                font-bold
                uppercase
                tracking-[0.1em]
                whitespace-nowrap
                border-b-2
                transition-all

                ${
                  active
                    ? "text-[#E8192C] border-[#E8192C]"
                    : done
                    ? "text-[#A8A49C]"
                    : "text-[#5C5850]"
                }
              `}
            >
              <span
                className={`
                w-[22px]
                h-[22px]
                rounded-full
                flex
                items-center
                justify-center
                text-[10px]
                border

                ${
                  active
                    ? "bg-[#E8192C] border-[#E8192C] text-white"
                    : done
                    ? "bg-[rgba(232,25,44,.18)] border-[#E8192C] text-[#E8192C]"
                    : "border-[#2A2825]"
                }
              `}
              >
                {stepNumber}
              </span>

              {step}
            </button>
          );
        })}
      </div>
    </nav>
  );
}