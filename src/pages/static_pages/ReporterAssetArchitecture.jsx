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
  { color: "bg-emerald-500", title: "Locked", time: "2 minutes ago" },
  { color: "bg-[--red]", title: "Locked", time: "12 minutes ago" },
  { color: "bg-sky-500", title: "Locked", time: "1 hour ago" },
  { color: "bg-amber-500", title: "Locked", time: "3 hours ago" },
  { color: "bg-violet-500", title: "Locked", time: "5 hours ago" },
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

function StatBlock({ value, label }) {
  return (
    <div>
      <div className="text-xl font-semibold text-white sm:text-2xl md:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-[11px] text-white/50 sm:text-xs md:text-sm">
        {label}
      </div>
    </div>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* background image */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
        style={{
          backgroundImage:
            "url('https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/socialbureau-media/images/805a8503-ccb4-4cc7-a7d1-dfd3a6b1a85b.png')",
        }}
      />
      {/* readability overlay — heavier on small screens where the image crops tighter */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[#08080c] sm:bg-gradient-to-r sm:from-black/85 sm:via-black/60 sm:to-black/30" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:py-28">
        <div className="max-w-xl">
          <div className="mb-4 flex items-center gap-2 text-[11px] font-medium tracking-wide text-white/50 sm:mb-5 sm:text-xs">
            <span className="h-px w-6 shrink-0" style={{ backgroundColor: RED }} />
            FOR REPORTER TV
          </div>
          <h1 className="text-3xl font-semibold leading-[1.12] text-white sm:text-4xl md:text-5xl md:leading-[1.08]">
            More Than
            <br />
            Channels.
            <br />
            <span style={{ color: RED }}>A Stronger</span>
            <br />
            <span style={{ color: RED }}>YouTube Infrastructure.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 sm:mt-6 sm:text-[15px]">
            We design, secure and manage YouTube ecosystem
            with centralized ownership, verified identity, controlled access
            and scalable governance.
          </p>

          <div className="mt-7 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center sm:mt-8 sm:gap-3">
            <a
  href="#core-scope"
  className="flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 xs:w-auto"
  style={{ backgroundColor: RED }}
>
              Explore the Architecture <ArrowRight className="h-4 w-4 shrink-0" />
            </a>
          </div>

          <div className="mt-9 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 sm:mt-10 sm:max-w-md sm:gap-6 sm:pt-8">
            <StatBlock value="10+" label="YouTube Channels" />
            <StatBlock value="100%" label="Ownership Protection" />
            <StatBlock value="Enterprise" label="Ready Framework" />
          </div>
          <div className="mt-5 flex items-center gap-2.5 text-[11px] text-white/40 sm:mt-6 sm:gap-3 sm:text-xs">
            <Clock className="h-3.5 w-3.5 shrink-0" />
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
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr]">
        <aside className="hidden border-white/10 p-4 md:block md:border-r">
          <div className="mb-4 flex items-center gap-2 text-xs font-medium text-white/70">
            <Youtube className="h-4 w-4 shrink-0" style={{ color: RED }} />
            Reporter TV
          </div>
          <div className="mb-3 text-[10px] uppercase tracking-wide text-white/30">
            YouTube Ecosystem
          </div>
          <ul className="space-y-1 text-[13px]">
            {sidebarItems.map((item, i) => (
            <li
                key={item}
                className={`group relative rounded-md px-2.5 py-1.5 ${
                i === 0
                    ? "text-white"
                    : "cursor-not-allowed text-white/45 hover:text-white/70"
                }`}
                style={i === 0 ? { backgroundColor: `${RED}26` } : {}}
            >
                {item}

                {i !== 0 && (
                <span
                    className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-black px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100"
                >
                    Locked
                </span>
                )}
            </li>
            ))}
          </ul>
        </aside>

        <div className="p-3.5 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] text-white/35 sm:text-xs">
              Last updated: Today, 10:24 AM
            </span>
            <span className="rounded-md border border-white/10 px-3 py-1 text-[11px] text-white/60 sm:text-xs">
              Last 30 Days
            </span>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-2.5 sm:mb-5 sm:grid-cols-4 sm:gap-3">
            {[
              { icon: Youtube, val: "10", label: "Total Channels", color: RED },
              { icon: Users, val: "0", label: "Active Users", color: "#3b82f6" },
              { icon: Clock, val: "0", label: "Pending Requests", color: "#f59e0b" },
              {
                icon: ShieldCheck,
                val: "0%",
                label: "2FA Enabled",
                color: "#10b981",
              },
            ].map(({ icon: Icon, val, label, color }) => (
              <div
                key={label}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:p-4"
              >
                <div
                  className="mb-2.5 flex h-7 w-7 items-center justify-center rounded-lg sm:mb-3 sm:h-8 sm:w-8"
                  style={{ backgroundColor: `${color}22` }}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color }} />
                </div>
                <div className="text-base font-semibold text-white sm:text-lg">
                  {val}
                </div>
                <div className="text-[10.5px] text-white/40 sm:text-[11px]">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr]">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4">
              <div className="mb-3 flex flex-col gap-2 xs:flex-row xs:items-center xs:justify-between">
                <span className="text-sm font-medium text-white/80">
                  Channel Performance
                </span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/40">
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
              <div className="h-[180px] sm:h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={perf} barGap={2}>
                    <CartesianGrid
                      vertical={false}
                      stroke="rgba(255,255,255,0.06)"
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 9 }}
                      interval={0}
                      angle={-35}
                      textAnchor="end"
                      height={40}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      width={30}
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

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-white/80">
                  Recent Activities
                </span>
                <span className="text-[11px] text-white/35">View All</span>
              </div>
              <ul className="space-y-3 sm:space-y-3.5">
                {activities.map((a) => (
                  <li key={a.title} className="flex items-start gap-2.5">
                    <span
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full ${a.color}`}
                      style={
                        a.color === "bg-[--red]" ? { backgroundColor: RED } : {}
                      }
                    />
                    <div>
                      <div className="text-[12px] text-white/75 sm:text-[12.5px]">
                        {a.title}
                      </div>
                      <div className="text-[10.5px] text-white/35 sm:text-[11px]">
                        {a.time}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[10.5px] leading-relaxed text-white/50 sm:text-[10.5px]">
                All recent activities are locked for security reasons.
              </p>
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
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mb-8 grid gap-6 sm:mb-10 sm:gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[11px] font-medium text-white/40 sm:text-xs">
              <span className="h-px w-6 shrink-0" style={{ backgroundColor: RED }} />
              THE BIG PICTURE
            </div>
            <h2 className="max-w-xl text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-[2.3rem]">
              A Structured YouTube Ecosystem for Modern Media Organisations
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/50 sm:mt-4 sm:text-[15px]">
              From ownership to operations, we build the complete YouTube
              infrastructure that gives you control, visibility, security and
              scale.
            </p>
          </div>
          <div className="lg:text-right">
            <p className="mb-4 text-sm leading-relaxed text-white/50 sm:text-[15px]">
              Empowering media brands like Reporter TV to manage multiple
              YouTube channels under one unified architecture — without
              compromising editorial freedom.
            </p>
            <a className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 transition-colors hover:border-white/30 hover:text-white sm:w-auto" href="#core-scope">
              See the Complete Architecture <ArrowRight className="h-3.5 w-3.5 shrink-0" />
            </a>
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
    <section className="border-t border-white/5" id="core-scope">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-medium text-white/40 sm:text-xs">
          <span className="h-px w-6 shrink-0" style={{ backgroundColor: RED }} />
          CORE SCOPE
        </div>
        <h2 className="max-w-2xl text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-[2.1rem]">
          A Complete Architecture for{" "}
          <span style={{ color: RED }}>Ownership, Security and Scale</span>
        </h2>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {coreScope.map(({ n, title, icon: Icon, items }) => (
            <div
              key={n}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20 sm:p-6"
            >
              <div className="mb-4 flex items-center gap-3 sm:mb-5">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white sm:h-9 sm:w-9"
                  style={{ backgroundColor: RED }}
                >
                  {n}
                </span>
                <Icon className="h-4 w-4 shrink-0 text-white/40" />
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
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:gap-10 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1fr_0.8fr]">
        <div>
          <div className="mb-3 flex items-center gap-2 text-[11px] font-medium text-white/40 sm:text-xs">
            <span className="h-px w-6 shrink-0" style={{ backgroundColor: RED }} />
            BUILT FOR WHAT&rsquo;S NEXT
          </div>
          <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
            A Stronger, Safer YouTube Future
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/50 sm:mt-4 sm:text-[15px]">
            Whether you manage 2 channels or 20, our infrastructure scales
            with your ambitions.
          </p>
          <ul className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
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

        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <p className="text-sm leading-relaxed text-white/70 sm:text-[15px]">
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
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
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
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:gap-8 sm:px-6 sm:py-16 lg:flex-row lg:items-center">
        <div>
          <div className="mb-3 flex items-center gap-2 text-[11px] font-medium text-white/40 sm:text-xs">
            <span className="h-px w-6 shrink-0" style={{ backgroundColor: RED }} />
            READY TO BUILD YOUR YOUTUBE ECOSYSTEM?
          </div>
          <h2 className="max-w-xl text-xl font-semibold leading-tight text-white sm:text-2xl md:text-3xl">
            Let&rsquo;s Create a Secure, Scalable YouTube Infrastructure for
            Your Brand.
          </h2>
        </div>
        <div className="flex w-full items-center gap-6 lg:w-auto">
          <button
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 lg:w-auto"
            style={{ backgroundColor: RED }}
            onClick={() => (window.location.href = "/contact")}
          >
            Talk to Our Team <ArrowRight className="h-4 w-4 shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- page ---------- */

export default function ReporterAssetArchitecture() {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-[#08080c] font-sans antialiased"
      style={{ "--red": RED }}
    >
      <Hero />
      <BigPicture />
      <CoreScope />
      <FutureSection />
      <FinalCTA />
    </div>
  );
}