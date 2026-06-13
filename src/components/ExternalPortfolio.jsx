import { useState, useEffect, useRef } from "react";
import Footer from '../components/Footer'
import TreasureHuntDiamond from '../components/TreasureHuntDiamond'
import { Mail, User, MessageSquare, Send, Linkedin, Instagram, Play } from "lucide-react";
export default function Landing() {
  return (
    <div className="bg-[#0b0d10] text-white">
      <HeroEditorial />
      <GradientFeatures />
      {/* <SplitFeature /> */}
      <MobileCard />
      <LatestBlogs />
      <TreasureHuntDiamond 
          stepRequired={3} 
          clueText="The next piece of the puzzle may be hiding among our latest thoughts." 
        />
      {/* <GradientFeatures /> */}
      <LatestWebsite />
      <YoutubeVideoSection />
      <ContactUsForm />
    </div>
  );
}

function HeroEditorial() {
  return (
    <section className="relative min-h-screen bg-[#f5f4f0] text-black overflow-hidden">

      {/* TOP LEFT BRAND */}
      <div className="
        absolute z-20
        top-4 left-4
        sm:top-6 sm:left-6
        lg:top-10 lg:left-10
      ">
        <a
          href="https://www.jumpcutpictures.in/print-gallery.html#portfolio"
          className="
    text-lg sm:text-xl lg:text-3xl
    font-bold tracking-wide
    mx-0 sm:mx-4 lg:mx- px-5
    hover:underline
  "
        >
          Looplogik
        </a>
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
            RANJIT CHETTUR
          </span>

          <h1 className="relative text-[48px] lg:text-[64px] font-serif leading-tight">
            <span
              className="absolute inset-0 text-white blur-xl opacity-70"
              aria-hidden="true"
            >
              RANJIT CHETTUR
            </span>
            <span className="relative">RANJIT CHETTUR</span>
          </h1>


          <p className="mt-6 text-gray-600 max-w-md">
            <span className="block font-medium text-gray-800">
              Principal Communication Design Consultant, <a
                href="https://www.jumpcutpictures.in/print-gallery.html#portfolio"
              >
                Looplogik
              </a>

            </span>
            Multi-disciplinary visual artist and communication designer based in
            Kochi, Kerala, with over three decades of experience across writing,
            photography, audio-visual, print and digital media.
          </p>

          <p className="mt-3 text-gray-600 max-w-md text-sm">
            We are an eclectic bunch at <a
              href="https://www.jumpcutpictures.in/print-gallery.html#portfolio"
            >
              Looplogik
            </a>, bringing diverse creative perspectives to every project.
          </p>

          <p className="mt-3 text-xs uppercase tracking-widest text-gray-500">
            Established 2007 | 30+ Years Professional Experience
          </p>

          {/* SOCIAL LINKS */}
          <div className="mt-8 flex items-center gap-2 p-4">
            <a
              href="https://www.linkedin.com/in/ranjit-chettur"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group flex items-center gap-2
                text-xs uppercase tracking-widest
                text-gray-600 hover:text-black
                transition
              "
            >
              <Linkedin className="w-4 h-4" />
              <span className="relative">
                <span className="
                  absolute left-0 -bottom-1
                  w-0 h-[1px] bg-black
                  group-hover:w-full
                  transition-all duration-300
                " />
              </span>
            </a>

            <span className="h-4 w-px bg-gray-300" />

            <a
              href="https://instagram.com/chetturranjit"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group flex items-center gap-2
                text-xs uppercase tracking-widest
                text-gray-600 hover:text-black
                transition
              "
            >
              <Instagram className="w-4 h-4" />
              <span className="relative">
                <span className="
                  absolute left-0 -bottom-1
                  w-0 h-[1px] bg-black
                  group-hover:w-full
                  transition-all duration-300
                " />
              </span>
            </a>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative flex flex-col items-center lg:items-end">
          <img
            src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/dp3_jscnpp.jpg"
            className="w-full max-h-[70vh] lg:max-h-[900px] object-contain lg:object-cover"
            alt="Looplogik"
          />

          {/* Desktop-only overlay */}
          <p className="
    hidden lg:block
    absolute bottom-20 right-12 max-w-xs
    text-white text-sm leading-relaxed opacity-90 italic
  ">
            "A practice shaped by deep visual literacy, narrative thinking,
            and hands-on experience across media bringing together influences
            from cinema, photography, literature, music and performing arts."
          </p>
        </div>

        {/* Mobile-only text (placed outside image container) */}
        <p className="
  lg:hidden mt-6
  text-gray-700 text-sm leading-relaxed text-center px-6 italic
">
          "A practice shaped by deep visual literacy, narrative thinking,
          and hands-on experience across media bringing together influences
          from cinema, photography, literature, music and performing arts."
        </p>
      </div>
    </section>
  );
}

const cards = [
  { img: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/stone_tkleic.webp", title: "Work samples", link: "https://looplogik.wordpress.com/2025/07/20/work-samples-2" },
  { img: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/happy_k6bfsg.jpg", title: "The best things in life are free", link: "https://looplogik.wordpress.com/2025/07/19/the-best-things-in-life-are-free-2" },
  { img: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/workout_jcqzvd.webp", title: "D1 FORTIFICATION -social media", link: "https://looplogik.wordpress.com/2025/07/19/d1-fortification-social-media-2" },
];

function MobileCard() {
  const [scrollExpanded, setScrollExpanded] = useState(false);
  const [manualExpand, setManualExpand] = useState(false);
  const [hovered, setHovered] = useState(null);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  // Scroll-triggered expand
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.8) {
          setScrollExpanded(true);
        } else if (!manualExpand) {
          setScrollExpanded(false);
        }
      },
      { threshold: [0, 0.8, 1] }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [manualExpand]);

  const expanded = scrollExpanded || manualExpand;

  const handleCardClick = (link) => {
    setManualExpand(true);
    setTimeout(() => {
      if (link.startsWith("http")) {
        window.open(link, "_blank");
      }
    }, 150);
  };

  const handleContainerLeave = () => {
    setHovered(null);
    setManualExpand(false);
  };

  return (
    <section ref={sectionRef} className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center" id="print-n-social">

        <h2 className="text-xl sm:text-2xl font-semibold mb-12 text-white">
          PRINT AND SOCIAL MEDIA
        </h2>

        {/* MOBILE */}
        <div className="sm:hidden w-full space-y-20">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(card.link)}
              className="group relative w-full max-w-[360px] mx-auto cursor-pointer"
            >
              <div className="relative h-[420px] rounded-[28px] overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-active:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <span className="absolute top-6 left-6 text-xs text-white/50 tracking-widest">
                  0{index + 1}
                </span>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="text-xs uppercase tracking-widest text-white/60 mb-2">Featured Work</p>
                  <h3 className="text-2xl font-serif leading-tight">{card.title}</h3>
                </div>
              </div>
              {index !== cards.length - 1 && (
                <div className="w-px h-16 bg-white/10 mx-auto mt-10" />
              )}
            </div>
          ))}
        </div>

        {/* DESKTOP - WITH CONNECTING BACKGROUND LAYER */}
        <div
          ref={containerRef}
          onMouseLeave={handleContainerLeave}
          className={`
            hidden sm:flex relative w-full h-[520px] items-center justify-center
            [perspective:1600px]
            transition-all duration-700
            mx-auto overflow-visible
          `}
        >
          {/* EXPANDING BACKGROUND LAYER - INVISIBLE HIT AREA */}
          <div
            className={`
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              rounded-[40px]
              transition-all duration-700
              [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
              pointer-events-none
              
              ${expanded ? 'w-[900px] h-[480px]' : 'w-[320px] h-[420px]'}
            `}
          />

          {/* CARDS CONTAINER - WIDER FOR BETTER SPACING */}
          <div className="relative w-[640px] h-[420px]">
            {cards.map((card, index) => {
              const isHovered = hovered === index;

              // Calculate positions for better visual balance
              const collapsedPositions = [
                "translate-x-[-48%]",  // Left-most card
                "translate-x-[-38%]",  // Middle card
                "translate-x-[-28%]",  // Right-most card
              ];

              const expandedPositions = [
                "translate-x-[-180%]", // Far left
                "translate-x-[-50%]",  // Center
                "translate-x-[80%]",   // Far right
              ];

              return (
                <div
                  key={index}
                  onMouseEnter={() => {
                    setHovered(index);
                    setManualExpand(true);
                  }}
                  onMouseLeave={() => {
                    setHovered(null);
                    // Don't immediately collapse - wait for container leave
                  }}
                  onClick={() => handleCardClick(card.link)}
                  className={`
                    group absolute top-1/2 left-1/2
                    w-[300px] h-[380px]
                    -translate-y-1/2
                    cursor-pointer
                    [transform-style:preserve-3d]
                    transition-all duration-700
                    [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
                    z-20

                    /* Collapsed state - staggered */
                    ${!expanded && collapsedPositions[index]}
                    ${!expanded && index === 0 && "translate-y-[-48%]"}
                    ${!expanded && index === 1 && "translate-y-[-38%] scale-[0.96] opacity-90"}
                    ${!expanded && index === 2 && "translate-y-[-28%] scale-[0.92] opacity-80"}

                    /* Expanded state - evenly spaced */
                    ${expanded && expandedPositions[index]}
                    ${expanded && "translate-y-[-50%] scale-100 opacity-100"}

                    /* Hover effects */
                    ${isHovered && "scale-[1.08] z-50"}
                    
                    /* Smooth hover transitions */
                    ${!isHovered && expanded && "hover:scale-[1.02] hover:z-30"}
                  `}
                >
                  <div className="relative w-full h-full rounded-[24px] overflow-hidden shadow-2xl shadow-black/50">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Card number - top left */}
                    <span className="absolute top-6 left-6 text-xs text-white/50 tracking-widest font-mono">
                      0{index + 1}
                    </span>

                    {/* Content overlay - always visible but enhanced on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="transform transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                        <p className="text-xs uppercase tracking-widest text-white/60 mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          Featured Work
                        </p>
                        <h3 className="text-2xl font-serif leading-tight opacity-90 group-hover:opacity-100 transition-opacity">
                          {card.title}
                        </h3>
                      </div>
                    </div>

                    {/* Hover indicator line */}
                    <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

const blogs = [
  {
    id: 1,
    title: "Fauna Of Mirrors",
    category: "UI Interface",
    image: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/fau_tlfwd0.jpg",
    link: "https://looplogik.wordpress.com/2025/06/25/fauna-of-mirrors",
  },
  {
    id: 2,
    title: "Lonesome and Blue",
    category: "UI Interface",
    image: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/alonely_ieyd8d.jpg",
    link: "https://looplogik.wordpress.com/2025/06/25/lonesome-and-blue",
  },
  {
    id: 3,
    title: "Swansong",
    category: "UI Interface",
    image: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/bird4_sbqrpw.jpg",
    link: "https://looplogik.wordpress.com/2025/06/25/swansong",
  },
  {
    id: 4,
    title: "About DC Kizhakemuri",
    category: "UI Interface",
    image: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/dcbooks_ocgxh4.png",
    link: "https://looplogik.wordpress.com/2025/04/09/about-dc-kizhakemuri-2",
  },
  {
    id: 5,
    title: "Ammu,Kunju and Pandi",
    category: "UI Interface",
    image: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/cow_eduajj.png",
    link: "https://looplogik.wordpress.com/2025/06/25/ammukunju-and-pandi",
  },
  {
    id: 6,
    title: "Kerala Literature Festival website",
    category: "UI Interface",
    image: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/klv_v04eik.png",
    link: "https://looplogik.wordpress.com/2025/07/24/kerala-literature-festival-website-2",
  },
  {
    id: 7,
    title: "Going Home",
    category: "UI Interface",
    image: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/home_amc5vk.jpg",
    link: "https://looplogik.wordpress.com/2025/06/25/going-home-2",
  },
  {
    id: 8,
    title: "Historical consequences of maritime trade in Kochi",
    category: "UI Interface",
    image: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/kochi1_hc2ymq.jpg",
    link: "https://looplogik.wordpress.com/2025/06/25/historical-consequences-of-maritime-trade-in-kochi",
  },
  {
    id: 9,
    title: "Backyard Musings- A life the world forgot",
    category: "UI Interface",
    image: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/yard_1_bgjdbk.webp",
    link: "https://looplogik.wordpress.com/2026/01/05/backyard-musings-a-life-the-world-forgot",
  }, {
    id: 10,
    title: "B.Arch – DC School of Architecture and Design",
    category: "UI Interface",
    image: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/dcschool_q8uxtf.webp",
    link: "https://looplogik.wordpress.com/2025/05/13/b-arch-dc-school-of-architecture-and-design-blog-post",
  },
  {
    id: 11,
    title: "Integrated Business Consultants – Brochure",
    category: "UI Interface",
    image: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/image-gen_7_g4ewu6.png",
    link: "https://looplogik.wordpress.com/2026/01/23/integrated-business-consultants-brochure",
  },
  {
    id: 12,
    title: "Flight",
    category: "UI Interface",
    image: "https://looplogik.wordpress.com/wp-content/uploads/2026/04/dsc_5812_col-jpg.jpg?w=768",
    link: "https://looplogik.wordpress.com/2026/04/11/flight",
  },
  {
    id: 13,
    title: "Fauna of Mirrors and other stories",
    category: "Uncategorized",
    image: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/fauna_x9veyg.webp",
    link: "https://looplogik.wordpress.com/2026/04/13/fauna-of-mirrors-and-other-stories-work-in-progress",
  },
  {
    id: 14,
    title: "Beyond Eco-Living- an excerpt",
    category: "Uncategorized",
    image: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/ChatGPT_Image_Apr_17_2026_04_27_00_PM_1_rkmruq.png",
    link: "https://looplogik.wordpress.com/2026/03/14/beyond-eco-living-an-excerpt",
  },
  {
    id: 15,
    title: "The Old Harbour Hotel / Better Interiors",
    category: "communication design",
    image: "https://looplogik.wordpress.com/wp-content/uploads/2026/05/mg_1363.jpg",
    link: "https://looplogik.wordpress.com/2026/05/23/the-old-harbour-hotel-better-interiors/",
  },
  {
    id: 14,
    title: "BKayaloram Lake Resort -The Mir Group",
    category: "Travel marketing collateral",
    image: "https://looplogik.wordpress.com/wp-content/uploads/2026/05/mg_4564-edit-x.jpg?w=1024",
    link: "https://looplogik.wordpress.com/2026/05/23/kayaloram-lake-resort-the-mir-group/",
  },
];

function LatestBlogs() {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const CARD_WIDTH = isMobile ? 300 : 320;
  const GAP = 16;
  const TOTAL_WIDTH = CARD_WIDTH + GAP;

  const scroll = (direction) => {
    let newIndex = currentIndex;

    if (direction === 'right') {
      newIndex = Math.min(currentIndex + 1, blogs.length - 1);
    } else {
      newIndex = Math.max(currentIndex - 1, 0);
    }

    setCurrentIndex(newIndex);

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: newIndex * TOTAL_WIDTH,
        behavior: "smooth",
      });
    }
  };

  const handleClick = (link) => {
    if (!link) return;
    window.open(link, "_blank");
  };

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < blogs.length - 1;

  return (
    <section className="py-16 sm:py-24 bg-white text-black">
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold">Textual & Editorial Projects</h2>

          {/* Desktop Buttons */}
          <div className="hidden sm:flex gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`
                flex items-center justify-center
                w-12 h-12 rounded-full
                border border-gray-300
                transition-all duration-300
                text-lg font-light
                ${canScrollLeft
                  ? 'hover:bg-black hover:text-white hover:border-black cursor-pointer'
                  : 'opacity-40 cursor-not-allowed'
                }
              `}
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`
                flex items-center justify-center
                w-12 h-12 rounded-full
                border border-gray-300
                transition-all duration-300
                text-lg font-light
                ${canScrollRight
                  ? 'hover:bg-black hover:text-white hover:border-black cursor-pointer'
                  : 'opacity-40 cursor-not-allowed'
                }
              `}
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>

        {/* SCROLLABLE CONTAINER */}
        <div
          ref={scrollRef}
          className="
            hide-scrollbar
            flex gap-4
            overflow-x-auto
            overflow-y-hidden
            scroll-smooth
            pb-4
          "
        >
          {[...blogs].reverse().map((blog) => (
            <article
              key={blog.id}
              onClick={() => handleClick(blog.link)}
              className="
                flex-shrink-0
                cursor-pointer
                group
                transition-all duration-300
              "
              style={{ width: CARD_WIDTH }}
            >
              {/* IMAGE */}
              <div className="relative h-[380px] rounded-2xl overflow-hidden bg-gray-200">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="
                    w-full h-full object-cover
                    group-hover:scale-110
                    transition-transform duration-500
                  "
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="380"%3E%3Crect fill="%23e5e7eb" width="320" height="380"/%3E%3C/svg%3E';
                  }}
                />
              </div>

              {/* TEXT */}
              <div className="mt-5">
                <h3 className="
                  text-lg font-serif font-semibold
                  leading-snug
                  line-clamp-2
                  group-hover:text-gray-700
                  transition-colors duration-300
                ">
                  {blog.title}
                </h3>

                {blog.link && (
                  <span className="
                    inline-block mt-3 text-sm text-gray-600
                    group-hover:text-black group-hover:underline
                    transition-all duration-300
                  ">
                    Read ↗
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* MOBILE SCROLL BUTTONS - Below Content */}
        {isMobile && (
          <div className="flex gap-3 justify-center sm:hidden">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`
                flex items-center justify-center
                w-12 h-12 rounded-full
                border border-gray-300
                transition-all duration-300
                text-lg font-light
                ${canScrollLeft
                  ? 'hover:bg-black hover:text-white hover:border-black cursor-pointer'
                  : 'opacity-40 cursor-not-allowed'
                }
              `}
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`
                flex items-center justify-center
                w-12 h-12 rounded-full
                border border-gray-300
                transition-all duration-300
                text-lg font-light
                ${canScrollRight
                  ? 'hover:bg-black hover:text-white hover:border-black cursor-pointer'
                  : 'opacity-40 cursor-not-allowed'
                }
              `}
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function LatestWebsite() {
  const web = [
    {
      id: 1,
      name: "DC Kizhakemuri Foundation",
      logo: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/dcbookslogo_rocnra.jpg",
      link: "https://dckf.in",
    },
    {
      id: 2,
      name: "DC Books",
      logo: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/cdd_pqfvbx.jpg",
      link: "https://dcbooks.com",
    },
    {
      id: 3,
      name: "Chandy's Drizzle Drops",
      logo: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/cwwm_xixzyh.jpg",
      link: "https://chandysdrizzledrops.com",
    },
    {
      id: 4,
      name: "Chandy's Windy Woods",
      logo: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/tpmunnar_tpuz59.png",
      link: "https://www.chandyswindywoods.com/overview.html",
    },
    {
      id: 5,
      name: "Planet Munnar",
      logo: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/gkozhi_wyulqa.png",
      link: "https://planetmunnar.com",
    },
    {
      id: 6,
      name: "Gokulam Grand Kozhikode",
      logo: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/gkozhi_wyulqa.png",
      link: "https://gokulamhotels.com/gokulam-grand-kozhikode",
    },
    {
      id: 7,
      name: "Gokulam Grand Kumarakom",
      logo: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/gk2_kua1lm.jpg",
      link: "https://gokulamhotels.com/gokulamgrandkumarakom",
    },
    {
      id: 8,
      name: "Gokulam Grand Trivandrum",
      logo: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/gotri1_heqmvf.png",
      link: "https://gokulamhotels.com/gokulamgrandtrivandrum",
    },
    {
      id: 9,
      name: "Beyond Eco-Living",
      logo: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/logo%20(2).png",
      link: "https://beyondecoliving.com/",
      logoClass: "max-h-16 sm:max-h-20"
    },
  ];

  return (
    <section className="bg-white py-28">
      <div className="max-w-6xl mx-auto px-6" id='web-copywriting'>

        {/* HEADING */}
        <h2 className="
        text-center
        text-4xl sm:text-5xl
        font-serif
        text-black
        mb-20
      ">
          Website Content
        </h2>

        {/* LOGO GRID */}
        <div className="
        grid grid-cols-2 sm:grid-cols-4
        gap-y-20 gap-x-16
        place-items-center
      ">
          {web.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="
              opacity-70
              hover:opacity-100
              transition-opacity duration-300
            "
            >
              <img
                src={item.logo}
                alt={item.name}
                className={`
                ${item.logoClass || 'max-h-24 sm:max-h-30'}
                w-auto object-contain
              `}
              />
            </a>
          ))}
        </div>

      </div>
    </section>
  );

}

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

    // Create WhatsApp message with all form details
    const whatsappMessage = `
New Project Inquiry - Looplogik Design Studio

 Client Details:
• Name: ${form.name}
• Email: ${form.email}

Project Requirements:
${form.message}

--- 
For: Ranjit Chettur
Design Studio: Looplogik
Location: Kochi, Kerala
Submitted via: Website Contact Form
    `.trim();

    // URL encode the message
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Open WhatsApp with the formatted message
    window.open(`https://wa.me/918714952665?text=${encodedMessage}`, "_blank");

    console.log("Form submitted:", form);

    // Reset form after submission
    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">

        {/* MAIN CONTAINER */}
        <div className="
          relative grid grid-cols-1 lg:grid-cols-2
          rounded-[36px] overflow-hidden
          border border-white/10
          bg-[#0e1014]
        ">

          {/* IMAGE PANEL */}
          <div className="relative h-[420px] lg:h-auto">
            <img
              src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/p10_sgwvkq.jpg"
              alt="Contact"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/40 to-black/70" />

            <div className="absolute bottom-10 left-10 max-w-sm text-white">
              <p className="text-xs uppercase tracking-widest text-white/60 mb-3">
                Contact
              </p>
              <h3 className="text-3xl font-serif leading-tight">
                Let's start a conversation.
              </h3>
            </div>
          </div>

          {/* FORM PANEL – FULL WIDTH */}
          <div className="relative p-10 lg:p-16 flex items-center">
            <div className="w-full">

              <h2 className="text-2xl font-semibold text-white mb-2">
                Contact Us
              </h2>
              <p className="text-sm text-white/60 mb-8">
                Tell us about your project and we'll connect you with Ranjit Chettur
              </p>

              <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />

                <textarea
                  name="message"
                  rows={5}
                  placeholder="Describe your project requirements..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 resize-none focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />

                {/* Single WhatsApp Button */}
                <button
                  type="submit"
                  className="
                    inline-flex items-center justify-center
                    bg-[#25D366] text-white
                    rounded-xl px-8 py-3
                    text-sm font-medium
                    hover:bg-[#128C7E] transition
                    w-full
                    gap-3
                  "
                >
                  Submit
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className="flex flex-row items-center gap-3 text-[9px] md:text-[11px] font-bold text-muted uppercase tracking-[0.2em] mt-6 justify-start w-full text-left">
          <span>POWERED BY</span>
          <a href="https://www.socialbureau.in/enquiry-form" target="_blank" rel="noopener noreferrer" className="flex justify-start items-center">
            <img
              src="https://www.socialbureau.in/assets/logo.webp"
              alt="SocialBureau"
              className="h-5 md:h-8 w-auto"
            />
          </a>
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
          My Work
        </h2>
        <p className="text-white/60 max-w-2xl mb-16">
          An integrated communication design practice spanning audio-visual,
          print, social media, and web-based experiences, aligning distinctive
          aesthetic solutions with client communication objectives.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <GradientCard
            title="Audio-visual"
            description={[
              "Advertising, documentary & feature films",
              "Augmented & virtual reality",
              "Multi-media productions",
              "Sonic design and audio production",
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
            link="#print-n-social"
            glow="blue"
          />

          <GradientCard
            title="Websites"
            description={[
              "Textual information architecture",
              "Website content writing & editing",
              "Content-driven web experiences",
              "Concept development & narrative structure",
              "Collaboration with design & development teams",
            ]}
            cta="Explore Projects →"
            link="#web-copywriting"
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
          className="text-sm font-medium text-white/80 hover:text-white transition"
        >
          {cta}
        </a>
      </div>
    </div>
  );
}


//video part

const extractVideoId = (url) => {
  if (!url) return null;

  // youtu.be short link
  if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1].split("?")[0];
  }

  // youtube watch
  if (url.includes("youtube.com/watch")) {
    return new URL(url).searchParams.get("v");
  }

  // youtube embed
  if (url.includes("youtube.com/embed/")) {
    return url.split("embed/")[1].split("?")[0];
  }

  // vimeo
  if (url.includes("vimeo.com/")) {
    return url.split("vimeo.com/")[1].split("?")[0];
  }

  return null;
};


const getEmbedUrl = (url) => {
  const id = extractVideoId(url);
  if (!id) return null;

  if (url.includes("vimeo")) {
    return `https://player.vimeo.com/video/${id}?controls=1`;
  }

  return `https://www.youtube.com/embed/${id}?controls=1&mute=0&playsinline=1`;
};

const getThumbnailUrl = (url, customThumbnail) => {
  const id = extractVideoId(url);
  if (!id) return null;

  // Use provided custom thumbnail first
  if (customThumbnail) return customThumbnail;

  if (url.includes("youtube") || url.includes("youtu.be")) {
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  }

  return `https://vumbnail.com/${id}.jpg`;
};

const videosData = [
  {
    id: 1,
    title: "Ramayana Patashala from Ranjit Chettur",
    youtubeId: "https://www.youtube.com/embed/516Ku0G_1EE?si=y433VXgwVukg9R5j",
    category: "Design Process",
    youtube_img: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/UtubeRanjith1_pb3tlt.webp",
  },
  {
    id: 2,
    title: "Breathe from  Chettur",
    youtubeId: "https://vimeo.com/1095219209?fl=pl&fe=vl",
    category: "Documentary",
    duration: "12:15",
  },
  {
    id: 3,
    title: "MAIYAS from Ranjit Chettur",
    youtubeId: "https://vimeo.com/910697374?fl=pl&fe=vl",
    category: "Testimonial",
    duration: "5:30",
  },
  {
    id: 4,
    title: "liquid ox jc fin from Ranjit Chettur",
    youtubeId: "https://vimeo.com/868754685?fl=pl&fe=vl",
    category: "Tutorial",
    duration: "15:20",
  },
  {
    id: 5,
    title: "The Tin Drummer cut 2.mov from Ranjit Chettur",
    youtubeId: "https://vimeo.com/331157293?fl=pl&fe=vl",
    category: "Documentary",
    duration: "10:45",
  },
  {
    id: 6,
    title: "Dance With Gravity from Ranjit Chettur",
    youtubeId: "https://vimeo.com/567127350?fl=pl&fe=vl",
    category: "Showcase",
    duration: "7:18",
  },
  {
    id: 7,
    title: "Origami from Ranjit Chettur",
    youtubeId: "https://vimeo.com/745219585?fl=pl&fe=vl",
    category: "Showcase",
    duration: "7:18",
  },
];

function YoutubeVideoSection() {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const CARD_WIDTH = isMobile ? 300 : 320;
  const GAP = 16;
  const TOTAL_WIDTH = CARD_WIDTH + GAP;

  const scroll = (direction) => {
    let newIndex = currentIndex;

    if (direction === 'right') {
      newIndex = Math.min(currentIndex + 1, videosData.length - 1);
    } else {
      newIndex = Math.max(currentIndex - 1, 0);
    }

    setCurrentIndex(newIndex);

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: newIndex * TOTAL_WIDTH,
        behavior: "smooth",
      });
    }
  };

  const handleVideoClick = (video) => {
    // Open video in new tab
    const url = video.youtubeId;
    if (url.includes('youtube') || url.includes('youtu.be')) {
      // Open YouTube video in new tab
      const id = extractVideoId(url);
      window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
    } else if (url.includes('vimeo')) {
      // Open Vimeo video in new tab
      const id = extractVideoId(url);
      window.open(`https://vimeo.com/${id}`, '_blank');
    } else {
      window.open(url, '_blank');
    }
  };

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < videosData.length - 1;

  return (
    <section className="py-32 bg-[#f5f4f0] text-black">
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER WITH SCROLL BUTTONS */}
        <div className="flex items-center justify-between mb-12 sm:mb-16">
          <div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold">
              Video Work
            </h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed mt-3 text-sm sm:text-base">
              Explore our audio-visual projects, design processes, and creative documentaries
            </p>
          </div>

          {/* Desktop Scroll Buttons */}
          <div className="hidden sm:flex gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`
                flex items-center justify-center
                w-12 h-12 rounded-full
                border border-gray-300
                transition-all duration-300
                text-lg font-light
                ${canScrollLeft
                  ? 'hover:bg-black hover:text-white hover:border-black cursor-pointer'
                  : 'opacity-40 cursor-not-allowed'
                }
              `}
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`
                flex items-center justify-center
                w-12 h-12 rounded-full
                border border-gray-300
                transition-all duration-300
                text-lg font-light
                ${canScrollRight
                  ? 'hover:bg-black hover:text-white hover:border-black cursor-pointer'
                  : 'opacity-40 cursor-not-allowed'
                }
              `}
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>

        {/* SCROLLABLE VIDEO CAROUSEL */}
        <div
          ref={scrollRef}
          className="
            hide-scrollbar
            flex gap-4
            overflow-x-auto
            overflow-y-hidden
            scroll-smooth
            pb-4
          "
        >
          {videosData.map((video) => (
            <article
              key={video.id}
              onClick={() => handleVideoClick(video)}
              className="
                flex-shrink-0
                cursor-pointer
                group
                transition-all duration-300
              "
              style={{ width: CARD_WIDTH }}
            >
              {/* THUMBNAIL */}
              <div className="relative h-[280px] rounded-2xl overflow-hidden bg-gray-300 mb-4">
                <img
                  src={getThumbnailUrl(video.youtubeId, video.youtube_img) || "/fallback.jpg"}
                  alt={video.title}
                  className="
                    w-full h-full object-cover
                    group-hover:scale-110
                    transition-transform duration-500
                  "
                  onError={(e) => {
                    const id = extractVideoId(video.youtubeId);
                    if ((video.youtubeId.includes("youtube") || video.youtubeId.includes("youtu.be")) && e.target.src.includes("maxresdefault")) {
                      e.target.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
                    } else if (video.youtubeId.includes("youtube") || video.youtubeId.includes("youtu.be")) {
                      e.target.src = `https://img.youtube.com/vi/${id}/default.jpg`;
                    } else {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="280"%3E%3Crect fill="%23999" width="320" height="280"/%3E%3C/svg%3E';
                    }
                  }}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play Button */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="
                    w-16 h-16 rounded-full
                    bg-white/20 backdrop-blur-md
                    border border-white/30
                    flex items-center justify-center
                    group-hover:bg-white/40
                    group-hover:scale-125
                    transition-all duration-300
                  ">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                </div>

                {/* Duration Badge */}
                {video.duration && (
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                    {video.duration}
                  </div>
                )}
              </div>

              {/* VIDEO INFO */}
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {video.category}
                </p>
                <h4 className="
                  text-base sm:text-lg font-serif font-semibold
                  text-gray-800 leading-snug
                  line-clamp-2
                  group-hover:text-gray-950
                  transition-colors duration-300
                ">
                  {video.title}
                </h4>
              </div>
            </article>
          ))}
        </div>

        {/* MOBILE SCROLL BUTTONS - Below Content */}
        {isMobile && (
          <div className="flex gap-3 justify-center mt-8 sm:hidden">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`
                flex items-center justify-center
                w-12 h-12 rounded-full
                border border-gray-300
                transition-all duration-300
                text-lg font-light
                ${canScrollLeft
                  ? 'hover:bg-black hover:text-white hover:border-black cursor-pointer'
                  : 'opacity-40 cursor-not-allowed'
                }
              `}
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`
                flex items-center justify-center
                w-12 h-12 rounded-full
                border border-gray-300
                transition-all duration-300
                text-lg font-light
                ${canScrollRight
                  ? 'hover:bg-black hover:text-white hover:border-black cursor-pointer'
                  : 'opacity-40 cursor-not-allowed'
                }
              `}
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        )}

      </div>
    </section>
  );
}


