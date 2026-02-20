import { useEffect, useState } from "react";

export default function ImageCarousel() {
    const images = [
        "/assets/yard.png",
        "/assets/home/Hero1.png",
        "/assets/home/businessperformance.png",
    ];

    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="relative w-full h-screen overflow-hidden">
            {images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${active === index ? "opacity-100" : "opacity-0"
                        }`}
                />
            ))}
        </section>
    );
}
