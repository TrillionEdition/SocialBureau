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
            image: "/assets/niche-marketing.png",
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
        <section className="w-full grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:h-screen h-auto">
            {items.map((item, index) => (
                <Link
                    key={`${item.title}-${index}`} // ✅ correct key placement
                    to={item.link}
                    className={`relative flex flex-col items-left justify-center ${item.bg} ${item.text} overflow-hidden group`}
                >
                    {/* TEXT */}
                    <div className="relative z-10 text-left px-0 sm:px-6">
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

                    {/* IMAGE */}
                    <img
                        src={item.image}
                        alt={item.title}
                        className="static md:absolute bottom-0 right-0 max-h-50 w-1/3 md:w-1/2 object-contain opacity-90 transition-transform duration-700 group-hover:scale-105"
                    />
                </Link>
            ))}
        </section>
    );
};

export default ServicesGrid;