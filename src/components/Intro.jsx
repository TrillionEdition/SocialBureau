import React from 'react'

export const Intro = () => {
  return (
    <div className="relative px-6 lg:px-32 text-white overflow-hidden max-w-6xl mx-auto text-center">

  {/* background gradient glow */}
  <div className="absolute inset-0 -z-10 blur-[160px] opacity-20 bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600"></div>

  {/* Section Title */}
  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-16">
    Why We’re Different
  </h2>

  <div className="relative flex flex-col gap-16 items-center">

    {/* CARD 1 */}
    {/* CARD 1 */}
<div className="md:max-w-[70%] bg-gradient-to-br from-black to-[#3f0000] text-gray-300 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-lg hover:shadow-[#3f0000] transition-all md:self-start text-left">
  <h3 className="text-3xl font-semibold mb-3">API-Powered Growth</h3>
  <p className="text-lg opacity-80">
    Fully automated marketing pipelines built with Meta, Google, LinkedIn, and custom APIs.
  </p>
</div>

{/* CARD 2 */}
<div className="md:max-w-[70%] bg-gradient-to-br from-black to-[#3f0000] backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-lg hover:shadow-[#3f0000] transition-all md:self-end text-left">
  <h3 className="text-3xl font-semibold mb-3">Data-Driven Strategy</h3>
  <p className="text-lg opacity-80">
    Every click, view, and conversion is tracked, analyzed, and optimized.
  </p>
</div>

{/* CARD 3 */}
<div className="md:max-w-[70%] bg-gradient-to-br from-black to-[#3f0000] backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-lg hover:shadow-[#3f0000] transition-all md:self-start text-left">
  <h3 className="text-3xl font-semibold mb-3">Global Marketing Reach</h3>
  <p className="text-lg opacity-80">
    Scalable systems to launch your campaigns anywhere in the world.
  </p>
</div>

{/* CARD 4 */}
<div className="md:max-w-[70%] bg-gradient-to-br from-black to-[#3f0000] backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-lg hover:shadow-[#3f0000] transition-all md:self-end text-left">
  <h3 className="text-3xl font-semibold mb-3">Creative + Tech Fusion</h3>
  <p className="text-lg opacity-80">
    We blend marketing intelligence with software engineering precision.
  </p>
</div>

  </div>

  {/* Outcome */}
  <p className="mt-20 font-light opacity-90 text-lg max-w-5xl mx-auto">
    <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a> is a project by <a
  href="https://trillionedition.com"
  target="_blank"
  rel="noopener noreferrer"
  className="font-bold cursor-pointer"
>
  TrillionEdition LLP,
</a>&nbsp;
 designed to modernize marketing for the digital age. Our mission is to transform how agencies and businesses run their campaigns with APIs, automation, and AI at the core.
We believe the future of marketing is programmable and we’re already building it.
    </p>
</div>
  )
}
