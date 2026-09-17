import React, { useState } from "react";
import {
  DollarSign,
  Eye,
  Scissors,
  PlayCircle,
  Zap,
  TrendingUp,
  AlertCircle,
  Trophy,
  ChevronDown,
} from "lucide-react";
import { Lightbulb } from "lucide-react";

/**
 * Asha Sharath Show — Revenue Report (Redesigned)
 * SocialBureau
 *
 * Fresh editorial-style layout (not a copy of the source infographic).
 * Fully self-contained, mobile-responsive React + Tailwind component.
 * No external assets or chart libraries required — the donut/bars are plain SVG/CSS.
 */

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const categories = [
  {
    label: "Full Episodes",
    views: "107,200",
    revenue: "$0.00",
    share: 0,
    icon: PlayCircle,
    color: "#52525b", // zinc-600
    note: "Monetization Inactive / Restricted",
  },
  {
    label: "Highlight Clips & Cut-downs",
    views: "115,300",
    revenue: "$13.12",
    share: 92.6,
    icon: Scissors,
    color: "#dc2626", // red-600
    note: "Largest share of reported revenue",
  },
  {
    label: "Promos & Shorts",
    views: "43,500",
    revenue: "$1.05",
    share: 7.4,
    icon: Zap,
    color: "#f97316", // orange-500
    note: "Primarily audience acquisition",
  },
];

const fullEpisodes = [
  {
    ep: "Ep 1",
    title: "എനിക്കിപ്പോള്‍ പ്രസവിക്കേണ്ട; മാറുന്ന ചിന്താഗതിക്കു പിന്നിലെന്ത്?",
    views: "36.7K",
    link:"https://www.youtube.com/watch?v=7A6bmm5VUl4",
    thumbnail: "https://img.youtube.com/vi/7A6bmm5VUl4/hqdefault.jpg",
    revenue: "$0.00",
  },
  {
    ep: "Ep 2",
    title: "അമ്മയാകണം എന്നത് നിർബന്ധമാണോ? മാറുന്ന തലമുറയുടെ ചിന്തകൾ!",
    views: "28.5K",
    link:"https://www.youtube.com/watch?v=KpwYRugbggs",
    thumbnail: "https://img.youtube.com/vi/KpwYRugbggs/hqdefault.jpg",
    revenue: "$0.00",
  },
  {
    ep: "Ep 3",
    title: "പ്രായവും പ്രഗ്നന്‍സിയും; പ്രശ്നം ഗർഭിണിക്കോ സമൂഹത്തിനോ?",
    views: "10.8K",
    link:"https://www.youtube.com/watch?v=cxnslk_824U",
    thumbnail: "https://img.youtube.com/vi/cxnslk_824U/hqdefault.jpg",
    revenue: "$0.00",
  },
  {
    ep: "Ep 4",
    title: "ഒറ്റയ്ക്ക് പൊരുതി ജയിച്ച, തളരാത്ത മനസ്സുകളുടെ കഥ EP 4",
    views: "31.2K",
    link:"https://www.youtube.com/watch?v=6_IE-jF2SFI",
    thumbnail: "https://img.youtube.com/vi/6_IE-jF2SFI/hqdefault.jpg",
    revenue: "$0.00",
  },
];

const clips = [
  {
    title: "'അമ്മയാകണമെന്ന് ആഗ്രഹമില്ലാത്തവരെ അമ്മയാകാൻ നിർബന്ധിക്കരുത്'",
    views: "57.2K",
    link:"https://www.youtube.com/watch?v=-yAR_w-Bdqs",
    thumbnail: "https://img.youtube.com/vi/-yAR_w-Bdqs/hqdefault.jpg",
    revenue: "$4.53",
  },
  {
    title: "'കുട്ടികള്‍ വേണ്ട എന്ന് തീരുമാനിക്കുന്നവരെയും സമൂഹം നോർമലൈസ് ചെയ്യണം'",
    views: "17.2K",
    link:"https://www.youtube.com/watch?v=Hzl7s68b5rA",
    thumbnail: "https://img.youtube.com/vi/Hzl7s68b5rA/hqdefault.jpg",
    revenue: "$3.88",
  },
  {
    title: "വിശേഷമുണ്ടോ എന്ന് ചോദിക്കുന്നതിന് ജെൻസി എന്തിനാണിത്ര ഒഫെൻഡെഡാകുന്നത്?",
    views: "10.5K",
    link:"https://www.youtube.com/watch?v=kOJ02snS9Vg",
    thumbnail: "https://img.youtube.com/vi/kOJ02snS9Vg/hqdefault.jpg",
    revenue: "$1.53",
  },
  {
    title: "'നമുക്ക് ആരോഗ്യമുള്ളപ്പോഴേ കുഞ്ഞുങ്ങളെ നന്നായി നോക്കാൻ കഴിയൂ'",
    views: "8.9K",
    link:"https://www.youtube.com/watch?v=0_Xq02pjots",
    thumbnail: "https://img.youtube.com/vi/0_Xq02pjots/hqdefault.jpg",
    revenue: "$1.28",
  },
  {
    title: "'കല്യാണം കഴിക്കില്ലെന്നാണ് നാലാം ക്ലാസിൽ പഠിക്കുന്ന മോള്‍ പറഞ്ഞത്'",
    views: "9.2K",
    link:"https://www.youtube.com/watch?v=IOjwfT0d1tY",
    thumbnail: "https://img.youtube.com/vi/IOjwfT0d1tY/hqdefault.jpg",
    revenue: "$1.10",
  },
  {
    title: "സിനിമയിൽ കാണുന്നത് പോലെ ഒരുമാസം ബന്ധപ്പെട്ടാൽ അടുത്ത മാസം ഗർഭിണിയാകില്ല",
    views: "5.1K",
    link:"https://www.youtube.com/watch?v=cCFRAtvbIes",
    thumbnail: "https://img.youtube.com/vi/cCFRAtvbIes/hqdefault.jpg",
    revenue: "$0.43",
  },
  {
    title:
      "'നല്ല പ്രായത്തിൽ കുഞ്ഞുണ്ടായാൽ അതങ്ങ് നടന്നു പൊക്കോളും എന്നതാണ് ഏറ്റവും വലിയ നുണ'",
    views: "4.8K",
    link:"https://www.youtube.com/watch?v=U5jWKaeZa94",
    thumbnail: "https://img.youtube.com/vi/U5jWKaeZa94/hqdefault.jpg",
    revenue: "$0.24",
  },
  {
    title: "ജോലി ചെയ്യുന്ന സ്ത്രീകള്‍ക്ക് പ്രസവിക്കാനും സാഹചര്യവും സൗകര്യവും വേണം",
    views: "2.1K",
    link:"https://www.youtube.com/watch?v=KTQ01HFq4Rk",
    thumbnail: "https://img.youtube.com/vi/KTQ01HFq4Rk/hqdefault.jpg",
    revenue: "$0.12",
  },
  {
    title: "അമ്മയാകാൻ എനിക്ക് ആഗ്രഹമില്ല എന്ന് പറയുന്നതിൽ എന്താണ് തെറ്റ്?",
    views: "0.3K",
    link:"https://www.youtube.com/watch?v=d5Q618m2VXs",
    thumbnail: "https://img.youtube.com/vi/d5Q618m2VXs/hqdefault.jpg",
    revenue: "$0.01",
  },
];

const promos = [
  {
    title: "'എനിക്കിപ്പൊ പ്രസവിക്കേണ്ട'; ആശാ ശരത്ത് ഷോ നാളെ രാത്രി 8 മണിക്ക്",
    views: "3.4K",
    link:"https://www.youtube.com/watch?v=aGorM9QACDM",
    thumbnail: "https://img.youtube.com/vi/aGorM9QACDM/hqdefault.jpg",
    revenue: "$0.26",
  },
  {
    title: "എത്രയൊക്കെ പറഞ്ഞാലും കുട്ടികളെ നോക്കേണ്ടത് സ്ത്രീകളാണ്...",
    views: "12.8K",
    link:"https://www.youtube.com/watch?v=UoFj54RxzZM",  
    thumbnail: "https://img.youtube.com/vi/UoFj54RxzZM/hqdefault.jpg",
    revenue: "$0.25",
  },
  {
    title: "കുട്ടികൾ വേണ്ടെന്ന് പറയുന്നവരെ വിധിക്കാതെ കേൾക്കാൻ ശ്രമിക്കാം...",
    views: "8.6K",
    link:"https://www.youtube.com/watch?v=E0HTObdXxTw",
    thumbnail: "https://img.youtube.com/vi/E0HTObdXxTw/hqdefault.jpg",
    revenue: "$0.20",
  },
  {
    title: "'എനിക്കിപ്പോള്‍ പ്രസവിക്കണ്ട'; ആശാ ശരത്ത് ഷോ ഇന്ന് രാത്രി 8 മണിക്ക്",
    views: "2.9K",
    link:"https://www.youtube.com/watch?v=KguJB8GO3A4",
    thumbnail: "https://img.youtube.com/vi/KguJB8GO3A4/hqdefault.jpg",
    revenue: "$0.16",
  },
  {
    title: "എഗ്ഗ് ഫ്രീസിങ്; വസ്തുതകളും മിഥ്യാധാരണകളും കാണാം ആശാ ശരത്ത് ഷോ",
    views: "1.8K",
    link:"https://www.youtube.com/watch?v=zY6AL-VXmFc",
    thumbnail: "https://img.youtube.com/vi/zY6AL-VXmFc/hqdefault.jpg",
    revenue: "$0.08",
  },
  {
    title: "വിശേഷമായില്ലേ? എന്ന ചോദ്യം ഒരുതരം മെന്റൽ പ്രഷർ ആവുന്നുണ്ടോ?",
    views: "4.2K",
    link:"https://www.youtube.com/watch?v=4Kcevhgv1W0",
    thumbnail: "https://img.youtube.com/vi/4Kcevhgv1W0/hqdefault.jpg",
    revenue: "$0.05",
  },
  {
    title: "സൊസൈറ്റിയുടെ സമ്മർദ്ദം IVF-ന് കാരണമാകുന്നുണ്ടോ?",
    views: "2.4K",
    link:"https://www.youtube.com/watch?v=uhLboi1gs1o",
    thumbnail: "https://img.youtube.com/vi/uhLboi1gs1o/hqdefault.jpg",
    revenue: "$0.04",
  },
  {
    title:
      "ദിവസവും 75 ഡിവോഴ്‌സുകൾ, കേരളത്തിൽ സിംഗിൾ പേരന്റ്സ് നേരിടുന്ന വെല്ലുവിളികൾ...",
    views: "1.1K",
    link:"https://www.youtube.com/watch?v=m5g2DeydLSI",
    thumbnail: "https://img.youtube.com/vi/m5g2DeydLSI/hqdefault.jpg",
    revenue: "$0.01",
  },
  {
    title: "ഒറ്റയ്ക്ക് പൊരുതി…സ്വന്തം കരുത്തിൽ ജയിച്ച പോരാളികളുടെ കഥകൾആശ ശരത് ഷോ ഞായറാഴ്ച രാത്രി 8 മണിക്ക്",
    views: "6.3K",
    link:"https://www.youtube.com/watch?v=m5g2DeydLSI",
    thumbnail: "https://img.youtube.com/vi/m5g2DeydLSI/hqdefault.jpg",
    revenue: "<$0.02",
  },
];

const findings = [
  {
    title: "Total content reach",
    text: "The show generated approximately 266,000 views across all reported content formats.",
  },
  {
    title: "Revenue concentration",
    text: "The majority of reported revenue came from highlight clips and episode cut-downs, generating $13.12 out of the total $14.17.",
  },
  {
    title: "Full episodes generated no reported revenue",
    text: "Although the four full episodes collectively generated approximately 107,200 views, their reported revenue was $0.00, with the episodes listed as Monetization Inactive.",
  },
  {
    title: "Short-form content contributed to reach",
    text: "Promos and Shorts generated approximately 43,500 views and $1.05, indicating that these videos contributed to audience reach while generating a smaller portion of direct revenue.",
  },
  {
    title: "Highest-performing content",
    text: "'അമ്മയാകണമെന്ന് ആഗ്രഹമില്ലാത്തവരെ അമ്മയാകാൻ നിർബന്ധിക്കരുത്' — ~57,200 views and $4.53 estimated revenue.",
  },
];

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function Donut({ data, size = 176, stroke = 22 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let offsetAccum = 0;

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1f1f23"
          strokeWidth={stroke}
        />
        {data
          .filter((d) => d.share > 0)
          .map((d, i) => {
            const dash = (d.share / 100) * circumference;
            const gap = circumference - dash;
            const circle = (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={-((offsetAccum / 100) * circumference)}
                strokeLinecap="butt"
              />
            );
            offsetAccum += d.share;
            return circle;
          })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] tracking-widest text-zinc-500 font-medium">
          TOTAL
        </span>
        <span className="text-xl font-extrabold text-white">$14.17</span>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl bg-red-600/15 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-red-500" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-zinc-500 font-medium">{label}</p>
        <p className="text-2xl font-extrabold text-white mt-0.5 truncate">
          {value}
        </p>
        {sub && <p className="text-xs text-zinc-500 mt-1">{sub}</p>}
      </div>
    </div>
  );
}

function CategoryBar({ cat }) {
  const Icon = cat.icon;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${cat.color}26` }}
        >
          <Icon className="w-4 h-4" style={{ color: cat.color }} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {cat.label}
          </p>
          <p className="text-xs text-zinc-500">{cat.views} views</p>
        </div>
        <div className="ml-auto text-right flex-shrink-0">
          <p className="text-sm font-bold text-white">{cat.revenue}</p>
          <p className="text-xs text-zinc-500">{cat.share}%</p>
        </div>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${Math.max(cat.share, 2)}%`,
            backgroundColor: cat.color,
          }}
        />
      </div>
      <p className="text-[11px] text-zinc-500 mt-2">{cat.note}</p>
    </div>
  );
}

// Responsive data table: real table on sm+, stacked accordion cards on mobile.

function DataSection({
  icon: Icon,
  title,
  badge,
  badgeTone,
  columns,
  rows,
  footer,
}) {
  const [open, setOpen] = useState(null);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-lg bg-red-600/15 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-red-500" />
        </div>

        <h3 className="text-white font-bold text-sm sm:text-base flex-1">
          {title}
        </h3>

        {badge && (
          <span
            className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${badgeTone}`}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Mobile: accordion list */}
      <div className="sm:hidden divide-y divide-white/10">
        {rows.map((row, i) => (
          <div key={i}>
            <button
              type="button"
              onClick={() => {
                // Open the YouTube video when clicking the episode
                if (row.onClick) row.onClick();

                // Toggle accordion
                setOpen(open === i ? null : i);
              }}
              className="w-full text-left px-4 py-3 cursor-pointer"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {row.thumbnail && (
                    <img
                      src={row.thumbnail}
                      alt={`${row.primary} thumbnail`}
                      className="w-20 h-12 object-cover rounded-md flex-shrink-0"
                    />
                  )}

                  <p className="text-sm text-white font-medium leading-snug pr-2">
                    {row.primary}
                  </p>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            <div
              className={`grid transition-all duration-200 ${
                open === i
                  ? "grid-rows-[1fr] mt-2"
                  : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-zinc-400">
                  {row.meta.map((m, j) => (
                    <span key={j}>
                      <span className="text-zinc-500">
                        {m.label}:{" "}
                      </span>
                      <span className="text-white font-medium">
                        {m.value}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide text-zinc-500 border-b border-white/10">
              {columns.map((c, i) => (
                <th
                  key={i}
                  className={`px-5 py-3 font-medium ${c.align || ""}`}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {rows.map((row, i) => (
              <tr
                key={i}
                onClick={row.onClick}
                className={`hover:bg-white/[0.02] transition-colors ${
                  row.onClick ? "cursor-pointer" : ""
                }`}
              >
                {row.cells.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-5 py-3 align-top text-zinc-300 ${
                      columns[j]?.align || ""
                    } ${j === 0 ? "text-white font-medium" : ""}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

          {footer && (
            <tfoot>
              <tr className="border-t border-white/10 font-semibold">
                {footer.map((f, i) => (
                  <td
                    key={i}
                    className={`px-5 py-3 text-white ${
                      columns[i]?.align || ""
                    }`}
                  >
                    {f}
                  </td>
                ))}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function AshasharathReport() {

const episodeRows = fullEpisodes.map((e) => {
  const videoId = new URL(e.link).searchParams.get("v");

  return {
    primary: `${e.ep} — ${e.title}`,

    thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,

    meta: [
      { label: "Views", value: e.views },
      { label: "Status", value: "Mon. Inactive" },
      { label: "Revenue", value: e.revenue },
    ],

    onClick: () => {
      window.open(e.link, "_blank", "noopener,noreferrer");
    },

    cells: [
      <div className="flex items-center gap-3">
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={`${e.ep} thumbnail`}
          className="w-24 h-14 object-cover rounded-md flex-shrink-0"
        />

        <div>
          <span className="text-red-500 font-semibold">
            {e.ep}
          </span>{" "}
          <span className="text-zinc-300">
            {e.title}
          </span>
        </div>
      </div>,

      e.views,

      <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-red-600/15 text-red-400 px-2 py-0.5 rounded-full whitespace-nowrap">
        Restricted
      </span>,

      e.revenue,
    ],
  };
});

const clipRows = clips.map((c) => {
  const videoId = new URL(c.link).searchParams.get("v");

  return {
    primary: c.title,

    thumbnail: c.thumbnail,

    meta: [
      { label: "Views", value: c.views },
      { label: "Revenue", value: c.revenue },
    ],

    onClick: () => {
      window.open(c.link, "_blank", "noopener,noreferrer");
    },

    cells: [
      <div className="flex items-center gap-3">
        <img
          src={c.thumbnail}
          alt={`${c.title} thumbnail`}
          className="w-24 h-14 object-cover rounded-md flex-shrink-0"
        />

        <span className="text-zinc-300">
          {c.title}
        </span>
      </div>,

      c.views,

      c.revenue,
    ],
  };
});

const promoRows = promos.map((p) => ({
  primary: p.title,

  thumbnail: p.thumbnail,

  meta: [
    { label: "Views", value: p.views },
    { label: "Revenue", value: p.revenue },
  ],

  onClick: () => {
    window.open(p.link, "_blank", "noopener,noreferrer");
  },

  cells: [
    <div className="flex items-center gap-3">
      <img
        src={p.thumbnail}
        alt={`${p.title} thumbnail`}
        className="w-24 h-14 object-cover rounded-md flex-shrink-0"
      />

      <span className="text-zinc-300">
        {p.title}
      </span>
    </div>,

    p.views,

    p.revenue,
  ],
}));

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white font-sans">
      {/* ---------------- Hero ---------------- */}
      <header className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 15% 10%, rgba(220,38,38,0.35), transparent 50%), radial-gradient(circle at 90% 80%, rgba(220,38,38,0.2), transparent 45%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-10 pb-10">

          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-red-600 inline-block" />
            <span className="text-[11px] tracking-[0.25em] text-zinc-400 font-medium">
              REVENUE REPORT
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight max-w-2xl">
            Asha Sharath <span className="text-red-600">Show</span>
          </h1>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base">
            on <span className="text-white font-semibold">BIGTV24X7</span> 
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-10 space-y-12">
        {/* ---------------- KPI stats ---------------- */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={DollarSign}
            label="Total Estimated Revenue"
            value="$14.17"
            sub="USD, across all content"
          />
          <StatCard
            icon={Eye}
            label="Total Views"
            value="266,000"
            sub="Episodes, clips, promos & shorts"
          />
          <StatCard
            icon={Trophy}
            label="Top Earning Clip"
            value="$4.53"
            sub="57.2K views — single highest clip"
          />
        </section>

        {/* ---------------- Executive summary ---------------- */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <h2 className="text-white font-bold text-lg mb-2">
            Executive Summary
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            The Asha Sharath Show on BIGTV24X7 generated approximately{" "}
            <span className="text-white font-medium">266,000 total views</span>{" "}
            across full episodes, highlight clips, cut-down videos, promos and
            YouTube Shorts, for a total estimated revenue of{" "}
            <span className="text-white font-medium">$14.17 USD</span>. Highlight
            Clips &amp; Cut-downs contributed approximately{" "}
            <span className="text-red-400 font-medium">92.6%</span> of total
            revenue, while the four full episodes — marked Monetization
            Inactive / Restricted — generated no reported revenue.
          </p>
        </section>

        {/* ---------------- Revenue by category ---------------- */}
        <section>
          <h2 className="text-2xl font-extrabold mb-5">
            Revenue by <span className="text-red-600">Content Category</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 items-center">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 mx-auto lg:mx-0">
              <Donut data={categories} />
              <div className="flex flex-col gap-2 w-full">
                {categories.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="text-zinc-400 flex-1 truncate">
                      {c.label}
                    </span>
                    <span className="text-white font-semibold">
                      {c.share}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {categories.map((c, i) => (
                <CategoryBar key={i} cat={c} />
              ))}
            </div>
          </div>
        </section>
        {/* ---------------- Overall summary table ---------------- */}

<section className="space-y-5">
  <h2 className="text-2xl font-extrabold mb-5">
    Overall <span className="text-red-600">Performance Insights</span>
  </h2>

  {/* Key Metrics */}
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs text-zinc-500">Total Views</p>
      <p className="text-2xl font-extrabold text-white mt-2">~266K</p>
      <p className="text-xs text-zinc-500 mt-1">Across all content</p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs text-zinc-500">Estimated Revenue</p>
      <p className="text-2xl font-extrabold text-white mt-2">$14.17</p>
      <p className="text-xs text-zinc-500 mt-1">Total estimated earnings</p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs text-zinc-500">Top Revenue Share</p>
      <p className="text-2xl font-extrabold text-red-500 mt-2">92.6%</p>
      <p className="text-xs text-zinc-500 mt-1">Highlight clips</p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs text-zinc-500">Revenue per 1K Views</p>
      <p className="text-2xl font-extrabold text-white mt-2">
        $0.05
      </p>
      <p className="text-xs text-zinc-500 mt-1">Overall average</p>
    </div>
  </div>

  {/* Insight */}
  <div className="rounded-2xl border border-red-600/20 bg-red-600/[0.06] p-4">
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-red-600/15 flex items-center justify-center flex-shrink-0">
        <Lightbulb className="w-4 h-4 text-red-400" />
      </div>

      <div>
        <h3 className="text-white font-bold text-sm mb-1">
          Key Performance Insight
        </h3>
        <p className="text-sm text-zinc-300 leading-relaxed">
          Highlight clips and episode cut-downs contribute the largest
          share of estimated revenue. Full episodes currently have
          monetization inactive, while short-form content adds
          incremental revenue.
        </p>
      </div>
    </div>
  </div>

  {/* Graphs */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

    {/* Revenue Distribution */}
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <h3 className="text-white font-bold text-sm mb-1">
        Revenue Distribution
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Estimated share by content category
      </p>

      <div className="space-y-4">
        {categories.map((c, i) => (
          <div key={i}>
            <div className="flex justify-between gap-3 text-xs mb-2">
              <span className="text-zinc-300">{c.label}</span>
              <span className="text-white font-semibold">
                {c.share}%
              </span>
            </div>

            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-red-600"
                style={{ width: `${c.share}%` }}
              />
            </div>

            <p className="text-[11px] text-zinc-500 mt-1">
              {c.revenue}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Views Distribution */}
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <h3 className="text-white font-bold text-sm mb-1">
        Views by Content Category
      </h3>
      <p className="text-xs text-zinc-500 mb-4">
        Total views generated by each category
      </p>

      <div className="space-y-4">
        {categories.map((c, i) => (
          <div key={i}>
            <div className="flex justify-between gap-3 text-xs mb-2">
              <span className="text-zinc-300">{c.label}</span>
              <span className="text-white font-semibold">
                {c.views}
              </span>
            </div>

            <div className="h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-zinc-400"
                style={{
                  width: `${
                    (parseFloat(c.views.replace(/[^\d.]/g, "")) /
                      266) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Revenue Comparison */}
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
    <h3 className="text-white font-bold text-sm mb-1">
      Estimated Revenue by Category
    </h3>
    <p className="text-xs text-zinc-500 mb-5">
      Comparison of estimated earnings
    </p>

    <div className="flex items-end gap-3 sm:gap-6 h-48">
      {categories.map((c, i) => {
        const revenue = parseFloat(
          c.revenue.replace(/[^0-9.]/g, "")
        );

        const maxRevenue = Math.max(
          ...categories.map((item) =>
            parseFloat(item.revenue.replace(/[^0-9.]/g, ""))
          )
        );

        return (
          <div
            key={i}
            className="flex-1 h-full flex flex-col justify-end items-center gap-2 min-w-0"
          >
            <span className="text-xs text-zinc-300 font-semibold">
              {c.revenue}
            </span>

            <div
              className="w-full max-w-20 bg-red-600 rounded-t-lg transition-all"
              style={{
                height: `${Math.max(
                  (revenue / maxRevenue) * 100,
                  3
                )}%`,
              }}
            />

            <span className="text-[10px] text-zinc-500 text-center leading-tight">
              {c.label}
            </span>
          </div>
        );
      })}
    </div>
  </div>
</section>
        {/* ---------------- Detailed performance ---------------- */}
        <section>
          <h2 className="text-2xl font-extrabold mb-5">
            Detailed <span className="text-red-600">Performance</span>
          </h2>

          <div className="space-y-6">
            <DataSection
              icon={PlayCircle}
              title="Full Episodes Performance"
              badge="Monetization Inactive"
              badgeTone="bg-red-600 text-white"
              columns={[
                { label: "Episode" },
                { label: "Views" },
                { label: "Status" },
                { label: "Revenue", align: "text-right" },
              ]}
              rows={episodeRows}
              footer={["Total", "~107.2K", "", "$0.00"]}
            />

            <DataSection
              icon={Scissors}
              title="Highlight Clips & Episode Cut-downs"
              badge="92.6% of revenue"
              badgeTone="bg-red-600/15 text-red-400"
              columns={[
                { label: "Video / Clip" },
                { label: "Views" },
                { label: "Revenue", align: "text-right" },
              ]}
              rows={clipRows}
              footer={["Subtotal", "~115.3K", "$13.12"]}
            />

            <DataSection
              icon={Zap}
              title="Promos & YouTube Shorts"
              badge="7.4% of revenue"
              badgeTone="bg-orange-500/15 text-orange-400"
              columns={[
                { label: "Video / Short" },
                { label: "Views" },
                { label: "Revenue", align: "text-right" },
              ]}
              rows={promoRows}
              footer={["Subtotal", "~43.5K", "$1.05"]}
            />
          </div>
        </section>



        {/* ---------------- Key findings ---------------- */}
        <section>
          <h2 className="text-2xl font-extrabold mb-5">
            Key <span className="text-red-600">Findings</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {findings.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm mb-1">
                    {f.title}
                  </p>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {f.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Callout ---------------- */}
        <section className="rounded-2xl border border-red-600/30 bg-red-600/[0.06] p-5 sm:p-6 flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-zinc-300 leading-relaxed">
            <span className="text-white font-semibold">Takeaway: </span>
            Re-enabling monetization on the four restricted full episodes
            represents the clearest untapped revenue opportunity, they
            already carry ~107,200 views, more than the clips that generated
            92.6% of current revenue.
          </p>
        </section>
      </main>

    </div>
  );
}