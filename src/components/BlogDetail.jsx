import React from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import posts from "../data/blogs";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function BlogDetail() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

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
        <span className="text-xs text-white">{post.time}</span>
      </div>
      <img src={post.image} alt={post.title} className="mb-6" />
      <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
        {post.content.map((section, index) => (
          <ReactMarkdown key={index}>{section}</ReactMarkdown>
        ))}
      </div>
      <div className="flex items-center space-x-3 mt-8">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <i className="fa fa-user" aria-hidden="true"></i>
        </div>
        <span className="text-sm text-gray-400">{post.author}</span>
      </div>
    </div>
    <Footer/>
    </div>
  );
}
