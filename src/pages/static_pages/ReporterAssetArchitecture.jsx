import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowRight,
  BarChart3,
  Clock,
  Database,
  Network,
  Play,
  ShieldCheck,
  UserCog,
  Users,
  Youtube,
} from "lucide-react";
import PagePaymentGate from "../../components/PagePaymentGate";
import { BASE_URL } from "@/utils/urls";

const RED = "#E31E24";
const dashboardIcons = { youtube: Youtube, users: Users, clock: Clock, security: ShieldCheck };
const scopeIcons = {
  database: Database,
  youtube: Youtube,
  security: ShieldCheck,
  users: UserCog,
  chart: BarChart3,
  network: Network,
};

function Hero({ content }) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
        style={{
          backgroundImage:
            "url('https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/socialbureau-media/images/805a8503-ccb4-4cc7-a7d1-dfd3a6b1a85b.png')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[#08080c] sm:bg-gradient-to-r sm:from-black/85 sm:via-black/60 sm:to-black/30" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:py-28">
        <div className="max-w-xl">
          <div className="mb-4 flex items-center gap-2 text-[11px] font-medium tracking-wide text-white/50 sm:mb-5 sm:text-xs">
            <span className="h-px w-6 shrink-0" style={{ backgroundColor: RED }} />
            {content.eyebrow}
          </div>
          <h1 className="text-3xl font-semibold leading-[1.12] text-white sm:text-4xl md:text-5xl md:leading-[1.08]">
            {content.headline.map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {index > 1 ? <span style={{ color: RED }}>{line}</span> : line}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 sm:mt-6 sm:text-[15px]">
            {content.description}
          </p>
          <a
            href="#core-scope"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:mt-8"
            style={{ backgroundColor: RED }}
          >
            {content.explore}
            <ArrowRight className="h-4 w-4 shrink-0" />
          </a>
          <div className="mt-9 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 sm:mt-10 sm:max-w-md sm:gap-6 sm:pt-8">
            {content.stats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-xl font-semibold text-white sm:text-2xl md:text-3xl">
                  {value}
                </div>
                <div className="mt-1 text-[11px] text-white/50 sm:text-xs md:text-sm">
                  {label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2.5 text-[11px] text-white/40 sm:mt-6 sm:gap-3 sm:text-xs">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            {content.monitoring}
          </div>
        </div>
      </div>
    </section>
  );
}

function Dashboard({ content }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d13]">
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr]">
        <aside className="hidden border-white/10 p-4 md:block md:border-r">
          <div className="mb-4 flex items-center gap-2 text-xs font-medium text-white/70">
            <Youtube className="h-4 w-4 shrink-0" style={{ color: RED }} />
            {content.brand}
          </div>
          <div className="mb-3 text-[10px] uppercase tracking-wide text-white/30">
            {content.ecosystem}
          </div>
          <ul className="space-y-1 text-[13px]">
            {content.sidebar.map((item, index) => (
              <li
                key={item}
                className={`group relative rounded-md px-2.5 py-1.5 ${
                  index === 0
                    ? "text-white"
                    : "cursor-not-allowed text-white/45 hover:text-white/70"
                }`}
                style={index === 0 ? { backgroundColor: `${RED}26` } : {}}
              >
                {item}
                {index > 0 && (
                  <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-black px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                    Locked
                  </span>
                )}
              </li>
            ))}
          </ul>
        </aside>
        <div className="p-3.5 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] text-white/35 sm:text-xs">{content.updated}</span>
            <span className="rounded-md border border-white/10 px-3 py-1 text-[11px] text-white/60 sm:text-xs">
              {content.period}
            </span>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-2.5 sm:mb-5 sm:grid-cols-4 sm:gap-3">
            {content.stats.map(({ icon, value, label, color }) => {
              const Icon = dashboardIcons[icon] || BarChart3;
              return (
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
                  <div className="text-base font-semibold text-white sm:text-lg">{value}</div>
                  <div className="text-[10.5px] text-white/40 sm:text-[11px]">{label}</div>
                </div>
              );
            })}
          </div>
          <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr]">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4">
              <div className="mb-3 flex flex-col gap-2 xs:flex-row xs:items-center xs:justify-between">
                <span className="text-sm font-medium text-white/80">{content.performanceTitle}</span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/40">
                  {content.series.map((series) => (
                    <span key={series.key} className="flex items-center gap-1">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: series.color }}
                      />
                      {series.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="h-[180px] sm:h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={content.performance} barGap={2}>
                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
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
                    {content.series.map((series) => (
                      <Bar
                        key={series.key}
                        dataKey={series.key}
                        fill={series.color}
                        radius={[3, 3, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-white/80">{content.activityTitle}</span>
                <span className="text-[11px] text-white/35">{content.activityLink}</span>
              </div>
              <ul className="space-y-3 sm:space-y-3.5">
                {content.activities.map((activity) => (
                  <li key={activity.time} className="flex items-start gap-2.5">
                    <span
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full ${activity.color}`}
                      style={activity.color === "bg-[--red]" ? { backgroundColor: RED } : {}}
                    />
                    <div>
                      <div className="text-[12px] text-white/75 sm:text-[12.5px]">{activity.title}</div>
                      <div className="text-[10.5px] text-white/35 sm:text-[11px]">{activity.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[10.5px] leading-relaxed text-white/50">
                {content.activityNotice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProtectedContent({ content }) {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#08080c] font-sans antialiased">
      <Hero content={content.hero} />
      <section className="border-t border-white/5 bg-[#0a0a0f]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-8 grid gap-6 sm:mb-10 sm:gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[11px] font-medium text-white/40 sm:text-xs">
                <span className="h-px w-6 shrink-0" style={{ backgroundColor: RED }} />
                {content.overview.eyebrow}
              </div>
              <h2 className="max-w-xl text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-[2.3rem]">
                {content.overview.title}
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/50 sm:mt-4 sm:text-[15px]">
                {content.overview.description}
              </p>
            </div>
            <div className="lg:text-right">
              <p className="mb-4 text-sm leading-relaxed text-white/50 sm:text-[15px]">
                {content.overview.customerDescription}
              </p>
              <a
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 transition-colors hover:border-white/30 hover:text-white sm:w-auto"
                href="#core-scope"
              >
                {content.overview.link}
                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </a>
            </div>
          </div>
          <Dashboard content={content.dashboard} />
        </div>
      </section>
      <section className="border-t border-white/5" id="core-scope">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-3 flex items-center gap-2 text-[11px] font-medium text-white/40 sm:text-xs">
            <span className="h-px w-6 shrink-0" style={{ backgroundColor: RED }} />
            {content.scope.eyebrow}
          </div>
          <h2 className="max-w-2xl text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-[2.1rem]">
            {content.scope.title} <span style={{ color: RED }}>{content.scope.titleAccent}</span>
          </h2>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {content.scope.areas.map((area) => {
              const Icon = scopeIcons[area.icon] || Database;
              return (
                <div
                  key={area.number}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20 sm:p-6"
                >
                  <div className="mb-4 flex items-center gap-3 sm:mb-5">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white sm:h-9 sm:w-9"
                      style={{ backgroundColor: RED }}
                    >
                      {area.number}
                    </span>
                    <Icon className="h-4 w-4 shrink-0 text-white/40" />
                  </div>
                  <h3 className="mb-3 text-[15px] font-medium text-white">{area.title}</h3>
                  <ul className="space-y-2">
                    {area.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] leading-snug text-white/45">
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                          style={{ backgroundColor: RED }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="border-t border-white/5 bg-[#0a0a0f]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:gap-10 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1fr_0.8fr]">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[11px] font-medium text-white/40 sm:text-xs">
              <span className="h-px w-6 shrink-0" style={{ backgroundColor: RED }} />
              {content.future.eyebrow}
            </div>
            <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
              {content.future.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/50 sm:mt-4 sm:text-[15px]">
              {content.future.description}
            </p>
            <ul className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
              {content.future.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2.5 text-sm text-white/70">
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] text-white"
                    style={{ backgroundColor: RED }}
                  >
                    ✓
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <p className="text-sm leading-relaxed text-white/70 sm:text-[15px]">
              &ldquo;{content.future.testimonial}&rdquo;
            </p>
            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-white">{content.future.attribution}</div>
                <div className="text-xs text-white/40">{content.future.attributionRole}</div>
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
      <section className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:gap-8 sm:px-6 sm:py-16 lg:flex-row lg:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[11px] font-medium text-white/40 sm:text-xs">
              <span className="h-px w-6 shrink-0" style={{ backgroundColor: RED }} />
              {content.callToAction.eyebrow}
            </div>
            <h2 className="max-w-xl text-xl font-semibold leading-tight text-white sm:text-2xl md:text-3xl">
              {content.callToAction.title}
            </h2>
          </div>
          <button
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 lg:w-auto"
            style={{ backgroundColor: RED }}
            onClick={() => (window.location.href = "/contact")}
          >
            {content.callToAction.button}
            <ArrowRight className="h-4 w-4 shrink-0" />
          </button>
        </div>
      </section>
    </div>
  );
}

function ReporterAssetArchitectureContent() {
  const [content, setContent] = useState(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    fetch(`${BASE_URL}/payment/page-content/youtube-architecture`, {
      credentials: "include",
      headers,
      signal: controller.signal,
    })
      .then(async (response) => {
        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.success || !result.content) {
          throw new Error(result.message || "Could not load purchased content");
        }
        setContent(result.content);
      })
      .catch((error) => {
        if (error.name !== "AbortError") setLoadError("Paid content could not be loaded. Please refresh and try again.");
      });

    return () => controller.abort();
  }, []);

  if (loadError) {
    return <div className="min-h-screen bg-[#08080c] p-8 text-center text-red-300">{loadError}</div>;
  }
  if (!content) {
    return (
      <div className="min-h-screen bg-[#08080c] p-8 text-center text-white/70">
        Loading purchased content...
      </div>
    );
  }
  return <ProtectedContent content={content} />;
}

export default function ReporterAssetArchitecture() {
  return (
    <PagePaymentGate
      pageSlug="youtube-architecture"
      amount={299}
      title="Unlock YouTube Asset Architecture"
      description="Log in and pay \u20b9299 once to unlock permanent access to this page."
    >
      <ReporterAssetArchitectureContent />
    </PagePaymentGate>
  );
}
