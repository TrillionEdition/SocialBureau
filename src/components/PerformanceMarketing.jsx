import React, { useState, useRef, useEffect } from 'react';
import { BarChart3, Megaphone, Search, ShoppingCart, Target, Users, ChevronRight, ArrowUp, Plus, X, CheckCircle, BarChart, Settings, Smartphone, Layers, Shield } from 'lucide-react';
import Seo from './Seo';
import { getOptimizedCloudinaryUrl } from '../utils/cloudinary';

const PerformanceMarketing = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeFaq, setActiveFaq] = useState(null);
    const [activeCaseStudy, setActiveCaseStudy] = useState(0);

    useEffect(() => {
        let rafId;
        const handleScroll = () => {
            const update = () => {
                setIsScrolled(window.scrollY > 50);

                // Update scroll progress bar
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                const progressBar = document.querySelector('.scroll-progress-bar');
                if (progressBar) {
                    progressBar.style.transform = `scaleX(${winScroll / height})`;
                }
            };
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(update);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const faqItems = [
        {
            question: "What is performance marketing and how does it work?",
            answer: "Performance marketing is a results-focused digital approach where actions like enquiries or sales are tracked and optimized continuously. Brands invest based on measurable outcomes, allowing strategies to evolve using real data instead of assumptions."
        },
        {
            question: "How is this approach different from traditional advertising?",
            answer: "Traditional promotion focuses on exposure, while this model emphasizes measurable actions. Businesses evaluate success through user behavior, enabling smarter decisions, better budget control, and clearer insight into what actually drives results."
        },
        {
            question: "Is this strategy suitable for small businesses?",
            answer: "Yes, it works well for smaller businesses because spending can be adjusted in real time. Since results are measurable, brands can test, refine, and scale gradually without committing to large or risky upfront investments."
        },
        {
            question: "How long does it usually take to see results?",
            answer: "Timelines depend on factors like competition and market readiness. Early signals often appear within weeks, but consistent improvements usually develop over several months as insights are analyzed and strategies are refined."
        },
        {
            question: "How do you measure success in result-driven campaigns?",
            answer: "Success is evaluated using business-aligned indicators such as lead relevance, cost efficiency, and contribution to revenue. These insights help identify what’s working and guide ongoing optimization efforts."
        },
        {
            question: "Can performance marketing support long-term business growth?",
            answer: "Yes, when executed correctly, performance marketing helps build scalable systems rather than short-term gains. Over time, insights improve predictability, efficiency, and planning, supporting sustainable and controlled growth."
        },
        {
            question: "Does this approach work across different industries?",
            answer: "Yes, it can be adapted to many industries by aligning messaging with audience behavior and decision cycles. The key is understanding intent, expectations, and how customers evaluate solutions before taking action."
        },
        {
            question: "Why is data so important in this type of strategy?",
            answer: "Data provides clarity by revealing patterns, opportunities, and inefficiencies. Reliable insights allow informed decisions, reduce guesswork, and ensure improvements are based on evidence rather than assumptions."
        },
        {
            question: "Does this replace organic or long-term marketing efforts?",
            answer: "No, it works best alongside organic strategies. Insights from performance campaigns often strengthen content, user experience, and targeting, creating a stronger foundation for long-term visibility and trust."
        },
        {
            question: "What should businesses prepare before starting performance marketing?",
            answer: "Businesses should define clear goals, understand their audience, and ensure digital assets are conversion-ready. Proper preparation improves efficiency and helps prevent wasted spend during early stages."
        }
    ];

    const services = [
        {
            icon: Target,
            title: "PPC Management",
            description: "We plan and execute paid search programs built around relevance, budget efficiency, and measurable outcomes. Campaigns are continuously refined to improve efficiency without increasing risk. This approach helps maintain consistency even as competition and costs fluctuate",
            features: ["Structured keyword mapping", "Budget control benchmarks", "Ongoing optimization"]
        },
        {
            icon: Megaphone,
            title: "Paid Advertising",
            description: "We develop structured advertising programs across digital platforms to support visibility and acquisition goals while maintaining cost discipline. Each campaign is aligned with a clear objective to avoid wasted spend",
            features: ["Platform-aligned structure", "Clear intent-based messaging", "Continuous monitoring"]
        },
        {
            icon: Users,
            title: "Meta Ads",
            description: "Audience-focused social campaigns designed to support awareness, consideration, and action across different stages of the buying journey. Creative and targeting decisions are guided by performance signals rather than assumptions",
            features: ["Creative aligned to behavior", "Funnel-based planning", "Performance-driven iteration"]
        },
        {
            icon: Search,
            title: "Google Ads",
            description: "Search-led programs designed to capture demand at the right moment while maintaining efficiency and relevance. Campaigns are reviewed regularly to adapt to changes in user behavior",
            features: ["Intent-based architecture", "Cost control bidding", "Refinement for quality traffic"]
        },
        {
            icon: ShoppingCart,
            title: "E-Commerce Marketing",
            description: "Product-focused performance systems designed to support discovery, trust, and transaction readiness across paid channels. This helps brands scale sales while maintaining predictable acquisition costs",
            features: ["Catalog-driven planning", "Behavioral audience refinement", "Conversion-focused messaging"]
        },
        {
            icon: BarChart3,
            title: "Marketing Analytics",
            description: "Measurement frameworks built to provide clarity into what works, why it works, and how results can be scaled responsibly. Insights are used to guide both short-term adjustments and long-term planning",
            features: ["Clear reporting structures", "Insight-driven decisions", "Continuous evaluation"]
        }
    ];

    const whyChooseUs = [
        {
            icon: Layers,
            title: "ROI Driven Decision Making",
            description: "Every recommendation is grounded in measurable outcomes rather than assumptions. Decisions are guided by efficiency benchmarks to protect budgets while delivering steady, predictable performance growth."
        },
        {
            icon: BarChart,
            title: "Data Driven Marketing Execution",
            description: "Execution is informed by real user behavior and performance signals. Continuous testing and refinement ensure campaigns improve consistently instead of relying on one-time optimizations."
        },
        {
            icon: Target,
            title: "Performance Strategy Built for Scale",
            description: "Campaign structures are designed with future growth in mind, allowing systems to scale smoothly without losing control, clarity, or operational efficiency."
        },
        {
            icon: Settings,
            title: "Channel-Specific Expertise",
            description: "Each platform is managed according to its unique strengths and audience behavior. Strategies are adapted to platform dynamics rather than applying a one-size-fits-all approach."
        },
        {
            icon: Smartphone,
            title: "Transparent Performance Reporting",
            description: "Clear reporting provides visibility into spend, outcomes, and optimization actions, ensuring stakeholders always understand performance and improvement efforts."
        }
    ];

    const caseStudies = [
        {
            title: "Service-Based Business — Lead Quality Growth",
            type: "Service-Based",
            idealCustomer: "A service-focused company with strong offline credibility but limited digital visibility and inconsistent enquiries.",
            challenge: "The website attracted traffic, but visitors rarely converted. Messaging was broad, service pages lacked clarity, and enquiries were poorly aligned with sales expectations.",
            approach: "Refined website structure by clarifying service positioning and aligning content with high-intent user journeys. Improved navigation and conversion paths guided users toward meaningful actions.",
            results: [
                { value: "58%", label: "Qualified enquiries" },
                { value: "34%", label: "Bounce rate reduced" },
                { value: "Shorter", label: "Sales conversations" }
            ]
        },
        {
            title: "eCommerce Brand — Conversion Rate Optimization",
            type: "eCommerce",
            idealCustomer: "An eCommerce brand with steady traffic but struggling to convert visitors into repeat customers.",
            challenge: "Despite consistent ad spend, conversion rates remained low. Product pages lacked persuasive elements and users dropped off before checkout.",
            approach: "Analyzed user behavior across the funnel and restructured product pages to improve clarity, trust, and usability. Introduced conversion-focused improvements backed by performance tracking.",
            results: [
                { value: "41%", label: "Conversion rate" },
                { value: "27%", label: "Cart abandonment" },
                { value: "Higher", label: "Revenue per visitor" }
            ]
        },
        {
            title: "B2B Lead Generation — Lead Quality Improvement",
            type: "B2B Lead Gen",
            idealCustomer: "A B2B company offering specialized solutions and targeting decision-makers with longer buying cycles.",
            challenge: "Leads were coming in, but most lacked intent or decision authority. The sales team spent excessive time filtering unqualified enquiries.",
            approach: "Aligned messaging with buyer-stage intent and optimized landing pages to attract decision-makers ready to engage. Improved qualification through clearer value propositions.",
            results: [
                { value: "46%", label: "Lead quality" },
                { value: "8 wks", label: "Time to impact" },
                { value: "Higher", label: "Close rates" }
            ]
        }
    ];

    const testimonials = [
        {
            text: "Performance marketing finally became clear for us. Every campaign had purpose, every number had meaning, and we could clearly see how our efforts translated into real business growth.",
            author: "Operations Lead"
        },
        {
            text: "What we valued most was the clarity and structure they brought. Decisions were data-backed and aligned with our goals, which helped us scale without feeling uncertain or reactive.",
            author: "Marketing Manager"
        },
        {
            text: "Communication was consistent and transparent throughout. We always knew what was happening, why it mattered, and how it would impact results.",
            author: "Founder"
        },
        {
            text: "This wasn’t just about ads or traffic. They helped us build a system that continues to perform as our business grows, giving us confidence in our long-term acquisition strategy.",
            author: "Business Owner"
        },
        {
            text: "We saw a clear improvement in lead quality within weeks. Sales conversations became more relevant, follow-ups were easier, and our team spent less time filtering low-intent enquiries.",
            author: "Sales Lead"
        }
    ];

    return (
        <div className="font-['SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif] bg-white text-[#1d1d1f] overflow-x-hidden antialiased relative">
            <Seo
                title="Performance Marketing Agency in Kochi | SocialBureau"
                description="Drive measurable results with SocialBureau’s performance marketing. Boost conversions, optimize campaigns, and maximize ROI with data-driven strategies"
                keywords="performance marketing agency, kochi, kerala, PPC, Google Ads, Meta Ads,PERFORMANCE MARKETING AGENCY IN KOCHI, PERFORMANCE MARKETING STRATEGY, PPC Management, ROI Driven Decision Making"
                canonicalUrl="https://www.socialbureau.in/performance-marketing"
            />

            <style dangerouslySetInnerHTML={{
                __html: `
                * {
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
                
                .apple-overline {
                    font-size: 0.75rem;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    color: #86868b;
                    font-weight: 600;
                }
                
                .apple-heading {
                    font-size: clamp(2.5rem, 5vw, 3.5rem);
                    font-weight: 600;
                    line-height: 1.1;
                    letter-spacing: -0.015em;
                }
                
                .apple-card {
                    background: #ffffff;
                    border-radius: 24px;
                    padding: 2rem;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
                    transition: all 0.3s ease;
                    border: 1px solid #f5f5f7;
                }
                
                .apple-card:hover {
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
                    border-color: #e5e5e7;
                }
                
                .apple-button-primary {
                    background: #7E0A11;
                    color: white;
                    padding: 0.75rem 2rem;
                    border-radius: 980px;
                    font-size: 1rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .apple-button-primary:hover {
                    background: #63080d;
                    transform: scale(1.02);
                }
                
                .apple-button-secondary {
                    background: transparent;
                    color: #7E0A11;
                    padding: 0.75rem 2rem;
                    border-radius: 980px;
                    font-size: 1rem;
                    font-weight: 500;
                    border: 1px solid #7E0A11;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .apple-button-secondary:hover {
                    background: rgba(126, 10, 17, 0.05);
                }
                
                .apple-stat {
                    font-size: 2.5rem;
                    font-weight: 600;
                    color: #7E0A11;
                    line-height: 1;
                }
                
                .apple-stat-label {
                    font-size: 0.875rem;
                    color: #86868b;
                    margin-top: 0.5rem;
                }
                
                .scroll-progress-bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 3px;
                    width: 100%;
                    background: #7E0A11;
                    z-index: 1000;
                    transform: scaleX(0);
                    transform-origin: left;
                    will-change: transform;
                    transition: transform 0.1s ease;
                }
                
                .stack-layer {
                    position: sticky;
                    top: 0;
                    z-index: 1;
                    box-shadow: 0 -20px 40px rgba(0,0,0,0.05);
                }
                
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeUp {
                    animation: fadeUp 0.8s ease-out forwards;
                }

                /* CASE STUDIES RESULTS MOBILE RESPONSIVENESS */
                @media (max-width: 768px) {
                    .grid.grid-cols-3 {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }

                    .apple-stat {
                        font-size: 1.75rem !important;
                    }

                    .apple-stat-label {
                        font-size: 0.75rem !important;
                        margin-top: 0.375rem !important;
                        word-break: break-word;
                        line-height: 1.2;
                    }
                }

                @media (max-width: 640px) {
                    .grid.grid-cols-3 {
                        grid-template-columns: 1fr !important;
                        gap: 0.75rem !important;
                        padding-top: 0.75rem !important;
                        padding-bottom: 0.75rem !important;
                    }

                    .apple-stat {
                        font-size: 1.5rem !important;
                    }

                    .apple-stat-label {
                        font-size: 0.65rem !important;
                        word-break: break-word;
                        line-height: 1.1;
                        margin-top: 0.25rem !important;
                    }
                }

                /* CASE STUDY CARD MOBILE */
                @media (max-width: 768px) {
                    .apple-card.sticky {
                        position: relative !important;
                        top: 0 !important;
                    }

                    .apple-card {
                        padding: 1.5rem !important;
                    }

                    .apple-card h3 {
                        font-size: 1.25rem !important;
                    }

                    .apple-card h4 {
                        font-size: 0.95rem !important;
                    }

                    .apple-card p {
                        font-size: 0.9rem !important;
                    }
                }

                @media (max-width: 640px) {
                    .apple-card {
                        padding: 1rem !important;
                        border-radius: 12px !important;
                    }

                    .apple-card h3 {
                        font-size: 1.1rem !important;
                    }

                    .apple-card h4 {
                        font-size: 0.85rem !important;
                    }

                    .apple-card p {
                        font-size: 0.8rem !important;
                    }

                    [class*="space-y-6"] {
                        gap: 1rem !important;
                    }

                    [class*="border-t"] {
                        margin-top: 0.75rem !important;
                        padding-top: 0.75rem !important;
                    }
                }

                /* CASE STUDY LIST MOBILE */
                @media (max-width: 768px) {
                    .lg\:col-span-5 {
                        grid-column: span 1 !important;
                    }

                    .lg\:col-span-7 {
                        grid-column: span 1 !important;
                    }

                    .space-y-6 {
                        gap: 1rem !important;
                    }
                }

                /* GENERAL RESULTS SECTION FIX */
                @media (max-width: 640px) {
                    .text-center {
                        text-align: center;
                    }

                    .grid {
                        width: 100%;
                        overflow: visible;
                    }

                    div[class*="text-center"] {
                        padding: 0.5rem;
                    }
                }
                `
            }} />

            <div className="scroll-progress-bar" style={{ width: '0%' }}></div>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center px-6 lg:px-8 relative overflow-hidden bg-white stack-layer" style={{ zIndex: 10 }}>
                <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="animate-fadeUp">
                        <span className="apple-overline mb-4 block">Performance Marketing Agency</span>
                        <h1 className="apple-heading mb-6">
                            Performance Marketing Agency
                            <span className="block text-[#7E0A11]">in Kochi</span>
                        </h1>
                        <p className="apple-body text-[#515154] mb-10 max-w-2xl leading-relaxed text-lg">
                            We help businesses scale visibility, enquiries, and revenue through outcome-focused advertising systems designed for measurable growth across modern digital platforms.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="https://api.whatsapp.com/send/?phone=918714952665&text=Hello%2C+I+would+like+to+learn+more." className="apple-button-primary">
                                Book a Strategy Call
                                <ChevronRight className="w-4 h-4" />
                            </a>
                            <a href="#services" className="apple-button-secondary">
                                Explore Services
                            </a>
                        </div>
                    </div>
                    <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src={getOptimizedCloudinaryUrl("https://res.cloudinary.com/dtwcgfmar/image/upload/v1772086611/Digital_Marketing_Made_Simple__Strategy_Growth_cmfbtw.webp", 1200)}
                            alt="Performance Marketing Strategy Hero"
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="min-h-screen w-full bg-[#fbfbfd] text-black flex items-center stack-layer" style={{ zIndex: 20 }}>
                <div className="w-full px-6 lg:px-8 max-w-7xl mx-auto py-24">
                    <div className="text-center mb-16">
                        <span className="apple-overline mb-4 block text-gray-500">About Our Approach</span>
                        <h2 className="apple-heading text-4xl lg:text-5xl mb-6">Results-Oriented Marketing Strategy</h2>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h3 className="text-2xl mb-6 text-[#1d1d1f] font-semibold">Accountability, Efficiency, and Measurable Returns</h3>
                            <p className="text-[#515154] mb-6 leading-relaxed text-lg">
                                <a href='https://en.wikipedia.org/wiki/Performance-based_advertising' target='_blank' title="Learn more about Performance-based advertising on Wikipedia">Performance marketing</a> is a results-oriented approach where every campaign is measured against clear outcomes such as enquiries, purchases, or qualified actions. Instead of focusing only on impressions, performance marketing prioritizes accountability, efficiency, and measurable returns                            </p>
                            <p className="text-[#515154] leading-relaxed text-lg">
                                At <a href='https://socialbureau.in' title="Visit SocialBureau Official Website"> SocialBureau</a>, we work as a strategic partner, supporting brands with structured performance-led systems that align budgets, messaging, and targeting with real business objectives                            </p>
                        </div>
                        <div className="h-96 lg:h-[32rem] rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={getOptimizedCloudinaryUrl("https://res.cloudinary.com/dtwcgfmar/image/upload/v1772086613/SMM_PHOTOSHOOT_xdkcl5.webp", 1000)}
                                className="w-full h-full object-cover"
                                alt="Result driven performance marketing team at work"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="min-h-screen py-24 px-6 lg:px-8 bg-[#7E0A11] text-white stack-layer" style={{ zIndex: 30 }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="apple-overline mb-4 block text-white/70">Our Services</span>
                        <h2 className="apple-heading text-4xl lg:text-5xl mb-6 text-white">Performance Marketing Services Kerala</h2>
                        <p className="apple-body text-white/80 max-w-3xl mx-auto mb-12">
                            Our services are designed to support sustainable scaling by aligning paid channels with intent,
                            data signals, and conversion-focused execution. This ensures growth efforts remain efficient,
                            controlled, and adaptable as performance requirements evolve over time.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                        <div className="h-96 lg:h-[32rem] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
                            <img
                                src={getOptimizedCloudinaryUrl("https://res.cloudinary.com/dtwcgfmar/image/upload/v1772183939/Red_stock_martket_chart_p4hejw.webp", 1000)}
                                alt="Data-driven marketing charts and analytics"
                                className="w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-6 order-1 lg:order-2">
                            {services.slice(0, 3).map((service, index) => {
                                const Icon = service.icon;
                                return (
                                    <div key={index} className="rounded-2xl p-6 bg-[#63080d] border border-white/10">
                                        <div className="w-10 h-10 bg-[#7E0A11] rounded-xl flex items-center justify-center mb-4">
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                                        <p className="text-sm text-white/80 leading-relaxed">{service.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.slice(3).map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <div key={index} className="rounded-3xl p-8 bg-[#63080d] border border-white/10 hover:border-white/30 transition">
                                    <div className="w-12 h-12 bg-[#7E0A11] rounded-xl flex items-center justify-center mb-6">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                                    <p className="text-white/80 mb-6 text-sm leading-relaxed">{service.description}</p>
                                    <ul className="space-y-2">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="text-sm text-white/80 flex items-start">
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
            <section id="why-choose" className="py-24 px-6 lg:px-8 bg-white text-black stack-layer" style={{ zIndex: 40 }}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <span className="apple-overline mb-4 block text-gray-500">Why Choose Us</span>
                            <h2 className="apple-heading text-4xl lg:text-5xl mb-10 text-black">Data-Led Growth Partners</h2>

                            <div className="space-y-8">
                                {whyChooseUs.map((feature, index) => {
                                    const Icon = feature.icon;
                                    return (
                                        <div key={index} className="flex gap-6">
                                            <div className="flex-shrink-0 w-12 h-12 bg-[#7E0A11]/5 rounded-xl flex items-center justify-center">
                                                <Icon className="w-6 h-6 text-[#7E0A11]" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                                <p className="text-[#515154] leading-relaxed">{feature.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 h-[400px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl relative group">
                            <img
                                src={getOptimizedCloudinaryUrl("https://res.cloudinary.com/dtwcgfmar/image/upload/v1772022966/PMO_converted_yhchbh.webp", 1000)}
                                className="w-full h-full object-cover object-[50%_0%] origin-top transition-transform duration-700"
                                loading="lazy"
                                decoding="async"
                                alt="SocialBureau performance marketing results showcase"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section id="case-studies" className="py-24 bg-[#fbfbfd] stack-layer" style={{ zIndex: 50 }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="apple-overline block mb-3">Case Studies</span>
                        <h2 className="apple-heading text-4xl lg:text-5xl">Proven Results in Performance</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* LEFT list */}
                        <div className="lg:col-span-5 space-y-6">
                            {caseStudies.map((study, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveCaseStudy(index)}
                                    className={`apple-card text-left w-full transition-all duration-300 ${activeCaseStudy === index ? 'ring-2 ring-[#7E0A11] bg-white' : 'hover:bg-[#f5f5f7]'}`}
                                >
                                    <span className="text-xs font-semibold text-[#7E0A11] bg-[#7E0A11]/5 px-3 py-1.5 rounded-full uppercase tracking-wider">
                                        {study.type}
                                    </span>
                                    <h3 className="text-lg font-semibold mt-3 text-black">{study.title}</h3>
                                    <div className="text-[#7E0A11] text-sm mt-3 flex items-center gap-1 font-medium">
                                        View details <ChevronRight className="w-4 h-4" />
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* RIGHT details */}
                        <div className="lg:col-span-7">
                            <div className="apple-card sticky top-28">
                                <h3 className="text-2xl font-semibold mb-6 text-black">{caseStudies[activeCaseStudy].title}</h3>
                                <div className="space-y-6 text-sm lg:text-base">
                                    <div>
                                        <h4 className="font-semibold text-[#7E0A11] mb-1">Ideal Customer</h4>
                                        <p className="text-[#515154]">{caseStudies[activeCaseStudy].idealCustomer}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#7E0A11] mb-1">The Challenge</h4>
                                        <p className="text-[#515154]">{caseStudies[activeCaseStudy].challenge}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#7E0A11] mb-1">The Approach</h4>
                                        <p className="text-[#515154]">{caseStudies[activeCaseStudy].approach}</p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#f5f5f7]">
                                        {caseStudies[activeCaseStudy].results.map((result, idx) => (
                                            <div key={idx} className="text-center">
                                                <div className="apple-stat">{result.value}</div>
                                                <div className="apple-stat-label capitalize">{result.label}</div>
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
            <section id="testimonials" className="py-24 px-6 lg:px-8 bg-[#1d1d1f] text-white stack-layer" style={{ zIndex: 60 }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="apple-overline mb-4 block text-white/70">Testimonials</span>
                        <h2 className="apple-heading text-4xl lg:text-5xl text-white">Client Success Stories</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="rounded-3xl p-8 bg-white/5 border border-white/10">
                                <div className="text-6xl text-white opacity-20 mb-4 leading-none font-serif">“</div>
                                <p className="text-white/80 italic mb-6 leading-relaxed text-lg">{testimonial.text}</p>
                                <div className="font-semibold text-white">— {testimonial.author}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="w-full bg-white stack-layer" style={{ zIndex: 70 }}>
                <div className="max-w-3xl mx-auto px-6 py-24">
                    <div className="text-center mb-12">
                        <span className="apple-overline block mb-3 text-gray-500">FAQ</span>
                        <h2 className="apple-heading text-3xl lg:text-4xl text-black">Frequently Asked Questions</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {faqItems.map((item, index) => (
                            <div key={index} className="py-6">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex justify-between items-center text-left text-lg font-medium text-black hover:text-[#7E0A11] transition"
                                >
                                    <span>{item.question}</span>
                                    {activeFaq === index ? (
                                        <X className="w-4 h-4 text-[#7E0A11]" />
                                    ) : (
                                        <Plus className="w-4 h-4 text-gray-400" />
                                    )}
                                </button>
                                {activeFaq === index && (
                                    <div className="mt-4 text-[#515154] text-base leading-relaxed animate-fadeUp">
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="w-full px-6 py-24 bg-[#fbfbfd] stack-layer" style={{ zIndex: 80 }}>
                <div className="bg-[#1d1d1f] text-white rounded-[2rem] py-20 px-6 lg:px-16 text-center relative overflow-hidden max-w-7xl mx-auto shadow-2xl">
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#7E0A11] opacity-20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#7E0A11] opacity-10 rounded-full blur-3xl"></div>
                    <h2 className="apple-heading text-white mb-6">Scale Your Growth With Strategy</h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Let's discuss how <a href='https://socialbureau.in//blogs/where-roi-meets-creative-flow' target='_blank' title="Learn more about Performance Marketing">performance marketing</a> can drive measurable growth and clarity for your business.
                    </p>
                    <a href="/contact" className="apple-button-primary bg-white text-black hover:bg-gray-100 hover:scale-105 transition-all text-lg py-4 px-10">
                        Book a Strategy Call
                        <ChevronRight className="w-5 h-5 ml-1" />
                    </a>
                </div>
            </section>

            {/* Scroll to Top */}
            <button
                className={`fixed bottom-8 right-8 w-14 h-14 bg-[#7E0A11] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#63080d] hover:scale-110 active:scale-95 transition-all z-[1001] ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                onClick={scrollToTop}
            >
                <ArrowUp className="w-6 h-6" />
            </button>
        </div>
    );
};

export default PerformanceMarketing;