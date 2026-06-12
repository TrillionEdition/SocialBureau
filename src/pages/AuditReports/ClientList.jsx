import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function ClientList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  
  // Search state for Filter...
  const [filterText, setFilterText] = useState("");
  
  // Registration form states
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [clearanceLevel, setClearanceLevel] = useState("standard"); // standard or admin
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1, limit: 10 });

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await auditReportService.adminGetClients(page, 10, filterText, "");
      if (res.success) {
        setClients(res.data);
        setPagination(res.pagination);
      }
    } catch {
      toast.error("Failed to fetch clients list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [page, filterText]);

  const handleRegisterClient = async (e) => {
    e.preventDefault();
    if (!registerName.trim()) return toast.warn("Client name is required.");
    if (!registerEmail.trim()) return toast.warn("Operator email is required.");
    if (!registerPassword) return toast.warn("Secure password is required.");
    if (registerPassword.length < 5) return toast.warn("Password must be at least 5 characters.");

    try {
      setIsSubmitting(true);
      const res = await auditReportService.adminCreateClient({
        name: registerName.trim(),
        email: registerEmail.toLowerCase().trim(),
        password: registerPassword,
        role: clearanceLevel === "admin" ? "admin" : "partnership",
      });
      if (res.success) {
        toast.success("Client registered successfully!");
        setRegisterName("");
        setRegisterEmail("");
        setRegisterPassword("");
        setClearanceLevel("standard");
        fetchClients();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to register client.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const initials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#f9f9fb", fontFamily: "Inter, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Side Nav */}
      <AdminSidebar navigate={navigate} clients={clients} />

      {/* Top Nav */}
      <nav
        className="hidden md:flex justify-between items-center fixed top-0 right-0 left-64 z-50 px-16 py-4 backdrop-blur-md"
        style={{ background: "rgba(255,255,255,0.82)", borderBottom: "1px solid rgba(10,10,10,0.1)" }}
      >
        <div>
          <span className="text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif", color: "#0A0A0A" }}>
            Platform Overview
          </span>
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

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pt-20 min-h-screen">
        <div className="px-6 md:px-16 py-12">
          
          {/* Header */}
          <header className="mb-16 flex flex-col justify-start w-full">
            <div className="flex flex-col gap-4">
              <div>
                <span
                  className="inline-block text-white text-xs font-bold uppercase tracking-widest px-2 py-1 mb-4"
                  style={{ background: "#0A0A0A", fontFamily: "Inter, sans-serif" }}
                >
                  SYSTEM HUB
                </span>
              </div>
              
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6" style={{ borderBottom: "1px solid rgba(10,10,10,0.15)" }}>
                <h1
                  className="font-bold text-black leading-tight"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(42px, 6vw, 78px)",
                    letterSpacing: "-0.02em",
                    color: "#0A0A0A",
                  }}
                >
                  Dashboard
                </h1>
                
                <p className="text-sm md:text-base max-w-md lg:text-right" style={{ color: "#5f5e5e", lineHeight: "1.6" }}>
                  Manage administrative access, register new operators, and monitor global system activity.
                </p>
              </div>
            </div>
          </header>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Register Client Card */}
            <section className="lg:col-span-5">
              <div
                className="bg-white p-8 md:p-10"
                style={{
                  borderTop: "1px solid #0A0A0A",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.03)",
                  position: "relative",
                }}
              >
                <div className="flex items-center gap-3 mb-8 pb-4" style={{ borderBottom: "1px solid rgba(10,10,10,0.1)" }}>
                  <span className="material-symbols-outlined" style={{ color: "#e8001a", fontSize: "24px" }}>person_add</span>
                  <h2
                    className="text-2xl font-medium text-black"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Register Client
                  </h2>
                </div>

                <form onSubmit={handleRegisterClient} className="flex flex-col gap-8">
                  
                  {/* Client Name Input */}
                  <div className="relative group">
                    <input
                      type="text"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                      id="register_name"
                      placeholder=" "
                      className="w-full bg-transparent border-0 border-b py-2 focus:outline-none text-base peer"
                      style={{ borderBottomColor: "rgba(10,10,10,0.2)", color: "#0A0A0A" }}
                    />
                    <label
                      htmlFor="register_name"
                      className="absolute left-0 top-2 text-base transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-red-700 peer-valid:-top-4 peer-valid:text-xs"
                      style={{ color: "#5f5e5e" }}
                    >
                      Client Name
                    </label>
                  </div>

                  {/* Operator Email Input */}
                  <div className="relative group">
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                      id="register_email"
                      placeholder=" "
                      className="w-full bg-transparent border-0 border-b py-2 focus:outline-none text-base peer"
                      style={{ borderBottomColor: "rgba(10,10,10,0.2)", color: "#0A0A0A" }}
                    />
                    <label
                      htmlFor="register_email"
                      className="absolute left-0 top-2 text-base transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-red-700 peer-valid:-top-4 peer-valid:text-xs"
                      style={{ color: "#5f5e5e" }}
                    >
                      Operator Email
                    </label>
                  </div>

                  {/* Secure Password Input */}
                  <div className="relative group">
                    <input
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                      id="register_password"
                      placeholder=" "
                      className="w-full bg-transparent border-0 border-b py-2 focus:outline-none text-base peer"
                      style={{ borderBottomColor: "rgba(10,10,10,0.2)", color: "#0A0A0A" }}
                    />
                    <label
                      htmlFor="register_password"
                      className="absolute left-0 top-2 text-base transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-red-700 peer-valid:-top-4 peer-valid:text-xs"
                      style={{ color: "#5f5e5e" }}
                    >
                      Secure Password
                    </label>
                  </div>

                  {/* Clearance Level Selector */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold mb-4" style={{ color: "#5f5e5e", fontSize: "10px", letterSpacing: "0.15em" }}>
                      Clearance Level
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Standard Box */}
                      <div
                        onClick={() => setClearanceLevel("standard")}
                        className="flex justify-between items-center p-4 cursor-pointer transition-all duration-200 border"
                        style={{
                          borderColor: clearanceLevel === "standard" ? "#e8001a" : "rgba(10,10,10,0.12)",
                          background: clearanceLevel === "standard" ? "rgba(232,0,26,0.01)" : "transparent",
                          borderRadius: "2px",
                        }}
                      >
                        <span className="text-sm font-semibold" style={{ color: "#0A0A0A" }}>Standard</span>
                        <span
                          className="material-symbols-outlined text-lg"
                          style={{ color: clearanceLevel === "standard" ? "#e8001a" : "rgba(10,10,10,0.2)" }}
                        >
                          {clearanceLevel === "standard" ? "radio_button_checked" : "radio_button_unchecked"}
                        </span>
                      </div>

                      {/* Admin Box */}
                      <div
                        onClick={() => setClearanceLevel("admin")}
                        className="flex justify-between items-center p-4 cursor-pointer transition-all duration-200 border"
                        style={{
                          borderColor: clearanceLevel === "admin" ? "#e8001a" : "rgba(10,10,10,0.12)",
                          background: clearanceLevel === "admin" ? "rgba(232,0,26,0.01)" : "transparent",
                          borderRadius: "2px",
                        }}
                      >
                        <span className="text-sm font-semibold" style={{ color: "#0A0A0A" }}>Admin</span>
                        <span
                          className="material-symbols-outlined text-lg"
                          style={{ color: clearanceLevel === "admin" ? "#e8001a" : "rgba(10,10,10,0.2)" }}
                        >
                          {clearanceLevel === "admin" ? "radio_button_checked" : "radio_button_unchecked"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Register Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 text-white text-sm font-bold uppercase tracking-widest flex items-center justify-between transition-colors duration-200 mt-2"
                    style={{ background: "#e8001a", fontFamily: "Inter, sans-serif" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#0A0A0A"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#e8001a"; }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2 w-full">
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Registering...</span>
                      </div>
                    ) : (
                      <>
                        <span>Register Client</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </section>

            {/* Right: Operator Directory */}
            <section className="lg:col-span-7">
              <div
                className="bg-white p-8 md:p-10"
                style={{
                  borderTop: "1px solid #0A0A0A",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.03)",
                }}
              >
                
                {/* Search / Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 pb-4" style={{ borderBottom: "1px solid rgba(10,10,10,0.1)" }}>
                  <h3
                    className="text-2xl font-medium text-black"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Operator Directory
                  </h3>
                  
                  {/* Filter Search */}
                  <div className="relative group">
                    <input
                      type="text"
                      value={filterText}
                      onChange={(e) => {
                        setPage(1);
                        setFilterText(e.target.value);
                      }}
                      placeholder="Filter..."
                      className="bg-transparent border-0 border-b py-1 focus:outline-none text-sm placeholder-gray-400 w-full sm:w-48"
                      style={{ borderBottomColor: "rgba(10,10,10,0.2)", color: "#0A0A0A", borderRadius: 0 }}
                    />
                  </div>
                </div>

                {loading && clients.length === 0 ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#b90012" }} />
                  </div>
                ) : clients.length > 0 ? (
                  <div className="flex flex-col divide-y divide-gray-100">
                    {clients.map((client) => {
                      const isActive = client.status === "active";
                      const isAdmin = client.role === "admin";
                      const isSuspended = !isActive;

                      return (
                        <div
                          key={client._id}
                          className="flex items-center justify-between py-4 cursor-pointer transition-colors duration-150 group"
                          onClick={() => navigate(`/admin/audit-reports/client/${client._id}`)}
                          style={{ background: "transparent" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#f9f9fb"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                        >
                          <div className="flex items-center gap-4 pl-2">
                            {/* Initials Circle */}
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                              style={{
                                background: isAdmin ? "#0A0A0A" : "#eeeef0",
                                color: isAdmin ? "#FFFFFF" : "#0A0A0A",
                              }}
                            >
                              {initials(client.name)}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-black" style={{ fontFamily: "Inter, sans-serif" }}>
                                {client.name}
                              </div>
                              <div className="text-xs" style={{ color: "#5f5e5e" }}>
                                {client.email || "—"}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 pr-2">
                            {/* Status Badge */}
                            {isSuspended ? (
                              <span
                                className="text-xs font-bold uppercase tracking-widest px-2.5 py-1"
                                style={{
                                  border: "1px solid rgba(185,0,18,0.3)",
                                  color: "#b90012",
                                  fontSize: "9px",
                                  fontFamily: "Inter, sans-serif",
                                  background: "rgba(185,0,18,0.02)",
                                }}
                              >
                                Suspended
                              </span>
                            ) : isAdmin ? (
                              <span
                                className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 text-white"
                                style={{
                                  background: "#0A0A0A",
                                  fontSize: "9px",
                                  fontFamily: "Inter, sans-serif",
                                }}
                              >
                                Admin
                              </span>
                            ) : (
                              <span
                                className="text-xs font-bold uppercase tracking-widest px-2.5 py-1"
                                style={{
                                  border: "1px solid #0A0A0A",
                                  color: "#0A0A0A",
                                  fontSize: "9px",
                                  fontFamily: "Inter, sans-serif",
                                  background: "#FFFFFF",
                                }}
                              >
                                Standard
                              </span>
                            )}

                            {/* More Icon */}
                            <button
                              className="text-gray-400 group-hover:text-black transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/admin/audit-reports/client/${client._id}`);
                              }}
                            >
                              <span className="material-symbols-outlined text-xl align-middle">
                                more_vert
                              </span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <span className="material-symbols-outlined text-5xl mb-4 block" style={{ color: "#d9dadc" }}>group</span>
                    <p className="text-sm" style={{ color: "#5f5e5e" }}>No clients found.</p>
                  </div>
                )}

                {/* View Full Directory / Pagination */}
                {pagination.pages > 1 && (
                  <div className="mt-8 text-center border-t pt-6" style={{ borderColor: "rgba(10,10,10,0.06)" }}>
                    <button
                      onClick={() => setPage((p) => (p === pagination.pages ? 1 : p + 1))}
                      className="text-xs font-bold uppercase tracking-widest transition-transform duration-200 hover:translate-x-1 inline-flex items-center gap-1.5"
                      style={{ color: "#e8001a", fontFamily: "Inter, sans-serif" }}
                    >
                      <span>{page === pagination.pages ? "Return to Start" : "View Full Directory"}</span>
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
