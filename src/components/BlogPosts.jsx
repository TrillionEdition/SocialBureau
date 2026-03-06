import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { blogAPI } from "../../services/blogServices";

const categories = [
  "All Posts",
  "Marketing",
  "Creatives",
  "Case Studies",
  "Technology",
  "Advertisement",
];

export default function BlogPosts() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const postsPerPage = 6;

  // ✅ Calculate reading time (200 words/min)
  const calculateReadingTime = (post) => {
    let wordCount = 0;

    if (post.title) {
      wordCount += post.title.split(/\s+/).length;
    }

    if (post.excerpt) {
      wordCount += post.excerpt.split(/\s+/).length;
    }

    if (Array.isArray(post.content)) {
      post.content.forEach((section) => {
        if (section?.text) {
          wordCount += section.text.split(/\s+/).length;
        }
      });
    }

    return Math.max(1, Math.ceil(wordCount / 200));
  };

  // ✅ Fetch blogs with proper query key and data extraction
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs", selectedCategory],
    queryFn: async () => {
      const response = await blogAPI.getBlogs({
        category:
          selectedCategory !== "All Posts" ? selectedCategory : undefined,
        limit: 100,
        published: true,
      });
      return response;
    },
    keepPreviousData: true,
  });

  // ✅ FIXED: Correct data extraction from API response
  // blogAPI.getBlogs returns: { success: true, data: blogs }
  const backendPosts = data?.data || [];

  // ✅ Category filtering (case-insensitive)
  const filteredPosts =
    selectedCategory === "All Posts"
      ? backendPosts
      : backendPosts.filter(
        (post) =>
          post.category &&
          post.category.toLowerCase() ===
          selectedCategory.toLowerCase()
      );

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = currentPage * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage((p) => p + 1);
  };

  // ✅ Error handling
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 bg-black">
        <div className="col-span-full text-center text-red-400 py-10">
          Error loading blogs: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-black">
      {/* Categories */}
      <div className="flex flex-wrap gap-3 mb-10 lg:px-20">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(0);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedCategory === category
                ? "bg-[#ff0000] text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          <div className="col-span-full text-center text-white py-8">
            Loading blogs...
          </div>
        ) : paginatedPosts.length === 0 ? (
          <div className="col-span-full text-center text-white py-10">
            No blogs found
          </div>
        ) : (
          paginatedPosts.map((post) => (
            <div onClick={() => navigate(`/blogs/${post.slug}`)}
              key={post._id}
              className="rounded-lg border border-none shadow-sm overflow-hidden flex flex-col hover:border-[#ff0000] hover:scale-105 transition"
            >
              {/* Blog Image */}
              <img
                src={post.image || "/placeholder.jpg"}
                alt={post.title}
                className="w-full h-48 object-cover"
              />

              {/* Blog Content */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Category & Date */}
                <div className="flex justify-between mb-2">
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-800">
                    {post.category || "General"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString()
                      : ""}
                  </span>
                </div>

                {/* Reading Time */}
                <div className="text-xs text-gray-500 mb-2">
                  {calculateReadingTime(post)} min read
                </div>

                {/* Title */}
                <h3 className="text-lg text-white font-semibold mb-2 line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-400 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Author & Read More */}
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-400">
                    {post.authorName || "Unknown"}
                  </span>
                  <button
                    onClick={() => navigate(`/blogs/${post.slug}`)}
                    className="text-sm text-[#ff0000] font-medium hover:text-red-600 transition"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50 hover:bg-[#ff0000] transition"
          >
            ←
          </button>
          <span className="text-white text-sm">
            {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50 hover:bg-[#ff0000] transition"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
