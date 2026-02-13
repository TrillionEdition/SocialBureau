// import React, { useState, useEffect } from 'react';
// import Footer from './Footer';
// import { FileText, MessageSquare, PenTool, Video, ShoppingBag, Search, Target, Share2, RefreshCw } from 'lucide-react';

// const ContentMarketing = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [activeFaq, setActiveFaq] = useState(null);

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

//     const faqItems = [
//         {
//             question: "How does content marketing support business growth?",
//             answer: "Content marketing supports growth by helping businesses attract the right audience, educate them at different decision stages, and build long-term trust. When content aligns with user intent and search behavior, it creates a steady flow of qualified visitors who are more likely to convert over time."
//         },
//         {
//             question: "Is content marketing suitable for lead generation?",
//             answer: "Yes. When content is planned with clear objectives, it becomes an effective lead-generation channel. Informational resources attract interest, while service-focused content helps guide users toward enquiries without relying on aggressive sales tactics."
//         },
//         {
//             question: "Do you offer website content creation?",
//             answer: "We build website content systems that focus on clarity, structure, and relevance. Content is designed to help visitors understand services easily, build confidence, and move naturally toward taking action."
//         },
//         {
//             question: "How do you approach digital content creation?",
//             answer: "Digital content creation starts with understanding the audience and the platforms they use. From there, content is planned, created, and refined to ensure it remains useful, consistent, and aligned with broader marketing goals."
//         },
//         {
//             question: "Can you support press announcements and updates?",
//             answer: "Yes. Press-related content is developed to communicate key messages clearly while maintaining brand tone and credibility. The focus is on accuracy, structure, and relevance rather than promotional language."
//         },
//         {
//             question: "Do you create visual content as part of content marketing?",
//             answer: "Visual formats are used to simplify information and improve engagement. These assets are planned to complement written content and support easier understanding across different platforms."
//         },
//         {
//             question: "What role does email play in content strategy?",
//             answer: "Email helps maintain ongoing communication with audiences. It is used to share useful updates, educational resources, and relevant information that supports long-term relationships rather than one-time interactions."
//         },
//         {
//             question: "Is this approach suitable for professional brands?",
//             answer: "Yes. Professional brands benefit from structured content that explains services clearly and builds trust over time. The focus is on credibility, consistency, and relevance instead of promotional messaging."
//         },
//         {
//             question: "How do you measure content performance?",
//             answer: "Performance is measured using engagement signals, enquiry quality, and user behavior across content assets. These insights help guide improvements and ensure content continues to perform better over time."
//         },
//         {
//             question: "Do you work with companies across Kerala?",
//             answer: "Yes. We support organizations across the region by developing content systems that scale with business needs and adapt to changing audience behavior."
//         }
//     ];

//     const services = [
//         {
//             icon: Search,
//             title: "SEO Content Writing",
//             description: "We create search-aligned narratives that improve discoverability while maintaining clarity, depth, and user-first readability across informational and commercial pages.",
//             features: ["Content mapped to search intent and topic depth", "Editorial standards aligned with modern search quality guidelines", "Optimized structure for readability and crawl efficiency"]
//         },
//         {
//             icon: Share2,
//             title: "Social Media Content Management",
//             description: "Strategic planning and execution of platform-native assets designed to support awareness, consistency, and long-term audience engagement across key channels.",
//             features: ["Platform-specific content planning and scheduling", "Consistent messaging across audience touchpoints", "Engagement-focused formats supporting distribution"]
//         },
//         {
//             icon: PenTool,
//             title: "Article And Blog Writing",
//             description: "Long-form educational resources structured to support industry relevance, authority building, and sustained visibility through evergreen publishing models.",
//             features: ["In-depth research-driven articles", "Clear structure for user comprehension", "Authority-focused editorial frameworks"]
//         },
//         {
//             icon: MessageSquare,
//             title: "Copywriting Agency",
//             description: "Conversion-oriented messaging frameworks crafted to support landing pages, campaigns, and decision-stage touchpoints without relying on aggressive persuasion.",
//             features: ["Value-driven copy aligned with user intent", "Clear calls to action supported by context", "Messaging consistency across pages"]
//         },
//         {
//             icon: Video,
//             title: "Video Content Marketing",
//             description: "Story-led visual formats developed to enhance retention, explain complex ideas, and improve engagement across discovery and distribution platforms.",
//             features: ["Concept-driven video planning", "Clear narrative structure for retention", "Platform-ready video formats"]
//         },
//         {
//             icon: ShoppingBag,
//             title: "E-commerce Content Strategy",
//             description: "Product-led content systems designed to improve relevance, trust signals, and purchase confidence across catalog and category experiences.",
//             features: ["Category and product-level content planning", "Trust-building informational assets", "Content alignment with buyer journeys"]
//         }
//     ];

//     const features = [
//         {
//             number: "1",
//             title: "Strategy-First Content Planning",
//             description: "We begin every engagement with structured planning rather than execution-first publishing. Content decisions are guided by audience intent, search behavior, and business priorities to ensure every asset has a clear purpose and measurable role."
//         },
//         {
//             number: "2",
//             title: "Authority-Driven Content Systems",
//             description: "Instead of isolated pieces, we build interconnected content frameworks that strengthen relevance and credibility over time. Each asset supports a broader narrative, helping brands establish consistency and recognition within their space."
//         },
//         {
//             number: "3",
//             title: "Performance-Aligned Execution",
//             description: "Content is created with outcomes in mind, not assumptions. We align structure, messaging, and format with how users discover, evaluate, and act on information across digital touchpoints."
//         },
//         {
//             number: "4",
//             title: "Integrated Distribution Thinking",
//             description: "Visibility is planned from the start, not treated as an afterthought. We consider where and how content will be discovered, shared, and consumed while shaping the asset itself."
//         },
//         {
//             number: "5",
//             title: "Continuous Optimization and Learning",
//             description: "Content performance is reviewed regularly to understand what resonates and where improvements are needed. Insights from real user behavior guide refinements in structure, messaging, and conversion pathways."
//         }
//     ];

//     const testimonials = [
//         {
//             text: "Before working with Social Bureau, our content across social media and marketing platforms felt scattered. The team helped us bring everything together with a clear direction. Posting became easier, messaging felt consistent, and engagement started improving naturally.",
//             author: "Business Owner"
//         },
//         {
//             text: "What we liked most was how practical the approach was. Content was created in a way that supported our marketing efforts instead of adding more work. It helped our campaigns feel more connected and purposeful.",
//             author: "Founder"
//         },
//         {
//             text: "Earlier, we were publishing content regularly, but it wasn't really helping our overall marketing. After the changes, our platforms started working together, and enquiries coming in were more relevant to what we offer.",
//             author: "Marketing Manager"
//         },
//         {
//             text: "The content updates made a noticeable difference to how people interacted with us online. Conversations became more meaningful, and our team felt more confident sharing and promoting the content.",
//             author: "Operations Lead"
//         },
//         {
//             text: "What felt different was the human touch. The content didn't sound forced or salesy. It reflected our brand better and supported our marketing efforts without overwhelming our audience.",
//             author: "Brand Manager"
//         }
//     ];

//     return (
//         <div className="font-['Noto Sans'] bg-[#FFF8F0] text-[#0A0E27] overflow-x-hidden">
//             {/* Add inline styles for animations */}
//             <style jsx>{`
//                 @keyframes fadeInUp {
//                     from {
//                         opacity: 0;
//                         transform: translateY(30px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateY(0);
//                     }
//                 }
//                 @keyframes float {
//                     0%, 100% {
//                         transform: translateY(0px);
//                     }
//                     50% {
//                         transform: translateY(-20px);
//                     }
//                 }
//                 @keyframes pulse-slow {
//                     0%, 100% {
//                         opacity: 0.2;
//                     }
//                     50% {
//                         opacity: 0.4;
//                     }
//                 }
//                 .animate-fadeInUp {
//                     animation: fadeInUp 0.8s ease-out forwards;
//                 }
//                 .animate-float {
//                     animation: float 6s ease-in-out infinite;
//                 }
//                 .animate-pulse-slow {
//                     animation: pulse-slow 4s ease-in-out infinite;
//                 }
//                 .clip-path-polygon {
//                     clip-path: polygon(100% 0, 100% 100%, 0 100%);
//                 }
//                 img {
//                     max-width: 100%;
//                     height: auto;
//                 }
//             `}</style>

//             {/* Scroll Progress Bar */}
//             <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] z-50" style={{ width: '0%' }}></div>

//             {/* Hero Section */}
//             <section className="min-h-screen flex items-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//                 <div className="absolute top-0 right-0 w-full md:w-3/5 h-full bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] clip-path-polygon opacity-10 animate-float hidden md:block"></div>
//                 <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 px-4 sm:px-6">
//                     <div className="animate-fadeInUp">
//                         <h1 className="font-['Noto Sans'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 lg:mb-8">
//                             Content Marketing Agency
//                             <span className="block bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] bg-clip-text text-transparent mt-2">
//                                 in Kerala
//                             </span>
//                         </h1>
//                         <p className="text-base sm:text-lg text-[#94A3B8] mb-8 lg:mb-12 max-w-2xl">
//                             Turn strategic ideas into measurable visibility, qualified enquiries, and sustainable business outcomes through performance-driven content systems built for modern search ecosystems.
//                         </p>
//                         <div className="flex flex-col sm:flex-row flex-wrap gap-4">
//                             <a href="https://api.whatsapp.com/send/?phone=918921840486&text=Hello%2C+I+would+like+to+learn+more.&type=phone_number&app_absent=0" className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] text-white font-semibold rounded-full hover:translate-y-[-3px] hover:shadow-xl transition-all text-sm sm:text-base">
//                                 Book a Strategy Call
//                             </a>
//                             <a href="#services" className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-white text-[#0A0E27] font-semibold rounded-full border-2 border-[#0A0E27] hover:bg-[#0A0E27] hover:text-white hover:translate-y-[-3px] transition-all text-sm sm:text-base">
//                                 Explore Services
//                             </a>
//                         </div>
//                     </div>
//                     <div className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center animate-fadeInUp mt-8 md:mt-0">
//                         <div className="w-full h-full bg-gradient-to-br from-[rgba(255,107,53,0.1)] to-[rgba(78,205,196,0.1)] rounded-3xl overflow-hidden">
//                             <img src="assets/content-marketing.webp" alt="Content Marketing" />
//                             <div className="w-full h-full bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] opacity-20"></div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Stats Section */}
//             <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
//                 <div className="max-w-7xl mx-auto">
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
//                         {[
//                             { number: '61%', label: 'Increase in Qualified Enquiries' },
//                             { number: '38%', label: 'Time Spent on Service Pages' },
//                             { number: '45%', label: 'Organic Traffic Growth' },
//                             { number: '52%', label: 'Higher Content Engagement' }
//                         ].map((stat, index) => (
//                             <div key={index} className="text-center p-4 sm:p-6 lg:p-8 hover:translate-y-[-5px] transition-transform relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-3/5 after:bg-gradient-to-b from-transparent via-[#94A3B8] to-transparent after:opacity-20 last:after:hidden even:after:hidden md:even:after:block">
//                                 <div className="font-['Noto Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] bg-clip-text text-transparent mb-2 sm:mb-3">
//                                     {stat.number}
//                                 </div>
//                                 <div className="text-xs sm:text-sm lg:text-base text-[#94A3B8]">{stat.label}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* About Section */}
//             <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//                 <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//                     <h2 className="font-['Noto Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Content Marketing Firm Kerala</h2>
//                 </div>
//                 <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
//                     <div className="h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-[rgba(255,107,53,0.1)] to-[rgba(78,205,196,0.1)] rounded-3xl flex items-center justify-center relative overflow-hidden">
//                         <img src="assets/contentmarketing2.webp" alt="Content Marketing About" />
//                         <div className="w-full h-full bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] opacity-20"></div>
//                     </div>
//                     <div>
//                         <h3 className="font-['Noto Sans'] text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Strategic Content Partner</h3>
//                         <p className="text-[#00183dff] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
//                             Content marketing is the structured process of creating value-driven digital assets that educate, influence, and guide potential customers toward informed decisions. Instead of publishing content for visibility alone, effective content focuses on relevance, intent, and measurable impact.
//                         </p>
//                         <p className="text-[#00183dff] leading-relaxed text-sm sm:text-base">
//                             At Social Bureau, we work as a strategic growth partner, helping brands develop content ecosystems that support long-term authority, trust, and discoverability across search engines and emerging AI-driven discovery platforms.
//                         </p>
//                     </div>
//                 </div>
//             </section>

//             {/* Services Section */}
//             <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
//                 <div className="max-w-7xl mx-auto">
//                     <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//                         <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
//                             Our Services
//                         </span>
//                         <h2 className="font-['Noto Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Content Marketing Services in Kerala</h2>
//                         <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl mx-auto px-4">
//                             Our services are designed to support scalable growth by aligning content creation with search behavior, user expectations, and measurable business objectives. Each service is delivered with a focus on clarity, consistency, and long-term performance rather than short-term visibility.
//                         </p>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//                         {services.map((service, index) => {
//                             const Icon = service.icon;

//                             return (
//                                 <div
//                                     key={index}
//                                     className="bg-white p-4 sm:p-6 lg:p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:translate-y-[-10px] transition-all duration-400 border-2 border-transparent hover:border-[#4ECDC4] relative overflow-hidden group"
//                                 >
//                                     <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] opacity-0 group-hover:opacity-5 transition-opacity z-0"></div>

//                                     <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] rounded-xl flex items-center justify-center mb-4 sm:mb-6 relative z-10">
//                                         <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
//                                     </div>

//                                     <h3 className="font-['Noto Sans'] text-lg sm:text-xl font-bold mb-3 sm:mb-4 relative z-10">
//                                         {service.title}
//                                     </h3>

//                                     <p className="text-[#94A3B8] mb-4 sm:mb-6 relative z-10 text-sm sm:text-base">
//                                         {service.description}
//                                     </p>

//                                     <ul className="space-y-1 sm:space-y-2 relative z-10">
//                                         {service.features.map((feature, idx) => (
//                                             <li key={idx} className="text-[#94A3B8] flex items-start text-xs sm:text-sm">
//                                                 <span className="text-[#4ECDC4] font-bold mr-2">✓</span>
//                                                 {feature}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </section>

//             {/* Why Choose Us */}
//             <section id="why-choose" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//                 <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//                     <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
//                         Why Choose Us
//                     </span>
//                     <h2 className="font-['Noto Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">What Sets Us Apart</h2>
//                 </div>

//                 {/* Main Content Grid - 3 boxes left, image right */}
//                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
//                     {/* Left Column - 3 Boxes Stacked */}
//                     <div className="lg:col-span-3 space-y-6 sm:space-y-8">
//                         {/* Box 1 */}
//                         <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:translate-y-[-5px] transition-all duration-300 border-l-4 border-[#FF6B35]">
//                             <div className="flex items-start gap-4 sm:gap-6">
//                                 <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] text-white rounded-full flex items-center justify-center font-['Noto Sans'] font-bold text-base sm:text-lg">
//                                     1
//                                 </div>
//                                 <div>
//                                     <h3 className="font-['Noto Sans'] text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#0A0E27]">
//                                         Strategy-First Content Planning
//                                     </h3>
//                                     <p className="text-[#94A3B8] leading-relaxed text-sm sm:text-base">
//                                         We begin every engagement with structured planning rather than execution-first publishing. Content decisions are guided by audience intent, search behavior, and business priorities to ensure every asset has a clear purpose and measurable role.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Box 2 */}
//                         <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:translate-y-[-5px] transition-all duration-300 border-l-4 border-[#4ECDC4]">
//                             <div className="flex items-start gap-4 sm:gap-6">
//                                 <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] text-white rounded-full flex items-center justify-center font-['Noto Sans'] font-bold text-base sm:text-lg">
//                                     2
//                                 </div>
//                                 <div>
//                                     <h3 className="font-['Noto Sans'] text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#0A0E27]">
//                                         Authority-Driven Content Systems
//                                     </h3>
//                                     <p className="text-[#94A3B8] leading-relaxed text-sm sm:text-base">
//                                         Instead of isolated pieces, we build interconnected content frameworks that strengthen relevance and credibility over time. Each asset supports a broader narrative, helping brands establish consistency and recognition within their space.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Box 3 */}
//                         <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:translate-y-[-5px] transition-all duration-300 border-l-4 border-[#FF6B35]">
//                             <div className="flex items-start gap-4 sm:gap-6">
//                                 <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] text-white rounded-full flex items-center justify-center font-['Noto Sans'] font-bold text-base sm:text-lg">
//                                     3
//                                 </div>
//                                 <div>
//                                     <h3 className="font-['Noto Sans'] text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#0A0E27]">
//                                         Performance-Aligned Execution
//                                     </h3>
//                                     <p className="text-[#94A3B8] leading-relaxed text-sm sm:text-base">
//                                         Content is created with outcomes in mind, not assumptions. We align structure, messaging, and format with how users discover, evaluate, and act on information across digital touchpoints.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Column - Image */}
//                     <div className="lg:col-span-1">
//                         <div className="sticky top-24">
//                             <div className="bg-gradient-to-br from-[rgba(255,107,53,0.1)] to-[rgba(78,205,196,0.1)] rounded-3xl overflow-hidden h-auto">
//                                 <img
//                                     src="assets/amal.webp"
//                                     alt="Content Marketing Strategy"
//                                     className="w-300 h-600 min-h-[600px] lg:min-h-[550px] object-cover"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bottom Two Boxes (for features 4 & 5) */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12 lg:mt-16 max-w-4xl mx-auto">
//                     {features.slice(3, 5).map((feature, index) => (
//                         <div key={index} className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg hover:shadow-2xl hover:translate-y-[-5px] transition-all duration-300">
//                             <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] text-white rounded-full flex items-center justify-center font-['Noto Sans'] font-bold text-base sm:text-lg mx-auto mb-4 sm:mb-6">
//                                 {feature.number}
//                             </div>
//                             <h3 className="font-['Noto Sans'] text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center">{feature.title}</h3>
//                             <p className="text-[#94A3B8] leading-relaxed text-sm sm:text-base text-center">{feature.description}</p>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* Case Studies */}
//             <section id="case-studies" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
//                 <div className="max-w-7xl mx-auto">
//                     <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//                         <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
//                             Case Studies
//                         </span>
//                         <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Proven Results</h2>
//                     </div>
//                     <div className="space-y-8 sm:space-y-12">
//                         {/* Case Study 1 */}
//                         <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg relative overflow-hidden border-l-4 border-[#FF6B35]">
//                             <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-[#FFF8F0] text-[#FF6B35] text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6">
//                                 Professional Services Firm
//                             </span>
//                             <h3 className="font-['Noto Sans'] text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Lead Quality Improvement</h3>
//                             <div className="mb-6 sm:mb-8">
//                                 <h4 className="font-['Noto Sans'] text-base sm:text-lg font-semibold text-[#FF6B35] mb-2 sm:mb-3">Ideal Customer</h4>
//                                 <p className="text-[#94A3B8] text-sm sm:text-base">
//                                     A service-based professional firm with an established offline reputation but inconsistent inbound enquiries from digital channels.
//                                 </p>
//                             </div>
//                             <div className="mb-6 sm:mb-8">
//                                 <h4 className="font-['Noto Sans'] text-base sm:text-lg font-semibold text-[#FF6B35] mb-2 sm:mb-3">The Challenge (Before)</h4>
//                                 <p className="text-[#94A3B8] text-sm sm:text-base">
//                                     The firm had published content sporadically over time, but topics lacked alignment with search intent. Website pages attracted traffic that did not convert, and enquiries often failed to match the firm's ideal client profile.
//                                 </p>
//                             </div>
//                             <div className="mb-6 sm:mb-8">
//                                 <h4 className="font-['Noto Sans'] text-base sm:text-lg font-semibold text-[#FF6B35] mb-2 sm:mb-3">The Approach</h4>
//                                 <p className="text-[#94A3B8] text-sm sm:text-base">
//                                     We restructured the content foundation by defining clear audience segments and mapping decision-stage intent. Core service pages were refined, educational assets were aligned to buyer questions, and internal linking was organized to guide users toward meaningful actions.
//                                 </p>
//                             </div>
//                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-8 bg-[#FFF8F0] rounded-2xl">
//                                 <div className="text-center p-4">
//                                     <div className="font-['Noto Sans'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FF6B35] mb-1 sm:mb-2">+61%</div>
//                                     <div className="text-xs sm:text-sm text-[#94A3B8]">Qualified Enquiry Rate</div>
//                                 </div>
//                                 <div className="text-center p-4">
//                                     <div className="font-['Noto Sans'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FF6B35] mb-1 sm:mb-2">+38%</div>
//                                     <div className="text-xs sm:text-sm text-[#94A3B8]">Time on Service Pages</div>
//                                 </div>
//                                 <div className="text-center p-4">
//                                     <div className="font-['Noto Sans'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FF6B35] mb-1 sm:mb-2">Higher</div>
//                                     <div className="text-xs sm:text-sm text-[#94A3B8]">Lead Relevance & Readiness</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Testimonials */}
//             <section id="testimonials" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//                 <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//                     <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
//                         Testimonials
//                     </span>
//                     <h2 className="font-['Noto Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">What Our Clients Say</h2>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//                     {testimonials.map((testimonial, index) => (
//                         <div key={index} className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg hover:translate-y-[-5px] transition-transform duration-300">
//                             <div className="text-4xl sm:text-5xl text-[#4ECDC4] opacity-30 mb-3 sm:mb-4">❝</div>
//                             <p className="text-[#94A3B8] italic leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{testimonial.text}</p>
//                             <div className="font-semibold text-[#0A0E27] text-sm sm:text-base">— {testimonial.author}</div>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* FAQ Section */}
//             <section id="faq" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
//                 <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//                     <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
//                         FAQ
//                     </span>
//                     <h2 className="font-['Noto Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
//                 </div>
//                 <div className="space-y-3 sm:space-y-4">
//                     {faqItems.map((item, index) => (
//                         <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
//                             <button
//                                 className="w-full p-4 sm:p-6 text-left flex justify-between items-center font-['Noto Sans'] font-semibold hover:text-[#FF6B35] transition-colors text-sm sm:text-base"
//                                 onClick={() => toggleFaq(index)}
//                             >
//                                 <span className="text-left pr-4">{item.question}</span>
//                                 <span className={`text-xl sm:text-2xl transition-transform flex-shrink-0 ${activeFaq === index ? 'rotate-45' : ''}`}>+</span>
//                             </button>
//                             <div className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-96' : 'max-h-0'}`}>
//                                 <div className="p-4 sm:p-6 pt-0 text-[#94A3B8] leading-relaxed text-sm sm:text-base">
//                                     {item.answer}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* CTA Section */}
//             <section id="contact" className="py-12 sm:py-16 lg:py-20 mx-4 sm:mx-6 lg:mx-8 my-8 sm:my-12 lg:my-16 bg-gradient-to-br from-[#0A0E27] to-[#1E293B] text-white rounded-3xl text-center relative overflow-hidden">
//                 <div className="absolute -top-1/2 -right-1/10 w-64 h-64 sm:w-96 sm:h-96 bg-radial-gradient(circle, rgba(78,205,196,0.2), transparent) rounded-full animate-pulse-slow hidden sm:block"></div>
//                 <h2 className="font-['Noto Sans'] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 relative z-10 px-4">Ready to Transform Your Content Strategy?</h2>
//                 <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 relative z-10 px-4">
//                     Let's discuss how strategic content marketing can drive measurable growth for your business.
//                 </p>
//                 <a href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white text-[#0A0E27] font-semibold rounded-full hover:translate-y-[-3px] hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)] transition-all relative z-10 text-sm sm:text-base">
//                     Connect With Us
//                 </a>
//             </section>

//             <Footer />

//             {/* Scroll to Top Button */}
//             <button
//                 className={`fixed bottom-6 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] text-white rounded-full flex items-center justify-center text-lg sm:text-xl shadow-lg hover:translate-y-[-5px] transition-all ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//                 onClick={scrollToTop}
//             >
//                 ↑
//             </button>
//         </div>
//     );
// };

// export default ContentMarketing;




import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import { FileText, MessageSquare, PenTool, Video, ShoppingBag, Search, Target, Share2, RefreshCw } from 'lucide-react';
import Seo from './Seo';

const ContentMarketing = () => {
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

    const faqItems = [
        {
            question: "How does content marketing support business growth?",
            answer: "Content marketing supports growth by helping businesses attract the right audience, educate them at different decision stages, and build long-term trust. When content aligns with user intent and search behavior, it creates a steady flow of qualified visitors who are more likely to convert over time."
        },
        {
            question: "Is content marketing suitable for lead generation?",
            answer: "Yes. When content is planned with clear objectives, it becomes an effective lead-generation channel. Informational resources attract interest, while service-focused content helps guide users toward enquiries without relying on aggressive sales tactics."
        },
        {
            question: "Do you offer website content creation?",
            answer: "We build website content systems that focus on clarity, structure, and relevance. Content is designed to help visitors understand services easily, build confidence, and move naturally toward taking action."
        },
        {
            question: "How do you approach digital content creation?",
            answer: "Digital content creation starts with understanding the audience and the platforms they use. From there, content is planned, created, and refined to ensure it remains useful, consistent, and aligned with broader marketing goals."
        },
        {
            question: "Can you support press announcements and updates?",
            answer: "Yes. Press-related content is developed to communicate key messages clearly while maintaining brand tone and credibility. The focus is on accuracy, structure, and relevance rather than promotional language."
        },
        {
            question: "Do you create visual content as part of content marketing?",
            answer: "Visual formats are used to simplify information and improve engagement. These assets are planned to complement written content and support easier understanding across different platforms."
        },
        {
            question: "What role does email play in content strategy?",
            answer: "Email helps maintain ongoing communication with audiences. It is used to share useful updates, educational resources, and relevant information that supports long-term relationships rather than one-time interactions."
        },
        {
            question: "Is this approach suitable for professional brands?",
            answer: "Yes. Professional brands benefit from structured content that explains services clearly and builds trust over time. The focus is on credibility, consistency, and relevance instead of promotional messaging."
        },
        {
            question: "How do you measure content performance?",
            answer: "Performance is measured using engagement signals, enquiry quality, and user behavior across content assets. These insights help guide improvements and ensure content continues to perform better over time."
        },
        {
            question: "Do you work with companies across Kerala?",
            answer: "Yes. We support organizations across the region by developing content systems that scale with business needs and adapt to changing audience behavior."
        }
    ];

    const services = [
        {
            icon: Search,
            title: "SEO Content Writing",
            description: "We create search-aligned narratives that improve discoverability while maintaining clarity, depth, and user-first readability across informational and commercial pages.",
            features: ["Content mapped to search intent and topic depth", "Editorial standards aligned with modern search quality guidelines", "Optimized structure for readability and crawl efficiency"]
        },
        {
            icon: Share2,
            title: "Social Media Content Management",
            description: "Strategic planning and execution of platform-native assets designed to support awareness, consistency, and long-term audience engagement across key channels.",
            features: ["Platform-specific content planning and scheduling", "Consistent messaging across audience touchpoints", "Engagement-focused formats supporting distribution"]
        },
        {
            icon: PenTool,
            title: "Article And Blog Writing",
            description: "Long-form educational resources structured to support industry relevance, authority building, and sustained visibility through evergreen publishing models.",
            features: ["In-depth research-driven articles", "Clear structure for user comprehension", "Authority-focused editorial frameworks"]
        },
        {
            icon: MessageSquare,
            title: "Copywriting Agency",
            description: "Conversion-oriented messaging frameworks crafted to support landing pages, campaigns, and decision-stage touchpoints without relying on aggressive persuasion.",
            features: ["Value-driven copy aligned with user intent", "Clear calls to action supported by context", "Messaging consistency across pages"]
        },
        {
            icon: Video,
            title: "Video Content Marketing",
            description: "Story-led visual formats developed to enhance retention, explain complex ideas, and improve engagement across discovery and distribution platforms.",
            features: ["Concept-driven video planning", "Clear narrative structure for retention", "Platform-ready video formats"]
        },
        {
            icon: ShoppingBag,
            title: "E-commerce Content Strategy",
            description: "Product-led content systems designed to improve relevance, trust signals, and purchase confidence across catalog and category experiences.",
            features: ["Category and product-level content planning", "Trust-building informational assets", "Content alignment with buyer journeys"]
        }
    ];

    const features = [
        {
            number: "1",
            title: "Strategy-First Content Planning",
            description: "We begin every engagement with structured planning rather than execution-first publishing. Content decisions are guided by audience intent, search behavior, and business priorities to ensure every asset has a clear purpose and measurable role."
        },
        {
            number: "2",
            title: "Authority-Driven Content Systems",
            description: "Instead of isolated pieces, we build interconnected content frameworks that strengthen relevance and credibility over time. Each asset supports a broader narrative, helping brands establish consistency and recognition within their space."
        },
        {
            number: "3",
            title: "Performance-Aligned Execution",
            description: "Content is created with outcomes in mind, not assumptions. We align structure, messaging, and format with how users discover, evaluate, and act on information across digital touchpoints."
        },
        {
            number: "4",
            title: "Integrated Distribution Thinking",
            description: "Visibility is planned from the start, not treated as an afterthought. We consider where and how content will be discovered, shared, and consumed while shaping the asset itself."
        },
        {
            number: "5",
            title: "Continuous Optimization and Learning",
            description: "Content performance is reviewed regularly to understand what resonates and where improvements are needed. Insights from real user behavior guide refinements in structure, messaging, and conversion pathways."
        }
    ];

    const testimonials = [
        {
            text: "Before working with Social Bureau, our content across social media and marketing platforms felt scattered. The team helped us bring everything together with a clear direction. Posting became easier, messaging felt consistent, and engagement started improving naturally.",
            author: "Business Owner"
        },
        {
            text: "What we liked most was how practical the approach was. Content was created in a way that supported our marketing efforts instead of adding more work. It helped our campaigns feel more connected and purposeful.",
            author: "Founder"
        },
        {
            text: "Earlier, we were publishing content regularly, but it wasn't really helping our overall marketing. After the changes, our platforms started working together, and enquiries coming in were more relevant to what we offer.",
            author: "Marketing Manager"
        },
        {
            text: "The content updates made a noticeable difference to how people interacted with us online. Conversations became more meaningful, and our team felt more confident sharing and promoting the content.",
            author: "Operations Lead"
        },
        {
            text: "What felt different was the human touch. The content didn't sound forced or salesy. It reflected our brand better and supported our marketing efforts without overwhelming our audience.",
            author: "Brand Manager"
        }
    ];

    return (
        <div className="font-['Noto Sans'] bg-[#FFF8F0] text-[#0A0E27] overflow-x-hidden cm-page">
            <Seo
                title=" Content Marketing Agency in Kerala | Social Bureau"
                description="Content Marketing Agency in Kerala helping brands attract
high-intent audiences with focused strategy, clarity-driven content, and
measurable growth.
"
                keywords="Content Marketing"
            />
            {/* Add inline styles for animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .cm-page img {
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
            <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] z-50" style={{ width: '0%' }}></div>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full md:w-3/5 h-full bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] clip-path-polygon opacity-10 animate-float hidden md:block"></div>
                <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 px-4 sm:px-6">
                    <div className="animate-fadeInUp">
                        <h1 className="font-['Noto Sans'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 lg:mb-8">
                            Content Marketing Agency in Kerala
                        </h1>
                        <p className="text-base sm:text-lg text-[#00183dff] mb-8 lg:mb-12 max-w-2xl">
                            Turn strategic ideas into measurable visibility, qualified enquiries, and sustainable business outcomes through performance-driven content systems built for modern search ecosystems.
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                            <a href="https://api.whatsapp.com/send/?phone=918921840486&text=Hello%2C+I+would+like+to+learn+more.&type=phone_number&app_absent=0" className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] text-white font-semibold rounded-full hover:translate-y-[-3px] hover:shadow-xl transition-all text-sm sm:text-base">
                                Book a Strategy Call
                            </a>
                            <a href="#services" className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-white text-[#0A0E27] font-semibold rounded-full border-2 border-[#0A0E27] hover:bg-[#0A0E27] hover:text-white hover:translate-y-[-3px] transition-all text-sm sm:text-base">
                                Explore Services
                            </a>
                        </div>
                    </div>
                    <div className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center animate-fadeInUp mt-8 md:mt-0">
                        <div className="w-full h-full bg-gradient-to-br from-[rgba(255,107,53,0.1)] to-[rgba(78,205,196,0.1)] rounded-3xl overflow-hidden">
                            <img src="assets/content-marketing.webp" alt="content marketing image" />
                            <div className="w-full h-full bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] opacity-20"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section - REMOVED NEGATIVE MARGIN */}
            <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {[
                            { number: '61%', label: 'Increase in Qualified Enquiries' },
                            { number: '38%', label: 'Time Spent on Service Pages' },
                            { number: '45%', label: 'Organic Traffic Growth' },
                            { number: '52%', label: 'Higher Content Engagement' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center p-4 sm:p-6 lg:p-8 hover:translate-y-[-5px] transition-transform relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-3/5 after:bg-gradient-to-b from-transparent via-[#94A3B8] to-transparent after:opacity-20 last:after:hidden even:after:hidden md:even:after:block">
                                <div className="font-['Noto Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] bg-clip-text text-transparent mb-2 sm:mb-3">
                                    {stat.number}
                                </div>
                                <div className="text-xs sm:text-sm lg:text-base text-[#00183dff]">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <h2 className="font-['Noto Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Content Marketing Firm Kerala</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                    <div className="h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-[rgba(255,107,53,0.1)] to-[rgba(78,205,196,0.1)] rounded-3xl flex items-center justify-center relative overflow-hidden">
                        <img src="assets/contentmarketing2.webp" alt="content marketing image" />
                        <div className="w-full h-full bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] opacity-20"></div>
                    </div>
                    <div>
                        <h3 className="font-['Noto Sans'] text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Strategic Content Partner</h3>
                        <p className="text-[#00183dff] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                            <a href='https://en.wikipedia.org/wiki/Content_marketing' className='text-red-900 font-bold'> Content marketing</a> is the structured process of creating value-driven digital assets that educate, influence, and guide potential customers toward informed decisions. Instead of publishing content for visibility alone, effective content focuses on relevance, intent, and measurable impact.
                        </p>
                        <p className="text-[#00183dff] leading-relaxed text-sm sm:text-base">
                            At <span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-gray-900 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 font-light leading-relaxed">

                                <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>

                                    Social<span className="text-[#ff0000]">B</span>ureau

                                </a></span>, we work as a strategic growth partner, helping brands develop content ecosystems that support long-term authority, trust, and discoverability across search engines and emerging AI-driven discovery platforms.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                            Our Services
                        </span>
                        <h2 className="font-['Noto Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Content Marketing Services in Kochi</h2>
                        <p className="text-base sm:text-lg text-[#00183dff] max-w-3xl mx-auto px-4">
                            Our services are designed to support scalable growth by aligning content creation with search behavior, user expectations, and measurable business objectives. Each service is delivered with a focus on clarity, consistency, and long-term performance rather than short-term visibility.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {services.map((service, index) => {
                            const Icon = service.icon;

                            return (
                                <div
                                    key={index}
                                    className="bg-white p-4 sm:p-6 lg:p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:translate-y-[-10px] transition-all duration-400 border-2 border-transparent hover:border-[#4ECDC4] relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] opacity-0 group-hover:opacity-5 transition-opacity z-0"></div>

                                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] rounded-xl flex items-center justify-center mb-4 sm:mb-6 relative z-10">
                                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                                    </div>

                                    <h3 className="font-['Noto Sans'] text-lg sm:text-xl font-bold mb-3 sm:mb-4 relative z-10">
                                        {service.title}
                                    </h3>

                                    <p className="text-[#00183dff] mb-4 sm:mb-6 relative z-10 text-sm sm:text-base">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-1 sm:space-y-2 relative z-10">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="text-[#00183dff] flex items-start text-xs sm:text-sm">
                                                <span className="text-[#4ECDC4] font-bold mr-2">✓</span>
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
            <section id="why-choose" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        Why Choose Us
                    </span>
                    <h2 className="font-['Noto Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">What Sets Us Apart</h2>
                </div>

                {/* Main Content Grid - 3 boxes left, image right */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
                    {/* Left Column - 3 Boxes Stacked */}
                    <div className="lg:col-span-3 space-y-6 sm:space-y-8">
                        {/* Box 1 */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:translate-y-[-5px] transition-all duration-300 border-l-4 border-[#FF6B35]">
                            <div className="flex items-start gap-4 sm:gap-6">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] text-white rounded-full flex items-center justify-center font-['Noto Sans'] font-bold text-base sm:text-lg">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-['Noto Sans'] text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#0A0E27]">
                                        Strategy-First Content Planning
                                    </h3>
                                    <p className="text-[#00183dff] leading-relaxed text-sm sm:text-base">
                                        We begin every engagement with structured planning rather than execution-first publishing. Content decisions are guided by audience intent, search behavior, and business priorities to ensure every asset has a clear purpose and measurable role.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Box 2 */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:translate-y-[-5px] transition-all duration-300 border-l-4 border-[#4ECDC4]">
                            <div className="flex items-start gap-4 sm:gap-6">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] text-white rounded-full flex items-center justify-center font-['Noto Sans'] font-bold text-base sm:text-lg">
                                    2
                                </div>
                                <div>
                                    <h3 className="font-['Noto Sans'] text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#0A0E27]">
                                        Authority-Driven Content Systems
                                    </h3>
                                    <p className="text-[#00183dff] leading-relaxed text-sm sm:text-base">
                                        Instead of isolated pieces, we build interconnected content frameworks that strengthen relevance and credibility over time. Each asset supports a broader narrative, helping brands establish consistency and recognition within their space.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Box 3 */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:translate-y-[-5px] transition-all duration-300 border-l-4 border-[#FF6B35]">
                            <div className="flex items-start gap-4 sm:gap-6">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] text-white rounded-full flex items-center justify-center font-['Noto Sans'] font-bold text-base sm:text-lg">
                                    3
                                </div>
                                <div>
                                    <h3 className="font-['Noto Sans'] text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#0A0E27]">
                                        Performance-Aligned Execution
                                    </h3>
                                    <p className="text-[#00183dff] leading-relaxed text-sm sm:text-base">
                                        Content is created with outcomes in mind, not assumptions. We align structure, messaging, and format with how users discover, evaluate, and act on information across digital touchpoints.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Image */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-gradient-to-br from-[rgba(255,107,53,0.1)] to-[rgba(78,205,196,0.1)] rounded-3xl overflow-hidden h-auto">
                                <img
                                    src="assets/amal.webp"
                                    alt="Content Marketing expert"
                                    className="w-300 h-600 min-h-[600px] lg:min-h-[550px] object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Two Boxes (for features 4 & 5) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12 lg:mt-16 max-w-4xl mx-auto">
                    {features.slice(3, 5).map((feature, index) => (
                        <div key={index} className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg hover:shadow-2xl hover:translate-y-[-5px] transition-all duration-300">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] text-white rounded-full flex items-center justify-center font-['Noto Sans'] font-bold text-base sm:text-lg mx-auto mb-4 sm:mb-6">
                                {feature.number}
                            </div>
                            <h3 className="font-['Noto Sans'] text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center">{feature.title}</h3>
                            <p className="text-[#00183dff] leading-relaxed text-sm sm:text-base text-center">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Case Studies */}
            <section id="case-studies" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                            Case Studies
                        </span>
                        <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Proven Results</h2>
                    </div>
                    <div className="space-y-8 sm:space-y-12">
                        {/* Case Study 1 */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg relative overflow-hidden border-l-4 border-[#FF6B35]">
                            <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-[#FFF8F0] text-[#FF6B35] text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6">
                                Professional Services Firm
                            </span>
                            <h3 className="font-['Noto Sans'] text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Lead Quality Improvement</h3>
                            <div className="mb-6 sm:mb-8">
                                <h4 className="font-['Noto Sans'] text-base sm:text-lg font-semibold text-[#FF6B35] mb-2 sm:mb-3">Ideal Customer</h4>
                                <p className="text-[#00183dff] text-sm sm:text-base">
                                    A service-based professional firm with an established offline reputation but inconsistent inbound enquiries from digital channels.
                                </p>
                            </div>
                            <div className="mb-6 sm:mb-8">
                                <h4 className="font-['Noto Sans'] text-base sm:text-lg font-semibold text-[#FF6B35] mb-2 sm:mb-3">The Challenge (Before)</h4>
                                <p className="text-[#00183dff] text-sm sm:text-base">
                                    The firm had published content sporadically over time, but topics lacked alignment with search intent. Website pages attracted traffic that did not convert, and enquiries often failed to match the firm's ideal client profile.
                                </p>
                            </div>
                            <div className="mb-6 sm:mb-8">
                                <h4 className="font-['Noto Sans'] text-base sm:text-lg font-semibold text-[#FF6B35] mb-2 sm:mb-3">The Approach</h4>
                                <p className="text-[#00183dff] text-sm sm:text-base">
                                    We restructured the content foundation by defining clear audience segments and mapping decision-stage intent. Core service pages were refined, educational assets were aligned to buyer questions, and internal linking was organized to guide users toward meaningful actions.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-8 bg-[#FFF8F0] rounded-2xl">
                                <div className="text-center p-4">
                                    <div className="font-['Noto Sans'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FF6B35] mb-1 sm:mb-2">+61%</div>
                                    <div className="text-xs sm:text-sm text-[#00183dff]">Qualified Enquiry Rate</div>
                                </div>
                                <div className="text-center p-4">
                                    <div className="font-['Noto Sans'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FF6B35] mb-1 sm:mb-2">+38%</div>
                                    <div className="text-xs sm:text-sm text-[#00183dff]">Time on Service Pages</div>
                                </div>
                                <div className="text-center p-4">
                                    <div className="font-['Noto Sans'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FF6B35] mb-1 sm:mb-2">Higher</div>
                                    <div className="text-xs sm:text-sm text-[#00183dff]">Lead Relevance & Readiness</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        Testimonials
                    </span>
                    <h2 className="font-['Noto Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">What Our Clients Say</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg hover:translate-y-[-5px] transition-transform duration-300">
                            <div className="text-4xl sm:text-5xl text-[#4ECDC4] opacity-30 mb-3 sm:mb-4">❝</div>
                            <p className="text-[#00183dff] italic leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{testimonial.text}</p>
                            <div className="font-semibold text-[#0A0E27] text-sm sm:text-base">— {testimonial.author}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        FAQ
                    </span>
                    <h2 className="font-['Noto Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-3 sm:space-y-4">
                    {faqItems.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <button
                                className="w-full p-4 sm:p-6 text-left flex justify-between items-center font-['Noto Sans'] font-semibold hover:text-[#FF6B35] transition-colors text-sm sm:text-base"
                                onClick={() => toggleFaq(index)}
                            >
                                <span className="text-left pr-4">{item.question}</span>
                                <span className={`text-xl sm:text-2xl transition-transform flex-shrink-0 ${activeFaq === index ? 'rotate-45' : ''}`}>+</span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                                <div className="p-4 sm:p-6 pt-0 text-[#00183dff] leading-relaxed text-sm sm:text-base">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="py-12 sm:py-16 lg:py-20 mx-4 sm:mx-6 lg:mx-8 my-8 sm:my-12 lg:my-16 bg-gradient-to-br from-[#0A0E27] to-[#1E293B] text-white rounded-3xl text-center relative overflow-hidden">
                <div className="absolute -top-1/2 -right-1/10 w-64 h-64 sm:w-96 sm:h-96 bg-radial-gradient(circle, rgba(78,205,196,0.2), transparent) rounded-full animate-pulse-slow hidden sm:block"></div>
                <h2 className="font-['Noto Sans'] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 relative z-10 px-4">Ready to Transform Your Content Strategy?</h2>
                <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 relative z-10 px-4">
                    Let's discuss how strategic content marketing can drive measurable growth for your business.
                </p>
                <a href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white text-[#0A0E27] font-semibold rounded-full hover:translate-y-[-3px] hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)] transition-all relative z-10 text-sm sm:text-base">
                    Connect With Us
                </a>
            </section>

            {/* Scroll to Top Button */}
            <button
                className={`fixed bottom-6 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] text-white rounded-full flex items-center justify-center text-lg sm:text-xl shadow-lg hover:translate-y-[-5px] transition-all ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={scrollToTop}
            >
                ↑
            </button>
        </div>
    );
};

export default ContentMarketing;