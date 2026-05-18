import React from "react";

const TestimonialsSection = ({
    videosList = [
        {
            id: "1",
            thumbnail: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/SB_Testimonail_Rimshad_vxakgn.jpg",
            title: "Rimshad M",
            description: "Graphics Designer",
            link: "https://youtu.be/eBJnlmTuuIk?si=CYTR9TTw6uxhnniB",
        },
        {
            id: "2",
            thumbnail: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Aneek_oertfd.png",
            title: "Aneek",
            description: "Performance Marketer",
            link: "https://youtu.be/-FZtOCgZP2Y?si=v0_zYYa9NDJPF1Zk",
        },
        {
            id: "3",
            thumbnail: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/SB_Testimonial_YouTube_Thumbanil_Elizebath_loehcz.png",
            title: "Elizebath Thomas",
            description: "Web Developer",
            link: "https://youtu.be/gNebMaTqoQg?si=7uUvk1H389lKdBdJ",
        },
    ],
}) => {
    return (
        <section className="bg-white py-12 md:py-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* HEADER */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4 tracking-tight">
                        What People Say
                    </h2>
                    <p className="text-black/60 text-lg max-w-2xl mx-auto">
                        Real stories from people who’ve worked with us.
                    </p>
                </div>

                {/* GRID — 3 LARGE CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {videosList.slice(0, 3).map((video, index) => (
                        <a
                            key={`${video.id}-${index}`}
                            href={video.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                        >
                            <div className="relative rounded-3xl overflow-hidden bg-black">

                                {/* IMAGE */}
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* OVERLAY */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            </div>

                            {/* TEXT */}
                            <div className="mt-6 text-center">
                                <h3 className="text-xl font-semibold text-black">
                                    {video.title}
                                </h3>
                                <p className="text-base text-black/60 mt-1">
                                    {video.description}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TestimonialsSection;

