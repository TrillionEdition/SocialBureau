/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { motion, AnimatePresence } from "framer-motion";

import {
  Mail,
  Calendar,
  MousePointer2,
  FileText,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Users,
  MapPin,
  Clock,
  Star,
  Play,
  MessageCircle,
  Plus,
  ArrowLeft,
  Share2,
  Download,
  Loader2,
  Sparkles,
  GraduationCap,
  Award,
  Rocket,
  Globe,
  Trophy,
  TrendingUp,
  Briefcase,
  Building2,
  Handshake,
  Crown
} from "lucide-react";
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine
} from 'recharts';
import { clsx } from 'clsx';
import { toast } from 'react-toastify';
import Footer from '../../components/Footer';
import ResumeModal from '../Resume/ResumeModal';
import BookSessionModal from './BookSessionModal';
import { TEAM_MEMBERS } from './constants';

function cn(...inputs) {
  return clsx(inputs);
}

export const getMilestones = (name = "") => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("sham") || lowerName.includes("shamsk")) {
    return [
      {
        year: "Sep 2023",
        title: "Reporter Broadcasting Company Private Limited",
        description: "API Marketing Algorithm Consulting Partner",
        icon: Briefcase,
      },
      {
        year: "Oct 2023",
        title: "Dilse FM",
        description: "Social media algorithm consulting Graphic support Videography Market analysts Business consulting Marketing",
        icon: Briefcase,
      },
      {
        year: "Apr 2024",
        title: "Yellow Cloud",
        description: "Social Media Algorithm Consultant | Yellow Cloud Company",
        icon: Handshake,
      },
      {
        year: "Feb 2025",
        title: "Trillion Edition",
        description: "Managing Director & Co-Founder",
        icon: Rocket,
      },
      {
        year: "Feb 2025",
        title: "Social Bureau",
        description: "CEO & Co-Founder of Social Bureau, I lead the world’s first API Marketing company — a revolutionary platform built to redefine how brands connect, communicate, and convert in the digital world.",
        icon: Trophy,
      },
      {
        year: "Jan 2026",
        title: "Click Up",
        description: "ClickUp Verified Consultant",
        icon: Trophy,
      },
    ];
  }

  if (lowerName.includes("alen") || lowerName.includes("alen jacob")) {
    return [
      {
        year: "Nov 2021",
        title: "Business Bureau",
        description: "Founder : Business Bureau | Coworking",
        icon: Rocket,
      },
      {
        year: "Jun 2022",
        title: "Tommy Hilfiger",
        description: "Entrepreneur",
        icon: Trophy,
      },
      {
        year: "May 2025",
        title: "SocialBureau",
        description: "Co-Founder",
        icon: Rocket,
      },
      {
        year: "Aug 2025",
        title: "TrillionEdition",
        description: "MD",
        icon: Rocket,
      },
      {
        year: "Nov 2025",
        title: "RealtyBureau",
        description: "Founder",
        icon: Rocket,
      },
    ];
  }

  return [];
};

export const getDynamicMilestones = (achievements) => {
  if (!achievements || !Array.isArray(achievements) || achievements.length === 0) {
    return [];
  }

  // Parse date string to relative month integer for sorting
  const parseDateStr = (dateStr) => {
    if (!dateStr) return 0;
    const parts = dateStr.trim().toUpperCase().split(/\s+/);
    let month = 0;
    let year = 2026;
    
    const months = {
      JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
      JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11
    };

    if (parts.length === 1) {
      const y = parseInt(parts[0], 10);
      if (!isNaN(y)) year = y;
    } else if (parts.length >= 2) {
      const m = months[parts[0]];
      if (m !== undefined) month = m;
      const y = parseInt(parts[1], 10);
      if (!isNaN(y)) year = y;
    }
    
    return year * 12 + month;
  };

  // Sort achievements chronologically (ascending)
  const sorted = [...achievements].sort((a, b) => {
    return parseDateStr(a.date) - parseDateStr(b.date);
  });

  const getIconForBadge = (badgeType) => {
    const type = (badgeType || '').toUpperCase().trim();
    switch (type) {
      case 'MILESTONE':
        return Briefcase;
      case 'INNOVATION':
        return Sparkles;
      case 'CLIENT WIN':
      case 'CLIENT_WIN':
        return Handshake;
      case 'PARTNERSHIP':
        return Users;
      case 'ACHIEVEMENT':
        return Trophy;
      case 'LAUNCH':
        return Rocket;
      default:
        return Star;
    }
  };

  const formatUIYear = (dateStr) => {
    if (!dateStr) return '2026';
    const parts = dateStr.trim().split(/\s+/);
    if (parts.length >= 2) {
      const mStr = parts[0].substring(0, 3);
      const month = mStr.charAt(0).toUpperCase() + mStr.slice(1).toLowerCase();
      const year = parts[1];
      return `${month} ${year}`;
    }
    return dateStr.trim();
  };

  return sorted.map((ach) => {
    return {
      year: formatUIYear(ach.date || ''),
      title: ach.title || 'Milestone',
      description: ach.description || '',
      icon: getIconForBadge(ach.image)
    };
  });
};

const CustomTooltip = ({ active, payload, label, color }) => {
  if (active && payload && payload.length) {
    return (
      <div 
        className="px-4 py-3 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-0.5 min-w-[95px]"
        style={{
          background: 'rgba(14, 6, 22, 0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
      >
        <span className="text-[10px] font-black text-white uppercase tracking-wider">{label}</span>
        <span className="text-[9px] font-black uppercase tracking-widest mt-0.5" style={{ color: color }}>
          value : <span className="text-white">{payload[0].value}</span>
        </span>
      </div>
    );
  }
  return null;
};

// --- Static Fallback / Mock Data ---

const activityData = [
  { name: 'MON', value: 12 },
  { name: 'TUE', value: 11 },
  { name: 'WED', value: 13 },
  { name: 'THU', value: 14 },
  { name: 'FRI', value: 12 },
  { name: 'SAT', value: 5 },
  { name: 'SUN', value: 3 },
];

const taskCompletionData = [
  { name: 'JAN', value: 25 },
  { name: 'FEB', value: 35 },
  { name: 'MAR', value: 15 },
  { name: 'APR', value: 45 },
  { name: 'MAY', value: 30 },
];

const workingHoursData = [
  { name: 'JAN', value: 160 },
  { name: 'FEB', value: 175 },
  { name: 'MAR', value: 140 },
  { name: 'APR', value: 186 },
  { name: 'MAY', value: 170 },
];

const efficiencyScoreData = [
  { name: 'JAN', efficiency: 25, delivery: 22, csat: 18 },
  { name: 'FEB', efficiency: 27, delivery: 24, csat: 20 },
  { name: 'MAR', efficiency: 26, delivery: 22, csat: 21 },
  { name: 'APR', efficiency: 22, delivery: 18, csat: 15 },
  { name: 'MAY', efficiency: 28, delivery: 24, csat: 19 },
  { name: 'JUN', efficiency: 32, delivery: 26, csat: 24 },
  { name: 'JUL', efficiency: 35, delivery: 28, csat: 22 },
  { name: 'AUG', efficiency: 38, delivery: 31, csat: 28 },
  { name: 'SEP', efficiency: 42, delivery: 34, csat: 32 },
  { name: 'OCT', efficiency: 45, delivery: 36, csat: 30 },
];

const PUBLIC_HOLIDAYS_2026 = {
  '2026-01-01': 'New Year',
  '2026-01-26': 'Republic Day',
  '2026-03-20': 'Eid-ul-Fitr (Ramadan)',
  '2026-04-03': 'Good Friday',
  '2026-04-14': 'Vishu',
  '2026-05-01': 'Labour Day',
  '2026-05-28': 'Bakrid (Eid al-Adha)',
  '2026-08-15': 'Independence Day',
  '2026-08-28': 'Uthradam (First Onam)',
  '2026-08-29': 'Thiruvonam',
  '2026-10-02': 'Gandhi Jayanti',
  '2026-12-25': 'Christmas'
};

const getHolidayName = (date) => {
  if (date.getFullYear() !== 2026) return null;
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}-${mm}-${dd}`;
  return PUBLIC_HOLIDAYS_2026[dateStr] || null;
};

const generateFallbackAttendance = (year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  return Array.from({ length: daysInMonth }, (_, i) => {
    const dayNum = i + 1;
    const targetDate = new Date(year, month, dayNum);
    targetDate.setHours(0, 0, 0, 0);

    const isWeekend = targetDate.getDay() === 0; // Only Sunday is weekend
    const isUpcoming = targetDate.getTime() > todayStart.getTime();

    const holidayName = getHolidayName(targetDate);

    let status = 'present';
    if (holidayName) {
      status = 'holiday';
    } else if (isUpcoming) {
      status = 'upcoming';
    } else if (isWeekend) {
      status = 'weekend';
    } else if (dayNum === 7 || dayNum === 11 || dayNum === 14 || dayNum === 18) {
      status = 'leave';
    } else if (dayNum === 8) {
      status = 'half';
    }

    const daysOfWeekFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const formattedDate = targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const dayName = daysOfWeekFull[targetDate.getDay()];

    return {
      id: i,
      status,
      date: formattedDate,
      day: dayName,
      holidayName: holidayName || undefined
    };
  });
};

const attendanceData = generateFallbackAttendance(new Date().getFullYear(), new Date().getMonth());

const expertiseData = [
  { name: 'API Marketing Strategy', progress: 85, color: '#F43F5E' },
  { name: 'Performance Marketing', progress: 65, color: '#A855F7' },
  { name: 'AEO / GEO / SEO', progress: 92, color: '#06B6D4' },
  { name: 'Content Strategy', progress: 80, color: '#F59E0B' },
  { name: 'ClickUp Architecture', progress: 70, color: '#3B82F6' },
  { name: 'Social Media Management', progress: 88, color: '#EAB308' },
  { name: 'Brand Strategy', progress: 75, color: '#EC4899' },
];

// --- Sub Components ---

const SectionTitle = ({ title, subtitle, color, barColor = "bg-brand-purple" }) => (
  <div className="flex items-center gap-2 mb-6">
    <div className={cn("w-1 h-6 rounded-full", barColor)} />
    <h2 className={cn("text-[11px] font-semibold tracking-[0.2em] uppercase", color || "text-gray-400")}>{title}</h2>
    {subtitle && <span className="text-[10px] text-gray-600 font-semibold uppercase tracking-widest ml-2 opacity-50">{subtitle}</span>}
    <div className="flex-1 h-[1px] bg-white/5 ml-4" />
  </div>
);

const GlassCard = ({ children, className, variant = 'default' }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ type: "spring", stiffness: 45, damping: 12, mass: 1 }}
    className={cn(variant === 'purple' ? "glass-card-purple" : "glass-card", "p-4 md:p-6", className)}
  >
    {children}
  </motion.div>
);

const StatItem = ({ label, value, color }) => (
  <div className="flex flex-col items-center justify-center py-4 px-4 md:py-6 md:px-8 grow transition-all hover:bg-white/5 border border-white/5 md:border-y-0 md:border-l-0 md:border-r md:last:border-0">
    <span className={cn("text-2xl md:text-4xl lg:text-5xl font-black mb-1 md:mb-2 drop-shadow-sm tracking-tight", color)}>{value}</span>
    <span className="text-[9px] md:text-[11px] text-gray-400 font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase text-center">{label}</span>
  </div>
);

const CircularProgress = ({ value, label, subLabel, color }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="border border-white/10 rounded-[28px] p-6 flex flex-col items-center text-center flex-1 shadow-lg shadow-black/20" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-6">{label}</span>
      <div className="relative w-28 h-28 mb-6">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="56"
            cy="56"
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="8"
          />
          <circle
            cx="56"
            cy="56"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${color}33)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-black leading-none" style={{ color: color }}>{value}%</span>
        </div>
      </div>
      <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{subLabel}</span>
    </div>
  );
};

const InnovationCard = ({ type, date, title, content, url, likes, comments }) => {
  const handleCopyUrl = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success('🔗 Link copied!', { position: 'bottom-right', autoClose: 2000, theme: 'dark' });
    });
  };
  return (
    <div className="glass-card mb-4 p-5 hover:bg-white/10 transition-all cursor-pointer group relative">
      <div className="flex justify-between items-start mb-3">
        <span className={cn("px-3 py-1 rounded-[30px] btn-typo uppercase", 
          type === 'INNOVATION' ? 'bg-[#441649]/40 text-purple-400 border border-purple-500/30' :
          type === 'CASE STUDY' ? 'bg-[#102C1A]/48 text-green-400 border border-green-500/30' :
          'bg-[#112240]/60 text-blue-400 border border-blue-500/30'
        )}>
          {type}
        </span>
        <div className="flex items-center gap-2">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-7 h-7 rounded-lg flex items-center justify-center border border-[#00d2ff]/30 bg-[#00d2ff]/10 hover:bg-[#00d2ff]/20 hover:border-[#00d2ff]/50 hover:shadow-[0_0_12px_rgba(0,210,255,0.45)] text-[#00d2ff] hover:text-[#00d2ff] transition-all duration-300 active:scale-95 shrink-0"
              title="View Attachment"
              aria-label="Open attachment link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </a>
          )}
          <span className="text-[10px] text-gray-500 font-medium uppercase shrink-0">{date}</span>
          {/* Copy URL Button - appears on card hover */}
          <button
            onClick={handleCopyUrl}
            className="relative opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 w-7 h-7 rounded-lg flex items-center justify-center border border-white/10 bg-white/5 hover:bg-[#0099c2]/20 hover:border-[#0099c2]/50 hover:shadow-[0_0_12px_rgba(0,153,194,0.35)] active:scale-95"
            title="Copy URL"
            aria-label="Copy page URL"
          >
            {/* Chain link SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0099c2] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </button>
        </div>
      </div>
      <h3 className="text-sm font-semibold mb-2 group-hover:text-brand-purple transition-colors">{title}</h3>
      <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">{content}</p>
      <div className="flex items-center gap-4 text-[10px] text-gray-500 font-medium">
        <span className="flex items-center gap-1 group-hover:text-brand-pink transition-colors"><Star className="w-3 h-3" /> {likes}</span>
        <span className="flex items-center gap-1 group-hover:text-brand-blue transition-colors"><MessageCircle className="w-3 h-3" /> {comments}</span>
      </div>
    </div>
  );
};

const getStaticEnrichedData = (slug, originalData) => {
  const normSlug = (slug || '').toLowerCase();
  console.log('Normalized Slug:', normSlug);
  const isSham = normSlug === 'shamsk' || normSlug === 'sham-sk';
  
  // Custom mock attendance generator where everyone is present on all weekdays (ideal executive)
  const generateIdealAttendance = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    return Array.from({ length: daysInMonth }, (_, i) => {
      const dayNum = i + 1;
      const targetDate = new Date(year, month, dayNum);
      targetDate.setHours(0, 0, 0, 0);

      const isSunday = targetDate.getDay() === 0;
      const isUpcoming = targetDate.getTime() > todayStart.getTime();
      const holidayName = getHolidayName(targetDate);

      let status = 'present';
      if (holidayName) {
        status = 'holiday';
      } else if (isUpcoming) {
        status = 'upcoming';
      } else if (isSunday) {
        status = 'weekend';
      }

      const daysOfWeekFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const formattedDate = targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const dayName = daysOfWeekFull[targetDate.getDay()];

      return {
        id: i,
        status,
        date: formattedDate,
        day: dayName,
        holidayName: holidayName || undefined
      };
    });
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  if (isSham) {
    return {
      member: {
        ...(originalData?.member || {}),
        name: originalData?.member?.name || "Sham S K",
        role: originalData?.member?.role || "Founder & CEO",
        bgText: originalData?.member?.bgText || "CEO",
        image: originalData?.member?.image || "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/socialbureau-media/images/Team/bulcmcbtguawhkw9f7oo.webp",
        cardImage: originalData?.member?.cardImage || "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/socialbureau-media/images/Team/dgox61jo9mebikejqe2i.webp",
        image1: originalData?.member?.image1 || "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/socialbureau-media/images/Team/cfg8edyz3kmmxjhqt98y.webp",
        description: originalData?.member?.description || "Redefining how brands Attract, Pull & Influence — through data, systems, and relentless execution.",
        tagline: originalData?.member?.tagline || "Founder & CEO · World's First API Marketing Consultant",
        bgColor: originalData?.member?.bgColor || "#ff3358",
        socials: originalData?.member?.socials || {
          linkedin: "https://shamsk.trillionedition.com/",
          instagram: "https://instagram.com",
          twitter: "https://twitter.com"
        }
      },
      clickup: {
        totalHours: 194.5,
        worksDone: 58,
        totalTasks: 60,
        efficiency: 96,
        onTime: 98,
        csat: 97,
        activityData: [
          { name: 'MON', value: 15 },
          { name: 'TUE', value: 18 },
          { name: 'WED', value: 14 },
          { name: 'THU', value: 16 },
          { name: 'FRI', value: 15 },
          { name: 'SAT', value: 8 },
          { name: 'SUN', value: 6 }
        ],
        taskCompletionData: [
          { name: 'JAN', value: 48 },
          { name: 'FEB', value: 55 },
          { name: 'MAR', value: 42 },
          { name: 'APR', value: 58 },
          { name: 'MAY', value: 50 }
        ],
        workingHoursData: [
          { name: 'JAN', value: 185 },
          { name: 'FEB', value: 192 },
          { name: 'MAR', value: 178 },
          { name: 'APR', value: 194.5 },
          { name: 'MAY', value: 188 }
        ],
        attendanceData: generateIdealAttendance(currentYear, currentMonth),
        efficiencyScoreData: [
          { name: 'JAN', efficiency: 92, delivery: 94, csat: 95 },
          { name: 'FEB', efficiency: 94, delivery: 95, csat: 96 },
          { name: 'MAR', efficiency: 93, delivery: 95, csat: 96 },
          { name: 'APR', efficiency: 96, delivery: 98, csat: 97 },
          { name: 'MAY', efficiency: 95, delivery: 97, csat: 96 }
        ],
        tasks: [
          { title: "API Attract-Pull Framework Release v3", listName: "API Marketing Strategy", folderName: "SUNTIPS", status: "complete", statusType: "closed", closedDateMs: Date.now() - 3600000 },
          { title: "Suntips Global Expansion Business Pitch", listName: "Global Brand Integration", folderName: "OPERATIONS", status: "complete", statusType: "closed", closedDateMs: Date.now() - 14400000 },
          { title: "Quantum AI Advertising Pipeline Strategy", listName: "AI Automation Pipelines", folderName: "TECHNOLOGY", status: "in progress", statusType: "active", updatedDateMs: Date.now() - 86400000 },
          { title: "Socialbureau-backend Microservices Workflow Audit", listName: "API Marketing Strategy", folderName: "SUNTIPS", status: "complete", statusType: "closed", closedDateMs: Date.now() - 172800000 }
        ]
      },
      user: {
        ...(originalData?.user || originalData?.member?.user || {}),
        doj: originalData?.user?.doj || originalData?.member?.user?.doj || "2019-01-15",
        emp_id: originalData?.user?.emp_id || originalData?.member?.user?.emp_id || "SB-CEO-001",
        location: originalData?.user?.location || originalData?.member?.user?.location || "Kochi, Kerala",
        department: originalData?.user?.department || originalData?.member?.user?.department || "Leadership & Strategy",
        followers: originalData?.user?.followers || originalData?.member?.user?.followers || "2,671",
        efficiency: "96%",
        onTime: "98%",
        csat: "97%",
        tasksPerMonth: "58",
        hoursPerMonth: "194.5 HRS",
        tenure: "7YR",
        clientsCount: originalData?.user?.clients?.length ? `${originalData.user.clients.length}+` : "18+",
        rating: "4.9",
        projectsCount: "12+",
        clients: originalData?.user?.clients?.length ? originalData.user.clients : [
          { name: "Suntips" },
          { name: "Kerala Tourism" },
          { name: "V-Guard" },
          { name: "Muthoot Finance" },
          { name: "Synthite" },
          { name: "Geojit" }
        ],
        hobbies: originalData?.user?.hobbies || ["Strategic Chess", "High-Altitude Trekking", "Quantum Physics", "System Design"],
        workShowcase: originalData?.user?.workShowcase || []
      }
    };
  } else {
    return {
      member: {
        ...(originalData?.member || {}),
        name: originalData?.member?.name || "Alen Jacob",
        role: originalData?.member?.role || "Managing Director",
        bgText: originalData?.member?.bgText || "MD",
        image: originalData?.member?.image || "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/Team/553ba2d1-f4d4-4333-b90b-b8f1a0f8639c.webp",
        cardImage: originalData?.member?.cardImage || "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/Team/d397c533-9dea-4cf2-913b-f54a453102a3.webp",
        image1: originalData?.member?.image1 || "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/Team/c5983092-1827-4fdb-a9a9-ec643d616919.webp",
        description: originalData?.member?.description || "Spearheading regional corporate growth, strategic real estate developments, and business operations.",
        tagline: originalData?.member?.tagline || "Managing Director · Real Estate & Strategy Expert",
        bgColor: originalData?.member?.bgColor || "#ff3358",
        socials: originalData?.member?.socials || {
          linkedin: "https://www.linkedin.com/in/alen-jacob-695a99184",
          instagram: "https://instagram.com",
          twitter: "https://twitter.com"
        }
      },
      clickup: {
        totalHours: 180.2,
        worksDone: 52,
        totalTasks: 54,
        efficiency: 95,
        onTime: 97,
        csat: 96,
        activityData: [
          { name: 'MON', value: 12 },
          { name: 'TUE', value: 15 },
          { name: 'WED', value: 13 },
          { name: 'THU', value: 14 },
          { name: 'FRI', value: 12 },
          { name: 'SAT', value: 6 },
          { name: 'SUN', value: 4 }
        ],
        taskCompletionData: [
          { name: 'JAN', value: 45 },
          { name: 'FEB', value: 50 },
          { name: 'MAR', value: 38 },
          { name: 'APR', value: 52 },
          { name: 'MAY', value: 48 }
        ],
        workingHoursData: [
          { name: 'JAN', value: 172 },
          { name: 'FEB', value: 180 },
          { name: 'MAR', value: 165 },
          { name: 'APR', value: 180.2 },
          { name: 'MAY', value: 175 }
        ],
        attendanceData: generateIdealAttendance(currentYear, currentMonth),
        efficiencyScoreData: [
          { name: 'JAN', efficiency: 91, delivery: 93, csat: 94 },
          { name: 'FEB', efficiency: 93, delivery: 94, csat: 95 },
          { name: 'MAR', efficiency: 92, delivery: 93, csat: 94 },
          { name: 'APR', efficiency: 95, delivery: 97, csat: 96 },
          { name: 'MAY', efficiency: 94, delivery: 95, csat: 95 }
        ],
        tasks: [
          { title: "Skyline Builders Land Acquisition Proposal", listName: "Corporate Real Estate Expansion", folderName: "REAL ESTATE", status: "complete", statusType: "closed", closedDateMs: Date.now() - 7200000 },
          { title: "Muthoot Finance Strategic Alignment Term Sheet", listName: "Strategic Partnership Deals", folderName: "PARTNERSHIP", status: "complete", statusType: "closed", closedDateMs: Date.now() - 18000000 },
          { title: "SocialBureau Operations Restructuring Plan", listName: "Organizational Restructuring", folderName: "OPERATIONS", status: "in progress", statusType: "active", updatedDateMs: Date.now() - 90000000 },
          { title: "Skyline Builders Q2 Financial Audit Review", listName: "Corporate Real Estate Expansion", folderName: "REAL ESTATE", status: "complete", statusType: "closed", closedDateMs: Date.now() - 259200000 }
        ]
      },
      user: {
        ...(originalData?.user || originalData?.member?.user || {}),
        doj: originalData?.user?.doj || originalData?.member?.user?.doj || "2019-03-01",
        emp_id: originalData?.user?.emp_id || originalData?.member?.user?.emp_id || "SB-MD-002",
        location: originalData?.user?.location || originalData?.member?.user?.location || "Kochi, Kerala",
        department: originalData?.user?.department || originalData?.member?.user?.department || "Corporate Leadership",
        followers: originalData?.user?.followers || originalData?.member?.user?.followers || "1,850",
        efficiency: "95%",
        onTime: "97%",
        csat: "96%",
        tasksPerMonth: "52",
        hoursPerMonth: "180.2 HRS",
        tenure: "7YR",
        clientsCount: originalData?.user?.clients?.length ? `${originalData.user.clients.length}+` : "15+",
        rating: "4.8",
        projectsCount: "10+",
        clients: originalData?.user?.clients?.length ? originalData.user.clients : [
          { name: "Skyline Builders" },
          { name: "Asset Homes" },
          { name: "Confident Group" },
          { name: "Prestige Group" }
        ],
        hobbies: originalData?.user?.hobbies || ["Architectural Photography", "Golfing", "Aviation", "Sailing"],
        workShowcase: originalData?.user?.workShowcase || []
      }
    };
  }
};

// --- Sub components for Sham & Alen profiles ---

const QuoteBanner = ({ slug }) => {
  const isSham = ['shamsk', 'sham-sk'].includes((slug || '').toLowerCase());
  
  const shamLines = [
    '"Leadership is the',
    'orchestration of data',
    'into destiny. We don\'t',
    'just follow trends,we',
    'engineer the',
    'infrastructures that',
    'create them."'
  ];

  const alenLines = [
    '"Operational excellence',
    'is the bridge between',
    'ambitious vision and',
    'absolute execution."'
  ];

  const lines = isSham ? shamLines : alenLines;
  const author = isSham ? 'SHAM, FOUNDER & CEO' : 'ALEN, MANAGING DIRECTOR';

  // Framer Motion variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const lineVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.215, 0.61, 0.355, 1.0]
      }
    }
  };

  return (
    <section className="relative py-16 md:py-24 flex flex-col items-center justify-center text-center px-4 md:px-8 overflow-hidden bg-transparent select-none">
      {/* Giant quote icon */}
      <div className="text-[80px] md:text-[120px] font-serif leading-none text-purple-500/10 h-10 md:h-14 flex items-center justify-center pointer-events-none mb-4 font-black select-none">
        ”
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        className="max-w-4xl mx-auto flex flex-col gap-1 md:gap-2 items-center"
      >
        {lines.map((line, idx) => (
          <div key={idx} className="overflow-hidden py-0.5 w-full">
            <motion.h2
              variants={lineVariants}
              className="text-[4.5vw] sm:text-2xl md:text-4xl lg:text-[2.8rem] font-black tracking-tight text-white leading-tight italic uppercase font-display"
            >
              {line}
            </motion.h2>
          </div>
        ))}
        
        <motion.div
          variants={lineVariants}
          className="mt-6 md:mt-8 text-[9px] md:text-[11px] font-black tracking-[0.25em] text-[#C084FC] uppercase flex items-center gap-3"
        >
          <span className="w-4 h-[1px] bg-white/20" />
          {author}
          <span className="w-4 h-[1px] bg-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const BorderlessInfluenceNetwork = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const circleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-20px" }}
      variants={containerVariants}
      className="relative py-20 md:py-28 overflow-hidden flex flex-col items-center justify-center text-center px-4 md:px-8 border-y border-white/5 bg-transparent"
    >
      {/* Coordinates/Radar Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        {/* Diagonal crossing lines */}
        <motion.div
          variants={lineVariants}
          className="absolute w-[150%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 origin-center"
        />
        <motion.div
          variants={lineVariants}
          className="absolute w-[150%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-12 origin-center"
        />
        
        {/* Radar Circles */}
        <motion.div variants={circleVariants} className="absolute w-[200px] h-[200px] rounded-full border border-white/5" />
        <motion.div variants={circleVariants} className="absolute w-[400px] h-[400px] rounded-full border border-white/5" />
        <motion.div variants={circleVariants} className="absolute w-[600px] h-[600px] rounded-full border border-white/5" />
        <motion.div variants={circleVariants} className="absolute w-[800px] h-[800px] rounded-full border border-white/[0.02]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Top tag */}
        <motion.span
          variants={itemVariants}
          className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-cyan-400 uppercase mb-4 md:mb-6 block"
        >
          GLOBAL DOMINION
        </motion.span>
        
        {/* Main Heading */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-tight max-w-3xl mb-6"
        >
          Architecting a <span className="text-[#C084FC] italic">Borderless</span> Influence Network
        </motion.h2>
        
        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed mb-10 md:mb-14"
        >
          SocialBureau operates beyond traditional borders, leveraging a hybrid mesh of digital influence and physical infrastructure.
        </motion.p>

        {/* Stats Ribbon */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 w-full max-w-3xl"
        >
          {[
            { value: "12", label: "TIMEZONES" },
            { value: "180+", label: "NODES" },
            { value: "100%", label: "REDUNDANCY" }
          ].map((stat, idx) => (
            <React.Fragment key={stat.label}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center cursor-default"
              >
                <span className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[8px] md:text-[9px] text-gray-500 font-bold tracking-[0.2em] uppercase">
                  {stat.label}
                </span>
              </motion.div>
              {idx < 2 && (
                <div className="hidden sm:block w-[1px] h-12 bg-white/10" />
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const AlenExecutiveFocus = () => {
  return (
    <section className="relative py-16 md:py-24 max-w-[1440px] mx-auto px-4 md:px-8 overflow-hidden z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Operations Cards List */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="glass-card p-5 md:p-6 flex flex-col gap-5 md:gap-6 rounded-[28px] border border-white/10 shadow-2xl relative" style={{ backgroundColor: 'rgba(15, 6, 25, 0.45)' }}>
            
            {/* Item 1 */}
            <div className="flex gap-4 md:gap-5 items-start">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-[#A855F7]/30 bg-[#A855F7]/10 text-[#A855F7]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <path d="M10 6.5h4" />
                  <path d="M10 17.5h4" />
                  <path d="M6.5 10v4" />
                  <path d="M17.5 10v4" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-bold text-white tracking-wide mb-1 uppercase">Architectural Governance</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Implementing multi-layered communication frameworks that bridge central policy with regional execution.
                </p>
              </div>
            </div>

            <div className="h-[1px] bg-white/5" />

            {/* Item 2 */}
            <div className="flex gap-4 md:gap-5 items-start">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-[#06B6D4]/30 bg-[#06B6D4]/10 text-[#06B6D4]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-bold text-white tracking-wide mb-1 uppercase">Predictive Strategy</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Utilizing socio-political data modeling to anticipate narrative shifts and maintain platform stability.
                </p>
              </div>
            </div>

            <div className="h-[1px] bg-white/5" />

            {/* Item 3 */}
            <div className="flex gap-4 md:gap-5 items-start">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-[#EC4899]/30 bg-[#EC4899]/10 text-[#EC4899]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
                  <path d="M18 8h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4" />
                  <circle cx="8" cy="12" r="2" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-bold text-white tracking-wide mb-1 uppercase">Resilient Networking</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Ensuring 24/7 operational continuity across sovereign infrastructure with zero-latency protocols.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Copy block & Quote box */}
        <div className="lg:col-span-6 flex flex-col gap-5 md:gap-6 order-1 lg:order-2">
          <div>
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-[#EC4899] uppercase mb-2.5 block">
              EXECUTIVE FOCUS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-[1.1] mb-5">
              Strategic <span className="text-[#C084FC] italic">Operations</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Alen Jacob’s operational philosophy is rooted in technical precision and strategic foresight. As Managing Director, he oversees the intricate web of digital assets and human intelligence that defines SocialBureau's competitive edge in the global arena.
            </p>
          </div>

          {/* Bottom Right Quote Box */}
          <div className="glass-card-purple p-4 rounded-[16px] border-l-4 border-l-[#A855F7] border-white/5 shadow-xl" style={{ backgroundColor: 'rgba(15, 6, 25, 0.45)' }}>
            <p className="text-xs sm:text-sm font-bold italic text-white/90 leading-relaxed">
              "Efficiency is not just about speed; it's about the integrity of the architecture under pressure."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ShamFoundersFramework = () => {
  return (
    <section className="relative py-16 md:py-24 max-w-[1440px] mx-auto px-4 md:px-8 overflow-hidden z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Attract-Pull-Influence framework */}
        <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
          <div>
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-[#06B6D4] uppercase mb-2.5 block">
              FOUNDER'S FRAMEWORK
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-[1.1] mb-5">
              Attract–Pull–<span className="text-[#C084FC] italic">Influence</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-3xl">
              Sham's proprietary framework is the backbone of SocialBureau's success. It orchestrates digital ecosystems by merging human psychology with technical API automation.
            </p>
          </div>

          {/* Stacked Cards */}
          <div className="flex flex-col gap-3">
            
            {/* Card 1: Attract */}
            <div className="glass-card p-4 md:p-5 rounded-[16px] border-l-4 border-l-[#EC4899] border-white/5 flex gap-4 items-center shadow-xl transition-all hover:scale-[1.005]" style={{ backgroundColor: 'rgba(15, 6, 25, 0.45)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-[#EC4899]/30 bg-[#EC4899]/10 text-[#EC4899] shadow-[0_0_10px_rgba(236,72,153,0.1)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-bold text-white tracking-wide mb-0.5 uppercase">Attract</h3>
                <p className="text-[11px] text-gray-400">
                  Capturing high-intent data through strategic API touchpoints.
                </p>
              </div>
            </div>

            {/* Card 2: Pull */}
            <div className="glass-card p-4 md:p-5 rounded-[16px] border-l-4 border-l-[#A855F7] border-white/5 flex gap-4 items-center shadow-xl transition-all hover:scale-[1.005]" style={{ backgroundColor: 'rgba(15, 6, 25, 0.45)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-[#A855F7]/30 bg-[#A855F7]/10 text-[#A855F7] shadow-[0_0_10px_rgba(168,85,247,0.1)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-bold text-white tracking-wide mb-0.5 uppercase">Pull</h3>
                <p className="text-[11px] text-gray-400">
                  Engaging audiences through automated value loops.
                </p>
              </div>
            </div>

            {/* Card 3: Influence */}
            <div className="glass-card p-4 md:p-5 rounded-[16px] border-l-4 border-l-[#06B6D4] border-white/5 flex gap-4 items-center shadow-xl transition-all hover:scale-[1.005]" style={{ backgroundColor: 'rgba(15, 6, 25, 0.45)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-[#06B6D4]/30 bg-[#06B6D4]/10 text-[#06B6D4] shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M12 6v12" />
                  <path d="M6 12h12" />
                  <path d="M7.75 7.75l8.5 8.5" />
                  <path d="M7.75 16.25l8.5-8.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-bold text-white tracking-wide mb-0.5 uppercase">Influence</h3>
                <p className="text-[11px] text-gray-400">
                  Nurturing long-term brand advocates with personalized automation.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Automation Dashboard Integration */}
        <div className="lg:col-span-5 flex flex-col gap-4 md:gap-5">
          <div className="glass-card p-5 md:p-6 rounded-[28px] border border-white/10 shadow-2xl relative flex flex-col gap-5 overflow-hidden" style={{ backgroundColor: 'rgba(15, 6, 25, 0.45)' }}>
            
            {/* Header with MAC window controls */}
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-[9px] text-gray-500 tracking-wider">api-marketing-engine.js</span>
              <div className="w-10" />
            </div>

            {/* Syntax Highlighted Code / Terminal */}
            <div className="bg-black/50 border border-white/5 rounded-2xl p-4 font-mono text-[10px] leading-relaxed text-[#06B6D4] space-y-1 shadow-inner select-none relative overflow-hidden text-left">
              <div><span className="text-purple-400">const</span> <span className="text-blue-400">framework</span> = <span className="text-purple-400">new</span> <span className="text-yellow-400">APIMarketing</span>();</div>
              <div><span className="text-blue-400">framework</span>.<span className="text-green-400">initialize</span>({'{'}</div>
              <div className="pl-4"><span className="text-gray-400">attract:</span> <span className="text-green-300">"API_TOUCHPOINTS"</span>,</div>
              <div className="pl-4"><span className="text-gray-400">pull:</span> <span className="text-green-300">"AUTOMATED_VALUE_LOOPS"</span>,</div>
              <div className="pl-4"><span className="text-gray-400">influence:</span> <span className="text-green-300">"PERSONALIZED_CONVERSIONS"</span></div>
              <div>{'}'});</div>
              <div className="pt-2 text-green-400/80 animate-pulse">// status: RUNNING (99.9% uptime)</div>
            </div>

            {/* Stats row with divider lines */}
            <div className="flex justify-between items-center py-2 px-2 border-y border-white/5">
              {[
                { val: "99.9%", label: "API UPTIME", col: "text-green-400" },
                { val: "24/7", label: "MONITORING", col: "text-purple-400" },
                { val: "15M+", label: "MONTHLY LOOPS", col: "text-cyan-400" }
              ].map((stat, idx) => (
                <React.Fragment key={stat.label}>
                  <div className="flex flex-col items-center">
                    <span className={cn("text-xs font-black leading-none", stat.col)}>{stat.val}</span>
                    <span className="text-[7px] text-gray-500 font-bold tracking-wider uppercase mt-1">{stat.label}</span>
                  </div>
                  {idx < 2 && <div className="w-[1px] h-6 bg-white/10" />}
                </React.Fragment>
              ))}
            </div>

            {/* Bottom Quote / Sign-off */}
            <div className="text-center pt-1">
              <p className="text-xs text-gray-400 italic leading-relaxed">
                "Systems run the business, and automation scales the vision."
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// --- Main Employee Page Component ---

const EmployeePage = () => {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [coverUrl, setCoverUrl] = useState('https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/TeamPage/syudjvadmoda2nj1albg.png');
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showBookSessionModal, setShowBookSessionModal] = useState(false);

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    const today = new Date();
    if (selectedYear >= today.getFullYear() && selectedMonth >= today.getMonth()) {
      return; // Can't go to future month
    }
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(prev => prev + 1);
    } else {
      setSelectedMonth(prev => prev + 1);
    }
  };

  const matchedMember = TEAM_MEMBERS.find(m => {
    const normSlug = (slug || '').toLowerCase();
    const normId = (m.id || '').toLowerCase();
    const normName = (m.name || '').toLowerCase().replace(/\s+/g, '-');
    const normEmailUser = (m.email || '').split('@')[0].toLowerCase();
    
    return normId === normSlug ||
           normName === normSlug ||
           normEmailUser === normSlug ||
           normSlug.includes(normId) ||
           normId.includes(normSlug) ||
           (normSlug === 'shamsk' && normId === 'sham-sk') ||
           (normSlug === 'alen-jacob' && normId === 'alen');
  });

  const fallbackData = matchedMember ? {
    member: {
      name: matchedMember.name || "Team Member",
      role: matchedMember.role || "Consultant",
      bgText: matchedMember.bgText || matchedMember.name || "TEAM",
      image: matchedMember.image || "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/socialbureau-media/images/Team/bulcmcbtguawhkw9f7oo.webp",
      cardImage: matchedMember.cardImage || "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/socialbureau-media/images/Team/dgox61jo9mebikejqe2i.webp",
      image1: matchedMember.image1 || matchedMember.image || "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/TeamPage/Rectangle%2098.png",
      description: matchedMember.description || `Specializing in ${matchedMember.role || 'consulting'} — through data, systems, and relentless execution.`,
      tagline: matchedMember.tagline || `${matchedMember.role || 'Consultant'} · Team Member`,
      bgColor: matchedMember.bgColor || "#ff3358",
      socials: matchedMember.socials || {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com"
      }
    },
    clickup: {
      totalHours: 160,
      worksDone: 40,
      efficiency: 95,
      onTime: 40,
      csat: 95
    },
    user: {
      doj: "2022-01-15",
      emp_id: `SB-EMP-${matchedMember.id?.toUpperCase() || '000'}`,
      location: "Kochi, Kerala",
      department: matchedMember.category?.[0] || "Operations",
      followers: "150+",
      efficiency: "95%",
      onTime: "95%",
      csat: "95%",
      tasksPerMonth: "40",
      hoursPerMonth: "160 HRS",
      tenure: "4YR",
      clientsCount: "10+",
      rating: "4.8",
      projectsCount: "5+",
      hobbies: matchedMember.tags || ["Innovation", "Collaboration", "Execution"]
    }
  } : {
    member: {
      name: "SHAM SK",
      role: "Founder & CEO",
      bgText: "SHAM SK",
      image: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/socialbureau-media/images/Team/bulcmcbtguawhkw9f7oo.webp",
      cardImage: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/socialbureau-media/images/Team/dgox61jo9mebikejqe2i.webp",
      image1: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/TeamPage/Rectangle%2098.png",
      description: "Redefining how brands Attract, Pull & Influence — through data, systems, and relentless execution.",
      tagline: "Founder & CEO · World's First API Marketing Consultant",
      bgColor: "#ff3358",
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com"
      }
    },
    clickup: {
      totalHours: 186,
      worksDone: 47,
      efficiency: 94,
      onTime: 47,
      csat: 66
    },
    user: {
      doj: "2019-01-15",
      emp_id: "000000000",
      location: "Kochi, Kerala",
      department: "Leadership & Strategy",
      followers: "2,671",
      efficiency: "94%",
      onTime: "47%",
      csat: "66%",
      tasksPerMonth: "47",
      hoursPerMonth: "186 HRS",
      tenure: "6YR",
      clientsCount: "18+",
      rating: "4.9",
      projectsCount: "12+"
    }
  };

  useEffect(() => {
    const userObj = data?.user || data?.member?.user || fallbackData?.user;
    const customCover = userObj?.coverImage;
    if (customCover) {
      const img = new Image();
      img.src = customCover;
      img.onload = () => {
        setCoverUrl(customCover);
      };
      img.onerror = () => {
        setCoverUrl('https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/TeamPage/syudjvadmoda2nj1albg.png');
      };
    } else {
      setCoverUrl('https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/TeamPage/syudjvadmoda2nj1albg.png');
    }
  }, [data]);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        if (!data) {
          setLoading(true);
        } else {
          setAttendanceLoading(true);
        }
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const isAlenOrSham = ['alen-jacob', 'alen', 'shamsk', 'sham-sk'].includes((slug || '').toLowerCase());
console.log(isAlenOrSham,slug);
            // 1) Try the authenticated endpoint first (include credentials so cookies are sent).
            // If the user is logged in and cookies are present, backend will return ClickUp metrics.
            try {
              const authResp = await fetch(`${API_URL}/clickup/member-details?slug=${slug}&month=${selectedMonth}&year=${selectedYear}`, {
                credentials: 'include',
                headers: { 'Accept': 'application/json' }
              });
              const authJson = await authResp.json().catch(() => ({}));
              if (authResp.ok && authJson.member) {
                setData(authJson);
                setIsDemoMode(false);
                return;
              }
              // If 401 or other failure, we'll fall back to public endpoint below
            } catch (e) {
              console.warn('Authenticated member-details fetch failed:', e?.message || e);
            }

            // 2) Try the public endpoint (no auth) to get DB member info for visitors
            try {
              const publicResp = await fetch(`${API_URL}/clickup/public-member-details?slug=${slug}&month=${selectedMonth}&year=${selectedYear}`);
              const publicJson = await publicResp.json().catch(() => ({}));
              if (publicResp.ok && publicJson.member) {
                setData(publicJson);
                setIsDemoMode(false);
                return;
              }
            } catch (e) {
              console.warn('Public member-details fetch failed:', e?.message || e);
            }

            // 3) Final fallback to visual mock
            setData(fallbackData);
            setIsDemoMode(true);
      } catch (err) {
        console.error("Error fetching employee details. Loading visual mock mode.", err);
        setData(fallbackData);
        setIsDemoMode(true);
      } finally {
        setLoading(false);
        setAttendanceLoading(false);
      }
    };

    if (slug) {
      fetchMemberDetails();
    } else {
      setData(fallbackData);
      setIsDemoMode(true);
      setLoading(false);
    }
  }, [slug, selectedMonth, selectedYear]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05010B] flex flex-col items-center justify-center gap-4 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] right-[-15%] w-[65vw] h-[65vw] bg-gradient-to-br from-[#4d10a4]/20 to-transparent blur-[160px] rounded-full" />
        </div>
        <Loader2 className="w-10 h-10 text-brand-purple animate-spin relative z-10" />
        <span className="text-sm font-semibold tracking-widest uppercase text-white/50 relative z-10 animate-pulse">
          Retrieving Real-Time Data
        </span>
      </div>
    );
  }

  const member = data?.member || fallbackData.member;
  const clickup = data?.clickup || fallbackData.clickup;
  const rawUser = data?.user || data?.member?.user || fallbackData.user;

  // Format category array to a displayable department string
  const formatDepartment = (categories) => {
    if (!categories || !Array.isArray(categories) || categories.length === 0) return [];
    return categories.map(c => {
      const upper = c.toUpperCase();
      if (upper === 'LEADERSHIP') return 'Leadership & Strategy';
      if (upper === 'TECHNOLOGY') return 'Technology';
      if (upper === 'OPERATIONS') return 'Operations';
      if (upper === 'STRATEGY') return 'Strategy';
      if (upper === 'CREATIVE') return 'Creative';
      if (upper === 'PERFORMANCE') return 'Performance';
      if (upper === 'FINANCE') return 'Finance';
      if (upper === 'CONTENT') return 'Content';
      return c.charAt(0).toUpperCase() + c.slice(1).toLowerCase();
    });
  };

  const getDeduplicatedDepartment = (categories) => {
    const formatted = formatDepartment(categories);
    if (!formatted || formatted.length === 0) return "";
    
    const uniqueWords = [];
    const result = [];
    formatted.forEach(item => {
      if (item === 'Leadership & Strategy') {
        if (!uniqueWords.includes('Leadership') && !uniqueWords.includes('Strategy')) {
          uniqueWords.push('Leadership', 'Strategy');
          result.push('Leadership & Strategy');
        }
      } else {
        if (!uniqueWords.includes(item)) {
          uniqueWords.push(item);
          result.push(item);
        }
      }
    });
    return result.join(' & ');
  };

  const dbDepartment = getDeduplicatedDepartment(member?.category);

  // Animated dot for timeline chart
  const CustomTimelineDot = ({ cx, cy, stroke }) => {
    if (cx == null || cy == null) return null;
    return (
      <g>
        <motion.circle
          cx={cx}
          cy={cy}
          r={8}
          fill="#fff"
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <circle cx={cx} cy={cy} r={14} fill="none" stroke={stroke || 'rgba(255,255,255,0.08)'} strokeWidth={2} />
      </g>
    );
  };

  const user = {
    ...rawUser,
    department: dbDepartment || rawUser?.department || 'Leadership & Strategy'
  };

  const milestones = (user && Array.isArray(user.achievements) && user.achievements.length > 0)
    ? getDynamicMilestones(user.achievements)
    : getMilestones(member?.name || "");

  // Career timeline data (graphical) for Sham SK and Alen Jacob only
  const careerTimelineData = milestones.map((m, idx) => ({
    year: m.year,
    value: idx + 1,
    label: m.title,
    description: m.description,
    icon: m.icon
  }));

  const isAlenOrSham = ['alen-jacob', 'alen', 'shamsk', 'sham-sk'].includes((slug || '').toLowerCase());
  const isSham = ['shamsk', 'sham-sk'].includes((slug || '').toLowerCase());
  const showStaticFallback = isDemoMode;

  const hasInnovations = (user && Array.isArray(user.innovations) && user.innovations.length > 0) || showStaticFallback;
  const hasPodcasts = (user && Array.isArray(user.podcasts) && user.podcasts.length > 0) || showStaticFallback;
  const hasEvents = (user && Array.isArray(user.events) && user.events.length > 0) || showStaticFallback;
  const hasRightColumn = hasPodcasts || hasEvents;
  const hasBottomSection = hasInnovations || hasRightColumn;

  const resumeData = {
    personalInfo: {
      name: member.name || user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      location: user.location || "Kochi, Kerala",
      title: member.role || "Consultant",
      linkedin: user.socials?.linkedin || member.socials?.linkedin || "",
      github: user.socials?.github || member.socials?.github || ""
    },
    summary: member.description || user.description || member.bgText || "",
    skills: Array.isArray(user.tools) ? user.tools.map(t => t.toolName) : [],
    experience: Array.isArray(user.achievements) && user.achievements.length > 0 
      ? user.achievements.map(ach => ({
          company: "SocialBureau",
          jobTitle: ach.title,
          startDate: ach.date || "2026",
          endDate: "PRESENT",
          description: [ach.description || "Achieved milestone goals and strategic company wins."]
        }))
      : [
          {
            company: "SocialBureau",
            jobTitle: member.role || "Team Member",
            startDate: user.doj ? new Date(user.doj).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : "2019",
            endDate: "PRESENT",
            description: [
              `Working as ${member.role || "Founder & CEO"} to drive client growth and operational strategy.`,
              "Collaborating with cross-functional teams to automate workflows and optimize KPIs."
            ]
          }
        ],
    projects: Array.isArray(user.workShowcase) && user.workShowcase.length > 0
      ? user.workShowcase.map(work => ({
          title: work.title,
          description: `${work.category} - ${work.description}`,
          liveLink: work.link,
          technologies: []
        }))
      : [],
    education: Array.isArray(user.education) && user.education.length > 0
      ? user.education.map(edu => {
          let startYear = "";
          let endYear = "";
          if (edu.year) {
            const parts = edu.year.split(/[-–—]/);
            if (parts.length > 1) {
              startYear = parts[0].trim();
              endYear = parts[1].trim();
            } else {
              startYear = edu.year.trim();
            }
          }
          return {
            degree: edu.degree || "",
            institution: edu.institution || "",
            startYear: startYear,
            endYear: endYear,
            location: edu.grade ? `(${edu.grade})` : ""
          };
        })
      : [
          {
            degree: "Bachelor of Technology",
            institution: "CUSAT",
            startYear: "2015",
            endYear: "2019",
            location: "Kochi"
          }
        ],
    certifications: Array.isArray(user.certifications) && user.certifications.length > 0
      ? user.certifications.map(cert => {
          let str = cert.name || "";
          if (cert.issuedBy) {
            str += ` - ${cert.issuedBy}`;
          }
          if (cert.year) {
            str += ` (${cert.year})`;
          }
          return str;
        })
      : (Array.isArray(user.achievements) 
          ? user.achievements.map(ach => `${ach.title} (${ach.date || '2026'})`) 
          : []),
    languages: ["English", "Malayalam"],
    softSkills: Array.isArray(user.hobbies) ? user.hobbies : ["Innovation", "Collaboration", "Execution"]
  };

  const hoursLogged = (clickup && !clickup.error && typeof clickup.totalHours === 'number') ? Number(clickup.totalHours).toFixed(1) : "0.0";
  const tasksCompleted = (clickup && !clickup.error && typeof clickup.worksDone === 'number') ? clickup.worksDone : 0;
  const totalTasks = (clickup && !clickup.error && typeof clickup.totalTasks === 'number') ? clickup.totalTasks : tasksCompleted;

  const activeActivityData = clickup && clickup.activityData ? clickup.activityData : activityData;
  const activeTaskCompletionData = clickup && clickup.taskCompletionData ? clickup.taskCompletionData : taskCompletionData;
  const activeWorkingHoursData = clickup && clickup.workingHoursData ? clickup.workingHoursData : workingHoursData;
  const activeAttendanceData = clickup && clickup.attendanceData ? clickup.attendanceData : generateFallbackAttendance(selectedYear, selectedMonth);
  const activeEfficiencyScoreData = clickup && clickup.efficiencyScoreData ? clickup.efficiencyScoreData : efficiencyScoreData;
  
  const maxScoreVal = Math.max(...activeEfficiencyScoreData.map(d => Math.max(d.efficiency || 0, d.delivery || 0, d.csat || 0)));
  const yTicks = maxScoreVal > 50 ? [0, 20, 40, 60, 80, 100] : [0, 10, 20, 30, 40, 50];
  const yDomain = maxScoreVal > 50 ? [0, 100] : [0, 50];

  const attendancePresent = activeAttendanceData.filter(d => d.status === 'present').length;
  const attendanceHalf = activeAttendanceData.filter(d => d.status === 'half').length;
  const attendanceLeave = activeAttendanceData.filter(d => d.status === 'leave').length;
  const attendanceHoliday = activeAttendanceData.filter(d => d.status === 'holiday').length;
  const attendanceBalance = activeAttendanceData.filter(d => d.status === 'upcoming').length;

  const formatRelativeTime = (dateMs) => {
    if (!dateMs) return 'some time ago';
    const now = Date.now();
    const diff = now - dateMs;
    
    if (diff < 0) return 'just now'; // Future timestamp safety
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (seconds < 60) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) {
      if (hours === 1) return '1 hour ago';
      return `${hours} hours ago`;
    }
    if (days === 1) return 'yesterday';
    if (days < 30) return `${days} days ago`;
    
    const months = Math.floor(days / 30);
    if (months === 1) return '1 month ago';
    return `${months} months ago`;
  };

  // Group tasks by listName to form Live Projects
  let liveProjects = [];
  if (clickup && Array.isArray(clickup.tasks) && clickup.tasks.length > 0) {
    const projectMap = {};
    clickup.tasks.forEach(task => {
      const list = task.listName || 'General Tasks';
      if (!projectMap[list]) {
        projectMap[list] = {
          title: list,
          label: (task.folderName || 'PROJECT').toUpperCase(),
          total: 0,
          closed: 0,
        };
      }
      projectMap[list].total += 1;
      const isClosed = task.statusType === 'closed' || ['closed', 'complete', 'done'].includes(task.status?.toLowerCase());
      if (isClosed) {
        projectMap[list].closed += 1;
      }
    });

    const colors = ['bg-red-500', 'bg-pink-500', 'bg-blue-500', 'bg-purple-600', 'bg-yellow-500', 'bg-cyan-500', 'bg-green-500'];
    liveProjects = Object.values(projectMap).map((proj, idx) => {
      const progress = proj.total > 0 ? Math.round((proj.closed / proj.total) * 100) : 0;
      return {
        title: proj.title,
        label: proj.label,
        progress: progress,
        total: proj.total,
        color: colors[idx % colors.length]
      };
    });
    // Sort by total tasks descending so that most active ones are first
    liveProjects.sort((a, b) => b.total - a.total);
    // Slice top 3 to match design spacing perfectly
    liveProjects = liveProjects.slice(0, 3);
  } else {
    // Fallback to static mockup
    liveProjects = [
      { title: 'Kerala Election 2026', label: 'NEWS MALAYALAM', progress: 78, color: 'bg-red-500' },
      { title: 'API Marketing v2', label: 'SUNTIPS', progress: 62, color: 'bg-pink-500' },
      { title: 'ClickUp Architecture', label: 'WORKFLOW', progress: 85, color: 'bg-blue-500' }
    ];
  }

  // Dynamic Recent Activity
  let recentActivities = [];
  if (clickup && Array.isArray(clickup.tasks) && clickup.tasks.length > 0) {
    // Sort tasks by update/completion time
    const sortedTasks = [...clickup.tasks].sort((a, b) => {
      const timeA = a.closedDateMs || a.updatedDateMs || a.createdDateMs || 0;
      const timeB = b.closedDateMs || b.updatedDateMs || b.createdDateMs || 0;
      return timeB - timeA;
    });

    const activityColors = ['bg-green-500', 'bg-red-500', 'bg-purple-600', 'bg-yellow-500', 'bg-blue-500', 'bg-pink-500'];
    
    recentActivities = sortedTasks.slice(0, 4).map((task, idx) => {
      const isClosed = task.statusType === 'closed' || ['closed', 'complete', 'done'].includes(task.status?.toLowerCase());
      const label = isClosed ? 'Completed' : 'Started';
      const timeMs = task.closedDateMs || task.updatedDateMs || task.createdDateMs;
      const timeStr = formatRelativeTime(timeMs);
      const color = isClosed ? 'bg-green-500' : activityColors[(idx + 1) % activityColors.length];
      
      return {
        label,
        project: `"${task.title}"`,
        time: timeStr,
        color
      };
    });
  } else {
    // Fallback to static mockup
    recentActivities = [
      { label: 'Completed', project: '"Election Dashboard Live"', time: '2 hours ago', color: 'bg-green-500' },
      { label: 'Started', project: '"Suntips Q3 Campaign"', time: 'yesterday', color: 'bg-red-500' },
      { label: 'Started', project: '"Suntips Q3 Campaign"', time: 'yesterday', color: 'bg-purple-600' },
      { label: 'Started', project: '"Suntips Q3 Campaign"', time: 'yesterday', color: 'bg-yellow-500' },
    ];
  }

  const getBadgeStyles = (badgeType) => {
    const type = (badgeType || '').toUpperCase().trim();
    switch (type) {
      case 'MILESTONE':
        return { color: 'bg-red-600', badgeColor: 'bg-red-950/30 text-red-700 border-red-900/30' };
      case 'INNOVATION':
        return { color: 'bg-purple-600', badgeColor: 'bg-purple-950/30 text-purple-700 border-purple-900/30' };
      case 'CLIENT WIN':
      case 'CLIENT_WIN':
        return { color: 'bg-green-600', badgeColor: 'bg-green-950/30 text-green-700 border-green-900/30' };
      case 'PARTNERSHIP':
        return { color: 'bg-yellow-400', badgeColor: 'bg-yellow-950/30 text-yellow-700 border-yellow-900/30' };
      case 'ACHIEVEMENT':
        return { color: 'bg-cyan-500', badgeColor: 'bg-cyan-950/30 text-cyan-700 border-cyan-900/30' };
      case 'LAUNCH':
        return { color: 'bg-pink-600', badgeColor: 'bg-pink-950/30 text-pink-700 border-pink-900/30' };
      default:
        return { color: 'bg-cyan-500', badgeColor: 'bg-cyan-950/30 text-cyan-700 border-cyan-900/30' };
    }
  };

  const formatTimelineDate = (dateVal) => {
    if (!dateVal) return '';
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal).toUpperCase();
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
  };

  const ensureAbsoluteUrl = (url) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (trimmed === "") return "";
    if (/^(f|ht)tps?:\/\//i.test(trimmed)) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  const fallbackSocials = matchedMember?.socials || {
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com"
  };

  const socials = {
    linkedin: member?.socials?.linkedin || fallbackSocials.linkedin || "",
    instagram: member?.socials?.instagram || fallbackSocials.instagram || "",
    twitter: member?.socials?.twitter || fallbackSocials.twitter || ""
  };

  const linkedinUrl = ensureAbsoluteUrl(socials.linkedin);
  const instagramUrl = ensureAbsoluteUrl(socials.instagram);
  const twitterUrl = ensureAbsoluteUrl(socials.twitter);

  return (
    <div className="min-h-screen selection:bg-brand-purple/30 text-white relative overflow-hidden font-sans">
      
      {/* Background Decor Layer - Perfectly matches the linear gradient and grid colors */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #441649 0%, #160F2C 45%, #2A1440 75%, #20133C 100%)'
        }}
      >
        {/* Mobile-only static background image layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12] md:hidden"
          style={{
            backgroundImage: 'url("https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/TeamPage/image%20(40)%20(1).png")'
          }}
        />
        {/* Subtle grid line effect */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
        />
      </div>

      {/* Preview Notice */}
      {isDemoMode && (
        <div className="bg-[#CB1387]/10 border-b border-[#CB1387]/20 text-center py-2 relative z-50 text-xs font-semibold text-[#CB1387] tracking-wider uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-4.5 h-4.5 animate-spin" /> Interactive Preview Mode: Sham SK Profile Design
        </div>
      )}

      {/* --- HERO SECTION WITH HEADER INTEGRATED --- */}
      <section className="relative w-full lg:h-screen lg:min-h-[750px] overflow-hidden flex flex-col justify-between bg-transparent pb-6 pt-6 md:pb-12 md:pt-8">
        {/* Background Image Layer - Static backdrop for Mobile, dynamic coverUrl for Desktop */}
        <div 
          className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-center opacity-40 mix-blend-lighten pointer-events-none md:hidden"
          style={{ backgroundImage: 'url("https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/TeamPage/image%20(40)%20(1).png")' }}
        />
        <div 
          className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-center opacity-40 mix-blend-lighten pointer-events-none hidden md:block"
          style={{ backgroundImage: `url(${coverUrl})` }}
        />
        


        {/* Centered Content Wrapper - Perfectly scaled to fill spaces dynamically */}
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 relative z-10 flex flex-col justify-between grow mt-2 pb-4">
          
          <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-20 pt-4 md:pt-14 grow justify-center">
            {/* Perfectly Proportioned Profile Card */}
            <motion.div 
              initial={{ scale: 0.85, opacity: 0, rotate: -3 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                rotate: 0,
                y: [0, -12, 0]
              }}
              transition={{
                scale: { type: "spring", stiffness: 50, damping: 12 },
                opacity: { duration: 0.6 },
                rotate: { type: "spring", stiffness: 50, damping: 12 },
                y: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="relative group shrink-0"
            >
              <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-[40px] overflow-hidden relative border border-white/10 shadow-2xl bg-black">
                {/* Internal Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 select-none z-0">
                  <span className="text-8xl font-black text-white leading-none rotate-90 scale-150 uppercase">{member.name}</span>
                </div>
                <img 
                  src={member.idCard || member.user?.idCard || member.cardImage || member.image || "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/socialbureau-media/images/Team/cfg8edyz3kmmxjhqt98y.webp"} 
                  alt={member.name} 
                  className="w-full h-full object-cover relative z-10 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20" />
              </div>
              {/* Glow */}
              <div className="absolute -inset-4 bg-brand-purple/20 blur-3xl -z-10 animate-pulse" />
            </motion.div>

            {/* Intro Text - Balanced Sizing to fill space */}
            <div className="flex-1 text-center md:text-left relative">
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                <span className="bg-[#112240]/60 text-blue-400 border border-blue-500/20 px-5 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED PRO
                </span>
                <span className="bg-[#102C1A]/48 text-green-400 border border-green-500/20 px-5 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Active Now
                </span>
              </div>
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl xs:text-5xl md:text-7xl lg:text-[5.5rem] font-black mb-2 md:mb-4 tracking-tighter text-white font-display uppercase leading-[0.9]"
              >
                {member.name}
              </motion.h1>
              <p className="text-gray-400 font-bold mb-2 md:mb-4 text-lg md:text-2xl uppercase tracking-[0.1em]">
                {member.tagline || `${member.role} · API Marketing Consultant`}
              </p>
              <p className="text-gray-500 text-sm md:text-base italic max-w-xl leading-relaxed mb-5 md:mb-6 opacity-70">
                "{member.description}"
              </p>
              
              {(linkedinUrl || instagramUrl || twitterUrl) && (
                <div className="flex justify-center md:justify-start gap-4 mb-8 mt-2">
                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:bg-[#0077b5]/20 hover:border-[#0077b5]/50 text-gray-400 hover:text-[#0077b5] transition-all"
                      title="LinkedIn"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  )}
                  {instagramUrl && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:bg-[#e1306c]/20 hover:border-[#e1306c]/50 text-gray-400 hover:text-[#e1306c] transition-all"
                      title="Instagram"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                  )}
                  {twitterUrl && (
                    <a
                      href={twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:bg-[#1da1f2]/20 hover:border-[#1da1f2]/50 text-gray-400 hover:text-[#1da1f2] transition-all"
                      title="Twitter / X"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </a>
                  )}
                </div>
              )}
              
              <div className="flex flex-wrap justify-center md:justify-start gap-x-3 gap-y-4 md:gap-3">
                <a 
                  href={`mailto:${user.email || member.email || member.user?.email || "team@socialbureau.in"}`}
                  className="bg-[#E11D48] hover:bg-[#BE123C] text-white px-8 py-3.5 rounded-[12px] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-lg shadow-red-500/25 no-underline"
                >
                  <Mail className="w-4 h-4" /> MESSAGE
                </a>
                <button 
                  onClick={() => setShowBookSessionModal(true)}
                  className="bg-[#0B0118]/80 hover:bg-[#1A0B2E] text-purple-400 border border-purple-500/20 px-8 py-3.5 rounded-[12px] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> BOOK SESSION
                </button>
                {!isAlenOrSham && (
                  <button 
                    onClick={() => setShowResumeModal(true)}
                    className="bg-white/5 hover:bg-white/10 text-gray-400 border border-white/10 px-8 py-3.5 rounded-[12px] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2"
                  >
                    PDF <FileText className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats Ribbon - Anchored dynamically with mt-auto and extra bottom margin */}
          {!isAlenOrSham && (
            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-auto mb-4 md:mb-8 bg-[#1A0B2E]/60 backdrop-blur-xl border border-white/10 rounded-[32px] grid grid-cols-2 gap-y-2 py-2 md:py-0 sm:grid-cols-3 lg:flex lg:flex-wrap overflow-hidden relative z-10 w-full"
            >
              <StatItem label="Projects" value={user.projectsCount || "12+"} color="text-red-500" />
              <StatItem label="Tasks/Mo" value={typeof tasksCompleted === 'number' ? tasksCompleted : (fallbackData.clickup.worksDone || "0")} color="text-purple-500" />
              <StatItem label="Hours/Mo" value={hoursLogged ? `${hoursLogged}H` : "0.0H"} color="text-blue-500" />
              <StatItem label="Efficiency" value={clickup && typeof clickup.efficiency === 'number' ? `${clickup.efficiency}%` : (user.efficiency || "94%")} color="text-green-500" />
              <StatItem label="Tenure" value={user.doj ? `${Math.max(1, new Date().getFullYear() - new Date(user.doj).getFullYear())}YR` : (user.tenure || "1YR")} color="text-yellow-500" />
              <StatItem label="Clients" value={user.clients?.length ? `${user.clients.length}+` : (user.clientsCount || "0+")} color="text-pink-500" />
              <StatItem label="Rating" value={user.rating ? `${user.rating}★` : "5.0★"} color="text-orange-500" />
            </motion.div>
          )}

        </div>
      </section>

      {/* New sections for Sham SK & Alen Jacob */}
      {isAlenOrSham && (
        <>
          <QuoteBanner slug={slug} />
          {['shamsk', 'sham-sk'].includes((slug || '').toLowerCase()) ? (
            <ShamFoundersFramework />
          ) : (
            <AlenExecutiveFocus />
          )}
          <BorderlessInfluenceNetwork />
        </>
      )}

      {/* Career Timeline - enhanced, only for Sham SK and Alen Jacob */}
      {isAlenOrSham && careerTimelineData && careerTimelineData.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 mt-6 md:mt-10 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className={isSham ? "md:col-span-6" : "md:col-span-7"}>
  <GlassCard className={cn("p-6 md:p-8 overflow-hidden", !isSham && "h-full")}>

    <SectionTitle
      title="Career Timeline"
      subtitle="Professional Journey"
      barColor="bg-pink-500"
    />

    {/* Timeline */}

    <div className="relative mt-12 overflow-x-auto pb-4 timeline-scrollbar select-none">
      <style>{`
        .timeline-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: ${member.bgColor || '#ec4899'} rgba(255, 255, 255, 0.05);
        }
        .timeline-scrollbar::-webkit-scrollbar {
          height: 6px !important;
          display: block !important;
        }
        .timeline-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05) !important;
          border-radius: 6px !important;
        }
        .timeline-scrollbar::-webkit-scrollbar-thumb {
          background: ${member.bgColor || '#ec4899'} !important;
          border-radius: 6px !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        .timeline-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${member.bgColor || '#ec4899'}d8 !important;
        }
      `}</style>
      <div 
        className="relative min-w-[var(--slider-min-w)] md:min-w-0 min-h-[90px]"
        style={{
          '--slider-min-w': `${milestones.length * 80}px`
        }}
      >
        {/* Background Line */}
        <div className="absolute top-5 left-0 right-0 h-[3px] bg-white/10 rounded-full" />

        {/* Animated Progress */}
        <motion.div
          className="absolute top-5 left-0 h-[3px] rounded-full"
          style={{
            background: member.bgColor || "#ec4899"
          }}
          animate={{
            width: `${(activeMilestone / (milestones.length - 1)) * 100}%`
          }}
          transition={{
            duration: 0.4
          }}
        />

        <div className="relative flex justify-between">

          {milestones.map((item, index) => {
            const Icon = item.icon;
            const active = activeMilestone === index;

            return (
              <button
                key={index}
                onMouseEnter={() => setActiveMilestone(index)}
                onClick={() => setActiveMilestone(index)}
                className="flex flex-col items-center group"
              >

                <motion.div
                  animate={{
                    scale: active ? 1.2 : 1
                  }}
                  transition={{
                    duration: 0.3
                  }}
                  className="relative z-10"
                >
                  <div
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                    style={{
                      borderColor: member.bgColor,
                      background: active
                        ? member.bgColor
                        : "rgba(255,255,255,0.06)",

                      boxShadow: active
                        ? `0 0 20px ${member.bgColor}`
                        : "none"
                    }}
                  >
                    <Icon
                      size={18}
                      className={
                        active
                          ? "text-white"
                          : "text-gray-300"
                      }
                    />
                  </div>
                </motion.div>

                <span
                  className={`mt-4 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    active
                      ? "text-white"
                      : "text-gray-400"
                  }`}
                >
                  {item.year}
                </span>

              </button>
            );
          })}
        </div>
      </div>
    </div>

    {/* Detail Card */}

    <div className="mt-12">

      <AnimatePresence mode="wait">

        <motion.div
          key={activeMilestone}
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -20
          }}
          transition={{
            duration: 0.3
          }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
        >
          <div className="flex items-start gap-4">

            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: `${member.bgColor}20`
              }}
            >
              {React.createElement(
                milestones[activeMilestone].icon,
                {
                  size: 26,
                  style: {
                    color: member.bgColor
                  }
                }
              )}
            </div>

            <div>
              <div className="flex items-center gap-3 flex-wrap">

                <span
                  className="text-xs uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{
                    background: `${member.bgColor}20`,
                    color: member.bgColor
                  }}
                >
                  {milestones[activeMilestone].year}
                </span>

                <h3 className="text-xl font-bold text-white">
                  {milestones[activeMilestone].title}
                </h3>

              </div>

              <p className="text-gray-400 mt-3 leading-relaxed">
                {milestones[activeMilestone].description}
              </p>

            </div>

          </div>
        </motion.div>

      </AnimatePresence>

    </div>

    {/* Stats */}

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <TrendingUp
          size={22}
          style={{ color: member.bgColor }}
        />
        <h4 className="text-2xl font-bold mt-3 text-white">
          300%
        </h4>
        <p className="text-gray-400 text-sm">
          Growth Delivered
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <Users
          size={22}
          style={{ color: member.bgColor }}
        />
        <h4 className="text-2xl font-bold mt-3 text-white">
          120+
        </h4>
        <p className="text-gray-400 text-sm">
          Brands Managed
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <Briefcase
          size={22}
          style={{ color: member.bgColor }}
        />
        <h4 className="text-2xl font-bold mt-3 text-white">
          500+
        </h4>
        <p className="text-gray-400 text-sm">
          Campaigns Delivered
        </p>
      </div>

    </div>

  </GlassCard>
</div>

            <div className={cn(
              isSham ? "md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start" : "md:col-span-5 flex flex-col gap-4"
            )}>
              {careerTimelineData.map((item, idx) => (
                <GlassCard key={idx} className="p-3 flex items-start gap-3">
                  <div className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `${member.bgColor || '#A855F7'}22`, border: '1px solid rgba(255,255,255,0.04)' }}>
                    {item.icon ? React.createElement(item.icon, { className: "w-5 h-5 text-white/90" }) : <Star className="w-5 h-5 text-white/90" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-black">{item.label}</div>
                      <div className="text-xs text-gray-400 font-bold">{item.year}</div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- DASHBOARD CONTENT WITH STAGGERED REVEALS --- */}
      <motion.main 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
        className="max-w-[1440px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mt-8 md:mt-12 relative z-10"
      >
        
        {/* LEFT COLUMN: Performance visuals */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 80, scale: 0.98 },
            show: { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { type: "spring", stiffness: 45, damping: 12 }
            }
          }}
          className="lg:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
        >
          {!isAlenOrSham && (
            <>
              <div className="md:col-span-12">
            <GlassCard variant="purple" className="p-4 md:p-8 h-full">
              <SectionTitle title="Performance Overview" barColor="bg-yellow-500" />
              <div className="grid grid-cols-2 gap-4 mb-6 md:mb-10">
                {[
                  { label: 'EFFICIENCY', val: clickup && typeof clickup.efficiency === 'number' ? `${clickup.efficiency}%` : (user.efficiency || '94%'), color: 'border-white/5 text-accent-red bg-white/2' },
                  { label: 'ON-TIME', val: clickup && typeof clickup.onTime === 'number' ? `${clickup.onTime}%` : (user.onTime || '91%'), color: 'border-white/5 text-accent-green bg-white/2' },
                  { label: 'CSAT', val: clickup && typeof clickup.csat === 'number' ? `${clickup.csat}%` : (user.csat || '98%'), color: 'border-white/5 text-brand-purple bg-white/2' },
                  { label: 'TASKS/MO', val: typeof tasksCompleted === 'number' ? tasksCompleted : (fallbackData.clickup.worksDone || '47'), color: 'border-white/5 text-brand-blue bg-white/2' }
                ].map((item) => (
                  <div key={item.label} className={cn("p-4 rounded-2xl border transition-all hover:bg-white/5", item.color)}>
                    <div className="text-[14px] font-bold mb-1 tracking-tighter">{item.val}</div>
                    <div className="text-[9px] font-semibold tracking-widest opacity-60 uppercase">{item.label}</div>
                  </div>
                ))}
              </div>

              <SectionTitle title="This Week Activity" barColor="bg-yellow-500" />
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activeActivityData} margin={{ left: -30 }}>
                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 10, fill: '#4B5563', fontWeight: '700'}} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 10, fill: '#4B5563', fontWeight: '700'}}
                      ticks={[0, 4, 8, 12]}
                    />
                    <Tooltip content={<CustomTooltip color="#F43F5E" />} cursor={{ stroke: 'rgba(255, 255, 255, 0.1)', strokeWidth: 1 }} />
                    <Line type="monotone" dataKey="value" stroke="#F43F5E" strokeWidth={3} dot={{ r: 4, fill: '#F43F5E', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>

          <div className="md:col-span-6">
            <GlassCard variant="purple">
              <div className="mb-6">
                <SectionTitle title="Total Tasks" barColor="bg-accent-red" />
                <div className="text-3xl font-black text-accent-red tracking-tighter -mt-4">{totalTasks} TASKS</div>
              </div>
              <div className="h-48 mt-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activeTaskCompletionData} margin={{ left: -30 }}>
                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <Tooltip content={<CustomTooltip color="#F43F5E" />} cursor={{ fill: 'rgba(255, 255, 255, 0.03)', radius: [6, 6, 0, 0] }} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 10, fill: '#4B5563', fontWeight: '700'}} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 10, fill: '#4B5563', fontWeight: '700'}}
                      ticks={[0, 40, 80, 120, 160, 200]}
                    />
                    <Bar dataKey="value" fill="rgba(244, 63, 94, 0.1)" radius={[6, 6, 0, 0]} stroke="#F43F5E" strokeWidth={1} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>

          <div className="md:col-span-6">
            <GlassCard variant="purple">
              <div className="mb-6">
                <SectionTitle title="Working Hours" barColor="bg-brand-purple" />
                <div className="text-3xl font-black text-brand-purple tracking-tighter -mt-4">{hoursLogged || "186"} HRS</div>
              </div>
              <div className="h-48 mt-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activeWorkingHoursData} margin={{ left: -20 }}>
                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <Tooltip content={<CustomTooltip color="#A855F7" />} cursor={{ fill: 'rgba(255, 255, 255, 0.03)', radius: [6, 6, 0, 0] }} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 10, fill: '#4B5563', fontWeight: '700'}} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 10, fill: '#4B5563', fontWeight: '700'}}
                      ticks={[0, 40, 80, 120, 160, 200]}
                    />
                    <Bar dataKey="value" fill="rgba(168, 85, 247, 0.1)" radius={[6, 6, 0, 0]} stroke="#A855F7" strokeWidth={1} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>

          <div className="md:col-span-12">
            <div className="bg-card-dark border border-white/5 rounded-[32px] p-4 md:p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-orange-600 rounded-full" />
                  <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">EFFICIENCY & DELIVERY SCORE</h2>
                </div>
                <div className="bg-green-500/10 text-green-500 text-[9px] px-4 py-1.5 rounded-full border border-green-500/20 font-bold uppercase tracking-widest flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> LIVE
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activeEfficiencyScoreData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 11, fill: '#4B5563', fontWeight: '700'}} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 11, fill: '#4B5563', fontWeight: '700'}}
                      domain={yDomain}
                      ticks={yTicks}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0B0515', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}
                    />
                    <Line type="monotone" dataKey="efficiency" stroke="#F43F5E" strokeWidth={3} dot={{ r: 4, fill: '#F43F5E', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="delivery" stroke="#A855F7" strokeWidth={3} dot={{ r: 4, fill: '#A855F7', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="csat" stroke="#22C55E" strokeWidth={3} dot={{ r: 4, fill: '#22C55E', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="md:col-span-12">
            <GlassCard variant="purple" className="!overflow-visible relative">
              
              {/* Beautiful Month & Year Navigator Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 rounded-full bg-brand-purple" />
                  <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400">
                    Attendance
                  </h2>
                </div>
                
                {/* Beautiful Glassmorphic Month & Year Selector */}
                <div className="flex items-center justify-between w-full max-w-[280px] bg-[#0E061E]/40 border border-white/[0.06] rounded-[20px] px-5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-md self-start md:self-auto transition-all hover:border-white/10">
                  <button 
                    onClick={handlePrevMonth}
                    className="p-1 rounded-lg text-gray-400 hover:text-white transition-colors hover:bg-white/5 active:scale-90"
                    title="Previous Month"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#C084FC] text-center select-none">
                    {new Date(selectedYear, selectedMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  
                  <button 
                    onClick={handleNextMonth}
                    disabled={selectedYear >= new Date().getFullYear() && selectedMonth >= new Date().getMonth()}
                    className="p-1 rounded-lg text-gray-400 hover:text-white transition-colors hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent active:scale-90"
                    title="Next Month"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Attendance heatmap relative container with Loader overlay */}
              <div className="relative">
                {attendanceLoading && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-20 rounded-2xl flex items-center justify-center border border-white/5">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="w-8 h-8 text-brand-purple animate-spin" />
                      <span className="text-[10px] font-bold tracking-widest text-purple-300 uppercase animate-pulse">Syncing Time Log</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-7 md:grid-cols-10 gap-3">
                   {activeAttendanceData.map((d) => {
                      const label = d.date ? `${d.date} (${d.day})` : `Day ${d.id + 1}`;
                      const statusText = d.status.replace('-', ' ').toUpperCase();
                      
                      return (
                        <div 
                          key={d.id}
                          className="relative group aspect-square"
                        >
                          <div 
                            className={cn(
                             "w-full h-full rounded-xl shadow-xl transition-all duration-300 hover:scale-110 cursor-help",
                             d.status === 'present' ? 'bg-gradient-to-br from-green-600 to-green-800 border border-green-400/20' :
                             d.status === 'leave' ? 'bg-gradient-to-br from-red-500 to-red-700 border border-red-400/20' :
                             d.status === 'half' ? 'bg-gradient-to-br from-orange-600 to-orange-800 border border-orange-400/20' :
                             d.status === 'holiday' ? 'bg-gradient-to-br from-purple-600 to-purple-800 border border-purple-400/20 shadow-[0_0_10px_rgba(168,85,247,0.45)]' :
                             d.status === 'upcoming' ? 'bg-gradient-to-br from-[#0099c2]/20 to-[#0099c2]/5 border border-[#0099c2] shadow-[0_0_10px_rgba(0,153,194,0.3)]' :
                             'bg-[#112240] border border-white/5 opacity-70'
                            )}
                          />
                          {/* Custom Premium Glassmorphic Tooltip */}
                          <div className="absolute bottom-[125%] left-1/2 -translate-x-1/2 w-48 p-3 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl opacity-0 scale-95 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 z-30 flex flex-col gap-1 items-center text-center"
                               style={{
                                 background: 'linear-gradient(135deg, rgba(20, 10, 35, 0.95) 0%, rgba(10, 5, 20, 0.98) 100%)',
                                 boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)'
                               }}>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{label}</span>
                            {d.holidayName && (
                              <span className="text-[10px] text-purple-300 font-extrabold uppercase tracking-wide my-0.5">
                                {d.holidayName}
                              </span>
                            )}
                            <span className={cn(
                              "text-[10px] font-black tracking-[0.1em] px-2 py-0.5 rounded-full uppercase border",
                              d.status === 'present' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                              d.status === 'leave' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                              d.status === 'half' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                              d.status === 'holiday' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                              d.status === 'upcoming' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' :
                              'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                            )}>
                              {statusText}
                            </span>
                            {/* Triangle Arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#0a0514]" />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-5 mt-10 mb-10">
                {[
                  {l:'Leave', c:'bg-gradient-to-br from-red-500 to-red-700'}, 
                  {l:'Present', c:'bg-gradient-to-br from-green-600 to-green-800'}, 
                  {l:'Half Day', c:'bg-gradient-to-br from-orange-600 to-orange-800'}, 
                  {l:'Public Holiday', c:'bg-gradient-to-br from-purple-600 to-purple-800 border border-purple-400/20 shadow-[0_0_10px_rgba(168,85,247,0.3)]'},
                  {l:'Weekend', c:'bg-[#112240]'},
                  {l:'Upcoming', c:'bg-gradient-to-br from-[#0099c2]/20 to-[#0099c2]/5 border border-[#0099c2] shadow-[0_0_10px_rgba(0,153,194,0.3)]'}
                ].map(i => (
                  <div key={i.l} className="flex items-center gap-2">
                    <div className={cn("w-3.5 h-3.5 rounded-[4px] shadow-sm", i.c)} />
                    <span className="text-[10px] text-gray-500 font-bold tracking-wider uppercase">{i.l}</span>
                  </div>
                ))}
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  {l:'PRESENT', v: attendancePresent.toString(), c:'text-green-500'}, 
                  {l:'HALF DAY', v: attendanceHalf.toString(), c:'text-orange-500'}, 
                  {l:'LEAVE', v: attendanceLeave.toString(), c:'text-red-500'}, 
                  {l:'HOLIDAY', v: attendanceHoliday.toString(), c:'text-purple-500'},
                  {l:'BALANCE', v: attendanceBalance.toString(), c:'text-cyan-500'}
                ].map(i => (
                  <div key={i.l} className="bg-white/2 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-0.5 hover:bg-white/5 transition-colors">
                    <span className={cn("text-lg font-black leading-none", i.c)}>{i.v}</span>
                    <span className="text-[9px] text-gray-500 font-bold tracking-[0.2em] uppercase">{i.l}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <CircularProgress value={clickup && typeof clickup.efficiency === 'number' ? clickup.efficiency : (Number(user.efficiency?.replace('%', '')) || 94)} label="TASK EFFICIENCY" subLabel="Out of 100%" color="#EF4444" />
            <CircularProgress value={clickup && typeof clickup.onTime === 'number' ? clickup.onTime : (Number(user.onTime?.replace('%', '')) || 91)} label="ON-TIME DELIVERY" subLabel="Delivery Score" color="#22C55E" />
            <CircularProgress value={clickup && typeof clickup.csat === 'number' ? clickup.csat : (Number(user.csat?.replace('%', '')) || 98)} label="CLIENT SATISFACTION" subLabel="CSAT Score" color="#A855F7" />
          </div>

          <div className="md:col-span-12">
            <div className="bg-card-dark border border-white/5 rounded-[32px] p-4 md:p-10 overflow-visible">
               <div className="flex items-center gap-2 mb-6 md:mb-10">
                  <div className="w-1 h-4 bg-brand-blue rounded-full" />
                  <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">ACTIVE TIME HEATMAP</h2>
               </div>
               <div className="space-y-3 pb-6 md:pb-10 border-b border-white/5 mb-6 md:mb-8">
               {(() => {
                  // 10 slots × 54 min starting at 9:30 AM IST
                  const slotLabels = Array.from({ length: 10 }, (_, i) => {
                    const startMin = 9 * 60 + 30 + i * 54;
                    const endMin   = startMin + 54;
                    const fmt = (m) => {
                      const h = Math.floor(m / 60), min = m % 60;
                      const ampm = h < 12 ? 'AM' : 'PM';
                      return `${h % 12 === 0 ? 12 : h % 12}:${String(min).padStart(2,'0')} ${ampm}`;
                    };
                    return `${fmt(startMin)} – ${fmt(endMin)}`;
                  });
                  const levelLabel = l => l === 0 ? 'LOW' : l === 1 ? 'MED' : 'PEAK';
                  const levelColor = l => l === 0
                    ? 'text-gray-400 border-gray-500/30 bg-gray-500/10'
                    : l === 1
                    ? 'text-[#0f9ebb] border-[#0f9ebb]/40 bg-[#0f9ebb]/10'
                    : 'text-[#0099c2] border-[#0099c2]/40 bg-[#0099c2]/10';

                  return ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => {
                    const dayData = clickup && clickup.heatmapData && clickup.heatmapData[day]
                      ? clickup.heatmapData[day]
                      : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2];
                    return (
                      <div key={day} className="flex items-center gap-2 md:gap-6">
                        <span className="text-[11px] text-gray-600 w-8 md:w-10 font-bold uppercase tracking-widest">{day}</span>
                        <div className="flex gap-1 md:gap-2 flex-1">
                          {dayData.map((level, i) => (
                            <div key={i} className="relative group flex-1 h-9">
                              <div
                                className={cn(
                                  "w-full h-full rounded-lg transition-all duration-300 hover:brightness-125 cursor-pointer",
                                  level === 0 ? 'bg-[#0B1528] border border-[#142C44]' :
                                  level === 1 ? 'bg-[#0f5a73]' :
                                  'bg-[#0099c2]'
                                )}
                              />
                              {/* Hover Tooltip */}
                              <div
                                className="absolute bottom-[130%] left-1/2 -translate-x-1/2 w-40 p-2.5 rounded-xl border border-white/10 shadow-2xl backdrop-blur-xl opacity-0 scale-95 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 z-50 flex flex-col gap-1 items-center text-center"
                                style={{
                                  background: 'linear-gradient(135deg, rgba(20,10,35,0.97) 0%, rgba(10,5,20,0.99) 100%)',
                                  boxShadow: '0 8px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)'
                                }}
                              >
                                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{day}</span>
                                <span className="text-[10px] text-white font-bold">{slotLabels[i]}</span>
                                <span className={cn("text-[9px] font-black tracking-widest px-2 py-0.5 rounded-full border uppercase", levelColor(level))}>
                                  {levelLabel(level)}
                                </span>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-[#0a0514]" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  });
               })()}
               
               </div>
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] font-bold uppercase tracking-widest">
                  <span className="text-gray-500 whitespace-nowrap">MON - SAT  |  9:30AM - 6:30PM IST</span>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-3.5 h-3.5 bg-[#0B1528] border border-[#142C44] rounded-[4px]" />
                      <span className="text-gray-600">LOW</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3.5 h-3.5 bg-[#0f5a73] rounded-[4px]" />
                      <span className="text-gray-600">MED</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3.5 h-3.5 bg-[#0099c2] rounded-[4px]" />
                      <span className="text-gray-600">PEAK</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
            </>
          )}

          {((user && Array.isArray(user.tools) && user.tools.length > 0) || showStaticFallback) && (
            <div className="md:col-span-12">
               <GlassCard variant="purple">
                  <SectionTitle title="Core Expertise" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {((user && Array.isArray(user.tools) && user.tools.length > 0)
                       ? user.tools.map((tool, idx) => {
                           const colors = ['#F43F5E', '#A855F7', '#06B6D4', '#F59E0B', '#3B82F6', '#EAB308', '#EC4899'];
                           return {
                             name: tool.toolName,
                             progress: typeof tool.level === 'number' ? tool.level : (85 + (idx * 3) % 11),
                             color: colors[idx % colors.length]
                           };
                         })
                       : expertiseData
                     ).map((exp) => (
                       <div key={exp.name} className="space-y-3 group">
                         <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold text-gray-300 uppercase tracking-[0.15em] group-hover:text-white transition-colors">{exp.name}</span>
                         </div>
                         <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden shadow-inner p-[1px]">
                            <motion.div 
                              initial={{ width: 0 }} 
                              whileInView={{ width: `${exp.progress}%` }} 
                              transition={{ duration: 1.2, ease: "easeOut" }}
                              className="h-full rounded-full shadow-lg" 
                              style={{ backgroundColor: exp.color }}
                            />
                         </div>
                       </div>
                     ))}
                  </div>
               </GlassCard>
            </div>
          )}

          {/* Education Section */}
          {user.education && user.education.length > 0 && (
            <div className="md:col-span-12">
              <GlassCard variant="purple" className="!p-0 bg-[#0B0118] border-white/5">
                <div className="p-8 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-[3px] h-4 bg-brand-pink" />
                    <h2 className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-500">EDUCATION</h2>
                  </div>
                </div>
                <div className="divide-y divide-white/5">
                  {user.education.map((edu, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="p-4 md:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 group hover:bg-white/[0.02] transition-colors text-center sm:text-left"
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5 text-brand-pink" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white tracking-tight mb-0.5">{edu.degree}</h4>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{edu.institution}</p>
                        {(edu.year || edu.grade) && (
                          <div className="flex items-center gap-3 mt-1.5">
                            {edu.year && <span className="text-[9px] text-gray-600 font-bold tracking-widest uppercase">{edu.year}</span>}
                            {edu.grade && <span className="text-[9px] text-brand-pink/70 font-bold tracking-widest uppercase bg-brand-pink/10 px-2 py-0.5 rounded-full">{edu.grade}</span>}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {/* Certifications Section */}
          {user.certifications && user.certifications.length > 0 && (
            <div className="md:col-span-12">
              <GlassCard variant="purple" className="!p-0 bg-[#0B0118] border-white/5">
                <div className="p-8 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-[3px] h-4 bg-brand-pink" />
                    <h2 className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-500">CERTIFICATIONS</h2>
                  </div>
                </div>
                <div className="divide-y divide-white/5">
                  {user.certifications.map((cert, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="p-4 md:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 group hover:bg-white/[0.02] transition-colors text-center sm:text-left"
                    >
                      <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white tracking-tight mb-0.5">{cert.name}</h4>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{cert.issuedBy}</p>
                        {(cert.year || cert.credentialUrl) && (
                          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                            {cert.year && <span className="text-[9px] text-gray-600 font-bold tracking-widest uppercase">{cert.year}</span>}
                            {cert.credentialUrl && (
                              <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-[9px] text-brand-pink font-bold tracking-widest uppercase hover:underline flex items-center gap-1">
                                View Credential →
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {((user && Array.isArray(user.achievements) && user.achievements.length > 0) || (showStaticFallback && !isAlenOrSham)) && (
            <div className="md:col-span-12">
               <GlassCard variant="purple" className="!p-0 bg-[#0B0118] border-white/5">
                  <div className="p-8 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-[3px] h-4 bg-brand-pink" />
                      <h2 className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-500">CAREER TIMELINE</h2>
                    </div>
                  </div>
                     <div className="divide-y divide-white/5">
                     {((user && Array.isArray(user.achievements) && user.achievements.length > 0)
                       ? user.achievements.map((ach) => {
                           const styles = getBadgeStyles(ach.image);
                           return {
                             title: ach.title,
                             desc: ach.description,
                             date: ach.date || formatTimelineDate(ach.createdAt),
                             badge: (ach.image || 'ACHIEVEMENT').toUpperCase(),
                             color: styles.color,
                             badgeColor: styles.badgeColor
                           };
                         })
                       : [
                           { title: 'Founded Social Bureau', desc: "Kerala's first API Marketing agency", date: 'JAN 2019', badge: 'MILESTONE', color: 'bg-red-600', badgeColor: 'bg-red-950/30 text-red-700 border-red-900/30' },
                           { title: 'Coined API Marketing', desc: "Attract - Pull - Influence framework launch", date: 'MAR 2020', badge: 'INNOVATION', color: 'bg-purple-600', badgeColor: 'bg-purple-950/30 text-purple-700 border-purple-900/30' },
                           { title: 'First News Channel Client', desc: "NwsTamil24x7 digital growth strategy", date: 'AUG 2021', badge: 'CLIENT WIN', color: 'bg-green-600', badgeColor: 'bg-green-950/30 text-green-700 border-green-900/30' },
                           { title: 'ClickUp India Partner', desc: "Official ClickUp reselling partnership", date: 'FEB 2022', badge: 'PARTNERSHIP', color: 'bg-yellow-400', badgeColor: 'bg-yellow-950/30 text-yellow-700 border-yellow-900/30' },
                           { title: '13-Organic Sales - Suntips', desc: "Zero ad spend campaign milestone", date: 'OCT 2024', badge: 'ACHIEVEMENT', color: 'bg-cyan-500', badgeColor: 'bg-cyan-950/30 text-cyan-700 border-cyan-900/30' },
                           { title: 'Kerala Election 2026 Dashboard', desc: "Broadcast - quality live results platform", date: 'JAN 2026', badge: 'LAUNCH', color: 'bg-pink-600', badgeColor: 'bg-pink-950/30 text-pink-700 border-pink-900/30' },
                         ]
                     ).map((item, i) => (
                       <motion.div 
                         key={i} 
                         initial={{ opacity: 0, x: -10 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         transition={{ delay: i * 0.1 }}
                         className="relative p-4 md:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 group hover:bg-white/[0.02] transition-colors text-center sm:text-left"
                       >
                         {/* Circle Indicator */}
                         <div className="relative flex items-center justify-center shrink-0 self-center sm:self-auto">
                           <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center">
                              <div className={cn("w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]", item.color)} />
                           </div>
                         </div>
    
                         {/* Content */}
                         <div className="flex-1">
                            <h4 className="text-sm font-bold text-white mb-0.5 tracking-tight group-hover:text-white transition-colors">{item.title}</h4>
                            <p className="text-[10px] text-gray-500 font-medium group-hover:text-gray-400 transition-colors uppercase tracking-tight">{item.desc}</p>
                            <span className="text-[9px] text-gray-600 font-bold tracking-[0.1em] mt-1.5 block uppercase">{item.date}</span>
                         </div>
    
                         {/* Badge */}
                         <div className={cn("px-5 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest sm:min-w-[124px] text-center self-start sm:self-auto mx-auto sm:mx-0", item.badgeColor)}>
                           {item.badge}
                         </div>
                        </motion.div>
                      ))}
                  </div>
               </GlassCard>
            </div>
          )}
        </motion.div>

        {/* RIGHT COLUMN: Sidebar info */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 80, scale: 0.98 },
            show: { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { type: "spring", stiffness: 45, damping: 12 }
            }
          }}
          className="lg:col-span-3 space-y-6 md:space-y-8"
        >
          
          {!isAlenOrSham && (
            <GlassCard variant="purple" className="space-y-4 !p-4">
              {[
                { icon: <Users className="w-4 h-4 text-accent-red" />, label: 'Department', value: user.department || 'Leadership & Strategy' },
                { icon: <Clock className="w-4 h-4 text-accent-red" />, label: 'Joined', value: user.doj ? new Date(user.doj).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'January 2019' },
                { icon: <MapPin className="w-4 h-4 text-accent-red" />, label: 'Location', value: user.location || 'Kochi, Kerala' },
                { icon: <GraduationCap className="w-4 h-4 text-accent-red" />, label: 'Education', value: (user.education && user.education.length > 0) ? user.education[0].degree : 'Not specified' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group border-b border-white/5 last:border-0 pb-4 last:pb-0">
                  <div className="w-10 h-10 flex items-center justify-center bg-white/2 rounded-xl group-hover:bg-accent-red/10 transition-all border border-white/5">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[9px] text-gray-500 font-semibold uppercase tracking-[0.2em] mb-0.5 opacity-60">{item.label}</div>
                    <div className="text-[11px] font-semibold text-white tracking-wide">{item.value}</div>
                  </div>
                </div>
              ))}
            </GlassCard>
          )}

          {!isAlenOrSham && (
            <GlassCard variant="purple" className="!p-4">
              <SectionTitle title="Live Projects" />
              <div className="space-y-4">
                 {liveProjects.map((p, i) => (
                   <div key={i} className="p-4 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/5 transition-all group relative">
                      <div className="flex justify-between items-start mb-2">
                         <span className="text-[8px] text-orange-600 font-bold tracking-widest uppercase">{p.label}</span>
                         <div className="bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full border border-green-500/20 text-[7px] font-bold uppercase tracking-widest flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> ACTIVE
                         </div>
                      </div>
                      <h4 className="text-[11px] font-bold text-white mb-3">{p.title}</h4>
                      
                      <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-2">
                         <motion.div 
                           initial={{ width: 0 }} 
                           whileInView={{ width: `${p.progress}%` }} 
                           transition={{ duration: 1, ease: "easeOut" }}
                           className={cn("h-full", p.color)} 
                         />
                      </div>
                      <div className="flex justify-between text-[8px] font-medium uppercase tracking-widest text-gray-500">
                         <span>Progress</span>
                         <span className="text-white">{p.progress}%</span>
                      </div>
                   </div>
                 ))}
              </div>
            </GlassCard>
          )}

          <GlassCard variant="purple" className="text-center p-4 md:!p-6 border-white/10 rounded-[28px] shadow-xl" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
            <div className="text-[10px] text-gray-500 font-bold tracking-[0.25em] uppercase mb-1 opacity-50">PROFILE FOLLOWERS</div>
            <div className="text-3xl md:text-5xl font-black text-[#CB1387] tracking-tight mb-4 md:mb-6 mt-2">{user.followers || "2,671"}</div>
            <div className="grid grid-cols-3 gap-2">
               {[
                 { val: '+142', label: 'THIS WEEK', color: 'text-green-500' },
                 { val: user.rating ? `${user.rating}★` : '4.9★', label: 'RATING', color: 'text-white' },
                 { val: user.clientsCount || '18+', label: 'CLIENTS', color: 'text-blue-400' }
               ].map(i => (
                 <div key={i.label} className="bg-[#0E0616]/80 p-2 md:p-3 rounded-2xl border border-white/10 group hover:bg-white/[0.08] transition-all">
                   <div className={cn("text-xs font-black", i.color)}>{i.val}</div>
                   <div className="text-[8px] text-gray-500 font-bold tracking-widest uppercase opacity-60 mt-1">{i.label}</div>
                 </div>
               ))}
            </div>
          </GlassCard>

          <div className="space-y-4">
             <div className="flex items-center gap-2 mb-4">
               <div className="w-[3px] h-4 bg-brand-pink rounded-full" />
               <h2 className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-500">BOOK CONSULTATION</h2>
             </div>
             {[
               { time: '30 MIN', price: member.consultations?.price30Min },
               { time: '60 MIN', price: member.consultations?.price60Min },
               { time: 'FULL DAY', price: member.consultations?.priceFullDay }
             ].map((session, i) => {
               // Ensure accurate display of the price or keep hyphen clean
               const hasPrice = session.price && session.price.trim() !== "";
               const formattedPrice = hasPrice ? (session.price.startsWith("₹") ? session.price : `₹${session.price}`) : '';
               const titleText = hasPrice ? `${session.time} - ${formattedPrice}` : `${session.time} -`;

               return (
                 <div 
                   key={i} 
                   onClick={() => {
                     setShowBookSessionModal(true);
                   }}
                   className="border border-white/10 rounded-[28px] p-4 md:p-6 flex flex-col items-center text-center group cursor-pointer hover:border-[#8A0699]/40 hover:scale-[1.02] transition-all shadow-xl shadow-black/20" 
                   style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
                 >
                   <h4 className="text-3xl font-black text-white tracking-tight mb-0.5">{titleText}</h4>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest opacity-60 mb-6">Strategy Session</p>
                   <button className="w-full max-w-[200px] h-10 bg-gradient-to-r from-[#8A0699] to-[#2380DC] text-[9px] font-black text-white rounded-full flex items-center justify-center gap-2 transition-all uppercase tracking-widest hover:brightness-110 active:scale-95 shadow-lg shadow-brand-purple/20">
                     Book Now <ChevronRight className="w-3.5 h-3.5" />
                   </button>
                 </div>
               );
             })}
          </div>

          <GlassCard variant="purple">
            <SectionTitle title="Clients Managed" />
            <div className="flex flex-wrap gap-2.5">
               {(user && Array.isArray(user.clients) && user.clients.length > 0)
                 ? user.clients.map((client, idx) => (
                     <a 
                       key={idx}
                       href={client.website || '#'}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="btn-typo text-gray-400 px-5 py-2 rounded-full border border-white/10 hover:border-brand-purple/60 hover:text-white transition-all uppercase bg-white/5 flex items-center gap-2 group cursor-pointer"
                     >
                       <span>{client.name || client.companyName}</span>
                       <span className={cn(
                         "w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]",
                         (client.status || 'active').toLowerCase() === 'active' ? 'bg-green-500 text-green-500/50' : 'bg-red-500 text-red-500/50'
                       )} />
                     </a>
                   ))
                 : ['Company A', 'Company B', 'Company C'].map((c, i) => (
                     <span key={i} className="btn-typo text-gray-400/30 px-5 py-2 rounded-full border border-white/5 uppercase bg-white/2 cursor-default">
                       {c}
                     </span>
                   ))
               }
            </div>
          </GlassCard>

          {!isAlenOrSham && (
            <GlassCard variant="purple">
               <SectionTitle title="Hobbies & Interests" />
               <div className="flex flex-wrap gap-2.5">
                  {((user && Array.isArray(user.hobbies) && user.hobbies.length > 0)
                    ? user.hobbies
                    : ['Innovation', 'Automation', 'Fitness', 'Coffee', 'Strategy', 'Tech', 'Music', 'Travel']
                  ).map((h, idx) => (
                     <span key={idx} className="btn-typo text-gray-400 px-5 py-2 rounded-full border border-white/10 hover:border-brand-purple/60 hover:text-white transition-all cursor-default uppercase bg-white/5">
                       {h}
                     </span>
                  ))}
               </div>
            </GlassCard>
          )}

          {!isAlenOrSham && (
            <GlassCard variant="purple">
               <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-6 rounded-full bg-yellow-500" />
                  <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400">RECENT ACTIVITY</h2>
               </div>
               <div className="space-y-6">
                  {recentActivities.map((act, i) => (
                    <div key={i} className="flex flex-col border-b border-white/5 pb-4 last:border-0 last:pb-0">
                       <div className="flex items-center gap-2 mb-1">
                          <div className={cn("w-1.5 h-1.5 rounded-full", act.color)} />
                          <div className="text-[13px] leading-tight">
                             <span className="text-gray-500 mr-1">{act.label}</span> 
                             <span className="text-white">{act.project}</span>
                          </div>
                       </div>
                       <div className="text-[11px] text-gray-500 ml-3.5">{act.time}</div>
                    </div>
                  ))}
               </div>
            </GlassCard>
          )}

          {!isAlenOrSham && (
            <button 
              onClick={() => setShowResumeModal(true)}
              className="w-full h-16 md:h-24 rounded-[32px] bg-linear-to-r from-[#441649] to-[#112240] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 border border-white/10 shadow-2xl"
            >
               <FileText className="w-5 h-5 text-gray-400" />
               <span className="text-xs md:text-sm font-medium text-white tracking-wide uppercase">DOWNLOAD PORTFOLIO PDF</span>
            </button>
          )}

        </motion.div>
      </motion.main>

      {/* --- WORK SHOWCASE SECTION --- */}
        {((user && Array.isArray(user.workShowcase) && user.workShowcase.length > 0) || showStaticFallback) && (
         <motion.section 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="max-w-[1440px] mx-auto px-4 md:px-8 mt-8 md:mt-12 relative z-10"
         >
           <div className="mb-10 flex items-center gap-3 border-b border-white/5 pb-6">
             <div className="w-1 h-8 rounded-full bg-brand-pink" />
             <div>
               <span className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase mb-1 block">Real Results. Real Impact.</span>
               <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-0 font-display">
                 WORK <span className="text-brand-pink">SHOWCASE</span>
               </h2>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {((user && Array.isArray(user.workShowcase) && user.workShowcase.length > 0) 
               ? user.workShowcase 
               : [
                   {
                     category: 'CONTENT CAMPAIGN',
                     title: 'E-Commerce Brand Growth',
                     description: 'Created high-performing content strategy that increased brand reach and conversions.',
                     images: [
                       'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/TeamPage/Rectangle%2098.png',
                       'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/TeamPage/Rectangle%2098.png',
                       'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/TeamPage/Rectangle%2098.png'
                     ],
                     link: 'https://socialbureau.in'
                   },
                   {
                     category: 'SOCIAL MEDIA GROWTH',
                     title: 'Social Media Management',
                     description: 'Managed social media accounts and grew audience organically with content strategy.',
                     images: [
                       'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/TeamPage/Rectangle%2098.png',
                       'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/TeamPage/Rectangle%2098.png',
                       'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/TeamPage/Rectangle%2098.png'
                     ],
                     link: 'https://socialbureau.in'
                   },
                   {
                     category: 'CONTENT CAMPAIGN',
                     title: 'Social Media Management',
                     description: 'Managed social media accounts and grew audience organically with content strategy.',
                     images: [
                       'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/TeamPage/Rectangle%2098.png',
                       'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/TeamPage/Rectangle%2098.png',
                       'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/TeamPage/Rectangle%2098.png'
                     ],
                     link: 'https://socialbureau.in'
                   }
                 ]
             ).map((work, idx) => {
               const colors = ['#F43F5E', '#A855F7', '#06B6D4', '#F59E0B', '#3B82F6'];
               const color = colors[idx % colors.length];

               return (
                 <div 
                   key={idx}
                   className="glass-card flex flex-col justify-between p-6 hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden border border-white/5 shadow-2xl h-full group"
                 >
                   <div>
                     <div className="flex items-center gap-2 mb-4">
                       <div className="w-1 h-5 rounded-full" style={{ backgroundColor: color }} />
                       <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: color }}>
                         {work.category}
                       </span>
                     </div>

                     <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2 leading-tight group-hover:text-brand-purple transition-colors">
                       {work.title}
                     </h3>
                     
                     <p className="text-xs text-gray-400 leading-relaxed mb-6 font-medium">
                       {work.description}
                     </p>

                     {work.images && work.images.length > 0 && (
                       <div className="grid grid-cols-3 gap-3 mb-6">
                         {work.images.slice(0, 3).map((imgUrl, imgIdx) => (
                           <div 
                             key={imgIdx} 
                             className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 relative group/thumb shadow-md"
                           >
                             <img src={imgUrl} className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-500" alt="" />
                             <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2380DC]" />
                           </div>
                         ))}
                       </div>
                     )}
                   </div>

                   {work.link && (
                     <div className="mt-auto pt-4 border-t border-white/5 flex justify-end">
                       <a 
                         href={work.link}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="text-[10px] font-black tracking-widest uppercase text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
                       >
                         VIEW WORK <ChevronRight className="w-3.5 h-3.5" />
                       </a>
                     </div>
                   )}
                 </div>
               );
             })}
           </div>
          </motion.section>
        )}
            {/* --- EXTRA BOTTOM SECTIONS WITH STAGGERED REVEALS --- */}
      {hasBottomSection && (
        <motion.section 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="max-w-[1440px] mx-auto px-4 md:px-8 mt-8 md:mt-12 pb-12 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 relative z-10"
        >
          
          {hasInnovations && (
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.98 },
                show: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { type: "spring", stiffness: 45, damping: 12 }
                }
              }}
              className={cn("space-y-8", hasRightColumn ? "lg:col-span-8" : "lg:col-span-12")}
            >
               <div className="flex justify-between items-center mb-6">
                 <SectionTitle title="Innovation Feed" />
                 <button className="flex items-center gap-2 btn-typo text-gray-500 hover:text-white transition-all uppercase bg-white/5 px-4 py-2 rounded-full border border-white/5">
                   <Plus className="w-3.5 h-3.5" /> POST
                 </button>
               </div>
               <div className="space-y-6">
                  {user && Array.isArray(user.innovations) && user.innovations.length > 0 ? (
                    user.innovations.map((inn, idx) => (
                      <InnovationCard 
                        key={idx}
                        type={inn.type}
                        date={inn.date}
                        title={inn.title}
                        content={inn.content}
                        url={inn.url}
                        likes={inn.likes || 0}
                        comments={inn.comments || 0}
                      />
                    ))
                  ) : (
                    <>
                      <InnovationCard 
                        type="INNOVATION"
                        date="May 7, 2026"
                        title="API Marketing v2: E - Commerce Framework"
                        content="Expanding Atract-Pull-Influence to D2C brands - mapping customer journeys across 7 digital touchpoints."
                        likes={34}
                        comments={12}
                      />
                      <InnovationCard 
                        type="CASE STUDY"
                        date="May 7, 2026"
                        title="Kerala Election 2026 Dashboard Architecture"
                        content="Behind the scenes of building a high-availability broadcast dashboard using React and real-time WebSockets."
                        likes={56}
                        comments={28}
                      />
                      <InnovationCard 
                        type="INSIGHT"
                        date="May 7, 2026"
                        title="The Future of GEO (Generative Engine Optimization)"
                        content="How to prepare your brand for AI-driven search engines like Perplexity and Gemini."
                        likes={89}
                        comments={45}
                      />
                    </>
                  )}
               </div>
               <button className="w-full glass-card py-6 btn-typo uppercase text-gray-500 hover:text-white hover:bg-white/5 transition-all border-white/5">
                 + SHARE INNOVATION
               </button>
            </motion.div>
          )}

          {hasRightColumn && (
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.98 },
                show: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { type: "spring", stiffness: 45, damping: 12 }
                }
              }}
              className={cn("space-y-8", hasInnovations ? "lg:col-span-4" : "lg:col-span-12")}
            >
               {hasPodcasts && (
                 <>
                   <SectionTitle title="Bureau - Voices Podcasts" />
                   <div className="space-y-6">
                      {((user && Array.isArray(user.podcasts) && user.podcasts.length > 0)
                        ? user.podcasts.map((pod, idx) => (
                            <a 
                              key={idx} 
                              href={pod.url || '#'} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="glass-card-purple flex items-center gap-5 group cursor-pointer p-5 hover:scale-[1.02] transition-all border-white/10 block"
                            >
                              <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center transition-all text-white shadow-2xl relative overflow-hidden bg-brand-purple", 
                                idx % 3 === 0 ? 'bg-[#8A0699]' : 
                                idx % 3 === 1 ? 'bg-[#22C55E]' : 
                                'bg-[#F43F5E]'
                              )}>
                                <Play className="w-8 h-8 fill-current relative z-10 group-hover:scale-125 transition-transform" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                              </div>
                              <div>
                                <div className="text-[10px] font-semibold text-brand-purple mb-1 uppercase tracking-widest">
                                  EP {String(pod.episodeNo || (idx + 1)).padStart(2, '0')}
                                </div>
                                <h4 className="text-sm font-semibold text-white mb-2 leading-tight group-hover:text-brand-purple transition-colors">
                                  {pod.title || 'How API Marketing Rewrites the Rules'}
                                </h4>
                                <div className="flex items-center gap-4 text-[10px] text-gray-500 font-medium uppercase tracking-widest opacity-60">
                                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {pod.duration || '42 min'}</span>
                                  <span>{pod.host || 'Sham SK'}</span>
                                </div>
                              </div>
                            </a>
                          ))
                        : [1, 2, 3].map(i => (
                            <div key={i} className="glass-card-purple flex items-center gap-5 group cursor-pointer p-5 hover:scale-[1.02] transition-all border-white/10">
                              <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center transition-all text-white shadow-2xl relative overflow-hidden", 
                                i === 1 ? 'bg-[#8A0699]' : 
                                i === 2 ? 'bg-[#22C55E]' : 
                                'bg-[#F43F5E]'
                              )}>
                                <Play className="w-8 h-8 fill-current relative z-10 group-hover:scale-125 transition-transform" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                              </div>
                              <div>
                                <div className="text-[10px] font-semibold text-brand-purple mb-1 uppercase tracking-widest">EP 0{i}</div>
                                <h4 className="text-sm font-semibold text-white mb-2 leading-tight group-hover:text-brand-purple transition-colors">How API Marketing Rewrites the Rules</h4>
                                <div className="flex items-center gap-4 text-[10px] text-gray-500 font-medium uppercase tracking-widest opacity-60">
                                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 42 min</span>
                                  <span>Sham SK</span>
                                </div>
                              </div>
                            </div>
                          ))
                      )}
                   </div>
                 </>
               )}

               {hasEvents && (
                 <>
                   <SectionTitle title="Event Portal" />
                   <div className="space-y-6">
                      {((user && Array.isArray(user.events) && user.events.length > 0)
                        ? user.events.map((ev, idx) => (
                            <div key={idx} className="glass-card flex items-center gap-6 p-5 hover:bg-white/5 transition-all border-white/10 group">
                              <div className={cn("w-16 h-16 rounded-2xl flex flex-col items-center justify-center shadow-lg transition-transform group-hover:-rotate-6", 
                                ev.category === 'purple' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' :
                                ev.category === 'yellow' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                                ev.category === 'red' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                'bg-green-500/10 text-green-500 border border-green-500/20'
                              )}>
                                <span className="text-2xl font-semibold leading-none mb-0.5">{ev.date || '14'}</span>
                                <span className="text-[10px] font-semibold uppercase tracking-widest">{ev.month || 'MAY'}</span>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-xs font-semibold text-white mb-1 group-hover:text-brand-purple transition-colors uppercase tracking-tight">{ev.title || 'API Marketing Master Class'}</h4>
                                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest opacity-60">{ev.details || 'Free webinar - Kerala owners'}</p>
                              </div>
                              <div className={cn("w-2.5 h-2.5 rounded-full shadow-lg", 
                                ev.category === 'purple' ? 'bg-purple-500 shadow-purple-500/20' :
                                ev.category === 'yellow' ? 'bg-yellow-500 shadow-yellow-500/20' :
                                ev.category === 'red' ? 'bg-red-500 shadow-red-500/20' :
                                'bg-green-500 shadow-green-500/20'
                              )} />
                            </div>
                          ))
                        : [
                            { d: '14', m: 'MAY', t: 'API Marketing Master Class', c: 'purple' },
                            { d: '22', m: 'MAY', t: 'API Marketing Master Class', c: 'yellow' },
                            { d: '05', m: 'JUN', t: 'API Marketing Master Class', c: 'red' },
                            { d: '18', m: 'JUN', t: 'API Marketing Master Class', c: 'green' }
                          ].map((ev, i) => (
                            <div key={i} className="glass-card flex items-center gap-6 p-5 hover:bg-white/5 transition-all border-white/10 group">
                              <div className={cn("w-16 h-16 rounded-2xl flex flex-col items-center justify-center shadow-lg transition-transform group-hover:-rotate-6", 
                                ev.c === 'purple' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' :
                                ev.c === 'yellow' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                                ev.c === 'red' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                'bg-green-500/10 text-green-500 border border-green-500/20'
                              )}>
                                <span className="text-2xl font-semibold leading-none mb-0.5">{ev.d}</span>
                                <span className="text-[10px] font-semibold uppercase tracking-widest">{ev.m}</span>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-xs font-semibold text-white mb-1 group-hover:text-brand-purple transition-colors uppercase tracking-tight">{ev.t}</h4>
                                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest opacity-60">Free webinar - Kerala owners</p>
                              </div>
                              <div className={cn("w-2.5 h-2.5 rounded-full shadow-lg", 
                                ev.c === 'purple' ? 'bg-purple-500 shadow-purple-500/20' :
                                ev.c === 'yellow' ? 'bg-yellow-500 shadow-yellow-500/20' :
                                ev.c === 'red' ? 'bg-red-500 shadow-red-500/20' :
                                'bg-green-500 shadow-green-500/20'
                              )} />
                            </div>
                          ))
                      )}
                   </div>
                 </>
               )}
            </motion.div>
          )}
        </motion.section>
      )}

      <div className="relative z-10 bg-[#f5f5f7]">
        <Footer />
      </div>

      {showResumeModal && (
        <ResumeModal 
          data={resumeData} 
          onClose={() => setShowResumeModal(false)} 
        />
      )}

      {showBookSessionModal && (
        <BookSessionModal
          partnerName={member.name}
          partnerEmail={user.email || member.email || member.user?.email || "team@socialbureau.in"}
          onClose={() => setShowBookSessionModal(false)}
        />
      )}
    </div>
  );
};

export default EmployeePage;
