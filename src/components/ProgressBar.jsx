export default function ProgressBar({
  currentStep,
  totalSteps,
}) {
  const percentage =
    (currentStep / totalSteps) * 100;

  return (
    <div className="h-[2px] bg-[#2A2825]">
      <div
        className="h-full bg-[#E8192C] transition-all duration-500"
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
  );
}