// import React, { useState, useEffect, useRef } from 'react';
// import { ArrowRight, ChevronDown } from 'lucide-react';
// import Footer from './Footer';
// import { motion } from 'framer-motion';
// import LatestBlogs from '../components/LatestBlogs';
// import posts from "../data/blogs";

// // Interactive Background Component (same as API marketing)
// const InteractiveBackground = () => {
//     const canvasRef = useRef(null);
//     const animationRef = useRef(null);
//     const [isMobile, setIsMobile] = React.useState(false);

//     useEffect(() => {
//         const checkMobile = () => setIsMobile(window.innerWidth < 768);
//         checkMobile();
//         window.addEventListener('resize', checkMobile);
//         return () => window.removeEventListener('resize', checkMobile);
//     }, []);

//     useEffect(() => {
//         if (isMobile) return;

//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');

//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//         };

//         resizeCanvas();
//         window.addEventListener('resize', resizeCanvas);

//         const animate = () => {
//             const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
//             gradient.addColorStop(0, '#000000');
//             gradient.addColorStop(0.3, '#0a1929');
//             gradient.addColorStop(0.7, '#0d1b2a');
//             gradient.addColorStop(1, '#000000');
//             ctx.fillStyle = gradient;
//             ctx.fillRect(0, 0, canvas.width, canvas.height);

//             animationRef.current = requestAnimationFrame(animate);
//         };

//         animate();

//         return () => {
//             window.removeEventListener('resize', resizeCanvas);
//             if (animationRef.current) cancelAnimationFrame(animationRef.current);
//         };
//     }, [isMobile]);

//     if (isMobile) {
//         return (
//             <div
//                 className="fixed inset-0 z-0 pointer-events-none"
//                 style={{
//                     background: 'linear-gradient(135deg, #000000 0%, #0a1929 30%, #0d1b2a 70%, #000000 100%)'
//                 }}
//             />
//         );
//     }

//     return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
// };

// const NicheMarketing = () => {
//     const [openFaq, setOpenFaq] = useState(null);


//     const services = [
//         {
//             title: 'Hyper-Granular Market Research & Strategy',
//             description: 'We conduct deep niche market analysis and vertical market analysis to identify high-intent opportunities. This includes target market segmentation, buyer persona optimization, and niche competitor analysis.',
//             items: [
//                 'Deep niche market analysis and vertical market analysis',
//                 'Target market segmentation',
//                 'Buyer persona optimization',
//                 'Niche competitor analysis',
//                 'Strategic advantage identification'
//             ],
//                 },
//         {
//             title: 'Specialized Content & Channel Management',
//             description: 'We build content and distribution strategies tailored for precision engagement. Every message is designed to match audience intent and strengthen your market presence.',
//             items: [
//                 'Content strategies for precision engagement',
//                 'LinkedIn thought leadership development',
//                 'Industry-specific blog content',
//                 'High-intent traffic generation',
//                 'Channel-specific messaging'
//             ],        },
//         {
//             title: 'Operational & Technical Specialization',
//             description: 'Our team optimizes your niche sales funnel, analytics, and performance systems to improve conversion efficiency and ensure operational clarity.',
//             items: [
//                 'Niche sales funnel optimization',
//                 'Analytics and performance system setup',
//                 'Revenue attribution tracking',
//                 'Conversion efficiency improvement',
//                 'Operational clarity implementation'
//             ],
//         },
//         {
//             title: 'Community-Centric Engagement',
//             description: 'We help brands build trust and loyalty through community-driven strategies focused on customer personas and retention strategies.',
//             items: [
//                 'Community-driven strategy development',
//                 'Customer persona development',
//                 'Customer retention strategies',
//                 'Long-term relationship building',
//                 'Customer advocacy programs'
//             ],
//         }
//     ];

//     const whyChooseUs = [
//         {
//             title: 'Reduced Competition Through Specialization',
//             description: 'By focusing on a narrow target audience, we help your brand avoid crowded markets and compete where relevance matters most. This focused approach improves visibility and brand recall without massive ad budgets.'
//         },
//         {
//             title: 'Efficient Marketing Spend',
//             description: 'Our experience in precision targeting ensures your budget is spent only on high-intent opportunities. This reduces waste and improves cost efficiency across campaigns. Every dollar works harder because it reaches people already interested in what you offer.'
//         },
//         {
//             title: 'Higher Customer Loyalty',
//             description: 'By aligning messaging with real customer needs and behavior, we help brands build trust-driven relationships that lead to repeat engagement and retention. Satisfied customers stay longer and spend more over time.'
//         },
//         {
//             title: 'Higher Profit Margins & ROI',
//             description: 'Premium market positioning, strong niche branding, and optimized conversion paths allow businesses to attract quality leads that convert at higher value.'
//         },
//         {
//             title: 'Operational Clarity & Efficiency',
//             description: 'Our structured approach to research, execution, and optimization ensures clarity at every stage making campaigns easier to measure, refine, and scale. You\'ll always know what\'s working and why.'
//         }
//     ];


//     const testimonials = [
//         {
//             name: 'Client 1',
//             text: 'Working with Social Bureau transformed our marketing approach. Within three months, we reduced ad spend by 30% while building stronger authority in our market and attracting higher-quality leads.',
//             avatar: 'C1'
//         },
//         {
//             name: 'Client 2',
//             text: 'Thanks to their targeted approach, our brand finally gained clarity and relevance with our ideal customers. The quality of leads and engagement improved significantly.',
//             avatar: 'C2'
//         },
//         {
//             name: 'Client 3',
//             text: 'Their deep market research and segmentation gave us insights we never had before, helping us position our brand confidently in a competitive space.',
//             avatar: 'C3'
//         },
//         {
//             name: 'Client 4',
//             text: 'Social Bureau helped us build authority without aggressive advertising, establishing trust with our audience over time through consistent, valuable content.',
//             avatar: 'C4'
//         }
//     ];

//     const faqs = [
//         {
//             question: 'What makes specialized marketing different from traditional marketing?',
//             answer: 'This approach focuses on a specific, well-defined audience rather than a broad market. This allows brands to create highly relevant messaging, build authority faster, reduce competition, and achieve higher conversion efficiency compared to traditional mass marketing.'
//         },
//         {
//             question: 'Who should choose a specialized marketing agency?',
//             answer: 'Businesses offering unique products or services, focused brands, startups, and growth-stage companies benefit the most. An agency with this expertise helps such businesses position themselves clearly and attract high-intent customers who are ready to buy.'
//         },
//         {
//             question: 'Do you work only with Kerala-based businesses?',
//             answer: 'No. While we are based in Kerala with strong local expertise in markets across Kochi and the state, we work with businesses in different regions based on industry fit and growth potential.'
//         },
//         {
//             question: 'Is this approach suitable for startups?',
//             answer: 'Yes. Focused and micro niche marketing are ideal for startups because they allow concentrated growth with limited budgets by targeting audiences that are more likely to convert. You build momentum faster with less waste.'
//         },
//         {
//             question: 'How do you identify the right target audience?',
//             answer: 'We identify the right audience through market segmentation services, audience behavior analysis, buyer persona optimization, and competitive research to ensure accurate targeting. This process typically takes 2-3 weeks and involves both data analysis and customer interviews.'
//         },
//         {
//             question: 'How long does it take to see results?',
//             answer: 'Initial indicators such as engagement and lead quality may appear within a few weeks. However, building authority, trust, and sustainable growth typically takes 2-4 months depending on your industry and starting point.'
//         },
//         {
//             question: 'Do you provide content creation services?',
//             answer: 'Yes. We create specialized content aligned with your market position, customer intent, and buyer journey stages to support authority building and conversions. This includes blogs, case studies, email sequences, and social content.'
//         },
//         {
//             question: 'How do you measure campaign success?',
//             answer: 'Success is measured using metrics such as high-intent traffic, conversion rates, engagement quality, customer retention, and overall ROI. We provide monthly dashboards that show exactly how your investment is performing.'
//         },
//         {
//             question: 'Is this approach scalable in the long term?',
//             answer: 'Yes. Once a brand establishes authority and trust within a focused market, strategies can be scaled efficiently without losing relevance or efficiency. Many of our clients double their reach while maintaining or improving conversion rates.'
//         },
//         {
//             question: 'Do you offer consultations before onboarding?',
//             answer: 'Yes. We offer strategy consultations to evaluate business fit, market opportunities, and growth potential before onboarding. This ensures we\'re the right partner for your specific goals.'
//         }
//     ];

//     const toggleFaq = (index) => {
//         setOpenFaq(openFaq === index ? null : index);
//     };

//     return (
//         <div className="relative min-h-screen">
//             <InteractiveBackground />

//             {/* Floating Blue Particles (changed from red to blue) */}
//             <div className="absolute inset-0 pointer-events-none z-0">
//                 {[...Array(20)].map((_, i) => (
//                     <motion.div
//                         key={i}
//                         className="absolute w-1.5 h-1.5 rounded-full bg-blue-500/40"
//                         initial={{ opacity: 0, scale: 0 }}
//                         animate={{
//                             opacity: [0, 1, 0],
//                             scale: [0, 1.4, 0],
//                             y: ["100%", "-20%"],
//                             x: i % 2 === 0 ? ["0%", "20%"] : ["0%", "-20%"],
//                         }}
//                         transition={{
//                             duration: 8 + i,
//                             repeat: Infinity,
//                             delay: i * 0.3,
//                         }}
//                         style={{ left: `${Math.random() * 100}%` }}
//                     ></motion.div>
//                 ))}
//             </div>

//             <div className="relative z-10">
//                 {/* Hero Section */}
//                 <header className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
//                     <motion.div
//                         initial={{ opacity: 0, scale: 1.2 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 1 }}
//                         className="absolute inset-0 bg-gradient-to-br from-[#0d1b2a] via-[#0a1929] to-black"
//                         style={{ filter: "blur(40px)" }}
//                     />

//                     {/* Hero Content */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 40 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8 }}
//                         className="relative z-10 max-w-5xl mx-auto text-center px-8 py-10 rounded-3xl"
//                         style={{
//                             background: "rgba(255,255,255,0.05)",
//                             backdropFilter: "blur(22px)",
//                             border: "1px solid rgba(59, 130, 246, 0.1)",
//                             boxShadow: "0 0 35px rgba(59, 130, 246, 0.15)",
//                         }}
//                     >
//                         <div className="inline-block mb-6">
//                             <span className="px-5 py-2 rounded-full text-2xl font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
//                                 Leading Niche Marketing Agency
//                             </span>
//                         </div>

//                         <h1
//                             style={{ fontFamily: "Playfair Display, serif" }}
//                             className="text-xl md:text-7xl font-black text-white leading-tight mb-4"
//                         >
//                             Niche Marketing Agency in Kerala
//                             <span className="block text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-blue-700 animate-pulse">
//                                 Authority-driven specialized branding
//                             </span>
//                         </h1>

//                         <motion.div
//                             initial={{ width: 0 }}
//                             whileInView={{ width: 70 }}
//                             transition={{ duration: 0.6 }}
//                             className="h-1 bg-blue-500 mx-auto rounded-full mb-6"
//                         />

//                         <motion.p
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.3 }}
//                             className="text-md text-gray-300 max-w-lg mx-auto"
//                         >
//                             Authority-driven specialized branding for businesses that want clarity, conversions, and growth. We help brands in Kerala and across the state connect with their ideal customers using data-led insights, precision targeting, and ethical execution.
//                         </motion.p>

//                         <div className="pt-6">
//                             <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 className="group mb-4 px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-3 mx-auto"
//                             >
//                                 <a href='/contact'>Connect us</a>
//                                 <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
//                             </motion.button>
//                         </div>
//                     </motion.div>
//                 </header>

//                 {/* About Section */}
//                 <section className="relative text-white py-15 px-6 backdrop-blur-sm bg-black/20">
//                     <div className="max-w-7xl mx-auto">
//                         <div className="grid md:grid-cols-2 gap-12 items-start">
//                             <div>
//                                 <div className="flex md:items-center md:justify-center">
//                                     <h2 className="text-3xl md:text-5xl font-bold text-center">
//                                         Our Approach
//                                         <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
//                                             Targeted & Precise
//                                         </span>
//                                     </h2>
//                                 </div>
                                
//                                 <div className="flex justify-center">
//                                     <img 
//                                         src='/assets/niche1.png'
//                                         alt='Marketing Strategy' 
//                                         className="max-w-80 h-67 rounded-lg shadow-lg"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="space-y-6">
//                                 <p className="text-lg text-gray-300 leading-relaxed">
//                                     Our approach combines target audience marketing, hyper personalized marketing, and micro niche marketing to attract high-quality leads and build strong brand authority. At Social Bureau, this framework has helped many businesses across Kerala refine their market positioning, improve relevance, and achieve measurable, long-term results.
//                                 </p>
//                                 <p className="text-lg text-gray-300 leading-relaxed">
//                                     We employ laser focus through accurate target market identification using market segmentation and audience behavior analysis. This ensures every marketing effort reaches the right people at the right time with the right message.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Services Section */}
//                 <section className="relative text-white py-24 px-6">
//                     <div className="max-w-5xl mx-auto">
//                         <div className="text-center mb-16">
//                             <h2 className="text-4xl md:text-5xl font-bold mb-4">
//                                 Our <span className="text-transparent bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text">Services</span>
//                             </h2>
//                             <p className="text-xl text-gray-400">Niche marketing services in Kerala</p>
//                         </div>

//                         <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
//                             {services.map((service, index) => (
//                                 <div
//                                     key={index}
//                                     className="relative h-[300px] [perspective:1000px] group cursor-pointer"
//                                 >
//                                     <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
//                                         {/* Front of Card - Title and Description */}
//                                         <div className="absolute inset-0 border border-gray-800 bg-black/40 backdrop-blur-lg rounded-2xl p-8 [backface-visibility:hidden]">
//                                             <h3 className="text-xl font-bold mb-4 text-white border-b border-gray-800 pb-3">
//                                                 {service.title}
//                                             </h3>
//                                             <p className="text-gray-400 text-sm leading-relaxed">
//                                                 {service.description}
//                                             </p>
//                                         </div>

//                                         {/* Back of Card - Key Features Only */}
//                                         <div className="absolute inset-0 border border-blue-500/30 bg-black/70 backdrop-blur-lg rounded-2xl p-8 [backface-visibility:hidden] [transform:rotateY(180deg)]">
//                                             <h3 className="text-xl font-bold mb-4 text-white border-b border-gray-800 pb-3">
//                                                 {service.title}
//                                             </h3>
                                            
//                                             <h4 className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">
//                                                 Key Features:
//                                             </h4>
//                                             <ul className="space-y-2">
//                                                 {service.items.map((item, idx) => (
//                                                     <li key={idx} className="flex items-start">
//                                                         <span className="text-blue-500 text-xs mr-2 mt-1">•</span>
//                                                         <span className="text-gray-300 text-xs flex-1">{item}</span>
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
                        
//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             className="bg-blue-600 text-white px-6 py-3 mt-7 rounded-md hover:bg-blue-700 transition-all duration-200 flex items-center justify-center mx-auto"
//                         >
//                             <a href='/contact'>Schedule a Consultation</a>
//                         </motion.button>
//                     </div>
//                 </section>

//                 {/* Why Choose Us Section */}
//                 <section className="relative text-white py-24 px-6 backdrop-blur-sm bg-black/20">
//                     <div className="max-w-7xl mx-auto">
//                         <div className="text-center mb-16">
//                             <h2 className="text-4xl md:text-5xl font-bold mb-4">
//                                 Why Choose <span className="text-transparent bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text">Us</span>
//                             </h2>
//                             <p className="text-xl text-gray-400">Depth Over Volume, Strategy Over Shortcuts</p>
//                         </div>

//                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                             {whyChooseUs.map((item, index) => (
//                                 <div
//                                     key={index}
//                                     className="relative h-[300px] [perspective:1000px] group cursor-pointer"
//                                 >
//                                     <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
//                                         {/* Front of Card - Title Only */}
//                                         <div className="absolute inset-0 border border-gray-800 bg-black/40 backdrop-blur-lg rounded-2xl p-8 flex items-center justify-center [backface-visibility:hidden] overflow-hidden">
//                                             <div className="text-center">
//                                                 <h3 className="text-xl font-bold text-white">
//                                                     {item.title}
//                                                 </h3>
//                                                 <p className="text-blue-400 text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                                     Hover to learn more
//                                                 </p>
//                                             </div>
//                                         </div>

//                                         {/* Back of Card - Description Only */}
//                                         <div className="absolute inset-0 border border-blue-500/30 bg-black/70 backdrop-blur-lg rounded-2xl p-8 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden">
//                                             <div className="w-full h-full flex items-center">
//                                                 <p className="text-gray-300 text-sm leading-relaxed text-center">
//                                                     {item.description}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </section>

//                 {/* Testimonials Section */}
//                 <section className="relative text-white py-24 px-6">
//                     <div className="absolute inset-0 -z-10 opacity-20">
//                         <motion.img
//                             src="https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
//                             animate={{ scale: [1, 1.1, 1] }}
//                             transition={{ duration: 10, repeat: Infinity }}
//                             className="w-full h-full object-cover"
//                         />
//                     </div>

//                     <div className="max-w-7xl mx-auto">
//                         <div className="text-center mb-16">
//                             <h2 className="text-4xl md:text-5xl font-bold mb-4">
//                                 What Our <span className="text-transparent bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text">Clients Say</span>
//                             </h2>
//                         </div>

//                         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//                             {testimonials.map((testimonial, index) => (
//                                 <motion.div
//                                     key={index}
//                                     whileHover={{ scale: 1.02 }}
//                                     className="bg-black/30 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all"
//                                 >
//                                     <div className="flex items-center mb-6">
//                                         <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center font-bold text-white mr-4">
//                                             {testimonial.avatar}
//                                         </div>
//                                         <div>
//                                             <h4 className="font-bold text-lg text-white">{testimonial.name}</h4>
//                                         </div>
//                                     </div>
//                                     <p className="text-gray-300 italic">"{testimonial.text}"</p>
//                                     <div className="flex mt-4">
//                                         {[...Array(5)].map((_, i) => (
//                                             <span key={i} className="text-blue-500">★</span>
//                                         ))}
//                                     </div>
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </div>
//                 </section>
                
//                 <LatestBlogs posts={posts} />
                
//                 {/* FAQ Section */}
//                 <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
//                     <div className="max-w-4xl mx-auto">
//                         <div className="text-center mb-16">
//                             <h2 className="text-4xl md:text-5xl font-bold mb-4">
//                                 Frequently Asked <span className="text-transparent bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text">Questions</span>
//                             </h2>
//                         </div>

//                         <div className="space-y-4">
//                             {faqs.map((faq, index) => (
//                                 <motion.div
//                                     key={index}
//                                     whileHover={{ scale: 1.01 }}
//                                     className="bg-black/30 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all"
//                                 >
//                                     <button
//                                         className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-900/50 transition-colors"
//                                         onClick={() => toggleFaq(index)}
//                                     >
//                                         <h3 className="text-lg font-semibold pr-4 text-white">{faq.question}</h3>
//                                         <ChevronDown
//                                             size={20}
//                                             className={`text-blue-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
//                                         />
//                                     </button>
//                                     {openFaq === index && (
//                                         <div className="px-6 pb-6 pt-2 border-t border-gray-800">
//                                             <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
//                                         </div>
//                                     )}
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </div>
//                 </section>

//                 <Footer />
//             </div>
//         </div>
//     );
// };

// export default NicheMarketing;



import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Placeholder Footer Component
const Footer = () => (
    <footer className="bg-black border-t border-gray-800 text-gray-400 py-8 px-6 text-center">
        <p>&copy; 2025 Social Bureau. All rights reserved.</p>
    </footer>
);

// Placeholder LatestBlogs Component
const LatestBlogs = ({ posts }) => (
    <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12">Latest Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {posts && posts.slice(0, 3).map((post, i) => (
                    <div key={i} className="bg-gray-900 rounded-lg p-6">
                        <h3 className="text-white font-bold mb-2">{post.title || 'Blog Post'}</h3>
                        <p className="text-gray-400 text-sm">{post.description || 'Read our latest insights...'}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// Interactive Background Component
const InteractiveBackground = () => (
    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
);

const NicheMarketing = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const servicesSectionRef = useRef(null);
    const whyChooseSectionRef = useRef(null);

    const { scrollYProgress: servicesProgress } = useScroll({
        target: servicesSectionRef,
        offset: ["start start", "end center"],
    });

    const servicesX = useTransform(servicesProgress, [0, 1], ["0%", "-75%"]);

    const { scrollYProgress: whyChooseProgress } = useScroll({
        target: whyChooseSectionRef,
        offset: ["start start", "end center"],
    });

    const whyChooseX = useTransform(whyChooseProgress, [0, 1], ["0%", "-70%"]);

    const services = [
        {
            icon: '🔍',
            title: 'Hyper-Granular Market Research & Strategy',
            description: 'We conduct deep niche market analysis and vertical market analysis to identify high-intent opportunities. This includes target market segmentation, buyer persona optimization, and niche competitor analysis.',
            items: [
                'Deep niche market analysis and vertical market analysis',
                'Target market segmentation',
                'Buyer persona optimization',
                'Niche competitor analysis',
                'Strategic advantage identification'
            ]
        },
        {
            icon: '📝',
            title: 'Specialized Content & Channel Management',
            description: 'We build content and distribution strategies tailored for precision engagement. Every message is designed to match audience intent and strengthen your market presence.',
            items: [
                'Content strategies for precision engagement',
                'LinkedIn thought leadership development',
                'Industry-specific blog content',
                'High-intent traffic generation',
                'Channel-specific messaging'
            ]
        },
        {
            icon: '⚙️',
            title: 'Operational & Technical Specialization',
            description: 'Our team optimizes your niche sales funnel, analytics, and performance systems to improve conversion efficiency and ensure operational clarity.',
            items: [
                'Niche sales funnel optimization',
                'Analytics and performance system setup',
                'Revenue attribution tracking',
                'Conversion efficiency improvement',
                'Operational clarity implementation'
            ]
        },
        {
            icon: '🤝',
            title: 'Community-Centric Engagement',
            description: 'We help brands build trust and loyalty through community-driven strategies focused on customer personas and retention strategies.',
            items: [
                'Community-driven strategy development',
                'Customer persona development',
                'Customer retention strategies',
                'Long-term relationship building',
                'Customer advocacy programs'
            ]
        }
    ];

    const whyChooseUs = [
        {
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop',
            title: 'Reduced Competition Through Specialization',
            description: 'By focusing on a narrow target audience, we help your brand avoid crowded markets and compete where relevance matters most. This focused approach improves visibility and brand recall without massive ad budgets.'
        },
        {
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop',
            title: 'Efficient Marketing Spend',
            description: 'Our experience in precision targeting ensures your budget is spent only on high-intent opportunities. This reduces waste and improves cost efficiency across campaigns. Every dollar works harder because it reaches people already interested in what you offer.'
        },
        {
            image: 'https://images.unsplash.com/photo-1552664202-7fda8c3c3534?w=500&h=500&fit=crop',
            title: 'Higher Customer Loyalty',
            description: 'By aligning messaging with real customer needs and behavior, we help brands build trust-driven relationships that lead to repeat engagement and retention. Satisfied customers stay longer and spend more over time.'
        },
        {
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop',
            title: 'Higher Profit Margins & ROI',
            description: 'Premium market positioning, strong niche branding, and optimized conversion paths allow businesses to attract quality leads that convert at higher value.'
        },
        {
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop',
            title: 'Operational Clarity & Efficiency',
            description: 'Our structured approach to research, execution, and optimization ensures clarity at every stage making campaigns easier to measure, refine, and scale. You\'ll always know what\'s working and why.'
        }
    ];

    const testimonials = [
        {
            name: 'Client 1',
            text: 'Working with Social Bureau transformed our marketing approach. Within three months, we reduced ad spend by 30% while building stronger authority in our market and attracting higher-quality leads.',
            avatar: 'C1'
        },
        {
            name: 'Client 2',
            text: 'Thanks to their targeted approach, our brand finally gained clarity and relevance with our ideal customers. The quality of leads and engagement improved significantly.',
            avatar: 'C2'
        },
        {
            name: 'Client 3',
            text: 'Their deep market research and segmentation gave us insights we never had before, helping us position our brand confidently in a competitive space.',
            avatar: 'C3'
        },
        {
            name: 'Client 4',
            text: 'Social Bureau helped us build authority without aggressive advertising, establishing trust with our audience over time through consistent, valuable content.',
            avatar: 'C4'
        }
    ];

    const faqs = [
        {
            question: 'What makes specialized marketing different from traditional marketing?',
            answer: 'This approach focuses on a specific, well-defined audience rather than a broad market. This allows brands to create highly relevant messaging, build authority faster, reduce competition, and achieve higher conversion efficiency compared to traditional mass marketing.'
        },
        {
            question: 'Who should choose a specialized marketing agency?',
            answer: 'Businesses offering unique products or services, focused brands, startups, and growth-stage companies benefit the most. An agency with this expertise helps such businesses position themselves clearly and attract high-intent customers who are ready to buy.'
        },
        {
            question: 'Do you work only with Kerala-based businesses?',
            answer: 'No. While we are based in Kerala with strong local expertise in markets across Kochi and the state, we work with businesses in different regions based on industry fit and growth potential.'
        },
        {
            question: 'Is this approach suitable for startups?',
            answer: 'Yes. Focused and micro niche marketing are ideal for startups because they allow concentrated growth with limited budgets by targeting audiences that are more likely to convert. You build momentum faster with less waste.'
        },
        {
            question: 'How do you identify the right target audience?',
            answer: 'We identify the right audience through market segmentation services, audience behavior analysis, buyer persona optimization, and competitive research to ensure accurate targeting. This process typically takes 2-3 weeks and involves both data analysis and customer interviews.'
        },
        {
            question: 'How long does it take to see results?',
            answer: 'Initial indicators such as engagement and lead quality may appear within a few weeks. However, building authority, trust, and sustainable growth typically takes 2-4 months depending on your industry and starting point.'
        },
        {
            question: 'Do you provide content creation services?',
            answer: 'Yes. We create specialized content aligned with your market position, customer intent, and buyer journey stages to support authority building and conversions. This includes blogs, case studies, email sequences, and social content.'
        },
        {
            question: 'How do you measure campaign success?',
            answer: 'Success is measured using metrics such as high-intent traffic, conversion rates, engagement quality, customer retention, and overall ROI. We provide monthly dashboards that show exactly how your investment is performing.'
        },
        {
            question: 'Is this approach scalable in the long term?',
            answer: 'Yes. Once a brand establishes authority and trust within a focused market, strategies can be scaled efficiently without losing relevance or efficiency. Many of our clients double their reach while maintaining or improving conversion rates.'
        },
        {
            question: 'Do you offer consultations before onboarding?',
            answer: 'Yes. We offer strategy consultations to evaluate business fit, market opportunities, and growth potential before onboarding. This ensures we\'re the right partner for your specific goals.'
        }
    ];

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="relative min-h-screen bg-black">
            <InteractiveBackground />

            {/* Floating Blue Particles */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-blue-500/40"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.4, 0],
                            y: ["100%", "-20%"],
                            x: i % 2 === 0 ? ["0%", "20%"] : ["0%", "-20%"],
                        }}
                        transition={{
                            duration: 8 + i,
                            repeat: Infinity,
                            delay: i * 0.3,
                        }}
                        style={{ left: `${Math.random() * 100}%` }}
                    />
                ))}
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <header className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
                    {/* Video Background Container */}
                    <div className="absolute inset-0 w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
                        <video
                            autoPlay
                            muted
                            loop
                            className="absolute inset-0 w-full h-full object-cover opacity-30"
                        >
                            <source src="https://res.cloudinary.com/dtwcgfmar/video/upload/v1768452147/abstract-modern-composition-with-black-tubes-cylin-2025-12-09-11-55-49-utc_fosbnh.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
                    </div>

                    {/* Hero Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 max-w-4xl mx-auto text-center"
                    >
                        <h1
                            style={{ fontFamily: "'Playfair Display', serif" }}
                            className="text-6xl md:text-8xl font-light text-white leading-tight mb-6"
                        >
                            Leading Niche
                            <br />
                            <span className="font-light">Marketing Agency</span>
                        </h1>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-xl md:text-2xl text-white mb-8 font-light tracking-wide"
                        >
                            Authority-driven specialized branding for businesses
                            <br />
                            <span className="font-light">that want clarity, conversions, and growth</span>
                        </motion.h2>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="h-1 bg-white mx-auto mb-8 w-20"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-gray-200 text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed"
                        >
                            Social Bureau, based in Kochi, Kerala, helps businesses achieve measurable growth through precision targeting, data-led insights, and ethical execution for brands in Kerala and across the state.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2"
                            >
                                Connect With Us
                                <ArrowRight size={18} />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-transparent text-white font-semibold border border-white rounded-lg hover:bg-white/10 transition-all"
                            >
                                Learn More
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </header>

                {/* About Section */}
                <section className="relative text-white py-20 px-6 backdrop-blur-sm bg-black/20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-start">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold text-center">
                                    Our Approach
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
                                        Targeted & Precise
                                    </span>
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    Our approach combines target audience marketing, hyper personalized marketing, and micro niche marketing to attract high-quality leads and build strong brand authority. At Social Bureau, this framework has helped many businesses across Kerala refine their market positioning, improve relevance, and achieve measurable, long-term results.
                                </p>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    We employ laser focus through accurate target market identification using market segmentation and audience behavior analysis. This ensures every marketing effort reaches the right people at the right time with the right message.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section - Horizontal Scroll */}
                <section ref={servicesSectionRef} className="relative bg-black text-white h-[400vh]">
                    <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                        <motion.div
                            style={{ x: servicesX }}
                            className="flex h-full gap-0"
                        >
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center min-w-fit px-[5vw] ${index === 0 ? 'pl-[10vw]' : ''}`}
                                >
                                    <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-12 h-full py-20 w-[900px]">
                                        {/* Service Card */}
                                        <div className="relative h-[350px] w-[300px] md:w-[400px] lg:w-[450px] flex-shrink-0">
                                            <div className="relative w-full h-full border border-gray-800 bg-black/40 backdrop-blur-lg rounded-2xl p-8 flex flex-col">
                                                <h4 className="text-blue-400 font-semibold text-md uppercase tracking-wider mb-4">
                                                    Key Features:
                                                </h4>
                                                <ul className="space-y-2 flex-1">
                                                    {service.items.map((item, idx) => (
                                                        <li key={idx} className="flex items-start gap-2">
                                                            <span className="text-blue-500 text-xs mt-1 flex-shrink-0">•</span>
                                                            <span className="text-gray-300 text-md leading-relaxed">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Service Info */}
                                        <div className="flex flex-col max-w-[300px] lg:max-w-[400px] flex-shrink-0">
                                            <div className="flex items-center gap-4 text-xs font-semibold tracking-widest text-zinc-500 mb-6 uppercase">
                                                <span>NO. {String(index + 1).padStart(2, '0')}</span>
                                                <span className="w-8 h-px bg-zinc-800" />
                                                <span>SERVICE</span>
                                            </div>

                                            <h2 className="text-4xl lg:text-5xl font-serif leading-tight mb-6">
                                                {service.title}
                                            </h2>

                                            <p className="text-zinc-400 text-sm lg:text-base leading-relaxed mb-8 font-light">
                                                {service.description}
                                            </p>

                                            <a
                                                href="#contact"
                                                className="group relative inline-flex items-center self-start text-[10px] tracking-[0.2em] font-bold uppercase py-2"
                                            >
                                                <span className="relative z-10 transition-colors group-hover:text-blue-500">
                                                    Learn More
                                                </span>
                                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-700 transition-all group-hover:bg-blue-500 group-hover:h-[2px]" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-[60vh] w-px bg-zinc-900 mx-[5vw]" />
                                </div>
                            ))}

                            <div className="min-w-[50vw]" />
                        </motion.div>
                    </div>
                </section>

                {/* CTA / Contact Section */}
                <section id="contact" className="bg-black py-24 px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="relative border border-zinc-800 bg-black/60 backdrop-blur-xl rounded-2xl px-8 py-14 md:px-16 md:py-20 text-center shadow-2xl">

                            {/* Accent Line */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-blue-600 rounded-full" />

                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6">
                                Let's Build the Future of Marketing Together
                            </h3>

                            <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-10">
                                Join hundreds of forward-thinking businesses using niche marketing to achieve targeted growth.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                className="bg-blue-600 text-white px-10 py-4 rounded-md text-xs tracking-[0.25em] font-bold uppercase hover:bg-blue-700 transition-all duration-200"
                            >
                                Schedule a Consultation
                            </motion.button>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section - Horizontal Scroll */}
                <section ref={whyChooseSectionRef} className="relative bg-black text-white h-[300vh]">
                    <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                        <motion.div
                            style={{ x: whyChooseX }}
                            className="flex h-full gap-0"
                        >
                            {whyChooseUs.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center min-w-fit px-[5vw] ${index === 0 ? 'pl-[10vw]' : ''}`}
                                >
                                    <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-6 h-full py-20 w-[600px]">

                                        {/* Info Section */}
                                        <div className="flex flex-col max-w-[300px] lg:max-w-[400px] flex-shrink-0">
                                            <div className="flex items-center gap-4 text-xs font-semibold tracking-widest text-zinc-500 mb-6 uppercase">
                                                <span>NO. {String(index + 1).padStart(2, '0')}</span>
                                                <span className="w-8 h-px bg-zinc-800" />
                                                <span>REASON</span>
                                            </div>

                                            <h2 className="text-4xl lg:text-5xl font-serif leading-tight mb-6">
                                                {item.title}
                                            </h2>

                                            <p className="text-zinc-400 text-sm lg:text-base leading-relaxed mb-8 font-light">
                                                {item.description}
                                            </p>

                                            <a
                                                href="#contact"
                                                className="group relative inline-flex items-center self-start text-[10px] tracking-[0.2em] font-bold uppercase py-2"
                                            >
                                                <span className="relative z-10 transition-colors group-hover:text-blue-500">
                                                    Get Started
                                                </span>
                                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-700 transition-all group-hover:bg-blue-500 group-hover:h-[2px]" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-[50vh] w-px bg-zinc-900 mx-[5vw]" />
                                </div>
                            ))}

                            <div className="min-w-[50vw]" />
                        </motion.div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="relative text-white py-24 px-6 bg-black/40">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Client <span className="text-transparent bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text">Reviews</span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-black/30 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all"
                                >
                                    <div className="flex items-center mb-6">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center font-bold text-white mr-4">
                                            {testimonial.avatar}
                                        </div>
                                        <h4 className="font-bold text-lg text-white">{testimonial.name}</h4>
                                    </div>
                                    <p className="text-gray-300 italic mb-4">"{testimonial.text}"</p>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-blue-500">★</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Latest Blogs Section */}
                <LatestBlogs posts={[]} />

                {/* FAQ Section */}
                <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Frequently Asked <span className="text-transparent bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text">Questions</span>
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.01 }}
                                    className="bg-black/30 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all"
                                >
                                    <button
                                        className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-900/50 transition-colors"
                                        onClick={() => toggleFaq(index)}
                                    >
                                        <h3 className="text-lg font-semibold pr-4 text-white">{faq.question}</h3>
                                        <ChevronDown
                                            size={20}
                                            className={`text-blue-400 transition-transform duration-300 flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    {openFaq === index && (
                                        <div className="px-6 pb-6 pt-2 border-t border-gray-800">
                                            <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
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

export default NicheMarketing;