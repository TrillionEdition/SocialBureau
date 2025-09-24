import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const positions = [
  {
    title: "Video Editor",
    icon: "fas fa-video",
    description:
      "The Video Editor requires a disciplined, accountable professional who can manage multiple projects with speed, precision, and results-driven execution.",
    type: "Kochi • On-site",
    link: "https://www.linkedin.com/jobs/view/123456789",
    company: "SocialBureau | TrillionEdition LLP",
    location: "Panampilly, Kochi, Kerala",
    employment: "Full-Time | Internship",
    about:
      "At SocialBureau, we don’t just build marketing campaigns; we architect high-performance ecosystems. Operating under Trillion Edition LLP, we fuse analytical muscle with cultural nuance to drive real outcomes for niche, high-growth brands.",
    roleSummary: [
      "Manage multiple projects simultaneously without compromising quality.",
      "Maintain daily structured reporting using Zoho, ClickUp, or approved platforms.",
      "Respect deadlines and ensure precision in execution.",
      "Collaborate with teams respectfully and professionally.",
      "Contribute actively to SocialBureau’s performance-first culture.",
      "Every deliverable must create measurable value aligned with the mission of scaling the unscalable."
    ],
    responsibilities: [
      "Execute all tasks with precision, speed, and accountability.",
      "Incomplete work impacts monthly payout.",
      "Maintain daily reports on Zoho/ClickUp or approved tools.",
      "Collaborate with colleagues and management effectively.",
      "Strict adherence to deadlines and reporting structures.",
      "Uphold confidentiality in client interactions.",
      "Contribute to performance-driven culture.",
      "Zero tolerance for negligence, misuse of hours, or vanity-driven tasks."
    ],
    qualifications: [
      "Bachelor’s degree in a relevant field.",
      "Minimum 1 year professional experience (mandatory, except internships).",
      "Familiarity with Zoho, ClickUp, Trello, or similar tools.",
      "Strong technical skills in editing workflows.",
      "Excellent time management & communication skills.",
      "High discipline, adaptability, and accountability."
    ],
    experience: [
      "Minimum 1 year relevant experience required for Full-Time, Part-Time, and Contract.",
      "Internship open only to freshers with strong discipline and learning ability."
    ],
    salary: "Competitive and aligned with industry standards. Increments based on performance.",
    nextSteps:
      "Shortlisted candidates will be invited for an interview. A 1–2 min professional video submission is mandatory."
  },
  {
    title: "Performance marketer",
    icon: "fas fa-chart-line",
    description:
      "The position of Performance marketer requires a highly disciplined and accountable professional with the ability to manage multiple projects simultaneously without compromising quality.",
    type: "Kochi • On-site",
    link: "https://www.linkedin.com/jobs/view/123456789",
    company: "SocialBureau | TrillionEdition LLP",
    location: "Panampilly, Kochi, Kerala",
    employment: "Full-Time | Internship",
    about:
      "At SocialBureau, we don’t just build marketing campaigns; we architect high-performance ecosystems. Operating under Trillion Edition LLP, we fuse analytical muscle with cultural nuance to drive real outcomes for niche, high-growth brands.",
    roleSummary: [
      "Manage multiple projects simultaneously without compromising quality.",
      "Maintain daily structured reporting using Zoho, ClickUp, or approved platforms.",
      "Respect deadlines and ensure projects are executed with speed and precision.",
      "Collaborate with teams while maintaining professional conduct and respect.",
      "Contribute actively to SocialBureau’s ecosystem by aligning with its performance-first culture.",
    ],
    responsibilities: [
      "Execute all tasks with precision, speed, and accountability.",
      "Incomplete work impacts monthly payout.",
      "Maintain daily reports on Zoho/ClickUp or approved tools.",
      "Collaborate with colleagues and management effectively.",
      "Strict adherence to deadlines and reporting structures.",
      "Uphold confidentiality in client interactions.",
      "Contribute to performance-driven culture.",
      "Zero tolerance for negligence, misuse of hours, or vanity-driven tasks."
    ],
    qualifications: [
      "Bachelor’s degree in a relevant field.",
      "Minimum 1 year professional experience (mandatory, except internships).",
      "Familiarity with Zoho, ClickUp, Trello, or similar tools.",
      "Strong technical skills in editing workflows.",
      "Excellent time management & communication skills.",
      "High discipline, adaptability, and accountability."
    ],
    experience: [
      "Minimum 1 year relevant experience required for Full-Time, Part-Time, and Contract.",
      "Internship open only to freshers with strong discipline and learning ability."
    ],
    salary: "Competitive and aligned with industry standards. Increments based on performance.",
    nextSteps:
      "Shortlisted candidates will be invited for an interview. A 1–2 min professional video submission is mandatory."
  },
];


export default function CareersPost() {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="text-white font-inter w-full min-h-screen flex justify-center items-center text-center">
      <section id="positions" className="py-20 px-6 md:w-[80vw]">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Careers
          </h2>
          <p className="text-xl text-gray-300 font-light">
            Designed for professionals of distinction
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {positions.map((pos, idx) => (
            <div
              key={idx}
              className="border border-gray-700 hover:border-[#ff0000] p-5 md:p-8 shadow-xl rounded-[1rem] cursor-pointer"
              onClick={() => setSelectedJob(pos)}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-playfair text-2xl font-semibold">
                  {pos.title}
                </h3>
                <i
                  className={`${pos.icon} text-[#ff0000] lg:text-xl text-[0px]`}
                ></i>
              </div>
              <p className="text-gray-300 mb-6 text-left">
                {pos.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">{pos.type}</span>
                <button className="border hover:scale-105 rounded-[1rem] border-[#ff0000] px-6 py-2 text-sm bg-[#ff0000] hover:bg-black hover:text-white transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-start overflow-y-auto z-50 p-6">
          <div className="bg-[#111] rounded-2xl shadow-2xl max-w-4xl w-full p-8 relative text-left">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setSelectedJob(null)}
            >
              <i className="fas fa-times text-2xl"></i>
            </button>

            <h1 className="text-3xl font-bold text-[#ff0000] mb-2">
              {selectedJob.title}
            </h1>
            <p className="text-gray-400 mb-2">
              <strong>Company:</strong> {selectedJob.company}
            </p>
            <p className="text-gray-400 mb-2">
              <strong>Location:</strong> {selectedJob.location}
            </p>
            <p className="text-gray-400 mb-6">
              <strong>Employment Type:</strong> {selectedJob.employment}
            </p>

            <div className="space-y-4 leading-relaxed">
              <h2 className="text-2xl font-semibold">About the Company</h2>
              <p>{selectedJob.about}</p>

              {/* Role Summary */}
<h2 className="text-2xl font-semibold mt-6">Role Summary</h2>
<ul className="list-disc pl-6 space-y-1">
  {selectedJob.roleSummary.map((item, i) => (
    <li key={i}>{item}</li>
  ))}
</ul>
{/* Responsibilities */}
<h2 className="text-2xl font-semibold mt-6">Key Responsibilities</h2>
<ul className="list-disc pl-6 space-y-1">
  {selectedJob.responsibilities.map((resp, i) => (
    <li key={i}>{resp}</li>
  ))}
</ul>

{/* Qualifications */}
<h2 className="text-2xl font-semibold mt-6">Mandatory Qualifications & Skills</h2>
<ul className="list-disc pl-6 space-y-1">
  {selectedJob.qualifications.map((q, i) => (
    <li key={i}>{q}</li>
  ))}
</ul>

{/* Experience */}
<h2 className="text-2xl font-semibold mt-6">Experience Requirement</h2>
<ul className="list-disc pl-6 space-y-1">
  {selectedJob.experience.map((exp, i) => (
    <li key={i}>{exp}</li>
  ))}
</ul>
              <h2 className="text-2xl font-semibold">Salary</h2>
              <p>{selectedJob.salary}</p>

              <h2 className="text-2xl font-semibold">Next Steps</h2>
              <p>{selectedJob.nextSteps}</p>
            </div>

            <div className="mt-8 flex justify-end">
              <a
                href={selectedJob.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ff0000] hover:bg-black text-white px-6 py-3 rounded-xl"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
