import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import jobs from "../data/jobs";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function CareerDetail() {
  const { slug } = useParams();
  const job = jobs.find((j) => j.slug === slug); // use slug

  if (!job) return <p className="text-white text-center py-20">Job not found.</p>;
const [currentIndex, setCurrentIndex] = useState(0);

  // Change image every 3 seconds
  useEffect(() => {
    if (!job?.img || job?.img.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % job?.img.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [job?.img]);

  return (
    <div className="bg-gradient-to-bl from-black to-[#3f0000] min-h-screen">
      <Navbar />
      <div className="w-full px-6 md:w-[90vw] mx-auto py-8">
        <Link
          to="/careers"
          className="text-[#ff0000] mt-6 inline-block rounded-full border border-[#ff0000] px-4 py-2"
        >
          &larr; Back to Careers
        </Link>

        {/* Layout: left = job content + image, right = google form (stacks on small screens) */}
        <div className="mt-6 flex flex-col md:flex-row md:items-start md:gap-8">
          {/* Left column: Job details */}
          <div className="w-full md:w-2/3 text-white font-inter">
            <div className="flex flex-col md:flex-row md:items-start md:gap-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-[#ff0000] mb-2">{job?.title}</h1>
                <p className="text-gray-400 mb-2">
                  <strong>Company:</strong> {job?.company}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>Location:</strong> {job?.location}
                </p>
                <p className="text-gray-400 mb-6">
                  <strong>Employment Type:</strong> {job?.employment}
                </p>
                <h2 className="text-2xl font-semibold">About the Company</h2>
                <p className="my-2">At <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a>, we don’t just build marketing campaigns. We architect high-performance
                    ecosystems. Operating under the strategic umbrella of Trillion Edition, we fuse analytical muscle
                    with cultural nuance to drive real outcomes for niche, high-growth brands.<br/><br/>
                    We obsess over one thing: <span className="font-bold">RESULTS</span>.<br/><br/>
                    Whether it’s cutting CAC, unlocking new audiences, or compounding LTV; we move fast, adapt
                    faster, and execute with precision</p>

                <h2 className="text-2xl font-semibold mt-6">Our Core Values</h2>
                  
                    <ul className="mt-2">
                      <li>●  Performance First – We don’t guess. We design outcomes.</li>
                      <li>● Niche-Native Thinking – We understand the cultural codes others ignore.</li>
                      <li>● Speed & Precision – Fast, focused, and flawless.</li>
                      <li>● Brutal Clarity – No jargon. Only sharp, clear, actionable insights.</li>
                      <li>● Zero Vanity – No fake work. Only compounding ROI.</li>
                    </ul>
                    <p className="my-2">
At <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a>, employees are part of a results-driven, fast-moving ecosystem. We encourage
healthy professional relationships, mutual respect, and collaboration. Every working hour is
expected to be utilized productively, with structured reporting through Zoho, ClickUp, or
equivalent project management platforms. This ensures full transparency, accountability, and
measurable progress across all projects</p>
              </div>

              {/* Image */}
              
            </div>

            <div className="space-y-4 leading-relaxed mt-6">
              <h2 className="text-2xl font-semibold">Role Summary</h2>
              <p>The position requires a highly disciplined and accountable professional with
the ability to:
<ul className="list-disc pl-6 space-y-1 my-2">
                {job?.roleSummary.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
                      <li>Manage multiple projects simultaneously without compromising quality.</li>
                      <li> Maintain daily structured reporting using company-approved platforms (Zoho, ClickUp, etc.).</li>
                      <li> Respect deadlines and ensure projects are executed with speed and precision.</li>
                      <li> Collaborate with teams while maintaining professional conduct and respect.</li>
                      
                      <li>Contribute actively to <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a>’s ecosystem by aligning with its performance-first culture.</li></ul>
This is a results-driven role, not task-driven. Every deliverable must create measurable value
and align with the company’s mission of scaling the unscalable.
</p>

        <h2 className="text-2xl font-semibold">Work Timings</h2>
              
<ul className="list-disc pl-6 space-y-1 my-2">
                      <li>Reporting Time: 9:30 AM (sharp)</li>
                      <li> Closing Time: 6:30 PM (sharp)</li>
                      <li> Working Days: Monday to Saturday</li>
                      <li> Breaks: Only during officially allocated slots.</li>                      
                      <li>Note: Punctuality is strictly enforced.</li></ul>
<p>Employees reporting after 9:30 AM will be marked as Half-Day, irrespective of the reason unless
it's an emergency situation or prior approval is obtained from management.
</p>      

<h2 className="text-2xl font-semibold">Dress Code</h2>
              
<ul className="list-disc pl-6 space-y-1 my-2">
                      <li>Employees must follow the official dress code without exception.</li>
                      <li>Employees must wear their ID Cards at all times.</li>
  <li>Men & Women: Black and white formal shirt with appropriate formal pants.</li>
  <li>Blazer: Formal blazer is mandatory on all working days.</li>
  <li>Prohibited: Casual wear, denim, sneakers, T-shirts, or bright/unprofessional attire.</li>
  <li>Employees must be well groomed (both mustache and beard).</li>
  <li>Employees failing to adhere will not be permitted to enter the workplace.</li></ul>

              <h2 className="text-2xl font-semibold mt-6">Key Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Execute all assigned tasks with precision, speed, and accountability.</li>
  <li>Failure in task completion will be reflected in their monthly payout.</li>
  <li>Maintain daily work reports and progress logs on Zoho/ClickUp or other platforms as directed.</li>
  <li>Collaborate with colleagues and management to ensure seamless project execution.</li>
  <li>Strictly adhere to deadlines, quality standards, and reporting structures.</li>
  <li>Uphold confidentiality and professionalism in client interactions.</li>
  <li>Respect company values and contribute actively to the performance-driven work culture.</li>
  <li>Ensure zero tolerance for negligence, misuse of work hours, or vanity-driven tasks.</li>

              </ul>

              <h2 className="text-2xl font-semibold mt-6">Mandatory Qualifications & Skills</h2>
              <ul className="list-disc pl-6 space-y-1">
                {job?.qualifications.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
                <li>Bachelor’s degree in a relevant field.</li>
  <li>Minimum 1 year of professional experience (mandatory for all roles except internships).</li>
  <li>Familiarity with project management platforms (Zoho, ClickUp, Trello, or similar).</li>
  <li>Strong technical skills related to the specific role.</li>
  <li>Excellent time management and communication skills.</li>
  <li>High level of discipline, adaptability, and accountability.</li>

              </ul>

              <h2 className="text-2xl font-semibold mt-6">Experience Requirement</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Minimum 1 year of relevant professional experience required for Full-Time, Part-Time, and
Contract roles.
</li>
<li>Internship positions are open only to freshers with strong learning ability, discipline, and
readiness to adapt to company standards.</li>
              </ul>

<h2 className="text-2xl font-semibold mt-6">Leave & Attendance Policy</h2>
<ul className="list-disc pl-6 space-y-1">
  <li>Employees are entitled to 2 Casual Leaves per month (one leave every 15 days).</li>
  <li>All leave requests must be submitted and approved in advance.</li>
  <li>Uninformed absences will be treated as misconduct and will be reflected in payout.</li>
  <li>Attendance, punctuality, and discipline will be continuously tracked and reviewed.</li>
</ul>

<h2 className="text-2xl font-semibold mt-6">Employment Conditions</h2>
<ul className="list-disc pl-6 space-y-1">
  <li>Compliance with timings, dress code, reporting, and discipline is non-negotiable.</li>
  <li>All employees must maintain structured task updates daily.</li>
  <li>Confidentiality of company and client data is a strict requirement.</li>
  <li>Any violation of policies or repeated underperformance will lead to disciplinary action.</li>
  <li><a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a> reserves the right to reassign tasks or restructure roles as business demands.</li>
</ul>

              <h2 className="text-2xl font-semibold mt-6">Salary</h2>
<ul className="list-disc pl-6 space-y-1">
  <li>Competitive and aligned with industry standards.</li>
  <li>The final package will depend on role, experience, and interview performance.</li>
  <li>Increments are performance-based, not tenure-based.</li>
</ul>

<h2 className="text-2xl font-semibold mt-6">Next Steps</h2>
<p>Shortlisted candidates will be invited for an interview. Evaluation will focus on:</p>
<ul className="list-disc pl-6 space-y-1">
  <li>Role-specific expertise.</li>
  <li>Familiarity with structured reporting tools (Zoho, ClickUp, etc.).</li>
  <li>Discipline, punctuality, and professional conduct.</li>
  <li>Ability to align with <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a>’s performance-first culture.</li>
</ul>

<h2 className="text-2xl font-semibold mt-6">Video Guidelines</h2>
<p>All candidates must submit a video as part of the selection process.</p>
<ul className="list-disc pl-6 space-y-1">
  <li>Length: 1 to 2 minutes.</li>
  <li>Topic: Will be supplied by the company.</li>
  <li>Quality: Must be filmed on a professional camera (no phone or webcam submissions).</li>
  <li>Lighting & Background: Lighting must be appropriate, with a tidy and professional background.</li>
  <li>Presentation: Candidates should appear well-groomed (Wear Blazer), confident, and speak clearly.</li>
</ul>

<p>
  This video will serve as an example of your professionalism, creativity,
  and attention to detail.
</p>

              <div className="mt-8 flex">
                <a
                  onClick={() => window.open(job?.link, "_blank")}
                  rel="noopener noreferrer"
                  className="bg-[#ff0000] hover:bg-black text-white px-6 py-3 rounded-xl inline-block"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>

          {/* Right column: Google Form */}
          <div className="w-full md:w-1/3 mt-8 md:mt-0">
          <div className="flex-shrink-0 mt-6 md:mt-0">
            {job?.img && job?.img.length > 0 && (
              <img
                src={job?.img[currentIndex]}
                alt={job?.title}
                className="w-full object-contain md:ml-0 transition-opacity duration-700 ease-in-out pb-10 rounded-xl"
                key={job?.img[currentIndex]}
              />
            )}
          </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              {/* Make iframe responsive: full width of column, with large min height */}
              <iframe
                title="Application Form"
                src="https://docs.google.com/forms/d/e/1FAIpQLSdTQR9NJZMz3KYMwJSCow0EsGP8zUk_m79i4SqRzWVaHts6aA/viewform?embedded=true"
                className="w-full h-[1200px] md:h-[90vh]"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                loading="lazy"
              >
                Loading…
              </iframe>
            </div>
            <p className="text-gray-300 text-sm mt-2">
              If the form doesn't load, <a className="text-[#ff0000]" href="https://docs.google.com/forms/d/e/1FAIpQLSdTQR9NJZMz3KYMwJSCow0EsGP8zUk_m79i4SqRzWVaHts6aA/viewform" target="_blank" rel="noopener noreferrer">open it in a new tab</a>.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}