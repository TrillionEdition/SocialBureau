import React from "react";
import ReactMarkdown from "react-markdown";

export default function LatestBlogs({ posts }) {
  // Assuming 'time' is parseable date string for sort; else sort by post.id or another field
  const latestPosts = posts
    .slice() // copy to avoid mutating original
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 md:mt-10 mt-20 bg-gradient-to-tl from-black via-black to-red-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6 border-b border-red-600 pb-2">
  <h2 className="text-2xl font-bold text-white">
    Latest Blogs
  </h2>
  <a className="text-md text-[#ff0000] font-semibold " href="/blog">
    View More {' '}<i className="fas fa-arrow-right mr-2 pl-1"></i>
  </a>
</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {latestPosts.map((post) => (
          <div key={post.id} className="bg-black rounded-lg overflow-hidden shadow-md hover:shadow-red-600 transition">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <span className="text-xs bg-red-700 px-2 py-1 rounded-full text-white">{post.category}</span>
              <h3 className="text-lg text-white font-semibold mt-2 mb-2 leading-normal">{post.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-3 ">{post.excerpt}</p>
              {/* Optional: include author and time */}
              <div className="mt-3 flex justify-between items-center text-gray-500 text-xs">
                <span>{post.author}</span>
                <span>{post.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
