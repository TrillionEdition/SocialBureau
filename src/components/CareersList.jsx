// import React from "react";
// import { Link } from "react-router-dom";
// import jobs from "../data/jobs";

// export default function CareersList() {
//   return (
//     <section className="text-white py-20 px-6 md:px-30 mx-auto ">
//       <h2 className="text-5xl font-bold mb-6 text-center">Careers</h2>
//       <p className="text-xl text-gray-300 font-light text-center mb-12">
//         Designed for professionals of distinction
//       </p>

//       <div className="grid md:grid-cols-2 gap-8">
//         {jobs.map((job) => (
//           <div
//             key={job.slug}
//             className="border border-gray-700 hover:border-[#ff0000] p-5 md:p-8 shadow-xl rounded-[1rem] bg-black"
//           >
//             <div className="flex justify-between items-start mb-6">
//               <h3 className="text-2xl font-semibold">{job.title}</h3>
//               <i className={`${job.icon} text-[#ff0000] lg:text-xl text-[0px]`}></i>
//             </div>
//             <p className="text-gray-300 mb-6 text-left">{job.description}</p>
//             <div className="flex justify-between items-center">
//              <span className="text-sm text-gray-400">{job.department}</span>
//               <span className="text-sm text-gray-400">{job.type}</span>
              
//               <Link
//                 to={`/careers/${job.slug}`} // use slug
//                 className="border rounded-[1rem] border-[#ff0000] px-6 py-2 text-sm bg-[#ff0000] hover:bg-black hover:text-white transition"
//               >
//                 View Details
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jobService } from "../../services/jobService";

export default function CareersPost() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    jobService.getJobs().then(setJobs).catch(console.error);
  }, []);

  return (
    <section className="text-white py-20 px-6 md:px-24 mx-auto">
      <h2 className="text-5xl font-bold mb-6 text-center">Careers</h2>
      <p className="text-xl text-gray-300 font-light text-center mb-16">
        Designed for professionals of distinction
      </p>

      {/* GRID */}
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
    </section>
  );
}
