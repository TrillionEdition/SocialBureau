import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/urls";

export default function SuntipsClaims() {
  const [claims, setClaims] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({ total: 0, pending: 0, shipped: 0, delivered: 0 });
  const [updatingId, setUpdatingId] = useState(null);
  const [outOfStock, setOutOfStock] = useState(false);
  const [togglingStock, setTogglingStock] = useState(false);

  useEffect(() => {
    fetchClaims();
    fetchStockStatus();
    const interval = setInterval(fetchClaims, 30000); // 30s auto-refresh
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    applyFilterAndSearch();
  }, [claims, filter, searchQuery]);

  const fetchClaims = async () => {
    try {
      setLoading(claims.length === 0);
      const token = localStorage.getItem("token"); // Assuming admin token is stored
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get(`${BASE_URL}/suntips/claims`, config);
      const data = response.data || [];
      setClaims(data);

      const pendingCount = data.filter((c) => c.status === "Pending").length;
      const shippedCount = data.filter((c) => c.status === "Shipped").length;
      const deliveredCount = data.filter((c) => c.status === "Delivered").length;

      setStats({
        total: data.length,
        pending: pendingCount,
        shipped: shippedCount,
        delivered: deliveredCount
      });
    } catch (error) {
      console.error("Failed to fetch Suntips claims:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStockStatus = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/suntips/settings`);
      setOutOfStock(res.data?.outOfStock ?? false);
    } catch (err) {
      console.error("Failed to fetch stock status:", err);
    }
  };

  const handleToggleStock = async () => {
    try {
      setTogglingStock(true);
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const newStatus = !outOfStock;
      await axios.patch(`${BASE_URL}/suntips/settings/stock`, { outOfStock: newStatus }, config);
      setOutOfStock(newStatus);
    } catch (err) {
      console.error("Failed to toggle stock status:", err);
      alert("Failed to update stock status: " + (err.response?.data?.message || err.message));
    } finally {
      setTogglingStock(false);
    }
  };

  const applyFilterAndSearch = () => {
    let result = claims;

    // Apply Filter Tab
    if (filter !== "all") {
      result = result.filter((c) => c.status === filter);
    }

    // Apply Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.mobileNumber.toLowerCase().includes(q) ||
          c.prize.toLowerCase().includes(q) ||
          c.address.toLowerCase().includes(q)
      );
    }

    setFilteredClaims(result);
  };

  const handleStatusChange = async (id, nextStatus) => {
    try {
      setUpdatingId(id);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      await axios.patch(`${BASE_URL}/suntips/claims/${id}`, { status: nextStatus }, config);
      setClaims(claims.map((c) => (c._id === id ? { ...c, status: nextStatus } : c)));
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update claim status: " + (error.response?.data?.message || error.message));
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadgeStyles = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold";
      case "Shipped":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold";
      default:
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold animate-pulse";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-emerald-500 font-medium tracking-wider uppercase text-xs">Scanning database for tea claims...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 sm:p-10 text-white relative font-sans">
      {/* Ambient forest green glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-slate-900 pb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-yellow-400 uppercase italic">
              Suntips Tea Claims Board
            </h1>
            <p className="text-sm text-slate-400 font-medium mt-1">
              Fulfill won tea pack prizes, track delivery statuses, and manage shipment logistics.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* OUT OF STOCK TOGGLE */}
            <button
              onClick={handleToggleStock}
              disabled={togglingStock}
              className={`relative flex items-center gap-3 px-5 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-lg border ${
                outOfStock
                  ? "bg-red-500/10 border-red-500/40 text-red-400 hover:bg-red-500/20 shadow-red-500/10"
                  : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
              } disabled:opacity-60 disabled:cursor-not-allowed`}
              title={outOfStock ? "Click to re-enable the spin page" : "Click to mark products as out of stock"}
            >
              {togglingStock ? (
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <span className={`w-3 h-3 rounded-full flex-shrink-0 ${outOfStock ? "bg-red-400 animate-pulse" : "bg-emerald-400"}`} />
              )}
              <span>
                {outOfStock ? "🚫 Products Out of Stock" : "✅ Products Available"}
              </span>
            </button>
            <button
              onClick={fetchClaims}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black rounded-xl transition duration-200 shadow-lg shadow-emerald-500/20 text-xs uppercase tracking-widest"
            >
              Refresh records
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Claims" value={stats.total} />
          <StatCard title="Pending Shipment" value={stats.pending} alert />
          <StatCard title="Shipped" value={stats.shipped} color="text-blue-400" />
          <StatCard title="Delivered" value={stats.delivered} color="text-emerald-400" />
        </div>

        {/* SEARCH & FILTERS */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <FilterButton label={`All (${claims.length})`} active={filter === "all"} onClick={() => setFilter("all")} />
            <FilterButton label="Pending" active={filter === "Pending"} onClick={() => setFilter("Pending")} />
            <FilterButton label="Shipped" active={filter === "Shipped"} onClick={() => setFilter("Shipped")} />
            <FilterButton label="Delivered" active={filter === "Delivered"} onClick={() => setFilter("Delivered")} />
          </div>

          <div className="relative min-w-[280px]">
            <input
              type="text"
              placeholder="Search by name, phone, or prize..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 focus:border-emerald-500/60 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* DATA LIST */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-950/80 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-800">
                <tr>
                  <th className="p-6">Winner Details</th>
                  <th className="p-6">Prize Flavor</th>
                  <th className="p-6">Shipping Address</th>
                  <th className="p-6">Status</th>
                  <th className="p-6">Claim Date</th>
                  <th className="p-6 text-right">Fulfillment Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {filteredClaims.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-900/30 transition">
                    <td className="p-6">
                      <div className="font-extrabold text-white text-base">{c.name || "Anonymous Winner"}</div>
                      <div className="text-xs text-slate-400 font-semibold mt-0.5">{c.mobileNumber}</div>
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-black rounded-lg text-xs uppercase">
                        {c.prize}
                      </span>
                    </td>
                    <td className="p-6 max-w-xs">
                      <p className="text-sm text-slate-300 leading-relaxed break-words font-medium">{c.address}</p>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider ${getStatusBadgeStyles(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-6 text-xs text-slate-400 font-medium">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        {c.status === "Pending" && (
                          <button
                            disabled={updatingId === c._id}
                            onClick={() => handleStatusChange(c._id, "Shipped")}
                            className="text-[10px] font-black uppercase tracking-wider bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-lg transition"
                          >
                            Mark Shipped
                          </button>
                        )}
                        {c.status === "Shipped" && (
                          <button
                            disabled={updatingId === c._id}
                            onClick={() => handleStatusChange(c._id, "Delivered")}
                            className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg transition"
                          >
                            Mark Delivered
                          </button>
                        )}
                        {c.status === "Delivered" && (
                          <span className="text-xs text-emerald-500/60 font-extrabold italic uppercase mr-2 flex items-center gap-1">
                            ✓ Fulfilled
                          </span>
                        )}
                        {c.status !== "Pending" && (
                          <button
                            disabled={updatingId === c._id}
                            onClick={() => handleStatusChange(c._id, "Pending")}
                            className="text-[9px] font-bold uppercase text-slate-500 hover:text-slate-450 border border-slate-800/80 hover:border-slate-700 px-2.5 py-1 rounded-lg transition"
                          >
                            Revert
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredClaims.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-20 text-center text-slate-600 italic font-medium">
                      No tea pack submission records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, alert, color = "text-white" }) {
  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 shadow-xl transition-all hover:scale-[1.01] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-[30px] rounded-full pointer-events-none" />
      <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2.5 ${alert ? "text-amber-500 animate-pulse" : "text-slate-400"}`}>
        {title}
      </p>
      <h2 className={`text-3xl font-black italic ${color}`}>{value}</h2>
    </div>
  );
}

function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-[10px] font-black rounded-xl transition-all uppercase tracking-wider whitespace-nowrap ${
        active
          ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
          : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
