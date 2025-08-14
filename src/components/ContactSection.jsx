import React, { useState } from "react";

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
  const [submitStatus, setSubmitStatus] = useState('');

  // Replace these with your actual Google Form details
  const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSem38gCoLarmSS2YgVSnOjB1yP6fuK69E4q51Fu1zljWqbZkg/formResponse";
  const FORM_FIELDS = {
    name: "entry.1424283838",      // Replace with actual entry number
    company: "entry.1363722063",   // Replace with actual entry number
    role: "entry.1714688408",      // Replace with actual entry number
    email: "entry.745306089",     // Replace with actual entry number
    website: "entry.366478309",   // Replace with actual entry number
    message: "entry.1807216377"    // Replace with actual entry number
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Create form data for Google Forms
      const googleFormData = new FormData();
      googleFormData.append(FORM_FIELDS.name, formData.name);
      googleFormData.append(FORM_FIELDS.company, formData.company);
      googleFormData.append(FORM_FIELDS.role, formData.role);
      googleFormData.append(FORM_FIELDS.email, formData.email);
      googleFormData.append(FORM_FIELDS.website, formData.website);
      googleFormData.append(FORM_FIELDS.message, formData.message);

      // Submit to Google Forms
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body: googleFormData
      });

      setSubmitStatus('success');
      setFormData({ name: '', company: '', role: '', email: '', website: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-black text-white py-16 px-4 md:px-12 flex flex-col lg:flex-row gap-8 pb-20">
      {/* Left side */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
          Let's Build What Your <br />
          <span className="text-[#ff0000]">Market's Been Waiting For</span>
        </h2>

        {/* Form */}
        <div className="bg-[#110d0d] p-6 rounded-lg shadow-lg space-y-4">
          {submitStatus === 'success' && (
            <div className="bg-[#000] text-white p-3 rounded-md animate-pulse">
              Thank you !
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="bg-[#ff0000] text-white p-3 rounded-md">
              Please try again.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
              />
              <label
                htmlFor="name"
                className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
                peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
              >
                Name *
              </label>
            </div>

            {/* Company */}
            <div className="relative">
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
              />
              <label
                htmlFor="company"
                className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
                peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
              >
                Company *
              </label>
            </div>

            {/* Role */}
            <div className="relative">
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
              />
              <label
                htmlFor="role"
                className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
                peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
              >
                Role *
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
                peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
              >
                Email *
              </label>
            </div>
          </div>

          {/* Website */}
          <div className="relative">
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://"
              className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
            />
            <label
              htmlFor="website"
              className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
              peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
            >
              Website
            </label>
          </div>

          {/* Message */}
          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}              
              className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000] resize-none"
            ></textarea>
            <label
              htmlFor="message"
              className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
              peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
            >
              What challenge are you solving? 
            </label>
          </div>
          
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.name || !formData.email || !formData.company || !formData.role || !formData.message}
            className="w-full border border-white hover:border-[#ff0000] text-white hover:bg-[#ff0000] transition-all duration-300 font-medium py-3 px-3 rounded-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Sending...
              </>
            ) : (
              <>
                <i className="fas fa-envelope "></i>
                Submit
              </>
            )}
          </button>

          <div className="flex flex-col md:flex-row bg-black py-10 rounded-lg px-6 md:px-12 justify-center md:justify-between items-center text-center md:text-left mt-4 space-y-4 md:space-y-0">
            <p className="text-lg md:text-xl font-semibold text-white">
              Talk to a Growth Architect
            </p>
            <button
              onClick={() => {
                window.open(
                  "https://wa.me/916238422887?text=Hello, I would like to learn more.",
                  "_blank"
                );
              }}
              className="bg-[#ff0000] text-white px-4 py-2 rounded-md hover:scale-105 transition-transform duration-200 flex items-center justify-center w-full md:w-auto max-w-xs"
            >
              <i className="fas fa-calendar-alt p-2"></i>
              <span>Book a Call</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex items-center">
        <div className="bg-gradient-to-br from-black to-[#3f0000] p-6 rounded-lg shadow-lg w-full text-center flex flex-col justify-between">
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-black to-[#3f0000] w-10 h-10 flex items-center justify-center rounded-full mb-4">
              <i className="fas fa-rocket text-[#ff0000]"></i>
            </div>
            <p className="text-lg mb-6">
              “If acquisition has plateaued or you're ready to break through your next growth ceiling,
let’s discuss.”
            </p>
            <div className="flex justify-center gap-8 mb-4">
              <div>
                <p className="text-[#ff0000] text-xl font-semibold">50+</p>
                <p className="uppercase text-xs tracking-wide text-gray-400">
                  Growth Projects
                </p>
              </div>
              <div>
                <p className="text-[#ff0000] text-xl font-semibold">$2M+</p>
                <p className="uppercase text-xs tracking-wide text-gray-400">
                  Revenue Generated
                </p>
              </div>
            </div>
            <div className="border-t border-neutral-700 w-full mt-4 pt-4 flex justify-center gap-4 text-gray-400">
              <a 
                href="https://www.linkedin.com/company/socialbureau-in" 
                className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://twitter.com" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href="mailto:info@socialbureau.in" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
                <i className="fas fa-envelope"></i>
              </a>
              <a href="https://www.facebook.com/share/15yzVd5Qcw" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com/socialbureau.in?igsh=NW4yd2lldzRpNXdj" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
                <i className="fab fa-instagram"></i>
              </a>
            </div><br/>
            <p className="text-sm text-center text-gray-400">
              © 2025 SocialBureau. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}