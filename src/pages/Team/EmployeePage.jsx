import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Loader2,
  Clock,
  CheckCircle2,
  Cpu,
  Award,
  Globe,
  ExternalLink,
  Calendar,
  Layers,
  ArrowUpRight,
  TrendingUp,
  User,
  Shield,
  Star,
  Activity,
  Share2,
  Download,
  Mail
} from "lucide-react";
import { toast } from "react-toastify";

const EmployeePage = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        setLoading(true);
        // Fetch from our new endpoint that handles both Mongo details & ClickUp stats
        const response = await fetch(`http://localhost:5000/clickup/member-details?slug=${slug}`);
        const resData = await response.json();
        
        if (response.ok && resData.member) {
          setData(resData);
        } else {
          setError(resData.message || "Failed to load employee details.");
        }
      } catch (err) {
        console.error("Error fetching employee details:", err);
        setError("Network error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchMemberDetails();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center gap-4 text-white relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand-purple/10 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-brand-pink/5 blur-[150px] rounded-full animate-pulse" />
        </div>
        <Loader2 className="w-12 h-12 text-[#ff3358] animate-spin relative z-10" />
        <span className="text-xs font-black tracking-[0.3em] uppercase text-white/30 relative z-10 animate-pulse">
          Retrieving Real-Time Roster Data
        </span>
      </div>
    );
  }

  if (error || !data || !data.member) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center gap-6 text-white relative p-6">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand-purple/10 blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#ff3358]/5 blur-[150px] rounded-full" />
        </div>
        <Globe className="w-16 h-16 text-[#ff3358] animate-bounce relative z-10" />
        <div className="text-center relative z-10 max-w-md">
          <h2 className="text-3xl font-black uppercase tracking-tight font-roboto scale-y-[1.2] mb-2">
            Profile <span className="text-[#ff3358]">Not Found</span>
          </h2>
          <p className="text-white/40 text-sm font-medium tracking-wide">
            {error || "The requested individual employee page is not available or does not exist."}
          </p>
        </div>
        <Link
          to="/team"
          className="relative z-10 px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#ff3358] hover:text-white transition-all flex items-center gap-3"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Team
        </Link>
      </div>
    );
  }

  const { member, clickup } = data;
  const user = member.user || {};

  // Formatter for total hours
  const hoursLogged = clickup && !clickup.error ? Number(clickup.totalHours || 0).toFixed(1) : "0.0";
  const tasksCompleted = clickup && !clickup.error ? clickup.worksDone || 0 : 0;
  const clickupTasks = clickup && !clickup.error ? clickup.tasks || [] : [];

  return (
    <div className="min-h-screen bg-brand-dark selection:bg-brand-pink selection:text-white text-white relative overflow-hidden pb-32">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand-purple/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#ff3358]/5 blur-[150px] rounded-full" />
        {/* Subtle grid line effect */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '120px 120px' }} 
        />
      </div>

      {/* Floating Navigation/Header */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-8 relative z-20 flex justify-between items-center">
        {/* Left */}
        <Link
          to="/team"
          className="group text-white/70 hover:text-white font-medium flex items-center gap-3 transition-all"
        >
          <div className="p-2 rounded-full border border-white/20 group-hover:border-white/40 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium tracking-wide">Back to Team</span>
        </Link>
        
        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 font-serif text-3xl font-bold tracking-tight select-none cursor-pointer">
          Social<span className="text-[#ff3358]">B</span>ureau
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 hidden md:flex">
          <button className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 text-[10px] font-bold tracking-widest flex items-center gap-2 transition-all">
            <Share2 className="w-3.5 h-3.5" /> SHARE
          </button>
          <button className="px-6 py-2.5 rounded-full bg-[#ff3358] hover:bg-[#ff1f4b] text-white text-[10px] font-bold tracking-widest flex items-center gap-2 transition-all shadow-[0_5px_20px_rgba(255,51,88,0.3)]">
            <Download className="w-3.5 h-3.5" /> PORTFOLIO PDF
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 mt-8 mb-20 relative z-10 flex flex-col items-center">
        
        {/* Background Name */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none z-0 tracking-tighter uppercase leading-none mt-10 font-roboto">
          {member.name}
        </div>

        {/* Top Tags */}
        <div className="flex items-center gap-4 mb-10 z-10">
          <div className="px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED PRO
          </div>
          <div className="px-5 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Active Now
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 z-10 w-full relative">
          
          {/* Image Block */}
          <div className="w-64 h-64 md:w-[22rem] md:h-[22rem] rounded-[2.5rem] overflow-hidden flex-shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative border border-white/5">
            <div className="absolute inset-0 bg-[#e32230] z-0" />
            <div className="absolute inset-0 flex items-center justify-center z-10 opacity-40 mix-blend-overlay" />
            {member.image ? (
              <img src={member.image} alt={member.name} className="w-full h-full object-cover relative z-20" />
            ) : (
              <div className="w-full h-full flex items-center justify-center relative z-20">
                <User className="w-24 h-24 text-white/30" />
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center text-center md:text-left flex-1 max-w-2xl">
            <h1 className="text-6xl md:text-[6.5rem] font-black uppercase tracking-tighter leading-[0.9] mb-4 font-roboto scale-y-[1.1] transform-origin-left text-white">
              {member.name}
            </h1>
            <p className="text-white/60 text-sm md:text-base font-medium mb-4 tracking-wide">
              {member.role}
            </p>
            <p className="text-white/40 italic text-sm md:text-base max-w-xl mb-10 leading-relaxed font-serif">
              "{member.description || 'Redefining how brands Attract, Pull & Influence — through data, systems, and relentless execution.'}"
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
              <button className="px-8 py-3.5 rounded-full bg-[#ff3358]/80 hover:bg-[#ff3358] border border-[#ff3358] text-white text-[11px] font-bold tracking-widest flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(255,51,88,0.2)]">
                <Mail className="w-4 h-4" /> MESSAGE
              </button>
              <button className="px-8 py-3.5 rounded-full bg-transparent hover:bg-purple-900/20 border border-purple-500/30 text-purple-300 text-[11px] font-bold tracking-widest flex items-center gap-2 transition-all">
                <Calendar className="w-4 h-4" /> BOOK SESSION
              </button>
              <button className="px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-[11px] font-bold tracking-widest transition-all">
                CLICKUP
              </button>
              <button className="px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-[11px] font-bold tracking-widest flex items-center gap-2 transition-all">
                PDF <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="w-full max-w-[85rem] mx-auto px-6 z-10 relative mb-20">
        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 flex flex-wrap justify-between items-center gap-4 shadow-2xl relative overflow-hidden">
          {/* subtle glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff3358]/5 via-purple-500/5 to-transparent z-0 pointer-events-none" />
          
          <div className="flex flex-col items-center flex-1 relative z-10 border-r border-white/10 last:border-0 border-dashed py-2">
            <span className="text-[2.5rem] font-black text-[#ff3358] tracking-tighter">12+</span>
            <span className="text-[10px] text-white/40 font-black tracking-widest uppercase mt-1">PROJECTS</span>
          </div>

          <div className="flex flex-col items-center flex-1 relative z-10 border-r border-white/10 last:border-0 border-dashed py-2">
            <span className="text-[2.5rem] font-black text-purple-400 tracking-tighter">{tasksCompleted}</span>
            <span className="text-[10px] text-white/40 font-black tracking-widest uppercase mt-1">TASKS/MO</span>
          </div>

          <div className="flex flex-col items-center flex-1 relative z-10 border-r border-white/10 last:border-0 border-dashed py-2">
            <span className="text-[2.5rem] font-black text-blue-400 tracking-tighter">{hoursLogged}H</span>
            <span className="text-[10px] text-white/40 font-black tracking-widest uppercase mt-1">HOURS/MO</span>
          </div>

          <div className="flex flex-col items-center flex-1 relative z-10 border-r border-white/10 last:border-0 border-dashed py-2">
            <span className="text-[2.5rem] font-black text-green-400 tracking-tighter">94%</span>
            <span className="text-[10px] text-white/40 font-black tracking-widest uppercase mt-1">EFFICIENCY</span>
          </div>

          <div className="flex flex-col items-center flex-1 relative z-10 border-r border-white/10 last:border-0 border-dashed py-2">
            <span className="text-[2.5rem] font-black text-yellow-400 tracking-tighter">6YR</span>
            <span className="text-[10px] text-white/40 font-black tracking-widest uppercase mt-1">TENURE</span>
          </div>

          <div className="flex flex-col items-center flex-1 relative z-10 border-r border-white/10 last:border-0 border-dashed py-2">
            <span className="text-[2.5rem] font-black text-pink-400 tracking-tighter">{user.clients?.length || 18}+</span>
            <span className="text-[10px] text-white/40 font-black tracking-widest uppercase mt-1">CLIENTS</span>
          </div>

          <div className="flex flex-col items-center flex-1 relative z-10 border-r border-white/10 last:border-0 border-dashed py-2 border-none">
            <span className="text-[2.5rem] font-black text-orange-400 tracking-tighter flex items-center">4.9<Star className="w-5 h-5 ml-1 mb-1 fill-orange-400 text-orange-400" /></span>
            <span className="text-[10px] text-white/40 font-black tracking-widest uppercase mt-1">RATING</span>
          </div>
        </div>
      </div>

      {/* Main Profile Showcase Grid */}
      <div className="w-full max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Activity & Stacks (Lg: col-span-8) */}
        <div className="lg:col-span-8 flex flex-col gap-12">

          {/* ClickUp Task Feed */}
          {clickup && !clickup.error && clickupTasks.length > 0 && (
            <section className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#ff3358] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#ff3358]" /> Real-time Deliverables Feed
              </h3>
              
              <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 space-y-4">
                {clickupTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group/task"
                  >
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span 
                          className="px-2.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest font-mono"
                          style={{ 
                            backgroundColor: `${task.statusColor || '#3498db'}20`, 
                            color: task.statusColor || '#3498db',
                            border: `1px solid ${task.statusColor || '#3498db'}30` 
                          }}
                        >
                          {task.status || "In Progress"}
                        </span>
                        <span className="text-[10px] text-white/40 font-bold font-mono">ID: {task.id}</span>
                      </div>
                      <h4 className="font-bold text-sm text-white group-hover/task:text-[#ff3358] transition-colors truncate">
                        {task.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0 justify-between sm:justify-end">
                      {task.due && (
                        <div className="flex items-center gap-1.5 text-white/40 text-xs font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{task.due}</span>
                        </div>
                      )}
                      
                      {task.url && (
                        <a 
                          href={task.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 bg-white/5 hover:bg-[#ff3358] text-white/70 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all flex items-center gap-1.5 group/link"
                        >
                          Details
                          <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tools & Core Stack */}
          {user.tools && user.tools.length > 0 && (
            <section className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#ff3358] flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#ff3358]" /> Technical Arsenal & Stack
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {user.tools.map((tool, idx) => (
                  <div 
                    key={idx}
                    className="bg-white/5 border border-white/5 hover:border-[#ff3358]/30 rounded-2xl p-5 hover:bg-white/10 hover:shadow-[0_10px_30px_rgba(255,51,88,0.05)] transition-all duration-300 group/tool flex flex-col justify-between"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-xl mb-4 group-hover/tool:scale-110 transition-transform">
                      {tool.icon ? (
                        <img src={tool.icon} alt={tool.toolName} className="w-6 h-6 object-contain" />
                      ) : (
                        <Cpu className="w-5 h-5 text-white/20" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider group-hover/tool:text-[#ff3358] transition-colors">{tool.toolName}</h4>
                      {tool.url && (
                        <a 
                          href={tool.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[9px] text-white/30 uppercase tracking-widest font-black hover:text-white transition-colors mt-1 block flex items-center gap-1"
                        >
                          Stack Profile <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Client Portfolio */}
          {user.clients && user.clients.length > 0 && (
            <section className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#ff3358] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#ff3358]" /> Brands & Clients Served
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {user.clients.map((client, idx) => (
                  <div 
                    key={idx}
                    className="bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 text-center group/client transition-all"
                  >
                    <div className="w-14 h-14 bg-white/5 border border-white/5 rounded-full overflow-hidden flex items-center justify-center text-white/20 font-black text-lg group-hover/client:scale-105 transition-all">
                      {client.logo ? (
                        <img src={client.logo} alt={client.name} className="w-full h-full object-cover" />
                      ) : (
                        client.name.substring(0, 2).toUpperCase()
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider">{client.name}</h4>
                      {client.website && (
                        <a 
                          href={client.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[9px] text-[#ff3358] hover:text-white uppercase tracking-widest font-black mt-1 block"
                        >
                          Visit Site
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* RIGHT COLUMN: Socials & Badges (Lg: col-span-4) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Social Channels */}
          {member.socials && (
            <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
               <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#ff3358] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#ff3358]" /> Connect
              </h4>
              <div className="flex gap-4 w-full z-10 relative">
                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#ff3358] hover:text-white transition-all text-white/60 hover:scale-110 flex-1 flex justify-center"
                  >
                    <i className="fab fa-linkedin-in text-lg" />
                  </a>
                )}
                {member.socials.instagram && (
                  <a
                    href={member.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#ff3358] hover:text-white transition-all text-white/60 hover:scale-110 flex-1 flex justify-center"
                  >
                    <i className="fab fa-instagram text-lg" />
                  </a>
                )}
                {member.socials.twitter && (
                  <a
                    href={member.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#ff3358] hover:text-white transition-all text-white/60 hover:scale-110 flex-1 flex justify-center"
                  >
                    <i className="fab fa-twitter text-lg" />
                  </a>
                )}
              </div>

              {/* Copy link option */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Profile link copied!");
                }}
                className="w-full mt-4 py-4 bg-white/5 hover:bg-white text-white/70 hover:text-black font-black uppercase tracking-widest text-[9px] rounded-2xl border border-white/10 hover:border-white transition-all z-10"
              >
                Share Profile Path
              </button>
            </div>
          )}

          {/* Achievements Block */}
          {user.achievements && user.achievements.length > 0 && (
            <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#ff3358] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#ff3358]" /> Awards & Badges
              </h4>

              <div className="space-y-4">
                {user.achievements.map((ach, idx) => (
                  <div key={idx} className="flex gap-4 items-start group/ach pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#ff3358] to-[#ff5c7a] rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_10px_20px_rgba(255,51,88,0.2)]">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-bold text-xs uppercase tracking-wider group-hover/ach:text-[#ff3358] transition-colors">
                        {ach.title}
                      </h5>
                      <p className="text-[10px] text-white/40 font-medium leading-relaxed">
                        {ach.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
