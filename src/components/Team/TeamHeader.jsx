import React from "react";

export default function TeamHeader() {
  return (
    <section className="bg-black text-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[15px] lg:px-[25px] py-[40px]">

        <div className="grid lg:grid-cols-[auto_1fr] items-start gap-[30px] lg:gap-[50px]">

          {/* LEFT CONTENT */}
          <div className="flex flex-col">

            {/* HEADING */}
            <h1
              className="
                pt-10
                font-['Plus_Jakarta_Sans',_sans-serif]
                font-[800]
                uppercase
                leading-[0.88]
                tracking-[-0.05em]
                text-[50px]
                lg:text-[76px]
              "
            >
              <span className="block text-white">WE DESIGN</span>
              <span className="block text-white whitespace-nowrap">DIGITAL EXPERIENCES</span>
              <span className="block text-[#FF1E1E] whitespace-nowrap">THAT DRIVE RESULTS</span>
            </h1>

            {/* DESCRIPTION */}
            <p
              className="
                mt-[32px]
                max-w-[580px]
                text-[15px]
                leading-[1.65]
                text-white/70
                font-medium
              "
            >
              We are creative web design & development agency crafting modern,<br />
              user-friendly & result-driven websites that help brands stand out and<br />
              grow online.
            </p>

            {/* BUTTONS */}
            <div className="mt-[28px] flex items-center gap-4">

              {/* PRIMARY BUTTON */}
              <button
                className="
                  bg-[#FF1E1E]
                  hover:bg-red-700
                  transition
                  h-[48px]
                  px-[26px]
                  rounded-[8px]
                  text-[14px]
                  font-medium
                  flex
                  items-center
                  gap-2
                "
              >
                Start Your Project
                <span>→</span>
              </button>

              {/* SECONDARY BUTTON */}
              <button
                className="
                  border
                  border-white/20
                  hover:border-white
                  transition
                  h-[48px]
                  px-[24px]
                  rounded-[8px]
                  text-[14px]
                  font-medium
                  flex
                  items-center
                  gap-2
                "
              >
                <span className="text-[#FF1E1E]">◎</span>
                View Our Work
              </button>

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-end">

            <img
              src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1778048133/image_24_bbnjix.png"
              alt="Team"
              className="
                w-full
                max-w-[1100px]
                object-contain
                mt-[20px]
                lg:scale-110
                origin-right
              "
            />

          </div>
        </div>
      </div>
    </section>
  );
}