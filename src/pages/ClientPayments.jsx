import React, { useEffect, useState } from "react";
import { getMyPayments, createRazorpayOrder, verifyRazorpayPayment } from "../services/billingApi";
import { AlertTriangle, Clock, CheckCircle2, CreditCard, ChevronRight } from "lucide-react";

export default function ClientPayments() {
  const [payments, setPayments] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [payingId, setPayingId] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await getMyPayments({ limit: 100 });
      setPayments(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching payments:", err);
      setError("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter((p) => {
    if (activeFilter === "pending") return p.status === "pending";
    if (activeFilter === "paid") return p.status === "paid";
    if (activeFilter === "overdue") return p.status === "overdue";
    return true;
  });

  const stats = {
    pending: payments.filter((p) => p.status === "pending").length,
    paid: payments.filter((p) => p.status === "paid").length,
    overdue: payments.filter((p) => p.status === "overdue").length,
  };

  const handlePayment = async (payment) => {
    if (!payment.razorpayEnabled) {
      alert("Razorpay payments are not enabled for this payment");
      return;
    }

    try {
      setPayingId(payment._id);
      setProcessingPayment(true);

      // Create Razorpay order
      const orderResponse = await createRazorpayOrder(payment._id);
      const { orderId, amount, currency } = orderResponse.data;

      // Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        order_id: orderId,
        amount,
        currency,
        name: "Social Bureau",
        description: payment.title,
        handler: async (response) => {
          try {
            // Verify payment
            await verifyRazorpayPayment({
              razorpayOrderId: orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              billingId: payment._id,
            });

            // Refresh payments
            await fetchPayments();
            setSelectedPayment(null);
            alert("Payment successful!");
          } catch (err) {
            console.error("Error verifying payment:", err);
            alert("Payment verification failed. Please contact support.");
          } finally {
            setProcessingPayment(false);
            setPayingId(null);
          }
        },
        prefill: {
          name: "Client",
          email: "client@example.com",
        },
        theme: {
          color: "#3B82F6",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error("Error initiating payment:", err);
      alert(err.response?.data?.error || "Failed to initiate payment");
      setProcessingPayment(false);
      setPayingId(null);
    }
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}15` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Payments</h1>
        <p className="text-gray-600 mt-1">View and manage your invoices and payments</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={Clock}
          label="Pending"
          value={stats.pending}
          color="#F59E0B"
        />
        <StatCard
          icon={CheckCircle2}
          label="Paid"
          value={stats.paid}
          color="#10B981"
        />
        <StatCard
          icon={AlertTriangle}
          label="Overdue"
          value={stats.overdue}
          color="#EF4444"
        />
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b border-gray-200">
          {["all", "pending", "paid", "overdue"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`flex-1 px-4 py-4 text-center font-medium transition ${
                activeFilter === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} ({
                tab === "all" ? payments.length : stats[tab] || 0
              })
            </button>
          ))}
        </div>
      </div>

      {/* Payments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              {activeFilter === "all"
                ? "No payments found"
                : `No ${activeFilter} payments`}
            </p>
          </div>
        ) : (
          filteredPayments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{payment.title}</h3>
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
                  </div>

                  {payment.description && (
                    <p className="text-gray-600 text-sm mb-3">{payment.description}</p>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 font-medium">Amount</p>
                      <p className="text-gray-900 font-bold text-lg">
                        ₹{payment.amount.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Due Date</p>
                      <p className="text-gray-900 font-semibold">
                        {new Date(payment.dueDate).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    {payment.paidAt && (
                      <div>
                        <p className="text-gray-600 font-medium">Paid Date</p>
                        <p className="text-green-600 font-semibold">
                          {new Date(payment.paidAt).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-600 font-medium">Type</p>
                      <p className="text-gray-900 font-semibold">
                        {payment.type === "monthly" ? "Monthly" : "One-time"}
                      </p>
                    </div>
                  </div>
                </div>

                {payment.status !== "paid" && payment.razorpayEnabled && (
                  <button
                    onClick={() => handlePayment(payment)}
                    disabled={processingPayment && payingId === payment._id}
                    className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                  >
                    <CreditCard className="w-4 h-4" />
                    {processingPayment && payingId === payment._id ? "Processing..." : "Pay Now"}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
    </div>
  );
}
