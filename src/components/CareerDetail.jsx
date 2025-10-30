import React from "react";
import { useParams, Link } from "react-router-dom";
import jobs from "../data/jobs";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function CareerDetail() {
  const { slug } = useParams();
  const job = jobs.find((j) => j.slug === slug); // use slug

  if (!job) return <p className="text-white text-center py-20">Job not found.</p>;

  return (
    <div className="bg-gradient-to-bl from-black to-[#3f0000]">
      <Navbar/>
      <Link to="/careers" className="text-[#ff0000] mt-20 ml-20 rounded-full inline-block border border-1 border-[#ff0000] p-2">
        &larr; Back to Careers
      </Link>
    <div className="text-white font-inter w-full min-h-screen px-6 md:w-[80vw] mx-auto py-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-[#ff0000] mb-2">{job.title}</h1>
        <p className="text-gray-400 mb-2"><strong>Company:</strong> {job.company}</p>
        <p className="text-gray-400 mb-2"><strong>Location:</strong> {job.location}</p>
        <p className="text-gray-400 mb-6"><strong>Employment Type:</strong> {job.employment}</p>
        <h2 className="text-2xl font-semibold">About the Company</h2>
        <p>{job.about}</p>
      </div>

      <div className="flex-shrink-0">
        {(job.img) && <img
          src={job.img}
          alt={job.title}
          className="max-h-[50vh] w-auto maz-w-[45vw] object-contain md:ml-6"
        />}
      </div>
    </div>
      <div className="space-y-4 leading-relaxed">
        

        <h2 className="text-2xl font-semibold mt-6">Role Summary</h2>
        <ul className="list-disc pl-6 space-y-1">
          {job.roleSummary.map((item, i) => <li key={i}>{item}</li>)}
        </ul>

        <h2 className="text-2xl font-semibold mt-6">Key Responsibilities</h2>
        <ul className="list-disc pl-6 space-y-1">
          {job.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
        </ul>

        <h2 className="text-2xl font-semibold mt-6">Mandatory Qualifications & Skills</h2>
        <ul className="list-disc pl-6 space-y-1">
          {job.qualifications.map((q, i) => <li key={i}>{q}</li>)}
        </ul>

        <h2 className="text-2xl font-semibold mt-6">Experience Requirement</h2>
        <ul className="list-disc pl-6 space-y-1">
          {job.experience.map((exp, i) => <li key={i}>{exp}</li>)}
        </ul>

        <h2 className="text-2xl font-semibold mt-6">Salary</h2>
        <p>{job.salary}</p>

        <h2 className="text-2xl font-semibold mt-6">Next Steps</h2>
        <p>{job.nextSteps}</p>
      </div>

      <div className="mt-8 flex justify-end">
        <a
          onClick={() => window.open(job.link, "_blank")}
          rel="noopener noreferrer"
          className="bg-[#ff0000] hover:bg-black text-white px-6 py-3 rounded-xl"
        >
          Apply Now
        </a>
      </div>

    </div>
    <Footer/>
    </div>
  );
}
