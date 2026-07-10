import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  TrendingUp,
  Plus
} from "lucide-react";
import { getDashboardCards, getAllPayments } from "@/services/billingApi";

export default function AdminBillingDashboard() {
  const navigate = useNavigate();
  const [dashboardCards, setDashboardCards] = useState(null);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [cardsRes, paymentsRes] = await Promise.all([
          getDashboardCards(),
          getAllPayments({ limit: 5 }),
        ]);

        setDashboardCards(cardsRes.data);
        setRecentPayments(paymentsRes.data || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {trend}
            </p>
          )}
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}15` }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage and track client payments</p>
        </div>
        <button
          onClick={() => navigate("/admin/billing/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Payment
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Dashboard Cards Grid */}
      {dashboardCards && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Clock}
            label="Total Pending"
            value={dashboardCards.totalPending}
            color="#F59E0B"
            trend="Awaiting payment"
          />
          <StatCard
            icon={CheckCircle2}
            label="Total Paid"
            value={dashboardCards.totalPaid}
            color="#10B981"
            trend="This month"
          />
          <StatCard
            icon={AlertTriangle}
            label="Overdue"
            value={dashboardCards.totalOverdue}
            color="#EF4444"
            trend="Action required"
          />
          <StatCard
            icon={FileText}
            label="Due Today"
            value={dashboardCards.dueTodayCount}
            color="#3B82F6"
            trend={`₹${dashboardCards.pendingAmount?.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* Recent Payments */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Recent Payments</h2>
          <button
            onClick={() => navigate("/admin/billing/list")}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All →
          </button>
        </div>

        {recentPayments.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No payments yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/admin/billing/${payment._id}`)}
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {payment.clientId?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{payment.title}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ₹{payment.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(payment.dueDate).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          payment.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "overdue"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
