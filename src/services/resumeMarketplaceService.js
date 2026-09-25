import axios from "axios";
import { BASE_URL } from "@/utils/urls";

const API = `${BASE_URL}/api/resume-marketplace`;

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const unwrap = (promise) =>
  promise.then((res) => res.data).catch((err) => {
    throw err.response?.data || { success: false, message: err.message };
  });

/* ---------- Company: browse & unlock ---------- */

export const getResumeListingsAPI = (params = {}) =>
  unwrap(
    axios.get(`${API}/resumes`, {
      params,
      withCredentials: true,
      headers: authHeaders(),
    })
  );

export const getResumeListingBasicAPI = (id) =>
  unwrap(
    axios.get(`${API}/resumes/${id}`, {
      withCredentials: true,
      headers: authHeaders(),
    })
  );

export const unlockResumeAPI = (id) =>
  unwrap(
    axios.get(`${API}/resumes/${id}/full`, {
      withCredentials: true,
      headers: authHeaders(),
    })
  );

/* ---------- Company: purchases ---------- */

export const createResumePurchaseOrderAPI = () =>
  unwrap(
    axios.post(
      `${API}/purchase/create-order`,
      {},
      { withCredentials: true, headers: authHeaders() }
    )
  );

export const verifyResumePurchasePaymentAPI = (payload) =>
  unwrap(
    axios.post(`${API}/purchase/verify`, payload, {
      withCredentials: true,
      headers: authHeaders(),
    })
  );

export const getMyResumePurchasesAPI = () =>
  unwrap(
    axios.get(`${API}/purchases/my`, {
      withCredentials: true,
      headers: authHeaders(),
    })
  );

export const getMyResumeDownloadsAPI = () =>
  unwrap(
    axios.get(`${API}/downloads/my`, {
      withCredentials: true,
      headers: authHeaders(),
    })
  );

/* ---------- Admin: resume management ---------- */

export const getAdminResumeListingsAPI = (params = {}) =>
  unwrap(
    axios.get(`${API}/admin/resumes`, {
      params,
      withCredentials: true,
      headers: authHeaders(),
    })
  );

export const getAdminResumeListingByIdAPI = (id) =>
  unwrap(
    axios.get(`${API}/admin/resumes/${id}`, {
      withCredentials: true,
      headers: authHeaders(),
    })
  );

export const createResumeListingAPI = (formData) =>
  unwrap(
    axios.post(`${API}/admin/resumes`, formData, {
      withCredentials: true,
      headers: { ...authHeaders(), "Content-Type": "multipart/form-data" },
    })
  );

export const updateResumeListingAPI = (id, formData) =>
  unwrap(
    axios.put(`${API}/admin/resumes/${id}`, formData, {
      withCredentials: true,
      headers: { ...authHeaders(), "Content-Type": "multipart/form-data" },
    })
  );

export const toggleResumeListingPublishAPI = (id) =>
  unwrap(
    axios.patch(
      `${API}/admin/resumes/${id}/publish`,
      {},
      { withCredentials: true, headers: authHeaders() }
    )
  );

export const deleteResumeListingAPI = (id) =>
  unwrap(
    axios.delete(`${API}/admin/resumes/${id}`, {
      withCredentials: true,
      headers: authHeaders(),
    })
  );
