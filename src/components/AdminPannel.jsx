// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { 
// //   FaBlog, FaCalendarAlt, FaUsers, FaBriefcase, 
// //   FaTrophy, FaChartLine, FaStar 
// // } from 'react-icons/fa'; // Install react-icons or use FontAwesome

// // const AdminPanel = () => {
// //   const adminTools = [
// //     { title: "Blog Management", desc: "Write and publish new articles", icon: <FaBlog />, link: "/blog/submit", color: "#4F46E5" },
// //     { title: "Event Management", desc: "View and manage company events", icon: <FaCalendarAlt />, link: "/events/manage", color: "#059669" },
// //     { title: "User Management", desc: "Edit permissions and manage staff", icon: <FaUsers />, link: "/user-management", color: "#DC2626" },
// //     { title: "Career Management", desc: "Create and post new job openings", icon: <FaBriefcase />, link: "/jobs/create", color: "#D97706" },
// //     { title: "Achievements", desc: "Update company milestones", icon: <FaTrophy />, link: "/achievements-form", color: "#7C3AED" },
// //     { title: "Analytics", desc: "View site traffic and data", icon: <FaChartLine />, link: "/analytics", color: "#2563EB" },
// //     { title: "Reviews", desc: "Manage client testimonials", icon: <FaStar />, link: "/add-review", color: "#DB2777" },
// //   ];

// //   return (
// //     <div style={styles.container}>
// //       <header style={styles.header}>
// //         <h1>Admin Control Center</h1>
// //         <p>Welcome back! Select a module to manage your platform.</p>
// //       </header>

// //       <div style={styles.grid}>
// //         {adminTools.map((tool, index) => (
// //           <Link to={tool.link} key={index} style={styles.card}>
// //             <div style={{ ...styles.iconWrapper, backgroundColor: tool.color }}>
// //               {tool.icon}
// //             </div>
// //             <div style={styles.cardContent}>
// //               <h3>{tool.title}</h3>
// //               <p>{tool.desc}</p>
// //             </div>
// //           </Link>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // const styles = {
// //   container: { padding: '100px 5% 50px', backgroundColor: '#f9fafb', minHeight: '100vh' },
// //   header: { marginBottom: '40px', textAlign: 'center' },
// //   grid: { 
// //     display: 'grid', 
// //     gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
// //     gap: '20px' 
// //   },
// //   card: {
// //     display: 'flex',
// //     alignItems: 'center',
// //     padding: '20px',
// //     backgroundColor: '#fff',
// //     borderRadius: '12px',
// //     textDecoration: 'none',
// //     color: '#333',
// //     boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
// //     transition: 'transform 0.2s ease',
// //   },
// //   iconWrapper: {
// //     width: '50px',
// //     height: '50px',
// //     borderRadius: '10px',
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     color: '#fff',
// //     fontSize: '24px',
// //     marginRight: '15px'
// //   },
// //   cardContent: { textAlign: 'left' }
// // };

// // export default AdminPanel;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import {
//     FaBlog, FaCalendarAlt, FaUsers, FaBriefcase,
//     FaTrophy, FaChartLine, FaStar, FaChevronRight
// } from 'react-icons/fa';

// const AdminPanel = () => {
//     const adminTools = [
//         { title: "Blog Management", desc: "Write and publish new articles", icon: <FaBlog />, link: "/blog/submit", color: "bg-blue-500" },
//         { title: "Event Management", desc: "View and manage company events", icon: <FaCalendarAlt />, link: "/events/manage", color: "bg-green-500" },
//         { title: "User Management", desc: "Edit permissions and manage staff", icon: <FaUsers />, link: "/user-management", color: "bg-red-500" },
//         { title: "Career Management", desc: "Create and post new job openings", icon: <FaBriefcase />, link: "/jobs/create", color: "bg-orange-500" },
//         { title: "Achievements", desc: "Update company milestones", icon: <FaTrophy />, link: "/achievements-form", color: "bg-purple-500" },
//         { title: "Analytics", desc: "View site traffic and data", icon: <FaChartLine />, link: "/analytics", color: "bg-indigo-500" },
//         { title: "Reviews", desc: "Manage client testimonials", icon: <FaStar />, link: "/add-review", color: "bg-pink-500" },
//     ];

//     return (
//         <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans antialiased selection:bg-blue-100">
//             {/* Header Section */}
//             <div className="max-w-7xl mx-auto pt-32 pb-16 px-6 lg:px-12">
//                 <header className="space-y-4">
//                     <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
//                         Control Center.
//                     </h1>
//                     <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl">
//                         Everything you need to manage your platform, refined in one place.
//                     </p>
//                 </header>

//                 {/* Bento Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
//                     {adminTools.map((tool, index) => (
//                         <Link
//                             to={tool.link}
//                             key={index}
//                             className="group relative bg-white/80 backdrop-blur-md border border-white/20 p-8 rounded-[2.5rem] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:scale-[1.02] transition-all duration-500 ease-out flex flex-col justify-between min-h-[220px]"
//                         >
//                             <div className="flex justify-between items-start">
//                                 {/* Icon with soft gradient/solid color */}
//                                 <div className={`${tool.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-inherit/20`}>
//                                     {tool.icon}
//                                 </div>

//                                 {/* Subtle Arrow */}
//                                 <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-400">
//                                     <FaChevronRight />
//                                 </div>
//                             </div>

//                             <div className="mt-8">
//                                 <h3 className="text-2xl font-semibold tracking-tight group-hover:text-blue-600 transition-colors">
//                                     {tool.title}
//                                 </h3>
//                                 <p className="text-gray-500 mt-2 font-medium leading-relaxed">
//                                     {tool.desc}
//                                 </p>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>

//                 {/* Footer Support */}
//                 <footer className="mt-24 border-t border-gray-200 pt-8 pb-12 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 font-medium">
//                     <p>© 2026 Admin System. Built for Social Bureau.</p>
//                     <div className="flex gap-6 mt-4 md:mt-0">
//                         <button className="hover:text-gray-900 transition-colors">System Status</button>
//                         <button className="hover:text-gray-900 transition-colors">Privacy Policy</button>
//                         <button className="hover:text-gray-900 transition-colors">Support</button>
//                     </div>
//                 </footer>
//             </div>
//         </div>
//     );
// };

// export default AdminPanel;



import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const AdminPanel = () => {
    const adminTools = [
        { title: "Journal", desc: "Write and publish new articles", link: "/blog/submit" },
        { title: "Events", desc: "Manage global company activations", link: "/events/manage" },
        { title: "Directory", desc: "Permissions and staff management", link: "/user-management" },
        { title: "Careers", desc: "Post and curate job openings", link: "/jobs/create" },
        { title: "Milestones", desc: "Update company achievements", link: "/achievements-form" },
        { title: "Intelligence", desc: "Site traffic and data insights", link: "/analytics" },
        { title: "Testimonials", desc: "Client reviews and feedback", link: "/add-review" },
    ];

    return (
        <div className="min-h-screen bg-white text-[#1d1d1f] font-sans antialiased">
            {/* Editorial Header */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-20">
                <header className="border-b border-gray-100 pb-12">
                    <h1 className="text-[56px] md:text-[80px] font-semibold tracking-[-0.04em] leading-none mb-6">
                        Control Center.
                    </h1>
                    <p className="text-2xl md:text-3xl text-gray-400 font-medium tracking-tight">
                        Select a module to manage the platform.
                    </p>
                </header>

                {/* Apple-Style Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
                    {adminTools.map((tool, index) => (
                        <Link
                            to={tool.link}
                            key={index}
                            className="group relative bg-[#f5f5f7] p-10 rounded-[32px] hover:bg-[#e8e8ed] transition-all duration-500 ease-out flex flex-col justify-between min-h-[300px] overflow-hidden"
                        >
                            <div className="flex flex-col">
                                <h3 className="text-[32px] font-semibold tracking-tight mb-2">
                                    {tool.title}
                                </h3>
                                <p className="text-lg text-gray-500 font-medium leading-tight max-w-[200px]">
                                    {tool.desc}
                                </p>
                            </div>

                            {/* Minimalist Button/Arrow */}
                            <div className="flex items-center gap-2 text-blue-600 font-semibold text-lg group-hover:gap-4 transition-all duration-300">
                                <span>Manage</span>
                                <FaArrowRight className="text-sm" />
                            </div>

                            {/* Subtle background detail (Apple style) */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/30 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-700" />
                        </Link>
                    ))}

                    {/* Support Tile (Fills the gap) */}
                    <div className="md:col-span-2 lg:col-span-1 bg-black p-10 rounded-[32px] text-white flex flex-col justify-between min-h-[300px]">
                        <h3 className="text-[32px] font-semibold tracking-tight">System Status</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <p className="text-gray-400 font-medium">All systems operational</p>
                            </div>
                            <p className="text-sm text-gray-500">Last updated: Just now</p>
                        </div>
                    </div>
                </div>

                {/* Minimal Footer */}
                <div className="mt-32 mb-12 flex justify-between items-center text-sm font-semibold text-gray-400">
                    <p>Admin Core v2.0</p>
                    <div className="flex gap-8">
                        <span className="cursor-pointer hover:text-black transition-colors">Privacy</span>
                        <span className="cursor-pointer hover:text-black transition-colors">Support</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;