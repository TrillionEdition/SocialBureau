// import React, { Suspense, useEffect, useState } from "react";

// import { useNavigate } from "react-router-dom";



// const BackgroundGlows = React.lazy(() => import("./Background"));



// export function CyberBackground() {

//   const navigate = useNavigate();

//   const [isMobile, setIsMobile] = useState(

//     typeof window !== 'undefined' ? window.innerWidth < 768 : true

//   ); // md breakpoint



//   useEffect(() => {

//     const onResize = () => setIsMobile(window.innerWidth < 768);

//     window.addEventListener('resize', onResize);

//     return () => window.removeEventListener('resize', onResize);

//   }, []);



//   return (

//     <div

//       className={`relative flex items-center justify-center min-h-screen max-h-screen overflow-hidden

//         ${isMobile ? "bg-gradient-to-b from-black via-gray-900 to-black" : "bg-black"}

//       `}

//     >

//       {/* Only show animated glows on desktop */}

//       {!isMobile && (

//         <Suspense fallback={null}>

//           <BackgroundGlows />

//         </Suspense>

//       )}



//       {/* Background media: video on desktop, static image on mobile */}

//       {isMobile ? (

//         <img

//           src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1765000791/SB-min_k1dl7k.png"

//           alt="SB background"

//           className="w-full h-auto"

//         />

//       ) : (

//         <video

//           className="absolute inset-0 w-full h-full object-cover pointer-events-none"

//           src="https://res.cloudinary.com/dtwcgfmar/video/upload/v1765003262/freepik__create-a-1416-second-4k-30fps-3d-isometric-animati__9939_kib2mf.mp4"

//           autoPlay

//           loop

//           muted

//           playsInline

//           preload="metadata"

//           aria-hidden="true"

//         />

//       )}



//       {/* Center Content */}

//       <div className="relative z-10 text-center px-4 md:px-40 sm:px-30">

//         {/* <h1

//           className="text-3xl sm:text-5xl md:text-6xl font-bold 

//              bg-gradient-to-r from-gray-300/20 via-white to-gray-300/20 

//              bg-clip-text text-transparent

//              tracking-tight"

//           style={{ fontFamily: "Inter, sans-serif" }}

//         >

//           World’s First API-Driven Marketing Agency

//         </h1>



//         <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">

//           Automate, Integrate, and Scale Your Marketing powered by real-time data, AI, and performance APIs.

//         </p>



//         <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

//           <button

//             name="services"

//             onClick={() => navigate("/services")}

//             className="relative overflow-hidden px-6 py-3 rounded-full bg-black text-white font-medium shadow-lg hover:shadow-xl transition scan-button"

//           >

//             Get Started

//           </button>

//           <button

//             name="services"

//             onClick={() => navigate("/services")}            

//             className="px-6 py-3 rounded-full border border-gray-500 text-gray-300 hover:bg-gray-500/40 transition"

//           >

//             Explore Our Solutions

//           </button>

//         </div> */}

//         {/* <p className="mt-15 text-lg sm:text-xl text-gray-300 font-medium max-w-5xl mx-auto leading-relaxed">

//           At SocialBureau, we redefine how brands grow with technology.

//           From API-based ad automation to niche-focused digital campaigns, we deliver marketing that performs at the speed of code.

//         </p> */}

//       </div>

//     </div>

//   );

// }





// // import React, { Suspense, lazy, useEffect, useState } from "react";

// // import { useNavigate } from "react-router-dom";



// // const Background = lazy(() => import("./Background"));



// // export const CyberBackground = () => {

// //   const navigate = useNavigate();

// //   const [isMobile, setIsMobile] = useState(

// //     typeof window !== "undefined" ? window.innerWidth < 768 : false

// //   );



// //   useEffect(() => {

// //     const onResize = () => setIsMobile(window.innerWidth < 768);

// //     window.addEventListener("resize", onResize);

// //     return () => window.removeEventListener("resize", onResize);

// //   }, []);



// //   // Desktop and mobile video sources (swap these paths/URLs to your real assets)

// //   const desktopVideo = {

// //     webm: "/videos/hero-bg.webm",

// //     mp4: "https://res.cloudinary.com/dtwcgfmar/video/upload/v1767002073/freepik__a-cinematic-new-year-transition-designed-for-a-10s__74337_tpqwcr.mp4",

// //     poster: "/videos/hero-poster.jpg",

// //   };



// //   const mobileVideo = {

// //     webm: "/videos/hero-mobile.webm", // smaller/responsive mobile-optimized webm

// //     mp4: "https://res.cloudinary.com/dtwcgfmar/video/upload/v1767002056/freepik__a-cinematic-new-year-transition-designed-for-a-10s__74336_ocgmng.mp4", // example mobile mp4

// //     poster: "/videos/hero-mobile-poster.jpg",

// //   };



// //   const chosenVideo = isMobile ? mobileVideo : desktopVideo;



// //   return (

// //     <div

// //       className={`relative flex items-center justify-center min-h-screen max-h-screen overflow-hidden ${

// //         isMobile ? "bg-gradient-to-b from-black via-gray-900 to-black" : "bg-black"

// //       }`}

// //     >



// //       {/* Background video (sources change depending on viewport) */}

// //       <div>

// //         {/* Use key so the <video> element is recreated when isMobile toggles,

// //             ensuring the browser loads the appropriate source when switching. */}

// //         <video

// //           key={isMobile ? "mobile" : "desktop"}

// //           className="absolute inset-0 w-full h-full object-cover pointer-events-none"

// //           autoPlay

// //           muted

// //           loop

// //           playsInline

// //           preload="metadata"

// //           poster={chosenVideo.poster}

// //           aria-hidden="true"

// //         >

// //           {chosenVideo.webm && (

// //             <source src={chosenVideo.webm} type="video/webm" />

// //           )}

// //           {chosenVideo.mp4 && (

// //             <source src={chosenVideo.mp4} type="video/mp4" />

// //           )}

// //           {/* Fallback: keep the overlay color so the UI remains readable even if video fails */}

// //         </video>



// //         <div className="absolute inset-0 bg-black/70 pointer-events-none" />

// //       </div>



// //       <div className="relative z-10 text-center px-4 md:px-40 sm:px-30">

// //         <h1

// //           className="text-3xl sm:text-5xl md:text-6xl font-bold 

// //              bg-gradient-to-r from-gray-300/20 via-white to-gray-300/20 

// //              bg-clip-text text-transparent

// //              tracking-tight"

// //           style={{ fontFamily: "Inter, sans-serif" }}

// //         >

// //           Integrated API Solutions to Help Accelerate Your Growth

// //         </h1>



// //         <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">

// //           From custom integrations to enterprise-level advanced API services, we

// //           build relationships that will help your business stay smarter and

// //           faster.

// //         </p>



// //         <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

// //           <button

// //             name="services"

// //             onClick={() => navigate("/services")}

// //             className="relative overflow-hidden px-6 py-3 rounded-full bg-black text-white font-medium shadow-lg hover:shadow-xl transition scan-button"

// //           >

// //             View Our Services

// //           </button>

// //           <button

// //             name="chat"

// //             onClick={() => {

// //               window.open(

// //                 "https://wa.me/918921840486?text=Hello, I would like to learn more.",

// //                 "_blank"

// //               );

// //             }}

// //             className="px-6 py-3 rounded-full border border-gray-400 text-gray-300 hover:bg-gray-500/40 transition"

// //           >

// //             Book an Appointment Today!

// //           </button>

// //         </div>

// //       </div>

// //     </div>

// //   );

// // };

import React, { Suspense } from "react";

import { useNavigate } from "react-router-dom";



const BackgroundGlows = React.lazy(() => import("./Background"));



export function CyberBackground() {

  const navigate = useNavigate();

  const isMobile = window.innerWidth < 768; // md breakpoint



  return (

    <div

      className={`relative flex items-center justify-center min-h-screen max-h-screen overflow-hidden

        ${isMobile ? "bg-gradient-to-b from-black via-gray-900 to-black" : "bg-black"}

      `}

    >

      {/* Only show animated glows on desktop */}

      {!isMobile && (

        <Suspense fallback={null}>

          <BackgroundGlows />

        </Suspense>

      )}



      {/* Center Content */}

      <div className="relative z-10 text-center px-4 md:px-40 sm:px-30">

        <h1

          className="text-3xl sm:text-5xl md:text-6xl font-bold 

             bg-gradient-to-r from-gray-300/20 via-white to-gray-300/20 

             bg-clip-text text-transparent

             tracking-tight"

          style={{ fontFamily: "Inter, sans-serif" }}

        >

          World’s First API-Driven Marketing Agency

        </h1>



        <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">

          Automate, Integrate, and Scale Your Marketing powered by real-time data, AI, and performance APIs.

        </p>



        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

          <button

            name="services"

            onClick={() => navigate("/services")}

            className="relative overflow-hidden px-6 py-3 rounded-full bg-black text-white font-medium shadow-lg hover:shadow-xl transition scan-button"

          >

            Get Started

          </button>

          <button

            name="services"

            onClick={() => navigate("/services")}            

            className="px-6 py-3 rounded-full border border-gray-500 text-gray-300 hover:bg-gray-500/40 transition"

          >

            Explore Our Solutions

          </button>

        </div>

        {/* <p className="mt-15 text-lg sm:text-xl text-gray-300 font-medium max-w-5xl mx-auto leading-relaxed">

          At SocialBureau, we redefine how brands grow with technology.

          From API-based ad automation to niche-focused digital campaigns, we deliver marketing that performs at the speed of code.

        </p> */}

      </div>

    </div>

  );

}



export default CyberBackground;


