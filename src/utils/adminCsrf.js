import axios from "axios";
import { BASE_URL } from "@/utils/urls";

// The CSRF token is derived server-side from the admin session and is useless without the
// HttpOnly session cookie, so keeping it in sessionStorage does not expose an auth credential.
const KEY = "adminCsrf";
const SAFE = new Set(["GET", "HEAD", "OPTIONS"]);
let csrfRecovery;

export const setCsrfToken = (token) => {
  if (token) sessionStorage.setItem(KEY, token);
  else sessionStorage.removeItem(KEY);
};
export const getCsrfToken = () => sessionStorage.getItem(KEY);

const isApiUrl = (url) => typeof url === "string" && url.startsWith(BASE_URL);

const isStoredAdmin = () => {
  try {
    const user = JSON.parse(localStorage.getItem("userData") || localStorage.getItem("user") || "null");
    return user?.role?.toLowerCase() === "admin";
  } catch {
    return false;
  }
};

async function recoverCsrfToken(nativeFetch) {
  if (!csrfRecovery) {
    csrfRecovery = nativeFetch(`${BASE_URL}/user/admin/mfa/session`, { credentials: "include" })
      .then(async (response) => {
        if (response.status === 401) return;
        if (!response.ok) throw new Error("Unable to restore the administrator CSRF token.");
        const data = await response.json();
        if (!data.csrfToken) throw new Error("The administrator session did not return a CSRF token.");
        setCsrfToken(data.csrfToken);
      })
      .finally(() => {
        csrfRecovery = null;
      });
  }
  await csrfRecovery;
}

export function installAdminCsrf() {
  axios.interceptors.request.use((config) => {
    const token = getCsrfToken();
    if (token && !SAFE.has(String(config.method || "get").toUpperCase())) {
      config.headers["X-CSRF-Token"] = token;
    }
    return config;
  });

  const nativeFetch = window.fetch.bind(window);
  window.fetch = async (input, init = {}) => {
    const url = typeof input === "string" ? input : input?.url;
    const method = String(init.method || (typeof input !== "string" && input?.method) || "GET").toUpperCase();
    let token = getCsrfToken();
    if (!token && isApiUrl(url) && !SAFE.has(method) && isStoredAdmin()) {
      await recoverCsrfToken(nativeFetch);
      token = getCsrfToken();
    }
    if (token && isApiUrl(url) && !SAFE.has(method)) {
      const headers = new Headers(init.headers || (typeof input !== "string" ? input.headers : undefined));
      headers.set("X-CSRF-Token", token);
      return nativeFetch(input, { ...init, headers });
    }
    return nativeFetch(input, init);
  };
}
