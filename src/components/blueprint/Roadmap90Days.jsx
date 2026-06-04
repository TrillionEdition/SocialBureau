export default function Roadmap90Days({
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
        number="06"
        tag="Execution Plan"
        title="90-Day Roadmap"
      />

      <div className="space-y-4">
        {blueprint.roadmap.map(
          (phase) => (
            <div
              key={phase.phase}
              className="
                bg-[#111110]
                border
                border-[rgba(255,255,255,.07)]
                rounded-[18px]
                p-6
              "
            >
              <div className="
                text-[#E8192C]
                uppercase
                text-[10px]
                tracking-[0.15em]
              ">
                {phase.duration}
              </div>

              <h3 className="
                text-xl
                font-bold
                mt-1
              ">
                {phase.phase}
              </h3>

              <p className="
                mt-2
                text-[#A8A49C]
              ">
                {phase.focus}
              </p>

              <ul className="
                mt-5
                grid
                md:grid-cols-2
                gap-2
              ">
                {phase.tasks.map(
                  (task) => (
                    <li
                      key={task}
                      className="text-sm"
                    >
                      ✓ {task}
                    </li>
                  )
                )}
              </ul>
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