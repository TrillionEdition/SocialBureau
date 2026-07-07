import React, { useState } from "react";
import Toast from "./Toast";
import Footer from "./Footer";
import { Calendar, User, Mail, Sparkles, Clock, Check, AlertCircle, ArrowRight, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactSection() {
  const [activeTab, setActiveTab] = useState("meeting"); // "message" | "meeting"
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    email: '',
    website: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [showBubble, setShowBubble] = useState(false);

  // Meeting states
  const [meetingService, setMeetingService] = useState("Social Media Marketing");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingLoading, setMeetingLoading] = useState(false);
  const [meetingError, setMeetingError] = useState("");
  const [meetingSuccess, setMeetingSuccess] = useState(null);

  const GOOGLE_FORM_ACTION =
    "https://docs.google.com/forms/d/e/1FAIpQLSem38gCoLarmSS2YgVSnOjB1yP6fuK69E4q51Fu1zljWqbZkg/formResponse";

  const FORM_FIELDS = {
    name: "entry.1424283838",
    company: "entry.1363722063",
    role: "entry.1714688408",
    email: "entry.745306089",
    website: "entry.366478309",
    message: "entry.1807216377"
  };

  const services = [
    { id: "SMM", name: "Social Media Marketing", desc: "Growth, organic outreach, and brand positioning." },
    { id: "WebDev", name: "Web Development", desc: "Next-gen frontends, portals, and robust architectures." },
    { id: "SEO", name: "SEO & Paid Ads", desc: "Traffic acquisition, optimization, and scaling KPIs." },
    { id: "Other", name: "Other Consultation", desc: "Custom systems, automation, and tech integration." }
  ];

  const handleChange = (e) => {
    setShowBubble(false);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const googleFormData = new FormData();

      googleFormData.append(FORM_FIELDS.name, formData.name);
      googleFormData.append(FORM_FIELDS.company, formData.company);
      googleFormData.append(FORM_FIELDS.role, formData.role);
      googleFormData.append(FORM_FIELDS.email, formData.email);
      googleFormData.append(FORM_FIELDS.website, formData.website);
      googleFormData.append(FORM_FIELDS.message, formData.message);

      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: googleFormData
      });

      setShowBubble(true);

      setFormData({
        name: "",
        company: "",
        role: "",
        email: "",
        website: "",
        message: ""
      });

      setTimeout(() => setShowBubble(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setToast({ type: "error", message: "Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMeetingSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !meetingDate) {
      setMeetingError("Please fill out all required fields.");
      return;
    }

    const selectedDateTime = new Date(meetingDate);
    if (selectedDateTime.getTime() <= Date.now()) {
      setMeetingError("Please select a date and time in the future.");
      return;
    }

    setMeetingLoading(true);
    setMeetingError("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/partners/schedule-meeting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userName: formData.name,
          userEmail: formData.email,
          selectedService: meetingService,
          userDate: selectedDateTime.toISOString(),
          partnerEmail: "team@socialbureau.in",
          partnerName: "SocialBureau Team"
        })
      });

      const data = await response.json();

      if (data.alreadyScheduled) {
        setMeetingSuccess({
          alreadyScheduled: true,
          userDate: data.data.userDate,
          selectedService: data.data.selectedService,
          gmeetLink: data.data.gmeetLink
        });
      } else if (response.ok && data.success) {
        setMeetingSuccess({
          alreadyScheduled: false,
          userDate: meetingDate,
          selectedService: meetingService,
          gmeetLink: data.gmeetLink
        });
      } else {
        setMeetingError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error booking session:", err);
      setMeetingError("Network error. Please check your connection and try again.");
    } finally {
      setMeetingLoading(false);
    }
  };

  return (
    <section className="bg-white text-black py-16 px-4 md:px-12 flex flex-col lg:flex-row gap-8 pb-20">

      {/* LEFT */}
      <div className="flex-1 flex flex-col gap-6">

        <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
          Let's Build What Your <br />
          <span className="text-[#ff0000]">
            Market's Been Waiting For
          </span>
        </h2>

        <div className="bg-[#ffffffc1] p-6 rounded-lg shadow-lg space-y-4">
          <AnimatePresence mode="wait">
            {activeTab === "meeting" && meetingSuccess ? (
              <motion.div
                key="meeting-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="text-center py-6 select-none"
              >
                <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(34,197,94,0.1)] animate-bounce">
                  <Check className="w-8 h-8 text-green-600" />
                </div>

                {meetingSuccess.alreadyScheduled ? (
                  <>
                    <h3 className="text-xl font-bold uppercase tracking-wider text-black mb-2">
                      Already Scheduled!
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium uppercase tracking-widest max-w-sm mx-auto mb-6">
                      You already registered a meeting with <span className="text-black font-bold">SocialBureau Team</span> in the last 24 hours.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold uppercase tracking-wider text-black mb-2">
                      Session Registered!
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium uppercase tracking-widest max-w-sm mx-auto mb-6">
                      Your session with <span className="text-black font-bold">SocialBureau Team</span> has been successfully locked in. Check your inbox for a calendar invite!
                    </p>
                  </>
                )}

                {/* Details Card */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-6 text-left max-w-md mx-auto relative overflow-hidden">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-purple-600 shrink-0" />
                      <div>
                        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Scheduled Time</div>
                        <div className="text-xs font-semibold text-black mt-0.5">
                          {new Date(meetingSuccess.userDate).toLocaleString()} (IST)
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-[#ff0000] shrink-0" />
                      <div>
                        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Selected Focus Area</div>
                        <div className="text-xs font-semibold text-black mt-0.5">
                          {meetingSuccess.selectedService}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notification Banner / Direct Action */}
                {meetingSuccess.gmeetLink ? (
                  <div className="max-w-md mx-auto mb-6 flex flex-col gap-2">
                    <a
                      href={meetingSuccess.gmeetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/10 no-underline cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 animate-pulse text-white" /> Join Session Now
                    </a>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                      You can join the room early or at the scheduled time!
                    </p>
                  </div>
                ) : (
                  <div className="max-w-md mx-auto p-3 rounded-xl bg-yellow-50 border border-yellow-100 text-yellow-700 font-semibold tracking-wider text-[10px] uppercase leading-relaxed mb-6 flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 shrink-0" />
                    The Google Meet link will be sent to your email 10 minutes before the session starts.
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setMeetingSuccess(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                >
                  Book Another Session
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="meeting-form"
                onSubmit={handleMeetingSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {meetingError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-100 flex items-start gap-2 text-red-600 text-xs font-semibold uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{meetingError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* NAME */}
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="peer w-full p-3 pt-6 rounded border border-gray-200 focus:border-[#ff0000] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]/10 bg-gray-50"
                    />

                    <label className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200 pointer-events-none
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black peer-focus:bg-white peer-focus:px-1
                    peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-white peer-valid:px-1">
                      Name *
                    </label>
                  </div>

                  {/* EMAIL */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="peer w-full p-3 pt-6 rounded border border-gray-200 focus:border-[#ff0000] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]/10 bg-gray-50"
                    />

                    <label className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200 pointer-events-none
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black peer-focus:bg-white peer-focus:px-1
                    peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-white peer-valid:px-1">
                      Email *
                    </label>
                  </div>
                </div>

                {/* Service Cards */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#ff0000]" /> Select Focus Area
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {services.map((service) => {
                      const isSelected = meetingService === service.name;
                      return (
                        <div
                          key={service.id}
                          onClick={() => setMeetingService(service.name)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer select-none flex flex-col gap-1 ${
                            isSelected
                              ? "bg-red-50 border-[#ff0000] shadow-[0_0_15px_rgba(255,0,0,0.05)]"
                              : "bg-gray-50 border-gray-100 hover:border-gray-200 hover:bg-gray-100/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? "text-[#ff0000]" : "text-gray-800"}`}>
                              {service.name}
                            </span>
                            {isSelected && (
                              <div className="w-3.5 h-3.5 rounded-full bg-[#ff0000] flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <span className="text-[9px] text-gray-500 font-medium leading-relaxed mt-0.5">
                            {service.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Date & Time Select */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-600" /> Preferred Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-purple-500/50 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition-all focus:shadow-[0_0_15px_rgba(168,85,247,0.05)]"
                  />
                </div>

                {/* SUBMIT MEETING */}
                <button
                  type="submit"
                  disabled={meetingLoading || !formData.name || !formData.email || !meetingDate}
                  className="w-full border border-[#ff0000] text-white bg-[#ff0000] transition-all duration-300 font-medium py-3 rounded-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  {meetingLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    <>
                      Schedule Session <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-center relative">

        <div className="relative inline-block">

          <img
            src="https://www.socialbureau.in/assets/socialbureau.png"
            alt="Growth Architect"
            className="h-auto w-64 md:w-80 mx-auto"
          />

          {/* BUBBLE */}
          {showBubble && (
            <div className="absolute -top-10 -right-4 md:-right-20 z-[100] animate-[popUp_0.5s_cubic-bezier(0.34,1.56,0.64,1)]">
              <div className="relative bg-white text-black px-6 py-3 rounded-2xl shadow-[0_10px_30px_rgba(255,255,255,0.3)] border-2 border-[#ff0000]">
                <p className="text-sm md:text-base font-bold whitespace-nowrap">
                  Got it! We'll contact you soon
                </p>

                <div className="absolute -bottom-3 left-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px] border-t-[#ff0000]" />

                <div className="absolute -bottom-2 left-[41px] w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[13px] border-t-white" />
              </div>
            </div>
          )}

        </div>
      </div>

    </section>
  );
}
