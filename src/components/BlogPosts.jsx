import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { blogAPI } from "../../services/blogServices";
import posts from "../data/blogs";

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

  // Calculate reading time based on word count (average 200 words per minute)
  const calculateReadingTime = (post) => {
    let wordCount = 0;
    
    // Count words from title and excerpt
    wordCount += (post.title?.split(/\s+/).length || 0);
    wordCount += (post.excerpt?.split(/\s+/).length || 0);
    
    // Count words from content array (backend posts)
    if (post.content && Array.isArray(post.content)) {
      post.content.forEach(section => {
        wordCount += (section.text?.split(/\s+/).length || 0);
      });
    }
    
    // Count words from description (static posts)
    if (post.description) {
      wordCount += post.description.split(/\s+/).length;
    }
    console.log(wordCount);
    
    const minutes = Math.ceil(wordCount / 100);
    return minutes;
  };

  // Fetch blogs from backend
  const { data: backendData, isLoading } = useQuery({
    queryKey: ["blogs", selectedCategory],
    queryFn: () => blogAPI.getBlogs({
      category: selectedCategory !== "All Posts" ? selectedCategory : undefined,
      limit: 100,
      published: true,
    }),
  });

  // Combine static posts with backend posts
  const backendPosts = backendData?.data || [];
  const allPosts = [...backendPosts, ...posts];

  const filteredPosts =
    selectedCategory === "All Posts"
      ? allPosts
      : allPosts.filter((post) => post.category === selectedCategory);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = currentPage * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

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
            className={`px-4 py-2 rounded-full text-sm font-medium transition
              ${
                selectedCategory === category
                  ? "bg-[#ff0000] text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-full text-center text-white py-10">Loading blogs...</div>
        ) : paginatedPosts.length === 0 ? (
          <div className="col-span-full text-center text-white py-10">No blogs found</div>
        ) : (
          paginatedPosts.map((post) => (
            <div
              key={post.id || post._id}
              className="rounded-lg border shadow-sm overflow-hidden flex flex-col hover:border-[#ff0000] hover:scale-105 transition"
            >
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.time || new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded mb-2" />
                {post.createdAt && (
                  <div className="flex items-center gap-1 mb-2 text-xs text-gray-500">
                    <i className="far fa-clock"></i>
                    <span>{calculateReadingTime(post)} min read</span>
                  </div>
                )}
                <h3 className="text-lg text-white font-semibold mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 flex-1">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2 ">
                    <i
                      className="fa fa-user bg-white p-1 rounded-full"
                      aria-hidden="true"
                    ></i>
                    <span className="text-xs text-gray-700">{post.author || post.authorName}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/blogs/${post.slug}`)}
                    className="text-sm text-[#ff0000] font-medium hover:scale-105"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Arrows */}
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
