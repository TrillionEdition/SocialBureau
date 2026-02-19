import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
    {
        question: "How does SocialBureau's API-driven marketing work?",
        answer:
            "We integrate custom API solutions with your existing marketing stack to automate data flow, enhance targeting precision, and provide real-time performance analytics across all platforms.",
    },
    {
        question: "What industries do you specialize in?",
        answer:
            "While we work across sectors, we specialize in high-growth digital businesses, e-commerce brands, and forward-thinking tech ventures that require scalable marketing systems.",
    },
    {
        question: "How can I join the SocialBureau expert network?",
        answer:
            "We are always looking for top-tier talent in SEO, Performance Marketing, and Creative Direction. You can apply through our Q/A hub or directly via our careers page.",
    },
    {
        question: "Do you offer custom consultancy for global brands?",
        answer:
            "Yes. Through our TrillionEdition venture, we provide strategic consultancy for global businesses focused on long-term digital growth and performance.",
    },
    {
        question: "How much do your services cost?",
        answer:
            "Pricing varies by engagement from tactical campaign work to full-service retained partnerships. We provide tailored proposals after a short discovery call to understand scope and goals.",
    },
    {
        question: "What does onboarding look like?",
        answer:
            "Onboarding includes a kickoff, access & permission checks, data audits, and a 30/60/90 day roadmap so we can start delivering measurable outcomes quickly.",
    },
    {
        question: "Do you require long-term contracts?",
        answer:
            "We offer flexible terms month-to-month for some services and discounted rates for longer retainers. Contract length is negotiable based on scope.",
    },
    {
        question: "How do you measure success and reporting frequency?",
        answer:
            "We track KPIs agreed during discovery and deliver concise reports weekly operational updates and a comprehensive monthly performance review with actionable recommendations.",
    },
    {
        question: "How do you handle data privacy and security?",
        answer:
            "We follow industry best practices: least-privilege access, encrypted storage for sensitive credentials, and strict NDA/data processing terms when required.",
    },
    {
        question: "What support channels and response times do you offer?",
        answer:
            "Support is available via email and scheduled calls. Critical issues receive prioritized responses (same-day) while routine requests follow agreed SLAs.",
    },
];

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const navigate = useNavigate();

    return (
        <section className="bg-neutral-50 py-24 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">

                {/* LEFT — INTRO */}
                <div className="space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
                        Questions, answered.
                    </h2>

                    <p className="text-neutral-600 text-base leading-relaxed max-w-sm">
                        Clear answers to common questions about how we work, who we work
                        with, and how to get involved.
                    </p>

                    <button
                        onClick={() => navigate("/qa-section")}
                        className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition"
                    >
                        Visit Q/A Hub →
                    </button>
                </div>

                {/* RIGHT — FAQ LIST */}
                <div className="lg:col-span-2 divide-y divide-neutral-200">
                    {faqs.map((faq, index) => (
                        <div key={index} className="py-6">
                            <button
                                onClick={() =>
                                    setActiveIndex(activeIndex === index ? null : index)
                                }
                                className="w-full flex items-center justify-between text-left"
                            >
                                <span className="text-lg sm:text-xl font-medium text-neutral-900">
                                    {faq.question}
                                </span>

                                <span className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-500">
                                    {activeIndex === index ? <FaMinus size={10} /> : <FaPlus size={10} />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                    >
                                        <p className="mt-4 text-neutral-600 text-base leading-relaxed max-w-2xl">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FAQSection;
