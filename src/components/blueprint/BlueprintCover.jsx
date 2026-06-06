export default function BlueprintCover({
  company,
  blueprint,
}) {
  return (
    <section className="
      min-h-[70vh]
      flex
      flex-col
      justify-end
      px-10
      pb-16
      pt-24
      relative
      overflow-hidden
    ">
      <div className="
        absolute inset-0
        bg-gradient-to-br
        from-[#190406]
        via-[#0A0A0A]
        to-[#0A0A0A]
      " />

      <div className="relative z-10">

        <div className="
          inline-flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          border
          border-[rgba(232,25,44,.22)]
          bg-[rgba(232,25,44,.12)]
          text-[#E8192C]
          text-[10px]
          uppercase
          tracking-[0.15em]
        ">
          SocialBureau Blueprint
        </div>

        <h1 className="
  mt-6
  text-[clamp(40px,10vw,110px)]
  leading-[0.9]
  font-black
">
  DIGITAL
  <br />
  <span className="text-[#E8192C]">
    WORKFLOW
  </span>
</h1>

        <h2 className="
          mt-4
          text-2xl
          text-[#A8A49C]
        ">
          {company}
        </h2>

        <div className="
          flex
          flex-wrap
          mt-10
          gap-10
        ">
          <Metric
            value={
              blueprint.team.length
            }
            label="Roles"
          />

          <Metric
            value={
              blueprint.kpis.length
            }
            label="KPIs"
          />

          <Metric
            value="90"
            label="Days"
          />

          <Metric
            value={
              blueprint.platforms.length
            }
            label="Platforms"
          />
        </div>

      </div>
    </section>
  );
}

function Metric({
  value,
  label,
}) {
  return (
    <div>
      <div className="
        text-4xl
        font-black
      ">
        {value}
      </div>

      <div className="
        uppercase
        text-[10px]
        tracking-[0.15em]
        text-[#5C5850]
      ">
        {label}
      </div>
    </div>
  );
}