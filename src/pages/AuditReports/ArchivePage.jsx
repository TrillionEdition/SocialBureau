import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import auditReportService from "./auditReportService";
import { toast } from "react-toastify";
import { useAuth } from "@/utils/authUtils";
import AuditPaywallModal from "./AuditPaywallModal";

export default function ArchivePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isClientUser, setIsClientUser] = useState(false);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await auditReportService.getMyReports();
      if (res.success) {
        setReports(res.data);
        setIsClientUser(!!res.isClient);
      }
    } catch (err) {
      toast.error("Failed to load reports. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReports(); }, []);

  const handleDownloadClick = async (report) => {
    if (isClientUser && !report.isPaid) {
      setSelectedReport(report);
      setIsPaywallOpen(true);
    } else {
      try {
        await auditReportService.downloadReport(report._id);
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.message || "Failed to download PDF";
        toast.error(errorMsg);
      }
    }
  };

  const handlePaymentSuccess = (reportId) => {
    setReports((prev) =>
      prev.map((r) => (r._id === reportId ? { ...r, isPaid: true } : r))
    );
    window.open(auditReportService.downloadReportUrl(reportId), "_blank");
  };

  const formatBytes = (bytes) => {
    if (!bytes) return "0 B";
    const k = 1024; const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const filteredReports = reports.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div
      className="min-h-screen"
      style={{ background: "#f9f9fb", color: "#1a1c1d", fontFamily: "Inter, sans-serif" }}
    >
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      {/* Hero Section */}
      <section
        className="relative pt-32 pb-24 px-6 md:px-16 max-w-6xl mx-auto overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="space-y-8 md:col-span-12 text-center">
            <div className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-white mb-2"
              style={{ background: "#0A0A0A" }}>
              Report Archive
            </div>
            <h1
              className="font-bold leading-tight text-black"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(30px, 7vw, 72px)",
                color: "#0A0A0A",
                letterSpacing: "-0.02em",
              }}
            >
              Strategic <br />
              <span style={{ color: "#b90012" }}>Intelligence</span> Library
            </h1>
            <p className="text-lg max-w-lg mx-auto" style={{ color: "#5f5e5e" }}>
              A curated collection of your comprehensive digital analysis and performance reports.
            </p>

            {/* Search Box */}
            <div className="relative max-w-sm mx-auto mt-8">
              <span
                className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "#5f5e5e", fontSize: "20px" }}
              >
                search
              </span>
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent pl-8 pr-4 py-2 text-base focus:outline-none placeholder-gray-400"
                style={{
                  borderBottom: "1px solid rgba(10,10,10,0.2)",
                  borderTop: "none", borderLeft: "none", borderRight: "none",
                  borderRadius: 0, color: "#0A0A0A",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reports Grid */}
      <section
        className="py-24 px-6 md:px-16"
        style={{ background: "#f9f9fb", borderTop: "1px solid rgba(10,10,10,0.08)" }}
      >
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-8 animate-pulse" style={{ borderTop: "1px solid rgba(10,10,10,0.1)" }}>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-6" />
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-8" />
                  <div className="h-10 bg-gray-200 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : filteredReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              {filteredReports.map((report, idx) => (
                <article
                  key={report._id}
                  className={`group relative flex flex-col bg-white pt-8 px-6 pb-8 transition-transform duration-300 hover:-translate-y-2 ${idx % 2 === 1 ? "md:mt-16" : ""}`}
                  style={{
                    borderTop: "1px solid rgba(10,10,10,0.12)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs uppercase tracking-widest font-bold"
                        style={{ color: "#5f5e5e", fontFamily: "Inter, sans-serif" }}
                      >
                        {report.category}
                      </span>
                      {isClientUser && (
                        <span
                          className="px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider rounded-sm"
                          style={{
                            background: report.isPaid ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                            color: report.isPaid ? "#10b981" : "#ef4444",
                            border: report.isPaid ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid rgba(239, 68, 68, 0.25)",
                          }}
                        >
                          {report.isPaid ? "Paid" : "Locked"}
                        </span>
                      )}
                    </div>
                    <span
                      className="text-xs font-bold"
                      style={{ color: "#5f5e5e", fontFamily: "Inter, sans-serif" }}
                    >
                      {new Date(report.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  </div>

                  <h2
                    className="font-semibold mb-4 transition-colors"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(24px, 3vw, 32px)",
                      lineHeight: "1.2",
                      color: "#0A0A0A",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#b90012"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#0A0A0A"; }}
                  >
                    {report.title}
                  </h2>

                  {report.description && (
                    <p
                      className="text-base mb-8 leading-relaxed"
                      style={{ color: "#5f5e5e", fontFamily: "Inter, sans-serif" }}
                    >
                      {report.description}
                    </p>
                  )}

                  {!report.description && (
                    <p
                      className="text-base mb-8 leading-relaxed italic"
                      style={{ color: "#d9dadc", fontFamily: "Inter, sans-serif" }}
                    >
                      Audit period: {report.auditPeriod}
                    </p>
                  )}

                  <div className="mt-auto flex flex-wrap gap-4 items-center justify-between">
                    <button
                      onClick={() => handleDownloadClick(report)}
                      className="flex items-center gap-2 px-6 py-3 text-white text-sm font-semibold uppercase tracking-widest transition-all hover:-translate-y-0.5"
                      style={{
                        background: "#b90012",
                        border: "1px solid #b90012",
                        fontFamily: "Inter, sans-serif",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#0A0A0A"; e.currentTarget.style.borderColor = "#0A0A0A"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#b90012"; e.currentTarget.style.borderColor = "#b90012"; }}
                    >
                      <span>{isClientUser && !report.isPaid ? "Unlock PDF" : "Download PDF"}</span>
                      <span className="material-symbols-outlined text-sm">
                        {isClientUser && !report.isPaid ? "lock" : "download"}
                      </span>
                    </button>
                    <div className="flex items-center gap-4">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "#0A0A0A", fontFamily: "Inter, sans-serif" }}
                      >
                        ₹{(typeof report.amt === "number" && !isNaN(report.amt) ? report.amt : 0)}
                      </span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: "#5f5e5e", fontFamily: "Inter, sans-serif" }}
                      >
                        {formatBytes(report.pdfSize)}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-24 text-center max-w-lg mx-auto">
              <span className="material-symbols-outlined text-6xl mb-6 block" style={{ color: "#d9dadc" }}>
                description
              </span>
              <h3
                className="text-2xl font-semibold mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: "#0A0A0A" }}
              >
                No Reports Found
              </h3>
              <p className="text-base mb-8" style={{ color: "#5f5e5e" }}>
                {searchQuery
                  ? "No reports match your search criteria."
                  : "No audit reports have been assigned to your account yet."}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-8 py-3 text-white text-sm font-semibold uppercase tracking-widest"
                  style={{ background: "#b90012", fontFamily: "Inter, sans-serif" }}
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <AuditPaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        report={selectedReport}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
