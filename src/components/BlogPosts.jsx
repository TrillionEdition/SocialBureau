import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { blogAPI } from "@/services/blogServices";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const BlogSkeleton = () => (
  <div className="animate-pulse bg-gray-50 border border-gray-100 rounded-[40px] overflow-hidden h-[500px] flex flex-col p-8 space-y-6">
    <div className="bg-gray-200 h-64 w-full rounded-[30px]" />
    <div className="h-4 bg-gray-200 rounded w-1/4" />
    <div className="h-10 bg-gray-200 rounded w-3/4" />
    <div className="h-16 bg-gray-200 rounded w-full" />
  </div>
);

const EMPTY_POSTS = [];

export default function BlogPosts() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(location.state?.fromCategory || "All Posts");
  const [currentPage, setCurrentPage] = useState(location.state?.fromPage || 0);

  const postsPerPage = 6;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await blogAPI.getBlogs({
        limit: 100,
        published: true,
      });
      return response;
    },
    staleTime: 300000,
  });

  const backendPosts = data?.data ?? EMPTY_POSTS;
  const { categories, paginatedPosts, totalPages } = useMemo(() => {
    const filtered = selectedCategory === "All Posts"
      ? backendPosts
      : backendPosts.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());

    const categories = [
      "All Posts",
      ...new Set(backendPosts.map(post => post.category?.trim()).filter(Boolean)),
    ];

    const start = currentPage * postsPerPage;
    return {
      categories,
      paginatedPosts: filtered.slice(start, start + postsPerPage).map(post => {
        const content = Array.isArray(post.content)
          ? post.content.map(section => typeof section === "string" ? section : section?.text || "").join(" ")
          : "";
        const contentText = content.replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").trim();
        const wordCount = contentText ? contentText.split(/\s+/).filter(Boolean).length : 0;

        return { ...post, readTime: wordCount ? Math.max(1, Math.ceil(wordCount / 200)) : null };
      }),
      totalPages: Math.ceil(filtered.length / postsPerPage)
    };
  }, [backendPosts, selectedCategory, currentPage]);

  return (
    <div className="bg-white min-h-screen transition-colors duration-1000">
      <div className="max-w-[1400px] mx-auto px-6 py-24">
        
        {/* Category Filter - Ultra Minimalist */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 mb-24">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setCurrentPage(0); }}
              aria-pressed={selectedCategory === cat}
              className={`text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-500 relative py-2 ${
                selectedCategory === cat
                  ? "text-[#1a1a1a]"
                  : "text-gray-300 hover:text-gray-500"
              }`}
            >
              {cat}
              {selectedCategory === cat && (
                <motion.div 
                  layoutId="underline" 
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff0000]" 
                />
              )}
            </button>
          ))}
        </div>

        {/* Post Grid - Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {isLoading ? (
            [...Array(6)].map((_, i) => <BlogSkeleton key={i} />)
          ) : isError ? (
            <p role="status" className="col-span-full py-16 text-center text-gray-600">
              Blog posts could not be loaded. Please try again later.
            </p>
          ) : paginatedPosts.length === 0 ? (
            <div className="col-span-full py-16 text-center">
              <p className="text-gray-600">
                {backendPosts.length
                  ? "There are no published posts in this category yet."
                  : "There are no published blog posts available right now."}
              </p>
              {selectedCategory !== "All Posts" && (
                <button
                  type="button"
                  onClick={() => { setSelectedCategory("All Posts"); setCurrentPage(0); }}
                  className="mt-4 text-sm font-semibold text-[#ff0000] hover:underline"
                >
                  Browse all posts
                </button>
              )}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {paginatedPosts.map((post, idx) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  key={post._id}
                  className="group flex flex-col bg-white rounded-[40px] overflow-hidden"
                >
                  <Link
                    to={`/blogs/${post.slug}`}
                    state={{ fromPage: currentPage, fromCategory: selectedCategory }}
                    className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff0000]"
                  >
                    <div className="relative overflow-hidden aspect-[4/3] rounded-[40px]">
                      {post.image && (
                        <img
                          src={post.image}
                          alt={post.title || ""}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.2s] ease-out"
                        />
                      )}
                      <div className="absolute top-8 left-8">
                        <span className="bg-[#ff0000] text-white text-[9px] font-black tracking-[0.3em] px-4 py-2 rounded-full uppercase">
                          {post.category || "General"}
                        </span>
                      </div>
                    </div>

                    <div className="pt-10 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 mb-6">
                        {post.createdAt && !Number.isNaN(new Date(post.createdAt).getTime()) && (
                          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                            {new Date(post.createdAt).toLocaleDateString([], { month: "long", year: "numeric" })}
                          </span>
                        )}
                        {post.readTime && (
                          <>
                            <div className="w-1 h-1 bg-gray-200 rounded-full" />
                            <span className="text-[10px] font-bold text-[#ff0000] uppercase tracking-widest">
                              {post.readTime} MIN READ
                            </span>
                          </>
                        )}
                      </div>

                      <h3 style={{ fontFamily: "Playfair Display, serif" }} className="text-3xl text-[#1a1a1a] font-black mb-6 leading-[1.2] group-hover:text-[#ff0000] transition-colors duration-500">
                        {post.title}
                      </h3>

                      {post.excerpt && (
                        <p className="text-gray-400 text-[15px] font-medium leading-relaxed line-clamp-3 mb-10">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="mt-auto pt-8 border-t border-gray-100 flex justify-end items-center">
                        <div className="flex items-center gap-2 text-[#ff0000] text-[11px] font-black uppercase tracking-[0.3em] group-hover:gap-4 transition-all duration-500">
                          <span>Read Article</span>
                          <span className="text-xl leading-none">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Minimalist Tech Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-10 mt-32">
            <button
              onClick={() => { if (currentPage > 0) { setCurrentPage(prev => prev - 1); window.scrollTo({ top: 800, behavior: 'smooth' }); } }}
              disabled={currentPage === 0}
              className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center gap-4 ${currentPage === 0 ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-[#ff0000]'}`}
            >
              <span>← Prev</span>
            </button>
            <div className="flex gap-4">
               {[...Array(totalPages)].map((_, i) => (
                 <div key={i} className={`h-[3px] transition-all duration-[800ms] rounded-full ${currentPage === i ? 'w-16 bg-[#ff0000]' : 'w-4 bg-gray-100'}`} />
               ))}
            </div>
            <button
              onClick={() => { if (currentPage < totalPages - 1) { setCurrentPage(prev => prev + 1); window.scrollTo({ top: 800, behavior: 'smooth' }); } }}
              disabled={currentPage === totalPages - 1}
              className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center gap-4 ${currentPage === totalPages - 1 ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-[#ff0000]'}`}
            >
               <span>Next →</span>
            </button>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,900;1,400;1,900&display=swap');
      `}} />
    </div>
  );
}

