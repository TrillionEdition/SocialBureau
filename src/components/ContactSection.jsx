<<<<<<< HEAD
=======
// // // // // import React, { useState } from "react";
// // // // // import Toast from "./Toast";

// // // // // export default function ContactSection() {
// // // // //   const [formData, setFormData] = useState({
// // // // //     name: '',
// // // // //     company: '',
// // // // //     role: '',
// // // // //     email: '',
// // // // //     website: '',
// // // // //     message: ''
// // // // //   });
// // // // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // // // //   const [submitStatus, setSubmitStatus] = useState('');

// // // // //   // Replace these with your actual Google Form details
// // // // //   const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSem38gCoLarmSS2YgVSnOjB1yP6fuK69E4q51Fu1zljWqbZkg/formResponse";
// // // // //   const FORM_FIELDS = {
// // // // //     name: "entry.1424283838",      // Replace with actual entry number
// // // // //     company: "entry.1363722063",   // Replace with actual entry number
// // // // //     role: "entry.1714688408",      // Replace with actual entry number
// // // // //     email: "entry.745306089",     // Replace with actual entry number
// // // // //     website: "entry.366478309",   // Replace with actual entry number
// // // // //     message: "entry.1807216377"    // Replace with actual entry number
// // // // //   };

// // // // //   const handleChange = (e) => {
// // // // //     setFormData({
// // // // //       ...formData,
// // // // //       [e.target.name]: e.target.value
// // // // //     });
// // // // //   };

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();
// // // // //     setIsSubmitting(true);
// // // // //     setSubmitStatus('');

// // // // //     try {
// // // // //       // Create form data for Google Forms
// // // // //       const googleFormData = new FormData();
// // // // //       googleFormData.append(FORM_FIELDS.name, formData.name);
// // // // //       googleFormData.append(FORM_FIELDS.company, formData.company);
// // // // //       googleFormData.append(FORM_FIELDS.role, formData.role);
// // // // //       googleFormData.append(FORM_FIELDS.email, formData.email);
// // // // //       googleFormData.append(FORM_FIELDS.website, formData.website);
// // // // //       googleFormData.append(FORM_FIELDS.message, formData.message);

// // // // //       // Submit to Google Forms
// // // // //       await fetch(GOOGLE_FORM_ACTION, {
// // // // //         method: 'POST',
// // // // //         mode: 'no-cors',
// // // // //         body: googleFormData
// // // // //       });

// // // // //       setSubmitStatus('success');
// // // // //       setFormData({ name: '', company: '', role: '', email: '', website: '', message: '' });
// // // // //     } catch (error) {
// // // // //       console.error('Error submitting form:', error);
// // // // //       setSubmitStatus('error');
// // // // //     } finally {
// // // // //       setIsSubmitting(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <section className="bg-black text-white py-16 px-4 md:px-12 flex flex-col lg:flex-row gap-8 pb-20">
// // // // //       {/* Left side */}
// // // // //       <div className="flex-1 flex flex-col gap-6">
// // // // //         {/* Headline */}
// // // // //         <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
// // // // //           Let's Build What Your <br />
// // // // //           <span className="text-[#ff0000]">Market's Been Waiting For</span>
// // // // //         </h2>

// // // // //         {/* Form */}
// // // // //         <div className="bg-[#101010ff] p-6 rounded-lg shadow-lg space-y-4">
// // // // //           {submitStatus === 'success' && (
// // // // //             Toast.success("Thank you!")
// // // // //           )}
// // // // //           {submitStatus === 'error' && (
// // // // //             Toast.error("Please try again.")
// // // // //           )}

// // // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //             {/* Name */}
// // // // //             <div className="relative">
// // // // //               <input
// // // // //                 type="text"
// // // // //                 id="name"
// // // // //                 name="name"
// // // // //                 value={formData.name}
// // // // //                 onChange={handleChange}
// // // // //                 required
// // // // //                 className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// // // // //               />
// // // // //               <label
// // // // //                 htmlFor="name"
// // // // //                 className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// // // // //                 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// // // // //                 peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// // // // //               >
// // // // //                 Name *
// // // // //               </label>
// // // // //             </div>

// // // // //             {/* Company */}
// // // // //             <div className="relative">
// // // // //               <input
// // // // //                 type="text"
// // // // //                 id="company"
// // // // //                 name="company"
// // // // //                 value={formData.company}
// // // // //                 onChange={handleChange}
// // // // //                 required
// // // // //                 className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// // // // //               />
// // // // //               <label
// // // // //                 htmlFor="company"
// // // // //                 className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// // // // //                 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// // // // //                 peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// // // // //               >
// // // // //                 Company *
// // // // //               </label>
// // // // //             </div>

// // // // //             {/* Role */}
// // // // //             <div className="relative">
// // // // //               <input
// // // // //                 type="text"
// // // // //                 id="role"
// // // // //                 name="role"
// // // // //                 value={formData.role}
// // // // //                 onChange={handleChange}
// // // // //                 required
// // // // //                 className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// // // // //               />
// // // // //               <label
// // // // //                 htmlFor="role"
// // // // //                 className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// // // // //                 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// // // // //                 peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// // // // //               >
// // // // //                 Role *
// // // // //               </label>
// // // // //             </div>

// // // // //             {/* Email */}
// // // // //             <div className="relative">
// // // // //               <input
// // // // //                 type="text"
// // // // //                 id="email"
// // // // //                 name="email"
// // // // //                 value={formData.email}
// // // // //                 onChange={handleChange}
// // // // //                 required
// // // // //                 className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// // // // //               />
// // // // //               <label
// // // // //                 htmlFor="email"
// // // // //                 className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// // // // //                 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// // // // //                 peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// // // // //               >
// // // // //                 Email *
// // // // //               </label>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Website */}
// // // // //           <div className="relative">
// // // // //             <input
// // // // //               type="url"
// // // // //               id="website"
// // // // //               name="website"
// // // // //               value={formData.website}
// // // // //               onChange={handleChange}
// // // // //               placeholder="https://"
// // // // //               className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// // // // //             />
// // // // //             <label
// // // // //               htmlFor="website"
// // // // //               className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// // // // //               peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// // // // //               peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// // // // //             >
// // // // //               Website
// // // // //             </label>
// // // // //           </div>

// // // // //           {/* Message */}
// // // // //           <div className="relative">
// // // // //             <textarea
// // // // //               id="message"
// // // // //               name="message"
// // // // //               rows={4}
// // // // //               value={formData.message}
// // // // //               onChange={handleChange}
// // // // //               className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000] resize-none"
// // // // //             ></textarea>
// // // // //             <label
// // // // //               htmlFor="message"
// // // // //               className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// // // // //               peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// // // // //               peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// // // // //             >
// // // // //               What challenge are you solving?
// // // // //             </label>
// // // // //           </div>

// // // // //           <button name="send"
// // // // //             onClick={handleSubmit}
// // // // //             disabled={isSubmitting || !formData.name || !formData.email || !formData.company || !formData.role || !formData.message}
// // // // //             className="w-full border border-white hover:border-[#ff0000] text-white hover:bg-[#ff0000] transition-all duration-300 font-medium py-3 px-3 rounded-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
// // // // //           >
// // // // //             {isSubmitting ? (
// // // // //               <>
// // // // //                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
// // // // //                 Sending...
// // // // //               </>
// // // // //             ) : (
// // // // //               <>
// // // // //                 <i className="fas fa-envelope "></i>
// // // // //                 Submit
// // // // //               </>
// // // // //             )}
// // // // //           </button>

// // // // //           <div className="flex flex-col md:flex-row bg-black py-10 rounded-lg px-6 md:px-12 justify-center md:justify-between items-center text-center md:text-left mt-4 space-y-4 md:space-y-0">
// // // // //             <p className="text-lg md:text-xl font-semibold text-white">
// // // // //               Talk to a Growth Architect
// // // // //             </p>
// // // // //             <button name="chat"
// // // // //               onClick={() => {
// // // // //                 window.open(
// // // // //                   "https://wa.me/918921840486?text=Hello, I would like to learn more.",
// // // // //                   "_blank"
// // // // //                 );
// // // // //               }}
// // // // //               className="bg-[#ff0000] text-white px-4 py-2 rounded-md hover:scale-105 transition-transform duration-200 flex items-center justify-center w-full md:w-auto max-w-xs"
// // // // //             >
// // // // //               <i className="fas fa-calendar-alt p-2"></i>
// // // // //               <span>Book a Call</span>
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Right side */}
// // // // //       <div className="flex-1 flex items-center">
// // // // //         <div className="bg-black p-6 rounded-lg shadow-lg w-full text-center flex flex-col justify-between">
// // // // //           <div className="flex flex-col items-center">
// // // // //             <img src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1763383653/oii_upmu8c.png" alt="image" className=" h-auto min-w-150 md:w-auto " />
// // // // //             <div className="bg-gradient-to-br from-black to-[#3f0000] w-10 h-10 flex items-center justify-center rounded-full mb-4">
// // // // //               <i className="fas fa-rocket text-[#ff0000]"></i>
// // // // //             </div>
// // // // //             <p className="text-lg mb-6">
// // // // //               “If acquisition has plateaued or you're ready to break through your next growth ceiling,
// // // // //               let’s discuss.”
// // // // //             </p>
// // // // //             <div className="flex justify-center gap-8 mb-4">
// // // // //               <div>
// // // // //                 <p className="text-[#ff0000] text-xl font-semibold">50+</p>
// // // // //                 <p className="uppercase text-xs tracking-wide text-gray-400">
// // // // //                   Growth Projects
// // // // //                 </p>
// // // // //               </div>
// // // // //               <div>
// // // // //                 <p className="text-[#ff0000] text-xl font-semibold">$2M+</p>
// // // // //                 <p className="uppercase text-xs tracking-wide text-gray-400">
// // // // //                   Revenue Generated
// // // // //                 </p>
// // // // //               </div>
// // // // //             </div>
// // // // //             <div className="border-t border-neutral-700 w-full mt-4 pt-4 flex justify-center gap-4 text-gray-400">
// // // // //               <a
// // // // //                 href="https://www.linkedin.com/company/socialbureau-in"
// // // // //                 className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200"
// // // // //               >
// // // // //                 <i className="fab fa-linkedin"></i>
// // // // //               </a>
// // // // //               <a href="https://twitter.com" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
// // // // //                 <i className="fab fa-x-twitter"></i>
// // // // //               </a>
// // // // //               <a href="mailto:info@socialbureau.in" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
// // // // //                 <i className="fas fa-envelope"></i>
// // // // //               </a>
// // // // //               <a href="https://www.facebook.com/share/15yzVd5Qcw" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
// // // // //                 <i className="fab fa-facebook"></i>
// // // // //               </a>
// // // // //               <a href="https://www.instagram.com/socialbureau.in?igsh=NW4yd2lldzRpNXdj" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
// // // // //                 <i className="fab fa-instagram"></i>
// // // // //               </a>
// // // // //             </div><br />
// // // // //             <p className="text-sm text-center text-gray-400">
// // // // //               © 2025 <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
// // // // //                 Social<span className="text-[#ff0000]">B</span>ureau
// // // // //               </a>. All rights reserved.
// // // // //             </p>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </section>
// // // // //   );
// // // // // }




// // // // import React, { useState } from "react";
// // // // import Toast from "./Toast";

// // // // export default function ContactSection() {
// // // //   const [formData, setFormData] = useState({
// // // //     name: '',
// // // //     company: '',
// // // //     role: '',
// // // //     email: '',
// // // //     website: '',
// // // //     message: ''
// // // //   });
// // // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // // //   const [toast, setToast] = useState(null);

// // // //   // Replace these with your actual Google Form details
// // // //   const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSem38gCoLarmSS2YgVSnOjB1yP6fuK69E4q51Fu1zljWqbZkg/formResponse";
// // // //   const FORM_FIELDS = {
// // // //     name: "entry.1424283838",
// // // //     company: "entry.1363722063",
// // // //     role: "entry.1714688408",
// // // //     email: "entry.745306089",
// // // //     website: "entry.366478309",
// // // //     message: "entry.1807216377"
// // // //   };

// // // //   const handleChange = (e) => {
// // // //     setFormData({
// // // //       ...formData,
// // // //       [e.target.name]: e.target.value
// // // //     });
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     setIsSubmitting(true);

// // // //     try {
// // // //       // Create form data for Google Forms
// // // //       const googleFormData = new FormData();
// // // //       googleFormData.append(FORM_FIELDS.name, formData.name);
// // // //       googleFormData.append(FORM_FIELDS.company, formData.company);
// // // //       googleFormData.append(FORM_FIELDS.role, formData.role);
// // // //       googleFormData.append(FORM_FIELDS.email, formData.email);
// // // //       googleFormData.append(FORM_FIELDS.website, formData.website);
// // // //       googleFormData.append(FORM_FIELDS.message, formData.message);

// // // //       // Submit to Google Forms
// // // //       await fetch(GOOGLE_FORM_ACTION, {
// // // //         method: 'POST',
// // // //         mode: 'no-cors',
// // // //         body: googleFormData
// // // //       });

// // // //       setToast({ type: 'success', message: 'Thank you! We\'ll be in touch soon.' });
// // // //       setFormData({ name: '', company: '', role: '', email: '', website: '', message: '' });
// // // //     } catch (error) {
// // // //       console.error('Error submitting form:', error);
// // // //       setToast({ type: 'error', message: 'Please try again.' });
// // // //     } finally {
// // // //       setIsSubmitting(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <>
// // // //       {/* Toast Notification */}
// // // //       {toast && (
// // // //         <Toast
// // // //           type={toast.type}
// // // //           message={toast.message}
// // // //           onClose={() => setToast(null)}
// // // //         />
// // // //       )}

// // // //       <section className="bg-black text-white py-16 px-4 md:px-12 flex flex-col lg:flex-row gap-8 pb-20">
// // // //         {/* Left side */}
// // // //         <div className="flex-1 flex flex-col gap-6">
// // // //           {/* Headline */}
// // // //           <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
// // // //             Let's Build What Your <br />
// // // //             <span className="text-[#ff0000]">Market's Been Waiting For</span>
// // // //           </h2>

// // // //           {/* Form */}
// // // //           <div className="bg-[#101010ff] p-6 rounded-lg shadow-lg space-y-4">
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //               {/* Name */}
// // // //               <div className="relative">
// // // //                 <input
// // // //                   type="text"
// // // //                   id="name"
// // // //                   name="name"
// // // //                   value={formData.name}
// // // //                   onChange={handleChange}
// // // //                   required
// // // //                   className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// // // //                 />
// // // //                 <label
// // // //                   htmlFor="name"
// // // //                   className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// // // //                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// // // //                   peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// // // //                 >
// // // //                   Name *
// // // //                 </label>
// // // //               </div>

// // // //               {/* Company */}
// // // //               <div className="relative">
// // // //                 <input
// // // //                   type="text"
// // // //                   id="company"
// // // //                   name="company"
// // // //                   value={formData.company}
// // // //                   onChange={handleChange}
// // // //                   required
// // // //                   className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// // // //                 />
// // // //                 <label
// // // //                   htmlFor="company"
// // // //                   className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// // // //                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// // // //                   peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// // // //                 >
// // // //                   Company *
// // // //                 </label>
// // // //               </div>

// // // //               {/* Role */}
// // // //               <div className="relative">
// // // //                 <input
// // // //                   type="text"
// // // //                   id="role"
// // // //                   name="role"
// // // //                   value={formData.role}
// // // //                   onChange={handleChange}
// // // //                   required
// // // //                   className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// // // //                 />
// // // //                 <label
// // // //                   htmlFor="role"
// // // //                   className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// // // //                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// // // //                   peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// // // //                 >
// // // //                   Role *
// // // //                 </label>
// // // //               </div>

// // // //               {/* Email */}
// // // //               <div className="relative">
// // // //                 <input
// // // //                   type="text"
// // // //                   id="email"
// // // //                   name="email"
// // // //                   value={formData.email}
// // // //                   onChange={handleChange}
// // // //                   required
// // // //                   className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// // // //                 />
// // // //                 <label
// // // //                   htmlFor="email"
// // // //                   className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// // // //                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// // // //                   peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// // // //                 >
// // // //                   Email *
// // // //                 </label>
// // // //               </div>
// // // //             </div>

// // // //             {/* Website */}
// // // //             <div className="relative">
// // // //               <input
// // // //                 type="url"
// // // //                 id="website"
// // // //                 name="website"
// // // //                 value={formData.website}
// // // //                 onChange={handleChange}
// // // //                 placeholder="https://"
// // // //                 className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// // // //               />
// // // //               <label
// // // //                 htmlFor="website"
// // // //                 className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// // // //                 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// // // //                 peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// // // //               >
// // // //                 Website
// // // //               </label>
// // // //             </div>

// // // //             {/* Message */}
// // // //             <div className="relative">
// // // //               <textarea
// // // //                 id="message"
// // // //                 name="message"
// // // //                 rows={4}
// // // //                 value={formData.message}
// // // //                 onChange={handleChange}
// // // //                 className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000] resize-none"
// // // //               ></textarea>
// // // //               <label
// // // //                 htmlFor="message"
// // // //                 className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// // // //                 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// // // //                 peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// // // //               >
// // // //                 What challenge are you solving?
// // // //               </label>
// // // //             </div>

// // // //             <button
// // // //               name="send"
// // // //               onClick={handleSubmit}
// // // //               disabled={isSubmitting || !formData.name || !formData.email || !formData.company || !formData.role || !formData.message}
// // // //               className="w-full border border-white hover:border-[#ff0000] text-white hover:bg-[#ff0000] transition-all duration-300 font-medium py-3 px-3 rounded-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
// // // //             >
// // // //               {isSubmitting ? (
// // // //                 <>
// // // //                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
// // // //                   Sending...
// // // //                 </>
// // // //               ) : (
// // // //                 <>
// // // //                   <i className="fas fa-envelope "></i>
// // // //                   Submit
// // // //                 </>
// // // //               )}
// // // //             </button>

// // // //             <div className="flex flex-col md:flex-row bg-black py-10 rounded-lg px-6 md:px-12 justify-center md:justify-between items-center text-center md:text-left mt-4 space-y-4 md:space-y-0">
// // // //               <p className="text-lg md:text-xl font-semibold text-white">
// // // //                 Talk to a Growth Architect
// // // //               </p>
// // // //               <button
// // // //                 name="chat"
// // // //                 onClick={() => {
// // // //                   window.open(
// // // //                     "https://wa.me/918921840486?text=Hello, I would like to learn more.",
// // // //                     "_blank"
// // // //                   );
// // // //                 }}
// // // //                 className="bg-[#ff0000] text-white px-4 py-2 rounded-md hover:scale-105 transition-transform duration-200 flex items-center justify-center w-full md:w-auto max-w-xs"
// // // //               >
// // // //                 <i className="fas fa-calendar-alt p-2"></i>
// // // //                 <span>Book a Call</span>
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Right side */}
// // // //         <div className="flex-1 flex items-center">
// // // //           <div className="bg-black p-6 rounded-lg shadow-lg w-full text-center flex flex-col justify-between">
// // // //             <div className="flex flex-col items-center">
// // // //               <img src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1763383653/oii_upmu8c.png" alt="image" className=" h-auto min-w-150 md:w-auto " />
// // // //               <div className="bg-gradient-to-br from-black to-[#3f0000] w-10 h-10 flex items-center justify-center rounded-full mb-4">
// // // //                 <i className="fas fa-rocket text-[#ff0000]"></i>
// // // //               </div>
// // // //               <p className="text-lg mb-6">
// // // //                 "If acquisition has plateaued or you're ready to break through your next growth ceiling,
// // // //                 let's discuss."
// // // //               </p>
// // // //               <div className="flex justify-center gap-8 mb-4">
// // // //                 <div>
// // // //                   <p className="text-[#ff0000] text-xl font-semibold">50+</p>
// // // //                   <p className="uppercase text-xs tracking-wide text-gray-400">
// // // //                     Growth Projects
// // // //                   </p>
// // // //                 </div>
// // // //                 <div>
// // // //                   <p className="text-[#ff0000] text-xl font-semibold">$2M+</p>
// // // //                   <p className="uppercase text-xs tracking-wide text-gray-400">
// // // //                     Revenue Generated
// // // //                   </p>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="border-t border-neutral-700 w-full mt-4 pt-4 flex justify-center gap-4 text-gray-400">
// // // //                 <a
// // // //                   href="https://www.linkedin.com/company/socialbureau-in"
// // // //                   className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200"
// // // //                 >
// // // //                   <i className="fab fa-linkedin"></i>
// // // //                 </a>
// // // //                 <a href="https://twitter.com" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
// // // //                   <i className="fab fa-x-twitter"></i>
// // // //                 </a>
// // // //                 <a href="mailto:info@socialbureau.in" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
// // // //                   <i className="fas fa-envelope"></i>
// // // //                 </a>
// // // //                 <a href="https://www.facebook.com/share/15yzVd5Qcw" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
// // // //                   <i className="fab fa-facebook"></i>
// // // //                 </a>
// // // //                 <a href="https://www.instagram.com/socialbureau.in?igsh=NW4yd2lldzRpNXdj" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
// // // //                   <i className="fab fa-instagram"></i>
// // // //                 </a>
// // // //               </div><br />
// // // //               <p className="text-sm text-center text-gray-400">
// // // //                 © 2025 <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
// // // //                   Social<span className="text-[#ff0000]">B</span>ureau
// // // //                 </a>. All rights reserved.
// // // //               </p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </section>
// // // //     </>
// // // //   );
// // // // }



// // // import React, { useState } from "react";
// // // import Toast from "./Toast";

// // // export default function ContactSection() {
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     company: '',
// // //     role: '',
// // //     email: '',
// // //     website: '',
// // //     message: ''
// // //   });
// // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // //   const [toast, setToast] = useState(null);

// // //   // Replace these with your actual Google Form details
// // //   const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSem38gCoLarmSS2YgVSnOjB1yP6fuK69E4q51Fu1zljWqbZkg/formResponse";
// // //   const FORM_FIELDS = {
// // //     name: "entry.1424283838",
// // //     company: "entry.1363722063",
// // //     role: "entry.1714688408",
// // //     email: "entry.745306089",
// // //     website: "entry.366478309",
// // //     message: "entry.1807216377"
// // //   };

// // //   const handleChange = (e) => {
// // //     setFormData({
// // //       ...formData,
// // //       [e.target.name]: e.target.value
// // //     });
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setIsSubmitting(true);

// // //     try {
// // //       // Create form data for Google Forms
// // //       const googleFormData = new FormData();
// // //       googleFormData.append(FORM_FIELDS.name, formData.name);
// // //       googleFormData.append(FORM_FIELDS.company, formData.company);
// // //       googleFormData.append(FORM_FIELDS.role, formData.role);
// // //       googleFormData.append(FORM_FIELDS.email, formData.email);
// // //       googleFormData.append(FORM_FIELDS.website, formData.website);
// // //       googleFormData.append(FORM_FIELDS.message, formData.message);

// // //       // Submit to Google Forms
// // //       await fetch(GOOGLE_FORM_ACTION, {
// // //         method: 'POST',
// // //         mode: 'no-cors',
// // //         body: googleFormData
// // //       });

// // //       setToast({ type: 'success', message: 'Thank you! We\'ll be in touch soon.' });
// // //       setFormData({ name: '', company: '', role: '', email: '', website: '', message: '' });
// // //     } catch (error) {
// // //       console.error('Error submitting form:', error);
// // //       setToast({ type: 'error', message: 'Please try again.' });
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       {/* Toast Notification */}
// // //       {toast && (
// // //         <Toast
// // //           type={toast.type}
// // //           message={toast.message}
// // //           onClose={() => setToast(null)}
// // //         />
// // //       )}

// // //       <section className="bg-black text-white py-16 px-4 md:px-12 flex flex-col lg:flex-row gap-8 pb-20">
// // //         {/* Left side */}
// // //         <div className="flex-1 flex flex-col gap-6">
// // //           {/* Headline */}
// // //           <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
// // //             Let's Build What Your <br />
// // //             <span className="text-[#ff0000]">Market's Been Waiting For</span>
// // //           </h2>

// // //           {/* Form */}
// // //           <div className="bg-[#101010ff] p-6 rounded-lg shadow-lg space-y-4">
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //               {/* Name */}
// // //               <div className="relative">
// // //                 <input
// // //                   type="text"
// // //                   id="name"
// // //                   name="name"
// // //                   value={formData.name}
// // //                   onChange={handleChange}
// // //                   required
// // //                   className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// // //                 />
// // //                 <label
// // //                   htmlFor="name"
// // //                   className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// // //                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// // //                   peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// // //                 >
// // //                   Name *
// // //                 </label>
// // //               </div>

// // //               {/* Company */}
// // //               <div className="relative">
// // //                 <input
// // //                   type="text"
// // //                   id="company"
// // //                   name="company"
// // //                   value={formData.company}
// // //                   onChange={handleChange}
// // //                   required
// // //                   className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// // //                 />
// // //                 <label
// // //                   htmlFor="company"
// // //                   className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// // //                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// // //                   peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// // //                 >
// // //                   Company *
// // //                 </label>
// // //               </div>

// // //               {/* Role */}
// // //               <div className="relative">
// // //                 <input
// // //                   type="text"
// // //                   id="role"
// // //                   name="role"
// // //                   value={formData.role}
// // //                   onChange={handleChange}
// // //                   required
// // //                   className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// // //                 />
// // //                 <label
// // //                   htmlFor="role"
// // //                   className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// // //                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// // //                   peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// // //                 >
// // //                   Role *
// // //                 </label>
// // //               </div>

// // //               {/* Email */}
// // //               <div className="relative">
// // //                 <input
// // //                   type="text"
// // //                   id="email"
// // //                   name="email"
// // //                   value={formData.email}
// // //                   onChange={handleChange}
// // //                   required
// // //                   className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// // //                 />
// // //                 <label
// // //                   htmlFor="email"
// // //                   className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// // //                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// // //                   peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// // //                 >
// // //                   Email *
// // //                 </label>
// // //               </div>
// // //             </div>

// // //             {/* Website */}
// // //             <div className="relative">
// // //               <input
// // //                 type="url"
// // //                 id="website"
// // //                 name="website"
// // //                 value={formData.website}
// // //                 onChange={handleChange}
// // //                 placeholder="https://"
// // //                 className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// // //               />
// // //               <label
// // //                 htmlFor="website"
// // //                 className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// // //                 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// // //                 peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// // //               >
// // //                 Website
// // //               </label>
// // //             </div>

// // //             {/* Message */}
// // //             <div className="relative">
// // //               <textarea
// // //                 id="message"
// // //                 name="message"
// // //                 rows={4}
// // //                 value={formData.message}
// // //                 onChange={handleChange}
// // //                 className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000] resize-none"
// // //               ></textarea>
// // //               <label
// // //                 htmlFor="message"
// // //                 className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// // //                 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// // //                 peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// // //               >
// // //                 What challenge are you solving?
// // //               </label>
// // //             </div>

// // //             <button
// // //               name="send"
// // //               onClick={handleSubmit}
// // //               disabled={isSubmitting || !formData.name || !formData.email || !formData.company || !formData.role || !formData.message}
// // //               className="w-full border border-white hover:border-[#ff0000] text-white hover:bg-[#ff0000] transition-all duration-300 font-medium py-3 px-3 rounded-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
// // //             >
// // //               {isSubmitting ? (
// // //                 <>
// // //                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
// // //                   Sending...
// // //                 </>
// // //               ) : (
// // //                 <>
// // //                   <i className="fas fa-envelope "></i>
// // //                   Submit
// // //                 </>
// // //               )}
// // //             </button>

// // //             <div className="flex flex-col md:flex-row bg-black py-10 rounded-lg px-6 md:px-12 justify-center md:justify-between items-center text-center md:text-left mt-4 space-y-4 md:space-y-0">
// // //               <p className="text-lg md:text-xl font-semibold text-white">
// // //                 Talk to a Growth Architect
// // //               </p>
// // //               <button
// // //                 name="chat"
// // //                 onClick={() => {
// // //                   window.open(
// // //                     "https://wa.me/918921840486?text=Hello, I would like to learn more.",
// // //                     "_blank"
// // //                   );
// // //                 }}
// // //                 className="bg-[#ff0000] text-white px-4 py-2 rounded-md hover:scale-105 transition-transform duration-200 flex items-center justify-center w-full md:w-auto max-w-xs"
// // //               >
// // //                 <i className="fas fa-calendar-alt p-2"></i>
// // //                 <span>Book a Call</span>
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Right side */}
// // //         <div className="flex-1 flex items-center">
// // //           <div className="bg-black p-6 rounded-lg shadow-lg w-full text-center flex flex-col justify-between relative">
// // //             {/* Speech Bubble Comment */}
// // //             <div className="relative mb-4 inline-block self-start ml-8">
// // //               <div className="bg-[#ff0000] text-white px-4 py-3 rounded-2xl shadow-lg relative">
// // //                 <p className="text-sm font-medium whitespace-nowrap">
// // //                   Thank you! We'll be in touch soon.
// // //                 </p>
// // //                 {/* Bubble Tail */}
// // //                 <div className="absolute -left-2 top-2 w-0 h-0 border-l-8 border-l-transparent border-r-0 border-t-8 border-t-[#ff0000]"></div>
// // //               </div>
// // //             </div>

// // //             <div className="flex flex-col items-center">
// // //               <img
// // //                 src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1763383653/oii_upmu8c.png"
// // //                 alt="image"
// // //                 className="h-auto min-w-150 md:w-auto"
// // //               />
// // //               <div className="bg-gradient-to-br from-black to-[#3f0000] w-10 h-10 flex items-center justify-center rounded-full mb-4">
// // //                 <i className="fas fa-rocket text-[#ff0000]"></i>
// // //               </div>
// // //               <p className="text-lg mb-6">
// // //                 "If acquisition has plateaued or you're ready to break through your next growth ceiling,
// // //                 let's discuss."
// // //               </p>
// // //               <div className="flex justify-center gap-8 mb-4">
// // //                 <div>
// // //                   <p className="text-[#ff0000] text-xl font-semibold">50+</p>
// // //                   <p className="uppercase text-xs tracking-wide text-gray-400">
// // //                     Growth Projects
// // //                   </p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-[#ff0000] text-xl font-semibold">$2M+</p>
// // //                   <p className="uppercase text-xs tracking-wide text-gray-400">
// // //                     Revenue Generated
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //               <div className="border-t border-neutral-700 w-full mt-4 pt-4 flex justify-center gap-4 text-gray-400">
// // //                 <a
// // //                   href="https://www.linkedin.com/company/socialbureau-in"
// // //                   className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200"
// // //                 >
// // //                   <i className="fab fa-linkedin"></i>
// // //                 </a>
// // //                 <a href="https://twitter.com" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
// // //                   <i className="fab fa-x-twitter"></i>
// // //                 </a>
// // //                 <a href="mailto:info@socialbureau.in" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
// // //                   <i className="fas fa-envelope"></i>
// // //                 </a>
// // //                 <a href="https://www.facebook.com/share/15yzVd5Qcw" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
// // //                   <i className="fab fa-facebook"></i>
// // //                 </a>
// // //                 <a href="https://www.instagram.com/socialbureau.in?igsh=NW4yd2lldzRpNXdj" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
// // //                   <i className="fab fa-instagram"></i>
// // //                 </a>
// // //               </div><br />
// // //               <p className="text-sm text-center text-gray-400">
// // //                 © 2025 <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
// // //                   Social<span className="text-[#ff0000]">B</span>ureau
// // //                 </a>. All rights reserved.
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>
// // //     </>
// // //   );
// // // }

// // import React, { useState } from "react";
// // import Toast from "./Toast";

// // // Add styles for animation
// // const styles = `
// //   @keyframes fadeIn {
// //     from {
// //       opacity: 0;
// //       transform: scale(0.8) translateY(-10px);
// //     }
// //     to {
// //       opacity: 1;
// //       transform: scale(1) translateY(0);
// //     }
// //   }
// //   .animate-fadeIn {
// //     animation: fadeIn 0.5s ease-out;
// //   }
// // `;

// // export default function ContactSection() {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     company: '',
// //     role: '',
// //     email: '',
// //     website: '',
// //     message: ''
// //   });
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [toast, setToast] = useState(null);

// //   // Replace these with your actual Google Form details
// //   const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSem38gCoLarmSS2YgVSnOjB1yP6fuK69E4q51Fu1zljWqbZkg/formResponse";
// //   const FORM_FIELDS = {
// //     name: "entry.1424283838",
// //     company: "entry.1363722063",
// //     role: "entry.1714688408",
// //     email: "entry.745306089",
// //     website: "entry.366478309",
// //     message: "entry.1807216377"
// //   };

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);

// //     try {
// //       // Create form data for Google Forms
// //       const googleFormData = new FormData();
// //       googleFormData.append(FORM_FIELDS.name, formData.name);
// //       googleFormData.append(FORM_FIELDS.company, formData.company);
// //       googleFormData.append(FORM_FIELDS.role, formData.role);
// //       googleFormData.append(FORM_FIELDS.email, formData.email);
// //       googleFormData.append(FORM_FIELDS.website, formData.website);
// //       googleFormData.append(FORM_FIELDS.message, formData.message);

// //       // Submit to Google Forms
// //       await fetch(GOOGLE_FORM_ACTION, {
// //         method: 'POST',
// //         mode: 'no-cors',
// //         body: googleFormData
// //       });

// //       setToast({ type: 'success', message: 'Thank you! We\'ll be in touch soon.' });
// //       setFormData({ name: '', company: '', role: '', email: '', website: '', message: '' });
// //     } catch (error) {
// //       console.error('Error submitting form:', error);
// //       setToast({ type: 'error', message: 'Please try again.' });
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <style>{styles}</style>
// //       {/* Toast Notification */}
// //       {toast && (
// //         <Toast
// //           type={toast.type}
// //           message={toast.message}
// //           onClose={() => setToast(null)}
// //         />
// //       )}

// //       <section className="bg-black text-white py-16 px-4 md:px-12 flex flex-col lg:flex-row gap-8 pb-20">
// //         {/* Left side */}
// //         <div className="flex-1 flex flex-col gap-6">
// //           {/* Headline */}
// //           <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
// //             Let's Build What Your <br />
// //             <span className="text-[#ff0000]">Market's Been Waiting For</span>
// //           </h2>

// //           {/* Form */}
// //           <div className="bg-[#101010ff] p-6 rounded-lg shadow-lg space-y-4">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               {/* Name */}
// //               <div className="relative">
// //                 <input
// //                   type="text"
// //                   id="name"
// //                   name="name"
// //                   value={formData.name}
// //                   onChange={handleChange}
// //                   required
// //                   className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// //                 />
// //                 <label
// //                   htmlFor="name"
// //                   className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// //                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// //                   peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// //                 >
// //                   Name *
// //                 </label>
// //               </div>

// //               {/* Company */}
// //               <div className="relative">
// //                 <input
// //                   type="text"
// //                   id="company"
// //                   name="company"
// //                   value={formData.company}
// //                   onChange={handleChange}
// //                   required
// //                   className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// //                 />
// //                 <label
// //                   htmlFor="company"
// //                   className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// //                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// //                   peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// //                 >
// //                   Company *
// //                 </label>
// //               </div>

// //               {/* Role */}
// //               <div className="relative">
// //                 <input
// //                   type="text"
// //                   id="role"
// //                   name="role"
// //                   value={formData.role}
// //                   onChange={handleChange}
// //                   required
// //                   className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// //                 />
// //                 <label
// //                   htmlFor="role"
// //                   className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// //                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// //                   peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// //                 >
// //                   Role *
// //                 </label>
// //               </div>

// //               {/* Email */}
// //               <div className="relative">
// //                 <input
// //                   type="text"
// //                   id="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   required
// //                   className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// //                 />
// //                 <label
// //                   htmlFor="email"
// //                   className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// //                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// //                   peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// //                 >
// //                   Email *
// //                 </label>
// //               </div>
// //             </div>

// //             {/* Website */}
// //             <div className="relative">
// //               <input
// //                 type="url"
// //                 id="website"
// //                 name="website"
// //                 value={formData.website}
// //                 onChange={handleChange}
// //                 placeholder="https://"
// //                 className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
// //               />
// //               <label
// //                 htmlFor="website"
// //                 className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// //                 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// //                 peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// //               >
// //                 Website
// //               </label>
// //             </div>

// //             {/* Message */}
// //             <div className="relative">
// //               <textarea
// //                 id="message"
// //                 name="message"
// //                 rows={4}
// //                 value={formData.message}
// //                 onChange={handleChange}
// //                 className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000] resize-none"
// //               ></textarea>
// //               <label
// //                 htmlFor="message"
// //                 className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
// //                 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
// //                 peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
// //               >
// //                 What challenge are you solving?
// //               </label>
// //             </div>

// //             <button
// //               name="send"
// //               onClick={handleSubmit}
// //               disabled={isSubmitting || !formData.name || !formData.email || !formData.company || !formData.role || !formData.message}
// //               className="w-full border border-white hover:border-[#ff0000] text-white hover:bg-[#ff0000] transition-all duration-300 font-medium py-3 px-3 rounded-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
// //             >
// //               {isSubmitting ? (
// //                 <>
// //                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
// //                   Sending...
// //                 </>
// //               ) : (
// //                 <>
// //                   <i className="fas fa-envelope "></i>
// //                   Submit
// //                 </>
// //               )}
// //             </button>

// //             <div className="flex flex-col md:flex-row bg-black py-10 rounded-lg px-6 md:px-12 justify-center md:justify-between items-center text-center md:text-left mt-4 space-y-4 md:space-y-0">
// //               <p className="text-lg md:text-xl font-semibold text-white">
// //                 Talk to a Growth Architect
// //               </p>
// //               <button
// //                 name="chat"
// //                 onClick={() => {
// //                   window.open(
// //                     "https://wa.me/918921840486?text=Hello, I would like to learn more.",
// //                     "_blank"
// //                   );
// //                 }}
// //                 className="bg-[#ff0000] text-white px-4 py-2 rounded-md hover:scale-105 transition-transform duration-200 flex items-center justify-center w-full md:w-auto max-w-xs"
// //               >
// //                 <i className="fas fa-calendar-alt p-2"></i>
// //                 <span>Book a Call</span>
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Right side */}
// //         <div className="flex-1 flex items-center">
// //           <div className="bg-black p-6 rounded-lg shadow-lg w-full text-center flex flex-col justify-between relative">
// //             {/* Speech Bubble Comment - Only shows after successful submission */}
// //             {toast?.type === 'success' && (
// //               <div className="relative mb-4 inline-block self-start ml-8 animate-fadeIn">
// //                 <div className="bg-[#ff0000] text-white px-4 py-3 rounded-2xl shadow-lg relative">
// //                   <p className="text-sm font-medium whitespace-nowrap">
// //                     Thank you! We'll be in touch soon.
// //                   </p>
// //                   {/* Bubble Tail */}
// //                   <div className="absolute -left-2 top-2 w-0 h-0 border-l-8 border-l-transparent border-r-0 border-t-8 border-t-[#ff0000]"></div>
// //                 </div>
// //               </div>
// //             )}

// //             <div className="flex flex-col items-center">
// //               <img
// //                 src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1763383653/oii_upmu8c.png"
// //                 alt="image"
// //                 className="h-auto min-w-150 md:w-auto"
// //               />
// //               <div className="bg-gradient-to-br from-black to-[#3f0000] w-10 h-10 flex items-center justify-center rounded-full mb-4">
// //                 <i className="fas fa-rocket text-[#ff0000]"></i>
// //               </div>
// //               <p className="text-lg mb-6">
// //                 "If acquisition has plateaued or you're ready to break through your next growth ceiling,
// //                 let's discuss."
// //               </p>
// //               <div className="flex justify-center gap-8 mb-4">
// //                 <div>
// //                   <p className="text-[#ff0000] text-xl font-semibold">50+</p>
// //                   <p className="uppercase text-xs tracking-wide text-gray-400">
// //                     Growth Projects
// //                   </p>
// //                 </div>
// //                 <div>
// //                   <p className="text-[#ff0000] text-xl font-semibold">$2M+</p>
// //                   <p className="uppercase text-xs tracking-wide text-gray-400">
// //                     Revenue Generated
// //                   </p>
// //                 </div>
// //               </div>
// //               <div className="border-t border-neutral-700 w-full mt-4 pt-4 flex justify-center gap-4 text-gray-400">
// //                 <a
// //                   href="https://www.linkedin.com/company/socialbureau-in"
// //                   className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200"
// //                 >
// //                   <i className="fab fa-linkedin"></i>
// //                 </a>
// //                 <a href="https://twitter.com" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
// //                   <i className="fab fa-x-twitter"></i>
// //                 </a>
// //                 <a href="mailto:info@socialbureau.in" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
// //                   <i className="fas fa-envelope"></i>
// //                 </a>
// //                 <a href="https://www.facebook.com/share/15yzVd5Qcw" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
// //                   <i className="fab fa-facebook"></i>
// //                 </a>
// //                 <a href="https://www.instagram.com/socialbureau.in?igsh=NW4yd2lldzRpNXdj" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
// //                   <i className="fab fa-instagram"></i>
// //                 </a>
// //               </div><br />
// //               <p className="text-sm text-center text-gray-400">
// //                 © 2025 <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
// //                   Social<span className="text-[#ff0000]">B</span>ureau
// //                 </a>. All rights reserved.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </>
// //   );
// // }

// import React, { useState } from "react";
// import Toast from "./Toast";

// // Add styles for animation
// const styles = `
//   @keyframes fadeIn {
//     from {
//       opacity: 0;
//       transform: scale(0.8) translateY(-10px);
//     }
//     to {
//       opacity: 1;
//       transform: scale(1) translateY(0);
//     }
//   }

//   @keyframes popUp {
//     0% { 
//       transform: scale(0.6) translateY(10px); 
//       opacity: 0; 
//     }
//     60% { 
//       transform: scale(1.05); 
//       opacity: 1; 
//     }
//     100% { 
//       transform: scale(1); 
//     }
//   }

//   .animate-fadeIn {
//     animation: fadeIn 0.5s ease-out;
//   }

//   .animate-popUp {
//     animation: popUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
//   }
// `;

// export default function ContactSection() {
//   const [formData, setFormData] = useState({
//     name: '',
//     company: '',
//     role: '',
//     email: '',
//     website: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [toast, setToast] = useState(null);
//   const [showBubble, setShowBubble] = useState(false);

//   // Replace these with your actual Google Form details
//   const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSem38gCoLarmSS2YgVSnOjB1yP6fuK69E4q51Fu1zljWqbZkg/formResponse";
//   const FORM_FIELDS = {
//     name: "entry.1424283838",
//     company: "entry.1363722063",
//     role: "entry.1714688408",
//     email: "entry.745306089",
//     website: "entry.366478309",
//     message: "entry.1807216377"
//   };

//   const handleChange = (e) => {
//     setShowBubble(false); // hide bubble when user edits again
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       // Create form data for Google Forms
//       const googleFormData = new FormData();
//       googleFormData.append(FORM_FIELDS.name, formData.name);
//       googleFormData.append(FORM_FIELDS.company, formData.company);
//       googleFormData.append(FORM_FIELDS.role, formData.role);
//       googleFormData.append(FORM_FIELDS.email, formData.email);
//       googleFormData.append(FORM_FIELDS.website, formData.website);
//       googleFormData.append(FORM_FIELDS.message, formData.message);

//       // Submit to Google Forms
//       await fetch(GOOGLE_FORM_ACTION, {
//         method: 'POST',
//         mode: 'no-cors',
//         body: googleFormData
//       });

//       setShowBubble(true);
//       setFormData({ name: '', company: '', role: '', email: '', website: '', message: '' });

//       // Hide bubble after 5 seconds
//       setTimeout(() => setShowBubble(false), 5000);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setToast({ type: 'error', message: 'Please try again.' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <style>{styles}</style>

//       <section className="bg-black text-white py-16 px-4 md:px-12 flex flex-col lg:flex-row gap-8 pb-20">
//         {/* Left side */}
//         <div className="flex-1 flex flex-col gap-6">
//           {/* Headline */}
//           <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
//             Let's Build What Your <br />
//             <span className="text-[#ff0000]">Market's Been Waiting For</span>
//           </h2>

//           {/* Form */}
//           <div className="bg-[#101010ff] p-6 rounded-lg shadow-lg space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Name */}
//               <div className="relative">
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
//                 />
//                 <label
//                   htmlFor="name"
//                   className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
//                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
//                   peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
//                 >
//                   Name *
//                 </label>
//               </div>

//               {/* Company */}
//               <div className="relative">
//                 <input
//                   type="text"
//                   id="company"
//                   name="company"
//                   value={formData.company}
//                   onChange={handleChange}
//                   required
//                   className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
//                 />
//                 <label
//                   htmlFor="company"
//                   className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
//                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
//                   peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
//                 >
//                   Company *
//                 </label>
//               </div>

//               {/* Role */}
//               <div className="relative">
//                 <input
//                   type="text"
//                   id="role"
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   required
//                   className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
//                 />
//                 <label
//                   htmlFor="role"
//                   className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
//                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
//                   peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
//                 >
//                   Role *
//                 </label>
//               </div>

//               {/* Email */}
//               <div className="relative">
//                 <input
//                   type="text"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
//                 />
//                 <label
//                   htmlFor="email"
//                   className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
//                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
//                   peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
//                 >
//                   Email *
//                 </label>
//               </div>
//             </div>

//             {/* Website */}
//             <div className="relative">
//               <input
//                 type="url"
//                 id="website"
//                 name="website"
//                 value={formData.website}
//                 onChange={handleChange}
//                 placeholder="https://"
//                 className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
//               />
//               <label
//                 htmlFor="website"
//                 className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
//                 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
//                 peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
//               >
//                 Website
//               </label>
//             </div>

//             {/* Message */}
//             <div className="relative">
//               <textarea
//                 id="message"
//                 name="message"
//                 rows={4}
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="peer w-full bg-neutral-900 p-3 pt-6 rounded placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ff0000] resize-none"
//               ></textarea>
//               <label
//                 htmlFor="message"
//                 className="absolute left-3 top-3 text-gray-400 text-base transition-all duration-200
//                 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-900 peer-focus:rounded-lg peer-focus:px-1
//                 peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-900 peer-valid:rounded-lg peer-valid:px-1"
//               >
//                 What challenge are you solving?
//               </label>
//             </div>

//             <button
//               name="send"
//               onClick={handleSubmit}
//               disabled={isSubmitting || !formData.name || !formData.email || !formData.company || !formData.role || !formData.message}
//               className="w-full border border-white hover:border-[#ff0000] text-white hover:bg-[#ff0000] transition-all duration-300 font-medium py-3 px-3 rounded-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                   Sending...
//                 </>
//               ) : (
//                 <>
//                   <i className="fas fa-envelope "></i>
//                   Submit
//                 </>
//               )}
//             </button>

//             <div className="flex flex-col md:flex-row bg-black py-10 rounded-lg px-6 md:px-12 justify-center md:justify-between items-center text-center md:text-left mt-4 space-y-4 md:space-y-0">
//               <p className="text-lg md:text-xl font-semibold text-white">
//                 Talk to a Growth Architect
//               </p>
//               <button
//                 name="chat"
//                 onClick={() => {
//                   window.open(
//                     "https://wa.me/918921840486?text=Hello, I would like to learn more.",
//                     "_blank"
//                   );
//                 }}
//                 className="bg-[#ff0000] text-white px-4 py-2 rounded-md hover:scale-105 transition-transform duration-200 flex items-center justify-center w-full md:w-auto max-w-xs"
//               >
//                 <i className="fas fa-calendar-alt p-2"></i>
//                 <span>Book a Call</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right side */}
//         <div className="flex-1 flex items-center">
//           <div className="bg-black p-6 rounded-lg shadow-lg w-full text-center flex flex-col justify-between relative">
//             {/* Image with relative positioning for bubble */}
//             <div className="relative flex flex-col items-center">
//               <img
//                 src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1763383653/oii_upmu8c.png"
//                 alt="image"
//                 className="h-auto min-w-150 md:w-auto"
//               />

//               {/* Large Speech Bubble Comment - positioned relative to image */}
//               {showBubble && (
//                 <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-80 animate-popUp">
//                   <div className="bg-[#ff0000] text-white px-8 py-6 rounded-3xl shadow-2xl relative">
//                     <p className="text-lg font-medium text-center">
//                       Thank you! We'll be in touch soon. 🚀
//                     </p>
//                     {/* Bubble Tail pointing up to character */}
//                     <div className="absolute left-1/2 -top-4 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-[#ff0000]"></div>
//                   </div>
//                 </div>
//               )}

//               <div className="bg-gradient-to-br from-black to-[#3f0000] w-10 h-10 flex items-center justify-center rounded-full mb-4">
//                 <i className="fas fa-rocket text-[#ff0000]"></i>
//               </div>
//               <p className="text-lg mb-6">
//                 "If acquisition has plateaued or you're ready to break through your next growth ceiling,
//                 let's discuss."
//               </p>
//               <div className="flex justify-center gap-8 mb-4">
//                 <div>
//                   <p className="text-[#ff0000] text-xl font-semibold">50+</p>
//                   <p className="uppercase text-xs tracking-wide text-gray-400">
//                     Growth Projects
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-[#ff0000] text-xl font-semibold">$2M+</p>
//                   <p className="uppercase text-xs tracking-wide text-gray-400">
//                     Revenue Generated
//                   </p>
//                 </div>
//               </div>
//               <div className="border-t border-neutral-700 w-full mt-4 pt-4 flex justify-center gap-4 text-gray-400">
//                 <a
//                   href="https://www.linkedin.com/company/socialbureau-in"
//                   className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200"
//                 >
//                   <i className="fab fa-linkedin"></i>
//                 </a>
//                 <a href="https://twitter.com" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
//                   <i className="fab fa-x-twitter"></i>
//                 </a>
//                 <a href="mailto:info@socialbureau.in" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
//                   <i className="fas fa-envelope"></i>
//                 </a>
//                 <a href="https://www.facebook.com/share/15yzVd5Qcw" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
//                   <i className="fab fa-facebook"></i>
//                 </a>
//                 <a href="https://www.instagram.com/socialbureau.in?igsh=NW4yd2lldzRpNXdj" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition-all duration-200">
//                   <i className="fab fa-instagram"></i>
//                 </a>
//               </div><br />
//               <p className="text-sm text-center text-gray-400">
//                 © 2025 <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
//                   Social<span className="text-[#ff0000]">B</span>ureau
//                 </a>. All rights reserved.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }


>>>>>>> 6a9f80c438101896d24cc156759309598c1ac589
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
                    "https://wa.me/918921840486?text=Hello, I would like to learn more.",
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
              <Footer />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}