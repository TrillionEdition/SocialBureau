import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { blogAPI } from "../../services/blogServices";
import posts from "../data/blogs";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Seo from "./Seo";

export default function BlogDetail() {
  const { slug } = useParams();
  
  // Try to find in static posts first
  let post = posts.find((p) => p.slug === slug);
  
  // Fetch from backend if not found in static posts
  const { data: backendData, isLoading } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => blogAPI.getBlogBySlug(slug),
    enabled: !post, // Only fetch if not found in static posts
  });

  // Use backend data if available
  if (!post && backendData?.data) {
    post = backendData.data;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center text-white py-20">
        <h2 className="text-2xl">Blog not found</h2>
        <Link to="/blog" className="text-[#ff0000] underline">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 pt-15 bg-black ">
      <Seo
        title={post.seo?.title || post.title}
        description={post.seo?.description || post.excerpt}
        keywords={post.keywords?.join(', ') || ''}
        image={post.image}
        url={`https://www.socialbureau.in/blogs/${post.slug}`}
      />
      <Navbar/>
      <Link
        to="/blog"
        className="text-sm text-white hover: bg-[#ff0000] mb-6 inline-block p-3 rounded-full"
      >
        ← Back to Posts
      </Link>
      <div className="max-w-4xl mx-auto border border-[#3f0000] p-5 mb-10 bg-gradient-to-tr from-black to-[#3f0000] rounded-sm">
      <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
      <div className="flex items-center mb-4 space-x-3">
        <span className="text-xs font-medium bg-white text-[#ff0000] px-3 py-1 rounded-full">
          {post.category}
        </span>
        <span className="text-xs text-white">
          {post.time || (post.createdAt && new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }))}
        </span>
      </div>
      <img src={post.image} alt={post.title} className="mb-6 w-full rounded" />
      
      {/* Keywords */}
      {post.keywords && post.keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.keywords.map((keyword, idx) => (
            <span key={idx} className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
              #{keyword}
            </span>
          ))}
        </div>
      )}
      
      {/* Content Sections */}
      <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed blog-content">
        {post.content && Array.isArray(post.content) && post.content.map((section, index) => {
          // Handle old string format for backwards compatibility
          if (typeof section === 'string') {
            return <div key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: section }} />;
          }
          
          // Handle new object format with type, text, image, heading
          return (
            <div key={index} className="mb-6">
              {section.text && (
                <div 
                  className="text-gray-300 mb-3" 
                  dangerouslySetInnerHTML={{ __html: section.text }}
                />
              )}
              {section.image && (
                <img 
                  src={section.image} 
                  alt={`Section ${index + 1}`}
                  className="w-full rounded-lg my-4"
                />
              )}
            </div>
          );
        })}
      </div>
      
      <style>{`
        .blog-content h1 {
          font-size: 2em;
          font-weight: bold;
          color: #ffffff;
          margin: 1em 0 0.5em 0;
        }
        .blog-content h2 {
          font-size: 1.5em;
          font-weight: bold;
          color: #ffffff;
          margin: 0.83em 0 0.5em 0;
        }
        .blog-content h3 {
          font-size: 1.25em;
          font-weight: bold;
          color: #ffffff;
          margin: 0.83em 0 0.5em 0;
        }
        .blog-content h4 {
          font-size: 1.1em;
          font-weight: bold;
          color: #ffffff;
          margin: 1em 0 0.5em 0;
        }
        .blog-content h5, .blog-content h6 {
          font-size: 1em;
          font-weight: bold;
          color: #ffffff;
          margin: 1em 0 0.5em 0;
        }
        .blog-content p {
          color: #d1d5db;
          margin: 1em 0;
          line-height: 1.7;
        }
        .blog-content ul, .blog-content ol {
          color: #d1d5db;
          margin: 1em 0;
          padding-left: 2em;
        }
        .blog-content ul {
          list-style-type: disc;
        }
        .blog-content ol {
          list-style-type: decimal;
        }
        .blog-content li {
          color: #d1d5db;
          margin: 0.5em 0;
          line-height: 1.6;
        }
        .blog-content strong {
          font-weight: bold;
          color: #ffffff;
        }
        .blog-content em {
          font-style: italic;
        }
        .blog-content a {
          color: #ef4444;
          text-decoration: underline;
        }
        .blog-content a:hover {
          color: #dc2626;
        }
      `}</style>
      
      {/* Related/Child Blogs - Only show if there are related blogs */}
      {post.childBlogs && Array.isArray(post.childBlogs) && post.childBlogs.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-2xl font-bold text-white mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {post.childBlogs.map((childBlog, idx) => (
              <Link
                key={idx}
                to={`/blogs/${childBlog.slug}`}
                className="p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900 transition border border-gray-800"
              >
                <img src={childBlog.image} alt={childBlog.title} className=""/>
                <h4 className="text-white font-semibold mb-2">{childBlog.title}</h4>
                <p className="text-gray-400 text-sm line-clamp-2">{childBlog.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex items-center space-x-3 mt-8">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <i className="fa fa-user" aria-hidden="true"></i>
        </div>
        <span className="text-sm text-gray-400">{post.author || post.authorName}</span>
      </div>
    </div>
    <Footer/>
    </div>
  );
}
