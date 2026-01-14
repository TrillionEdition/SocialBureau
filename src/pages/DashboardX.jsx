import React from 'react';
import {
    BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import {
    Search, Bell, LayoutDashboard, FileText, Package, Users, Tag,
    Layers, Settings, HelpCircle, Briefcase, Plus, MoreVertical,
    ChevronRight, ArrowUpRight, ArrowDownRight, Monitor, Apple, Smartphone, Laptop
} from 'lucide-react';
import Navbar from '../components/Navbar';

const balanceData = [
    { name: 'Jan', revenue: 65, expenses: 40 },
    { name: 'Feb', revenue: 59, expenses: 45 },
    { name: 'Mar', revenue: 80, expenses: 50 },
    { name: 'Apr', revenue: 81, expenses: 60 },
    { name: 'May', revenue: 56, expenses: 55 },
    { name: 'Jun', revenue: 55, expenses: 48 },
    { name: 'Jul', revenue: 40, expenses: 38 },
    { name: 'Aug', revenue: 60, expenses: 42 },
    { name: 'Sep', revenue: 75, expenses: 58 },
    { name: 'Oct', revenue: 90, expenses: 65 },
    { name: 'Nov', revenue: 85, expenses: 60 },
    { name: 'Dec', revenue: 98, expenses: 70 },
];

const trafficData = [
    { name: 'Mon', direct: 15, organic: 25 },
    { name: 'Tue', direct: 20, organic: 30 },
    { name: 'Wed', direct: 18, organic: 28 },
    { name: 'Thu', direct: 25, organic: 35 },
    { name: 'Fri', direct: 30, organic: 45 },
    { name: 'Sat', direct: 35, organic: 40 },
    { name: 'Sun', direct: 25, organic: 30 },
];

const softwareData = [
    { name: 'Windows', value: 16264, color: '#3B82F6' },
    { name: 'Apple', value: 5546, color: '#8B5CF6' },
    { name: 'Linux', value: 2478, color: '#10B981' },
];

const subscriptions = [
    { id: '#1024', name: 'John Carter', email: 'hello@johncarter.com', date: 'Mar 10, 2025', location: 'New York, NY', status: 'Active', revenue: '$24.99/mo', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: '#1023', name: 'Sophie Moore', email: 'info@sophiemoore.com', date: 'Mar 08, 2025', location: 'Los Angeles, CA', status: 'Expired', revenue: '$24.99/mo', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: '#1022', name: 'Matt Cannon', email: 'hi@mattcannon.com', date: 'Mar 01, 2025', location: 'San Diego, CA', status: 'Active', revenue: '$24.99/mo', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: '#1021', name: 'Lily Woods', email: 'lily@woodscompany.com', date: 'Feb 26, 2025', location: 'Chicago, IL', status: 'Active', revenue: '$24.99/mo', avatar: 'https://i.pravatar.cc/150?u=4' },
];

const DashboardX = () => {
    return (
        <div className="flex h-screen bg-[#0A0B10] text-[#E2E8F0] font-sans selection:bg-blue-500/30">
            <Navbar />
            {/* Sidebar */}
            <aside className="w-64 bg-[#0F1117] border-r border-slate-800 flex flex-col hidden lg:flex">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <LayoutDashboard className="text-white w-5 h-5" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">Dashbrd X</h1>
                </div>

                <div className="px-4 mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search dashboard..."
                            className="w-full bg-[#161921] border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        />
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto px-4 space-y-1 custom-scrollbar">
                    <NavItem icon={<LayoutDashboard w-4 h-4 />} label="Home" active />

                    <div className="pt-4 pb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-2">Features</div>
                    <NavItem icon={<FileText w-4 h-4 />} label="Reports" active />
                    <NavItem icon={<Package w-4 h-4 />} label="Products" />
                    <NavItem icon={<Briefcase w-4 h-4 />} label="Tasks" />

                    <div className="pt-4 pb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-2">Apps</div>
                    <NavItem icon={<Users w-4 h-4 />} label="Users" hasSubmenu />
                    <NavItem icon={<Tag w-4 h-4 />} label="Pricing" hasSubmenu />
                    <NavItem icon={<Layers w-4 h-4 />} label="Integrations" hasSubmenu />

                    <div className="pt-4 pb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-2">System</div>
                    <NavItem icon={<Settings w-4 h-4 />} label="Settings" hasSubmenu />
                    <NavItem icon={<HelpCircle w-4 h-4 />} label="Utility pages" hasSubmenu />
                    <NavItem icon={<Briefcase w-4 h-4 />} label="Workflow pages" hasSubmenu />
                </nav>

                {/* <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/50 transition-colors cursor-pointer group">
                        <img src="https://i.pravatar.cc/150?u=john" alt="User" className="w-10 h-10 rounded-full border-2 border-slate-700" />
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-semibold truncate">John Carter</p>
                            <p className="text-xs text-slate-500 truncate">Account settings</p>
                        </div>
                        <Settings className="w-4 h-4 text-slate-500 group-hover:rotate-45 transition-transform" />
                    </div>
                    <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]">
                        Get template →
                    </button>
                </div> */}
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-[#0A0B10] custom-scrollbar">
                {/* Header */}
                {/* <header className="sticky top-0 z-10 bg-[#0A0B10]/80 backdrop-blur-xl border-b border-slate-800/50 px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-400">Dashboard</span>
                        <span className="text-slate-600">/</span>
                        <span className="font-semibold">Reports</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20">
                            <Plus className="w-4 h-4" />
                            Create report
                        </button>
                        <div className="relative">
                            <Bell className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white transition-colors" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-[#0A0B10]">3</span>
                        </div>
                        <img src="https://i.pravatar.cc/150?u=john" alt="Profile" className="w-8 h-8 rounded-full border border-slate-700 cursor-pointer" />
                    </div>
                </header> */}

                <div className="p-8 space-y-8">
                    {/* Stats section */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Analytics report</h2>
                                <p className="text-sm text-slate-400">Analytics report from 2024 to 2025</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <select className="bg-[#161921] border border-slate-800 rounded-lg px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>All reports</option>
                                </select>
                                <select className="bg-[#161921] border border-slate-800 rounded-lg px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>2024 - 2025</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard label="Page views" value="60.8K" trend="+2.4%" trendUp={true} />
                            <StatCard label="Monthly users" value="20.6K" trend="-1.5%" trendUp={false} />
                            <StatCard label="New subscriptions" value="756" trend="+4.8%" trendUp={true} />
                            <StatCard label="Average visit duration" value="10min" trend="+2.1%" trendUp={true} />
                        </div>
                    </div>

                    {/* Main Chart Section */}
                    <div className="bg-[#0F1117] border border-slate-800 rounded-3xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 flex items-center gap-2">
                            {['Year', 'Month', 'Week', 'Day'].map((tab) => (
                                <button key={tab} className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${tab === 'Month' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-800'}`}>
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="mb-8">
                            <p className="text-sm text-slate-500 font-medium">Total balance</p>
                            <div className="flex items-baseline gap-3">
                                <h3 className="text-3xl font-bold">$240.8K</h3>
                                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <ArrowUpRight className="w-3 h-3" /> +2.4K
                                </span>
                            </div>
                            <div className="flex items-center gap-6 mt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                                    <span className="text-xs text-slate-400 font-medium">Revenue</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                                    <span className="text-xs text-slate-400 font-medium">Expenses</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={balanceData}>
                                    <defs>
                                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1A1D27', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                                        itemStyle={{ color: '#E2E8F0' }}
                                    />
                                    <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#0F1117' }} activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2, fill: '#0F1117' }} />
                                    <Area type="monotone" dataKey="expenses" stroke="#475569" strokeWidth={3} fillOpacity={0} fill="none" strokeDasharray="5 5" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Secondary Charts Grids */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Users by software */}
                        <div className="bg-[#0F1117] border border-slate-800 rounded-3xl p-6">
                            <div className="flex items-center justify-between mb-8">
                                <h4 className="font-bold">Users by software</h4>
                                <select className="bg-[#161921] border border-slate-800 rounded-lg px-3 py-1.5 text-[10px] font-bold focus:outline-none">
                                    <option>All platforms</option>
                                </select>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="relative w-48 h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={softwareData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={65}
                                                outerRadius={80}
                                                paddingAngle={8}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {softwareData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-2xl font-bold">24,648</span>
                                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Total users</span>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4 w-full">
                                    {softwareData.map((item) => (
                                        <div key={item.name} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                                <span className="text-sm font-medium text-slate-400">{item.name} users</span>
                                            </div>
                                            <span className="font-bold">{item.value.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Web traffic */}
                        <div className="bg-[#0F1117] border border-slate-800 rounded-3xl p-6">
                            <div className="flex items-center justify-between mb-8">
                                <h4 className="font-bold">Web traffic</h4>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <span className="text-[10px] text-slate-500 font-bold">Direct</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                                        <span className="text-[10px] text-slate-500 font-bold">Organic search</span>
                                    </div>
                                    <MoreVertical className="w-4 h-4 text-slate-600 cursor-pointer" />
                                </div>
                            </div>
                            <div className="h-[180px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={trafficData} barGap={8}>
                                        <Bar dataKey="direct" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={12} />
                                        <Bar dataKey="organic" fill="#475569" radius={[4, 4, 0, 0]} barSize={12} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-600 px-2 uppercase tracking-tighter">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <span key={day}>{day}</span>)}
                            </div>
                        </div>
                    </div>

                    {/* Subscriptions Table */}
                    <div className="bg-[#0F1117] border border-slate-800 rounded-3xl overflow-hidden">
                        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                            <h4 className="font-bold">Subscriptions</h4>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-xs text-slate-500">Search subscription by:</span>
                                <FilterDropdown label="Date" />
                                <FilterDropdown label="Location" />
                                <FilterDropdown label="Customer" />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-800/50">
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">#</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Location</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subscriptions.map((sub) => (
                                        <tr key={sub.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors group">
                                            <td className="px-6 py-4 text-sm font-medium text-slate-500">{sub.id}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={sub.avatar} className="w-8 h-8 rounded-full" alt={sub.name} />
                                                    <span className="text-sm font-bold group-hover:text-blue-400 transition-colors">{sub.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-400">{sub.email}</td>
                                            <td className="px-6 py-4 text-sm text-slate-400">{sub.date}</td>
                                            <td className="px-6 py-4 text-sm text-slate-400">{sub.location}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${sub.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                                                    }`}>
                                                    {sub.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold">{sub.revenue}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-slate-800 flex items-center justify-center">
                            <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors">View all subscriptions</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const NavItem = ({ icon, label, active = false, hasSubmenu = false }) => (
    <div className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${active ? 'bg-blue-600/10 text-blue-500' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}>
        {icon}
        <span className="text-sm font-semibold flex-1">{label}</span>
        {hasSubmenu && <ChevronRight className="w-4 h-4 text-slate-600" />}
    </div>
);

const StatCard = ({ label, value, trend, trendUp }) => (
    <div className="bg-[#0F1117] border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-colors group">
        <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-500 font-medium group-hover:text-slate-400 transition-colors">{label}</p>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${trendUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                {trend}
            </span>
        </div>
        <h3 className="text-2xl font-bold mb-1 tracking-tight">{value}</h3>
        <div className="flex items-center gap-1.5 mt-2">
            <div className={`w-1.5 h-1.5 rounded-full ${trendUp ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]'}`}></div>
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">vs last year</span>
        </div>
    </div>
);

const FilterDropdown = ({ label }) => (
    <div className="bg-[#161921] border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-slate-800 transition-colors">
        <span className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase">{label}</span>
        <MoreVertical className="w-3 h-3 text-slate-600 rotate-90" />
    </div>
);

export default DashboardX;
