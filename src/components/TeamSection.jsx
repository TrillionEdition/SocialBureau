import React from "react";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Alen Jacob",
    link: "https://www.linkedin.com/in/alen-jacob-695a99184",
    role: "Director, CFO & Co-Founder",
    image: "/assets/AlenJacob.webp",
    hoverImage: "/assets/AlenJacob.webp",
  },
  {
    name: "Sham S K",
    link: "https://shamsk.vercel.app",
    role: "Director, CEO & Co-Founder",
    image: "/assets/ShamSK.webp",
    hoverImage: "/assets/ShamSK.webp",
  },
  // {
  //   name: "Hajira Mohammed",
  //   link: "https://www.linkedin.com/in/hajira-mohammed-10005b335",
  //   role: "Administration",
  //   image: "/assets/hajira m.webp",
  //   hoverImage: "/assets/hajira.webp",
  // },
  // {
  //   name: "Anjay Ramesh",
  //   link: "https://www.linkedin.com/in/anjay-ramesh-49811b166",
  //   role: "Content Writer & Copy Writer",
  //   image: "/assets/anjay ramesh.webp",
  //   hoverImage: "/assets/anjay.webp",
  // },
  // {
  //   name: "Elizebath Thomas",
  //   link: "https://www.linkedin.com/in/elizebath-thomas-3b7801216",
  //   role: "Web Developer",
  //   image: "/assets/elizebath thomas.webp",
  //   hoverImage: "/assets/elizebath.webp",
  // },
  // {
  //   name: "Haridas P M",
  //   link: "https://www.linkedin.com/in/haridas-pm-22april2000",
  //   role: "Graphics Designer",
  //   image: "/assets/haridas pm.webp",
  //   hoverImage: "/assets/haridas.webp",
  // },
  // {
  //   name: "Rimshad M",
  //   link: "https://www.linkedin.com/in/rimshad",
  //   role: "Graphics Designer",
  //   image: "/assets/rimshad m.webp",
  //   hoverImage: "/assets/rimshad.webp",
  // },
  // {
  //   name: "Afnas N",
  //   link: "#",
  //   role: "Videographer",
  //   image: "/assets/afnas n.webp",
  //   hoverImage: "/assets/afnas.webp",
  // },
];
const TeamCard = ({ name, role, image, hoverImage, link }) => (
  <div className="group relative w-64 sm:w-72 h-96 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl cursor-pointer flex-shrink-0 gap-x-20">
    <a href={link} target="_blank" rel="noopener noreferrer">
      <img
        src={image}
        alt={name}
        className="rounded-[1rem] absolute inset-0 w-full h-full object-cover transition duration-500 "
      />
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-80 text-white p-4 z-10 transition-all duration-500 translate-y-10 ">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm opacity-80">{role}</p>
      </div>
    </a>
  </div>
);

const TeamSection = () => (
  <section className="bg-black py-16 md:px-35 px-4 text-center text-white">
    <div className="flex flex-row flex-wrap justify-center items-center gap-8 w-full">
      {teamMembers.map((member, idx) => (
        <TeamCard key={idx} {...member} />
      ))}
    </div>
  </section>
);

export default TeamSection;