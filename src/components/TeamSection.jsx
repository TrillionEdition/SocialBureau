import React from "react";
import { Link } from "react-router-dom";



const TeamCard = ({ name, role, image, hoverImage, link, description }) => (
  <a
    href={link || `/employee/${encodeURIComponent(name.replace(/ /g, '_'))}`}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative w-72 sm:w-80 h-[430px] rounded-2xl overflow-visible shadow-lg hover:shadow-2xl transition-all duration-500"
  >
    {/* Image Transition */}
    <div className="relative" style={{ overflow: "visible" }}>
      <div className="absolute inset-0">
        <img
          src={image}
          alt={name}
          className="w-72 sm:w-80 h-[430px] object-cover rounded"
        />
      </div>
    </div>

    {/* overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>

    {/* Content */}
    <div className="absolute bottom-0 p-6 translate-y-8 group-hover:translate-y-2 transition-all duration-500">
      <h3 className="text-xl font-semibold text-white">{name}</h3>
      <p className="text-sm text-gray-300">{role}</p>
      <p className="text-sm text-gray-200 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-4">
        {description}
      </p>
    </div>
  </a>
);

const ExEmployeeImage = ({ image }) => (
  <div className="relative w-72 sm:w-80 h-[430px] rounded-2xl overflow-hidden shadow-lg">

    {/* IMAGE */}
    <img
      src={image}
      alt="ex-employee"
      className="w-full h-full object-cover"
    />

    {/* VERY SUBTLE BLACK FRONT COAT */}
    <div className="absolute inset-0 bg-black/70" />
  </div>
);


const Section = ({ title, data }) => (
  <section className="py-20">
    <h2 className="text-white text-4xl font-light text-center mb-12">
      {title}
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 place-items-center">
      {data.map((member, i) => (
        <TeamCard key={i} {...member} />
      ))}
    </div>
  </section>
);

const ExEmployeeSection = ({ data }) => (
  <section className="py-20">
    <h2 className="text-white  text-4xl font-light text-center mb-12">
      EX Employees
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 place-items-center">
      {data.map((member, i) => (
        <ExEmployeeImage key={i} image={member.image} />
      ))}
    </div>
  </section>
);

/**
 * TeamSection
 *
 * @param {object} [teamData] - Optional team data from the API (Redis-cached).
 *                              Falls back to the built-in static `staticTeamData`
 *                              if omitted or undefined.
 */
const TeamSection = ({ teamData: propData } = {}) => {

const staticTeamData = {
   leadership: [
    {
      name: "Alen Jacob",
      link: "https://www.linkedin.com/in/alen-jacob-695a99184",
      role: "Managing Director",
      description:
        "Visionary leader driving SocialBureau's automation-first, API-powered marketing approach.",
      image: "/assets/AlenJacob.webp",
      hoverImage: "/assets/AlenJacob.webp",
    },
    {
      name: "Sham SK",
      link: "https://shamsk.vercel.app",
      role: "CEO & Managing Director",
      description:
        "Leads innovation-led marketing architecture and oversees project execution & partnerships.",
      image: "/assets/ShamSK.webp",
      hoverImage: "/assets/ShamSK.webp",
    },
  ],
  finance: [
    {
      name: "Keerthana",
      role: "Accountant",
      image:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/uytbxoupcmslyxf74fzd.png",
      hoverImage:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/uytbxoupcmslyxf74fzd.png",
      description:
        "Oversees budgeting, ledger management, and financial statements to support business decisions.",
    },
  ],
  strategyMarketing: [
    {
      name: "Hajira",
      role: "Administration & CMO",
      description: "Ensures flawless daily operations and inter-department workflow excellence.",
      image:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/SB_ID_Card_Hajira_lrmfvk.png",
      hoverImage: "/assets/hajira.webp",
    },
    {
      name: "Rachel Susan oommen",
      role: "HR Asst",
      image:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/af8xbvarrsehbzcxjylq.jpg",
      hoverImage:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/af8xbvarrsehbzcxjylq.jpg",
      description:
        "Detail-oriented HR Assistant experienced in administrative support, onboarding, and employee coordination",
    },
  ],
  technology: [
    {
      name: "Elizebath Thomas",
      role: "Senior Web Developer",
      image:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/team5_zlamx7.webp",
      hoverImage: "/assets/elizebath.webp",
      description: "Builds React-based digital infrastructure & API integrations for automation.",
    },
    {
      name: "Reshma Vijayan",
      role: "Web Developer",
      hoverImage:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/w4eogtldwfqtsoxl94tl.jpg",
      image:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/w4eogtldwfqtsoxl94tl.jpg",
      description:
        "Web Developer skilled in developing reliable, responsive, and visually appealing websites",
    },
    {
      name: "Hasna",
      role: "Asst Web Developer",
      hoverImage:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/p6piwfsx26mqv3vd6eoz.png",
      image:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/p6piwfsx26mqv3vd6eoz.png",
      description: "Engineering modern ecosystems with intelligent API-driven automation.",
    },
  ],
  exemployee: [
    {
      name: "Sherin Joseph",
      role: "COO & HR",
      image:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/SB_ID_Card_Sherin_New_wtgfyo.png",
    },
    
    {
      name: "Mohammed Shereef",
      role: "PMO",
      image:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/wodx1jeooonrc8yi0fib.jpg",
    },
    {
      name: "Amal",
      role: "Digital Marketer",
      image:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/nd8whdzhbwwsqzjhhfaj.jpg",
    },
    
    {
      name: "Gino Abraham",
      role: "Cinematographer",
      image:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/ID_Card_gino-01_vmxq5p.jpg",
    },
    {
      name: "Taijo John",
      role: "Graphic Designer",
      image:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/SB_ID_Card_Taijo_New_1_-1_eb0ygm.jpg",
    },
    {
      name: "Joseph",
      role: "Video Editor",
      image:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/fnzkzrdkb3f8cli8583p.png",
    },
    {
      name: "Aneek",
      role: "Performance Marketing Team Head",
      image:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/bsa5x1ay2qrdoryvxaty.png",
    },
    {
      name: "Anjay Ramesh",
      role: "Content Writer & Production Lead",
      image:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/SB_ID_Card_Anjay_New_bbobhw.png",
    },
    {
      name: "Afnas N",
      role: "Cinematographer",
      image:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/kuktmap7exgze81z2afh.png",
    },
    {
      name: "Gowri Pradeep",
      role: "Creative Director",
      image:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/ID_Card_all_Team-15_1_tajdxo.jpg",
    },
    {
      name: "Muhasin",
      role: "SEO Specialist and Performance Marketer",
      image:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/iy29fzregdmfohgjc3pr.jpg",
    },
  ],
};
  const data = propData || staticTeamData;
  return (
    <div className="bg-[#0B0B0B] px-6 md:px-24 pb-10">
      <Section title="Leadership Team" data={data.leadership} />
      <Section title="Strategy & Marketing Division" data={data.strategyMarketing} />
      <Section title="Finance Division" data={data.finance} />
      {/* <Section title="Content & Production Department" data={data.contentProduction} /> */}
      <Section title="Technology & Development" data={data.technology} />
      <ExEmployeeSection data={data.exemployee} />

      <div className="mt-20 max-w-5xl mx-auto text-center">
        <p className="font-light opacity-90 text-lg text-white">
          Together, this team powers{" "}
          <a style={{ fontFamily: "MyFont, sans-serif" }} href="https://socialbureau.in">
            Social<span className="text-[#ff0000]">B</span>ureau
          </a>
          's mission, to redefine API Marketing, Performance Marketing, and Data-Driven Content Creation for the new era of global business growth.
        </p>
        <Link
          to="/careers"
          className="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default TeamSection;

