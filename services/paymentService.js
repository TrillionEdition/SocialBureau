import axios from "axios";

const API = "http://localhost:5000/api/payment";

export const createOrder = (amount) =>
    axios.post(`${API}/create-order`, { amount });

export const verifyPayment = (data) =>
    axios.post(`${API}/verify`, data);
