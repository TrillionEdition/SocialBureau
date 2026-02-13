import React from "react";
import { Link } from "react-router-dom";

const PartnershipTeamGrid = () => {
    const items = [
        {
            title: "Partnerships",
            subtitle: "Grow stronger, together",
            image: "https://i.pinimg.com/736x/b7/ef/e1/b7efe1ebc308e1308e2290a3a2b6416a.jpg",
            bg: "bg-neutral-100",
            text: "text-black",
            link: "/partners",
        },
        {
            title: "Our Team",
            subtitle: "People behind the product",
            image: "/assets/home/team.png",
            bg: "bg-black",
            text: "text-white",
            link: "/our-team",
        },
    ];

    return (
        <section className="h-screen w-full grid grid-cols-1 md:grid-cols-2">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`relative flex flex-col items-center justify-between ${item.bg} ${item.text} overflow-hidden`}
                >
                    <Link
                        to={item.link}
                        className="relative w-full h-full flex flex-col items-center justify-between"
                    >
                        {/* TEXT - Positioned at top */}
                        <div className="relative z-10 text-center px-6 pt-8 sm:pt-12 lg:pt-16 max-w-lg">
                            <span className="inline-block mb-4 px-4 py-1 text-xs uppercase tracking-[0.3em] rounded-full border border-current">
                                {item.title === "Partnerships" ? "Partnerships" : "Team"}
                            </span>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3">
                                {item.title}
                            </h2>

                            <p className="text-sm sm:text-base lg:text-lg opacity-70">
                                {item.subtitle}
                            </p>
                        </div>

                        {/* IMAGE - Positioned at bottom */}
                        <img
                            src={item.image}
                            alt={item.title}
                            className="relative w-full object-contain opacity-90 hover:scale-105 transition-transform duration-700"
                            style={{
                                objectPosition: 'center bottom'
                            }}
                        />
                    </Link>
                </div>
            ))}
        </section>
    );
};

export default PartnershipTeamGrid;