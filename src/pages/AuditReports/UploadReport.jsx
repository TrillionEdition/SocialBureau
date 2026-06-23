import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import auditReportService from "./auditReportService";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const CATEGORIES = [
  "Financial Audit",
  "Compliance Audit",
  "Operational Audit",
  "Social Media Audit",
  "Performance Audit",
  "Security Audit",
  "Tax Audit",
  "Internal Audit",
  "Other",
];

const AdminSidebar = ({ navigate, clients = [] }) => {
  const [adminName, setAdminName] = useState("Crimson Admin");
  const currentPath = window.location.pathname;

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.name) {
          setAdminName(parsed.name);
        }
      }
    } catch (e) {
      console.error("Failed to parse user name:", e);
    }
  }, []);

  return (
    <aside
      className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 border-r z-40 pt-20"
      style={{ background: "#f9f9fb", borderColor: "rgba(10,10,10,0.1)" }}
    >
      <div className="px-6 py-8 flex flex-col h-full">
        <div className="mb-2">
          <div className="text-xl font-bold uppercase tracking-tight" style={{ fontFamily: "'Playfair Display', serif", color: "#b90012" }}>
            {adminName}
          </div>
          <div className="text-xs tracking-widest uppercase mt-1" style={{ color: "#5f5e5e" }}>
            Elite Digital Operations
          </div>
        </div>

        <nav className="flex flex-col gap-1 mt-6">
          <button
            onClick={() => navigate("/admin/audit-reports")}
            className="flex items-center gap-3 px-4 py-3 text-left w-full transition-transform duration-200 hover:translate-x-1"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              letterSpacing: "0.1em",
              color: currentPath === "/admin/audit-reports" ? "#b90012" : "#5f5e5e",
              fontWeight: currentPath === "/admin/audit-reports" ? "700" : "400",
              borderRight: currentPath === "/admin/audit-reports" ? "2px solid #b90012" : "none",
              background: currentPath === "/admin/audit-reports" ? "rgba(185,0,18,0.04)" : "transparent"
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>dashboard</span>
            <span className="uppercase tracking-widest">Dashboard</span>
          </button>
          {clients.slice(0, 6).map((c) => {
            const isClientActive = currentPath === `/admin/audit-reports/client/${c._id}`;
            return (
              <button
                key={c._id}
                onClick={() => navigate(`/admin/audit-reports/client/${c._id}`)}
                className="flex items-center gap-3 px-4 py-3 text-left w-full transition-transform duration-200 hover:translate-x-1"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  color: isClientActive ? "#b90012" : "#5f5e5e",
                  fontWeight: isClientActive ? "700" : "400",
                  borderRight: isClientActive ? "2px solid #b90012" : "none",
                  background: isClientActive ? "rgba(185,0,18,0.04)" : "transparent"
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>person</span>
                <span className="uppercase tracking-widest truncate">{c.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default function UploadReport() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedClientId = searchParams.get("client") || "";

  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(true);

  const [clientId, setClientId] = useState(preselectedClientId);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [auditPeriod, setAuditPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [amt, setAmt] = useState(0);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedReport, setUploadedReport] = useState(null);
  const [editingRate, setEditingRate] = useState(false);
  const [postUploadAmt, setPostUploadAmt] = useState(0);

  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        setClientsLoading(true);
        const res = await auditReportService.adminGetClients(1, 200, "", "");
        if (res.success) setClients(res.data);
      } catch (err) {
        toast.error("Could not load client directory.");
      } finally {
        setClientsLoading(false);
      }
    };
    fetchAllClients();
  }, []);

  const validateAndSetFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") { toast.error("Only PDF files are allowed."); return; }
    if (file.size > MAX_FILE_SIZE_BYTES) { toast.error(`File must be under ${MAX_FILE_SIZE_MB} MB.`); return; }
    setSelectedFile(file);
  };

  const handleDragEnter = useCallback((e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }, []);
  const handleDragOver = useCallback((e) => { e.preventDefault(); e.stopPropagation(); }, []);
  const handleDrop = useCallback((e) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false);
    validateAndSetFile(e.dataTransfer.files?.[0]);
  }, []);

  const formatBytes = (bytes) => {
    if (!bytes) return "0 B";
    const k = 1024; const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleSubmit = async (e, status = "published") => {
    e.preventDefault();
    const resolvedCategory = category === "Other" ? customCategory.trim() : category;
    if (!clientId) return toast.warn("Please select a client.");
    if (!title.trim()) return toast.warn("Report title is required.");
    if (!resolvedCategory) return toast.warn("Report category is required.");
    if (!auditPeriod.trim()) return toast.warn("Audit period is required.");
    if (!selectedFile) return toast.warn("Please attach a PDF file.");

    const formData = new FormData();
    formData.append("pdf", selectedFile);
    formData.append("clientId", clientId);
    formData.append("title", title.trim());
    formData.append("category", resolvedCategory);
    formData.append("auditPeriod", auditPeriod.trim());
    formData.append("description", description.trim());
    formData.append("status", status);
    formData.append("amt", amt);

    try {
      setUploading(true);
      const interval = setInterval(() => setUploadProgress((p) => Math.min(p + 10, 85)), 300);
      const res = await auditReportService.adminUploadReport(formData);
      clearInterval(interval);
      setUploadProgress(100);
      if (res.success) {
        toast.success(status === "published" ? "Report published!" : "Saved as draft.");
        const report = res.data; // controller returns {success,message,data: report}
        if (report) {
          setUploadedReport(report);
          setPostUploadAmt(report.amt !== undefined ? report.amt : 0);
          setEditingRate(true);
        } else {
          setTimeout(() => navigate(`/admin/audit-reports/client/${clientId}`), 800);
        }
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to upload report.");
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const savePostUploadAmt = async () => {
    if (!uploadedReport) return;
    try {
      setUploading(true);
      await auditReportService.adminUpdateReport(uploadedReport._id, { amt: postUploadAmt });
      toast.success("Amount saved.");
      navigate(`/admin/audit-reports/client/${clientId}`);
    } catch (err) {
      toast.error("Failed to save amount.");
    } finally {
      setUploading(false);
      setEditingRate(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#f9f9fb", fontFamily: "Inter, sans-serif" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <AdminSidebar navigate={navigate} clients={clients} />

      <main className="flex-1 md:ml-64 min-h-screen">
        {/* Top bar */}
        <header
          className="hidden md:flex justify-between items-center px-16 h-20 sticky top-0 z-40 backdrop-blur-md"
          style={{ background: "rgba(255,255,255,0.85)", borderBottom: "1px solid rgba(10,10,10,0.1)" }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: "#5f5e5e" }}>
            Upload / New Report
          </span>
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
              }}
              className="flex items-center gap-2 px-5 py-2.5 text-white transition-all duration-300 font-semibold tracking-wider text-xs uppercase"
              style={{
                background: "#b90012",
                boxShadow: "0 4px 12px rgba(185, 0, 18, 0.15)",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0A0A0A";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#b90012";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(185, 0, 18, 0.15)";
              }}
            >
              <span className="material-symbols-outlined text-sm align-middle">logout</span>
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="px-6 md:px-16 py-12">
          {/* Page Title */}
          <div className="mb-16">
            <h1
              className="text-5xl md:text-6xl font-bold text-black mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: "#0A0A0A" }}
            >
              Upload New Report
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: "#5f5e5e" }}>
              Publish an authoritative document to the secure repository. Ensure all metadata is precise before executing the upload.
            </p>
          </div>

          <form onSubmit={(e) => handleSubmit(e, "published")} noValidate>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Metadata */}
              <div
                className="lg:col-span-7 flex flex-col gap-10 p-8 md:p-12"
                style={{
                  background: "#FFFFFF",
                  borderTop: "3px solid #0A0A0A",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
                }}
              >
                <div>
                  <h3
                    className="text-xs tracking-widest uppercase pb-4 mb-8"
                    style={{ borderBottom: "1px solid rgba(10,10,10,0.1)", color: "#0A0A0A" }}
                  >
                    Report Metadata
                  </h3>
                </div>

                {/* Client Select */}
                <div className="relative">
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#5f5e5e" }}>
                    Client <span style={{ color: "#b90012" }}>*</span>
                  </label>
                  {clientsLoading ? (
                    <div className="flex items-center gap-2 py-2 text-sm" style={{ color: "#5f5e5e" }}>
                      <Loader2 className="w-4 h-4 animate-spin" style={{ color: "#b90012" }} />
                      Loading...
                    </div>
                  ) : (
                    <select
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                      className="w-full bg-transparent py-2 pr-8 text-base focus:outline-none"
                      style={{
                        borderBottom: "1px solid rgba(10,10,10,0.2)",
                        borderTop: "none", borderLeft: "none", borderRight: "none",
                        borderRadius: 0,
                        color: "#0A0A0A",
                        fontFamily: "Inter, sans-serif",
                        appearance: "none",
                      }}
                    >
                      <option value="">— Select a client —</option>
                      {clients.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}{c.companyName ? ` — ${c.companyName}` : ""}
                        </option>
                      ))}
                    </select>
                  )}
                  <span className="material-symbols-outlined absolute right-0 bottom-2 pointer-events-none" style={{ color: "#5f5e5e" }}>
                    expand_more
                  </span>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#5f5e5e" }}>
                    Document Title <span style={{ color: "#b90012" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Q4 Performance Overview"
                    className="w-full bg-transparent py-2 text-2xl font-medium focus:outline-none placeholder-gray-300"
                    style={{
                      borderBottom: "1px solid rgba(10,10,10,0.2)",
                      borderTop: "none", borderLeft: "none", borderRight: "none",
                      borderRadius: 0,
                      color: "#0A0A0A",
                      fontFamily: "'Playfair Display', serif",
                    }}
                  />
                </div>

                {/* Category + Audit Period */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#5f5e5e" }}>
                      Category <span style={{ color: "#b90012" }}>*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-transparent py-2 text-base focus:outline-none pr-8"
                        style={{
                          borderBottom: "1px solid rgba(10,10,10,0.2)",
                          borderTop: "none", borderLeft: "none", borderRight: "none",
                          borderRadius: 0, color: "#0A0A0A", appearance: "none",
                        }}
                      >
                        <option value="">— Select —</option>
                        {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                      <span className="material-symbols-outlined absolute right-0 bottom-2 pointer-events-none" style={{ color: "#5f5e5e" }}>
                        expand_more
                      </span>
                    </div>
                    {category === "Other" && (
                      <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Specify category"
                        className="w-full bg-transparent py-2 text-base focus:outline-none mt-3"
                        style={{
                          borderBottom: "1px solid rgba(10,10,10,0.2)",
                          borderTop: "none", borderLeft: "none", borderRight: "none",
                          borderRadius: 0, color: "#0A0A0A",
                        }}
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#5f5e5e" }}>
                      Audit Period <span style={{ color: "#b90012" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={auditPeriod}
                      onChange={(e) => setAuditPeriod(e.target.value)}
                      placeholder="e.g. Q1 FY2026"
                      className="w-full bg-transparent py-2 text-base focus:outline-none"
                      style={{
                        borderBottom: "1px solid rgba(10,10,10,0.2)",
                        borderTop: "none", borderLeft: "none", borderRight: "none",
                        borderRadius: 0, color: "#0A0A0A",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#5f5e5e" }}>
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={amt}
                    onChange={(e) => setAmt(Number(e.target.value))}
                    placeholder="1500"
                    className="w-full bg-transparent py-2 text-base focus:outline-none"
                    style={{
                      borderBottom: "1px solid rgba(10,10,10,0.2)",
                      borderTop: "none", borderLeft: "none", borderRight: "none",
                      borderRadius: 0, color: "#0A0A0A",
                    }}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#5f5e5e" }}>
                    Strategic Description
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a concise executive summary..."
                    className="w-full bg-transparent py-2 text-base focus:outline-none resize-none"
                    style={{
                      borderBottom: "1px solid rgba(10,10,10,0.2)",
                      borderTop: "none", borderLeft: "none", borderRight: "none",
                      borderRadius: 0, color: "#0A0A0A",
                    }}
                  />
                </div>
              </div>

              {/* Right: Upload + Actions */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                {/* Drop Zone */}
                <div
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => !selectedFile && fileInputRef.current?.click()}
                  className="relative cursor-pointer h-80 flex flex-col items-center justify-center p-8 transition-all duration-200"
                  style={{
                    border: `1px dashed ${isDragging || selectedFile ? "#b90012" : "rgba(10,10,10,0.15)"}`,
                    background: isDragging ? "rgba(185,0,18,0.03)" : selectedFile ? "rgba(185,0,18,0.02)" : "#FFFFFF",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => { validateAndSetFile(e.target.files?.[0]); e.target.value = ""; }}
                  />

                  {!selectedFile ? (
                    <>
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                        style={{ background: isDragging ? "rgba(185,0,18,0.1)" : "#eeeef0" }}
                      >
                        <span
                          className="material-symbols-outlined text-4xl"
                          style={{ color: isDragging ? "#b90012" : "#5f5e5e" }}
                        >
                          cloud_upload
                        </span>
                      </div>
                      <h4
                        className="text-2xl font-medium text-center mb-2"
                        style={{ fontFamily: "'Playfair Display', serif", color: isDragging ? "#b90012" : "#0A0A0A" }}
                      >
                        {isDragging ? "Drop it here" : "Select Payload"}
                      </h4>
                      <p className="text-sm text-center max-w-xs" style={{ color: "#5f5e5e" }}>
                        Drag and drop a PDF file here, or click to browse your secure local storage.
                      </p>
                      <div className="mt-8 flex gap-2 items-center">
                        <span
                          className="px-2 py-1 text-white text-xs uppercase tracking-wider"
                          style={{ background: "#0A0A0A" }}
                        >
                          .PDF Only
                        </span>
                        <span className="text-xs" style={{ color: "#5f5e5e" }}>Max {MAX_FILE_SIZE_MB}MB</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center text-center gap-3 z-20 relative">
                      <span className="material-symbols-outlined text-5xl" style={{ color: "#b90012" }}>
                        description
                      </span>
                      <p className="font-semibold text-base" style={{ color: "#0A0A0A" }}>
                        {selectedFile.name}
                      </p>
                      <p className="text-xs" style={{ color: "#5f5e5e" }}>{formatBytes(selectedFile.size)}</p>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                        className="mt-2 text-xs uppercase tracking-wider underline"
                        style={{ color: "#b90012" }}
                      >
                        Remove file
                      </button>
                    </div>
                  )}
                </div>

                {/* Upload Progress */}
                {uploading && (
                  <div>
                    <div className="flex justify-between mb-1 text-xs" style={{ color: "#5f5e5e" }}>
                      <span className="uppercase tracking-widest">Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-0.5" style={{ background: "rgba(10,10,10,0.1)" }}>
                      <div
                        className="h-0.5 transition-all duration-300"
                        style={{ width: `${uploadProgress}%`, background: "#b90012" }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div
                  className="flex flex-col gap-4 p-8"
                  style={{
                    background: "#FFFFFF",
                    borderTop: "1px solid rgba(10,10,10,0.1)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
                  }}
                >
                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full py-4 px-6 text-white text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-3 transition-opacity disabled:opacity-50"
                    style={{ background: "#b90012", fontFamily: "Inter, sans-serif" }}
                  >
                    {uploading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
                    ) : (
                      <><span>Publish Report</span><span className="material-symbols-outlined text-lg">arrow_forward</span></>
                    )}
                  </button>
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={(e) => handleSubmit(e, "draft")}
                    className="w-full py-4 px-6 text-sm font-semibold uppercase tracking-widest border transition-all disabled:opacity-50 hover:translate-x-1"
                    style={{
                      borderColor: "#0A0A0A",
                      color: "#0A0A0A",
                      background: "transparent",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Save as Draft
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Post-upload Amount Edit Modal */}
        {editingRate && (
          <div className="fixed inset-0 z-[11000] flex items-center justify-center p-4" style={{ background: "rgba(10,10,10,0.7)", backdropFilter: "blur(8px)" }}>
            <div className="bg-white w-full max-w-md relative" style={{ borderTop: "3px solid #b90012", boxShadow: "0 30px 60px rgba(0,0,0,0.2)" }}>
              <div className="absolute top-4 right-4">
                <button onClick={() => { setEditingRate(false); navigate(`/admin/audit-reports/client/${clientId}`); }} style={{ color: "#5f5e5e" }}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-medium mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Set Report Rate</h3>
                <p className="text-sm text-muted mb-4" style={{ color: "#5f5e5e" }}>Adjust the amount for this report (₹).</p>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#5f5e5e" }}>Amount (₹)</label>
                  <input type="number" value={postUploadAmt} onChange={(e) => setPostUploadAmt(Number(e.target.value))}
                    className="w-full bg-transparent py-2 text-base focus:outline-none" style={{ borderBottom: "1px solid rgba(10,10,10,0.2)", borderRadius: 0, color: "#0A0A0A" }} />
                </div>
                <div className="flex gap-3 justify-end mt-8">
                  <button onClick={() => { setEditingRate(false); navigate(`/admin/audit-reports/client/${clientId}`); }}
                    className="px-6 py-3 text-sm font-semibold uppercase tracking-wider border" style={{ borderColor: "#0A0A0A", color: "#0A0A0A" }}>
                    Skip
                  </button>
                  <button onClick={savePostUploadAmt} disabled={uploading}
                    className="px-6 py-3 text-white text-sm font-semibold uppercase tracking-wider"
                    style={{ background: "#b90012" }}>
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Amount"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
