import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import posts from "../data/blogs";
// Categories
const categories = [
  "All Posts",
  "Marketing",
  "Creatives",
  "Case Studies",
  "Technology",
  "Advertisement",
];
function addNewlinesBeforeHeadings(content) {
  // Use regex to add two newlines before each line that starts with "**" (heading)
  return content.replace(/(^|\n)(\*\*.+?\*\*)/g, '\n\n$2');
}



export default function BlogPosts() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [activePost, setActivePost] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const postsPerPage = 6;

  const filteredPosts =
    selectedCategory === "All Posts"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  // Pagination logic
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
      {/* If a post is selected, show detailed view */}
      {activePost ? (
        <div className="bg-gradient-to-br from-black to-[#3f0000] rounded-xl p-8 shadow-xl border border-[#3f0000]">
          <button name="posts"
            onClick={() => setActivePost(null)}
            className="flex items-center text-sm text-gray-400 hover:text-[#ff0000] transition-colors mb-6"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Posts
          </button>

          <div className="flex items-center mb-3 space-x-3 pt-10">
            <span className="text-xs font-medium bg-white text-[#ff0000] px-3 py-1 rounded-full">
              {activePost.category}
            </span>
            <span className="text-xs text-white">{activePost.time}</span>
          </div>
          <img src={activePost.image} alt={activePost.title} />
          <h2 className="text-3xl text-white font-semibold mb-4 pt-5">
            {activePost.title}
          </h2>

          <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed mb-6">
            {activePost.content.map((section, index) => (
              <div key={index}>
                <ReactMarkdown>{section}</ReactMarkdown>
                {index < activePost.content.length - 1 && (
                  <div className="mb-8"></div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#ffffffff] rounded-full flex items-center justify-center">
              <i className="fa fa-user " aria-hidden="true"></i>
            </div>
            <span className="text-sm text-gray-400">{activePost.author}</span>
          </div>
        </div>
      ) : (
        <>
          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-10 lg:px-20">
            {categories.map((category) => (
              <button name="categories"
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(0); // reset pagination on category change
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
            {paginatedPosts.map((post) => (
              <div
                key={post.id}
                className="rounded-lg border shadow-sm overflow-hidden flex flex-col hover:border-[#ff0000] hover:scale-105 transition"
              >
                <div className={`h-1 bg-[#ff0000]`}></div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center mb-2">
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full mr-2">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">{post.time}</span>
                  </div>
                  <img src={post.image} alt={post.title} />
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
                      <span className="text-xs text-gray-700">
                        {post.author}
                      </span>
                    </div>
                    <button name="read more"
                      onClick={() => setActivePost(post)}
                      className="text-sm text-[#ff0000] font-medium hover:scale-105"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Arrows */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button name="prev"
                onClick={handlePrev}
                disabled={currentPage === 0}
                className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50 hover:bg-[#ff0000] transition"
              >
                ←
              </button>
              <span className="text-white text-sm">
                {currentPage + 1} of {totalPages}
              </span>
              <button name="next"
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50 hover:bg-[#ff0000] transition"
              >
                →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
