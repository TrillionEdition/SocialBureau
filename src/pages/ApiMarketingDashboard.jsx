import React, { useEffect, useState } from "react";
import apiLeadService from "../../services/apiLeadService";

export default function ApiMarketingDashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    contacted: 0,
    qualified: 0
  });
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [expandedLeadId, setExpandedLeadId] = useState(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, filter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiLeadService.getAllLeads();
      const leadList = response.data.data || [];
      setLeads(leadList);

      setStats({
        totalLeads: leadList.length,
        newLeads: leadList.filter(l => l.status === 'new').length,
        contacted: leadList.filter(l => l.status === 'contacted').length,
        qualified: leadList.filter(l => l.status === 'qualified').length,
      });
    } catch (error) {
      console.error('Failed to fetch API marketing leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    if (filter === 'all') {
      setFilteredLeads(leads);
    } else {
      setFilteredLeads(leads.filter(l => l.status === filter));
    }
  };

  const handleStatusUpdate = async (leadId, currentStatus) => {
    setEditingId(leadId);
    setNewStatus(currentStatus);
  };

  const saveStatusUpdate = async (leadId) => {
    if (!newStatus || newStatus === leads.find(l => l._id === leadId)?.status) {
      setEditingId(null);
      return;
    }

    try {
      setUpdating(true);
      await apiLeadService.updateLeadStatus(leadId, newStatus);
      
      setLeads(leads.map(l => 
        l._id === leadId ? { ...l, status: newStatus } : l
      ));
      
      setEditingId(null);
      setNewStatus("");
    } catch (error) {
      console.error('Failed to update lead status:', error);
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-red-100 text-red-600',
      contacted: 'bg-blue-100 text-blue-600',
      qualified: 'bg-purple-100 text-purple-600',
      proposal: 'bg-yellow-100 text-yellow-600',
      closed: 'bg-green-100 text-green-600',
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  };

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const statusOptions = ['new', 'contacted', 'qualified', 'proposal', 'closed'];

  if (loading && leads.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f6f8] p-6 text-gray-900 flex items-center justify-center">
        <p className="text-gray-600">Loading API marketing leads...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8] p-6 text-gray-900 font-sans">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">API Marketing Dashboard</h1>
          <p className="text-sm text-gray-500">Managing algorithmic marketing strategy requests</p>
        </div>
        <button 
          onClick={fetchData} 
          className="px-4 py-2 text-sm bg-[#C8102E] text-white rounded-lg hover:bg-[#FF2244] transition shadow-lg shadow-red-500/20 font-bold"
        >
          Refresh Leads
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Requests" value={stats.totalLeads} color="border-gray-200" />
        <StatCard title="New / Unseen" value={stats.newLeads} color="border-red-200" />
        <StatCard title="Contacted" value={stats.contacted} color="border-blue-200" />
        <StatCard title="Qualified" value={stats.qualified} color="border-purple-200" />
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <FilterButton label={`All (${leads.length})`} active={filter === 'all'} onClick={() => setFilter('all')} />
        {statusOptions.map(opt => (
          <FilterButton 
            key={opt}
            label={`${formatStatus(opt)} (${leads.filter(l => l.status === opt).length})`} 
            active={filter === opt} 
            onClick={() => setFilter(opt)} 
          />
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-xs font-bold border-b uppercase tracking-wider">
              <tr>
                <th className="p-4 text-left">Requestor</th>
                <th className="p-4 text-left">Business</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Monthly Spend</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Submitted</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <React.Fragment key={lead._id}>
                    <tr 
                      className="hover:bg-gray-50 transition cursor-pointer" 
                      onClick={() => setExpandedLeadId(expandedLeadId === lead._id ? null : lead._id)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-[10px]">{expandedLeadId === lead._id ? '▼' : '▶'}</span>
                          <span className="font-semibold text-gray-900">{lead.name}</span>
                        </div>
                        <div className="text-[10px] text-gray-500 ml-5">{lead.phone}</div>
                      </td>
                      <td className="p-4 text-gray-600 font-medium">{lead.businessName}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-[10px] font-bold text-gray-600 uppercase">
                          {lead.category}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">{lead.monthlySpend}</td>
                      <td className="p-4">
                        {editingId === lead._id ? (
                          <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                            <select
                              value={newStatus}
                              onChange={(e) => setNewStatus(e.target.value)}
                              className="px-2 py-1 text-xs border rounded bg-white outline-none focus:border-red-500"
                            >
                              {statusOptions.map(opt => (
                                <option key={opt} value={opt}>{formatStatus(opt)}</option>
                              ))}
                            </select>
                            <button
                              onClick={() => saveStatusUpdate(lead._id)}
                              className="w-7 h-7 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="w-7 h-7 bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-300"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(lead.status)}`}>
                            {lead.status}
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-gray-500 text-[11px]">
                        {new Date(lead.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      </td>
                      <td className="p-4" onClick={e => e.stopPropagation()}>
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setEditingId(lead._id); setExpandedLeadId(null); }}
                            className="px-3 py-1 text-[10px] font-bold bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition"
                          >
                            Set Status
                          </button>
                          <a 
                            href={`https://wa.me/${lead.phone.replace(/\+/g, '')}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-3 py-1 text-[10px] font-bold bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition"
                          >
                            WhatsApp
                          </a>
                        </div>
                      </td>
                    </tr>

                    {/* DETAILS */}
                    {expandedLeadId === lead._id && (
                      <tr className="bg-gray-50/50">
                        <td colSpan="7" className="p-8">
                          <div className="bg-white rounded-2xl border p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 border-b pb-4 mb-6 flex items-center gap-2">
                              <span className="w-2 h-2 bg-[#C8102E] rounded-full"></span>
                              The Algorithmic Challenge
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                <div>
                                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name</label>
                                  <p className="text-gray-900 font-medium">{lead.name}</p>
                                </div>
                                <div>
                                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Business</label>
                                  <p className="text-gray-900 font-medium">{lead.businessName}</p>
                                </div>
                                <div>
                                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
                                  <p className="text-gray-900 font-medium">{lead.category}</p>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Biggest Challenge</label>
                                  <div className="mt-1 p-4 bg-gray-50 rounded-xl border border-gray-100 italic text-gray-700 leading-relaxed text-sm">
                                    "{lead.challenge || 'No specific challenge provided.'}"
                                  </div>
                                </div>
                                <div className="pt-4 flex gap-3">
                                  <button 
                                    className="px-6 py-3 bg-[#C8102E] text-white rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-[#FF2244] transition shadow-lg shadow-red-500/20"
                                    onClick={() => window.open(`tel:${lead.phone}`)}
                                  >
                                    Call Now
                                  </button>
                                  <button 
                                    className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-gray-50"
                                    onClick={() => {
                                      if (window.confirm('Are you sure you want to delete this lead?')) {
                                        apiLeadService.deleteLead(lead._id).then(() => fetchData());
                                      }
                                    }}
                                  >
                                    Archive Lead
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">📁</div>
                      <p className="text-gray-400 font-medium italic">No algorithmic leads discovered yet.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`bg-white border ${color} rounded-2xl p-5 shadow-sm transition hover:shadow-md`}>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
      <h2 className="text-3xl font-black text-gray-900">{value}</h2>
    </div>
  );
}

function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-[10px] font-bold rounded-full transition uppercase tracking-wider ${
        active 
          ? 'bg-[#C8102E] text-white shadow-lg shadow-red-500/20' 
          : 'bg-white border text-gray-500 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );
}
