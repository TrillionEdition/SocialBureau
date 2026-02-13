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
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                { threshold: 0.4 }
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
            question: "What is niche marketing and how does it work?",
            answer: "Niche marketing focuses on serving a clearly defined group of customers with specific needs. Instead of appealing to everyone, businesses tailor their messaging, offers, and channels to a smaller audience where relevance and engagement are higher."
        },
        {
            question: "What is the difference from broad marketing approaches?",
            answer: "Broad marketing aims for reach, while niche marketing prioritizes precision. By narrowing the audience, businesses reduce competition, improve message clarity, and connect more effectively with people who are actively searching for specific solutions."
        },
        {
            question: "Is niche marketing suitable only for small businesses?",
            answer: "No. Niche marketing works for businesses of all sizes. Large brands often use it to launch specialized offerings, while smaller companies use it to compete effectively without large budgets."
        },
        {
            question: "How do you identify the right niche for a business?",
            answer: "The process involves understanding customer needs, analyzing demand patterns, studying competitors, and evaluating long-term growth potential. The right niche balances market opportunity with a brand's strengths."
        },
        {
            question: "How long does it take to see results from a niche-focused strategy?",
            answer: "Results depend on the market and execution. Early improvements in engagement may appear within weeks, while stronger outcomes like consistent leads and brand authority develop over several months."
        },
        {
            question: "Can niche marketing help improve lead quality?",
            answer: "Yes. By focusing on relevance and intent, niche marketing attracts users who are more likely to enquire, convert, and stay engaged, leading to better-quality leads rather than higher volume."
        },
        {
            question: "Does niche marketing limit business growth?",
            answer: "No. Starting with a focused audience often makes growth more sustainable. Once authority is established in one segment, businesses can expand into related areas without losing clarity."
        },
        {
            question: "How does niche marketing support long-term brand value?",
            answer: "By consistently addressing specific customer needs, brands build trust, recognition, and loyalty. Over time, this strengthens positioning and creates a competitive advantage that is difficult to replicate."
        }
    ];

    const services = [
        {
            icon: Search,
            title: "Market Intelligence & Research",
            description: "Understanding a market deeply is the foundation of successful growth. We study demand patterns, buyer expectations, and competitive gaps to uncover opportunities.",
            features: ["Target market segmentation by intent", "Audience behavior analysis", "Vertical market analysis"]
        },
        {
            icon: Target,
            title: "Strategic Positioning & Planning",
            description: "We develop a structured strategy that aligns the brand with a clearly defined space, shaping how the business is perceived and why it stands out.",
            features: ["Market segmentation strategy", "Target market identification", "Market positioning clarity"]
        },
        {
            icon: Users,
            title: "Audience-Focused Execution",
            description: "Execution built around relevance. We help brands communicate with people most likely to engage, enquire, and convert at the right moment.",
            features: ["Buyer persona optimization", "Defined customer personas", "Narrow target messaging"]
        },
        {
            icon: Megaphone,
            title: "Personalized & Product-Led Campaigns",
            description: "For businesses offering specialized solutions, personalization becomes a growth driver. We design hyper-personalized campaigns aligned with user context.",
            features: ["Niche product marketing", "Micro niche segmentation", "Funnel alignment"]
        },
        {
            icon: TrendingUp,
            title: "Growth & Retention Optimization",
            description: "We continuously evaluate performance and apply structured improvements to support long-term value through continuous refinement.",
            features: ["Competitor analysis", "Funnel optimization", "Customer retention strategies"]
        },
        {
            icon: Zap,
            title: "Demand Activation & Scalable Growth",
            description: "Once a niche is defined, we focus on generating consistent demand without diluting positioning, ensuring sustainable growth.",
            features: ["High-intent traffic generation", "Channel selection strategy", "Controlled expansion"]
        }
    ];

    const features = [
        {
            icon: Award,
            title: "Specialized Marketing Focus",
            description: "We partner with brands that prefer clarity over volume and depth over noise. Our approach focuses on understanding specific market segments and aligning messaging to well-defined audiences for stronger engagement."
        },
        {
            icon: TrendingUp,
            title: "Authority-Driven Approach",
            description: "Authority is built through consistency, insight, and relevance. We position brands as reliable sources within their niche by aligning messaging with real customer needs and market expectations."
        },
        {
            icon: Target,
            title: "Clear Niche Positioning",
            description: "Strong positioning starts with clarity. We help businesses define who they serve, what problem they solve, and why their offering matters within a specific segment."
        },
        {
            icon: BarChart3,
            title: "Data-Led Decisions",
            description: "Every strategic decision is informed by research, performance signals, and audience behavior. We rely on measurable insights to guide planning and ensure campaigns adapt to market realities."
        },
        {
            icon: Search,
            title: "Local Expertise",
            description: "With hands-on experience in Kochi and across Kerala, we understand regional business dynamics, customer behavior, and market nuances for relevant, scalable growth."
        }
    ];

    const strategies = [
        {
            icon: Compass,
            title: "Identify & Define Your Niche",
            number: "01",
            description: "Start by understanding who you serve and why. We conduct deep market analysis to identify high-demand segments where your strengths create genuine competitive advantage.",
            steps: [
                "Analyze customer pain points and unmet needs",
                "Study competitor positioning and gaps",
                "Define your unique value proposition",
                "Validate market demand and size"
            ]
        },
        {
            icon: Lightbulb,
            title: "Build Authority Through Relevance",
            number: "02",
            description: "Once your niche is clear, establish yourself as a trusted resource. We develop messaging, content, and positioning that directly address your audience's specific needs and expectations.",
            steps: [
                "Create niche-focused messaging framework",
                "Develop authority content and resources",
                "Build reputation in target segment",
                "Establish thought leadership position"
            ]
        },
        {
            icon: Layers,
            title: "Scale Systematically Within Your Niche",
            number: "03",
            description: "Growth doesn't mean abandoning your focus. We help you scale demand generation, optimize conversions, and expand into adjacent markets while maintaining niche authority.",
            steps: [
                "Generate high-intent qualified leads",
                "Optimize funnel for your audience",
                "Build sustainable growth systems",
                "Expand to adjacent niches strategically"
            ]
        }
    ];

    const testimonials = [
        {
            text: "Working with the team helped us bring clarity to our marketing. Instead of chasing volume, we started attracting enquiries that actually matched our services. The difference in lead quality was noticeable within a few months.",
            author: "Service Business Owner"
        },
        {
            text: "What stood out was their understanding of our market. The strategy wasn't generic and felt well thought out. Our messaging became more focused, and customer engagement improved steadily over time.",
            author: "Founder, Product-Based Brand"
        },
        {
            text: "They took the time to understand how our audience thinks and searches. The changes made to positioning and campaigns helped us convert existing traffic more effectively without increasing spend.",
            author: "Marketing Lead"
        },
        {
            text: "Our brand finally feels differentiated. Earlier, we struggled to explain why we were different. Now the messaging is clear, consistent, and resonates with the right customers.",
            author: "Operations Manager"
        },
        {
            text: "The process was transparent and structured. We always knew what was being done and why. The results came gradually, but they were stable and sustainable.",
            author: "Business Consultant"
        }
    ];

    const caseStudies = [
        {
            title: "Service-Based Brand — Qualified Lead Improvement",
            category: "Service-Based Business",
            challenge: "The brand relied on broad messaging and generic campaigns. While traffic was steady, enquiries lacked relevance and sales teams spent excessive time filtering unqualified leads.",
            approach: "We conducted niche market analysis and refined target market segmentation to identify high-intent user groups. Messaging was realigned through strategic positioning.",
            results: [
                { stat: "+34%", label: "Qualified Enquiries" },
                { stat: "+41%", label: "Lead Relevance" },
                { stat: "-22%", label: "Follow-up Time" }
            ]
        },
        {
            title: "Product-Focused Brand — Conversion Growth",
            category: "Product-Based Business",
            challenge: "The website attracted traffic from multiple sources, but conversions remained low. Visitors lacked clear intent alignment, resulting in high bounce rates.",
            approach: "We restructured the niche sales funnel using audience behavior analysis and implemented personalized campaign execution focused on high-intent traffic.",
            results: [
                { stat: "+29%", label: "Conversion Rate" },
                { stat: "-24%", label: "Bounce Rate" },
                { stat: "-18%", label: "Cost Per Acquisition" }
            ]
        },
        {
            title: "Local Business in Kochi — Niche Positioning",
            category: "Local Business Growth",
            challenge: "The business blended into a competitive local market with similar messaging to competitors. Visibility existed, but differentiation was minimal.",
            approach: "We applied vertical market analysis and refined niche positioning to clarify the brand's specialization. Outreach and messaging were localized for regional relevance.",
            results: [
                { stat: "+37%", label: "Qualified Local Leads" },
                { stat: "+21%", label: "Repeat Customer Rate" },
                { stat: "↑", label: "Brand Recall" }
            ]
        }
    ];

    return (
        <div className="font-['Noto Sans'] bg-[#0F0F0F] text-[#F5F5F5] overflow-x-hidden nm-page">
            <Seo
                title="Best Niche Marketing Agency in Kerala | Social Bureau"
                description="Niche Marketing Agency in Kerala helping brands dominate their niche through data driven strategy, stronger conversions, and long term business growth"
                keywords="Niche Marketing Agency, Marketing Agency, Niche marketing services in Kochi"
            />

            {/* Animations */}
            <style dangerouslySetInnerHTML={{
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
            `}} />

            {/* Hero Section */}
            <section className="min-h-screen flex items-center pt-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F] pb-0">
                <div className="absolute top-32 right-0 w-full md:w-3/5 h-full bg-gradient-to-br from-[#C0C0C0] to-[#808080] clip-path-polygon opacity-5 animate-float hidden md:block"></div>
                <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 px-4 sm:px-6 pb-20 sm:pb-24 lg:pb-32">
                    <div className="animate-fadeInUp">
                        <h1 className="font-['Syne'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 lg:mb-8 text-white">
                            Niche Marketing Agency in Kerala
                        </h1>
                        <p className="text-base sm:text-lg text-[#BFBFBF] mb-8 lg:mb-12 max-w-2xl">
                            Transform business growth by focusing on clarity, relevance, and specialization. We help brands reach audiences that actually convert—through carefully structured niche-focused strategies designed for long-term authority and sustainable results.
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                            <a href="https://api.whatsapp.com/send/?phone=918921840486&text=Hello%2C+I+would+like+to+learn+more.&type=phone_number&app_absent=0" className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#C0C0C0] to-[#A9A9A9] text-[#0F0F0F] font-semibold rounded-full hover:translate-y-[-3px] hover:shadow-2xl hover:shadow-[#808080]/40 transition-all text-sm sm:text-base">
                                Book a Strategy Call
                            </a>
                            <a href="#services" className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-transparent text-white font-semibold rounded-full border-2 border-[#808080] hover:bg-[#1A1A1A] hover:border-[#C0C0C0] hover:translate-y-[-3px] transition-all text-sm sm:text-base">
                                Explore Services
                            </a>
                        </div>
                    </div>
                    <div className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center animate-fadeInRight mt-8 md:mt-0">
                        <img src="assets/niche-marketing.webp" alt="niche-marketing" className="w-full h-full object-contain" />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-[#1A1A1A] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 lg:-mt-24 relative z-20 border-t border-[#333333]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {[
                            { number: '34', label: 'Increase in Qualified Enquiries', suffix: '%' },
                            { number: '41', label: 'Lead Relevance Improvement', suffix: '%' },
                            { number: '29', label: 'Conversion Rate Growth', suffix: '%' },
                            { number: '37', label: 'Local Leads Growth', suffix: '%' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center p-4 sm:p-6 lg:p-8 hover:translate-y-[-5px] transition-transform relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-3/5 after:bg-gradient-to-b from-transparent via-[#666666] to-transparent after:opacity-20 last:after:hidden even:after:hidden md:even:after:block">
                                <div className="text-xs sm:text-sm lg:text-base text-[#999999]">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-[#C0C0C0] to-[#808080] text-[#0F0F0F] text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        About Us
                    </span>
                    <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">Niche Marketing Strategy</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                    <div className="h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-[rgba(192,192,192,0.1)] to-[rgba(128,128,128,0.1)] rounded-3xl flex items-center justify-center relative overflow-hidden p-4 border border-[#333333]">
                        <img src="/assets/niche2.webp" alt="niche marketing" className="w-full h-full object-contain" />
                    </div>
                    <div className="animate-fadeInRight">
                        <h3 className="font-['Syne'] text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Focus on Clarity & Relevance</h3>
                        <p className="text-[#BFBFBF] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                            Niche marketing is the process of identifying a clearly defined market segment and building communication, positioning, and messaging around that audience's specific needs. Unlike broad campaigns, this approach prioritizes relevance over reach and depth over volume.
                        </p>
                        <p className="text-[#BFBFBF] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                            At Social Bureau, a Kochi-based marketing agency, we work with businesses that want to grow through specialization. Our team studies how audiences think, search, and make decisions, then builds structured marketing systems that support long-term positioning and consistent demand.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-start gap-3">
                                <span className="text-[#C0C0C0] font-bold text-lg">✓</span>
                                <span className="text-[#BFBFBF] text-sm sm:text-base">Research-backed planning and execution</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#C0C0C0] font-bold text-lg">✓</span>
                                <span className="text-[#BFBFBF] text-sm sm:text-base">Structured approach to positioning</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#C0C0C0] font-bold text-lg">✓</span>
                                <span className="text-[#BFBFBF] text-sm sm:text-base">Measurable outcomes and growth</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-[#C0C0C0] to-[#808080] text-[#0F0F0F] text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                            Our Services
                        </span>
                        <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">Niche marketing services</h2>
                        <p className="text-base sm:text-lg text-[#BFBFBF] max-w-3xl mx-auto px-4">
                            We design and implement marketing solutions built around precision rather than assumptions. Each service is delivered with research-backed planning, structured execution, and measurable outcomes.
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
                                    <h3 className="font-['Syne'] text-lg sm:text-xl font-bold mb-3 sm:mb-4 relative z-10 text-white">
                                        {service.title}
                                    </h3>
                                    <p className="text-[#BFBFBF] mb-4 sm:mb-6 relative z-10 text-sm sm:text-base">
                                        {service.description}
                                    </p>
                                    <ul className="space-y-1 sm:space-y-2 relative z-10">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="text-[#BFBFBF] flex items-start text-xs sm:text-sm">
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

            {/* Strategies Section - NEW */}
            <section id="strategies" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-[#C0C0C0] to-[#808080] text-[#0F0F0F] text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        Our Approach
                    </span>
                    <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">Three-Step Niche Strategy</h2>
                    <p className="text-base sm:text-lg text-[#BFBFBF] max-w-3xl mx-auto">
                        Build sustainable growth by starting small, establishing authority, and scaling strategically within your market segment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                    {strategies.map((strategy, index) => {
                        const Icon = strategy.icon;
                        return (
                            <div
                                key={index}
                                className="relative bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-2 border-[#333333] rounded-3xl p-6 sm:p-8 lg:p-10 hover:border-[#C0C0C0] transition-all duration-300 group"
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >

                                {/* Icon */}
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#C0C0C0] to-[#808080] rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:shadow-lg transition-shadow">
                                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#0F0F0F]" />
                                </div>

                                {/* Title */}
                                <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 pr-12">
                                    {strategy.title}
                                </h3>

                                {/* Description */}
                                <p className="text-[#BFBFBF] text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
                                    {strategy.description}
                                </p>

                                {/* Steps */}
                                <div className="space-y-3">
                                    {strategy.steps.map((step, stepIdx) => (
                                        <div key={stepIdx} className="flex items-start gap-3">
                                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#333333] flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-[#C0C0C0] text-xs font-bold">{stepIdx + 1}</span>
                                            </div>
                                            <span className="text-[#BFBFBF] text-xs sm:text-sm leading-snug">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Why Choose Section */}
            <section
                id="why-choose"
                className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
                    <div className="text-center lg:text-left">
                        <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-[#C0C0C0] to-[#808080] text-[#0F0F0F] text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                            Why Choose Us
                        </span>
                        <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
                            What Sets Us Apart
                        </h2>
                        <p className="text-[#BFBFBF] max-w-xl">
                            We blend creativity, technology, and strategy to deliver experiences that truly stand out and drive results.
                        </p>
                    </div>

                    <div className="w-full flex justify-center lg:justify-end">
                        <img
                            src="assets/hajira2.webp"
                            alt="niche marketing expert"
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
                                <h3 className="font-['Syne'] text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">
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

            {/* Case Studies */}
            <section id="case-studies" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-[#C0C0C0] to-[#808080] text-[#0F0F0F] text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                            Case Studies
                        </span>
                        <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">Proven Results</h2>
                    </div>
                    <div className="space-y-8 sm:space-y-12">
                        {caseStudies.map((study, index) => (
                            <div key={index} className="bg-[#252525] rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg relative overflow-hidden border-l-4 border-[#C0C0C0] animate-fadeInUp" style={{ animationDelay: `${index * 0.15}s` }}>
                                <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-[#333333] text-[#C0C0C0] text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6">
                                    {study.category}
                                </span>
                                <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-white">{study.title}</h3>
                                <div className="mb-6 sm:mb-8">
                                    <h4 className="font-['Syne'] text-base sm:text-lg font-semibold text-[#C0C0C0] mb-2 sm:mb-3">The Challenge</h4>
                                    <p className="text-[#BFBFBF] text-sm sm:text-base">{study.challenge}</p>
                                </div>
                                <div className="mb-6 sm:mb-8">
                                    <h4 className="font-['Syne'] text-base sm:text-lg font-semibold text-[#C0C0C0] mb-2 sm:mb-3">The Approach</h4>
                                    <p className="text-[#BFBFBF] text-sm sm:text-base">{study.approach}</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-8 bg-[#333333] rounded-2xl">
                                    {study.results.map((result, idx) => (
                                        <div key={idx} className="text-center p-4">
                                            <div className="font-['Syne'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#C0C0C0] mb-1 sm:mb-2">{result.stat}</div>
                                            <div className="text-xs sm:text-sm text-[#999999]">{result.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-[#C0C0C0] to-[#808080] text-[#0F0F0F] text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        Testimonials
                    </span>
                    <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">What Our Clients Say</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-[#1A1A1A] p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg hover:translate-y-[-5px] transition-transform duration-300 border border-[#333333] animate-scaleIn" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="text-4xl sm:text-5xl text-[#666666] opacity-50 mb-3 sm:mb-4">❝</div>
                            <p className="text-[#BFBFBF] italic leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{testimonial.text}</p>
                            <div className="font-semibold text-[#E8E8E8] text-sm sm:text-base">— {testimonial.author}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-[#C0C0C0] to-[#808080] text-[#0F0F0F] text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        FAQ
                    </span>
                    <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-3 sm:space-y-4">
                    {faqItems.map((item, index) => (
                        <div key={index} className="bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#333333]">
                            <button
                                className="w-full p-4 sm:p-6 text-left flex justify-between items-center font-['Syne'] font-semibold hover:text-[#C0C0C0] transition-colors text-sm sm:text-base text-white"
                                onClick={() => toggleFaq(index)}
                            >
                                <span className="text-left pr-4">{item.question}</span>
                                <span className={`text-xl sm:text-2xl transition-transform flex-shrink-0 text-[#C0C0C0] ${activeFaq === index ? 'rotate-45' : ''}`}>+</span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                                <div className="p-4 sm:p-6 pt-0 text-[#BFBFBF] leading-relaxed text-sm sm:text-base">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="py-12 sm:py-16 lg:py-20 mx-4 sm:mx-6 lg:mx-8 my-8 sm:my-12 lg:my-16 bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] text-white rounded-3xl text-center relative overflow-hidden border border-[#333333]">
                <div className="absolute -top-1/2 -right-1/10 w-64 h-64 sm:w-96 sm:h-96 bg-radial-gradient(circle, rgba(192,192,192,0.1), transparent) rounded-full animate-pulse-slow hidden sm:block"></div>
                <h2 className="font-['Syne'] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 relative z-10 px-4 text-white">Ready to Build Authority in Your Niche?</h2>
                <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-[#BFBFBF] relative z-10 px-4">
                    Let's discuss how niche marketing can drive sustainable growth and establish clear positioning for your business.
                </p>
                <a href="https://api.whatsapp.com/send/?phone=918921840486&text=Hello%2C+I+would+like+to+learn+more.&type=phone_number&app_absent=0" className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#C0C0C0] to-[#A9A9A9] text-[#0F0F0F] font-semibold rounded-full hover:translate-y-[-3px] hover:shadow-[0_15px_40px_rgba(192,192,192,0.3)] transition-all relative z-10 text-sm sm:text-base">
                    Connect With Us
                </a>
            </section>

            {/* Scroll to Top Button */}
            <button
                className={`fixed bottom-6 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#C0C0C0] to-[#808080] text-[#0F0F0F] rounded-full flex items-center justify-center text-lg sm:text-xl shadow-lg hover:translate-y-[-5px] transition-all font-bold ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={scrollToTop}
            >
                ↑
            </button>
        </div>
    );
};

export default NicheMarketing;