import React, { useState, useEffect } from "react";
import {
  Search,
  Share2,
  PenTool,
  MessageSquare,
  Video,
  ShoppingBag,
  ChevronRight,
  ArrowUp,
  Plus,
  X,
  CheckCircle,
  Target,
  RefreshCw,
  FileText,
  TrendingUp,
} from "lucide-react";
import Seo from "./Seo";
import { getOptimizedCloudinaryUrl } from "@/utils/cloudinary";

const ContentMarketing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);

  useEffect(() => {
    let rafId;
    const handleScroll = () => {
      const update = () => {
        setIsScrolled(window.scrollY > 50);

        // Update scroll progress bar
        const winScroll =
          document.body.scrollTop || document.documentElement.scrollTop;
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const progressBar = document.querySelector(".scroll-progress-bar");
        if (progressBar) {
          progressBar.style.transform = `scaleX(${winScroll / height})`;
        }
      };
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqItems = [
    {
      question: "How does content marketing support business growth?",
      answer:
        "Content marketing supports growth by helping businesses attract the right audience, educate them at different decision stages, and build long-term trust. When content aligns with user intent and search behavior, it creates a steady flow of qualified visitors who are more likely to convert over time.",
    },
    {
      question: "Is content marketing suitable for lead generation?",
      answer:
        "Yes. When content is planned with clear objectives, it becomes an effective lead-generation channel. Informational resources attract interest, while service-focused content helps guide users toward enquiries without relying on aggressive sales tactics.",
    },
    {
      question: "Do you offer website content creation?",
      answer:
        "We build website content systems that focus on clarity, structure, and relevance. Content is designed to help visitors understand services easily, build confidence, and move naturally toward taking action.",
    },
    {
      question: "How do you approach digital content creation?",
      answer:
        "Digital content creation starts with understanding the audience and the platforms they use. From there, content is planned, created, and refined to ensure it remains useful, consistent, and aligned with broader marketing goals.",
    },
    {
      question: "Can you support press announcements and updates?",
      answer:
        "Yes. Press-related content is developed to communicate key messages clearly while maintaining brand tone and credibility. The focus is on accuracy, structure, and relevance rather than promotional language.",
    },
    {
      question: "Do you create visual content as part of content marketing?",
      answer:
        "Visual formats are used to simplify information and improve engagement. These assets are planned to complement written content and support easier understanding across different platforms.",
    },
    {
      question: "What role does email play in content strategy?",
      answer:
        "Email helps maintain ongoing communication with audiences. It is used to share useful updates, educational resources, and relevant information that supports long-term relationships rather than one-time interactions.",
    },
    {
      question: "Is this approach suitable for professional brands?",
      answer:
        "Yes. Professional brands benefit from structured content that explains services clearly and builds trust over time. The focus is on credibility, consistency, and relevance instead of promotional messaging.",
    },
    {
      question: "How do you measure content performance?",
      answer:
        "Performance is measured using engagement signals, enquiry quality, and user behavior across content assets. These insights help guide improvements and ensure content continues to perform better over time.",
    },
    {
      question: "Do you work with companies across Kerala?",
      answer:
        "Yes. We support organizations across the region by developing content systems that scale with business needs and adapt to changing audience behavior.",
    },
  ];

  const services = [
    {
      icon: Search,
      title: "SEO Content Writing",
      description:
        "We create search-aligned narratives that improve discoverability while maintaining clarity, depth, and user-first readability across informational and commercial pages. This approach helps businesses build sustainable visibility without compromising quality.",
      features: [
        "Content mapped to search intent and topic depth",
        "Editorial standards aligned with modern search quality guidelines",
        "Optimized structure for readability and crawl efficiency",
      ],
    },
    {
      icon: Share2,
      title: "Social Media Content Management",
      description:
        "Strategic planning and execution of platform-native assets designed to support awareness, consistency, and long-term audience engagement across key channels. Content is aligned with broader brand messaging and campaign goals.",
      features: [
        "Platform-specific content planning and scheduling",
        "Consistent messaging across audience touchpoints",
        "Engagement-focused formats supporting distribution",
      ],
    },
    {
      icon: PenTool,
      title: "Article And Blog Writing",
      description:
        "Long-form educational resources structured to support industry relevance, authority building, and sustained visibility through evergreen publishing models. These assets are designed to remain valuable over time.",
      features: [
        "In-depth research-driven articles",
        "Clear structure for user comprehension",
        "Authority-focused editorial frameworks",
      ],
    },
    {
      icon: MessageSquare,
      title: "Copywriting Agency",
      description:
        "Conversion-oriented messaging frameworks crafted to support landing pages, campaigns, and decision-stage touchpoints without relying on aggressive persuasion. Messaging focuses on clarity, trust, and relevance.",
      features: [
        "Value-driven copy aligned with user intent",
        "Clear calls to action supported by context",
        "Messaging consistency across pages",
      ],
    },
    {
      icon: Video,
      title: "Video Content Marketing",
      description:
        "Story-led visual formats developed to enhance retention, explain complex ideas, and improve engagement across discovery and distribution platforms. Visual content supports both awareness and consideration stages.",
      features: [
        "Concept-driven video planning",
        "Clear narrative structure for retention",
        "Platform-ready video formats",
      ],
    },
    {
      icon: ShoppingBag,
      title: "E-commerce Content Strategy",
      description:
        "Product-led content systems designed to improve relevance, trust signals, and purchase confidence across catalog and category experiences. Content supports both discovery and conversion.",
      features: [
        "Category and product-level content planning",
        "Trust-building informational assets",
        "Content alignment with buyer journeys",
      ],
    },
  ];

  const whyChooseUs = [
    {
      icon: Target,
      title: "Strategy-First Content Planning",
      description:
        "We begin every engagement with structured planning rather than execution-first publishing. Content decisions are guided by audience intent, search behavior, and business priorities to ensure every asset has a clear purpose and measurable role. This approach reduces wasted effort and helps content contribute directly to long-term growth instead of short-lived visibility.",
    },
    {
      icon: RefreshCw,
      title: "Authority-Driven Content Systems",
      description:
        "Instead of isolated pieces, we build interconnected content frameworks that strengthen relevance and credibility over time. Each asset supports a broader narrative, helping brands establish consistency and recognition within their space. This system-based approach supports stronger trust signals across search engines and discovery platforms.",
    },
    {
      icon: FileText,
      title: "Performance-Aligned Execution",
      description:
        "Content is created with outcomes in mind, not assumptions. We align structure, messaging, and format with how users discover, evaluate, and act on information across digital touchpoints. This ensures content supports engagement, enquiry quality, and decision-stage confidence.",
    },
    {
      icon: Share2,
      title: "Integrated Distribution Thinking",
      description:
        "Visibility is planned from the start, not treated as an afterthought. We consider where and how content will be discovered, shared, and consumed while shaping the asset itself. This integrated thinking helps content gain traction naturally instead of depending on repeated promotion.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Optimization and Learning",
      description:
        "Content performance is reviewed regularly to understand what resonates and where improvements are needed. Insights from real user behavior guide refinements in structure, messaging, and conversion pathways. This ongoing process allows content to evolve, remain relevant, and deliver increasing value over time.",
    },
  ];

  const caseStudies = [
    {
      title: "Professional Services Firm — Lead Quality Improvement",
      type: "Services",
      idealCustomer:
        "A service-based professional firm with an established offline reputation but inconsistent inbound enquiries from digital channels.",
      challenge:
        "The firm had published content sporadically over time, but topics lacked alignment with search intent. Website pages attracted traffic that did not convert, and enquiries often failed to match the firm’s ideal client profile.",
      approach:
        "Restructured the content foundation by defining clear audience segments and mapping decision-stage intent. Core service pages were refined, educational assets were aligned to buyer questions, and internal linking was organized to guide users toward meaningful actions.",
      results: [
        { value: "61%", label: "Qualified enquiry rate" },
        { value: "38%", label: "Avg. time on pages" },
        { value: "Higher", label: "Lead relevance" },
      ],
    },
    {
      title: "B2B Company — Organic Visibility and Demand Growth",
      type: "B2B",
      idealCustomer:
        "A growing B2B organization offering specialized solutions with long sales cycles and multiple decision-makers.",
      challenge:
        "Despite having detailed offerings, the company struggled with low organic visibility. Content existed but was fragmented, making it difficult for search engines and users to understand the company’s expertise.",
      approach:
        "Developed a structured content framework focused on educational depth and logical topic coverage. Key resources were expanded, supporting articles were aligned to core themes, and content pathways were designed to assist research-stage users.",
      results: [
        { value: "74%", label: "Organic traffic growth" },
        { value: "42%", label: "Sales-assisted deals" },
        { value: "Improved", label: "Non-branded visibility" },
      ],
    },
    {
      title: "Regional Business — Consistent Organic Enquiries",
      type: "Regional",
      idealCustomer:
        "A regionally focused business in Kochi aiming to reduce dependency on paid promotions and build a sustainable inbound channel.",
      challenge:
        "The business relied heavily on short-term campaigns for visibility. Content updates were inconsistent, and organic enquiries fluctuated significantly month to month.",
      approach:
        "Implemented a structured publishing system supported by evergreen resources and intent-aligned service content. Content performance was reviewed regularly to refine structure, clarity, and conversion pathways.",
      results: [
        { value: "52%", label: "Non-paid enquiries" },
        { value: "Lower", label: "Acquisition cost" },
        { value: "Stable", label: "Enquiry consistency" },
      ],
    },
  ];

  return (
    <div className="font-sans antialiased bg-white text-[#1d1d1f] overflow-x-hidden relative">
      <Seo
        title="Content Marketing Agency in Kerala | SocialBureau"
        url="https://www.socialbureau.in/services//content-marketing-agency-in-kochi"
        canonicalUrl="https://www.socialbureau.in/services//content-marketing-agency-in-kochi"
        description="Create compelling content with SocialBureau. Our content marketing strategies attract traffic, generate leads, and grow your brand"
        keywords="content marketing, seo writing, social media management, kerala, kochi,CONTENT MARKETING AGENCY IN KOCHI,CONTENT OPTIMISATION,CONTENT MARKETING STRATEGIES"
      />

      <div className="scroll-progress-bar fixed top-0 left-0 h-[3px] w-full bg-[#920F17] z-[1000] origin-left scale-x-0 will-change-transform transition-transform duration-100 ease-linear"></div>

      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center px-6 lg:px-8 overflow-hidden bg-white sticky top-0 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]"
        style={{ zIndex: 10 }}
      >
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="animate-fade-up">
            <span className="text-[0.75rem] tracking-[0.05em] uppercase text-[#86868b] font-semibold mb-4 block">
              Content Marketing Agency
            </span>
            <h1 className="text-4xl md:text-[5vw] lg:text-[3.5rem] font-semibold leading-[1.1] tracking-[-0.015em] mb-6">
              Content Marketing Agency
              <span className="block text-[#920F17]">in Kerala</span>
            </h1>
            <p className="text-[#515154] mb-10 max-w-2xl leading-relaxed text-lg">
              Turn strategic ideas into measurable visibility, qualified
              enquiries, and sustainable business outcomes through
              performance-driven content systems built for modern search
              ecosystems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://api.whatsapp.com/send/?phone=918714952665&text=Hello%2C+I+would+like+to+learn+more."
                className="bg-[#920F17] text-white py-3 px-8 rounded-[980px] text-base font-medium transition-all duration-300 inline-flex items-center gap-2 hover:bg-[#6B080E] hover:scale-[1.02]"
              >
                Book a Strategy Call
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#services"
                className="bg-transparent text-[#920F17] py-3 px-8 rounded-[980px] text-base font-medium border border-[#920F17] transition-all duration-300 inline-flex items-center gap-2 hover:bg-[#920F17]/5"
              >
                Explore Services
              </a>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={getOptimizedCloudinaryUrl(
                "https://i.pinimg.com/736x/52/06/bf/5206bfd30afa872b0d625a8566039afe.jpg",
                1200,
              )}
              alt="Content Marketing Hero"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen w-full bg-[#1d1d1f] text-white flex items-center sticky top-0 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]"
        style={{ zIndex: 20 }}
      >
        <div className="w-full px-6 lg:px-8 max-w-7xl mx-auto py-24">
          <div className="text-center mb-16">
            <span className="text-[0.75rem] tracking-[0.05em] uppercase text-gray-400 font-semibold mb-4 block">
              Our Approach
            </span>
            <h2 className="text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-[-0.015em] mb-6">
              Clarity-Driven Storytelling
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl mb-6 text-white/80 font-medium">
                Strategic Growth Partner
              </h3>
              <p className="text-white/80 mb-6 leading-relaxed text-lg">
                <a
                  href="https://en.wikipedia.org/wiki/Content_marketing"
                  target="_blank"
                  title="Learn more about Content Marketing on Wikipedia"
                >
                  Content marketing
                </a>{" "}
                is the structured process of creating value-driven digital
                assets that educate, influence, and guide potential customers
                toward informed decisions. Instead of publishing for visibility
                alone, we focus on relevance and intent.
              </p>
              <p className="text-white/80 leading-relaxed text-lg">
                At{" "}
                <a
                  href="https://socialbureau.in"
                  title="Visit SocialBureau Official Website"
                >
                  SocialBureau
                </a>
                , we help brands develop content ecosystems that support
                long-term authority, trust, and discoverability across search
                engines and emerging AI-driven discovery platforms.
              </p>
            </div>
            <div className="h-96 lg:h-[32rem] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={getOptimizedCloudinaryUrl(
                  "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Fastion_sg9hqc.webp",
                  1000,
                )}
                alt="Strategic Content Creation and Planning"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="min-h-screen py-24 px-6 lg:px-8 bg-[#920F17] text-white sticky top-0 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]"
        style={{ zIndex: 30 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[0.75rem] tracking-[0.05em] uppercase text-white/70 font-semibold mb-4 block">
              Our Services
            </span>
            <h2 className="text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-[-0.015em] mb-6 text-white">
              Content Creation Services
            </h2>
            <p className="max-sm:text-sm text-white/80 max-w-3xl mx-auto mb-12">
              Our services are designed to support scalable growth by aligning
              content creation with search behavior, user expectations, and
              measurable business objectives. Each service is delivered with a
              focus on clarity, consistency, and long-term performance rather
              than short-term visibility.
            </p>
          </div>

          {/* Image + 1 Card Side by Side */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Image on left - spans 2 columns */}
            <div className="lg:col-span-2 h-96 lg:h-[32rem] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={getOptimizedCloudinaryUrl(
                  "https://i.pinimg.com/1200x/a9/5f/d6/a95fd6ff1ad3aa25b7c1651be38e3679.jpg",
                  1200,
                )}
                alt="Content Creation Services and productivity"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* First card on right */}
            {services.length > 0 && (
              <div className="rounded-3xl p-8 bg-[#7B0C13] border border-white/10 hover:border-white/30 transition h-fit">
                {services[0].icon && (
                  <div className="w-12 h-12 bg-[#920F17] rounded-xl flex items-center justify-center mb-6">
                    {(() => {
                      const IconComponent = services[0].icon;
                      return <IconComponent className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-4">
                  {services[0].title}
                </h3>
                <p className="text-white/80 mb-6 text-sm leading-relaxed">
                  {services[0].description}
                </p>
                <ul className="space-y-2">
                  {services[0].features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-white/80 flex items-start"
                    >
                      <CheckCircle className="w-4 h-4 text-white mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 3 cards below image */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {services.slice(1, 4).map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index + 1}
                  className="rounded-3xl p-8 bg-[#7B0C13] border border-white/10 hover:border-white/30 transition"
                >
                  <div className="w-12 h-12 bg-[#920F17] rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {service.title}
                  </h3>
                  <p className="text-white/80 mb-6 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-white/80 flex items-start"
                      >
                        <CheckCircle className="w-4 h-4 text-white mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* 2 cards at bottom - full width 50/50 */}
          <div className="grid md:grid-cols-2 gap-8 w-full">
            {services.slice(4, 6).map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index + 4}
                  className="rounded-3xl p-8 bg-[#7B0C13] border border-white/10 hover:border-white/30 transition"
                >
                  <div className="w-12 h-12 bg-[#920F17] rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {service.title}
                  </h3>
                  <p className="text-white/80 mb-6 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-white/80 flex items-start"
                      >
                        <CheckCircle className="w-4 h-4 text-white mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        id="why-choose"
        className="py-24 px-6 lg:px-8 bg-white text-black sticky top-0 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]"
        style={{ zIndex: 40 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[0.75rem] tracking-[0.05em] uppercase text-gray-500 font-semibold mb-4 block">
                Why Choose Us
              </span>
              <h2 className="text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-[-0.015em] mb-10 text-black">
                Content Marketing agency in Kochi
              </h2>

              <div className="space-y-8">
                {whyChooseUs.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex gap-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#920F17]/5 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#920F17]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-[#515154] leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="order-1 lg:order-2 h-[400px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl relative group">
              <img
                src={getOptimizedCloudinaryUrl(
                  "https://i.pinimg.com/736x/7e/51/97/7e5197067bba825e41d8f7a2d0bd8697.jpg",
                  1000,
                )}
                alt="Content professional working at SocialBureau"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section
        id="case-studies"
        className="py-24 bg-[#fbfbfd] sticky top-0 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]"
        style={{ zIndex: 50 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[0.75rem] tracking-[0.05em] uppercase text-[#86868b] font-semibold block mb-3 text-gray-500">
              Case Studies
            </span>
            <h2 className="text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-[-0.015em] text-black">
              Proven Content Results
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* LEFT list */}
            <div className="lg:col-span-5 space-y-6">
              {caseStudies.map((study, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCaseStudy(index)}
                  className={`bg-white rounded-[24px] p-6 md:p-8 max-sm:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#f5f5f7] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:border-[#e5e5e7] text-left w-full transition-all duration-300 ${activeCaseStudy === index ? "ring-2 ring-[#920F17] bg-white" : "hover:bg-[#f5f5f7]"}`}
                >
                  <span className="text-xs font-semibold text-[#920F17] bg-[#920F17]/5 px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {study.type}
                  </span>
                  <h3 className="text-lg font-semibold mt-3 text-black">
                    {study.title}
                  </h3>
                  <div className="text-[#920F17] text-sm mt-3 flex items-center gap-1 font-medium">
                    View details <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>

            {/* RIGHT details */}
            <div className="lg:col-span-7">
              <div className="bg-white md:rounded-[24px] rounded-xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 border border-[#f5f5f7] md:sticky md:top-28 relative top-0">
                <h3 className="text-2xl font-semibold mb-6 text-black">
                  {caseStudies[activeCaseStudy].title}
                </h3>
                <div className="space-y-6 text-sm lg:text-base">
                  <div>
                    <h4 className="font-semibold text-[#920F17] mb-1">
                      Ideal Customer
                    </h4>
                    <p className="text-[#515154]">
                      {caseStudies[activeCaseStudy].idealCustomer}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#920F17] mb-1">
                      The Challenge
                    </h4>
                    <p className="text-[#515154]">
                      {caseStudies[activeCaseStudy].challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#920F17] mb-1">
                      The Approach
                    </h4>
                    <p className="text-[#515154]">
                      {caseStudies[activeCaseStudy].approach}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#f5f5f7]">
                    {caseStudies[activeCaseStudy].results.map((result, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-[2.5rem] md:text-[1.75rem] max-sm:text-[1.5rem] font-semibold text-[#920F17] leading-none">
                          {result.value}
                        </div>
                        <div className="text-[0.875rem] md:text-[0.75rem] max-sm:text-[0.7rem] text-gray-500 mt-2 max-sm:mt-[0.375rem] capitalize">
                          {result.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="py-24 px-6 lg:px-8 bg-[#1d1d1f] text-white sticky top-0 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]"
        style={{ zIndex: 60 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[0.75rem] tracking-[0.05em] uppercase text-white/70 font-semibold mb-4 block">
              Testimonials
            </span>
            <h2 className="text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-[-0.015em] text-white">
              Client Success Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl p-8 bg-white/5 border border-white/10">
              <div className="text-6xl text-white opacity-20 mb-4 leading-none font-serif">
                “
              </div>
              <p className="text-white/80 italic mb-6 leading-relaxed text-lg">
                Before working with Social Bureau, our content across social
                media and marketing platforms felt scattered. The team helped us
                bring everything together with a clear direction. Posting became
                easier, messaging felt consistent, and engagement started
                improving naturally.
              </p>
              <div className="font-semibold text-white">— Business Owner</div>
            </div>

            <div className="rounded-3xl p-8 bg-white/5 border border-white/10">
              <div className="text-6xl text-white opacity-20 mb-4 leading-none font-serif">
                “
              </div>
              <p className="text-white/80 italic mb-6 leading-relaxed text-lg">
                What we liked most was how practical the approach was. Content
                was created in a way that supported our marketing efforts
                instead of adding more work. It helped our campaigns feel more
                connected and purposeful.
              </p>
              <div className="font-semibold text-white">— Founder</div>
            </div>

            <div className="rounded-3xl p-8 bg-white/5 border border-white/10">
              <div className="text-6xl text-white opacity-20 mb-4 leading-none font-serif">
                “
              </div>
              <p className="text-white/80 italic mb-6 leading-relaxed text-lg">
                Earlier, we were publishing content regularly, but it wasn’t
                really helping our overall marketing. After the changes, our
                platforms started working together, and enquiries coming in were
                more relevant to what we offer.
              </p>
              <div className="font-semibold text-white">
                — Marketing Manager
              </div>
            </div>

            <div className="rounded-3xl p-8 bg-white/5 border border-white/10">
              <div className="text-6xl text-white opacity-20 mb-4 leading-none font-serif">
                “
              </div>
              <p className="text-white/80 italic mb-6 leading-relaxed text-lg">
                The content updates made a noticeable difference to how people
                interacted with us online. Conversations became more meaningful,
                and our team felt more confident sharing and promoting the
                content.
              </p>
              <div className="font-semibold text-white">— Operations Lead</div>
            </div>

            <div className="rounded-3xl p-8 bg-white/5 border border-white/10">
              <div className="text-6xl text-white opacity-20 mb-4 leading-none font-serif">
                “
              </div>
              <p className="text-white/80 italic mb-6 leading-relaxed text-lg">
                What felt different was the human touch. The content didn’t
                sound forced or salesy. It reflected our brand better and
                supported our marketing efforts without overwhelming our
                audience.
              </p>
              <div className="font-semibold text-white">— Brand Manager</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="w-full bg-white sticky top-0 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]"
        style={{ zIndex: 70 }}
      >
        <div className="max-w-3xl mx-auto px-6 py-24">
          <div className="text-center mb-12">
            <span className="text-[0.75rem] tracking-[0.05em] uppercase text-gray-500 font-semibold block mb-3">
              FAQ
            </span>
            <h2 className="text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-[-0.015em] text-black">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {faqItems.map((item, index) => (
              <div key={index} className="py-6">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left text-lg font-medium text-black hover:text-[#920F17] transition"
                >
                  <span>{item.question}</span>
                  {activeFaq === index ? (
                    <X className="w-4 h-4 text-[#920F17]" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                {activeFaq === index && (
                  <div className="mt-4 text-[#515154] text-base leading-relaxed animate-fade-up">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        className="w-full px-6 py-24 bg-[#fbfbfd] sticky top-0 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]"
        style={{ zIndex: 80 }}
      >
        <div className="bg-[#1d1d1f] text-white rounded-[2rem] py-20 px-6 lg:px-16 text-center relative overflow-hidden max-w-7xl mx-auto shadow-2xl">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#920F17] opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#920F17] opacity-10 rounded-full blur-3xl"></div>
          <h2 className="text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-[-0.015em] text-white mb-6">
            Elevate Your Content Strategy
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Let's discuss how strategic{" "}
            <a
              href="https://socialbureau.in/blogs/why-content-marketing-is-essential-for-seo-success-in-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors border-b border-white/20"
              title="Learn more about Content Marketing"
            >
              content marketing
            </a>{" "}
            can drive measurable growth and focus for your brand.
          </p>
          <a
            href="/contact"
            className="bg-white text-black py-4 px-10 rounded-[980px] text-lg font-medium transition-all duration-300 inline-flex items-center gap-2 hover:bg-gray-100 hover:scale-105"
          >
            Book a Strategy Call
            <ChevronRight className="w-5 h-5 ml-1" />
          </a>
        </div>
      </section>

      {/* Scroll to Top */}
      <button
        className={`fixed bottom-8 right-8 w-14 h-14 bg-[#920F17] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#6B080E] hover:scale-110 active:scale-95 transition-all z-[1001] ${isScrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
        onClick={scrollToTop}
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ContentMarketing;

