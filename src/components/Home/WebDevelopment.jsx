// import React, { useState, useRef, useEffect } from 'react';
// import {
//     Code,
//     Globe,
//     Zap,
//     Smartphone,
//     Database,
//     Lock,
//     BarChart,
//     Users,
//     CheckCircle,
//     Layers,
//     TrendingUp,
//     Monitor
// } from 'lucide-react';
// import Footer from '../Footer';

// const WebDevelopment = () => {
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

//     const services = [
//         {
//             icon: Code,
//             title: "Custom Web Applications",
//             description: "We build scalable, feature-rich web applications tailored to your business needs. Using modern frameworks and best practices, we create solutions that grow with your business while maintaining clean, maintainable code architecture.",
//             features: [
//                 "Responsive design across all devices",
//                 "Scalable backend infrastructure",
//                 "Advanced functionality and integrations",
//                 "Performance-optimized code"
//             ]
//         },
//         {
//             icon: Globe,
//             title: "E-Commerce Solutions",
//             description: "From product catalogs to complete payment integration, we develop robust e-commerce platforms that drive conversions. Our solutions include inventory management, secure transactions, and analytics to help you understand customer behavior.",
//             features: [
//                 "Product management systems",
//                 "Secure payment processing",
//                 "Inventory and order management",
//                 "Customer analytics dashboard"
//             ]
//         },
//         {
//             icon: Smartphone,
//             title: "Responsive Web Design",
//             description: "Every website we build is fully responsive, ensuring seamless user experience across mobile, tablet, and desktop devices. We prioritize mobile-first design principles to reach your audience wherever they are.",
//             features: [
//                 "Mobile-first approach",
//                 "Cross-device compatibility",
//                 "Fast loading times",
//                 "Touch-friendly interfaces"
//             ]
//         },
//         {
//             icon: Database,
//             title: "Database Architecture & Management",
//             description: "We design robust database systems that handle your data efficiently and securely. Our solutions are optimized for performance, scalability, and reliability, ensuring your data is always accessible and protected.",
//             features: [
//                 "Optimized database design",
//                 "Data security and encryption",
//                 "Backup and recovery systems",
//                 "Performance monitoring"
//             ]
//         },
//         {
//             icon: Lock,
//             title: "Security & Compliance",
//             description: "Security is embedded into every layer of our development process. We implement industry-standard security practices, compliance requirements, and regular security audits to protect your application and user data.",
//             features: [
//                 "SSL/TLS encryption",
//                 "GDPR and compliance adherence",
//                 "Regular security audits",
//                 "DDoS and threat protection"
//             ]
//         },
//         {
//             icon: BarChart,
//             title: "Web Analytics & Optimization",
//             description: "We integrate comprehensive analytics and tracking systems to monitor user behavior, track conversions, and identify optimization opportunities. Data-driven decisions lead to continuous improvement and better ROI.",
//             features: [
//                 "Real-time analytics dashboard",
//                 "Conversion tracking setup",
//                 "User behavior analysis",
//                 "Performance optimization reports"
//             ]
//         },
//         {
//             icon: Zap,
//             title: "Performance Optimization",
//             description: "Speed matters. We optimize every aspect of your website—from code minification to image compression, caching strategies, and CDN integration—ensuring your site loads quickly and performs flawlessly.",
//             features: [
//                 "Code optimization and minification",
//                 "Image and asset compression",
//                 "Caching strategies",
//                 "CDN integration for global reach"
//             ]
//         },
//         {
//             icon: Layers,
//             title: "API Development & Integration",
//             description: "We develop and integrate RESTful APIs and third-party services to extend your application's functionality. Our APIs are well-documented, secure, and designed for easy integration with other systems.",
//             features: [
//                 "RESTful API design",
//                 "Third-party integrations",
//                 "Webhook implementation",
//                 "API documentation and SDKs"
//             ]
//         },
//         {
//             icon: Users,
//             title: "User Experience (UX) Design",
//             description: "Beautiful design goes hand-in-hand with functionality. We create intuitive, user-centered interfaces that guide visitors toward conversion while maintaining brand consistency and visual appeal.",
//             features: [
//                 "Wireframing and prototyping",
//                 "User research and testing",
//                 "Accessibility compliance",
//                 "Conversion-focused design"
//             ]
//         }
//     ];

//     const whyChooseUs = [
//         {
//             icon: Code,
//             title: "Technical Excellence",
//             description: "Our team consists of experienced developers proficient in latest technologies and frameworks. We follow industry best practices and maintain high coding standards to deliver robust, maintainable solutions."
//         },
//         {
//             icon: BarChart,
//             title: "Business-Focused Approach",
//             description: "We don't just build websites; we build solutions that drive business growth. Every feature is designed with your business goals in mind, ensuring technology serves your strategy."
//         },
//         {
//             icon: TrendingUp,
//             title: "Scalability & Future-Proofing",
//             description: "Your application is built to grow. We design systems that scale seamlessly as your business expands, using scalable architectures and modern cloud technologies."
//         },
//         {
//             icon: Lock,
//             title: "Security First",
//             description: "Security is not an afterthought. We implement security best practices from day one, protecting your application and user data against modern threats."
//         },
//         {
//             icon: Monitor,
//             title: "Ongoing Support & Maintenance",
//             description: "Our relationship doesn't end at launch. We provide continuous support, monitoring, maintenance, and optimization to keep your application running smoothly."
//         },
//         {
//             icon: Users,
//             title: "Transparent Communication",
//             description: "We believe in keeping clients informed every step of the way. Regular updates, clear documentation, and open communication ensure you always know project status."
//         }
//     ];

//     const caseStudies = [
//         {
//             title: "E-Commerce Platform — Sales Growth Acceleration",
//             type: "Online Retailer",
//             idealCustomer: "A growing online retailer struggling with outdated technology and poor user experience.",
//             challenge: "The existing website was slow, difficult to navigate, and not mobile-friendly. Cart abandonment was high, and the platform couldn't handle traffic spikes during peak seasons.",
//             approach: "We rebuilt the entire platform using modern technology, implemented mobile-first design, optimized checkout flow, and integrated advanced analytics to track user behavior.",
//             results: [
//                 { value: "45%", label: "Increase in mobile conversion rate" },
//                 { value: "3.2s", label: "Average page load time reduction" },
//                 { value: "32%", label: "Reduction in cart abandonment" }
//             ]
//         },
//         {
//             title: "SaaS Application — Performance & Scalability",
//             type: "SaaS Startup",
//             idealCustomer: "A SaaS company experiencing rapid growth but facing performance and scalability issues.",
//             challenge: "As user base grew, the application became sluggish. Database queries were slow, infrastructure couldn't scale, and users were experiencing timeouts during peak usage.",
//             approach: "We optimized database queries, implemented caching layers, redesigned the infrastructure for horizontal scalability, and migrated to cloud-based solutions.",
//             results: [
//                 { value: "10x", label: "Improvement in query performance" },
//                 { value: "99.9%", label: "Uptime achieved with new architecture" },
//                 { value: "2x", label: "Traffic capacity without performance degradation" }
//             ]
//         },
//         {
//             title: "Corporate Website — Brand Modernization",
//             type: "Enterprise Client",
//             idealCustomer: "An established corporation needing to modernize their digital presence and improve customer engagement.",
//             challenge: "The corporate website was outdated, not reflecting the company's innovation. Poor user experience, slow performance, and limited functionality hindered customer engagement.",
//             approach: "We designed a modern, fully responsive website with interactive elements, implemented a content management system for easy updates, and integrated marketing automation tools.",
//             results: [
//                 { value: "60%", label: "Increase in website traffic" },
//                 { value: "2.5x", label: "Improvement in engagement metrics" },
//                 { value: "40%", label: "Increase in lead generation" }
//             ]
//         }
//     ];

//     const testimonials = [
//         {
//             text: "The development team completely transformed our web presence. The new website not only looks great but has significantly improved our conversion rates. Their attention to detail and commitment to quality was exceptional.",
//             author: "E-Commerce Manager"
//         },
//         {
//             text: "We appreciated their ability to understand our technical requirements and deliver exactly what we needed. The scalable architecture they built handles our growth effortlessly.",
//             author: "SaaS CTO"
//         },
//         {
//             text: "Working with this team was smooth from start to finish. They communicated clearly, met deadlines, and delivered a product that exceeded expectations. Highly recommended!",
//             author: "Project Director, Retail Company"
//         },
//         {
//             text: "Their expertise in both frontend and backend development meant we got a truly integrated solution. Performance improvements were noticeable immediately after launch.",
//             author: "Operations Lead, Tech Company"
//         },
//         {
//             text: "The post-launch support has been outstanding. They continue to optimize and improve our application, and they're always available when we need them.",
//             author: "Founder, Digital Startup"
//         }
//     ];

//     const faqItems = [
//         {
//             question: "What technologies do you use for web development?",
//             answer: "We use modern, industry-standard technologies including React, Vue, Node.js, Python, PHP, and cloud platforms like AWS, Google Cloud, and Azure. We choose technologies based on your specific project requirements and long-term scalability needs."
//         },
//         {
//             question: "How long does it take to develop a website?",
//             answer: "Timeline depends on complexity and scope. A simple website might take 4-8 weeks, while complex applications can take 3-6 months or more. We provide detailed timelines during the discovery phase and maintain transparency throughout development."
//         },
//         {
//             question: "Do you provide hosting and maintenance?",
//             answer: "Yes, we offer comprehensive hosting solutions on cloud platforms and ongoing maintenance services. Our support includes monitoring, updates, security patches, and performance optimization to keep your site running smoothly."
//         },
//         {
//             question: "Can you migrate my existing website?",
//             answer: "Absolutely. We specialize in migrating websites from outdated platforms to modern technology stacks. We ensure zero downtime, preserve SEO rankings, and often improve performance significantly during migration."
//         },
//         {
//             question: "How do you ensure website security?",
//             answer: "Security is integrated throughout our development process. We implement SSL encryption, secure authentication, regular security audits, DDoS protection, and follow OWASP guidelines. We also maintain compliance with regulations like GDPR."
//         },
//         {
//             question: "Will my website be mobile-friendly?",
//             answer: "Yes, all our websites are built with mobile-first design principles. We ensure responsive design across all devices and screen sizes, with optimized performance for mobile users."
//         },
//         {
//             question: "Do you provide SEO optimization?",
//             answer: "Yes, we implement SEO best practices including optimized site structure, fast loading times, mobile responsiveness, and technical SEO. We also integrate analytics and provide ongoing optimization recommendations."
//         },
//         {
//             question: "What happens after website launch?",
//             answer: "We provide ongoing support including maintenance, security updates, performance monitoring, and optimization. We're here to help your website succeed long after launch, with continuous improvements based on user behavior and analytics."
//         }
//     ];

//     return (
//         <div className="font-['Inter'] bg-[#FFF8F0] text-[#1A1A1A] overflow-x-hidden wd-page">
//             <style dangerouslySetInnerHTML={{
//                 __html: `
//                 .wd-page img {
//                     max-width: 100%;
//                     height: auto;
//                 }
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
//             `}} />

//             {/* Scroll Progress Bar */}
//             <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#0062ff] to-[#00734d] z-50" style={{ width: '0%' }}></div>

//             {/* Hero Section */}
//             <section className="min-h-screen flex items-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//                 <div className="absolute top-0 right-0 w-full md:w-3/5 h-full bg-gradient-to-br from-[#0062ff] to-[#00734d] clip-path-polygon opacity-10 animate-float hidden md:block"></div>
//                 <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 px-4 sm:px-6">
//                     <div className="animate-fadeInUp">
//                         <h1 className="font-['Noto_Sans'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 lg:mb-8">
//                             Web Development Agency
//                             <span className="block bg-gradient-to-br from-[#0062ff] to-[#00734d] bg-clip-text text-transparent mt-2">
//                                 in Kochi, Kerala
//                             </span>
//                         </h1>
//                         <p className="font-['Noto_Sans'] text-base sm:text-lg text-[#4B5563] mb-8 lg:mb-12 max-w-2xl">
//                             Build powerful, scalable web applications that drive business growth. From responsive websites to complex SaaS platforms, we deliver technology solutions that work as hard as you do.
//                         </p>
//                         <div className="flex flex-col sm:flex-row flex-wrap gap-4">
//                             <a
//                                 href="https://api.whatsapp.com/send/?phone=918921840486&text=Hello%2C+I+would+like+to+learn+more+about+Web+Development.&type=phone_number&app_absent=0"
//                                 className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-br from-[#0062ff] to-[#00734d] text-white font-semibold rounded-full hover:translate-y-[-3px] hover:shadow-xl transition-all text-sm sm:text-base"
//                             >
//                                 Book a Strategy Call
//                             </a>
//                             <a
//                                 href="#services"
//                                 className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-white text-[#1F2937] font-semibold rounded-full border-2 border-[#1F2937] hover:bg-[#1F2937] hover:text-white hover:translate-y-[-3px] transition-all text-sm sm:text-base"
//                             >
//                                 Explore Services
//                             </a>
//                         </div>
//                     </div>
//                     <div className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center animate-fadeInUp mt-8 md:mt-0">
//                         <div className="w-full h-full bg-gradient-to-br from-[rgba(59,130,246,0.1)] to-[rgba(16,185,129,0.1)] rounded-3xl overflow-hidden flex items-center justify-center p-4">
//                             <img
//                                 src="/assets/home/web1.webp"
//                                 alt='web-development-agency-in-kochi'
//                                 title='web-development-agency-in-kochi'
//                                 className="w-full h-full object-cover rounded-2xl"
//                                 loading="lazy"
//                                 onError={(e) => {
//                                     e.target.onerror = null;
//                                     e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%230062ff' opacity='0.1'/%3E%3Ctext x='50%' y='50%' font-family='Arial' font-size='24' fill='%230062ff' text-anchor='middle'%3EWeb Development%3C/text%3E%3C/svg%3E"
//                                 }}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* About Section */}
//             <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//                 <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//                     <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#0062ff] to-[#00734d] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
//                         About Web Development
//                     </span>
//                     <h2 className="font-['Noto_Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F2937]">Building Digital Solutions</h2>
//                 </div>
//                 <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
//                     <div>
//                         <h3 className="font-['Noto_Sans'] text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#1F2937]">Custom Web Solutions for Modern Business</h3>
//                         <p className="font-['Noto_Sans'] text-[#4B5563] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
//                             In today's digital landscape, your website is often the first impression customers have of your business. We don't just build websites—we create digital experiences that engage, convert, and grow with your business.
//                         </p>
//                         <p className="font-['Noto_Sans'] text-[#4B5563] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
//                             Our approach combines technical excellence with strategic thinking. We understand that every business is unique, so we tailor our solutions to match your specific goals, target audience, and growth trajectory.
//                         </p>
//                         <p className="font-['Noto_Sans'] text-[#4B5563] leading-relaxed text-sm sm:text-base">
//                             From responsive design and e-commerce platforms to complex SaaS applications, we have the expertise to bring your digital vision to life.
//                         </p>
//                     </div>
//                     <div className="h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-[rgba(59,130,246,0.1)] to-[rgba(16,185,129,0.1)] rounded-3xl flex items-center justify-center relative overflow-hidden p-4">
//                         <img
//                             src="/assets/home/web2.webp"
//                             alt='web-development-agency-in-kochi'
//                             title='web-development-agency-in-kochi'
//                             className="w-full h-full object-cover rounded-2xl"
//                             loading="lazy"
//                             onError={(e) => {
//                                 e.target.onerror = null;
//                                 e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%2300734d' opacity='0.1'/%3E%3Ctext x='50%' y='50%' font-family='Arial' font-size='24' fill='%2300734d' text-anchor='middle'%3EWeb Solutions%3C/text%3E%3C/svg%3E"
//                             }}
//                         />
//                     </div>
//                 </div>
//             </section>

//             {/* Services Section */}
//             <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
//                 <div className="max-w-7xl mx-auto">
//                     <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//                         <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#0062ff] to-[#00734d] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
//                             Our Services
//                         </span>
//                         <h2 className="font-['Noto_Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F2937]">Web Development Services in Kerala</h2>
//                         <p className="font-['Noto_Sans'] text-base sm:text-lg text-[#4B5563] max-w-3xl mx-auto px-4 mb-8">
//                             We offer comprehensive web development services designed to solve real business problems. From concept to launch and beyond, we're your partner in digital success.
//                         </p>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//                         {services.map((service, index) => {
//                             const Icon = service.icon;

//                             return (
//                                 <div
//                                     key={index}
//                                     className="bg-white p-4 sm:p-6 lg:p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:translate-y-[-10px] transition-all duration-400 border-2 border-transparent hover:border-[#0062ff] relative overflow-hidden group"
//                                 >
//                                     <div className="absolute inset-0 bg-gradient-to-br from-[#0062ff] to-[#00734d] opacity-0 group-hover:opacity-5 transition-opacity z-0"></div>

//                                     <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#0062ff] to-[#00734d] rounded-xl flex items-center justify-center mb-4 sm:mb-6 relative z-10">
//                                         <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
//                                     </div>

//                                     <h3 className="font-['Noto_Sans'] text-lg sm:text-xl font-bold mb-3 sm:mb-4 relative z-10 text-[#1F2937]">
//                                         {service.title}
//                                     </h3>

//                                     <p className="font-['Noto_Sans'] text-[#4B5563] mb-4 sm:mb-6 relative z-10 text-sm sm:text-base">
//                                         {service.description}
//                                     </p>

//                                     <ul className="space-y-1 sm:space-y-2 relative z-10">
//                                         {service.features.map((feature, idx) => (
//                                             <li key={idx} className="text-[#4B5563] flex items-start text-xs sm:text-sm font-['Noto_Sans']">
//                                                 <CheckCircle className="w-4 h-4 text-[#00734d] mr-2 flex-shrink-0 mt-0.5" />
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

//             {/* Why Choose Us */}
//             <section id="why-choose" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//                 <div className="mb-8 sm:mb-12 lg:mb-16">
//                     <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#0062ff] to-[#00734d] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
//                         Why Choose Us
//                     </span>
//                     <h2 className="font-['Noto_Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F2937]">Why Partner With Us</h2>
//                 </div>

//                 <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 lg:col-span-2">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
//                             {whyChooseUs.slice(0, 4).map((feature, index) => {
//                                 const Icon = feature.icon;

//                                 return (
//                                     <div
//                                         key={index}
//                                         className="bg-white p-6 sm:p-8 rounded-2xl text-center hover:shadow-lg hover:border-[#0062ff] border-2 border-transparent transition-all duration-300 group"
//                                     >
//                                         <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#0062ff] to-[#00734d] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
//                                             <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
//                                         </div>
//                                         <h3 className="font-['Noto_Sans'] text-base sm:text-lg font-bold mb-3 sm:mb-4 text-[#1F2937]">{feature.title}</h3>
//                                         <p className="font-['Noto_Sans'] text-[#4B5563] leading-relaxed text-xs sm:text-sm">{feature.description}</p>
//                                     </div>
//                                 );
//                             })}
//                         </div>

//                         <div className="sm:col-span-2 lg:col-span-1">
//                             <div className="bg-white p-6 sm:p-8 rounded-2xl text-center hover:shadow-lg hover:border-[#0062ff] border-2 border-transparent transition-all duration-300 group h-full">
//                                 <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#0062ff] to-[#00734d] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
//                                     <Monitor className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
//                                 </div>
//                                 <h3 className="font-['Noto_Sans'] text-base sm:text-lg font-bold mb-3 sm:mb-4 text-[#1F2937]">{whyChooseUs[4].title}</h3>
//                                 <p className="font-['Noto_Sans'] text-[#4B5563] leading-relaxed text-xs sm:text-sm">{whyChooseUs[4].description}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex items-center justify-center h-auto lg:col-span-1">
//                         <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
//                             <img
//                                 src='/assets/home/Eliiza.webp'
//                                 alt='web-development-agency-in-kochi'
//                                 title='web-development-agency-in-kochi'
//                                 className="w-full h-full object-cover rounded-2xl"
//                                 onError={(e) => {
//                                     e.target.onerror = null;
//                                     e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%230062ff' opacity='0.1'/%3E%3Ctext x='50%' y='50%' font-family='Arial' font-size='20' fill='%230062ff' text-anchor='middle'%3EOur Team%3C/text%3E%3C/svg%3E"
//                                 }}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Testimonials */}
//             <section id="testimonials" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//                 <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//                     <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#0062ff] to-[#00734d] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
//                         Testimonials
//                     </span>
//                     <h2 className="font-['Noto_Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F2937]">What Our Clients Say</h2>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//                     {testimonials.map((testimonial, index) => (
//                         <div key={index} className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg hover:translate-y-[-5px] transition-transform duration-300 group">
//                             <div className="text-4xl sm:text-5xl text-[#0062ff] opacity-30 mb-3 sm:mb-4 group-hover:opacity-50 transition-opacity">❝</div>
//                             <p className="font-['Noto_Sans'] text-[#4B5563] italic leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{testimonial.text}</p>
//                             <div className="font-['Noto_Sans'] font-semibold text-[#1F2937] text-sm sm:text-base">— {testimonial.author}</div>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* FAQ Section */}
//             <section id="faq" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
//                 <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//                     <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#0062ff] to-[#00734d] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
//                         FAQ
//                     </span>
//                     <h2 className="font-['Noto_Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F2937]">Frequently Asked Questions</h2>
//                 </div>
//                 <div className="space-y-3 sm:space-y-4">
//                     {faqItems.map((item, index) => (
//                         <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
//                             <button
//                                 className="w-full p-4 sm:p-6 text-left flex justify-between items-center font-['Noto_Sans'] font-semibold hover:text-[#0062ff] transition-colors text-sm sm:text-base group text-[#1F2937]"
//                                 onClick={() => toggleFaq(index)}
//                             >
//                                 <span className="text-left pr-4">{item.question}</span>
//                                 <span className={`text-xl sm:text-2xl transition-transform flex-shrink-0 ${activeFaq === index ? 'rotate-45 text-[#0062ff]' : 'text-[#4B5563] group-hover:text-[#0062ff]'}`}>+</span>
//                             </button>
//                             <div className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-96' : 'max-h-0'}`}>
//                                 <div className="p-4 sm:p-6 pt-0 font-['Noto_Sans'] text-[#4B5563] leading-relaxed text-sm sm:text-base">
//                                     {item.answer}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* CTA Section */}
//             <section id="contact" className="py-12 sm:py-16 lg:py-20 mx-4 sm:mx-6 lg:mx-8 my-8 sm:my-12 lg:my-16 bg-gradient-to-br from-[#1F2937] to-[#111827] text-white rounded-3xl text-center relative overflow-hidden">
//                 <div className="absolute -top-1/2 -right-1/10 w-64 h-64 sm:w-96 sm:h-96 bg-radial-gradient(circle, rgba(59,130,246,0.2), transparent) rounded-full animate-pulse-slow hidden sm:block"></div>
//                 <h2 className="font-['Noto_Sans'] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 relative z-10 px-4">Ready to Build Your Next Web Project?</h2>
//                 <p className="font-['Noto_Sans'] text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 relative z-10 px-4">
//                     Let's discuss your web development needs and create a solution that drives growth.
//                 </p>
//                 <a
//                     href="https://api.whatsapp.com/send/?phone=918921840486&text=Hello%2C+I+would+like+to+discuss+Web+Development+for+my+business.&type=phone_number&app_absent=0"
//                     className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white text-[#1F2937] font-semibold rounded-full hover:translate-y-[-3px] hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)] transition-all relative z-10 text-sm sm:text-base"
//                 >
//                     Book a Strategy Call
//                 </a>
//             </section>

//             {/* Scroll to Top Button */}
//             <button
//                 className={`fixed bottom-6 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#0062ff] to-[#00734d] text-white rounded-full flex items-center justify-center text-lg sm:text-xl shadow-lg hover:translate-y-[-5px] transition-all ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//                 onClick={scrollToTop}
//             >
//                 ↑
//             </button>
//             <Footer />
//         </div>
//     );
// };

// export default WebDevelopment;



import React, { useState, useRef, useEffect } from 'react';
import {
    Code,
    Globe,
    Zap,
    Smartphone,
    Database,
    Lock,
    BarChart,
    Users,
    CheckCircle,
    Layers,
    TrendingUp,
    Monitor
} from 'lucide-react';
import Footer from '../Footer';

const WebDevelopment = () => {
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

    const services = [
        {
            icon: Code,
            title: "Custom Web Applications",
            description: "We build scalable, feature-rich web applications tailored to your business needs. Using modern frameworks and best practices, we create solutions that grow with your business while maintaining clean, maintainable code architecture.",
            features: [
                "Responsive design across all devices",
                "Scalable backend infrastructure",
                "Advanced functionality and integrations",
                "Performance-optimized code"
            ]
        },
        {
            icon: Globe,
            title: "E-Commerce Solutions",
            description: "From product catalogs to complete payment integration, we develop robust e-commerce platforms that drive conversions. Our solutions include inventory management, secure transactions, and analytics to help you understand customer behavior.",
            features: [
                "Product management systems",
                "Secure payment processing",
                "Inventory and order management",
                "Customer analytics dashboard"
            ]
        },
        {
            icon: Smartphone,
            title: "Responsive Web Design",
            description: "Every website we build is fully responsive, ensuring seamless user experience across mobile, tablet, and desktop devices. We prioritize mobile-first design principles to reach your audience wherever they are.",
            features: [
                "Mobile-first approach",
                "Cross-device compatibility",
                "Fast loading times",
                "Touch-friendly interfaces"
            ]
        },
        {
            icon: Database,
            title: "Database Architecture & Management",
            description: "We design robust database systems that handle your data efficiently and securely. Our solutions are optimized for performance, scalability, and reliability, ensuring your data is always accessible and protected.",
            features: [
                "Optimized database design",
                "Data security and encryption",
                "Backup and recovery systems",
                "Performance monitoring"
            ]
        },
        {
            icon: Lock,
            title: "Security & Compliance",
            description: "Security is embedded into every layer of our development process. We implement industry-standard security practices, compliance requirements, and regular security audits to protect your application and user data.",
            features: [
                "SSL/TLS encryption",
                "GDPR and compliance adherence",
                "Regular security audits",
                "DDoS and threat protection"
            ]
        },
        {
            icon: BarChart,
            title: "Web Analytics & Optimization",
            description: "We integrate comprehensive analytics and tracking systems to monitor user behavior, track conversions, and identify optimization opportunities. Data-driven decisions lead to continuous improvement and better ROI.",
            features: [
                "Real-time analytics dashboard",
                "Conversion tracking setup",
                "User behavior analysis",
                "Performance optimization reports"
            ]
        },
        {
            icon: Zap,
            title: "Performance Optimization",
            description: "Speed matters. We optimize every aspect of your website—from code minification to image compression, caching strategies, and CDN integration—ensuring your site loads quickly and performs flawlessly.",
            features: [
                "Code optimization and minification",
                "Image and asset compression",
                "Caching strategies",
                "CDN integration for global reach"
            ]
        },
        {
            icon: Layers,
            title: "API Development & Integration",
            description: "We develop and integrate RESTful APIs and third-party services to extend your application's functionality. Our APIs are well-documented, secure, and designed for easy integration with other systems.",
            features: [
                "RESTful API design",
                "Third-party integrations",
                "Webhook implementation",
                "API documentation and SDKs"
            ]
        },
        {
            icon: Users,
            title: "User Experience (UX) Design",
            description: "Beautiful design goes hand-in-hand with functionality. We create intuitive, user-centered interfaces that guide visitors toward conversion while maintaining brand consistency and visual appeal.",
            features: [
                "Wireframing and prototyping",
                "User research and testing",
                "Accessibility compliance",
                "Conversion-focused design"
            ]
        }
    ];

    const whyChooseUs = [
        {
            icon: Code,
            title: "Technical Excellence",
            description: "Our team consists of experienced developers proficient in latest technologies and frameworks. We follow industry best practices and maintain high coding standards to deliver robust, maintainable solutions."
        },
        {
            icon: BarChart,
            title: "Business-Focused Approach",
            description: "We don't just build websites; we build solutions that drive business growth. Every feature is designed with your business goals in mind, ensuring technology serves your strategy."
        },
        {
            icon: TrendingUp,
            title: "Scalability & Future-Proofing",
            description: "Your application is built to grow. We design systems that scale seamlessly as your business expands, using scalable architectures and modern cloud technologies."
        },
        {
            icon: Lock,
            title: "Security First",
            description: "Security is not an afterthought. We implement security best practices from day one, protecting your application and user data against modern threats."
        },
        {
            icon: Monitor,
            title: "Ongoing Support & Maintenance",
            description: "Our relationship doesn't end at launch. We provide continuous support, monitoring, maintenance, and optimization to keep your application running smoothly."
        },
        {
            icon: Users,
            title: "Transparent Communication",
            description: "We believe in keeping clients informed every step of the way. Regular updates, clear documentation, and open communication ensure you always know project status."
        }
    ];

    const caseStudies = [
        {
            title: "E-Commerce Platform — Sales Growth Acceleration",
            type: "Online Retailer",
            idealCustomer: "A growing online retailer struggling with outdated technology and poor user experience.",
            challenge: "The existing website was slow, difficult to navigate, and not mobile-friendly. Cart abandonment was high, and the platform couldn't handle traffic spikes during peak seasons.",
            approach: "We rebuilt the entire platform using modern technology, implemented mobile-first design, optimized checkout flow, and integrated advanced analytics to track user behavior.",
            results: [
                { value: "45%", label: "Increase in mobile conversion rate" },
                { value: "3.2s", label: "Average page load time reduction" },
                { value: "32%", label: "Reduction in cart abandonment" }
            ]
        },
        {
            title: "SaaS Application — Performance & Scalability",
            type: "SaaS Startup",
            idealCustomer: "A SaaS company experiencing rapid growth but facing performance and scalability issues.",
            challenge: "As user base grew, the application became sluggish. Database queries were slow, infrastructure couldn't scale, and users were experiencing timeouts during peak usage.",
            approach: "We optimized database queries, implemented caching layers, redesigned the infrastructure for horizontal scalability, and migrated to cloud-based solutions.",
            results: [
                { value: "10x", label: "Improvement in query performance" },
                { value: "99.9%", label: "Uptime achieved with new architecture" },
                { value: "2x", label: "Traffic capacity without performance degradation" }
            ]
        },
        {
            title: "Corporate Website — Brand Modernization",
            type: "Enterprise Client",
            idealCustomer: "An established corporation needing to modernize their digital presence and improve customer engagement.",
            challenge: "The corporate website was outdated, not reflecting the company's innovation. Poor user experience, slow performance, and limited functionality hindered customer engagement.",
            approach: "We designed a modern, fully responsive website with interactive elements, implemented a content management system for easy updates, and integrated marketing automation tools.",
            results: [
                { value: "60%", label: "Increase in website traffic" },
                { value: "2.5x", label: "Improvement in engagement metrics" },
                { value: "40%", label: "Increase in lead generation" }
            ]
        }
    ];

    const testimonials = [
        {
            text: "The development team completely transformed our web presence. The new website not only looks great but has significantly improved our conversion rates. Their attention to detail and commitment to quality was exceptional.",
            author: "E-Commerce Manager"
        },
        {
            text: "We appreciated their ability to understand our technical requirements and deliver exactly what we needed. The scalable architecture they built handles our growth effortlessly.",
            author: "SaaS CTO"
        },
        {
            text: "Working with this team was smooth from start to finish. They communicated clearly, met deadlines, and delivered a product that exceeded expectations. Highly recommended!",
            author: "Project Director, Retail Company"
        },
        {
            text: "Their expertise in both frontend and backend development meant we got a truly integrated solution. Performance improvements were noticeable immediately after launch.",
            author: "Operations Lead, Tech Company"
        },
        {
            text: "The post-launch support has been outstanding. They continue to optimize and improve our application, and they're always available when we need them.",
            author: "Founder, Digital Startup"
        }
    ];

    const faqItems = [
        {
            question: "What technologies do you use for web development?",
            answer: "We use modern, industry-standard technologies including React, Vue, Node.js, Python, PHP, and cloud platforms like AWS, Google Cloud, and Azure. We choose technologies based on your specific project requirements and long-term scalability needs."
        },
        {
            question: "How long does it take to develop a website?",
            answer: "Timeline depends on complexity and scope. A simple website might take 4-8 weeks, while complex applications can take 3-6 months or more. We provide detailed timelines during the discovery phase and maintain transparency throughout development."
        },
        {
            question: "Do you provide hosting and maintenance?",
            answer: "Yes, we offer comprehensive hosting solutions on cloud platforms and ongoing maintenance services. Our support includes monitoring, updates, security patches, and performance optimization to keep your site running smoothly."
        },
        {
            question: "Can you migrate my existing website?",
            answer: "Absolutely. We specialize in migrating websites from outdated platforms to modern technology stacks. We ensure zero downtime, preserve SEO rankings, and often improve performance significantly during migration."
        },
        {
            question: "How do you ensure website security?",
            answer: "Security is integrated throughout our development process. We implement SSL encryption, secure authentication, regular security audits, DDoS protection, and follow OWASP guidelines. We also maintain compliance with regulations like GDPR."
        },
        {
            question: "Will my website be mobile-friendly?",
            answer: "Yes, all our websites are built with mobile-first design principles. We ensure responsive design across all devices and screen sizes, with optimized performance for mobile users."
        },
        {
            question: "Do you provide SEO optimization?",
            answer: "Yes, we implement SEO best practices including optimized site structure, fast loading times, mobile responsiveness, and technical SEO. We also integrate analytics and provide ongoing optimization recommendations."
        },
        {
            question: "What happens after website launch?",
            answer: "We provide ongoing support including maintenance, security updates, performance monitoring, and optimization. We're here to help your website succeed long after launch, with continuous improvements based on user behavior and analytics."
        }
    ];

    return (
        <div className="font-['Inter'] bg-[#FFF8F0] text-[#1A1A1A] overflow-x-hidden wd-page">
            <style dangerouslySetInnerHTML={{
                __html: `
                .wd-page img {
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
            <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#0062ff] to-[#00734d] z-50" style={{ width: '0%' }}></div>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full md:w-3/5 h-full bg-gradient-to-br from-[#0062ff] to-[#00734d] clip-path-polygon opacity-10 animate-float hidden md:block"></div>
                <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 px-4 sm:px-6">
                    <div className="animate-fadeInUp">
                        <h1 className="font-['Noto_Sans'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 lg:mb-8">
                            Web Development Agency in Kochi, Kerala
                            <span className="block bg-gradient-to-br from-[#0062ff] to-[#00734d] bg-clip-text text-transparent mt-2">
                                Trusted Digital Solutions
                            </span>
                        </h1>
                        <p className="font-['Noto_Sans'] text-base sm:text-lg text-[#4B5563] mb-8 lg:mb-12 max-w-2xl">
                            As a leading web development agency in kochi, kerala, we build powerful, scalable web applications that drive business growth. From responsive websites to complex SaaS platforms, we deliver technology solutions that work as hard as you do.
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                            <a
                                href="https://api.whatsapp.com/send/?phone=918921840486&text=Hello%2C+I+would+like+to+learn+more+about+Web+Development.&type=phone_number&app_absent=0"
                                className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-br from-[#0062ff] to-[#00734d] text-white font-semibold rounded-full hover:translate-y-[-3px] hover:shadow-xl transition-all text-sm sm:text-base"
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
                        <div className="w-full h-full bg-gradient-to-br from-[rgba(59,130,246,0.1)] to-[rgba(16,185,129,0.1)] rounded-3xl overflow-hidden flex items-center justify-center p-4">
                            <img
                                src="/assets/home/web1.webp"
                                alt='web-development-agency-in-kochi-kerala'
                                title='web-development-agency-in-kochi-kerala'
                                className="w-full h-full object-cover rounded-2xl"
                                loading="lazy"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%230062ff' opacity='0.1'/%3E%3Ctext x='50%' y='50%' font-family='Arial' font-size='24' fill='%230062ff' text-anchor='middle'%3EWeb Development%3C/text%3E%3C/svg%3E"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#0062ff] to-[#00734d] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        About Web Development
                    </span>
                    <h2 className="font-['Noto_Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F2937]">Web Development Agency in Kochi, Kerala - Building Digital Solutions</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                    <div>
                        <h3 className="font-['Noto_Sans'] text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#1F2937]">Custom Web Solutions for Modern Business</h3>
                        <p className="font-['Noto_Sans'] text-[#4B5563] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                            In today's digital landscape, your website is often the first impression customers have of your business. Our web development agency in kochi, kerala doesn't just build websites—we create digital experiences that engage, convert, and grow with your business.
                        </p>
                        <p className="font-['Noto_Sans'] text-[#4B5563] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                            Our approach combines technical excellence with strategic thinking. We understand that every business is unique, so we tailor our solutions to match your specific goals, target audience, and growth trajectory.
                        </p>
                        <p className="font-['Noto_Sans'] text-[#4B5563] leading-relaxed text-sm sm:text-base">
                            From responsive design and e-commerce platforms to complex SaaS applications, we have the expertise to bring your digital vision to life.
                        </p>
                    </div>
                    <div className="h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-[rgba(59,130,246,0.1)] to-[rgba(16,185,129,0.1)] rounded-3xl flex items-center justify-center relative overflow-hidden p-4">
                        <img
                            src="/assets/home/web2.webp"
                            alt='web-development-agency-in-kochi-kerala'
                            title='web-development-agency-in-kochi-kerala'
                            className="w-full h-full object-cover rounded-2xl"
                            loading="lazy"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%2300734d' opacity='0.1'/%3E%3Ctext x='50%' y='50%' font-family='Arial' font-size='24' fill='%2300734d' text-anchor='middle'%3EWeb Solutions%3C/text%3E%3C/svg%3E"
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#0062ff] to-[#00734d] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                            Our Services
                        </span>
                        <h2 className="font-['Noto_Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F2937]">Web Development Services - Web Development Agency in Kochi, Kerala</h2>
                        <p className="font-['Noto_Sans'] text-base sm:text-lg text-[#4B5563] max-w-3xl mx-auto px-4 mb-8">
                            As a leading web development agency in Kochi, Kerala, we offer comprehensive web development services designed to solve real business problems. From concept to launch and beyond, we're your partner in digital success.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {services.map((service, index) => {
                            const Icon = service.icon;

                            return (
                                <div
                                    key={index}
                                    className="bg-white p-4 sm:p-6 lg:p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:translate-y-[-10px] transition-all duration-400 border-2 border-transparent hover:border-[#0062ff] relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#0062ff] to-[#00734d] opacity-0 group-hover:opacity-5 transition-opacity z-0"></div>

                                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#0062ff] to-[#00734d] rounded-xl flex items-center justify-center mb-4 sm:mb-6 relative z-10">
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
                                                <CheckCircle className="w-4 h-4 text-[#00734d] mr-2 flex-shrink-0 mt-0.5" />
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
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#0062ff] to-[#00734d] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        Why Choose Us
                    </span>
                    <h2 className="font-['Noto_Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F2937]">Why Partner With Us - Web Development Agency in Kochi, Kerala</h2>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 lg:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                            {whyChooseUs.slice(0, 4).map((feature, index) => {
                                const Icon = feature.icon;

                                return (
                                    <div
                                        key={index}
                                        className="bg-white p-6 sm:p-8 rounded-2xl text-center hover:shadow-lg hover:border-[#0062ff] border-2 border-transparent transition-all duration-300 group"
                                    >
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#0062ff] to-[#00734d] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                        </div>
                                        <h3 className="font-['Noto_Sans'] text-base sm:text-lg font-bold mb-3 sm:mb-4 text-[#1F2937]">{feature.title}</h3>
                                        <p className="font-['Noto_Sans'] text-[#4B5563] leading-relaxed text-xs sm:text-sm">{feature.description}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="sm:col-span-2 lg:col-span-1">
                            <div className="bg-white p-6 sm:p-8 rounded-2xl text-center hover:shadow-lg hover:border-[#0062ff] border-2 border-transparent transition-all duration-300 group h-full">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#0062ff] to-[#00734d] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                    <Monitor className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                </div>
                                <h3 className="font-['Noto_Sans'] text-base sm:text-lg font-bold mb-3 sm:mb-4 text-[#1F2937]">{whyChooseUs[4].title}</h3>
                                <p className="font-['Noto_Sans'] text-[#4B5563] leading-relaxed text-xs sm:text-sm">{whyChooseUs[4].description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center h-auto lg:col-span-1">
                        <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src='/assets/home/Eliiza.webp'
                                alt='web-development-agency-in-kochi-kerala'
                                title='web-development-agency-in-kochi-kerala'
                                className="w-full h-full object-cover rounded-2xl"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%230062ff' opacity='0.1'/%3E%3Ctext x='50%' y='50%' font-family='Arial' font-size='20' fill='%230062ff' text-anchor='middle'%3EOur Team%3C/text%3E%3C/svg%3E"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#0062ff] to-[#00734d] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        Testimonials
                    </span>
                    <h2 className="font-['Noto_Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F2937]">What Our Clients Say About Our Web Development Agency in Kochi, Kerala</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg hover:translate-y-[-5px] transition-transform duration-300 group">
                            <div className="text-4xl sm:text-5xl text-[#0062ff] opacity-30 mb-3 sm:mb-4 group-hover:opacity-50 transition-opacity">❝</div>
                            <p className="font-['Noto_Sans'] text-[#4B5563] italic leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{testimonial.text}</p>
                            <div className="font-['Noto_Sans'] font-semibold text-[#1F2937] text-sm sm:text-base">— {testimonial.author}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#0062ff] to-[#00734d] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        FAQ
                    </span>
                    <h2 className="font-['Noto_Sans'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#1F2937]">Frequently Asked Questions About Our Web Development Agency in Kochi, Kerala</h2>
                </div>
                <div className="space-y-3 sm:space-y-4">
                    {faqItems.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <button
                                className="w-full p-4 sm:p-6 text-left flex justify-between items-center font-['Noto_Sans'] font-semibold hover:text-[#0062ff] transition-colors text-sm sm:text-base group text-[#1F2937]"
                                onClick={() => toggleFaq(index)}
                            >
                                <span className="text-left pr-4">{item.question}</span>
                                <span className={`text-xl sm:text-2xl transition-transform flex-shrink-0 ${activeFaq === index ? 'rotate-45 text-[#0062ff]' : 'text-[#4B5563] group-hover:text-[#0062ff]'}`}>+</span>
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
                <div className="absolute -top-1/2 -right-1/10 w-64 h-64 sm:w-96 sm:h-96 bg-radial-gradient(circle, rgba(59,130,246,0.2), transparent) rounded-full animate-pulse-slow hidden sm:block"></div>
                <h2 className="font-['Noto_Sans'] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 relative z-10 px-4">Transform Your Business With Our Web Development Agency in Kochi, Kerala</h2>
                <p className="font-['Noto_Sans'] text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 relative z-10 px-4">
                    Let's discuss your web development needs and create a solution that drives growth.
                </p>
                <a
                    href="https://api.whatsapp.com/send/?phone=918921840486&text=Hello%2C+I+would+like+to+discuss+Web+Development+for+my+business.&type=phone_number&app_absent=0"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white text-[#1F2937] font-semibold rounded-full hover:translate-y-[-3px] hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)] transition-all relative z-10 text-sm sm:text-base"
                >
                    Book a Strategy Call
                </a>
            </section>

            {/* Scroll to Top Button */}
            <button
                className={`fixed bottom-6 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#0062ff] to-[#00734d] text-white rounded-full flex items-center justify-center text-lg sm:text-xl shadow-lg hover:translate-y-[-5px] transition-all ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={scrollToTop}
            >
                ↑
            </button>
            <Footer />
        </div>
    );
};

export default WebDevelopment;