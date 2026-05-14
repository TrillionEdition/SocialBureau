import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { blogAPI } from "@/services/blogServices";
import { analyticsAPI } from "@/services/analyticsServices";
import { getTeamAPI } from "@/services/userServices";
import { partnershipAPI } from "@/services/partnershipServices";
import { toast } from "react-toastify";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Search,
  Bell,
  LayoutDashboard,
  FileText,
  BarChart3,
  Package,
  Users,
  Tag,
  Layers,
  Settings,
  HelpCircle,
  Briefcase,
  Plus,
  MoreVertical,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Monitor,
  Apple,
  Smartphone,
  Laptop,
  LogOut,
} from "lucide-react";

const balanceData = [
  { name: "Mon", revenue: 40, expenses: 24 },
  { name: "Tue", revenue: 30, expenses: 13 },
  { name: "Wed", revenue: 20, expenses: 98 },
  { name: "Thu", revenue: 27, expenses: 39 },
  { name: "Fri", revenue: 18, expenses: 48 },
  { name: "Sat", revenue: 23, expenses: 38 },
  { name: "Sun", revenue: 34, expenses: 43 },
];

const DashboardX = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [range, setRange] = useState("last30Days");
  const [selectedPartnerParam, setSelectedPartnerParam] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [newPartner, setNewPartner] = useState({
    name: "",
    param: "",
    category: "",
    status: "active",
    tags: "",
    image: "",
    subtitle: "",
    role: "partnership",
    user: "",
    email: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleLogout = () => {
    const isPartner = user?.role === "partnership" || user?.role === "partner";
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (isPartner) {
      window.location.href = "/partners/create-portfolio";
    } else {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Error parsing user data", err);
    }
  }, []);

  const { data: blogsData, isLoading: blogsLoading } = useQuery({
    queryKey: ["myBlogs", user?.id],
    queryFn: () =>
      blogAPI.getBlogs({ userId: user?.id, published: "all", limit: 100 }),
    enabled: !!user?.id,
  });

  const { data: analyticsData, isLoading: analyticsLoading } = useQuery({
    queryKey: ["googleAnalytics", range, selectedPartnerParam],
    queryFn: () => analyticsAPI.getAnalytics(range, selectedPartnerParam),
    refetchInterval: 1000 * 30, // Refetch every 30 seconds for live feel
  });

  const { data: teamData } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: getTeamAPI,
  });

  const { data: partnersData, refetch: refetchPartners } = useQuery({
    queryKey: ["partners"],
    queryFn: partnershipAPI.getPartners,
  });

  const { data: partnersSummaryData, isLoading: summaryLoading } = useQuery({
    queryKey: ["partnersSummary", range],
    queryFn: () => analyticsAPI.getSummary(range),
    enabled: user?.role === "admin",
  });

  const partners = partnersData?.data || [];
  const partnersSummary = partnersSummaryData?.data || [];

  // Update selectedPartnerParam when partners or user loads
  useEffect(() => {
    if (user && partners.length > 0) {
      if (user.role === "partnership") {
        // Match by email — consistent with backend logic
        const myPartner = partners.find(
          (p) => p.email?.toLowerCase() === user.email?.toLowerCase(),
        );
        if (myPartner) {
          setSelectedPartnerParam(myPartner.param);
          console.log("param:", myPartner.param);
        } else {
          console.log(
            "param: no matching partnership found for email",
            user.email,
          );
        }
      }
    }
  }, [user, partners]);

  const handleRegisterPartner = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const tagsArray = newPartner.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      await partnershipAPI.createPartner({
        ...newPartner,
        tags: tagsArray,
      });
      setShowRegisterForm(false);
      setNewPartner({
        name: "",
        param: "",
        category: "",
        status: "active",
        tags: "",
        image: "",
        subtitle: "",
        role: "partnership",
        user: "",
        email: "",
      });
      refetchPartners();
      toast.success("Partner registered successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to register partner");
    } finally {
      setSubmitting(false);
    }
  };

  const totals = analyticsData?.totals || {
    activeUsers: "0",
    eventCount: "0",
    newUsers: "0",
    keyEvents: "0",
  };

  const chartData = (analyticsData?.data || []).map((d) => ({
    ...d,
    formattedDate: `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][parseInt(d.date.substring(4, 6)) - 1]} ${d.date.substring(6, 8)}`,
  }));

  const hasData = chartData.length > 0;
  const myBlogs = blogsData?.data || [];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-['Inter',sans-serif] text-slate-900 selection:bg-blue-500/30">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 p-8 fixed h-full z-20 shadow-sm overflow-y-auto">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <LayoutDashboard className="text-white w-6 h-4" />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-slate-900">
            Social<span className="text-blue-600">Bureau</span>
          </h1>
        </div>

        <nav className="flex-1 space-y-2">
          <div className="px-3 mb-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
              Main Menu
            </p>
          </div>
          <NavItem
            icon={<LayoutDashboard size={18} />}
            label="Analytics Hub"
            active={!selectedPartnerParam}
            onClick={() =>
              user?.role === "admin" && setSelectedPartnerParam(null)
            }
          />
          <NavItem icon={<Users size={18} />} label="Partnerships" hasSubmenu />
          <NavItem icon={<Monitor size={18} />} label="Campaigns" />
          <NavItem icon={<BarChart3 size={18} />} label="Performance" />
          <NavItem icon={<Settings size={18} />} label="API Settings" />

          <div className="pt-6 pb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-3">
            Content Management
          </div>
          <NavItem 
            icon={<Plus size={18} />} 
            label="Write a Blog" 
            onClick={() => navigate('/blog/submit')}
          />

          {user?.role !== "partnership" && (
            <>
              <div className="pt-6 pb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-3">
                Partnerships
              </div>
              {partners.length > 0 ? (
                partners
                  .filter(
                    (p) =>
                      user?.role === "admin" ||
                      p.user === user?.id ||
                      p.user?._id === user?.id,
                  )
                  .map((p) => (
                    <NavItem
                      key={p._id}
                      active={selectedPartnerParam === p.param}
                      onClick={() =>
                        user?.role === "admin" &&
                        setSelectedPartnerParam(p.param)
                      }
                      icon={
                        <img
                          src={p.coverImage || "/assets/notfound.webp"}
                          className="w-4 h-4 rounded-full object-cover"
                          alt=""
                        />
                      }
                      label={p.name}
                    />
                  ))
              ) : (
                <div className="px-3 py-4 text-[10px] text-slate-400 italic font-bold">
                  No partners found
                </div>
              )}
            </>
          )}
        </nav>

        <div className="mt-8 pt-8 border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate text-slate-900">
                  {user?.name}
                </p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                  {user?.role}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-red-200 hover:text-red-500 text-slate-600 text-[10px] font-black uppercase tracking-widest py-2.5 rounded-xl transition-all"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 p-4 md:p-10">
        <div className="max-w-[1400px] mx-auto space-y-8">
          {/* Stats section */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">
                  {selectedPartnerParam
                    ? `${partners.find((p) => p.param === selectedPartnerParam)?.name || selectedPartnerParam} Analytics`
                    : "Overall Analytics"}
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  Performance metrics tracking
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {user?.role === "admin" && (
                  <button
                    onClick={() => setShowRegisterForm(!showRegisterForm)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/20"
                  >
                    <Plus size={16} />
                    Register Partner
                  </button>
                )}
                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 bg-white border border-slate-200 p-1.5 rounded-xl shadow-sm">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">
                    Range:
                  </span>
                  <select
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                    className="bg-transparent text-slate-800 text-xs font-bold px-4 py-1.5 rounded-lg focus:outline-none transition-all cursor-pointer hover:bg-slate-50"
                  >
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="thisWeek">This week (Sun - Today)</option>
                    <option value="last7Days">Last 7 days</option>
                    <option value="lastWeek">Last week (Sun - Sat)</option>
                    <option value="last28Days">Last 28 days</option>
                    <option value="last30Days">Last 30 days</option>
                    <option value="thisMonth">This month</option>
                    <option value="lastMonth">Last month</option>
                    <option value="last90Days">Last 90 days</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                label="Active Users"
                value={analyticsLoading ? "..." : totals.activeUsers}
                trend={
                  analyticsLoading
                    ? "Live"
                    : `${analyticsData?.trends?.activeUsers >= 0 ? "+" : ""}${analyticsData?.trends?.activeUsers}%`
                }
                trendUp={analyticsData?.trends?.activeUsers >= 0}
                icon={<Users className="w-4 h-4 text-blue-400" />}
              />
              <StatCard
                label="Event Count"
                value={
                  analyticsLoading
                    ? "..."
                    : parseInt(totals.eventCount) >= 1000
                      ? (parseInt(totals.eventCount) / 1000).toFixed(1) + "K"
                      : totals.eventCount
                }
                trend={
                  analyticsLoading
                    ? "Live"
                    : `${analyticsData?.trends?.eventCount >= 0 ? "+" : ""}${analyticsData?.trends?.eventCount}%`
                }
                trendUp={analyticsData?.trends?.eventCount >= 0}
                icon={<Monitor className="w-4 h-4 text-purple-400" />}
              />
              <StatCard
                label="New Users"
                value={analyticsLoading ? "..." : totals.newUsers}
                trend={
                  analyticsLoading
                    ? "Live"
                    : `${analyticsData?.trends?.newUsers >= 0 ? "+" : ""}${analyticsData?.trends?.newUsers}%`
                }
                trendUp={analyticsData?.trends?.newUsers >= 0}
                icon={<Smartphone className="w-4 h-4 text-emerald-400" />}
              />
              <StatCard
                label="Key Events"
                value={analyticsLoading ? "..." : totals.keyEvents}
                trend={
                  analyticsLoading
                    ? "Live"
                    : `${analyticsData?.trends?.keyEvents >= 0 ? "+" : ""}${analyticsData?.trends?.keyEvents}%`
                }
                trendUp={analyticsData?.trends?.keyEvents >= 0}
                icon={<Laptop className="w-4 h-4 text-amber-400" />}
              />
            </div>
          </div>

          {/* Partner Registration Form */}
          {showRegisterForm && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500 bg-white border border-blue-200 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Register New Partner
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-black">
                      Expand the Ecosystem
                    </p>
                  </div>
                  <button
                    onClick={() => setShowRegisterForm(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
                  >
                    <Plus className="rotate-45" size={20} />
                  </button>
                </div>

                <form
                  onSubmit={handleRegisterPartner}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. partner@example.com"
                        value={newPartner.email}
                        onChange={(e) =>
                          setNewPartner({
                            ...newPartner,
                            email: e.target.value,
                          })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">
                        Partner Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Alen Jacob"
                        value={newPartner.name}
                        onChange={(e) =>
                          setNewPartner({ ...newPartner, name: e.target.value })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">
                        URL Param (Slug)
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. alen-jacob"
                        value={newPartner.param}
                        onChange={(e) =>
                          setNewPartner({
                            ...newPartner,
                            param: e.target.value.replace(/ /g, "-"),
                          })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">
                        Category
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Media, Photography"
                        value={newPartner.category}
                        onChange={(e) =>
                          setNewPartner({
                            ...newPartner,
                            category: e.target.value,
                          })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">
                        Role
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. partnership"
                        value={newPartner.role}
                        onChange={(e) =>
                          setNewPartner({
                            ...newPartner,
                            role: e.target.value,
                          })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[10px) font-black text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">
                        Link to User
                      </label>
                      <select
                        value={newPartner.user}
                        onChange={(e) =>
                          setNewPartner({ ...newPartner, user: e.target.value })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none text-slate-900"
                      >
                        <option value="">None (Public Partner)</option>
                        {teamData?.map((u) => (
                          <option key={u._id} value={u._id}>
                            {u.name} ({u.email})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. VISIONARY, LEADER"
                        value={newPartner.tags}
                        onChange={(e) =>
                          setNewPartner({ ...newPartner, tags: e.target.value })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://..."
                        value={newPartner.image}
                        onChange={(e) =>
                          setNewPartner({
                            ...newPartner,
                            image: e.target.value,
                          })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Visionary Leader"
                        value={newPartner.subtitle}
                        onChange={(e) =>
                          setNewPartner({
                            ...newPartner,
                            subtitle: e.target.value,
                          })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setShowRegisterForm(false)}
                      className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50"
                    >
                      {submitting ? "Registering..." : "Complete Registration"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Traffic Chart */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 relative overflow-hidden group shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 opacity-50"></div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Traffic Velocity
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-black">
                    Dynamic Interaction Wave
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      Views
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      Users
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hasData ? chartData : balanceData}>
                    <defs>
                      <linearGradient
                        id="colorViews"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3B82F6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3B82F6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorUsers"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10B981"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10B981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e2e8f0"
                      opacity={1}
                    />
                    <XAxis
                      dataKey="formattedDate"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 10, fontWeight: 700 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 10, fontWeight: 700 }}
                      dx={-10}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderRadius: "16px",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "#1e293b",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="activeUsers"
                      stroke="#3B82F6"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorViews)"
                    />
                    <Area
                      type="monotone"
                      dataKey="newUsers"
                      stroke="#10B981"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorUsers)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col shadow-sm relative group hover:shadow-xl transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[2px]">
                  Active Users (30m)
                </p>
                <div className="text-5xl font-black text-slate-900 tracking-tighter">
                  {analyticsLoading
                    ? "..."
                    : analyticsData?.realtime?.activeUsers || "0"}
                </div>
              </div>
            </div>
          </div>

          {/* Web traffic table */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden group shadow-sm">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h4 className="font-bold flex items-center gap-2 text-slate-900">
                <FileText className="w-4 h-4 text-blue-500" />
                Content Performance
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none border-b border-slate-100">
                      Blog Title
                    </th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none text-center border-b border-slate-100">
                      Engagement
                    </th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none border-b border-slate-100">
                      Status
                    </th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none border-b border-slate-100">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {blogsLoading ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-8 py-10 text-center text-slate-400"
                      >
                        Syncing...
                      </td>
                    </tr>
                  ) : myBlogs.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-8 py-10 text-center text-slate-400"
                      >
                        No content records found
                      </td>
                    </tr>
                  ) : (
                    myBlogs.map((blog) => (
                      <tr
                        key={blog._id}
                        className="border-t border-slate-100 hover:bg-slate-50 transition-colors group/row"
                      >
                        <td className="px-8 py-5">
                          <p className="font-bold text-sm text-slate-700 group-hover/row:text-blue-600 transition-colors">
                            {blog.title}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-bold">
                            {blog.category}
                          </p>
                        </td>
                        <td className="px-8 py-5 text-center">
                          <div className="flex flex-col items-center">
                            <span className="text-sm font-black text-slate-700">
                              {blog.meta?.views || 0}
                            </span>
                            <div className="w-12 h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                              <div
                                className="h-full bg-blue-500"
                                style={{
                                  width: `${Math.min((blog.meta?.views || 0) * 2, 100)}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span
                            className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-tighter ${blog.published ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}
                          >
                            {blog.published ? "Live" : "Draft"}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <Link
                            to={`/blogs/${blog.slug}`}
                            className="p-2 hover:bg-blue-500/10 rounded-lg text-blue-600 transition-colors inline-block"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Partners Performance Table - Only for Admin */}
          {user?.role === "admin" && (
            <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden group shadow-sm">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h4 className="font-bold flex items-center gap-2 text-slate-900">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  Partners Performance Summary
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none border-b border-slate-100">
                        Partner
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none text-center border-b border-slate-100">
                        Active Users
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none text-center border-b border-slate-100">
                        Events
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none text-center border-b border-slate-100">
                        New Users
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none border-b border-slate-100">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaryLoading ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-8 py-10 text-center text-slate-400"
                        >
                          Syncing...
                        </td>
                      </tr>
                    ) : partnersSummary.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-8 py-10 text-center text-slate-400"
                        >
                          No records found
                        </td>
                      </tr>
                    ) : (
                      partnersSummary.map((ps) => {
                        const partner = partners.find(
                          (p) => p.param === ps.param,
                        );
                        return (
                          <tr
                            key={ps.param}
                            className="border-t border-slate-100 hover:bg-slate-50 transition-colors group/row"
                          >
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-3">
                                {partner?.coverImage ? (
                                  <img
                                    src={partner.coverImage}
                                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                                    alt=""
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200">
                                    <Users className="w-5 h-5 text-slate-400" />
                                  </div>
                                )}
                                <div>
                                  <p className="font-bold text-sm text-slate-700 group-hover/row:text-purple-600 transition-colors">
                                    {partner?.name || ps.param}
                                  </p>
                                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-bold">
                                    {partner?.category || "Partnership"}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-5 text-center">
                              <span className="text-sm font-black text-slate-700">
                                {ps.activeUsers}
                              </span>
                            </td>
                            <td className="px-8 py-5 text-center">
                              <span className="text-sm font-black text-slate-700">
                                {ps.eventCount}
                              </span>
                            </td>
                            <td className="px-8 py-5 text-center">
                              <span className="text-sm font-black text-slate-700">
                                {ps.newUsers}
                              </span>
                            </td>
                            <td className="px-8 py-5">
                              <button
                                onClick={() =>
                                  setSelectedPartnerParam(ps.param)
                                }
                                className="px-4 py-2 border border-slate-200 hover:bg-purple-50 hover:border-purple-200 rounded-xl text-purple-600 text-xs font-bold transition-all"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({
  icon,
  label,
  active = false,
  hasSubmenu = false,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${active ? "bg-blue-600/10 text-blue-600 shadow-sm" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}
  >
    {icon}
    <span className="text-sm font-semibold flex-1">{label}</span>
    {hasSubmenu && <ChevronRight className="w-4 h-4 text-slate-400" />}
  </div>
);

const StatCard = ({ label, value, trend, trendUp, icon }) => {
  const displayTrend =
    trend === "NaN%" || trend === "undefined%" || !trend ? "Live" : trend;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden shadow-sm">
      <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2.5 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform duration-500 shadow-sm border border-slate-100">
          {icon}
        </div>
        <div className="flex flex-col items-end">
          <span
            className={`text-[10px] font-black tracking-widest px-2 py-0.5 rounded-md uppercase ${trendUp ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"}`}
          >
            {displayTrend}
          </span>
          {displayTrend !== "Live" && (
            <div className="flex items-center mt-1">
              {trendUp ? (
                <ArrowUpRight className="w-2.5 h-2.5 text-emerald-500" />
              ) : (
                <ArrowDownRight className="w-2.5 h-2.5 text-red-500" />
              )}
            </div>
          )}
        </div>
      </div>
      <p className="text-[10px] text-slate-500 font-black uppercase tracking-[2px] mb-1">
        {label}
      </p>
      <h3 className="text-2xl font-black mb-1 tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
        {value}
      </h3>
    </div>
  );
};

export default DashboardX;


