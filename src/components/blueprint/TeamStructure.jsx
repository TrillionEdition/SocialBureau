export default function TeamStructure({
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
      <h2 className="
        text-3xl
        font-black
        mb-8
      ">
        Recommended Team Structure
      </h2>

      <div className="
        grid
        md:grid-cols-2
        gap-5
      ">
        {blueprint.team.map(
          (role) => (
            <div
              key={role.title}
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
                items-start
              ">
                <div>
                  <h3 className="
                    text-lg
                    font-bold
                  ">
                    {role.title}
                  </h3>

                  <div className="
                    text-[#A8A49C]
                    text-sm
                  ">
                    {role.type}
                  </div>
                </div>

                <span className="
                  text-[#E8192C]
                  text-xs
                  uppercase
                ">
                  {role.model}
                </span>
              </div>

              <p className="
                mt-4
                text-[#A8A49C]
              ">
                {role.description}
              </p>

              <ul className="
                mt-4
                space-y-2
              ">
                {role.tasks.map(
                  (task) => (
                    <li
                      key={task}
                      className="
                        text-sm
                        text-[#E6E3DC]
                      "
                    >
                      • {task}
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