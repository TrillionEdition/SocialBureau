// // // import React, { useState } from 'react';
// // // import { ArrowRight, ChevronDown } from 'lucide-react';
// // // import Footer from './Footer';
// // // import LatestBlogs from './LatestBlogs';

// // // const ApiMarketing = () => {
// // //     const [openFaq, setOpenFaq] = useState(null);

// // //     // Services data from PDF pages 2-3
// // //     const services = [
// // //         {
// // //             title: 'Developer Acquisition & Portal Optimization',
// // //             description: 'Developers typically discover integrations through organic search, peer recommendations, and technical communities. We focus on reaching high-intent audiences while optimizing developer portals for both real users and search visibility.',
// // //             items: [
// // //                 'Technical content architecture targeting integration-specific queries and comparison keywords',
// // //                 'Interactive testing environments demonstrating capabilities without authentication friction',
// // //                 'Implementation tutorials and use case documentation optimized for developer search behavior',
// // //                 'GraphQL queries and RESTful API reference materials that reduce evaluation time',
// // //                 'Strategic community presence building credibility and trust'
// // //             ],
// // //             icon: '👨‍💻'
// // //         },
// // //         {
// // //             title: 'Strategic Consulting for Sustainable Growth',
// // //             description: 'Our API consultant engagements audit existing developer journeys to identify adoption barriers and monetization opportunities. We focus on practical improvements that accelerate expansion while supporting long-term platform sustainability.',
// // //             items: [
// // //                 'API design-first methodology aligning technical architecture with market demand',
// // //                 'Revenue strategy development including usage-based pricing models and freemium structures',
// // //                 'Partner ecosystems expansion through integration marketplace positioning and co-marketing frameworks',
// // //                 'Security communication building trust through transparent OAuth 2.0 and JWT implementation',
// // //                 'Digital asset ROI analysis connecting integration investments to business outcomes'
// // //             ],
// // //             icon: '📈'
// // //         },
// // //         {
// // //             title: 'Integration Marketing & Product Positioning',
// // //             description: 'Platforms competing in modern technology markets require positioning that communicates both technical excellence and business value simultaneously. Our services help companies differentiate through strategic messaging resonating with developers and executives.',
// // //             items: [
// // //                 'Competitive differentiation based on developer experience benchmarks and integration ease',
// // //                 'Event-driven architecture adoption through targeted use case development',
// // //                 'Multi-language support marketing expanding addressable audience reach',
// // //                 'Integration capability positioning within digital transformation trends',
// // //                 'Simplified integration path marketing for citizen developers and non-technical users'
// // //             ],
// // //             icon: '🎯'
// // //         },
// // //         {
// // //             title: 'Developer Onboarding & Activation Optimization',
// // //             description: 'The first successful call predicts long-term retention. We analyze and optimize the complete journey from initial discovery through sustained usage, focusing on eliminating activation barriers and improving API growth metrics.',
// // //             items: [
// // //                 'Immediate functional sandbox access with pre-populated realistic scenarios',
// // //                 'Clear authentication flows and implementation guides',
// // //                 'Actionable error messages reducing support dependency',
// // //                 'Progressive disclosure revealing complexity based on experience level'
// // //             ],
// // //             icon: '⚡'
// // //         },
// // //         {
// // //             title: 'Ecosystem Expansion & Marketplace Strategy',
// // //             description: 'Platform growth accelerates when integrations exist within established software ecosystems. Our strategies position capabilities across automation platforms, marketplaces, and partner networks to establish your platform as the best API agency choice for developers.',
// // //             items: [
// // //                 'Zapier, Make, and n8n connector deployment and optimization',
// // //                 'Co-marketing programs and joint webinar frameworks',
// // //                 'Salesforce AppExchange, Shopify App Store, HubSpot Marketplace listing optimization',
// // //                 'Event-driven scenarios demonstrating platform flexibility'
// // //             ],
// // //             icon: '🌐'
// // //         }
// // //     ];

// // //     // Why Choose Us from PDF page 4-5
// // //     const whyChooseUs = [
// // //         {
// // //             title: 'Technical Depth Meets Marketing Excellence',
// // //             description: 'Social Bureau operates at the intersection of engineering and growth marketing. Our team includes former developers, technical writers, and integration specialists who understand design patterns, schema optimization, and developer experience principles driving adoption.'
// // //         },
// // //         {
// // //             title: 'Proven Methodology',
// // //             description: 'Our data-driven approach focuses on metrics correlating with business value: acquisition costs, activation rates, retention percentages, call volume growth, and revenue acceleration'
// // //         },
// // //         {
// // //             title: 'Client Trust',
// // //             description: 'Technology companies across India and globally choose us as their top API agency partner for specialized developer marketing expertise. Operating from Kochi, we serve platforms spanning SaaS, FinTech, and cloud infrastructure, demonstrating consistent outcomes across diverse environments.'
// // //         },
// // //         {
// // //             title: 'Product Specialists',
// // //             description: 'Unlike general agencies, we understand how developers evaluate integrations, what drives decisions, and how to optimize complete journeys from discovery through advocacy. This expertise positions us as a trusted API company in India with deep Kerala market knowledge and international standards.'
// // //         },
// // //         {
// // //             title: 'Regional Excellence',
// // //             description: 'Based in Kerala\'s thriving technology hub, we combine local market understanding with international best practices observed from platforms like Stripe, Twilio, and SendGrid, ensuring strategies work effectively across global developer communities while serving India\'s growing tech ecosystem.'
// // //         }
// // //     ];

// // //     // Testimonials from PDF pages 5-7
// // //     const testimonials = [
// // //         {
// // //             name: 'Arjun Menon',
// // //             text: 'Working with this team helped us clearly position our integrations for developers. Our onboarding became smoother, and we noticed better-quality technical inquiries within a short period.',
// // //             avatar: 'AM'
// // //         },
// // //         {
// // //             name: 'Suresh Raghavan',
// // //             text: 'They understand how developers actually evaluate APIs. The guidance we received improved our documentation structure and reduced confusion during integration.',
// // //             avatar: 'SR'
// // //         },
// // //         {
// // //             name: 'Ananya Nair',
// // //             text: 'What stood out was the clarity they brought to our platform messaging. It became easier for partners to understand where our integrations fit into real workflows.',
// // //             avatar: 'AN'
// // //         },
// // //         {
// // //             name: 'Meera Pillai',
// // //             text: 'Social Bureau helped us rethink how we present our integration capabilities. The focus on usability and trust made a noticeable difference in adoption.',
// // //             avatar: 'MP'
// // //         }
// // //     ];

// // //     // FAQs from PDF pages 7-9
// // //     const faqs = [
// // //         {
// // //             question: 'What exactly is API marketing and how is it different from regular software marketing?',
// // //             answer: 'API marketing targets developers through technical documentation, code examples, and interactive testing environments instead of sales presentations. Developers evaluate APIs by testing them directly and reading documentation, not through feature demos or sales calls.'
// // //         },
// // //         {
// // //             question: 'Why do developers ignore traditional marketing approaches?',
// // //             answer: 'Developers trust peer recommendations on Stack Overflow and GitHub over sales content. They search for specific code solutions and want to test functionality before committing time. Traditional sales tactics create friction instead of trust.'
// // //         },
// // //         {
// // //             question: 'What is TTFFC and why does it matter for API adoption?',
// // //             answer: 'TTFFC means Time to First Finished Call—how quickly developers make their first successful API request. The faster they succeed, the more likely they continue using your platform. If it takes too long, most developers abandon the integration.'
// // //         },
// // //         {
// // //             question: 'How does developer portal SEO differ from regular website SEO?',
// // //             answer: 'Developer portal SEO targets technical queries like "Python payment example" instead of broad terms. Focus on detailed tutorials, code documentation, integration guides, and optimize GitHub repositories where developers search for solutions.'
// // //         },
// // //         {
// // //             question: 'What role do functional sandboxes play in API growth?',
// // //             answer: 'Sandboxes let developers test your API immediately without setup or configuration. They provide sample data and realistic scenarios for quick validation. Platforms with excellent sandboxes see much higher conversion from evaluation to actual integration.'
// // //         },
// // //         {
// // //             question: 'Why should we work with Social Bureau for API marketing?',
// // //             answer: 'Social Bureau specializes in developer-focused marketing with a team of former developers and technical writers. We\'ve helped platforms significantly reduce integration time and increase developer signups. Based in Kochi, we focus on real business metrics: activation rates, API usage growth, and revenue.'
// // //         },
// // //         {
// // //             question: 'How do low-code connectors impact API adoption strategy?',
// // //             answer: 'Low-code connectors on Zapier, Make, and similar platforms expand your market to business users beyond developers. This increases your audience and lets teams build integrations before involving engineering. Serve both audiences: full documentation for developers, simple connectors for business users.'
// // //         },
// // //         {
// // //             question: 'What is API monetization and what pricing models work best?',
// // //             answer: 'API monetization turns integrations into revenue through usage-based pricing, tiered subscriptions, or free-to-paid models. Usage-based pricing charges customers based on how much they use, which scales naturally with their growth. Display clear pricing and usage information in your developer portal.'
// // //         },
// // //         {
// // //             question: 'How do partner ecosystems accelerate API growth?',
// // //             answer: 'Partner ecosystems multiply adoption through integrations with popular tools like CRMs, payment processors, and analytics platforms. Integration marketplaces expose your API to established user bases. Platforms with strong ecosystems see much more partner-driven adoption than direct marketing alone.'
// // //         },
// // //         {
// // //             question: 'What metrics should we track to measure API marketing success?',
// // //             answer: 'Track developer acquisition cost, activation rate, integration retention, API usage growth, and conversion to paid customers. These reveal problems: high signups but low activation means onboarding issues; high activation but poor retention indicates value problems.'
// // //         }
// // //     ];

// // //     const toggleFaq = (index) => {
// // //         setOpenFaq(openFaq === index ? null : index);
// // //     };

// // //     return (
// // //         <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
// // //             {/* Hero Section */}
// // //             <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
// // //                 <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-blue-900/20"></div>
// // //                 <div className="max-w-7xl mx-auto relative z-10">
// // //                     <div className="space-y-8 max-w-4xl">
// // //                         <div className="inline-block">
// // //                             <span className="px-5 py-2 rounded-full text-sm font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
// // //                                 Leading API Marketing Agency
// // //                             </span>
// // //                         </div>
// // //                         <h1 className="text-5xl md:text-7xl font-black leading-tight">
// // //                             Transform Integration Capabilities into Competitive
// // //                             <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
// // //                                 Revenue Engines
// // //                             </span>
// // //                         </h1>
// // //                         <p className="text-xl text-gray-300 max-w-3xl">
// // //                             Social Bureau, based in Kochi, Kerala, helps SaaS platforms, cloud providers, and technology companies achieve measurable growth through developer-centric strategies. Our specialized approach combines technical expertise with proven marketing methodologies to simplify first-time integrations, optimize developer portals, and build sustainable partner ecosystems.
// // //                         </p>
// // //                         <div className="pt-6">
// // //                             <button className="group mb-6 px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 flex items-center gap-3">
// // //                                 Connect us
// // //                                 <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
// // //                             </button>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </section>

// // //             {/* About Section */}
// // //             <section className="py-24 px-6 bg-gray-900/50">
// // //                 <div className="max-w-7xl mx-auto">
// // //                     <div className="grid md:grid-cols-2 gap-12 items-start">
// // //                         <div>
// // //                             <h2 className="text-4xl md:text-5xl font-black mb-8">
// // //                                 Strategic Acquisition in the
// // //                                 <span className="block text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mt-2">
// // //                                     API Economy
// // //                                 </span>
// // //                             </h2>
// // //                         </div>
// // //                         <div className="space-y-6">
// // //                             <p className="text-lg text-gray-300 leading-relaxed">
// // //                                 We position your platform for success by transforming integration capabilities into discoverable, adoptable solutions. From interactive testing environments to clear pricing communication, we drive outcomes that matter: increased developer activation, expanded partnerships, and accelerated revenue.
// // //                             </p>
// // //                             <p className="text-lg text-gray-300 leading-relaxed">
// // //                                 Modern platforms face a critical challenge: exceptional technical capabilities remain invisible without effective developer acquisition, streamlined onboarding workflows, and sustained integration retention. This discipline represents making application programming interfaces discoverable, evaluable, and valuable to technical audiences.
// // //                             </p>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </section>

// // //             {/* Services Section */}
// // //             <section className="py-24 px-6 bg-gray-950">
// // //                 <div className="max-w-7xl mx-auto">
// // //                     <div className="text-center mb-16">
// // //                         <h2 className="text-4xl md:text-5xl font-black mb-4">
// // //                             Our <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">Services</span>
// // //                         </h2>
// // //                         <p className="text-xl text-gray-400">API marketing services in Kerala</p>
// // //                     </div>

// // //                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
// // //                         {services.slice(0, 3).map((service, index) => (
// // //                             <div
// // //                                 key={index}
// // //                                 className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
// // //                             >
// // //                                 <div className="text-4xl mb-6">{service.icon}</div>
// // //                                 <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
// // //                                 <p className="text-gray-400 mb-6">{service.description}</p>
// // //                                 <ul className="space-y-3">
// // //                                     {service.items.map((item, idx) => (
// // //                                         <li key={idx} className="flex items-start">
// // //                                             <span className="text-purple-400 mr-2 mt-1">•</span>
// // //                                             <span className="text-gray-300 text-sm">{item}</span>
// // //                                         </li>
// // //                                     ))}
// // //                                 </ul>
// // //                             </div>
// // //                         ))}
// // //                     </div>

// // //                     <div className="grid md:grid-cols-2 gap-8 mt-8">
// // //                         {services.slice(3).map((service, index) => (
// // //                             <div
// // //                                 key={index}
// // //                                 className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/10"
// // //                             >
// // //                                 <div className="text-4xl mb-6">{service.icon}</div>
// // //                                 <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
// // //                                 <p className="text-gray-400 mb-6">{service.description}</p>
// // //                                 <ul className="space-y-3">
// // //                                     {service.items.map((item, idx) => (
// // //                                         <li key={idx} className="flex items-start">
// // //                                             <span className="text-pink-400 mr-2 mt-1">•</span>
// // //                                             <span className="text-gray-300 text-sm">{item}</span>
// // //                                         </li>
// // //                                     ))}
// // //                                 </ul>
// // //                             </div>
// // //                         ))}
// // //                     </div>
// // //                 </div>
// // //             </section>

// // //             {/* Why Choose Us Section */}
// // //             <section className="py-24 px-6 bg-gray-900/50">
// // //                 <div className="max-w-7xl mx-auto">
// // //                     <div className="text-center mb-16">
// // //                         <h2 className="text-4xl md:text-5xl font-black mb-4">
// // //                             Why Choose <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">Us</span>
// // //                         </h2>
// // //                         <p className="text-xl text-gray-400">Technical Depth Meets Marketing Excellence</p>
// // //                     </div>

// // //                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
// // //                         {whyChooseUs.slice(0, 3).map((item, index) => (
// // //                             <div
// // //                                 key={index}
// // //                                 className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300"
// // //                             >
// // //                                 <h3 className="text-xl font-bold mb-4 text-blue-400">{item.title}</h3>
// // //                                 <p className="text-gray-300">{item.description}</p>
// // //                             </div>
// // //                         ))}
// // //                     </div>

// // //                     <div className="grid md:grid-cols-2 gap-8 mt-8">
// // //                         {whyChooseUs.slice(3).map((item, index) => (
// // //                             <div
// // //                                 key={index}
// // //                                 className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300"
// // //                             >
// // //                                 <h3 className="text-xl font-bold mb-4 text-green-400">{item.title}</h3>
// // //                                 <p className="text-gray-300">{item.description}</p>
// // //                             </div>
// // //                         ))}
// // //                     </div>
// // //                 </div>
// // //             </section>
// // //             <LatestBlogs posts={posts} />
// // //             {/* Testimonials Section */}
// // //             <section className="py-24 px-6 bg-gray-950">
// // //                 <div className="max-w-7xl mx-auto">
// // //                     <div className="text-center mb-16">
// // //                         <h2 className="text-4xl md:text-5xl font-black mb-4">
// // //                             What Our <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">Clients Say</span>
// // //                         </h2>
// // //                     </div>

// // //                     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
// // //                         {testimonials.map((testimonial, index) => (
// // //                             <div
// // //                                 key={index}
// // //                                 className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300"
// // //                             >
// // //                                 <div className="flex items-center mb-6">
// // //                                     <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center font-bold text-white mr-4">
// // //                                         {testimonial.avatar}
// // //                                     </div>
// // //                                     <div>
// // //                                         <h4 className="font-bold text-lg">{testimonial.name}</h4>
// // //                                     </div>
// // //                                 </div>
// // //                                 <p className="text-gray-300 italic">"{testimonial.text}"</p>
// // //                                 <div className="flex mt-4">
// // //                                     {[...Array(5)].map((_, i) => (
// // //                                         <span key={i} className="text-yellow-400">★</span>
// // //                                     ))}
// // //                                 </div>
// // //                             </div>
// // //                         ))}
// // //                     </div>
// // //                 </div>
// // //             </section>

// // //             {/* FAQ Section */}
// // //             <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-gray-950">
// // //                 <div className="max-w-4xl mx-auto">
// // //                     <div className="text-center mb-16">
// // //                         <h2 className="text-4xl md:text-5xl font-black mb-4">
// // //                             Frequently Asked <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">Questions</span>
// // //                         </h2>
// // //                     </div>

// // //                     <div className="space-y-4">
// // //                         {faqs.map((faq, index) => (
// // //                             <div
// // //                                 key={index}
// // //                                 className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
// // //                             >
// // //                                 <button
// // //                                     className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-800/50 transition-colors"
// // //                                     onClick={() => toggleFaq(index)}
// // //                                 >
// // //                                     <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
// // //                                     <ChevronDown
// // //                                         size={20}
// // //                                         className={`text-purple-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
// // //                                     />
// // //                                 </button>
// // //                                 {openFaq === index && (
// // //                                     <div className="px-6 pb-6 pt-2 border-t border-gray-700">
// // //                                         <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
// // //                                     </div>
// // //                                 )}
// // //                             </div>
// // //                         ))}
// // //                     </div>
// // //                 </div>
// // //             </section>

// // //             <Footer />
// // //         </div>
// // //     );
// // // };

// // // export default ApiMarketing;


// // import React, { useState } from 'react';
// // import { ArrowRight, ChevronDown } from 'lucide-react';
// // import Footer from './Footer';
// // import LatestBlogs from '../components/LatestBlogs'
// // import posts from "../data/blogs";

// // const ApiMarketing = () => {
// //     const [openFaq, setOpenFaq] = useState(null);

// //     // Services data from PDF pages 2-3
// //     const services = [
// //         {
// //             title: 'Developer Acquisition & Portal Optimization',
// //             description: 'Developers typically discover integrations through organic search, peer recommendations, and technical communities. We focus on reaching high-intent audiences while optimizing developer portals for both real users and search visibility.',
// //             items: [
// //                 'Technical content architecture targeting integration-specific queries and comparison keywords',
// //                 'Interactive testing environments demonstrating capabilities without authentication friction',
// //                 'Implementation tutorials and use case documentation optimized for developer search behavior',
// //                 'GraphQL queries and RESTful API reference materials that reduce evaluation time',
// //                 'Strategic community presence building credibility and trust'
// //             ],
// //             icon: '👨‍💻'
// //         },
// //         {
// //             title: 'Strategic Consulting for Sustainable Growth',
// //             description: 'Our API consultant engagements audit existing developer journeys to identify adoption barriers and monetization opportunities. We focus on practical improvements that accelerate expansion while supporting long-term platform sustainability.',
// //             items: [
// //                 'API design-first methodology aligning technical architecture with market demand',
// //                 'Revenue strategy development including usage-based pricing models and freemium structures',
// //                 'Partner ecosystems expansion through integration marketplace positioning and co-marketing frameworks',
// //                 'Security communication building trust through transparent OAuth 2.0 and JWT implementation',
// //                 'Digital asset ROI analysis connecting integration investments to business outcomes'
// //             ],
// //             icon: '📈'
// //         },
// //         {
// //             title: 'Integration Marketing & Product Positioning',
// //             description: 'Platforms competing in modern technology markets require positioning that communicates both technical excellence and business value simultaneously. Our services help companies differentiate through strategic messaging resonating with developers and executives.',
// //             items: [
// //                 'Competitive differentiation based on developer experience benchmarks and integration ease',
// //                 'Event-driven architecture adoption through targeted use case development',
// //                 'Multi-language support marketing expanding addressable audience reach',
// //                 'Integration capability positioning within digital transformation trends',
// //                 'Simplified integration path marketing for citizen developers and non-technical users'
// //             ],
// //             icon: '🎯'
// //         },
// //         {
// //             title: 'Developer Onboarding & Activation Optimization',
// //             description: 'The first successful call predicts long-term retention. We analyze and optimize the complete journey from initial discovery through sustained usage, focusing on eliminating activation barriers and improving API growth metrics.',
// //             items: [
// //                 'Immediate functional sandbox access with pre-populated realistic scenarios',
// //                 'Clear authentication flows and implementation guides',
// //                 'Actionable error messages reducing support dependency',
// //                 'Progressive disclosure revealing complexity based on experience level'
// //             ],
// //             icon: '⚡'
// //         },
// //         {
// //             title: 'Ecosystem Expansion & Marketplace Strategy',
// //             description: 'Platform growth accelerates when integrations exist within established software ecosystems. Our strategies position capabilities across automation platforms, marketplaces, and partner networks to establish your platform as the best API agency choice for developers.',
// //             items: [
// //                 'Zapier, Make, and n8n connector deployment and optimization',
// //                 'Co-marketing programs and joint webinar frameworks',
// //                 'Salesforce AppExchange, Shopify App Store, HubSpot Marketplace listing optimization',
// //                 'Event-driven scenarios demonstrating platform flexibility'
// //             ],
// //             icon: '🌐'
// //         }
// //     ];

// //     // Why Choose Us from PDF page 4-5
// //     const whyChooseUs = [
// //         {
// //             title: 'Technical Depth Meets Marketing Excellence',
// //             description: 'Social Bureau operates at the intersection of engineering and growth marketing. Our team includes former developers, technical writers, and integration specialists who understand design patterns, schema optimization, and developer experience principles driving adoption.'
// //         },
// //         {
// //             title: 'Proven Methodology',
// //             description: 'Our data-driven approach focuses on metrics correlating with business value: acquisition costs, activation rates, retention percentages, call volume growth, and revenue acceleration'
// //         },
// //         {
// //             title: 'Client Trust',
// //             description: 'Technology companies across India and globally choose us as their top API agency partner for specialized developer marketing expertise. Operating from Kochi, we serve platforms spanning SaaS, FinTech, and cloud infrastructure, demonstrating consistent outcomes across diverse environments.'
// //         },
// //         {
// //             title: 'Product Specialists',
// //             description: 'Unlike general agencies, we understand how developers evaluate integrations, what drives decisions, and how to optimize complete journeys from discovery through advocacy. This expertise positions us as a trusted API company in India with deep Kerala market knowledge and international standards.'
// //         },
// //         {
// //             title: 'Regional Excellence',
// //             description: 'Based in Kerala\'s thriving technology hub, we combine local market understanding with international best practices observed from platforms like Stripe, Twilio, and SendGrid, ensuring strategies work effectively across global developer communities while serving India\'s growing tech ecosystem.'
// //         }
// //     ];

// //     // Testimonials from PDF pages 5-7
// //     const testimonials = [
// //         {
// //             name: 'Arjun Menon',
// //             text: 'Working with this team helped us clearly position our integrations for developers. Our onboarding became smoother, and we noticed better-quality technical inquiries within a short period.',
// //             avatar: 'AM'
// //         },
// //         {
// //             name: 'Suresh Raghavan',
// //             text: 'They understand how developers actually evaluate APIs. The guidance we received improved our documentation structure and reduced confusion during integration.',
// //             avatar: 'SR'
// //         },
// //         {
// //             name: 'Ananya Nair',
// //             text: 'What stood out was the clarity they brought to our platform messaging. It became easier for partners to understand where our integrations fit into real workflows.',
// //             avatar: 'AN'
// //         },
// //         {
// //             name: 'Meera Pillai',
// //             text: 'Social Bureau helped us rethink how we present our integration capabilities. The focus on usability and trust made a noticeable difference in adoption.',
// //             avatar: 'MP'
// //         }
// //     ];

// //     // FAQs from PDF pages 7-9
// //     const faqs = [
// //         {
// //             question: 'What exactly is API marketing and how is it different from regular software marketing?',
// //             answer: 'API marketing targets developers through technical documentation, code examples, and interactive testing environments instead of sales presentations. Developers evaluate APIs by testing them directly and reading documentation, not through feature demos or sales calls.'
// //         },
// //         {
// //             question: 'Why do developers ignore traditional marketing approaches?',
// //             answer: 'Developers trust peer recommendations on Stack Overflow and GitHub over sales content. They search for specific code solutions and want to test functionality before committing time. Traditional sales tactics create friction instead of trust.'
// //         },
// //         {
// //             question: 'What is TTFFC and why does it matter for API adoption?',
// //             answer: 'TTFFC means Time to First Finished Call—how quickly developers make their first successful API request. The faster they succeed, the more likely they continue using your platform. If it takes too long, most developers abandon the integration.'
// //         },
// //         {
// //             question: 'How does developer portal SEO differ from regular website SEO?',
// //             answer: 'Developer portal SEO targets technical queries like "Python payment example" instead of broad terms. Focus on detailed tutorials, code documentation, integration guides, and optimize GitHub repositories where developers search for solutions.'
// //         },
// //         {
// //             question: 'What role do functional sandboxes play in API growth?',
// //             answer: 'Sandboxes let developers test your API immediately without setup or configuration. They provide sample data and realistic scenarios for quick validation. Platforms with excellent sandboxes see much higher conversion from evaluation to actual integration.'
// //         },
// //         {
// //             question: 'Why should we work with Social Bureau for API marketing?',
// //             answer: 'Social Bureau specializes in developer-focused marketing with a team of former developers and technical writers. We\'ve helped platforms significantly reduce integration time and increase developer signups. Based in Kochi, we focus on real business metrics: activation rates, API usage growth, and revenue.'
// //         },
// //         {
// //             question: 'How do low-code connectors impact API adoption strategy?',
// //             answer: 'Low-code connectors on Zapier, Make, and similar platforms expand your market to business users beyond developers. This increases your audience and lets teams build integrations before involving engineering. Serve both audiences: full documentation for developers, simple connectors for business users.'
// //         },
// //         {
// //             question: 'What is API monetization and what pricing models work best?',
// //             answer: 'API monetization turns integrations into revenue through usage-based pricing, tiered subscriptions, or free-to-paid models. Usage-based pricing charges customers based on how much they use, which scales naturally with their growth. Display clear pricing and usage information in your developer portal.'
// //         },
// //         {
// //             question: 'How do partner ecosystems accelerate API growth?',
// //             answer: 'Partner ecosystems multiply adoption through integrations with popular tools like CRMs, payment processors, and analytics platforms. Integration marketplaces expose your API to established user bases. Platforms with strong ecosystems see much more partner-driven adoption than direct marketing alone.'
// //         },
// //         {
// //             question: 'What metrics should we track to measure API marketing success?',
// //             answer: 'Track developer acquisition cost, activation rate, integration retention, API usage growth, and conversion to paid customers. These reveal problems: high signups but low activation means onboarding issues; high activation but poor retention indicates value problems.'
// //         }
// //     ];

// //     const toggleFaq = (index) => {
// //         setOpenFaq(openFaq === index ? null : index);
// //     };

// //     return (
// //         <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
// //             {/* Hero Section */}
// //             <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
// //                 <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-black to-red-900/5"></div>
// //                 <div className="max-w-7xl mx-auto relative z-10">
// //                     <div className="space-y-8 max-w-4xl">
// //                         <div className="inline-block">
// //                             <span className="px-5 py-2 rounded-full text-sm font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
// //                                 Leading API Marketing Agency
// //                             </span>
// //                         </div>
// //                         <h1 className="text-5xl md:text-7xl font-black leading-tight">
// //                             Transform Integration Capabilities into Competitive
// //                             <span className="block bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mt-2">
// //                                 Revenue Engines
// //                             </span>
// //                         </h1>
// //                         <p className="text-xl text-gray-300 max-w-3xl">
// //                             Social Bureau, based in Kochi, Kerala, helps SaaS platforms, cloud providers, and technology companies achieve measurable growth through developer-centric strategies. Our specialized approach combines technical expertise with proven marketing methodologies to simplify first-time integrations, optimize developer portals, and build sustainable partner ecosystems.
// //                         </p>
// //                         <div className="pt-6">
// //                             <button className="group mb-6 px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-red-600 to-red-700 hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 flex items-center gap-3">
// //                                 Connect us
// //                                 <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </section>

// //             {/* About Section */}
// //             <section className="py-24 px-6 bg-black/50">
// //                 <div className="max-w-7xl mx-auto">
// //                     <div className="grid md:grid-cols-2 gap-12 items-start">
// //                         <div>
// //                             <h2 className="text-4xl md:text-5xl font-black mb-8">
// //                                 Strategic Acquisition in the
// //                                 <span className="block text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text mt-2">
// //                                     API Economy
// //                                 </span>
// //                             </h2>
// //                         </div>
// //                         <div className="space-y-6">
// //                             <p className="text-lg text-gray-300 leading-relaxed">
// //                                 We position your platform for success by transforming integration capabilities into discoverable, adoptable solutions. From interactive testing environments to clear pricing communication, we drive outcomes that matter: increased developer activation, expanded partnerships, and accelerated revenue.
// //                             </p>
// //                             <p className="text-lg text-gray-300 leading-relaxed">
// //                                 Modern platforms face a critical challenge: exceptional technical capabilities remain invisible without effective developer acquisition, streamlined onboarding workflows, and sustained integration retention. This discipline represents making application programming interfaces discoverable, evaluable, and valuable to technical audiences.
// //                             </p>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </section>

// //             {/* Services Section */}
// //             <section className="py-24 px-6 bg-black">
// //                 <div className="max-w-7xl mx-auto">
// //                     <div className="text-center mb-16">
// //                         <h2 className="text-4xl md:text-5xl font-black mb-4">
// //                             Our <span className="text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text">Services</span>
// //                         </h2>
// //                         <p className="text-xl text-gray-400">API marketing services in Kerala</p>
// //                     </div>

// //                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
// //                         {services.slice(0, 3).map((service, index) => (
// //                             <div
// //                                 key={index}
// //                                 className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10"
// //                             >
// //                                 <div className="text-4xl mb-6">{service.icon}</div>
// //                                 <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
// //                                 <p className="text-gray-400 mb-6">{service.description}</p>
// //                                 <ul className="space-y-3">
// //                                     {service.items.map((item, idx) => (
// //                                         <li key={idx} className="flex items-start">
// //                                             <span className="text-red-400 mr-2 mt-1">•</span>
// //                                             <span className="text-gray-300 text-sm">{item}</span>
// //                                         </li>
// //                                     ))}
// //                                 </ul>
// //                             </div>
// //                         ))}
// //                     </div>

// //                     <div className="grid md:grid-cols-2 gap-8 mt-8">
// //                         {services.slice(3).map((service, index) => (
// //                             <div
// //                                 key={index}
// //                                 className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10"
// //                             >
// //                                 <div className="text-4xl mb-6">{service.icon}</div>
// //                                 <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
// //                                 <p className="text-gray-400 mb-6">{service.description}</p>
// //                                 <ul className="space-y-3">
// //                                     {service.items.map((item, idx) => (
// //                                         <li key={idx} className="flex items-start">
// //                                             <span className="text-red-400 mr-2 mt-1">•</span>
// //                                             <span className="text-gray-300 text-sm">{item}</span>
// //                                         </li>
// //                                     ))}
// //                                 </ul>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>
// //             </section>

// //             {/* Why Choose Us Section */}
// //             <section className="py-24 px-6 bg-black/50">
// //                 <div className="max-w-7xl mx-auto">
// //                     <div className="text-center mb-16">
// //                         <h2 className="text-4xl md:text-5xl font-black mb-4">
// //                             Why Choose <span className="text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text">Us</span>
// //                         </h2>
// //                         <p className="text-xl text-gray-400">Technical Depth Meets Marketing Excellence</p>
// //                     </div>

// //                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
// //                         {whyChooseUs.slice(0, 3).map((item, index) => (
// //                             <div
// //                                 key={index}
// //                                 className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300"
// //                             >
// //                                 <h3 className="text-xl font-bold mb-4 text-red-400">{item.title}</h3>
// //                                 <p className="text-gray-300">{item.description}</p>
// //                             </div>
// //                         ))}
// //                     </div>

// //                     <div className="grid md:grid-cols-2 gap-8 mt-8">
// //                         {whyChooseUs.slice(3).map((item, index) => (
// //                             <div
// //                                 key={index}
// //                                 className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300"
// //                             >
// //                                 <h3 className="text-xl font-bold mb-4 text-red-400">{item.title}</h3>
// //                                 <p className="text-gray-300">{item.description}</p>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>

// //                 <LatestBlogs posts={posts} />
// //             </section>

// //             {/* Testimonials Section */}
// //             <section className="py-24 px-6 bg-black">
// //                 <div className="max-w-7xl mx-auto">
// //                     <div className="text-center mb-16">
// //                         <h2 className="text-4xl md:text-5xl font-black mb-4">
// //                             What Our <span className="text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text">Clients Say</span>
// //                         </h2>
// //                     </div>

// //                     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
// //                         {testimonials.map((testimonial, index) => (
// //                             <div
// //                                 key={index}
// //                                 className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300"
// //                             >
// //                                 <div className="flex items-center mb-6">
// //                                     <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center font-bold text-white mr-4">
// //                                         {testimonial.avatar}
// //                                     </div>
// //                                     <div>
// //                                         <h4 className="font-bold text-lg text-white">{testimonial.name}</h4>
// //                                     </div>
// //                                 </div>
// //                                 <p className="text-gray-300 italic">"{testimonial.text}"</p>
// //                                 <div className="flex mt-4">
// //                                     {[...Array(5)].map((_, i) => (
// //                                         <span key={i} className="text-red-500">★</span>
// //                                     ))}
// //                                 </div>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>
// //             </section>

// //             {/* FAQ Section */}
// //             <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
// //                 <div className="max-w-4xl mx-auto">
// //                     <div className="text-center mb-16">
// //                         <h2 className="text-4xl md:text-5xl font-black mb-4">
// //                             Frequently Asked <span className="text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text">Questions</span>
// //                         </h2>
// //                     </div>

// //                     <div className="space-y-4">
// //                         {faqs.map((faq, index) => (
// //                             <div
// //                                 key={index}
// //                                 className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden hover:border-red-500/50 transition-all duration-300"
// //                             >
// //                                 <button
// //                                     className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-900/50 transition-colors"
// //                                     onClick={() => toggleFaq(index)}
// //                                 >
// //                                     <h3 className="text-lg font-semibold pr-4 text-white">{faq.question}</h3>
// //                                     <ChevronDown
// //                                         size={20}
// //                                         className={`text-red-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
// //                                     />
// //                                 </button>
// //                                 {openFaq === index && (
// //                                     <div className="px-6 pb-6 pt-2 border-t border-gray-800">
// //                                         <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>
// //             </section>

// //             <Footer />
// //         </div>
// //     );
// // };

// // export default ApiMarketing;



// import React, { useState, useEffect, useRef } from 'react';
// import { ArrowRight, ChevronDown } from 'lucide-react';
// import Footer from './Footer';
// import { motion } from 'framer-motion';
// import posts from "../data/blogs";
// import LatestBlogs from '../components/LatestBlogs'

// // Interactive Background Component
// const InteractiveBackground = () => {
//     const [openFaq, setOpenFaq] = useState(null);
// const [expandedServices, setExpandedServices] = useState({});
//     const canvasRef = useRef(null);
//     const animationRef = useRef(null);
//     const wavesRef = useRef([]);
//     const mouseRef = useRef({ x: 0, y: 0 });
//     const gridRef = useRef([]);
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

//         const initGrid = () => {
//             gridRef.current = [];
//             const spacing = 80;
//             for (let x = 0; x < canvas.width + spacing; x += spacing) {
//                 for (let y = 0; y < canvas.height + spacing; y += spacing) {
//                     gridRef.current.push({
//                         originalX: x,
//                         originalY: y,
//                         x: x,
//                         y: y,
//                         offset: Math.random() * Math.PI * 2,
//                         amplitude: Math.random() * 20 + 10
//                     });
//                 }
//             }
//         };

//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//             initGrid();
//         };

//         resizeCanvas();
//         window.addEventListener('resize', resizeCanvas);

//         const initWaves = () => {
//             wavesRef.current = [];
//             for (let i = 0; i < 5; i++) {
//                 wavesRef.current.push({
//                     x: Math.random() * canvas.width,
//                     y: Math.random() * canvas.height,
//                     radius: 0,
//                     maxRadius: Math.random() * 200 + 100,
//                     speed: Math.random() * 2 + 1,
//                     opacity: Math.random() * 0.3 + 0.1,
//                     frequency: Math.random() * 0.02 + 0.01,
//                     phase: Math.random() * Math.PI * 2
//                 });
//             }
//         };

//         initWaves();

//         const handleMouseMove = (e) => {
//             mouseRef.current.x = e.clientX;
//             mouseRef.current.y = e.clientY;
//         };

//         window.addEventListener('mousemove', handleMouseMove);

//         const animate = () => {
//             const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
//             gradient.addColorStop(0, '#000000');
//             gradient.addColorStop(0.3, '#1a0000');
//             gradient.addColorStop(0.7, '#0d0000');
//             gradient.addColorStop(1, '#000000');
//             ctx.fillStyle = gradient;
//             ctx.fillRect(0, 0, canvas.width, canvas.height);

//             animationRef.current = requestAnimationFrame(animate);
//         };

//         animate();

//         return () => {
//             window.removeEventListener('resize', resizeCanvas);
//             window.removeEventListener('mousemove', handleMouseMove);
//             if (animationRef.current) cancelAnimationFrame(animationRef.current);
//         };
//     }, [isMobile]);

//     if (isMobile) {
//         return (
//             <div
//                 className="fixed inset-0 z-0 pointer-events-none"
//                 style={{
//                     background: 'linear-gradient(135deg, #000000 0%, #1a0000 30%, #0d0000 70%, #000000 100%)'
//                 }}
//             />
//         );
//     }

//     return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
// };

// const ApiMarketing = () => {
//     const [openFaq, setOpenFaq] = useState(null);

//     // Services data from PDF pages 2-3
//     const services = [
//         {
//             title: 'Developer Acquisition & Portal Optimization',
//             description: 'Developers typically discover integrations through organic search, peer recommendations, and technical communities. We focus on reaching high-intent audiences while optimizing developer portals for both real users and search visibility.',
//             items: [
//                 'Technical content architecture targeting integration-specific queries and comparison keywords',
//                 'Interactive testing environments demonstrating capabilities without authentication friction',
//                 'Implementation tutorials and use case documentation optimized for developer search behavior',
//                 'GraphQL queries and RESTful API reference materials that reduce evaluation time',
//                 'Strategic community presence building credibility and trust'
//             ],
//             icon: '👨‍💻'
//         },
//         {
//             title: 'Strategic Consulting for Sustainable Growth',
//             description: 'Our API consultant engagements audit existing developer journeys to identify adoption barriers and monetization opportunities. We focus on practical improvements that accelerate expansion while supporting long-term platform sustainability.',
//             items: [
//                 'API design-first methodology aligning technical architecture with market demand',
//                 'Revenue strategy development including usage-based pricing models and freemium structures',
//                 'Partner ecosystems expansion through integration marketplace positioning and co-marketing frameworks',
//                 'Security communication building trust through transparent OAuth 2.0 and JWT implementation',
//                 'Digital asset ROI analysis connecting integration investments to business outcomes'
//             ],
//             icon: '📈'
//         },
//         {
//             title: 'Integration Marketing & Product Positioning',
//             description: 'Platforms competing in modern technology markets require positioning that communicates both technical excellence and business value simultaneously. Our services help companies differentiate through strategic messaging resonating with developers and executives.',
//             items: [
//                 'Competitive differentiation based on developer experience benchmarks and integration ease',
//                 'Event-driven architecture adoption through targeted use case development',
//                 'Multi-language support marketing expanding addressable audience reach',
//                 'Integration capability positioning within digital transformation trends',
//                 'Simplified integration path marketing for citizen developers and non-technical users'
//             ],
//             icon: '🎯'
//         },
//         {
//             title: 'Developer Onboarding & Activation Optimization',
//             description: 'The first successful call predicts long-term retention. We analyze and optimize the complete journey from initial discovery through sustained usage, focusing on eliminating activation barriers and improving API growth metrics.',
//             items: [
//                 'Immediate functional sandbox access with pre-populated realistic scenarios',
//                 'Clear authentication flows and implementation guides',
//                 'Actionable error messages reducing support dependency',
//                 'Progressive disclosure revealing complexity based on experience level'
//             ],
//             icon: '⚡'
//         },
//         {
//             title: 'Ecosystem Expansion & Marketplace Strategy',
//             description: 'Platform growth accelerates when integrations exist within established software ecosystems. Our strategies position capabilities across automation platforms, marketplaces, and partner networks to establish your platform as the best API agency choice for developers.',
//             items: [
//                 'Zapier, Make, and n8n connector deployment and optimization',
//                 'Co-marketing programs and joint webinar frameworks',
//                 'Salesforce AppExchange, Shopify App Store, HubSpot Marketplace listing optimization',
//                 'Event-driven scenarios demonstrating platform flexibility'
//             ],
//             icon: '🌐'
//         }
//     ];

//     // Why Choose Us from PDF page 4-5
//     const whyChooseUs = [
//         {
//             title: 'Technical Depth Meets Marketing Excellence',
//             description: 'Social Bureau operates at the intersection of engineering and growth marketing. Our team includes former developers, technical writers, and integration specialists who understand design patterns, schema optimization, and developer experience principles driving adoption.'
//         },
//         {
//             title: 'Proven Methodology',
//             description: 'Our data-driven approach focuses on metrics correlating with business value: acquisition costs, activation rates, retention percentages, call volume growth, and revenue acceleration'
//         },
//         {
//             title: 'Client Trust',
//             description: 'Technology companies across India and globally choose us as their top API agency partner for specialized developer marketing expertise. Operating from Kochi, we serve platforms spanning SaaS, FinTech, and cloud infrastructure, demonstrating consistent outcomes across diverse environments.'
//         },
//         {
//             title: 'Product Specialists',
//             description: 'Unlike general agencies, we understand how developers evaluate integrations, what drives decisions, and how to optimize complete journeys from discovery through advocacy. This expertise positions us as a trusted API company in India with deep Kerala market knowledge and international standards.'
//         },
//         {
//             title: 'Regional Excellence',
//             description: 'Based in Kerala\'s thriving technology hub, we combine local market understanding with international best practices observed from platforms like Stripe, Twilio, and SendGrid, ensuring strategies work effectively across global developer communities while serving India\'s growing tech ecosystem.'
//         }
//     ];

//     // Testimonials from PDF pages 5-7
//     const testimonials = [
//         {
//             name: 'Arjun Menon',
//             text: 'Working with this team helped us clearly position our integrations for developers. Our onboarding became smoother, and we noticed better-quality technical inquiries within a short period.',
//             avatar: 'AM'
//         },
//         {
//             name: 'Suresh Raghavan',
//             text: 'They understand how developers actually evaluate APIs. The guidance we received improved our documentation structure and reduced confusion during integration.',
//             avatar: 'SR'
//         },
//         {
//             name: 'Ananya Nair',
//             text: 'What stood out was the clarity they brought to our platform messaging. It became easier for partners to understand where our integrations fit into real workflows.',
//             avatar: 'AN'
//         },
//         {
//             name: 'Meera Pillai',
//             text: 'Social Bureau helped us rethink how we present our integration capabilities. The focus on usability and trust made a noticeable difference in adoption.',
//             avatar: 'MP'
//         }
//     ];

//     // FAQs from PDF pages 7-9
//     const faqs = [
//         {
//             question: 'What exactly is API marketing and how is it different from regular software marketing?',
//             answer: 'API marketing targets developers through technical documentation, code examples, and interactive testing environments instead of sales presentations. Developers evaluate APIs by testing them directly and reading documentation, not through feature demos or sales calls.'
//         },
//         {
//             question: 'Why do developers ignore traditional marketing approaches?',
//             answer: 'Developers trust peer recommendations on Stack Overflow and GitHub over sales content. They search for specific code solutions and want to test functionality before committing time. Traditional sales tactics create friction instead of trust.'
//         },
//         {
//             question: 'What is TTFFC and why does it matter for API adoption?',
//             answer: 'TTFFC means Time to First Finished Call—how quickly developers make their first successful API request. The faster they succeed, the more likely they continue using your platform. If it takes too long, most developers abandon the integration.'
//         },
//         {
//             question: 'How does developer portal SEO differ from regular website SEO?',
//             answer: 'Developer portal SEO targets technical queries like "Python payment example" instead of broad terms. Focus on detailed tutorials, code documentation, integration guides, and optimize GitHub repositories where developers search for solutions.'
//         },
//         {
//             question: 'What role do functional sandboxes play in API growth?',
//             answer: 'Sandboxes let developers test your API immediately without setup or configuration. They provide sample data and realistic scenarios for quick validation. Platforms with excellent sandboxes see much higher conversion from evaluation to actual integration.'
//         },
//         {
//             question: 'Why should we work with Social Bureau for API marketing?',
//             answer: 'Social Bureau specializes in developer-focused marketing with a team of former developers and technical writers. We\'ve helped platforms significantly reduce integration time and increase developer signups. Based in Kochi, we focus on real business metrics: activation rates, API usage growth, and revenue.'
//         },
//         {
//             question: 'How do low-code connectors impact API adoption strategy?',
//             answer: 'Low-code connectors on Zapier, Make, and similar platforms expand your market to business users beyond developers. This increases your audience and lets teams build integrations before involving engineering. Serve both audiences: full documentation for developers, simple connectors for business users.'
//         },
//         {
//             question: 'What is API monetization and what pricing models work best?',
//             answer: 'API monetization turns integrations into revenue through usage-based pricing, tiered subscriptions, or free-to-paid models. Usage-based pricing charges customers based on how much they use, which scales naturally with their growth. Display clear pricing and usage information in your developer portal.'
//         },
//         {
//             question: 'How do partner ecosystems accelerate API growth?',
//             answer: 'Partner ecosystems multiply adoption through integrations with popular tools like CRMs, payment processors, and analytics platforms. Integration marketplaces expose your API to established user bases. Platforms with strong ecosystems see much more partner-driven adoption than direct marketing alone.'
//         },
//         {
//             question: 'What metrics should we track to measure API marketing success?',
//             answer: 'Track developer acquisition cost, activation rate, integration retention, API usage growth, and conversion to paid customers. These reveal problems: high signups but low activation means onboarding issues; high activation but poor retention indicates value problems.'
//         }
//     ];

//     const toggleFaq = (index) => {
//         setOpenFaq(openFaq === index ? null : index);
//     };
// const toggleServiceExpand = (index) => {
//   setExpandedServices(prev => ({
//     ...prev,
//     [index]: !prev[index]
//   }));
// };

//     return (
//         <div className="relative min-h-screen">
//             <InteractiveBackground />

//             {/* Floating Red Particles */}
//             <div className="absolute inset-0 pointer-events-none z-0">
//                 {[...Array(20)].map((_, i) => (
//                     <motion.div
//                         key={i}
//                         className="absolute w-1.5 h-1.5 rounded-full bg-red-500/40"
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
//                         className="absolute inset-0 bg-gradient-to-br from-[#0d0000] via-[#1a0000] to-black"
//                         style={{ filter: "blur(40px)" }}
//                     />

//                     {/* Background Image */}
//                     <motion.img
//                         src="https://i.pinimg.com/736x/9c/c9/8a/9cc98a51fece3a2d58be714649283bd8.jpg"
//                         alt="AI Illustration"
//                         initial={{ opacity: 0, y: 40 }}
//                         animate={{ opacity: 0.1, y: 0 }}
//                         transition={{ duration: 1 }}
//                         className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] object-contain pointer-events-none"
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
//                             border: "1px solid rgba(255,0,0,0.1)",
//                             boxShadow: "0 0 35px rgba(255,0,0,0.15)",
//                         }}
//                     >
//                         <div className="inline-block mb-6">
//                             <span className="px-5 py-2 rounded-full text-2xl font-semibold bg-red-500/10 text-red-300 border border-red-500/20">
//                                 Leading API Marketing Agency
//                             </span>
//                         </div>

//                         <h1
//                             style={{ fontFamily: "Playfair Display, serif" }}
//                             className="text-xl md:text-7xl font-black text-white leading-tight mb-4"
//                         >
//                             Transform Integration Capabilities into Competitive
//                             <span className="block text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-700 animate-pulse">
//                                 Revenue Engines
//                             </span>
//                         </h1>

//                         <motion.div
//                             initial={{ width: 0 }}
//                             whileInView={{ width: 70 }}
//                             transition={{ duration: 0.6 }}
//                             className="h-1 bg-red-500 mx-auto rounded-full mb-6"
//                         />

//                         <motion.p
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.3 }}
//                             className="text-md text-gray-300 max-w-lg mx-auto"
//                         >
//                             Social Bureau, based in Kochi, Kerala, helps SaaS platforms, cloud providers, and technology companies achieve measurable growth through developer-centric strategies. Our specialized approach combines technical expertise with proven marketing methodologies to simplify first-time integrations, optimize developer portals, and build sustainable partner ecosystems.
//                         </motion.p>

//                         <div className="pt-6">
//                             <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 className="group mb-4 px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-red-600 to-red-700 hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 flex items-center gap-3 mx-auto"
//                             >
//                                 <a href='/contact'>Connect us</a>
//                                 <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
//                             </motion.button>
//                         </div>
//                     </motion.div>
//                 </header>

//                 {/* About Section */}
//                 <section className="relative text-white py-24 px-6 backdrop-blur-sm bg-black/20">
//                     <div className="max-w-7xl mx-auto">
//                         <div className="grid md:grid-cols-2 gap-12 items-start">
//                             {/* <div>
//                                 <h2 className="text-4xl md:text-5xl font-bold mb-8">
//                                     Strategic Acquisition in the
//                                     <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 mt-2">
//                                         API Economy
//                                     </span>
//                                 </h2>
//                             </div> */}
// <div className="flex md:items-center md:justify-center">
//   <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
//     Strategic Acquisition in the
//     <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 mt-2">
//       API Economy
//     </span>
//   </h2>
// </div>


//                             <div className="space-y-6">
//                                 <p className="text-lg text-gray-300 leading-relaxed">
//                                     We position your platform for success by transforming integration capabilities into discoverable, adoptable solutions. From interactive testing environments to clear pricing communication, we drive outcomes that matter: increased developer activation, expanded partnerships, and accelerated revenue.
//                                 </p>
//                                 <p className="text-lg text-gray-300 leading-relaxed">
//                                     Modern platforms face a critical challenge: exceptional technical capabilities remain invisible without effective developer acquisition, streamlined onboarding workflows, and sustained integration retention. This discipline represents making application programming interfaces discoverable, evaluable, and valuable to technical audiences.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Services Section */}
//                 {/* <section className="relative text-white py-24 px-6">
//                     <div className="max-w-5xl mx-auto">
//                         <div className="text-center mb-16">
//                             <h2 className="text-4xl md:text-5xl font-bold mb-4">
//                                 Our <span className="text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text">Services</span>
//                             </h2>
//                             <p className="text-xl text-gray-400">API marketing services in Kerala</p>
//                         </div>

//                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                             {services.map((service, index) => (
//                                 <div
//                                     key={index}
//                                     className="group relative border border-gray-800 bg-black/30 backdrop-blur-lg rounded-2xl p-8 transition-all hover:border-red-600/50 hover:bg-black/40 min-h-[550px] flex flex-col"
//                                 >
//                                     <div className="flex-grow">
//                                         <h3 className="text-xl font-bold mb-4 text-white border-b border-gray-800 pb-3">
//                                             {service.title}
//                                         </h3>
//                                         <p className="text-gray-400 mb-6 text-sm leading-relaxed">
//                                             {service.description}
//                                         </p>

//                                         <div className="space-y-4">
//                                             <h4 className="text-red-400 font-semibold text-sm uppercase tracking-wider">
//                                                 Key Features:
//                                             </h4>
//                                             <ul className="space-y-3">
//                                                 {service.items.map((item, idx) => (
//                                                     <li key={idx} className="flex items-start">
//                                                         <span className="text-gray-500 text-xs mr-3 mt-1">▸</span>
//                                                         <span className="text-gray-300 text-sm flex-1">{item}</span>
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         className="bg-red-600 text-white px-6 py-3 mt-7 ml-7 rounded-md hover:bg-red-700 transition-all duration-200 flex items-center"
//                     >
//                 <span><a href='/contact'>Schedule a Consultation</a></span>
//                     </motion.button>
//                 </section> */}
// <section className="relative text-white py-24 px-6">
//                     <div className="max-w-5xl mx-auto">
//                         <div className="text-center mb-16">
//                             <h2 className="text-4xl md:text-5xl font-bold mb-4">
//                                 Our <span className="text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text">Services</span>
//                             </h2>
//                             <p className="text-xl text-gray-400">API marketing services in Kerala</p>
//                         </div>

//                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                             {services.map((service, index) => (
//                                 <div
//                                     key={index}
//                                     className="group relative border border-gray-800 bg-black/30 backdrop-blur-lg rounded-2xl p-8 transition-all hover:border-red-600/50 hover:bg-black/40 flex flex-col"
//                                 >
//                                     <div className="flex-grow">
//                                         <h3 className="text-xl font-bold mb-4 text-white border-b border-gray-800 pb-3">
//                                             {service.title}
//                                         </h3>
//                                         <p className="text-gray-400 mb-6 text-sm leading-relaxed">
//                                             {service.description}
//                                         </p>

//                                         {expandedServices[index] && (
//                                             <motion.div
//                                                 initial={{ opacity: 0, height: 0 }}
//                                                 animate={{ opacity: 1, height: 'auto' }}
//                                                 exit={{ opacity: 0, height: 0 }}
//                                                 transition={{ duration: 0.3 }}
//                                                 className="space-y-4"
//                                             >
//                                                 <h4 className="text-red-400 font-semibold text-sm uppercase tracking-wider">
//                                                     Key Features:
//                                                 </h4>
//                                                 <ul className="space-y-3">
//                                                     {service.items.map((item, idx) => (
//                                                         <li key={idx} className="flex items-start">
//                                                             <span className="text-gray-500 text-xs mr-3 mt-1">▸</span>
//                                                             <span className="text-gray-300 text-sm flex-1">{item}</span>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             </motion.div>
//                                         )}
//                                     </div>

//                                     <button
//                                         onClick={() => toggleServiceExpand(index)}
//                                         className="mt-6 text-red-400 hover:text-red-300 font-semibold text-sm flex items-center gap-2 transition-colors"
//                                     >
//                                         {expandedServices[index] ? (
//                                             <>
//                                                 See Less
//                                                 <ChevronDown size={16} className="rotate-180" />
//                                             </>
//                                         ) : (
//                                             <>
//                                                 View More
//                                                 <ChevronDown size={16} />
//                                             </>
//                                         )}
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         className="bg-red-600 text-white px-6 py-3 mt-7 ml-7 rounded-md hover:bg-red-700 transition-all duration-200 flex items-center"
//                     >
//                         <span>Schedule a Consultation</span>
//                     </motion.button>
//                 </section>

//                 {/* Why Choose Us Section */}
//                 <section className="relative text-white py-24 px-6 backdrop-blur-sm bg-black/20">
//                     <div className="max-w-7xl mx-auto">
//                         <div className="text-center mb-16">
//                             <h2 className="text-4xl md:text-5xl font-bold mb-4">
//                                 Why Choose <span className="text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text">Us</span>
//                             </h2>
//                             <p className="text-xl text-gray-400">Technical Depth Meets Marketing Excellence</p>
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
//                                                 <p className="text-red-400 text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                                     Hover to learn more
//                                                 </p>
//                                             </div>
//                                         </div>

//                                         {/* Back of Card - Description Only */}
//                                         <div className="absolute inset-0 border border-red-500/30 bg-black/70 backdrop-blur-lg rounded-2xl p-8 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden">
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
//                             src="https://i.pinimg.com/736x/80/db/ed/80dbed77700c602352393c71b285a9ae.jpg"
//                             animate={{ scale: [1, 1.1, 1] }}
//                             transition={{ duration: 10, repeat: Infinity }}
//                             className="w-full h-full object-cover"
//                         />
//                     </div>

//                     <div className="max-w-7xl mx-auto">
//                         <div className="text-center mb-16">
//                             <h2 className="text-4xl md:text-5xl font-bold mb-4">
//                                 What Our <span className="text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text">Clients Say</span>
//                             </h2>
//                         </div>

//                         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//                             {testimonials.map((testimonial, index) => (
//                                 <motion.div
//                                     key={index}
//                                     whileHover={{ scale: 1.02 }}
//                                     className="bg-black/30 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 hover:border-red-500/50 transition-all"
//                                 >
//                                     <div className="flex items-center mb-6">
//                                         <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center font-bold text-white mr-4">
//                                             {testimonial.avatar}
//                                         </div>
//                                         <div>
//                                             <h4 className="font-bold text-lg text-white">{testimonial.name}</h4>
//                                         </div>
//                                     </div>
//                                     <p className="text-gray-300 italic">"{testimonial.text}"</p>
//                                     <div className="flex mt-4">
//                                         {[...Array(5)].map((_, i) => (
//                                             <span key={i} className="text-red-500">★</span>
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
//                                 Frequently Asked <span className="text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text">Questions</span>
//                             </h2>
//                         </div>

//                         <div className="space-y-4">
//                             {faqs.map((faq, index) => (
//                                 <motion.div
//                                     key={index}
//                                     whileHover={{ scale: 1.01 }}
//                                     className="bg-black/30 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-red-500/50 transition-all"
//                                 >
//                                     <button
//                                         className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-900/50 transition-colors"
//                                         onClick={() => toggleFaq(index)}
//                                     >
//                                         <h3 className="text-lg font-semibold pr-4 text-white">{faq.question}</h3>
//                                         <ChevronDown
//                                             size={20}
//                                             className={`text-red-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
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

// export default ApiMarketing;



import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Footer from './Footer';
import { motion } from 'framer-motion';
import posts from "../data/blogs";
import LatestBlogs from '../components/LatestBlogs'

// Interactive Background Component
const InteractiveBackground = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const wavesRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const gridRef = useRef([]);
    const [isMobile, setIsMobile] = React.useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const initGrid = () => {
            gridRef.current = [];
            const spacing = 80;
            for (let x = 0; x < canvas.width + spacing; x += spacing) {
                for (let y = 0; y < canvas.height + spacing; y += spacing) {
                    gridRef.current.push({
                        originalX: x,
                        originalY: y,
                        x: x,
                        y: y,
                        offset: Math.random() * Math.PI * 2,
                        amplitude: Math.random() * 20 + 10
                    });
                }
            }
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initGrid();
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const initWaves = () => {
            wavesRef.current = [];
            for (let i = 0; i < 5; i++) {
                wavesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: 0,
                    maxRadius: Math.random() * 200 + 100,
                    speed: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.3 + 0.1,
                    frequency: Math.random() * 0.02 + 0.01,
                    phase: Math.random() * Math.PI * 2
                });
            }
        };

        initWaves();

        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#000000');
            gradient.addColorStop(0.3, '#1a0000');
            gradient.addColorStop(0.7, '#0d0000');
            gradient.addColorStop(1, '#000000');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [isMobile]);

    if (isMobile) {
        return (
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(135deg, #000000 0%, #1a0000 30%, #0d0000 70%, #000000 100%)'
                }}
            />
        );
    }

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

const ApiMarketing = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [expandedService, setExpandedService] = useState({});

    // Services data from PDF pages 2-3
    const services = [
        {
            title: 'Developer Acquisition & Portal Optimization',
            description: 'Developers typically discover integrations through organic search, peer recommendations, and technical communities. We focus on reaching high-intent audiences while optimizing developer portals for both real users and search visibility.',
            items: [
                'Technical content architecture targeting integration-specific queries and comparison keywords',
                'Interactive testing environments demonstrating capabilities without authentication friction',
                'Implementation tutorials and use case documentation optimized for developer search behavior',
                'GraphQL queries and RESTful API reference materials that reduce evaluation time',
                'Strategic community presence building credibility and trust'
            ],
            icon: '👨‍💻'
        },
        {
            title: 'Strategic Consulting for Sustainable Growth',
            description: 'Our API consultant engagements audit existing developer journeys to identify adoption barriers and monetization opportunities. We focus on practical improvements that accelerate expansion while supporting long-term platform sustainability.',
            items: [
                'API design-first methodology aligning technical architecture with market demand',
                'Revenue strategy development including usage-based pricing models and freemium structures',
                'Partner ecosystems expansion through integration marketplace positioning and co-marketing frameworks',
                'Security communication building trust through transparent OAuth 2.0 and JWT implementation',
                'Digital asset ROI analysis connecting integration investments to business outcomes'
            ],
            icon: '📈'
        },
        {
            title: 'Integration Marketing & Product Positioning',
            description: 'Platforms competing in modern technology markets require positioning that communicates both technical excellence and business value simultaneously. Our services help companies differentiate through strategic messaging resonating with developers and executives.',
            items: [
                'Competitive differentiation based on developer experience benchmarks and integration ease',
                'Event-driven architecture adoption through targeted use case development',
                'Multi-language support marketing expanding addressable audience reach',
                'Integration capability positioning within digital transformation trends',
                'Simplified integration path marketing for citizen developers and non-technical users'
            ],
            icon: '🎯'
        },
        {
            title: 'Developer Onboarding & Activation Optimization',
            description: 'The first successful call predicts long-term retention. We analyze and optimize the complete journey from initial discovery through sustained usage, focusing on eliminating activation barriers and improving API growth metrics.',
            items: [
                'Immediate functional sandbox access with pre-populated realistic scenarios',
                'Clear authentication flows and implementation guides',
                'Actionable error messages reducing support dependency',
                'Progressive disclosure revealing complexity based on experience level'
            ],
            icon: '⚡'
        },
        {
            title: 'Ecosystem Expansion & Marketplace Strategy',
            description: 'Platform growth accelerates when integrations exist within established software ecosystems. Our strategies position capabilities across automation platforms, marketplaces, and partner networks to establish your platform as the best API agency choice for developers.',
            items: [
                'Zapier, Make, and n8n connector deployment and optimization',
                'Co-marketing programs and joint webinar frameworks',
                'Salesforce AppExchange, Shopify App Store, HubSpot Marketplace listing optimization',
                'Event-driven scenarios demonstrating platform flexibility'
            ],
            icon: '🌐'
        }
    ];

    // Why Choose Us from PDF page 4-5
    const whyChooseUs = [
        {
            title: 'Technical Depth Meets Marketing Excellence',
            description: 'Social Bureau operates at the intersection of engineering and growth marketing. Our team includes former developers, technical writers, and integration specialists who understand design patterns, schema optimization, and developer experience principles driving adoption.'
        },
        {
            title: 'Proven Methodology',
            description: 'Our data-driven approach focuses on metrics correlating with business value: acquisition costs, activation rates, retention percentages, call volume growth, and revenue acceleration'
        },
        {
            title: 'Client Trust',
            description: 'Technology companies across India and globally choose us as their top API agency partner for specialized developer marketing expertise. Operating from Kochi, we serve platforms spanning SaaS, FinTech, and cloud infrastructure, demonstrating consistent outcomes across diverse environments.'
        },
        {
            title: 'Product Specialists',
            description: 'Unlike general agencies, we understand how developers evaluate integrations, what drives decisions, and how to optimize complete journeys from discovery through advocacy. This expertise positions us as a trusted API company in India with deep Kerala market knowledge and international standards.'
        },
        {
            title: 'Regional Excellence',
            description: 'Based in Kerala\'s thriving technology hub, we combine local market understanding with international best practices observed from platforms like Stripe, Twilio, and SendGrid, ensuring strategies work effectively across global developer communities while serving India\'s growing tech ecosystem.'
        }
    ];

    // Testimonials from PDF pages 5-7
    const testimonials = [
        {
            name: 'Arjun Menon',
            text: 'Working with this team helped us clearly position our integrations for developers. Our onboarding became smoother, and we noticed better-quality technical inquiries within a short period.',
            avatar: 'AM'
        },
        {
            name: 'Suresh Raghavan',
            text: 'They understand how developers actually evaluate APIs. The guidance we received improved our documentation structure and reduced confusion during integration.',
            avatar: 'SR'
        },
        {
            name: 'Ananya Nair',
            text: 'What stood out was the clarity they brought to our platform messaging. It became easier for partners to understand where our integrations fit into real workflows.',
            avatar: 'AN'
        },
        {
            name: 'Meera Pillai',
            text: 'Social Bureau helped us rethink how we present our integration capabilities. The focus on usability and trust made a noticeable difference in adoption.',
            avatar: 'MP'
        }
    ];

    // FAQs from PDF pages 7-9
    const faqs = [
        {
            question: 'What exactly is API marketing and how is it different from regular software marketing?',
            answer: 'API marketing targets developers through technical documentation, code examples, and interactive testing environments instead of sales presentations. Developers evaluate APIs by testing them directly and reading documentation, not through feature demos or sales calls.'
        },
        {
            question: 'Why do developers ignore traditional marketing approaches?',
            answer: 'Developers trust peer recommendations on Stack Overflow and GitHub over sales content. They search for specific code solutions and want to test functionality before committing time. Traditional sales tactics create friction instead of trust.'
        },
        {
            question: 'What is TTFFC and why does it matter for API adoption?',
            answer: 'TTFFC means Time to First Finished Call—how quickly developers make their first successful API request. The faster they succeed, the more likely they continue using your platform. If it takes too long, most developers abandon the integration.'
        },
        {
            question: 'How does developer portal SEO differ from regular website SEO?',
            answer: 'Developer portal SEO targets technical queries like "Python payment example" instead of broad terms. Focus on detailed tutorials, code documentation, integration guides, and optimize GitHub repositories where developers search for solutions.'
        },
        {
            question: 'What role do functional sandboxes play in API growth?',
            answer: 'Sandboxes let developers test your API immediately without setup or configuration. They provide sample data and realistic scenarios for quick validation. Platforms with excellent sandboxes see much higher conversion from evaluation to actual integration.'
        },
        {
            question: 'Why should we work with Social Bureau for API marketing?',
            answer: 'Social Bureau specializes in developer-focused marketing with a team of former developers and technical writers. We\'ve helped platforms significantly reduce integration time and increase developer signups. Based in Kochi, we focus on real business metrics: activation rates, API usage growth, and revenue.'
        },
        {
            question: 'How do low-code connectors impact API adoption strategy?',
            answer: 'Low-code connectors on Zapier, Make, and similar platforms expand your market to business users beyond developers. This increases your audience and lets teams build integrations before involving engineering. Serve both audiences: full documentation for developers, simple connectors for business users.'
        },
        {
            question: 'What is API monetization and what pricing models work best?',
            answer: 'API monetization turns integrations into revenue through usage-based pricing, tiered subscriptions, or free-to-paid models. Usage-based pricing charges customers based on how much they use, which scales naturally with their growth. Display clear pricing and usage information in your developer portal.'
        },
        {
            question: 'How do partner ecosystems accelerate API growth?',
            answer: 'Partner ecosystems multiply adoption through integrations with popular tools like CRMs, payment processors, and analytics platforms. Integration marketplaces expose your API to established user bases. Platforms with strong ecosystems see much more partner-driven adoption than direct marketing alone.'
        },
        {
            question: 'What metrics should we track to measure API marketing success?',
            answer: 'Track developer acquisition cost, activation rate, integration retention, API usage growth, and conversion to paid customers. These reveal problems: high signups but low activation means onboarding issues; high activation but poor retention indicates value problems.'
        }
    ];

    const toggleServiceExpand = (index) => {
        // If clicking on already expanded service, collapse it
        // Otherwise, expand the clicked service
        setExpandedService(expandedService === index ? null : index);
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="relative min-h-screen">
            <InteractiveBackground />

            {/* Floating Red Particles */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-red-500/40"
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
                    ></motion.div>
                ))}
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <header className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 bg-gradient-to-br from-[#0d0000] via-[#1a0000] to-black"
                        style={{ filter: "blur(40px)" }}
                    />

                    {/* Background Image */}
                    <motion.img
                        src="https://i.pinimg.com/736x/9c/c9/8a/9cc98a51fece3a2d58be714649283bd8.jpg"
                        alt="AI Illustration"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 0.1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] object-contain pointer-events-none"
                    />

                    {/* Hero Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 max-w-5xl mx-auto text-center px-8 py-10 rounded-3xl"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            backdropFilter: "blur(22px)",
                            border: "1px solid rgba(255,0,0,0.1)",
                            boxShadow: "0 0 35px rgba(255,0,0,0.15)",
                        }}
                    >
                        <div className="inline-block mb-6">
                            <span className="px-5 py-2 rounded-full text-2xl font-semibold bg-red-500/10 text-red-300 border border-red-500/20">
                                Leading API Marketing Agency
                            </span>
                        </div>

                        <h1
                            style={{ fontFamily: "Playfair Display, serif" }}
                            className="text-xl md:text-7xl font-black text-white leading-tight mb-4"
                        >
                            Transform Integration Capabilities into Competitive
                            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-700 animate-pulse">
                                Revenue Engines
                            </span>
                        </h1>

                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 70 }}
                            transition={{ duration: 0.6 }}
                            className="h-1 bg-red-500 mx-auto rounded-full mb-6"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-md text-gray-300 max-w-lg mx-auto"
                        >
                            Social Bureau, based in Kochi, Kerala, helps SaaS platforms, cloud providers, and technology companies achieve measurable growth through developer-centric strategies. Our specialized approach combines technical expertise with proven marketing methodologies to simplify first-time integrations, optimize developer portals, and build sustainable partner ecosystems.
                        </motion.p>

                        <div className="pt-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="group mb-4 px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-red-600 to-red-700 hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 flex items-center gap-3 mx-auto"
                            >
                                <a href='/contact'>Connect us</a>
                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </motion.button>
                        </div>
                    </motion.div>
                </header>

                {/* About Section */}
<section className="relative text-white py-15 px-6 backdrop-blur-sm bg-black/20">
    <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
                <div className="flex md:items-center md:justify-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-center">
                        Strategic Acquisition in the
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                            API Economy
                        </span>
                    </h2>
                </div>
                
                <div className="flex justify-center">
                    <img 
                        src='/assets/api5.png' 
                        alt='API Illustration' 
                        className="max-w-80 h-67 rounded-lg shadow-lg"
                    />
                </div>
            </div>

            <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                    We position your platform for success by transforming integration capabilities into discoverable, adoptable solutions. From interactive testing environments to clear pricing communication, we drive outcomes that matter: increased developer activation, expanded partnerships, and accelerated revenue.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                    Modern platforms face a critical challenge: exceptional technical capabilities remain invisible without effective developer acquisition, streamlined onboarding workflows, and sustained integration retention. This discipline represents making application programming interfaces discoverable, evaluable, and valuable to technical audiences.
                </p>
            </div>
        </div>
    </div>
</section>

                {/* Services Section */}
                {/* <section className="relative text-white py-24 px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Our <span className="text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text">Services</span>
                            </h2>
                            <p className="text-xl text-gray-400">API marketing services in Kerala</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className="group relative border border-gray-800 bg-black/30 backdrop-blur-lg rounded-2xl p-8 transition-all hover:border-red-600/50 hover:bg-black/40 flex flex-col"
                                >
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold mb-4 text-white border-b border-gray-800 pb-3">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                                            {service.description}
                                        </p>

                                        {expandedServices[index] && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="space-y-4"
                                            >
                                                <h4 className="text-red-400 font-semibold text-sm uppercase tracking-wider">
                                                    Key Features:
                                                </h4>
                                                <ul className="space-y-3">
                                                    {service.items.map((item, idx) => (
                                                        <li key={idx} className="flex items-start">
                                                            <span className="text-gray-500 text-xs mr-3 mt-1">▸</span>
                                                            <span className="text-gray-300 text-sm flex-1">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => toggleServiceExpand(index)}
                                        className="mt-6 text-red-400 hover:text-red-300 font-semibold text-sm flex items-center gap-2 transition-colors"
                                    >
                                        {expandedServices[index] ? (
                                            <>
                                                See Less
                                                <ChevronDown size={16} className="rotate-180" />
                                            </>
                                        ) : (
                                            <>
                                                View More
                                                <ChevronDown size={16} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="bg-red-600 text-white px-6 py-3 mt-7 rounded-md hover:bg-red-700 transition-all duration-200 flex items-center justify-center mx-auto"
                        >
                            <span><a href='/contact'>Schedule a Consultation</a></span>
                        </motion.button>
                    </div>
                </section> */}
{/* <section className="relative text-white py-24 px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Our <span className="text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text">Services</span>
                            </h2>
                            <p className="text-xl text-gray-400">API marketing services in Kerala</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className="group relative border border-gray-800 bg-black/30 backdrop-blur-lg rounded-2xl p-8 transition-all hover:border-red-600/50 hover:bg-black/40 flex flex-col"
                                >
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold mb-4 text-white border-b border-gray-800 pb-3">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                                            {service.description}
                                        </p>

                                        {expandedService === index && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="space-y-4"
                                            >
                                                <h4 className="text-red-400 font-semibold text-sm uppercase tracking-wider">
                                                    Key Features:
                                                </h4>
                                                <ul className="space-y-3">
                                                    {service.items.map((item, idx) => (
                                                        <li key={idx} className="flex items-start">
                                                            <span className="text-gray-500 text-xs mr-3 mt-1">▸</span>
                                                            <span className="text-gray-300 text-sm flex-1">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => setExpandedService(expandedService === index ? null : index)}
                                        className="mt-6 text-red-400 hover:text-red-300 font-semibold text-sm flex items-center gap-2 transition-colors"
                                    >
                                        {expandedService === index ? (
                                            <>
                                                See Less
                                                <ChevronDown size={16} className="rotate-180" />
                                            </>
                                        ) : (
                                            <>
                                                View More
                                                <ChevronDown size={16} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="bg-red-600 text-white px-6 py-3 mt-7 rounded-md hover:bg-red-700 transition-all duration-200 flex items-center justify-center mx-auto"
                        >
                            Schedule a Consultation
                        </motion.button>
                    </div>
                </section> */}
 {/* <section className="relative text-white py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Our <span className="text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text">Services</span>
                        </h2>
                        <p className="text-xl text-gray-400">API marketing services in Kerala</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="group relative border border-gray-800 bg-black/30 backdrop-blur-lg rounded-2xl p-8 transition-all hover:border-red-600/50 hover:bg-black/40 flex flex-col"
                            >
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold mb-4 text-white border-b border-gray-800 pb-3">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                                        {service.description}
                                    </p>

                                    {expandedService === index && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4"
                                        >
                                            <h4 className="text-red-400 font-semibold text-sm uppercase tracking-wider">
                                                Key Features:
                                            </h4>
                                            <ul className="space-y-3">
                                                {service.items.map((item, idx) => (
                                                    <li key={idx} className="flex items-start">
                                                        <span className="text-gray-500 text-xs mr-3 mt-1">▸</span>
                                                        <span className="text-gray-300 text-sm flex-1">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </div>

                                <button
                                    onClick={() => toggleServiceExpand(index)}
                                    className="mt-6 text-red-400 hover:text-red-300 font-semibold text-sm flex items-center gap-2 transition-colors"
                                >
                                    {expandedService === index ? (
                                        <>
                                            See Less
                                            <ChevronDown size={16} className="rotate-180" />
                                        </>
                                    ) : (
                                        <>
                                            View More
                                            <ChevronDown size={16} />
                                        </>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="bg-red-600 text-white px-6 py-3 mt-7 rounded-md hover:bg-red-700 transition-all duration-200 flex items-center justify-center mx-auto"
                    >
                        <a href='/contact'>Schedule a Consultation</a>
                    </motion.button>
                </div>
            </section> */}
<section className="relative text-white py-24 px-6">
    <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our <span className="text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text">Services</span>
            </h2>
            <p className="text-xl text-gray-400">API marketing services in Kerala</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
                <div
                    key={index}
                    className="relative h-[400px] [perspective:1000px] group cursor-pointer"
                >
                    <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                        {/* Front of Card - Title and Description */}
                        <div className="absolute inset-0 border border-gray-800 bg-black/40 backdrop-blur-lg rounded-2xl p-8 [backface-visibility:hidden]">
                            <h3 className="text-xl font-bold mb-4 text-white border-b border-gray-800 pb-3">
                                {service.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </div>

                        {/* Back of Card - Key Features Only */}
                        <div className="absolute inset-0 border border-red-500/30 bg-black/70 backdrop-blur-lg rounded-2xl p-8 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                            <h3 className="text-xl font-bold mb-4 text-white border-b border-gray-800 pb-3">
                                {service.title}
                            </h3>
                            
                            <h4 className="text-red-400 font-semibold text-sm uppercase tracking-wider mb-4">
                                Key Features:
                            </h4>
                            <ul className="space-y-2">
                                {service.items.slice(0, 4).map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span className="text-red-500 text-xs mr-2 mt-1">•</span>
                                        <span className="text-gray-300 text-xs flex-1">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-red-600 text-white px-6 py-3 mt-7 rounded-md hover:bg-red-700 transition-all duration-200 flex items-center justify-center mx-auto"
        >
            <a href='/contact'>Schedule a Consultation</a>
        </motion.button>
    </div>
</section>


                {/* Why Choose Us Section */}
                <section className="relative text-white py-24 px-6 backdrop-blur-sm bg-black/20">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Why Choose <span className="text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text">Us</span>
                            </h2>
                            <p className="text-xl text-gray-400">Technical Depth Meets Marketing Excellence</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {whyChooseUs.map((item, index) => (
                                <div
                                    key={index}
                                    className="relative h-[300px] [perspective:1000px] group cursor-pointer"
                                >
                                    <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                        {/* Front of Card - Title Only */}
                                        <div className="absolute inset-0 border border-gray-800 bg-black/40 backdrop-blur-lg rounded-2xl p-8 flex items-center justify-center [backface-visibility:hidden] overflow-hidden">
                                            <div className="text-center">
                                                <h3 className="text-xl font-bold text-white">
                                                    {item.title}
                                                </h3>
                                                <p className="text-red-400 text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    Hover to learn more
                                                </p>
                                            </div>
                                        </div>

                                        {/* Back of Card - Description Only */}
                                        <div className="absolute inset-0 border border-red-500/30 bg-black/70 backdrop-blur-lg rounded-2xl p-8 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden">
                                            <div className="w-full h-full flex items-center">
                                                <p className="text-gray-300 text-sm leading-relaxed text-center">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="relative text-white py-24 px-6">
                    <div className="absolute inset-0 -z-10 opacity-20">
                        <motion.img
                            src="https://i.pinimg.com/736x/80/db/ed/80dbed77700c602352393c71b285a9ae.jpg"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                What Our <span className="text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text">Clients Say</span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-black/30 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 hover:border-red-500/50 transition-all"
                                >
                                    <div className="flex items-center mb-6">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center font-bold text-white mr-4">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-white">{testimonial.name}</h4>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 italic">"{testimonial.text}"</p>
                                    <div className="flex mt-4">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-red-500">★</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
                
                <LatestBlogs posts={posts} />
                
                {/* FAQ Section */}
                <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Frequently Asked <span className="text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text">Questions</span>
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.01 }}
                                    className="bg-black/30 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-red-500/50 transition-all"
                                >
                                    <button
                                        className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-900/50 transition-colors"
                                        onClick={() => toggleFaq(index)}
                                    >
                                        <h3 className="text-lg font-semibold pr-4 text-white">{faq.question}</h3>
                                        <ChevronDown
                                            size={20}
                                            className={`text-red-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
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

export default ApiMarketing;