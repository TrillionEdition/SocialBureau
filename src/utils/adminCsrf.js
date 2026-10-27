import axios from "axios";
import { BASE_URL } from "@/utils/urls";

// The CSRF token is derived server-side from the admin session and is useless without the
// HttpOnly session cookie, so keeping it in sessionStorage does not expose an auth credential.
const KEY = "adminCsrf";
const SAFE = new Set(["GET", "HEAD", "OPTIONS"]);

export const setCsrfToken = (token) => {
  if (token) sessionStorage.setItem(KEY, token);
  else sessionStorage.removeItem(KEY);
};
export const getCsrfToken = () => sessionStorage.getItem(KEY);

const isApiUrl = (url) => typeof url === "string" && url.startsWith(BASE_URL);

export function installAdminCsrf() {
  axios.interceptors.request.use((config) => {
    const token = getCsrfToken();
    if (token && !SAFE.has(String(config.method || "get").toUpperCase())) {
      config.headers["X-CSRF-Token"] = token;
    }
    return config;
  });

  const nativeFetch = window.fetch.bind(window);
  window.fetch = (input, init = {}) => {
    const url = typeof input === "string" ? input : input?.url;
    const method = String(init.method || (typeof input !== "string" && input?.method) || "GET").toUpperCase();
    const token = getCsrfToken();
    if (token && isApiUrl(url) && !SAFE.has(method)) {
      const headers = new Headers(init.headers || (typeof input !== "string" ? input.headers : undefined));
      headers.set("X-CSRF-Token", token);
      return nativeFetch(input, { ...init, headers });
    }
    return nativeFetch(input, init);
  };
}
