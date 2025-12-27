import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
export default function Landing() {
  return (
    <div className="bg-[#0b0d10] text-white">
      <Navbar/>
      <HeroEditorial />
      <SplitFeature />
      <MobileCard />     
      <LatestBlogs /> 
      <GradientFeatures />
      <ContactUsForm/>
      <Footer/>
    </div>
  );
}

function HeroEditorial() {
  return (
    <section className="relative min-h-screen bg-[#f5f4f0] text-black overflow-hidden">

      {/* TOP LEFT BRAND */}
      <div className="absolute top-10 left-10 z-20">
        <h3 className="text-3xl font-bold tracking-wide">Looplogik</h3>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 px-6 lg:px-10 py-24">

        {/* LEFT CONTENT */}
        <div className="relative flex flex-col justify-center z-10">
          <span
            className="
              absolute -left-10 top-1/2 -translate-y-1/2
              text-[120px] lg:text-[160px]
              font-serif text-black/5
              select-none pointer-events-none
            "
          >
            RANJITH
          </span>

          <h1 className="relative text-[48px] lg:text-[64px] font-serif leading-tight">
            <span
              className="absolute inset-0 text-white blur-xl opacity-70"
              aria-hidden="true"
            >
              RANJITH
            </span>
            <span className="relative">RANJITH</span>
          </h1>

          <p className="mt-6 text-gray-600 max-w-md">
            Communication designer working across writing, photography,
            audio-visual, print and digital media to craft meaningful narratives.
          </p>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex flex-col items-center lg:items-end">

          {/* IMAGE */}
          <img
            src="./assets/dp3.jpg"
            className= "w-full max-h-[70vh] lg:max-h-[900px] object-contain lg:object-cover"
            alt="Sham"
          />

          {/* DESKTOP OVERLAY TEXT */}
          <p
          className="
            hidden lg:block
            absolute bottom-20 right-12 max-w-xs
            text-white text-md leading-relaxed opacity-90
          "
        >
          Looplogik is a communication design practice integrating
          words, images, sound and structure to create effective
          communication solutions across media.
        </p>
        </div>

        {/* MOBILE TEXT — BELOW IMAGE */}
        <p
          className="
            lg:hidden mt-6
            text-gray-700 text-sm leading-relaxed
            text-center px-6 
          "
        >
          A communication design practice focused on storytelling
          through writing, photography and multi-media platforms.
        </p>

      </div>
    </section>
  );
}

function SplitFeature() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[720px]">

        {/* LEFT IMAGE */}
        <div className="relative">
          <img
            src="./assets/dp2.jpg"
            alt="Ranjith Chettur"
            className="h-full w-full object-cover grayscale"
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="relative flex items-center">

          {/* SHARP V CUT PANEL */}
          <div
            className="
              absolute inset-0 bg-[#f1f3f5]
              [clip-path:polygon(0_0,88%_0,100%_50%,88%_100%,0_100%)]
            "
          />

          {/* CONTENT */}
          <div className="relative z-10 pl-20 pr-24 max-w-sm">
            <p className="text-xs pt-6 uppercase tracking-widest text-gray-500 mb-3">
              About the Practice
            </p>

            <h3 className="text-4xl font-serif leading-tight mb-4 text-gray-900">
              Looplogik <br /> Communication Design
            </h3>

            <p className="text-xs text-gray-500 mb-6">
              Established 2010 · 15+ Years Experience
            </p>

            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              Looplogik is a communication design practice working across
              audio-visual, print, social media and web-based platforms.
              The studio integrates writing, photography, video and sonic
              design to create clear and effective communication solutions.
            </p>

            <p className="italic text-gray-800 text-sm leading-relaxed pb-9">
              “An eclectic practice shaped by cinema, literature, music
              and the performing arts.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const cards = [
  { img: "/assets/p4.jpg", title: "AUDIO-VISUAL PROJECTS ", link: "https://www.jumpcutpictures.in" },
  { img: "/assets/p1.jpg", title: "PRINT AND SOCIAL MEDIA", link: "https://looplogik.wordpress.com/2025/07/19/the-best-things-in-life-are-free-2" },
  { img: "/assets/p5.jpg", title: "TEXTUAL PROJECTS", link: "https://looplogik.wordpress.com/2025/06/25/fauna-of-mirrors" },
];

function MobileCard() {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(null);

  const sectionRef = useRef(null);
  const handleCardClick = (link) => {
  if (link.startsWith("http")) {
    window.open(link, "_blank"); // external
  } else {
    navigate(link); // internal
  }
};


  // 🔁 Expand / collapse based on visibility (repeatable)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.8) {
          setExpanded(true);
        } else {
          setExpanded(false);
        }
      },
      {
        threshold: [0, 0.8, 1],
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">

        {/* HEADING */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-12 text-white">
          Explore Our Work
        </h2>
{/* MOBILE STACK — EDITORIAL */}
<div className="sm:hidden w-full space-y-20">

  {cards.map((card, index) => (
    <div
      key={index}
      onClick={() => handleCardClick(card.link)}
      className="group relative w-full max-w-[360px] mx-auto cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative h-[420px] rounded-[28px] overflow-hidden">
        <img
          src={card.img}
          alt={card.title}
          className="
            w-full h-full object-cover
            transition-transform duration-700
            group-active:scale-105
          "
        />

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* INDEX */}
        <span className="absolute top-6 left-6 text-xs text-white/50 tracking-widest">
          0{index + 1}
        </span>

        {/* TEXT */}
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <p className="text-xs uppercase tracking-widest text-white/60 mb-2">
            Featured Work
          </p>
          <h3 className="text-2xl font-serif leading-tight">
            {card.title}
          </h3>
        </div>
      </div>

      {/* DIVIDER */}
      {index !== cards.length - 1 && (
        <div className="w-px h-16 bg-white/10 mx-auto mt-10" />
      )}
    </div>
  ))}

</div>


{/* DESKTOP */}
<div className="relative w-[520px] h-[420px] hidden sm:block [perspective:1600px]">
  {cards.map((card, index) => {
    const isHovered = hovered === index;

    return (
      <div
        key={index}
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        onClick={() => handleCardClick(card.link)}
        className={`
          group absolute top-1/2 left-1/2
          w-[300px] h-[380px]
          -translate-x-1/2 -translate-y-1/2
          cursor-pointer
          [transform-style:preserve-3d]

          transition-all duration-700
          [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

          ${!expanded && index === 0 && "z-30 translate-y-[-48%]"}
          ${!expanded && index === 1 && "z-20 translate-y-[-38%] scale-[0.96] opacity-90"}
          ${!expanded && index === 2 && "z-10 translate-y-[-28%] scale-[0.92] opacity-80"}

          ${expanded && index === 0 && "-translate-x-[140%] rotate-y-[35deg] z-40"}
          ${expanded && index === 1 && "translate-x-[0%] rotate-y-[20deg] z-30"}
          ${expanded && index === 2 && "translate-x-[140%] rotate-y-[25deg] z-10"}

          ${isHovered && "scale-[1.06] rotate-y-0 z-50"}
        `}
      >
        {/* IMAGE */}
        <div className="relative w-full h-full rounded-[24px] overflow-hidden shadow-2xl">
          <img
            src={card.img}
            alt={card.title}
            className="
              w-full h-full object-cover
              transition-transform duration-700
              group-hover:scale-110
            "
          />

          {/* DARK GRADIENT */}
          <div className="
            absolute inset-0
            bg-gradient-to-t from-black/80 via-black/30 to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
          " />

          {/* EDITORIAL TEXT */}
          <div className="
            absolute bottom-8 left-8 right-8
            text-white
            opacity-0 translate-y-6
            group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-500
          ">
            <p className="text-xs uppercase tracking-widest text-white/60 mb-2">
              Featured Work
            </p>
            <h3 className="text-2xl font-serif leading-tight">
              {card.title}
            </h3>
          </div>
        </div>
      </div>
    );
  })}
</div>


      </div>
    </section>
  );
}


const blogs = [
  {
    id: 1,
    title: "The Science of Color Contrast",
    category: "UI Interface",
    image: "/assets/p2.jpg",
    link: "/blog/color-contrast",
  },
  {
    id: 2,
    title: "Design Systems That Scale",
    category: "UI Interface",
    image: "/assets/p5.jpg",
    link: "/blog/design-systems",
  },
  {
    id: 3,
    title: "Mobile UX Best Practices",
    category: "UI Interface",
    image: "/assets/p8.jpg",
    link: "/blog/mobile-ux",
  },
];

function LatestBlogs() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white text-black">
      <div className="max-w-7xl mx-auto px-10">
        <h2 className="text-3xl mb-10">Our Latest Blogs</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => navigate(blog.link)}
              className="
                border rounded-xl overflow-hidden
                cursor-pointer group
                transition-transform duration-300
                hover:-translate-y-2 hover:shadow-xl
              "
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <p className="text-sm text-gray-500">
                  {blog.category}
                </p>

                <h4 className="mt-2 font-medium group-hover:underline">
                  {blog.title}
                </h4>

                <span className="mt-4 inline-block text-sm underline">
                  Read Blog →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Mail, User, MessageSquare, Send } from "lucide-react";

function ContactUsForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">

        {/* UNIFIED CONTAINER */}
        <div className="
          relative grid grid-cols-1 lg:grid-cols-2
          rounded-[36px] overflow-hidden
          border border-white/10
          bg-[#0e1014]
        ">

          {/* IMAGE PANEL */}
          <div className="relative h-[420px] lg:h-auto">
            <img
              src="/assets/p10.jpg"
              alt="Contact"
              className="w-full h-full object-cover"
            />

            {/* DARK GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/40 to-black/70" />

            {/* IMAGE TEXT */}
            <div className="absolute bottom-10 left-10 max-w-sm text-white">
              <p className="text-xs uppercase tracking-widest text-white/60 mb-3">
                Contact
              </p>
              <h3 className="text-3xl font-serif leading-tight">
                Let’s start a conversation.
              </h3>
            </div>
          </div>

          {/* FORM PANEL */}
          <div className="relative p-10 lg:p-16 flex items-center">
            <div className="
              w-full max-w-md
              bg-white/5 backdrop-blur-xl
              rounded-[28px] p-8
              border border-white/10
            ">

              <h2 className="text-xl font-semibold text-white mb-2">
                Contact Us
              </h2>
              <p className="text-sm text-white/60 mb-6">
                Tell us about your project
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/40"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/40"
                />

                <textarea
                  name="message"
                  rows={4}
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/40 resize-none"
                />

                <button
                  type="submit"
                  className="w-full bg-green-500 text-black rounded-xl py-2.5 text-sm font-medium hover:bg-green-400 transition"
                >
                  Send Message
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function GradientFeatures() {
  return (
    <section className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-10">
        <h2 className="text-4xl font-semibold mb-4">
          Services We Provide
        </h2>
        <p className="text-white/60 max-w-2xl mb-16">
          An integrated communication design practice spanning audio-visual,
          print, social media, and web-based experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <GradientCard
            title="Audio-visual"
            description={[
              "Advertising, documentary & feature films",
              "Augmented & virtual reality",
              "Multi-media productions",
              "Scripts, production & post-production",
              "Production support",
            ]}
            cta="Jumpcut Pictures →"
            link="https://www.jumpcutpictures.in"
            glow="orange"
          />

          <GradientCard
            title="Print & Social Media"
            description={[
              "Advertising",
              "Corporate communications & marketing collateral",
              "Editorial content",
              "Conceptual backbone",
              "Static posts, reels & blogs",
            ]}
            cta="View Work Samples →"
            link="https://looplogik.wordpress.com/2025/07/20/work-samples-2"
            glow="blue"
          />

          <GradientCard
            title="Websites"
            description={[
              "Interface design",
              "Hosting & maintenance",
              "Textual information architecture",
              "Content-driven web experiences",
            ]}
            cta="Explore Projects →"
            link="https://looplogik.wordpress.com/2025/07/24/kerala-literature-festival-website-2/"
            glow="green"
          />
        </div>
      </div>
    </section>
  );
}

function GradientCard({ title, description, cta, link, glow }) {
  const glowMap = {
    orange: "from-orange-500 via-orange-400 to-yellow-400",
    blue: "from-blue-500 via-indigo-500 to-cyan-400",
    green: "from-emerald-500 via-green-400 to-lime-400",
  };

  return (
    <div
      className="
        relative rounded-[28px] p-8
        bg-white/5 backdrop-blur-2xl
        border border-white/10
        shadow-[0_0_60px_rgba(0,0,0,0.8)]
        overflow-hidden
        transition-all duration-500
        hover:-translate-y-2
      "
    >
      {/* INNER GLASS HIGHLIGHT */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent pointer-events-none" />

      {/* BOTTOM NEON GLOW */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-r ${glowMap[glow]} blur-2xl opacity-80`}
      />

      {/* CONTENT */}
      <div className="relative z-10">
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>

        <ul className="space-y-2 text-sm text-white/70 mb-6">
          {description.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>

        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-white/80 hover:text-white transition"
        >
          {cta}
        </a>
      </div>
    </div>
  );
}
