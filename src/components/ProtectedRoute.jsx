import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/utils/authUtils";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
        <div className="bg-[#0F1117] border border-gold-500/20 rounded-[2.5rem] p-12 shadow-2xl max-w-lg w-full">
          <div className="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-[#C5A059]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Login Required</h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Please log in to your account to access the Ajinorah Requirement Form.
          </p>
          <Link
            to="/login"
            state={{ from: location }}
            className="inline-flex items-center justify-center px-8 py-4 bg-[#C5A059] hover:bg-white hover:text-black text-black font-black uppercase text-sm rounded-2xl transition-all duration-300 shadow-lg shadow-gold-500/20 active:scale-95"
          >
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;


