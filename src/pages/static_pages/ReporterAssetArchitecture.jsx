import React from "react";
import {
  Play,
  ArrowRight,
  Download,
  Youtube,
  Users,
  Clock,
  ShieldCheck,
  Database,
  UserCog,
  Network,
  BarChart3,
  Linkedin,
  Twitter,
  Instagram,
  ChevronDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------- shared design tokens ---------- */
const RED = "#E31E24";
const RED_DIM = "#8c1418";

const channels = [
  "News",
  "Entertainment",
  "Sports",
  "Business",
  "Lifestyle",
  "Digital",
  "Specials",
  "Regional",
  "Documentary",
  "Others",
];

const perf = channels.map((name, i) => ({
  name,
  views: [720, 210, 610, 300, 260, 300, 260, 300, 190, 300][i],
  watch: [230, 60, 470, 280, 250, 260, 240, 300, 170, 260][i],
  subs: [70, 30, 90, 40, 60, 50, 60, 60, 70, 60][i],
}));

const activities = [
  { color: "bg-emerald-500", title: "New user access requested", time: "2 minutes ago" },
  { color: "bg-[--red]", title: "Video published — Reporter News", time: "12 minutes ago" },
  { color: "bg-sky-500", title: "Channel settings updated", time: "1 hour ago" },
  { color: "bg-amber-500", title: "Permission modified", time: "3 hours ago" },
  { color: "bg-violet-500", title: "Security check completed", time: "5 hours ago" },
];

const coreScope = [
  {
    n: "01",
    title: "YouTube Asset Architecture",
    icon: Database,
    items: [
      "Channel ownership structure",
      "Asset hierarchy & mapping",
      "Role and permission design",
      "Operational access separation",
    ],
  },
  {
    n: "02",
    title: "Channel Management Infrastructure",
    icon: Youtube,
    items: [
      "Administrator mapping",
      "Permission architecture",
      "Content workflow alignment",
      "Verification readiness",
      "Individual categorisation",
    ],
  },
  {
    n: "03",
    title: "Corporate Identity & Verification Layer",
    icon: ShieldCheck,
    items: [
      "Brand account structure",
      "Channel verification",
      "Business information consistency",
      "Ownership documentation",
      "Resolve identity mismatches",
    ],
  },
  {
    n: "04",
    title: "Access & Security Architecture",
    icon: UserCog,
    items: [
      "Role-based access control",
      "Primary/secondary admins",
      "Two-factor authentication",
      "Activity monitoring & audit",
      "Recovery & continuity",
    ],
  },
  {
    n: "05",
    title: "Content Operations Framework",
    icon: BarChart3,
    items: [
      "Publishing workflows",
      "Approval workspace",
      "Content categorisation",
      "Editorial team structure",
      "Scalable for 10+ channels",
    ],
  },
  {
    n: "06",
    title: "Multi-Channel Governance",
    icon: Network,
    items: [
      "Centralised administration",
      "Channel performance oversight",
      "Policy enforcement",
      "Scalable for future channels",
      "Long-term operational support",
    ],
  },
];

const sidebarItems = [
  "Dashboard",
  "Channels",
  "Users",
  "Access Requests",
  "Content Approvals",
  "Activity Logs",
  "Security",
  "Reports",
  "Settings",
];

/* ---------- small building blocks ---------- */

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
      {children}
    </span>
  );
}

function StatBlock({ value, label }) {
  return (
    <div>
      <div className="text-2xl font-semibold text-white sm:text-3xl">{value}</div>
      <div className="mt-1 text-xs text-white/50 sm:text-sm">{label}</div>
    </div>
  );
}

function ChannelChip({ label }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <div
        className="flex h-8 w-8 items-center justify-center rounded-md"
        style={{ backgroundColor: RED }}
      >
        <Play className="h-3.5 w-3.5 fill-white text-white" />
      </div>
      <span className="text-[11px] leading-tight text-white/60">{label}</span>
    </div>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[560px] w-[560px] rounded-full opacity-20 blur-3xl"
        style={{ background: RED }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-20" style={{ backgroundImage: "url('https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/socialbureau-media/images/805a8503-ccb4-4cc7-a7d1-dfd3a6b1a85b.png')", backgroundPosition: "center", backgroundSize: "cover" }}>
        <div>
          <div className="mb-5 flex items-center gap-2 text-xs font-medium tracking-wide text-white/50">
            <span className="h-px w-6" style={{ backgroundColor: RED }} />
            FOR REPORTER TV
          </div>
          <h1 className="text-4xl font-semibold leading-[1.08] text-white sm:text-5xl">
            More Than
            <br />
            Channels.
            <br />
            <span style={{ color: RED }}>A Stronger</span>
            <br />
            <span style={{ color: RED }}>YouTube Infrastructure.</span>
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/55">
            We design, secure and manage Reporter TV&rsquo;s YouTube ecosystem
            with centralized ownership, verified identity, controlled access
            and scalable governance.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: RED }}
            >
              Explore the Architecture <ArrowRight className="h-4 w-4" />
            </button>
            <button className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-white/80 transition-colors hover:border-white/30 hover:text-white">
              <Download className="h-4 w-4" /> Download Overview
            </button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 sm:max-w-md">
            <StatBlock value="10+" label="YouTube Channels" />
            <StatBlock value="100%" label="Ownership Protection" />
            <StatBlock value="Enterprise" label="Ready Framework" />
          </div>
          <div className="mt-6 flex items-center gap-3 text-xs text-white/40">
            <Clock className="h-3.5 w-3.5" />
            24/7 Security Monitoring
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- dashboard preview section ---------- */

function DashboardMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d13]">
      <div className="grid grid-cols-[190px_1fr]">
        <aside className="hidden border-r border-white/10 p-4 sm:block">
          <div className="mb-4 flex items-center gap-2 text-xs font-medium text-white/70">
            <Youtube className="h-4 w-4" style={{ color: RED }} />
            Reporter TV
          </div>
          <div className="mb-3 text-[10px] uppercase tracking-wide text-white/30">
            YouTube Ecosystem
          </div>
          <ul className="space-y-1 text-[13px]">
            {sidebarItems.map((item, i) => (
              <li
                key={item}
                className={`rounded-md px-2.5 py-1.5 ${
                  i === 0
                    ? "text-white"
                    : "text-white/45 hover:text-white/70"
                }`}
                style={i === 0 ? { backgroundColor: `${RED}26` } : {}}
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>

        <div className="p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-white/35">
              Last updated: Today, 10:24 AM
            </span>
            <span className="rounded-md border border-white/10 px-3 py-1 text-xs text-white/60">
              Last 30 Days
            </span>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Youtube, val: "10", label: "Total Channels", color: RED },
              { icon: Users, val: "42", label: "Active Users", color: "#3b82f6" },
              { icon: Clock, val: "7", label: "Pending Requests", color: "#f59e0b" },
              {
                icon: ShieldCheck,
                val: "100%",
                label: "2FA Enabled",
                color: "#10b981",
              },
            ].map(({ icon: Icon, val, label, color }) => (
              <div
                key={label}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div
                  className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${color}22` }}
                >
                  <Icon className="h-4 w-4" style={{ color }} />
                </div>
                <div className="text-lg font-semibold text-white">{val}</div>
                <div className="text-[11px] text-white/40">{label}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr]">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-white/80">
                  Channel Performance
                </span>
                <div className="flex items-center gap-3 text-[11px] text-white/40">
                  <span className="flex items-center gap-1">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: RED }}
                    />
                    Views
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    Watch Time
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    Subscribers
                  </span>
                </div>
              </div>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={perf} barGap={2}>
                    <CartesianGrid
                      vertical={false}
                      stroke="rgba(255,255,255,0.06)"
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      contentStyle={{
                        background: "#15151d",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="views" fill={RED} radius={[3, 3, 0, 0]} />
                    <Bar dataKey="watch" fill="#38bdf8" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="subs" fill="#a78bfa" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-white/80">
                  Recent Activities
                </span>
                <span className="text-[11px] text-white/35">View All</span>
              </div>
              <ul className="space-y-3.5">
                {activities.map((a) => (
                  <li key={a.title} className="flex items-start gap-2.5">
                    <span
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full ${a.color}`}
                      style={
                        a.color === "bg-[--red]" ? { backgroundColor: RED } : {}
                      }
                    />
                    <div>
                      <div className="text-[12.5px] text-white/75">
                        {a.title}
                      </div>
                      <div className="text-[11px] text-white/35">{a.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BigPicture() {
  return (
    <section className="border-t border-white/5 bg-[#0a0a0f]">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/40">
              <span className="h-px w-6" style={{ backgroundColor: RED }} />
              THE BIG PICTURE
            </div>
            <h2 className="max-w-xl text-3xl font-semibold leading-tight text-white sm:text-[2.3rem]">
              A Structured YouTube Ecosystem for Modern Media Organisations
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/50">
              From ownership to operations, we build the complete YouTube
              infrastructure that gives you control, visibility, security and
              scale.
            </p>
          </div>
          <div className="lg:text-right">
            <p className="mb-4 text-[15px] leading-relaxed text-white/50">
              Empowering media brands like Reporter TV to manage multiple
              YouTube channels under one unified architecture — without
              compromising editorial freedom.
            </p>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 transition-colors hover:border-white/30 hover:text-white">
              See the Complete Architecture <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <DashboardMock />
      </div>
    </section>
  );
}

/* ---------- core scope ---------- */

function CoreScope() {
  return (
    <section className="border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/40">
          <span className="h-px w-6" style={{ backgroundColor: RED }} />
          CORE SCOPE
        </div>
        <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-[2.1rem]">
          A Complete Architecture for{" "}
          <span style={{ color: RED }}>Ownership, Security and Scale</span>
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreScope.map(({ n, title, icon: Icon, items }) => (
            <div
              key={n}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20"
            >
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: RED }}
                >
                  {n}
                </span>
                <Icon className="h-4 w-4 text-white/40" />
              </div>
              <h3 className="mb-3 text-[15px] font-medium text-white">
                {title}
              </h3>
              <ul className="space-y-2">
                {items.map((it) => (
                  <li
                    key={it}
                    className="flex items-start gap-2 text-[13px] leading-snug text-white/45"
                  >
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                      style={{ backgroundColor: RED }}
                    />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- future / testimonial ---------- */

function FutureSection() {
  const bullets = [
    "Reduce operational risks",
    "Eliminate single-person dependency",
    "Enable structured team collaboration",
    "Ensure long-term asset security",
    "Maintain complete visibility and control",
  ];
  return (
    <section className="border-t border-white/5 bg-[#0a0a0f]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1fr_0.8fr]">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/40">
            <span className="h-px w-6" style={{ backgroundColor: RED }} />
            BUILT FOR WHAT&rsquo;S NEXT
          </div>
          <h2 className="text-3xl font-semibold leading-tight text-white">
            A Stronger, Safer YouTube Future
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/50">
            Whether you manage 2 channels or 20, our infrastructure scales
            with your ambitions.
          </p>
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-sm text-white/70">
                <span
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] text-white"
                  style={{ backgroundColor: RED }}
                >
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="flex h-48 items-center justify-center border-b border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent">
            <button
              className="flex h-14 w-14 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: RED }}
            >
              <Play className="h-5 w-5 translate-x-0.5 fill-white" />
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between text-sm text-white">
              <span className="font-medium">
                Building the Future of Media on YouTube
              </span>
              <span className="text-white/40">02:35</span>
            </div>
            <button className="mt-2 flex items-center gap-1.5 text-xs text-white/50 hover:text-white/70">
              <Play className="h-3 w-3 fill-current" /> Watch Our Approach
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-[15px] leading-relaxed text-white/70">
            &ldquo;SocialBureau gave us complete clarity and control over our
            YouTube ecosystem. Their structured approach, verification
            process and ongoing support have been exceptional.&rdquo;
          </p>
          <div className="mt-6 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">
                Leadership Team
              </div>
              <div className="text-xs text-white/40">Client</div>
            </div>
            <div
              className="flex h-9 w-9 items-center justify-center rounded-md"
              style={{ backgroundColor: RED }}
            >
              <Play className="h-3.5 w-3.5 fill-white text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- final CTA ---------- */

function FinalCTA() {
  return (
    <section className="border-t border-white/5">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 lg:flex-row lg:items-center">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/40">
            <span className="h-px w-6" style={{ backgroundColor: RED }} />
            READY TO BUILD YOUR YOUTUBE ECOSYSTEM?
          </div>
          <h2 className="max-w-xl text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Let&rsquo;s Create a Secure, Scalable YouTube Infrastructure for
            Your Brand.
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <button
            className="flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: RED }} onClick={() => window.location.href = '/contact'}
          >
            Talk to Our Team <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- page ---------- */

export default function ReporterAssetArchitecture() {
  return (
    <div className="min-h-screen bg-[#08080c] font-sans antialiased" style={{ "--red": RED }}>
      <Hero />
      <BigPicture />
      <CoreScope />
      <FutureSection />
      <FinalCTA />
    </div>
  );
}