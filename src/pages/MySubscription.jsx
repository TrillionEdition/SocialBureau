import React, { useEffect, useState } from "react";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  AlertTriangle,
  PauseCircle,
  XCircle,
  Calendar,
  IndianRupee,
} from "lucide-react";
import {
  getMySubscription,
  getMyPaymentHistory,
  verifyMySubscription,
} from "@/services/clientSubscriptionApi";
import loadRazorpay from "@/utils/loadRazorpay";

const STATUS_META = {
  active: { label: "Active", color: "#10B981", bg: "bg-green-100", text: "text-green-800", icon: CheckCircle2 },
  authenticated: { label: "Pending Setup", color: "#F59E0B", bg: "bg-yellow-100", text: "text-yellow-800", icon: Clock },
  created: { label: "Pending Setup", color: "#F59E0B", bg: "bg-yellow-100", text: "text-yellow-800", icon: Clock },
  pending: { label: "Pending", color: "#F59E0B", bg: "bg-yellow-100", text: "text-yellow-800", icon: Clock },
  halted: { label: "Failed", color: "#EF4444", bg: "bg-red-100", text: "text-red-800", icon: AlertTriangle },
  paused: { label: "Paused", color: "#6B7280", bg: "bg-gray-200", text: "text-gray-800", icon: PauseCircle },
  cancelled: { label: "Cancelled", color: "#EF4444", bg: "bg-red-100", text: "text-red-800", icon: XCircle },
  completed: { label: "Completed", color: "#3B82F6", bg: "bg-blue-100", text: "text-blue-800", icon: CheckCircle2 },
  expired: { label: "Expired", color: "#6B7280", bg: "bg-gray-200", text: "text-gray-800", icon: XCircle },
};

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }) : "—";

const StatusBadge = ({ status }) => {
  const meta = STATUS_META[status] || STATUS_META.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${meta.bg} ${meta.text}`}>
      <meta.icon className="w-3.5 h-3.5" />
      {meta.label}
    </span>
  );
};

export default function MySubscription() {
  const [subscription, setSubscription] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authorizing, setAuthorizing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const subRes = await getMySubscription();
      setSubscription(subRes.data);

      if (subRes.data) {
        const histRes = await getMyPaymentHistory({ limit: 50 });
        setHistory(histRes.data || []);
      }
    } catch (err) {
      console.error("Error fetching subscription:", err);
      setError("Failed to load your subscription details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAuthorize = async () => {
    if (!subscription) return;
    try {
      setAuthorizing(true);
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Failed to load Razorpay checkout");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        subscription_id: subscription.razorpaySubscriptionId,
        name: "Social Bureau",
        description: subscription.planName,
        theme: { color: "#3B82F6" },
        handler: async (response) => {
          try {
            await verifyMySubscription({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_subscription_id: response.razorpay_subscription_id,
              razorpay_signature: response.razorpay_signature,
            });
          } catch (err) {
            console.error("Error verifying subscription:", err);
          } finally {
            await fetchData();
            setAuthorizing(false);
          }
        },
        modal: { ondismiss: () => setAuthorizing(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error starting authorization:", err);
      setError(err.message || "Failed to start payment authorization");
      setAuthorizing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Subscription</h1>
          <p className="text-gray-600 mt-1">View your subscription status, billing, and payment history</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {!subscription ? (
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12 text-center">
            <CreditCard className="w-14 h-14 text-gray-400 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-1">No Active Subscription</h2>
            <p className="text-gray-600">
              You don't have a subscription yet. Please contact your account manager to get set up.
            </p>
          </div>
        ) : (
          <>
            {/* Subscription Overview */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{subscription.planName}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Subscription ID: <span className="font-mono">{subscription.razorpaySubscriptionId}</span>
                  </p>
                </div>
                <StatusBadge status={subscription.status} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 font-medium uppercase mb-1 flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5" /> Monthly Amount
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    ₹{Number(subscription.amount).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 font-medium uppercase mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Start Date
                  </p>
                  <p className="text-lg font-bold text-gray-900">{formatDate(subscription.startDate)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 font-medium uppercase mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Next Billing Date
                  </p>
                  <p className="text-lg font-bold text-gray-900">{formatDate(subscription.nextBillingDate)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 font-medium uppercase mb-1">Last Payment</p>
                  <p className="text-lg font-bold text-gray-900 capitalize">
                    {subscription.lastPaymentStatus || "—"}
                  </p>
                </div>
              </div>

              {["created", "authenticated", "pending"].includes(subscription.status) && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-sm text-yellow-800">
                    Your card mandate isn't authorized yet. Complete setup to activate automatic monthly billing.
                  </p>
                  <button
                    onClick={handleAuthorize}
                    disabled={authorizing}
                    className="shrink-0 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {authorizing ? "Processing..." : "Complete Setup"}
                  </button>
                </div>
              )}

              {subscription.status === "halted" && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  Your last payment attempt failed. Please contact support or update your payment method to avoid service interruption.
                </div>
              )}

              {subscription.status === "paused" && (
                <div className="mt-6 p-4 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-700">
                  Your subscription is currently paused by our team. Contact your account manager for details.
                </div>
              )}

              {subscription.status === "cancelled" && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  This subscription has been cancelled.
                </div>
              )}
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Payment History</h2>
              </div>

              {history.length === 0 ? (
                <div className="p-12 text-center">
                  <Clock className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No payments recorded yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Method</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
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
                              {h.status.charAt(0).toUpperCase() + h.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
