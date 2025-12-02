import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiTrash2, FiUpload, FiCheck, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import Navbar from './Navbar';
import Footer from './Footer';
import Seo from './Seo';

export default function AddClientPortfolio() {
  const [currentStep, setCurrentStep] = useState(1);
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: 1,
      title: '',
      client: '',
      role: '',
      description: '',
      tools: '',
      link: '',
      files: [],
    },
  ]);

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    location: '',
    category: '',
    subSpecialization: '',
    yearsOfExperience: '',
    bio: '',
    linkedin: '',
    github: '',
    behance: '',
    dribbble: '',
    pricingModel: '',
    minimumPrice: '',
    availability: '',
    confirmOriginal: false,
    agreeTerms: false,
  });

  const categories = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Graphic Design',
    'Video Editing',
    'Content Writing',
    'Digital Marketing',
    'Brand Strategy',
    'Photography',
    'Other',
  ];

  const steps = [
    { num: 1, title: 'Personal Info', desc: 'Tell us about yourself' },
    { num: 2, title: 'Professional', desc: 'Your expertise' },
    { num: 3, title: 'Portfolio', desc: 'Showcase your work' },
    { num: 4, title: 'Commercial', desc: 'Pricing & availability' },
    { num: 5, title: 'Legal', desc: 'Terms & confirmation' },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const addPortfolioItem = () => {
    setPortfolioItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: '',
        client: '',
        role: '',
        description: '',
        tools: '',
        link: '',
        files: [],
      },
    ]);
  };

  const removePortfolioItem = (id) => {
    setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updatePortfolioItem = (id, field, value) => {
    setPortfolioItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleFileUpload = (id, files) => {
    updatePortfolioItem(id, 'files', Array.from(files));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Portfolio Items:', portfolioItems);
    alert('Portfolio submitted successfully! (Demo mode)');
  };

  return (
    <>
      <Navbar />
      <Seo
        title="Submit Your Portfolio | SocialBureau"
        description="Join our creative network. Submit your portfolio and connect with brands looking for your expertise."
        keywords="portfolio submission, creative professionals, freelance network"
      />

      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white py-12 px-4">
        {/* Floating particles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-red-500/30"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: ['100vh', '-10vh'],
                x: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Submit Your <span className="text-red-500">Portfolio</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join our network of talented professionals. Showcase your work and connect with brands
              looking for your expertise.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between mb-12 relative"
          >
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-zinc-800">
              <motion.div
                className="h-full bg-red-500"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            {steps.map((step) => (
              <div key={step.num} className="relative z-10 flex flex-col items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    currentStep >= step.num
                      ? 'bg-red-600 text-white'
                      : 'bg-zinc-800 text-gray-500'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {currentStep > step.num ? <FiCheck /> : step.num}
                </motion.div>
                <div className="mt-2 text-xs md:text-sm text-center hidden md:block">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-gray-500 text-xs">{step.desc}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form Container */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-zinc-900/50 backdrop-blur-lg border border-zinc-800 rounded-2xl p-8 shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Personal / Business Info</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone / WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Location (City / Country) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Mumbai, India"
                      className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Professional Profile */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Professional Profile</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Sub-Specialization</label>
                      <input
                        type="text"
                        name="subSpecialization"
                        value={formData.subSpecialization}
                        onChange={handleInputChange}
                        placeholder="e.g., React.js, Motion Graphics"
                        className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Years of Experience <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="yearsOfExperience"
                        value={formData.yearsOfExperience}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Short Bio / Professional Introduction <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Tell us about your expertise, approach, and what makes you unique..."
                      className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-4">Social Accounts</label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        placeholder="LinkedIn URL"
                        className="bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      />
                      <input
                        type="url"
                        name="github"
                        value={formData.github}
                        onChange={handleInputChange}
                        placeholder="GitHub URL"
                        className="bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      />
                      <input
                        type="url"
                        name="behance"
                        value={formData.behance}
                        onChange={handleInputChange}
                        placeholder="Behance URL"
                        className="bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      />
                      <input
                        type="url"
                        name="dribbble"
                        value={formData.dribbble}
                        onChange={handleInputChange}
                        placeholder="Dribbble URL"
                        className="bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Portfolio Items */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Portfolio Items</h2>
                    <motion.button
                      type="button"
                      onClick={addPortfolioItem}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition"
                    >
                      <FiPlus /> Add Project
                    </motion.button>
                  </div>

                  {portfolioItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-black/30 border border-zinc-700 rounded-xl p-6 space-y-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Project {index + 1}</h3>
                        {portfolioItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePortfolioItem(item.id)}
                            className="text-red-500 hover:text-red-400 transition"
                          >
                            <FiTrash2 />
                          </button>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Project Title *"
                          value={item.title}
                          onChange={(e) => updatePortfolioItem(item.id, 'title', e.target.value)}
                          className="bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Client / Brand (optional)"
                          value={item.client}
                          onChange={(e) => updatePortfolioItem(item.id, 'client', e.target.value)}
                          className="bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Your Role *"
                        value={item.role}
                        onChange={(e) => updatePortfolioItem(item.id, 'role', e.target.value)}
                        className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        required
                      />

                      <textarea
                        placeholder="Project Description *"
                        value={item.description}
                        onChange={(e) =>
                          updatePortfolioItem(item.id, 'description', e.target.value)
                        }
                        rows="3"
                        className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        required
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Tools / Tech Stack *"
                          value={item.tools}
                          onChange={(e) => updatePortfolioItem(item.id, 'tools', e.target.value)}
                          className="bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                          required
                        />
                        <input
                          type="url"
                          placeholder="Website / Demo Link"
                          value={item.link}
                          onChange={(e) => updatePortfolioItem(item.id, 'link', e.target.value)}
                          className="bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Upload Images / Screenshots / Videos
                        </label>
                        <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6 text-center hover:border-red-500 transition cursor-pointer">
                          <input
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            onChange={(e) => handleFileUpload(item.id, e.target.files)}
                            className="hidden"
                            id={`file-${item.id}`}
                          />
                          <label htmlFor={`file-${item.id}`} className="cursor-pointer">
                            <FiUpload className="mx-auto text-3xl text-gray-500 mb-2" />
                            <p className="text-sm text-gray-400">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              PNG, JPG, MP4 (Max 10MB each)
                            </p>
                          </label>
                          {item.files.length > 0 && (
                            <p className="text-sm text-red-500 mt-2">
                              {item.files.length} file(s) selected
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Step 4: Commercial */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Commercial Section</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Pricing Model <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="pricingModel"
                        value={formData.pricingModel}
                        onChange={handleInputChange}
                        className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        required
                      >
                        <option value="">Select pricing model</option>
                        <option value="hourly">Hourly</option>
                        <option value="per-project">Per Project</option>
                        <option value="negotiable">Negotiable</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Minimum Starting Price <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="minimumPrice"
                        value={formData.minimumPrice}
                        onChange={handleInputChange}
                        placeholder="e.g., ₹5000 or $100"
                        className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Availability <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      required
                    >
                      <option value="">Select availability</option>
                      <option value="immediate">Immediate</option>
                      <option value="1-2-weeks">Within 1–2 weeks</option>
                      <option value="per-schedule">Per schedule</option>
                    </select>
                  </div>

                  <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 mt-8">
                    <h3 className="font-semibold mb-4">Why set clear pricing?</h3>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li>✓ Helps clients find professionals within their budget</li>
                      <li>✓ Reduces time spent on unqualified inquiries</li>
                      <li>✓ Sets professional expectations upfront</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Legal & Compliance */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Legal & Compliance</h2>

                  <div className="space-y-6">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="confirmOriginal"
                        checked={formData.confirmOriginal}
                        onChange={handleInputChange}
                        className="mt-1 w-5 h-5 rounded border-zinc-700 bg-black/40 text-red-600 focus:ring-2 focus:ring-red-500"
                        required
                      />
                      <span className="text-sm group-hover:text-red-500 transition">
                        I confirm this work is original or I have permission to publish it.{' '}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        className="mt-1 w-5 h-5 rounded border-zinc-700 bg-black/40 text-red-600 focus:ring-2 focus:ring-red-500"
                        required
                      />
                      <span className="text-sm group-hover:text-red-500 transition">
                        I agree to the platform's commission and portfolio terms.{' '}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                  </div>

                  <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 mt-8">
                    <h3 className="font-semibold mb-4">Terms Summary</h3>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li>• Platform commission: 10% on referred projects</li>
                      <li>• Your work remains your intellectual property</li>
                      <li>• You can remove your portfolio at any time</li>
                      <li>• We may feature your work in marketing materials (with consent)</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-red-900/20 to-red-800/10 border border-red-800/30 rounded-xl p-6 mt-6">
                    <h3 className="font-semibold text-red-400 mb-2">Ready to submit?</h3>
                    <p className="text-sm text-gray-300">
                      Once submitted, our team will review your portfolio within 48 hours. You'll
                      receive a confirmation email with next steps.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-800">
              <motion.button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                whileHover={{ scale: currentStep === 1 ? 1 : 1.05 }}
                whileTap={{ scale: currentStep === 1 ? 1 : 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
                  currentStep === 1
                    ? 'bg-zinc-800 text-gray-600 cursor-not-allowed'
                    : 'bg-zinc-800 hover:bg-zinc-700'
                }`}
              >
                <FiArrowLeft /> Previous
              </motion.button>

              {currentStep < 5 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-red-600 px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition"
                >
                  Next <FiArrowRight />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!formData.confirmOriginal || !formData.agreeTerms}
                  className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition ${
                    formData.confirmOriginal && formData.agreeTerms
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-zinc-800 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <FiCheck /> Submit Portfolio
                </motion.button>
              )}
            </div>
          </motion.form>
        </div>
      </div>

      <Footer />
    </>
  );
}
