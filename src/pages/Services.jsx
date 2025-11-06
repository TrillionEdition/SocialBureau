import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import ServicesHeader from '../components/ServicesHeader'
import ServicesList from '../components/ServicesList'
import ServiceFooter from '../components/ServiceFooter'
import Footer from '../components/Footer'
import Ser from '../components/ViewServices'
import Liquid from '../components/Liquid'
import { motion } from "framer-motion";
import { FaBrain, FaShapes, FaCogs } from "react-icons/fa"; // Icons
import Seo from '../components/Seo'

export const Services = () => {
    const listRef = useRef(null);

  // Scroll to the list section
  const handleArrowClick = () => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial state
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const services = [
    {
      id: 1,
      title: "Branding",
      icon: <FaShapes className="text-4xl" />,
      intro:
        "Your brand is more than a logo — it’s your language, tone, color logic, and content DNA.",
      description:
        "We combine psychology, design systems, and data to create brand identities that perform across every platform.",
      list: [
        "Brand Strategy & Positioning",
        "Visual Identity Design (Logo, Color, Typography)",
        "Brand Voice & Messaging Framework",
        "Rebranding & Brand Audits",
        "Marketing Collateral Design",
        "Product Launch Branding",
        "Brand Asset Management",
      ],
      cta: "Explore Branding",
      bgFrom: "from-[rgba(99,102,241,0.24)]",
      bgTo: "to-[rgba(236,72,153,0.18)]",
      seoKeywords:
        "branding agency india, socialbureau branding, brand identity design, visual branding, brand strategy, rebranding, brand guidelines, logo design, brand positioning, digital brand presence",
    },

    {
      id: 2,
      title: "Experience Design (XD)",
      icon: <FaBrain className="text-4xl" />,
      intro:
        "Your user experience isn’t just visual — it’s emotional, behavioral, and algorithmic.",
      description:
        "We design digital environments that align with user intent, platform behavior, and business goals.",
      list: [
        "UI/UX Strategy & Prototyping",
        "Web & Mobile Interface Design",
        "Conversion Rate Optimization (CRO)",
        "Interactive Content & Micro Animations",
        "Creative Motion Design for Ads",
        "Customer Journey Mapping",
        "Human-Algorithm Experience Integration (HAEI™)",
      ],
      cta: "See Our Designs",
      bgFrom: "from-[rgba(236,72,153,0.18)]",
      bgTo: "to-[rgba(34,211,238,0.12)]",
      seoKeywords:
        "experience design, ui ux design agency, xd design, conversion optimization, website experience design, human centered design, ux research, cro agency, digital experience, socialbureau design",
    },

    {
      id: 3,
      title: "Technology",
      icon: <FaCogs className="text-4xl" />,
      intro:
        "The future of marketing is technical — and SocialBureau is built on it.",
      description:
        "We build API marketing systems, automation tools, and digital platforms that make marketing measurable.",
      list: [
        "API Integration & Marketing Automation",
        "Web & App Development (React, Next.js, Node.js)",
        "CRM, Pixel, and Event Tracking Setup",
        "Custom Dashboard & Analytics Solutions",
        "Marketing API Connectors (Meta, Google, Taboola, etc.)",
        "AI & Data Automation Tools",
        "SEO Tech Architecture",
      ],
      cta: "View Tech Solutions",
      bgFrom: "from-[rgba(34,211,238,0.12)]",
      bgTo: "to-[rgba(99,102,241,0.24)]",
      seoKeywords:
        "marketing technology, api marketing, automation agency, socialbureau tech, marketing api integration, nextjs website agency, data tracking setup, crm integration, digital transformation, marketing dashboard",
    },
  ];
  return (
    <div>
      <Seo
        title="Global Marketing Services | API-Powered Marketing | SocialBureau Tech"
        description="We build brands, design digital experiences, and automate marketing using APIs and data systems."        
        keywords="branding agency india, socialbureau branding, brand identity design, visual branding, brand strategy, rebranding, brand guidelines, logo design, brand positioning, digital brand presence,
          experience design, ui ux design agency, xd design, conversion optimization, website experience design, human centered design, ux research, cro agency, digital experience, socialbureau design,
          marketing technology, api marketing, automation agency, socialbureau tech, marketing api integration, nextjs website agency, data tracking setup, crm integration, digital transformation, marketing dashboard"
        image="/assets/socialbureau.png"
        url="https://www.socialbureau.in/services"
      />

        <Navbar/>
      <ServicesHeader onArrowClick={handleArrowClick} />
      
      <section className="w-full bg-black text-white py-20 px-6 md:px-12 lg:px-24">
      <div className="text-center mb-16">
        <p className="text-sm uppercase tracking-widest text-gray-400">
          New Service Categories
        </p>
        <h2 className="text-4xl font-bold mt-2">
          Expand Your Growth. <span className="text-teal-400">The Right Way.</span>
        </h2>
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        {services.map((svc) => (
          <motion.div
            key={svc.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`rounded-3xl p-8 flex flex-col border border-gray-800 bg-gradient-to-br ${svc.bgFrom} ${svc.bgTo}`}
          >
            <div className="opacity-90 mb-5">{svc.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{svc.title}</h3>

            <p className="mb-4 text-gray-200">{svc.intro}</p>
            <p className="mb-6 text-gray-300 text-sm">{svc.description}</p>

            <ul className="space-y-2 text-sm text-gray-100">
              {svc.list.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-teal-300">•</span> {item}
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="mt-8 inline-block px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition font-semibold"
            >
              {svc.cta}
            </a>

            {/* SEO schema in DOM */}
            <div className="hidden" itemScope itemType="https://schema.org/Service">
              <meta itemProp="serviceType" content={svc.title} />
              <meta itemProp="description" content={svc.description} />
              <meta itemProp="keywords" content={svc.seoKeywords} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
    <Liquid/>
      {/* {isMobile ? (
                <ServicesList />
            ) : (
                <Ser/>
            )}

            {!isMobile && (
                <div className="other-desktop-elements">
                </div>
            )}
            {isMobile && (
                <div className="other-mobile-elements">
                </div>
            )} */}
      <ServiceFooter/>
      <Footer/>
    </div>
  )
}
