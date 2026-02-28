import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jobService } from "../../services/jobService";

export default function CareersPost() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true);
    jobService
      .getJobs()
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load careers. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center text-white py-20">
        <p className="text-xl">Loading careers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-20">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  return (
    <section className="text-white py-20 px-6 md:px-24 mx-auto">
      <h2 className="text-5xl font-bold mb-6 text-center" id="careers">Careers</h2>
      <p className="text-xl text-gray-300 font-light text-center mb-16">
        Designed for professionals of distinction
      </p>

      {/* GRID */}
      {jobs.length === 0 ? (
        <p className="text-center text-gray-400">No open positions at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {jobs.map((job) => (
            <div
              key={job.slug}
              className="
              relative bg-black rounded-2xl p-8
              border border-gray-800
              hover:border-red-600
              transition-all duration-300
              min-h-[220px]
              flex flex-col justify-between
            "
            >
              {/* ICON */}
              {job.icon && (
                <i
                  className={`${job.icon}
                absolute top-6 right-6
                text-red-600 text-xl`}
                />
              )}

              {/* TITLE */}
              <h3 className="text-2xl font-semibold mb-4">
                {job.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-[90%]">
                {job.description}
              </p>

              {/* FOOTER */}
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm text-gray-400">
                  {job.department}
                </span>

                <Link
                  to={`/careers/${job.slug}`}
                  className="
                  bg-red-600 text-white
                  px-6 py-2 rounded-full
                  text-sm font-medium
                  hover:bg-red-700
                  transition
                "
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
