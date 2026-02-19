// // // // import React from "react";
// // // // import { useNavigate } from "react-router-dom";

// // // // const CareerSection = () => {
// // // //     const navigate = useNavigate();

// // // //     return (
// // // //         <section className="relative w-full bg-neutral-50 overflow-hidden">
// // // //             <div className="max-w-7xl mx-auto px-6 pt-24 pb-48 text-center">

// // // //                 {/* EYEBROW */}
// // // //                 <p className="text-xs font-semibold tracking-[0.3em] uppercase text-black mb-4">
// // // //                     Careers
// // // //                 </p>

// // // //                 {/* TITLE */}
// // // //                 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-3">
// // // //                     Build Your Future With Us
// // // //                 </h1>

// // // //                 {/* SUBTITLE */}
// // // //                 <p className="text-sm sm:text-base text-black/60 max-w-xl mx-auto mb-6">
// // // //                     Join a team that values clarity, craftsmanship, and impact.
// // // //                     Work on meaningful products alongside people who care about doing things right.
// // // //                 </p>

// // // //                 {/* CTA */}
// // // //                 <div className="flex justify-center gap-4">
// // // //                     <button
// // // //                         onClick={() => navigate("/careers")}
// // // //                         className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full"
// // // //                     >
// // // //                         View Open Roles
// // // //                     </button>

// // // //                     <button
// // // //                         onClick={() => navigate("/careers")}
// // // //                         className="px-6 py-2 border border-black/20 text-black text-sm font-medium rounded-full hover:bg-black hover:text-white transition"
// // // //                     >
// // // //                         Why Work With Us
// // // //                     </button>
// // // //                 </div>
// // // //             </div>

// // // //             {/* IMAGE */}
// // // //             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center">
// // // //                 <img
// // // //                     src="/assets/home/career.jpg"
// // // //                     alt="Careers at our company"
// // // //                     className="w-full max-w-4xl object-contain"
// // // //                 />
// // // //             </div>
// // // //         </section>
// // // //     );
// // // // };

// // // // export default CareerSection;



// // // import React from "react";
// // // import { useNavigate } from "react-router-dom";

// // // const CareerSection = () => {
// // //     const navigate = useNavigate();

// // //     return (
// // //         <section className="relative w-full bg-neutral-50 overflow-hidden">
// // //             <div className="max-w-7xl mx-auto px-6 py-24">
// // //                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

// // //                     {/* LEFT SIDE - TEXT */}
// // //                     <div className="text-left lg:text-left">
// // //                         {/* EYEBROW */}
// // //                         <p className="text-xs font-semibold tracking-[0.3em] uppercase text-black mb-4">
// // //                             Careers
// // //                         </p>

// // //                         {/* TITLE */}
// // //                         <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
// // //                             Build Your Future With Us
// // //                         </h1>

// // //                         {/* SUBTITLE */}
// // //                         <p className="text-sm sm:text-base text-black/60 mb-8 leading-relaxed">
// // //                             Join a team that values clarity, craftsmanship, and impact.
// // //                             Work on meaningful products alongside people who care about doing things right.
// // //                         </p>

// // //                         {/* CTA */}
// // //                         <div className="flex flex-col sm:flex-row gap-4">
// // //                             <button
// // //                                 onClick={() => navigate("/careers")}
// // //                                 className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition-colors"
// // //                             >
// // //                                 View Open Roles
// // //                             </button>

// // //                             <button
// // //                                 onClick={() => navigate("/careers")}
// // //                                 className="px-6 py-3 border border-black/20 text-black text-sm font-medium rounded-full hover:bg-black hover:text-white transition-colors"
// // //                             >
// // //                                 Why Work With Us
// // //                             </button>
// // //                         </div>
// // //                     </div>

// // //                     {/* RIGHT SIDE - IMAGE */}
// // //                     <div className="flex justify-center">
// // //                         <img
// // //                             src="/assets/home/career.jpg"
// // //                             alt="Careers at our company"
// // //                             className="w-full max-w-md lg:max-w-full h-auto object-cover rounded-lg shadow-lg"
// // //                         />
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         </section>
// // //     );
// // // };

// // // export default CareerSection;


// // import React from "react";
// // import { useNavigate } from "react-router-dom";

// // const CareerSection = () => {
// //     const navigate = useNavigate();

// //     return (
// //         <section className="relative w-full h-screen overflow-hidden">

// //             {/* BACKGROUND GIF */}
// //             <div
// //                 className="absolute inset-0 bg-cover bg-center"
// //                 style={{
// //                     backgroundImage: "url('https://res.cloudinary.com/dtwcgfmar/video/upload/v1771243407/tinywow_endless-corridor-of-the-future-2026-01-28-04-30-20-utc_88007248_cu1vau.mp4')",
// //                 }}
// //             />

// //             {/* DARK OVERLAY */}
// //             <div className="absolute inset-0 bg-black/50" />

// //             {/* CONTENT */}
// //             <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
// //                 <div className="max-w-xl text-left text-white">

// //                     {/* EYEBROW */}
// //                     <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 opacity-90">
// //                         Careers
// //                     </p>

// //                     {/* TITLE */}
// //                     <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6">
// //                         Build Your Future With Us
// //                     </h1>

// //                     {/* SUBTITLE */}
// //                     <p className="text-sm sm:text-base text-white/80 mb-8 leading-relaxed">
// //                         Join a team that values clarity, craftsmanship, and impact.
// //                         Work on meaningful products alongside people who care about doing things right.
// //                     </p>

// //                     {/* CTA */}
// //                     <div className="flex flex-col sm:flex-row gap-4">
// //                         <button
// //                             onClick={() => navigate("/careers")}
// //                             className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition-colors"
// //                         >
// //                             View Open Roles
// //                         </button>

// //                         <button
// //                             onClick={() => navigate("/careers")}
// //                             className="px-6 py-3 border border-white/50 text-white text-sm font-medium rounded-full hover:bg-white hover:text-black transition-colors"
// //                         >
// //                             Why Work With Us
// //                         </button>
// //                     </div>
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // };

// // export default CareerSection;



// import React from "react";
// import { useNavigate } from "react-router-dom";

// const CareerSection = () => {
//     const navigate = useNavigate();

//     return (
//         <section className="relative w-full h-screen overflow-hidden">
//             {/* BACKGROUND VIDEO */}
//             <video
//                 className="absolute inset-0 w-full h-full object-cover pointer-events-none"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//             >
//                 <source
//                     src="https://res.cloudinary.com/dtwcgfmar/video/upload/v1771243407/tinywow_endless-corridor-of-the-future-2026-01-28-04-30-20-utc_88007248_cu1vau.mp4"
//                     type="video/mp4"
//                 />
//             </video>

//             {/* OVERLAY (gradient + dark) */}
//             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/90 to-black/40" />

//             {/* CONTENT */}
//             <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
//                 <div className="max-w-xl text-left text-white">
//                     {/* EYEBROW */}
//                     <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 opacity-90">
//                         Careers
//                     </p>

//                     {/* TITLE */}
//                     <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
//                         Build Your Future With Us
//                     </h1>

//                     {/* SUBTITLE */}
//                     <p className="text-sm sm:text-base text-white/90 mb-8 leading-relaxed">
//                         Join a team that values clarity, craftsmanship, and impact.
//                         Work on meaningful products alongside people who care about doing things right.
//                     </p>

//                     {/* CTA */}
//                     <div className="flex flex-col sm:flex-row gap-4">
//                         <button
//                             onClick={() => navigate("/careers")}
//                             className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition-colors"
//                         >
//                             View Open Roles
//                         </button>

//                         <button
//                             onClick={() => navigate("/careers")}
//                             className="px-6 py-3 border border-white/60 text-white text-sm font-medium rounded-full hover:bg-white hover:text-black transition-colors"
//                         >
//                             Why Work With Us
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default CareerSection;
import React from "react";
import { useNavigate } from "react-router-dom";

const CareerSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full h-full overflow-hidden">
            {/* BACKGROUND VIDEO */}
            <video
                className="absolute inset-0 w-full h-full object-cover pointer-events-none blur-[1.5px] scale-105"
                autoPlay
                muted
                loop
                playsInline
            >
                <source
                    src="https://res.cloudinary.com/dtwcgfmar/video/upload/v1771243407/tinywow_endless-corridor-of-the-future-2026-01-28-04-30-20-utc_88007248_cu1vau.mp4"
                    type="video/mp4"
                />
            </video>

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/50" />

            {/* CONTENT */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center justify-center">
                <div className="max-w-2xl text-center text-white">
                    {/* EYEBROW */}
                    <p className="text-[11px] sm:text-xs font-semibold tracking-[0.35em] uppercase mb-5 text-white/70">
                        Careers
                    </p>

                    {/* TITLE */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
                        Build Your Future
                        <br />
                        With Us
                    </h1>

                    {/* SUBTITLE */}
                    <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-xl mx-auto mb-10 leading-relaxed">
                        Join a team that values clarity, craftsmanship, and impact.
                        Work on meaningful products alongside people who care about doing things right.
                    </p>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => navigate("/careers")}
                            className="px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition-colors"
                        >
                            View Open Roles
                        </button>

                        <button
                            onClick={() => navigate("/careers")}
                            className="px-7 py-3.5 border border-white/60 text-white text-sm font-medium rounded-full hover:bg-white hover:text-black transition-colors"
                        >
                            Why Work With Us
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerSection;
