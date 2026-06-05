import { BASE_URL } from "@/utils/urls";
import { useState, useEffect, useCallback } from "react";

const BADGE_COLORS = {
  social_media_management: "bg-violet-100 text-violet-800",
  google_ads: "bg-blue-100 text-blue-800",
  website: "bg-teal-100 text-teal-800",
  seo: "bg-green-100 text-green-800",
  content: "bg-amber-100 text-amber-800",
  default: "bg-gray-100 text-gray-700",
};

const STAGE_COLORS = {
  growth: "bg-emerald-100 text-emerald-700",
  startup: "bg-blue-100 text-blue-700",
  scale: "bg-purple-100 text-purple-700",
  default: "bg-gray-100 text-gray-600",
};

const URGENCY_COLORS = {
  asap: "bg-red-100 text-red-700",
  soon: "bg-amber-100 text-amber-700",
  flexible: "bg-green-100 text-green-700",
  default: "bg-gray-100 text-gray-600",
};

const fmt = (n) =>
  n >= 10000000
    ? `₹${(n / 10000000).toFixed(1)}Cr`
    : n >= 100000
    ? `₹${(n / 100000).toFixed(1)}L`
    : n >= 1000
    ? `₹${(n / 1000).toFixed(1)}K`
    : `₹${n}`;

const badge = (label, colorClass) => (
  <span
    key={label}
    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${colorClass}`}
  >
    {label.replace(/_/g, " ")}
  </span>
);

function StatPill({ label, value, color = "bg-slate-100 text-slate-700" }) {
  return (
    <div className={`rounded-lg px-3 py-2 flex flex-col gap-0.5 ${color}`}>
      <span className="text-xs opacity-70 font-medium uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}

function PlatformDots({ platforms }) {
  const icons = {
    instagram: "IG",
    facebook: "FB",
    youtube: "YT",
    linkedin: "LI",
    twitter: "TW",
    website: "WB",
    whatsapp: "WA",
  };
  return (
    <div className="flex gap-1 flex-wrap">
      {platforms.map((p) => (
        <span
          key={p}
          className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center justify-center"
        >
          {icons[p] || p.slice(0, 2).toUpperCase()}
        </span>
      ))}
    </div>
  );
}

function ProgressBar({ label, current, target, color = "bg-violet-500" }) {
  const pct = target > 0 ? Math.min((current / target) * 100, 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-500">{label}</span>
        <span className="font-medium text-slate-700">
          {current.toLocaleString()} / {target.toLocaleString()}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function ExpandableCard({ submission, index }) {
  const [open, setOpen] = useState(false);
  const f = submission.form;

  const initials = (f.company_name || "?")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const avatarColors = [
    "bg-violet-200 text-violet-800",
    "bg-teal-200 text-teal-800",
    "bg-blue-200 text-blue-800",
    "bg-amber-200 text-amber-800",
    "bg-pink-200 text-pink-800",
  ];
  const av = avatarColors[index % avatarColors.length];

  return (
    <div
      className={`bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 ${
        open ? "shadow-md" : "hover:shadow-sm"
      }`}
    >
      {/* Header */}
      <button
        className="w-full text-left px-5 py-4 flex items-start gap-4"
        onClick={() => setOpen((v) => !v)}
      >
        <div
          className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-sm font-bold ${av}`}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-slate-900 text-base truncate">
              {f.company_name}
            </h3>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                STAGE_COLORS[f.biz_stage] || STAGE_COLORS.default
              }`}
            >
              {f.biz_stage}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                URGENCY_COLORS[f.urgency_level] || URGENCY_COLORS.default
              }`}
            >
              {f.urgency_level}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            {f.contact_name} · {f.contact_role} · {f.industry} ·{" "}
            {f.geography}
          </p>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {f.services_needed.map((s) =>
              badge(s, BADGE_COLORS[s] || BADGE_COLORS.default)
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-xs text-slate-400">
            {new Date(submission.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              submission.paid
                ? "bg-green-100 text-green-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {submission.paid ? "Paid" : "Unpaid"}
          </span>
          <svg
            className={`w-4 h-4 text-slate-400 mt-1 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Expanded */}
      {open && (
        <div className="border-t border-slate-100 px-5 py-4 space-y-5">
          {/* Overview stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <StatPill
              label="IG Followers"
              value={parseInt(f.ig_f || 0).toLocaleString()}
              color="bg-pink-50 text-pink-800"
            />
            <StatPill
              label="YT Subscribers"
              value={parseInt(f.yt_s || 0).toLocaleString()}
              color="bg-red-50 text-red-800"
            />
            <StatPill
              label="LI Followers"
              value={parseInt(f.li_f || 0).toLocaleString()}
              color="bg-blue-50 text-blue-800"
            />
            <StatPill
              label="Web Visits"
              value={parseInt(f.web_v || 0).toLocaleString()}
              color="bg-teal-50 text-teal-800"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <StatPill
              label="Avg. Reach"
              value={parseInt(f.avg_r || 0).toLocaleString()}
            />
            <StatPill label="Eng. Rate" value={`${f.eng_r || 0}%`} />
            <StatPill
              label="Current Leads"
              value={parseInt(f.cur_leads || 0).toLocaleString()}
            />
            <StatPill
              label="Dig. Revenue"
              value={fmt(parseInt(f.dig_rev || 0))}
            />
          </div>

          {/* Targets */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
              3-Month Targets
            </p>
            <div className="space-y-2.5">
              <ProgressBar
                label="Followers"
                current={parseInt(f.ig_f || 0)}
                target={parseInt(f.target_3m_followers || 0)}
                color="bg-violet-500"
              />
              <ProgressBar
                label="Leads"
                current={parseInt(f.cur_leads || 0)}
                target={parseInt(f.target_3m_leads || 0)}
                color="bg-teal-500"
              />
              <ProgressBar
                label="Revenue"
                current={parseInt(f.dig_rev || 0)}
                target={parseInt(f.target_3m_revenue || 0)}
                color="bg-amber-500"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Business info */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Business
              </p>
              <table className="w-full text-sm">
                {[
                  ["Audience", f.audience],
                  ["Objective", f.main_obj?.replace(/_/g, " ")],
                  ["USP", f.usp],
                  ["Budget", f.marketing_budget],
                  ["Ads Budget", f.ads_budget],
                  ["ROI Timeframe", f.roi_timeframe?.replace(/_/g, " ")],
                  ["Team Size", f.employee_count + " employees"],
                  ["Digital Rating", `${f.digital_rating}/10`],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <td className="py-1 pr-3 text-slate-400 font-medium w-32">
                      {k}
                    </td>
                    <td className="py-1 text-slate-700">{v || "—"}</td>
                  </tr>
                ))}
              </table>
            </div>

            {/* Platforms & challenges */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  Platforms
                </p>
                <PlatformDots platforms={f.platforms || []} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  Challenges
                </p>
                <div className="flex flex-wrap gap-1">
                  {(f.challenges || []).map((c) => (
                    <span
                      key={c}
                      className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full"
                    >
                      {c.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  Content Types
                </p>
                <div className="flex flex-wrap gap-1">
                  {(f.content_types || []).map((c) => (
                    <span
                      key={c}
                      className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
                    >
                      {c.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* URLs */}
          {f.urls && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                Links
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(f.urls)
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <a
                      key={k}
                      href={v.startsWith("http") ? v : `https://${v}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-violet-600 hover:text-violet-800 underline underline-offset-2"
                    >
                      {k}
                    </a>
                  ))}
              </div>
            </div>
          )}

          {f.final_notes && (
            <div className="bg-amber-50 rounded-xl px-4 py-3 text-sm text-amber-800">
              <span className="font-semibold">Notes: </span>
              {f.final_notes}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function WorkflowDashboard() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const limit = 10;

  const fetchData = useCallback(async (p) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/workflow?page=${p}&limit=${limit}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json.data || []);
      setTotal(json.total || 0);
      setPages(json.pages || 1);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  const filtered = data.filter((s) => {
    const q = search.toLowerCase();
    return (
      !q ||
      s.form.company_name?.toLowerCase().includes(q) ||
      s.form.contact_name?.toLowerCase().includes(q) ||
      s.form.industry?.toLowerCase().includes(q)
    );
  });

  // Summary stats
  const totalLeads = data.reduce(
    (a, s) => a + parseInt(s.form.cur_leads || 0),
    0
  );
  const totalRevenue = data.reduce(
    (a, s) => a + parseInt(s.form.dig_rev || 0),
    0
  );
  const avgRating =
    data.length > 0
      ? (
          data.reduce((a, s) => a + (s.form.digital_rating || 0), 0) /
          data.length
        ).toFixed(1)
      : "—";

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Workflow Submissions
            </h1>
            <p className="text-sm text-slate-500">{total} total entries</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="8" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35"
                />
              </svg>
              <input
                type="text"
                placeholder="Search company, contact…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 w-56 text-black"
              />
            </div>
            <button
              onClick={() => fetchData(page)}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "Submissions",
              value: total,
              bg: "bg-violet-50 border-violet-100",
              txt: "text-violet-900",
            },
            {
              label: "Total Leads",
              value: totalLeads.toLocaleString(),
              bg: "bg-teal-50 border-teal-100",
              txt: "text-teal-900",
            },
            {
              label: "Avg. Digital Score",
              value: `${avgRating}/10`,
              bg: "bg-amber-50 border-amber-100",
              txt: "text-amber-900",
            },
            {
              label: "Total Dig. Revenue",
              value: fmt(totalRevenue),
              bg: "bg-emerald-50 border-emerald-100",
              txt: "text-emerald-900",
            },
          ].map((s) => (
            <div
              key={s.label}
              className={`rounded-2xl border p-4 ${s.bg} ${s.txt}`}
            >
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs font-medium opacity-70 mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Submissions list */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <svg
              className="animate-spin w-6 h-6 mr-3"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3V4a8 8 0 00-8 8h4z"
              />
            </svg>
            Loading submissions…
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 text-red-700 text-sm">
            <strong>Error:</strong> {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-sm">
            No submissions found.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((s, i) => (
              <ExpandableCard key={s._id} submission={s} index={i} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-100 transition-colors"
            >
              ← Prev
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 text-sm rounded-lg border transition-colors ${
                  p === page
                    ? "bg-violet-600 text-white border-violet-600"
                    : "border-slate-200 hover:bg-slate-100"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages}
              className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-100 transition-colors"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}