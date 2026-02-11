// import React, { useRef, useState } from 'react';

// const mainMovies = [
//     { id: 1, title: "Monarch", img: "https://media.istockphoto.com/id/469354854/photo/field-hockey-background.jpg?s=612x612&w=0&k=20&c=84KXqYXTBEmjsjAk7TVaS7j-UOd2dknszbxjaVb_po8=", tag: "Thriller", Link: "https://youtu.be/jYagb6tek1A?si=PxTBTKFWZaYodbVH", desc: "A secret agent embarks on her most dangerous mission." },
//     { id: 2, title: "Tehran", img: "https://media.istockphoto.com/id/469354854/photo/field-hockey-background.jpg?s=612x612&w=0&k=20&c=84KXqYXTBEmjsjAk7TVaS7j-UOd2dknszbxjaVb_po8=", tag: "Action", Link: "https://youtu.be/-YfO4f2skWo?si=2e7BOLRuwTBR3S29", desc: "An undercover mission in the heart of Iran." },
//     { id: 3, title: "F1", img: "https://media.istockphoto.com/id/469354854/photo/field-hockey-background.jpg?s=612x612&w=0&k=20&c=84KXqYXTBEmjsjAk7TVaS7j-UOd2dknszbxjaVb_po8=", tag: "Sports", Link: "https://youtu.be/g2PxbqjgmXE?si=z0rdNT0_u9AkUYOu", desc: "The race for the championship begins." },
//     { id: 4, title: "Monarch", img: "https://media.istockphoto.com/id/469354854/photo/field-hockey-background.jpg?s=612x612&w=0&k=20&c=84KXqYXTBEmjsjAk7TVaS7j-UOd2dknszbxjaVb_po8=", tag: "Thriller", Link: "https://youtu.be/WJmPGUUxFn0?si=MCEpb6G8t7hEbmcs", desc: "A secret agent embarks on her most dangerous mission." },
//     { id: 5, title: "Tehran", img: "https://media.istockphoto.com/id/469354854/photo/field-hockey-background.jpg?s=612x612&w=0&k=20&c=84KXqYXTBEmjsjAk7TVaS7j-UOd2dknszbxjaVb_po8=", tag: "Action", Link: "https://youtu.be/WJmPGUUxFn0?si=nDIl2XSmRQ1rOhfI", desc: "An undercover mission in the heart of Iran." },
//     { id: 6, title: "F1", img: "https://media.istockphoto.com/id/469354854/photo/field-hockey-background.jpg?s=612x612&w=0&k=20&c=84KXqYXTBEmjsjAk7TVaS7j-UOd2dknszbxjaVb_po8=", tag: "Sports", Link: "https://youtu.be/WJmPGUUxFn0?si=nDIl2XSmRQ1rOhfI", desc: "The race for the championship begins." },
//     // { id: 7, title: "Monarch", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1200", tag: "Thriller", desc: "A secret agent embarks on her most dangerous mission." },
//     // { id: 8, title: "Tehran", img: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1200", tag: "Action", desc: "An undercover mission in the heart of Iran." },
//     // { id: 9, title: "F1", img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1200", tag: "Sports", desc: "The race for the championship begins." },

// ];

// const subItems = [
//     { id: 1, title: "Sabrina Carpenter", category: "Music", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400",Link:"https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
//     { id: 2, title: "Hello Kitty", category: "Arcade", img: "https://images.unsplash.com/photo-1512412023212-f09450a80bc8?w=400",Link:"https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
//     { id: 3, title: "Bad Bunny", category: "Fitness+", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",Link:"https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
//     { id: 4, title: "A-List Pop", category: "Music", img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400",Link:"https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
//     { id: 5, title: "Sabrina Carpenter", category: "Music", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400",Link:"https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
//     { id: 6, title: "Hello Kitty", category: "Arcade", img: "https://images.unsplash.com/photo-1512412023212-f09450a80bc8?w=400",Link:"https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
//     { id: 7, title: "Bad Bunny", category: "Fitness+", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",Link:"https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
//     { id: 8, title: "A-List Pop", category: "Music", img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400",Link:"https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
//     { id: 9, title: "Sabrina Carpenter", category: "Music", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400",Link:"https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
//     { id: 10, title: "Hello Kitty", category: "Arcade", img: "https://images.unsplash.com/photo-1512412023212-f09450a80bc8?w=400",Link:"https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" }, 
//     { id: 11, title: "Bad Bunny", category: "Fitness+", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",Link:"https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
//     { id: 12, title: "A-List Pop", category: "Music", img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400",Link:"https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
//     { id: 13, title: "Sabrina Carpenter", category: "Music", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400",Link:"https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
//     { id: 14, title: "Hello Kitty", category: "Arcade", img: "https://images.unsplash.com/photo-1512412023212-f09450a80bc8?w=400",Link:"https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
//     { id: 15, title: "Bad Bunny", category: "Fitness+", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",Link:"https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
// ];

// const AppleSection = () => {
//     const mainScrollRef = useRef(null);
//     const subScrollRef = useRef(null);
//     const [activeIndex, setActiveIndex] = useState(0);

//     const handleScroll = (index) => {
//         setActiveIndex(index);

//         if (mainScrollRef.current && subScrollRef.current) {
//             // Calculate scroll position for main cards
//             const mainScrollWidth = mainScrollRef.current.scrollWidth / mainMovies.length;

//             mainScrollRef.current.scrollTo({
//                 left: index * mainScrollWidth,
//                 behavior: 'smooth'
//             });

//             // Calculate scroll position for sub items (moving them roughly twice as fast)
//             const subScrollWidth = subScrollRef.current.scrollWidth / mainMovies.length;

//             subScrollRef.current.scrollTo({
//                 left: index * subScrollWidth,
//                 behavior: 'smooth'
//             });
//         }
//     };

//     // Inline Tailwind class for hiding scrollbars
//     const hideScrollbarClass = "[ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

//     return (
//         <div className="bg-white py-12 overflow-hidden select-none">
//             <h2 className="text-4xl font-bold text-center mb-10">Endless entertainment.</h2>

//             {/* Main Large Carousel */}
//             <div
//                 ref={mainScrollRef}
//                 className={`flex gap-4 px-[5%] md:px-[15%] overflow-x-auto snap-x snap-mandatory scroll-smooth ${hideScrollbarClass}`}
//             >
//                 {mainMovies.map((movie) => (
//                     <div key={movie.id} className="flex-none w-[85vw] md:w-[70vw] snap-center relative aspect-[21/9] rounded-xl overflow-hidden shadow-lg">
//                         <img src={movie.img} className="absolute inset-0 w-full h-full object-cover" alt={movie.title} />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
//                             <div className="flex items-center gap-3">
//                                 <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors">Stream now</button>
//                                 <p className="text-sm font-medium"><span className="font-bold">{movie.tag}</span> • {movie.desc}</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Small Bottom Row */}
//             <div
//                 ref={subScrollRef}
//                 className={`mt-8 flex gap-3 px-[5%] overflow-x-auto scroll-smooth ${hideScrollbarClass}`}
//             >
//                 {subItems.map((item) => (
//                     <div key={item.id} className="flex-none w-[280px] aspect-video relative rounded-lg overflow-hidden group bg-gray-100">
//                         <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
//                         <div className="absolute inset-0 p-4 flex flex-col justify-end bg-black/20 text-white group-hover:bg-black/40 transition-all">
//                             <div className="flex justify-between items-center">
//                                 <p className="text-xs font-semibold opacity-80">{item.category}</p>
//                                 <button className="bg-white/90 text-black px-3 py-1 rounded-full text-[10px] font-bold">Play now</button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Navigation Dots */}
//             <div className="flex justify-center items-center gap-3 mt-10">
//                 {mainMovies.map((_, index) => (
//                     <button
//                         key={index}
//                         onClick={() => handleScroll(index)}
//                         className={`h-2 rounded-full transition-all duration-500 ease-in-out ${activeIndex === index ? "w-10 bg-gray-900" : "w-2 bg-gray-300 hover:bg-gray-400"
//                             }`}
//                         aria-label={`Go to section ${index + 1}`}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AppleSection;



import React, { useRef, useState, useEffect } from 'react';

const mainMovies = [
    { id: 1, title: "Monarch", img: "https://media.istockphoto.com/id/469354854/photo/field-hockey-background.jpg?s=612x612&w=0&k=20&c=84KXqYXTBEmjsjAk7TVaS7j-UOd2dknszbxjaVb_po8=", tag: "Thriller", link: "https://youtu.be/jYagb6tek1A?si=PxTBTKFWZaYodbVH", desc: "A secret agent embarks on her most dangerous mission." },
    { id: 2, title: "Tehran", img: "https://media.istockphoto.com/id/469354854/photo/field-hockey-background.jpg?s=612x612&w=0&k=20&c=84KXqYXTBEmjsjAk7TVaS7j-UOd2dknszbxjaVb_po8=", tag: "Action", link: "https://youtu.be/-YfO4f2skWo?si=2e7BOLRuwTBR3S29", desc: "An undercover mission in the heart of Iran." },
    { id: 3, title: "F1", img: "https://media.istockphoto.com/id/469354854/photo/field-hockey-background.jpg?s=612x612&w=0&k=20&c=84KXqYXTBEmjsjAk7TVaS7j-UOd2dknszbxjaVb_po8=", tag: "Sports", link: "https://youtu.be/g2PxbqjgmXE?si=z0rdNT0_u9AkUYOu", desc: "The race for the championship begins." },
    { id: 4, title: "Monarch", img: "https://media.istockphoto.com/id/469354854/photo/field-hockey-background.jpg?s=612x612&w=0&k=20&c=84KXqYXTBEmjsjAk7TVaS7j-UOd2dknszbxjaVb_po8=", tag: "Thriller", link: "https://youtu.be/WJmPGUUxFn0?si=MCEpb6G8t7hEbmcs", desc: "A secret agent embarks on her most dangerous mission." },
    { id: 5, title: "Tehran", img: "https://media.istockphoto.com/id/469354854/photo/field-hockey-background.jpg?s=612x612&w=0&k=20&c=84KXqYXTBEmjsjAk7TVaS7j-UOd2dknszbxjaVb_po8=", tag: "Action", link: "https://youtu.be/WJmPGUUxFn0?si=nDIl2XSmRQ1rOhfI", desc: "An undercover mission in the heart of Iran." },
    { id: 6, title: "F1", img: "https://media.istockphoto.com/id/469354854/photo/field-hockey-background.jpg?s=612x612&w=0&k=20&c=84KXqYXTBEmjsjAk7TVaS7j-UOd2dknszbxjaVb_po8=", tag: "Sports", link: "https://youtu.be/WJmPGUUxFn0?si=nDIl2XSmRQ1rOhfI", desc: "The race for the championship begins." },
];

const subItems = [
    { id: 1, title: "Sabrina Carpenter", category: "Music", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400", link: "https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
    { id: 2, title: "Hello Kitty", category: "Arcade", img: "https://images.unsplash.com/photo-1512412023212-f09450a80bc8?w=400", link: "https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
    { id: 3, title: "Bad Bunny", category: "Fitness+", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400", link: "https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
    { id: 4, title: "A-List Pop", category: "Music", img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400", link: "https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
    { id: 5, title: "Sabrina Carpenter", category: "Music", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400", link: "https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
    { id: 6, title: "Hello Kitty", category: "Arcade", img: "https://images.unsplash.com/photo-1512412023212-f09450a80bc8?w=400", link: "https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
    { id: 7, title: "Bad Bunny", category: "Fitness+", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400", link: "https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
    { id: 8, title: "A-List Pop", category: "Music", img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400", link: "https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
    { id: 9, title: "Sabrina Carpenter", category: "Music", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400", link: "https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
    { id: 10, title: "Hello Kitty", category: "Arcade", img: "https://images.unsplash.com/photo-1512412023212-f09450a80bc8?w=400", link: "https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
    { id: 11, title: "Bad Bunny", category: "Fitness+", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400", link: "https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
    { id: 12, title: "A-List Pop", category: "Music", img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400", link: "https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
    { id: 13, title: "Sabrina Carpenter", category: "Music", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400", link: "https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
    { id: 14, title: "Hello Kitty", category: "Arcade", img: "https://images.unsplash.com/photo-1512412023212-f09450a80bc8?w=400", link: "https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
    { id: 15, title: "Bad Bunny", category: "Fitness+", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400", link: "https://youtu.be/pxYIOAruV4Q?si=rM3BY6z7qiNBwsI9" },
];

const AppleSection = () => {
    const mainScrollRef = useRef(null);
    const subScrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const autoRotateTimerRef = useRef(null);

    // Auto-rotate carousel every 4 seconds
    useEffect(() => {
        const startAutoRotate = () => {
            autoRotateTimerRef.current = setInterval(() => {
                setActiveIndex((prevIndex) => {
                    const nextIndex = (prevIndex + 1) % mainMovies.length;
                    scrollToIndex(nextIndex);
                    return nextIndex;
                });
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
            // Calculate scroll position for main cards
            const mainScrollWidth = mainScrollRef.current.scrollWidth / mainMovies.length;

            mainScrollRef.current.scrollTo({
                left: index * mainScrollWidth,
                behavior: 'smooth'
            });

            // Calculate scroll position for sub items
            const subScrollWidth = subScrollRef.current.scrollWidth / mainMovies.length;

            subScrollRef.current.scrollTo({
                left: index * subScrollWidth,
                behavior: 'smooth'
            });
        }
    };

    const handleScroll = (index) => {
        setActiveIndex(index);
        scrollToIndex(index);

        // Reset auto-rotate timer when user manually clicks
        if (autoRotateTimerRef.current) {
            clearInterval(autoRotateTimerRef.current);
        }

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
        <div className="bg-white py-12 overflow-hidden select-none">
            <h2 className="text-4xl font-bold text-center mb-10">Endless entertainment.</h2>

            {/* Main Large Carousel */}
            <div
                ref={mainScrollRef}
                className={`flex gap-4 px-[5%] md:px-[15%] overflow-x-auto snap-x snap-mandatory scroll-smooth ${hideScrollbarClass}`}
            >
                {mainMovies.map((movie) => (
                    <a
                        key={movie.id}
                        href={movie.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-none w-[85vw] md:w-[70vw] snap-center relative aspect-[21/9] rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                    >
                        <img src={movie.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={movie.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open(movie.link, '_blank');
                                    }}
                                    className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors active:scale-95"
                                >
                                    Stream now
                                </button>
                                <p className="text-sm font-medium"><span className="font-bold">{movie.tag}</span> • {movie.desc}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* Small Bottom Row */}
            <div
                ref={subScrollRef}
                className={`mt-8 flex gap-3 px-[5%] overflow-x-auto scroll-smooth ${hideScrollbarClass}`}
            >
                {subItems.map((item) => (
                    <a
                        key={item.id}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-none w-[280px] aspect-video relative rounded-lg overflow-hidden group bg-gray-100 cursor-pointer"
                    >
                        <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
                        <div className="absolute inset-0 p-4 flex flex-col justify-end bg-black/20 text-white group-hover:bg-black/40 transition-all">
                            <div className="flex justify-between items-center">
                                <p className="text-xs font-semibold opacity-80">{item.category}</p>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open(item.link, '_blank');
                                    }}
                                    className="bg-white/90 text-black px-3 py-1 rounded-full text-[10px] font-bold hover:bg-white transition-colors active:scale-95"
                                >
                                    Play now
                                </button>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center items-center gap-3 mt-10">
                {mainMovies.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleScroll(index)}
                        className={`h-2 rounded-full transition-all duration-500 ease-in-out cursor-pointer hover:scale-110 ${activeIndex === index ? "w-10 bg-gray-900" : "w-2 bg-gray-300 hover:bg-gray-400"
                            }`}
                        aria-label={`Go to section ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default AppleSection;