import React, { useEffect, useRef, useState } from 'react'
import { BASE_URL } from '../../utils/urls';
import { useQuery } from '@tanstack/react-query';
import { googlereviewAPI } from '../../services/reviewServices';

export const Googlereview = () => {
const { data, isLoading, isFetching } = useQuery({
  queryFn: () => googlereviewAPI(),
  staleTime: Infinity,
  cacheTime: 1000 * 60 * 60,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
});

// keep hooks in stable order: declare refs/hooks before any early returns
const scrollRef = useRef(null);

if (isLoading) return <div className="text-sm text-gray-400">Loading reviews…</div>;

const reviews = data?.data?.reviews || [];
console.log(reviews);

  const scroll = (direction) => {
    const scrollAmount = 320; // each card width + gap
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
  <div className="relative w-[95vw] md:w-full mb-5 max-w-6xl mx-auto flex justify-center">
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}`}</style>
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full z-10"
      >
        <i className="fas fa-chevron-left text-white"></i>
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full z-10"
      >
        <i className="fas fa-chevron-right text-white"></i>
      </button>

      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-10 py-4"
      >
        {reviews.length === 0 && (
          <div className="text-sm text-gray-400">No public Google reviews found.</div>
        )}

        {reviews?.map((r, idx) => (
          <div
            key={idx}
            className="bg-[#111] text-white rounded-2xl p-5 min-w-[300px] max-w-[300px] shadow-lg relative flex-shrink-0"
          >
            {/* Review Stars */}
            <div className="flex mb-3">
              {Array.from({ length: r.rating }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">★</span>
              ))}
            </div>

            {/* Review Text */}
            <p className="text-gray-200 text-sm leading-relaxed line-clamp-3">
              {r.text}
            </p>

            {/* Read more */}
            {r.text?.length > 100 && (
              <span className="text-red-400 text-sm mt-1 inline-block cursor-pointer">
                Read more
              </span>
            )}

            {/* Speech Bubble Tail */}
            <div className="absolute left-10 -bottom-3 w-6 h-6 bg-[#111] rotate-45"></div>

            {/* Reviewer Info */}
            <div className="flex items-center gap-3 mt-6">
              <img
                src={r.profile_photo_url || '/default-avatar.png'}
                alt={r.author_name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-sm">{r.author_name || 'Anonymous'}</span>
                  <i className="fas fa-check-circle text-blue-400"></i>
                </div>
                <div className="text-xs text-gray-400">
                  {r.relative_time_description} on{' '}
                  <span className="text-blue-400">Google</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}