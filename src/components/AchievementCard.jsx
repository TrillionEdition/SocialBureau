import React from 'react';

const AchievementCard = ({ title, description, date, image, category }) => {
    return (
        <div className="relative group overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 transition-all duration-500 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            {/* Image Container */}
            <div className="aspect-[4/3] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent opacity-60"></div>
            </div>

            {/* Content */}
            <div className="p-6 relative">
                <div className="absolute -top-10 left-6">
                    <span className="px-3 py-1 rounded-full bg-red-900 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                        {category || 'Milestone'}
                    </span>
                </div>

                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                        {title}
                    </h3>
                    <span className="text-xs text-zinc-500 font-medium">{date}</span>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                    {description}
                </p>

                {/* Hover Decoration */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-red-500 transition-all duration-500 group-hover:w-full"></div>
            </div>
        </div>
    );
};

export default AchievementCard;
