import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import auditReportService from "./auditReportService";
import { toast } from "react-toastify";
import { useAuth } from "@/utils/authUtils";
import AuditPaywallModal from "./AuditPaywallModal";

export default function RevealPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [latestReport, setLatestReport] = useState(null);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [isClientUser, setIsClientUser] = useState(false);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        setLoading(true);
        const res = await auditReportService.getMyReports();
        if (res.success && res.data.length > 0) setLatestReport(res.data[0]);
        if (res.success) setIsClientUser(!!res.isClient);
      } catch (err) {
        toast.error("Failed to load audit reports.");
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  const handleDownloadClick = () => {
    if (isClientUser && latestReport && !latestReport.isPaid) {
      setIsPaywallOpen(true);
    } else if (latestReport) {
      window.open(auditReportService.downloadReportUrl(latestReport._id), "_blank");
    }
  };

  const handlePaymentSuccess = (reportId) => {
    setLatestReport((prev) => (prev && prev._id === reportId ? { ...prev, isPaid: true } : prev));
    window.open(auditReportService.downloadReportUrl(reportId), "_blank");
  };

  return (
    <div
      className="min-h-screen relative overflow-x-hidden flex flex-col"
      style={{ background: "#0A0A0A", color: "#FFFFFF" }}
    >
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,900;1,700&family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Hero Section Wrapper with absolute background */}
        <div className="relative w-full overflow-hidden flex-1 flex flex-col">
          {/* Atmospheric Background for Hero Section only */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              alt="High-impact cinematic background with data visualizations"
              className="w-full h-full object-cover mix-blend-screen"
              style={{ opacity: 0.45 }}
              src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/yindrl07mz3adjek2mmq.webp"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.38) 50%, rgba(10,10,10,1) 100%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.18) 40%, transparent 100%)" }} />
          </div>

          {/* Hero Section */}
          <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 max-w-5xl mx-auto w-full">
            {/* Eyebrow */}
            <p
              className="text-xs tracking-[0.4em] uppercase mb-8 animate-pulse"
              style={{ fontFamily: "Inter, sans-serif", color: "#b90012" }}
            >
              Define. Design. Deliver.
            </p>

            {/* Headline */}
            <h1
              className="font-black leading-tight mb-8 text-white"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 9vw, 110px)",
                lineHeight: "1.05",
                letterSpacing: "-0.02em",
              }}
            >
              YOUR DIGITAL
              <br />
              EVOLUTION{" "}
              <span
                className="italic"
                style={{
                  color: "#b90012",
                  textShadow: "0 0 30px rgba(185,0,18,0.6)",
                  display: "inline-block",
                }}
              >
                REPORT
              </span>
            </h1>

            <p
              className="max-w-2xl mx-auto text-lg md:text-xl mb-12"
              style={{ fontFamily: "Inter, sans-serif", color: "#d9dadc" }}
            >
              A comprehensive, high-stakes analysis of your digital footprint, performance metrics, and strategic opportunities.
            </p>

            {/* Report Card or Loading */}
            {loading ? (
              <div className="flex flex-col items-center gap-4 py-12">
                <Loader2 className="w-10 h-10 animate-spin" style={{ color: "#b90012" }} />
                <span className="text-xs tracking-widest uppercase" style={{ color: "#5f5e5e" }}>Retrieving Audit Ledger...</span>
              </div>
            ) : latestReport ? (
              <div className="flex flex-col sm:flex-row gap-8 items-center justify-center w-full">
                <button
                  onClick={handleDownloadClick}
                  className="w-full sm:w-auto px-10 py-5 text-white font-semibold uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:-translate-y-1 active:scale-95"
                  style={{
                    background: "#b90012",
                    border: "1px solid rgba(185,0,18,0.5)",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    boxShadow: "0 0 40px rgba(185,0,18,0.5)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 60px rgba(185,0,18,0.8)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 40px rgba(185,0,18,0.5)"; }}
                >
                  <span>{isClientUser && !latestReport.isPaid ? "Unlock Report" : "Initialize Download"}</span>
                  <span className="material-symbols-outlined text-xl">
                    {isClientUser && !latestReport.isPaid ? "lock" : "download"}
                  </span>
                </button>

                {/* Report Info Glass Panel */}
                <div
                  className="w-full sm:w-auto flex flex-col items-center sm:items-start px-6 py-3 rounded"
                  style={{
                    background: "rgba(10,10,10,0.4)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span className="text-xs uppercase tracking-wider mb-1" style={{ color: "#d9dadc" }}>
                    {latestReport.category}
                  </span>
                  <span
                    className="font-bold tracking-widest text-white"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", letterSpacing: "0.1em" }}
                  >
                    {latestReport.auditPeriod}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm" style={{ color: "#5f5e5e" }}>No reports assigned yet. Contact your account executive.</p>
            )}
          </section>
        </div>

        {/* Why This Audit Matters — 3 Benefit Cards */}
        <section className="px-6 md:px-16 max-w-6xl mx-auto w-full mb-24">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-semibold uppercase tracking-widest mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: "#FFFFFF" }}
            >
              Why This Audit Matters
            </h2>
            <div className="h-0.5 w-24 mx-auto" style={{ background: "#b90012", boxShadow: "0 0 10px rgba(185,0,18,1)" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "speed", title: "Uncover Performance Bottlenecks", desc: "Identify exactly what's slowing down your user experience and conversion rates." },
              { icon: "search_insights", title: "Optimize Search Visibility", desc: "Strategic insights to climb search rankings and reach your target audience more effectively." },
              { icon: "accessibility_new", title: "Enhance Accessibility Standards", desc: "Ensure your digital presence is inclusive and compliant with global web standards." },
            ].map((card) => (
              <div
                key={card.icon}
                className="group flex flex-col items-center text-center p-8 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(10,10,10,0.4)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(185,0,18,0.25)",
                  boxShadow: "inset 0 0 20px rgba(185,0,18,0.08)",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(185,0,18,0.75)"; e.currentTarget.style.boxShadow = "inset 0 0 30px rgba(185,0,18,0.18), 0 0 30px rgba(185,0,18,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(185,0,18,0.25)"; e.currentTarget.style.boxShadow = "inset 0 0 20px rgba(185,0,18,0.08)"; }}
              >
                <span
                  className="material-symbols-outlined mb-6"
                  style={{ fontSize: "48px", color: "#b90012", textShadow: "0 0 30px rgba(185,0,18,0.6)" }}
                >
                  {card.icon}
                </span>
                <h3
                  className="text-xl font-medium mb-4 text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-sm" style={{ color: "#d9dadc", fontFamily: "Inter, sans-serif", lineHeight: "1.6" }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* GET ALL FILES CTA */}
        <section className="px-6 md:px-16 max-w-5xl mx-auto w-full mb-24">
          <div
            className="px-6 py-12 md:p-24 text-center relative overflow-hidden"
            style={{
              background: "rgba(10,10,10,0.4)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to right, rgba(185,0,18,0.08), transparent, rgba(185,0,18,0.08))" }}
            />

            <span
              className="inline-block border px-4 py-2 text-xs uppercase tracking-[0.3em] mb-8 rounded-full"
              style={{
                borderColor: "#b90012",
                color: "#b90012",
                background: "rgba(185,0,18,0.1)",
                fontFamily: "Inter, sans-serif",
                boxShadow: "0 0 15px rgba(185,0,18,0.3)",
              }}
            >
              Classified Insights
            </span>

            <h2
              className="text-3xl md:text-5xl font-black mb-10 text-white"
              style={{ fontFamily: "'Playfair Display', serif", lineHeight: "1.15" }}
            >
              "Visuals that Captivate.{" "}
              <br />
              Data that{" "}
              <span
                className="italic"
                style={{ color: "#b90012", textShadow: "0 0 30px rgba(185,0,18,0.6)" }}
              >
                Converts.
              </span>
              "
            </h2>

            <button
              onClick={() => navigate("/audit-reports/archive")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-4 font-semibold uppercase tracking-widest transition-all duration-300 mx-auto hover:bg-white hover:text-black whitespace-nowrap"
              style={{
                border: "2px solid rgba(255,255,255,0.3)",
                color: "#FFFFFF",
                background: "rgba(10,10,10,0.5)",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                boxShadow: "0 0 20px rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 30px rgba(255,255,255,0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
            >
              <span>GET ALL FILES</span>
              <span className="material-symbols-outlined text-lg">lock_open</span>
            </button>
          </div>
        </section>
      </div>
      <AuditPaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        report={latestReport}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
