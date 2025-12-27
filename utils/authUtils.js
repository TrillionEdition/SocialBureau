import { useState, useEffect } from "react";

// ============================================
// 🔐 USER DATA MANAGEMENT (Token is in HttpOnly Cookie)
// ============================================

export const getUserData = () => {
  try {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

export const setUserData = (user) => {
  if (user) {
    localStorage.setItem("userData", JSON.stringify(user));
  } else {
    localStorage.removeItem("userData");
  }
};

// ============================================
// 🔓 LOGOUT UTILITIES
// ============================================

export const clearAuthData = async () => {
  try {
    // Call backend logout endpoint to clear cookie
    await fetch(`${process.env.REACT_APP_BASE_URL || "http://localhost:5000"}/user/logout`, {
      method: "GET",
      credentials: "include", // Include cookies
    });
  } catch (error) {
    console.error("Error calling logout endpoint:", error);
  }

  // Clear localStorage
  localStorage.removeItem("userData");
  
  // Notify other components
  window.dispatchEvent(new Event("authChange"));
};

export const isAuthenticated = () => {
  return !!getUserData();
};

export const isEmployee = () => {
  const user = getUserData();
  return user?.isEmployee === true;
};

export const isVerified = () => {
  const user = getUserData();
  return user?.isVerified === true;
};

export const canAccessEmployeeDashboard = () => {
  return isAuthenticated() && isEmployee() && isVerified();
};

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data on mount
    const user = getUserData();
    setCurrentUser(user);
    setLoading(false);

    // Listen for auth changes in other tabs/windows
    const handleStorageChange = () => {
      const newUser = getUserData();
      setCurrentUser(newUser);
    };

    // Listen for custom authChange event (fired on login/logout)
    const handleAuthChange = () => {
      handleStorageChange();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const login = (user) => {
    setUserData(user);
    setCurrentUser(user);
    window.dispatchEvent(new Event("authChange"));
  };

  const logout = async () => {
    await clearAuthData();
    setCurrentUser(null);
  };

  return {
    currentUser,
    isAuthenticated: !!currentUser,
    isEmployee: currentUser?.isEmployee === true,
    isVerified: currentUser?.isVerified === true,
    canAccessEmployeeDashboard:
      !!currentUser && currentUser?.isEmployee && currentUser?.isVerified,
    loading,
    login,
    logout,
  };
};

// ============================================
// 🛡️ AUTH HEADER FOR API REQUESTS
// ============================================

export const getAuthHeaders = () => {
  // Token is in httpOnly cookie, no need to add it to headers
  // The browser automatically sends it with credentials: "include"
  return {
    "Content-Type": "application/json",
  };
};

// ============================================
// 📡 FETCH WRAPPER WITH CREDENTIALS
// ============================================

export const fetchWithAuth = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ✅ Always include cookies
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(url, finalOptions);
  
  // If unauthorized, clear auth data
  if (response.status === 401) {
    await clearAuthData();
    window.location.href = "/login";
  }

  return response;
};