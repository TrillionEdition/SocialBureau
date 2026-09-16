import React from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Globe,
  Shield,
  Users,
  Settings,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Folder,
  User,
  Calendar,
} from "lucide-react";

/**
 * Security & Operational Execution Report
 * SocialBureau (Trillion Edition LLP)
 *
 * Fully self-contained, mobile-responsive React + Tailwind component.
 * Drop into any Tailwind-enabled project — no external assets required.
 */

const teluguIssues = [
  {
    icon: Facebook,
    iconColor: "text-blue-500",
    title: "Main Facebook Restriction",
    text: (
      <>
        BIG TV (ID: 108765325249473 | Instagram ID: 17841460058016114) remains
        restricted in India. Email escalation returned unresolved ticket{" "}
        <span className="text-white font-medium">#4570535869896631</span>{" "}
        remains unresolved.
      </>
    ),
  },
  {
    icon: Facebook,
    iconColor: "text-blue-500",
    title: "Unlinked Facebook Page",
    text: (
      <>
        BIGTV Live (ID: 439181849518005) operates outside the Business Portfolio with 66K followers and no connected Instagram account.
      </>
    ),
  },
  {
    icon: Facebook,
    iconColor: "text-blue-500",
    title: "Secondary Facebook Page",
    text: (
      <>
        BIG TV LIVE (ID: 105800395771634) is inside the BigTv Telugu Asset Group with 12K followers but lacks a connected Instagram account.
      </>
    ),
  },
  {
    icon: Instagram,
    iconColor: "text-pink-500",
    title: "Instagram Access",
    text: "BIG TV LIVE, BIG TV Srikakulam, BIG TV Kurnool and BIG TV Maya lack active cross-platform Instagram login access.",
  },
  {
    icon: Youtube,
    iconColor: "text-red-500",
    title: "YouTube Publishing",
    text: "Inactive long-form YouTube publishing is affecting watch-time consistency and ad-revenue opportunities.",
  },
];

const malayalamIssues = [
  {
    icon: Youtube,
    iconColor: "text-red-500",
    title: "YouTube ID Verification",
    text: "Two ID verification attempts have been unsuccessful. Verification is required for continued access to relevant YouTube features.",
  },
  {
    icon: Youtube,
    iconColor: "text-red-500",
    title: "YouTube Upload Limit",
    text: "A large number of videos were previously deleted from the BIG TV Malayalam channel, changing its historical content and performance history. The changes in channel history may be contributing to the current upload-limit issue, although the exact cause requires confirmation from YouTube.",
  },
  {
    icon: Youtube,
    iconColor: "text-red-500",
    title: "Backup YouTube Channel",
    text: "No official backup channel currently exists. A separate verified channel is required for business continuity and protection against account, copyright or channel-access issues.",
  },
  {
    icon: null,
    dual: [Facebook, Instagram],
    title: "Cliff House Meta Setup",
    text: "The Cliff House Facebook Page and Instagram account have not been finalized or claimed under the BIG TV Malayalam asset group.",
  },
  {
    icon: Globe,
    iconColor: "text-slate-300",
    title: "Website Publishing",
    text: "Article publishing on the BIG TV Malayalam website has stopped, affecting web traffic and search visibility.",
  },
  {
    icon: Linkedin,
    iconColor: "text-blue-400",
    title: "LinkedIn Newsletter",
    text: "LinkedIn Newsletter publishing is inactive, limiting professional reach.",
  },
];

const phases = [
  {
    icon: Shield,
    phase: "PHASE 1",
    tag: "SECURE ACCESS",
    num: "01",
    title: "Credential Centralization & Recovery",
    items: [
      "Update all 2FA recovery numbers and security contacts across Google Workspace, Meta, YouTube and LinkedIn to Pravasa Media’s dedicated management number: +91 91333 18779.",
      "Store credentials securely on the dedicated company laptop and phone provided for media management.",
    ],
  },
  {
    icon: Users,
    phase: "PHASE 2",
    tag: "TRANSFER CONTROL",
    num: "02",
    title: "Admin Transfer to Shilpa Profile",
    items: [
      "Create and add Shilpa’s profile with Full Control / Admin Access under Meta Business Settings > Users > People.",
      "Transfer primary admin control of Business Portfolio 758420025212666 to Shilpa’s profile.",
    ],
  },
  {
    icon: Settings,
    phase: "PHASE 3",
    tag: "RESTRUCTURE",
    num: "03",
    title: "BIG TV Telugu Restructuring & Escalation",
    items: [
      "Add Page 439181849518005 to Business Portfolio 758420025212666 and make it the backup posting channel, where permitted.",
      "Link dedicated Instagram accounts to Pages 439181849518005 and 105800395771634.",
      "Continue escalation using ticket #4570535869896631 and submit an appeal through the applicable Government of India Grievance Appellate Committee (GAC) process. Evaluate issuance of a legal notice to Meta Platforms India Pvt. Ltd.",
    ],
  },
  {
    icon: Youtube,
    phase: "PHASE 4",
    tag: "SETUP & ACTIVATE",
    num: "04",
    title: "BIG TV Malayalam Setup & Verification",
    items: [
      "Create and verify an official BIG TV Malayalam backup YouTube channel with proper organization ownership, 2FA and authorized access.",
      "Finalize and create/claim the Cliff House Facebook Page and Instagram account under the BIG TV Malayalam asset group.",
      "Resume daily website article publishing and weekly LinkedIn Newsletter editions.",
    ],
  },
  {
    icon: TrendingUp,
    phase: "PHASE 5",
    tag: "SUSTAIN & GROW",
    num: "05",
    title: "Content Distribution & Brand Protection",
    items: [
      "Apply eligible registered trademarks to Meta Brand Rights Protection and Meta Rights Manager for protection against fake/unauthorized accounts and content.",
      "Resume daily long-form YouTube publishing across both Telugu channel.",
      ],
  },
];

function Logo({ small }) {
  return (
    <div className={small ? "text-lg" : "text-2xl sm:text-3xl"}>
      <span className="font-extrabold text-white tracking-tight">Social</span>
      <span className="font-extrabold text-red-600 tracking-tight">Bureau</span>
      <sup className="text-[0.5em] text-slate-400 ml-0.5">®</sup>
    </div>
  );
}

function IssueRow({ num, icon: Icon, dual, iconColor, title, text }) {
  return (
    <div className="flex gap-3 sm:gap-4 py-4 border-b border-white/10 last:border-b-0">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white/10 text-white text-xs font-semibold flex items-center justify-center">
        {num}
      </div>
      
      <div className="min-w-0">
        <p className="text-white font-semibold text-sm sm:text-base leading-snug">
          {title}
        </p>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-1">
          {text}
        </p>
      </div>
      <div className="flex-shrink-0 flex items-center gap-1 pt-0.5">
        {dual ? (
          <>
            <Facebook className="w-4 h-4 text-blue-500" />
            <Instagram className="w-4 h-4 text-pink-500" />
          </>
        ) : (
          Icon && <Icon className={`w-4 h-4 ${iconColor}`} />
        )}
      </div>
    </div>
  );
}

function IssuesCard({ badge, logo, badgeIcon: BadgeIcon, badgeTone, title, subtitle, issues }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 p-4 sm:p-5 border-b border-white/10 flex-wrap">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-auto" />
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg leading-tight">
              {title}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">{subtitle}</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-full ${badgeTone}`}
        >
          <BadgeIcon className="w-3.5 h-3.5" />
          {badge}
        </span>
      </div>
      <div className="px-4 sm:px-5">
        {issues.map((issue, i) => (
          <IssueRow key={i} num={i + 1} {...issue} />
        ))}
      </div>
    </div>
  );
}

function PhaseCard({ icon: Icon, phase, tag, num, title, items }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex flex-col h-full">
      <div className="w-11 h-11 rounded-full border-2 border-red-600 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-red-500" />
      </div>
      <span className="text-red-500 text-[11px] font-bold tracking-wide">
        {phase}
      </span>
      <h4 className="text-white font-bold text-base sm:text-lg leading-snug mt-1 mb-3">
        {title}
      </h4>
      <ul className="space-y-2.5 flex-1">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
            <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between mt-5 pt-3 border-t border-white/10">
        <span className="text-[10px] font-bold tracking-wider text-slate-500">
          {tag}
        </span>
        <span className="text-slate-600 font-bold text-sm">{num}</span>
      </div>
    </div>
  );
}

export default function Securityoperationalreport() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(220,38,38,0.25), transparent 55%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-6">
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-red-600 inline-block" />
              <span className="text-[11px] tracking-[0.2em] text-slate-400 font-medium">
                BUSINESS PORTFOLIO
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              Security &amp; Operational
              <br />
              <span className="text-red-600">Execution Report</span>
            </h1>
            <p className="text-slate-400 mt-3 text-sm sm:text-base max-w-lg">
              From challenges to a stronger, safer, more valuable digital
              future.
            </p>
          </div>

          {/* Meta cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">
            <div className="flex items-center gap-3 border border-white/15 rounded-xl px-4 py-3">
              <Folder className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="text-[11px] text-slate-400">Business Portfolio ID</p>
                <p className="text-sm font-semibold">758420025212666</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border border-white/15 rounded-xl px-4 py-3">
              <User className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="text-[11px] text-slate-400">Target Authority</p>
                <p className="text-sm font-semibold">Owner / Shilpa Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border border-white/15 rounded-xl px-4 py-3">
              <Calendar className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="text-[11px] text-slate-400">Report Date</p>
                <p className="text-sm font-semibold">September 2026</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10 space-y-14">
        {/* Section 1 */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
            <div>
              <span className="text-red-500 text-xs font-bold tracking-widest">
                SECTION ONE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                Operational Issues{" "}
                <span className="text-red-600">Identified</span>
              </h2>
            </div>
            <p className="text-[11px] tracking-widest text-slate-500 font-medium">
              ASSESS &nbsp;|&nbsp; IDENTIFY &nbsp;|&nbsp; PRIORITIZE
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <IssuesCard
              title="BIG TV Telugu"
              subtitle="Assets & Operations"
              badge="ISSUES DETECTED"
              logo="https://images.bigtvlive.com/2026/07/cropped-cropped-BIGTV-TELUGU-LOGO-NEW-1.png"
              badgeIcon={AlertTriangle}
              badgeTone="bg-red-600/15 text-red-400"
              issues={teluguIssues}
            />
            <IssuesCard
              title="BIG TV Malayalam"
              subtitle="Assets & Operations"
              logo="https://malayalam-bigtv-images.s3.ap-south-1.amazonaws.com/2026/04/BIGTV-MALAYALAM.jpg"
              badge="ACTION REQUIRED"
              badgeIcon={AlertTriangle}
              badgeTone="bg-red-600 text-white"
              issues={malayalamIssues}
            />
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
            <div>
              <span className="text-red-500 text-xs font-bold tracking-widest">
                SECTION TWO
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                Comprehensive{" "}
                <span className="text-red-600">Workflow Plan</span>
              </h2>
            </div>
            <p className="text-[11px] tracking-widest text-slate-500 font-medium">
              STRATEGY &nbsp;|&nbsp; EXECUTE &nbsp;|&nbsp; MONITOR &nbsp;|&nbsp; GROW
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {phases.map((p, i) => (
              <PhaseCard key={i} {...p} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}