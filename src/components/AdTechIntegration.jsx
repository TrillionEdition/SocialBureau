// import React, { useState, useRef, useEffect } from 'react';
// import {
//     Settings,
//     TrendingUp,
//     DollarSign,
//     Smartphone,
//     Monitor,
//     Shield,
//     Zap,
//     CheckCircle,
//     BarChart,
//     Database,
//     Layers,
//     ChevronRight,
//     ArrowUp,
//     Plus,
//     X
// } from 'lucide-react';
// import Footer from './Footer';
// import Seo from './Seo';

// const AdTechIntegration = () => {
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [activeFaq, setActiveFaq] = useState(null);
//     const [activeCaseStudy, setActiveCaseStudy] = useState(0);

//     useEffect(() => {
//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > 50);
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     const scrollToTop = () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };

//     const toggleFaq = (index) => {
//         setActiveFaq(activeFaq === index ? null : index);
//     };

//     const CountUp = ({ end, duration = 1500, suffix = "" }) => {
//         const [value, setValue] = useState(0);
//         const ref = useRef(null);
//         const hasAnimated = useRef(false);

//         useEffect(() => {
//             const element = ref.current;
//             if (!element) return;

//             const observer = new IntersectionObserver(
//                 ([entry]) => {
//                     if (entry.isIntersecting && !hasAnimated.current) {
//                         hasAnimated.current = true;

//                         const startTime = performance.now();

//                         const animate = (time) => {
//                             const progress = Math.min((time - startTime) / duration, 1);
//                             const eased = 1 - Math.pow(1 - progress, 3);
//                             const current = Math.floor(eased * end);

//                             setValue(current);

//                             if (progress < 1) {
//                                 requestAnimationFrame(animate);
//                             } else {
//                                 setValue(end);
//                             }
//                         };

//                         requestAnimationFrame(animate);
//                     }
//                 },
//                 { threshold: 0.4 }
//             );

//             observer.observe(element);
//             return () => observer.disconnect();
//         }, [end, duration]);

//         return (
//             <span ref={ref}>
//                 {value}
//                 {suffix}
//             </span>
//         );
//     };

//     const services = [
//         {
//             icon: Settings,
//             title: "Ad Infrastructure Setup",
//             description: "We configure enterprise-ready advertising systems that support scalability and long-term monetization. By implementing a reliable Ad Server such as Google Ad Manager, publishers gain structured control over inventory, demand sources, and delivery logic. We also support AdSense Services where required, ensuring smooth and compliant integration",
//             features: [
//                 "Structured ad inventory management",
//                 "Scalable system architecture",
//                 "Transparent delivery and reporting",
//                 "Compliance-driven setup"
//             ]
//         },
//         {
//             icon: TrendingUp,
//             title: "Monetization Optimization",
//             description: "Monetization Optimization To improve revenue performance, we deploy advanced Header Bidding frameworks across premium inventory. By working with selected SSP and DSP partners and connecting to a secure Ad Exchange, we help publishers achieve better demand competition and more consistent yield.",
//             features: [
//                 "Demand source diversification",
//                 "Improved pricing efficiency",
//                 "Optimized bidding strategies"
//             ]
//         },
//         {
//             icon: DollarSign,
//             title: "Revenue & Tracking Solutions",
//             description: "We implement reliable Ad Solutions with accurate Ad Tracking Implementation to provide clear visibility into revenue performance. These systems help publishers identify opportunities and strengthen Publishers through data-driven decisions.",
//             features: [
//                 "Granular revenue insights",
//                 "Performance-based optimization",
//                 "Clear reporting structure"
//             ]
//         },
//         {
//             icon: Smartphone,
//             title: "Multi-Platform Ad Delivery",
//             description: "We support both Mobile Ad and Web Ad Integration to ensure consistent ad delivery across devices. Using structured Advertising Automation, we reduce manual effort while maintaining stable performance across all platforms.", features: [
//                 "Cross-device consistency",
//                 "Automated ad workflows",
//                 "Reduced operational load"
//             ]
//         },
//         {
//             icon: Database,
//             title: "Advanced Technology Enablement",
//             description: "Our custom AdTech Solutions align with broader Marketing Technology ecosystems. with a Data Management Platform enables better audience control, secure data handling, and improved decision-making.",
//             features: [
//                 "Smarter audience segmentation",
//                 "Privacy-conscious data governance",
//                 "Scalable technology alignment"
//             ]
//         },
//         {
//             icon: Shield,
//             title: "Performance & Security",
//             description: "We enable Real-Time Bidding supported by First-Party Data Activation to improve efficiency and relevance. Engagement is enhanced through Dynamic Creative Optimization (DCO), while Ad Fraud Prevention and an Ad Verification Tool ensure brand safety and traffic quality",
//             features: [
//                 "Secure ad delivery",
//                 "Traffic quality control",
//                 "Performance optimization"
//             ]
//         }
//     ];

//     const whyChooseUs = [
//         {
//             icon: Layers,
//             title: "Advertising Ecosystem Expertise",
//             description: "We have a strong understanding of how today's advertising ecosystem functions, including the interaction between platforms, demand sources, and data layers. This allows us to design systems that are efficient, compliant, and adaptable to changing industry standards.",
//         },
//         {
//             icon: BarChart,
//             title: "Structured Inventory Management",
//             description: "Our team specializes in managing ad inventory through well-structured delivery frameworks. By organizing placements, demand priorities, and delivery logic, we help publishers maintain control while ensuring consistent performance across all inventory.",
//         },
//         {
//             icon: TrendingUp,
//             title: "Targeted Yield Optimization",
//             description: "We apply precision-focused strategies to audience targeting, ensuring ads reach the most relevant users. Combined with yield optimization techniques, this approach helps maximize revenue while maintaining a balanced user experience.",
//         },
//         {
//             icon: Database,
//             title: "Data-Driven Strategy",
//             description: "Our decisions are guided by data rather than assumptions. By analyzing performance metrics and behavioral insights, we help businesses refine strategies, identify growth opportunities, and improve advertising outcomes through data-driven advertising practices.",
//         },
//         {
//             icon: Monitor,
//             title: "Cross-Platform Experience",
//             description: "We have hands-on experience managing advertising across multiple platforms and devices. This enables us to ensure consistency, performance, and scalability in cross-platform advertising environments, regardless of traffic volume or audience behavior.",
//         }
//     ];

//     const caseStudies = [
//         {
//             title: "Digital Publisher — Advertising Infrastructure Stabilization",
//             type: "Digital Publisher",
//             idealCustomer: "A mid-sized digital publisher with growing traffic, multiple ad placements, and increasing operational complexity.",
//             challenge: "The publisher's advertising setup lacked structure. Inventory management was inconsistent, reporting was unclear, and daily ad operations required manual effort. As traffic increased, delivery stability became difficult to maintain.",
//             approach: "We implemented a reliable Ad Server and introduced structured ad inventory management. Placements, demand priorities, and delivery logic were aligned to create a controlled and scalable advertising environment.",
//             results: [
//                 { value: "33%", label: "Reporting accuracy improvement within 90 days" },
//                 { value: "100%", label: "Ad delivery stabilization across active inventory" },
//                 { value: "25%", label: "Reduced daily operations effort" }
//             ]
//         },
//         {
//             title: "Media Platform — Monetization Performance Optimization",
//             type: "Media Platform",
//             idealCustomer: "A media platform managing multiple demand sources and premium inventory with fluctuating yield.",
//             challenge: "Revenue performance was inconsistent due to fragmented demand access. Pricing varied significantly during traffic spikes, making monetization unpredictable.",
//             approach: "We deployed Header Bidding frameworks, connected selected SSP and DSP partners, and optimized bidding strategies through a secure Ad Exchange to improve demand competition.",
//             results: [
//                 { value: "26%", label: "Average yield increase over 60 days" },
//                 { value: "Stable", label: "Pricing efficiency across premium inventory" },
//                 { value: "Consistent", label: "Revenue during peak traffic" }
//             ]
//         },
//         {
//             title: "Media Operations Team — Scalable AdTech Integration",
//             type: "Operations Team",
//             idealCustomer: "A digital operations team preparing for traffic growth and long-term scalability.",
//             challenge: "The existing advertising setup was not designed to handle growth, increasing the risk of performance issues during high-traffic periods.",
//             approach: "We aligned AdTech Solutions with Marketing Technology ecosystems and enabled secure data handling through a Data Management Platform to support scalability.",
//             results: [
//                 { value: "2", label: "Traffic growth support", suffix: "×" },
//                 { value: "Reliable", label: "System performance during peak usage" },
//                 { value: "Flexible", label: "Long-term scalability" }
//             ]
//         }
//     ];

//     const testimonials = [
//         {
//             text: "The team helped us bring structure to our advertising setup. Everything is now easier to manage, and our reporting is much clearer than before.",
//             author: "Digital Publisher"
//         },
//         {
//             text: "What we appreciated most was their practical approach. They didn't push generic solutions and instead focused on what actually worked for our platform.",
//             author: "Media Platform Manager"
//         },
//         {
//             text: "After working with them, our ad delivery became more stable across devices. The improvements were noticeable without affecting user experience.",
//             author: "Content Website Owner"
//         },
//         {
//             text: "Their understanding of advertising systems and data made a real difference. We now make decisions based on insights rather than assumptions.",
//             author: "Operations Lead, News Website"
//         },
//         {
//             text: "Communication was clear throughout the process, and the implementation was handled carefully. The overall setup feels reliable and future-ready.",
//             author: "Digital Operations Head"
//         }
//     ];

//     const faqItems = [
//         {
//             question: "What does AdTech integration mean?",
//             answer: "AdTech integration involves connecting advertising platforms, tools, and data systems so they work together efficiently. This helps publishers manage ads, track performance, and improve revenue without relying on disconnected systems."
//         },
//         {
//             question: "Do you work with existing advertising setups?",
//             answer: "Yes. We analyze current setups and improve or restructure them without disrupting live traffic. This includes optimizing existing tools and aligning them for better performance."
//         },
//         {
//             question: "Can AdTech integration improve ad revenue?",
//             answer: "Yes. Proper integration improves demand access, tracking accuracy, and delivery efficiency, which often leads to better yield and more stable revenue over time."
//         },
//         {
//             question: "Do you support both web and mobile platforms?",
//             answer: "We support advertising setups for websites, mobile apps, and multi-device environments, ensuring consistent performance across all platforms."
//         },
//         {
//             question: "Is AdTech integration safe for user privacy?",
//             answer: "Yes. We follow privacy-first practices and ensure integrations align with data protection regulations while maintaining performance and transparency."
//         },
//         {
//             question: "Will integration affect website performance or loading speed?",
//             answer: "When done correctly, integration improves efficiency rather than slowing down a site. We focus on reducing latency and maintaining a smooth user experience."
//         },
//         {
//             question: "Do you provide ongoing support after integration?",
//             answer: "Yes. We offer ongoing monitoring, optimization, and technical support to ensure systems remain stable as traffic and requirements evolve."
//         },
//         {
//             question: "How do I know if my platform needs AdTech integration?",
//             answer: "If your advertising setup feels complex, reporting is unclear, or revenue performance is inconsistent, integration can help simplify operations and improve outcomes."
//         }
//     ];

//     return (
//         <div className="font-['SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif] bg-white text-[#1d1d1f] overflow-x-hidden antialiased">
//             <Seo
//                 title="AdTech Integration Agency in Kerala | Social Bureau"
//                 description="Optimize campaigns with SocialBureau’s AdTech integration.
// Connect platforms, track ads, and boost ROI with data-driven solutions"
//                 keywords="AdTech Integration Agency in Kerala,AdTech Integration agency kochi,AdTech Integration Services,Marketing Technology Integration,Adtech expert,ADTECH INTEGRATION, ADTECH INTEGRATION AGENCY,Ad Infrastructure Setup"
//                 canonicalUrl="https://www.socialbureau.in/adTech-marketing"
//             />

//             <style dangerouslySetInnerHTML={{
//                 __html: `
//                 @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                
//                 * {
//                     -webkit-font-smoothing: antialiased;
//                     -moz-osx-font-smoothing: grayscale;
//                 }
                
//                 .at-page img {
//                     max-width: 100%;
//                     height: auto;
//                 }
                
//                 @keyframes fadeUp {
//                     from {
//                         opacity: 0;
//                         transform: translateY(20px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateY(0);
//                     }
//                 }
                
//                 .animate-fadeUp {
//                     animation: fadeUp 0.8s ease-out forwards;
//                 }
                
//                 .apple-section {
//                     opacity: 0;
//                     animation: fadeUp 0.8s ease-out forwards;
//                 }
                
//                 .hover-scale {
//                     transition: transform 0.3s ease;
//                 }
                
//                 .hover-scale:hover {
//                     transform: scale(1.02);
//                 }
                
//                 .apple-grid {
//                     display: grid;
//                     grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//                     gap: 2rem;
//                 }
                
//                 @media (max-width: 640px) {
//                     .apple-grid {
//                         grid-template-columns: 1fr;
//                         gap: 1.5rem;
//                     }
//                 }
                
//                 .apple-card {
//                     background: #ffffff;
//                     border-radius: 24px;
//                     padding: 2rem;
//                     box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
//                     transition: all 0.3s ease;
//                     border: 1px solid #f5f5f7;
//                 }
                
//                 .apple-card:hover {
//                     box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
//                     border-color: #e5e5e7;
//                 }
                
//                 .apple-button-primary {
//                     background: #7E0A11;
//                     color: white;
//                     padding: 0.75rem 2rem;
//                     border-radius: 980px;
//                     font-size: 1rem;
//                     font-weight: 500;
//                     transition: all 0.3s ease;
//                     display: inline-flex;
//                     align-items: center;
//                     gap: 0.5rem;
//                 }
                
//                 .apple-button-primary:hover {
//                     background: #63080d;
//                     transform: scale(1.02);
//                 }
                
//                 .apple-button-secondary {
//                     background: transparent;
//                     color: #7E0A11;
//                     padding: 0.75rem 2rem;
//                     border-radius: 980px;
//                     font-size: 1rem;
//                     font-weight: 500;
//                     border: 1px solid #7E0A11;
//                     transition: all 0.3s ease;
//                     display: inline-flex;
//                     align-items: center;
//                     gap: 0.5rem;
//                 }
                
//                 .apple-button-secondary:hover {
//                     background: rgba(126, 10, 17, 0.05);
//                 }
                
//                 .apple-link {
//                     color: #7E0A11;
//                     font-weight: 500;
//                     transition: all 0.3s ease;
//                     display: inline-flex;
//                     align-items: center;
//                     gap: 0.25rem;
//                 }
                
//                 .apple-link:hover {
//                     gap: 0.5rem;
//                 }
                
//                 .apple-overline {
//                     font-size: 0.75rem;
//                     letter-spacing: 0.05em;
//                     text-transform: uppercase;
//                     color: #86868b;
//                     font-weight: 600;
//                 }
                
//                 .apple-heading {
//                     font-size: clamp(2.5rem, 5vw, 3.5rem);
//                     font-weight: 600;
//                     line-height: 1.1;
//                     letter-spacing: -0.015em;
//                 }
                
//                 .apple-subheading {
//                     font-size: clamp(1.25rem, 3vw, 1.5rem);
//                     font-weight: 500;
//                     line-height: 1.4;
//                     color: #1d1d1f;
//                 }
                
//                 .apple-body {
//                     font-size: 1.125rem;
//                     line-height: 1.6;
//                     color: #515154;
//                 }
                
//                 .apple-stat {
//                     font-size: 2.5rem;
//                     font-weight: 600;
//                     color: #7E0A11;
//                     line-height: 1;
//                 }
                
//                 .apple-stat-label {
//                     font-size: 0.875rem;
//                     color: #86868b;
//                     margin-top: 0.5rem;
//                 }
                
//                 .apple-faq-button {
//                     background: transparent;
//                     border: none;
//                     padding: 1.5rem;
//                     width: 100%;
//                     text-align: left;
//                     font-size: 1.125rem;
//                     font-weight: 500;
//                     color: #1d1d1f;
//                     display: flex;
//                     justify-content: space-between;
//                     align-items: center;
//                     transition: all 0.3s ease;
//                     border-bottom: 1px solid #f5f5f7;
//                 }
                
//                 .apple-faq-button:hover {
//                     color: #7E0A11;
//                 }
                
//                 .apple-faq-button.active {
//                     color: #7E0A11;
//                 }
                
//                 .apple-faq-answer {
//                     padding: 0 1.5rem 1.5rem 1.5rem;
//                     color: #515154;
//                     line-height: 1.6;
//                 }
                
//                 .scroll-progress {
//                     position: fixed;
//                     top: 0;
//                     left: 0;
//                     height: 3px;
//                     background: #7E0A11;
//                     z-index: 50;
//                     transition: width 0.1s ease;
//                 }
                
//                 .sticky-nav {
//                     transition: all 0.3s ease;
//                 }
                
//                 .sticky-nav.scrolled {
//                     background: rgba(255, 255, 255, 0.8);
//                     backdrop-filter: blur(20px);
//                     -webkit-backdrop-filter: blur(20px);
//                     border-bottom: 1px solid #f5f5f7;
//                 }
//             `}} />

//             {/* Scroll Progress Bar */}
//             <div className="scroll-progress" style={{ width: '0%' }}></div>

//             {/* Hero Section */}
//             <section className="min-h-screen flex items-center px-6 lg:px-8 relative overflow-hidden">
//                 <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//                     <div className="animate-fadeUp">
//                         <span className="apple-overline mb-4 block">AdTech Integration Agency</span>
//                         <h1 className="apple-heading mb-6">
//                             AdTech Integration Agency
//                             <span className="block text-[#7E0A11]">in Kerala</span>
//                         </h1>
//                         <p className="apple-body text-[#515154] mb-10 max-w-2xl">
//                             Transform your digital advertising revenue with India's leading advertising technology platform integration experts. Trusted by publishers, media houses, and app owners across India, our team delivers technology-focused solutions that balance monetization with user experience.
//                         </p>
//                         <div className="flex flex-col sm:flex-row gap-4">
//                             <a
//                                 href="https://api.whatsapp.com/send/?phone=918714952665&text=Hello%2C+I+would+like+to+learn+more+about+AdTech+Integration."
//                                 className="apple-button-primary"
//                             >
//                                 Book a Strategy Call
//                                 <ChevronRight className="w-4 h-4" />
//                             </a>
//                             <a
//                                 href="#services"
//                                 className="apple-button-secondary"
//                             >
//                                 Explore Services
//                             </a>
//                         </div>
//                     </div>
//                     <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
//                         <video
//                             src="https://res.cloudinary.com/dtwcgfmar/video/upload/v1771998115/freepik_create-a-video_kling_1080p_1-1_24fps_94469_1_twifv9.webm"
//                             autoPlay
//                             muted
//                             loop
//                             title="SocialBureau AdTech integration background animation"
//                             className="w-full h-full object-cover"
//                             loading="lazy"
//                         />
//                     </div>
//                 </div>
//             </section>

//             {/* About Section */}
//             {/* <section id="about" className="py-24 px-6 lg:px-8 max-w-7xl mx-auto bg-[#7E0A11]">
//                 <div className="text-center mb-16">
//                     <span className="apple-overline mb-4 block">About AdTech Integration</span>
//                     <h2 className="apple-heading text-4xl lg:text-5xl mb-6">Marketing Technology Integration</h2>
//                 </div>
//                 <div className="grid lg:grid-cols-2 gap-16 items-center">
//                     <div>
//                         <h3 className="apple-subheading mb-6">Structured Alignment of Digital Advertising</h3>
//                         <p className="apple-body text-[#515154] mb-6">
//                             AdTech integration refers to the structured alignment of tools, platforms, and workflows used to manage and optimize ads across digital channels. In today's competitive landscape, Digital Advertising success depends on how well systems communicate with each other.
//                         </p>
//                         <p className="apple-body text-[#515154]">
//                             At SocialBureau, we focus on practical Marketing Technology Integration that supports publishers, media companies, and content platforms.
//                         </p>
//                     </div>
//                     <div className="h-96 rounded-2xl overflow-hidden shadow-xl">
//                         <img
//                             src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1771579759/young-people-discussing-marketing-in-meeting-2026-01-08-07-22-10-utc_1_jawkhd.webp"
//                             alt="Marketing Technology"
//                             className="w-full h-full object-cover"
//                             loading="lazy"
//                         />
//                     </div>
//                 </div>
//             </section> */}
//             <section
//                 id="about"
//                 className="min-h-screen w-full bg-black text-white flex items-center"
//             >
//                 <div className="w-full px-6 lg:px-8 max-w-7xl mx-auto">
//                     <div className="text-center mb-16">
//                         <span className="apple-overline mb-4 block text-gray-400 mt-4">
//                             About AdTech Integration
//                         </span>
//                         <h2 className="apple-heading text-4xl lg:text-5xl mb-6">
//                             Marketing Technology Integration
//                         </h2>
//                     </div>

//                     <div className="grid lg:grid-cols-2 gap-16 items-center">
//                         <div>
//                             <h3 className="text-2xl mb-6 text-white/80">
//                                 Structured Alignment of Digital Advertising
//                             </h3>

//                             <p className="text-white/80 mb-6">
//                                 AdTech integration refers to the structured alignment of tools, platforms,
//                                 and workflows used to manage and optimize ads across digital channels. In
//                                 today's competitive landscape, Digital Advertising success depends on how
//                                 well systems communicate with each other.
//                             </p>

//                             <p className="text-white/80">
//                                 At <a href='https://socialbureau.in' className='text-white/80' title="Visit SocialBureau Official Website">SocialBureau</a>, we focus on practical Marketing Technology Integration that supports publishers, media companies, and content platforms. By implementing secure API Integration, we enable seamless data flow between platforms, ensuring accuracy, speed, and long-term flexibility.
//                             </p>
//                         </div>

//                         <div className="h-96 lg:h-[28rem] rounded-2xl overflow-hidden shadow-2xl">
//                             <img
//                                 src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1772003206/Untitled-design-42.png_h65wfd.webp"
//                                 alt="Marketing Technology"
//                                 className="w-full h-full object-cover"
//                                 loading="lazy"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </section>
// {/* service */}
//             <section id="services" className="py-24 px-6 lg:px-8 bg-[#7E0A11]">
//                 <div className="max-w-7xl mx-auto">

//                     <div className="text-center mb-16">
//                         <span className="apple-overline mb-4 block text-white/70">
//                             Our Services
//                         </span>
//                         <h2 className="apple-heading text-4xl lg:text-5xl mb-6 text-white">
//                             AdTech Integration Services in Kochi
//                         </h2>
//                         <p className="text-white max-w-3xl mx-auto">
//                             We design and implement customized solutions based on real operational
//                             needs. Each service is delivered with precision, documentation, and
//                             performance validation.
//                         </p>
//                     </div>

//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {services.map((service, index) => {
//                             const Icon = service.icon;
//                             return (
//                                 <div
//                                     key={index}
//                                     className="rounded-3xl p-8 bg-[#6B080E] border border-white/10 text-white"
//                                 >
//                                     <div className="w-12 h-12 bg-[#7E0A11] rounded-xl flex items-center justify-center mb-6 transition-transform hover:scale-110">
//                                         <Icon className="w-6 h-6 text-white" />
//                                     </div>

//                                     <h3 className="text-xl font-semibold mb-4 text-white">
//                                         {service.title}
//                                     </h3>

//                                     <p className="mb-6 text-sm text-white/80 leading-relaxed">
//                                         {service.description}
//                                     </p>

//                                     <ul className="space-y-2">
//                                         {service.features.map((feature, idx) => (
//                                             <li
//                                                 key={idx}
//                                                 className="text-sm text-white/80 flex items-start"
//                                             >
//                                                 <CheckCircle className="w-4 h-4 text-white mr-2 mt-0.5" />
//                                                 <span>{feature}</span>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             );
//                         })}
//                     </div>

//                 </div>
//             </section>

//             {/* why choose us */}
// <section
//     id="why-choose"
//     className="py-24 px-6 lg:px-8 bg-[#7E0A11]"
// >
//     <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="text-center mb-20">
//             <span className="apple-overline mb-4 block text-white/70">
//                 Why Choose Us
//             </span>
//             <h2 className="apple-heading text-4xl lg:text-5xl text-white">
//                 Advertising Ecosystem Expertise
//             </h2>
//         </div>

//         {/* Main Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

//             {/* LEFT SIDE (2-column cards) */}
//             <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">

//                 {/* Card 1 */}
//                 <div className="rounded-3xl p-8 bg-[#6B080E] border border-white/10 text-center">
//                     <div className="w-14 h-14 bg-[#7E0A11] rounded-full flex items-center justify-center mx-auto mb-6">
//                         {React.createElement(whyChooseUs[0].icon, { className: "w-7 h-7 text-white" })}
//                     </div>
//                     <h3 className="text-lg font-semibold mb-3 text-white">
//                         {whyChooseUs[0].title}
//                     </h3>
//                     <p className="text-sm text-white/80 leading-relaxed">
//                         {whyChooseUs[0].description}
//                     </p>
//                 </div>

//                 {/* Card 2 */}
//                 <div className="rounded-3xl p-8 bg-[#6B080E] border border-white/10 text-center">
//                     <div className="w-14 h-14 bg-[#7E0A11] rounded-full flex items-center justify-center mx-auto mb-6">
//                         {React.createElement(whyChooseUs[1].icon, { className: "w-7 h-7 text-white" })}
//                     </div>
//                     <h3 className="text-lg font-semibold mb-3 text-white">
//                         {whyChooseUs[1].title}
//                     </h3>
//                     <p className="text-sm text-white/80 leading-relaxed">
//                         {whyChooseUs[1].description}
//                     </p>
//                 </div>

//                 {/* Card 3 */}
//                 <div className="rounded-3xl p-8 bg-[#6B080E] border border-white/10 text-center">
//                     <div className="w-14 h-14 bg-[#7E0A11] rounded-full flex items-center justify-center mx-auto mb-6">
//                         {React.createElement(whyChooseUs[2].icon, { className: "w-7 h-7 text-white" })}
//                     </div>
//                     <h3 className="text-lg font-semibold mb-3 text-white">
//                         {whyChooseUs[2].title}
//                     </h3>
//                     <p className="text-sm text-white/80 leading-relaxed">
//                         {whyChooseUs[2].description}
//                     </p>
//                 </div>

//                 {/* Card 4 */}
//                 <div className="rounded-3xl p-8 bg-[#6B080E] border border-white/10 text-center">
//                     <div className="w-14 h-14 bg-[#7E0A11] rounded-full flex items-center justify-center mx-auto mb-6">
//                         {React.createElement(whyChooseUs[3].icon, { className: "w-7 h-7 text-white" })}
//                     </div>
//                     <h3 className="text-lg font-semibold mb-3 text-white">
//                         {whyChooseUs[3].title}
//                     </h3>
//                     <p className="text-sm text-white/80 leading-relaxed">
//                         {whyChooseUs[3].description}
//                     </p>
//                 </div>

//                 {/* Card 5 – FULL WIDTH */}
//                 <div className="rounded-3xl p-8 bg-[#6B080E] border border-white/10 text-center md:col-span-2">
//                     <div className="w-14 h-14 bg-[#7E0A11] rounded-full flex items-center justify-center mx-auto mb-6">
//                         {React.createElement(whyChooseUs[4].icon, { className: "w-7 h-7 text-white" })}
//                     </div>
//                     <h3 className="text-lg font-semibold mb-3 text-white">
//                         {whyChooseUs[4].title}
//                     </h3>
//                     <p className="text-sm text-white/80 leading-relaxed max-w-2xl mx-auto">
//                         {whyChooseUs[4].description}
//                     </p>
//                 </div>

//             </div>

//             {/* RIGHT SIDE IMAGE */}
//             <div className="hidden lg:flex justify-center items-center">
//                 <img
//                     src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1772107932/DSC04832_2_1_xxdy8j.webp"
//                     alt="Adtech Integration expert"
//                     className="w-full max-w-md rounded-3xl shadow-2xl"
//                     loading="lazy"
//                 />
//             </div>

//         </div>
//     </div>
// </section>

//             {/* Case Studies */}
//             <section id="case-studies" className="py-20 bg-[#fbfbfd]">
//                 <div className="max-w-7xl mx-auto px-6 lg:px-8">

//                     <div className="text-center mb-14">
//                         <span className="apple-overline block mb-3">Case Studies</span>
//                         <h2 className="apple-heading text-4xl lg:text-5xl">
//                             Proven Results with AdTech Integration
//                         </h2>
//                     </div>

//                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

//                         {/* LEFT */}
//                         <div className="lg:col-span-5 space-y-6">
//                             {caseStudies.map((study, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => setActiveCaseStudy(index)}
//                                     className={`apple-card text-left w-full transition-all duration-300
//                         ${activeCaseStudy === index
//                                             ? 'ring-2 ring-[#7E0A11] bg-white'
//                                             : 'hover:bg-[#f5f5f7]'}
//                         `}
//                                 >
//                                     <span className="text-xs font-semibold text-[#7E0A11] bg-[#7E0A11]/5 px-3 py-1.5 rounded-full">
//                                         {study.type}
//                                     </span>

//                                     <h3 className="text-lg font-semibold mt-3">
//                                         {study.title}
//                                     </h3>

//                                     <div className="apple-link text-sm mt-3">
//                                         View details
//                                     </div>
//                                 </button>
//                             ))}
//                         </div>

//                         {/* RIGHT */}
//                         <div className="lg:col-span-7">
//                             <div className="apple-card sticky top-28 animate-fade-in">

//                                 <h3 className="text-2xl font-semibold mb-6">
//                                     {caseStudies[activeCaseStudy].title}
//                                 </h3>

//                                 <div className="space-y-5 text-sm">
//                                     <div>
//                                         <h4 className="font-semibold text-[#7E0A11] mb-1">
//                                             Ideal Customer
//                                         </h4>
//                                         <p className="text-[#515154]">
//                                             {caseStudies[activeCaseStudy].idealCustomer}
//                                         </p>
//                                     </div>

//                                     <div>
//                                         <h4 className="font-semibold text-[#7E0A11] mb-1">
//                                             The Challenge
//                                         </h4>
//                                         <p className="text-[#515154]">
//                                             {caseStudies[activeCaseStudy].challenge}
//                                         </p>
//                                     </div>

//                                     <div>
//                                         <h4 className="font-semibold text-[#7E0A11] mb-1">
//                                             The Approach
//                                         </h4>
//                                         <p className="text-[#515154]">
//                                             {caseStudies[activeCaseStudy].approach}
//                                         </p>
//                                     </div>

//                                     <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#f5f5f7]">
//                                         {caseStudies[activeCaseStudy].results.map((result, idx) => (
//                                             <div key={idx} className="text-center">
//                                                 <div className="apple-stat">{result.value}</div>
//                                                 <div className="apple-stat-label">{result.label}</div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>

//                     </div>
//                 </div>

//                 <style jsx>{`
//                 @keyframes fade-in {
//                 from {
//                     opacity: 0;
//                     transform: translateY(8px);
//                 }
//                 to {
//                     opacity: 1;
//                     transform: translateY(0);
//                 }
//                 }
//                 .animate-fade-in {
//                 animation: fade-in 0.4s ease-out;
//                 }
//             `}</style>
//             </section>

//             {/* Testimonials */}
//             <section
//                 id="testimonials"
//                 className="py-24 px-6 lg:px-8 bg-[#7E0A11]"
//             >
//                 <div className="max-w-7xl mx-auto">

//                     <div className="text-center mb-16">
//                         <span className="apple-overline mb-4 block text-white">
//                             Testimonials
//                         </span>
//                         <h2 className="apple-heading text-4xl lg:text-5xl text-white">
//                             Trusted by Publishers Across India
//                         </h2>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {testimonials.map((testimonial, index) => (
//                             <div
//                                 key={index}
//                                 className="rounded-3xl p-8 bg-[#6B080E]"
//                             >
//                                 <div className="text-6xl text-white mb-4 leading-none">
//                                     “
//                                 </div>

//                                 <p className="text-white/80 italic mb-6 leading-relaxed">
//                                     {testimonial.text}
//                                 </p>

//                                 <div className="font-semibold text-white">
//                                     — {testimonial.author}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                 </div>
//             </section>

//             {/* FAQ Section */}
//             <section id="faq" className="w-full max-w-3xl mx-auto px-4 lg:px-6 py-10">

//                 <div className="text-center mb-8">
//                     <span className="apple-overline block mb-2">FAQ</span>
//                     <h2 className="apple-heading text-3xl lg:text-4xl">
//                         Frequently Asked Questions
//                     </h2>
//                 </div>

//                 <div className="divide-y divide-[#2d2d2f]">
//                     {faqItems.map((item, index) => (
//                         <div key={index} className="py-4">
//                             <button
//                                 onClick={() => toggleFaq(index)}
//                                 className="w-full flex justify-between items-center text-left text-lg font-medium text-black"
//                             >
//                                 <span>{item.question}</span>
//                                 {activeFaq === index ? (
//                                     <X className="w-4 h-4 text-[#7E0A11]" />
//                                 ) : (
//                                     <Plus className="w-4 h-4 text-[#141416]" />
//                                 )}
//                             </button>

//                             {activeFaq === index && (
//                                 <p className="mt-2 text-[#86868b] text-base">
//                                     {item.answer}
//                                 </p>
//                             )}
//                         </div>
//                     ))}
//                 </div>

//             </section>

//             {/* CTA Section */}
//             <section id="contact" className="w-full px-4 lg:px-6">
//                 <div className="bg-[#1d1d1f] text-white rounded-2xl py-10 px-6 lg:py-14 lg:px-16 text-center relative overflow-hidden w-full">

//                     {/* Background glow */}
//                     <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#7E0A11] opacity-10 rounded-full blur-3xl"></div>

//                     <h2 className="apple-heading text-white mb-4">
//                         Ready to Transform Your Digital Advertising?
//                     </h2>

//                     <p className="text-lg text-[#86868b] mb-6 max-w-3xl mx-auto">
//                         Let’s discuss how AdTech integration can optimize your revenue and streamline your advertising operations.
//                     </p>

//                     <a
//                         href="/contact"
//                         className="apple-button-primary bg-white text-[#1d1d1f] hover:bg-[#f5f5f7] inline-flex items-center gap-1"
//                     >
//                         Book a Strategy Call
//                         <ChevronRight className="w-4 h-4" />
//                     </a>

//                 </div>
//             </section>

//             {/* Scroll to Top Button */}
//             <button
//                 className={`fixed bottom-8 right-8 w-12 h-12 bg-[#7E0A11] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#63080d] transition-all ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
//                 onClick={scrollToTop}
//             >
//                 <ArrowUp className="w-5 h-5" />
//             </button>
//         </div>
//     );
// };

// export default AdTechIntegration;


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
            description: "Our custom AdTech Solutions align with broader Marketing Technology ecosystems. with a Data Management Platform enables better audience control, secure data handling, and improved decision-making.",
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
            description: "We have hands-on experience managing advertising across multiple platforms and devices. This enables us to ensure consistency, performance, and scalability in cross-platform advertising environments, regardless of traffic volume or audience behavior.",
        }
    ];

    const caseStudies = [
        {
            title: "Digital Publisher — Advertising Infrastructure Stabilization",
            type: "Digital Publisher",
            idealCustomer: "A mid-sized digital publisher with growing traffic, multiple ad placements, and increasing operational complexity.",
            challenge: "The publisher's advertising setup lacked structure. Inventory management was inconsistent, reporting was unclear, and daily ad operations required manual effort. As traffic increased, delivery stability became difficult to maintain.",
            approach: "We implemented a reliable Ad Server and introduced structured ad inventory management. Placements, demand priorities, and delivery logic were aligned to create a controlled and scalable advertising environment.",
            results: [
                { value: "33%", label: "Reporting accuracy improvement within 90 days" },
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
                { value: "Consistent", label: "Revenue during peak traffic" }
            ]
        },
        {
            title: "Media Operations Team — Scalable AdTech Integration",
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
            answer: "We support advertising setups for websites, mobile apps, and multi-device environments, ensuring consistent performance across all platforms."
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
        <div className="font-['SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif] bg-white text-[#1d1d1f] overflow-x-hidden antialiased">
            <Seo
                title="AdTech Integration Agency in Kerala | Social Bureau"
                description="Optimize campaigns with SocialBureau's AdTech integration.
Connect platforms, track ads, and boost ROI with data-driven solutions"
                keywords="AdTech Integration Agency in Kerala,AdTech Integration agency kochi,AdTech Integration Services,Marketing Technology Integration,Adtech expert,ADTECH INTEGRATION, ADTECH INTEGRATION AGENCY,Ad Infrastructure Setup"
                canonicalUrl="https://www.socialbureau.in/adTech-marketing"
            />

            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                
                * {
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
                
                .at-page img {
                    max-width: 100%;
                    height: auto;
                }
                
                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fadeUp {
                    animation: fadeUp 0.8s ease-out forwards;
                }
                
                .apple-section {
                    opacity: 0;
                    animation: fadeUp 0.8s ease-out forwards;
                }
                
                .hover-scale {
                    transition: transform 0.3s ease;
                }
                
                .hover-scale:hover {
                    transform: scale(1.02);
                }
                
                .apple-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }
                
                @media (max-width: 640px) {
                    .apple-grid {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }
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
                    background: #7E0A11;
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
                    white-space: nowrap;
                }
                
                .apple-button-primary:hover {
                    background: #63080d;
                    transform: scale(1.02);
                }
                
                .apple-button-secondary {
                    background: transparent;
                    color: #7E0A11;
                    padding: 0.75rem 1.5rem;
                    border-radius: 980px;
                    font-size: 0.95rem;
                    font-weight: 500;
                    border: 1px solid #7E0A11;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    white-space: nowrap;
                }
                
                .apple-button-secondary:hover {
                    background: rgba(126, 10, 17, 0.05);
                }
                
                .apple-link {
                    color: #7E0A11;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.25rem;
                }
                
                .apple-link:hover {
                    gap: 0.5rem;
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
                
                .apple-subheading {
                    font-size: clamp(1.1rem, 3vw, 1.5rem);
                    font-weight: 500;
                    line-height: 1.4;
                    color: #1d1d1f;
                }
                
                .apple-body {
                    font-size: clamp(0.9rem, 2vw, 1.125rem);
                    line-height: 1.6;
                    color: #515154;
                }
                
                .apple-stat {
                    font-size: clamp(1.75rem, 5vw, 2.5rem);
                    font-weight: 600;
                    color: #7E0A11;
                    line-height: 1;
                }
                
                .apple-stat-label {
                    font-size: 0.75rem;
                    color: #86868b;
                    margin-top: 0.5rem;
                    line-height: 1.3;
                }
                
                .apple-faq-button {
                    background: transparent;
                    border: none;
                    padding: 1rem 0;
                    width: 100%;
                    text-align: left;
                    font-size: clamp(0.9rem, 2vw, 1.125rem);
                    font-weight: 500;
                    color: #1d1d1f;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transition: all 0.3s ease;
                    border-bottom: 1px solid #f5f5f7;
                }
                
                .apple-faq-button:hover {
                    color: #7E0A11;
                }
                
                .apple-faq-button.active {
                    color: #7E0A11;
                }
                
                .apple-faq-answer {
                    padding: 0.75rem 0 1rem 0;
                    color: #515154;
                    line-height: 1.6;
                    font-size: 0.9rem;
                }
                
                .scroll-progress {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 3px;
                    background: #7E0A11;
                    z-index: 50;
                    transition: width 0.1s ease;
                }
                
                .sticky-nav {
                    transition: all 0.3s ease;
                }
                
                .sticky-nav.scrolled {
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-bottom: 1px solid #f5f5f7;
                }

                /* MOBILE FIRST HERO SECTION */
                @media (max-width: 1024px) {
                    .hero-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                    }
                }

                @media (max-width: 768px) {
                    .hero-video {
                        height: 280px !important;
                        border-radius: 16px;
                        margin-bottom: 1rem !important;
                    }
                }

                @media (max-width: 640px) {
                    .hero-video {
                        height: 220px !important;
                        border-radius: 12px;
                        margin-bottom: 0.5rem !important;
                    }
                }

                /* SERVICE CARDS MOBILE */
                @media (max-width: 1024px) {
                    .service-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1.25rem !important;
                    }
                }

                @media (max-width: 768px) {
                    .service-card {
                        padding: 1.25rem !important;
                        border-radius: 16px !important;
                        border: 1px solid rgba(255, 255, 255, 0.08) !important;
                    }

                    .service-card h3 {
                        font-size: 1rem !important;
                        margin-bottom: 0.75rem !important;
                    }

                    .service-card p {
                        font-size: 0.85rem !important;
                        line-height: 1.5;
                        margin-bottom: 0.75rem !important;
                    }

                    .service-card ul {
                        gap: 0.5rem !important;
                    }

                    .service-card li {
                        font-size: 0.8rem !important;
                    }
                }

                @media (max-width: 640px) {
                    .service-card {
                        padding: 1rem !important;
                    }

                    .service-card h3 {
                        font-size: 0.95rem !important;
                    }

                    .service-card p {
                        font-size: 0.8rem !important;
                    }
                }

                /* WHY CHOOSE US MOBILE */
                @media (max-width: 1024px) {
                    .why-choose-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1.25rem !important;
                    }

                    .why-choose-image {
                        display: flex !important;
                        justify-content: center;
                        align-items: center;
                        margin-top: 1.5rem;
                        padding: 0 1rem;
                    }

                    .why-choose-image img {
                        max-width: 100%;
                        height: auto;
                        max-width: 400px;
                    }
                }

                @media (max-width: 768px) {
                    .why-choose-image {
                        margin-top: 1.25rem;
                        margin-bottom: 0.5rem;
                    }

                    .why-choose-image img {
                        max-width: 300px;
                        border-radius: 12px;
                    }
                }

                @media (max-width: 640px) {
                    .why-choose-image {
                        margin-top: 1rem;
                        padding: 0 0.75rem;
                    }

                    .why-choose-image img {
                        max-width: 280px;
                    }
                }

                @media (max-width: 768px) {
                    .why-card {
                        padding: 1.25rem !important;
                        border-radius: 16px !important;
                        border: 1px solid rgba(255, 255, 255, 0.08) !important;
                    }

                    .why-card h3 {
                        font-size: 0.95rem !important;
                        margin-bottom: 0.75rem !important;
                    }

                    .why-card p {
                        font-size: 0.8rem !important;
                        line-height: 1.5;
                    }

                    .why-card-icon {
                        width: 48px !important;
                        height: 48px !important;
                    }

                    .why-card-icon svg {
                        width: 24px !important;
                        height: 24px !important;
                    }
                }

                @media (max-width: 640px) {
                    .why-card {
                        padding: 1rem !important;
                    }

                    .why-card h3 {
                        font-size: 0.9rem !important;
                    }

                    .why-card p {
                        font-size: 0.75rem !important;
                    }
                }

                /* CASE STUDIES MOBILE */
                @media (max-width: 1024px) {
                    .case-study-container {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                    }

                    .case-study-list {
                        grid-column: auto !important;
                    }

                    .case-study-detail {
                        grid-column: auto !important;
                        position: static !important;
                        top: auto !important;
                    }
                }

                @media (max-width: 768px) {
                    .case-study-button {
                        padding: 1rem !important;
                        border-radius: 16px !important;
                    }

                    .case-study-button h3 {
                        font-size: 0.95rem !important;
                    }

                    .case-study-detail {
                        padding: 1.25rem !important;
                        border-radius: 16px !important;
                    }

                    .case-study-detail h3 {
                        font-size: 1.1rem !important;
                    }

                    .case-study-detail h4 {
                        font-size: 0.85rem !important;
                    }

                    .case-study-detail p {
                        font-size: 0.8rem !important;
                    }

                    .case-results-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }
                }

                @media (max-width: 640px) {
                    .case-study-button {
                        padding: 0.75rem !important;
                    }

                    .case-study-detail {
                        padding: 1rem !important;
                    }

                    .case-study-detail h3 {
                        font-size: 1rem !important;
                    }
                }

                /* TESTIMONIALS MOBILE */
                @media (max-width: 1024px) {
                    .testimonials-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1.25rem !important;
                    }
                }

                @media (max-width: 768px) {
                    .testimonial-card {
                        padding: 1.25rem !important;
                        border-radius: 16px !important;
                    }

                    .testimonial-card p {
                        font-size: 0.85rem !important;
                    }

                    .testimonial-author {
                        font-size: 0.8rem !important;
                    }
                }

                @media (max-width: 640px) {
                    .testimonial-card {
                        padding: 1rem !important;
                    }

                    .testimonial-card p {
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

                /* CTA SECTION MOBILE */
                @media (max-width: 768px) {
                    .cta-section {
                        padding: 2rem 1.25rem !important;
                        border-radius: 16px !important;
                        margin: 0 1rem !important;
                    }

                    .cta-section h2 {
                        font-size: 1.5rem !important;
                        margin-bottom: 0.75rem !important;
                    }

                    .cta-section p {
                        font-size: 0.9rem !important;
                        margin-bottom: 1rem !important;
                    }
                }

                @media (max-width: 640px) {
                    .cta-section {
                        padding: 1.5rem 1rem !important;
                        margin: 0 0.5rem !important;
                    }

                    .cta-section h2 {
                        font-size: 1.25rem !important;
                    }

                    .cta-section p {
                        font-size: 0.8rem !important;
                    }

                    .cta-button {
                        width: 100% !important;
                        padding: 0.65rem 1rem !important;
                        font-size: 0.85rem !important;
                    }
                }

                /* FAQ MOBILE */
                @media (max-width: 768px) {
                    .faq-container {
                        padding: 1.5rem !important;
                    }

                    .faq-title {
                        font-size: 1.5rem !important;
                    }

                    .faq-item {
                        padding: 0.75rem 0 !important;
                    }

                    .faq-question {
                        font-size: 0.9rem !important;
                        padding: 0.75rem 0 !important;
                    }

                    .faq-answer {
                        font-size: 0.8rem !important;
                        padding: 0.5rem 0 0.75rem 0 !important;
                    }
                }

                @media (max-width: 640px) {
                    .faq-container {
                        padding: 1rem !important;
                    }

                    .faq-question {
                        font-size: 0.85rem !important;
                    }

                    .faq-answer {
                        font-size: 0.75rem !important;
                    }
                }

                /* SCROLL TO TOP BUTTON MOBILE */
                @media (max-width: 640px) {
                    .scroll-to-top {
                        width: 44px !important;
                        height: 44px !important;
                        bottom: 1rem !important;
                        right: 1rem !important;
                    }
                }

                /* UTILITY RESPONSIVE */
                @media (max-width: 768px) {
                    .px-6 {
                        padding-left: 1rem !important;
                        padding-right: 1rem !important;
                    }

                    .gap-12,
                    .gap-16,
                    .gap-20 {
                        gap: 1.25rem !important;
                    }

                    .mb-16 {
                        margin-bottom: 1.25rem !important;
                    }

                    .mt-3 {
                        margin-top: 0.5rem !important;
                    }
                }

                @media (max-width: 640px) {
                    .px-6 {
                        padding-left: 0.75rem !important;
                        padding-right: 0.75rem !important;
                    }

                    .gap-8 {
                        gap: 0.75rem !important;
                    }
                }

                /* IMAGE RESPONSIVE */
                img {
                    max-width: 100% !important;
                    height: auto !important;
                    display: block !important;
                }

                @media (max-width: 768px) {
                    img {
                        border-radius: 12px !important;
                    }
                }

                /* FLEX RESPONSIVE */
                @media (max-width: 768px) {
                    .flex-col-reverse {
                        flex-direction: column-reverse !important;
                    }

                    .sm\\:flex-row {
                        flex-direction: column !important;
                    }
                }
            `}} />

            {/* Scroll Progress Bar */}
            <div className="scroll-progress" style={{ width: '0%' }}></div>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto w-full hero-grid grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="animate-fadeUp">
                        <span className="apple-overline mb-3 sm:mb-4 block">AdTech Integration Agency</span>
                        <h1 className="apple-heading mb-4 sm:mb-6">
                            AdTech Integration Agency
                            <span className="block text-[#7E0A11]">in Kerala</span>
                        </h1>
                        <p className="apple-body text-[#515154] mb-6 sm:mb-8 max-w-2xl">
                            Transform your digital advertising revenue with India's leading advertising technology platform integration experts. Trusted by publishers, media houses, and app owners across India, our team delivers technology-focused solutions that balance monetization with user experience.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                            <a
                                href="https://api.whatsapp.com/send/?phone=918714952665&text=Hello%2C+I+would+like+to+learn+more+about+AdTech+Integration."
                                className="apple-button-primary"
                            >
                                Book a Strategy Call
                                <ChevronRight className="w-4 h-4" />
                            </a>
                            <a
                                href="#services"
                                className="apple-button-secondary"
                            >
                                Explore Services
                            </a>
                        </div>
                    </div>
                    <div className="relative w-full hero-video rounded-2xl overflow-hidden shadow-lg">
                        <video
                            src="https://res.cloudinary.com/dtwcgfmar/video/upload/v1771998115/freepik_create-a-video_kling_1080p_1-1_24fps_94469_1_twifv9.webm"
                            autoPlay
                            muted
                            loop
                            title="SocialBureau AdTech integration background animation"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section
                id="about"
                className="min-h-auto w-full bg-black text-white flex items-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
            >
                <div className="w-full max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-14 lg:mb-16">
                        <span className="apple-overline mb-2 sm:mb-3 block text-gray-400 mt-2 sm:mt-3">
                            About AdTech Integration
                        </span>
                        <h2 className="apple-heading text-2xl sm:text-3xl lg:text-5xl mb-4 sm:mb-6">
                            Marketing Technology Integration
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div>
                            <h3 className="text-xl sm:text-2xl mb-4 sm:mb-6 text-white/80">
                                Structured Alignment of Digital Advertising
                            </h3>

                            <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6 leading-relaxed">
                                AdTech integration refers to the structured alignment of tools, platforms,
                                and workflows used to manage and optimize ads across digital channels. In
                                today's competitive landscape, Digital Advertising success depends on how
                                well systems communicate with each other.
                            </p>

                            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                                At <a href='https://socialbureau.in' className='text-white/80 hover:text-white transition' title="Visit SocialBureau Official Website">SocialBureau</a>, we focus on practical Marketing Technology Integration that supports publishers, media companies, and content platforms. By implementing secure <a href='https://en.wikipedia.org/wiki/API'>API Integration</a>, we enable seamless data flow between platforms, ensuring accuracy, speed, and long-term flexibility.
                            </p>
                        </div>

                        <div className="h-64 sm:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl">
                            <img
                                src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1772003206/Untitled-design-42.png_h65wfd.webp"
                                alt="Marketing Technology"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#7E0A11]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-14 lg:mb-16">
                        <span className="apple-overline mb-2 sm:mb-3 block text-white/70">
                            Our Services
                        </span>
                        <h2 className="apple-heading text-2xl sm:text-3xl lg:text-5xl mb-4 sm:mb-6 text-white">
                            AdTech Integration Services in Kochi
                        </h2>
                        <p className="apple-body text-white/80 max-w-3xl mx-auto px-2">
                            We design and implement customized solutions based on real operational
                            needs. Each service is delivered with precision, documentation, and
                            performance validation.
                        </p>
                    </div>

                    <div className="service-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <div
                                    key={index}
                                    className="service-card rounded-2xl lg:rounded-3xl p-6 sm:p-7 lg:p-8 bg-[#6B080E] border border-white/10 text-white transition-all hover:border-white/20"
                                >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#7E0A11] rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform hover:scale-110">
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
                                                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white flex-shrink-0 mt-0.5" />
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

            {/* Why Choose Us Section */}
            <section
                id="why-choose"
                className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#7E0A11]"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-14 lg:mb-20">
                        <span className="apple-overline mb-2 sm:mb-3 block text-white/70">
                            Why Choose Us
                        </span>
                        <h2 className="apple-heading text-2xl sm:text-3xl lg:text-5xl text-white">
                            Advertising Ecosystem Expertise
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            {whyChooseUs.map((item, index) => (
                                <div
                                    key={index}
                                    className={`why-card rounded-2xl lg:rounded-3xl p-6 sm:p-7 lg:p-8 bg-[#6B080E] border border-white/10 text-center transition-all hover:border-white/20 ${index === 4 ? 'md:col-span-2' : ''}`}
                                >
                                    <div className="why-card-icon w-12 h-12 sm:w-14 sm:h-14 bg-[#7E0A11] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                        {React.createElement(item.icon, { className: "w-6 h-6 sm:w-7 sm:h-7 text-white" })}
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="hidden lg:flex justify-center items-center why-choose-image">
                            <img
                                src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1772107932/DSC04832_2_1_xxdy8j.webp"
                                alt="Adtech Integration expert"
                                className="w-full max-w-sm rounded-2xl lg:rounded-3xl shadow-lg lg:shadow-2xl"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Studies Section */}
            <section id="case-studies" className="py-12 sm:py-16 lg:py-20 bg-[#fbfbfd] px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-12 lg:mb-14">
                        <span className="apple-overline block mb-2 sm:mb-3">Case Studies</span>
                        <h2 className="apple-heading text-2xl sm:text-3xl lg:text-5xl">
                            Proven Results with AdTech Integration
                        </h2>
                    </div>

                    <div className="case-study-container grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                        {/* Case Studies List */}
                        <div className="case-study-list lg:col-span-5 space-y-4 sm:space-y-5 lg:space-y-6">
                            {caseStudies.map((study, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveCaseStudy(index)}
                                    className={`case-study-button apple-card text-left w-full transition-all duration-300 rounded-2xl lg:rounded-3xl
                        ${activeCaseStudy === index
                                            ? 'ring-2 ring-[#7E0A11] bg-white'
                                            : 'hover:bg-[#f5f5f7]'}
                        `}
                                >
                                    <span className="text-xs font-semibold text-[#7E0A11] bg-[#7E0A11]/5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full inline-block">
                                        {study.type}
                                    </span>

                                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold mt-2 sm:mt-3">
                                        {study.title}
                                    </h3>

                                    <div className="apple-link text-xs sm:text-sm mt-2 sm:mt-3">
                                        View details
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Case Study Detail */}
                        <div className="case-study-detail lg:col-span-7">
                            <div className="case-study-detail apple-card sticky lg:top-28 rounded-2xl lg:rounded-3xl animate-fade-in">
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6">
                                    {caseStudies[activeCaseStudy].title}
                                </h3>

                                <div className="space-y-3 sm:space-y-4 lg:space-y-5 text-xs sm:text-sm">
                                    <div>
                                        <h4 className="font-semibold text-[#7E0A11] mb-1">
                                            Ideal Customer
                                        </h4>
                                        <p className="text-[#515154] text-xs sm:text-sm leading-relaxed">
                                            {caseStudies[activeCaseStudy].idealCustomer}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-[#7E0A11] mb-1">
                                            The Challenge
                                        </h4>
                                        <p className="text-[#515154] text-xs sm:text-sm leading-relaxed">
                                            {caseStudies[activeCaseStudy].challenge}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-[#7E0A11] mb-1">
                                            The Approach
                                        </h4>
                                        <p className="text-[#515154] text-xs sm:text-sm leading-relaxed">
                                            {caseStudies[activeCaseStudy].approach}
                                        </p>
                                    </div>

                                    <div className="case-results-grid grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 pt-4 sm:pt-5 lg:pt-6 border-t border-[#f5f5f7]">
                                        {caseStudies[activeCaseStudy].results.map((result, idx) => (
                                            <div key={idx} className="text-center">
                                                <div className="apple-stat text-base sm:text-xl lg:text-2xl">{result.value}</div>
                                                <div className="apple-stat-label text-xs">{result.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.4s ease-out;
                }
            `}</style>
            </section>

            {/* Testimonials Section */}
            <section
                id="testimonials"
                className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#7E0A11]"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-14 lg:mb-16">
                        <span className="apple-overline mb-2 sm:mb-3 block text-white">
                            Testimonials
                        </span>
                        <h2 className="apple-heading text-2xl sm:text-3xl lg:text-5xl text-white">
                            Trusted by Publishers Across India
                        </h2>
                    </div>

                    <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="testimonial-card rounded-2xl lg:rounded-3xl p-6 sm:p-7 lg:p-8 bg-[#6B080E] transition-all hover:border-white/20"
                            >
                                <div className="text-4xl sm:text-5xl lg:text-6xl text-white mb-3 sm:mb-4 leading-none">
                                    "
                                </div>

                                <p className="text-white/80 italic mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                                    {testimonial.text}
                                </p>

                                <div className="testimonial-author font-semibold text-white text-sm sm:text-base">
                                    — {testimonial.author}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-14">
                <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                    <span className="apple-overline block mb-2">FAQ</span>
                    <h2 className="apple-heading text-2xl sm:text-3xl lg:text-4xl">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="faq-container divide-y divide-[#2d2d2f]">
                    {faqItems.map((item, index) => (
                        <div key={index} className="faq-item py-3 sm:py-4">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="faq-question w-full flex justify-between items-start sm:items-center text-left text-base sm:text-lg font-medium text-black gap-3"
                            >
                                <span className="flex-1">{item.question}</span>
                                {activeFaq === index ? (
                                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#7E0A11] flex-shrink-0" />
                                ) : (
                                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-[#141416] flex-shrink-0" />
                                )}
                            </button>

                            {activeFaq === index && (
                                <p className="faq-answer mt-2 sm:mt-3 text-[#86868b] text-sm sm:text-base">
                                    {item.answer}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="cta-section bg-[#1d1d1f] text-white rounded-2xl lg:rounded-3xl py-8 sm:py-10 lg:py-14 px-6 sm:px-8 lg:px-16 text-center relative overflow-hidden w-full">
                    {/* Background glow */}
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#7E0A11] opacity-10 rounded-full blur-3xl"></div>

                    <h2 className="apple-heading text-xl sm:text-2xl lg:text-4xl text-white mb-3 sm:mb-4 relative z-10">
                        Ready to Transform Your Digital Advertising?
                    </h2>

                    <p className="text-base sm:text-lg text-[#86868b] mb-6 sm:mb-8 max-w-3xl mx-auto relative z-10">
                        Let's discuss how AdTech integration can optimize your revenue and streamline your advertising operations.
                    </p>

                    <a
                        href="/contact"
                        className="cta-button apple-button-primary bg-white text-[#1d1d1f] hover:bg-[#f5f5f7] inline-flex items-center gap-1 relative z-10"
                    >
                        Book a Strategy Call
                        <ChevronRight className="w-4 h-4" />
                    </a>
                </div>
            </section>

            {/* Scroll to Top Button */}
            <button
                className={`scroll-to-top fixed bottom-6 sm:bottom-8 right-6 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-[#7E0A11] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#63080d] transition-all ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                onClick={scrollToTop}
            >
                <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
        </div>
    );
};

export default AdTechIntegration;