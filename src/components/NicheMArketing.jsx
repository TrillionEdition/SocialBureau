// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { ArrowRight, ChevronDown } from 'lucide-react';
// // // // import Footer from './Footer';
// // // // import { motion } from 'framer-motion';
// // // // import LatestBlogs from '../components/LatestBlogs';
// // // // import posts from "../data/blogs";

// // // // // Interactive Background Component (same as API marketing)
// // // // const InteractiveBackground = () => {
// // // //     const canvasRef = useRef(null);
// // // //     const animationRef = useRef(null);
// // // //     const [isMobile, setIsMobile] = React.useState(false);

// // // //     useEffect(() => {
// // // //         const checkMobile = () => setIsMobile(window.innerWidth < 768);
// // // //         checkMobile();
// // // //         window.addEventListener('resize', checkMobile);
// // // //         return () => window.removeEventListener('resize', checkMobile);
// // // //     }, []);

// // // //     useEffect(() => {
// // // //         if (isMobile) return;

// // // //         const canvas = canvasRef.current;
// // // //         const ctx = canvas.getContext('2d');

// // // //         const resizeCanvas = () => {
// // // //             canvas.width = window.innerWidth;
// // // //             canvas.height = window.innerHeight;
// // // //         };

// // // //         resizeCanvas();
// // // //         window.addEventListener('resize', resizeCanvas);

// // // //         const animate = () => {
// // // //             const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
// // // //             gradient.addColorStop(0, '#000000');
// // // //             gradient.addColorStop(0.3, '#0a1929');
// // // //             gradient.addColorStop(0.7, '#0d1b2a');
// // // //             gradient.addColorStop(1, '#000000');
// // // //             ctx.fillStyle = gradient;
// // // //             ctx.fillRect(0, 0, canvas.width, canvas.height);

// // // //             animationRef.current = requestAnimationFrame(animate);
// // // //         };

// // // //         animate();

// // // //         return () => {
// // // //             window.removeEventListener('resize', resizeCanvas);
// // // //             if (animationRef.current) cancelAnimationFrame(animationRef.current);
// // // //         };
// // // //     }, [isMobile]);

// // // //     if (isMobile) {
// // // //         return (
// // // //             <div
// // // //                 className="fixed inset-0 z-0 pointer-events-none"
// // // //                 style={{
// // // //                     background: 'linear-gradient(135deg, #000000 0%, #0a1929 30%, #0d1b2a 70%, #000000 100%)'
// // // //                 }}
// // // //             />
// // // //         );
// // // //     }

// // // //     return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
// // // // };

// // // // const NicheMarketing = () => {
// // // //     const [openFaq, setOpenFaq] = useState(null);


// // // //     const services = [
// // // //         {
// // // //             title: 'Hyper-Granular Market Research & Strategy',
// // // //             description: 'We conduct deep niche market analysis and vertical market analysis to identify high-intent opportunities. This includes target market segmentation, buyer persona optimization, and niche competitor analysis.',
// // // //             items: [
// // // //                 'Deep niche market analysis and vertical market analysis',
// // // //                 'Target market segmentation',
// // // //                 'Buyer persona optimization',
// // // //                 'Niche competitor analysis',
// // // //                 'Strategic advantage identification'
// // // //             ],
// // // //                 },
// // // //         {
// // // //             title: 'Specialized Content & Channel Management',
// // // //             description: 'We build content and distribution strategies tailored for precision engagement. Every message is designed to match audience intent and strengthen your market presence.',
// // // //             items: [
// // // //                 'Content strategies for precision engagement',
// // // //                 'LinkedIn thought leadership development',
// // // //                 'Industry-specific blog content',
// // // //                 'High-intent traffic generation',
// // // //                 'Channel-specific messaging'
// // // //             ],        },
// // // //         {
// // // //             title: 'Operational & Technical Specialization',
// // // //             description: 'Our team optimizes your niche sales funnel, analytics, and performance systems to improve conversion efficiency and ensure operational clarity.',
// // // //             items: [
// // // //                 'Niche sales funnel optimization',
// // // //                 'Analytics and performance system setup',
// // // //                 'Revenue attribution tracking',
// // // //                 'Conversion efficiency improvement',
// // // //                 'Operational clarity implementation'
// // // //             ],
// // // //         },
// // // //         {
// // // //             title: 'Community-Centric Engagement',
// // // //             description: 'We help brands build trust and loyalty through community-driven strategies focused on customer personas and retention strategies.',
// // // //             items: [
// // // //                 'Community-driven strategy development',
// // // //                 'Customer persona development',
// // // //                 'Customer retention strategies',
// // // //                 'Long-term relationship building',
// // // //                 'Customer advocacy programs'
// // // //             ],
// // // //         }
// // // //     ];

// // // //     const whyChooseUs = [
// // // //         {
// // // //             title: 'Reduced Competition Through Specialization',
// // // //             description: 'By focusing on a narrow target audience, we help your brand avoid crowded markets and compete where relevance matters most. This focused approach improves visibility and brand recall without massive ad budgets.'
// // // //         },
// // // //         {
// // // //             title: 'Efficient Marketing Spend',
// // // //             description: 'Our experience in precision targeting ensures your budget is spent only on high-intent opportunities. This reduces waste and improves cost efficiency across campaigns. Every dollar works harder because it reaches people already interested in what you offer.'
// // // //         },
// // // //         {
// // // //             title: 'Higher Customer Loyalty',
// // // //             description: 'By aligning messaging with real customer needs and behavior, we help brands build trust-driven relationships that lead to repeat engagement and retention. Satisfied customers stay longer and spend more over time.'
// // // //         },
// // // //         {
// // // //             title: 'Higher Profit Margins & ROI',
// // // //             description: 'Premium market positioning, strong niche branding, and optimized conversion paths allow businesses to attract quality leads that convert at higher value.'
// // // //         },
// // // //         {
// // // //             title: 'Operational Clarity & Efficiency',
// // // //             description: 'Our structured approach to research, execution, and optimization ensures clarity at every stage making campaigns easier to measure, refine, and scale. You\'ll always know what\'s working and why.'
// // // //         }
// // // //     ];


// // // //     const testimonials = [
// // // //         {
// // // //             name: 'Client 1',
// // // //             text: 'Working with Social Bureau transformed our marketing approach. Within three months, we reduced ad spend by 30% while building stronger authority in our market and attracting higher-quality leads.',
// // // //             avatar: 'C1'
// // // //         },
// // // //         {
// // // //             name: 'Client 2',
// // // //             text: 'Thanks to their targeted approach, our brand finally gained clarity and relevance with our ideal customers. The quality of leads and engagement improved significantly.',
// // // //             avatar: 'C2'
// // // //         },
// // // //         {
// // // //             name: 'Client 3',
// // // //             text: 'Their deep market research and segmentation gave us insights we never had before, helping us position our brand confidently in a competitive space.',
// // // //             avatar: 'C3'
// // // //         },
// // // //         {
// // // //             name: 'Client 4',
// // // //             text: 'Social Bureau helped us build authority without aggressive advertising, establishing trust with our audience over time through consistent, valuable content.',
// // // //             avatar: 'C4'
// // // //         }
// // // //     ];

// // // //     const faqs = [
// // // //         {
// // // //             question: 'What makes specialized marketing different from traditional marketing?',
// // // //             answer: 'This approach focuses on a specific, well-defined audience rather than a broad market. This allows brands to create highly relevant messaging, build authority faster, reduce competition, and achieve higher conversion efficiency compared to traditional mass marketing.'
// // // //         },
// // // //         {
// // // //             question: 'Who should choose a specialized marketing agency?',
// // // //             answer: 'Businesses offering unique products or services, focused brands, startups, and growth-stage companies benefit the most. An agency with this expertise helps such businesses position themselves clearly and attract high-intent customers who are ready to buy.'
// // // //         },
// // // //         {
// // // //             question: 'Do you work only with Kerala-based businesses?',
// // // //             answer: 'No. While we are based in Kerala with strong local expertise in markets across Kochi and the state, we work with businesses in different regions based on industry fit and growth potential.'
// // // //         },
// // // //         {
// // // //             question: 'Is this approach suitable for startups?',
// // // //             answer: 'Yes. Focused and micro niche marketing are ideal for startups because they allow concentrated growth with limited budgets by targeting audiences that are more likely to convert. You build momentum faster with less waste.'
// // // //         },
// // // //         {
// // // //             question: 'How do you identify the right target audience?',
// // // //             answer: 'We identify the right audience through market segmentation services, audience behavior analysis, buyer persona optimization, and competitive research to ensure accurate targeting. This process typically takes 2-3 weeks and involves both data analysis and customer interviews.'
// // // //         },
// // // //         {
// // // //             question: 'How long does it take to see results?',
// // // //             answer: 'Initial indicators such as engagement and lead quality may appear within a few weeks. However, building authority, trust, and sustainable growth typically takes 2-4 months depending on your industry and starting point.'
// // // //         },
// // // //         {
// // // //             question: 'Do you provide content creation services?',
// // // //             answer: 'Yes. We create specialized content aligned with your market position, customer intent, and buyer journey stages to support authority building and conversions. This includes blogs, case studies, email sequences, and social content.'
// // // //         },
// // // //         {
// // // //             question: 'How do you measure campaign success?',
// // // //             answer: 'Success is measured using metrics such as high-intent traffic, conversion rates, engagement quality, customer retention, and overall ROI. We provide monthly dashboards that show exactly how your investment is performing.'
// // // //         },
// // // //         {
// // // //             question: 'Is this approach scalable in the long term?',
// // // //             answer: 'Yes. Once a brand establishes authority and trust within a focused market, strategies can be scaled efficiently without losing relevance or efficiency. Many of our clients double their reach while maintaining or improving conversion rates.'
// // // //         },
// // // //         {
// // // //             question: 'Do you offer consultations before onboarding?',
// // // //             answer: 'Yes. We offer strategy consultations to evaluate business fit, market opportunities, and growth potential before onboarding. This ensures we\'re the right partner for your specific goals.'
// // // //         }
// // // //     ];

// // // //     const toggleFaq = (index) => {
// // // //         setOpenFaq(openFaq === index ? null : index);
// // // //     };

// // // //     return (
// // // //         <div className="relative min-h-screen">
// // // //             <InteractiveBackground />

// // // //             {/* Floating Blue Particles (changed from red to blue) */}
// // // //             <div className="absolute inset-0 pointer-events-none z-0">
// // // //                 {[...Array(20)].map((_, i) => (
// // // //                     <motion.div
// // // //                         key={i}
// // // //                         className="absolute w-1.5 h-1.5 rounded-full bg-blue-500/40"
// // // //                         initial={{ opacity: 0, scale: 0 }}
// // // //                         animate={{
// // // //                             opacity: [0, 1, 0],
// // // //                             scale: [0, 1.4, 0],
// // // //                             y: ["100%", "-20%"],
// // // //                             x: i % 2 === 0 ? ["0%", "20%"] : ["0%", "-20%"],
// // // //                         }}
// // // //                         transition={{
// // // //                             duration: 8 + i,
// // // //                             repeat: Infinity,
// // // //                             delay: i * 0.3,
// // // //                         }}
// // // //                         style={{ left: `${Math.random() * 100}%` }}
// // // //                     ></motion.div>
// // // //                 ))}
// // // //             </div>

// // // //             <div className="relative z-10">
// // // //                 {/* Hero Section */}
// // // //                 <header className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
// // // //                     <motion.div
// // // //                         initial={{ opacity: 0, scale: 1.2 }}
// // // //                         animate={{ opacity: 1, scale: 1 }}
// // // //                         transition={{ duration: 1 }}
// // // //                         className="absolute inset-0 bg-gradient-to-br from-[#0d1b2a] via-[#0a1929] to-black"
// // // //                         style={{ filter: "blur(40px)" }}
// // // //                     />

// // // //                     {/* Hero Content */}
// // // //                     <motion.div
// // // //                         initial={{ opacity: 0, y: 40 }}
// // // //                         whileInView={{ opacity: 1, y: 0 }}
// // // //                         transition={{ duration: 0.8 }}
// // // //                         className="relative z-10 max-w-5xl mx-auto text-center px-8 py-10 rounded-3xl"
// // // //                         style={{
// // // //                             background: "rgba(255,255,255,0.05)",
// // // //                             backdropFilter: "blur(22px)",
// // // //                             border: "1px solid rgba(59, 130, 246, 0.1)",
// // // //                             boxShadow: "0 0 35px rgba(59, 130, 246, 0.15)",
// // // //                         }}
// // // //                     >
// // // //                         <div className="inline-block mb-6">
// // // //                             <span className="px-5 py-2 rounded-full text-2xl font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
// // // //                                 Leading Niche Marketing Agency
// // // //                             </span>
// // // //                         </div>

// // // //                         <h1
// // // //                             style={{ fontFamily: "Playfair Display, serif" }}
// // // //                             className="text-xl md:text-7xl font-black text-white leading-tight mb-4"
// // // //                         >
// // // //                             Niche Marketing Agency in Kerala
// // // //                             <span className="block text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-blue-700 animate-pulse">
// // // //                                 Authority-driven specialized branding
// // // //                             </span>
// // // //                         </h1>

// // // //                         <motion.div
// // // //                             initial={{ width: 0 }}
// // // //                             whileInView={{ width: 70 }}
// // // //                             transition={{ duration: 0.6 }}
// // // //                             className="h-1 bg-blue-500 mx-auto rounded-full mb-6"
// // // //                         />

// // // //                         <motion.p
// // // //                             initial={{ opacity: 0, y: 20 }}
// // // //                             whileInView={{ opacity: 1, y: 0 }}
// // // //                             transition={{ delay: 0.3 }}
// // // //                             className="text-md text-gray-300 max-w-lg mx-auto"
// // // //                         >
// // // //                             Authority-driven specialized branding for businesses that want clarity, conversions, and growth. We help brands in Kerala and across the state connect with their ideal customers using data-led insights, precision targeting, and ethical execution.
// // // //                         </motion.p>

// // // //                         <div className="pt-6">
// // // //                             <motion.button
// // // //                                 whileHover={{ scale: 1.05 }}
// // // //                                 className="group mb-4 px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-3 mx-auto"
// // // //                             >
// // // //                                 <a href='/contact'>Connect us</a>
// // // //                                 <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
// // // //                             </motion.button>
// // // //                         </div>
// // // //                     </motion.div>
// // // //                 </header>

// // // //                 {/* About Section */}
// // // //                 <section className="relative text-white py-15 px-6 backdrop-blur-sm bg-black/20">
// // // //                     <div className="max-w-7xl mx-auto">
// // // //                         <div className="grid md:grid-cols-2 gap-12 items-start">
// // // //                             <div>
// // // //                                 <div className="flex md:items-center md:justify-center">
// // // //                                     <h2 className="text-3xl md:text-5xl font-bold text-center">
// // // //                                         Our Approach
// // // //                                         <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
// // // //                                             Targeted & Precise
// // // //                                         </span>
// // // //                                     </h2>
// // // //                                 </div>

// // // //                                 <div className="flex justify-center">
// // // //                                     <img 
// // // //                                         src='/assets/niche1.png'
// // // //                                         alt='Marketing Strategy' 
// // // //                                         className="max-w-80 h-67 rounded-lg shadow-lg"
// // // //                                     />
// // // //                                 </div>
// // // //                             </div>

// // // //                             <div className="space-y-6">
// // // //                                 <p className="text-lg text-gray-300 leading-relaxed">
// // // //                                     Our approach combines target audience marketing, hyper personalized marketing, and micro niche marketing to attract high-quality leads and build strong brand authority. At Social Bureau, this framework has helped many businesses across Kerala refine their market positioning, improve relevance, and achieve measurable, long-term results.
// // // //                                 </p>
// // // //                                 <p className="text-lg text-gray-300 leading-relaxed">
// // // //                                     We employ laser focus through accurate target market identification using market segmentation and audience behavior analysis. This ensures every marketing effort reaches the right people at the right time with the right message.
// // // //                                 </p>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 </section>

// // // //                 {/* Services Section */}
// // // //                 <section className="relative text-white py-24 px-6">
// // // //                     <div className="max-w-5xl mx-auto">
// // // //                         <div className="text-center mb-16">
// // // //                             <h2 className="text-4xl md:text-5xl font-bold mb-4">
// // // //                                 Our <span className="text-transparent bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text">Services</span>
// // // //                             </h2>
// // // //                             <p className="text-xl text-gray-400">Niche marketing services in Kerala</p>
// // // //                         </div>

// // // //                         <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
// // // //                             {services.map((service, index) => (
// // // //                                 <div
// // // //                                     key={index}
// // // //                                     className="relative h-[300px] [perspective:1000px] group cursor-pointer"
// // // //                                 >
// // // //                                     <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
// // // //                                         {/* Front of Card - Title and Description */}
// // // //                                         <div className="absolute inset-0 border border-gray-800 bg-black/40 backdrop-blur-lg rounded-2xl p-8 [backface-visibility:hidden]">
// // // //                                             <h3 className="text-xl font-bold mb-4 text-white border-b border-gray-800 pb-3">
// // // //                                                 {service.title}
// // // //                                             </h3>
// // // //                                             <p className="text-gray-400 text-sm leading-relaxed">
// // // //                                                 {service.description}
// // // //                                             </p>
// // // //                                         </div>

// // // //                                         {/* Back of Card - Key Features Only */}
// // // //                                         <div className="absolute inset-0 border border-blue-500/30 bg-black/70 backdrop-blur-lg rounded-2xl p-8 [backface-visibility:hidden] [transform:rotateY(180deg)]">
// // // //                                             <h3 className="text-xl font-bold mb-4 text-white border-b border-gray-800 pb-3">
// // // //                                                 {service.title}
// // // //                                             </h3>

// // // //                                             <h4 className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">
// // // //                                                 Key Features:
// // // //                                             </h4>
// // // //                                             <ul className="space-y-2">
// // // //                                                 {service.items.map((item, idx) => (
// // // //                                                     <li key={idx} className="flex items-start">
// // // //                                                         <span className="text-blue-500 text-xs mr-2 mt-1">•</span>
// // // //                                                         <span className="text-gray-300 text-xs flex-1">{item}</span>
// // // //                                                     </li>
// // // //                                                 ))}
// // // //                                             </ul>
// // // //                                         </div>
// // // //                                     </div>
// // // //                                 </div>
// // // //                             ))}
// // // //                         </div>

// // // //                         <motion.button
// // // //                             whileHover={{ scale: 1.05 }}
// // // //                             className="bg-blue-600 text-white px-6 py-3 mt-7 rounded-md hover:bg-blue-700 transition-all duration-200 flex items-center justify-center mx-auto"
// // // //                         >
// // // //                             <a href='/contact'>Schedule a Consultation</a>
// // // //                         </motion.button>
// // // //                     </div>
// // // //                 </section>

// // // //                 {/* Why Choose Us Section */}
// // // //                 <section className="relative text-white py-24 px-6 backdrop-blur-sm bg-black/20">
// // // //                     <div className="max-w-7xl mx-auto">
// // // //                         <div className="text-center mb-16">
// // // //                             <h2 className="text-4xl md:text-5xl font-bold mb-4">
// // // //                                 Why Choose <span className="text-transparent bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text">Us</span>
// // // //                             </h2>
// // // //                             <p className="text-xl text-gray-400">Depth Over Volume, Strategy Over Shortcuts</p>
// // // //                         </div>

// // // //                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
// // // //                             {whyChooseUs.map((item, index) => (
// // // //                                 <div
// // // //                                     key={index}
// // // //                                     className="relative h-[300px] [perspective:1000px] group cursor-pointer"
// // // //                                 >
// // // //                                     <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
// // // //                                         {/* Front of Card - Title Only */}
// // // //                                         <div className="absolute inset-0 border border-gray-800 bg-black/40 backdrop-blur-lg rounded-2xl p-8 flex items-center justify-center [backface-visibility:hidden] overflow-hidden">
// // // //                                             <div className="text-center">
// // // //                                                 <h3 className="text-xl font-bold text-white">
// // // //                                                     {item.title}
// // // //                                                 </h3>
// // // //                                                 <p className="text-blue-400 text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// // // //                                                     Hover to learn more
// // // //                                                 </p>
// // // //                                             </div>
// // // //                                         </div>

// // // //                                         {/* Back of Card - Description Only */}
// // // //                                         <div className="absolute inset-0 border border-blue-500/30 bg-black/70 backdrop-blur-lg rounded-2xl p-8 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden">
// // // //                                             <div className="w-full h-full flex items-center">
// // // //                                                 <p className="text-gray-300 text-sm leading-relaxed text-center">
// // // //                                                     {item.description}
// // // //                                                 </p>
// // // //                                             </div>
// // // //                                         </div>
// // // //                                     </div>
// // // //                                 </div>
// // // //                             ))}
// // // //                         </div>
// // // //                     </div>
// // // //                 </section>

// // // //                 {/* Testimonials Section */}
// // // //                 <section className="relative text-white py-24 px-6">
// // // //                     <div className="absolute inset-0 -z-10 opacity-20">
// // // //                         <motion.img
// // // //                             src="https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
// // // //                             animate={{ scale: [1, 1.1, 1] }}
// // // //                             transition={{ duration: 10, repeat: Infinity }}
// // // //                             className="w-full h-full object-cover"
// // // //                         />
// // // //                     </div>

// // // //                     <div className="max-w-7xl mx-auto">
// // // //                         <div className="text-center mb-16">
// // // //                             <h2 className="text-4xl md:text-5xl font-bold mb-4">
// // // //                                 What Our <span className="text-transparent bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text">Clients Say</span>
// // // //                             </h2>
// // // //                         </div>

// // // //                         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
// // // //                             {testimonials.map((testimonial, index) => (
// // // //                                 <motion.div
// // // //                                     key={index}
// // // //                                     whileHover={{ scale: 1.02 }}
// // // //                                     className="bg-black/30 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all"
// // // //                                 >
// // // //                                     <div className="flex items-center mb-6">
// // // //                                         <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center font-bold text-white mr-4">
// // // //                                             {testimonial.avatar}
// // // //                                         </div>
// // // //                                         <div>
// // // //                                             <h4 className="font-bold text-lg text-white">{testimonial.name}</h4>
// // // //                                         </div>
// // // //                                     </div>
// // // //                                     <p className="text-gray-300 italic">"{testimonial.text}"</p>
// // // //                                     <div className="flex mt-4">
// // // //                                         {[...Array(5)].map((_, i) => (
// // // //                                             <span key={i} className="text-blue-500">★</span>
// // // //                                         ))}
// // // //                                     </div>
// // // //                                 </motion.div>
// // // //                             ))}
// // // //                         </div>
// // // //                     </div>
// // // //                 </section>

// // // //                 <LatestBlogs posts={posts} />

// // // //                 {/* FAQ Section */}
// // // //                 <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
// // // //                     <div className="max-w-4xl mx-auto">
// // // //                         <div className="text-center mb-16">
// // // //                             <h2 className="text-4xl md:text-5xl font-bold mb-4">
// // // //                                 Frequently Asked <span className="text-transparent bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text">Questions</span>
// // // //                             </h2>
// // // //                         </div>

// // // //                         <div className="space-y-4">
// // // //                             {faqs.map((faq, index) => (
// // // //                                 <motion.div
// // // //                                     key={index}
// // // //                                     whileHover={{ scale: 1.01 }}
// // // //                                     className="bg-black/30 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all"
// // // //                                 >
// // // //                                     <button
// // // //                                         className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-900/50 transition-colors"
// // // //                                         onClick={() => toggleFaq(index)}
// // // //                                     >
// // // //                                         <h3 className="text-lg font-semibold pr-4 text-white">{faq.question}</h3>
// // // //                                         <ChevronDown
// // // //                                             size={20}
// // // //                                             className={`text-blue-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
// // // //                                         />
// // // //                                     </button>
// // // //                                     {openFaq === index && (
// // // //                                         <div className="px-6 pb-6 pt-2 border-t border-gray-800">
// // // //                                             <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
// // // //                                         </div>
// // // //                                     )}
// // // //                                 </motion.div>
// // // //                             ))}
// // // //                         </div>
// // // //                     </div>
// // // //                 </section>

// // // //                 <Footer />
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default NicheMarketing;



// // // import React, { useState, useRef } from 'react';
// // // import { ArrowRight, ChevronDown } from 'lucide-react';
// // // import { motion, useScroll, useTransform } from 'framer-motion';

// // // // Placeholder Footer Component
// // // const Footer = () => (
// // //     <footer className="bg-black border-t border-gray-800 text-gray-400 py-8 px-6 text-center">
// // //         <p>&copy; 2025 Social Bureau. All rights reserved.</p>
// // //     </footer>
// // // );

// // // // Placeholder LatestBlogs Component
// // // const LatestBlogs = ({ posts }) => (
// // //     <section className="py-24 px-6 bg-black">
// // //         <div className="max-w-7xl mx-auto">
// // //             <h2 className="text-4xl font-bold text-white mb-12">Latest Articles</h2>
// // //             <div className="grid md:grid-cols-3 gap-8">
// // //                 {posts && posts.slice(0, 3).map((post, i) => (
// // //                     <div key={i} className="bg-gray-900 rounded-lg p-6">
// // //                         <h3 className="text-white font-bold mb-2">{post.title || 'Blog Post'}</h3>
// // //                         <p className="text-gray-400 text-sm">{post.description || 'Read our latest insights...'}</p>
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //         </div>
// // //     </section>
// // // );

// // // // Interactive Background Component
// // // const InteractiveBackground = () => (
// // //     <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
// // // );

// // // const NicheMarketing = () => {
// // //     const [openFaq, setOpenFaq] = useState(null);
// // //     const servicesSectionRef = useRef(null);
// // //     const whyChooseSectionRef = useRef(null);

// // //     const { scrollYProgress: servicesProgress } = useScroll({
// // //         target: servicesSectionRef,
// // //         offset: ["start start", "end center"],
// // //     });

// // //     const servicesX = useTransform(servicesProgress, [0, 1], ["0%", "-75%"]);

// // //     const { scrollYProgress: whyChooseProgress } = useScroll({
// // //         target: whyChooseSectionRef,
// // //         offset: ["start start", "end center"],
// // //     });

// // //     const whyChooseX = useTransform(whyChooseProgress, [0, 1], ["0%", "-70%"]);

// // //     const services = [
// // //         {
// // //             icon: '🔍',
// // //             title: 'Hyper-Granular Market Research & Strategy',
// // //             description: 'We conduct deep niche market analysis and vertical market analysis to identify high-intent opportunities. This includes target market segmentation, buyer persona optimization, and niche competitor analysis.',
// // //             items: [
// // //                 'Deep niche market analysis and vertical market analysis',
// // //                 'Target market segmentation',
// // //                 'Buyer persona optimization',
// // //                 'Niche competitor analysis',
// // //                 'Strategic advantage identification'
// // //             ]
// // //         },
// // //         {
// // //             icon: '📝',
// // //             title: 'Specialized Content & Channel Management',
// // //             description: 'We build content and distribution strategies tailored for precision engagement. Every message is designed to match audience intent and strengthen your market presence.',
// // //             items: [
// // //                 'Content strategies for precision engagement',
// // //                 'LinkedIn thought leadership development',
// // //                 'Industry-specific blog content',
// // //                 'High-intent traffic generation',
// // //                 'Channel-specific messaging'
// // //             ]
// // //         },
// // //         {
// // //             icon: '⚙️',
// // //             title: 'Operational & Technical Specialization',
// // //             description: 'Our team optimizes your niche sales funnel, analytics, and performance systems to improve conversion efficiency and ensure operational clarity.',
// // //             items: [
// // //                 'Niche sales funnel optimization',
// // //                 'Analytics and performance system setup',
// // //                 'Revenue attribution tracking',
// // //                 'Conversion efficiency improvement',
// // //                 'Operational clarity implementation'
// // //             ]
// // //         },
// // //         {
// // //             icon: '🤝',
// // //             title: 'Community-Centric Engagement',
// // //             description: 'We help brands build trust and loyalty through community-driven strategies focused on customer personas and retention strategies.',
// // //             items: [
// // //                 'Community-driven strategy development',
// // //                 'Customer persona development',
// // //                 'Customer retention strategies',
// // //                 'Long-term relationship building',
// // //                 'Customer advocacy programs'
// // //             ]
// // //         }
// // //     ];

// // //     const whyChooseUs = [
// // //         {
// // //             image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop',
// // //             title: 'Reduced Competition Through Specialization',
// // //             description: 'By focusing on a narrow target audience, we help your brand avoid crowded markets and compete where relevance matters most. This focused approach improves visibility and brand recall without massive ad budgets.'
// // //         },
// // //         {
// // //             image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop',
// // //             title: 'Efficient Marketing Spend',
// // //             description: 'Our experience in precision targeting ensures your budget is spent only on high-intent opportunities. This reduces waste and improves cost efficiency across campaigns. Every dollar works harder because it reaches people already interested in what you offer.'
// // //         },
// // //         {
// // //             image: 'https://images.unsplash.com/photo-1552664202-7fda8c3c3534?w=500&h=500&fit=crop',
// // //             title: 'Higher Customer Loyalty',
// // //             description: 'By aligning messaging with real customer needs and behavior, we help brands build trust-driven relationships that lead to repeat engagement and retention. Satisfied customers stay longer and spend more over time.'
// // //         },
// // //         {
// // //             image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop',
// // //             title: 'Higher Profit Margins & ROI',
// // //             description: 'Premium market positioning, strong niche branding, and optimized conversion paths allow businesses to attract quality leads that convert at higher value.'
// // //         },
// // //         {
// // //             image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop',
// // //             title: 'Operational Clarity & Efficiency',
// // //             description: 'Our structured approach to research, execution, and optimization ensures clarity at every stage making campaigns easier to measure, refine, and scale. You\'ll always know what\'s working and why.'
// // //         }
// // //     ];

// // //     const testimonials = [
// // //         {
// // //             name: 'Client 1',
// // //             text: 'Working with Social Bureau transformed our marketing approach. Within three months, we reduced ad spend by 30% while building stronger authority in our market and attracting higher-quality leads.',
// // //             avatar: 'C1'
// // //         },
// // //         {
// // //             name: 'Client 2',
// // //             text: 'Thanks to their targeted approach, our brand finally gained clarity and relevance with our ideal customers. The quality of leads and engagement improved significantly.',
// // //             avatar: 'C2'
// // //         },
// // //         {
// // //             name: 'Client 3',
// // //             text: 'Their deep market research and segmentation gave us insights we never had before, helping us position our brand confidently in a competitive space.',
// // //             avatar: 'C3'
// // //         },
// // //         {
// // //             name: 'Client 4',
// // //             text: 'Social Bureau helped us build authority without aggressive advertising, establishing trust with our audience over time through consistent, valuable content.',
// // //             avatar: 'C4'
// // //         }
// // //     ];

// // //     const faqs = [
// // //         {
// // //             question: 'What makes specialized marketing different from traditional marketing?',
// // //             answer: 'This approach focuses on a specific, well-defined audience rather than a broad market. This allows brands to create highly relevant messaging, build authority faster, reduce competition, and achieve higher conversion efficiency compared to traditional mass marketing.'
// // //         },
// // //         {
// // //             question: 'Who should choose a specialized marketing agency?',
// // //             answer: 'Businesses offering unique products or services, focused brands, startups, and growth-stage companies benefit the most. An agency with this expertise helps such businesses position themselves clearly and attract high-intent customers who are ready to buy.'
// // //         },
// // //         {
// // //             question: 'Do you work only with Kerala-based businesses?',
// // //             answer: 'No. While we are based in Kerala with strong local expertise in markets across Kochi and the state, we work with businesses in different regions based on industry fit and growth potential.'
// // //         },
// // //         {
// // //             question: 'Is this approach suitable for startups?',
// // //             answer: 'Yes. Focused and micro niche marketing are ideal for startups because they allow concentrated growth with limited budgets by targeting audiences that are more likely to convert. You build momentum faster with less waste.'
// // //         },
// // //         {
// // //             question: 'How do you identify the right target audience?',
// // //             answer: 'We identify the right audience through market segmentation services, audience behavior analysis, buyer persona optimization, and competitive research to ensure accurate targeting. This process typically takes 2-3 weeks and involves both data analysis and customer interviews.'
// // //         },
// // //         {
// // //             question: 'How long does it take to see results?',
// // //             answer: 'Initial indicators such as engagement and lead quality may appear within a few weeks. However, building authority, trust, and sustainable growth typically takes 2-4 months depending on your industry and starting point.'
// // //         },
// // //         {
// // //             question: 'Do you provide content creation services?',
// // //             answer: 'Yes. We create specialized content aligned with your market position, customer intent, and buyer journey stages to support authority building and conversions. This includes blogs, case studies, email sequences, and social content.'
// // //         },
// // //         {
// // //             question: 'How do you measure campaign success?',
// // //             answer: 'Success is measured using metrics such as high-intent traffic, conversion rates, engagement quality, customer retention, and overall ROI. We provide monthly dashboards that show exactly how your investment is performing.'
// // //         },
// // //         {
// // //             question: 'Is this approach scalable in the long term?',
// // //             answer: 'Yes. Once a brand establishes authority and trust within a focused market, strategies can be scaled efficiently without losing relevance or efficiency. Many of our clients double their reach while maintaining or improving conversion rates.'
// // //         },
// // //         {
// // //             question: 'Do you offer consultations before onboarding?',
// // //             answer: 'Yes. We offer strategy consultations to evaluate business fit, market opportunities, and growth potential before onboarding. This ensures we\'re the right partner for your specific goals.'
// // //         }
// // //     ];

// // //     const toggleFaq = (index) => {
// // //         setOpenFaq(openFaq === index ? null : index);
// // //     };

// // //     return (
// // //         <div className="relative min-h-screen bg-black">
// // //             <InteractiveBackground />

// // //             {/* Floating Blue Particles */}
// // //             <div className="absolute inset-0 pointer-events-none z-0">
// // //                 {[...Array(20)].map((_, i) => (
// // //                     <motion.div
// // //                         key={i}
// // //                         className="absolute w-1.5 h-1.5 rounded-full bg-blue-500/40"
// // //                         initial={{ opacity: 0, scale: 0 }}
// // //                         animate={{
// // //                             opacity: [0, 1, 0],
// // //                             scale: [0, 1.4, 0],
// // //                             y: ["100%", "-20%"],
// // //                             x: i % 2 === 0 ? ["0%", "20%"] : ["0%", "-20%"],
// // //                         }}
// // //                         transition={{
// // //                             duration: 8 + i,
// // //                             repeat: Infinity,
// // //                             delay: i * 0.3,
// // //                         }}
// // //                         style={{ left: `${Math.random() * 100}%` }}
// // //                     />
// // //                 ))}
// // //             </div>

// // //             <div className="relative z-10">
// // //                 {/* Hero Section */}
// // //                 <header className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
// // //                     {/* Video Background Container */}
// // //                     <div className="absolute inset-0 w-full h-full">
// // //                         <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
// // //                         <video
// // //                             autoPlay
// // //                             muted
// // //                             loop
// // //                             className="absolute inset-0 w-full h-full object-cover opacity-30"
// // //                         >
// // //                             <source src="https://res.cloudinary.com/dtwcgfmar/video/upload/v1768452147/abstract-modern-composition-with-black-tubes-cylin-2025-12-09-11-55-49-utc_fosbnh.mp4" type="video/mp4" />
// // //                         </video>
// // //                         <div className="absolute inset-0 bg-black/50" />
// // //                         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
// // //                     </div>

// // //                     {/* Hero Content */}
// // //                     <motion.div
// // //                         initial={{ opacity: 0, y: 30 }}
// // //                         animate={{ opacity: 1, y: 0 }}
// // //                         transition={{ duration: 0.8 }}
// // //                         className="relative z-10 max-w-4xl mx-auto text-center"
// // //                     >
// // //                         <h1
// // //                             style={{ fontFamily: "'Playfair Display', serif" }}
// // //                             className="text-6xl md:text-8xl font-light text-white leading-tight mb-6"
// // //                         >
// // //                             Leading Niche
// // //                             <br />
// // //                             <span className="font-light">Marketing Agency</span>
// // //                         </h1>

// // //                         <motion.h2
// // //                             initial={{ opacity: 0, y: 20 }}
// // //                             animate={{ opacity: 1, y: 0 }}
// // //                             transition={{ delay: 0.2, duration: 0.8 }}
// // //                             className="text-xl md:text-2xl text-white mb-8 font-light tracking-wide"
// // //                         >
// // //                             Authority-driven specialized branding for businesses
// // //                             <br />
// // //                             <span className="font-light">that want clarity, conversions, and growth</span>
// // //                         </motion.h2>

// // //                         <motion.div
// // //                             initial={{ scaleX: 0 }}
// // //                             animate={{ scaleX: 1 }}
// // //                             transition={{ delay: 0.4, duration: 0.6 }}
// // //                             className="h-1 bg-white mx-auto mb-8 w-20"
// // //                         />

// // //                         <motion.p
// // //                             initial={{ opacity: 0, y: 20 }}
// // //                             animate={{ opacity: 1, y: 0 }}
// // //                             transition={{ delay: 0.3, duration: 0.8 }}
// // //                             className="text-gray-200 text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed"
// // //                         >
// // //                             Social Bureau, based in Kochi, Kerala, helps businesses achieve measurable growth through precision targeting, data-led insights, and ethical execution for brands in Kerala and across the state.
// // //                         </motion.p>

// // //                         <motion.div
// // //                             initial={{ opacity: 0, y: 20 }}
// // //                             animate={{ opacity: 1, y: 0 }}
// // //                             transition={{ delay: 0.4, duration: 0.8 }}
// // //                             className="flex flex-col sm:flex-row gap-4 justify-center items-center"
// // //                         >
// // //                             <motion.button
// // //                                 whileHover={{ scale: 1.05 }}
// // //                                 whileTap={{ scale: 0.95 }}
// // //                                 className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2"
// // //                             >
// // //                                 Connect With Us
// // //                                 <ArrowRight size={18} />
// // //                             </motion.button>

// // //                             <motion.button
// // //                                 whileHover={{ scale: 1.05 }}
// // //                                 whileTap={{ scale: 0.95 }}
// // //                                 className="px-8 py-3 bg-transparent text-white font-semibold border border-white rounded-lg hover:bg-white/10 transition-all"
// // //                             >
// // //                                 Learn More
// // //                             </motion.button>
// // //                         </motion.div>
// // //                     </motion.div>
// // //                 </header>

// // //                 {/* About Section */}
// // //                 <section className="relative text-white py-20 px-6 backdrop-blur-sm bg-black/20">
// // //                     <div className="max-w-7xl mx-auto">
// // //                         <div className="grid md:grid-cols-2 gap-12 items-start">
// // //                             <div>
// // //                                 <h2 className="text-3xl md:text-5xl font-bold text-center">
// // //                                     Our Approach
// // //                                     <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
// // //                                         Targeted & Precise
// // //                                     </span>
// // //                                 </h2>
// // //                             </div>

// // //                             <div className="space-y-6">
// // //                                 <p className="text-lg text-gray-300 leading-relaxed">
// // //                                     Our approach combines target audience marketing, hyper personalized marketing, and micro niche marketing to attract high-quality leads and build strong brand authority. At Social Bureau, this framework has helped many businesses across Kerala refine their market positioning, improve relevance, and achieve measurable, long-term results.
// // //                                 </p>
// // //                                 <p className="text-lg text-gray-300 leading-relaxed">
// // //                                     We employ laser focus through accurate target market identification using market segmentation and audience behavior analysis. This ensures every marketing effort reaches the right people at the right time with the right message.
// // //                                 </p>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 </section>

// // //                 {/* Services Section - Horizontal Scroll */}
// // //                 <section ref={servicesSectionRef} className="relative bg-black text-white h-[400vh]">
// // //                     <div className="sticky top-0 flex h-screen items-center overflow-hidden">
// // //                         <motion.div
// // //                             style={{ x: servicesX }}
// // //                             className="flex h-full gap-0"
// // //                         >
// // //                             {services.map((service, index) => (
// // //                                 <div
// // //                                     key={index}
// // //                                     className={`flex items-center min-w-fit px-[5vw] ${index === 0 ? 'pl-[10vw]' : ''}`}
// // //                                 >
// // //                                     <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-12 h-full py-20 w-[900px]">
// // //                                         {/* Service Card */}
// // //                                         <div className="relative h-[350px] w-[300px] md:w-[400px] lg:w-[450px] flex-shrink-0">
// // //                                             <div className="relative w-full h-full border border-gray-800 bg-black/40 backdrop-blur-lg rounded-2xl p-8 flex flex-col">
// // //                                                 <h4 className="text-blue-400 font-semibold text-md uppercase tracking-wider mb-4">
// // //                                                     Key Features:
// // //                                                 </h4>
// // //                                                 <ul className="space-y-2 flex-1">
// // //                                                     {service.items.map((item, idx) => (
// // //                                                         <li key={idx} className="flex items-start gap-2">
// // //                                                             <span className="text-blue-500 text-xs mt-1 flex-shrink-0">•</span>
// // //                                                             <span className="text-gray-300 text-md leading-relaxed">{item}</span>
// // //                                                         </li>
// // //                                                     ))}
// // //                                                 </ul>
// // //                                             </div>
// // //                                         </div>

// // //                                         {/* Service Info */}
// // //                                         <div className="flex flex-col max-w-[300px] lg:max-w-[400px] flex-shrink-0">
// // //                                             <div className="flex items-center gap-4 text-xs font-semibold tracking-widest text-zinc-500 mb-6 uppercase">
// // //                                                 <span>NO. {String(index + 1).padStart(2, '0')}</span>
// // //                                                 <span className="w-8 h-px bg-zinc-800" />
// // //                                                 <span>SERVICE</span>
// // //                                             </div>

// // //                                             <h2 className="text-4xl lg:text-5xl font-serif leading-tight mb-6">
// // //                                                 {service.title}
// // //                                             </h2>

// // //                                             <p className="text-zinc-400 text-sm lg:text-base leading-relaxed mb-8 font-light">
// // //                                                 {service.description}
// // //                                             </p>

// // //                                             <a
// // //                                                 href="#contact"
// // //                                                 className="group relative inline-flex items-center self-start text-[10px] tracking-[0.2em] font-bold uppercase py-2"
// // //                                             >
// // //                                                 <span className="relative z-10 transition-colors group-hover:text-blue-500">
// // //                                                     Learn More
// // //                                                 </span>
// // //                                                 <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-700 transition-all group-hover:bg-blue-500 group-hover:h-[2px]" />
// // //                                             </a>
// // //                                         </div>
// // //                                     </div>

// // //                                     {/* Divider */}
// // //                                     <div className="h-[60vh] w-px bg-zinc-900 mx-[5vw]" />
// // //                                 </div>
// // //                             ))}

// // //                             <div className="min-w-[50vw]" />
// // //                         </motion.div>
// // //                     </div>
// // //                 </section>

// // //                 {/* CTA / Contact Section */}
// // //                 <section id="contact" className="bg-black py-24 px-6">
// // //                     <div className="max-w-5xl mx-auto">
// // //                         <div className="relative border border-zinc-800 bg-black/60 backdrop-blur-xl rounded-2xl px-8 py-14 md:px-16 md:py-20 text-center shadow-2xl">

// // //                             {/* Accent Line */}
// // //                             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-blue-600 rounded-full" />

// // //                             <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6">
// // //                                 Let's Build the Future of Marketing Together
// // //                             </h3>

// // //                             <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-10">
// // //                                 Join hundreds of forward-thinking businesses using niche marketing to achieve targeted growth.
// // //                             </p>

// // //                             <motion.button
// // //                                 whileHover={{ scale: 1.05 }}
// // //                                 whileTap={{ scale: 0.97 }}
// // //                                 className="bg-blue-600 text-white px-10 py-4 rounded-md text-xs tracking-[0.25em] font-bold uppercase hover:bg-blue-700 transition-all duration-200"
// // //                             >
// // //                                 Schedule a Consultation
// // //                             </motion.button>
// // //                         </div>
// // //                     </div>
// // //                 </section>

// // //                 {/* Why Choose Us Section - Horizontal Scroll */}
// // //                 <section ref={whyChooseSectionRef} className="relative bg-black text-white h-[300vh]">
// // //                     <div className="sticky top-0 flex h-screen items-center overflow-hidden">
// // //                         <motion.div
// // //                             style={{ x: whyChooseX }}
// // //                             className="flex h-full gap-0"
// // //                         >
// // //                             {whyChooseUs.map((item, index) => (
// // //                                 <div
// // //                                     key={index}
// // //                                     className={`flex items-center min-w-fit px-[5vw] ${index === 0 ? 'pl-[10vw]' : ''}`}
// // //                                 >
// // //                                     <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-6 h-full py-20 w-[600px]">

// // //                                         {/* Info Section */}
// // //                                         <div className="flex flex-col max-w-[300px] lg:max-w-[400px] flex-shrink-0">
// // //                                             <div className="flex items-center gap-4 text-xs font-semibold tracking-widest text-zinc-500 mb-6 uppercase">
// // //                                                 <span>NO. {String(index + 1).padStart(2, '0')}</span>
// // //                                                 <span className="w-8 h-px bg-zinc-800" />
// // //                                                 <span>REASON</span>
// // //                                             </div>

// // //                                             <h2 className="text-4xl lg:text-5xl font-serif leading-tight mb-6">
// // //                                                 {item.title}
// // //                                             </h2>

// // //                                             <p className="text-zinc-400 text-sm lg:text-base leading-relaxed mb-8 font-light">
// // //                                                 {item.description}
// // //                                             </p>

// // //                                             <a
// // //                                                 href="#contact"
// // //                                                 className="group relative inline-flex items-center self-start text-[10px] tracking-[0.2em] font-bold uppercase py-2"
// // //                                             >
// // //                                                 <span className="relative z-10 transition-colors group-hover:text-blue-500">
// // //                                                     Get Started
// // //                                                 </span>
// // //                                                 <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-700 transition-all group-hover:bg-blue-500 group-hover:h-[2px]" />
// // //                                             </a>
// // //                                         </div>
// // //                                     </div>

// // //                                     {/* Divider */}
// // //                                     <div className="h-[50vh] w-px bg-zinc-900 mx-[5vw]" />
// // //                                 </div>
// // //                             ))}

// // //                             <div className="min-w-[50vw]" />
// // //                         </motion.div>
// // //                     </div>
// // //                 </section>

// // //                 {/* Testimonials Section */}
// // //                 <section className="relative text-white py-24 px-6 bg-black/40">
// // //                     <div className="max-w-7xl mx-auto">
// // //                         <div className="text-center mb-16">
// // //                             <h2 className="text-4xl md:text-5xl font-bold mb-4">
// // //                                 What Our <span className="text-transparent bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text">Clients Say</span>
// // //                             </h2>
// // //                         </div>

// // //                         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
// // //                             {testimonials.map((testimonial, index) => (
// // //                                 <motion.div
// // //                                     key={index}
// // //                                     whileHover={{ scale: 1.02 }}
// // //                                     className="bg-black/30 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all"
// // //                                 >
// // //                                     <div className="flex items-center mb-6">
// // //                                         <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center font-bold text-white mr-4">
// // //                                             {testimonial.avatar}
// // //                                         </div>
// // //                                         <h4 className="font-bold text-lg text-white">{testimonial.name}</h4>
// // //                                     </div>
// // //                                     <p className="text-gray-300 italic mb-4">"{testimonial.text}"</p>
// // //                                     <div className="flex">
// // //                                         {[...Array(5)].map((_, i) => (
// // //                                             <span key={i} className="text-blue-500">★</span>
// // //                                         ))}
// // //                                     </div>
// // //                                 </motion.div>
// // //                             ))}
// // //                         </div>
// // //                     </div>
// // //                 </section>

// // //                 {/* Latest Blogs Section */}
// // //                 <LatestBlogs posts={[]} />

// // //                 {/* FAQ Section */}
// // //                 <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
// // //                     <div className="max-w-4xl mx-auto">
// // //                         <div className="text-center mb-16">
// // //                             <h2 className="text-4xl md:text-5xl font-bold mb-4">
// // //                                 Frequently Asked <span className="text-transparent bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text">Questions</span>
// // //                             </h2>
// // //                         </div>

// // //                         <div className="space-y-4">
// // //                             {faqs.map((faq, index) => (
// // //                                 <motion.div
// // //                                     key={index}
// // //                                     whileHover={{ scale: 1.01 }}
// // //                                     className="bg-black/30 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all"
// // //                                 >
// // //                                     <button
// // //                                         className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-900/50 transition-colors"
// // //                                         onClick={() => toggleFaq(index)}
// // //                                     >
// // //                                         <h3 className="text-lg font-semibold pr-4 text-white">{faq.question}</h3>
// // //                                         <ChevronDown
// // //                                             size={20}
// // //                                             className={`text-blue-400 transition-transform duration-300 flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`}
// // //                                         />
// // //                                     </button>
// // //                                     {openFaq === index && (
// // //                                         <div className="px-6 pb-6 pt-2 border-t border-gray-800">
// // //                                             <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
// // //                                         </div>
// // //                                     )}
// // //                                 </motion.div>
// // //                             ))}
// // //                         </div>
// // //                     </div>
// // //                 </section>

// // //                 <Footer />
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default NicheMarketing;



// // import React, { useState, useRef } from 'react';
// // import { ArrowRight, ChevronDown } from 'lucide-react';
// // import { motion, useScroll, useTransform } from 'framer-motion';
// // import LatestBlogs from './LatestBlogs';

// // const Footer = () => (
// //     <footer className="bg-black border-t border-gray-800 text-gray-400 py-8 px-6 text-center text-xs sm:text-sm">
// //         <p>&copy; 2025 Social Bureau. All rights reserved.</p>
// //     </footer>
// // );

// // const InteractiveBackground = () => (
// //     <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
// // );

// // const NicheMarketing = () => {
// //     const [openFaq, setOpenFaq] = useState(null);
// //     const servicesSectionRef = useRef(null);
// //     const whyChooseSectionRef = useRef(null);

// //     const { scrollYProgress: servicesProgress } = useScroll({
// //         target: servicesSectionRef,
// //         offset: ["start start", "end center"],
// //     });

// //     const servicesX = useTransform(servicesProgress, [0, 1], ["0%", "-85%"]);

// //     const { scrollYProgress: whyChooseProgress } = useScroll({
// //         target: whyChooseSectionRef,
// //         offset: ["start start", "end center"],
// //     });

// //     const whyChooseX = useTransform(whyChooseProgress, [0, 1], ["0%", "-80%"]);

// //     const services = [
// //         {
// //             title: 'Hyper-Granular Market Research & Strategy',
// //             description: 'We conduct deep niche market analysis and vertical market analysis to identify high-intent opportunities. This includes target market segmentation, buyer persona optimization, and niche competitor analysis.',
// //             items: [
// //                 'Deep niche market analysis and vertical market analysis',
// //                 'Target market segmentation',
// //                 'Buyer persona optimization',
// //                 'Niche competitor analysis',
// //                 'Strategic advantage identification'
// //             ]
// //         },
// //         {
// //             title: 'Specialized Content & Channel Management',
// //             description: 'We build content and distribution strategies tailored for precision engagement. Every message is designed to match audience intent and strengthen your market presence.',
// //             items: [
// //                 'Content strategies for precision engagement',
// //                 'LinkedIn thought leadership development',
// //                 'Industry-specific blog content',
// //                 'High-intent traffic generation',
// //                 'Channel-specific messaging'
// //             ]
// //         },
// //         {
// //             title: 'Operational & Technical Specialization',
// //             description: 'Our team optimizes your niche sales funnel, analytics, and performance systems to improve conversion efficiency and ensure operational clarity.',
// //             items: [
// //                 'Niche sales funnel optimization',
// //                 'Analytics and performance system setup',
// //                 'Revenue attribution tracking',
// //                 'Conversion efficiency improvement',
// //                 'Operational clarity implementation'
// //             ]
// //         },
// //         {
// //             title: 'Community-Centric Engagement',
// //             description: 'We help brands build trust and loyalty through community-driven strategies focused on customer personas and retention strategies.',
// //             items: [
// //                 'Community-driven strategy development',
// //                 'Customer persona development',
// //                 'Customer retention strategies',
// //                 'Long-term relationship building',
// //                 'Customer advocacy programs'
// //             ]
// //         }
// //     ];

// //     const whyChooseUs = [
// //         {
// //             title: 'Reduced Competition Through Specialization',
// //             description: 'By focusing on a narrow target audience, we help your brand avoid crowded markets and compete where relevance matters most. This focused approach improves visibility and brand recall without massive ad budgets.'
// //         },
// //         {
// //             title: 'Efficient Marketing Spend',
// //             description: 'Our experience in precision targeting ensures your budget is spent only on high-intent opportunities. This reduces waste and improves cost efficiency across campaigns. Every dollar works harder because it reaches people already interested in what you offer.'
// //         },
// //         {
// //             title: 'Higher Customer Loyalty',
// //             description: 'By aligning messaging with real customer needs and behavior, we help brands build trust-driven relationships that lead to repeat engagement and retention. Satisfied customers stay longer and spend more over time.'
// //         },
// //         {
// //             title: 'Higher Profit Margins & ROI',
// //             description: 'Premium market positioning, strong niche branding, and optimized conversion paths allow businesses to attract quality leads that convert at higher value.'
// //         },
// //         {
// //             title: 'Operational Clarity & Efficiency',
// //             description: 'Our structured approach to research, execution, and optimization ensures clarity at every stage making campaigns easier to measure, refine, and scale. You\'ll always know what\'s working and why.'
// //         }
// //     ];

// //     const testimonials = [
// //         {
// //             name: 'Client 1',
// //             text: 'Working with Social Bureau transformed our marketing approach. Within three months, we reduced ad spend by 30% while building stronger authority in our market and attracting higher-quality leads.',
// //             avatar: 'C1'
// //         },
// //         {
// //             name: 'Client 2',
// //             text: 'Thanks to their targeted approach, our brand finally gained clarity and relevance with our ideal customers. The quality of leads and engagement improved significantly.',
// //             avatar: 'C2'
// //         },
// //         {
// //             name: 'Client 3',
// //             text: 'Their deep market research and segmentation gave us insights we never had before, helping us position our brand confidently in a competitive space.',
// //             avatar: 'C3'
// //         },
// //         {
// //             name: 'Client 4',
// //             text: 'Social Bureau helped us build authority without aggressive advertising, establishing trust with our audience over time through consistent, valuable content.',
// //             avatar: 'C4'
// //         }
// //     ];

// //     const faqs = [
// //         {
// //             question: 'What makes specialized marketing different from traditional marketing?',
// //             answer: 'This approach focuses on a specific, well-defined audience rather than a broad market. This allows brands to create highly relevant messaging, build authority faster, reduce competition, and achieve higher conversion efficiency compared to traditional mass marketing.'
// //         },
// //         {
// //             question: 'Who should choose a specialized marketing agency?',
// //             answer: 'Businesses offering unique products or services, focused brands, startups, and growth-stage companies benefit the most. An agency with this expertise helps such businesses position themselves clearly and attract high-intent customers who are ready to buy.'
// //         },
// //         {
// //             question: 'Do you work only with Kerala-based businesses?',
// //             answer: 'No. While we are based in Kerala with strong local expertise in markets across Kochi and the state, we work with businesses in different regions based on industry fit and growth potential.'
// //         },
// //         {
// //             question: 'Is this approach suitable for startups?',
// //             answer: 'Yes. Focused and micro niche marketing are ideal for startups because they allow concentrated growth with limited budgets by targeting audiences that are more likely to convert. You build momentum faster with less waste.'
// //         },
// //         {
// //             question: 'How do you identify the right target audience?',
// //             answer: 'We identify the right audience through market segmentation services, audience behavior analysis, buyer persona optimization, and competitive research to ensure accurate targeting. This process typically takes 2-3 weeks and involves both data analysis and customer interviews.'
// //         },
// //         {
// //             question: 'How long does it take to see results?',
// //             answer: 'Initial indicators such as engagement and lead quality may appear within a few weeks. However, building authority, trust, and sustainable growth typically takes 2-4 months depending on your industry and starting point.'
// //         },
// //         {
// //             question: 'Do you provide content creation services?',
// //             answer: 'Yes. We create specialized content aligned with your market position, customer intent, and buyer journey stages to support authority building and conversions. This includes blogs, case studies, email sequences, and social content.'
// //         },
// //         {
// //             question: 'How do you measure campaign success?',
// //             answer: 'Success is measured using metrics such as high-intent traffic, conversion rates, engagement quality, customer retention, and overall ROI. We provide monthly dashboards that show exactly how your investment is performing.'
// //         },
// //         {
// //             question: 'Is this approach scalable in the long term?',
// //             answer: 'Yes. Once a brand establishes authority and trust within a focused market, strategies can be scaled efficiently without losing relevance or efficiency. Many of our clients double their reach while maintaining or improving conversion rates.'
// //         },
// //         {
// //             question: 'Do you offer consultations before onboarding?',
// //             answer: 'Yes. We offer strategy consultations to evaluate business fit, market opportunities, and growth potential before onboarding. This ensures we\'re the right partner for your specific goals.'
// //         }
// //     ];

// //     return (
// //         <div className="relative min-h-screen bg-black">
// //             <InteractiveBackground />

// //             {/* Floating Blue Particles */}
// //             <div className="absolute inset-0 pointer-events-none z-0">
// //                 {[...Array(20)].map((_, i) => (
// //                     <motion.div
// //                         key={i}
// //                         className="absolute w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-blue-500/40"
// //                         initial={{ opacity: 0, scale: 0 }}
// //                         animate={{
// //                             opacity: [0, 1, 0],
// //                             scale: [0, 1.4, 0],
// //                             y: ["100%", "-20%"],
// //                             x: i % 2 === 0 ? ["0%", "20%"] : ["0%", "-20%"],
// //                         }}
// //                         transition={{ duration: 8 + i, repeat: Infinity, delay: i * 0.3 }}
// //                         style={{ left: `${Math.random() * 100}%` }}
// //                     />
// //                 ))}
// //             </div>

// //             <div className="relative z-10">
// //                 {/* Hero Section */}
// //                 <header className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
// //                     <div className="absolute inset-0 w-full h-full">
// //                         <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
// //                         <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover opacity-30">
// //                             <source src="https://res.cloudinary.com/dtwcgfmar/video/upload/v1768452147/abstract-modern-composition-with-black-tubes-cylin-2025-12-09-11-55-49-utc_fosbnh.mp4" type="video/mp4" />
// //                         </video>
// //                         <div className="absolute inset-0 bg-black/50" />
// //                         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
// //                     </div>

// //                     <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-4xl mx-auto text-center px-4">
// //                         <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-light text-white leading-tight mb-4 sm:mb-6">
// //                             Leading Niche<br /><span className="font-light">Marketing Agency</span>
// //                         </h1>

// //                         <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-6 sm:mb-8 font-light tracking-wide">
// //                             Authority-driven specialized branding for businesses
// //                             <br /><span className="font-light">that want clarity, conversions, and growth</span>
// //                         </motion.h2>

// //                         <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="h-1 bg-white mx-auto mb-6 sm:mb-8 w-16 sm:w-20" />

// //                         <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 font-light leading-relaxed">
// //                             Social Bureau, based in Kochi, Kerala, helps businesses achieve measurable growth through precision targeting, data-led insights, and ethical execution for brands in Kerala and across the state.
// //                         </motion.p>

// //                         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
// //                             <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
// //                                 Connect With Us <ArrowRight size={18} />
// //                             </motion.button>
// //                             <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-transparent text-white font-semibold border border-white rounded-lg hover:bg-white/10 transition-all text-sm sm:text-base">
// //                                 Learn More
// //                             </motion.button>
// //                         </motion.div>
// //                     </motion.div>
// //                 </header>

// //                 {/* About Section */}
// //                 <section className="relative text-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 backdrop-blur-sm bg-black/20">
// //                     <div className="max-w-7xl mx-auto">
// //                         <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
// //                             <div>
// //                                 <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
// //                                     Our Approach
// //                                     <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">Targeted & Precise</span>
// //                                 </h2>
// //                                 <div className="flex justify-center mt-6">
// //                                     <img
// //                                         src='/assets/niche1.png'
// //                                         alt='Marketing Strategy'
// //                                         className="max-w-64 sm:max-w-80 h-48 sm:h-64 rounded-lg shadow-lg"
// //                                     />
// //                                 </div>
// //                             </div>
// //                             <div className="space-y-4 sm:space-y-6">
// //                                 <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
// //                                     Our approach combines target audience marketing, hyper personalized marketing, and micro niche marketing to attract high-quality leads and build strong brand authority. At Social Bureau, this framework has helped many businesses across Kerala refine their market positioning, improve relevance, and achieve measurable, long-term results.
// //                                 </p>
// //                                 <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
// //                                     We employ laser focus through accurate target market identification using market segmentation and audience behavior analysis. This ensures every marketing effort reaches the right people at the right time with the right message.
// //                                 </p>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </section>

// //                 {/* Services Section - Horizontal Scroll */}
// //                 <section ref={servicesSectionRef} className="relative bg-black text-white h-[400vh]">
// //                     <div className="sticky top-0 flex h-screen items-center overflow-hidden">
// //                         <motion.div style={{ x: servicesX }} className="flex h-full gap-0">
// //                             {services.map((service, index) => (
// //                                 <div key={index} className={`flex items-center min-w-fit px-[2vw] sm:px-[5vw] ${index === 0 ? 'pl-[4vw] sm:pl-[10vw]' : ''}`}>
// //                                     <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-6 lg:gap-12 h-full py-12 sm:py-20 w-[550px] sm:w-[900px]">
// //                                         {/* Service Card */}
// //                                         <div className="relative h-[280px] sm:h-[350px] w-[240px] sm:w-[300px] md:w-[400px] lg:w-[450px] flex-shrink-0">
// //                                             <div className="relative w-full h-full border border-gray-800 bg-black/40 backdrop-blur-lg rounded-2xl p-4 sm:p-8 flex flex-col">
// //                                                 <h4 className="text-blue-400 font-semibold text-xs sm:text-md uppercase tracking-wider mb-3 sm:mb-4">
// //                                                     Key Features:
// //                                                 </h4>
// //                                                 <ul className="space-y-1 sm:space-y-2 flex-1">
// //                                                     {service.items.map((item, idx) => (
// //                                                         <li key={idx} className="flex items-start gap-2">
// //                                                             <span className="text-blue-500 text-xs mt-1 flex-shrink-0">•</span>
// //                                                             <span className="text-gray-300 text-xs sm:text-md leading-relaxed">{item}</span>
// //                                                         </li>
// //                                                     ))}
// //                                                 </ul>
// //                                             </div>
// //                                         </div>

// //                                         {/* Service Info */}
// //                                         <div className="flex flex-col max-w-[240px] sm:max-w-[300px] lg:max-w-[400px] flex-shrink-0 text-center sm:text-left">
// //                                             <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-4 text-xs font-semibold tracking-widest text-zinc-500 mb-3 sm:mb-6 uppercase">
// //                                                 <span>NO. {String(index + 1).padStart(2, '0')}</span>
// //                                                 <span className="w-4 sm:w-8 h-px bg-zinc-800" />
// //                                                 <span className="hidden sm:inline">SERVICE</span>
// //                                             </div>

// //                                             <h2 className="text-lg sm:text-4xl lg:text-5xl font-serif leading-tight mb-3 sm:mb-6">
// //                                                 {service.title}
// //                                             </h2>

// //                                             <p className="text-zinc-400 text-xs sm:text-sm lg:text-base leading-relaxed mb-4 sm:mb-8 font-light">
// //                                                 {service.description}
// //                                             </p>

// //                                             <div className="flex justify-center sm:justify-start">
// //                                                 <a
// //                                                     href="#contact"
// //                                                     className="group relative inline-flex items-center text-[8px] sm:text-[10px] tracking-[0.2em] font-bold uppercase py-2"
// //                                                 >
// //                                                     <span className="relative z-10 transition-colors group-hover:text-blue-500">
// //                                                         Learn More
// //                                                     </span>
// //                                                     <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-700 transition-all group-hover:bg-blue-500 group-hover:h-[2px]" />
// //                                                 </a>
// //                                             </div>
// //                                         </div>
// //                                     </div>

// //                                     {/* Divider - Show only between items */}
// //                                     {index < services.length - 1 && (
// //                                         <div className="h-[60vh] w-px bg-zinc-900 mx-[2vw] sm:mx-[5vw]" />
// //                                     )}
// //                                 </div>
// //                             ))}

// //                             {/* Extra space at the end to ensure last item is fully visible */}
// //                             <div className="min-w-[50vw] sm:min-w-[30vw] md:min-w-[20vw] lg:min-w-[15vw]" />

// //                             {/* Additional spacer specifically for mobile */}
// //                             <div className="min-w-[30vw] sm:hidden" />
// //                         </motion.div>
// //                     </div>
// //                 </section>

// //                 {/* CTA Section */}
// //                 <section id="contact" className="bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-6">
// //                     <div className="max-w-5xl mx-auto">
// //                         <div className="relative border border-zinc-800 bg-black/60 backdrop-blur-xl rounded-2xl px-6 sm:px-8 py-12 sm:py-14 md:px-16 md:py-20 text-center shadow-2xl">
// //                             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-[2px] bg-blue-600 rounded-full" />
// //                             <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-4 sm:mb-6">
// //                                 Let's Build the Future of Marketing Together
// //                             </h3>
// //                             <p className="text-zinc-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed mb-8 sm:mb-10">
// //                                 Join hundreds of forward-thinking businesses using niche marketing to achieve targeted growth.
// //                             </p>
// //                             <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto bg-blue-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-md text-xs tracking-[0.25em] font-bold uppercase hover:bg-blue-700 transition-all duration-200">
// //                                 Schedule a Consultation
// //                             </motion.button>
// //                         </div>
// //                     </div>
// //                 </section>

// //                 {/* Why Choose Us - Horizontal Scroll */}
// //                 <section ref={whyChooseSectionRef} className="relative bg-black text-white h-[300vh]">
// //                     <div className="sticky top-0 flex h-screen items-center overflow-hidden">
// //                         <motion.div style={{ x: whyChooseX }} className="flex h-full gap-0">
// //                             {whyChooseUs.map((item, index) => (
// //                                 <div key={index} className={`flex items-center min-w-fit px-[2vw] sm:px-[5vw] ${index === 0 ? 'pl-[4vw] sm:pl-[10vw]' : ''}`}>
// //                                     <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-6 lg:gap-6 h-full py-12 sm:py-20 w-[450px] sm:w-[600px]">

// //                                         {/* Info Section */}
// //                                         <div className="flex flex-col max-w-[240px] sm:max-w-[300px] lg:max-w-[400px] flex-shrink-0 text-center sm:text-left">
// //                                             <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-4 text-xs font-semibold tracking-widest text-zinc-500 mb-3 sm:mb-6 uppercase">
// //                                                 <span>NO. {String(index + 1).padStart(2, '0')}</span>
// //                                                 <span className="w-4 sm:w-8 h-px bg-zinc-800" />
// //                                                 <span className="hidden sm:inline">REASON</span>
// //                                             </div>

// //                                             <h2 className="text-lg sm:text-4xl lg:text-5xl font-serif leading-tight mb-3 sm:mb-6">{item.title}</h2>

// //                                             <p className="text-zinc-400 text-xs sm:text-sm lg:text-base leading-relaxed mb-4 sm:mb-8 font-light">{item.description}</p>

// //                                             <div className="flex justify-center sm:justify-start">
// //                                                 <a href="#contact" className="group relative inline-flex items-center text-[8px] sm:text-[10px] tracking-[0.2em] font-bold uppercase py-2">
// //                                                     <span className="relative z-10 transition-colors group-hover:text-blue-500">
// //                                                         Get Started
// //                                                     </span>
// //                                                     <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-700 transition-all group-hover:bg-blue-500 group-hover:h-[2px]" />
// //                                                 </a>
// //                                             </div>
// //                                         </div>
// //                                     </div>

// //                                     {/* Divider - Show only between items */}
// //                                     {index < whyChooseUs.length - 1 && (
// //                                         <div className="h-[50vh] w-px bg-zinc-900 mx-[2vw] sm:mx-[5vw]" />
// //                                     )}
// //                                 </div>
// //                             ))}

// //                             {/* Extra space at the end to ensure last item is fully visible */}
// //                             <div className="min-w-[50vw] sm:min-w-[30vw] md:min-w-[20vw] lg:min-w-[15vw]" />

// //                             {/* Additional spacer specifically for mobile */}
// //                             <div className="min-w-[30vw] sm:hidden" />
// //                         </motion.div>
// //                     </div>
// //                 </section>

// //                 {/* Testimonials Section */}
// //                 <section className="relative text-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-black/40">
// //                     <div className="max-w-7xl mx-auto">
// //                         <div className="text-center mb-16">
// //                             <h2 className="text-4xl md:text-5xl font-bold mb-4">
// //                                 Client <span className="text-transparent bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text">Reviews</span>
// //                             </h2>
// //                         </div>
// //                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
// //                             {testimonials.map((testimonial, index) => (
// //                                 <motion.div key={index} whileHover={{ scale: 1.02 }} className="bg-black/30 backdrop-blur-lg border border-gray-800 rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 transition-all">
// //                                     <div className="flex items-center mb-6">
// //                                         <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center font-bold text-white mr-3 sm:mr-4 text-xs sm:text-sm">
// //                                             {testimonial.avatar}
// //                                         </div>
// //                                         <h4 className="font-bold text-sm sm:text-lg text-white">{testimonial.name}</h4>
// //                                     </div>
// //                                     <p className="text-gray-300 italic mb-4 text-xs sm:text-sm">"{testimonial.text}"</p>
// //                                     <div className="flex">
// //                                         {[...Array(5)].map((_, i) => (<span key={i} className="text-blue-500 text-sm">★</span>))}
// //                                     </div>
// //                                 </motion.div>
// //                             ))}
// //                         </div>
// //                     </div>
// //                 </section>
// //                 <LatestBlogs posts={posts} />
// //                 {/* FAQ Section */}
// //                 <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-black">
// //                     <div className="max-w-4xl mx-auto">
// //                         <div className="text-center mb-12 sm:mb-16">
// //                             <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
// //                                 Frequently Asked <span className="text-transparent bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text">Questions</span>
// //                             </h2>
// //                         </div>
// //                         <div className="space-y-4">
// //                             {faqs.map((faq, index) => (
// //                                 <motion.div key={index} whileHover={{ scale: 1.01 }} className="bg-black/30 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all">
// //                                     <button className="w-full text-left p-4 sm:p-6 flex justify-between items-center hover:bg-gray-900/50 transition-colors" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
// //                                         <h3 className="text-base sm:text-lg font-semibold pr-4 text-white">{faq.question}</h3>
// //                                         <ChevronDown size={20} className={`text-blue-400 transition-transform duration-300 flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} />
// //                                     </button>
// //                                     {openFaq === index && (
// //                                         <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t border-gray-800">
// //                                             <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">{faq.answer}</p>
// //                                         </div>
// //                                     )}
// //                                 </motion.div>
// //                             ))}
// //                         </div>
// //                     </div>
// //                 </section>

// //                 <Footer />
// //             </div>
// //         </div>
// //     );
// // };

// // export default NicheMarketing;


// import React, { useState, useRef, useEffect } from 'react';
// import { BarChart3, Megaphone, Search, ShoppingCart, Target, Users, TrendingUp, Award, Zap } from 'lucide-react';

// const NicheMarketing = () => {
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

//     const CountUp = ({ end, duration = 1500, suffix = "", prefix = "" }) => {
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
//                 {prefix}
//                 {value}
//                 {suffix}
//             </span>
//         );
//     };

//     const faqItems = [
//         {
//             question: "What is niche marketing and how does it work?",
//             answer: "Niche marketing focuses on serving a clearly defined group of customers with specific needs. Instead of appealing to everyone, businesses tailor their messaging, offers, and channels to a smaller audience where relevance and engagement are higher."
//         },
//         {
//             question: "What is the different from broad marketing approaches?",
//             answer: "Broad marketing aims for reach, while niche marketing prioritizes precision. By narrowing the audience, businesses reduce competition, improve message clarity, and connect more effectively with people who are actively searching for specific solutions."
//         },
//         {
//             question: "Is niche marketing suitable only for small businesses?",
//             answer: "No. Niche marketing works for businesses of all sizes. Large brands often use it to launch specialized offerings, while smaller companies use it to compete effectively without large budgets."
//         },
//         {
//             question: "How do you identify the right niche for a business?",
//             answer: "The process involves understanding customer needs, analyzing demand patterns, studying competitors, and evaluating long-term growth potential. The right niche balances market opportunity with a brand's strengths."
//         },
//         {
//             question: "How long does it take to see results from a niche-focused strategy?",
//             answer: "Results depend on the market and execution. Early improvements in engagement may appear within weeks, while stronger outcomes like consistent leads and brand authority develop over several months."
//         },
//         {
//             question: "Can niche marketing help improve lead quality?",
//             answer: "Yes. By focusing on relevance and intent, niche marketing attracts users who are more likely to enquire, convert, and stay engaged, leading to better-quality leads rather than higher volume."
//         },
//         {
//             question: "Does niche marketing limit business growth?",
//             answer: "No. Starting with a focused audience often makes growth more sustainable. Once authority is established in one segment, businesses can expand into related areas without losing clarity."
//         },
//         {
//             question: "How does niche marketing support long-term brand value?",
//             answer: "By consistently addressing specific customer needs, brands build trust, recognition, and loyalty. Over time, this strengthens positioning and creates a competitive advantage that is difficult to replicate."
//         }
//     ];

//     const services = [
//         {
//             icon: Search,
//             title: "Market Intelligence & Research",
//             description: "Understanding a market deeply is the foundation of successful growth. We study demand patterns, buyer expectations, and competitive gaps to uncover opportunities.",
//             features: ["Target market segmentation by intent", "Audience behavior analysis", "Vertical market analysis"]
//         },
//         {
//             icon: Target,
//             title: "Strategic Positioning & Planning",
//             description: "We develop a structured strategy that aligns the brand with a clearly defined space, shaping how the business is perceived and why it stands out.",
//             features: ["Market segmentation strategy", "Target market identification", "Market positioning clarity"]
//         },
//         {
//             icon: Users,
//             title: "Audience-Focused Execution",
//             description: "Execution built around relevance. We help brands communicate with people most likely to engage, enquire, and convert at the right moment.",
//             features: ["Buyer persona optimization", "Defined customer personas", "Narrow target messaging"]
//         },
//         {
//             icon: Megaphone,
//             title: "Personalized & Product-Led Campaigns",
//             description: "For businesses offering specialized solutions, personalization becomes a growth driver. We design hyper-personalized campaigns aligned with user context.",
//             features: ["Niche product marketing", "Micro niche segmentation", "Funnel alignment"]
//         },
//         {
//             icon: TrendingUp,
//             title: "Growth & Retention Optimization",
//             description: "We continuously evaluate performance and apply structured improvements to support long-term value through continuous refinement.",
//             features: ["Competitor analysis", "Funnel optimization", "Customer retention strategies"]
//         },
//         {
//             icon: Zap,
//             title: "Demand Activation & Scalable Growth",
//             description: "Once a niche is defined, we focus on generating consistent demand without diluting positioning, ensuring sustainable growth.",
//             features: ["High-intent traffic generation", "Channel selection strategy", "Controlled expansion"]
//         }
//     ];

//     const features = [
//         {
//             icon: Award,
//             title: "Specialized Marketing Focus",
//             description: "We partner with brands that prefer clarity over volume and depth over noise. Our approach focuses on understanding specific market segments and aligning messaging to well-defined audiences for stronger engagement."
//         },
//         {
//             icon: TrendingUp,
//             title: "Authority-Driven Approach",
//             description: "Authority is built through consistency, insight, and relevance. We position brands as reliable sources within their niche by aligning messaging with real customer needs and market expectations."
//         },
//         {
//             icon: Target,
//             title: "Clear Niche Positioning",
//             description: "Strong positioning starts with clarity. We help businesses define who they serve, what problem they solve, and why their offering matters within a specific segment."
//         },
//         {
//             icon: BarChart3,
//             title: "Data-Led Decisions",
//             description: "Every strategic decision is informed by research, performance signals, and audience behavior. We rely on measurable insights to guide planning and ensure campaigns adapt to market realities."
//         },
//         {
//             icon: Search,
//             title: "Local Expertise",
//             description: "With hands-on experience in Kochi and across Kerala, we understand regional business dynamics, customer behavior, and market nuances for relevant, scalable growth."
//         }
//     ];

//     const testimonials = [
//         {
//             text: "Working with the team helped us bring clarity to our marketing. Instead of chasing volume, we started attracting enquiries that actually matched our services. The difference in lead quality was noticeable within a few months.",
//             author: "Service Business Owner"
//         },
//         {
//             text: "What stood out was their understanding of our market. The strategy wasn't generic and felt well thought out. Our messaging became more focused, and customer engagement improved steadily over time.",
//             author: "Founder, Product-Based Brand"
//         },
//         {
//             text: "They took the time to understand how our audience thinks and searches. The changes made to positioning and campaigns helped us convert existing traffic more effectively without increasing spend.",
//             author: "Marketing Lead"
//         },
//         {
//             text: "Our brand finally feels differentiated. Earlier, we struggled to explain why we were different. Now the messaging is clear, consistent, and resonates with the right customers.",
//             author: "Operations Manager"
//         },
//         {
//             text: "The process was transparent and structured. We always knew what was being done and why. The results came gradually, but they were stable and sustainable.",
//             author: "Business Consultant"
//         }
//     ];

//     const caseStudies = [
//         {
//             title: "Service-Based Brand — Qualified Lead Improvement",
//             category: "Service-Based Business",
//             challenge: "The brand relied on broad messaging and generic campaigns. While traffic was steady, enquiries lacked relevance and sales teams spent excessive time filtering unqualified leads.",
//             approach: "We conducted niche market analysis and refined target market segmentation to identify high-intent user groups. Messaging was realigned through strategic positioning.",
//             results: [
//                 { stat: "+34%", label: "Qualified Enquiries" },
//                 { stat: "+41%", label: "Lead Relevance" },
//                 { stat: "-22%", label: "Follow-up Time" }
//             ]
//         },
//         {
//             title: "Product-Focused Brand — Conversion Growth",
//             category: "Product-Based Business",
//             challenge: "The website attracted traffic from multiple sources, but conversions remained low. Visitors lacked clear intent alignment, resulting in high bounce rates.",
//             approach: "We restructured the niche sales funnel using audience behavior analysis and implemented personalized campaign execution focused on high-intent traffic.",
//             results: [
//                 { stat: "+29%", label: "Conversion Rate" },
//                 { stat: "-24%", label: "Bounce Rate" },
//                 { stat: "-18%", label: "Cost Per Acquisition" }
//             ]
//         },
//         {
//             title: "Local Business in Kochi — Niche Positioning",
//             category: "Local Business Growth",
//             challenge: "The business blended into a competitive local market with similar messaging to competitors. Visibility existed, but differentiation was minimal.",
//             approach: "We applied vertical market analysis and refined niche positioning to clarify the brand's specialization. Outreach and messaging were localized for regional relevance.",
//             results: [
//                 { stat: "+37%", label: "Qualified Local Leads" },
//                 { stat: "+21%", label: "Repeat Customer Rate" },
//                 { stat: "↑", label: "Brand Recall" }
//             ]
//         }
//     ];

//     return (
//         <div className="font-['DM_Sans'] bg-[#FFF8F0] text-[#0A0E27] overflow-x-hidden">
//             {/* Animations */}
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
//                 @keyframes fadeInLeft {
//                     from {
//                         opacity: 0;
//                         transform: translateX(-30px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateX(0);
//                     }
//                 }
//                 @keyframes fadeInRight {
//                     from {
//                         opacity: 0;
//                         transform: translateX(30px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateX(0);
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
//                 @keyframes shimmer {
//                     0% {
//                         background-position: -1000px 0;
//                     }
//                     100% {
//                         background-position: 1000px 0;
//                     }
//                 }
//                 @keyframes scaleIn {
//                     from {
//                         opacity: 0;
//                         transform: scale(0.95);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: scale(1);
//                     }
//                 }
//                 .animate-fadeInUp {
//                     animation: fadeInUp 0.8s ease-out forwards;
//                 }
//                 .animate-fadeInLeft {
//                     animation: fadeInLeft 0.8s ease-out forwards;
//                 }
//                 .animate-fadeInRight {
//                     animation: fadeInRight 0.8s ease-out forwards;
//                 }
//                 .animate-float {
//                     animation: float 6s ease-in-out infinite;
//                 }
//                 .animate-pulse-slow {
//                     animation: pulse-slow 4s ease-in-out infinite;
//                 }
//                 .animate-scaleIn {
//                     animation: scaleIn 0.6s ease-out forwards;
//                 }
//                 .clip-path-polygon {
//                     clip-path: polygon(100% 0, 100% 100%, 0 100%);
//                 }
//                 img {
//                     max-width: 100%;
//                     height: auto;
//                 }
//                 .service-card-hover:hover {
//                     box-shadow: 0 20px 40px rgba(255, 107, 53, 0.2);
//                 }
//             `}</style>

//             {/* Hero Section */}
//             <section className="min-h-screen flex items-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//                 <div className="absolute top-0 right-0 w-full md:w-3/5 h-full bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] clip-path-polygon opacity-10 animate-float hidden md:block"></div>
//                 <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 px-4 sm:px-6">
//                     <div className="animate-fadeInUp">
//                         <h1 className="font-['Syne'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 lg:mb-8">
//                             Niche Marketing Agency
//                             <span className="block bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] bg-clip-text text-transparent mt-2">
//                                 in Kerala
//                             </span>
//                         </h1>
//                         <p className="text-base sm:text-lg text-[#94A3B8] mb-8 lg:mb-12 max-w-2xl">
//                             Transform business growth by focusing on clarity, relevance, and specialization. We help brands reach audiences that actually convert—through carefully structured niche-focused strategies designed for long-term authority and sustainable results.
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
//                     <div className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center animate-fadeInRight mt-8 md:mt-0">
// <img src="assets/niche-marketing.webp" alt="niche-marketing" className="w-full h-full object-contain" />
//                     </div>
//                 </div>
//             </section>

//             {/* Stats Section */}
//             <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
//                 <div className="max-w-7xl mx-auto">
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
//                         {[
//                             { number: '34', label: 'Increase in Qualified Enquiries', suffix: '%' },
//                             { number: '41', label: 'Lead Relevance Improvement', suffix: '%' },
//                             { number: '29', label: 'Conversion Rate Growth', suffix: '%' },
//                             { number: '37', label: 'Local Leads Growth', suffix: '%' }
//                         ].map((stat, index) => (
//                             <div key={index} className="text-center p-4 sm:p-6 lg:p-8 hover:translate-y-[-5px] transition-transform relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-3/5 after:bg-gradient-to-b from-transparent via-[#94A3B8] to-transparent after:opacity-20 last:after:hidden even:after:hidden md:even:after:block">
//                                 <div className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] bg-clip-text text-transparent mb-2 sm:mb-3">
//                                     <CountUp
//                                         end={parseInt(stat.number)}
//                                         suffix={stat.suffix}
//                                     />
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
//                     <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
//                         About Us
//                     </span>
//                     <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Niche Marketing Strategy</h2>
//                 </div>
//                 <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
//                     <div className="h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-[rgba(255,107,53,0.1)] to-[rgba(78,205,196,0.1)] rounded-3xl flex items-center justify-center relative overflow-hidden p-4">
//                         <div className="w-full h-full bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] opacity-20 rounded-2xl flex items-center justify-center">
//                             <Users className="w-32 h-32 text-[#4ECDC4] opacity-30" />
//                         </div>
//                     </div>
//                     <div className="animate-fadeInRight">
//                         <h3 className="font-['Syne'] text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Focus on Clarity & Relevance</h3>
//                         <p className="text-[#94A3B8] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
//                             Niche marketing is the process of identifying a clearly defined market segment and building communication, positioning, and messaging around that audience's specific needs. Unlike broad campaigns, this approach prioritizes relevance over reach and depth over volume.
//                         </p>
//                         <p className="text-[#94A3B8] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
//                             At Social Bureau, a Kochi-based marketing agency, we work with businesses that want to grow through specialization. Our team studies how audiences think, search, and make decisions, then builds structured marketing systems that support long-term positioning and consistent demand.
//                         </p>
//                         <div className="space-y-2">
//                             <div className="flex items-start gap-3">
//                                 <span className="text-[#4ECDC4] font-bold text-lg">✓</span>
//                                 <span className="text-[#94A3B8] text-sm sm:text-base">Research-backed planning and execution</span>
//                             </div>
//                             <div className="flex items-start gap-3">
//                                 <span className="text-[#4ECDC4] font-bold text-lg">✓</span>
//                                 <span className="text-[#94A3B8] text-sm sm:text-base">Structured approach to positioning</span>
//                             </div>
//                             <div className="flex items-start gap-3">
//                                 <span className="text-[#4ECDC4] font-bold text-lg">✓</span>
//                                 <span className="text-[#94A3B8] text-sm sm:text-base">Measurable outcomes and growth</span>
//                             </div>
//                         </div>
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
//                         <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Niche Marketing Services</h2>
//                         <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl mx-auto px-4">
//                             We design and implement marketing solutions built around precision rather than assumptions. Each service is delivered with research-backed planning, structured execution, and measurable outcomes.
//                         </p>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//                         {services.map((service, index) => {
//                             const Icon = service.icon;

//                             return (
//                                 <div
//                                     key={index}
//                                     className="bg-white p-4 sm:p-6 lg:p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:translate-y-[-10px] transition-all duration-400 border-2 border-transparent hover:border-[#4ECDC4] relative overflow-hidden group service-card-hover"
//                                     style={{ animationDelay: `${index * 0.1}s` }}
//                                 >
//                                     <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] opacity-0 group-hover:opacity-5 transition-opacity z-0"></div>

//                                     <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] rounded-xl flex items-center justify-center mb-4 sm:mb-6 relative z-10">
//                                         <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
//                                     </div>

//                                     <h3 className="font-['Syne'] text-lg sm:text-xl font-bold mb-3 sm:mb-4 relative z-10">
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
//                     <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">What Sets Us Apart</h2>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//                     {features.map((feature, index) => {
//                         const Icon = feature.icon;
//                         return (
//                             <div key={index} className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl text-center hover:scale-105 hover:border-[#4ECDC4] border-2 border-transparent transition-all duration-300">
//                                 <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] text-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
//                                     <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
//                                 </div>
//                                 <h3 className="font-['Syne'] text-lg sm:text-xl font-bold mb-3 sm:mb-4">{feature.title}</h3>
//                                 <p className="text-[#94A3B8] leading-relaxed text-sm sm:text-base">{feature.description}</p>
//                             </div>
//                         );
//                     })}
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
//                         {caseStudies.map((study, index) => (
//                             <div key={index} className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg relative overflow-hidden border-l-4 border-[#FF6B35] animate-fadeInUp" style={{ animationDelay: `${index * 0.15}s` }}>
//                                 <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-[#FFF8F0] text-[#FF6B35] text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6">
//                                     {study.category}
//                                 </span>
//                                 <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold mb-6 sm:mb-8">{study.title}</h3>
//                                 <div className="mb-6 sm:mb-8">
//                                     <h4 className="font-['Syne'] text-base sm:text-lg font-semibold text-[#FF6B35] mb-2 sm:mb-3">The Challenge</h4>
//                                     <p className="text-[#94A3B8] text-sm sm:text-base">{study.challenge}</p>
//                                 </div>
//                                 <div className="mb-6 sm:mb-8">
//                                     <h4 className="font-['Syne'] text-base sm:text-lg font-semibold text-[#FF6B35] mb-2 sm:mb-3">The Approach</h4>
//                                     <p className="text-[#94A3B8] text-sm sm:text-base">{study.approach}</p>
//                                 </div>
//                                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-8 bg-[#FFF8F0] rounded-2xl">
//                                     {study.results.map((result, idx) => (
//                                         <div key={idx} className="text-center p-4">
//                                             <div className="font-['Syne'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FF6B35] mb-1 sm:mb-2">{result.stat}</div>
//                                             <div className="text-xs sm:text-sm text-[#94A3B8]">{result.label}</div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Testimonials */}
//             <section id="testimonials" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//                 <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//                     <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-br from-[#4ECDC4] to-[#FF6B35] text-white text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
//                         Testimonials
//                     </span>
//                     <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">What Our Clients Say</h2>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//                     {testimonials.map((testimonial, index) => (
//                         <div key={index} className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg hover:translate-y-[-5px] transition-transform duration-300 animate-scaleIn" style={{ animationDelay: `${index * 0.1}s` }}>
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
//                     <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
//                 </div>
//                 <div className="space-y-3 sm:space-y-4">
//                     {faqItems.map((item, index) => (
//                         <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
//                             <button
//                                 className="w-full p-4 sm:p-6 text-left flex justify-between items-center font-['Syne'] font-semibold hover:text-[#FF6B35] transition-colors text-sm sm:text-base"
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
//                 <h2 className="font-['Syne'] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 relative z-10 px-4">Ready to Build Authority in Your Niche?</h2>
//                 <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 relative z-10 px-4">
//                     Let's discuss how niche marketing can drive sustainable growth and establish clear positioning for your business.
//                 </p>
//                 <a href="https://api.whatsapp.com/send/?phone=918921840486&text=Hello%2C+I+would+like+to+learn+more.&type=phone_number&app_absent=0" className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white text-[#0A0E27] font-semibold rounded-full hover:translate-y-[-3px] hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)] transition-all relative z-10 text-sm sm:text-base">
//                     Connect With Us
//                 </a>
//             </section>

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

// export default NicheMarketing;


import React, { useState, useRef, useEffect } from 'react';
import { BarChart3, Megaphone, Search, ShoppingCart, Target, Users, TrendingUp, Award, Zap } from 'lucide-react';
import Footer from './Footer';

const NicheMarketing = () => {
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

    const CountUp = ({ end, duration = 1500, suffix = "", prefix = "" }) => {
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
                {prefix}
                {value}
                {suffix}
            </span>
        );
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

    const services = [
        {
            icon: Search,
            title: "Market Intelligence & Research",
            description: "Understanding a market deeply is the foundation of successful growth. We study demand patterns, buyer expectations, and competitive gaps to uncover opportunities.",
            features: ["Target market segmentation by intent", "Audience behavior analysis", "Vertical market analysis"]
        },
        {
            icon: Target,
            title: "Strategic Positioning & Planning",
            description: "We develop a structured strategy that aligns the brand with a clearly defined space, shaping how the business is perceived and why it stands out.",
            features: ["Market segmentation strategy", "Target market identification", "Market positioning clarity"]
        },
        {
            icon: Users,
            title: "Audience-Focused Execution",
            description: "Execution built around relevance. We help brands communicate with people most likely to engage, enquire, and convert at the right moment.",
            features: ["Buyer persona optimization", "Defined customer personas", "Narrow target messaging"]
        },
        {
            icon: Megaphone,
            title: "Personalized & Product-Led Campaigns",
            description: "For businesses offering specialized solutions, personalization becomes a growth driver. We design hyper-personalized campaigns aligned with user context.",
            features: ["Niche product marketing", "Micro niche segmentation", "Funnel alignment"]
        },
        {
            icon: TrendingUp,
            title: "Growth & Retention Optimization",
            description: "We continuously evaluate performance and apply structured improvements to support long-term value through continuous refinement.",
            features: ["Competitor analysis", "Funnel optimization", "Customer retention strategies"]
        },
        {
            icon: Zap,
            title: "Demand Activation & Scalable Growth",
            description: "Once a niche is defined, we focus on generating consistent demand without diluting positioning, ensuring sustainable growth.",
            features: ["High-intent traffic generation", "Channel selection strategy", "Controlled expansion"]
        }
    ];

    const features = [
        {
            icon: Award,
            title: "Specialized Marketing Focus",
            description: "We partner with brands that prefer clarity over volume and depth over noise. Our approach focuses on understanding specific market segments and aligning messaging to well-defined audiences for stronger engagement."
        },
        {
            icon: TrendingUp,
            title: "Authority-Driven Approach",
            description: "Authority is built through consistency, insight, and relevance. We position brands as reliable sources within their niche by aligning messaging with real customer needs and market expectations."
        },
        {
            icon: Target,
            title: "Clear Niche Positioning",
            description: "Strong positioning starts with clarity. We help businesses define who they serve, what problem they solve, and why their offering matters within a specific segment."
        },
        {
            icon: BarChart3,
            title: "Data-Led Decisions",
            description: "Every strategic decision is informed by research, performance signals, and audience behavior. We rely on measurable insights to guide planning and ensure campaigns adapt to market realities."
        },
        {
            icon: Search,
            title: "Local Expertise",
            description: "With hands-on experience in Kochi and across Kerala, we understand regional business dynamics, customer behavior, and market nuances for relevant, scalable growth."
        }
    ];

    const testimonials = [
        {
            text: "Working with the team helped us bring clarity to our marketing. Instead of chasing volume, we started attracting enquiries that actually matched our services. The difference in lead quality was noticeable within a few months.",
            author: "Service Business Owner"
        },
        {
            text: "What stood out was their understanding of our market. The strategy wasn't generic and felt well thought out. Our messaging became more focused, and customer engagement improved steadily over time.",
            author: "Founder, Product-Based Brand"
        },
        {
            text: "They took the time to understand how our audience thinks and searches. The changes made to positioning and campaigns helped us convert existing traffic more effectively without increasing spend.",
            author: "Marketing Lead"
        },
        {
            text: "Our brand finally feels differentiated. Earlier, we struggled to explain why we were different. Now the messaging is clear, consistent, and resonates with the right customers.",
            author: "Operations Manager"
        },
        {
            text: "The process was transparent and structured. We always knew what was being done and why. The results came gradually, but they were stable and sustainable.",
            author: "Business Consultant"
        }
    ];

    const caseStudies = [
        {
            title: "Service-Based Brand — Qualified Lead Improvement",
            category: "Service-Based Business",
            challenge: "The brand relied on broad messaging and generic campaigns. While traffic was steady, enquiries lacked relevance and sales teams spent excessive time filtering unqualified leads.",
            approach: "We conducted niche market analysis and refined target market segmentation to identify high-intent user groups. Messaging was realigned through strategic positioning.",
            results: [
                { stat: "+34%", label: "Qualified Enquiries" },
                { stat: "+41%", label: "Lead Relevance" },
                { stat: "-22%", label: "Follow-up Time" }
            ]
        },
        {
            title: "Product-Focused Brand — Conversion Growth",
            category: "Product-Based Business",
            challenge: "The website attracted traffic from multiple sources, but conversions remained low. Visitors lacked clear intent alignment, resulting in high bounce rates.",
            approach: "We restructured the niche sales funnel using audience behavior analysis and implemented personalized campaign execution focused on high-intent traffic.",
            results: [
                { stat: "+29%", label: "Conversion Rate" },
                { stat: "-24%", label: "Bounce Rate" },
                { stat: "-18%", label: "Cost Per Acquisition" }
            ]
        },
        {
            title: "Local Business in Kochi — Niche Positioning",
            category: "Local Business Growth",
            challenge: "The business blended into a competitive local market with similar messaging to competitors. Visibility existed, but differentiation was minimal.",
            approach: "We applied vertical market analysis and refined niche positioning to clarify the brand's specialization. Outreach and messaging were localized for regional relevance.",
            results: [
                { stat: "+37%", label: "Qualified Local Leads" },
                { stat: "+21%", label: "Repeat Customer Rate" },
                { stat: "↑", label: "Brand Recall" }
            ]
        }
    ];

    return (
        <div className="font-['Noto Sans'] bg-[#0F0F0F] text-[#F5F5F5] overflow-x-hidden">
            {/* Animations */}
            <style jsx>{`
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
                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
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
                @keyframes shimmer {
                    0% {
                        background-position: -1000px 0;
                    }
                    100% {
                        background-position: 1000px 0;
                    }
                }
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                .animate-fadeInLeft {
                    animation: fadeInLeft 0.8s ease-out forwards;
                }
                .animate-fadeInRight {
                    animation: fadeInRight 0.8s ease-out forwards;
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.6s ease-out forwards;
                }
                .clip-path-polygon {
                    clip-path: polygon(100% 0, 100% 100%, 0 100%);
                }
                img {
                    max-width: 100%;
                    height: auto;
                }
                .service-card-hover:hover {
                    box-shadow: 0 20px 40px rgba(192, 192, 192, 0.2);
                }
            `}</style>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F]">
                <div className="absolute top-0 right-0 w-full md:w-3/5 h-full bg-gradient-to-br from-[#C0C0C0] to-[#808080] clip-path-polygon opacity-5 animate-float hidden md:block"></div>
                <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 px-4 sm:px-6">
                    <div className="animate-fadeInUp">
                        <h1 className="font-['Syne'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 lg:mb-8 text-white">
                            Niche Marketing Agency
                            <span className="block bg-gradient-to-r from-[#C0C0C0] to-[#808080] bg-clip-text text-transparent mt-2">
                                in Kerala
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg text-[#BFBFBF] mb-8 lg:mb-12 max-w-2xl">
                            Transform business growth by focusing on clarity, relevance, and specialization. We help brands reach audiences that actually convert—through carefully structured niche-focused strategies designed for long-term authority and sustainable results.
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                            <a href="https://api.whatsapp.com/send/?phone=918921840486&text=Hello%2C+I+would+like+to+learn+more.&type=phone_number&app_absent=0" className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#C0C0C0] to-[#A9A9A9] text-[#0F0F0F] font-semibold rounded-full hover:translate-y-[-3px] hover:shadow-2xl hover:shadow-[#808080]/40 transition-all text-sm sm:text-base">
                                Book a Strategy Call
                            </a>
                            <a href="#services" className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-transparent text-white font-semibold rounded-full border-2 border-[#808080] hover:bg-[#1A1A1A] hover:border-[#C0C0C0] hover:translate-y-[-3px] transition-all text-sm sm:text-base">
                                Explore Services
                            </a>
                        </div>
                    </div>
                    <div className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center animate-fadeInRight mt-8 md:mt-0">
                        <img src="assets/niche-marketing.webp" alt="niche-marketing" className="w-full h-full object-contain" />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-[#1A1A1A] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20 border-t border-[#333333]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {[
                            { number: '34', label: 'Increase in Qualified Enquiries', suffix: '%' },
                            { number: '41', label: 'Lead Relevance Improvement', suffix: '%' },
                            { number: '29', label: 'Conversion Rate Growth', suffix: '%' },
                            { number: '37', label: 'Local Leads Growth', suffix: '%' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center p-4 sm:p-6 lg:p-8 hover:translate-y-[-5px] transition-transform relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-3/5 after:bg-gradient-to-b from-transparent via-[#666666] to-transparent after:opacity-20 last:after:hidden even:after:hidden md:even:after:block">
                                <div className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#E8E8E8] to-[#A9A9A9] bg-clip-text text-transparent mb-2 sm:mb-3">
                                    <CountUp
                                        end={parseInt(stat.number)}
                                        suffix={stat.suffix}
                                    />
                                </div>
                                <div className="text-xs sm:text-sm lg:text-base text-[#999999]">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-[#C0C0C0] to-[#808080] text-[#0F0F0F] text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        About Us
                    </span>
                    <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">Niche Marketing Strategy</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                    <div className="h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-[rgba(192,192,192,0.1)] to-[rgba(128,128,128,0.1)] rounded-3xl flex items-center justify-center relative overflow-hidden p-4 border border-[#333333]">
                        <img src='/assets/niche2.webp' alt="niche2" className="w-full h-full object-contain" />
                    </div>
                    <div className="animate-fadeInRight">
                        <h3 className="font-['Syne'] text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Focus on Clarity & Relevance</h3>
                        <p className="text-[#BFBFBF] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                            Niche marketing is the process of identifying a clearly defined market segment and building communication, positioning, and messaging around that audience's specific needs. Unlike broad campaigns, this approach prioritizes relevance over reach and depth over volume.
                        </p>
                        <p className="text-[#BFBFBF] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                            At Social Bureau, a Kochi-based marketing agency, we work with businesses that want to grow through specialization. Our team studies how audiences think, search, and make decisions, then builds structured marketing systems that support long-term positioning and consistent demand.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-start gap-3">
                                <span className="text-[#C0C0C0] font-bold text-lg">✓</span>
                                <span className="text-[#BFBFBF] text-sm sm:text-base">Research-backed planning and execution</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#C0C0C0] font-bold text-lg">✓</span>
                                <span className="text-[#BFBFBF] text-sm sm:text-base">Structured approach to positioning</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#C0C0C0] font-bold text-lg">✓</span>
                                <span className="text-[#BFBFBF] text-sm sm:text-base">Measurable outcomes and growth</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-[#C0C0C0] to-[#808080] text-[#0F0F0F] text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                            Our Services
                        </span>
                        <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">Niche Marketing Services</h2>
                        <p className="text-base sm:text-lg text-[#BFBFBF] max-w-3xl mx-auto px-4">
                            We design and implement marketing solutions built around precision rather than assumptions. Each service is delivered with research-backed planning, structured execution, and measurable outcomes.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {services.map((service, index) => {
                            const Icon = service.icon;

                            return (
                                <div
                                    key={index}
                                    className="bg-[#252525] p-4 sm:p-6 lg:p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:translate-y-[-10px] transition-all duration-400 border border-[#333333] hover:border-[#666666] relative overflow-hidden group service-card-hover"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#C0C0C0] to-[#808080] opacity-0 group-hover:opacity-5 transition-opacity z-0"></div>

                                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#C0C0C0] to-[#808080] rounded-xl flex items-center justify-center mb-4 sm:mb-6 relative z-10">
                                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-[#0F0F0F]" />
                                    </div>

                                    <h3 className="font-['Syne'] text-lg sm:text-xl font-bold mb-3 sm:mb-4 relative z-10 text-white">
                                        {service.title}
                                    </h3>

                                    <p className="text-[#BFBFBF] mb-4 sm:mb-6 relative z-10 text-sm sm:text-base">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-1 sm:space-y-2 relative z-10">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="text-[#BFBFBF] flex items-start text-xs sm:text-sm">
                                                <span className="text-[#C0C0C0] font-bold mr-2">✓</span>
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

            <section
                id="why-choose"
                className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
            >
                {/* Top Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">

                    {/* Left: Text Box */}
                    <div className="text-center lg:text-left">
                        <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-[#C0C0C0] to-[#808080] text-[#0F0F0F] text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                            Why Choose Us
                        </span>

                        <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
                            What Sets Us Apart
                        </h2>

                        <p className="text-[#BFBFBF] max-w-xl">
                            We blend creativity, technology, and strategy to deliver experiences
                            that truly stand out and drive results.
                        </p>
                    </div>

                    {/* Right: Image */}
                    <div className="w-full flex justify-center lg:justify-end">
                        <img
                            src="assets/hajira2.webp"
                            alt="hajira-niche-marketing-expert"
                            className="w-200px h-150px object-contain rounded-2xl"
                        />
                    </div>

                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-[#1A1A1A] p-6 sm:p-8 lg:p-10 rounded-2xl text-center hover:scale-105 border-2 border-[#333333] hover:border-[#666666] transition-all duration-300"
                            >
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#C0C0C0] to-[#808080] text-[#0F0F0F] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                                </div>
                                <h3 className="font-['Syne'] text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-[#BFBFBF] leading-relaxed text-sm sm:text-base">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>


            {/* Case Studies */}
            <section id="case-studies" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-[#C0C0C0] to-[#808080] text-[#0F0F0F] text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                            Case Studies
                        </span>
                        <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">Proven Results</h2>
                    </div>
                    <div className="space-y-8 sm:space-y-12">
                        {caseStudies.map((study, index) => (
                            <div key={index} className="bg-[#252525] rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg relative overflow-hidden border-l-4 border-[#C0C0C0] animate-fadeInUp" style={{ animationDelay: `${index * 0.15}s` }}>
                                <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-[#333333] text-[#C0C0C0] text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6">
                                    {study.category}
                                </span>
                                <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-white">{study.title}</h3>
                                <div className="mb-6 sm:mb-8">
                                    <h4 className="font-['Syne'] text-base sm:text-lg font-semibold text-[#C0C0C0] mb-2 sm:mb-3">The Challenge</h4>
                                    <p className="text-[#BFBFBF] text-sm sm:text-base">{study.challenge}</p>
                                </div>
                                <div className="mb-6 sm:mb-8">
                                    <h4 className="font-['Syne'] text-base sm:text-lg font-semibold text-[#C0C0C0] mb-2 sm:mb-3">The Approach</h4>
                                    <p className="text-[#BFBFBF] text-sm sm:text-base">{study.approach}</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-8 bg-[#333333] rounded-2xl">
                                    {study.results.map((result, idx) => (
                                        <div key={idx} className="text-center p-4">
                                            <div className="font-['Syne'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#C0C0C0] mb-1 sm:mb-2">{result.stat}</div>
                                            <div className="text-xs sm:text-sm text-[#999999]">{result.label}</div>
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
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-[#C0C0C0] to-[#808080] text-[#0F0F0F] text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        Testimonials
                    </span>
                    <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">What Our Clients Say</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-[#1A1A1A] p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg hover:translate-y-[-5px] transition-transform duration-300 border border-[#333333] animate-scaleIn" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="text-4xl sm:text-5xl text-[#666666] opacity-50 mb-3 sm:mb-4">❝</div>
                            <p className="text-[#BFBFBF] italic leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{testimonial.text}</p>
                            <div className="font-semibold text-[#E8E8E8] text-sm sm:text-base">— {testimonial.author}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-[#C0C0C0] to-[#808080] text-[#0F0F0F] text-xs sm:text-sm font-semibold uppercase tracking-wide rounded-full mb-4 sm:mb-6">
                        FAQ
                    </span>
                    <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-3 sm:space-y-4">
                    {faqItems.map((item, index) => (
                        <div key={index} className="bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#333333]">
                            <button
                                className="w-full p-4 sm:p-6 text-left flex justify-between items-center font-['Syne'] font-semibold hover:text-[#C0C0C0] transition-colors text-sm sm:text-base text-white"
                                onClick={() => toggleFaq(index)}
                            >
                                <span className="text-left pr-4">{item.question}</span>
                                <span className={`text-xl sm:text-2xl transition-transform flex-shrink-0 text-[#C0C0C0] ${activeFaq === index ? 'rotate-45' : ''}`}>+</span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                                <div className="p-4 sm:p-6 pt-0 text-[#BFBFBF] leading-relaxed text-sm sm:text-base">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="py-12 sm:py-16 lg:py-20 mx-4 sm:mx-6 lg:mx-8 my-8 sm:my-12 lg:my-16 bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] text-white rounded-3xl text-center relative overflow-hidden border border-[#333333]">
                <div className="absolute -top-1/2 -right-1/10 w-64 h-64 sm:w-96 sm:h-96 bg-radial-gradient(circle, rgba(192,192,192,0.1), transparent) rounded-full animate-pulse-slow hidden sm:block"></div>
                <h2 className="font-['Syne'] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 relative z-10 px-4 text-white">Ready to Build Authority in Your Niche?</h2>
                <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-[#BFBFBF] relative z-10 px-4">
                    Let's discuss how niche marketing can drive sustainable growth and establish clear positioning for your business.
                </p>
                <a href="https://api.whatsapp.com/send/?phone=918921840486&text=Hello%2C+I+would+like+to+learn+more.&type=phone_number&app_absent=0" className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#C0C0C0] to-[#A9A9A9] text-[#0F0F0F] font-semibold rounded-full hover:translate-y-[-3px] hover:shadow-[0_15px_40px_rgba(192,192,192,0.3)] transition-all relative z-10 text-sm sm:text-base">
                    Connect With Us
                </a>
            </section>

            {/* Scroll to Top Button */}
            <button
                className={`fixed bottom-6 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#C0C0C0] to-[#808080] text-[#0F0F0F] rounded-full flex items-center justify-center text-lg sm:text-xl shadow-lg hover:translate-y-[-5px] transition-all font-bold ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={scrollToTop}
            >
                ↑
            </button>
        </div>
    );
};

export default NicheMarketing;