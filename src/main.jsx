import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import axios from 'axios'

// Set global axios defaults
axios.defaults.withCredentials = true

// Configure request interceptor to add authorization token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Configure response interceptor to handle 401 Unauthorized errors globally
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Clear localStorage credentials
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      
      // Determine redirection path
      const currentPath = window.location.pathname + window.location.search;
      const isClient = currentPath.includes("client");
      const isPartnership = currentPath.includes("/partners") || currentPath.includes("/partnership");
      
      let loginPath = "/login";
      if (isClient) {
        loginPath = "/client-login";
      } else if (isPartnership) {
        loginPath = "/partners/create-portfolio";
      }
      
      // Prevent infinite redirect loops if we are already on a login page
      if (!currentPath.includes("login") && !currentPath.includes("create-portfolio")) {
        window.location.href = `${loginPath}?redirect=${encodeURIComponent(currentPath)}`;
      }
    }
    return Promise.reject(error);
  }
);

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>
  </QueryClientProvider>
)
