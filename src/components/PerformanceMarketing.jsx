import React, { useState, useRef, useEffect } from 'react';
import { BarChart3, Megaphone, Search, ShoppingCart, Target, Users } from 'lucide-react';

const PerformanceMarketing = () => {
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

    const CountUp = ({ end, duration = 1500, suffix = "" }) => {
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
                {value}
                {suffix}
            </span>
        );
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
            answer: "Success is evaluated using business-aligned indicators such as lead relevance, cost efficiency, and contribution to revenue. These insights help identify what's working and guide ongoing optimization efforts."
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
            answer: "No, it works best alongside organic strategies. Insights from paid efforts often improve content, user experience, and targeting, creating a stronger foundation for long-term brand visibility and trust."
        },
        {
            question: "What should businesses prepare before starting performance marketing?",
            answer: "Before starting performance marketing, businesses should define clear goals, understand their audience, and ensure digital assets are conversion-ready. Proper preparation improves efficiency and prevents wasted spend early on."
        }
    ];

    const services = [
        {
            icon: Target,
            title: "PPC Management",
            description: "We plan and execute paid search programs built around relevance, budget efficiency, and measurable outcomes.",
            features: ["Structured keyword and intent mapping", "Budget control with performance benchmarks", "Ongoing optimization based on results"]
        },
        {
            icon: Megaphone,
            title: "Paid Advertising",
            description: "We develop structured advertising programs across digital platforms to support visibility and acquisition goals.",
            features: ["Platform-aligned campaign structure", "Clear messaging for intent-based audiences", "Continuous performance monitoring"]
        },
        {
            icon: Users,
            title: "Meta Ads",
            description: "Audience-focused social campaigns designed to support awareness, consideration, and action across different stages.",
            features: ["Creative aligned to audience behavior", "Funnel-based campaign planning", "Performance-driven iteration cycles"]
        },
        {
            icon: Search,
            title: "Google Ads",
            description: "Search-led programs designed to capture demand at the right moment while maintaining efficiency.",
            features: ["Intent-based campaign architecture", "Cost control through structured bidding", "Ongoing refinement for quality traffic"]
        },
        {
            icon: ShoppingCart,
            title: "eCommerce Marketing",
            description: "Product-focused performance systems designed to support discovery, trust, and transaction readiness.",
            features: ["Catalog-driven campaign planning", "Audience refinement based on behavior", "Conversion-focused messaging alignment"]
        },
        {
            icon: BarChart3,
            title: "Marketing Analytics",
            description: "Measurement frameworks built to provide clarity into what works and how results can be scaled responsibly.",
            features: ["Clear reporting structures", "Insight-driven decision making", "Continuous performance evaluation"]
        }
    ];

    const features = [
        {
            number: "1",
            title: "ROI Driven Decision Making",
            description: "Every recommendation is grounded in measurable outcomes rather than assumptions. Campaign decisions are guided by efficiency benchmarks, helping businesses protect budgets while improving results steadily over time."
        },
        {
            number: "2",
            title: "Data Driven Marketing Execution",
            description: "Execution is guided by insights gathered from real user behavior and performance signals. Testing and refinement are ongoing, allowing campaigns to improve consistently."
        },
        {
            number: "3",
            title: "Performance Strategy Built for Scale",
            description: "Campaign structures are designed with future growth in mind. As demand increases, systems can be expanded without losing control, clarity, or efficiency."
        },
        {
            number: "4",
            title: "Channel-Specific Expertise",
            description: "Each platform is managed based on its unique strengths and limitations. Strategies are adapted to audience behavior and platform dynamics."
        },
        {
            number: "5",
            title: "Transparent Performance Reporting",
            description: "Clear reporting provides visibility into spend, outcomes, and optimization actions. Stakeholders always understand how campaigns are performing."
        }
    ];

    const testimonials = [
        {
            text: "Performance marketing finally became clear for us. Every campaign had purpose, every number had meaning, and we could confidently see how our efforts were translating into real business growth.",
            author: "Service Company Founder"
        },
        {
            text: "What we valued most was the clarity and structure they brought. Decisions were data-backed but always aligned with our goals, which helped us scale without feeling uncertain or reactive.",
            author: "eCommerce Brand Manager"
        },
        {
            text: "Communication was consistent and transparent throughout. We always knew what was happening, why it mattered, and how it would impact results, which made the entire process stress-free.",
            author: "B2B Marketing Head"
        },
        {
            text: "This wasn't just about ads or traffic. They helped us build a system that continues to perform as our business grows, giving us confidence in our long-term acquisition strategy.",
            author: "Startup Founder"
        },
        {
            text: "We saw a clear improvement in lead quality within weeks. Sales conversations became more relevant, follow-ups were easier, and our team spent less time filtering low-intent enquiries.",
            author: "B2B Sales Director"
        }
    ];

    return (
        <div className="font-['Noto Sans'] bg-[#F5F1EB] text-[#2C2C2C] overflow-x-hidden">
            {/* Add inline styles for animations */}
            <style jsx>{`
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
                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                .clip-path-polygon {
                    clip-path: polygon(100% 0, 100% 100%, 0 100%);
                }
                img {
                    max-width: 100%;
                    height: auto;
                }
            `}</style>

            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#D97634] to-[#B8956A] z-50" style={{ width: '0%' }}></div>

            {/* Hero Section - FIXED */}
            <section className="min-h-screen flex items-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-visible bg-gradient-to-br from-[#F5F1EB] to-[#F0E8E0]">
                {/* Decorative background - adjusted to not overlap */}
                <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-br from-[#B8956A] to-[#D97634] clip-path-polygon opacity-5 animate-float hidden lg:block -z-0"></div>

                <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
                    <div className="animate-fadeInUp">
                        <h1 className="font-['Noto Sans'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 lg:mb-8 text-[#2C2C2C]">
                            Performance Marketing Agency
                            <span className="block bg-gradient-to-br from-[#D97634] to-[#B8956A] bg-clip-text text-transparent mt-2">
                                in Kochi
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg text-[#666666] mb-8 lg:mb-12 max-w-2xl">
                            We help businesses scale visibility, enquiries, and revenue through outcome-focused advertising systems designed for measurable growth across modern digital platforms.
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                            <a href="https://api.whatsapp.com/send/?phone=918921840486&text=Hello%2C+I+would+like+to+learn+more.&type=phone_number&app_absent=0" className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-br from-[#E67E3C] to-[#D46E2F] text-white font-semibold rounded-full hover:translate-y-[-3px] hover:shadow-xl hover:shadow-orange-500/30 transition-all text-sm sm:text-base">
                                Book a Strategy Call
                            </a>
                            <a href="#services" className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-white text-[#2C2C2C] font-semibold rounded-full border-2 border-[#B8956A] hover:bg-[#B8956A] hover:text-white hover:translate-y-[-3px] transition-all text-sm sm:text-base">
                                Explore Services
                            </a>
                        </div>
                    </div>
                    <div className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center animate-fadeInUp mt-8 md:mt-0">
                        <div className="w-full h-full bg-gradient-to-br from-[rgba(230,126,60,0.1)] to-[rgba(74,155,158,0.1)] rounded-3xl overflow-hidden flex items-center justify-center p-4">
                            <img
                                src="assets/performance-marketing.webp"
                                alt="Performance Marketing Agency in Kochi"
                                className="w-full h-full object-cover rounded-2xl"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative z-20 mt-8 sm:mt-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {[
                            { number: '58%', label: 'Increase in Qualified Enquiries' },
                            { number: '41%', label: 'Conversion Rate Improvement' },
                            { number: '46%', label: 'Better Lead Quality' },
                            { number: '27%', label: 'Reduced Cart Abandonment' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center p-4 sm:p-6 lg:p-8 hover:translate-y-[-5px] transition-transform relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-3/5 after:bg-gradient-to-b from-transparent via-[#CCCCCC] to-transparent after:opacity-20 last:after:hidden even:after:hidden md:even:after:block">
                                <div className="font-['Noto Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-[#D97634] to-[#B8956A] bg-clip-text text-transparent mb-2 sm:mb-3">
                                    <CountUp
                                        end={parseInt(stat.number)}
                                        suffix={stat.number.replace(/[0-9]/g, "")}
                                    />
                                </div>

                                <div className="text-xs sm:text-sm lg:text-base text-[#666666]">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#B8956A] to-[#D97634] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        About Us
                    </span>
                    <h2 className="font-['Noto Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#2C2C2C]">Performance Marketing Specialist</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                    <div className="h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-[rgba(230,126,60,0.1)] to-[rgba(74,155,158,0.1)] rounded-3xl flex items-center justify-center relative overflow-hidden p-4">
                        <img
                            src="assets/performancemarketing3.webp"
                            alt="Performance Marketing Results"
                            className="w-full h-full object-cover rounded-2xl"
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <h3 className="font-['Noto Sans'] text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#2C2C2C]">Results That Matter</h3>
                        <p className="text-[#666666] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                            Performance marketing is a results-oriented approach where every campaign is measured against clear outcomes such as enquiries, purchases, or qualified actions. Instead of focusing only on impressions, performance marketing prioritizes accountability, efficiency, and measurable returns.
                        </p>
                        <p className="text-[#666666] leading-relaxed text-sm sm:text-base">
                            At Social Bureau, we work as a strategic partner, supporting brands with structured performance-led systems that align budgets, messaging, and targeting with real business objectives.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#B8956A] to-[#D97634] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                            Our Services
                        </span>
                        <h2 className="font-['Noto Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#2C2C2C]">Performance Marketing Services Kerala</h2>
                        <p className="text-base sm:text-lg text-[#666666] max-w-3xl mx-auto px-4 mb-8">
                            Our services are designed to support sustainable scaling by aligning paid channels with intent, data signals, and conversion-focused execution.
                        </p>
                        <div className="max-w-4xl mx-auto mb-12">
                            <img
                                src="/assets/performancemarketing1.webp"
                                alt="Performance Marketing Services"
                                className="w-full h-auto max-h-[400px] object-cover rounded-2xl shadow-lg"
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {services.map((service, index) => {
                            const Icon = service.icon;

                            return (
                                <div
                                    key={index}
                                    className="bg-white p-4 sm:p-6 lg:p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:translate-y-[-10px] transition-all duration-400 border-2 border-transparent hover:border-[#B8956A] relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#D97634] to-[#B8956A] opacity-0 group-hover:opacity-5 transition-opacity z-0"></div>

                                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#D97634] to-[#B8956A] rounded-xl flex items-center justify-center mb-4 sm:mb-6 relative z-10">
                                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                                    </div>

                                    <h3 className="font-['Noto Sans'] text-lg sm:text-xl font-bold mb-3 sm:mb-4 relative z-10 text-[#2C2C2C]">
                                        {service.title}
                                    </h3>

                                    <p className="text-[#666666] mb-4 sm:mb-6 relative z-10 text-sm sm:text-base">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-1 sm:space-y-2 relative z-10">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="text-[#666666] flex items-start text-xs sm:text-sm">
                                                <span className="text-[#B8956A] font-bold mr-2">✓</span>
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

            {/* Why Choose Us */}
            <section
                id="why-choose"
                className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
            >
                {/* HEADER – full width */}
                <div className="mb-12">
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#B8956A] to-[#D97634] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4">
                        Why Choose Us
                    </span>

                    <h2 className="font-['Noto Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2C2C]">
                        What Sets Us Apart
                    </h2>
                </div>

                {/* CONTENT ROW – cards + image start SAME height */}
                <div className="grid lg:grid-cols-[1.8fr_1fr] gap-12 items-start">

                    {/* LEFT: Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-2xl border border-[#E5E5E5] hover:border-[#B8956A] hover:shadow-lg transition-all"
                            >
                                <div className="w-9 h-9 bg-gradient-to-br from-[#D97634] to-[#B8956A] text-white rounded-full flex items-center justify-center font-['Noto Sans'] font-bold text-sm mb-4">
                                    {feature.number}
                                </div>

                                <h3 className="font-['Noto Sans'] font-bold mb-2 text-base text-[#2C2C2C]">
                                    {feature.title}
                                </h3>

                                <p className="text-[#666666] text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT: Image */}
                    <div className="flex justify-center mt-1">
                        <div className="bg-gradient-to-br from-[rgba(230,126,60,0.1)] to-[rgba(74,155,158,0.1)] rounded-3xl p-4 max-w-[380px]">
                            <img
                                src="assets/PMO.webp"
                                alt="Performance Marketing Operating Model"
                                className="w-full max-h-[540px] object-contain rounded-2xl shadow-xl"
                                loading="lazy"
                            />
                        </div>
                    </div>

                </div>
            </section>

            {/* Case Studies */}
            <section id="case-studies" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#B8956A] to-[#D97634] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                            Case Studies
                        </span>
                        <h2 className="font-['Noto Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#2C2C2C]">Proven Results</h2>
                    </div>
                    <div className="space-y-8 sm:space-y-12">
                        {/* Case Study 1 */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg relative overflow-hidden border-l-4 border-[#E67E3C]">
                            <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-[#F8F4F0] text-[#E67E3C] text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6">
                                Service-Based Business
                            </span>
                            <h3 className="font-['Noto Sans'] text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-[#2C2C2C]">Transforming Digital Visibility for Service Companies</h3>
                            <div className="mb-6 sm:mb-8">
                                <h4 className="font-['Noto Sans'] text-base sm:text-lg font-semibold text-[#E67E3C] mb-2 sm:mb-3">The Challenge</h4>
                                <p className="text-[#666666] text-sm sm:text-base">
                                    A service-focused company with strong offline credibility but limited visibility and inconsistent enquiries from digital channels. The website attracted traffic, but visitors rarely converted.
                                </p>
                            </div>
                            <div className="mb-6 sm:mb-8">
                                <h4 className="font-['Noto Sans'] text-base sm:text-lg font-semibold text-[#E67E3C] mb-2 sm:mb-3">The Approach</h4>
                                <p className="text-[#666666] text-sm sm:text-base">
                                    We refined the website structure by clarifying service positioning and aligning content with high-intent user journeys. Pages were optimized to address real buyer concerns.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-8 bg-[#F8F4F0] rounded-2xl">
                                <div className="text-center p-4">
                                    <div className="font-['Noto Sans'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E67E3C] mb-1 sm:mb-2">+58%</div>
                                    <div className="text-xs sm:text-sm text-[#666666]">Qualified Enquiries (90 days)</div>
                                </div>
                                <div className="text-center p-4">
                                    <div className="font-['Noto Sans'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E67E3C] mb-1 sm:mb-2">-34%</div>
                                    <div className="text-xs sm:text-sm text-[#666666]">Bounce Rate Reduction</div>
                                </div>
                                <div className="text-center p-4">
                                    <div className="font-['Noto Sans'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E67E3C] mb-1 sm:mb-2">Shorter</div>
                                    <div className="text-xs sm:text-sm text-[#666666]">Sales Conversations</div>
                                </div>
                            </div>
                        </div>

                        {/* Case Study 2 */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg relative overflow-hidden border-l-4 border-[#E67E3C]">
                            <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-[#F8F4F0] text-[#E67E3C] text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6">
                                eCommerce Brand
                            </span>
                            <h3 className="font-['Noto Sans'] text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-[#2C2C2C]">Scaling Revenue for Online Retailers</h3>
                            <div className="mb-6 sm:mb-8">
                                <h4 className="font-['Noto Sans'] text-base sm:text-lg font-semibold text-[#E67E3C] mb-2 sm:mb-3">The Challenge</h4>
                                <p className="text-[#666666] text-sm sm:text-base">
                                    An eCommerce brand experiencing steady traffic but struggling to convert visitors into repeat customers. Despite consistent ad spend, conversion rates remained low.
                                </p>
                            </div>
                            <div className="mb-6 sm:mb-8">
                                <h4 className="font-['Noto Sans'] text-base sm:text-lg font-semibold text-[#E67E3C] mb-2 sm:mb-3">The Approach</h4>
                                <p className="text-[#666666] text-sm sm:text-base">
                                    We analyzed user behavior across the funnel and restructured product pages to improve clarity, trust, and usability. Conversion-focused improvements were introduced.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-8 bg-[#F8F4F0] rounded-2xl">
                                <div className="text-center p-4">
                                    <div className="font-['Noto Sans'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E67E3C] mb-1 sm:mb-2">+41%</div>
                                    <div className="text-xs sm:text-sm text-[#666666]">Conversion Rate (3 months)</div>
                                </div>
                                <div className="text-center p-4">
                                    <div className="font-['Noto Sans'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E67E3C] mb-1 sm:mb-2">-27%</div>
                                    <div className="text-xs sm:text-sm text-[#666666]">Cart Abandonment</div>
                                </div>
                                <div className="text-center p-4">
                                    <div className="font-['Noto Sans'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E67E3C] mb-1 sm:mb-2">Higher</div>
                                    <div className="text-xs sm:text-sm text-[#666666]">Revenue Per Visitor</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#B8956A] to-[#D97634] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        Testimonials
                    </span>
                    <h2 className="font-['Noto Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#2C2C2C]">What Our Clients Say</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg hover:translate-y-[-5px] transition-transform duration-300">
                            <div className="text-4xl sm:text-5xl text-[#B8956A] opacity-30 mb-3 sm:mb-4">❝</div>
                            <p className="text-[#666666] italic leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{testimonial.text}</p>
                            <div className="font-semibold text-[#2C2C2C] text-sm sm:text-base">— {testimonial.author}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#B8956A] to-[#D97634] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        FAQ
                    </span>
                    <h2 className="font-['Noto Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#2C2C2C]">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-3 sm:space-y-4">
                    {faqItems.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <button
                                className="w-full p-4 sm:p-6 text-left flex justify-between items-center font-['Noto Sans'] font-semibold hover:text-[#E67E3C] transition-colors text-sm sm:text-base text-[#2C2C2C]"
                                onClick={() => toggleFaq(index)}
                            >
                                <span className="text-left pr-4">{item.question}</span>
                                <span className={`text-xl sm:text-2xl transition-transform flex-shrink-0 text-[#E67E3C] ${activeFaq === index ? 'rotate-45' : ''}`}>+</span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                                <div className="p-4 sm:p-6 pt-0 text-[#666666] leading-relaxed text-sm sm:text-base">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="py-12 sm:py-16 lg:py-20 mx-4 sm:mx-6 lg:mx-8 my-8 sm:my-12 lg:my-16 bg-gradient-to-br from-[#2C2C2C] to-[#3C3C3C] text-white rounded-3xl text-center relative overflow-hidden">
                <div className="absolute -top-1/2 -right-1/10 w-64 h-64 sm:w-96 sm:h-96 bg-radial-gradient(circle, rgba(74,155,158,0.2), transparent) rounded-full animate-pulse-slow hidden sm:block"></div>
                <h2 className="font-['Noto Sans'] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 relative z-10 px-4">Ready to Scale Your Business?</h2>
                <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-200 relative z-10 px-4">
                    Let's discuss how performance marketing can drive measurable growth for your business.
                </p>
                <a href="https://api.whatsapp.com/send/?phone=918921840486&text=Hello%2C+I+would+like+to+learn+more.&type=phone_number&app_absent=0" className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#E67E3C] to-[#D46E2F] text-white font-semibold rounded-full hover:translate-y-[-3px] hover:shadow-[0_15px_40px_rgba(230,126,60,0.3)] transition-all relative z-10 text-sm sm:text-base">
                    Connect With Us
                </a>
            </section>

            {/* Scroll to Top Button */}
            <button
                className={`fixed bottom-6 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#D97634] to-[#B8956A] text-white rounded-full flex items-center justify-center text-lg sm:text-xl shadow-lg hover:translate-y-[-5px] transition-all font-bold ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={scrollToTop}
            >
                ↑
            </button>
        </div>
    );
};

export default PerformanceMarketing;