import React, { useState } from "react";
import { Upload, Send, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/utils/urls";
import { toast } from "react-toastify";

const InternalApplicationForm = ({ jobId, jobTitle }) => {
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateEmail: "",
    candidatePhone: "",
    coverLetter: "",
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setResume(file);
    } else {
      toast.error("Please upload a PDF file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      toast.error("Please upload your resume");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("jobId", jobId);
    data.append("candidateName", formData.candidateName);
    data.append("candidateEmail", formData.candidateEmail);
    data.append("candidatePhone", formData.candidatePhone);
    data.append("coverLetter", formData.coverLetter);
    data.append("resume", resume);

    try {
      await axios.post(`${BASE_URL}/hr-applications/apply`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(err.response?.data?.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center space-y-6 animate-in fade-in zoom-in duration-500 border border-green-100">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="text-green-500 w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-gray-900">Application Received</h3>
        <p className="text-gray-500 leading-relaxed">
          Thank you for applying for the <span className="text-red-600 font-bold">{jobTitle}</span> role.
          Our talent acquisition team will review your profile and get back to you shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm font-bold text-red-600 hover:underline uppercase tracking-widest"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden ring-1 ring-black/5">
      <div className="bg-gray-50 px-8 py-6 border-b border-gray-100">
        <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          Apply for this Role
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
        </h3>
        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Direct application to SocialBureau</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
            <input
              type="text"
              name="candidateName"
              required
              value={formData.candidateName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full text-black bg-gray-50 border border-gray-100 rounded-xl px-5 py-3 text-sm outline-none focus:border-red-500/50 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <input
                type="email"
                name="candidateEmail"
                required
                value={formData.candidateEmail}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-gray-50 text-black border border-gray-100 rounded-xl px-5 py-3 text-sm outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
              <input
                type="tel"
                name="candidatePhone"
                required
                value={formData.candidatePhone}
                onChange={handleChange}
                placeholder="+91 ..."
                className="w-full bg-gray-50 text-black border border-gray-100 rounded-xl px-5 py-3 text-sm outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Cover Letter (Optional)</label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Tell us why you are a great fit..."
              className="w-full bg-gray-50 text-black border border-gray-100 rounded-xl px-5 py-3 text-sm outline-none focus:border-red-500/50 transition-colors h-28 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Resume (PDF Only)</label>
            <div className="relative group">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all ${resume ? "border-green-500/30 bg-green-50/50" : "border-gray-100 group-hover:border-red-500/30 group-hover:bg-red-50/30"
                }`}>
                {resume ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="text-green-600 w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-gray-900 truncate max-w-[150px]">{resume.name}</p>
                      <p className="text-[10px] text-gray-400">Click to change</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-300 mb-2 group-hover:text-red-400 transition-colors" />
                    <p className="text-xs font-medium text-gray-500">Drop your resume or click to upload</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl shadow-red-600/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Send size={16} />
              Submit Application
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InternalApplicationForm;
