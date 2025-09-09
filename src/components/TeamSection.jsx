import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
    role: "CEO & Co-Founder",
    image: "/assets/ShamSK.webp",
    hoverImage: "/assets/ShamSK.webp",
  },
  {
    name: "Hajira Mohammed",
    link: "https://www.linkedin.com/in/hajira-mohammed-10005b335",
    role: "Admin",
    image: "/assets/hajira m.webp",
    hoverImage: "/assets/hajira.webp",
  },
  {
    name: "Anjay Ramesh",
    link: "https://www.linkedin.com/in/shankar-krishnan-1a3800263",
    role: "Content Writer",
    image: "/assets/anjay ramesh.webp",
    hoverImage: "/assets/anjay.webp",
  },
  {
    name: "Elizebath Thomas",
    link: "https://www.linkedin.com/in/elizebath-thomas-3b7801216",
    role: "Web Developer",
    image: "/assets/elizebath thomas.webp",
    hoverImage: "/assets/elizebath.webp",
  },
  {
    name: "Haridas",
    link: "#",
    role: "Graphics Designer",
    image: "/assets/haridas pm.webp",
    hoverImage: "/assets/haridas.webp",
  },
  // {
  //   name: "Rimsad",
  //   link: "#",
  //   role: "Graphics Designer",
  //   image: "/assets/rimshad.webp",
  //   hoverImage: "/assets/rimshad.webp",
  // },
  {
    name: "Afnas",
    link: "#",
    role: "Videographer",
    image: "/assets/afnas n.webp",
    hoverImage: "/assets/afnas.webp",
  },
  // {
  //   name: "Shadil",
  //   link: "#",
  //   role: "Intern",
  //   image: "/assets/shadil.png",
  //   hoverImage: "/assets/shadil.png",
  // },
];

const TeamCard = ({ name, role, image, hoverImage, link }) => {
  return (
    <div className="group relative w-full sm:w-72 h-96 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl cursor-pointer">
      <Link to={link} target="_blank" rel="noopener noreferrer">
        {/* Base Image */}
        <img
          src={image}
          alt={name}
          className="rounded-[1rem] absolute inset-0 w-full h-full object-cover transition duration-500 opacity-100 group-hover:opacity-0"
        />
        {/* Hover Image */}
        <img
          src={hoverImage}
          alt={`${name}`}
          className="absolute inset-0 w-full h-full object-cover scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-[1.2] transition-all duration-700 ease-out"
        />
        <div className="absolute bottom-0 left-0 w-full bg-black text-white p-4 z-10 transition-all duration-500 translate-y-10 group-hover:translate-y-0">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm opacity-80">{role}</p>
      </div>
      </Link>
    </div>
  );
};

const TeamSection = () => {
  return (
    <section className="bg-black py-16 pt-30 md:px-35 px-10 text-center text-white">
      <div className="flex flex-wrap justify-center gap-12 gap-y-18">
        {teamMembers.map((member, idx) => (
          <TeamCard key={idx} {...member} />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
