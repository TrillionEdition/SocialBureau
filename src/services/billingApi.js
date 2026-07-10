import axios from "axios";

const API_BASE = `${import.meta.env.VITE_API_URL}/api/billing`;

// ─── Admin: Create Payment ──────────────────────────────────────────────────
export const createPayment = async (paymentData) => {
  const response = await axios.post(`${API_BASE}/admin/payments`, paymentData);
  return response.data;
};

// ─── Admin: Get All Payments ────────────────────────────────────────────────
export const getAllPayments = async (filters) => {
  const params = new URLSearchParams();
  if (filters.clientId) params.append("clientId", filters.clientId);
  if (filters.status) params.append("status", filters.status);
  if (filters.month) params.append("month", filters.month);
  if (filters.skip) params.append("skip", filters.skip);
  if (filters.limit) params.append("limit", filters.limit);

  const response = await axios.get(`${API_BASE}/admin/payments?${params.toString()}`);
  return response.data;
};

// ─── Admin: Get Payment by ID ───────────────────────────────────────────────
export const getPaymentById = async (id) => {
  const response = await axios.get(`${API_BASE}/admin/payments/${id}`);
  return response.data;
};

// ─── Admin: Update Payment ──────────────────────────────────────────────────
export const updatePayment = async (id, paymentData) => {
  const response = await axios.put(`${API_BASE}/admin/payments/${id}`, paymentData);
  return response.data;
};

// ─── Admin: Mark Payment as Paid ────────────────────────────────────────────
export const markPaymentAsPaid = async (id, paidAmount) => {
  const response = await axios.patch(`${API_BASE}/admin/payments/${id}/mark-paid`, {
    paidAmount,
  });
  return response.data;
};

// ─── Admin: Delete Payment ──────────────────────────────────────────────────
export const deletePayment = async (id) => {
  const response = await axios.delete(`${API_BASE}/admin/payments/${id}`);
  return response.data;
};

// ─── Admin: Get Dashboard Cards ─────────────────────────────────────────────
export const getDashboardCards = async () => {
  const response = await axios.get(`${API_BASE}/admin/dashboard/cards`);
  return response.data;
};

// ─── Admin: Get Payment History ─────────────────────────────────────────────
export const getPaymentHistory = async (filters) => {
  const params = new URLSearchParams();
  if (filters.billingId) params.append("billingId", filters.billingId);
  if (filters.skip) params.append("skip", filters.skip);
  if (filters.limit) params.append("limit", filters.limit);

  const response = await axios.get(`${API_BASE}/admin/payments/history/list?${params.toString()}`);
  return response.data;
};

// ─── Client: Get Own Payments ───────────────────────────────────────────────
export const getMyPayments = async (filters) => {
  const params = new URLSearchParams();
  if (filters.status) params.append("status", filters.status);
  if (filters.skip) params.append("skip", filters.skip);
  if (filters.limit) params.append("limit", filters.limit);

  const response = await axios.get(`${API_BASE}/client/payments?${params.toString()}`);
  return response.data;
};

// ─── Client: Create Razorpay Order ──────────────────────────────────────────
export const createRazorpayOrder = async (billingId) => {
  const response = await axios.post(`${API_BASE}/client/razorpay/create-order`, {
    billingId,
  });
  return response.data;
};

// ─── Client: Verify Razorpay Payment ────────────────────────────────────────
export const verifyRazorpayPayment = async (verificationData) => {
  const response = await axios.post(
    `${API_BASE}/client/razorpay/verify`,
    verificationData
  );
  return response.data;
};
