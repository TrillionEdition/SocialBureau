import React, { useEffect, useState } from "react";

const works = [
  {
    type: "carousel",
    media: [
      { type: "image", src: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg" },
      { type: "image", src: "https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg" },
    ],
  },
  {
    type: "image",
    media: [
      { type: "image", src: "https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg" },
    ],
  },
  {
    type: "video",
    media: [
      { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  },
  {
    type: "image",
    media: [
      { type: "image", src: "/assets/service1.webp" },
    ],
  },
  {
    type: "carousel",
    media: [
      { type: "image", src: "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg" },
      { type: "image", src: "https://images.pexels.com/photos/207247/pexels-photo-207247.jpeg" },
      { type: "image", src: "https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg" },
    ],
  },
];

const ScrollingGallery = () => {
  const [columnCount, setColumnCount] = useState(5);
  const [currentWork, setCurrentWork] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoverIndexMap, setHoverIndexMap] = useState({});

  useEffect(() => {
    const updateColumnCount = () => {
      if (window.innerWidth < 768) {
        setColumnCount(3);
      } else {
        setColumnCount(5);
      }
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);

    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  const handleMouseEnter = (workIdx, mediaArray) => {
    if (mediaArray.length <= 1) return;
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % mediaArray.length;
      setHoverIndexMap((prev) => ({ ...prev, [workIdx]: i }));
    }, 1000);

    setHoverIndexMap((prev) => ({ ...prev, [`interval-${workIdx}`]: interval }));
  };

  const handleMouseLeave = (workIdx) => {
    clearInterval(hoverIndexMap[`interval-${workIdx}`]);
    setHoverIndexMap((prev) => {
      const updated = { ...prev };
      delete updated[`interval-${workIdx}`];
      delete updated[workIdx];
      return updated;
    });
  };

  const columns = Array.from({ length: columnCount }, (_, i) =>
    works.filter((_, idx) => idx % columnCount === i)
  );

  return (
    <>
      <div className="flex w-full bg-black gap-2 px-2 pb-20">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex-1 flex flex-col gap-4">
            {col.map((work, localIdx) => {
              const globalIdx = colIdx + localIdx * columnCount; // compute global index
              const preview = work.media[0];

              return (
                <div key={globalIdx} className="w-full overflow-hidden rounded-md cursor-pointer">
                  {work.type === "carousel" ? (
                    (() => {
                      const currentHoverIndex = hoverIndexMap[globalIdx] ?? 0;
                      const mediaArray = work.media || [];
                      const imageObj = mediaArray.length > 0 ? mediaArray[currentHoverIndex % mediaArray.length] : null;
                      const imageSrc = imageObj?.src || "";

                      return (
                        <img
                          src={imageSrc}
                          alt=""
                          loading="lazy"
                          onClick={() => {
                            setCurrentWork(work);
                            setCurrentIndex(currentHoverIndex);
                          }}
                          onMouseEnter={() => handleMouseEnter(globalIdx, mediaArray)}
                          onMouseLeave={() => handleMouseLeave(globalIdx)}
                          className="w-full object-cover md:grayscale hover:grayscale-0 transition duration-500 hover:scale-105"
                        />
                      );
                    })()
                  ) : work.type === "video" ? (
                    <video
                      src={preview.src}
                      muted
                      autoPlay
                      loop
                      onClick={() => {
                        setCurrentWork(work);
                        setCurrentIndex(0);
                      }}
                      className="w-full object-cover rounded-md md:grayscale hover:grayscale-0 hover:scale-105"
                    />
                  ) : (
                    <img
                      src={preview.src}
                      alt=""
                      loading="lazy"
                      onClick={() => {
                        setCurrentWork(work);
                        setCurrentIndex(0);
                      }}
                      className="w-full object-cover md:grayscale hover:grayscale-0 transition duration-500 hover:scale-105"
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}

      </div>
      {currentWork && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">

          {currentWork.media[currentIndex].type === "image" ? (
            <img
              src={currentWork.media[currentIndex].src}
              alt="Full View"
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <video
              src={currentWork.media[currentIndex].src}
              controls
              autoPlay
              className="max-w-full max-h-full object-contain"
            />
          )}

          {currentWork.media.length > 1 && (
            <>
              <button name="prev"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev - 1 + currentWork.media.length) % currentWork.media.length);
                }}
                className="absolute left-4 text-white text-5xl font-bold px-2"
              >
                ‹
              </button>
              <button name="next"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev + 1) % currentWork.media.length);
                }}
                className="absolute right-4 text-white text-5xl font-bold px-2"
              >
                ›
              </button>
            </>
          )}

          <button
            onClick={() => {
              setCurrentWork(null);
              setCurrentIndex(0);
            }}
            className="absolute top-4 right-4 text-white text-3xl font-bold"
          >
            &times;
          </button>
        </div>
      )}

    </>
  );
};

export default ScrollingGallery;
