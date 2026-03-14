import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { blogAPI } from "../../services/blogServices";
import { useNavigate, useLocation } from "react-router-dom";

const categories = ["All Posts", "Marketing", "Creatives", "Case Studies", "Technology", "Advertisement"];

// Light Shimmer Loader
const BlogSkeleton = () => (
  <div className="animate-pulse bg-white border border-gray-100 rounded-2xl overflow-hidden h-[450px]">
    <div className="bg-gray-100 h-56 w-full" />
    <div className="p-6 space-y-4">
      <div className="h-3 bg-gray-100 rounded w-1/4" />
      <div className="h-8 bg-gray-100 rounded w-3/4" />
      <div className="h-4 bg-gray-100 rounded w-full" />
    </div>
  </div>
);

export default function BlogPosts() {
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.fromCategory || "All Posts"
  );

  const [currentPage, setCurrentPage] = useState(
    location.state?.fromPage || 0
  );

  const navigate = useNavigate();
  const postsPerPage = 6;

  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs", selectedCategory],
    queryFn: async () => {
      const response = await blogAPI.getBlogs({
        category: selectedCategory !== "All Posts" ? selectedCategory : undefined,
        limit: 100,
        published: true,
      });
      return response;
    },
    staleTime: 300000,
  });

  const backendPosts = data?.data || [];

  const { paginatedPosts, totalPages } = useMemo(() => {
    const filtered = selectedCategory === "All Posts"
      ? backendPosts
      : backendPosts.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());

    const calcTime = (post) => {
      const text = `${post.title} ${post.excerpt}`;
      return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
    };

    const start = currentPage * postsPerPage;
    return {
      paginatedPosts: filtered.slice(start, start + postsPerPage).map(p => ({ ...p, readTime: calcTime(p) })),
      totalPages: Math.ceil(filtered.length / postsPerPage)
    };
  }, [backendPosts, selectedCategory, currentPage]);

  return (
    <div className="bg-[#FCFCFC] min-h-screen">
      <div className="max-w-[95vw] 2xl:max-w-[1400px] mx-auto px-2 md:px-6 py-12">

        {/* Category Selection - Minimalist Pill style */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setCurrentPage(0); }}
              className={`px-6 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 border-b-2 ${selectedCategory === cat
                ? "border-[#ff0000] text-[#1a1a1a]"
                : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {isLoading ? (
            [...Array(6)].map((_, i) => <BlogSkeleton key={i} />)
          ) : (
            paginatedPosts.map((post) => (
              <article
                key={post._id}
                onClick={() =>
                  navigate(`/blogs/${post.slug}`, {
                    state: {
                      fromPage: currentPage,
                      fromCategory: selectedCategory
                    }
                  })
                }
                className="group bg-white border border-gray-100 hover:border-gray-300 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 flex flex-col rounded-2xl overflow-hidden"
              >
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={post.image || "/placeholder.jpg"}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black tracking-[0.2em] text-[#ff0000] uppercase">
                      {post.category || "General"}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium italic">
                      {post.readTime} min read
                    </span>
                  </div>

                  <h3 style={{ fontFamily: "Playfair Display, serif" }} className="text-2xl text-[#1a1a1a] font-bold mb-4 leading-snug group-hover:text-[#ff0000] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-3 mb-8">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                      {post.authorName || "SocialBureau"}
                    </span>
                    <span className="text-[#1a1a1a] text-xs font-bold uppercase tracking-widest group-hover:pr-2 transition-all">
                      Read Entry +
                    </span>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Minimalist Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-12 mt-24">
            <button
              onClick={() => {
                if (currentPage > 0) {
                  setCurrentPage(prev => prev - 1);
                  // This ensures the user sees the start of the new results
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }
              }}
              disabled={currentPage === 0}
              className="text-gray-400 uppercase tracking-widest hover:text-[#ff0000] transition-all cursor-pointer"
            >
              Back
            </button>

            <span className="w-[1px] h-8 bg-gray-200"></span>

            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              Page {currentPage + 1} / {totalPages}
            </span>

            <span className="w-[1px] h-8 bg-gray-200"></span>

            <button
              onClick={() => {
                if (currentPage < totalPages - 1) {
                  setCurrentPage(prev => prev + 1);
                  // Adjust the 'top' value to match where your blog grid starts
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }
              }}
              disabled={currentPage === totalPages - 1}
              className="text-gray-400 uppercase tracking-widest hover:text-[#ff0000] transition-all cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}