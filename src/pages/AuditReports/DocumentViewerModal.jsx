import React, { useState, useEffect, useRef } from "react";
import { X, Download, Maximize, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, File } from "lucide-react";
import { toast } from "react-toastify";

export default function DocumentViewerModal({ 
  isOpen, 
  onClose, 
  report, 
  pdfUrl 
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const iframeRef = useRef(null);

  if (!isOpen || !report || !pdfUrl) return null;

  const handleDownload = () => {
    try {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = report.fileName || `${report.title}.pdf`;
      link.click();
      toast.success("Download started!");
    } catch (err) {
      toast.error("Failed to download document");
      console.error("Download error:", err);
    }
  };

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen().catch(err => {
          console.error("Fullscreen request failed:", err);
        });
      }
    }
  };

  const handleZoom = (direction) => {
    setZoom((prev) => {
      const newZoom = direction === "in" ? prev + 10 : prev - 10;
      return Math.max(50, Math.min(200, newZoom));
    });
  };

  const handleIframeLoad = () => {
    setLoading(false);
    setError(null);
  };

  const handleIframeError = () => {
    setLoading(false);
    setError("Failed to load document. Please try downloading instead.");
  };

  const formatFileSize = (bytes) => {
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
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-[11000] flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ background: "rgba(10, 10, 10, 0.95)" }}>
      <div className="w-full h-full max-w-6xl flex flex-col relative"
        style={{
          background: "#0a0a0a",
          border: "1px solid rgba(185, 0, 18, 0.2)",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "rgba(185, 0, 18, 0.1)" }}>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="p-2 rounded"
              style={{ background: "rgba(185, 0, 18, 0.1)" }}>
              <File size={20} style={{ color: "#b90012" }} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-semibold text-white truncate">{report.title}</h2>
              <p className="text-xs text-gray-400 truncate">
                {report.category && `${report.category} • `}
                {formatFileSize(report.fileSize)} • {formatDate(report.createdAt)}
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="ml-4 p-2 rounded hover:bg-zinc-800 transition-colors text-gray-300 hover:text-white"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-3 border-b bg-zinc-900/50"
          style={{ borderColor: "rgba(185, 0, 18, 0.1)" }}>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleZoom("out")}
              className="p-2 rounded hover:bg-zinc-800 transition-colors text-gray-300 hover:text-white disabled:opacity-50"
              disabled={zoom <= 50}
              title="Zoom out"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-sm text-gray-400 min-w-[50px] text-center">{zoom}%</span>
            <button
              onClick={() => handleZoom("in")}
              className="p-2 rounded hover:bg-zinc-800 transition-colors text-gray-300 hover:text-white disabled:opacity-50"
              disabled={zoom >= 200}
              title="Zoom in"
            >
              <ZoomIn size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-zinc-800 transition-colors text-gray-300 hover:text-white"
              title="Download document"
            >
              <Download size={18} />
              <span className="text-sm">Download</span>
            </button>
            <button
              onClick={handleFullscreen}
              className="p-2 rounded hover:bg-zinc-800 transition-colors text-gray-300 hover:text-white"
              title="Fullscreen"
            >
              <Maximize size={18} />
            </button>
          </div>
        </div>

        {/* Viewer Content */}
        <div className="flex-1 overflow-auto relative bg-black">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-4 border-gray-600 border-t-red-600 rounded-full animate-spin" />
                <p className="text-gray-400 text-sm">Loading document...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <div className="text-center">
                <p className="text-red-400 mb-4">{error}</p>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                >
                  Download Instead
                </button>
              </div>
            </div>
          )}

          {/* PDF Viewer via iframe */}
          <iframe
            ref={iframeRef}
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            className="w-full h-full border-none"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
            }}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            title={`Document: ${report.title}`}
            allowFullScreen
          />
        </div>

        {/* Footer Info */}
        <div className="px-6 py-3 border-t text-xs text-gray-400 bg-zinc-900/50 flex justify-between"
          style={{ borderColor: "rgba(185, 0, 18, 0.1)" }}>
          <span>{report.description || "Professional document"}</span>
          <span>Secure viewing • Encrypted connection</span>
        </div>
      </div>
    </div>
  );
}
