
// // import React, { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";

// // const RotatingStackedImages = ({ images }) => {
// //     const [index, setIndex] = useState(0);
// //     const [rotating, setRotating] = useState(false);

// //     useEffect(() => {
// //         if (!images || images.length === 0) return;
// //         const interval = setInterval(() => {
// //             setRotating(true);
// //             setTimeout(() => {
// //                 setIndex((prev) => (prev + 1) % images.length);
// //                 setRotating(false);
// //             }, 600);
// //         }, 3000);
// //         return () => clearInterval(interval);
// //     }, [images]);

// //     // Rotation Logic:
// //     // Front = Main image

// //     const leftImg = images[index % images.length];
// //     const frontImg = images[(index + 1) % images.length]; // This one is the "Visible" one
// //     const rightImg = images[(index + 2) % images.length];

// //     return (
// //         <div className="relative w-full max-w-[320px] sm:max-w-[400px] h-[280px] sm:h-[340px] mx-auto flex items-center justify-center">

// //             {/* LEFT IMAGE (Behind) */}
// //             <div
// //                 className="absolute overflow-hidden rounded-2xl shadow-lg border border-white/10"
// //                 style={{
// //                     width: "75%",
// //                     aspectRatio: "1/1",
// //                     zIndex: 10,
// //                     left: "55%",
// //                     transform: rotating
// //                         ? "rotate(-20deg) scale(0.8) translateX(-20px)"
// //                         : "rotate(-12deg) scale(0.9) translateX(0px)",
// //                     opacity: rotating ? 0.4 : 0.7,
// //                     transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
// //                 }}
// //             >
// //                 <img src={leftImg} alt="left" className="w-full h-full object-cover" />
// //             </div>

// //             {/* RIGHT IMAGE (Behind) */}
// //             <div
// //                 className="absolute overflow-hidden rounded-2xl shadow-lg border border-white/10"
// //                 style={{
// //                     width: "75%",
// //                     aspectRatio: "1/1",
// //                     zIndex: 10,
// //                     right: "55%",
// //                     transform: rotating
// //                         ? "rotate(20deg) scale(0.8) translateX(20px)"
// //                         : "rotate(12deg) scale(0.9) translateX(0px)",
// //                     opacity: rotating ? 0.4 : 0.7,
// //                     transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
// //                 }}
// //             >
// //                 <img src={rightImg} alt="right" className="w-full h-full object-cover" />
// //             </div>

// //             {/* FRONT IMAGE (The Clear One) */}
// //             <div
// //                 className="absolute overflow-hidden rounded-2xl shadow-2xl border border-white/20"
// //                 style={{
// //                     width: "79%",
// //                     aspectRatio: "1/1",
// //                     zIndex: 30, // Highest layer
// //                     transform: rotating
// //                         ? "scale(1.1) translateY(-10px)"
// //                         : "scale(1) translateY(0px)",
// //                     opacity: 1,
// //                     transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
// //                 }}
// //             >
// //                 <img src={frontImg} alt="front" className="w-full h-full object-cover" />
// //             </div>

// //         </div>
// //     );
// // };

// // const CombinedServicesGrid = () => {
// //     const items = [
// //         {
// //             title: "AdTech Integration",
// //             subtitle: "Engineered for rankings",
// //             image: "https://res.cloudinary.com/dtwcgfmar/video/upload/v1771998115/freepik_create-a-video_kling_1080p_1-1_24fps_94469_1_twifv9.webm",
// //             bg: "bg-white",
// //             text: "text-black",
// //             link: "/adTech-marketing",
// //         },
// //         {
// //             title: "Niche Marketing",
// //             subtitle: "Precision over assumptions",
// //             image: "/assets/home/hajira.png",
// //             bg: "bg-[#000000]",
// //             text: "text-white",
// //             link: "/niche-marketing",
// //         },
// //         {
// //             title: "Content Marketing",
// //             subtitle: "Built for scalable growth",
// //             image: "",
// //             bg: "bg-[#A22323]",
// //             text: "text-white",
// //             link: "/content-marketing",
// //         },
// //         {
// //             title: "Performance Marketing",
// //             subtitle: "Marketing, fully automated",
// //             image: "/assets/home/pmo2.png",
// //             bg: "bg-[#FBFBFD]",
// //             text: "text-[#1D1D1F]",
// //             link: "/performance-marketing",
// //         },
// //         {
// //             title: "Partnerships",
// //             subtitle: "Grow stronger, together",
// //             images: [
// //                 "https://res.cloudinary.com/dtwcgfmar/image/upload/v1769159675/dp3_jscnpp.jpg",
// //                 "/assets/sivaprasad/Siva Prasad.webp",
// //                 "https://res.cloudinary.com/dtwcgfmar/image/upload/v1771997817/2_1_1_wzl8fc.jpg",
// //             ],
// //             bg: "bg-[#ffffffff]",
// //             text: "text-[#1D1D1F]",
// //             link: "/partners",
// //             isRotatingStack: true,
// //         },
// //         {
// //             title: "Our Team",
// //             subtitle: "People behind the product",
// //             image: "/assets/home/team.png",
// //             bg: "bg-[#000000]",
// //             text: "text-white",
// //             link: "/our-team",
// //         },

// //     ];

// //     return (
// //         <section className="w-full grid grid-cols-1 md:grid-cols-2 bg-white">
// //             {items.map((item, index) => (
// //                 <Link
// //                     key={`${item.title}-${index}`}
// //                     to={item.link}
// //                     className={`relative flex flex-col h-[500px] sm:h-[600px] lg:h-[640px] ${item.bg} ${item.text} overflow-hidden group cursor-pointer border-[0.5px] border-gray-100`}
// //                 >
// //                     {/* 1. TEXT ON TOP */}
// //                     <div className="relative z-50 text-center flex flex-col items-center px-6 pt-12 md:pt-16">
// //                         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-2">
// //                             {item.title}
// //                         </h2>
// //                         <p className="text-lg opacity-80 mb-6">{item.subtitle}</p>
// //                         <span className="bg-[#0071E3] text-white px-6 py-2 rounded-full text-sm font-medium">
// //                             Learn more
// //                         </span>
// //                     </div>

// //                     {/* 2. GRAPHIC AREA BELOW TEXT */}
// //                     <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden pb-10">
// //                         <div className="w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
// //                             {item.isRotatingStack ? (
// //                                 <RotatingStackedImages images={item.images} />
// //                             ) : (
// //                                 item.image && (
// //                                     <img
// //                                         src={item.image}
// //                                         alt={item.title}
// //                                         className="w-[110%] sm:w-[110%] h-auto max-h-[110%] object-contain mx-auto drop-shadow-2xl scale-110"
// //                                     />
// //                                 )
// //                             )}
// //                         </div>
// //                     </div>
// //                 </Link>
// //             ))}
// //         </section>
// //     );
// // };

// // export default CombinedServicesGrid;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const RotatingStackedImages = ({ images }) => {
//     const [index, setIndex] = useState(0);
//     const [rotating, setRotating] = useState(false);

//     useEffect(() => {
//         if (!images || images.length === 0) return;
//         const interval = setInterval(() => {
//             setRotating(true);
//             setTimeout(() => {
//                 setIndex((prev) => (prev + 1) % images.length);
//                 setRotating(false);
//             }, 600);
//         }, 3000);
//         return () => clearInterval(interval);
//     }, [images]);

//     const leftImg = images[index % images.length];
//     const frontImg = images[(index + 1) % images.length];
//     const rightImg = images[(index + 2) % images.length];

//     return (
//         <div className="relative w-full max-w-[320px] sm:max-w-[400px] h-[280px] sm:h-[340px] mx-auto flex items-center justify-center">

//             {/* LEFT IMAGE (Behind) */}
//             <div
//                 className="absolute overflow-hidden rounded-2xl shadow-lg border border-white/10"
//                 style={{
//                     width: "75%",
//                     aspectRatio: "1/1",
//                     zIndex: 10,
//                     left: "55%",
//                     transform: rotating
//                         ? "rotate(-20deg) scale(0.8) translateX(-20px)"
//                         : "rotate(-12deg) scale(0.9) translateX(0px)",
//                     opacity: rotating ? 0.4 : 0.7,
//                     transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
//                 }}
//             >
//                 <img src={leftImg} alt="left" className="w-full h-full object-cover" />
//             </div>

//             {/* RIGHT IMAGE (Behind) */}
//             <div
//                 className="absolute overflow-hidden rounded-2xl shadow-lg border border-white/10"
//                 style={{
//                     width: "75%",
//                     aspectRatio: "1/1",
//                     zIndex: 10,
//                     right: "55%",
//                     transform: rotating
//                         ? "rotate(20deg) scale(0.8) translateX(20px)"
//                         : "rotate(12deg) scale(0.9) translateX(0px)",
//                     opacity: rotating ? 0.4 : 0.7,
//                     transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
//                 }}
//             >
//                 <img src={rightImg} alt="right" className="w-full h-full object-cover" />
//             </div>

//             {/* FRONT IMAGE (The Clear One) */}
//             <div
//                 className="absolute overflow-hidden rounded-2xl shadow-2xl border border-white/20"
//                 style={{
//                     width: "79%",
//                     aspectRatio: "1/1",
//                     zIndex: 30,
//                     transform: rotating
//                         ? "scale(1.1) translateY(-10px)"
//                         : "scale(1) translateY(0px)",
//                     opacity: 1,
//                     transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
//                 }}
//             >
//                 <img src={frontImg} alt="front" className="w-full h-full object-cover" />
//             </div>

//         </div>
//     );
// };

// const CombinedServicesGrid = () => {
//     const items = [
//         {
//             title: "AdTech Integration",
//             subtitle: "Engineered for rankings",
//             video: "https://res.cloudinary.com/dtwcgfmar/video/upload/v1771998115/freepik_create-a-video_kling_1080p_1-1_24fps_94469_1_twifv9.webm",
//             bg: "bg-white",
//             text: "text-black",
//             link: "/adTech-marketing",
//             isFullScreenVideo: true,
//             videoOverlayText: "Transform Your AdTech Strategy",
//         },
//         {
//             title: "Niche Marketing",
//             subtitle: "Precision over assumptions",
//             image: "/assets/home/hajira.png",
//             bg: "bg-[#000000]",
//             text: "text-white",
//             link: "/niche-marketing",
//         },
//         {
//             title: "Content Marketing",
//             subtitle: "Built for scalable growth",
//             image: "",
//             bg: "bg-[#A22323]",
//             text: "text-white",
//             link: "/content-marketing",
//         },
//         {
//             title: "Performance Marketing",
//             subtitle: "Marketing, fully automated",
//             image: "/assets/home/pmo2.png",
//             bg: "bg-[#FBFBFD]",
//             text: "text-[#1D1D1F]",
//             link: "/performance-marketing",
//         },
//         {
//             title: "Partnerships",
//             subtitle: "Grow stronger, together",
//             images: [
//                 "https://res.cloudinary.com/dtwcgfmar/image/upload/v1769159675/dp3_jscnpp.jpg",
//                 "/assets/sivaprasad/Siva Prasad.webp",
//                 "https://res.cloudinary.com/dtwcgfmar/image/upload/v1771997817/2_1_1_wzl8fc.jpg",
//             ],
//             bg: "bg-[#ffffffff]",
//             text: "text-[#1D1D1F]",
//             link: "/partners",
//             isRotatingStack: true,
//         },
//         {
//             title: "Our Team",
//             subtitle: "People behind the product",
//             image: "/assets/home/team.png",
//             bg: "bg-[#000000]",
//             text: "text-white",
//             link: "/our-team",
//         },

//     ];

//     return (
//         <section className="w-full grid grid-cols-1 md:grid-cols-2 bg-white">
//             {items.map((item, index) => (
//                 <Link
//                     key={`${item.title}-${index}`}
//                     to={item.link}
//                     className={`relative flex flex-col h-[500px] sm:h-[600px] lg:h-[640px] ${item.bg} ${item.text} overflow-hidden group cursor-pointer border-[0.5px] border-gray-100`}
//                 >
//                     {/* FULLSCREEN VIDEO BACKGROUND */}
//                     {item.isFullScreenVideo && item.video ? (
//                         <>
//                             {/* Video Background - Full Screen */}
//                             <div className="absolute inset-0 w-full h-full overflow-hidden">
//                                 <video
//                                     src={item.video}
//                                     autoPlay
//                                     muted
//                                     loop
//                                     className="w-full h-full object-cover"
//                                 />
//                             </div>

//                             {/* Dark Overlay */}
//                             <div className="absolute inset-0 bg-black/40 z-10"></div>

//                             {/* TEXT CONTENT ON TOP */}
//                             <div className="relative z-20 flex flex-col items-center justify-center h-full px-6">
//                                 <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4 text-center drop-shadow-lg">
//                                     {item.videoOverlayText}
//                                 </h2>
//                                 <p className="text-lg text-white/90 mb-8 text-center drop-shadow-md max-w-md">
//                                     {item.subtitle}
//                                 </p>
//                                 <span className="bg-[#0071E3] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#0060d0] transition-colors">
//                                     Learn more
//                                 </span>
//                             </div>
//                         </>
//                     ) : (
//                         <>
//                             {/* 1. TEXT ON TOP (For non-video items) */}
//                             <div className="relative z-50 text-center flex flex-col items-center px-6 pt-12 md:pt-16">
//                                 <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-2">
//                                     {item.title}
//                                 </h2>
//                                 <p className="text-lg opacity-80 mb-6">{item.subtitle}</p>
//                                 <span className="bg-[#0071E3] text-white px-6 py-2 rounded-full text-sm font-medium">
//                                     Learn more
//                                 </span>
//                             </div>

//                             {/* 2. GRAPHIC AREA BELOW TEXT */}
//                             <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden pb-10">
//                                 <div className="w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
//                                     {item.isRotatingStack ? (
//                                         <RotatingStackedImages images={item.images} />
//                                     ) : item.video ? (
//                                         <video
//                                             src={item.video}
//                                             autoPlay
//                                             muted
//                                             loop
//                                             className="w-[110%] sm:w-[110%] h-auto max-h-[110%] object-cover mx-auto drop-shadow-2xl scale-110"
//                                         />
//                                     ) : (
//                                         item.image && (
//                                             <img
//                                                 src={item.image}
//                                                 alt={item.title}
//                                                 className="w-[110%] sm:w-[110%] h-auto max-h-[110%] object-contain mx-auto drop-shadow-2xl scale-110"
//                                             />
//                                         )
//                                     )}
//                                 </div>
//                             </div>
//                         </>
//                     )}
//                 </Link>
//             ))}
//         </section>
//     );
// };

// export default CombinedServicesGrid;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RotatingStackedImages = ({ images }) => {
    const [index, setIndex] = useState(0);
    const [rotating, setRotating] = useState(false);

    useEffect(() => {
        if (!images || images.length === 0) return;
        const interval = setInterval(() => {
            setRotating(true);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % images.length);
                setRotating(false);
            }, 600);
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);

    const leftImg = images[index % images.length];
    const frontImg = images[(index + 1) % images.length];
    const rightImg = images[(index + 2) % images.length];

    return (
        <div className="relative w-full max-w-[320px] sm:max-w-[400px] h-[280px] sm:h-[340px] mx-auto flex items-center justify-center">

            {/* LEFT IMAGE (Behind) */}
            <div
                className="absolute overflow-hidden rounded-2xl shadow-lg border border-white/10"
                style={{
                    width: "75%",
                    aspectRatio: "1/1",
                    zIndex: 10,
                    left: "55%",
                    transform: rotating
                        ? "rotate(-20deg) scale(0.8) translateX(-20px)"
                        : "rotate(-12deg) scale(0.9) translateX(0px)",
                    opacity: rotating ? 0.4 : 0.7,
                    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <img src={leftImg} alt="Partnership and collaboration background" className="w-full h-full object-cover" />
            </div>

            {/* RIGHT IMAGE (Behind) */}
            <div
                className="absolute overflow-hidden rounded-2xl shadow-lg border border-white/10"
                style={{
                    width: "75%",
                    aspectRatio: "1/1",
                    zIndex: 10,
                    right: "55%",
                    transform: rotating
                        ? "rotate(20deg) scale(0.8) translateX(20px)"
                        : "rotate(12deg) scale(0.9) translateX(0px)",
                    opacity: rotating ? 0.4 : 0.7,
                    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <img src={rightImg} alt="SocialBureau team collaboration" className="w-full h-full object-cover" />
            </div>

            {/* FRONT IMAGE (The Clear One) */}
            <div
                className="absolute overflow-hidden rounded-2xl shadow-2xl border border-white/20"
                style={{
                    width: "79%",
                    aspectRatio: "1/1",
                    zIndex: 30,
                    transform: rotating
                        ? "scale(1.1) translateY(-10px)"
                        : "scale(1) translateY(0px)",
                    opacity: 1,
                    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <img src={frontImg} alt="Active partner success stories" className="w-full h-full object-cover" />
            </div>

        </div>
    );
};

const CombinedServicesGrid = () => {
    const items = [
        {
            title: "AdTech Integration",
            subtitle: "Engineered for rankings",
            video: "https://res.cloudinary.com/dtwcgfmar/video/upload/v1771998115/freepik_create-a-video_kling_1080p_1-1_24fps_94469_1_twifv9.webm",
            bg: "bg-white",
            text: "text-black",
            link: "/adTech-marketing",
            isFullScreenVideo: true, // This will make video full background
        },
        {
            title: "Performance Marketing",
            subtitle: "Marketing, fully automated",
            image: "/assets/home/pmo2.png",
            bg: "bg-[#FBFBFD]",
            text: "text-[#1D1D1F]",
            link: "/performance-marketing",
        },
        {
            title: "Content Marketing",
            subtitle: "Built for scalable growth",
            image: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772003206/Untitled-design-42.png_h65wfd.webp",
            bg: "bg-[#A22323]",
            text: "text-white",
            link: "/content-marketing",
        },
        {
            title: "Niche Marketing",
            subtitle: "Precision over assumptions",
            image: "/assets/home/hajira.png",
            bg: "bg-[#000000]",
            text: "text-white",
            link: "/niche-marketing",
        },
        {
            title: "Our Team",
            subtitle: "People behind the product",
            image: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772021150/image-gen_33__converted_jzbrvu.webp",
            bg: "bg-[#000000]",
            text: "text-white",
            link: "/our-team",
        },
        {
            title: "Partnerships",
            subtitle: "Grow stronger, together",
            images: [
                "https://res.cloudinary.com/dtwcgfmar/image/upload/v1769159675/dp3_jscnpp.jpg",
                "/assets/sivaprasad/Siva Prasad.webp",
                "https://res.cloudinary.com/dtwcgfmar/image/upload/v1771997817/2_1_1_wzl8fc.jpg",
            ],
            bg: "bg-[#ffffffff]",
            text: "text-[#1D1D1F]",
            link: "/partners",
            isRotatingStack: true,
        },

    ];

    return (
        <section className="w-full grid grid-cols-1 md:grid-cols-2 bg-white">
            {items.map((item, index) => (
                <Link
                    key={`${item.title}-${index}`}
                    to={item.link}
                    className={`relative flex flex-col h-[500px] sm:h-[600px] lg:h-[640px] ${item.bg} ${item.text} overflow-hidden group cursor-pointer`}
                >
                    {/* FULLSCREEN VIDEO BACKGROUND */}
                    {item.isFullScreenVideo && item.video ? (
                        <>
                            {/* Video Background - Full Screen */}
                            <div className="absolute inset-0 w-full h-full overflow-hidden">
                                <video
                                    src={item.video}
                                    autoPlay
                                    muted
                                    loop
                                    title={`${item.title} background video`}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/40 z-10"></div>

                            {/* TEXT CONTENT - Same position as other items */}
                            <div className="relative z-20 text-center flex flex-col items-center px-6 pt-12 md:pt-16">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-2 drop-shadow-lg">
                                    {item.title}
                                </h2>
                                <p className="text-lg text-white/90 mb-6 drop-shadow-md">
                                    {item.subtitle}
                                </p>
                                <span className="bg-[#0071E3] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#0060d0] transition-colors">
                                    Learn more
                                </span>
                            </div>

                            {/* GRAPHIC AREA - Empty since video is full background */}
                            <div className="relative flex-1 w-full"></div>
                        </>
                    ) : (
                        <>
                            {/* 1. TEXT ON TOP */}
                            <div className="relative z-50 text-center flex flex-col items-center px-6 pt-12 md:pt-16">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-2">
                                    {item.title}
                                </h2>
                                <p className="text-lg opacity-80 mb-6">{item.subtitle}</p>
                                <span className="bg-[#0071E3] text-white px-6 py-2 rounded-full text-sm font-medium">
                                    Learn more
                                </span>
                            </div>

                            {/* 2. GRAPHIC AREA BELOW TEXT */}
                            <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden pb-10">
                                <div className="w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                                    {item.isRotatingStack ? (
                                        <RotatingStackedImages images={item.images} />
                                    ) : item.video ? (
                                        <video
                                            src={item.video}
                                            autoPlay
                                            muted
                                            loop
                                            title={`${item.title} preview video`}
                                            className="w-[110%] sm:w-[110%] h-auto max-h-[110%] object-cover mx-auto drop-shadow-2xl scale-110"
                                        />
                                    ) : (
                                        item.image && (
                                            <img
                                                src={item.image}
                                                alt={`${item.title} - ${item.subtitle}`}
                                                className="w-[110%] sm:w-[110%] h-auto max-h-[110%] object-contain mx-auto scale-110"
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </Link>
            ))}
        </section>
    );
};

export default CombinedServicesGrid;