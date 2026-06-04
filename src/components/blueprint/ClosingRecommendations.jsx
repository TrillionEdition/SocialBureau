import { exportBlueprintPDF }
from "../../utils/reportGenerator";
export default function ClosingRecommendations({
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
        number="08"
        tag="Final Recommendation"
        title="Executive Recommendation"
      />

      <div className="
        bg-gradient-to-br
        from-[#14080A]
        to-[#0F0D0C]
        border
        border-[rgba(232,25,44,.22)]
        rounded-[18px]
        p-8
      ">
        <p className="
          text-[#E6E3DC]
          leading-[1.9]
        ">
          {blueprint.recommendation}
        </p>
      </div>

      <div className="
        mt-8
        bg-[#181614]
        border
        border-[rgba(255,255,255,.07)]
        rounded-[18px]
        p-6
      ">
        <h3 className="
          text-lg
          font-bold
          mb-2
        ">
          Next Action
        </h3>

        <p className="text-[#A8A49C]">
          Schedule implementation planning,
          assign ownership for the first
          30-day phase, and begin KPI
          tracking immediately.
        </p>
      </div>
      <button
  onClick={() =>
    exportBlueprintPDF(
      blueprint,
      blueprint.companyName
    )
  }
  className="
    mt-8
    bg-[#E8192C]
    px-8
    py-4
    rounded-[10px]
    font-bold
  "
>
  Download PDF
</button>
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