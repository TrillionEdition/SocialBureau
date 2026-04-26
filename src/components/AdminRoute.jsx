import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/utils/authUtils";
import LoadingSpinner from "./LoadingSpinner";

import { Link } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { canAccessDashboard, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!canAccessDashboard) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
        <div className="bg-[#0F1117] border border-blue-500/20 rounded-[2.5rem] p-12 shadow-2xl max-w-lg w-full">
          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            You are not authorized to visit this page. Please login with an
            administrator or partner account.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;


