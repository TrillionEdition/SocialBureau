import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Download, ChevronLeft, ArrowUpRight, Lock, CheckCircle, Clock, FileText, Eye, Share2 } from "lucide-react";
import { toast } from "react-toastify";
import auditReportService from "./auditReportService";
import { useAuth } from "@/utils/authUtils";

export default function DocumentViewerPage() {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  const [report, setReport] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get the report details from passed location state or fetch
        const reportData = location.state?.report;
        if (reportData) {
          setReport(reportData);
        }

        // Fetch the secure PDF URL
        const res = await auditReportService.downloadReport(reportId);
        if (res.success && res.url) {
          setPdfUrl(res.url);
        }
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.message || "Failed to load document";
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    if (reportId) {
      fetchDocument();
    }
  }, [reportId, location.state]);

  const handleDownload = () => {
    if (!pdfUrl) return;
    try {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = report?.pdfFileName || `${report?.title}.pdf`;
      link.click();
      toast.success("Download started!");
    } catch (err) {
      toast.error("Failed to download document");
      console.error("Download error:", err);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: report?.title,
        text: report?.description || "Check out this audit report",
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  const formatBytes = (bytes) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a", color: "#ffffff" }}>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      {/* Header Navigation */}
      <header className="border-b sticky top-0 z-40" style={{ borderColor: "rgba(185, 0, 18, 0.1)", background: "rgba(10, 10, 10, 0.98)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Back Button & Breadcrumb */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/audit-reports/archive")}
              className="p-2 rounded hover:bg-zinc-800 transition-colors text-gray-300 hover:text-white"
              title="Back to Archive"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Archive</span>
              <ChevronLeft size={16} style={{ color: "rgba(185, 0, 18, 0.5)" }} className="rotate-180" />
              <span style={{ color: "#b90012" }} className="font-medium">{report?.title ? report.title.substring(0, 30) : "Document"}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={!pdfUrl}
              className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all text-white disabled:opacity-50"
              style={{ background: "#b90012" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#8b0010"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#b90012"; }}
              title="Download document"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
          {/* Sidebar - Document Info */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-24 space-y-6">
              {/* Document Card */}
              <div className="rounded-lg p-6 border" style={{ background: "rgba(18, 18, 20, 0.8)", borderColor: "rgba(185, 0, 18, 0.15)" }}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-3 rounded" style={{ background: "rgba(185, 0, 18, 0.1)" }}>
                    <FileText size={20} style={{ color: "#b90012" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1
                      className="text-lg font-semibold leading-tight mb-1 truncate"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {report?.title}
                    </h1>
                    <p className="text-xs text-gray-500">{report?.category}</p>
                  </div>
                </div>

                {report?.description && (
                  <p className="text-sm text-gray-400 mb-4 line-clamp-3">{report.description}</p>
                )}

                <div className="border-t pt-4" style={{ borderColor: "rgba(185, 0, 18, 0.1)" }}>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">File Size</span>
                      <span className="font-medium">{formatBytes(report?.pdfSize)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Published</span>
                      <span className="font-medium">{formatDate(report?.createdAt)}</span>
                    </div>
                    {report?.auditPeriod && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Audit Period</span>
                        <span className="font-medium">{report.auditPeriod}</span>
                      </div>
                    )}
                    {report?.amt !== undefined && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Access</span>
                        <span className="font-medium text-green-400 flex items-center gap-1">
                          <CheckCircle size={14} />
                          Paid
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="rounded-lg p-4 border" style={{ background: "rgba(16, 185, 129, 0.05)", borderColor: "rgba(16, 185, 129, 0.2)" }}>
                <div className="flex items-start gap-3 mb-2">
                  <Lock size={16} style={{ color: "#10b981", marginTop: "2px" }} />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-green-400">SECURE ACCESS</p>
                    <p className="text-xs text-gray-400 mt-1">This document is encrypted and restricted to authorized users only.</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <button
                  onClick={handleDownload}
                  disabled={!pdfUrl}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded font-medium transition-all text-white disabled:opacity-50"
                  style={{ background: "#b90012" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#8b0010"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#b90012"; }}
                >
                  <Download size={16} />
                  Download
                </button>
              </div>

              {/* Metadata */}
              <div className="rounded-lg p-4 border text-xs space-y-2" style={{ background: "rgba(18, 18, 20, 0.5)", borderColor: "rgba(185, 0, 18, 0.1)" }}>
                <div>
                  <p className="text-gray-500 mb-1">Uploaded by</p>
                  <p className="text-gray-300">{report?.uploadedBy || "Admin"}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">File Name</p>
                  <p className="text-gray-300 break-all">{report?.pdfFileName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Viewer */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div
              className="rounded-lg border overflow-hidden"
              style={{
                background: "#000000",
                borderColor: "rgba(185, 0, 18, 0.1)",
                minHeight: "600px",
                boxShadow: "0 20px 40px rgba(185, 0, 18, 0.1)",
              }}
            >
              {/* Viewer Toolbar */}
              <div
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{ borderColor: "rgba(185, 0, 18, 0.1)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    {zoom}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoom(Math.max(50, zoom - 10))}
                    disabled={zoom <= 50}
                    className="p-2 rounded hover:bg-zinc-800 transition-colors text-gray-400 hover:text-gray-200 disabled:opacity-50"
                    title="Zoom out"
                  >
                    <span className="material-symbols-outlined text-sm">zoom_out</span>
                  </button>
                  <button
                    onClick={() => setZoom(Math.min(200, zoom + 10))}
                    disabled={zoom >= 200}
                    className="p-2 rounded hover:bg-zinc-800 transition-colors text-gray-400 hover:text-gray-200 disabled:opacity-50"
                    title="Zoom in"
                  >
                    <span className="material-symbols-outlined text-sm">zoom_in</span>
                  </button>
                  <div className="w-px h-6 bg-zinc-700" />
                  <button
                    onClick={() => setZoom(100)}
                    className="px-3 py-2 rounded text-xs font-medium transition-colors text-gray-300 hover:text-white hover:bg-zinc-800"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* PDF Viewer Area */}
              <div className="relative bg-black overflow-auto flex items-center justify-center" style={{ height: "calc(100vh - 300px)", minHeight: "600px" }}>
                {loading && (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-10 h-10 border-4 border-gray-600 border-t-red-600 rounded-full animate-spin" />
                    <p className="text-gray-400 text-sm">Loading document...</p>
                  </div>
                )}

                {error && (
                  <div className="flex flex-col items-center justify-center gap-4 text-center px-6">
                    <div className="p-4 rounded-lg bg-red-900/20 border border-red-900/50">
                      <p className="text-red-400 text-sm font-medium mb-3">{error}</p>
                      <button
                        onClick={handleDownload}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition-colors"
                      >
                        Download Instead
                      </button>
                    </div>
                  </div>
                )}

                {pdfUrl && !error && (
                  <iframe
                    src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                    className="w-full h-full border-none"
                    style={{
                      transform: `scale(${zoom / 100})`,
                      transformOrigin: "top center",
                    }}
                    title={`Document: ${report?.title}`}
                    allowFullScreen
                  />
                )}
              </div>

              {/* Footer Info */}
              <div
                className="px-6 py-3 border-t text-xs text-gray-500 flex justify-between items-center"
                style={{ borderColor: "rgba(185, 0, 18, 0.1)" }}
              >
                <span>Secure viewing • Encrypted connection</span>
                <span className="flex items-center gap-1">
                  <Eye size={14} />
                  Views protected
                </span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-lg p-4 border" style={{ background: "rgba(18, 18, 20, 0.5)", borderColor: "rgba(185, 0, 18, 0.1)" }}>
                <p className="text-xs text-gray-500 mb-2">Access Level</p>
                <p className="text-sm font-semibold text-green-400 flex items-center gap-2">
                  <CheckCircle size={16} />
                  Premium
                </p>
              </div>
              <div className="rounded-lg p-4 border" style={{ background: "rgba(18, 18, 20, 0.5)", borderColor: "rgba(185, 0, 18, 0.1)" }}>
                <p className="text-xs text-gray-500 mb-2">Last Updated</p>
                <p className="text-sm font-semibold text-gray-300">{formatDate(report?.updatedAt || report?.createdAt)}</p>
              </div>
              <div className="rounded-lg p-4 border" style={{ background: "rgba(18, 18, 20, 0.5)", borderColor: "rgba(185, 0, 18, 0.1)" }}>
                <p className="text-xs text-gray-500 mb-2">Connection</p>
                <p className="text-sm font-semibold text-green-400 flex items-center gap-2">
                  <CheckCircle size={16} />
                  Secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Archive CTA */}
      <div className="mt-12 pb-12 text-center">
        <button
          onClick={() => navigate("/audit-reports/archive")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded font-medium transition-all text-gray-300 hover:text-white hover:bg-zinc-800 border"
          style={{ borderColor: "rgba(185, 0, 18, 0.2)" }}
        >
          <ChevronLeft size={16} />
          Back to Archive
        </button>
      </div>
    </div>
  );
}
