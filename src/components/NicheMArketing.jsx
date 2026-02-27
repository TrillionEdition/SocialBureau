import React, { useState, useRef, useEffect } from 'react';
import { BarChart3, Megaphone, Search, ShoppingCart, Target, Users, TrendingUp, Award, Zap, Lightbulb, Compass, Layers } from 'lucide-react';
import Footer from './Footer';
import Seo from './Seo';

const NicheMarketing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const CountUp = ({ end, duration = 1500, suffix = "", prefix = "" }) => {
    const [value, setValue] = useState(0);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
      const element = ref.current;
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            const startTime = performance.now();

            const animate = (time) => {
              const progress = Math.min((time - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(eased * end);

              setValue(current);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setValue(end);
              }
            };

            requestAnimationFrame(animate);
          }
        },
        { threshold: 0.4 },
      );

      observer.observe(element);
      return () => observer.disconnect();
    }, [end, duration]);

    return (
      <span ref={ref}>
        {prefix}
        {value}
        {suffix}
      </span>
    );
  };

  const faqItems = [
    {
      question: "1. What is niche marketing and how does it work?",
      answer:
        "Niche marketing focuses on serving a clearly defined group of customers with specific needs. Instead of appealing to everyone, businesses tailor their messaging, offers, and channels to a smaller audience where relevance and engagement are higher.",
    },
    {
      question: "2. What is the difference from broad marketing approaches?",
      answer:
        "Broad marketing aims for reach, while niche marketing prioritizes precision. By narrowing the audience, businesses reduce competition, improve message clarity, and connect more effectively with people who are actively searching for specific solutions.",
    },
    {
      question: "3. Is niche marketing suitable only for small businesses?",
      answer:
        "No. Niche marketing works for businesses of all sizes. Large brands often use it to launch specialized offerings, while smaller companies use it to compete effectively without large budgets.",
    },
    {
      question: "4. How do you identify the right niche for a business?",
      answer:
        "The process involves understanding customer needs, analyzing demand patterns, studying competitors, and evaluating long-term growth potential. The right niche balances market opportunity with a brand's strengths.",
    },
    {
      question:
        "5. How long does it take to see results from a niche-focused strategy?",
      answer:
        "Results depend on the market and execution. Early improvements in engagement may appear within weeks, while stronger outcomes like consistent leads and brand authority develop over several months.",
    },
    {
      question: "6. Can niche marketing help improve lead quality?",
      answer:
        "Yes. By focusing on relevance and intent, niche marketing attracts users who are more likely to enquire, convert, and stay engaged, leading to better-quality leads rather than higher volume.",
    },
    {
      question: "7. Does niche marketing limit business growth?",
      answer:
        "No. Starting with a focused audience often makes growth more sustainable. Once authority is established in one segment, businesses can expand into related areas without losing clarity.",
    },
    {
      question: "8. How does niche marketing support long-term brand value?",
      answer:
        "By consistently addressing specific customer needs, brands build trust, recognition, and loyalty. Over time, this strengthens positioning and creates a competitive advantage that is difficult to replicate.",
    },
  ];

  const services = [
    {
      icon: Search,
      title: "1. Market Intelligence & Research",
      description:
        "Understanding a market deeply is the foundation of successful growth. Our process begins with niche market analysis, where we study demand patterns, buyer expectations, and competitive gaps to uncover opportunities that general campaigns often miss.",
      features: [
        "Target market segmentation based on intent and relevance",
        "Audience behavior analysis using real interaction data",
        "Vertical market analysis to understand industry-specific dynamics",
      ],
    },
    {
      icon: Target,
      title: "2. Strategic Positioning & Planning",
      description:
        "Once the market is understood, we develop a structured niche marketing strategy that aligns the brand with a clearly defined space. This phase focuses on shaping how the business is perceived and why it stands out. We create actionable roadmaps that guide campaigns, messaging, and positioning.",
      features: [
        "Market segmentation for focused communication",
        "Target market identification aligned with business objectives",
        "Market positioning that differentiates the brand clearly",
      ],
    },
    {
      icon: Users,
      title: "3. Audience-Focused Execution",
      description:
        "Execution is built around relevance. Through target audience marketing, we help brands communicate with people who are most likely to engage, enquire, and convert. Our campaigns are designed to meet users at the right moment in their decision-making process, leveraging insights from behavioral data and audience segmentation.",
      features: [
        "Buyer persona optimization based on real data",
        "Clearly defined customer personas",
        "Messaging designed for a narrow target audience",
      ],
    },
    {
      icon: Megaphone,
      title: "4. Personalized & Product-Led Campaigns",
      description:
        "For businesses offering specialized solutions, personalization becomes a growth driver. We design campaigns using hyper personalized marketing principles to align communication with user context and intent. By tailoring campaigns to specific niche product marketing needs, we create relevant interactions at every stage of the customer journey.",
      features: [
        "Niche product marketing for focused offerings",
        "Micro niche marketing for highly specific audience segments",
        "Funnel alignment with a clear niche business model",
      ],
    },
    {
      icon: TrendingUp,
      title: "5. Growth & Retention Optimization",
      description:
        "Marketing success depends on continuous refinement. We continuously evaluate performance and apply structured improvements to support long-term value. By analyzing the outcomes of campaigns, tracking customer behavior, and refining messaging, we help businesses maintain a competitive edge.",
      features: [
        "Niche competitor analysis to refine positioning",
        "Funnel alignment through a niche sales funnel",
        "Long-term customer retention strategies",
      ],
    },
    {
      icon: Zap,
      title: "6. Demand Activation & Scalable Growth",
      description:
        "Once a niche is clearly defined and campaigns are optimized, the focus shifts to generating consistent demand without diluting positioning. This stage ensures growth happens within the right audience boundaries, preserving relevance while expanding reach.",
      features: [
        "High-intent traffic generation aligned with niche-specific queries",
        "Channel selection based on proven audience response patterns",
        "Controlled expansion that supports sustainable niche growth hacking",
      ],
    },
  ];

  const features = [
    {
      icon: Award,
      title: "Specialized Marketing Focus",
      description:
        "We partner with brands that prefer clarity over volume and depth over noise. Instead of chasing broad visibility, we focus on understanding specific market segments and aligning messaging to well-defined audiences. This approach helps brands communicate with relevance, reduce wasted effort, and achieve stronger engagement within clearly identified niches.",
    },
    {
      icon: TrendingUp,
      title: "Authority-Driven Approach",
      description:
        "Authority is built through consistency, insight, and relevance. Our approach focuses on positioning brands as reliable sources within their niche by aligning messaging with real customer needs and market expectations. Over time, this builds credibility, strengthens trust, and supports long-term brand recognition within focused markets.",
    },
    {
      icon: Target,
      title: "Clear Niche Positioning",
      description:
        "Strong positioning starts with clarity. We help businesses define who they serve, what problem they solve, and why their offering matters within a specific segment. This clarity improves communication across channels, reduces confusion for customers, and creates a distinct identity that separates the brand from general competitors.",
    },
    {
      icon: BarChart3,
      title: "Data-Led Decisions",
      description:
        "Every strategic decision is informed by research, performance signals, and audience behavior. Instead of assumptions, we rely on measurable insights to guide planning and optimization. This ensures campaigns remain aligned with market realities, adapt to changes, and consistently improve results through informed adjustments.",
    },
    {
      icon: Search,
      title: "Local Expertise",
      description:
        "With hands-on experience in Kochi and across Kerala, we understand regional business dynamics, customer behavior, and market nuances. This local insight allows us to design niche strategies that feel relevant on the ground while remaining scalable for wider growth and long-term expansion.",
    },
  ];

  const caseStudies = [
    {
      title:
        "Case Study 1: Service-Based Brand - Qualified Lead Improvement through Niche Focus",
      category: "Service-Based Business",
      idealCustomer:
        "A professional service business offering specialized solutions and seeking higher-quality enquiries rather than high-volume traffic.",
      challenge:
        "The brand relied on broad messaging and generic campaigns. While traffic levels were steady, enquiries lacked relevance. Sales teams spent excessive time filtering unqualified leads, and brand differentiation was weak within the market.",
      approach:
        "We conducted niche market analysis and refined target market segmentation to identify high-intent user groups. Messaging was realigned through strategic positioning and focused niche branding, ensuring communication addressed specific customer needs rather than general use cases.",
      results: [
        { stat: "34%", label: "Qualified enquiries increased by", prefix: "+" },
                { stat: "41%", label: "Lead-to-enquiry relevance improved by", prefix: "+" },
                { stat: "22%", label: "Sales team follow-up time reduced by", prefix: "-" }
            ]
    },
    {
            title: "Case Study 2: Product-Focused Brand — Conversion Growth through Audience Alignment",
      category: "Product-Based Business",
      idealCustomer:
        "A product-based business targeting users actively searching for specific solutions within a defined category.",
      challenge:
        "The website attracted traffic from multiple sources, but conversions remained low. Visitors lacked clear intent alignment, resulting in high bounce rates and inefficient acquisition costs.",
      approach:
        "We restructured the niche sales funnel using audience behavior analysis and implemented personalized campaign execution. Efforts were focused on high-intent traffic generation, aligning product messaging with specific user expectations and decision stages.",
      results: [
        { stat: "29%", label: "Conversion rate increased by", prefix: "+" },
        { stat: "24%", label: "Bounce rate reduced by", prefix: "-" },
        { stat: "18%", label: "Cost per acquisition lowered by", prefix: "-" },
      ],
    },
    {
      title:
        "Case Study 3: Local Business in Kochi — Niche Positioning for Regional Growth",
      category: "Local Business Growth",
      idealCustomer:
        "A Kochi-based local business serving location-driven customers with clear service intent.",
      challenge:
        "The business blended into a competitive local market with similar messaging to competitors. Visibility existed, but differentiation was minimal, resulting in inconsistent lead quality and weak customer loyalty.",
      approach:
        "We applied vertical market analysis and refined niche positioning to clarify the brand's specialization. Outreach and messaging were localized, emphasizing relevance and authority within the regional market rather than broad appeal.",
      results: [
        { stat: "37%", label: "Qualified local leads grew by", prefix: "+" },
        { stat: "21%", label: "Repeat customer rate improved by", prefix: "+" },
        {
          stat: "↑",
          label: "Brand recall within the target area increased measurably",
          prefix: "",
        },
      ],
    },
  ];

  const testimonials = [
    {
      text: "Working with the team helped us bring clarity to our marketing. Instead of chasing volume, we started attracting enquiries that actually matched our services. The difference in lead quality was noticeable within a few months.",
      author: "Service Business Owner",
    },
    {
      text: "What stood out was their understanding of our market. The strategy wasn't generic and felt well thought out. Our messaging became more focused, and customer engagement improved steadily over time.",
      author: "Founder, Product-Based Brand",
    },
    {
      text: "They took the time to understand how our audience thinks and searches. The changes made to positioning and campaigns helped us convert existing traffic more effectively without increasing spend.",
      author: "Marketing Lead",
    },
    {
      text: "Our brand finally feels differentiated. Earlier, we struggled to explain why we were different. Now the messaging is clear, consistent, and resonates with the right customers.",
      author: "Operations Manager",
    },
    {
      text: "The process was transparent and structured. We always knew what was being done and why. The results came gradually, but they were stable and sustainable, which is what we were looking for.",
      author: "Business Consultant",
    },
  ];

  return (
    <div className="font-['Inter'] bg-[#0F0F0F] text-[#F5F5F5] overflow-x-hidden nm-page">
      <Seo
        title="Best Niche Marketing Agency in Kerala | Social Bureau"
        description="Niche Marketing Agency in Kerala helping brands dominate their niche through data driven strategy, stronger conversions, and long term business growth"
        keywords="niche marketing agency in kerala, niche marketing Kochi, Niche marketing service, niche marketing strategy, target audience marketing, hyper personalized marketing, Niche product marketing, Micro niche marketing, Niche market analysis"
      />

      {/* Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
                .nm-page img {
                    max-width: 100%;
                    height: auto;
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
                @keyframes pulse-slow {
                    0%, 100% {
                        opacity: 0.2;
                    }
                    50% {
                        opacity: 0.4;
                    }
                }
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                .animate-fadeInLeft {
                    animation: fadeInLeft 0.8s ease-out forwards;
                }
                .animate-fadeInRight {
                    animation: fadeInRight 0.8s ease-out forwards;
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.6s ease-out forwards;
                }
                .clip-path-polygon {
                    clip-path: polygon(100% 0, 100% 100%, 0 100%);
                }
                .service-card-hover:hover {
                    box-shadow: 0 20px 40px rgba(192, 192, 192, 0.2);
                }
            `,
        }}
      />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F] pb-0">
        <div className="absolute top-32 right-0 w-full md:w-3/5 h-full bg-gradient-to-br from-[#C0C0C0] to-[#808080] clip-path-polygon opacity-5 animate-float hidden md:block"></div>
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 px-4 sm:px-6 pb-20 sm:pb-24 lg:pb-32">
          <div className="animate-fadeInUp">
            <h1 className="font-['Inter'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 lg:mb-8 text-white">
              Niche Marketing Agency in Kerala
            </h1>
            <p className="text-base sm:text-lg text-[#BFBFBF] mb-8 lg:mb-12 max-w-2xl">
              Transform business growth by focusing on clarity, relevance, and
              specialization. Social Bureau helps brands grow by reaching
              audiences that actually convert—through carefully structured
              niche-focused strategies designed for long-term authority and
              sustainable results.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <a
                href="https://api.whatsapp.com/send/?phone=918921840486&text=Hello%2C+I+would+like+to+learn+more.&type=phone_number&app_absent=0"
                className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#C0C0C0] to-[#A9A9A9] text-[#0F0F0F] font-semibold rounded-full hover:translate-y-[-3px] hover:shadow-2xl hover:shadow-[#808080]/40 transition-all text-sm sm:text-base"
              >
                Book a Strategy Call
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-transparent text-white font-semibold rounded-full border-2 border-[#808080] hover:bg-[#1A1A1A] hover:border-[#C0C0C0] hover:translate-y-[-3px] transition-all text-sm sm:text-base"
              >
                Explore Services
              </a>
            </div>
          </div>
          <div className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center animate-fadeInRight mt-8 md:mt-0">
            <img
              src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1772181555/download_8_evgktd.webp"
              alt="niche-marketing"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* About Section - Matching PDF exactly */}
      <section
        id="about"
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-[#C0C0C0] to-[#808080] text-[#0F0F0F] text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
            ABOUT SECTION
          </span>
          <h2 className="font-['Inter'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
            niche marketing strategy
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-[rgba(192,192,192,0.1)] to-[rgba(128,128,128,0.1)] rounded-3xl flex items-center justify-center relative overflow-hidden p-4 border border-[#333333]">
            <img
              src="/assets/niche2.webp"
              alt="niche marketing"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="animate-fadeInRight">
            <p className="text-[#BFBFBF] mb-4 leading-relaxed text-sm sm:text-base">
              <a
                href="/blogs/niche-brands-and-build"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C0C0C0] hover:text-[#A9A9A9] transition-colors"
              >
                Niche marketing
              </a>{" "}
              is the process of identifying a clearly defined market segment and
              building communication, positioning, and messaging around that
              audience's specific needs. Unlike broad campaigns, this approach
              prioritizes relevance over reach and depth over volume.
            </p>
            <p className="text-[#BFBFBF] mb-4 leading-relaxed text-sm sm:text-base">
              At{" "}
              <a
                href="https://socialbureau.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C0C0C0] hover:text-[#A9A9A9] transition-colors"
              >
                Social Bureau
              </a>
              , a Kochi-based marketing agency, we work with businesses that
              want to grow through specialization. Our team studies how
              audiences think, search, and make decisions, then builds
              structured marketing systems that support long-term positioning
              and consistent demand.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section - Matching PDF exactly with numbered titles */}
      <section
        id="services"
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-[#C0C0C0] to-[#808080] text-[#0F0F0F] text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
              Our Services
            </span>
            <h2 className="font-['Inter'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Niche marketing service
            </h2>
            <p className="text-base sm:text-lg text-[#BFBFBF] max-w-3xl mx-auto px-4">
              We design and implement marketing solutions that are built around
              precision rather than assumptions. Each service is delivered with
              research-backed planning, structured execution, and measurable
              outcomes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-[#252525] p-4 sm:p-6 lg:p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:translate-y-[-10px] transition-all duration-400 border border-[#333333] hover:border-[#666666] relative overflow-hidden group service-card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C0C0C0] to-[#808080] opacity-0 group-hover:opacity-5 transition-opacity z-0"></div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#C0C0C0] to-[#808080] rounded-xl flex items-center justify-center mb-4 sm:mb-6 relative z-10">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-[#0F0F0F]" />
                  </div>
                  <h3 className="font-['Inter'] text-lg sm:text-xl font-bold mb-3 sm:mb-4 relative z-10 text-white">
                    {service.title}
                  </h3>
                  <p className="text-[#BFBFBF] mb-4 sm:mb-6 relative z-10 text-sm sm:text-base">
                    {service.description}
                  </p>
                  <ul className="space-y-1 sm:space-y-2 relative z-10">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-[#BFBFBF] flex items-start text-xs sm:text-sm"
                      >
                        <span className="text-[#C0C0C0] font-bold mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Section - Matching PDF exactly */}
      <section
        id="why-choose"
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
          <div className="text-center lg:text-left">Why Choose Us
            <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-[#C0C0C0] to-[#808080] text-[#0F0F0F] text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
              WHY CHOOSE US
            </span>
            <h2 className="font-['Inter'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
              What Sets Us Apart
            </h2>
          </div>
          <div className="w-full flex justify-center lg:justify-end">
            <img
              src="assets/hajira2.webp"
              alt="social bureau"
              className="w-200px h-150px object-contain rounded-2xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-[#1A1A1A] p-6 sm:p-8 lg:p-10 rounded-2xl text-center hover:scale-105 border-2 border-[#333333] hover:border-[#666666] transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#C0C0C0] to-[#808080] text-[#0F0F0F] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="font-['Inter'] text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-[#BFBFBF] leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Case Studies - Matching PDF exactly */}
      <section
        id="case-studies"
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-[#C0C0C0] to-[#808080] text-[#0F0F0F] text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
              CASE STUDIES
            </span>
            <h2 className="font-['Inter'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Proven Results
            </h2>
          </div>
          <div className="space-y-8 sm:space-y-12">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="bg-[#252525] rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg relative overflow-hidden border-l-4 border-[#C0C0C0] animate-fadeInUp"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <h3 className="font-['Inter'] text-xl sm:text-2xl font-bold mb-4 text-white">
                  {study.title}
                </h3>

                <div className="mb-6">
                  <h4 className="font-['Inter'] text-base sm:text-lg font-semibold text-[#C0C0C0] mb-2">
                    Ideal Customer
                  </h4>
                  <p className="text-[#BFBFBF] text-sm sm:text-base">
                    {study.idealCustomer}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-['Inter'] text-base sm:text-lg font-semibold text-[#C0C0C0] mb-2">
                    The Challenge (Before)
                  </h4>
                  <p className="text-[#BFBFBF] text-sm sm:text-base">
                    {study.challenge}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-['Inter'] text-base sm:text-lg font-semibold text-[#C0C0C0] mb-2">
                    The Approach
                  </h4>
                  <p className="text-[#BFBFBF] text-sm sm:text-base">
                    {study.approach}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-['Inter'] text-base sm:text-lg font-semibold text-[#C0C0C0] mb-3">
                    The Results (After) (Infographic):
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-8 bg-[#333333] rounded-2xl">
                  {study.results.map((result, idx) => (
                    <div key={idx} className="text-center p-4">
                      <div className="font-['Inter'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#C0C0C0] mb-1 sm:mb-2">
                        {result.prefix}
                        {result.stat}
                      </div>
                      <div className="text-xs sm:text-sm text-[#999999]">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Matching PDF exactly with all 5 testimonials */}
      <section
        id="testimonials"
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-[#C0C0C0] to-[#808080] text-[#0F0F0F] text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
            Testimonials
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg hover:translate-y-[-5px] transition-transform duration-300 border border-[#333333] animate-scaleIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl sm:text-5xl text-[#666666] opacity-50 mb-3 sm:mb-4">
                ❝
              </div>
              <p className="text-[#BFBFBF] italic leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                {testimonial.text}
              </p>
              <div className="font-semibold text-[#E8E8E8] text-sm sm:text-base">
                {testimonial.author}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section - Matching PDF exactly with numbered questions */}
      <section
        id="faq"
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      >
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-[#C0C0C0] to-[#808080] text-[#0F0F0F] text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
            FAQs
          </span>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#333333]"
            >
              <button
                className="w-full p-4 sm:p-6 text-left flex justify-between items-center font-['Inter'] font-semibold hover:text-[#C0C0C0] transition-colors text-sm sm:text-base text-white"
                onClick={() => toggleFaq(index)}
              >
                <span className="text-left pr-4">{item.question}</span>
                <span
                  className={`text-xl sm:text-2xl transition-transform flex-shrink-0 text-[#C0C0C0] ${activeFaq === index ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? "max-h-96" : "max-h-0"}`}
              >
                <div className="p-4 sm:p-6 pt-0 text-[#BFBFBF] leading-relaxed text-sm sm:text-base">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        className="py-12 sm:py-16 lg:py-20 mx-4 sm:mx-6 lg:mx-8 my-8 sm:my-12 lg:my-16 bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] text-white rounded-3xl text-center relative overflow-hidden border border-[#333333]"
      >
        <div className="absolute -top-1/2 -right-1/10 w-64 h-64 sm:w-96 sm:h-96 bg-radial-gradient(circle, rgba(192,192,192,0.1), transparent) rounded-full animate-pulse-slow hidden sm:block"></div>
        <h2 className="font-['Inter'] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 relative z-10 px-4 text-white">
          Ready to Build Authority in Your Niche?
        </h2>
        <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-[#BFBFBF] relative z-10 px-4">
          Let's discuss how niche marketing can drive sustainable growth and
          establish clear positioning for your business.
        </p>
        <a
          href="https://api.whatsapp.com/send/?phone=918921840486&text=Hello%2C+I+would+like+to+learn+more.&type=phone_number&app_absent=0"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#C0C0C0] to-[#A9A9A9] text-[#0F0F0F] font-semibold rounded-full hover:translate-y-[-3px] hover:shadow-[0_15px_40px_rgba(192,192,192,0.3)] transition-all relative z-10 text-sm sm:text-base"
        >
          Book a Strategy Call
        </a>
      </section>

      {/* Scroll to Top Button */}
      <button
        className={`fixed bottom-6 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#C0C0C0] to-[#808080] text-[#0F0F0F] rounded-full flex items-center justify-center text-lg sm:text-xl shadow-lg hover:translate-y-[-5px] transition-all font-bold ${isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={scrollToTop}
      >
        ↑
      </button>

      <Footer />
    </div>
  );
};

export default NicheMarketing;
