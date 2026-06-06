import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
        onClick={() => setIsOpen(false)}
      />

      {/* Popup */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
        <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl max-w-md w-full animate-popup">

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full transition"
          >
            <X size={18} />
          </button>

          {/* Story Image */}
          <img
            src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/ChatGPT%20Image%20Jun%206%2C%202026%2C%2010_13_14%20AM.png"
            alt="Spin & Win"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </>
  );
}