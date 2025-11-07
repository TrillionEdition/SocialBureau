import React from "react";
import { Link } from "react-router-dom";

export const teamData = {
  leadership: [
    {
      name: "Alen Jacob",
      link: "https://www.linkedin.com/in/alen-jacob-695a99184",
      role: "Managing Director",
      description:
        "Visionary leader driving SocialBureau’s automation-first, API-powered marketing approach.",
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
    {
      name: "Hajira",
      link: "https://www.linkedin.com/in/hajira-mohammed-10005b335",
      role: "Administration & Operations Head",
      description:
        "Ensures flawless daily operations and inter-department workflow excellence.",
      image: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1761221472/images/btrvj8lxwc3la4xli6es.png",
      hoverImage: "/assets/hajira.webp",
    },
  ],

  strategyMarketing: [
    {
      name: "Sherin Joseph",
      role: "CMO & HR Head",
      image: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1761195483/SB_ID_Card_Sherin_New_wtgfyo.png",
      hoverImage: "/assets/sherin.webp",
      description:
        "Drives talent acquisition & creative alignment ensuring brand consistency.",
    },
    {
      name: "Aneek",
      role: "Performance Marketing Team Head",
      image: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1761281558/images/bsa5x1ay2qrdoryvxaty.png",
      hoverImage: "/assets/aneek.webp",
      description:
        "Leads paid media & performance strategies across global ad ecosystems.",
    },
    // {
    //   name: "Joshwa",
    //   role: "Performance Marketer",
    //   image: "/assets/joshwa.webp",
    //   hoverImage: "/assets/joshwa.webp",
    //   description:
    //     "Media buying, retargeting, and analytics-driven funnel strategy expert.",
    // },
    // {
    //   name: "Shadhil",
    //   role: "Digital Marketing & SEO Intern",
    //   image: "/assets/shadhil.webp",
    //   hoverImage: "/assets/shadhil.webp",
    //   description:
    //     "Supports keyword research, analytics tracking, and campaign reporting.",
    // },
  ],

  contentProduction: [
    {
      name: "Anjay Ramesh",
      role: "Content Writer & Production Lead",
      image: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1761195484/SB_ID_Card_Anjay_New_bbobhw.png",
      hoverImage: "/assets/anjay.webp",
      description:
        "Leads content pipeline — from idea to execution to performance analytics.",
    },
    {
      name: "Afnas N",
      role: "Cinematographer",
      image: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1761030913/images/kuktmap7exgze81z2afh.png",
      hoverImage: "/assets/afnas.webp",
      description:
        "Responsible for visual direction on shoots using Sony A7M4 + DJI systems.",
    },
    // {
    //   name: "Taijo",
    //   role: "Graphic Designer",
    //   image: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1762493545/SB_ID_Card_Taijo_New_1_-1_eb0ygm.jpg",
    //   hoverImage: "/assets/taijo.webp",
    //   description:
    //     "Creates visual experiences that improve clarity, recall, and conversion.",
    // },
    // {
    //   name: "Joseph",
    //   role: "Video Editor",
    //   image: "/assets/joseph.webp",
    //   hoverImage: "/assets/joseph.webp",
    //   description:
    //     "Narrative-driven editor skilled in 4K workflows, color grading, and motion.",
    // },
  ],

  technology: [
    {
      name: "Elizebath Thomas",
      role: "Senior Web Developer",
      image: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1762493913/team5_zlamx7.webp",
      hoverImage: "/assets/elizebath.webp",
      description:
        "Builds React-based digital infrastructure & API integrations for automation.",
    },
  ],
};

const TeamCard = ({ name, role, image, hoverImage, link, description }) => (
  <a
    href={`/${encodeURIComponent(name)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative w-72 sm:w-80 h-[430px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
  >
    {/* Image Transition */}
    <div className="absolute inset-0">
      <img
        src={image}
        alt={name}
        className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-0"
      />
      {hoverImage && (
        <img
          src={image}
          alt="Hover"
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110"
        />
      )}
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

const TeamSection = () => (
  <div className="bg-[#0B0B0B] px-6 md:px-24 pb-10">

    <Section title="Leadership Team" data={teamData.leadership} />
    <Section title="Strategy & Marketing Division" data={teamData.strategyMarketing} />
    <Section title="Content & Production Department" data={teamData.contentProduction} />
    {/* <Section title="Technology & Development" data={teamData.technology} /> */}
    <p className="mt-20 font-light opacity-90 text-lg max-w-5xl mx-auto text-white text-center">
      Together, this team powers <span style={{ fontFamily: "MyFont, sans-serif" }}>
              Social<span className="text-[#ff0000]">B</span>ureau
            </span>’s mission, to redefine API Marketing, Performance Marketing, and Data-Driven Content Creation for the new era of global business growth.
    </p>
  </div>
);

export default TeamSection;