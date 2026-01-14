import React from 'react';
import {
    BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import {
    Search, Bell, LayoutDashboard, FileText, Package, Users, Tag,
    Layers, Settings, HelpCircle, Briefcase, Plus, MoreVertical,
    ChevronRight, ArrowUpRight, ArrowDownRight, Monitor, Apple, Smartphone, Laptop,
    Zap, Lightbulb, TrendingUp, AlertCircle, Sparkles, Globe, MousePointer2, Clock,
    Flag, Share2, Target, Trophy, Filter
} from 'lucide-react';

const engagementData = [
    { name: 'Mon', engagement: 4000, reach: 2400 },
    { name: 'Tue', engagement: 3000, reach: 1398 },
    { name: 'Wed', engagement: 2000, reach: 9800 },
    { name: 'Thu', engagement: 2780, reach: 3908 },
    { name: 'Fri', engagement: 1890, reach: 4800 },
    { name: 'Sat', engagement: 2390, reach: 3800 },
    { name: 'Sun', engagement: 3490, reach: 4300 },
];

const sourceData = [
    { name: 'Direct', value: 45, color: '#3B82F6' },
    { name: 'Social', value: 25, color: '#8B5CF6' },
    { name: 'Organic', value: 20, color: '#10B981' },
    { name: 'Referral', value: 10, color: '#F59E0B' },
];

const demographicData = [
    { subject: 'USA', A: 120, B: 110, fullMark: 150 },
    { subject: 'India', A: 98, B: 130, fullMark: 150 },
    { subject: 'UK', A: 86, B: 130, fullMark: 150 },
    { subject: 'Germany', A: 99, B: 100, fullMark: 150 },
    { subject: 'France', A: 85, B: 90, fullMark: 150 },
    { subject: 'Japan', A: 65, B: 85, fullMark: 150 },
];

const SocialBureauInsight = () => {
    return (
        <div className="flex h-screen bg-[#06070a] text-[#E2E8F0] font-sans selection:bg-blue-500/30 overflow-hidden">
            {/* Sidebar - Same style as DashboardX for consistency */}
            <aside className="w-64 bg-[#0F1117] border-r border-slate-800 flex flex-col hidden lg:flex">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Sparkles className="text-white w-5 h-5" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">SB Insights</h1>
                </div>

                <nav className="flex-1 overflow-y-auto px-4 space-y-1 custom-scrollbar mt-4">
                    <NavItem icon={<LayoutDashboard size={18} />} label="Overview" />
                    <NavItem icon={<Zap size={18} />} label="Traffic" active />
                    <NavItem icon={<Users size={18} />} label="Audience" />
                    <NavItem icon={<Briefcase size={18} />} label="Portfolios" />
                    <NavItem icon={<Target size={18} />} label="Goals" />

                    <div className="pt-8 pb-2 text-[10px] font-semibold text-slate-600 uppercase tracking-[0.2em] px-3">System</div>
                    <NavItem icon={<Settings size={18} />} label="Settings" />
                    <NavItem icon={<HelpCircle size={18} />} label="Help Center" />
                </nav>

                <div className="p-6">
                    <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2 text-blue-400">
                            <Sparkles size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">AI Insight</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                            Your Social Media traffic is up 40% this week. We recommend updating your case studies.
                        </p>
                        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg transition-all">
                            Generate Report
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-[#06070a] custom-scrollbar flex flex-col relative px-8 py-6">
                {/* Glow Effects */}
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>

                <header className="flex items-center justify-between mb-8 relative z-10">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight mb-1">SocialBureau Traffic Insights</h1>
                        <p className="text-sm text-slate-500">Comprehensive analysis of your digital ecosystem performance.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex bg-[#0F1117] border border-slate-800 rounded-xl p-1">
                            {['Live', '24h', '7d', '30d'].map((t) => (
                                <button key={t} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${t === '7d' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-white'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                        <button className="p-2.5 bg-[#0F1117] border border-slate-800 rounded-xl hover:bg-slate-800 transition-all">
                            <Share2 size={18} className="text-slate-400" />
                        </button>
                    </div>
                </header>

                {/* Top Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10">
                    <StatBox icon={<MousePointer2 className="text-blue-500" />} label="Click Rate" value="12.4%" trend="+2.5%" />
                    <StatBox icon={<Clock className="text-indigo-500" />} label="Avg. Session" value="4m 22s" trend="+1.2%" />
                    <StatBox icon={<Globe className="text-emerald-500" />} label="Global Reach" value="48.2K" trend="+8.4%" />
                    <StatBox icon={<TrendingUp className="text-rose-500" />} label="Retention" value="64.1%" trend="-0.5%" down />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 relative z-10">
                    {/* Main Engagement Chart */}
                    <div className="lg:col-span-2 bg-[#0F1117] border border-slate-800 rounded-[32px] p-8 shadow-2xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8">
                            <Filter size={18} className="text-slate-700 cursor-pointer" />
                        </div>
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-1">Portfolio Engagement</h3>
                            <p className="text-sm text-slate-500">Daily reach vs. engagement across all SBS projects.</p>
                        </div>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={engagementData}>
                                    <defs>
                                        <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <YAxis hide />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="reach" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorEngagement)" dot={false} />
                                    <Area type="monotone" dataKey="engagement" stroke="#8B5CF6" strokeWidth={4} fillOpacity={0} borderDash="5 5" dot={false} strokeDasharray="5 5" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Traffic Source Pie */}
                    <div className="bg-[#0F1117] border border-slate-800 rounded-[32px] p-8 shadow-2xl flex flex-col items-center justify-center">
                        <h3 className="text-xl font-bold mb-6 w-full">Traffic Source</h3>
                        <div className="relative w-64 h-64 mb-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={sourceData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={10}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {sourceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-4xl font-black">100%</span>
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Total Traffic</span>
                            </div>
                        </div>
                        <div className="w-full space-y-3">
                            {sourceData.map((s) => (
                                <div key={s.name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }}></div>
                                        <span className="text-slate-400 font-medium">{s.name}</span>
                                    </div>
                                    <span className="font-bold">{s.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 relative z-10">
                    {/* Demographics Radar */}
                    <div className="bg-[#0F1117] border border-slate-800 rounded-[32px] p-8 shadow-2xl">
                        <h3 className="text-xl font-bold mb-8">Audience Demographics</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={demographicData}>
                                    <PolarGrid stroke="#1e293b" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <PolarRadiusAxis hide />
                                    <Radar name="SBS Audience" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* AI Insights List */}
                    <div className="bg-[#0F1117] border border-slate-800 rounded-[32px] p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold">Strategic Insights</h3>
                            <Sparkles size={20} className="text-blue-500" />
                        </div>
                        <div className="space-y-4">
                            <InsightItem
                                icon={<TrendingUp className="text-emerald-500" />}
                                title="Peak Activity Detected"
                                description="Traffic peaks at 10:00 PM GMT. We suggest publishing your next portfolio piece around this time for maximum reach."
                            />
                            <InsightItem
                                icon={<AlertCircle className="text-rose-500" />}
                                title="High Bounce Rate on 'Our Work'"
                                description="Users are leaving the 'Our Work' page within 5 seconds. Consider optimizing image loading speeds or simplifying the initial view."
                            />
                            <InsightItem
                                icon={<Trophy className="text-amber-500" />}
                                title="Success: Branding Service"
                                description="The Branding Portfolio piece has 4x more shares than average. Replication of this storytelling style across other projects is recommended."
                            />
                        </div>
                    </div>
                </div>

                {/* Detailed Portfolio Breakdown */}
                <div className="bg-[#0F1117] border border-slate-800 rounded-[32px] p-8 shadow-2xl mb-8 relative z-10 overflow-hidden">
                    <h3 className="text-xl font-bold mb-8">Top Performing Portfolios</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-800/50">
                                    <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Portfolio Title</th>
                                    <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Avg. Time</th>
                                    <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Views</th>
                                    <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Conversion</th>
                                    <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Trend</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {['Branding Masterclass', 'SocialBureau V2 Redesign', 'Crypto Pulse App', 'GreenEnergy SaaS'].map((title, i) => (
                                    <tr key={title} className="group transition-colors hover:bg-white/5">
                                        <td className="py-5 font-bold text-slate-300 group-hover:text-blue-400 transition-colors uppercase text-sm tracking-tight">{title}</td>
                                        <td className="py-5 text-center text-slate-500 text-sm">3m 50s</td>
                                        <td className="py-5 text-center font-bold text-sm">{(12400 - i * 1500).toLocaleString()}</td>
                                        <td className="py-5 text-center">
                                            <div className="inline-flex h-2 w-24 bg-slate-800 rounded-full overflow-hidden">
                                                <div className={`h-full bg-blue-500 w-${80 - i * 15}`}></div>
                                            </div>
                                        </td>
                                        <td className="py-5 text-right font-bold text-[10px] text-emerald-500">+{12 - i}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

const NavItem = ({ icon, label, active = false }) => (
    <div className={`flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer transition-all ${active ? 'bg-blue-600 shadow-xl shadow-blue-600/20 text-white' : 'text-slate-500 hover:text-white hover:bg-slate-800/50'}`}>
        {icon}
        <span className="text-sm font-bold flex-1">{label}</span>
        {active && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>}
    </div>
);

const StatBox = ({ icon, label, value, trend, down = false }) => (
    <div className="bg-[#0F1117] border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-all shadow-xl group">
        <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-slate-800/50 rounded-xl group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${down ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                {trend}
            </span>
        </div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
        <h4 className="text-2xl font-black tabular-nums">{value}</h4>
    </div>
);

const InsightItem = ({ icon, title, description }) => (
    <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-transparent hover:border-slate-800 hover:bg-white/[0.07] transition-all cursor-default group">
        <div className="p-3 bg-slate-900 rounded-2xl h-fit border border-slate-800 group-hover:scale-110 transition-transform shadow-inner">
            {icon}
        </div>
        <div>
            <h5 className="font-bold text-sm mb-1 text-slate-200 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{title}</h5>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">{description}</p>
        </div>
    </div>
);

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#1A1D27] border border-slate-700/50 rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-3 border-b border-slate-800 pb-2">{payload[0].payload.name}</p>
                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-xs font-bold text-slate-300">Reach</span>
                        </div>
                        <span className="text-xs font-black tabular-nums">{payload[0].value}</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default SocialBureauInsight;
