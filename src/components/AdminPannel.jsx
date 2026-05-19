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
        { title: "Algorithms", desc: "Manage API Marketing leads", link: "/api-marketing-dashboard" },
        { title: "Client Dashboard", desc: "Manage client data", link: "/client-dashboard" },
        { title: "Media", desc: "Future of Media waitlist entries", link: "/media-dashboard" },
        { title: "Applications", desc: "Review candidate resumes and profiles", link: "/admin/applications" },
        { title: "ClickUp Clients", desc: "Provision and manage client portals", link: "/admin/clickup-clients" },
        { title: "Lottery Claims", desc: "Process payments and cash wins for lottery spinners", link: "/admin/lottery-claims" },
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

