import { useState } from "react";
import { createPortal } from "react-dom";
import { logoutUser } from "../../services/userServices";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Logout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    const userDataStr = localStorage.getItem("userData");
    const isPartnershipSection =
      location.pathname.includes("/partners") ||
      location.pathname.includes("/partnership");

    try {
      await logoutUser();
    } catch (error) {
      console.error("Server logout failed", error);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("authChange"));

      const userData = JSON.parse(userDataStr || "{}");
      const isPartner =
        userData.role?.toLowerCase() === "partnership" ||
        userData.role?.toLowerCase() === "partner";

      if (isPartnershipSection || isPartner) {
        navigate("/partners/login");
      } else {
        navigate("/login");
      }
    }
  };

  // Modal content component
  const ModalContent = () => (
    <AnimatePresence>
      {showConfirm && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowConfirm(false)}
            className="fixed inset-0 z-[999]"
          />

          {/* Modal - Perfectly Centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="border border-white/10 rounded-xl p-6 w-[90%] max-w-sm"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
              margin: 0
            }}
          >
            <h2 className="text-white text-lg font-semibold mb-2">Confirm Logout</h2>
            <p className="text-[#f5f5f7]/70 mb-6">Are you sure you want to logout?</p>
            
            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 border border-white/30 hover:border-white/50 text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Desktop Logout Button */}
      <button
        onClick={() => setShowConfirm(true)}
        className="hidden md:block text-[11px] font-bold text-[#ffffff]/70 hover:text-white transition-colors px-2 py-1 whitespace-nowrap cursor-pointer relative z-[50]"
      >
        Logout
      </button>

      {/* Mobile Logout Button */}
      <button
        onClick={() => setShowConfirm(true)}
        className="md:hidden flex items-center gap-2 text-[22px] font-semibold text-[#ffffff] active:text-[#ff0000] text-left transition-colors relative z-[50]"
      >
        Logout
      </button>

      {/* Portal - renders modal at document root level */}
      {createPortal(
  <AnimatePresence>
    {showConfirm && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm grid place-items-center"
        onClick={() => setShowConfirm(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#1c1c1e] border border-white/10 rounded-xl p-6 w-[320px] shadow-2xl"
        >
          <h2 className="text-white text-lg font-semibold mb-2">
            Confirm Logout
          </h2>
          <p className="text-white/70 mb-6">
            Are you sure you want to logout?
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
            >
              Yes, Logout
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 px-4 py-2 border border-white/30 text-white rounded-lg font-medium"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>,
  document.body
)}
    </>
  );
};

export default Logout;
