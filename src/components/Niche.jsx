import React, { useState, useEffect } from 'react';
import { Target, Search, Users, BarChart, Shield, Zap, ChevronRight, ArrowUp, Plus, X, CheckCircle, Layers, Settings, Smartphone, Compass, Sliders, TrendingUp, ShieldCheck, MapPin } from 'lucide-react';
import Seo from './Seo';
import { getOptimizedCloudinaryUrl } from '../../utils/cloudinary';

const Niche = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeFaq, setActiveFaq] = useState(null);
    const [activeCaseStudy, setActiveCaseStudy] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progressBar = document.querySelector('.scroll-progress-bar');
            if (progressBar) {
                progressBar.style.transform = `scaleX(${winScroll / height})`;
            }
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
            content: "For businesses offering specialized solutions, personalization becomes a key growth driver. We design campaigns using hyper-personalized marketing principles to align communication with user context, intent, and expectations across the customer journey.",
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
            description: "Every strategic decision is informed by research, performance signals, and audience behavior. Instead of assumptions, we rely on measurable insights to guide planning and optimization. This ensures campaigns remain aligned with market realities, adapt to changes, and consistently improve results through informed adjustments."
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
            approach: "We restructured the niche sales funnel using audience behavior analysis and implemented personalized campaign execution. Efforts were focused on high-intent traffic generation, aligning product messaging with specific user expectations and decision stages.",
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
        <div className="font-['SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif] bg-white text-[#1d1d1f] overflow-x-hidden antialiased relative">
            <Seo
                title="Niche Marketing Agency in Kerala | SocialBureau"
                url="https://www.socialbureau.in/services/niche-marketing"
                canonicalUrl="https://www.socialbureau.in/services/niche-marketing"
                description="Partner with a niche marketing agency that understands your audience and drives results through precision marketing"
                keywords="niche marketing, specialized marketing, kerala, Kochi, audience targeting,NICHE MARKETING AGENCY,NICHE MARKETING STRATEGIST,GROWTH STRATEGIES"
                
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
                    font-size: clamp(1.75rem, 5vw, 3.5rem);
                    font-weight: 600;
                    line-height: 1.1;
                    letter-spacing: -0.015em;
                }
                
                .apple-card {
                    background: #ffffff;
                    border-radius: 20px;
                    padding: 1.5rem;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
                    transition: all 0.3s ease;
                    border: 1px solid #f5f5f7;
                }
                
                .apple-card:hover {
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
                    border-color: #e5e5e7;
                }
                
                .apple-button-primary {
                    background: #920F17;
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 980px;
                    font-size: 0.95rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    border: none;
                    cursor: pointer;
                }
                
                .apple-button-primary:hover {
                    background: #6B080E;
                    transform: scale(1.02);
                }
                
                .apple-button-secondary {
                    background: transparent;
                    color: #920F17;
                    padding: 0.75rem 1.5rem;
                    border-radius: 980px;
                    font-size: 0.95rem;
                    font-weight: 500;
                    border: 1px solid #920F17;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                }
                
                .apple-button-secondary:hover {
                    background: rgba(146, 15, 23, 0.05);
                }
                
                .apple-stat {
                    font-size: clamp(1.75rem, 5vw, 2.5rem);
                    font-weight: 600;
                    color: #920F17;
                    line-height: 1;
                }
                
                .apple-stat-label {
                    font-size: 0.75rem;
                    color: #86868b;
                    margin-top: 0.5rem;
                    line-height: 1.3;
                }
                
                .apple-body {
                    font-size: clamp(0.9rem, 2vw, 1.125rem);
                    line-height: 1.6;
                    color: #515154;
                }
                
                .scroll-progress-bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 3px;
                    width: 100%;
                    background: #920F17;
                    z-index: 1000;
                    transform: scaleX(0);
                    transform-origin: left;
                    will-change: transform;
                    transition: transform 0.1s ease;
                }
                
                .stack-layer {
                    position: sticky;
                    top: 0;
                    box-shadow: 0 -20px 40px rgba(0,0,0,0.05);
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeUp {
                    animation: fadeUp 0.8s ease-out forwards;
                }

                /* HERO SECTION MOBILE */
                @media (max-width: 1024px) {
                    .hero-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                    }
                }

                @media (max-width: 768px) {
                    .hero-image {
                        height: 300px !important;
                        border-radius: 16px !important;
                        margin-right: 1rem !important;
                        margin-top: 1rem !important;
                    }

                    .hero-content {
                        padding: 0 !important;
                    }
                }

                @media (max-width: 640px) {
                    .hero-image {
                        height: 250px !important;
                        border-radius: 12px !important;
                        margin-right: 0 !important;
                    }

                    .hero-heading {
                        font-size: 1.5rem !important;
                    }

                    .hero-text {
                        font-size: 0.9rem !important;
                        margin-bottom: 1.5rem !important;
                    }

                    .hero-buttons {
                        flex-direction: column !important;
                        gap: 0.75rem !important;
                    }

                    .hero-buttons a {
                        width: 100% !important;
                        justify-content: center !important;
                    }
                }

                /* ABOUT SECTION MOBILE */
                @media (max-width: 1024px) {
                    .about-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                    }
                }

                @media (max-width: 768px) {
                    .about-image {
                        height: 280px !important;
                        border-radius: 16px !important;
                    }

                    .about-text h2 {
                        font-size: 1.25rem !important;
                        margin-bottom: 1rem !important;
                    }

                    .about-text p {
                        font-size: 0.9rem !important;
                        margin-bottom: 1rem !important;
                    }

                    .about-wrapper {
                        padding: 1.5rem !important;
                    }
                }

                @media (max-width: 640px) {
                    .about-image {
                        height: 240px !important;
                        border-radius: 12px !important;
                    }

                    .about-text h2 {
                        font-size: 1.1rem !important;
                    }

                    .about-text p {
                        font-size: 0.85rem !important;
                    }

                    .about-wrapper {
                        padding: 1rem !important;
                    }
                }

                /* SERVICES SECTION MOBILE */
                @media (max-width: 1024px) {
                    .services-top-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }

                    .services-image {
                        order: 2 !important;
                        height: 320px !important;
                    }

                    .services-cards {
                        order: 1 !important;
                        gap: 0.75rem !important;
                    }
                }

                @media (max-width: 768px) {
                    .services-image {
                        height: 300px !important;
                        border-radius: 16px !important;
                        margin: 0 !important;
                    }

                    .services-card {
                        padding: 1rem !important;
                        border-radius: 14px !important;
                        gap: 0.75rem !important;
                    }

                    .services-card h3 {
                        font-size: 0.9rem !important;
                        margin-bottom: 0.5rem !important;
                    }

                    .services-card p {
                        font-size: 0.75rem !important;
                        margin-bottom: 0.75rem !important;
                    }

                    .services-card ul {
                        gap: 0.5rem !important;
                    }

                    .services-card li {
                        font-size: 0.7rem !important;
                        line-height: 1.2;
                    }

                    .services-bottom-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }

                    .services-header h2 {
                        font-size: 2rem !important;
                    }

                    .services-card .services-number {
                        font-size: 1.5rem !important;
                        min-width: 2rem !important;
                    }
                }

                @media (max-width: 640px) {
                    .services-image {
                        height: 260px !important;
                        border-radius: 12px !important;
                    }

                    .services-card {
                        padding: 0.75rem !important;
                    }

                    .services-card h3 {
                        font-size: 0.85rem !important;
                    }

                    .services-card p {
                        font-size: 0.7rem !important;
                    }

                    .services-header h2 {
                        font-size: 1.5rem !important;
                    }

                    .services-header p {
                        font-size: 0.85rem !important;
                    }

                    .services-card .services-number {
                        font-size: 1.25rem !important;
                    }
                }

                /* STRATEGIES SECTION MOBILE */
                @media (max-width: 1024px) {
                    .strategies-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                    }

                    .strategies-image {
                        height: 350px !important;
                        border-radius: 16px !important;
                    }
                }

                @media (max-width: 768px) {
                    .strategies-image {
                        height: 320px !important;
                        object-position: top !important;
                    }

                    .strategy-item {
                        gap: 1rem !important;
                    }

                    .strategy-icon {
                        width: 40px !important;
                        height: 40px !important;
                        min-width: 40px !important;
                    }

                    .strategy-item h3 {
                        font-size: 0.95rem !important;
                    }

                    .strategy-item p {
                        font-size: 0.85rem !important;
                    }

                    .strategies-title {
                        font-size: 2rem !important;
                    }
                }

                @media (max-width: 640px) {
                    .strategies-image {
                        height: 280px !important;
                        border-radius: 12px !important;
                    }

                    .strategy-item h3 {
                        font-size: 0.9rem !important;
                    }

                    .strategy-item p {
                        font-size: 0.8rem !important;
                    }

                    .strategies-title {
                        font-size: 1.5rem !important;
                    }
                }

                /* CASE STUDIES MOBILE */
                @media (max-width: 1024px) {
                    .case-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                    }

                    .case-list {
                        grid-column: auto !important;
                    }

                    .case-detail {
                        grid-column: auto !important;
                        position: static !important;
                        top: auto !important;
                    }
                }

                @media (max-width: 768px) {
                    .case-button {
                        padding: 1rem !important;
                        border-radius: 16px !important;
                    }

                    .case-detail {
                        padding: 1.25rem !important;
                        border-radius: 16px !important;
                    }

                    .case-button h3 {
                        font-size: 0.95rem !important;
                    }

                    .case-detail h3 {
                        font-size: 1.1rem !important;
                    }

                    .case-detail h4 {
                        font-size: 0.85rem !important;
                    }

                    .case-detail p {
                        font-size: 0.8rem !important;
                    }

                    .case-results {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }
                }

                @media (max-width: 640px) {
                    .case-button {
                        padding: 0.75rem !important;
                    }

                    .case-detail {
                        padding: 1rem !important;
                    }

                    .case-detail h3 {
                        font-size: 1rem !important;
                    }
                }

                /* TESTIMONIALS MOBILE */
                @media (max-width: 768px) {
                    .testimonials-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }

                    .testimonial-card {
                        padding: 1.25rem !important;
                        border-radius: 16px !important;
                    }

                    .testimonial-card p {
                        font-size: 0.85rem !important;
                    }

                    .testimonial-card div {
                        font-size: 0.8rem !important;
                    }

                    .testimonials-title {
                        font-size: 2rem !important;
                    }
                }

                @media (max-width: 640px) {
                    .testimonial-card {
                        padding: 1rem !important;
                    }

                    .testimonial-card p {
                        font-size: 0.8rem !important;
                    }

                    .testimonials-title {
                        font-size: 1.5rem !important;
                    }
                }

                /* FAQ MOBILE */
                @media (max-width: 768px) {
                    .faq-container {
                        padding: 1.5rem !important;
                    }

                    .faq-title {
                        font-size: 1.75rem !important;
                    }

                    .faq-item {
                        padding: 0.75rem 0 !important;
                    }

                    .faq-button {
                        font-size: 0.95rem !important;
                        padding: 0.75rem 0 !important;
                    }

                    .faq-answer {
                        font-size: 0.85rem !important;
                        padding: 0.5rem 0 0.75rem 0 !important;
                    }
                }

                @media (max-width: 640px) {
                    .faq-container {
                        padding: 1rem !important;
                    }

                    .faq-title {
                        font-size: 1.25rem !important;
                    }

                    .faq-button {
                        font-size: 0.85rem !important;
                    }

                    .faq-answer {
                        font-size: 0.8rem !important;
                    }
                }

                /* CTA SECTION MOBILE */
                @media (max-width: 768px) {
                    .cta-wrapper {
                        padding: 2rem 1.25rem !important;
                        border-radius: 16px !important;
                        margin: 0 1rem !important;
                    }

                    .cta-wrapper h2 {
                        font-size: 1.5rem !important;
                        margin-bottom: 0.75rem !important;
                    }

                    .cta-wrapper p {
                        font-size: 0.9rem !important;
                        margin-bottom: 1rem !important;
                    }
                }

                @media (max-width: 640px) {
                    .cta-wrapper {
                        padding: 1.5rem 1rem !important;
                        margin: 0 0.5rem !important;
                    }

                    .cta-wrapper h2 {
                        font-size: 1.25rem !important;
                    }

                    .cta-wrapper p {
                        font-size: 0.8rem !important;
                    }
                }

                /* SECTION PADDING MOBILE */
                @media (max-width: 768px) {
                    section {
                        padding-top: 2rem !important;
                        padding-bottom: 2rem !important;
                    }
                }

                @media (max-width: 640px) {
                    section {
                        padding-top: 1.5rem !important;
                        padding-bottom: 1.5rem !important;
                        padding-left: 1rem !important;
                        padding-right: 1rem !important;
                    }
                }

                /* SCROLL TO TOP BUTTON */
                @media (max-width: 640px) {
                    .scroll-top-btn {
                        width: 44px !important;
                        height: 44px !important;
                        bottom: 1rem !important;
                        right: 1rem !important;
                    }
                }

                /* GENERAL RESPONSIVE */
                img {
                    max-width: 100% !important;
                    height: auto !important;
                    display: block !important;
                }

                @media (max-width: 768px) {
                    .px-6 {
                        padding-left: 1rem !important;
                        padding-right: 1rem !important;
                    }

                    .gap-12,
                    .gap-16 {
                        gap: 1.25rem !important;
                    }
                }
                `
            }} />

            <div className="scroll-progress-bar" style={{ width: '0%' }}></div>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative overflow-hidden bg-white stack-layer" style={{ zIndex: 10 }}>
                <div className="max-w-7xl mx-auto w-full hero-grid grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="animate-fadeUp hero-content">
                        <span className="apple-overline mb-3 sm:mb-4 block">Niche Marketing Agency</span>
                        <h1 className="apple-heading hero-heading mb-4 sm:mb-6">
                            Niche Marketing Agency
                            <span className="block text-[#920F17]">in Kerala</span>
                        </h1>
                        <p className="apple-body hero-text text-[#515154] mb-6 sm:mb-10 max-w-2xl leading-relaxed text-base sm:text-lg">
                            Transform business growth by focusing on clarity, relevance, and specialization. Social Bureau
                            helps brands grow by reaching audiences that actually convert—through carefully structured
                            niche-focused strategies designed for long-term authority and sustainable results.                        </p>
                        <div className="flex hero-buttons flex-col sm:flex-row gap-3 sm:gap-4">
                            <a href="https://api.whatsapp.com/send/?phone=918714952665&text=Hello%2C+I+would+like+to+learn+more." className="apple-button-primary">
                                Find Your Niche
                                <ChevronRight className="w-4 h-4" />
                            </a>
                            <a href="#services" className="apple-button-secondary">
                                Explore Services
                            </a>
                        </div>
                    </div>
                    <div className="relative w-full hero-image rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={getOptimizedCloudinaryUrl("https://res.cloudinary.com/dtwcgfmar/image/upload/v1772181555/download_8_evgktd.webp", 1200)}
                            alt="Niche Marketing Hero"
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="min-h-auto w-full bg-[#1d1d1f] text-white flex items-center stack-layer" style={{ zIndex: 20 }}>
                <div className="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 sm:mb-14 lg:mb-16">
                        <span className="apple-overline mb-2 sm:mb-3 block text-gray-400">About</span>
                        <h2 className="apple-heading text-2xl sm:text-3xl lg:text-5xl mb-4 sm:mb-6">Move Beyond The Mainstream</h2>
                    </div>
                    <div className="about-grid grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="about-text">
                            <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6 text-white/80 font-medium">Niche Marketing Strategy</h2>
                            <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6 leading-relaxed">
                                <a href='https://socialbureau.in/blogs/niche-marketing-for-startups' title="Learn more about Niche Marketing on Wikipedia">Niche marketing</a> is the process of identifying a
                                clearly defined market segment and building
                                communication, positioning, and messaging
                                around that audience's specific needs. Unlike
                                broad campaigns, this approach prioritizes
                                relevance over reach and depth over volume                            </p>
                            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                                At<a href='https://socialbureau.in' title="Visit SocialBureau Official Website"> Social Bureau</a>, a Kochi-based marketing
                                agency, we work with businesses that want to
                                grow through specialization. Our team studies
                                how audiences think, search, and make
                                decisions, then builds structured marketing
                                systems that support long-term positioning
                                and consistent demand.
                            </p>
                        </div>
                        <div className="about-image h-64 sm:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl border border-white/10">
                            <img
                                src={getOptimizedCloudinaryUrl("https://res.cloudinary.com/dtwcgfmar/image/upload/v1772086613/Luminuce_-_Brand_sgp6th.webp", 1000)}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                                alt="Detailed niche marketing strategy and branding"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section
                id="services"
                className="min-h-auto py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#920F17] text-white stack-layer relative overflow-hidden"
                style={{ zIndex: 30 }}
            >
                {/* Decorative background depth */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-white/[0.03] rounded-full blur-[120px]"></div>
                    <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-black/[0.05] rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">

                    {/* Header */}
                    <div className="services-header text-center mb-12 sm:mb-16 lg:mb-20 animate-fadeUp">
                        <span className="apple-overline mb-2 sm:mb-3 block text-white/50 tracking-[0.2em]">
                            Our Services
                        </span>
                        <h2 className="apple-heading text-2xl sm:text-3xl lg:text-6xl mb-4 sm:mb-6 lg:mb-8 text-white">
                            Niche marketing service
                        </h2>
                        <p className="text-white/90 max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12 text-sm sm:text-base lg:text-lg leading-relaxed">
                            We design and implement marketing solutions that are built around precision
                            rather than assumptions. Each service is delivered with research-backed
                            planning, structured execution, and measurable outcomes
                        </p>
                    </div>

                    {/* TOP SECTION — Image + 3 stacked cards */}
                    <div className="services-top-grid grid lg:grid-cols-2 gap-6 lg:gap-12 items-start mb-12 lg:mb-20">

                        {/* Image Container */}
                        <div className="relative group order-2 lg:order-1">
                            <div className="absolute -inset-4 bg-white/[0.05] rounded-[2.5rem] blur-2xl group-hover:bg-white/[0.08] transition-all duration-700"></div>
                            <div className="services-image relative h-72 sm:h-96 lg:h-[500px] rounded-xl sm:rounded-2xl lg:rounded-[2rem] overflow-hidden shadow-lg lg:shadow-2xl bg-white/5 border border-white/10">
                                <img
                                    src={getOptimizedCloudinaryUrl("https://res.cloudinary.com/dtwcgfmar/image/upload/v1772185316/image-gen_8_sbd0tb.webp", 1000)}
                                    alt="Nichemarketing Services"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#920F17]/30 to-transparent"></div>
                            </div>
                        </div>

                        {/* Stacked cards (first 3 items) */}
                        <div className="services-cards grid grid-cols-1 gap-2 sm:gap-3 order-1 lg:order-2">
                            {processSections.slice(0, 3).map((section, index) => (
                                <div
                                    key={index}
                                    className="services-card group rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-md hover:bg-white/[0.07] hover:border-white/30 transition-all duration-500"
                                >
                                    <div className="flex items-start gap-2 sm:gap-3">
                                        <div className="services-number flex-shrink-0 text-white/20 text-lg sm:text-xl lg:text-3xl font-bold font-mono leading-none min-w-max">
                                            0{index + 1}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-xs sm:text-sm lg:text-base font-semibold mb-1 text-white tracking-tight line-clamp-2">
                                                {section.title}
                                            </h3>
                                            <p className="text-xs text-white/60 leading-tight mb-1.5 line-clamp-2">
                                                {section.content}
                                            </p>
                                            <ul className="space-y-0.5 sm:space-y-1">
                                                {section.points.slice(0, 2).map((point, i) => (
                                                    <li key={i} className="flex items-start gap-1.5 text-white/70 text-xs line-clamp-1">
                                                        <div className="w-0.5 h-0.5 rounded-full bg-white/30 mt-1 flex-shrink-0"></div>
                                                        <span className="truncate">{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BOTTOM GRID — Remaining cards */}
                    <div className="services-bottom-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {processSections.slice(3).map((section, index) => (
                            <div
                                key={index}
                                className="group rounded-2xl lg:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/40 transition-all duration-500 hover:-translate-y-2 shadow-2xl flex flex-col"
                            >
                                <div className="flex justify-between items-start mb-6 sm:mb-8">
                                    <span className="text-white/10 text-4xl sm:text-5xl font-bold font-mono leading-none">0{index + 4}</span>
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white/30 group-hover:text-white" />
                                    </div>
                                </div>
                                <h3 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-4 text-white tracking-tight">
                                    {section.title}
                                </h3>
                                <p className="text-white/60 mb-6 sm:mb-8 text-xs sm:text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                                    {section.content}
                                </p>
                                <div className="mt-auto pt-6 sm:pt-8 border-t border-white/10">
                                    <ul className="space-y-3 sm:space-y-4">
                                        {section.points.map((point, i) => (
                                            <li key={i} className="flex items-start gap-3 text-white/70 text-xs sm:text-sm group-hover:text-white/90 transition-colors">
                                                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/20 mt-0.5 flex-shrink-0 group-hover:text-white/40 transition-colors" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Strategies Section */}
            <section id="strategies" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white text-black stack-layer" style={{ zIndex: 40 }}>
                <div className="max-w-7xl mx-auto">
                    <div className="strategies-grid grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div>
                            <span className="apple-overline mb-3 sm:mb-4 block text-gray-500">Why Choose Us</span>
                            <h2 className="apple-heading strategies-title text-2xl sm:text-3xl lg:text-5xl mb-8 sm:mb-10 text-black">Niche Marketing agency in Kochi</h2>
                            <div className="space-y-6 sm:space-y-8">
                                {strategies.map((strategy, index) => {
                                    const Icon = strategy.icon;
                                    return (
                                        <div key={index} className="strategy-item flex gap-4 sm:gap-6">
                                            <div className="strategy-icon flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#920F17]/5 rounded-lg sm:rounded-xl flex items-center justify-center">
                                                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#920F17]" />
                                            </div>
                                            <div>
                                                <h3 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2">{strategy.title}</h3>
                                                <p className="text-[#515154] leading-relaxed text-sm sm:text-base">{strategy.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="strategies-image h-72 sm:h-96 lg:h-[600px] rounded-xl sm:rounded-2xl lg:rounded-[2rem] overflow-hidden shadow-lg lg:shadow-2xl relative group">
                            <img
                                src={getOptimizedCloudinaryUrl("https://res.cloudinary.com/dtwcgfmar/image/upload/v1772088857/DSC04857_1_2_vksgod.webp", 1000)}
                                alt="Professionals working at SocialBureau"
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section id="case-studies" className="py-12 sm:py-16 lg:py-24 bg-[#fbfbfd] stack-layer px-4 sm:px-6 lg:px-8" style={{ zIndex: 50 }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-12 lg:mb-14">
                        <span className="apple-overline block mb-2 sm:mb-3">Case Studies</span>
                        <h2 className="apple-heading text-2xl sm:text-3xl lg:text-5xl">Success in Specialization</h2>
                    </div>

                    <div className="case-grid grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                        {/* LEFT list */}
                        <div className="case-list lg:col-span-5 space-y-4 sm:space-y-5 lg:space-y-6">
                            {caseStudies.map((study, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveCaseStudy(index)}
                                    className={`case-button apple-card text-left w-full transition-all duration-300 rounded-2xl lg:rounded-3xl ${activeCaseStudy === index ? 'ring-2 ring-[#920F17] bg-white' : 'hover:bg-[#f5f5f7]'}`}
                                >
                                    <span className="text-xs font-semibold text-[#920F17] bg-[#920F17]/5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full uppercase tracking-wider inline-block">
                                        {study.type}
                                    </span>
                                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold mt-2 sm:mt-3 text-black">{study.title}</h3>
                                    <div className="text-[#920F17] text-xs sm:text-sm mt-2 sm:mt-3 flex items-center gap-1 font-medium">
                                        View details <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* RIGHT details */}
                        <div className="case-detail lg:col-span-7">
                            <div className="apple-card sticky lg:top-28 rounded-2xl lg:rounded-3xl">
                                <h3 className="text-lg sm:text-2xl font-semibold mb-4 sm:mb-6 text-black">{caseStudies[activeCaseStudy].title}</h3>
                                <div className="space-y-4 sm:space-y-6 text-xs sm:text-sm lg:text-base">
                                    <div>
                                        <h4 className="font-semibold text-[#920F17] mb-1">Ideal Customer</h4>
                                        <p className="text-[#515154]">{caseStudies[activeCaseStudy].idealCustomer}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#920F17] mb-1">The Challenge</h4>
                                        <p className="text-[#515154]">{caseStudies[activeCaseStudy].challenge}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#920F17] mb-1">The Approach</h4>
                                        <p className="text-[#515154]">{caseStudies[activeCaseStudy].approach}</p>
                                    </div>
                                    <div className="case-results grid grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-[#f5f5f7]">
                                        {caseStudies[activeCaseStudy].results.map((result, idx) => (
                                            <div key={idx} className="text-center">
                                                <div className="apple-stat text-base sm:text-2xl">{result.value}</div>
                                                <div className="apple-stat-label capitalize text-xs">{result.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section
                id="testimonials"
                className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#1d1d1f] text-white stack-layer"
                style={{ zIndex: 60 }}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-14 lg:mb-16">
                        <span className="apple-overline mb-2 sm:mb-3 block text-white/70">
                            Testimonials
                        </span>
                        <h2 className="apple-heading testimonials-title text-2xl sm:text-3xl lg:text-5xl text-white">
                            Trusted by Specialists
                        </h2>
                    </div>

                    <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 max-w-5xl mx-auto">
                        <div className="testimonial-card rounded-2xl lg:rounded-3xl p-6 sm:p-7 lg:p-8 bg-white/5 border border-white/10">
                            <div className="text-5xl sm:text-6xl text-white opacity-20 mb-3 sm:mb-4 leading-none font-serif">"</div>
                            <p className="text-white/80 italic mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                                Working with the team helped us bring clarity to our marketing. Instead of chasing volume,
                                we started attracting enquiries that actually matched our services. The difference in lead
                                quality was noticeable within a few months.
                            </p>
                            <div className="font-semibold text-white text-sm sm:text-base">
                                — Service Business Owner
                            </div>
                        </div>

                        <div className="testimonial-card rounded-2xl lg:rounded-3xl p-6 sm:p-7 lg:p-8 bg-white/5 border border-white/10">
                            <div className="text-5xl sm:text-6xl text-white opacity-20 mb-3 sm:mb-4 leading-none font-serif">"</div>
                            <p className="text-white/80 italic mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                                What stood out was their understanding of our market. The strategy wasn't generic and felt
                                well thought out. Our messaging became more focused, and customer engagement improved
                                steadily over time.
                            </p>
                            <div className="font-semibold text-white text-sm sm:text-base">
                                — Founder, Product-Based Brand
                            </div>
                        </div>

                        <div className="testimonial-card rounded-2xl lg:rounded-3xl p-6 sm:p-7 lg:p-8 bg-white/5 border border-white/10">
                            <div className="text-5xl sm:text-6xl text-white opacity-20 mb-3 sm:mb-4 leading-none font-serif">"</div>
                            <p className="text-white/80 italic mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                                They took the time to understand how our audience thinks and searches. The changes made
                                to positioning and campaigns helped us convert existing traffic more effectively without
                                increasing spend.
                            </p>
                            <div className="font-semibold text-white text-sm sm:text-base">
                                — Marketing Lead
                            </div>
                        </div>

                        <div className="testimonial-card rounded-2xl lg:rounded-3xl p-6 sm:p-7 lg:p-8 bg-white/5 border border-white/10">
                            <div className="text-5xl sm:text-6xl text-white opacity-20 mb-3 sm:mb-4 leading-none font-serif">"</div>
                            <p className="text-white/80 italic mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                                Our brand finally feels differentiated. Earlier, we struggled to explain why we were
                                different. Now the messaging is clear, consistent, and resonates with the right customers.
                            </p>
                            <div className="font-semibold text-white text-sm sm:text-base">
                                — Operations Manager
                            </div>
                        </div>

                        <div className="testimonial-card rounded-2xl lg:rounded-3xl p-6 sm:p-7 lg:p-8 bg-white/5 border border-white/10 md:col-span-2">
                            <div className="text-5xl sm:text-6xl text-white opacity-20 mb-3 sm:mb-4 leading-none font-serif">"</div>
                            <p className="text-white/80 italic mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                                The process was transparent and structured. We always knew what was being done and why.
                                The results came gradually, but they were stable and sustainable, which is exactly what
                                we were looking for.
                            </p>
                            <div className="font-semibold text-white text-sm sm:text-base">
                                — Business Consultant
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="w-full bg-white stack-layer" style={{ zIndex: 70 }}>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 faq-container">
                    <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                        <span className="apple-overline block mb-2 sm:mb-3 text-gray-500">FAQ</span>
                        <h2 className="apple-heading faq-title text-2xl sm:text-3xl lg:text-4xl text-black">Frequently Asked Questions</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {faqItems.map((item, index) => (
                            <div key={index} className="faq-item py-4 sm:py-6">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="faq-button w-full flex justify-between items-start sm:items-center text-left text-base sm:text-lg font-medium text-black hover:text-[#920F17] transition gap-3"
                                >
                                    <span className="flex-1">{item.question}</span>
                                    {activeFaq === index ? (
                                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#920F17] flex-shrink-0" />
                                    ) : (
                                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                                    )}
                                </button>
                                {activeFaq === index && (
                                    <div className="faq-answer mt-3 sm:mt-4 text-[#515154] text-sm sm:text-base leading-relaxed animate-fadeUp">
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-24 bg-[#fbfbfd] stack-layer" style={{ zIndex: 80 }}>
                <div className="cta-wrapper bg-[#1d1d1f] text-white rounded-2xl lg:rounded-[2rem] py-8 sm:py-12 lg:py-20 px-6 sm:px-8 lg:px-16 text-center relative overflow-hidden max-w-7xl mx-auto shadow-xl lg:shadow-2xl">
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#920F17] opacity-20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#920F17] opacity-10 rounded-full blur-3xl"></div>
                    <h2 className="apple-heading text-xl sm:text-2xl lg:text-4xl text-white mb-3 sm:mb-4 lg:mb-6 relative z-10">Dominate Your Segment</h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto relative z-10">
                        Let's discuss how focused <a href='https://en.wikipedia.org/wiki/Niche_market' title="Learn more about Niche Marketing on Wikipedia"> niche marketing</a> can drive measurable results and authority for your brand.
                    </p>
                    <a href="/contact" className="apple-button-primary cta-button bg-white text-black hover:bg-gray-100 hover:scale-105 transition-all inline-flex text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-10 relative z-10">
                        Book a Strategy Call
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
                    </a>
                </div>
            </section>

            {/* Scroll to Top */}
            <button
                className={`scroll-top-btn fixed bottom-6 sm:bottom-8 right-6 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-[#920F17] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#6B080E] hover:scale-110 active:scale-95 transition-all z-[1001] ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                onClick={scrollToTop}
            >
                <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
        </div>
    );
};

export default Niche;