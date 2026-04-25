import { useEffect } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";

export default function Toast({ type = "info", message, onClose }) {
  useEffect(() => {
    if (type === "loading") return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose, type]);

  const styles = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-500 text-black",
    info: "bg-gray-700",
    loading: "bg-blue-600",
  };

  const icons = {
    success: <FaCheckCircle />,
    error: <FaTimes />,
    warning: <FaExclamationTriangle />,
    info: <FaExclamationTriangle />,
    loading: <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />,
  };

  return (
    <div
      className={`fixed top-6 right-6 z-110 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-white ${styles[type]}`}
    >
      <span className="text-lg">{icons[type]}</span>
      <p className="text-sm font-medium">{message}</p>
      <button onClick={onClose} className="ml-3 opacity-80 hover:opacity-100">
        ✕
      </button>
    </div>
  );
}
