import React from "react";
import { FaLinkedin,FaEnvelope, FaFacebook, FaInstagram, FaWhatsapp, FaPhone } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
export default function Footer() {
  const navigate=useNavigate()
  return (
    <footer className="bg-black text-gray-400 py-6 flex flex-col items-center space-y-4 pb-30">
      {/* Social Icons */}
      <div className="flex space-x-4">
  {/* Email */}
  <a
  href="mailto:info@socialbureau.in"
  aria-label="Email Social Bureau"
  className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white"
>
  <FaEnvelope aria-hidden="true" />
</a>

<a
  href="tel:+918921840486"
  aria-label="Call Social Bureau"
  className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white"
>
  <FaPhone aria-hidden="true" />
</a>

<a
  href="https://www.linkedin.com/company/socialbureau-in"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visit Social Bureau on LinkedIn"
  className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white"
>
  <FaLinkedin aria-hidden="true" />
</a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/socialbureau.in?igsh=NW4yd2lldzRpNXdj"
    className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition"
  >
    <FaInstagram size={20} />
  </a>

  {/* Facebook */}
  <a
    href="https://www.facebook.com/share/15yzVd5Qcw/"
    className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition"
  >
    <FaFacebook size={20} />
  </a>

  {/* Twitter */}
  <a
    href="https://twitter.com"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition"
  >
    <FaXTwitter size={20} />
  </a>
</div>


      {/* Copyright */}
      <p className="text-sm text-center leading-8">
         © 2025 SocialBureau. All rights reserved.<br/> <a  href="/privacy-policy" className="text-white text-decoration-none hover:font-bold">Our Privacy Policy</a>  |  <a  href="/disclaimer" className="text-white text-decoration-none hover:font-bold">Our Disclaimer</a>
      </p>
    </footer>
  );
}
