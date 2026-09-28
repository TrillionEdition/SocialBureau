import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  IndianRupee,
  Calendar,
  PauseCircle,
  PlayCircle,
  XCircle,
  User,
  Mail,
  Phone,
} from "lucide-react";
import {
  getSubscriptionById,
  pauseSubscription,
  resumeSubscription,
  cancelSubscription,
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

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }) : "—";

export default function AdminSubscriptionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getSubscriptionById(id);
      setSubscription(res.data);
      setHistory(res.history || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching subscription:", err);
      setError("Failed to load subscription");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const runAction = async (action, confirmMsg) => {
    if (confirmMsg && !window.confirm(confirmMsg)) return;
    try {
      setActionLoading(true);
      await action(id);
      await fetchData();
    } catch (err) {
      console.error("Action failed:", err);
      alert(err.response?.data?.error || "Action failed");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !subscription) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error || "Subscription not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/admin/subscriptions")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Subscriptions
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">{subscription.planName}</h1>
              <p className="text-sm text-gray-500 mt-1 font-mono">{subscription.razorpaySubscriptionId}</p>
            </div>
            <span className={`inline-flex w-fit items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[subscription.status] || "bg-gray-100 text-gray-700"}`}>
              {subscription.status}
            </span>
          </div>

          {/* Client info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <User className="w-4 h-4 text-gray-400" /> {subscription.clientId?.name || "N/A"}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Mail className="w-4 h-4 text-gray-400" /> {subscription.clientId?.email || "—"}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone className="w-4 h-4 text-gray-400" /> {subscription.clientId?.phone || "—"}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 font-medium uppercase mb-1 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5" /> Amount
              </p>
              <p className="text-lg font-bold text-gray-900">₹{Number(subscription.amount).toLocaleString("en-IN")}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 font-medium uppercase mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Start Date
              </p>
              <p className="text-lg font-bold text-gray-900">{formatDate(subscription.startDate)}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 font-medium uppercase mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Next Billing
              </p>
              <p className="text-lg font-bold text-gray-900">{formatDate(subscription.nextBillingDate)}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 font-medium uppercase mb-1">Last Payment</p>
              <p className="text-lg font-bold text-gray-900 capitalize">{subscription.lastPaymentStatus || "—"}</p>
            </div>
          </div>

          {subscription.notes && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
              <strong>Admin Notes:</strong> {subscription.notes}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {subscription.status === "active" && (
              <button
                disabled={actionLoading}
                onClick={() => runAction(pauseSubscription, "Pause this subscription?")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition disabled:opacity-50"
              >
                <PauseCircle className="w-4 h-4" /> Pause
              </button>
            )}
            {subscription.status === "paused" && (
              <button
                disabled={actionLoading}
                onClick={() => runAction(resumeSubscription, "Resume this subscription?")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-green-100 text-green-800 hover:bg-green-200 transition disabled:opacity-50"
              >
                <PlayCircle className="w-4 h-4" /> Resume
              </button>
            )}
            {!["cancelled", "completed", "expired"].includes(subscription.status) && (
              <button
                disabled={actionLoading}
                onClick={() =>
                  runAction(
                    (subId) => cancelSubscription(subId, false),
                    "Cancel this subscription? This cannot be undone."
                  )
                }
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200 transition disabled:opacity-50"
              >
                <XCircle className="w-4 h-4" /> Cancel
              </button>
            )}
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Payment / Billing History</h2>
          </div>
          {history.length === 0 ? (
            <div className="p-12 text-center text-gray-600">No payments recorded yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Failure Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h) => (
                    <tr key={h._id} className="border-b border-gray-100">
                      <td className="px-6 py-4 text-sm text-gray-600">{formatDate(h.occurredAt || h.createdAt)}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        ₹{Number(h.amount).toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 capitalize">{h.method || "—"}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            h.status === "captured"
                              ? "bg-green-100 text-green-800"
                              : h.status === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {h.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{h.failureReason || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
