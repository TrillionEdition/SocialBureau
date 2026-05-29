import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/urls";

export default function LotteryClaims() {
  const [claims, setClaims] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [stats, setStats] = useState({ total: 0, pending: 0, totalPaid: 0 });
  const [updatingId, setUpdatingId] = useState(null);
  
  // Image viewer modal state
  const [viewingImage, setViewingImage] = useState(null);

  // Settings States
  const [isActive, setIsActive] = useState(false);
  const [showLotteryOnHomeStart, setShowLotteryOnHomeStart] = useState("");
  const [showLotteryOnHomeEnd, setShowLotteryOnHomeEnd] = useState("");
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [settingsSaving, setSettingsSaving] = useState(false);

  useEffect(() => {
    fetchClaims();
    fetchSettings();
    const interval = setInterval(fetchClaims, 30000); // 30s auto-refresh
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    applyFilter();
  }, [claims, filter]);

  const fetchClaims = async () => {
    try {
      setLoading(claims.length === 0);
      const response = await axios.get(`${BASE_URL}/lottery/claims`);
      const data = response.data || [];
      setClaims(data);

      const pendingCount = data.filter((c) => c.status === "Pending").length;
      const paidSum = data
        .filter((c) => c.status === "Paid")
        .reduce((sum, c) => sum + parseInt(c.amount.replace("₹", ""), 10), 0);

      setStats({
        total: data.length,
        pending: pendingCount,
        totalPaid: paidSum,
      });
    } catch (error) {
      console.error("Failed to fetch claims:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      setSettingsLoading(true);
      const res = await axios.get(`${BASE_URL}/lottery/settings`);
      if (res.data) {
        setIsActive(res.data.isActive || false);
        
        // Convert dates from UTC to local datetime-local format YYYY-MM-DDThh:mm
        if (res.data.showLotteryOnHomeStart) {
          const start = new Date(res.data.showLotteryOnHomeStart);
          const offsetStart = new Date(start.getTime() - start.getTimezoneOffset() * 60000);
          setShowLotteryOnHomeStart(offsetStart.toISOString().slice(0, 16));
        }
        if (res.data.showLotteryOnHomeEnd) {
          const end = new Date(res.data.showLotteryOnHomeEnd);
          const offsetEnd = new Date(end.getTime() - end.getTimezoneOffset() * 60000);
          setShowLotteryOnHomeEnd(offsetEnd.toISOString().slice(0, 16));
        }
      }
    } catch (err) {
      console.error("Failed to load lottery settings:", err);
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    if (isActive) {
      if (!showLotteryOnHomeStart || !showLotteryOnHomeEnd) {
        alert("Please set both Start and End times when active.");
        return;
      }
      if (new Date(showLotteryOnHomeStart) >= new Date(showLotteryOnHomeEnd)) {
        alert("Start time must be strictly before End time.");
        return;
      }
    }

    try {
      setSettingsSaving(true);
      await axios.post(`${BASE_URL}/lottery/settings`, {
        isActive,
        showLotteryOnHomeStart: showLotteryOnHomeStart || null,
        showLotteryOnHomeEnd: showLotteryOnHomeEnd || null,
      });
      alert("Lottery schedule settings saved successfully!");
    } catch (err) {
      console.error("Failed to save settings:", err);
      alert("Failed to save settings: " + (err.response?.data?.message || err.message));
    } finally {
      setSettingsSaving(false);
    }
  };

  const applyFilter = () => {
    if (filter === "all") {
      setFilteredClaims(claims);
    } else {
      setFilteredClaims(claims.filter((c) => c.status === filter));
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const nextStatus = currentStatus === "Pending" ? "Paid" : "Pending";
    try {
      setUpdatingId(id);
      await axios.patch(`${BASE_URL}/lottery/claims/${id}`, { status: nextStatus });
      setClaims(claims.map((c) => (c._id === id ? { ...c, status: nextStatus } : c)));
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update claim status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleErase = async (id) => {
    if (!window.confirm("Are you sure you want to permanently erase this lottery claim record?")) {
      return;
    }
    // Remove element in local state
    setClaims(claims.filter((c) => c._id !== id));
  };

  const getStatusColor = (status) => {
    return status === "Paid"
      ? "bg-green-100/10 text-green-400 border border-green-500/20 font-bold"
      : "bg-yellow-100/10 text-yellow-400 border border-yellow-500/20 font-bold animate-pulse";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-yellow-500 font-medium">Scanning Database for Lottery Winnings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6 sm:p-10 text-white relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-slate-800 pb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 uppercase italic">
              Lottery Claims Center
            </h1>
            <p className="text-sm text-slate-400 font-medium mt-1">
              Verify winners, check payment methods, and send rewards.
            </p>
          </div>
          <button
            onClick={fetchClaims}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-yellow-950 font-black rounded-xl transition duration-200 shadow-lg shadow-yellow-500/20 text-xs uppercase tracking-widest"
          >
            Refresh database
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Claims" value={stats.total} />
          <StatCard title="Pending Payments" value={stats.pending} alert />
          <StatCard title="Total Paid Out" value={`₹${stats.totalPaid}`} />
        </div>

        {/* OVERRIDE SETTINGS CARD */}
        <div className="bg-slate-800/80 border border-slate-700/50 rounded-3xl p-6 sm:p-8 mb-10 shadow-2xl backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-[40px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-black uppercase tracking-wider text-yellow-500 italic flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-ping" />
                Homepage Campaign Override Scheduler
              </h2>
              <p className="text-slate-400 text-xs font-semibold mt-1 max-w-xl">
                Configure a scheduled time period during which visiting the root URL <code className="bg-slate-900 px-1 py-0.5 rounded text-yellow-400">http://localhost:5173/</code> displays the Lottery SpinWheel component directly, instead of the standard homepage.
              </p>
            </div>
            
            <form onSubmit={handleSaveSettings} className="flex flex-wrap lg:flex-nowrap items-end gap-4 bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-700/40 w-full lg:w-auto">
              {/* Active Toggle Switch */}
              <div className="flex flex-col gap-2 min-w-[120px]">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Override Status</label>
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`px-4 py-2 text-xs font-black rounded-lg border transition ${
                    isActive
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-slate-800 text-slate-500 border-slate-700"
                  }`}
                >
                  {isActive ? "ACTIVE" : "DISABLED"}
                </button>
              </div>

              {/* Start Date & Time */}
              <div className="flex flex-col gap-2 flex-grow sm:flex-grow-0">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Start Date & Time</label>
                <input
                  type="datetime-local"
                  value={showLotteryOnHomeStart}
                  onChange={(e) => setShowLotteryOnHomeStart(e.target.value)}
                  disabled={!isActive}
                  className="bg-slate-800 border border-slate-700/60 focus:border-yellow-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                />
              </div>

              {/* End Date & Time */}
              <div className="flex flex-col gap-2 flex-grow sm:flex-grow-0">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">End Date & Time</label>
                <input
                  type="datetime-local"
                  value={showLotteryOnHomeEnd}
                  onChange={(e) => setShowLotteryOnHomeEnd(e.target.value)}
                  disabled={!isActive}
                  className="bg-slate-800 border border-slate-700/60 focus:border-yellow-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                disabled={settingsSaving}
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-yellow-950 font-black rounded-lg text-xs uppercase tracking-widest transition shadow-lg disabled:opacity-50"
              >
                {settingsSaving ? "Saving..." : "Save Config"}
              </button>
            </form>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <FilterButton label={`All Claims (${claims.length})`} active={filter === "all"} onClick={() => setFilter("all")} />
          <FilterButton label="Pending" active={filter === "Pending"} onClick={() => setFilter("Pending")} />
          <FilterButton label="Paid" active={filter === "Paid"} onClick={() => setFilter("Paid")} />
        </div>

        {/* DATA LIST */}
        <div className="bg-slate-800/80 border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-950 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-800">
                <tr>
                  <th className="p-6">Winner Details</th>
                  <th className="p-6">Prize</th>
                  <th className="p-6">GPay Details</th>
                  <th className="p-6">Status</th>
                  <th className="p-6">Claim Date</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {filteredClaims.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-700/20 transition">
                    <td className="p-6">
                      <div className="font-extrabold text-white text-base">{c.name || "Anonymous Winner"}</div>
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-black rounded-lg text-sm">
                        {c.amount}
                      </span>
                    </td>
                    <td className="p-6">
                      {c.gpayNumber ? (
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Number</span>
                          <span className="text-sm font-semibold text-white mt-0.5">{c.gpayNumber}</span>
                        </div>
                      ) : c.qrCode ? (
                        <button
                          onClick={() => setViewingImage(c.qrCode)}
                          className="px-4 py-1.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs font-bold uppercase tracking-wider transition"
                        >
                          View QR Code
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500 italic">No details provided</span>
                      )}
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider ${getStatusColor(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-6 text-xs text-slate-400 font-medium">
                      {new Date(c.createdAt).toLocaleDateString()} at {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          disabled={updatingId === c._id}
                          onClick={() => handleStatusChange(c._id, c.status)}
                          className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg border transition ${
                            c.status === "Pending"
                              ? "bg-green-500/10 hover:bg-green-500/20 text-green-400 border-green-500/20"
                              : "bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border-yellow-500/20"
                          }`}
                        >
                          {updatingId === c._id ? "Processing..." : c.status === "Pending" ? "Mark Paid" : "Mark Pending"}
                        </button>
                        <button
                          onClick={() => handleErase(c._id)}
                          className="text-[10px] font-black text-red-400 hover:text-red-300 border border-red-500/10 hover:border-red-500/30 px-3 py-1.5 rounded-lg uppercase tracking-wider transition"
                        >
                          Erase
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredClaims.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-20 text-center text-slate-500 italic font-medium">
                      No lottery claim records found matching this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* QR CODE FULLSCREEN LIGHTBOX MODAL */}
      {viewingImage && (
        <div
          onClick={() => setViewingImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="max-w-lg w-full bg-slate-800 rounded-3xl p-6 border border-slate-700 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">GPay QR Code Scan</h3>
            <img
              src={viewingImage}
              alt="GPay QR Code"
              className="max-h-[60vh] max-w-full rounded-2xl border border-slate-600 shadow-2xl mb-6 object-contain"
            />
            <button
              onClick={() => setViewingImage(null)}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-yellow-950 font-black rounded-full text-sm uppercase tracking-widest transition"
            >
              Close Viewer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, alert }) {
  return (
    <div
      className={`p-8 rounded-3xl border border-slate-700/50 bg-slate-800/50 shadow-xl transition-all hover:scale-[1.02] relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 blur-[30px] rounded-full pointer-events-none" />
      <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${alert ? "text-yellow-500 animate-pulse" : "text-slate-400"}`}>
        {title}
      </p>
      <h2 className="text-4xl font-black italic">{value}</h2>
    </div>
  );
}

function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 text-[10px] font-black rounded-xl transition-all uppercase tracking-wider whitespace-nowrap ${
        active
          ? "bg-yellow-500 text-yellow-950 shadow-lg shadow-yellow-500/20"
          : "bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
