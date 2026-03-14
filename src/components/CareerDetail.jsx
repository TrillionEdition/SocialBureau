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
                <PolicySection title="Work Timings">
                  <p><strong>9:30 AM - 6:30 PM (Sharp)</strong></p>
                  <p>Monday to Saturday. Punctuality is strictly monitored. Late arrivals result in a half-day mark.</p>
                </PolicySection>

                <PolicySection title="Dress Code">
                  <p>Black/White formal shirts, formal pants, and mandatory Blazers. ID cards must be worn at all times.</p>
                </PolicySection>

                <PolicySection title="Performance">
                  <p>Daily reporting on Zoho/ClickUp. Increments are strictly performance-based, not tenure-based.</p>
                </PolicySection>

                <PolicySection title="Leave Policy">
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
          <div className="xl:col-span-5 space-y-10">

            {/* Desktop Carousel */}
            {job.img?.length > 0 && (
              <div className="hidden lg:block rounded-3xl overflow-hidden shadow-2xl h-[470px] border-4 border-white">
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