export default function ExecutiveSummary({
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
        number="01"
        tag="Executive Summary"
        title="Business Assessment"
      />

      <div className="
        bg-[#111110]
        border
        border-[rgba(255,255,255,.07)]
        rounded-[18px]
        p-8
      ">
        <p className="
          leading-[1.9]
          text-[#E6E3DC]
        ">
          {blueprint.summary}
        </p>
      </div>

      <div className="
        mt-6
        grid
        md:grid-cols-3
        gap-4
      ">
        {blueprint.priorities.map(
          (item, index) => (
            <div
              key={item}
              className="
                bg-[#111110]
                border
                border-[rgba(255,255,255,.07)]
                rounded-[12px]
                p-5
              "
            >
              <div className="
                text-[#E8192C]
                font-black
                text-xl
              ">
                0{index + 1}
              </div>

              <div className="
                mt-2
                text-white
              ">
                {item}
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
    <div className="
      flex
      items-center
      gap-4
      mb-8
    ">
      <div className="
        text-[56px]
        font-black
        text-[#2A2825]
      ">
        {number}
      </div>

      <div>
        <div className="
          uppercase
          tracking-[0.2em]
          text-[10px]
          text-[#E8192C]
        ">
          {tag}
        </div>

        <h2 className="
          text-2xl
          font-bold
        ">
          {title}
        </h2>
      </div>
    </div>
  );
}