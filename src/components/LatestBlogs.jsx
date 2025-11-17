import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { blogAPI } from "../../services/blogServices";

export default function LatestBlogs({ posts }) {
  // Fetch latest blogs from backend
  const { data: backendData, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogAPI.getBlogs({
      limit: 100,
      published: true,
    }),
  });

  const backendPosts = backendData?.data || [];
  
  // Combine backend posts with static posts
  const allPosts = [...backendPosts, ...posts];
  
  // Sort by date and get latest 3
  const latestPosts = allPosts
    .slice()
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(a.time);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(b.time);
      return dateB - dateA;
    })
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:mt-10 mt-20 bg-gradient-to-tl from-black via-black to-red-900 rounded-lg shadow-lg">
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
          <Link 
            key={post.id || post._id} 
            to={`/blogs/${post.slug.replace(/\s+/g, '-').replace(/%/g, '-')}`}
            className="relative group bg-black rounded-lg overflow-hidden shadow-md hover:shadow-red-600 transition cursor-pointer"
          >
            <img src={post.image} alt={post.title} className="w-full h-auto object-cover" />
            
            {/* Overlay with content - shown on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <span className="text-xs bg-red-700 px-2 py-1 rounded-full text-white w-fit mb-2">{post.category}</span>
              <h3 className="text-lg text-white font-semibold mb-2 leading-normal">{post.title}</h3>
              <p className="text-gray-300 text-sm line-clamp-3 mb-3">{post.excerpt}</p>
              <div className="flex justify-between items-center text-gray-400 text-xs">
                <span>{post.author || post.authorName}</span>
                <span>{post.time || new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
