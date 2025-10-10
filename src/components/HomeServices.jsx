import React from "react";

export default function HomeServices() {
  const styles = {
    teal: { gradient: 'from-teal-900 to-teal-500', inner: 'from-black to-teal-700' },
    purple: { gradient: 'from-purple-900 to-purple-500', inner: 'from-black to-purple-700' },
    amber: { gradient: 'from-amber-900 to-amber-500', inner: 'from-black to-amber-700' },
    indigo: { gradient: 'from-indigo-900 to-indigo-500', inner: 'from-black to-indigo-700' },
    rose: { gradient: 'from-rose-900 to-rose-500', inner: 'from-black to-rose-700' },
  };
  const textColors = {
    teal: 'text-teal-200',
    purple: 'text-purple-200',
    amber: 'text-amber-200',
    indigo: 'text-indigo-200',
    rose: 'text-rose-200'
  };
  const badges = [
    { icon: 'fas fa-sitemap', text: 'API-Driven Growth Loops', color: 'purple' },
    { icon: 'fas fa-chart-line', text: 'Full-Funnel Performance Marketing', color: 'teal' },    
    { icon: 'fas fa-bullseye', text: 'Vertical-Specific Strategy', color: 'amber' },
    { icon: 'fas fa-comments', text: 'Advanced CRO & Lifecycle Systems', color: 'indigo' },
    { icon: 'fas fa-globe', text: 'Lifecycle Automation', color: 'rose' },
  ];

  return (
    <div className="h-[80vh] bg-black flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-6xl">
        <div className="flex justify-center gap-4 gap-y-6 flex-wrap">
          {badges.map((badge, idx) => {
            const c = styles[badge.color];
            return (
              <div
                key={idx}
                className={`p-[2px] rounded-full bg-gradient-to-r ${c.gradient} hover:scale-105 transition-transform duration-300 flex-shrink-0 w-full sm:w-auto relative`}
              >
                {/* Top left "New" icon for first badge */}
                {idx === 0 && (
                  <span
                    className="
                      absolute top-0 left-5 -translate-y-1/2 -translate-x-1/2 z-10
                      flex items-center justify-center
                      px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400
                      text-xs font-bold text-white shadow-lg
                      whitespace-nowrap
                      drop-shadow
                      animate-bounce
                    "
                  >
                    <i className="fas fa-star mr-1" /> New
                  </span>
                )}
                <button
                  className={`
                    relative group
                    bg-gradient-to-r ${c.inner}
                    rounded-full px-4 py-2
                    flex items-center justify-center
                    transition-all duration-300
                    hover:brightness-110
                    active:scale-95
                    whitespace-nowrap
                    w-full sm:w-auto
                  `}
                >
                  <span className={`text-lg sm:text-xl mr-2 ${badge.icon} ${textColors[badge.color]}`}></span>
                  <span className={`${textColors[badge.color]} sm:text-lg`}>{badge.text}</span>

                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}