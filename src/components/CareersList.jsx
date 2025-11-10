import React from "react";
import { Link } from "react-router-dom";
import jobs from "../data/jobs";

export default function CareersList() {
  return (
    <section className="text-white py-20 px-6 md:px-30 mx-auto ">
      <h2 className="text-5xl font-bold mb-6 text-center">Careers</h2>
      <p className="text-xl text-gray-300 font-light text-center mb-12">
        Designed for professionals of distinction
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {jobs.map((job) => (
          <div
            key={job.slug}
            className="border border-gray-700 hover:border-[#ff0000] p-5 md:p-8 shadow-xl rounded-[1rem] bg-black"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-semibold">{job.title}</h3>
              <i className={`${job.icon} text-[#ff0000] lg:text-xl text-[0px]`}></i>
            </div>
            <p className="text-gray-300 mb-6 text-left">{job.description}</p>
            <div className="flex justify-between items-center">
             <span className="text-sm text-gray-400">{job.department}</span>
              <span className="text-sm text-gray-400">{job.type}</span>
              
              <Link
                to={`/careers/${job.slug}`} // use slug
                className="border rounded-[1rem] border-[#ff0000] px-6 py-2 text-sm bg-[#ff0000] hover:bg-black hover:text-white transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
