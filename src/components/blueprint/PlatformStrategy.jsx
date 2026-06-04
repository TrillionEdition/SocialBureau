export default function PlatformStrategy({
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
        number="04"
        tag="Growth Channels"
        title="Platform Strategy"
      />

      <div className="
        grid
        md:grid-cols-2
        lg:grid-cols-3
        gap-5
      ">
        {blueprint.platforms.map(
          (platform) => (
            <div
              key={platform.name}
              className="
                bg-[#111110]
                border
                border-[rgba(255,255,255,.07)]
                rounded-[18px]
                p-6
              "
            >
              <div className="
                flex
                justify-between
                items-center
                mb-4
              ">
                <h3 className="font-bold">
                  {platform.name}
                </h3>

                <span className="
                  text-[10px]
                  uppercase
                  tracking-[0.1em]
                  text-[#E8192C]
                ">
                  {platform.priority}
                </span>
              </div>

              <div className="
                text-3xl
                font-black
                text-[#E8192C]
                mb-3
              ">
                {platform.frequency}
              </div>

              <div className="
                text-sm
                text-[#A8A49C]
                mb-4
              ">
                {platform.mix}
              </div>

              <div className="
                text-sm
                text-[#D8D8D8]
                leading-relaxed
              ">
                {platform.action}
              </div>
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