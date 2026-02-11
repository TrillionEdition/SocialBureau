// import React from "react";
// import { Link } from "react-router-dom";

// const ServicesGrid = () => {
//     const items = [
//         {
//             title: "Content Marketing",
//             subtitle: "Built for scalable growth",
//             image: "/assets/home/content.jpg",
//             bg: "bg-[#FFECDD]",
//             text: "text-black",
//             link: "/content-marketing",
//         },
//         {
//             title: "Niche Marketing",
//             subtitle: "Precision over assumptions",
//             image: "/assets/home/review.png",
//             bg: "bg-sky-100",
//             text: "text-black",
//             link: "/niche-marketing",
//         },
//         {
//             title: "AdTech Integration",
//             subtitle: "Engineered for rankings",
//             image: "/assets/home/agency.png",
//             bg: "bg-pink-100",
//             text: "text-black",
//             link: "/adTech-marketing",
//         },
//         {
//             title: "Performance Marketing",
//             subtitle: "Marketing, fully automated",
//             image: "/assets/home/businessperformance.png",
//             bg: "bg-neutral-100",
//             text: "text-black",
//             link: "/performance-marketing",
//         },
//     ];

//     return (
//         <section className="h-screen w-full grid grid-cols-2 grid-rows-2">
//             {items.map((item, index) => (
//                 <Link
//                     key={`${item.title}-${index}`} // ✅ correct key placement
//                     to={item.link}
//                     className={`relative flex flex-col items-center justify-center ${item.bg} ${item.text} overflow-hidden group`}
//                 >
//                     {/* TEXT */}
//                     <div className="relative z-10 text-center px-4 sm:px-6">
//                         <span className="inline-block mb-3 px-3 py-1 text-[10px] sm:text-xs uppercase tracking-[0.3em] rounded-full border border-current">
//                             Our Services
//                         </span>

//                         <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold mb-2 tracking-tight">
//                             {item.title}
//                         </h2>

//                         <p className="text-xs sm:text-sm lg:text-base opacity-70">
//                             {item.subtitle}
//                         </p>
//                     </div>

//                     {/* IMAGE */}
//                     <img
//                         src={item.image}
//                         alt={item.title}
//                         className="absolute bottom-0 right-0 w-1/2 sm:w-2/3 max-w-xs object-contain opacity-90 transition-transform duration-700 group-hover:scale-105"
//                     />
//                 </Link>
//             ))}
//         </section>
//     );
// };

// export default ServicesGrid;



import React from "react";
import { Link } from "react-router-dom";

const ServicesGrid = () => {
    const items = [
        {
            title: "Content Marketing",
            subtitle: "Built for scalable growth",
            image: "/assets/home/content.jpg",
            bg: "bg-[#FFECDD]",
            text: "text-black",
            link: "/content-marketing",
        },
        {
            title: "Niche Marketing",
            subtitle: "Precision over assumptions",
            image: "/assets/home/review.png",
            bg: "bg-sky-100",
            text: "text-black",
            link: "/niche-marketing",
        },
        {
            title: "AdTech Integration",
            subtitle: "Engineered for rankings",
            image: "/assets/home/agency.png",
            bg: "bg-pink-100",
            text: "text-black",
            link: "/adTech-marketing",
        },
        {
            title: "Performance Marketing",
            subtitle: "Marketing, fully automated",
            image: "/assets/home/businessperformance.png",
            bg: "bg-neutral-100",
            text: "text-black",
            link: "/performance-marketing",
        },
    ];

    return (
        <section className="h-screen w-full grid grid-cols-2 grid-rows-2">
            {items.map((item, index) => (
                <Link
                    key={`${item.title}-${index}`}
                    to={item.link}
                    className={`flex flex-col justify-between ${item.bg} ${item.text} p-6 sm:p-8 group`}
                >
                    {/* TEXT (TOP) */}
                    <div className="text-center">
                        <span className="inline-block mb-3 px-3 py-1 text-[10px] sm:text-xs uppercase tracking-[0.3em] rounded-full border border-current">
                            Our Services
                        </span>

                        <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold mb-2 tracking-tight">
                            {item.title}
                        </h2>

                        <p className="text-xs sm:text-sm lg:text-base opacity-70">
                            {item.subtitle}
                        </p>
                    </div>

                    {/* IMAGE (BOTTOM – CENTERED) */}
                    <div className="flex justify-center items-end mt-6">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="
            w-1/2
            max-h-[180px]
            sm:max-h-[220px]
            lg:max-h-[260px]
            object-contain
            transition-transform
            duration-700
            group-hover:scale-105
        "
                        />
                    </div>

                </Link>
            ))}
        </section>
    );
};

export default ServicesGrid;
