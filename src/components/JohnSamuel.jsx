// // import React, { useState } from 'react';
// // import { ChevronRight } from 'lucide-react';
// // import Footer from './Footer';

// // export default function BenjaminPortfolio() {
// //   const [activeFilter, setActiveFilter] = useState('All');

// //   return (
// //     <div className="bg-white text-gray-900 font-sans overflow-x-hidden">
// //       {/* Navigation/Header */}
// //       <header className="fixed top-0 right-0 h-screen w-20 bg-gradient-to-b from-yellow-300 to-yellow-200 flex flex-col items-center justify-start pt-12 gap-8 z-50">
// //         <div className="text-2xl text-yellow-900">☰</div>
// //         <div className="space-y-6 flex flex-col items-center">
// //           <div className="w-12 h-12 rounded-lg bg-white/30 flex items-center justify-center">👤</div>
// //           <div className="w-12 h-12 rounded-lg bg-white/30 flex items-center justify-center">💼</div>
// //           <div className="w-12 h-12 rounded-lg bg-white/30 flex items-center justify-center">🖼</div>
// //           <div className="w-12 h-12 rounded-lg bg-white/30 flex items-center justify-center">📧</div>
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <main className="mr-20">
// //         {/* Hero Section */}
// //         <section className="min-h-screen flex items-center justify-between px-16 py-20 bg-white relative overflow-hidden">
// //           {/* Left Content */}
// //           <div className="flex-1 max-w-2xl z-10">
// //             <div className="text-7xl font-black mb-8 text-gray-900 leading-tight">
// //               HI THERE!
// //             </div>
// //             <div className="mb-8">
// //               <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">
// //                 I'M BENJAMIN
// //               </span>
// //             </div>
            
// //             <div className="inline-block bg-yellow-300 text-yellow-900 px-6 py-2 rounded-full text-sm font-bold mb-8 tracking-wide">
// //               GRAPHIC DESIGNER / PHOTOGRAPHER
// //             </div>

// //             <p className="text-gray-600 leading-relaxed text-base mb-8 max-w-lg">
// //               With 10+ years of creative experience, I'm here to deliver design that hits the mark. I combine strategy with craft to create visual identities that connect, inspire and drive results. Let's talk about your next project.
// //             </p>

// //             <button className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
// //               MORE ABOUT ME
// //               <ChevronRight size={24} />
// //             </button>
// //           </div>

// //           {/* Right Image - Profile Photo */}
// //           <div className="flex-1 flex items-center justify-center relative">
// //             <div className="w-96 h-96 rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
// //               <div className="text-center text-gray-500">
// //                 <img src='/assets/black.jpg'
// //                 height='300'/>
// //               </div>
// //             </div>
            
// //             {/* Decorative Golden Bar */}
// //             <div className="absolute -right-32 top-1/2 transform -translate-y-1/2 w-16 h-64 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-full opacity-80 shadow-2xl"></div>
// //           </div>
// //         </section>

// //         {/* Portfolio Section */}
// //         <section className="px-16 py-32 bg-gray-50">
// //           <div className="max-w-6xl mx-auto">
// //             {/* Section Header */}
// //             <div className="mb-16">
// //               <div className="inline-block bg-yellow-300 text-yellow-900 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest">
// //                 01
// //               </div>
// //               <h2 className="text-5xl font-black text-gray-900 mb-4">Portfolio</h2>
// //               <p className="text-lg text-gray-600">Capturing moments through lenses</p>
// //             </div>

// //             {/* Partners Section */}
// //             <div className="bg-white rounded-2xl p-12 mb-16 shadow-md">
// //               <h3 className="text-2xl font-bold text-gray-900 mb-8">OUR PARTNERS</h3>
// //               <div className="flex gap-8">
// //                 <div className="text-5xl font-black text-gray-300">2025</div>
// //                 <div className="space-y-2">
// //                   <p className="text-gray-700 font-semibold">Content Writer — Copywriter</p>
// //                   <p className="text-gray-700 font-semibold">Photography</p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Filters */}
// //             <div className="flex gap-4 mb-12 flex-wrap">
// //               {['All', 'Design', 'Development', 'Photography'].map((tag) => (
// //                 <button
// //                   key={tag}
// //                   onClick={() => setActiveFilter(tag)}
// //                   className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
// //                     activeFilter === tag
// //                       ? 'bg-yellow-300 text-yellow-900 shadow-md'
// //                       : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-yellow-300'
// //                   }`}
// //                 >
// //                   {tag}
// //                 </button>
// //               ))}
// //             </div>

// //             {/* Portfolio Grid */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //               {[1, 2, 3, 4, 5, 6].map((item) => (
// //                 <div
// //                   key={item}
// //                   className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
// //                 >
// //                   <div className="w-full h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
// //                     <img src='/assets/black.jpg'
// //                 height='300'/>
// //                   </div>
// //                   <div className="p-6">
// //                     <p className="text-sm text-yellow-600 font-bold mb-2">Photography</p>
// //                     <h3 className="text-xl font-bold text-gray-900 mb-2">Project {item}</h3>
// //                     <p className="text-gray-600 text-sm">Professional portfolio piece</p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         {/* Featured Partners Section */}
// //         <section className="px-16 py-32 bg-white">
// //           <div className="max-w-6xl mx-auto">
// //             <h2 className="text-4xl font-black text-gray-900 mb-12">Featured Partners</h2>
// //             <p className="text-gray-600 mb-12">Explore amazing projects from talented creators</p>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
// //               {['RANJIT', 'SARAH'].map((partner) => (
// //                 <div key={partner} className="relative">
// //                   <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center mb-6 shadow-lg">
// //                     <span className="text-6xl">👥</span>
// //                   </div>
// //                   <h3 className="text-2xl font-black text-gray-900">{partner}</h3>
// //                   <p className="text-gray-600 mt-2">Creative Professional</p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         <Footer/>
// //       </main>
// //     </div>
// //   );
// // }



// import React, { useState } from 'react';
// import { ChevronRight } from 'lucide-react';
// import Footer from './Footer';

// export default function JohnSamuelPortfolio() {
//   const [activeFilter, setActiveFilter] = useState('All');

//   return (
//     <div className="bg-white text-gray-900 font-sans overflow-x-hidden">
//       {/* Navigation/Header */}
//       <header className="fixed top-0 right-0 h-screen w-20 bg-gradient-to-b from-yellow-300 to-yellow-200 flex flex-col items-center justify-start pt-12 gap-8 z-50">
//         <div className="text-2xl text-yellow-900">☰</div>
//         <div className="space-y-6 flex flex-col items-center">
//           <div className="w-12 h-12 rounded-lg bg-white/30 flex items-center justify-center">👤</div>
//           <div className="w-12 h-12 rounded-lg bg-white/30 flex items-center justify-center">💼</div>
//           <div className="w-12 h-12 rounded-lg bg-white/30 flex items-center justify-center">🖼</div>
//           <div className="w-12 h-12 rounded-lg bg-white/30 flex items-center justify-center">📧</div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="mr-20">
//         {/* Hero Section */}
//         <section className="min-h-screen flex items-center justify-between px-16 py-20 bg-white relative overflow-hidden">
//           {/* Left Content */}
//           <div className="flex-1 max-w-2xl z-10">
//             <div className="text-7xl font-black mb-8 text-gray-900 leading-tight">
//               HI THERE!
//             </div>
//             <div className="mb-8">
//               <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">
//                 I'M JOHN SAMUEL
//               </span>
//             </div>
            
//             <div className="inline-block bg-yellow-300 text-yellow-900 px-6 py-2 rounded-full text-sm font-bold mb-8 tracking-wide">
//               SALES, MARKETING & STRATEGIC PARTNERSHIPS
//             </div>

//             <p className="text-gray-600 leading-relaxed text-base mb-8 max-w-lg">
//               With expertise in hospitality and healthcare sectors, I specialize in strategic partnerships, business development, and integrated marketing strategies. I combine industry knowledge with proven results to create meaningful stakeholder relationships and drive organizational growth.
//             </p>

//             <button className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
//               MORE ABOUT ME
//               <ChevronRight size={24} />
//             </button>
//           </div>

//           {/* Right Image - Profile Photo */}
//           <div className="flex-1 flex items-center justify-center relative">
//             <div className="w-96 h-96 rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
//               <div className="text-center text-gray-500">
//                 <img src='/assets/black.jpg'
//                 height='300'/>
//               </div>
//             </div>
            
//             {/* Decorative Golden Bar */}
//             <div className="absolute -right-32 top-1/2 transform -translate-y-1/2 w-16 h-64 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-full opacity-80 shadow-2xl"></div>
//           </div>
//         </section>

//         {/* Portfolio Section */}
//         <section className="px-16 py-32 bg-gray-50">
//           <div className="max-w-6xl mx-auto">
//             {/* Section Header */}
//             <div className="mb-16">
//               <div className="inline-block bg-yellow-300 text-yellow-900 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest">
//                 01
//               </div>
//               <h2 className="text-5xl font-black text-gray-900 mb-4">Core Competencies</h2>
//               <p className="text-lg text-gray-600">Strategic expertise across multiple sectors</p>
//             </div>

//             {/* Competencies Section */}
//             <div className="bg-white rounded-2xl p-12 mb-16 shadow-md">
//               <h3 className="text-2xl font-bold text-gray-900 mb-8">KEY EXPERTISE</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <div className="pb-4 border-b-2 border-yellow-300">
//                   <p className="text-gray-700 font-semibold">Business Goal Setting & SMART Indicators</p>
//                 </div>
//                 <div className="pb-4 border-b-2 border-yellow-300">
//                   <p className="text-gray-700 font-semibold">Strategic Partnerships & Alliances</p>
//                 </div>
//                 <div className="pb-4 border-b-2 border-yellow-300">
//                   <p className="text-gray-700 font-semibold">Sales & Revenue Growth Opportunities</p>
//                 </div>
//                 <div className="pb-4 border-b-2 border-yellow-300">
//                   <p className="text-gray-700 font-semibold">Digital Marketing & Social Media Strategy</p>
//                 </div>
//                 <div className="pb-4 border-b-2 border-yellow-300">
//                   <p className="text-gray-700 font-semibold">Market Expansion & Audience Development</p>
//                 </div>
//                 <div className="pb-4 border-b-2 border-yellow-300">
//                   <p className="text-gray-700 font-semibold">Government & Corporate Liaison</p>
//                 </div>
//               </div>
//             </div>

//             {/* Filters */}
//             {/* <div className="flex gap-4 mb-12 flex-wrap">
//               {['All', 'Hospitality', 'Healthcare', 'Partnerships'].map((tag) => (
//                 <button
//                   key={tag}
//                   onClick={() => setActiveFilter(tag)}
//                   className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
//                     activeFilter === tag
//                       ? 'bg-yellow-300 text-yellow-900 shadow-md'
//                       : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-yellow-300'
//                   }`}
//                 >
//                   {tag}
//                 </button>
//               ))}
//             </div> */}

//             {/* Portfolio Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {[
//                 { num: 1, title: 'Renai Hotels & Resorts', category: 'Hospitality' },
//                 { num: 2, title: 'Healthcare Branding', category: 'Healthcare' },
//                 { num: 3, title: 'Strategic Partnerships', category: 'Partnerships' },
//                 { num: 4, title: 'Market Expansion', category: 'Hospitality' },
//                 { num: 5, title: 'Digital Strategy', category: 'Healthcare' },
//                 { num: 6, title: 'Stakeholder Engagement', category: 'Partnerships' }
//               ].map((item) => (
//                 <div
//                   key={item.num}
//                   className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
//                 >
//                   <div className="w-full h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
//                     <img src='/assets/black.jpg'
//                     height='300'/>
//                   </div>
//                   <div className="p-6">
//                     <p className="text-sm text-yellow-600 font-bold mb-2">{item.category}</p>
//                     <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
//                     <p className="text-gray-600 text-sm">Professional expertise and execution</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Featured Partners Section */}
//         <section className="px-16 py-32 bg-white">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-4xl font-black text-gray-900 mb-12">Professional Background</h2>
//             <p className="text-gray-600 mb-12">Experience and expertise in key sectors</p>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//               <div className="relative">
//                 <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center mb-6 shadow-lg">
//                   <span className="text-6xl">🏨</span>
//                 </div>
//                 <h3 className="text-2xl font-black text-gray-900">HOSPITALITY SECTOR</h3>
//                 <p className="text-gray-600 mt-2">Renai Hotels & Resorts branding, marketing and strategic expansion</p>
//               </div>

//               <div className="relative">
//                 <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center mb-6 shadow-lg">
//                   <span className="text-6xl">⚕️</span>
//                 </div>
//                 <h3 className="text-2xl font-black text-gray-900">HEALTHCARE SECTOR</h3>
//                 <p className="text-gray-600 mt-2">Healthcare settings branding, institutional partnerships and market development</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Personal Details Section */}
//         <section className="px-16 py-20 bg-gray-50">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-4xl font-black text-gray-900 mb-12">Personal Details</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               <div className="bg-white rounded-xl p-6 shadow-md">
//                 <p className="text-sm text-yellow-600 font-bold mb-2 tracking-wide">AGE</p>
//                 <p className="text-2xl font-black text-gray-900">47</p>
//               </div>

//               <div className="bg-white rounded-xl p-6 shadow-md">
//                 <p className="text-sm text-yellow-600 font-bold mb-2 tracking-wide">LOCATION</p>
//                 <p className="text-lg font-bold text-gray-900">Kochi, Kerala</p>
//               </div>

//               <div className="bg-white rounded-xl p-6 shadow-md">
//                 <p className="text-sm text-yellow-600 font-bold mb-2 tracking-wide">FAITH</p>
//                 <p className="text-lg font-bold text-gray-900">Christian Orthodox</p>
//               </div>

//               <div className="bg-white rounded-xl p-6 shadow-md">
//                 <p className="text-sm text-yellow-600 font-bold mb-2 tracking-wide">CONTACT</p>
//                 <p className="text-sm font-semibold text-gray-900">+91 9846935555</p>
//                 <p className="text-sm font-semibold text-gray-900">experiment13john@gmail.com</p>
//               </div>
//             </div>

//             <div className="mt-12 bg-white rounded-2xl p-8 shadow-md">
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">CAREER OBJECTIVE</h3>
//               <p className="text-gray-700 leading-relaxed">
//                 Acquire and continually update domain knowledge and contacts in hospitality, healthcare, social and human development entities, so as to benefit the organization I work for and myself. To leverage strategic partnerships, stakeholder relationships, and integrated marketing expertise to drive sustainable organizational growth and market leadership.
//               </p>
//             </div>
//           </div>
//         </section>

//         <Footer/>
//       </main>
//     </div>
//   );
// }



import React, { useState, useRef } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';

export default function JohnSamuelPortfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  const heroRef = useRef(null);
  const portfolioRef = useRef(null);
  const backgroundRef = useRef(null);
  const detailsRef = useRef(null);
  const footerRef = useRef(null);

  const scrollToSection = (ref, sectionName) => {
    ref?.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionName);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'About', ref: heroRef, id: 'hero' },
    { label: 'Portfolio', ref: portfolioRef, id: 'portfolio' },
    { label: 'Experience', ref: backgroundRef, id: 'background' },
    { label: 'Details', ref: detailsRef, id: 'details' },
    { label: 'Contact', ref: footerRef, id: 'footer' },
  ];

  return (
    <div className="bg-white text-gray-900 font-sans overflow-x-hidden">
      {/* Mobile Navigation */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-black text-gray-900">JS</h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="px-4 py-4 space-y-2 bg-gray-50 border-t border-gray-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.ref, item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                  activeSection === item.id
                    ? 'bg-yellow-300 text-yellow-900'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Desktop Sidebar Navigation */}
      <div className="hidden md:flex fixed right-0 top-0 h-screen w-20 bg-gradient-to-b from-yellow-300 to-yellow-200 flex-col items-center justify-start pt-12 gap-8 z-50">
        <div className="text-2xl text-yellow-900 font-black">JS</div>
        <nav className="space-y-6 flex flex-col items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.ref, item.id)}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all transform hover:scale-110 ${
                activeSection === item.id
                  ? 'bg-yellow-900/20 ring-2 ring-yellow-900'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              title={item.label}
            >
              {item.id === 'hero' && '👤'}
              {item.id === 'portfolio' && '🖼'}
              {item.id === 'background' && '💼'}
              {item.id === 'details' && '📋'}
              {item.id === 'footer' && '📧'}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="md:mr-20 pt-16 md:pt-0">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="min-h-screen flex items-center justify-center md:justify-between px-4 md:px-8 lg:px-16 py-20 bg-white relative overflow-hidden"
        >
          <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Left Content */}
            <div className="flex-1 z-10 text-center md:text-left">
              <div className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 text-gray-900 leading-tight">
                HI THERE!
              </div>
              <div className="mb-6 md:mb-8">
                <span className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">
                  I'M JOHN SAMUEL
                </span>
              </div>

              <div className="inline-block bg-yellow-300 text-yellow-900 px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold mb-6 md:mb-8 tracking-wide">
                SALES, MARKETING & STRATEGIC PARTNERSHIPS
              </div>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-8 max-w-lg mx-auto md:mx-0">
                With expertise in hospitality and healthcare sectors, I specialize in strategic partnerships, business development, and integrated marketing strategies. I combine industry knowledge with proven results to create meaningful stakeholder relationships and drive organizational growth.
              </p>

              <button
                onClick={() => scrollToSection(portfolioRef, 'portfolio')}
                className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl mx-auto md:mx-0"
              >
                MORE ABOUT ME
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Right Image - Profile Photo */}
            <div className="flex-1 flex items-center justify-center relative w-full max-w-sm md:max-w-none">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden shadow-lg">
                <div className="text-center text-gray-500">
                  <img
                    src="/assets/black.jpg"
                    alt="John Samuel"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section
          ref={portfolioRef}
          className="px-4 md:px-8 lg:px-16 py-20 md:py-32 bg-gray-50"
        >
          <div className="w-full max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="mb-12 md:mb-16">
              <div className="inline-block bg-yellow-300 text-yellow-900 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest">
                01
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                Core Competencies
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                Strategic expertise across multiple sectors
              </p>
            </div>

            {/* Competencies Section */}
            <div className="bg-white rounded-2xl p-6 md:p-12 mb-12 md:mb-16 shadow-md">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
                KEY EXPERTISE
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  'Business Goal Setting & SMART Indicators',
                  'Strategic Partnerships & Alliances',
                  'Sales & Revenue Growth Opportunities',
                  'Digital Marketing & Social Media Strategy',
                  'Market Expansion & Audience Development',
                  'Government & Corporate Liaison',
                ].map((skill, idx) => (
                  <div key={idx} className="pb-4 border-b-2 border-yellow-300">
                    <p className="text-gray-700 font-semibold text-sm md:text-base">
                      {skill}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { num: 1, title: 'Renai Hotels & Resorts', category: 'Hospitality' },
                { num: 2, title: 'Healthcare Branding', category: 'Healthcare' },
                { num: 3, title: 'Strategic Partnerships', category: 'Partnerships' },
                { num: 4, title: 'Market Expansion', category: 'Hospitality' },
                { num: 5, title: 'Digital Strategy', category: 'Healthcare' },
                { num: 6, title: 'Stakeholder Engagement', category: 'Partnerships' },
              ].map((item) => (
                <div
                  key={item.num}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <div className="w-full h-40 md:h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden">
                    <img
                      src="/assets/black.jpg"
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <p className="text-xs md:text-sm text-yellow-600 font-bold mb-2">
                      {item.category}
                    </p>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Professional expertise and execution
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Background Section */}
        <section
          ref={backgroundRef}
          className="px-4 md:px-8 lg:px-16 py-20 md:py-32 bg-white"
        >
          <div className="w-full max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-black text-gray-900 mb-8 md:mb-12">
              Professional Background
            </h2>
            <p className="text-gray-600 mb-12 text-sm md:text-base">
              Experience and expertise in key sectors
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="relative">
                <div className="bg-gray-200 rounded-2xl h-60 md:h-80 flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-6xl md:text-7xl">🏨</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-gray-900">
                  HOSPITALITY SECTOR
                </h3>
                <p className="text-gray-600 mt-2 text-sm md:text-base">
                  Renai Hotels & Resorts branding, marketing and strategic expansion
                </p>
              </div>

              <div className="relative">
                <div className="bg-gray-200 rounded-2xl h-60 md:h-80 flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-6xl md:text-7xl">⚕️</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-gray-900">
                  HEALTHCARE SECTOR
                </h3>
                <p className="text-gray-600 mt-2 text-sm md:text-base">
                  Healthcare settings branding, institutional partnerships and market development
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Details Section */}
        <section
          ref={detailsRef}
          className="px-4 md:px-8 lg:px-16 py-20 md:py-32 bg-gray-50"
        >
          <div className="w-full max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-black text-gray-900 mb-12">
              Personal Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-xs text-yellow-600 font-bold mb-2 tracking-wide">
                  AGE
                </p>
                <p className="text-2xl font-black text-gray-900">47</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-xs text-yellow-600 font-bold mb-2 tracking-wide">
                  LOCATION
                </p>
                <p className="text-base md:text-lg font-bold text-gray-900">
                  Kochi, Kerala
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-xs text-yellow-600 font-bold mb-2 tracking-wide">
                  FAITH
                </p>
                <p className="text-base md:text-lg font-bold text-gray-900">
                  Christian Orthodox
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-xs text-yellow-600 font-bold mb-2 tracking-wide">
                  CONTACT
                </p>
                <p className="text-xs md:text-sm font-semibold text-gray-900">
                  +91 9846935555
                </p>
                <p className="text-xs md:text-sm font-semibold text-gray-900 break-all">
                  experiment13john@gmail.com
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                CAREER OBJECTIVE
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                Acquire and continually update domain knowledge and contacts in hospitality, healthcare, social and human development entities, so as to benefit the organization I work for and myself. To leverage strategic partnerships, stakeholder relationships, and integrated marketing expertise to drive sustainable organizational growth and market leadership.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section
          ref={footerRef}
          className="px-4 md:px-8 lg:px-16 py-16 md:py-20 bg-gray-900 text-white"
        >
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold mb-4">John Samuel</h3>
                <p className="text-gray-400 text-sm">
                  Strategic partnerships & business development specialist
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-4">Contact</h4>
                <p className="text-gray-400 text-sm mb-2">+91 9846935555</p>
                <p className="text-gray-400 text-sm break-all">
                  experiment13john@gmail.com
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-4">Location</h4>
                <p className="text-gray-400 text-sm">Kochi, Kerala, India</p>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500 text-xs text-center">
                © 2024 John Samuel Portfolio. All rights reserved.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}