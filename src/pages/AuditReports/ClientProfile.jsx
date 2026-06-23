import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import auditReportService from "./auditReportService";
import { toast } from "react-toastify";

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

export default function ClientProfile() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);
  const [reports, setReports] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editAuditPeriod, setEditAuditPeriod] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("published");
  const [editAmt, setEditAmt] = useState(0);
  const [updating, setUpdating] = useState(false);

  const fetchClientDetails = async () => {
    try {
      setLoading(true);
      const [clientRes, clientsRes] = await Promise.all([
        auditReportService.adminGetClientDetails(clientId),
        auditReportService.adminGetClients(1, 200, "", ""),
      ]);
      if (clientRes.success) { setClient(clientRes.client); setReports(clientRes.reports); }
      if (clientsRes.success) setAllClients(clientsRes.data);
    } catch (err) {
      toast.error("Failed to load client details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchClientDetails(); }, [clientId]);

  const handleDownload = (reportId) => window.open(auditReportService.downloadReportUrl(reportId), "_blank");

  const handleDelete = async (reportId) => {
    if (!window.confirm("Delete this audit report? This cannot be undone.")) return;
    try {
      const res = await auditReportService.adminDeleteReport(reportId);
      if (res.success) { toast.success("Report deleted."); fetchClientDetails(); }
    } catch { toast.error("Failed to delete report."); }
  };

  const openEditModal = (report) => {
    setEditingReport(report);
    setEditTitle(report.title); setEditCategory(report.category);
    setEditAuditPeriod(report.auditPeriod); setEditDescription(report.description || "");
    setEditStatus(report.status || "published"); setIsEditModalOpen(true);
    setEditAmt(report.amt !== undefined ? report.amt : 0);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editTitle || !editCategory || !editAuditPeriod) return toast.warn("Title, category, and audit period are required.");
    try {
      setUpdating(true);
      const res = await auditReportService.adminUpdateReport(editingReport._id, {
        title: editTitle, category: editCategory, auditPeriod: editAuditPeriod,
        description: editDescription, status: editStatus, amt: editAmt,
      });
      if (res.success) { toast.success("Report updated."); setIsEditModalOpen(false); fetchClientDetails(); }
    } catch { toast.error("Failed to update report."); }
    finally { setUpdating(false); }
  };

  const formatBytes = (bytes) => {
    if (!bytes) return "0 B";
    const k = 1024; const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const inputStyle = {
    borderBottom: "1px solid rgba(10,10,10,0.2)",
    borderTop: "none", borderLeft: "none", borderRight: "none",
    borderRadius: 0, background: "transparent", color: "#0A0A0A",
    fontFamily: "Inter, sans-serif", width: "100%", padding: "8px 0",
    outline: "none", fontSize: "16px",
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#f9f9fb", fontFamily: "Inter, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <AdminSidebar navigate={navigate} clients={allClients} />

      {/* Top Nav */}
      <nav
        className="hidden md:flex justify-between items-center fixed top-0 right-0 left-64 z-50 px-16 py-4 backdrop-blur-md"
        style={{ background: "rgba(255,255,255,0.82)", borderBottom: "1px solid rgba(10,10,10,0.1)" }}
      >
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/admin/audit-reports")} style={{ color: "#5f5e5e" }}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <span className="material-symbols-outlined text-xl align-middle mr-2" style={{ color: "#b90012" }}>person</span>
            <span className="text-xl font-medium" style={{ fontFamily: "'Playfair Display', serif", color: "#0A0A0A" }}>
              {client?.name || "Client Profile"}
            </span>
          </div>
        </div>
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
      </nav>

      {/* Main */}
      <main className="flex-1 md:ml-64 pt-20 px-6 md:px-16 pb-16 min-h-screen" style={{ background: "#f9f9fb" }}>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 animate-spin mb-4" style={{ color: "#b90012" }} />
            <p className="text-sm uppercase tracking-widest" style={{ color: "#5f5e5e" }}>Syncing Profile...</p>
          </div>
        ) : client ? (
          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="mb-16 border-b pb-8" style={{ borderColor: "#0A0A0A" }}>
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#b90012", fontFamily: "Inter, sans-serif" }}>
                    Investigator Profile
                  </p>
                  <h2
                    className="font-bold text-black"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 6vw, 72px)", lineHeight: "1.05", color: "#0A0A0A" }}
                  >
                    {client.name}
                  </h2>
                </div>
                <div className="flex gap-4 shrink-0">
                  <button
                    onClick={() => navigate(`/admin/audit-reports/upload?client=${client._id}`)}
                    className="px-6 py-3 text-white text-sm font-semibold uppercase tracking-wider transition-colors"
                    style={{ background: "#b90012", fontFamily: "Inter, sans-serif" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#0A0A0A"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#b90012"; }}
                  >
                    + Upload Report
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-8 items-start">
              {/* Left: Security / Client Details */}
              <div className="col-span-12 md:col-span-4 flex flex-col gap-8">
                <div className="bg-white p-8 relative" style={{ borderTop: "1px solid #0A0A0A", boxShadow: "0 20px 40px rgba(0,0,0,0.04)" }}>
                  <h3 className="text-xl font-medium mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Security Credentials</h3>
                  <div className="flex flex-col gap-6">
                    {[
                      { label: "Authorized Email", value: client.email || "—" },
                      { label: "Password", value: client.password || "—", isPassword: true },
                      { label: "Company", value: client.companyName || "—" },
                      { label: "Registration Date", value: new Date(client.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#5f5e5e" }}>
                          {field.label}
                        </label>
                        <div className="text-base pb-2 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(10,10,10,0.1)", color: "#0A0A0A" }}>
                          {field.isPassword ? (
                            <>
                              <span>
                                {field.value !== "—" 
                                  ? (showPassword ? field.value : "••••••••")
                                  : "—"}
                              </span>
                              {field.value !== "—" && (
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="text-gray-500 hover:text-black focus:outline-none flex items-center"
                                  style={{ border: "none", background: "transparent", cursor: "pointer" }}
                                >
                                  <span className="material-symbols-outlined text-lg align-middle">
                                    {showPassword ? "visibility_off" : "visibility"}
                                  </span>
                                </button>
                              )}
                            </>
                          ) : (
                            <span>{field.value}</span>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="pt-2 flex gap-2">
                      <span
                        className="px-3 py-1 text-white text-xs font-bold uppercase tracking-widest"
                        style={{ background: client.status === "active" ? "#0A0A0A" : "#b90012" }}
                      >
                        {client.status || "active"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Reports */}
              <div className="col-span-12 md:col-span-8 flex flex-col gap-8">
                {/* Archived Briefings header */}
                <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: "#0A0A0A" }}>
                  <h3 className="text-xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Archived Briefings
                  </h3>
                  <span className="text-xs uppercase tracking-widest" style={{ color: "#5f5e5e" }}>
                    {reports.length} Document{reports.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {reports.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reports.map((report) => (
                      <div
                        key={report._id}
                        className="bg-white p-6 group transition-shadow"
                        style={{ borderTop: "1px solid #0A0A0A" }}
                        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.06)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center gap-2">
                            <span
                              className="px-2 py-1 text-white text-xs font-bold uppercase tracking-widest"
                              style={{ background: report.status === "published" ? "#0A0A0A" : "#b90012" }}
                            >
                              {report.status}
                            </span>
                            <span
                              className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-sm"
                              style={{
                                background: report.isPaid ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                                color: report.isPaid ? "#10b981" : "#ef4444",
                                border: report.isPaid ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid rgba(239, 68, 68, 0.25)",
                              }}
                            >
                              {report.isPaid ? "Paid" : "Unpaid"}
                            </span>
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#5f5e5e" }}>
                            {new Date(report.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                        </div>

                        <h4
                          className="text-xl font-medium mb-1 transition-colors"
                          style={{ fontFamily: "'Playfair Display', serif", color: "#0A0A0A" }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = "#b90012"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = "#0A0A0A"; }}
                        >
                          {report.title}
                        </h4>
                        <p className="text-xs mb-6 uppercase tracking-widest" style={{ color: "#5f5e5e" }}>
                          {report.category} • {report.auditPeriod}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold" style={{ color: "#5f5e5e" }}>
                            <span className="mr-3">₹{(typeof report.amt === "number" && !isNaN(report.amt) ? report.amt : 0)}</span>
                            <span>{formatBytes(report.pdfSize)} • PDF</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleDownload(report._id)}
                              className="text-sm font-semibold uppercase tracking-widest flex items-center gap-1 transition-transform hover:translate-x-1"
                              style={{ color: "#b90012", fontFamily: "Inter, sans-serif" }}
                            >
                              Download <span className="material-symbols-outlined text-base">arrow_downward</span>
                            </button>
                            <button
                              onClick={() => openEditModal(report)}
                              className="transition-colors"
                              style={{ color: "#5f5e5e" }}
                              title="Edit"
                            >
                              <span className="material-symbols-outlined text-base">edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(report._id)}
                              className="transition-colors"
                              style={{ color: "#b90012" }}
                              title="Delete"
                            >
                              <span className="material-symbols-outlined text-base">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <span className="material-symbols-outlined text-5xl mb-4 block" style={{ color: "#d9dadc" }}>description</span>
                    <p className="text-sm" style={{ color: "#5f5e5e" }}>No audit reports uploaded for this client yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </main>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[11000] flex items-center justify-center p-4" style={{ background: "rgba(10,10,10,0.7)", backdropFilter: "blur(8px)" }}>
          <div className="bg-white w-full max-w-lg relative" style={{ borderTop: "3px solid #b90012", boxShadow: "0 30px 60px rgba(0,0,0,0.2)" }}>
            <div className="absolute top-4 right-4">
              <button onClick={() => setIsEditModalOpen(false)} style={{ color: "#5f5e5e" }}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-8 md:p-10">
              <h3 className="text-2xl font-medium mb-8 pb-4" style={{ fontFamily: "'Playfair Display', serif", borderBottom: "1px solid rgba(10,10,10,0.1)" }}>
                Edit Report Details
              </h3>
              <div className="flex flex-col gap-6">
                {[
                  { label: "Report Title", value: editTitle, onChange: setEditTitle, required: true },
                  { label: "Category", value: editCategory, onChange: setEditCategory, required: true },
                  { label: "Audit Period", value: editAuditPeriod, onChange: setEditAuditPeriod, required: true },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#5f5e5e" }}>{field.label}</label>
                    <input type="text" value={field.value} onChange={(e) => field.onChange(e.target.value)} required={field.required} style={inputStyle} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#5f5e5e" }}>Status</label>
                  <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} style={{ ...inputStyle, appearance: "none" }}>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#5f5e5e" }}>Description</label>
                  <textarea rows={3} value={editDescription} onChange={(e) => setEditDescription(e.target.value)}
                    style={{ ...inputStyle, resize: "none" }} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#5f5e5e" }}>Amount (₹)</label>
                  <input type="number" value={editAmt} onChange={(e) => setEditAmt(Number(e.target.value))} style={inputStyle} />
                </div>
              </div>
              <div className="flex gap-3 justify-end mt-8 pt-4" style={{ borderTop: "1px solid rgba(10,10,10,0.1)" }}>
                <button type="button" onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-3 text-sm font-semibold uppercase tracking-wider border transition-all"
                  style={{ borderColor: "#0A0A0A", color: "#0A0A0A", fontFamily: "Inter, sans-serif" }}>
                  Cancel
                </button>
                <button type="submit" disabled={updating}
                  className="px-6 py-3 text-white text-sm font-semibold uppercase tracking-wider flex items-center gap-2 disabled:opacity-50"
                  style={{ background: "#b90012", fontFamily: "Inter, sans-serif" }}>
                  {updating && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
