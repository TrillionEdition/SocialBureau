import React, { useEffect, useState } from "react";
import mediaWaitlistService from "@/services/mediaWaitlistService";

export default function MediaDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0
  });
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // 1 min refresh
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    applyFilter();
  }, [entries, filter]);

  const fetchData = async () => {
    try {
      setLoading(entries.length === 0);
      const response = await mediaWaitlistService.getAllEntries();
      const list = response.data || [];
      setEntries(list);

      setStats({
        total: list.length,
        new: list.filter(l => l.status === 'Pending').length,
        contacted: list.filter(l => l.status === 'Contacted').length,
      });
    } catch (error) {
      console.error('Failed to fetch media waitlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = () => {
    if (filter === 'all') {
      setFilteredEntries(entries);
    } else {
      setFilteredEntries(entries.filter(e => e.status === filter));
    }
  };

  const saveStatusUpdate = async (id) => {
    if (!newStatus) {
      setEditingId(null);
      return;
    }

    try {
      setUpdating(true);
      await mediaWaitlistService.updateStatus(id, newStatus);
      setEntries(entries.map(e => e._id === id ? { ...e, status: newStatus } : e));
      setEditingId(null);
      setNewStatus("");
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: 'bg-yellow-100 text-yellow-700 font-bold',
      Contacted: 'bg-green-100 text-green-700 font-bold',
      Ignored: 'bg-gray-100 text-gray-500',
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#E8001A] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Scanning Future Of Media Waitlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-10 text-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-[#0A0A0A] uppercase italic">Media Dashboard</h1>
            <p className="text-sm text-gray-500 font-medium">Waitlist management for "The Future of Media" platform</p>
          </div>
          <button 
            onClick={fetchData} 
            className="px-6 py-2.5 bg-[#0A0A0A] text-white rounded-xl hover:bg-[#E8001A] transition shadow-lg shadow-black/10 font-bold text-xs uppercase tracking-widest"
          >
            Refresh Database
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Prospects" value={stats.total} />
          <StatCard title="New Signups" value={stats.new} light />
          <StatCard title="Engagement Ratio" value={`${entries.length > 0 ? ((stats.contacted / stats.total) * 100).toFixed(0) : 0}%`} />
        </div>

        {/* CONTROLS */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <FilterButton label={`All Records (${entries.length})`} active={filter === 'all'} onClick={() => setFilter('all')} />
          <FilterButton label="Pending" active={filter === 'Pending'} onClick={() => setFilter('Pending')} />
          <FilterButton label="Contacted" active={filter === 'Contacted'} onClick={() => setFilter('Contacted')} />
        </div>

        {/* DATA LIST */}
        <div className="bg-white border rounded-3xl overflow-hidden shadow-xl shadow-black/[0.03]">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#0A0A0A] text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
                <tr>
                  <th className="p-6">User Identity</th>
                  <th className="p-6">Origin</th>
                  <th className="p-6">Vetting Status</th>
                  <th className="p-6">Signed Up</th>
                  <th className="p-6">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEntries.map((e) => (
                  <tr key={e._id} className="hover:bg-gray-50/80 transition">
                    <td className="p-6">
                      <div className="font-bold text-gray-900">{e.name || 'Anonymous User'}</div>
                      <div className="text-xs text-gray-500">{e.email}</div>
                    </td>
                    <td className="p-6">
                      <span className="text-xs font-medium text-gray-400 italic">
                        {e.source}
                      </span>
                    </td>
                    <td className="p-6">
                      {editingId === e._id ? (
                        <div className="flex gap-2">
                          <select
                            value={newStatus}
                            onChange={(val) => setNewStatus(val.target.value)}
                            className="text-xs border rounded-lg px-2 py-1 bg-white"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Ignored">Ignored</option>
                          </select>
                          <button onClick={() => saveStatusUpdate(e._id)} className="bg-black text-white px-2 py-1 rounded-lg text-xs">OK</button>
                        </div>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider ${getStatusColor(e.status)}`}>
                          {e.status}
                        </span>
                      )}
                    </td>
                    <td className="p-6 text-xs text-gray-500 font-medium">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-6">
                      <div className="flex gap-3">
                        <button 
                          onClick={() => { setEditingId(e._id); setNewStatus(e.status); }}
                          className="text-[10px] font-black text-blue-600 hover:underline uppercase"
                        >
                          Modify
                        </button>
                        <button 
                          onClick={async () => {
                            if(window.confirm('Erase this prospect data?')) {
                               await mediaWaitlistService.deleteEntry(e._id);
                               fetchData();
                            }
                          }}
                          className="text-[10px] font-black text-red-600 hover:underline uppercase"
                        >
                          Erase
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredEntries.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-20 text-center text-gray-400 italic font-medium">
                      The future is still waiting. No prospects found for this filter.
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

function StatCard({ title, value, light }) {
  return (
    <div className={`p-8 rounded-3xl border ${light ? 'bg-white border-gray-100 shadow-lg shadow-black/[0.02]' : 'bg-[#0A0A0A] text-white'} transition-all hover:scale-[1.02]`}>
      <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${light ? 'text-[#E8001A]' : 'text-white/30'}`}>{title}</p>
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
          ? 'bg-[#E8001A] text-white shadow-lg shadow-red-500/30' 
          : 'bg-white border border-gray-100 text-gray-400 hover:text-gray-900'
      }`}
    >
      {label}
    </button>
  );
}


