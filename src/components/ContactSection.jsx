import React, { useState } from "react";
import Toast from "./Toast";
import Footer from "./Footer";

// Add styles for animation
const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.8) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  
  @keyframes popUp {
    0% { 
      transform: scale(0.6) translateY(10px); 
      opacity: 0; 
    }
    60% { 
      transform: scale(1.05); 
      opacity: 1; 
    }
    100% { 
      transform: scale(1); 
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }
  
  .animate-popUp {
    animation: popUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
`;

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

  // Replace these with your actual Google Form details
  const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSem38gCoLarmSS2YgVSnOjB1yP6fuK69E4q51Fu1zljWqbZkg/formResponse";
  const FORM_FIELDS = {
    name: "entry.1424283838",
    company: "entry.1363722063",
    role: "entry.1714688408",
    email: "entry.745306089",
    website: "entry.366478309",
    message: "entry.1807216377"
  };

  const handleChange = (e) => {
    setShowBubble(false); // hide bubble when user edits again
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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

      setShowBubble(true);
      console.log('Bubble should show now'); // Debug log
      setFormData({ name: '', company: '', role: '', email: '', website: '', message: '' });

      // Hide bubble after 5 seconds
      setTimeout(() => setShowBubble(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setToast({ type: 'error', message: 'Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <section className="bg-black text-white py-16 px-4 md:px-12 flex flex-col lg:flex-row gap-8 pb-20">
        {/* Left side */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
            Let's Build What Your <br />
            <span className="text-[#ff0000]">Market's Been Waiting For</span>
          </h2>

          {/* Form */}
          <div className="bg-[#101010ff] p-6 rounded-lg shadow-lg space-y-4">
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
              name="send"
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
                name="chat"
                onClick={() => {
                  window.open(
                    "https://wa.me/918714952665?text=Hello, I would like to learn more.",
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
        <div className="flex-1 flex items-center justify-center relative">
          <div className="bg-black p-6 rounded-lg w-full text-center relative">

            {/* Container for Image + Bubble */}
            <div className="relative inline-block overflow-visible">

              {/* 1. Character Image */}
              <img
                src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1763383653/oii_upmu8c.png"
                alt="Growth Architect"
                className="h-auto w-64 md:w-80 mx-auto"
              />

              {/* 2. THE COMMENT BUBBLE - Positioned specifically over the character */}
              {showBubble && (
                <div className="absolute -top-10 -right-4 md:-right-20 z-[100] animate-popUp">
                  <div className="relative bg-white text-black px-6 py-3 rounded-2xl shadow-[0_10px_30px_rgba(255,255,255,0.3)] border-2 border-[#ff0000]">
                    <p className="text-sm md:text-base font-bold whitespace-nowrap">
                      Got it! We'll contact you soon
                    </p>

                    {/* Bubble Tail pointing to the person */}
                    <div className="absolute -bottom-3 left-10 w-0 h-0 
              border-l-[10px] border-l-transparent 
              border-r-[10px] border-r-transparent 
              border-t-[15px] border-t-[#ff0000]">
                    </div>
                    {/* Inner tail to create the border effect */}
                    <div className="absolute -bottom-2 left-[41px] w-0 h-0 
              border-l-[9px] border-l-transparent 
              border-r-[9px] border-r-transparent 
              border-t-[13px] border-t-white">
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stats & Footer below */}
            <div className="mt-8 space-y-6">
              <div className="flex justify-center gap-8">
                <div>
                  <p className="text-[#ff0000] text-xl font-semibold">50+</p>
                  <p className="uppercase text-[10px] tracking-widest text-gray-400">Projects</p>
                </div>
                <div>
                  <p className="text-[#ff0000] text-xl font-semibold">$2M+</p>
                  <p className="uppercase text-[10px] tracking-widest text-gray-400">Revenue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
