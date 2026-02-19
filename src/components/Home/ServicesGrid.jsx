import React from "react";
import { Link } from "react-router-dom";

const ServicesGrid = () => {
    const items = [
        {
            title: "Content Marketing",
            subtitle: "Built for scalable growth",
            image: "/assets/home/amal1.png",
            bg: "bg-[#FBFBFD]", // Light Apple Grey
            text: "text-[#1D1D1F]",
            link: "/content-marketing",
        },
        {
            title: "Niche Marketing",
            subtitle: "Precision over assumptions",
            image: "/assets/home/hajira.png",
            bg: "bg-[#000000ff]",
            text: "text-[#ffffffff]",
            link: "/niche-marketing",
        },
        {
            title: "AdTech Integration",
            subtitle: "Engineered for rankings",
            image: "/assets/home/muhsin.png",
            bg: "bg-black",
            text: "text-white",
            link: "/adTech-marketing",
        },
        {
            title: "Performance Marketing",
            subtitle: "Marketing, fully automated",
            image: "/assets/home/pmo2.png",
            bg: "bg-[#FBFBFD]",
            text: "text-[#1D1D1F]",
            link: "/performance-marketing",
        },
    ];

    return (
        <section className="w-full grid grid-cols-1 md:grid-cols-2 bg-white">
            {items.map((item, index) => (
                <div
                    key={`${item.title}-${index}`}
                    className={`relative flex flex-col h-[420px] sm:h-[580px] lg:h-[620px] ${item.bg} ${item.text} overflow-hidden group cursor-pointer`}
                >
                    {/* TEXT CONTENT - Top Section */}
                    <div className="relative z-10 text-center flex flex-col items-center px-6 pt-8 md:pt-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-2">
                            {item.title}
                        </h2>
                        <p className="text-lg sm:text-xl lg:text-2xl font-normal mb-4 px-4">
                            {item.subtitle}
                        </p>

                        {/* APPLE STYLE BUTTONS */}
                        <div className="flex gap-4">
                            <Link
                                to={item.link}
                                className="bg-[#0071E3] hover:bg-[#0077ED] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
                            >
                                Learn more
                            </Link>
                        </div>
                    </div>

                    {/* IMAGE - Bottom Section */}
                    <div className="relative flex-1 w-full flex items-end justify-center overflow-hidden pt-4">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="
                            w-auto
                            h-[300px]
                            sm:h-[380px]
                            md:h-[400px]
                            lg:h-[500px]
                            object-contain
                            mx-auto
                            drop-shadow-xl
                            transition-transform
                            duration-700
                            ease-out
                            group-hover:scale-105
                            "
                        />
                    </div>
                </div>
            ))}
        </section>
    );
};

export default ServicesGrid;