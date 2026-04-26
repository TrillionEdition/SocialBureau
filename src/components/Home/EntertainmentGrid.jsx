import React, { useRef, useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { getOptimizedCloudinaryUrl } from '@/utils/cloudinary';

const mainMovies = [
    { id: 1, title: "API Marketing", img: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1771850532/imwv5sirhwgvtehpgb6h_n33iwu.webp", tag: "Marketing", link: "https://www.youtube.com/watch?v=UU-AeatnaEI", desc: "API Marketing" },
    { id: 2, title: "A tender coconut seller", img: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772001865/image-gen_31_1_gv5vcz.webp", tag: "Action", link: "https://www.youtube.com/watch?v=3RevutiVTJQ", desc: "An undercover mission in the heart of Iran." },
    { id: 3, title: "The Web Developer Podcast", img: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772004906/SB-Thumbnail-Posdcast-Elizebath.png_pjczh2.webp", tag: "Sports", link: "https://www.youtube.com/watch?v=3hZzTfz8-pg", desc: "The race for the championship begins." },
    { id: 4, title: "Monarch", img: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1771850531/exdliecbfulmpx1hy0cq_rmur3m.webp", tag: "Thriller", link: "https://youtu.be/WJmPGUUxFn0?si=MCEpb6G8t7hEbmcs", desc: "A secret agent embarks on her most dangerous mission." },
    { id: 5, title: "Google marketing program", img: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1771850531/bkdgsyz8tdy9noommqpc_f9ukep.webp", tag: "Google", link: "https://www.youtube.com/watch?v=ahHkXt6zJyE", desc: "Google's exclusive marketing program for startups" },
    { id: 6, title: "API Marketing -2", img: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1771850266/Artboard_1_copy_1_lc0ooh.webp", tag: "Marketing", link: "https://www.youtube.com/watch?v=IJMfka_hH9c", desc: "API Marketing -2" },
];

const subItems = [
    { id: 1, title: "Every word I write carries a piece of my soul", category: "Content & Copy Writer", img: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1771999948/l_board_chucto.png", link: "https://www.youtube.com/watch?v=CxMI-N-jlRI" },
    { id: 2, title: "Meet Moly Babu A fruit seller", category: "Business stories", img: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772001865/image-gen_29_rhrnyw.webp", link: "https://www.youtube.com/watch?v=PaY-umlU02c" },
    { id: 3, title: "Graphic Designer", category: "testimonial", img: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1771999943/SB_Testimonail_Rimshad_izjl3h.jpg", link: "https://www.youtube.com/watch?v=eBJnlmTuuIk" },
    { id: 4, title: "Admin", category: "testimonial", img: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1771999944/SB_Testimonail_Hajira_hux0kl.jpg", link: "https://www.youtube.com/watch?v=9KBzUyHXiR4" },
    { id: 5, title: "api driven branding", category: "branding", img: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772004537/akva1gddzqgiezim3ldt_day0wt.webp", link: "https://www.youtube.com/watch?v=aQeBDn05gfg" },
    { id: 6, title: "Elizebath Thomas", category: "testimonial", img: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772004538/uccmevylptcnn6tbgezl_d5w8or.webp", link: "https://www.youtube.com/watch?v=gNebMaTqoQg" },
    { id: 7, title: "Crispy chips, consistent hard work. Meet Rasheed", category: "Business stories", img: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772001865/image-gen_27_mum1kc.webp", link: "https://www.youtube.com/watch?v=6som6dTIX0A" },
    { id: 8, title: "Every word I write carries a piece of my soul", category: "testimonial", img: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772004537/vnvbs7ynsgalcigxuwcn_chtuai.webp", link: "https://www.youtube.com/watch?v=D0G2NYgGpLY" },
    { id: 10, title: "What is Content and Copy Writing ", category: "potcast", img: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772004906/SB-Podcast-YouTube-Thumbanil-Anjay-b.png_umddoi.webp", link: "https://www.youtube.com/watch?v=e1eckOb9v38" },
    { id: 11, title: "API Marketing", category: "Marketing", img: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772007615/mqdefault_6s_vbtuv5.webp", link: "https://www.youtube.com/watch?v=UU-AeatnaEI&pp=0gcJCaIKAYcqIYzv" },
    { id: 12, title: "Using GitHub without understanding it?", img: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1771850266/Artboard_1_copy_2_vqh4f5.webp", tag: "Sports", link: "https://youtu.be/g2PxbqjgmXE?si=z0rdNT0_u9AkUYOu", desc: "The race for the championship begins." },
    { id: 13, title: "Sound branding", category: "branding", img: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1771850266/Artboard_1_copy_4_f5nb2k.webp", tag: "branding ", link: "https://www.youtube.com/watch?v=2RuLiO6eVb4", desc: "Ever wondered why some brands sound iconic" },
];

// Utility function to truncate text
const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

const MovieCard = ({ movie }) => (
    <a
        href={movie.link}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={0}
        onTouchStart={() => {}}
        className="flex-none w-[90vw] md:w-[70vw] relative aspect-[21/9] rounded-xl overflow-hidden shadow-lg cursor-pointer group outline-none focus-within:ring-2 focus-within:ring-[#920F17]"
    >
        <img
            src={getOptimizedCloudinaryUrl(movie.img, 1200)}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            alt={`${movie.title} - ${movie.tag} Video Thumbnail`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 md:p-8 text-white md:opacity-100 opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                <button
                    className="bg-white text-black px-4 md:px-6 py-2 rounded-full font-bold text-xs md:text-sm hover:bg-gray-200 transition-colors active:scale-95 w-fit"
                >
                    Stream now
                </button>
                <p className="text-xs md:text-sm font-medium line-clamp-2">
                    <span className="font-bold">{movie.tag}</span> • {truncateText(movie.desc, 50)}
                </p>
            </div>
        </div>
        {/* Play Button Overlay - Mobile Only */}
        <div className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none group-hover:opacity-0 group-active:opacity-0 group-focus-within:opacity-0 transition-opacity duration-300">
            <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="w-6 h-6 text-white fill-white" />
            </div>
        </div>
    </a>
);

const SubItemCard = ({ item }) => (
    <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={0}
        onTouchStart={() => {}}
        className="flex-none w-[140px] md:w-[280px] aspect-video relative rounded-lg overflow-hidden group bg-gray-100 cursor-pointer outline-none focus-within:ring-2 focus-within:ring-[#920F17]"
    >
        <img
            src={getOptimizedCloudinaryUrl(item.img, 600)}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt={`${item.title} - ${item.category || ''} Thumbnail`}
        />
        <div className="absolute inset-0 p-2 md:p-4 flex flex-col justify-end bg-black/20 text-white md:opacity-100 opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus-within:opacity-100 group-hover:bg-black/40 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-2">
                <p className="text-[10px] md:text-xs font-semibold opacity-80 line-clamp-1">
                    {truncateText(item.category, 20)}
                </p>
                {item.link && (
                    <button
                        className="bg-white/90 text-black px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold hover:bg-white transition-colors active:scale-95 w-fit"
                    >
                        Play now
                    </button>
                )}
            </div>
        </div>
        {/* Play Button Overlay - Mobile Only */}
        <div className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none group-hover:opacity-0 group-active:opacity-0 group-focus-within:opacity-0 transition-opacity duration-300">
            <div className="w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 text-white fill-white" />
            </div>
        </div>
    </a>
);

const AppleSection = () => {
    const mainScrollRef = useRef(null);
    const subScrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const autoRotateTimerRef = useRef(null);
    const isAutoScrollRef = useRef(true);

    useEffect(() => {
        const startAutoRotate = () => {
            autoRotateTimerRef.current = setInterval(() => {
                if (isAutoScrollRef.current) {
                    setActiveIndex((prevIndex) => {
                        const nextIndex = (prevIndex + 1) % mainMovies.length;
                        scrollToIndex(nextIndex);
                        return nextIndex;
                    });
                }
            }, 4000);
        };

        startAutoRotate();

        return () => {
            if (autoRotateTimerRef.current) {
                clearInterval(autoRotateTimerRef.current);
            }
        };
    }, []);

    const scrollToIndex = (index) => {
        if (mainScrollRef.current && subScrollRef.current) {
            const mainCardWidth = mainScrollRef.current.offsetWidth * 0.85;
            const mainGap = 12;
            const mainScrollLeft = index * (mainCardWidth + mainGap);

            mainScrollRef.current.scrollTo({
                left: mainScrollLeft,
                behavior: 'smooth'
            });

            const subCardWidth = subScrollRef.current.offsetWidth / 3;
            const subGap = 8;
            const subScrollLeft = index * (subCardWidth + subGap);

            subScrollRef.current.scrollTo({
                left: subScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    const handleDotClick = (index) => {
        setActiveIndex(index);
        isAutoScrollRef.current = false;
        scrollToIndex(index);

        if (autoRotateTimerRef.current) {
            clearInterval(autoRotateTimerRef.current);
        }

        setTimeout(() => {
            isAutoScrollRef.current = true;
        }, 6000);

        autoRotateTimerRef.current = setInterval(() => {
            setActiveIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % mainMovies.length;
                scrollToIndex(nextIndex);
                return nextIndex;
            });
        }, 4000);
    };

    const hideScrollbarClass = "[ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

    return (
        <div className="bg-white py-12 md:py-20 overflow-hidden">
            <div className="text-center mb-10 md:mb-16 px-4 max-w-[1250px] mx-auto">
                <span className="block text-[12px] md:text-[13px] text-[#920F17] font-bold tracking-[0.2em] uppercase mb-4 opacity-90">
                    Behind the Scenes
                </span>
                <h2 className="text-[32px] sm:text-[40px] md:text-[56px] lg:text-[64px] font-bold tracking-tight leading-[1.1] mb-6 text-[#1d1d1f]">
                    Endless Entertainment
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-[16px] md:text-[19px] font-light leading-relaxed">
                    Explore our curated collection of business stories, creator journeys, and visual narratives. 
                </p>
            </div>

            <div
                ref={mainScrollRef}
                className={`flex gap-3 md:gap-4 px-[2.5%] md:px-[15%] overflow-x-auto scroll-smooth ${hideScrollbarClass}`}
            >
                {mainMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            <div
                ref={subScrollRef}
                className={`mt-6 md:mt-8 flex gap-2 md:gap-3 px-[2.5%] overflow-x-auto scroll-smooth ${hideScrollbarClass}`}
            >
                {subItems.map((item) => (
                    <SubItemCard key={item.id} item={item} />
                ))}
            </div>

            <div className="flex justify-center items-center gap-2 md:gap-3 mt-8 md:mt-10">
                {mainMovies.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className="h-4 w-10 md:w-12 flex items-center justify-center cursor-pointer group outline-none"
                        aria-label={`Go to section ${index + 1}`}
                    >
                        <div
                            className="h-1.5 md:h-2 rounded-full bg-gray-900 transition-all duration-500 ease-in-out"
                            style={{
                                width: "8px",
                                transform: activeIndex === index ? "scaleX(5.0)" : "scaleX(1.0)",
                                opacity: activeIndex === index ? 1 : 0.2,
                                willChange: "transform, opacity"
                            }}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AppleSection;


