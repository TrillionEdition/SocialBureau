import React from "react";
import { Link } from "react-router-dom";
import { getOptimizedCloudinaryUrl } from "../../../utils/cloudinary";

const StaticServicesGrid = () => {
    const items = [
        {
            title: "Blog",
            subtitle: "Insights worth reading",
            image: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772003206/Untitled-design-43.png_kr4ij5.webp",
            bg: "bg-white",
            text: "text-[#1D1D1F]",
            link: "/blog",
            accent: "#0071E3",
            decorStyle: "left",
        },
        {
            title: "TrillionEdition",
            subtitle: "The next level awaits",
            image: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772003207/Untitled-design-44.png_uc4y4m.webp", // replace with your image
            bg: "bg-[#000000]",
            text: "text-white",
            link: "https://www.trillionedition.com/",
            accent: "#0071E3",
            decorStyle: "right",
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
                    {/* Subtle decorative blob */}
                    <div
                        className="absolute pointer-events-none"
                        style={{
                            width: "340px",
                            height: "340px",
                            borderRadius: "50%",
                            bottom: item.decorStyle === "left" ? "-80px" : "-60px",
                            left: item.decorStyle === "left" ? "-60px" : "auto",
                            right: item.decorStyle === "right" ? "-60px" : "auto",
                            zIndex: 0,
                            transition: "opacity 0.5s",
                        }}
                    />

                    {/* TOP TEXT */}
                    <div className="relative z-10 text-center flex flex-col items-center px-6 pt-12 md:pt-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-2">
                            {item.title}
                        </h2>
                        <p className="text-lg opacity-70 mb-6">{item.subtitle}</p>
                        <span
                            className="px-6 py-2 rounded-full text-sm font-medium"
                            style={{
                                background: item.accent,
                                color: item.decorStyle === "right" ? "#0A0A0A" : "#fff",
                            }}
                        >
                            Explore
                        </span>
                    </div>

                    {/* IMAGE AREA */}
                    <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden pb-7 z-10">
                        <div className="w-full">
                            {item.image && (
                                <img
                                    src={getOptimizedCloudinaryUrl(item.image, 600)}
                                    alt={`${item.title} - ${item.subtitle}`}
                                    loading="lazy"
                                    className="w-[90%] max-w-[450px] h-auto object-contain mx-auto"
                                />
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </section>
    );
};

export default StaticServicesGrid;
