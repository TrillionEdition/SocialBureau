export default function RiskSection({
  blueprint,
}) {
  return (
    <section className="
      max-w-[1100px]
      mx-auto
      px-10
      py-16
      border-t
      border-[rgba(255,255,255,.07)]
    ">
      <SectionHeader
        number="07"
        tag="Risk Assessment"
        title="Potential Risks"
      />

      <div className="space-y-3">
        {blueprint.risks.map(
          (risk) => (
            <div
              key={risk}
              className="
                bg-[rgba(255,193,7,.05)]
                border
                border-[rgba(255,193,7,.15)]
                rounded-[12px]
                p-4
              "
            >
              {risk}
            </div>
          )
        )}
      </div>
    </section>
  );
}

function SectionHeader({
  number,
  tag,
  title,
}) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="text-[56px] font-black text-[#2A2825]">
        {number}
      </div>

      <div>
        <div className="uppercase tracking-[0.2em] text-[10px] text-[#E8192C]">
          {tag}
        </div>

        <h2 className="text-2xl font-bold">
          {title}
        </h2>
      </div>
    </div>
  );
}