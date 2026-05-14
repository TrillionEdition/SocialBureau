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
    Layers,
    ChevronRight,
    ArrowUp,
    Plus,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';
import Seo from './Seo';

const AdTechIntegration = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeFaq, setActiveFaq] = useState(null);
    const [activeCaseStudy, setActiveCaseStudy] = useState(0);

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

    const services = [
        {
            icon: Settings,
            title: "Ad Infrastructure Setup",
            description: "We configure enterprise-ready advertising systems that support scalability and long-term monetization. By implementing a reliable Ad Server such as Google Ad Manager, publishers gain structured control over inventory, demand sources, and delivery logic. We also support AdSense Services where required, ensuring smooth and compliant integration",
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
            description: "Monetization Optimization To improve revenue performance, we deploy advanced Header Bidding frameworks across premium inventory. By working with selected SSP and DSP partners and connecting to a secure Ad Exchange, we help publishers achieve better demand competition and more consistent yield.",
            features: [
                "Demand source diversification",
                "Improved pricing efficiency",
                "Optimized bidding strategies"
            ]
        },
        {
            icon: DollarSign,
            title: "Revenue & Tracking Solutions",
            description: "We implement reliable Ad Solutions with accurate Ad Tracking Implementation to provide clear visibility into revenue performance. These systems help publishers identify opportunities and strengthen Publishers through data-driven decisions.",
            features: [
                "Granular revenue insights",
                "Performance-based optimization",
                "Clear reporting structure"
            ]
        },
        {
            icon: Smartphone,
            title: "Multi-Platform Ad Delivery",
            description: "We support both Mobile Ad and Web Ad Integration to ensure consistent ad delivery across devices. Using structured Advertising Automation, we reduce manual effort while maintaining stable performance across all platforms.", features: [
                "Cross-device consistency",
                "Automated ad workflows",
                "Reduced operational load"
            ]
        },
        {
            icon: Database,
            title: "Advanced Technology Enablement",
            description: "Our custom AdTech solutions align with broader marketing technology ecosystems. As an adtech marketing agency in Kochi, Kerala, we integrate these solutions with a Data Management Platform to enable better audience control, secure data handling, and improved decision-making",
            features: [
                "Smarter audience segmentation",
                "Privacy-conscious data governance",
                "Scalable technology alignment"
            ]
        },
        {
            icon: Shield,
            title: "Performance & Security",
            description: "We enable Real-Time Bidding supported by First-Party Data Activation to improve efficiency and relevance. Engagement is enhanced through Dynamic Creative Optimization (DCO), while Ad Fraud Prevention and an Ad Verification Tool ensure brand safety and traffic quality",
            features: [
                "Secure ad delivery",
                "Traffic quality control",
                "Performance optimization"
            ]
        }
    ];

    const whyChooseUs = [
        {
            icon: Layers,
            title: "Advertising Ecosystem Expertise",
            description: "We have a strong understanding of how today's advertising ecosystem functions, including the interaction between platforms, demand sources, and data layers. This allows us to design systems that are efficient, compliant, and adaptable to changing industry standards.",
        },
        {
            icon: BarChart,
            title: "Structured Inventory Management",
            description: "Our team specializes in managing ad inventory through well-structured delivery frameworks. By organizing placements, demand priorities, and delivery logic, we help publishers maintain control while ensuring consistent performance across all inventory.",
        },
        {
            icon: TrendingUp,
            title: "Targeted Yield Optimization",
            description: "We apply precision-focused strategies to audience targeting, ensuring ads reach the most relevant users. Combined with yield optimization techniques, this approach helps maximize revenue while maintaining a balanced user experience.",
        },
        {
            icon: Database,
            title: "Data-Driven Strategy",
            description: "Our decisions are guided by data rather than assumptions. By analyzing performance metrics and behavioral insights, we help businesses refine strategies, identify growth opportunities, and improve advertising outcomes through data-driven advertising practices.",
        },
        {
            icon: Monitor,
            title: "Cross-Platform Experience",
            description: "We have hands-on experience managing advertising across multiple platforms and devices. As an adtech marketing agency in Kochi, Kerala, this enables us to ensure consistency, performance, and scalability in cross-platform advertising environments, regardless of traffic volume or audience behavior.",
        }
    ];

    const caseStudies = [
        {
            title: "Digital Publisher — Advertising Infrastructure Stabilization",
            type: "Digital Publisher",
            idealCustomer: "A mid-sized digital publisher with growing traffic, multiple ad placements, and increasing operational complexity.",
            challenge: "The publisher's advertising setup lacked structure. Inventory management was inconsistent, reporting was unclear, and daily ad operations required manual effort. As traffic increased, delivery stability became difficult to maintain.",
            approach: "We implemented a reliable Ad Server and introduced structured ad inventory management. As an adtech marketing agency in Kochi, Kerala, placements, demand priorities, and delivery logic were aligned to create a controlled and scalable advertising environment",
            results: [{ value: "33%", label: "Reporting accuracy improvement within 90 days" },
            { value: "100%", label: "Ad delivery stabilization across active inventory" },
            { value: "25%", label: "Reduced daily operations effort" }
            ]
        },
        {
            title: "Media Platform — Monetization Performance Optimization",
            type: "Media Platform",
            idealCustomer: "A media platform managing multiple demand sources and premium inventory with fluctuating yield.",
            challenge: "Revenue performance was inconsistent due to fragmented demand access. Pricing varied significantly during traffic spikes, making monetization unpredictable.",
            approach: "We deployed Header Bidding frameworks, connected selected SSP and DSP partners, and optimized bidding strategies through a secure Ad Exchange to improve demand competition.",
            results: [
                { value: "26%", label: "Average yield increase over 60 days" },
                { value: "Stable", label: "Pricing efficiency across premium inventory" },
                { value: "Steady", label: "Revenue during peak traffic" }
            ]
        },
        {
            title: "Media Operations Team — Scalable AdTech Marketing",
            type: "Operations Team",
            idealCustomer: "A digital operations team preparing for traffic growth and long-term scalability.",
            challenge: "The existing advertising setup was not designed to handle growth, increasing the risk of performance issues during high-traffic periods.",
            approach: "We aligned AdTech Solutions with Marketing Technology ecosystems and enabled secure data handling through a Data Management Platform to support scalability.",
            results: [
                { value: "2", label: "Traffic growth support", suffix: "×" },
                { value: "Reliable", label: "System performance during peak usage" },
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
            question: "What does AdTech marketing mean?",
            answer: "AdTech marketing involves connecting advertising platforms, tools, and data systems so they work together efficiently. This helps publishers manage ads, track performance, and improve revenue without relying on disconnected systems."
        },
        {
            question: "Do you work with existing advertising setups?",
            answer: "Yes. We analyze current setups and improve or restructure them without disrupting live traffic. This includes optimizing existing tools and aligning them for better performance."
        },
        {
            question: "Can AdTech marketing improve ad revenue?",
            answer: "Yes. Proper integration improves demand access, tracking accuracy, and delivery efficiency, which often leads to better yield and more stable revenue over time."
        },
        {
            question: "Do you support both web and mobile platforms?",
            answer: "We support advertising setups for websites, mobile apps, and multi-device environments, ensuring consistent performance across all platforms."
        },
        {
            question: "Is AdTech marketing safe for user privacy?",
            answer: "Yes. We follow privacy-first practices and ensure integrations align with data protection regulations while maintaining performance and transparency."
        },
        {
            question: "Will integration affect website performance or loading speed?",
            answer: "When done correctly, integration improves efficiency rather than slowing down a site. We focus on reducing latency and maintaining a smooth user experience."
        },
        {
            question: "Do you provide ongoing support after integration?",
            answer: "Yes. As an adtech marketing agency in Kochi, Kerala, we offer ongoing monitoring, optimization, and technical support to ensure systems remain stable as traffic and requirements evolve.",
        },
        {
            question: "How do I know if my platform needs AdTech marketing?",
            answer: "If your advertising setup feels complex, reporting is unclear, or revenue performance is inconsistent, integration can help simplify operations and improve outcomes."
        }
    ];

    return (
        <div className="font-['Outfit', sans-serif] bg-white text-[#1d1d1f] overflow-x-hidden antialiased">
            <Seo
                title="AdTech Marketing Agency in Kochi, Kerala | Social Bureau"
                description="Optimize campaigns with SocialBureau's AdTech Marketing.
Connect platforms, track ads, and boost ROI with data-driven solutions"
                keywords="AdTech Marketing Agency in Kochi,kerala,AdTech Marketing agency kochi,AdTech Marketing Services,Marketing Technology Integration,Adtech expert,ADTECH MARKETING, ADTECH MARKETING AGENCY,Ad Infrastructure Setup"
                canonicalUrl="https://www.socialbureau.in/adTech-marketing-agency-in-kochi"
                url="https://www.socialbureau.in/adTech-marketing-agency-in-kochi"
            />

            {/* Hero Section */}
            <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-sm md:text-base font-bold uppercase tracking-widest text-[#7E0A11] mb-3 sm:mb-4 block"
                        >
                            AdTech Marketing Agency
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight tracking-tight"
                        >
                            AdTech Marketing Agency
                            <span className="block text-[#7E0A11]">in Kochi, Kerala</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-base sm:text-lg lg:text-xl text-[#515154] mb-6 sm:mb-8 max-w-2xl leading-relaxed"
                        >
                            Transform your digital advertising revenue with India's leading advertising technology platform integration experts. Trusted by publishers, media houses, and app owners across India, our team delivers technology-focused solutions that balance monetization with user experience.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="flex flex-col gap-3 sm:flex-row sm:gap-4"
                        >
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://api.whatsapp.com/send/?phone=918714952665&text=Hello%2C+I+would+like+to+learn+more+about+AdTech+Integration."
                                className="bg-[#7E0A11] text-white px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg inline-flex items-center gap-2 transition-all duration-300 hover:bg-[#63080d] transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl whitespace-nowrap"
                            >
                                Book a Strategy Call
                                <ChevronRight className="w-4 h-4" />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="#services"
                                className="bg-transparent text-[#7E0A11] px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg border-2 border-[#7E0A11] inline-flex items-center gap-2 transition-all duration-300 hover:bg-[#7E0A11]/5 transform hover:-translate-y-0.5 whitespace-nowrap"
                            >
                                Explore Services
                            </motion.a>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <img
                            src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/socialbureau-media/images/service%20page/content%20marketing%201.png"
                            title="AdTech Marketing Agency in Kochi, Kerala"
                            alt="AdTech Marketing Agency in Kochi, Kerala"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section
                id="about"
                className="min-h-auto w-full bg-black text-white flex items-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
            >
                <div className="w-full max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-10 sm:mb-14 lg:mb-16"
                    >
                        <span className="text-sm md:text-base font-bold uppercase tracking-widest text-[#7E0A11] mt-2 sm:mt-3 mb-2 sm:mb-3 block">
                            About AdTech Marketing
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-tight">
                            AdTech Marketing Technology Integration
                        </h2>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <h3 className="text-xl sm:text-2xl mb-4 sm:mb-6 text-white/80 font-semibold">
                                Structured Alignment of Digital Advertising
                            </h3>

                            <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6 leading-relaxed">
                                AdTech marketing refers to the structured alignment of tools, platforms, and workflows used to manage and optimize ads across digital channels. As an adtech marketing agency in Kochi, Kerala, we ensure that systems are integrated effectively to maximize performance. In today's competitive landscape, digital advertising success depends on how well these systems communicate and operate together
                            </p>

                            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                                At <a href='https://socialbureau.in' className='text-[#7E0A11] font-semibold hover:text-[#9e0d16] transition' title="Visit SocialBureau Official Website">SocialBureau</a>, we focus on practical Marketing Technology Integration that supports publishers, media companies, and content platforms. By implementing secure <a href='https://en.wikipedia.org/wiki/API' className="underline hover:no-underline transition">API Integration</a>, we enable seamless data flow between platforms, ensuring accuracy, speed, and long-term flexibility.
                            </p>
                        </motion.div>

                        <motion.div
                            className="h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                        >
                            <img
                                src="https://i.pinimg.com/736x/7e/d6/a5/7ed6a53642c538eb84df5be8166a2c3c.jpg"
                                alt="AdTech Marketing Agency in Kochi, Kerala"
                                title="AdTech Marketing Agency in Kochi, Kerala"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#7E0A11]">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10 sm:mb-14 lg:mb-16"
                    >
                        <span className="text-sm md:text-base font-bold uppercase tracking-widest text-white/70 mb-2 sm:mb-3 block">
                            Our Services
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 text-white leading-tight">
                            AdTech Marketing Services in Kochi
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto px-2 leading-relaxed">
                            We design and implement customized solutions based on real operational
                            needs. Each service is delivered with precision, documentation, and
                            performance validation.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                    className="rounded-3xl p-6 sm:p-7 lg:p-8 bg-[#6B080E] border border-white/10 text-white transition-all hover:border-white/20 hover:shadow-2xl"
                                >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#7E0A11] rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform">
                                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>

                                    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">
                                        {service.title}
                                    </h3>

                                    <p className="mb-4 sm:mb-6 text-xs sm:text-sm text-white/80 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-1.5 sm:space-y-2">
                                        {service.features.map((feature, idx) => (
                                            <li
                                                key={idx}
                                                className="text-xs sm:text-sm text-white/80 flex items-start gap-2"
                                            >
                                                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7E0A11] bg-white rounded-full flex-shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section
                id="why-choose"
                className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#7E0A11]"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10 sm:mb-14 lg:mb-20"
                    >
                        <span className="text-sm md:text-base font-bold uppercase tracking-widest text-white/70 mb-2 sm:mb-3 block">
                            Why Choose Us
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight">
                            Advertising Ecosystem Expertise
                        </h2>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            {whyChooseUs.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                                    className={`rounded-3xl p-6 sm:p-7 lg:p-8 bg-[#6B080E] border border-white/10 text-center transition-all hover:border-white/20 ${index === 4 ? 'md:col-span-2' : ''}`}
                                >
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#7E0A11] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-inner">
                                        {React.createElement(item.icon, { className: "w-6 h-6 sm:w-7 sm:h-7 text-white" })}
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="hidden lg:flex justify-center items-center"
                        >
                            <img
                                src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/DSC04832_2_1_xxdy8j.webp"
                                alt="AdTech Marketing Agency in Kochi, Kerala"
                                title="AdTech Marketing Agency in Kochi, Kerala"
                                className="w-full max-w-sm rounded-3xl shadow-lg lg:shadow-2xl border-4 border-white/5"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Case Studies Section */}
            <section id="case-studies" className="py-12 sm:py-20 lg:py-32 bg-[#f8f9fb] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 lg:mb-20"
                    >
                        <span className="text-[#7E0A11] text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest mb-3 sm:mb-4 block">
                            Case Studies
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#1d1d1f] leading-tight">
                            Proven Results with AdTech Marketing
                        </h2>
                    </motion.div>

                    {/* Mobile Layout - Stacked */}
                    <div className="lg:hidden space-y-4 sm:space-y-6">
                        {caseStudies.map((study, index) => (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setActiveCaseStudy(index)}
                                className="w-full text-left"
                            >
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className={`group p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-300 relative overflow-hidden
                                    ${activeCaseStudy === index
                                            ? 'bg-white shadow-xl ring-2 ring-[#7E0A11]/10'
                                            : 'bg-white/50 hover:bg-white shadow-md'}
                                    `}
                                >
                                    <div className="relative">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 sm:mb-4 inline-block transition-colors
                                            ${activeCaseStudy === index ? 'bg-[#7E0A11] text-white' : 'bg-gray-100 text-[#7E0A11]'}
                                        `}>
                                            {study.type}
                                        </span>

                                        <h3 className="text-base sm:text-lg font-bold text-[#1d1d1f] mb-3 group-hover:text-[#7E0A11] transition-colors leading-snug">
                                            {study.title}
                                        </h3>

                                        <div className={`flex items-center gap-2 text-xs sm:text-sm font-bold transition-all
                                            ${activeCaseStudy === index ? 'text-[#7E0A11]' : 'text-gray-400 group-hover:text-[#7E0A11]'}
                                        `}>
                                            View deep dive
                                            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${activeCaseStudy === index ? 'translate-x-1' : ''}`} />
                                        </div>
                                    </div>

                                    {activeCaseStudy === index && (
                                        <motion.div
                                            layoutId="active-indicator-mobile"
                                            className="absolute left-0 top-0 w-1.5 h-full bg-[#7E0A11]"
                                        />
                                    )}
                                </motion.div>

                                {/* Mobile Case Study Detail - shown below the clicked box */}
                                <AnimatePresence mode="wait">
                                    {activeCaseStudy === index && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-4 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 relative overflow-hidden"
                                        >
                                            {/* Decoration */}
                                            <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-[#7E0A11]/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

                                            <h4 className="text-lg sm:text-xl font-extrabold mb-6 text-[#1d1d1f] leading-tight relative">
                                                {study.title}
                                            </h4>

                                            <div className="space-y-6 sm:space-y-8 relative">
                                                {/* The Audience */}
                                                <div>
                                                    <h5 className="text-[10px] font-bold text-[#7E0A11] uppercase tracking-widest mb-2 sm:mb-3">
                                                        The Audience
                                                    </h5>
                                                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-medium italic">
                                                        "{study.idealCustomer}"
                                                    </p>
                                                </div>

                                                {/* Challenges & Approach */}
                                                <div className="space-y-6">
                                                    <div>
                                                        <h5 className="text-[10px] font-bold text-[#7E0A11] uppercase tracking-widest mb-2 sm:mb-3">
                                                            Challenges Faced
                                                        </h5>
                                                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                                                            {study.challenge}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h5 className="text-[10px] font-bold text-[#7E0A11] uppercase tracking-widest mb-2 sm:mb-3">
                                                            Our Implementation
                                                        </h5>
                                                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                                                            {study.approach}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Results */}
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-gray-100">
                                                    {study.results.map((result, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            initial={{ scale: 0.8, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            transition={{ delay: 0.2 + (idx * 0.1) }}
                                                            className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-sm border border-gray-100 hover:border-[#7E0A11]/30 transition-colors group"
                                                        >
                                                            <div className="text-xl sm:text-3xl font-extrabold text-[#7E0A11] mb-1 sm:mb-2 transition-transform duration-300 group-hover:scale-110">
                                                                {result.value}
                                                            </div>
                                                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                                {result.label}
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        ))}
                    </div>

                    {/* Desktop Layout - Grid */}
                    <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
                        {/* Case Studies List */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="col-span-5 space-y-4"
                        >
                            {caseStudies.map((study, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ x: 10 }}
                                    onClick={() => setActiveCaseStudy(index)}
                                    className={`group text-left w-full p-8 rounded-3xl transition-all duration-300 relative overflow-hidden
                                    ${activeCaseStudy === index
                                            ? 'bg-white shadow-2xl ring-2 ring-[#7E0A11]/10'
                                            : 'bg-white/50 hover:bg-white'}
                                    `}
                                >
                                    <div className="relative">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 inline-block transition-colors
                                            ${activeCaseStudy === index ? 'bg-[#7E0A11] text-white' : 'bg-gray-100 text-[#7E0A11]'}
                                        `}>
                                            {study.type}
                                        </span>

                                        <h3 className="text-lg sm:text-xl font-bold text-[#1d1d1f] mb-4 group-hover:text-[#7E0A11] transition-colors leading-snug">
                                            {study.title}
                                        </h3>

                                        <div className={`flex items-center gap-2 text-sm font-bold transition-all
                                            ${activeCaseStudy === index ? 'text-[#7E0A11]' : 'text-gray-400 group-hover:text-[#7E0A11]'}
                                        `}>
                                            View deep dive
                                            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${activeCaseStudy === index ? 'translate-x-1' : ''}`} />
                                        </div>
                                    </div>
                                    {activeCaseStudy === index && (
                                        <motion.div
                                            layoutId="active-indicator"
                                            className="absolute left-0 top-0 w-1.5 h-full bg-[#7E0A11]"
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* Case Study Detail */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="col-span-7"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeCaseStudy}
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-white rounded-[40px] p-8 sm:p-12 shadow-2xl border border-gray-100 relative overflow-hidden"
                                >
                                    {/* Decoration */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#7E0A11]/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

                                    <h3 className="text-2xl sm:text-3xl font-extrabold mb-10 text-[#1d1d1f] leading-tight">
                                        {caseStudies[activeCaseStudy].title}
                                    </h3>

                                    <div className="space-y-10 relative">
                                        <div>
                                            <h4 className="text-[10px] font-bold text-[#7E0A11] uppercase tracking-widest mb-4">
                                                The Audience
                                            </h4>
                                            <p className="text-gray-500 text-lg sm:text-xl leading-relaxed font-medium italic">
                                                "{caseStudies[activeCaseStudy].idealCustomer}"
                                            </p>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-10">
                                            <div>
                                                <h4 className="text-[10px] font-bold text-[#7E0A11] uppercase tracking-widest mb-4">
                                                    Challenges Faced
                                                </h4>
                                                <p className="text-gray-600 text-base leading-relaxed font-medium">
                                                    {caseStudies[activeCaseStudy].challenge}
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-bold text-[#7E0A11] uppercase tracking-widest mb-4">
                                                    Our Implementation
                                                </h4>
                                                <p className="text-gray-600 text-base leading-relaxed font-medium">
                                                    {caseStudies[activeCaseStudy].approach}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 pt-10 border-t border-gray-100">
                                            {caseStudies[activeCaseStudy].results.map((result, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ delay: 0.5 + (idx * 0.1) }}
                                                    className="bg-gray-50 rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:border-[#7E0A11]/30 transition-colors group"
                                                >
                                                    <div className="text-2xl sm:text-4xl font-extrabold text-[#7E0A11] mb-2 transition-transform duration-300 group-hover:scale-110">
                                                        {result.value}
                                                    </div>
                                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{result.label}</div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section
                id="testimonials"
                className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#7E0A11]"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-14 lg:mb-16">
                        <span className="text-sm md:text-base font-bold uppercase tracking-widest text-white mb-2 sm:mb-3 block">
                            Testimonials
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight">
                            Trusted by Publishers Across India
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
                                className="rounded-3xl p-6 sm:p-7 lg:p-8 bg-[#6B080E] transition-all hover:border-white/20"
                            >
                                <div className="text-4xl sm:text-5xl lg:text-6xl text-white mb-3 sm:mb-4 leading-none font-serif">
                                    "
                                </div>

                                <p className="text-white/80 italic mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                                    {testimonial.text}
                                </p>

                                <div className="font-semibold text-white text-sm sm:text-base">
                                    — {testimonial.author}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 sm:mb-12 lg:mb-16"
                >
                    <span className="text-sm md:text-base font-bold uppercase tracking-widest text-[#7E0A11] mb-2 sm:mb-3 block">FAQ</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1d1d1f] leading-tight">
                        Frequently Asked Questions
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                >
                    {faqItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="border-b border-[#f5f5f7] pb-4"
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-center text-left text-base sm:text-lg font-semibold text-[#1d1d1f] py-4 group hover:text-[#7E0A11] transition-colors"
                            >
                                <span className="flex-1 pr-4">{item.question}</span>
                                <motion.div
                                    animate={{ rotate: activeFaq === index ? 45 : 0 }}
                                    className="flex-shrink-0"
                                >
                                    {activeFaq === index ? (
                                        <X className="w-5 h-5 text-[#7E0A11]" />
                                    ) : (
                                        <Plus className="w-5 h-5 text-[#1d1d1f] group-hover:text-[#7E0A11]" />
                                    )}
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {activeFaq === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pb-6 text-[#515154] text-sm sm:text-base leading-relaxed max-w-3xl">
                                            {item.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="bg-[#1d1d1f] text-white rounded-3xl lg:rounded-[40px] py-12 sm:py-20 lg:py-28 px-6 sm:px-12 lg:px-24 text-center relative overflow-hidden w-full shadow-2xl"
                >
                    {/* Background glow */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.15, 0.1]
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute -top-40 -right-40 w-full h-96 bg-[#7E0A11] opacity-10 rounded-full blur-[120px] pointer-events-none"
                    ></motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl sm:text-3xl lg:text-5xl text-white mb-6 relative z-10 font-extrabold max-w-4xl mx-auto leading-tight"
                    >
                        Ready to Transform Your Digital Advertising?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-base sm:text-lg lg:text-xl text-[#86868b] mb-10 sm:mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed font-medium"
                    >
                        Let's discuss how AdTech Marketing can optimize your revenue and streamline your advertising operations.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="relative z-10"
                    >
                        <motion.a
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            href="/contact"
                            className="bg-white text-[#1d1d1f] hover:bg-white/90 px-10 py-5 text-lg font-bold inline-flex items-center gap-2 rounded-full transition-all duration-300"
                        >
                            Get Started Now
                            <ChevronRight className="w-6 h-6" />
                        </motion.a>
                    </motion.div>
                </motion.div>
            </section>

            {/* Scroll to Top Button */}
            <button
                className={`fixed bottom-6 sm:bottom-8 right-6 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-[#7E0A11] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#63080d] transition-all ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                onClick={scrollToTop}
            >
                <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 z-100" />
            </button>
            <Footer />
        </div>
    );
};

export default AdTechIntegration;
