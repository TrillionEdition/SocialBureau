import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Save, Check } from "lucide-react";
import { markPaymentAsPaid,createPayment,getPaymentById,updatePayment, } from "@/services/billingApi";

export default function AdminPaymentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [formData, setFormData] = useState({
    clientId: "",
    title: "",
    description: "",
    amount: "",
    dueDate: "",
    type: "one_time",
    recurring: false,
    razorpayEnabled: false,
  });

  const [clients, setClients] = useState([]);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(!isNew);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isNew) {
      fetchPaymentDetails();
    }
    // TODO: Fetch clients from API
    // For now, we'll rely on the form to have the client ID input
  }, [id, isNew]);

  const fetchPaymentDetails = async () => {
    try {
      setLoading(true);
      const response = await getPaymentById(id);
      const payment = response.data;

      setPayment(payment);
      setFormData({
        clientId: payment.clientId._id,
        title: payment.title,
        description: payment.description || "",
        amount: payment.amount,
        dueDate: new Date(payment.dueDate).toISOString().split("T")[0],
        type: payment.type,
        recurring: payment.recurring,
        razorpayEnabled: payment.razorpayEnabled,
      });

      setError(null);
    } catch (err) {
      console.error("Error fetching payment:", err);
      setError("Failed to load payment details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      if (isNew) {
        await createPayment(formData);
        setSuccess(true);
        setTimeout(() => navigate("/admin/billing/list"), 1500);
      } else {
        await updatePayment(id, formData);
        setSuccess(true);
        setTimeout(() => fetchPaymentDetails(), 500);
      }
    } catch (err) {
      console.error("Error saving payment:", err);
      setError(err.response?.data?.error || "Failed to save payment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkAsPaid = async () => {
    if (!window.confirm("Mark this payment as paid?")) return;

    try {
      setSubmitting(true);
      await markPaymentAsPaid(id, formData.amount);
      setSuccess(true);
      setTimeout(() => fetchPaymentDetails(), 500);
    } catch (err) {
      console.error("Error marking as paid:", err);
      setError(err.response?.data?.error || "Failed to mark payment as paid");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isEditing = !isNew && payment;
  const isPaid = payment?.status === "paid";

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-200 rounded-lg transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isNew ? "Create Payment" : "Edit Payment"}
        </h1>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2">
          <Check className="w-4 h-4" />
          {isNew ? "Payment created successfully!" : "Payment updated successfully!"}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Client ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              placeholder="Paste client ID"
              disabled={isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Cannot be changed after creation</p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Monthly Retainer - July 2024"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Additional details about the payment"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0"
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="one_time">One-time</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Checkboxes */}
          <div className="md:col-span-2 space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="recurring"
                checked={formData.recurring}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 font-medium">Mark as recurring</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="razorpayEnabled"
                checked={formData.razorpayEnabled}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 font-medium">
                Enable Razorpay payment
              </span>
            </label>
          </div>
        </div>

        {/* Status Display */}
        {isEditing && payment && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-600 font-semibold uppercase">Status</p>
                <p className="text-lg font-bold text-gray-900 mt-1">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      payment.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : payment.status === "overdue"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </p>
              </div>

              {payment.paidAt && (
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase">Paid At</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {new Date(payment.paidAt).toLocaleDateString("en-IN")}
                  </p>
                </div>
              )}

              {payment.razorpayPaymentId && (
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase">
                    Razorpay ID
                  </p>
                  <p className="text-sm font-mono text-gray-900 mt-1">
                    {payment.razorpayPaymentId.substring(0, 20)}...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          {isEditing && !isPaid && (
            <button
              type="button"
              onClick={handleMarkAsPaid}
              disabled={submitting}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Mark as Paid
            </button>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {submitting ? "Saving..." : isNew ? "Create" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
