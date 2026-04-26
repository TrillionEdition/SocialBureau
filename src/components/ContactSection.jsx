import React, { useState } from "react";
import Toast from "./Toast";
import Footer from "./Footer";

export default function ContactSection() {
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

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* NAME */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="peer w-full p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
              />

              <label className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black peer-focus:bg-white peer-focus:px-1
              peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-white peer-valid:px-1">
                Name *
              </label>
            </div>

            {/* COMPANY */}
            <div className="relative">
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="peer w-full p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
              />

              <label className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-white peer-focus:px-1
              peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-white peer-valid:px-1">
                Company *
              </label>
            </div>

            {/* ROLE */}
            <div className="relative">
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="peer w-full p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
              />

              <label className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-white peer-focus:px-1
              peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-white peer-valid:px-1">
                Role *
              </label>
            </div>

            {/* EMAIL */}
            <div className="relative">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="peer w-full p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
              />

              <label className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-white peer-focus:px-1
              peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-white peer-valid:px-1">
                Email *
              </label>
            </div>

          </div>

            {/* WEBSITE */}
          <div className="relative">
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                required
                className="peer w-full p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
              />

              <label className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-white peer-focus:px-1
              peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-white peer-valid:px-1">
                Website *
              </label>
            </div>

          {/* MESSAGE */}
          <div className="relative">
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="peer w-full p-3 pt-6 rounded resize-none placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
            />

            <label className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-white peer-focus:px-1
              peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-white peer-valid:px-1">
              Message *
            </label>
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              !formData.name ||
              !formData.email ||
              !formData.company ||
              !formData.role ||
              !formData.message
            }
            className="w-full border border-white text-white bg-[#ff0000] transition-all duration-300 font-medium py-3 rounded-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
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
