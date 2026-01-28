// // // import React from 'react';

// // // const AchievementCard = ({ title, description, date, image, category }) => {
// // //     return (
// // //         <div className="relative group overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 transition-all duration-500 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
// // //             {/* Image Container */}
// // //             <div className="overflow-hidden">
// // //                 <img
// // //                     src={image}
// // //                     alt={title}
// // //                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
// // //                 />
// // //                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent opacity-60"></div>
// // //             </div>

// // //             {/* Content */}
// // //             <div className="p-3 relative">
// // //                 <div className="absolute -top-10 left-6">
// // //                     <span className="px-3 py-1 rounded-full bg-red-900 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
// // //                         {category || 'Milestone'}
// // //                     </span>
// // //                 </div>

// // //                 <div className="flex justify-between items-start mb-2">
// // //                     <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
// // //                         {title}
// // //                     </h3>
// // //                     <span className="text-xs text-zinc-500 font-medium">{date}</span>
// // //                 </div>

// // //                 <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
// // //                     {description}
// // //                 </p>

// // //                 {/* Hover Decoration */}
// // //                 <div className="absolute bottom-0 left-0 h-1 w-0 bg-red-500 transition-all duration-500 group-hover:w-full"></div>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default AchievementCard;




// // import React, { useState } from 'react';

// // const AchievementCard = ({ title, description, date, image, category }) => {
// //     const [isHovered, setIsHovered] = useState(false);

// //     return (
// //         <div
// //             className="relative group overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 transition-all duration-500 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] cursor-pointer"
// //             onMouseEnter={() => setIsHovered(true)}
// //             onMouseLeave={() => setIsHovered(false)}
// //         >
// //             {/* Image Container - Responsive sizing */}
// //             <div className={`overflow-hidden transition-all duration-500 flex items-center justify-center bg-zinc-950 ${isHovered ? 'h-32 w-40 mx-auto' : 'h-auto w-full'
// //                 }`}>
// //                 <img
// //                     src={image}
// //                     alt={title}
// //                     className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
// //                 />
// //             </div>

// //             {/* Details Overlay - Only show on hover */}
// //             {isHovered && (
// //                 <div className="px-6 py-6 bg-gradient-to-b from-zinc-900/40 to-zinc-900 space-y-4 animate-fadeIn">
// //                     <div className="flex justify-between items-start gap-2">
// //                         <h3 className="text-lg font-bold text-white leading-tight">
// //                             {title}
// //                         </h3>
// //                         <span className="text-xs text-zinc-300 font-medium whitespace-nowrap">
// //                             {date}
// //                         </span>
// //                     </div>

// //                     <p className="text-sm text-zinc-200 leading-relaxed line-clamp-4">
// //                         {description}
// //                     </p>

// //                     <span className="inline-block px-3 py-1 rounded-full bg-red-900 text-[10px] font-bold uppercase tracking-wider text-white">
// //                         {category || 'Milestone'}
// //                     </span>

// //                     {/* Hover Decoration */}
// //                     <div className="h-1 w-full bg-gradient-to-r from-red-500 to-red-600"></div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default AchievementCard;


// import React, { useState } from 'react';

// const AchievementCard = ({ title, description, date, image, category }) => {
//     const [isHovered, setIsHovered] = useState(false);

//     return (
//         <div
//             className={`relative overflow-hidden rounded-xl bg-zinc-950 transition-all duration-500 cursor-pointer h-80 ${isHovered ? 'border border-red-500/50' : 'border border-transparent'
//                 }`}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//         >
//             {/* Image Container */}
//             <div className="w-full h-full flex items-center justify-center">
//                 <img
//                     src={image}
//                     alt={title}
//                     className="w-full h-full object-contain p-4"
//                 />
//             </div>

//             {/* Details Overlay - Only show on hover */}
//             {isHovered && (
//                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent flex flex-col justify-end p-6 space-y-3">
//                     <div className="flex justify-between items-start gap-3">
//                         <h3 className="text-base font-bold text-white leading-snug flex-1">
//                             {title}
//                         </h3>
//                         <span className="text-xs text-zinc-300 font-medium whitespace-nowrap flex-shrink-0">
//                             {date}
//                         </span>
//                     </div>

//                     <p className="text-sm text-zinc-200 leading-relaxed line-clamp-3">
//                         {description}
//                     </p>

//                     <span className="inline-block px-3 py-1.5 rounded-full bg-red-900/70 text-[10px] font-bold uppercase text-red-100">
//                         {category || 'Milestone'}
//                     </span>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AchievementCard;


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