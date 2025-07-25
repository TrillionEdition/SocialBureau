import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const values = [
  {
    title: "Excellence",
    icon: "fas fa-gem",
    text: "Unwavering commitment to the highest standards in every endeavor",
  },
  {
    title: "Integrity",
    icon: "fas fa-handshake",
    text: "Principled leadership and ethical decision-making at every level",
  },
  {
    title: "Innovation",
    icon: "fas fa-rocket",
    text: "Pioneering solutions that define tomorrow's industry standards",
  },
];

export default function CareersContent() {
  return (
    <div className="bg-black text-white font-inter">
      
      <section id="culture" className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif" }}>Our Philosophy</h2>
          <p className="text-xl text-gray-300 font-light">Founded on principles of excellence and distinction</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 px-20">
          {values.map((v, i) => (
            <div key={i} className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center ">
                <i className={`${v.icon} text-red-600 text-5xl`}></i>
              </div>
              <h3 className="font-playfair text-2xl font-semibold mb-4">{v.title}</h3>
              <p className="text-gray-300">{v.text}</p>
            </div>
          ))}
        </div>
        
      </section>

    </div>
  );
}
