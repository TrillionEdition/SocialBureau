import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LatestBlogs from './LatestBlogs';

const Footer = () => (
    <footer className="bg-black border-t border-gray-800 text-gray-400 py-8 px-6 text-center text-xs sm:text-sm">
        <p>&copy; 2025 S<a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
            Social<span className="text-[#ff0000]">B</span>ureau
        </a>. All rights reserved.</p>
    </footer>
);


const InteractiveBackground = () => (
    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
);

const ApiMarketing = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const servicesSectionRef = useRef(null);
    const whyChooseSectionRef = useRef(null);

    const { scrollYProgress: servicesProgress } = useScroll({
        target: servicesSectionRef,
        offset: ["start start", "end center"],
    });

    // Increased the scroll distance to ensure last item is fully visible
    const servicesX = useTransform(servicesProgress, [0, 1], ["0%", "-85%"]);

    const { scrollYProgress: whyChooseProgress } = useScroll({
        target: whyChooseSectionRef,
        offset: ["start start", "end center"],
    });

    // Increased the scroll distance to ensure last item is fully visible
    const whyChooseX = useTransform(whyChooseProgress, [0, 1], ["0%", "-80%"]);

    const services = [
        {
            icon: '👨‍💻',
            title: 'Developer Acquisition & Portal Optimization',
            description: 'Developers typically discover integrations through organic search, peer recommendations, and technical communities.',
            items: [
                'Technical content architecture targeting integration-specific queries',
                'Interactive testing environments demonstrating capabilities',
                'Implementation tutorials and use case documentation',
                'GraphQL queries and RESTful API reference materials'
            ]
        },
        {
            icon: '📈',
            title: 'Strategic Consulting for Sustainable Growth',
            description: 'Our API consultant engagements audit existing developer journeys to identify adoption barriers.',
            items: [
                'API design-first methodology aligning with market demand',
                'Revenue strategy development including usage-based pricing',
                'Partner ecosystems expansion through integration marketplaces',
                'Security communication and transparent implementations'
            ]
        },
        {
            icon: '🎯',
            title: 'Integration Marketing & Product Positioning',
            description: 'Platforms require positioning that communicates both technical excellence and business value.',
            items: [
                'Competitive differentiation based on developer experience',
                'Event-driven architecture adoption through use cases',
                'Multi-language support marketing',
                'Integration capability positioning'
            ]
        },
        {
            icon: '⚡',
            title: 'Developer Onboarding & Activation',
            description: 'The first successful call predicts long-term retention and platform stickiness.',
            items: [
                'Immediate functional sandbox access',
                'Clear authentication flows and implementation guides',
                'Actionable error messages reducing support dependency',
                'Progressive disclosure of complexity'
            ]
        },
        {
            icon: '🌐',
            title: 'Ecosystem Expansion & Marketplace Strategy',
            description: 'Platform growth accelerates when integrations exist within established software ecosystems.',
            items: [
                'Zapier, Make, and n8n connector deployment',
                'Co-marketing programs and joint webinar frameworks',
                'AppExchange and App Store optimization',
                'Event-driven scenario demonstrations'
            ]
        }
    ];

    const whyChooseUs = [
        {
            title: 'Technical Depth Meets Marketing Excellence',
            description: 'Our team includes former developers and integration specialists who understand design patterns and developer experience principles.'
        },
        {
            title: 'Proven Methodology',
            description: 'Data-driven approach focusing on metrics correlating with business value: acquisition costs, activation rates, and revenue acceleration.'
        },
        {
            title: 'Client Trust',
            description: 'Technology companies globally choose us as their API marketing partner, serving SaaS, FinTech, and cloud infrastructure platforms.'
        },
        {
            title: 'Product Specialists',
            description: 'We understand how developers evaluate integrations and optimize complete journeys from discovery through advocacy.'
        },
        {
            title: 'Regional Excellence',
            description: 'Based in Kerala, we combine local market understanding with international best practices from platforms like Stripe and Twilio.'
        }
    ];

    const testimonials = [
        {
            name: 'Arjun Menon',
            text: 'Working with this team helped us clearly position our integrations for developers. Our onboarding became smoother.',
            avatar: 'AM'
        },
        {
            name: 'Suresh Raghavan',
            text: 'They understand how developers actually evaluate APIs. The guidance improved our documentation structure.',
            avatar: 'SR'
        },
        {
            name: 'Ananya Nair',
            text: 'The clarity they brought to our platform messaging made it easier for partners to understand our integrations.',
            avatar: 'AN'
        },
        {
            name: 'Meera Pillai',
            text: 'Social Bureau helped us rethink how we present integration capabilities. Adoption increased noticeably.',
            avatar: 'MP'
        }
    ];

    const faqs = [
        { question: 'What exactly is API marketing?', answer: 'API marketing targets developers through technical documentation and code examples instead of sales presentations.' },
        { question: 'Why do developers ignore traditional marketing?', answer: 'Developers trust peer recommendations over sales content. They want to test functionality before committing time.' },
        { question: 'What is TTFFC and why does it matter?', answer: 'TTFFC means Time to First Finished Call—how quickly developers make their first successful API request.' },
        { question: 'How does developer portal SEO differ?', answer: 'Developer portal SEO targets technical queries like "Python payment example" instead of broad terms.' },
        { question: 'What role do functional sandboxes play?', answer: 'Sandboxes let developers test your API immediately without setup, increasing conversion rates.' },
        { question: 'Why work with Social Bureau?', answer: 'We specialize in developer-focused marketing with a team of former developers focusing on real metrics.' },
        { question: 'How do low-code connectors impact adoption?', answer: 'Low-code connectors on Zapier and Make expand your market to business users.' },
        { question: 'What is API monetization?', answer: 'API monetization turns integrations into revenue through usage-based pricing or tiered subscriptions.' },
        { question: 'How do partner ecosystems accelerate growth?', answer: 'Partner ecosystems multiply adoption through integrations with popular tools and platforms.' },
        { question: 'What metrics should we track?', answer: 'Track developer acquisition cost, activation rate, integration retention, and API usage growth.' }
    ];

    return (
        <div className="relative min-h-screen bg-black">
            <InteractiveBackground />

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-red-500/40"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.4, 0],
                            y: ["100%", "-20%"],
                            x: i % 2 === 0 ? ["0%", "20%"] : ["0%", "-20%"],
                        }}
                        transition={{ duration: 8 + i, repeat: Infinity, delay: i * 0.3 }}
                        style={{ left: `${Math.random() * 100}%` }}
                    />
                ))}
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <header className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
                    <div className="absolute inset-0 w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
                        <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover opacity-30">
                            <source src="https://res.cloudinary.com/dtwcgfmar/video/upload/v1768452147/abstract-modern-composition-with-black-tubes-cylin-2025-12-09-11-55-49-utc_fosbnh.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
                    </div>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-4xl mx-auto text-center px-4">
                        <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-light text-white leading-tight mb-4 sm:mb-6">
                            Leading API<br /><span className="font-light">Marketing Agency</span>
                        </h1>

                        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-6 sm:mb-8 font-light tracking-wide">
                            Transform Integration Capabilities into Competitive<br /><span className="font-light">Revenue Engines</span>
                        </motion.h2>

                        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="h-1 bg-white mx-auto mb-6 sm:mb-8 w-16 sm:w-20" />

                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 font-light leading-relaxed">
                            <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
                                Social<span className="text-[#ff0000]">B</span>ureau
                            </a>, based in Kochi, Kerala, helps SaaS platforms, cloud providers, and technology companies achieve measurable growth through developer-centric strategies.
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                                Connect With Us <ArrowRight size={18} />
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-transparent text-white font-semibold border border-white rounded-lg hover:bg-white/10 transition-all text-sm sm:text-base">
                                Learn More
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </header>

                {/* About Section */}
                <section className="relative text-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 backdrop-blur-sm bg-black/20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
                            <div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
                                    Strategic Acquisition in the<span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">API Economy</span>
                                </h2>
                            </div>
                            <div className="space-y-4 sm:space-y-6">
                                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                                    We position your platform for success by transforming integration capabilities into discoverable, adoptable solutions. From interactive testing environments to clear pricing communication, we drive outcomes that matter: increased developer activation, expanded partnerships, and accelerated revenue.
                                </p>
                                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                                    Modern platforms face a critical challenge: exceptional technical capabilities remain invisible without effective developer acquisition, streamlined onboarding workflows, and sustained integration retention.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section - Horizontal Scroll */}
                <section ref={servicesSectionRef} className="relative bg-black text-white h-[400vh]">
                    <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                        <motion.div style={{ x: servicesX }} className="flex h-full gap-0">
                            {services.map((service, index) => (
                                <div key={index} className={`flex items-center min-w-fit px-[2vw] sm:px-[5vw] ${index === 0 ? 'pl-[4vw] sm:pl-[10vw]' : ''}`}>
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-6 lg:gap-12 h-full py-12 sm:py-20 w-[550px] sm:w-[900px]">
                                        {/* Service Card */}
                                        <div className="relative h-[280px] sm:h-[350px] w-[240px] sm:w-[300px] md:w-[400px] lg:w-[450px] flex-shrink-0">
                                            <div className="relative w-full h-full border border-gray-800 bg-black/40 backdrop-blur-lg rounded-2xl p-4 sm:p-8 flex flex-col">
                                                <h4 className="text-red-400 font-semibold text-xs sm:text-md uppercase tracking-wider mb-3 sm:mb-4">
                                                    Key Features:
                                                </h4>
                                                <ul className="space-y-1 sm:space-y-2 flex-1">
                                                    {service.items.map((item, idx) => (
                                                        <li key={idx} className="flex items-start gap-2">
                                                            <span className="text-red-500 text-xs mt-1 flex-shrink-0">•</span>
                                                            <span className="text-gray-300 text-xs sm:text-md leading-relaxed">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Service Info */}
                                        <div className="flex flex-col max-w-[240px] sm:max-w-[300px] lg:max-w-[400px] flex-shrink-0 text-center sm:text-left">
                                            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-4 text-xs font-semibold tracking-widest text-zinc-500 mb-3 sm:mb-6 uppercase">
                                                <span>NO. {String(index + 1).padStart(2, '0')}</span>
                                                <span className="w-4 sm:w-8 h-px bg-zinc-800" />
                                                <span className="hidden sm:inline">SERVICE</span>
                                            </div>

                                            <h2 className="text-lg sm:text-4xl lg:text-5xl font-serif leading-tight mb-3 sm:mb-6">
                                                {service.title}
                                            </h2>

                                            <p className="text-zinc-400 text-xs sm:text-sm lg:text-base leading-relaxed mb-4 sm:mb-8 font-light">
                                                {service.description}
                                            </p>

                                            <div className="flex justify-center sm:justify-start">
                                                <a
                                                    href="#contact"
                                                    className="group relative inline-flex items-center text-[8px] sm:text-[10px] tracking-[0.2em] font-bold uppercase py-2"
                                                >
                                                    <span className="relative z-10 transition-colors group-hover:text-red-500">
                                                        Learn More
                                                    </span>
                                                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-700 transition-all group-hover:bg-red-500 group-hover:h-[2px]" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider - Show only between items */}
                                    {index < services.length - 1 && (
                                        <div className="h-[60vh] w-px bg-zinc-900 mx-[2vw] sm:mx-[5vw]" />
                                    )}
                                </div>
                            ))}

                            {/* Extra space at the end to ensure last item is fully visible */}
                            <div className="min-w-[50vw] sm:min-w-[30vw] md:min-w-[20vw] lg:min-w-[15vw]" />

                            {/* Additional spacer specifically for mobile */}
                            <div className="min-w-[30vw] sm:hidden" />
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section id="contact" className="bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="relative border border-zinc-800 bg-black/60 backdrop-blur-xl rounded-2xl px-6 sm:px-8 py-12 sm:py-14 md:px-16 md:py-20 text-center shadow-2xl">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-[2px] bg-red-600 rounded-full" />
                            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-4 sm:mb-6">
                                Let's Build the Future of Marketing Together
                            </h3>
                            <p className="text-zinc-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed mb-8 sm:mb-10">
                                Join hundreds of forward-thinking businesses using API-driven marketing to automate their growth.
                            </p>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto bg-red-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-md text-xs tracking-[0.25em] font-bold uppercase hover:bg-red-700 transition-all duration-200">
                                Schedule a Consultation
                            </motion.button>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us - Horizontal Scroll */}
                <section ref={whyChooseSectionRef} className="relative bg-black text-white h-[300vh]">
                    <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                        <motion.div style={{ x: whyChooseX }} className="flex h-full gap-0">
                            {whyChooseUs.map((item, index) => (
                                <div key={index} className={`flex items-center min-w-fit px-[2vw] sm:px-[5vw] ${index === 0 ? 'pl-[4vw] sm:pl-[10vw]' : ''}`}>
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-6 lg:gap-6 h-full py-12 sm:py-20 w-[450px] sm:w-[600px]">

                                        {/* Info Section */}
                                        <div className="flex flex-col max-w-[240px] sm:max-w-[300px] lg:max-w-[400px] flex-shrink-0 text-center sm:text-left">
                                            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-4 text-xs font-semibold tracking-widest text-zinc-500 mb-3 sm:mb-6 uppercase">
                                                <span>NO. {String(index + 1).padStart(2, '0')}</span>
                                                <span className="w-4 sm:w-8 h-px bg-zinc-800" />
                                                <span className="hidden sm:inline">REASON</span>
                                            </div>

                                            <h2 className="text-lg sm:text-4xl lg:text-5xl font-serif leading-tight mb-3 sm:mb-6">{item.title}</h2>

                                            <p className="text-zinc-400 text-xs sm:text-sm lg:text-base leading-relaxed mb-4 sm:mb-8 font-light">{item.description}</p>

                                            <div className="flex justify-center sm:justify-start">
                                                <a href="#contact" className="group relative inline-flex items-center text-[8px] sm:text-[10px] tracking-[0.2em] font-bold uppercase py-2">
                                                    <span className="relative z-10 transition-colors group-hover:text-red-500">
                                                        Get Started
                                                    </span>
                                                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-700 transition-all group-hover:bg-red-500 group-hover:h-[2px]" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider - Show only between items */}
                                    {index < whyChooseUs.length - 1 && (
                                        <div className="h-[50vh] w-px bg-zinc-900 mx-[2vw] sm:mx-[5vw]" />
                                    )}
                                </div>
                            ))}

                            {/* Extra space at the end to ensure last item is fully visible */}
                            <div className="min-w-[50vw] sm:min-w-[30vw] md:min-w-[20vw] lg:min-w-[15vw]" />

                            {/* Additional spacer specifically for mobile */}
                            <div className="min-w-[30vw] sm:hidden" />
                        </motion.div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="relative text-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-black/40">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Client <span className="text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text">Reviews</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                            {testimonials.map((testimonial, index) => (
                                <motion.div key={index} whileHover={{ scale: 1.02 }} className="bg-black/30 backdrop-blur-lg border border-gray-800 rounded-2xl p-6 sm:p-8 hover:border-red-500/50 transition-all">
                                    <div className="flex items-center mb-6">
                                        <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center font-bold text-white mr-3 sm:mr-4 text-xs sm:text-sm">
                                            {testimonial.avatar}
                                        </div>
                                        <h4 className="font-bold text-sm sm:text-lg text-white">{testimonial.name}</h4>
                                    </div>
                                    <p className="text-gray-300 italic mb-4 text-xs sm:text-sm">"{testimonial.text}"</p>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (<span key={i} className="text-red-500 text-sm">★</span>))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <LatestBlogs />

                {/* FAQ Section */}
                <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-black">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
                                Frequently Asked <span className="text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text">Questions</span>
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div key={index} whileHover={{ scale: 1.01 }} className="bg-black/30 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-red-500/50 transition-all">
                                    <button className="w-full text-left p-4 sm:p-6 flex justify-between items-center hover:bg-gray-900/50 transition-colors" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                                        <h3 className="text-base sm:text-lg font-semibold pr-4 text-white">{faq.question}</h3>
                                        <ChevronDown size={20} className={`text-red-400 transition-transform duration-300 flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} />
                                    </button>
                                    {openFaq === index && (
                                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t border-gray-800">
                                            <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">{faq.answer}</p>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
};

export default ApiMarketing;