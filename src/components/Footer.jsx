import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  const footerSections = [
    {
      title: "Services",
      items: [
        { label: "Services", href: "#" },
        { label: "Web Development", href: "#" },
        { label: "API Marketing", href: "/api-marketing-agency-in-kochi" },
        { label: "Performance Marketing", href: "/performance-marketing-agency-in-kochi" },
        { label: "Niche Marketing", href: "/niche-marketing-agency-in-kochi" },
        { label: "Content Marketing", href: "/content-marketing-agency-in-kochi" },
        { label: "AdTech Marketing", href: "/adTech-marketing-agency-in-kochi" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/our-team" },
        { label: "Work", href: "/our-works" },
        { label: "Events", href: "/events" },
        { label: "Contact", href: "/contact" },
        { label: "Let's Talk", href: "/voice" },
      ],
    },
    {
      title: "Account",
      items: [
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" },
        { label: "Partners", href: "/partners" },
        { label: "Login", href: "/login" },
      ],
    },

    {
      title: "About Us",
      items: [
        { label: "Blogs", href: "/blog" },
        { label: "Our team", href: "/our-team" },
        { label: "Career Opportunities", href: "/careers" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-[#f5f5f7] text-[#1d1d1f]">
      {/* Main Footer Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-[1200px] mx-auto px-4 md:px-6 py-16"
      >
        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          {footerSections.map((section, idx) => (
            <motion.div key={idx} variants={itemVariants} className="flex flex-col">
              <h3 className="text-[13px] font-semibold text-black mb-4 tracking-tight">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      to={item.href}
                      className="text-[12px] text-gray-600 hover:text-black transition-colors duration-200 leading-relaxed"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-300 my-8"
        />

        {/* Bottom Section - Legal & Info */}
        <motion.div variants={itemVariants} className="flex flex-col gap-6">
          {/* Description Text */}
          <div className="text-[12px] text-gray-600 leading-relaxed">
            <p className="mb-4">
              We are a full-service digital marketing and web development agency dedicated to helping businesses grow through innovative strategies, cutting-edge technology, and creative excellence. Our team specializes in performance marketing, brand development, and digital transformation for companies of all sizes.
            </p>
            <p className="mb-4">
              From API-driven growth systems to niche market penetration, we deliver measurable results. Our services span across web development, branding, SEO, content marketing, and advanced marketing automation.
            </p>
            <p>
              Learn more about our services and how we can help your business at{" "}
              <Link to="/" className="text-blue-600 hover:text-blue-700">
                SocialBureau.in
              </Link>
              .
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-y border-gray-300">
            <div>
              <h4 className="text-[11px] font-semibold text-gray-700 uppercase tracking-widest mb-3">
                Contact Us
              </h4>
              <ul className="text-[12px] text-gray-600 space-y-2">
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:info@socialbureau.in"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    info@socialbureau.in
                  </a>
                </li>
                <li>
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:+918714952665"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    +91 8714952665
                  </a>
                </li>
                <li>
                  <strong>Location:</strong> Kochi, Kerala, India
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold text-gray-700 uppercase tracking-widest mb-3">
                Follow Us
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/company/socialbureau-in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-blue-600 hover:text-blue-700 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://x.com/SocialBureau_in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-blue-600 hover:text-blue-700 transition-colors"
                >
                  X
                </a>
                <a
                  href="https://www.instagram.com/socialbureau.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/people/SocialBureau/61578149225125/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Copyright & Legal */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 text-[11px] text-gray-500">
            <div>
              <p>
                Copyright © 2025 Social Bureau. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4 flex-wrap justify-center md:justify-end">
              <Link
                to="/privacy-policy"
                className="hover:text-gray-700 transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-400">|</span>
              <Link
                to="/disclaimer"
                className="hover:text-gray-700 transition-colors"
              >
                Disclaimer
              </Link>
              <span className="text-gray-400">|</span>
              <Link
                to="/cookie-policy"
                className="hover:text-gray-700 transition-colors"
              >
                Cookie Policy
              </Link>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
