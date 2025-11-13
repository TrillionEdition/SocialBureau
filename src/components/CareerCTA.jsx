import React from 'react'

export const CareerCTA = () => {
  return (
    <div>
    <div className="max-w-7xl mx-auto px-6 mb-24">
  <div className="grid md:grid-cols-3 gap-12 items-start">
    
    {/* Left Title */}
    <div className="md:sticky md:top-24">
      <h3 className="text-4xl font-semibold text-white flex items-center gap-3 mb-4">
        Joining Guidelines
      </h3>
      <p className="text-gray-400 text-lg leading-relaxed">
        Understand the step-by-step process to join <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a>
      </p>
    </div>

    {/* Right Content Cards */}
    <div className="md:col-span-2 space-y-10">

      {/* Card 1 */}
      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-xl">
        <h4 className="text-2xl font-semibold text-white mb-4">Application Process</h4>
        <p className="text-gray-300 text-lg leading-relaxed">
          Submit your CV, portfolio (if applicable), and a short cover note at {" "}
          <a href="mailto:hr.socialbureau@gmail.com" 
             className="text-red-500 underline ml-1 hover:text-red-400">
            hr.socialbureau@gmail.com
          </a>{" "}
          or via our website form.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-xl">
        <h4 className="text-2xl font-semibold text-white mb-4">Interview Stages</h4>

        <ul className="space-y-3 text-lg text-gray-300">
          {[
            "Stage 1: Screening (Profile + Skills)",
            "Stage 2: Departmental Interview",
            "Stage 3: Creative/Technical Assignment (for select roles)",
            "Stage 4: Final HR + Operations Round",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-red-500 text-xl">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card 3 */}
      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-xl">
        <h4 className="text-2xl font-semibold text-white mb-4">Work Culture</h4>

        <ul className="space-y-3 text-lg text-gray-300">
          <li className="flex gap-3"><span className="text-red-500">•</span> Collaborative, fast-paced, and innovation-first.</li>
          <li className="flex gap-3"><span className="text-red-500">•</span> Open communication and feedback-driven growth.</li>
          <li className="flex gap-3"><span className="text-red-500">•</span> Access to cutting-edge tools, AI assistants, and production tech.</li>
        </ul>
      </div>

      {/* Card 4 */}
      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-xl">
        <h4 className="text-2xl font-semibold text-white mb-4">Hybrid Opportunities</h4>
        <p className="text-lg text-gray-300 leading-relaxed">
          Certain roles provide hybrid or remote flexibility based on project requirements.
        </p>
      </div>

    </div>
  </div>
</div>


{/* ====== SECTION: COMPANY POLICY ====== */}
<div className="max-w-7xl mx-auto px-6 mb-24">
  <div className="grid md:grid-cols-3 gap-12 items-start">
    
    {/* Left Title */}
    <div className="md:sticky md:top-24">
      <h3 className="text-4xl font-semibold text-white flex items-center gap-3 mb-4">
        Company Policy Overview
      </h3>
      <p className="text-gray-400 text-lg leading-relaxed">
        Our values, ethics, and professional expectations.
      </p>
    </div>

    {/* Right Content */}
    <div className="md:col-span-2 space-y-6 text-gray-300 text-lg bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-xl">

      <p><strong className="text-white">Transparency First:</strong> Clear goals, open feedback, and measurable growth.</p>
      <p><strong className="text-white">Equal Opportunity Employer:</strong> We welcome talent from all backgrounds.</p>
      <p><strong className="text-white">Confidentiality & Ethics:</strong> Employees must follow TrillionEdition LLP standards.</p>
      <p><strong className="text-white">Performance-Based Growth:</strong> Promotions tied to skills and impact.</p>
      <p><strong className="text-white">Creative Freedom:</strong> Team members can pitch their own project ideas.</p>

    </div>
  </div>
</div>


{/* ====== SECTION: WHY WORK WITH US ====== */}
<div className="max-w-7xl mx-auto px-6 mb-24">
  <div className="grid md:grid-cols-3 gap-12 items-start">

    {/* Left Title */}
    <div className="md:sticky md:top-24">
      <h3 className="text-4xl font-semibold text-white flex items-center gap-3 mb-4">
        Why Work With Us
      </h3>
      <p className="text-gray-400 text-lg leading-relaxed">
        What makes <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a> one of the most exciting places to work.
      </p>
    </div>

    {/* Right Content */}
    <div className="md:col-span-2 space-y-4 text-gray-300 text-lg bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-xl">

      {[
        "Be part of India's first API-driven marketing ecosystem.",
        "Work directly with Meta, Google, and global ad platforms.",
        "Collaborate with a young, ambitious, data-smart team.",
        "Access pro-grade creative equipment and AI tools.",
        "Real-time growth tracking, mentorship & international exposure."
      ].map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          <span className="text-red-500 text-xl">✓</span>
          <span>{item}</span>
        </div>
      ))}

    </div>
  </div>
</div>


{/* ====== SECTION: CTA ====== */}
<div className="max-w-5xl mx-auto text-center mb-20">
  <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
    Get Started
  </h2>
  <p className="text-xl text-gray-300 mb-8">
    Ready to join an organization that values excellence?
  </p>

  <a
    href="https://www.linkedin.com/jobs/socialbureau.in-jobs-worldwide?position=1&pageNum=0"
    className="inline-block bg-red-600 hover:bg-black border border-red-600 hover:border-white 
               text-white text-lg font-medium rounded-full py-4 px-10 transition transform hover:scale-105"
  >
    Join Now
  </a>
</div>
</div>
  )
}
