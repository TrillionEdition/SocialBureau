// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useQuery } from "@tanstack/react-query";
// // import { blogAPI } from "../../services/blogServices";

// // const categories = [
// //   "All Posts",
// //   "Marketing",
// //   "Creatives",
// //   "Case Studies",
// //   "Technology",
// //   "Advertisement",
// // ];

// // export default function BlogPosts() {
// //   const [selectedCategory, setSelectedCategory] = useState("All Posts");
// //   const [currentPage, setCurrentPage] = useState(0);
// //   const navigate = useNavigate();

// //   const postsPerPage = 6;

// //   // ✅ Calculate reading time (200 words/min)
// //   const calculateReadingTime = (post) => {
// //     let wordCount = 0;

// //     if (post.title) {
// //       wordCount += post.title.split(/\s+/).length;
// //     }

// //     if (post.excerpt) {
// //       wordCount += post.excerpt.split(/\s+/).length;
// //     }

// //     if (Array.isArray(post.content)) {
// //       post.content.forEach((section) => {
// //         if (section?.text) {
// //           wordCount += section.text.split(/\s+/).length;
// //         }
// //       });
// //     }

// //     return Math.max(1, Math.ceil(wordCount / 200));
// //   };

// //   // ✅ Fetch blogs with proper query key and data extraction
// //   const { data, isLoading, error } = useQuery({
// //     queryKey: ["blogs", selectedCategory],
// //     queryFn: async () => {
// //       const response = await blogAPI.getBlogs({
// //         category:
// //           selectedCategory !== "All Posts" ? selectedCategory : undefined,
// //         limit: 100,
// //         published: true,
// //       });
// //       return response;
// //     },
// //     keepPreviousData: true,
// //   });

// //   // ✅ FIXED: Correct data extraction from API response
// //   // blogAPI.getBlogs returns: { success: true, data: blogs }
// //   const backendPosts = data?.data || [];

// //   // ✅ Category filtering (case-insensitive)
// //   const filteredPosts =
// //     selectedCategory === "All Posts"
// //       ? backendPosts
// //       : backendPosts.filter(
// //         (post) =>
// //           post.category &&
// //           post.category.toLowerCase() ===
// //           selectedCategory.toLowerCase()
// //       );

// //   // ✅ Pagination logic
// //   const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
// //   const startIndex = currentPage * postsPerPage;
// //   const paginatedPosts = filteredPosts.slice(
// //     startIndex,
// //     startIndex + postsPerPage
// //   );

// //   const handlePrev = () => {
// //     if (currentPage > 0) setCurrentPage((p) => p - 1);
// //   };

// //   const handleNext = () => {
// //     if (currentPage < totalPages - 1) setCurrentPage((p) => p + 1);
// //   };

// //   // ✅ Error handling
// //   if (error) {
// //     return (
// //       <div className="max-w-6xl mx-auto px-4 py-10 bg-black">
// //         <div className="col-span-full text-center text-red-400 py-10">
// //           Error loading blogs: {error.message}
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-6xl mx-auto px-4 py-10 bg-black">
// //       {/* Categories */}
// //       <div className="flex flex-wrap gap-3 mb-10 lg:px-20">
// //         {categories.map((category) => (
// //           <button
// //             key={category}
// //             onClick={() => {
// //               setSelectedCategory(category);
// //               setCurrentPage(0);
// //             }}
// //             className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedCategory === category
// //                 ? "bg-[#ff0000] text-white"
// //                 : "bg-gray-100 text-gray-800 hover:bg-gray-200"
// //               }`}
// //           >
// //             {category}
// //           </button>
// //         ))}
// //       </div>

// //       {/* Posts Grid */}
// //       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
// //         {isLoading ? (
// //           <div className="col-span-full text-center text-white py-8">
// //             Loading blogs...
// //           </div>
// //         ) : paginatedPosts.length === 0 ? (
// //           <div className="col-span-full text-center text-white py-10">
// //             No blogs found
// //           </div>
// //         ) : (
// //           paginatedPosts.map((post) => (
// //             <div onClick={() => navigate(`/blogs/${post.slug}`)}
// //               key={post._id}
// //               className="rounded-lg border border-none shadow-sm overflow-hidden flex flex-col hover:border-[#ff0000] hover:scale-105 transition"
// //             >
// //               {/* Blog Image */}
// //               <img
// //                 src={post.image || "/placeholder.jpg"}
// //                 alt={post.title}
// //                 className="w-full h-48 object-cover"
// //               />

// //               {/* Blog Content */}
// //               <div className="p-5 flex-1 flex flex-col">
// //                 {/* Category & Date */}
// //                 <div className="flex justify-between mb-2">
// //                   <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-800">
// //                     {post.category || "General"}
// //                   </span>
// //                   <span className="text-xs text-gray-400">
// //                     {post.createdAt
// //                       ? new Date(post.createdAt).toLocaleDateString()
// //                       : ""}
// //                   </span>
// //                 </div>

// //                 {/* Reading Time */}
// //                 <div className="text-xs text-gray-500 mb-2">
// //                   {calculateReadingTime(post)} min read
// //                 </div>

// //                 {/* Title */}
// //                 <h3 className="text-lg text-white font-semibold mb-2 line-clamp-2">
// //                   {post.title}
// //                 </h3>

// //                 {/* Excerpt */}
// //                 <p className="text-sm text-gray-400 flex-1 line-clamp-3">
// //                   {post.excerpt}
// //                 </p>

// //                 {/* Author & Read More */}
// //                 <div className="mt-4 flex justify-between items-center">
// //                   <span className="text-xs text-gray-400">
// //                     {post.authorName || "Unknown"}
// //                   </span>
// //                   <button
// //                     onClick={() => navigate(`/blogs/${post.slug}`)}
// //                     className="text-sm text-[#ff0000] font-medium hover:text-red-600 transition"
// //                   >
// //                     Read More →
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))
// //         )}
// //       </div>

// //       {/* Pagination Controls */}
// //       {totalPages > 1 && (
// //         <div className="flex justify-center items-center gap-4 mt-8">
// //           <button
// //             onClick={handlePrev}
// //             disabled={currentPage === 0}
// //             className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50 hover:bg-[#ff0000] transition"
// //           >
// //             ←
// //           </button>
// //           <span className="text-white text-sm">
// //             {currentPage + 1} of {totalPages}
// //           </span>
// //           <button
// //             onClick={handleNext}
// //             disabled={currentPage === totalPages - 1}
// //             className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50 hover:bg-[#ff0000] transition"
// //           >
// //             →
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import React, { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { blogAPI } from "../../services/blogServices";

// const categories = ["All Posts", "Marketing", "Creatives", "Case Studies", "Technology", "Advertisement"];

// // Skeleton Loader Component for performance perception
// const BlogSkeleton = () => (
//   <div className="animate-pulse bg-gray-900 rounded-xl overflow-hidden h-[400px]">
//     <div className="bg-gray-800 h-48 w-full" />
//     <div className="p-5 space-y-4">
//       <div className="h-4 bg-gray-800 rounded w-1/4" />
//       <div className="h-6 bg-gray-800 rounded w-3/4" />
//       <div className="h-4 bg-gray-800 rounded w-full" />
//       <div className="h-4 bg-gray-800 rounded w-5/6" />
//     </div>
//   </div>
// );

// export default function BlogPosts() {
//   const [selectedCategory, setSelectedCategory] = useState("All Posts");
//   const [currentPage, setCurrentPage] = useState(0);
//   const navigate = useNavigate();
//   const postsPerPage = 6;

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["blogs", selectedCategory],
//     queryFn: async () => {
//       const response = await blogAPI.getBlogs({
//         category: selectedCategory !== "All Posts" ? selectedCategory : undefined,
//         limit: 100,
//         published: true,
//       });
//       return response;
//     },
//     staleTime: 1000 * 60 * 5, // Cache for 5 minutes to boost performance
//   });

//   const backendPosts = data?.data || [];

//   // Optimized filtering and reading time calculation
//   const { paginatedPosts, totalPages } = useMemo(() => {
//     const filtered = selectedCategory === "All Posts"
//       ? backendPosts
//       : backendPosts.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());

//     const calcTime = (post) => {
//       const text = `${post.title} ${post.excerpt} ${post.content?.map(s => s.text).join(" ")}`;
//       return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
//     };

//     const start = currentPage * postsPerPage;
//     return {
//       paginatedPosts: filtered.slice(start, start + postsPerPage).map(p => ({ ...p, readTime: calcTime(p) })),
//       totalPages: Math.ceil(filtered.length / postsPerPage)
//     };
//   }, [backendPosts, selectedCategory, currentPage]);

//   if (error) return <div className="text-red-500 text-center py-20">Failed to load insights.</div>;

//   return (
//     <div className="max-w-[95vw] 2xl:max-w-7xl mx-auto px-2 md:px-4 py-10 bg-black">
      
//       {/* Category Pills - More compact */}
//       <div className="flex flex-wrap justify-center gap-2 mb-12">
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => { setSelectedCategory(category); setCurrentPage(0); }}
//             className={`px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
//               selectedCategory === category
//                 ? "bg-[#ff0000] text-white shadow-[0_0_15px_rgba(255,0,0,0.4)]"
//                 : "bg-zinc-900 text-gray-400 hover:bg-zinc-800 border border-zinc-800"
//             }`}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* Grid Layout - Reduced gaps and updated width */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {isLoading ? (
//           [...Array(6)].map((_, i) => <BlogSkeleton key={i} />)
//         ) : paginatedPosts.length === 0 ? (
//           <div className="col-span-full text-center text-gray-500 py-20">No articles in this category yet.</div>
//         ) : (
//           paginatedPosts.map((post) => (
//             <article
//               key={post._id}
//               onClick={() => navigate(`/blogs/${post.slug}`)}
//               className="group cursor-pointer bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#ff0000]/50 hover:-translate-y-2 flex flex-col"
//             >
//               <div className="relative overflow-hidden h-56">
//                 <img
//                   src={post.image || "/placeholder.jpg"}
//                   alt={post.title}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute top-4 left-4">
//                   <span className="text-[10px] uppercase tracking-widest bg-[#ff0000] text-white px-3 py-1 rounded-sm font-bold">
//                     {post.category || "Insight"}
//                   </span>
//                 </div>
//               </div>

//               <div className="p-6 flex-1 flex flex-col">
//                 <div className="flex items-center gap-3 text-gray-500 text-[11px] mb-3 uppercase tracking-wider">
//                   <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
//                   <span>•</span>
//                   <span>{post.readTime} min read</span>
//                 </div>

//                 <h3 className="text-xl text-white font-bold mb-3 group-hover:text-[#ff0000] transition-colors line-clamp-2 leading-snug">
//                   {post.title}
//                 </h3>

//                 <p className="text-gray-400 text-sm line-clamp-3 mb-6 font-light leading-relaxed">
//                   {post.excerpt}
//                 </p>

//                 <div className="mt-auto pt-4 border-t border-zinc-800 flex justify-between items-center">
//                   <span className="text-xs font-medium text-gray-300 italic">By {post.authorName || "SocialBureau Team"}</span>
//                   <span className="text-[#ff0000] text-sm font-bold group-hover:translate-x-1 transition-transform">
//                     View Post →
//                   </span>
//                 </div>
//               </div>
//             </article>
//           ))
//         )}
//       </div>

//       {/* Modernized Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-6 mt-16">
//           <button
//             onClick={() => { window.scrollTo(0, 0); setCurrentPage(p => p - 1); }}
//             disabled={currentPage === 0}
//             className="text-gray-400 hover:text-[#ff0000] disabled:opacity-20 transition-all font-black text-xl"
//           >
//             PREV
//           </button>
//           <div className="h-px w-12 bg-zinc-800"></div>
//           <span className="text-white font-mono text-sm tracking-widest">
//             {currentPage + 1} / {totalPages}
//           </span>
//           <div className="h-px w-12 bg-zinc-800"></div>
//           <button
//             onClick={() => { window.scrollTo(0, 0); setCurrentPage(p => p + 1); }}
//             disabled={currentPage === totalPages - 1}
//             className="text-gray-400 hover:text-[#ff0000] disabled:opacity-20 transition-all font-black text-xl"
//           >
//             NEXT
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { blogAPI } from "../../services/blogServices";

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
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [currentPage, setCurrentPage] = useState(0);
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
              className={`px-6 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 border-b-2 ${
                selectedCategory === cat
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
                onClick={() => navigate(`/blogs/${post.slug}`)}
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
        className="text-xs font-black tracking-[0.3em] uppercase disabled:opacity-10 hover:text-[#ff0000] transition-all cursor-pointer"
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
        className="text-xs font-black tracking-[0.3em] uppercase disabled:opacity-10 hover:text-[#ff0000] transition-all cursor-pointer"
    >
        Next
    </button>
  </div>
)}
      </div>
    </div>
  );
}