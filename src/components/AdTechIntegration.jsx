import React, { useState, useRef, useEffect } from 'react';
import {
    Settings,
    TrendingUp,
    DollarSign,
    Smartphone,
    Monitor,
    Shield,
    Zap,
    CheckCircle,
    BarChart,
    Database,
    Layers
} from 'lucide-react';
import Footer from './Footer';
import Seo from './Seo';

const AdTechIntegration = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeFaq, setActiveFaq] = useState(null);
    const [activeCaseStudy, setActiveCaseStudy] = useState(null);

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

    const toggleCaseStudy = (index) => {
        setActiveCaseStudy(activeCaseStudy === index ? null : index);
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

    const services = [
        {
            icon: Settings,
            title: "Ad Infrastructure Setup",
            description: "We configure enterprise-ready advertising systems that support scalability and long-term monetization.",
            features: [
                "Structured ad inventory management",
                "Scalable system architecture",
                "Transparent delivery and reporting",
                "Compliance-driven setup"
            ]
        },
        {
            icon: TrendingUp,
            title: "Monetization Optimization",
            description: "Deploy advanced Header Bidding frameworks across premium inventory for better revenue performance.",
            features: [
                "Demand source diversification",
                "Improved pricing efficiency",
                "Optimized bidding strategies",
                "Secure Ad Exchange integration"
            ]
        },
        {
            icon: DollarSign,
            title: "Revenue & Tracking Solutions",
            description: "Implement reliable Ad Solutions with accurate tracking for clear visibility into revenue performance.",
            features: [
                "Granular revenue insights",
                "Performance-based optimization",
                "Clear reporting structure",
                "Data-driven decisions"
            ]
        },
        {
            icon: Smartphone,
            title: "Multi-Platform Ad Delivery",
            description: "Ensure consistent ad delivery across devices with structured Advertising Automation.",
            features: [
                "Cross-device consistency",
                "Automated ad workflows",
                "Mobile & Web integration",
                "Reduced operational load"
            ]
        },
        {
            icon: Database,
            title: "Advanced Technology Enablement",
            description: "Custom AdTech Solutions aligned with broader Marketing Technology ecosystems.",
            features: [
                "Smarter audience segmentation",
                "Privacy-conscious data governance",
                "Scalable technology alignment",
                "Data Management Platform integration"
            ]
        },
        {
            icon: Shield,
            title: "Performance & Security",
            description: "Enable Real-Time Bidding with First-Party Data Activation and ensure brand safety.",
            features: [
                "Secure ad delivery",
                "Traffic quality control",
                "Ad Fraud Prevention",
                "Dynamic Creative Optimization"
            ]
        }
    ];

    const whyChooseUs = [
        {
            icon: Layers,
            title: "Advertising Ecosystem Expertise",
            description: "Strong understanding of how today's advertising ecosystem functions, including platform interactions, demand sources, and data layers."
        },
        {
            icon: BarChart,
            title: "Structured Inventory Management",
            description: "Specialize in managing ad inventory through well-structured delivery frameworks, organizing placements and demand priorities."
        },
        {
            icon: TrendingUp,
            title: "Targeted Yield Optimization",
            description: "Apply precision-focused strategies to audience targeting, ensuring ads reach the most relevant users for maximum revenue."
        },
        {
            icon: Database,
            title: "Data-Driven Strategy",
            description: "Decisions guided by data rather than assumptions, analyzing performance metrics and behavioral insights."
        },
        {
            icon: Monitor,
            title: "Cross-Platform Experience",
            description: "Hands-on experience managing advertising across multiple platforms and devices for consistency and scalability."
        }
    ];

    const caseStudies = [
        {
            title: "Digital Publisher — Advertising Infrastructure Stabilization",
            type: "Digital Publisher",
            challenge: "The publisher's advertising setup lacked structure. Inventory management was inconsistent, reporting was unclear, and daily ad operations required manual effort.",
            approach: "Implemented a reliable Ad Server and introduced structured ad inventory management. Placements, demand priorities, and delivery logic were aligned.",
            results: [
                { value: "33%", label: "Reporting accuracy improvement" },
                { value: "100%", label: "Ad delivery stabilization" },
                { value: "25%", label: "Reduced daily operations effort" }
            ]
        },
        {
            title: "Media Platform — Monetization Performance Optimization",
            type: "Media Platform",
            challenge: "Revenue performance was inconsistent due to fragmented demand access. Pricing varied significantly during traffic spikes.",
            approach: "Deployed Header Bidding frameworks, connected selected SSP and DSP partners, and optimized bidding strategies.",
            results: [
                { value: "26%", label: "Average yield increase" },
                { value: "Stable", label: "Pricing efficiency" },
                { value: "Consistent", label: "Revenue during peak traffic" }
            ]
        },
        {
            title: "Media Operations Team — Scalable AdTech Integration",
            type: "Operations Team",
            challenge: "Existing advertising setup was not designed to handle growth, risking performance issues during high-traffic periods.",
            approach: "Aligned AdTech Solutions with Marketing Technology ecosystems and enabled secure data handling through a Data Management Platform.",
            results: [
                { value: "2×", label: "Traffic growth support" },
                { value: "Reliable", label: "System during peak usage" },
                { value: "Flexible", label: "Long-term scalability" }
            ]
        }
    ];

    const testimonials = [
        {
            text: "The team helped us bring structure to our advertising setup. Everything is now easier to manage, and our reporting is much clearer than before.",
            author: "Digital Publisher"
        },
        {
            text: "What we appreciated most was their practical approach. They didn't push generic solutions and instead focused on what actually worked for our platform.",
            author: "Media Platform Manager"
        },
        {
            text: "After working with them, our ad delivery became more stable across devices. The improvements were noticeable without affecting user experience.",
            author: "Content Website Owner"
        },
        {
            text: "Their understanding of advertising systems and data made a real difference. We now make decisions based on insights rather than assumptions.",
            author: "Operations Lead, News Website"
        },
        {
            text: "Communication was clear throughout the process, and the implementation was handled carefully. The overall setup feels reliable and future-ready.",
            author: "Digital Operations Head"
        }
    ];

    const faqItems = [
        {
            question: "What does AdTech integration mean?",
            answer: "AdTech integration involves connecting advertising platforms, tools, and data systems so they work together efficiently. This helps publishers manage ads, track performance, and improve revenue without relying on disconnected systems."
        },
        {
            question: "Do you work with existing advertising setups?",
            answer: "Yes. We analyze current setups and improve or restructure them without disrupting live traffic. This includes optimizing existing tools and aligning them for better performance."
        },
        {
            question: "Can AdTech integration improve ad revenue?",
            answer: "Yes. Proper integration improves demand access, tracking accuracy, and delivery efficiency, which often leads to better yield and more stable revenue over time."
        },
        {
            question: "Do you support both web and mobile platforms?",
            answer: "Yes, we support both Mobile Ad and Web Ad Integration to ensure consistent ad delivery across all devices and platforms."
        },
        {
            question: "Is AdTech integration safe for user privacy?",
            answer: "Yes. We follow privacy-first practices and ensure integrations align with data protection regulations while maintaining performance and transparency."
        },
        {
            question: "Will integration affect website performance or loading speed?",
            answer: "When done correctly, integration improves efficiency rather than slowing down a site. We focus on reducing latency and maintaining a smooth user experience."
        },
        {
            question: "Do you provide ongoing support after integration?",
            answer: "Yes. We offer ongoing monitoring, optimization, and technical support to ensure systems remain stable as traffic and requirements evolve."
        },
        {
            question: "How do I know if my platform needs AdTech integration?",
            answer: "If your advertising setup feels complex, reporting is unclear, or revenue performance is inconsistent, integration can help simplify operations and improve outcomes."
        }
    ];

    return (
        <div className="font-['Noto_Sans'] bg-[#FFF8F0] text-[#1A1A1A] overflow-x-hidden at-page">
            <Seo
                title=" AdTech Integration Agency in Kerala | Social Bureau"
                description="Structured AdTech integrations that connect platforms, align
data, and improve campaign performance without complexity or wasted spend"
            />
            {/* Add inline styles for animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .at-page img {
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
            `}} />

            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#FBBF24] to-[#1F2937] z-50" style={{ width: '0%' }}></div>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full md:w-3/5 h-full bg-gradient-to-br from-[#FBBF24] to-[#1F2937] clip-path-polygon opacity-10 animate-float hidden md:block"></div>
                <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 px-4 sm:px-6">
                    <div className="animate-fadeInUp">
                        <h1 className="font-['Noto_Sans'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 lg:mb-8">
                            AdTech Integration Agency 
                            <span className="block bg-gradient-to-br from-[#FBBF24] to-[#1F2937] bg-clip-text text-transparent mt-2">
                                in Kerala
                            </span>
                        </h1>
                        <p className="font-['Noto_Sans'] text-base sm:text-lg text-[#4B5563] mb-8 lg:mb-12 max-w-2xl">
                            Transform your digital advertising revenue with India's leading advertising technology platform integration experts. Trusted by publishers, media houses, and app owners across India.
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                            <a
                                href="https://api.whatsapp.com/send/?phone=918714952665&text=Hello%2C+I+would+like+to+learn+more+about+AdTech+Integration.&type=phone_number&app_absent=0"
                                className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-br from-[#FBBF24] to-[#1F2937] text-white font-semibold rounded-full hover:translate-y-[-3px] hover:shadow-xl transition-all text-sm sm:text-base"
                            >
                                Book a Strategy Call
                            </a>
                            <a
                                href="#services"
                                className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-white text-[#1F2937] font-semibold rounded-full border-2 border-[#1F2937] hover:bg-[#1F2937] hover:text-white hover:translate-y-[-3px] transition-all text-sm sm:text-base"
                            >
                                Explore Services
                            </a>
                        </div>
                    </div>
                    <div className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center animate-fadeInUp mt-8 md:mt-0">
                        <div className="w-full h-full bg-gradient-to-br from-[rgba(251,191,36,0.1)] to-[rgba(31,41,55,0.1)] rounded-3xl overflow-hidden flex items-center justify-center p-4">
                            <img
                                src="/assets/adtech1.webp"
                                alt="ADTECH INTEGRATION IMAGE,"
                                className="w-full h-full object-cover rounded-2xl"
                                loading="lazy"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23FBBF24' opacity='0.1'/%3E%3Ctext x='50%' y='50%' font-family='Arial' font-size='24' fill='%23FBBF24' text-anchor='middle'%3EAdTech Integration%3C/text%3E%3C/svg%3E"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#FBBF24] to-[#1F2937] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        About AdTech Integration
                    </span>
                    <h2 className="font-['Noto_Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F2937]">Marketing Technology Integration</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                    <div>
                        <h3 className="font-['Noto_Sans'] text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#1F2937]">Structured Alignment of Digital Advertising</h3>
                        <p className="font-['Noto_Sans'] text-[#4B5563] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                            AdTech integration refers to the structured alignment of tools, platforms, and workflows used to manage and optimize ads across digital channels. In today's competitive landscape, digital advertising success depends on how well systems communicate with each other.
                        </p>
                        <p className="font-['Noto_Sans'] text-[#4B5563] leading-relaxed text-sm sm:text-base">
                            We focus on practical Marketing Technology Integration that supports publishers, media companies, and content platforms. By implementing secure <a href='https://en.wikipedia.org/wiki/API' className='text-red-600'>API Integration</a>, we enable seamless data flow between platforms, ensuring accuracy, speed, and long-term flexibility.
                        </p>
                    </div>
                    <div className="h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-[rgba(251,191,36,0.1)] to-[rgba(31,41,55,0.1)] rounded-3xl flex items-center justify-center relative overflow-hidden p-4">
                        <img
                            src="/assets/ad.webp"
                            alt="ADTECH INTEGRATION IMAGE,"
                            className="w-full h-full object-cover rounded-2xl"
                            loading="lazy"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23FBBF24' opacity='0.1'/%3E%3Ctext x='50%' y='50%' font-family='Arial' font-size='24' fill='%23FBBF24' text-anchor='middle'%3EMarketing Technology%3C/text%3E%3C/svg%3E"
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#FBBF24] to-[#1F2937] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                            Our Services
                        </span>
                        <h2 className="font-['Noto_Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F2937]">AdTech Integration Services in Kochi</h2>
                        <p className="font-['Noto_Sans'] text-base sm:text-lg text-[#4B5563] max-w-3xl mx-auto px-4 mb-8">
                            We design and implement customized solutions based on real operational needs. Each service is delivered with precision, documentation, and performance validation.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {services.map((service, index) => {
                            const Icon = service.icon;

                            return (
                                <div
                                    key={index}
                                    className="bg-white p-4 sm:p-6 lg:p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:translate-y-[-10px] transition-all duration-400 border-2 border-transparent hover:border-[#FBBF24] relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#FBBF24] to-[#1F2937] opacity-0 group-hover:opacity-5 transition-opacity z-0"></div>

                                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#FBBF24] to-[#1F2937] rounded-xl flex items-center justify-center mb-4 sm:mb-6 relative z-10">
                                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                                    </div>

                                    <h3 className="font-['Noto_Sans'] text-lg sm:text-xl font-bold mb-3 sm:mb-4 relative z-10 text-[#1F2937]">
                                        {service.title}
                                    </h3>

                                    <p className="font-['Noto_Sans'] text-[#4B5563] mb-4 sm:mb-6 relative z-10 text-sm sm:text-base">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-1 sm:space-y-2 relative z-10">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="text-[#4B5563] flex items-start text-xs sm:text-sm font-['Noto_Sans']">
                                                <CheckCircle className="w-4 h-4 text-[#FBBF24] mr-2 flex-shrink-0 mt-0.5" />
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
            <section id="why-choose" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="mb-8 sm:mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#FBBF24] to-[#1F2937] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        Why Choose Us
                    </span>
                    <h2 className="font-['Noto_Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F2937]">Advertising Ecosystem Expertise</h2>
                </div>

                {/* Main Content Grid - Adjusted layout */}
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                    {/* Left Side - Boxes Grid - 2 columns on mobile, 1 column on desktop */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 lg:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                            {whyChooseUs.slice(0, 4).map((feature, index) => {
                                const Icon = feature.icon;

                                return (
                                    <div
                                        key={index}
                                        className="bg-white p-6 sm:p-8 rounded-2xl text-center hover:shadow-lg hover:border-[#FBBF24] border-2 border-transparent transition-all duration-300 group"
                                    >
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#FBBF24] to-[#FBBF24] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                        </div>
                                        <h3 className="font-['Noto_Sans'] text-base sm:text-lg font-bold mb-3 sm:mb-4 text-[#1F2937]">{feature.title}</h3>
                                        <p className="font-['Noto_Sans'] text-[#4B5563] leading-relaxed text-xs sm:text-sm">{feature.description}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Fifth box spanning full width on mobile, half width on desktop */}
                        <div className="sm:col-span-2 lg:col-span-1">
                            <div className="bg-white p-6 sm:p-8 rounded-2xl text-center hover:shadow-lg hover:border-[#FBBF24] border-2 border-transparent transition-all duration-300 group h-full">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#FBBF24] to-[#FBBF24] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                    <Monitor className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                </div>
                                <h3 className="font-['Noto_Sans'] text-base sm:text-lg font-bold mb-3 sm:mb-4 text-[#1F2937]">{whyChooseUs[4].title}</h3>
                                <p className="font-['Noto_Sans'] text-[#4B5563] leading-relaxed text-xs sm:text-sm">{whyChooseUs[4].description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Image - Taking up less space */}
                    <div className="flex items-center justify-center h-auto lg:col-span-1">
                        <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src='/assets/seo.webp'
                                alt="ADTECH EXPERT IN KERALA"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section id="case-studies" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#FBBF24] to-[#1F2937] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                            Case Studies
                        </span>
                        <h2 className="font-['Noto_Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F2937]">Proven Results with AdTech Integration</h2>
                    </div>
                    <div className="space-y-8 sm:space-y-12">
                        {caseStudies.map((study, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg relative overflow-hidden border-l-4 border-[#FBBF24] hover:shadow-xl transition-shadow"
                            >
                                <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-br from-[#FBBF24]/10 to-[#1F2937]/10 text-[#FBBF24] text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6">
                                    {study.type}
                                </span>
                                <h3 className="font-['Noto_Sans'] text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-[#1F2937]">{study.title}</h3>

                                <div className="mb-6 sm:mb-8">
                                    <h4 className="font-['Noto_Sans'] text-base sm:text-lg font-semibold text-[#FBBF24] mb-2 sm:mb-3">The Challenge</h4>
                                    <p className="font-['Noto_Sans'] text-[#4B5563] text-sm sm:text-base">{study.challenge}</p>
                                </div>

                                <div className="mb-6 sm:mb-8">
                                    <h4 className="font-['Noto_Sans'] text-base sm:text-lg font-semibold text-[#FBBF24] mb-2 sm:mb-3">The Approach</h4>
                                    <p className="font-['Noto_Sans'] text-[#4B5563] text-sm sm:text-base">{study.approach}</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-8 bg-gradient-to-br from-[#FBBF24]/5 to-[#1F2937]/5 rounded-2xl">
                                    {study.results.map((result, idx) => (
                                        <div key={idx} className="text-center p-4">
                                            <div className="font-['Noto_Sans'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FBBF24] mb-1 sm:mb-2">
                                                <CountUp
                                                    end={parseInt(result.value.replace(/[^0-9]/g, '')) || ''}
                                                    suffix={result.value.replace(/[0-9]/g, "")}
                                                />
                                            </div>
                                            <div className="font-['Noto_Sans'] text-xs sm:text-sm text-[#4B5563]">{result.label}</div>
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
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#FBBF24] to-[#1F2937] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        Testimonials
                    </span>
                    <h2 className="font-['Noto_Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F2937]">Trusted by Publishers Across India</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg hover:translate-y-[-5px] transition-transform duration-300 group">
                            <div className="text-4xl sm:text-5xl text-[#FBBF24] opacity-30 mb-3 sm:mb-4 group-hover:opacity-50 transition-opacity">❝</div>
                            <p className="font-['Noto_Sans'] text-[#4B5563] italic leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{testimonial.text}</p>
                            <div className="font-['Noto_Sans'] font-semibold text-[#1F2937] text-sm sm:text-base">— {testimonial.author}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#FBBF24] to-[#1F2937] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        FAQ
                    </span>
                    <h2 className="font-['Noto_Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F2937]">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-3 sm:space-y-4">
                    {faqItems.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <button
                                className="w-full p-4 sm:p-6 text-left flex justify-between items-center font-['Noto_Sans'] font-semibold hover:text-[#FBBF24] transition-colors text-sm sm:text-base group text-[#1F2937]"
                                onClick={() => toggleFaq(index)}
                            >
                                <span className="text-left pr-4">{item.question}</span>
                                <span className={`text-xl sm:text-2xl transition-transform flex-shrink-0 ${activeFaq === index ? 'rotate-45 text-[#FBBF24]' : 'text-[#4B5563] group-hover:text-[#FBBF24]'}`}>+</span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                                <div className="p-4 sm:p-6 pt-0 font-['Noto_Sans'] text-[#4B5563] leading-relaxed text-sm sm:text-base">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="py-12 sm:py-16 lg:py-20 mx-4 sm:mx-6 lg:mx-8 my-8 sm:my-12 lg:my-16 bg-gradient-to-br from-[#1F2937] to-[#111827] text-white rounded-3xl text-center relative overflow-hidden">
                <div className="absolute -top-1/2 -right-1/10 w-64 h-64 sm:w-96 sm:h-96 bg-radial-gradient(circle, rgba(251,191,36,0.2), transparent) rounded-full animate-pulse-slow hidden sm:block"></div>
                <h2 className="font-['Noto_Sans'] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 relative z-10 px-4">Ready to Transform Your Digital Advertising?</h2>
                <p className="font-['Noto_Sans'] text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 relative z-10 px-4">
                    Let's discuss how AdTech integration can optimize your revenue and streamline your advertising operations.
                </p>
                <a
                    href="https://api.whatsapp.com/send/?phone=918714952665&text=Hello%2C+I+would+like+to+discuss+AdTech+Integration+for+my+business.&type=phone_number&app_absent=0"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white text-[#1F2937] font-semibold rounded-full hover:translate-y-[-3px] hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)] transition-all relative z-10 text-sm sm:text-base"
                >
                    Book a Strategy Call
                </a>
            </section>

            {/* Scroll to Top Button */}
            <button
                className={`fixed bottom-6 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#FBBF24] to-[#1F2937] text-white rounded-full flex items-center justify-center text-lg sm:text-xl shadow-lg hover:translate-y-[-5px] transition-all ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={scrollToTop}
            >
                ↑
            </button>
        </div>
    );
};

export default AdTechIntegration;