import { useEffect, useState } from "react";

export default function ImageCarousel() {
    const images = [
        "https://res.cloudinary.com/dtwcgfmar/image/upload/v1771995838/Artboard_1_copy_2_1_1_haxwde.webp",
        "https://res.cloudinary.com/dtwcgfmar/image/upload/v1771995838/Artboard_1_1_1_l982re.webp",
        "https://res.cloudinary.com/dtwcgfmar/image/upload/v1771995838/Artboard_1_copy_2_mmmbkk.webp",
        "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772003206/Untitled-design-40.png_fuipcr.webp",
        "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772003206/Untitled-design-41.png_rblbxq.webp",

    ];

    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="relative w-full h-[40vh] sm:h-[50vh] md:h-[80vh] lg:h-[110vh] overflow-hidden">
            <h1 className="visually-hidden">API MARKETING AGENCY IN KOCHI</h1>
            <p className="visually-hidden">SocialBureau, Kerala's first API-driven digital and performance marketing agency, helps niche brands scale smarter with data, automation, and precision</p>
            {images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`SocialBureau Digital Marketing Strategy Slide ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover object-center md:object-top transition-opacity duration-1000 ${active === index ? "opacity-100" : "opacity-0"
                        }`}
                />
            ))}
            {/* Smooth Scroll Indicator Dots */}
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActive(index)}
                        className={`h-1.5 md:h-2 rounded-full transition-all duration-300 cursor-pointer ${active === index
                            ? "bg-white w-6 md:w-8"
                            : "bg-white/50 w-1.5 md:w-2 hover:bg-white/70"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}