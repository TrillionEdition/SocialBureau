import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Social Bureau</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="flex flex-col items-center justify-center h-screen text-center px-4 bg-black">
        <img
          src="/assets/notfound.webp"
          alt="Page Not Found"
          className="mb-6 max-h-[60vh]"
        />

        <button
          name="home"
          onClick={() => navigate("/")}
          className="bg-[#ff0000] font-bold text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#ff0000] transition-all"
        >
          Go to Home
        </button>
      </div>
    </>
  );
};