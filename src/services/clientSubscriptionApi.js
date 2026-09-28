import axios from "axios";

const API_BASE = `${import.meta.env.VITE_API_URL}/api/client-subscriptions`;

axios.defaults.withCredentials = true;

// ─── Admin ───────────────────────────────────────────────────────────────
export const getClientUsers = async (search) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  const response = await axios.get(`${API_BASE}/admin/clients?${params.toString()}`);
  return response.data;
};

export const createClientUser = async (payload) => {
  const response = await axios.post(`${API_BASE}/admin/clients`, payload);
  return response.data;
};

export const createSubscription = async (payload) => {
  const response = await axios.post(`${API_BASE}/admin`, payload);
  return response.data;
};

export const getAllSubscriptions = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.append("search", filters.search);
  if (filters.status) params.append("status", filters.status);
  if (filters.skip) params.append("skip", filters.skip);
  if (filters.limit) params.append("limit", filters.limit);

  const response = await axios.get(`${API_BASE}/admin?${params.toString()}`);
  return response.data;
};

export const getSubscriptionById = async (id) => {
  const response = await axios.get(`${API_BASE}/admin/${id}`);
  return response.data;
};

export const pauseSubscription = async (id) => {
  const response = await axios.patch(`${API_BASE}/admin/${id}/pause`);
  return response.data;
};

export const resumeSubscription = async (id) => {
  const response = await axios.patch(`${API_BASE}/admin/${id}/resume`);
  return response.data;
};

export const cancelSubscription = async (id, cancelAtCycleEnd = false) => {
  const response = await axios.patch(`${API_BASE}/admin/${id}/cancel`, {
    cancelAtCycleEnd,
  });
  return response.data;
};

export const getAllPaymentHistory = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.subscriptionId) params.append("subscriptionId", filters.subscriptionId);
  if (filters.clientId) params.append("clientId", filters.clientId);
  if (filters.status) params.append("status", filters.status);
  if (filters.skip) params.append("skip", filters.skip);
  if (filters.limit) params.append("limit", filters.limit);

  const response = await axios.get(`${API_BASE}/admin/history?${params.toString()}`);
  return response.data;
};

// ─── Client ──────────────────────────────────────────────────────────────
export const getMySubscription = async () => {
  const response = await axios.get(`${API_BASE}/me`);
  return response.data;
};

export const getMyPaymentHistory = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.skip) params.append("skip", filters.skip);
  if (filters.limit) params.append("limit", filters.limit);

  const response = await axios.get(`${API_BASE}/me/history?${params.toString()}`);
  return response.data;
};

export const verifyMySubscription = async (payload) => {
  const response = await axios.post(`${API_BASE}/me/verify`, payload);
  return response.data;
};
