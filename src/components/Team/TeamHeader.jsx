// import React from "react";

// export default function TeamHeader() {
//   return (
//     <section className="bg-black text-white overflow-hidden">
//       <div className="max-w-[1440px] mx-auto px-[15px] lg:px-[25px] py-[40px]">

//         <div className="grid lg:grid-cols-[auto_1fr] items-start gap-[30px] lg:gap-[50px]">

//           {/* LEFT CONTENT */}
//           <div className="flex flex-col">

//             {/* HEADING */}
//             <h1
//               className="
//                 pt-10
//                 font-['Plus_Jakarta_Sans',_sans-serif]
//                 font-[800]
//                 uppercase
//                 leading-[0.88]
//                 tracking-[-0.05em]
//                 text-[50px]
//                 lg:text-[76px]
//               "
//             >
//               <span className="block text-white">WE DESIGN</span>
//               <span className="block text-white whitespace-nowrap">DIGITAL EXPERIENCES</span>
//               <span className="block text-[#FF1E1E] whitespace-nowrap">THAT DRIVE RESULTS</span>
//             </h1>

//             {/* DESCRIPTION */}
//             <p
//               className="
//                 mt-[32px]
//                 max-w-[580px]
//                 text-[15px]
//                 leading-[1.65]
//                 text-white/70
//                 font-medium
//               "
//             >
//               We are creative web design & development agency crafting modern,<br />
//               user-friendly & result-driven websites that help brands stand out and<br />
//               grow online.
//             </p>

//             {/* BUTTONS */}
//             <div className="mt-[28px] flex items-center gap-4">

//               {/* PRIMARY BUTTON */}
//               <button
//                 className="
//                   bg-[#FF1E1E]
//                   hover:bg-red-700
//                   transition
//                   h-[48px]
//                   px-[26px]
//                   rounded-[8px]
//                   text-[14px]
//                   font-medium
//                   flex
//                   items-center
//                   gap-2
//                 "
//               >
//                 Start Your Project
//                 <span>→</span>
//               </button>

//               {/* SECONDARY BUTTON */}
//               <button
//                 className="
//                   border
//                   border-white/20
//                   hover:border-white
//                   transition
//                   h-[48px]
//                   px-[24px]
//                   rounded-[8px]
//                   text-[14px]
//                   font-medium
//                   flex
//                   items-center
//                   gap-2
//                 "
//               >
//                 <span className="text-[#FF1E1E]">◎</span>
//                 View Our Work
//               </button>

//             </div>
//           </div>

//           {/* RIGHT IMAGE */}
//           <div className="flex justify-end">

//             <img
//               src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1778048133/image_24_bbnjix.png"
//               alt="Team"
//               className="
//                 w-full
//                 max-w-[1100px]
//                 object-contain
//                 mt-[20px]
//                 lg:scale-110
//                 origin-right
//               "
//             />

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



import React from 'react'



export const TeamHeader = () => {

  return (

    <div

      className="min-h-[55vh] flex border-b-1 border-[#ff0000] flex-col justify-center items-center text-center bg-cover bg-center bg-no-repeat px-4 py-10 md:px-10 md:py-20 w-full"

    >

      <h2

        className="text-white text-4xl md:text-7xl font-serif leading-tight max-w-3xl mx-auto"

        style={{ fontFamily: "Playfair Display, serif" }}

      >

        The Team Behind <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>

          Social<span className="text-[#ff0000]">B</span>ureau

        </a>

      </h2>

      <h4 className="text-2xl md:text-3xl mb-6 text-red-700">Where Innovation Meets Execution</h4>

      <p className="text-lg md:text-xl text-gray-300 font-light max-w-3xl text-center mx-auto px-2">

        At <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>

          Social<span className="text-[#ff0000]">B</span>ureau

        </a>, every project is powered by people who think beyond conventional marketing.



        Our team blends technical expertise, creative storytelling, and strategic intelligence. The perfect mix that fuels <a

          href="https://trillionedition.com"

          target="_blank"

          rel="noopener noreferrer"

          className="font-bold cursor-pointer"

        >

          TrillionEdition LLP

        </a>’s vision to build the world’s first API-driven marketing ecosystem.

      </p>

    </div>



  )

}