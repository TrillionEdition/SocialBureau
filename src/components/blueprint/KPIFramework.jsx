export default function KPIFramework({
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
        number="03"
        tag="Measurement System"
        title="KPI Framework"
      />

      <div className="
        overflow-hidden
        rounded-[18px]
        border
        border-[rgba(255,255,255,.07)]
      ">
        <table className="w-full">
          <thead>
            <tr className="bg-[#111110]">
              <th className="text-left p-4 uppercase text-[10px] tracking-[0.15em] text-[#A8A49C]">
                KPI
              </th>

              <th className="text-left p-4 uppercase text-[10px] tracking-[0.15em] text-[#A8A49C]">
                Current
              </th>

              <th className="text-left p-4 uppercase text-[10px] tracking-[0.15em] text-[#A8A49C]">
                Target
              </th>

              <th className="text-left p-4 uppercase text-[10px] tracking-[0.15em] text-[#A8A49C]">
                Owner
              </th>
            </tr>
          </thead>

          <tbody>
            {blueprint.kpis.map((kpi) => (
              <tr
                key={kpi.name}
                className="
                  border-t
                  border-[rgba(255,255,255,.07)]
                "
              >
                <td className="p-4">
                  {kpi.name}
                </td>

                <td className="p-4 text-[#A8A49C]">
                  {kpi.current}
                </td>

                <td className="p-4 text-[#E8192C] font-semibold">
                  {kpi.target}
                </td>

                <td className="p-4 text-[#A8A49C]">
                  {kpi.owner}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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