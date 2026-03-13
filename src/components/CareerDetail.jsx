// // // import React, { useEffect, useState } from "react";
// // // import { useParams, Link } from "react-router-dom";
// // // import Footer from "./Footer";
// // // import { jobService } from "../../services/jobService";

// // // export default function CareerDetail() {
// // //   const { slug } = useParams();

// // //   const [job, setJob] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [currentIndex, setCurrentIndex] = useState(0);

// // //   // Fetch job by slug
// // //   useEffect(() => {
// // //     setLoading(true);
// // //     jobService
// // //       .getJobBySlug(slug)
// // //       .then((data) => {
// // //         setJob(data);
// // //         setLoading(false);
// // //       })
// // //       .catch(() => {
// // //         setJob(null);
// // //         setLoading(false);
// // //       });
// // //   }, [slug]);

// // //   // Image slider
// // //   useEffect(() => {
// // //     if (!job?.img?.length) return;

// // //     const interval = setInterval(() => {
// // //       setCurrentIndex((i) => (i + 1) % job.img.length);
// // //     }, 3000);

// // //     return () => clearInterval(interval);
// // //   }, [job]);

// // //   if (loading) {
// // //     return (
// // //       <p className="text-white text-center py-20 text-lg">
// // //         Loading job details…
// // //       </p>
// // //     );
// // //   }

// // //   if (!job) {
// // //     return (
// // //       <p className="text-white text-center py-20 text-lg">
// // //         Job not found.
// // //       </p>
// // //     );
// // //   }

// // //   return (
// // //     <div className="bg-gradient-to-bl from-black to-[#3f0000] min-h-screen">

// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
// // //         {/* Back */}
// // //         <Link
// // //           to="/careers"
// // //           className="inline-block text-sm sm:text-base text-[#ff0000] border border-[#ff0000] px-4 py-2 rounded-full mb-6"
// // //         >
// // //           ← Back to Careers
// // //         </Link>

// // //         {/* Grid */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // //           {/* LEFT */}
// // //           <div className="lg:col-span-2 text-white font-inter space-y-8">
// // //             {/* Header */}
// // //             <div>
// // //               <h1 className="text-3xl sm:text-4xl font-bold text-[#ff0000]">
// // //                 {job.title}
// // //               </h1>

// // //               <div className="mt-3 text-gray-400 space-y-1 text-sm sm:text-base">
// // //                 <p><strong>Company:</strong> {job.company}</p>
// // //                 <p><strong>Location:</strong> {job.location}</p>
// // //                 <p><strong>Employment:</strong> {job.employment}</p>
// // //               </div>
// // //             </div>

// // //             {/* Mobile Image */}
// // //             {job.img?.length > 0 && (
// // //               <div className="block lg:hidden">
// // //                 <img
// // //                   src={job.img[currentIndex]}
// // //                   alt={job.title}
// // //                   className="w-full rounded-xl object-contain"
// // //                 />
// // //               </div>
// // //             )}

// // //             {/* Role Summary */}
// // //             <section>
// // //               <h2 className="text-xl sm:text-2xl font-semibold mb-3">
// // //                 Role Summary
// // //               </h2>
// // //               <ul className="list-disc pl-6 space-y-1">
// // //                 {job.roleSummary?.map((item, i) => (
// // //                   <li key={i}>{item}</li>
// // //                 ))}
// // //               </ul>
// // //             </section>

// // //             {/* Qualifications */}
// // //             <section>
// // //               <h2 className="text-xl sm:text-2xl font-semibold mb-3">
// // //                 Qualifications
// // //               </h2>
// // //               <ul className="list-disc pl-6 space-y-1">
// // //                 {job.qualifications?.map((q, i) => (
// // //                   <li key={i}>{q}</li>
// // //                 ))}
// // //               </ul>
// // //             </section>

// // //             {/* STANDARD COMPANY POLICIES */}
// // // <section className="space-y-10 text-sm sm:text-base leading-relaxed">

// // //   {/* Work Timings */}
// // //   <div>
// // //     <h2 className="text-xl sm:text-2xl font-semibold mb-3">Work Timings</h2>
// // //     <ul className="list-disc pl-6 space-y-1">
// // //       <li>Reporting Time: 9:30 AM (sharp)</li>
// // //       <li>Closing Time: 6:30 PM (sharp)</li>
// // //       <li>Working Days: Monday to Saturday</li>
// // //       <li>Breaks: Only during officially allocated slots</li>
// // //       <li>Note: Punctuality is strictly enforced</li>
// // //     </ul>
// // //     <p className="mt-2 text-gray-300">
// // //       Employees reporting after 9:30 AM will be marked as <strong>Half-Day</strong>, irrespective of the reason,
// // //       unless it is an emergency situation or prior approval is obtained from management.
// // //     </p>
// // //   </div>

// // //   {/* Dress Code */}
// // //   <div>
// // //     <h2 className="text-xl sm:text-2xl font-semibold mb-3">Dress Code</h2>
// // //     <ul className="list-disc pl-6 space-y-1">
// // //       <li>Employees must follow the official dress code without exception</li>
// // //       <li>ID cards must be worn at all times</li>
// // //       <li>Men & Women: Black and white formal shirt with appropriate formal pants</li>
// // //       <li>Blazer is mandatory on all working days</li>
// // //       <li>Prohibited: Casual wear, denim, sneakers, T-shirts, or bright/unprofessional attire</li>
// // //       <li>Employees must be well groomed (both mustache and beard)</li>
// // //       <li>Employees failing to adhere will not be permitted to enter the workplace</li>
// // //     </ul>
// // //   </div>

// // //   {/* Key Responsibilities */}
// // //   <div>
// // //     <h2 className="text-xl sm:text-2xl font-semibold mb-3">Key Responsibilities</h2>
// // //     <ul className="list-disc pl-6 space-y-1">
// // //       <li>Execute all assigned tasks with precision, speed, and accountability</li>
// // //       <li>Failure in task completion will be reflected in monthly payout</li>
// // //       <li>Maintain daily work reports and progress logs on Zoho / ClickUp or other platforms</li>
// // //       <li>Collaborate with colleagues and management for seamless execution</li>
// // //       <li>Strictly adhere to deadlines, quality standards, and reporting structures</li>
// // //       <li>Uphold confidentiality and professionalism in client interactions</li>
// // //       <li>Ensure zero tolerance for negligence, misuse of work hours, or vanity-driven tasks</li>
// // //     </ul>
// // //   </div>

// // //   {/* Mandatory Qualifications */}
// // //   <div>
// // //     <h2 className="text-xl sm:text-2xl font-semibold mb-3">
// // //       Mandatory Qualifications & Skills
// // //     </h2>
// // //     <ul className="list-disc pl-6 space-y-1">
// // //       <li>1–3 years of relevant professional experience (role dependent)</li>
// // //       <li>Proficiency in industry-standard tools relevant to the role</li>
// // //       <li>Bachelor’s degree in a relevant field</li>
// // //       <li>Familiarity with Zoho, ClickUp, Trello, or similar platforms</li>
// // //       <li>Strong technical skills related to the role</li>
// // //       <li>Excellent time management and communication skills</li>
// // //       <li>High level of discipline, adaptability, and accountability</li>
// // //     </ul>
// // //   </div>

// // //   {/* Experience Requirement */}
// // //   <div>
// // //     <h2 className="text-xl sm:text-2xl font-semibold mb-3">
// // //       Experience Requirement
// // //     </h2>
// // //     <ul className="list-disc pl-6 space-y-1">
// // //       <li>
// // //         Minimum 1 year of relevant professional experience required for Full-Time,
// // //         Part-Time, and Contract roles
// // //       </li>
// // //       <li>
// // //         Internship positions are open only to freshers with strong learning ability,
// // //         discipline, and readiness to adapt to company standards
// // //       </li>
// // //     </ul>
// // //   </div>

// // //   {/* Leave Policy */}
// // //   <div>
// // //     <h2 className="text-xl sm:text-2xl font-semibold mb-3">
// // //       Leave & Attendance Policy
// // //     </h2>
// // //     <ul className="list-disc pl-6 space-y-1">
// // //       <li>2 Casual Leaves per month (one leave every 15 days)</li>
// // //       <li>All leave requests must be submitted and approved in advance</li>
// // //       <li>Uninformed absences will be treated as misconduct</li>
// // //       <li>Attendance, punctuality, and discipline are continuously monitored</li>
// // //     </ul>
// // //   </div>

// // //   {/* Employment Conditions */}
// // //   <div>
// // //     <h2 className="text-xl sm:text-2xl font-semibold mb-3">
// // //       Employment Conditions
// // //     </h2>
// // //     <ul className="list-disc pl-6 space-y-1">
// // //       <li>Compliance with timings, dress code, reporting, and discipline is non-negotiable</li>
// // //       <li>Daily structured task updates are mandatory</li>
// // //       <li>Confidentiality of company and client data is a strict requirement</li>
// // //       <li>Repeated underperformance or policy violations will lead to disciplinary action</li>
// // //       <li>
// // //         <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
// // //               Social<span className="text-[#ff0000]">B</span>ureau
// // //             </a> reserves the right to reassign tasks or restructure roles as business demands
// // //       </li>
// // //     </ul>
// // //   </div>

// // //   {/* Salary */}
// // //   <div>
// // //     <h2 className="text-xl sm:text-2xl font-semibold mb-3">Salary</h2>
// // //     <ul className="list-disc pl-6 space-y-1">
// // //       <li>Competitive and aligned with industry standards</li>
// // //       <li>Final package depends on role, experience, and interview performance</li>
// // //       <li>Increments are performance-based, not tenure-based</li>
// // //     </ul>
// // //   </div>

// // //   {/* Next Steps */}
// // //   <div>
// // //     <h2 className="text-xl sm:text-2xl font-semibold mb-3">Next Steps</h2>
// // //     <p className="mb-2">
// // //       Shortlisted candidates will be invited for an interview. Evaluation will focus on:
// // //     </p>
// // //     <ul className="list-disc pl-6 space-y-1">
// // //       <li>Role-specific expertise</li>
// // //       <li>Familiarity with structured reporting tools</li>
// // //       <li>Discipline, punctuality, and professional conduct</li>
// // //       <li>Alignment with <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
// // //               Social<span className="text-[#ff0000]">B</span>ureau
// // //             </a>’s performance-first culture</li>
// // //     </ul>
// // //   </div>

// // //   {/* Video Guidelines */}
// // //   <div>
// // //     <h2 className="text-xl sm:text-2xl font-semibold mb-3">
// // //       Video Guidelines
// // //     </h2>
// // //     <ul className="list-disc pl-6 space-y-1">
// // //       <li>Length: 1 to 2 minutes</li>
// // //       <li>Topic: Will be supplied by the company</li>
// // //       <li>No phone or webcam recordings</li>
// // //       <li>Professional lighting and tidy background required</li>
// // //       <li>Wear blazer, appear confident, and speak clearly</li>
// // //     </ul>

// // //     <p className="mt-2 text-gray-300">
// // //       This video will serve as an example of your professionalism, creativity,
// // //       and attention to detail.
// // //     </p>
// // //   </div>

// // // </section>


// // //             {/* Apply */}
// // //             <button
// // //               onClick={() => window.open(job.link, "_blank")}
// // //               className="bg-[#ff0000] hover:bg-black transition px-8 py-3 rounded-xl font-semibold"
// // //             >
// // //               Apply Now
// // //             </button>
// // //           </div>

// // //           {/* RIGHT */}
// // //           <div className="lg:col-span-1 space-y-6">
// // //             {/* Desktop Image */}
// // //             {job.img?.length > 0 && (
// // //               <div className="hidden lg:block">
// // //                 <img
// // //                   src={job.img[currentIndex]}
// // //                   alt={job.title}
// // //                   className="w-full rounded-xl object-contain"
// // //                 />
// // //               </div>
// // //             )}

// // //             {/* Sticky Form */}
// // //             <div className="bg-white rounded-xl shadow-lg overflow-hidden lg:sticky lg:top-24">
// // //               <iframe
// // //                 title="Application Form"
// // //                 src="https://docs.google.com/forms/d/e/1FAIpQLSdTQR9NJZMz3KYMwJSCow0EsGP8zUk_m79i4SqRzWVaHts6aA/viewform?embedded=true"
// // //                 className="w-full h-[1000px] md:h-[85vh]"
// // //                 frameBorder="0"
// // //                 loading="lazy"
// // //               />
// // //             </div>

// // //             <p className="text-xs text-gray-300">
// // //               If the form doesn’t load,
// // //               <a
// // //                 className="text-[#ff0000] ml-1"
// // //                 href="https://docs.google.com/forms/d/e/1FAIpQLSdTQR9NJZMz3KYMwJSCow0EsGP8zUk_m79i4SqRzWVaHts6aA/viewform"
// // //                 target="_blank"
// // //                 rel="noopener noreferrer"
// // //               >
// // //                 open in new tab
// // //               </a>
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import React, { useEffect, useState } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import Footer from "./Footer";
// // import { jobService } from "../../services/jobService";

// // export default function CareerDetail() {
// //   const { slug } = useParams();

// //   const [job, setJob] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   useEffect(() => {
// //     setLoading(true);
// //     jobService
// //       .getJobBySlug(slug)
// //       .then((data) => {
// //         setJob(data);
// //         setLoading(false);
// //       })
// //       .catch(() => {
// //         setJob(null);
// //         setLoading(false);
// //       });
// //   }, [slug]);

// //   useEffect(() => {
// //     if (!job?.img?.length) return;

// //     const interval = setInterval(() => {
// //       setCurrentIndex((i) => (i + 1) % job.img.length);
// //     }, 3000);

// //     return () => clearInterval(interval);
// //   }, [job]);

// //   if (loading) {
// //     return (
// //       <p className="text-gray-700 text-center py-20 text-lg">
// //         Loading job details…
// //       </p>
// //     );
// //   }

// //   if (!job) {
// //     return (
// //       <p className="text-gray-700 text-center py-20 text-lg">
// //         Job not found.
// //       </p>
// //     );
// //   }

// //   return (
// //     <div className="bg-[#fafafa] min-h-screen">

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

// //         {/* Back Button */}
// //         <Link
// //           to="/careers"
// //           className="inline-block text-sm text-red-600 border border-red-600 px-4 py-2 rounded-full mb-8 hover:bg-red-600 hover:text-white transition"
// //         >
// //           ← Back to Careers
// //         </Link>

// //         {/* Layout Grid */}
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

// //           {/* LEFT SIDE */}
// //           <div className="lg:col-span-2 space-y-10 text-gray-800">

// //             {/* Header */}
// //             <div>
// //               <h1 className="text-4xl font-bold text-red-600">
// //                 {job.title}
// //               </h1>

// //               <div className="mt-4 text-gray-600 space-y-1">
// //                 <p><strong>Company:</strong> {job.company}</p>
// //                 <p><strong>Location:</strong> {job.location}</p>
// //                 <p><strong>Employment:</strong> {job.employment}</p>
// //               </div>
// //             </div>

// //             {/* Mobile Image */}
// //             {job.img?.length > 0 && (
// //               <div className="block lg:hidden">
// //                 <img
// //                   src={job.img[currentIndex]}
// //                   alt={job.title}
// //                   className="w-full rounded-xl object-cover"
// //                 />
// //               </div>
// //             )}

// //             {/* Role Summary */}
// //             <section className="bg-white p-6 rounded-xl border border-gray-200">
// //               <h2 className="text-2xl font-semibold mb-3">Role Summary</h2>
// //               <ul className="list-disc pl-6 space-y-1">
// //                 {job.roleSummary?.map((item, i) => (
// //                   <li key={i}>{item}</li>
// //                 ))}
// //               </ul>
// //             </section>

// //             {/* Qualifications */}
// //             <section className="bg-white p-6 rounded-xl border border-gray-200">
// //               <h2 className="text-2xl font-semibold mb-3">Qualifications</h2>
// //               <ul className="list-disc pl-6 space-y-1">
// //                 {job.qualifications?.map((q, i) => (
// //                   <li key={i}>{q}</li>
// //                 ))}
// //               </ul>
// //             </section>

// //             {/* COMPANY POLICIES */}
// //             <section className="space-y-8">

// //               {[
// //                 {
// //                   title: "Work Timings",
// //                   content: [
// //                     "Reporting Time: 9:30 AM",
// //                     "Closing Time: 6:30 PM",
// //                     "Working Days: Monday to Saturday",
// //                     "Breaks only during allocated slots"
// //                   ]
// //                 },
// //                 {
// //                   title: "Dress Code",
// //                   content: [
// //                     "Black & white formal shirts",
// //                     "Formal trousers required",
// //                     "Blazer mandatory",
// //                     "No casual wear, sneakers, or denim"
// //                   ]
// //                 },
// //                 {
// //                   title: "Key Responsibilities",
// //                   content: [
// //                     "Execute assigned tasks with precision",
// //                     "Maintain daily reports in Zoho / ClickUp",
// //                     "Collaborate with teams for delivery",
// //                     "Maintain confidentiality with clients"
// //                   ]
// //                 },
// //                 {
// //                   title: "Leave Policy",
// //                   content: [
// //                     "2 Casual Leaves per month",
// //                     "Leave must be approved in advance",
// //                     "Attendance strictly monitored"
// //                   ]
// //                 }
// //               ].map((section, i) => (
// //                 <div
// //                   key={i}
// //                   className="bg-white p-6 rounded-xl border border-gray-200"
// //                 >
// //                   <h2 className="text-2xl font-semibold mb-3">
// //                     {section.title}
// //                   </h2>

// //                   <ul className="list-disc pl-6 space-y-1">
// //                     {section.content.map((item, idx) => (
// //                       <li key={idx}>{item}</li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               ))}

// //             </section>

// //             {/* Apply Button */}
// //             <button
// //               onClick={() => window.open(job.link, "_blank")}
// //               className="bg-red-600 hover:bg-black text-white px-8 py-3 rounded-lg font-semibold transition"
// //             >
// //               Apply Now
// //             </button>

// //           </div>

// //           {/* RIGHT SIDE */}
// //           <div className="space-y-6">

// //             {/* Desktop Image */}
// //             {job.img?.length > 0 && (
// //               <div className="hidden lg:block">
// //                 <img
// //                   src={job.img[currentIndex]}
// //                   alt={job.title}
// //                   className="w-full rounded-xl object-cover"
// //                 />
// //               </div>
// //             )}

// //             {/* Google Form */}
// //             <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden lg:sticky lg:top-24">
// //               <iframe
// //                 title="Application Form"
// //                 src="https://docs.google.com/forms/d/e/1FAIpQLSdTQR9NJZMz3KYMwJSCow0EsGP8zUk_m79i4SqRzWVaHts6aA/viewform?embedded=true"
// //                 className="w-full h-[1000px] md:h-[85vh]"
// //                 frameBorder="0"
// //                 loading="lazy"
// //               />
// //             </div>

// //             <p className="text-xs text-gray-500">
// //               If the form doesn’t load,
// //               <a
// //                 className="text-red-600 ml-1"
// //                 href="https://docs.google.com/forms/d/e/1FAIpQLSdTQR9NJZMz3KYMwJSCow0EsGP8zUk_m79i4SqRzWVaHts6aA/viewform"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 open in new tab
// //               </a>
// //             </p>

// //           </div>
// //         </div>
// //       </div>

// //       <Footer />
// //     </div>
// //   );
// // }



// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import Footer from "./Footer";
// import { jobService } from "../../services/jobService";

// export default function CareerDetail() {
//   const { slug } = useParams();

//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     setLoading(true);
//     jobService
//       .getJobBySlug(slug)
//       .then((data) => {
//         setJob(data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setJob(null);
//         setLoading(false);
//       });
//   }, [slug]);

//   useEffect(() => {
//     if (!job?.img?.length) return;

//     const interval = setInterval(() => {
//       setCurrentIndex((i) => (i + 1) % job.img.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [job]);

//   if (loading) {
//     return (
//       <p className="text-gray-700 text-center py-20 text-lg">
//         Loading job details…
//       </p>
//     );
//   }

//   if (!job) {
//     return (
//       <p className="text-gray-700 text-center py-20 text-lg">
//         Job not found.
//       </p>
//     );
//   }

//   return (
//     <div className="bg-[#fafafa] min-h-screen">

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

//         {/* Back */}
//         <Link
//           to="/careers"
//           className="inline-block text-sm text-red-600 border border-red-600 px-4 py-2 rounded-full mb-6 hover:bg-red-600 hover:text-white transition"
//         >
//           ← Back to Careers
//         </Link>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//           {/* LEFT */}
//           <div className="lg:col-span-2 space-y-10 text-gray-800">

//             {/* Header */}
//             <div>
//               <h1 className="text-4xl font-bold text-red-600">
//                 {job.title}
//               </h1>

//               <div className="mt-3 text-gray-600 space-y-1">
//                 <p><strong>Company:</strong> {job.company}</p>
//                 <p><strong>Location:</strong> {job.location}</p>
//                 <p><strong>Employment:</strong> {job.employment}</p>
//               </div>
//             </div>

//             {/* Mobile Image */}
//             {job.img?.length > 0 && (
//               <div className="block lg:hidden">
//                 <img
//                   src={job.img[currentIndex]}
//                   alt={job.title}
//                   className="w-full rounded-xl object-contain"
//                 />
//               </div>
//             )}

//             {/* Role Summary */}
//             <section className="bg-white p-6 rounded-xl border border-gray-200">
//               <h2 className="text-2xl font-semibold mb-3">Role Summary</h2>
//               <ul className="list-disc pl-6 space-y-1">
//                 {job.roleSummary?.map((item, i) => (
//                   <li key={i}>{item}</li>
//                 ))}
//               </ul>
//             </section>

//             {/* Qualifications */}
//             <section className="bg-white p-6 rounded-xl border border-gray-200">
//               <h2 className="text-2xl font-semibold mb-3">Qualifications</h2>
//               <ul className="list-disc pl-6 space-y-1">
//                 {job.qualifications?.map((q, i) => (
//                   <li key={i}>{q}</li>
//                 ))}
//               </ul>
//             </section>

//             {/* COMPANY POLICIES */}
//             <section className="space-y-10 text-sm sm:text-base leading-relaxed">

//               {/* Work Timings */}
//               <div className="bg-white p-6 rounded-xl border border-gray-200">
//                 <h2 className="text-xl sm:text-2xl font-semibold mb-3">Work Timings</h2>
//                 <ul className="list-disc pl-6 space-y-1">
//                   <li>Reporting Time: 9:30 AM (sharp)</li>
//                   <li>Closing Time: 6:30 PM (sharp)</li>
//                   <li>Working Days: Monday to Saturday</li>
//                   <li>Breaks: Only during officially allocated slots</li>
//                   <li>Note: Punctuality is strictly enforced</li>
//                 </ul>

//                 <p className="mt-3 text-gray-600">
//                   Employees reporting after 9:30 AM will be marked as <strong>Half-Day</strong>, irrespective of the reason,
//                   unless it is an emergency situation or prior approval is obtained from management.
//                 </p>
//               </div>

//               {/* Dress Code */}
//               <div className="bg-white p-6 rounded-xl border border-gray-200">
//                 <h2 className="text-xl sm:text-2xl font-semibold mb-3">Dress Code</h2>
//                 <ul className="list-disc pl-6 space-y-1">
//                   <li>Employees must follow the official dress code without exception</li>
//                   <li>ID cards must be worn at all times</li>
//                   <li>Men & Women: Black and white formal shirt with appropriate formal pants</li>
//                   <li>Blazer is mandatory on all working days</li>
//                   <li>Prohibited: Casual wear, denim, sneakers, T-shirts, or bright/unprofessional attire</li>
//                   <li>Employees must be well groomed (both mustache and beard)</li>
//                   <li>Employees failing to adhere will not be permitted to enter the workplace</li>
//                 </ul>
//               </div>

//               {/* Key Responsibilities */}
//               <div className="bg-white p-6 rounded-xl border border-gray-200">
//                 <h2 className="text-xl sm:text-2xl font-semibold mb-3">Key Responsibilities</h2>
//                 <ul className="list-disc pl-6 space-y-1">
//                   <li>Execute all assigned tasks with precision, speed, and accountability</li>
//                   <li>Failure in task completion will be reflected in monthly payout</li>
//                   <li>Maintain daily work reports and progress logs on Zoho / ClickUp or other platforms</li>
//                   <li>Collaborate with colleagues and management for seamless execution</li>
//                   <li>Strictly adhere to deadlines, quality standards, and reporting structures</li>
//                   <li>Uphold confidentiality and professionalism in client interactions</li>
//                   <li>Ensure zero tolerance for negligence, misuse of work hours, or vanity-driven tasks</li>
//                 </ul>
//               </div>

//               {/* Mandatory Qualifications */}
//               <div className="bg-white p-6 rounded-xl border border-gray-200">
//                 <h2 className="text-xl sm:text-2xl font-semibold mb-3">
//                   Mandatory Qualifications & Skills
//                 </h2>

//                 <ul className="list-disc pl-6 space-y-1">
//                   <li>1–3 years of relevant professional experience (role dependent)</li>
//                   <li>Proficiency in industry-standard tools relevant to the role</li>
//                   <li>Bachelor’s degree in a relevant field</li>
//                   <li>Familiarity with Zoho, ClickUp, Trello, or similar platforms</li>
//                   <li>Strong technical skills related to the role</li>
//                   <li>Excellent time management and communication skills</li>
//                   <li>High level of discipline, adaptability, and accountability</li>
//                 </ul>
//               </div>

//               {/* Experience Requirement */}
//               <div className="bg-white p-6 rounded-xl border border-gray-200">
//                 <h2 className="text-xl sm:text-2xl font-semibold mb-3">
//                   Experience Requirement
//                 </h2>

//                 <ul className="list-disc pl-6 space-y-1">
//                   <li>
//                     Minimum 1 year of relevant professional experience required for
//                     Full-Time, Part-Time, and Contract roles
//                   </li>
//                   <li>
//                     Internship positions are open only to freshers with strong learning
//                     ability, discipline, and readiness to adapt to company standards
//                   </li>
//                 </ul>
//               </div>

//               {/* Leave Policy */}
//               <div className="bg-white p-6 rounded-xl border border-gray-200">
//                 <h2 className="text-xl sm:text-2xl font-semibold mb-3">
//                   Leave & Attendance Policy
//                 </h2>

//                 <ul className="list-disc pl-6 space-y-1">
//                   <li>2 Casual Leaves per month (one leave every 15 days)</li>
//                   <li>All leave requests must be submitted and approved in advance</li>
//                   <li>Uninformed absences will be treated as misconduct</li>
//                   <li>Attendance, punctuality, and discipline are continuously monitored</li>
//                 </ul>
//               </div>

//               {/* Employment Conditions */}
//               <div className="bg-white p-6 rounded-xl border border-gray-200">
//                 <h2 className="text-xl sm:text-2xl font-semibold mb-3">
//                   Employment Conditions
//                 </h2>

//                 <ul className="list-disc pl-6 space-y-1">
//                   <li>
//                     Compliance with timings, dress code, reporting, and discipline is
//                     non-negotiable
//                   </li>
//                   <li>Daily structured task updates are mandatory</li>
//                   <li>Confidentiality of company and client data is a strict requirement</li>
//                   <li>
//                     Repeated underperformance or policy violations will lead to
//                     disciplinary action
//                   </li>
//                   <li>
//                     <a href="https://www.socialbureau.in" target="_blank" rel="noopener noreferrer">Social<span className="text-red-600">B</span>ureau reserves the
//                       right to reassign tasks or restructure roles as business demands</a>
//                   </li>
//                 </ul>
//               </div>

//               {/* Salary */}
//               <div className="bg-white p-6 rounded-xl border border-gray-200">
//                 <h2 className="text-xl sm:text-2xl font-semibold mb-3">Salary</h2>

//                 <ul className="list-disc pl-6 space-y-1">
//                   <li>Competitive and aligned with industry standards</li>
//                   <li>Final package depends on role, experience, and interview performance</li>
//                   <li>Increments are performance-based, not tenure-based</li>
//                 </ul>
//               </div>

//               {/* Next Steps */}
//               <div className="bg-white p-6 rounded-xl border border-gray-200">
//                 <h2 className="text-xl sm:text-2xl font-semibold mb-3">Next Steps</h2>

//                 <p className="mb-2">
//                   Shortlisted candidates will be invited for an interview. Evaluation will focus on:
//                 </p>

//                 <ul className="list-disc pl-6 space-y-1">
//                   <li>Role-specific expertise</li>
//                   <li>Familiarity with structured reporting tools</li>
//                   <li>Discipline, punctuality, and professional conduct</li>
//                   <li>
//                     Alignment with <a href="https://www.socialbureau.in" rel="noopener noreferrer">Social<span className="text-red-600">B</span>ureau’s</a>
//                     performance-first culture
//                   </li>
//                 </ul>
//               </div>

//               {/* Video Guidelines */}
//               <div className="bg-white p-6 rounded-xl border border-gray-200">
//                 <h2 className="text-xl sm:text-2xl font-semibold mb-3">
//                   Video Guidelines
//                 </h2>

//                 <ul className="list-disc pl-6 space-y-1">
//                   <li>Length: 1 to 2 minutes</li>
//                   <li>Topic: Will be supplied by the company</li>
//                   <li>No phone or webcam recordings</li>
//                   <li>Professional lighting and tidy background required</li>
//                   <li>Wear blazer, appear confident, and speak clearly</li>
//                 </ul>

//                 <p className="mt-3 text-gray-600">
//                   This video will serve as an example of your professionalism,
//                   creativity, and attention to detail.
//                 </p>
//               </div>

//             </section>


//             {/* Apply Button */}
//             <button
//               onClick={() => window.open(job.link, "_blank")}
//               className="bg-red-600 hover:bg-black text-white px-8 py-3 rounded-xl font-semibold transition"
//             >
//               Apply Now
//             </button>

//           </div>

//           {/* RIGHT */}
//           <div className="space-y-6">

//             {job.img?.length > 0 && (
//               <div className="hidden lg:block">
//                 <img
//                   src={job.img[currentIndex]}
//                   alt={job.title}
//                   className="w-full rounded-xl object-contain"
//                 />
//               </div>
//             )}

//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden lg:sticky lg:top-24">
//               <iframe
//                 title="Application Form"
//                 src="https://docs.google.com/forms/d/e/1FAIpQLSdTQR9NJZMz3KYMwJSCow0EsGP8zUk_m79i4SqRzWVaHts6aA/viewform?embedded=true"
//                 className="w-full h-[1000px] md:h-[85vh]"
//                 frameBorder="0"
//                 loading="lazy"
//               />
//             </div>

//           </div>
//         </div>
//       </div>

//       <Footer />

//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "./Footer";
import { jobService } from "../../services/jobService";

// Helper Component for Policy Cards
const PolicySection = ({ title, children, icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-red-50 rounded-lg text-red-600">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
    <div className="text-gray-600 text-sm leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);

export default function CareerDetail() {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    jobService.getJobBySlug(slug)
      .then((data) => { setJob(data); setLoading(false); })
      .catch(() => { setJob(null); setLoading(false); });
  }, [slug]);

  useEffect(() => {
    if (!job?.img?.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % job.img.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [job]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-red-600 font-bold">Loading Career Opportunity...</div></div>;
  if (!job) return <div className="text-center py-20">Job not found.</div>;

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-sans selection:bg-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* Breadcrumb / Back Navigation */}
        <Link to="/careers" className="group flex items-center text-sm font-semibold text-gray-500 hover:text-red-600 transition mb-10">
          <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span> Back to all openings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT: JOB CONTENT */}
          <div className="lg:col-span-7 space-y-12">

            {/* Title & Badges */}
            <section>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white border border-gray-200 px-4 py-1.5 rounded-full text-sm font-medium text-gray-700 shadow-sm">{job.company}</span>
                <span className="bg-white border border-gray-200 px-4 py-1.5 rounded-full text-sm font-medium text-gray-700 shadow-sm">{job.location}</span>
                <span className="bg-red-50 border border-red-100 px-4 py-1.5 rounded-full text-sm font-bold text-red-600 shadow-sm">{job.employment}</span>
              </div>
            </section>

            {/* Mobile Carousel */}
            {job.img?.length > 0 && (
              <div className="lg:hidden rounded-3xl overflow-hidden shadow-2xl aspect-video">
                <img src={job.img[currentIndex]} alt="Office Culture" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Core Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Role Summary</h2>
                <ul className="space-y-3 list-none">
                  {job.roleSummary?.map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-600 text-sm italic">
                      <span className="text-red-500">▹</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Qualifications</h2>
                <ul className="space-y-3 list-none">
                  {job.qualifications?.map((q, i) => (
                    <li key={i} className="flex gap-3 text-gray-600 text-sm">
                      <span className="text-green-500 font-bold">✓</span> {q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Policy & Standards Sections */}
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-gray-900 pt-6">The SocialBureau Standard</h2>
              <p className="text-gray-500 -mt-4 text-sm font-medium uppercase tracking-widest">Non-negotiable workplace policies</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PolicySection title="Work Timings" icon="⏰">
                  <p><strong>9:30 AM - 6:30 PM (Sharp)</strong></p>
                  <p>Monday to Saturday. Punctuality is strictly monitored. Late arrivals result in a half-day mark.</p>
                </PolicySection>

                <PolicySection title="Dress Code" icon="👔">
                  <p>Black/White formal shirts, formal pants, and mandatory Blazers. ID cards must be worn at all times.</p>
                </PolicySection>

                <PolicySection title="Performance" icon="📈">
                  <p>Daily reporting on Zoho/ClickUp. Increments are strictly performance-based, not tenure-based.</p>
                </PolicySection>

                <PolicySection title="Leave Policy" icon="🗓️">
                  <p>2 Casual Leaves per month. Advance approval is required. Uninformed absence is treated as misconduct.</p>
                </PolicySection>
              </div>
            </div>

            {/* Video Guidelines Notice */}
            <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Interview Video Guidelines</h3>
                <ul className="space-y-2 text-gray-300 text-sm list-disc pl-5">
                  <li>No phone/webcam recordings.</li>
                  <li>Professional lighting and blazer required.</li>
                  <li>Focus on clarity, confidence, and professionalism.</li>
                </ul>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
            </div>

          </div>

          {/* RIGHT: STICKY FORM & IMAGES */}
          <div className="lg:col-span-5 space-y-8">

            {/* Desktop Carousel */}
            {job.img?.length > 0 && (
              <div className="hidden lg:block rounded-3xl overflow-hidden shadow-2xl h-64 border-4 border-white">
                <img src={job.img[currentIndex]} alt="Culture" className="w-full h-full object-cover transition-opacity duration-1000" />
              </div>
            )}

            {/* Sticky Application Widget */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden ring-1 ring-black/5">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900">Direct Application</h3>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="h-[600px] lg:h-[70vh]">
                  <iframe
                    title="Application Form"
                    src="https://docs.google.com/forms/d/e/1FAIpQLSdTQR9NJZMz3KYMwJSCow0EsGP8zUk_m79i4SqRzWVaHts6aA/viewform?embedded=true"
                    className="w-full h-full"
                    frameBorder="0"
                    loading="lazy"
                  />
                </div>
              </div>
              <p className="text-center text-xs text-gray-400 mt-4">
                By applying, you agree to the employment conditions listed.
              </p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}