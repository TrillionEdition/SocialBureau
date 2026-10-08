import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  PauseCircle,
  X,
  UserPlus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
} from "lucide-react";
import {
  getAllSubscriptions,
  getAllPaymentHistory,
  getPaymentLinkTransactions,
  createSubscription,
  getClientUsers,
  createClientUser,
} from "@/services/clientSubscriptionApi";

const STATUS_STYLES = {
  active: "bg-green-100 text-green-800",
  authenticated: "bg-yellow-100 text-yellow-800",
  created: "bg-yellow-100 text-yellow-800",
  pending: "bg-yellow-100 text-yellow-800",
  halted: "bg-red-100 text-red-800",
  paused: "bg-gray-200 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
  expired: "bg-gray-200 text-gray-800",
};

const StatusPill = ({ status }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[status] || "bg-gray-100 text-gray-700"}`}>
    {status}
  </span>
);

function CreateSubscriptionModal({ onClose, onCreated }) {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    clientId: "",
    mode: "link", // "link" existing subscription or "create" a new one
    razorpaySubscriptionId: "",
    razorpayPlanId: "",
    planName: "",
    amount: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [clientSearch, setClientSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [loadingClients, setLoadingClients] = useState(true);

  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [newClient, setNewClient] = useState({ name: "", email: "", phone: "", password: "" });
  const [creatingClient, setCreatingClient] = useState(false);
  const [newClientError, setNewClientError] = useState(null);

  const clientBoxRef = useRef(null);

  const loadClients = async () => {
    try {
      setLoadingClients(true);
      const res = await getClientUsers();
      setClients(res.data || []);
    } catch (err) {
      console.error("Failed to load clients:", err);
    } finally {
      setLoadingClients(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  // Close the suggestions dropdown when clicking outside of it.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (clientBoxRef.current && !clientBoxRef.current.contains(e.target)) {
        setShowClientDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredClients = clients.filter((c) => {
    const q = clientSearch.toLowerCase();
    return !q || c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q);
  });

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setForm({ ...form, clientId: client._id });
    setClientSearch(`${client.name} (${client.email})`);
    setShowClientDropdown(false);
  };

  const handleCreateClient = async (e) => {
    e.preventDefault();
    setNewClientError(null);

    if (!newClient.name || !newClient.email || !newClient.password) {
      setNewClientError("Name, email, and password are required");
      return;
    }

    try {
      setCreatingClient(true);
      const res = await createClientUser(newClient);
      const created = res.data;
      setClients((prev) => [created, ...prev]);
      handleSelectClient(created);
      setShowNewClientForm(false);
      setNewClient({ name: "", email: "", phone: "", password: "" });
    } catch (err) {
      console.error("Error creating client:", err);
      setNewClientError(err.response?.data?.error || "Failed to create client");
    } finally {
      setCreatingClient(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.clientId) {
      setError("Please select a client");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        clientId: form.clientId,
        planName: form.planName || undefined,
        amount: form.amount ? Number(form.amount) : undefined,
        notes: form.notes || undefined,
      };
      if (form.mode === "link") {
        if (!form.razorpaySubscriptionId) {
          setError("Razorpay Subscription ID is required");
          setSubmitting(false);
          return;
        }
        payload.razorpaySubscriptionId = form.razorpaySubscriptionId;
      } else {
        if (!form.razorpayPlanId || !form.planName || !form.amount) {
          setError("Plan ID, plan name, and amount are required");
          setSubmitting(false);
          return;
        }
        payload.razorpayPlanId = form.razorpayPlanId;
      }

      await createSubscription(payload);
      onCreated();
    } catch (err) {
      console.error("Error creating subscription:", err);
      setError(err.response?.data?.error || "Failed to create subscription");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Assign Subscription</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div ref={clientBoxRef} className="relative">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Client</label>
              <button
                type="button"
                onClick={() => setShowNewClientForm((v) => !v)}
                className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                <UserPlus className="w-3.5 h-3.5" /> {showNewClientForm ? "Cancel" : "Add New Client"}
              </button>
            </div>

            {!showNewClientForm && (
              <div className="relative">
                <input
                  type="text"
                  placeholder={loadingClients ? "Loading clients..." : "Type to search by name or email"}
                  value={clientSearch}
                  onFocus={() => setShowClientDropdown(true)}
                  onChange={(e) => {
                    setClientSearch(e.target.value);
                    setSelectedClient(null);
                    setForm({ ...form, clientId: "" });
                    setShowClientDropdown(true);
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />

                {showClientDropdown && (
                  <div className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
                    {loadingClients ? (
                      <div className="px-3 py-2 text-sm text-gray-500">Loading...</div>
                    ) : filteredClients.length === 0 ? (
                      <div className="px-3 py-2 text-sm text-gray-500">
                        No clients found. Use "Add New Client" above to create one.
                      </div>
                    ) : (
                      filteredClients.map((c) => (
                        <button
                          type="button"
                          key={c._id}
                          onClick={() => handleSelectClient(c)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 border-b border-gray-100 last:border-0"
                        >
                          <div className="font-medium text-gray-900">{c.name}</div>
                          <div className="text-xs text-gray-500">{c.email}</div>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {showNewClientForm && (
              <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
                {newClientError && (
                  <div className="p-2 bg-red-50 border border-red-200 rounded text-red-700 text-xs">
                    {newClientError}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Full name"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder:!text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  <input
                    type="email"
                    placeholder="Email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder:!text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Phone (optional)"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder:!text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={newClient.password}
                    onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder:!text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleCreateClient}
                  disabled={creatingClient}
                  className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-black transition disabled:opacity-50"
                >
                  {creatingClient ? "Creating..." : "Create & Select Client"}
                </button>
              </div>
            )}

            {selectedClient && !showNewClientForm && (
              <p className="text-xs text-green-700 mt-1">Selected: {selectedClient.name} ({selectedClient.email})</p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setForm({ ...form, mode: "link" })}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border ${
                form.mode === "link" ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-700"
              }`}
            >
              Link Existing
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, mode: "create" })}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border ${
                form.mode === "create" ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-700"
              }`}
            >
              Create New
            </button>
          </div>

          {form.mode === "link" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Razorpay Subscription ID</label>
              <input
                type="text"
                placeholder="sub_XXXXXXXXXXXX"
                value={form.razorpaySubscriptionId}
                onChange={(e) => setForm({ ...form, razorpaySubscriptionId: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder:!text-gray-400"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Razorpay Plan ID</label>
              <input
                type="text"
                placeholder="plan_XXXXXXXXXXXX"
                value={form.razorpayPlanId}
                onChange={(e) => setForm({ ...form, razorpayPlanId: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
              <input
                type="text"
                placeholder="e.g. Growth Plan"
                value={form.planName}
                onChange={(e) => setForm({ ...form, planName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹/month)</label>
              <input
                type="number"
                min="0"
                placeholder="5000"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes (optional)</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitting ? "Assigning..." : "Assign Subscription"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminSubscriptionManagement() {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionsTotal, setTransactionsTotal] = useState(0);
  const [transactionsSkip, setTransactionsSkip] = useState(0);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [paymentLinkTransactions, setPaymentLinkTransactions] = useState([]);
  const [paymentLinkTotal, setPaymentLinkTotal] = useState(0);
  const [paymentLinkSkip, setPaymentLinkSkip] = useState(0);
  const [paymentLinkLoading, setPaymentLinkLoading] = useState(true);
  const [paymentLinkError, setPaymentLinkError] = useState(null);
  const transactionLimit = 20;

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await getAllSubscriptions({
        search: search || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        limit: 100,
      });
      setSubscriptions(res.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching subscriptions:", err);
      setError("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(fetchSubscriptions, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, statusFilter]);

  useEffect(() => {
    let cancelled = false;
    const fetchTransactions = async () => {
      try {
        setTransactionsLoading(true);
        const res = await getAllPaymentHistory({
          search: search || undefined,
          skip: transactionsSkip,
          limit: transactionLimit,
        });
        if (!cancelled) {
          setTransactions(res.data || []);
          setTransactionsTotal(res.total || 0);
        }
      } catch (err) {
        console.error("Error fetching Razorpay transactions:", err);
        if (!cancelled) {
          setTransactions([]);
          setTransactionsTotal(0);
        }
      } finally {
        if (!cancelled) setTransactionsLoading(false);
      }
    };
    fetchTransactions();
    return () => {
      cancelled = true;
    };
  }, [search, transactionsSkip]);

  useEffect(() => {
    setTransactionsSkip(0);
    setPaymentLinkSkip(0);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    const fetchLinkTransactions = async () => {
      try {
        setPaymentLinkLoading(true);
        const res = await getPaymentLinkTransactions({
          search: search || undefined,
          skip: paymentLinkSkip,
          limit: transactionLimit,
        });
        if (!cancelled) {
          setPaymentLinkTransactions(res.data || []);
          setPaymentLinkTotal(res.total || 0);
          setPaymentLinkError(null);
        }
      } catch (err) {
        console.error("Error fetching Razorpay Payment Link transactions:", err);
        if (!cancelled) {
          setPaymentLinkTransactions([]);
          setPaymentLinkTotal(0);
          setPaymentLinkError("Could not load Payment Link transactions from Razorpay");
        }
      } finally {
        if (!cancelled) setPaymentLinkLoading(false);
      }
    };
    fetchLinkTransactions();
    return () => {
      cancelled = true;
    };
  }, [search, paymentLinkSkip]);

  const stats = {
    active: subscriptions.filter((s) => s.status === "active").length,
    pending: subscriptions.filter((s) => ["created", "authenticated", "pending"].includes(s.status)).length,
    failed: subscriptions.filter((s) => s.status === "halted").length,
    paused: subscriptions.filter((s) => s.status === "paused").length,
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Subscription Management</h1>
            <p className="text-gray-600 mt-1">Manage client Razorpay subscriptions and recurring billing</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2 justify-center"
          >
            <Plus className="w-4 h-4" /> Assign Subscription
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs font-medium">Active</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs font-medium">Pending Setup</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs font-medium">Failed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.failed}</p>
              </div>
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-gray-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs font-medium">Paused</p>
                <p className="text-2xl font-bold text-gray-900">{stats.paused}</p>
              </div>
              <PauseCircle className="w-6 h-6 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by client name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="created">Created</option>
            <option value="authenticated">Authenticated</option>
            <option value="pending">Pending</option>
            <option value="halted">Failed / Halted</option>
            <option value="paused">Paused</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No subscriptions found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Plan</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Next Billing</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((s) => (
                    <tr
                      key={s._id}
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/admin/subscriptions/${s._id}`)}
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {s.clientId?.name || "N/A"}
                        <div className="text-xs text-gray-500">{s.clientId?.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{s.planName}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        ₹{Number(s.amount).toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {s.nextBillingDate ? new Date(s.nextBillingDate).toLocaleDateString("en-IN") : "—"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <StatusPill status={s.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <section className="mt-8" aria-labelledby="razorpay-transactions-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
            <div>
              <h2 id="razorpay-transactions-heading" className="text-xl font-bold text-gray-900">Razorpay Transactions</h2>
              <p className="text-sm text-gray-600 mt-1">Payments and billing attempts across client subscriptions</p>
            </div>
            <p className="text-sm text-gray-500">{transactionsTotal} transactions</p>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {transactionsLoading ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            ) : transactions.length === 0 ? (
              <div className="p-8 text-center">
                <CreditCard className="w-9 h-9 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No Razorpay transactions found</p>
              </div>
            ) : (
              <>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Client</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Method</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Razorpay IDs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction._id} className="border-b border-gray-100 last:border-0">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {transaction.clientId?.name || "Unknown client"}
                            <div className="text-xs font-normal text-gray-500">{transaction.clientId?.email}</div>
                            <div className="text-xs text-gray-500">{transaction.subscriptionId?.planName}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {transaction.occurredAt ? new Date(transaction.occurredAt).toLocaleString("en-IN") : "—"}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                            {transaction.currency || "INR"} {Number(transaction.amount).toLocaleString("en-IN")}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 capitalize">{transaction.method || "—"}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${transaction.status === "captured" ? "bg-green-100 text-green-800" : transaction.status === "failed" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700"}`}>
                              {transaction.status}
                            </span>
                            {transaction.failureReason && <div className="mt-1 max-w-48 text-xs text-red-700">{transaction.failureReason}</div>}
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-600">
                            <div className="font-mono break-all">{transaction.razorpayPaymentId || "—"}</div>
                            {transaction.razorpayInvoiceId && <div className="mt-1 font-mono break-all text-gray-400">{transaction.razorpayInvoiceId}</div>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="md:hidden divide-y divide-gray-100">
                  {transactions.map((transaction) => (
                    <article key={transaction._id} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{transaction.clientId?.name || "Unknown client"}</p>
                          <p className="text-xs text-gray-500 break-all">{transaction.clientId?.email}</p>
                        </div>
                        <span className={`shrink-0 inline-flex px-2 py-1 rounded-full text-xs font-semibold capitalize ${transaction.status === "captured" ? "bg-green-100 text-green-800" : transaction.status === "failed" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700"}`}>
                          {transaction.status}
                        </span>
                      </div>
                      <div className="mt-3 flex items-baseline justify-between gap-3">
                        <p className="text-lg font-bold text-gray-900">{transaction.currency || "INR"} {Number(transaction.amount).toLocaleString("en-IN")}</p>
                        <p className="text-xs text-gray-500 text-right">{transaction.occurredAt ? new Date(transaction.occurredAt).toLocaleString("en-IN") : "—"}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {transaction.subscriptionId?.planName || "Subscription"} · <span className="capitalize">{transaction.method || "method unavailable"}</span>
                      </p>
                      <p className="mt-2 text-xs text-gray-500 break-all">Payment ID: {transaction.razorpayPaymentId || "—"}</p>
                      {transaction.razorpayInvoiceId && <p className="text-xs text-gray-500 break-all">Invoice ID: {transaction.razorpayInvoiceId}</p>}
                      {transaction.failureReason && <p className="mt-1 text-xs text-red-700">{transaction.failureReason}</p>}
                    </article>
                  ))}
                </div>

                {transactionsTotal > transactionLimit && (
                  <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between gap-3">
                    <p className="text-xs sm:text-sm text-gray-600">
                      {transactionsSkip + 1}–{Math.min(transactionsSkip + transactionLimit, transactionsTotal)} of {transactionsTotal}
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        aria-label="Previous transactions"
                        onClick={() => setTransactionsSkip((skip) => Math.max(0, skip - transactionLimit))}
                        disabled={transactionsSkip === 0}
                        className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="Next transactions"
                        onClick={() => setTransactionsSkip((skip) => skip + transactionLimit)}
                        disabled={transactionsSkip + transactionLimit >= transactionsTotal}
                        className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <section className="mt-8" aria-labelledby="payment-link-transactions-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
            <div>
              <h2 id="payment-link-transactions-heading" className="text-xl font-bold text-gray-900">One-Time Payment Links</h2>
              <p className="text-sm text-gray-600 mt-1">Transactions collected through Razorpay Payment Links</p>
            </div>
            {!paymentLinkError && <p className="text-sm text-gray-500">{paymentLinkTotal} transactions</p>}
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {paymentLinkLoading ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            ) : paymentLinkError ? (
              <div role="alert" className="p-5 text-sm text-red-700 bg-red-50">{paymentLinkError}</div>
            ) : paymentLinkTransactions.length === 0 ? (
              <div className="p-8 text-center">
                <CreditCard className="w-9 h-9 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No one-time Payment Link transactions found</p>
              </div>
            ) : (
              <>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Client</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Method</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Payment / Link ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentLinkTransactions.map((transaction) => (
                        <tr key={transaction._id} className="border-b border-gray-100 last:border-0">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {transaction.clientId?.name}
                            <div className="text-xs font-normal text-gray-500">{transaction.clientId?.email}</div>
                            <div className="text-xs text-gray-500">{transaction.description || "One-time payment"}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {transaction.occurredAt ? new Date(transaction.occurredAt).toLocaleString("en-IN") : "—"}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                            {transaction.currency || "INR"} {Number(transaction.amount).toLocaleString("en-IN")}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 capitalize">{transaction.method || "—"}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${transaction.status === "captured" ? "bg-green-100 text-green-800" : transaction.status === "failed" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700"}`}>
                              {transaction.status}
                            </span>
                            {transaction.failureReason && <div className="mt-1 max-w-48 text-xs text-red-700">{transaction.failureReason}</div>}
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-600">
                            <div className="font-mono break-all">{transaction.razorpayPaymentId}</div>
                            <div className="mt-1 font-mono break-all text-gray-400">{transaction.razorpayPaymentLinkId}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="md:hidden divide-y divide-gray-100">
                  {paymentLinkTransactions.map((transaction) => (
                    <article key={transaction._id} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{transaction.clientId?.name}</p>
                          <p className="text-xs text-gray-500 break-all">{transaction.clientId?.email}</p>
                        </div>
                        <span className={`shrink-0 inline-flex px-2 py-1 rounded-full text-xs font-semibold capitalize ${transaction.status === "captured" ? "bg-green-100 text-green-800" : transaction.status === "failed" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700"}`}>
                          {transaction.status}
                        </span>
                      </div>
                      <div className="mt-3 flex items-baseline justify-between gap-3">
                        <p className="text-lg font-bold text-gray-900">{transaction.currency || "INR"} {Number(transaction.amount).toLocaleString("en-IN")}</p>
                        <p className="text-xs text-gray-500 text-right">{transaction.occurredAt ? new Date(transaction.occurredAt).toLocaleString("en-IN") : "—"}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{transaction.description || "One-time payment"} · <span className="capitalize">{transaction.method || "method unavailable"}</span></p>
                      <p className="mt-2 text-xs text-gray-500 break-all">Payment ID: {transaction.razorpayPaymentId}</p>
                      <p className="text-xs text-gray-500 break-all">Payment Link ID: {transaction.razorpayPaymentLinkId}</p>
                      {transaction.failureReason && <p className="mt-1 text-xs text-red-700">{transaction.failureReason}</p>}
                    </article>
                  ))}
                </div>

                {paymentLinkTotal > transactionLimit && (
                  <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between gap-3">
                    <p className="text-xs sm:text-sm text-gray-600">
                      {paymentLinkSkip + 1}–{Math.min(paymentLinkSkip + transactionLimit, paymentLinkTotal)} of {paymentLinkTotal}
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        aria-label="Previous Payment Link transactions"
                        onClick={() => setPaymentLinkSkip((skip) => Math.max(0, skip - transactionLimit))}
                        disabled={paymentLinkSkip === 0}
                        className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="Next Payment Link transactions"
                        onClick={() => setPaymentLinkSkip((skip) => skip + transactionLimit)}
                        disabled={paymentLinkSkip + transactionLimit >= paymentLinkTotal}
                        className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>

      {showCreateModal && (
        <CreateSubscriptionModal
          onClose={() => setShowCreateModal(false)}
          onCreated={() => {
            setShowCreateModal(false);
            fetchSubscriptions();
          }}
        />
      )}
    </div>
  );
}
