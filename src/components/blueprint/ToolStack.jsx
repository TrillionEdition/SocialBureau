export default function ToolStack({
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
        number="05"
        tag="Technology Stack"
        title="Recommended Tools"
      />

      <div className="
        grid
        md:grid-cols-2
        lg:grid-cols-3
        gap-4
      ">
        {blueprint.tools.map((tool) => (
          <div
            key={tool.name}
            className="
              bg-[#111110]
              border
              border-[rgba(255,255,255,.07)]
              rounded-[12px]
              p-5
            "
          >
            <div className="font-bold">
              {tool.name}
            </div>

            <div className="
              text-sm
              text-[#A8A49C]
              mt-1
            ">
              {tool.category}
            </div>

            <div className="
              mt-3
              text-sm
            ">
              {tool.purpose}
            </div>

            <div className="
              mt-4
              text-[#E8192C]
              text-sm
              font-semibold
            ">
              {tool.cost}
            </div>
          </div>
        ))}
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