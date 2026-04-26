import React, { useState, useEffect } from 'react';
import {
    Target, Search, Users, BarChart, Shield, Zap,
    ChevronRight, ArrowUp, Plus, X, CheckCircle, Layers,
    Settings, Smartphone, Compass, Sliders, TrendingUp,
    ShieldCheck, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Seo from './Seo';
import { getOptimizedCloudinaryUrl } from '@/utils/cloudinary';

const Niche = () => {
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
            question: "What is niche marketing and how does it work?",
            answer: "Niche marketing focuses on serving a clearly defined group of customers with specific needs. Instead of appealing to everyone, businesses tailor their messaging, offers, and channels to a smaller audience where relevance and engagement are higher."
        },
        {
            question: "What is the different from broad marketing approaches?",
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

    const processSections = [
        {
            title: "Market Intelligence & Research",
            content: "Understanding a market deeply is the foundation of successful growth. Our process begins with niche market analysis, where we study demand patterns, buyer expectations, and competitive gaps to uncover opportunities that broad, generic campaigns often miss.",
            points: [
                "Target market segmentation based on intent and relevance",
                "Audience behavior analysis using real interaction data",
                "Vertical market analysis to understand industry-specific dynamics"
            ]
        },
        {
            title: "Strategic Positioning & Planning",
            content: "Once the market is clearly understood, we develop a structured niche marketing strategy that defines where the brand fits and why it stands out. This phase shapes perception, positioning, and messaging through clear strategic direction.",
            points: [
                "Market segmentation for focused communication",
                "Target market identification aligned with business objectives",
                "Market positioning that differentiates the brand clearly"
            ]
        },
        {
            title: "Audience-Focused Execution",
            content: "Execution is built around relevance. Through target audience marketing, we help brands communicate with people who are most likely to engage, enquire, and convert. Our campaigns are designed to meet users at the right moment in their decision-making process, leveraging insights from behavioral data and audience segmentation.",
            points: [
                "Buyer persona optimization based on real data",
                "Clearly defined customer personas",
                "Messaging designed for a narrow target audience"
            ]
        },
        {
            title: "Personalized & Product-Led Campaigns",
            content: "For businesses offering specialized solutions, personalization becomes a key growth driver. As a niche marketing agency in Kochi, Kerala, we design campaigns using hyper-personalized marketing principles to align communication with user context, intent, and expectations across the customer journey.",
            points: [
                "Niche product marketing for focused offerings",
                "Micro-niche marketing for highly specific audience segments",
                "Funnel alignment with a clear niche business model"
            ]
        },
        {
            title: "Growth & Retention Optimization",
            content: "Marketing success depends on continuous refinement. We continuously evaluate performance and apply structured improvements to support long-term value.By analyzing the outcomes of campaigns, tracking customer behavior, and refining messaging, we help businesses maintain a competitive edge.",
            points: [
                "Niche competitor analysis to refine positioning",
                "Funnel alignment through a niche sales funnel",
                "Long-term customer retention strategies"
            ]
        },
        {
            title: "Demand Activation & Scalable Growth",
            content: "Once a niche is clearly defined and campaigns are optimized, the focus shifts to generating consistent demand without diluting positioning. Growth is activated within clear audience boundaries to preserve relevance while expanding reach.",
            points: [
                "High-intent traffic generation aligned with niche-specific queries",
                "Channel selection based on proven audience response patterns",
                "Controlled expansion that supports sustainable niche growth hacking"
            ]
        }
    ];

    const strategies = [
        {
            icon: Target,
            title: "Specialized Marketing Focus",
            description: "We partner with brands that prefer clarity over volume and depth over noise. Instead of chasing broad visibility, we focus on understanding specific market segments and aligning messaging to well-defined audiences. This approach helps brands communicate with relevance, reduce wasted effort, and achieve stronger engagement within clearly identified niches."
        },
        {
            icon: ShieldCheck,
            title: "Authority-Driven Approach",
            description: "Authority is built through consistency, insight, and relevance. Our approach focuses on positioning brands as reliable sources within their niche by aligning messaging with real customer needs and market expectations. Over time, this builds credibility, strengthens trust, and supports long-term brand recognition within focused markets."
        },
        {
            icon: Compass,
            title: "Clear Niche Positioning",
            description: "Strong positioning starts with clarity. We help businesses define who they serve, what problem they solve, and why their offering matters within a specific segment. This clarity improves communication across channels, reduces confusion for customers, and creates a distinct identity that separates the brand from general competitors."
        },
        {
            icon: BarChart,
            title: "Data-Led Decisions",
            description: "Every strategic decision is informed by research, performance signals, and audience behavior. As a niche marketing agency in Kochi, Kerala, we rely on measurable insights rather than assumptions to guide planning and optimization. This ensures campaigns remain aligned with market realities, adapt to changes, and consistently improve results through informed adjustments."
        },
        {
            icon: MapPin,
            title: "Local Expertise",
            description: "With hands-on experience in Kochi and across Kerala, we understand regional business dynamics, customer behavior, and market nuances. This local insight allows us to design niche strategies that feel relevant on the ground while remaining scalable for wider growth and long-term expansion."
        }
    ];

    const caseStudies = [
        {
            title: "Service-Based Brand — Qualified Lead Improvement through Niche Focus",
            type: "Service",
            idealCustomer: "A professional service business offering specialized solutions and seeking higher-quality enquiries rather than high-volume traffic.",
            challenge: "The brand relied on broad messaging and generic campaigns. While traffic levels were steady, enquiries lacked relevance. Sales teams spent excessive time filtering unqualified leads, and brand differentiation was weak within the market.",
            approach: "We conducted niche market analysis and refined target market segmentation to identify high-intent user groups. Messaging was realigned through strategic positioning and focused niche branding, ensuring communication addressed specific customer needs rather than general use cases.",
            results: [
                { value: "34%", label: "Qualified enquiries increased" },
                { value: "41%", label: "Lead-to-enquiry relevance improved" },
                { value: "22%", label: "Sales team follow-up time reduced" }
            ]
        },
        {
            title: "Product-Focused Brand — Conversion Growth through Audience Alignment",
            type: "Product",
            idealCustomer: "A product-based business targeting users actively searching for specific solutions within a defined category.",
            challenge: "The website attracted traffic from multiple sources, but conversions remained low. Visitors lacked clear intent alignment, resulting in high bounce rates and inefficient acquisition costs.",
            approach: "We restructured the niche sales funnel using audience behavior analysis and implemented personalized campaign execution. As a niche marketing agency in Kochi, Kerala, our efforts were focused on high-intent traffic generation, aligning product messaging with specific user expectations and decision stages",
            results: [
                { value: "29%", label: "Conversion rate increased" },
                { value: "24%", label: "Bounce rate reduced" },
                { value: "18%", label: "Cost per acquisition lowered" }
            ]
        },
        {
            title: "Local Business in Kochi — Niche Positioning for Regional Growth",
            type: "Local",
            idealCustomer: "A Kochi-based local business serving location-driven customers with clear service intent.",
            challenge: "The business blended into a competitive local market with similar messaging to competitors. Visibility existed, but differentiation was minimal, resulting in inconsistent lead quality and weak customer loyalty.",
            approach: "We applied vertical market analysis and refined niche positioning to clarify the brand's specialization. Outreach and messaging were localized, emphasizing relevance and authority within the regional market rather than broad appeal.",
            results: [
                { value: "37%", label: "Qualified local leads grew" },
                { value: "21%", label: "Repeat customer rate improved" },
                { value: "Measurable", label: "Brand recall increase" }
            ]
        }
    ];

    return (
        <div className="font-['Outfit',_sans-serif] bg-white text-[#1d1d1f] overflow-x-hidden antialiased">
            <Seo
                title="Niche Marketing Agency in Kerala | SocialBureau"
                url="https://www.socialbureau.in/niche-marketing-agency-in-kochi"
                canonicalUrl="https://www.socialbureau.in/niche-marketing-agency-in-kochi"
                description="Partner with a niche marketing agency in Kochi, Kerala that understands your audience and drives results through precision marketing"
                keywords="Niche Marketing Agency in kochi, Kerala, niche marketing, specialized marketing, kerala, Kochi, audience targeting,NICHE MARKETING AGENCY,NICHE MARKETING STRATEGIST,GROWTH STRATEGIES"
            />

            {/* Scroll Progress */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-[#920F17] z-[1000] origin-left"
                style={{ scaleX: 0 }}
                animate={{ scaleX: isScrolled ? 1 : 0 }}
            />

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#920F17]/5 to-transparent -z-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[#920F17] text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-4 block">
                            Niche Marketing Excellence
                        </span>
                        <h1 className="text-4xl md:text-7xl font-bold text-[#1d1d1f] leading-tight mb-6 tracking-tight">
                            Find Your Focus.
                            <span className="block text-[#920F17]">Own Your Niche.</span>
                        </h1>
                        <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
                            Partner with a niche marketing agency in Kochi, Kerala that understands your audience and drives results through precision marketing.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://api.whatsapp.com/send/?phone=918714952665&text=Hello%2C+I+would+like+to+learn+more."
                                className="bg-[#920F17] text-white px-10 py-5 rounded-full font-bold hover:bg-[#6B080E] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#920F17]/20"
                            >
                                Get Started
                                <ChevronRight className="w-5 h-5" />
                            </motion.a>
                            <a href="#services" className="flex items-center justify-center gap-2 text-[#1d1d1f] font-bold hover:text-[#920F17] transition-all group">
                                View Our Process
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="absolute -inset-10 bg-[#920F17]/5 rounded-full blur-[100px]"></div>
                        <img
                            src="/niche_target.png"
                            alt="niche marketing-agency-in-kochi"
                            title='niche marketing-agency-in-kochi'
                            className="relative w-full h-auto drop-shadow-2xl"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Stats/About Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="rounded-3xl overflow-hidden shadow-2xl relative group"
                        >
                            <img
                                src={getOptimizedCloudinaryUrl("https://res.cloudinary.com/dtwcgfmar/image/upload/v1772086613/SMM_PHOTOSHOOT_xdkcl5.webp", 1000)}
                                alt="niche marketing-agency-in-kochi"
                                title='niche marketing-agency-in-kochi'
                                className="w-full h-full object-cover"
                            />

                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-8 leading-tight">
                                Precision marketing for businesses that value depth over noise.
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Understanding a market deeply is the foundation of successful growth. Our process begins with niche market analysis, where we study demand patterns, buyer expectations, and competitive gaps to uncover opportunities.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-4xl font-bold text-[#920F17] mb-2">98%</p>
                                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Client Satisfaction</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold text-[#920F17] mb-2">15x</p>
                                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Average ROI</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Process/Services Section */}
            <section id="services" className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[#920F17] text-sm font-bold uppercase tracking-widest mb-4 block"
                        >
                            Our Methodology
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-bold text-[#1d1d1f]"
                        >
                            Strategic Niche Framework
                        </motion.h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {processSections.map((section, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white border border-gray-100 p-8 rounded-[2rem] hover:shadow-2xl hover:shadow-black/5 transition-all group"
                            >
                                <div className="text-4xl font-black text-gray-50 mb-6 group-hover:text-[#920F17]/10 transition-colors">
                                    0{index + 1}
                                </div>
                                <h3 className="text-xl font-bold text-[#1d1d1f] mb-4 group-hover:text-[#920F17] transition-colors">{section.title}</h3>
                                <p className="text-gray-500 text-md leading-relaxed mb-6">
                                    {section.content}
                                </p>
                                <ul className="space-y-3">
                                    {section.points.map((point, pIdx) => (
                                        <li key={pIdx} className="flex items-start text-md text-gray-500">
                                            <div className="w-1 h-1 bg-[#920F17] rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategies Section */}
            <section id="strategies" className="py-24 bg-[#1d1d1f] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#920F17]/10 -skew-x-12 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-white/50 text-sm font-bold uppercase tracking-[0.3em] mb-6 block">Our Core Strategies</span>
                            <h2 className="text-4xl md:text-6xl font-bold mb-12 leading-tight">
                                Built for Authority. <br />
                                Designed for results.
                            </h2>
                            <div className="space-y-10">
                                {strategies.map((strategy, index) => (
                                    <div key={index} className="flex gap-6 group">
                                        <div className="flex-shrink-0 w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#920F17] group-hover:border-[#920F17] transition-all">
                                            <strategy.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-3">{strategy.title}</h3>
                                            <p className="text-white/50 leading-relaxed text-sm">{strategy.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative lg:block hidden"
                        >
                            <div className="absolute -inset-20 bg-[#920F17]/20 blur-[120px] rounded-full"></div>
                            <img
                                src={getOptimizedCloudinaryUrl("https://res.cloudinary.com/dtwcgfmar/image/upload/v1772183939/Red_stock_martket_chart_p4hejw.webp", 1000)}
                                alt="niche marketing-agency-in-kochi"
                                title='niche marketing-agency-in-kochi'
                                className="relative rounded-[3rem] shadow-2xl border border-white/10"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section id="case-studies" className="py-24 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[#920F17] text-sm font-bold uppercase tracking-widest mb-4 block"
                        >
                            Proven Results
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-bold text-[#1d1d1f]"
                        >
                            Case Studies
                        </motion.h2>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* List */}
                        <div className="lg:w-1/3 space-y-4">
                            {caseStudies.map((study, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ x: 10 }}
                                    onClick={() => setActiveCaseStudy(index)}
                                    className={`w-full text-left p-6 rounded-2xl transition-all border ${activeCaseStudy === index
                                        ? 'bg-[#920F17] text-white border-[#920F17] shadow-xl shadow-[#920F17]/20'
                                        : 'bg-white text-[#1d1d1f] border-gray-100 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className={`text-[10px] font-bold uppercase tracking-wider mb-2 block ${activeCaseStudy === index ? 'text-white/70' : 'text-[#920F17]'}`}>
                                        {study.type}
                                    </span>
                                    <h3 className="text-lg font-bold">{study.title}</h3>
                                </motion.button>
                            ))}
                        </div>

                        {/* Details */}
                        <div className="lg:w-2/3">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeCaseStudy}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    className="bg-white p-8 md:p-14 rounded-[3rem] shadow-xl h-full"
                                >
                                    <h3 className="text-2xl font-bold mb-8 text-[#1d1d1f] leading-tight">
                                        {caseStudies[activeCaseStudy].title}
                                    </h3>
                                    <div className="space-y-10">
                                        <div className="grid md:grid-cols-2 gap-10">
                                            <div>
                                                <h4 className="text-[#920F17] text-xs font-bold uppercase tracking-widest mb-4">Challenge</h4>
                                                <p className="text-gray-500 text-sm leading-relaxed">{caseStudies[activeCaseStudy].challenge}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-[#920F17] text-xs font-bold uppercase tracking-widest mb-4">Approach</h4>
                                                <p className="text-gray-500 text-sm leading-relaxed">{caseStudies[activeCaseStudy].approach}</p>
                                            </div>
                                        </div>
                                        <div className="pt-10 border-t border-gray-100">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                                {caseStudies[activeCaseStudy].results.map((result, idx) => (
                                                    <div key={idx} className="text-center">
                                                        <div className="text-2xl md:text-3xl font-bold text-[#920F17] mb-2">{result.value}</div>
                                                        <div className="text-[11px] text-gray-400 font-bold uppercase leading-none">{result.label}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-24 bg-white relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <span className="text-[#920F17] text-sm font-bold uppercase tracking-widest mb-4 block">Knowledge Base</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f]">Any Questions?</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {faqItems.map((item, index) => (
                            <div key={index} className="py-6">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex justify-between items-center text-left group"
                                >
                                    <span className="text-xl font-bold text-[#1d1d1f] group-hover:text-[#920F17] transition-all">
                                        {item.question}
                                    </span>
                                    <div className={`w-10 h-10 min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center flex-shrink-0 transition-all ${activeFaq === index ? 'bg-[#920F17] text-white rotate-45' : 'bg-gray-100 text-gray-400'}`}>                                        <Plus className="w-5 h-5" />
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
                                            <p className="py-6 text-gray-500 leading-relaxed text-lg">
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
            <section className="py-24 bg-[#1d1d1f]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-10 md:p-20 text-center shadow-2xl relative overflow-hidden"                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#920F17]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#1d1d1f] mb-8 leading-tight">
                            Ready to dominate your niche?
                        </h2>
                        <p className="text-gray-500 text-xl max-w-2xl mx-auto mb-12">
                            Stop chasing broad metrics and start building meaningful authority where it counts.
                        </p>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="/contact"
                            className="inline-flex items-center gap-4 bg-[#920F17] text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-[#6B080E] transition-all"
                        >
                            Book a Consultation
                            <ChevronRight className="w-6 h-6" />
                        </motion.a>
                    </motion.div>
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
                        className="fixed bottom-10 right-10 w-14 h-14 bg-[#920F17] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#6B080E] transition-all z-[1000]"
                    >
                        <ArrowUp className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Niche;


