import React, { useEffect, useState } from "react";
import clientService from "@/services/clientService";
import { createClickUpTask } from "@/services/clickupServices";

export default function ClientDashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    thisMonth: 0,
    inPipeline: 0,
    closedThisMonth: 0
  });
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [expandedClientId, setExpandedClientId] = useState(null);
  const [creatingTask, setCreatingTask] = useState(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 900000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filterClients();
  }, [clients, filter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await clientService.getAllClients();
      const clientList = response.data || [];
      setClients(clientList);

      const thisMonth = new Date();
      const intake = clientList.filter(c => c.status === 'intake').length;
      const qualified = clientList.filter(c => c.status === 'qualified').length;
      const proposal = clientList.filter(c => c.status === 'proposal_sent').length;

      const closedThisMonth = clientList.filter(c => {
        if (c.status !== 'closed_won') return false;
        const createdDate = new Date(c.createdAt);
        return createdDate.getMonth() === thisMonth.getMonth() &&
          createdDate.getFullYear() === thisMonth.getFullYear();
      }).length;

      setStats({
        totalLeads: clientList.length,
        thisMonth: clientList.filter(c => {
          const createdDate = new Date(c.createdAt);
          return createdDate.getMonth() === thisMonth.getMonth() &&
            createdDate.getFullYear() === thisMonth.getFullYear();
        }).length,
        inPipeline: intake + qualified + proposal,
        closedThisMonth
      });
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterClients = () => {
    if (filter === 'all') {
      setFilteredClients(clients);
    } else {
      setFilteredClients(clients.filter(c => c.status === filter));
    }
  };

  const handleStatusUpdate = async (clientId, currentStatus) => {
    setEditingId(clientId);
    setNewStatus(currentStatus);
  };

  const saveStatusUpdate = async (clientId) => {
    if (!newStatus || newStatus === clients.find(c => c._id === clientId)?.status) {
      setEditingId(null);
      return;
    }

    try {
      setUpdating(true);
      await clientService.updateClient(clientId, { status: newStatus });

      const updatedClient = clients.find(c => c._id === clientId);
      const clientWithNewStatus = { ...updatedClient, status: newStatus };

      setClients(clients.map(c =>
        c._id === clientId ? clientWithNewStatus : c
      ));

      setEditingId(null);
      setNewStatus("");

      // Automatically create ClickUp task on status update
      handleCreateClickUpTask(clientWithNewStatus);
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleCreateClickUpTask = async (client) => {
    try {
      setCreatingTask(client._id);

      // Calculate due date (30 days from now if decision timeline not available)
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 30);

      const taskData = {
        clientName: `${client.first_name} ${client.last_name} is on ${formatStatus(client.status)}`,
        clientCompany: client.company_name || 'Unknown',
        status: client.status,
        dueDate: dueDate.toISOString(),
        priority: client.status === 'qualified' ? 1 : client.status === 'proposal_sent' ? 1 : 2
      };

      console.log("📋 Sending task data:", taskData);

      const response = await createClickUpTask(taskData);

      console.log("✅ Task created response:", response);

      if (response.success) {
        alert(`✅ ClickUp task created successfully!\nTask ID: ${response.taskId}\nURL: ${response.taskUrl}`);
      } else {
        throw new Error(response.details || response.message);
      }
    } catch (error) {
      console.error('❌ Failed to create ClickUp task:', error);
      const errorMessage = error.response?.data?.details || error.response?.data?.message || error.message;
      alert(`❌ Failed to create task:\n${errorMessage}`);
    } finally {
      setCreatingTask(null);
    }
  };

  const getPipelineData = () => {
    const pipeline = {
      intake: [],
      qualified: [],
      proposal_sent: []
    };

    clients.forEach(client => {
      if (client.status === 'intake') {
        pipeline.intake.push(client);
      } else if (client.status === 'qualified') {
        pipeline.qualified.push(client);
      } else if (client.status === 'proposal_sent') {
        pipeline.proposal_sent.push(client);
      }
    });

    return pipeline;
  };

  const pipeline = getPipelineData();

  const getStatusColor = (status) => {
    const colors = {
      intake: 'bg-blue-100 text-blue-600',
      qualified: 'bg-purple-100 text-purple-600',
      proposal_sent: 'bg-yellow-100 text-yellow-600',
      negotiating: 'bg-orange-100 text-orange-600',
      closed_won: 'bg-green-100 text-green-600',
      closed_lost: 'bg-red-100 text-red-600'
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  };

  const formatStatus = (status) => {
    return status.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const statusOptions = [
    'intake',
    'qualified',
    'proposal_sent',
    'negotiating',
    'closed_won',
    'closed_lost'
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f6f8] p-6 text-gray-900 flex items-center justify-center">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8] p-6 text-gray-900">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sales Dashboard</h1>
        <button
          onClick={fetchData}
          className="px-4 py-2 text-sm bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
        >
          Refresh
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Leads"
          value={stats.totalLeads}
          subtitle={`+${stats.thisMonth} this month`}
        />
        <StatCard
          title="In Pipeline"
          value={stats.inPipeline}
          subtitle="Active opportunities"
        />
        <StatCard
          title="Closed This Month"
          value={stats.closedThisMonth}
          subtitle="Won deals"
        />
        <StatCard
          title="Conversion Rate"
          value={stats.totalLeads > 0 ? ((stats.closedThisMonth / stats.thisMonth * 100) || 0).toFixed(0) : 0}
          subtitle="This month"
          isPercent
        />
      </div>

      {/* PIPELINE */}
      <h2 className="text-lg font-semibold mb-3">Sales Pipeline</h2>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <PipelineColumn
          title="Intake"
          clients={pipeline.intake}
          onClientClick={handleStatusUpdate}
        />
        <PipelineColumn
          title="Qualified"
          clients={pipeline.qualified}
          onClientClick={handleStatusUpdate}
        />
        <PipelineColumn
          title="Proposal Sent"
          clients={pipeline.proposal_sent}
          onClientClick={handleStatusUpdate}
        />
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <FilterButton
          label={`All Clients (${clients.length})`}
          active={filter === 'all'}
          onClick={() => setFilter('all')}
        />
        <FilterButton
          label={`Intake (${pipeline.intake.length})`}
          active={filter === 'intake'}
          onClick={() => setFilter('intake')}
        />
        <FilterButton
          label={`Qualified (${pipeline.qualified.length})`}
          active={filter === 'qualified'}
          onClick={() => setFilter('qualified')}
        />
        <FilterButton
          label={`Proposal (${pipeline.proposal_sent.length})`}
          active={filter === 'proposal_sent'}
          onClick={() => setFilter('proposal_sent')}
        />
        <FilterButton
          label="Won"
          active={filter === 'closed_won'}
          onClick={() => setFilter('closed_won')}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-xs font-medium border-b">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Budget</th>
              <th className="p-3 text-left">Joined</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <React.Fragment key={client._id}>
                  <tr className="hover:bg-gray-50 transition cursor-pointer" onClick={() => setExpandedClientId(expandedClientId === client._id ? null : client._id)}>
                    <td className="p-3 font-medium text-gray-900">
                      <span className="mr-2">{expandedClientId === client._id ? '▼' : '▶'}</span>
                      {client.first_name} {client.last_name}
                    </td>
                    <td className="p-3 text-gray-600">{client.company_name || 'N/A'}</td>
                    <td className="p-3 text-gray-500 text-xs">{client.email}</td>
                    <td className="p-3 text-gray-600">{client.phone || 'N/A'}</td>
                    <td className="p-3">
                      {editingId === client._id ? (
                        <div className="flex gap-2">
                          <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="px-2 py-1 text-xs border rounded bg-white"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {statusOptions.map(status => (
                              <option key={status} value={status}>{formatStatus(status)}</option>
                            ))}
                          </select>
                          <button
                            onClick={(e) => { e.stopPropagation(); saveStatusUpdate(client._id); }}
                            disabled={updating}
                            className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                          >
                            ✓
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setEditingId(null); }}
                            className="px-2 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(client.status)}`}>
                          {formatStatus(client.status)}
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-gray-600 text-xs">{client.monthly_budget_range || 'N/A'}</td>
                    <td className="p-3 text-gray-500 text-xs">
                      {new Date(client.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => { setEditingId(client._id); setExpandedClientId(null); }}
                        className="px-2 py-1 text-xs bg-indigo-500 text-white rounded hover:bg-indigo-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>

                  {/* EXPANDABLE DETAILS ROW */}
                  {expandedClientId === client._id && (
                    <tr className="bg-blue-50/50">
                      <td colSpan="8" className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {/* Contact Information */}
                          <DetailField label="First Name" value={client.first_name} />
                          <DetailField label="Last Name" value={client.last_name} />
                          <DetailField label="Email" value={client.email} />
                          <DetailField label="Phone" value={client.phone || 'N/A'} />

                          {/* Company Information */}
                          <DetailField label="Company" value={client.company_name || 'N/A'} />
                          <DetailField label="Job Title" value={client.job_title || 'N/A'} />
                          <DetailField label="Industry" value={client.industry || 'N/A'} />
                          <DetailField label="Company Size" value={client.company_size || 'N/A'} />

                          {/* Budget & Decision Info */}
                          <DetailField label="Budget Range" value={client.monthly_budget_range || 'N/A'} />
                          <DetailField label="Decision Timeline" value={client.decision_timeline || 'N/A'} />
                          <DetailField label="Decision Authority" value={client.decision_authority ? 'Yes' : 'No'} />
                          <DetailField label="Current Solution" value={client.current_solution || 'N/A'} />

                          {/* Lead Source */}
                          <DetailField label="Lead Source" value={client.lead_source || 'N/A'} />
                          <DetailField label="Referred By" value={client.referred_by || 'N/A'} />

                          {/* Status & Dates */}
                          <DetailField label="Status" value={formatStatus(client.status)} />
                          <DetailField label="Joined Date" value={new Date(client.createdAt).toLocaleDateString()} />
                          <DetailField label="Last Updated" value={client.updatedAt ? new Date(client.updatedAt).toLocaleDateString() : 'N/A'} />

                          {/* Interaction Info */}
                          <DetailField label="Total Interactions" value={client.total_interactions || 0} />
                          <DetailField label="Last Interaction" value={client.last_interaction_date ? new Date(client.last_interaction_date).toLocaleDateString() : 'None'} />
                        </div>

                        {/* Notes Section */}
                        {(client.notes || client.requirements) && (
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <h4 className="font-semibold text-gray-800 mb-3">Additional Information</h4>
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                              {client.notes && (
                                <div className="mb-4">
                                  <p className="text-xs font-medium text-gray-600 uppercase mb-1">Notes</p>
                                  <p className="text-sm text-gray-700">{client.notes}</p>
                                </div>
                              )}
                              {client.requirements && (
                                <div>
                                  <p className="text-xs font-medium text-gray-600 uppercase mb-1">Requirements</p>
                                  <p className="text-sm text-gray-700">{client.requirements}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
                          <button
                            onClick={() => handleCreateClickUpTask(client)}
                            disabled={creatingTask === client._id}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition flex items-center gap-2"
                          >
                            {creatingTask === client._id ? (
                              <>
                                <span className="animate-spin">⏳</span>
                                Creating Task...
                              </>
                            ) : (
                              <>
                                📋 Create ClickUp Task
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-8 text-center text-gray-500">
                  No clients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

// Helper Components
function StatCard({ title, value, subtitle, isPercent }) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <p className="text-xs text-gray-500 font-medium">{title}</p>
      <h2 className="text-3xl font-semibold mt-1">{value}{isPercent ? '%' : ''}</h2>
      <p className="text-xs text-green-500 mt-2">{subtitle}</p>
    </div>
  );
}

function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs rounded-lg transition ${active
          ? 'bg-indigo-500 text-white'
          : 'bg-white border text-gray-700 hover:bg-gray-50'
        }`}
    >
      {label}
    </button>
  );
}

function PipelineColumn({ title, clients, onClientClick }) {
  return (
    <div className="bg-gray-100 p-4 rounded-xl">
      <h3 className="text-xs font-semibold mb-3 text-gray-700 uppercase">{title} ({clients.length})</h3>
      <div className="space-y-3">
        {clients.slice(0, 5).map((client) => (
          <div
            key={client._id}
            className="bg-white p-3 rounded-lg border text-sm shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={() => onClientClick(client._id, client.status)}
          >
            <p className="font-medium text-gray-900">{client.first_name} {client.last_name}</p>
            <p className="text-xs text-gray-500 mt-1">{client.company_name}</p>
            <p className="text-xs text-gray-400 mt-1">{client.monthly_budget_range}</p>
          </div>
        ))}
        {clients.length === 0 && <p className="text-xs text-gray-500 text-center py-2">No clients</p>}
      </div>
    </div>
  );
}

function DetailField({ label, value }) {
  return (
    <div className="bg-white p-3 rounded-lg border border-gray-200">
      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-sm text-gray-900 font-medium">{value}</p>
    </div>
  );
}


