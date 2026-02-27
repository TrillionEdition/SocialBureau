import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "./Footer";
import { jobService } from "../..jobService";

export default function CareerDetail() {
  const { slug } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch job by slug
  useEffect(() => {
    setLoading(true);
    jobService
      .getJobBySlug(slug)
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch(() => {
        setJob(null);
        setLoading(false);
      });
  }, [slug]);

  // Image slider
  useEffect(() => {
    if (!job?.img?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % job.img.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [job]);

  if (loading) {
    return (
      <p className="text-white text-center py-20 text-lg">
        Loading job details…
      </p>
    );
  }

  if (!job) {
    return (
      <p className="text-white text-center py-20 text-lg">
        Job not found.
      </p>
    );
  }

  return (
    <div className="bg-gradient-to-bl from-black to-[#3f0000] min-h-screen">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Back */}
        <Link
          to="/careers"
          className="inline-block text-sm sm:text-base text-[#ff0000] border border-[#ff0000] px-4 py-2 rounded-full mb-6"
        >
          ← Back to Careers
        </Link>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 text-white font-inter space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#ff0000]">
                {job.title}
              </h1>

              <div className="mt-3 text-gray-400 space-y-1 text-sm sm:text-base">
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Employment:</strong> {job.employment}</p>
              </div>
            </div>

            {/* Mobile Image */}
            {job.img?.length > 0 && (
              <div className="block lg:hidden">
                <img
                  src={job.img[currentIndex]}
                  alt={job.title}
                  className="w-full rounded-xl object-contain"
                />
              </div>
            )}

            {/* Role Summary */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">
                Role Summary
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                {job.roleSummary?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Qualifications */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">
                Qualifications
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                {job.qualifications?.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </section>

            {/* STANDARD COMPANY POLICIES */}
<section className="space-y-10 text-sm sm:text-base leading-relaxed">

  {/* Work Timings */}
  <div>
    <h2 className="text-xl sm:text-2xl font-semibold mb-3">Work Timings</h2>
    <ul className="list-disc pl-6 space-y-1">
      <li>Reporting Time: 9:30 AM (sharp)</li>
      <li>Closing Time: 6:30 PM (sharp)</li>
      <li>Working Days: Monday to Saturday</li>
      <li>Breaks: Only during officially allocated slots</li>
      <li>Note: Punctuality is strictly enforced</li>
    </ul>
    <p className="mt-2 text-gray-300">
      Employees reporting after 9:30 AM will be marked as <strong>Half-Day</strong>, irrespective of the reason,
      unless it is an emergency situation or prior approval is obtained from management.
    </p>
  </div>

  {/* Dress Code */}
  <div>
    <h2 className="text-xl sm:text-2xl font-semibold mb-3">Dress Code</h2>
    <ul className="list-disc pl-6 space-y-1">
      <li>Employees must follow the official dress code without exception</li>
      <li>ID cards must be worn at all times</li>
      <li>Men & Women: Black and white formal shirt with appropriate formal pants</li>
      <li>Blazer is mandatory on all working days</li>
      <li>Prohibited: Casual wear, denim, sneakers, T-shirts, or bright/unprofessional attire</li>
      <li>Employees must be well groomed (both mustache and beard)</li>
      <li>Employees failing to adhere will not be permitted to enter the workplace</li>
    </ul>
  </div>

  {/* Key Responsibilities */}
  <div>
    <h2 className="text-xl sm:text-2xl font-semibold mb-3">Key Responsibilities</h2>
    <ul className="list-disc pl-6 space-y-1">
      <li>Execute all assigned tasks with precision, speed, and accountability</li>
      <li>Failure in task completion will be reflected in monthly payout</li>
      <li>Maintain daily work reports and progress logs on Zoho / ClickUp or other platforms</li>
      <li>Collaborate with colleagues and management for seamless execution</li>
      <li>Strictly adhere to deadlines, quality standards, and reporting structures</li>
      <li>Uphold confidentiality and professionalism in client interactions</li>
      <li>Ensure zero tolerance for negligence, misuse of work hours, or vanity-driven tasks</li>
    </ul>
  </div>

  {/* Mandatory Qualifications */}
  <div>
    <h2 className="text-xl sm:text-2xl font-semibold mb-3">
      Mandatory Qualifications & Skills
    </h2>
    <ul className="list-disc pl-6 space-y-1">
      <li>1–3 years of relevant professional experience (role dependent)</li>
      <li>Proficiency in industry-standard tools relevant to the role</li>
      <li>Bachelor’s degree in a relevant field</li>
      <li>Familiarity with Zoho, ClickUp, Trello, or similar platforms</li>
      <li>Strong technical skills related to the role</li>
      <li>Excellent time management and communication skills</li>
      <li>High level of discipline, adaptability, and accountability</li>
    </ul>
  </div>

  {/* Experience Requirement */}
  <div>
    <h2 className="text-xl sm:text-2xl font-semibold mb-3">
      Experience Requirement
    </h2>
    <ul className="list-disc pl-6 space-y-1">
      <li>
        Minimum 1 year of relevant professional experience required for Full-Time,
        Part-Time, and Contract roles
      </li>
      <li>
        Internship positions are open only to freshers with strong learning ability,
        discipline, and readiness to adapt to company standards
      </li>
    </ul>
  </div>

  {/* Leave Policy */}
  <div>
    <h2 className="text-xl sm:text-2xl font-semibold mb-3">
      Leave & Attendance Policy
    </h2>
    <ul className="list-disc pl-6 space-y-1">
      <li>2 Casual Leaves per month (one leave every 15 days)</li>
      <li>All leave requests must be submitted and approved in advance</li>
      <li>Uninformed absences will be treated as misconduct</li>
      <li>Attendance, punctuality, and discipline are continuously monitored</li>
    </ul>
  </div>

  {/* Employment Conditions */}
  <div>
    <h2 className="text-xl sm:text-2xl font-semibold mb-3">
      Employment Conditions
    </h2>
    <ul className="list-disc pl-6 space-y-1">
      <li>Compliance with timings, dress code, reporting, and discipline is non-negotiable</li>
      <li>Daily structured task updates are mandatory</li>
      <li>Confidentiality of company and client data is a strict requirement</li>
      <li>Repeated underperformance or policy violations will lead to disciplinary action</li>
      <li>
        <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a> reserves the right to reassign tasks or restructure roles as business demands
      </li>
    </ul>
  </div>

  {/* Salary */}
  <div>
    <h2 className="text-xl sm:text-2xl font-semibold mb-3">Salary</h2>
    <ul className="list-disc pl-6 space-y-1">
      <li>Competitive and aligned with industry standards</li>
      <li>Final package depends on role, experience, and interview performance</li>
      <li>Increments are performance-based, not tenure-based</li>
    </ul>
  </div>

  {/* Next Steps */}
  <div>
    <h2 className="text-xl sm:text-2xl font-semibold mb-3">Next Steps</h2>
    <p className="mb-2">
      Shortlisted candidates will be invited for an interview. Evaluation will focus on:
    </p>
    <ul className="list-disc pl-6 space-y-1">
      <li>Role-specific expertise</li>
      <li>Familiarity with structured reporting tools</li>
      <li>Discipline, punctuality, and professional conduct</li>
      <li>Alignment with <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a>’s performance-first culture</li>
    </ul>
  </div>

  {/* Video Guidelines */}
  <div>
    <h2 className="text-xl sm:text-2xl font-semibold mb-3">
      Video Guidelines
    </h2>
    <ul className="list-disc pl-6 space-y-1">
      <li>Length: 1 to 2 minutes</li>
      <li>Topic: Will be supplied by the company</li>
      <li>No phone or webcam recordings</li>
      <li>Professional lighting and tidy background required</li>
      <li>Wear blazer, appear confident, and speak clearly</li>
    </ul>

    <p className="mt-2 text-gray-300">
      This video will serve as an example of your professionalism, creativity,
      and attention to detail.
    </p>
  </div>

</section>


            {/* Apply */}
            <button
              onClick={() => window.open(job.link, "_blank")}
              className="bg-[#ff0000] hover:bg-black transition px-8 py-3 rounded-xl font-semibold"
            >
              Apply Now
            </button>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-1 space-y-6">
            {/* Desktop Image */}
            {job.img?.length > 0 && (
              <div className="hidden lg:block">
                <img
                  src={job.img[currentIndex]}
                  alt={job.title}
                  className="w-full rounded-xl object-contain"
                />
              </div>
            )}

            {/* Sticky Form */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden lg:sticky lg:top-24">
              <iframe
                title="Application Form"
                src="https://docs.google.com/forms/d/e/1FAIpQLSdTQR9NJZMz3KYMwJSCow0EsGP8zUk_m79i4SqRzWVaHts6aA/viewform?embedded=true"
                className="w-full h-[1000px] md:h-[85vh]"
                frameBorder="0"
                loading="lazy"
              />
            </div>

            <p className="text-xs text-gray-300">
              If the form doesn’t load,
              <a
                className="text-[#ff0000] ml-1"
                href="https://docs.google.com/forms/d/e/1FAIpQLSdTQR9NJZMz3KYMwJSCow0EsGP8zUk_m79i4SqRzWVaHts6aA/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                open in new tab
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
