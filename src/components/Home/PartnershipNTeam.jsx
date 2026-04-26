import React from "react";
import { Link } from "react-router-dom";

export const PartnershipSection = () => {
    return (
        <section
            className="relative w-full h-full min-h-[400px] md:min-h-[500px] flex flex-col items-center overflow-hidden"
            style={{
                backgroundImage: `url(/assets/home/connects.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black/30" />
            <Link
                to="/partners"
                className="relative z-10 w-full h-full flex flex-col text-white py-16 md:py-24"
            >
                <div className="text-center px-6 max-w-2xl mx-auto">
                    <span className="inline-block mb-3 px-3 py-1 text-[10px] sm:text-xs uppercase tracking-[0.35em] rounded-full border border-white">
                        Partnerships
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                        Partnerships
                    </h2>
                    <p className="text-base sm:text-lg opacity-90">
                        Grow stronger, together
                    </p>
                </div>
            </Link>
        </section>
    );
};

export const TeamSection = () => {
    return (
        <section className="relative w-full bg-white overflow-hidden">
            <Link
                to="/our-team"
                className="relative z-10 w-full flex flex-col items-center text-black py-10 md:py-20"
            >
                <div className="text-center px-6 max-w-lg mx-auto mb-6 md:mb-10">
                    <span className="inline-block mb-2 px-3 py-1 text-[10px] sm:text-xs uppercase tracking-[0.35em] rounded-full border border-black">
                        Team
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-2">
                        Our Team
                    </h2>
                    <p className="text-base sm:text-lg opacity-80">
                        People behind the product
                    </p>
                </div>

                <div className="w-full flex justify-center">
                    <img
                        src="/assets/home/team.png"
                        alt="Our Team"
                        className="
                            w-auto
                            h-auto
                            max-h-[300px]
                            sm:max-h-[400px]
                            md:max-h-[600px]
                            object-contain
                        "
                    />
                </div>
            </Link>
        </section>
    );
};

const PartnershipTeamGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
            <PartnershipSection />
            <TeamSection />
        </div>
    );
};

export default PartnershipTeamGrid;

