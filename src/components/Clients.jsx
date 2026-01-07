// import { ArrowRight, ArrowRightCircle, ChevronRight, MoveRight } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Clients() {
//   const images = [
//     { url: "https://www.newstamil.tv/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.ae4ceeb6.png&w=640&q=75"},
//     { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Reporter_TV_2023.jpg/250px-Reporter_TV_2023.jpg"},
//     { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Big_TV_Logo.jpg/1200px-Big_TV_Logo.jpg"},
//     { url: "https://emaraj.com/wp-content/uploads/2024/04/EMARAJ-LOGO-2048x834.png"},
//     { url: "https://suntipstea.online/wp-content/uploads/2024/11/suntip-logo-white-673633bc349a1-scaled-e1731606777757.webp"},
//     { url: "https://kochamminis.com/cdn/shop/files/logo.png?v=1740811705" },
//   ];
// const bubbles = [
//   // sizes: { sm, md, lg } in px
//   { id: 1, value: "30+", label: "Social media handled", sizes: { sm: 180, md: 240, lg: 270 }, top: 25, left: 22 },
//   { id: 2, value: "327K+", label: "Viewership", sizes: { sm: 220, md: 350, lg: 380 }, top: 35, left: 57 },
//   { id: 3, value: "30+", label: "On going projects", sizes: { sm: 140, md: 200, lg: 220 }, top: 60, left: 35 },
//   { id: 4, value: "5M+", label: "Organic Followers Created", sizes: { sm: 170, md: 180, lg: 220 }, top: 55, left: 80 },
//   { id: 5, value: "10+", label: "Trusted Clients", sizes: { sm: 110, md: 140, lg: 160 }, top: 14, left: 78 },
// ];
// function useBreakpoint() {
//   const getBp = (w) => {
//     if (w < 640) return "sm"; // mobile
//     if (w < 1024) return "md"; // tablet
//     return "lg"; // desktop and up
//   };

//   const [bp, setBp] = useState(getBp(typeof window !== "undefined" ? window.innerWidth : 1200));

//   useEffect(() => {
//     function onResize() {
//       setBp(getBp(window.innerWidth));
//     }
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   return bp;
// }
// const bp = useBreakpoint();
//   const navigate=useNavigate();
//   return (
//     <div>
//       <div className="w-full md:h-[100vh] sm:h-[80vh] bg-black relative overflow-hidden px-6 sm:px-8 md:px-10 lg:px-12">
//       {bubbles.map((b) => {
//         const size = b.sizes[bp] ?? b.sizes.lg;
//         // fonts relative to bubble size; tweak multipliers as needed
//         const bigFont = Math.round(size * 0.28); // big number size
//         const smallFont = Math.round(size * 0.085); // label size

//         return (
//           <div
//             key={b.id}
//             className="absolute rounded-full border border-gray-300/40 flex flex-col items-center justify-center text-white select-none"
//             style={{
//               width: `${size}px`,
//               height: `${size}px`,
//               top: `${b.top}%`,
//               left: `${b.left}%`,
//               transform: "translate(-50%, -50%)",
//               backgroundColor: "transparent",
//             }}
//             aria-hidden={false}
//             role="group"
//           >
//             <div
//               className="font-extrabold leading-none text-white"
//               style={{ fontSize: `${bigFont}px`, lineHeight: 1 }}
//             >
//               {b.value}
//             </div>
//             <div
//               className="mt-2 text-center text-gray-100"
//               style={{ fontSize: `${smallFont}px`, lineHeight: 1.05 }}
//             >
//               {b.label}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   <h2
//     className="font-playfair text-4xl md:text-4xl font-bold mb-6 text-white text-center"
//     style={{ fontFamily: "Playfair Display, serif" }}
//   >
//     Our Clients
//   </h2>

//   <div className="flex flex-col items-center justify-center bg-black md:p-4 md:py-10 sm:p-8">
//     <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`relative cursor-pointer w-full h-28 sm:h-32 flex items-center justify-center transition-transform duration-300 hover:scale-105 hover:rotate-1`}
//           // onClick={() => navigate('/clients')}
//         >
//           <img
//             src={image.url}
//             alt={`Client ${index + 1}`}
//             className="md:max-h-15 sm:h-20 w-20 object-contain transition-opacity duration-300 opacity-90 hover:opacity-100"
//             loading="lazy"
//           />
//         </div>
//       ))}
//     </div>

//     {/* More Link */}
//     <a
//       // href="/clients"
//       className="flex items-center gap-2 text-white mt-6 hover:text-purple-400 transition-colors"
//     >
//       Many More <MoveRight />
//     </a>
//   </div>
// </div>

//   );
// }



import { ArrowRight, ArrowRightCircle, ChevronRight, MoveRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Clients() {
  const images = [
    { url: "https://www.newstamil.tv/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.ae4ceeb6.png&w=640&q=75", bg: "#0000"},
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Reporter_TV_2023.jpg/250px-Reporter_TV_2023.jpg", bg: "#ff0000"},
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Big_TV_Logo.jpg/1200px-Big_TV_Logo.jpg", bg: "#ae0200"},
    { url: "https://emaraj.com/wp-content/uploads/2024/04/EMARAJ-LOGO-2048x834.png", bg: "#FFFF"},
    { url: "https://suntipstea.online/wp-content/uploads/2024/11/suntip-logo-white-673633bc349a1-scaled-e1731606777757.webp", bg: "#61a545"},
    { url: "https://kochamminis.com/cdn/shop/files/logo.png?v=1740811705", bg: "#e6e6e6" },
  ];
const bubbles = [
  // sizes: { sm, md, lg } in px
  { id: 1, value: "30+", label: "Social media handled", sizes: { sm: 180, md: 240, lg: 270 }, top: 25, left: 22 },
  { id: 2, value: "327K+", label: "Viewership", sizes: { sm: 220, md: 350, lg: 380 }, top: 35, left: 57 },
  { id: 3, value: "30+", label: "On going projects", sizes: { sm: 140, md: 200, lg: 220 }, top: 60, left: 35 },
  { id: 4, value: "5M+", label: "Organic Followers Created", sizes: { sm: 170, md: 180, lg: 220 }, top: 55, left: 80 },
  { id: 5, value: "10+", label: "Trusted Clients", sizes: { sm: 110, md: 140, lg: 160 }, top: 14, left: 78 },
];
function useBreakpoint() {
  const getBp = (w) => {
    if (w < 640) return "sm"; // mobile
    if (w < 1024) return "md"; // tablet
    return "lg"; // desktop and up
  };

  const [bp, setBp] = useState(getBp(typeof window !== "undefined" ? window.innerWidth : 1200));

  useEffect(() => {
    function onResize() {
      setBp(getBp(window.innerWidth));
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return bp;
}
const bp = useBreakpoint();
  const navigate=useNavigate();
  return (
    <div className="bg-black">
      {/* Bubbles section */}
      <div className="w-full md:h-[70vh] sm:h-[60vh] bg-black relative overflow-hidden px-6 sm:px-8 md:px-10 lg:px-12">
        {bubbles.map((b) => {
          const size = b.sizes[bp] ?? b.sizes.lg;
          // fonts relative to bubble size; tweak multipliers as needed
          const bigFont = Math.round(size * 0.28); // big number size
          const smallFont = Math.round(size * 0.085); // label size

          return (
            <div
              key={b.id}
              className="absolute rounded-full border border-gray-300/40 flex flex-col items-center justify-center text-white select-none"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${b.top}%`,
                left: `${b.left}%`,
                transform: "translate(-50%, -50%)",
                backgroundColor: "transparent",
              }}
              aria-hidden={false}
              role="group"
            >
              <div
                className="font-extrabold leading-none text-white"
                style={{ fontSize: `${bigFont}px`, lineHeight: 1 }}
              >
                {b.value}
              </div>
              <div
                className="mt-2 text-center text-gray-100"
                style={{ fontSize: `${smallFont}px`, lineHeight: 1.05 }}
              >
                {b.label}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Clients section - moved right after bubbles with less space */}
{/* Clients section */}
<div className="pt-4 pb-10 bg-white">
  <h2
    className="font-playfair text-4xl md:text-4xl font-bold mb-6 text-black text-center"
    style={{ fontFamily: "Playfair Display, serif" }}
  >
    Our Clients
  </h2>

  <div className="flex flex-col items-center justify-center md:p-4 md:py-6 sm:p-6">
    <div className="grid grid-cols-1 gap-4 w-full max-w-5xl">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative cursor-pointer w-full h-20
                     flex items-center justify-center
                     border border-zinc-300 rounded-lg
                     transition-transform duration-300
                     hover:scale-[1.02]"
          style={{ backgroundColor: image.bg }}
        >
          <img
            src={image.url}
            alt={`Client ${index + 1}`}
            className="h-20 w-20 object-contain opacity-90 hover:opacity-100"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  </div>
</div>


    </div>
  );
}