import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaLinkedin,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaReddit,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const PremiumFooter = () => {
  const navigate = useNavigate();

  const socialLinks = [
    {
      icon: <FaEnvelope size={20} />,
      url: "mailto:info@socialbureau.in",
      label: "Email",
    },
    { icon: <FaPhone size={20} />, url: "tel:+918921840486", label: "Call" },
    {
      icon: <FaLinkedin size={20} />,
      url: "https://www.linkedin.com/company/socialbureau-in",
      label: "LinkedIn",
    },
    {
      icon: <FaInstagram size={18} />,
      url: "https://www.instagram.com/socialbureau.in?igsh=NW4yd2lldzRpNXdj",
      label: "Instagram",
    },
    {
      icon: <FaFacebook size={18} />,
      url: "https://www.facebook.com/share/15yzVd5Qcw/",
      label: "Facebook",
    },
    {
      icon: <FaReddit size={18} />,
      url: "https://www.reddit.com/user/SocialBureau_in/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button",
      label: "Reddit",
    },
    {
      icon: <FaXTwitter size={18} />,
      url: "https://x.com/SocialBure23829",
      label: "X",
    },
  ];

  return (
    <section className="min-h-screen bg-black text-white flex flex-col items-center justify-between pt-12 pb-4 md:pt-20 md:pb-6 lg:pt-24 lg:pb-8 px-6 md:px-12 lg:px-20 text-center overflow-hidden">
      {/* Branding Header */}
      <motion.div
        className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8 cursor-pointer group/te"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        onClick={() => window.open("https://trillionedition.com", "_blank")}
      >
        <div className="flex items-center space-x-4">
          <img
            src="/assets/trillionedition.webp"
            alt="TrillionEdition"
            className="h-8 md:h-10 filter brightness-0 invert group-hover/te:scale-105 transition-transform"
          />
          <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-white/60 group-hover/te:text-white transition-colors">
            A TrillionEdition Venture
          </span>
        </div>
        <p className="text-xs md:text-sm text-white/40 font-medium tracking-tight text-center md:text-right group-hover/te:text-white/60 transition-colors whitespace-nowrap">
          The consultancy trusted by leading edge businesses globally.
        </p>
      </motion.div>

      {/* Main Headline */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center py-8"
        initial={{ scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-5xl md:text-[11vw] font-black uppercase tracking-tighter leading-[0.8] mb-6 select-none">
          JOIN THE
          <br />
          NETWORK
        </h2>
        <div className="space-y-3">
          <h3 className="text-lg md:text-2xl font-bold tracking-tight text-white/90">
            Let's Build the <span className="text-red-600">Future</span> of{" "}
            <span className="text-red-600">Marketing</span> Together
          </h3>
          <p className="text-xs md:text-base text-white/50 max-w-xl mx-auto font-medium tracking-tight leading-relaxed">
            Join hundreds of forward-thinking businesses using{" "}
            <span className="text-white/80">API-driven</span> marketing to
            automate their growth.
          </p>
        </div>
      </motion.div>

      {/* Consolidated Social & Copyright Info */}
      <div className="w-full max-w-7xl border-t border-white/10 pt-6 flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
          <div className="text-center lg:text-left space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
              © 2025{" "}
              <span style={{ fontFamily: "MyFont, sans-serif" }}>
                Social<span className="text-[#ff0000]">B</span>ureau
              </span>
              . All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:bg-[#ff0000] hover:text-white hover:border-[#ff0000] transition-all duration-300 group"
              >
                <span className="group-hover:scale-110 transition-transform">
                  {social.icon}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] text-white/20">
          <button
            onClick={() => navigate("/privacy-policy")}
            className="hover:text-red-600 transition-colors uppercase"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => navigate("/cookie-policy")}
            className="hover:text-red-600 transition-colors uppercase"
          >
            Cookie Policy
          </button>
          <button
            onClick={() => navigate("/disclaimer")}
            className="hover:text-red-600 transition-colors uppercase"
          >
            Disclaimer
          </button>
        </div>
      </div>
    </section>
  );
};

export default PremiumFooter;
