import React, { useState } from 'react';

const AchievementCard = ({ title, description, date, image, category }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`relative overflow-hidden rounded-2xl bg-black transition-all duration-500 cursor-pointer h-80 group ${isHovered ? 'border border-red-500/60 shadow-2xl shadow-red-500/20' : 'border border-red-500/0'
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Animated Background Glow */}
            <div
                className={`absolute -inset-1 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-20' : 'opacity-0'
                    }`}
                style={{ zIndex: -1 }}
            />

            {/* Image Container with zoom effect */}
            <div className="w-full h-full flex items-center justify-center">
                <img
                    src={image}
                    alt={title}
                    className={`object-contain p-4 transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'
                        }`}
                />
            </div>

            {/* Premium Gradient Overlay - Animated entrance */}
            {isHovered && (
                <div
                    className="absolute inset-0 flex flex-col justify-end p-6 space-y-4"
                    style={{
                        background: `linear-gradient(135deg, 
                            rgba(0,0,0,0) 0%, 
                            rgba(18,18,18,0.4) 40%,
                            rgba(18,18,18,0.8) 70%,
                            rgba(0,0,0,0.95) 100%)`
                    }}
                >
                    {/* Decorative top accent */}
                    <div className="absolute top-4 left-6 h-1 w-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full opacity-60" />

                    {/* Title & Date */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-start gap-3">
                            <h3 className="text-lg font-black text-white leading-tight flex-1 hover:text-red-200 transition-colors">
                                {title}
                            </h3>
                            <span className="text-xs font-semibold text-red-300/80 whitespace-nowrap flex-shrink-0 bg-red-500/10 px-2 py-1 rounded-full">
                                {date}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-200 leading-relaxed line-clamp-2 font-medium">
                        {description}
                    </p>

                    {/* Category Badge with animation */}
                    <div className="flex items-center gap-2 pt-2">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-600/40 to-orange-600/40 border border-red-500/30 text-[11px] font-bold uppercase text-red-100 tracking-wider hover:from-red-600/60 hover:to-orange-600/60 transition-all duration-300 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                            {category || 'Milestone'}
                        </span>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-transparent" />
                </div>
            )}
        </div>
    );
};

export default AchievementCard;