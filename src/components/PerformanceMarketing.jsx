import React, { useState, useRef, useEffect } from 'react';
import {
    BarChart3, Megaphone, Search, ShoppingCart, Target, Users,
    ChevronRight, ArrowUp, Plus, X, CheckCircle, BarChart,
    Settings, Smartphone, Layers, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Seo from './Seo';
import { getOptimizedCloudinaryUrl } from '../../utils/cloudinary';

const PerformanceMarketing = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeFaq, setActiveFaq] = useState(null);
    const [activeCaseStudy, setActiveCaseStudy] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
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
            answer: "Yes, when executed correctly, performance marketing agency in Kochi, Kerala helps build scalable systems rather than short-term gains. Over time, insights improve predictability, efficiency, and planning, supporting sustainable and controlled growth."
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
            description: "We plan and execute paid search programs built around relevance, budget efficiency, and measurable outcomes. As a performance marketing agency in Kochi, Kerala, campaigns are continuously refined to improve efficiency without increasing risk. This approach helps maintain consistency even as competition and costs fluctuate",
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
            description: "Campaign structures are designed with future growth in mind. As a performance marketing agency in Kochi, Kerala, we build scalable campaign systems that allow businesses to expand without losing control, clarity, or operational efficiency"
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
        <div className="font-['Outfit',_sans-serif] bg-white text-[#1d1d1f] overflow-x-hidden antialiased">
            <Seo
                title="Performance Marketing Agency in Kochi, Kerala | SocialBureau"
                description="Drive measurable results with SocialBureau’s performance marketing. Boost conversions, optimize campaigns, and maximize ROI with data-driven strategies"
                keywords="performance marketing agency, kochi, kerala, PPC, Google Ads, Meta Ads,PERFORMANCE MARKETING AGENCY IN KOCHI, PERFORMANCE MARKETING STRATEGY, PPC Management, ROI Driven Decision Making"
                canonicalUrl="https://www.socialbureau.in/performance-marketing-agency-in-kochi"
                url="https://www.socialbureau.in/performance-marketing-agency-in-kochi"
            />

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-[#7E0A11] z-[1000] origin-left"
                style={{ scaleX: 0 }}
                animate={{ scaleX: isScrolled ? 1 : 0 }}
            />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#7E0A11]/5 to-transparent -z-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[#7E0A11] text-sm md:text-base font-bold uppercase tracking-widest mb-4 block">
                            Performance Marketing Agency
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold text-[#1d1d1f] leading-tight mb-6">
                            Performance Marketing Agency
                            <span className="block text-[#7E0A11]">in Kochi, Kerala</span>
                        </h1>
                        <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
                            We help businesses scale visibility, enquiries, and revenue through outcome-focused advertising systems designed for measurable growth across modern digital platforms.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="https://api.whatsapp.com/send/?phone=918714952665&text=Hello%2C+I+would+like+to+learn+more."
                                className="bg-[#7E0A11] text-white px-8 py-4 rounded-full font-bold hover:bg-[#63080d] transition-all flex items-center justify-center gap-2 group shadow-lg shadow-[#7E0A11]/20"
                            >
                                Book a Strategy Call
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="#services"
                                className="border-2 border-[#7E0A11] text-[#7E0A11] px-8 py-4 rounded-full font-bold hover:bg-[#7E0A11]/5 transition-all text-center"
                            >
                                Explore Services
                            </a>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-[#7E0A11]/10 blur-3xl rounded-full"></div>
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-50">
                            <img
                                src="/performance_dashboard.png"
                                alt="performance-marketing-agency-in-kochi"
                                title='performance-marketing-agency-in-kochi'
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 bg-gray-50 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7E0A11]/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[#7E0A11] text-sm font-bold uppercase tracking-widest mb-4 block"
                        >
                            About Our Approach
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-bold text-[#1d1d1f]"
                        >
                            Results-Oriented Marketing Strategy
                        </motion.h2>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-bold text-[#1d1d1f] mb-6">Accountability, Efficiency, and Measurable Returns</h3>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                <a href='https://en.wikipedia.org/wiki/Performance-based_advertising' target='_blank' rel="noopener noreferrer" className="text-[#7E0A11] font-medium border-b border-[#7E0A11]/20 hover:border-[#7E0A11] transition-all">Performance marketing</a> is a results-oriented approach where every campaign is measured against clear outcomes such as enquiries, purchases, or qualified actions. As a performance marketing agency in Kochi, Kerala, we focus on accountability, efficiency, and measurable returns instead of relying only on impressions.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                At <a href='https://socialbureau.in' className="font-semibold text-[#1d1d1f]">SocialBureau</a>, we work as a strategic partner, supporting brands with structured performance-led systems that align budgets, messaging, and targeting with real business objectives.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="rounded-3xl overflow-hidden shadow-xl"
                        >
                            <img
                                src={getOptimizedCloudinaryUrl("https://res.cloudinary.com/dtwcgfmar/image/upload/v1772086613/SMM_PHOTOSHOOT_xdkcl5.webp", 1000)}
                                alt="performance-marketing-agency-in-kochi"
                                title='performance-marketing-agency-in-kochi'
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 bg-[#7E0A11] text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-white/70 text-sm font-bold uppercase tracking-widest mb-4 block"
                        >
                            Our Services
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-bold mb-6"
                        >
                            Performance Marketing Services Kochi, Kerala
                        </motion.h2>
                        <p className="text-white/80 text-lg max-w-3xl mx-auto">
                            Our services are designed to support sustainable scaling by aligning paid channels with intent, data signals, and conversion-focused execution.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group"
                            >
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#7E0A11] transition-all">
                                    <service.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                                <p className="text-white/70 mb-6 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                                <ul className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-white/60">
                                            <CheckCircle className="w-4 h-4 mr-2 text-white/40" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section id="why-choose" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-[#7E0A11] text-sm font-bold uppercase tracking-widest mb-4 block">Why Choose Us</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-10">Data-Led Growth Partners</h2>
                            <div className="space-y-8">
                                {whyChooseUs.map((feature, index) => (
                                    <div key={index} className="flex gap-6 group">
                                        <div className="flex-shrink-0 w-12 h-12 bg-[#7E0A11]/5 rounded-xl flex items-center justify-center group-hover:bg-[#7E0A11] transition-all">
                                            <feature.icon className="w-6 h-6 text-[#7E0A11] group-hover:text-white transition-all" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[#1d1d1f] mb-2">{feature.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        
                            <img
                                src={getOptimizedCloudinaryUrl("https://res.cloudinary.com/dtwcgfmar/image/upload/v1772022966/PMO_converted_yhchbh.webp", 1000)}
                                alt="performance-marketing-agency-in-kochi"
                                title='performance-marketing-agency-in-kochi'
                                className="w-full h-full object-cover"
                            />
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section id="case-studies" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[#7E0A11] text-sm font-bold uppercase tracking-widest mb-4 block"
                        >
                            Case Studies
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-bold text-[#1d1d1f]"
                        >
                            Proven Results in Performance
                        </motion.h2>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* Selector */}
                        <div className="lg:col-span-5 space-y-4">
                            {caseStudies.map((study, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ x: 10 }}
                                    onClick={() => setActiveCaseStudy(index)}
                                    className={`w-full text-left p-6 rounded-2xl transition-all ${activeCaseStudy === index
                                            ? 'bg-[#7E0A11] text-white shadow-xl shadow-[#7E0A11]/20'
                                            : 'bg-white text-[#1d1d1f] hover:bg-gray-100'
                                        }`}
                                >
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md mb-2 inline-block ${activeCaseStudy === index ? 'bg-white/20 text-white' : 'bg-gray-100 text-[#7E0A11]'
                                        }`}>
                                        {study.type}
                                    </span>
                                    <h3 className="text-lg font-bold block">{study.title}</h3>
                                </motion.button>
                            ))}
                        </div>

                        {/* Details */}
                        <div className="lg:col-span-7">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeCaseStudy}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-white p-8 md:p-12 rounded-3xl shadow-xl h-full border border-gray-100"
                                >
                                    <h3 className="text-2xl font-bold mb-8 text-[#1d1d1f]">
                                        {caseStudies[activeCaseStudy].title}
                                    </h3>
                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="text-[#7E0A11] text-xs font-bold uppercase tracking-widest mb-2">Ideal Customer</h4>
                                            <p className="text-gray-600 leading-relaxed">{caseStudies[activeCaseStudy].idealCustomer}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-[#7E0A11] text-xs font-bold uppercase tracking-widest mb-2">The Challenge</h4>
                                            <p className="text-gray-600 leading-relaxed">{caseStudies[activeCaseStudy].challenge}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-[#7E0A11] text-xs font-bold uppercase tracking-widest mb-2">The Approach</h4>
                                            <p className="text-gray-600 leading-relaxed">{caseStudies[activeCaseStudy].approach}</p>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
                                            {caseStudies[activeCaseStudy].results.map((result, idx) => (
                                                <div key={idx} className="text-center">
                                                    <div className="text-2xl md:text-3xl font-bold text-[#7E0A11]">{result.value}</div>
                                                    <div className="text-[10px] uppercase text-gray-400 font-bold tracking-tighter">{result.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-[#1d1d1f] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#7E0A11]/10 blur-[150px] rounded-full"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-white/50 text-sm font-bold uppercase tracking-widest mb-4 block">Testimonials</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white">Client Success Stories</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all"
                            >
                                <div className="text-4xl text-[#7E0A11] mb-6 font-serif">“</div>
                                <p className="text-white/80 italic text-lg leading-relaxed mb-8">
                                    {testimonial.text}
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-1 bg-[#7E0A11]"></div>
                                    <span className="text-white font-bold">{testimonial.author}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-[#7E0A11] text-sm font-bold uppercase tracking-widest mb-4 block">FAQ</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f]">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-4">
                        {faqItems.map((item, index) => (
                            <div key={index} className="border-b border-gray-100 last:border-0">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex justify-between items-center py-6 text-left group"
                                >
                                    <span className="text-lg font-bold text-[#1d1d1f] group-hover:text-[#7E0A11] transition-all">
                                        {item.question}
                                    </span>
                                    <div className={`transition-transform duration-300 ${activeFaq === index ? 'rotate-45' : ''}`}>
                                        <Plus className={`w-6 h-6 ${activeFaq === index ? 'text-[#7E0A11]' : 'text-gray-300'}`} />
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {activeFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-6 text-gray-600 leading-relaxed">
                                                {item.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto bg-[#1d1d1f] rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-20"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-tr from-[#7E0A11]/20 via-transparent to-[#7E0A11]/10 blur-[120px] -z-10"></div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-6xl font-bold text-white mb-8 relative z-10"
                    >
                        Scale Your Growth With Strategy
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 relative z-10"
                    >
                        Let's discuss how <a href='https://socialbureau.in/blogs/where-roi-meets-creative-flow' target='_blank' rel="noopener noreferrer" className="text-[#7E0A11] font-semibold underline decoration-[#7E0A11]/30 hover:decoration-[#7E0A11] transition-all">performance marketing</a> can drive measurable growth and clarity for your business.
                    </motion.p>
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="/contact"
                        className="inline-flex items-center gap-3 bg-white text-[#1d1d1f] px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl relative z-10"
                    >
                        Book a Strategy Call
                        <ChevronRight className="w-5 h-5" />
                    </motion.a>
                </div>
            </section>

            {/* Scroll to Top */}
            <AnimatePresence>
                {isScrolled && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={scrollToTop}
                        className="fixed bottom-10 right-10 w-14 h-14 bg-[#7E0A11] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#63080d] transition-all z-[1000]"
                    >
                        <ArrowUp className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PerformanceMarketing;
