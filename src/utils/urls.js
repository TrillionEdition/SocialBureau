const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const fallbackUrl = isLocal ? "http://localhost:5000" : "https://socialbureau-backend.vercel.app";

export const BASE_URL = import.meta.env.VITE_API_URL || fallbackUrl;

