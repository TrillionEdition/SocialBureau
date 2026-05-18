import { motion } from "framer-motion";

export const Header = () => {
  const navItems = [
    "HOME", "SERVICES", "COMPANY", "CAREERS", "PARTNERSHIP", "TEAM", "ENQUIRY", "SUPPORT"
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between backdrop-blur-sm bg-black/10">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-black tracking-tighter text-white">Social<span className="text-brand-pink">Bureau</span></span>
      </div>
      
      <nav className="hidden lg:flex items-center gap-6">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[11px] font-bold tracking-widest text-white/60 hover:text-white transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>

      <button className="bg-brand-pink text-white px-6 py-2.5 rounded-full text-[11px] font-black tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,51,88,0.3)]">
        WORK WITH US
      </button>
    </header>
  );
};
