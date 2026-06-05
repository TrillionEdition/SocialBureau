export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-10 pt-[120px] pb-[80px]">

      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(
              ellipse 70% 55% at 15% 85%,
              rgba(232,25,44,.1) 0%,
              transparent 55%
            ),
            radial-gradient(
              ellipse 50% 40% at 85% 15%,
              rgba(255,255,255,.02) 0%,
              transparent 50%
            ),
            #0A0A0A
          `,
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative z-10 max-w-[1000px]">

        <div className="inline-flex items-center gap-[10px] mb-8 px-4 py-[7px] border border-[rgba(232,25,44,.22)] rounded-full bg-[rgba(232,25,44,.12)] text-[#E8192C] uppercase tracking-[0.16em] text-[11px] font-bold">
          <div className="w-[6px] h-[6px] rounded-full bg-[#E8192C]" />
          SocialBureau · Universal Client Tool
        </div>

        <h1
          className="
          font-bebas
          text-[clamp(64px,9.5vw,120px)]
          leading-[0.9]
          text-white
        "
        >
          DIGITAL WORKFLOW
          <span className="block text-[#E8192C]">
            ARCHITECT
          </span>
        </h1>

        <p className="max-w-[600px] mt-6 mb-11 text-[16px] leading-[1.75] text-[#A8A49C] font-syne">
          Any business. Any industry. Answer 7 sections and we
          generate your complete digital team structure,
          role-by-role responsibilities, platform workflow,
          KPI framework, and a 90-day execution plan —
          custom-built for your company.
        </p>

        <div className="flex flex-wrap items-center">

          <div className="px-7 border-r border-[rgba(255,255,255,.07)] first:pl-0">
            <div className="font-bebas text-[36px] leading-none">
              7
            </div>
            <div className="uppercase tracking-[0.14em] text-[10px] text-[#5C5850]">
              Sections
            </div>
          </div>

          <div className="px-7 border-r border-[rgba(255,255,255,.07)]">
            <div className="font-bebas text-[36px] leading-none">
              50+
            </div>
            <div className="uppercase tracking-[0.14em] text-[10px] text-[#5C5850]">
              Questions
            </div>
          </div>

          <div className="px-7 border-r border-[rgba(255,255,255,.07)]">
            <div className="font-bebas text-[36px] leading-none">
              90
            </div>
            <div className="uppercase tracking-[0.14em] text-[10px] text-[#5C5850]">
              Day Plan
            </div>
          </div>

          <div className="px-7">
            <div className="font-bebas text-[36px] leading-none">
              ∞
            </div>
            <div className="uppercase tracking-[0.14em] text-[10px] text-[#5C5850]">
              Industries
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}

      <div className="absolute bottom-9 right-10 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#5C5850]">
        <div className="w-[1px] h-[52px] bg-gradient-to-b from-[#E8192C] to-transparent animate-pulse" />
        Begin
      </div>
    </section>
  );
}