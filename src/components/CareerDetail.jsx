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
    if (!job?.img || job.img.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % job.img.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [job.img]);

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
                <h1 className="text-4xl font-bold text-[#ff0000] mb-2">{job.title}</h1>
                <p className="text-gray-400 mb-2">
                  <strong>Company:</strong> {job.company}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>Location:</strong> {job.location}
                </p>
                <p className="text-gray-400 mb-6">
                  <strong>Employment Type:</strong> {job.employment}
                </p>
                <h2 className="text-2xl font-semibold">About the Company</h2>
                <p className="mb-4">{job.about}</p>
              </div>

              {/* Image */}
              
            </div>

            <div className="space-y-4 leading-relaxed mt-6">
              <h2 className="text-2xl font-semibold">Role Summary</h2>
              <ul className="list-disc pl-6 space-y-1">
                {job.roleSummary.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold mt-6">Key Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-1">
                {job.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold mt-6">Mandatory Qualifications & Skills</h2>
              <ul className="list-disc pl-6 space-y-1">
                {job.qualifications.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold mt-6">Experience Requirement</h2>
              <ul className="list-disc pl-6 space-y-1">
                {job.experience.map((exp, i) => (
                  <li key={i}>{exp}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold mt-6">Salary</h2>
              <p>{job.salary}</p>

              <h2 className="text-2xl font-semibold mt-6">Next Steps</h2>
              <p>{job.nextSteps}</p>

              <div className="mt-8 flex">
                <a
                  onClick={() => window.open(job.link, "_blank")}
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
            {job.img && job.img.length > 0 && (
              <img
                src={job.img[currentIndex]}
                alt={job.title}
                className="w-full object-contain md:ml-0 transition-opacity duration-700 ease-in-out pb-10 rounded-xl"
                key={job.img[currentIndex]}
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