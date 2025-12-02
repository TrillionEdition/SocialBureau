import React from "react";
import { useNavigate } from "react-router-dom";

export default function LatestCareers() {
  const navigate = useNavigate();

  const team = [
    {
      name: "Alen Jacob",
      role: "Managing Director & CFO",
      image: "/assets/AlenJacob.webp",
      description: "Building businesses through strategy and execution",
    },
    {
      name: "Sham SK",
      role: "Director & CEO",
      image: "/assets/ShamSK.webp",
      description: "Visionary leader driving innovation, growth, and impact",
    },
  ];

  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Team Members */}
          {team.map((member, index) => (
            <div key={index}>
              {/* Mobile view: image left, content right */}
              <div className="flex items-center gap-4 sm:hidden bg-white/5 rounded-2xl shadow-lg p-4 text-left">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full border border-white/20 flex-shrink-0"
                />
                <div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-300">{member.role}</p>
                  <p className="text-xs text-gray-400 mt-1">{member.description}</p>
                </div>
              </div>

              {/* Desktop view: original card */}
              <div className="hidden sm:block bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 md:py-10 hover:scale-105 transition-transform duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-25 h-30 rounded-full mx-auto mb-4 border border-white/20"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-300 mb-2">{member.role}</p>
                <p className="text-sm text-gray-400">{member.description}</p>
              </div>
              
            </div>
          ))}
<div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 md:py-10 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
  <div className="flex flex-wrap justify-center gap-4 mb-4">
    <img
      src="/assets/anjay.webp"
      alt="Anjay"
      className="w-16 h-16 rounded-full border border-white/20 object-cover"
    />
    <img
      src="/assets/elizebath.webp"
      alt="Elizebath"
      className="w-16 h-16 rounded-full border border-white/20 object-cover"
    />
    <img
      src="/assets/hajira.webp"
      alt="Hajira"
      className="w-16 h-16 rounded-full border border-white/20 object-cover"
    />
  </div>

  {/* Button */}
  <button
    onClick={() => navigate("/our-team")}
    className="px-4 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200"
  >
    View Team →
  </button>
</div>

          {/* Careers Card (same across both views) */}
          <div
            onClick={() => navigate("/careers")}
            className="cursor-pointer bg-gradient-to-r from-[#3f0000] to-red-500 rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center hover:scale-105 transition-transform duration-300"
          >
            <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center mb-4 text-4xl">
              <img
                className="w-24 h-24 rounded-full"
                src="https://png.pngtree.com/png-vector/20250817/ourmid/pngtree-anonymous-person-silhouette-with-question-mark-identity-png-image_17021214.webp"
                alt="unknown"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">This Could Be You</h3>
            <p className="text-sm mb-4">
              Join our growing team and shape the future with us.
            </p>
            <a
              className="px-4 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200"
              href="/careers"
            >
              View Careers →
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <a
          href="https://clickup.com/verified-power-user"
          target="_blank"
          rel="noopener noreferrer"
          className="w-6xl flex justify-between items-center px-5 py-3 rounded-lg bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white gap-4 shadow-lg hover:scale-105 transition-transform"
          aria-label="Click to view ClickUp verification"
        >
          <p style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>
            We are Verified ClickUp Power Users
          </p>

          <img
            src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1764674437/Untitled_design_23_owrydd.png"
            alt="clickup-badge"
            style={{ height: 80, width: 'auto' }}
          />
        </a>
      </div>

    </section>
  );
}
