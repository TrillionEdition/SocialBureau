import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useNavigate } from "react-router-dom";

const positions = [
  // {
  //   title: "Content Writer & Copywriter",
  //   icon: "fas fa-pen-nib",
  //   description:
  //     "The Content Writer & Copywriter will collaborate with the marketing and creative teams to produce compelling content that aligns with our clients' goals and brand messaging.",
  //   type: "Kochi • On-site",
  //   link:"https://www.linkedin.com/jobs/view/4268348169"
  // },
];

export default function CareersPost() {
  return (
    <div className=" text-white font-inter w-full min-h-screen flex justify-center items-center text-center">
        <section id="positions" className="py-20 px-6 md:w-[80vw]">
            <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif" }}>Careers</h2>
          <p className="text-xl text-gray-300 font-light">Designed for professionals of distinction</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <p>No openings are currently available.</p>
          {/* {positions.map((pos, idx) => (
            <div key={idx} className="border border-gray-700 hover:border-[#ff0000] p-5 md:p-8 shadow-xl rounded-[1rem]">
                <Link to={pos.link}>
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-playfair text-2xl font-semibold">{pos.title}</h3>
                <i className={`${pos.icon} text-[#ff0000] lg:text-xl text-[0px]`}></i>
              </div>
              <p className="text-gray-300 mb-6 text-left">{pos.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">{pos.type}</span>
                <button className="border hover:scale-105 rounded-[1rem] border-[#ff0000] px-6 py-2 pointer-cursor text-sm bg-[#ff0000] hover:bg-black hover:text-white transition">Apply</button>
              </div>
              </Link>
            </div>
          ))} */}
        </div>
      </section>

    </div>
  );
}
