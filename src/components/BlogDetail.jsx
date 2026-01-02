// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { blogAPI } from "../../services/blogServices";
// import { FaHeart, FaCalendarAlt, FaUser, FaTag, FaTrashAlt } from "react-icons/fa";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import Seo from "./Seo";
// import Toast from "./Toast";
// import {
//   FaWhatsapp,
//   FaFacebookF,
//   FaTwitter,
//   FaLinkedin,
//   FaCopy,
//   FaChevronRight,
//   FaArrowLeft
// } from "react-icons/fa";

// // Table of Contents Component
// function TableOfContents({ headings }) {
//   const scrollToHeading = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       window.scrollTo({
//         top: element.offsetTop - 100,
//         behavior: 'smooth'
//       });
//     }
//   };

//   if (!headings || headings.length === 0) {
//     return (
//       <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mb-8 border border-gray-700">
//         <h3 className="text-xl font-bold text-gray-100 mb-4">Table of Contents</h3>
//         <p className="text-gray-400 text-sm">No headings available</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mb-8 border border-gray-700">
//       <h3 className="text-xl font-bold text-gray-100 mb-4">Table of Contents</h3>
//       <ul className="space-y-2">
//         {headings.map((heading, index) => {
//           const indentClass = {
//             1: 'ml-0', 2: 'ml-4', 3: 'ml-8', 4: 'ml-12', 5: 'ml-16', 6: 'ml-20',
//           }[heading.level] || 'ml-0';

//           return (
//             <li key={heading.id} className={indentClass}>
//               <button
//                 onClick={() => scrollToHeading(heading.id)}
//                 className="flex items-center gap-3 text-gray-300 hover:text-red-400 p-2 rounded-lg hover:bg-gray-700 transition-colors group w-full text-left"
//               >
//                 <span className="text-sm text-red-400 font-medium min-w-[30px]">
//                   {String(index + 1).padStart(2, '0')}
//                 </span>
//                 <span className="flex-1 text-sm line-clamp-2">{heading.text}</span>
//                 <FaChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-gray-400" />
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// export default function BlogDetail() {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [copied, setCopied] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [likes, setLikes] = useState(0);
//   const [headings, setHeadings] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [toast, setToast] = useState(null);

//   const showToast = (type, message) => {
//     setToast({ type, message });
//   };

//   // ✅ REDIRECT TO LOGIN WITH PREVIOUS PAGE INFO
//   const redirectToLogin = (message = "Please login to continue") => {
//     showToast("info", message);
//     setTimeout(() => {
//       navigate("/login", { state: { from: location } });
//     }, 1500);
//   };

//   useEffect(() => {
//     const checkAuth = () => {
//       const userData = localStorage.getItem('user');
//       if (userData) {
//         try {
//           setCurrentUser(JSON.parse(userData));
//         } catch (error) {
//           console.error("Error parsing user data:", error);
//           setCurrentUser(null);
//         }
//       } else {
//         setCurrentUser(null);
//       }
//     };

//     checkAuth();
//     window.addEventListener('authChange', checkAuth);
//     return () => window.removeEventListener('authChange', checkAuth);
//   }, []);

//   const { data: backendData, isLoading, error } = useQuery({
//     queryKey: ["blog", slug],
//     queryFn: () => blogAPI.getBlogBySlug(slug),
//     enabled: !!slug,
//   });

//   useEffect(() => {
//     if (backendData) {
//       const blogData = backendData.data || backendData;
//       setPost(blogData);
//       setLikes(blogData.meta?.likes || 0);
//       setComments(blogData.comments || []);
//       if (currentUser && blogData.likedBy) {
//         setIsLiked(blogData.likedBy.includes(currentUser.id));
//       }
//     }
//   }, [backendData, currentUser]);

//   useEffect(() => {
//     if (!post?.content) return;
//     const extractHeadingsFromContent = () => {
//       const extractedHeadings = [];
//       if (Array.isArray(post.content)) {
//         post.content.forEach((section, sectionIndex) => {
//           if (section.text && typeof section.text === 'string') {
//             const headingRegex = /<h([1-6])(?:\s+[^>]*)?>(.*?)<\/h\1>/gi;
//             let match;
//             while ((match = headingRegex.exec(section.text)) !== null) {
//               const level = parseInt(match[1]);
//               const content = match[2].replace(/<[^>]*>/g, '').trim();
//               if (content) {
//                 const slug = content.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-');
//                 extractedHeadings.push({ id: `section-${sectionIndex}-${slug}`, text: content, level });
//               }
//             }
//           }
//         });
//       }
//       setHeadings(extractedHeadings);
//     };
//     extractHeadingsFromContent();
//   }, [post]);

//   useEffect(() => {
//     if (!post?.content || headings.length === 0) return;
//     const addIdsToHeadings = () => {
//       const contentDiv = document.querySelector('.blog-content');
//       if (!contentDiv) return;
//       const headingElements = contentDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
//       headingElements.forEach((heading, index) => {
//         if (!heading.id && headings[index]) heading.id = headings[index].id;
//       });
//     };
//     setTimeout(addIdsToHeadings, 100);
//   }, [post, headings]);

//   const likeMutation = useMutation({
//     mutationFn: () => {
//       if (!currentUser) throw new Error("AUTH_REQUIRED");
//       return blogAPI.likeBlog(slug, !isLiked);
//     },
//     onSuccess: (response) => {
//       setIsLiked(!isLiked);
//       setLikes(response.data?.likes || response.likes || likes);
//       showToast("success", isLiked ? "Post unliked" : "Post liked!");
//     },
//     onError: (error) => {
//       if (error.message === "AUTH_REQUIRED") {
//         redirectToLogin("Login required to like this post");
//       } else {
//         showToast("error", "Failed to update like");
//       }
//     },
//   });

//   const addCommentMutation = useMutation({
//     mutationFn: (text) => {
//       if (!currentUser) throw new Error("AUTH_REQUIRED");
//       return blogAPI.addComment(slug, text, currentUser.name || currentUser.username);
//     },
//     onSuccess: (response) => {
//       const newComment = response.data?.comment || response.comment;
//       if (newComment) {
//         setComments([...comments, {
//           ...newComment,
//           author: currentUser.name || currentUser.username,
//           userId: currentUser.id,
//           userEmail: currentUser.email,
//           createdAt: new Date().toISOString()
//         }]);
//         setNewComment("");
//         showToast("success", "Comment posted successfully!");
//       }
//     },
//     onError: (error) => {
//       if (error.message === "AUTH_REQUIRED") {
//         redirectToLogin("Login required to comment");
//       } else {
//         showToast("error", "Failed to post comment");
//       }
//     },
//   });

//   const deleteCommentMutation = useMutation({
//     mutationFn: (commentId) => {
//       if (!currentUser) throw new Error("AUTH_REQUIRED");
//       return blogAPI.deleteComment(slug, commentId);
//     },
//     onSuccess: (_, commentId) => {
//       setComments(comments.filter(c => c._id !== commentId));
//       showToast("success", "Comment deleted successfully");
//     },
//     onError: (error) => {
//       if (error.message === "AUTH_REQUIRED") {
//         redirectToLogin("Login required to delete comments");
//       } else {
//         showToast("error", "Failed to delete comment");
//       }
//     },
//   });

//   const handleSharePlatform = (platform) => {
//     if (!post) return;
//     const shareUrl = `https://www.socialbureau.in/blogs/${post.slug}`;
//     const encodedUrl = encodeURIComponent(shareUrl);
//     const encodedTitle = encodeURIComponent(post.title);
//     let url;

//     switch (platform) {
//       case "facebook":
//         url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
//         break;
//       case "twitter":
//         url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
//         break;
//       case "linkedin":
//         url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
//         break;
//       case "whatsapp":
//         url = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
//         break;
//       case "copy":
//         navigator.clipboard.writeText(shareUrl);
//         setCopied(true);
//         showToast("success", "Link copied to clipboard!");
//         setTimeout(() => setCopied(false), 2000);
//         return;
//       default:
//         break;
//     }
//     if (url) window.open(url, "_blank", "width=600,height=400");
//   };

//   const handleAddComment = () => {
//     if (!newComment.trim()) {
//       showToast("warning", "Please enter a comment");
//       return;
//     }
//     if (!currentUser) {
//       redirectToLogin("Login required to post a comment");
//       return;
//     }
//     addCommentMutation.mutate(newComment);
//   };

//   const handleDeleteComment = (comment) => {
//     if (!currentUser) {
//       redirectToLogin("Login required to manage comments");
//       return;
//     }
//     if (comment.userId !== currentUser.id && comment.userEmail !== currentUser.email) {
//       showToast("warning", "You can only delete your own comments");
//       return;
//     }
//     if (window.confirm("Are you sure you want to delete this comment?")) {
//       deleteCommentMutation.mutate(comment._id || comment.id);
//     }
//   };

//   const canDeleteComment = (comment) => !currentUser ? false : (comment.userId === currentUser.id || comment.userEmail === currentUser.email);

//   const processContentWithIds = (html, sectionIndex) => {
//     if (!html) return html;
//     return html.replace(/<h([1-6])(?:\s+[^>]*)?>(.*?)<\/h\1>/gi, (match, level, content) => {
//       const textContent = content.replace(/<[^>]*>/g, '').trim();
//       if (!textContent) return match;
//       const slug = textContent.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-');
//       return `<h${level} id="section-${sectionIndex}-${slug}" class="text-gray-100">${content}</h${level}>`;
//     });
//   };

//   if (isLoading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center"><div className="text-gray-300 text-xl">Loading...</div></div>;

//   if (error || !post) {
//     return (
//       <div className="min-h-screen bg-gray-900 text-center text-gray-300 py-20">
//         <h2 className="text-2xl mb-4">Blog not found</h2>
//         <Link to="/blog" className="text-red-400 hover:text-red-300 underline">Back to Blogs</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900">
//       <Seo title={post.seo?.title || post.title} description={post.seo?.description || post.excerpt} keywords={post.keywords?.join(", ") || ""} image={post.image} url={`https://www.socialbureau.in/blogs/${post.slug}`} />
//       <Navbar />
//       {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
//         <Link to="/blog" className="inline-flex items-center text-gray-400 hover:text-gray-200 mb-8 group transition-colors">
//           <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
//           <span>Back to all posts</span>
//         </Link>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-4">
//             <span className="text-xs font-semibold uppercase tracking-wider text-red-400 bg-gray-800 px-3 py-1.5 rounded-full">{post.category}</span>
//             <div className="flex items-center gap-6 text-sm text-gray-400">
//               <span className="flex items-center gap-1.5"><FaCalendarAlt className="w-3.5 h-3.5" />{post.time || (post.createdAt && new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }))}</span>
//               <span className="flex items-center gap-1.5"><FaUser className="w-3.5 h-3.5" />{post.author || post.authorName}</span>
//             </div>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 leading-tight">{post.title}</h1>
//           <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">{post.excerpt}</p>
//         </div>

//         <div className="mb-10 rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
//           <img src={post.image} alt={post.title} className="w-full h-auto aspect-video object-cover" />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           <div className="lg:col-span-8">
//             <div className="blog-content prose prose-lg max-w-none mb-12 prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-gray-100 prose-em:text-gray-300 prose-li:text-gray-300 prose-ol:text-gray-300 prose-ul:text-gray-300 prose-blockquote:text-gray-300 prose-code:text-gray-300 prose-pre:bg-gray-800 prose-a:text-red-400 hover:prose-a:text-red-300">
//               {post.content && Array.isArray(post.content) && post.content.map((section, index) => {
//                 if (typeof section === "string") {
//                   return <div key={index} className="mb-6" dangerouslySetInnerHTML={{ __html: processContentWithIds(section, index) }} />;
//                 }
//                 return (
//                   <div key={index} className="mb-8">
//                     {section.text && <div className="text-gray-300 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: processContentWithIds(section.text, index) }} />}
//                     {section.image && <img src={section.image} alt={`Section ${index + 1}`} className="w-full rounded-xl my-6 shadow-lg shadow-black/30" />}
//                   </div>
//                 );
//               })}
//             </div>

//             {post.keywords && post.keywords.length > 0 && (
//               <div className="flex flex-wrap gap-2 mb-10">
//                 <span className="flex items-center gap-1.5 text-gray-400 mr-2"><FaTag className="w-3.5 h-3.5" />Tags:</span>
//                 {post.keywords.map((keyword, idx) => (
//                   <span key={idx} className="text-sm bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-700 transition-colors cursor-pointer">{keyword}</span>
//                 ))}
//               </div>
//             )}

//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-b border-gray-700 mb-12">
//               <div className="flex items-center gap-4">
//                 <button onClick={() => { if (!currentUser) { redirectToLogin("Login to like this post"); return; } likeMutation.mutate(); }} disabled={likeMutation.isPending} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isLiked ? "bg-red-900/30 text-red-400 border border-red-800" : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"} ${likeMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`} title={!currentUser ? "Login to like this post" : ""}>
//                   <FaHeart className={isLiked ? "fill-red-400" : "fill-gray-400"} />
//                   <span className="font-medium">{isLiked ? "Liked" : "Like"} ({likes})</span>
//                 </button>
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="text-gray-400 font-medium">Share:</span>
//                 <div className="flex gap-2">
//                   {["facebook", "twitter", "linkedin", "whatsapp", "copy"].map((platform) => (
//                     <button key={platform} onClick={() => handleSharePlatform(platform)} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-gray-700 transition-colors border border-gray-700" title={platform === "copy" ? "Copy link" : `Share on ${platform}`}>
//                       {platform === "facebook" && <FaFacebookF />}
//                       {platform === "twitter" && <FaTwitter />}
//                       {platform === "linkedin" && <FaLinkedin />}
//                       {platform === "whatsapp" && <FaWhatsapp />}
//                       {platform === "copy" && <FaCopy />}
//                     </button>
//                   ))}
//                 </div>
//                 {copied && <span className="text-sm text-green-400 ml-2">Link copied!</span>}
//               </div>
//             </div>

//             <div className="bg-gray-800 rounded-2xl p-6 mb-12 border border-gray-700">
//               <div className="flex items-start gap-4">
//                 <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center text-2xl font-bold text-gray-300">{(post.author || post.authorName || "A")[0]}</div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-100 mb-2">{post.author || post.authorName}</h3>
//                   <p className="text-gray-400">Published on {new Date(post.createdAt || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-12">
//               <h3 className="text-2xl font-bold text-gray-100 mb-6">Comments ({comments.length})</h3>

//               <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8 shadow-lg">
//                 <h4 className="text-lg font-semibold text-gray-100 mb-4">Add a comment {!currentUser && <span className="text-sm text-gray-400 ml-2">(Login required)</span>}</h4>
//                 <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder={!currentUser ? "Please login to comment..." : "Share your thoughts..."} className={`w-full bg-gray-900 text-gray-100 placeholder-gray-500 p-4 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent border border-gray-700 resize-none ${!currentUser ? "cursor-not-allowed opacity-50" : ""}`} rows="4" disabled={!currentUser} />
                
//                 {!currentUser ? (
//                   <button onClick={() => redirectToLogin("Login to post a comment")} className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition font-medium">Login to Comment</button>
//                 ) : (
//                   <button onClick={handleAddComment} disabled={addCommentMutation.isPending} className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed">{addCommentMutation.isPending ? "Posting..." : "Post Comment"}</button>
//                 )}
//               </div>

//               <div className="space-y-6">
//                 {comments.length === 0 ? (
//                   <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-2xl">
//                     <p className="text-gray-500 mb-2">No comments yet</p>
//                     <p className="text-sm">{!currentUser ? <button onClick={() => redirectToLogin("Login to be the first to comment!")} className="text-red-400 hover:text-red-300 underline">Login to be the first to comment!</button> : <span className="text-gray-600">Be the first to share your thoughts!</span>}</p>
//                   </div>
//                 ) : (
//                   comments.map((comment) => (
//                     <div key={comment._id || comment.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
//                       <div className="flex justify-between items-start mb-4">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center font-medium text-gray-300">{(comment.author || "U")[0]}</div>
//                           <div>
//                             <p className="font-semibold text-gray-100">{comment.author || "Anonymous"} {comment.userId === currentUser?.id && <span className="text-xs text-gray-400 ml-2">(You)</span>}</p>
//                             <p className="text-sm text-gray-400">{comment.createdAt ? new Date(comment.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : comment.date}</p>
//                           </div>
//                         </div>
//                         {canDeleteComment(comment) && (
//                           <button onClick={() => handleDeleteComment(comment)} disabled={deleteCommentMutation.isPending} aria-label="Delete comment" className={`p-2 rounded-full bg-gray-700 text-gray-400 hover:bg-red-900/30 hover:text-red-400 transition ${deleteCommentMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`} title="Delete your comment"><FaTrashAlt size={13} /></button>
//                         )}
//                       </div>
//                       <p className="text-gray-300 leading-relaxed">{comment.text}</p>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="lg:col-span-4">
//             <div className="sticky top-24">
//               <TableOfContents headings={headings} />

//               {post.childBlogs && Array.isArray(post.childBlogs) && post.childBlogs.length > 0 && (
//                 <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-lg">
//                   <h3 className="text-xl font-bold text-gray-100 mb-4">Related Articles</h3>
//                   <div className="space-y-4">
//                     {post.childBlogs.slice(0, 3).map((childBlog, idx) => (
//                       <Link key={idx} to={`/blogs/${childBlog.slug}`} className="group block">
//                         <div className="flex gap-4 items-start">
//                           <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-700">
//                             <img src={childBlog.image} alt={childBlog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//                           </div>
//                           <div>
//                             <h4 className="font-semibold text-gray-100 group-hover:text-red-400 transition-colors line-clamp-2">{childBlog.title}</h4>
//                             <p className="text-sm text-gray-400 mt-1">{childBlog.category}</p>
//                           </div>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mt-8 border border-gray-700">
//                 <h3 className="text-xl font-bold text-gray-100 mb-3">Stay Updated</h3>
//                 <p className="text-gray-400 mb-4 text-sm">Get the latest articles and insights delivered to your inbox.</p>
//                 <div className="space-y-3">
//                   <input type="email" placeholder="Your email address" className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
//                   <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition">Subscribe</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { blogAPI } from "../../services/blogServices";
import { FaHeart, FaCalendarAlt, FaUser, FaTag, FaTrashAlt } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Seo from "./Seo";
import Toast from "./Toast";
import {
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaCopy,
  FaChevronRight,
  FaArrowLeft
} from "react-icons/fa";
import { BASE_URL } from "../../utils/urls";

// Table of Contents Component
function TableOfContents({ headings }) {
  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  if (!headings || headings.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mb-8 border border-gray-700">
        <h3 className="text-xl font-bold text-gray-100 mb-4">Table of Contents</h3>
        <p className="text-gray-400 text-sm">No headings available</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mb-8 border border-gray-700">
      <h3 className="text-xl font-bold text-gray-100 mb-4">Table of Contents</h3>
      <ul className="space-y-2">
        {headings.map((heading, index) => {
          const indentClass = {
            1: 'ml-0', 2: 'ml-4', 3: 'ml-8', 4: 'ml-12', 5: 'ml-16', 6: 'ml-20',
          }[heading.level] || 'ml-0';

          return (
            <li key={heading.id} className={indentClass}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className="flex items-center gap-3 text-gray-300 hover:text-red-400 p-2 rounded-lg hover:bg-gray-700 transition-colors group w-full text-left"
              >
                <span className="text-sm text-red-400 font-medium min-w-[30px]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 text-sm line-clamp-2">{heading.text}</span>
                <FaChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-gray-400" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [headings, setHeadings] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [toast, setToast] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribeMsg, setSubscribeMsg] = useState(null);
  const [isSubscribing, setIsSubscribing] = useState(false);


  const showToast = (type, message) => {
    setToast({ type, message });
  };

  // ✅ REDIRECT TO LOGIN WITH PREVIOUS PAGE INFO
  const redirectToLogin = (message = "Please login to continue") => {
    showToast("info", message);
    setTimeout(() => {
      navigate("/login", { state: { from: location } });
    }, 1500);
  };
const handleNewsletterSubscribe = async (e) => {
  e.preventDefault();

  if (!email.trim()) {
    setSubscribeMsg({ type: "warning", text: "Please enter your email" });
    return;
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setSubscribeMsg({ type: "error", text: "Please enter a valid email" });
    return;
  }

  setIsSubscribing(true);
  try {
    const baseUrl = BASE_URL;
    console.log("🔄 Sending subscribe request...", { email, baseUrl });

    const url = `${baseUrl.replace(/\/$/, "")}/api/newsletter/subscribe`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    console.log("📊 Response status:", response.status, response.statusText);
    const contentType = response.headers.get("content-type") || "";
    let data = null;

    // Try to parse JSON if possible, otherwise capture text
    if (contentType.includes("application/json")) {
      try {
        data = await response.json();
      } catch (err) {
        console.warn("⚠️ Failed to parse JSON response:", err);
        data = { message: "Invalid JSON response" };
      }
    } else {
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch (e) {
        data = { message: text };
      }
    }

    console.log("📦 Response payload:", data);

    if (response.ok) {
      setSubscribeMsg({ type: "success", text: data.message || "Subscribed successfully!" });
      setEmail("");
      setTimeout(() => setSubscribeMsg(null), 3000);
    } else {
      setSubscribeMsg({ type: "error", text: data?.message || response.statusText || "Subscription failed" });
    }
  } catch (err) {
    console.error("❌ Subscribe error:", err);
    setSubscribeMsg({ type: "error", text: "Network error. Please check your connection and try again." });
  } finally {
    setIsSubscribing(false);
  }
};

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setCurrentUser(user);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };

    // Check auth on mount
    checkAuth();
    
    // Listen for auth changes from other components
    window.addEventListener('authChange', checkAuth);
    
    // Also check when component comes back into focus
    window.addEventListener('focus', checkAuth);
    
    return () => {
      window.removeEventListener('authChange', checkAuth);
      window.removeEventListener('focus', checkAuth);
    };
  }, []);

  const { data: backendData, isLoading, error } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => blogAPI.getBlogBySlug(slug),
    enabled: !!slug,
  });

  useEffect(() => {
    if (backendData) {
      const blogData = backendData.data || backendData;
      setPost(blogData);
      setLikes(blogData.likedBy?.length || 0); // ✅ Count unique likers
      setComments(blogData.comments || []);
      
      // ✅ Check if current user already liked this blog
      if (currentUser && blogData.likedBy) {
        const userLiked = blogData.likedBy.some(
          userId =>userId.toString() === currentUser.id);
        setIsLiked(userLiked);
        console.log("User liked this blog:", userLiked);
      }
    }
  }, [backendData, currentUser]);

  useEffect(() => {
    if (!post?.content) return;
    const extractHeadingsFromContent = () => {
      const extractedHeadings = [];
      if (Array.isArray(post.content)) {
        post.content.forEach((section, sectionIndex) => {
          if (section.text && typeof section.text === 'string') {
            const headingRegex = /<h([1-6])(?:\s+[^>]*)?>(.*?)<\/h\1>/gi;
            let match;
            while ((match = headingRegex.exec(section.text)) !== null) {
              const level = parseInt(match[1]);
              const content = match[2].replace(/<[^>]*>/g, '').trim();
              if (content) {
                const slug = content.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-');
                extractedHeadings.push({ id: `section-${sectionIndex}-${slug}`, text: content, level });
              }
            }
          }
        });
      }
      setHeadings(extractedHeadings);
    };
    extractHeadingsFromContent();
  }, [post]);

  useEffect(() => {
    if (!post?.content || headings.length === 0) return;
    const addIdsToHeadings = () => {
      const contentDiv = document.querySelector('.blog-content');
      if (!contentDiv) return;
      const headingElements = contentDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headingElements.forEach((heading, index) => {
        if (!heading.id && headings[index]) heading.id = headings[index].id;
      });
    };
    setTimeout(addIdsToHeadings, 100);
  }, [post, headings]);

  const likeMutation = useMutation({
    mutationFn: () => {
      if (!currentUser) throw new Error("AUTH_REQUIRED");
      // Send current state, backend will toggle it
      return blogAPI.likeBlog(slug);
    },
    onSuccess: (response) => {
      // ✅ FIXED: Update from response data
      const responseData = response.data || response;
      const newLikeCount = responseData.likes || responseData.likedBy?.length || likes;
      const newIsLiked = responseData.isLiked !== undefined ? responseData.isLiked : !isLiked;
      
      setIsLiked(newIsLiked);
      setLikes(newLikeCount);
      console.log(responseData);
      showToast("success", newIsLiked ? "Post liked! ❤️" : "Post unliked");
    },
    onError: (error) => {
      console.error("Like error:", error);
      const msg = (error && error.message) || "";
      if (msg === "AUTH_EXPIRED" || /jwt expired/i.test(msg)) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('authChange'));
        redirectToLogin("Session expired — please login again");
        return;
      }
      if (msg === "AUTH_REQUIRED") {
        redirectToLogin("Login required to like this post");
        return;
      }
      showToast("error", "Failed to update like");
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: (text) => {
      if (!currentUser) throw new Error("AUTH_REQUIRED");
      return blogAPI.addComment(slug, text, currentUser.name || currentUser.email || "User");
    },
    onSuccess: (response) => {
      const newComment = response.data?.comment || response.comment;
      if (newComment) {
        setComments([...comments, {
          ...newComment,
          author: currentUser.name || currentUser.email || "User", // ✅ Use actual username
          userId: currentUser.id,
          userEmail: currentUser.email,
          createdAt: new Date().toISOString()
        }]);
        setNewComment("");
        showToast("success", "Comment posted successfully!");
      }
    },
    onError: (error) => {
      const msg = (error && error.message) || "";
      if (msg === "AUTH_EXPIRED" || /jwt expired/i.test(msg)) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('authChange'));
        redirectToLogin("Session expired — please login again");
        return;
      }
      if (msg === "AUTH_REQUIRED") {
        redirectToLogin("Login required to comment");
        return;
      }
      showToast("error", "Failed to post comment");
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => {
      if (!currentUser) throw new Error("AUTH_REQUIRED");
      return blogAPI.deleteComment(slug, commentId);
    },
    onSuccess: (_, commentId) => {
      setComments(comments.filter(c => c._id !== commentId));
      showToast("success", "Comment deleted successfully");
    },
    onError: (error) => {
      const msg = (error && error.message) || "";
      if (msg === "AUTH_EXPIRED" || /jwt expired/i.test(msg)) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('authChange'));
        redirectToLogin("Session expired — please login again");
        return;
      }
      if (msg === "AUTH_REQUIRED") {
        redirectToLogin("Login required to delete comments");
        return;
      }
      showToast("error", "Failed to delete comment");
    },
  });

  const handleSharePlatform = (platform) => {
    if (!post) return;
    const shareUrl = `https://www.socialbureau.in/blogs/${post.slug}`;
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(post.title);
    let url;

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        showToast("success", "Link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
        return;
      default:
        break;
    }
    if (url) window.open(url, "_blank", "width=600,height=400");
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      showToast("warning", "Please enter a comment");
      return;
    }
    if (!currentUser) {
      redirectToLogin("Login required to post a comment");
      return;
    }
    addCommentMutation.mutate(newComment);
  };

  const handleDeleteComment = (comment) => {
    if (!currentUser) {
      redirectToLogin("Login required to manage comments");
      return;
    }
    if (comment.userId !== currentUser.id && comment.userEmail !== currentUser.email) {
      showToast("warning", "You can only delete your own comments");
      return;
    }
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteCommentMutation.mutate(comment._id || comment.id);
    }
  };

  const canDeleteComment = (comment) => !currentUser ? false : (comment.userId === currentUser.id || comment.userEmail === currentUser.email);

  const processContentWithIds = (html, sectionIndex) => {
    if (!html) return html;
    return html.replace(/<h([1-6])(?:\s+[^>]*)?>(.*?)<\/h\1>/gi, (match, level, content) => {
      const textContent = content.replace(/<[^>]*>/g, '').trim();
      if (!textContent) return match;
      const slug = textContent.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-');
      return `<h${level} id="section-${sectionIndex}-${slug}" class="text-gray-100">${content}</h${level}>`;
    });
  };

  if (isLoading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center"><div className="text-gray-300 text-xl">Loading...</div></div>;

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-900 text-center text-gray-300 py-20">
        <h2 className="text-2xl mb-4">Blog not found</h2>
        <Link to="/blog" className="text-red-400 hover:text-red-300 underline">Back to Blogs</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Seo title={post.seo?.title || post.title} description={post.seo?.description || post.excerpt} keywords={post.keywords?.join(", ") || ""} image={post.image} url={`https://www.socialbureau.in/blogs/${post.slug}`} />
      <Navbar />
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <Link to="/blog" className="inline-flex items-center text-gray-400 hover:text-gray-200 mb-8 group transition-colors">
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span>Back to all posts</span>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-red-400 bg-gray-800 px-3 py-1.5 rounded-full">{post.category}</span>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><FaCalendarAlt className="w-3.5 h-3.5" />{post.time || (post.createdAt && new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }))}</span>
              <span className="flex items-center gap-1.5"><FaUser className="w-3.5 h-3.5" />{post.author || post.authorName}</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 leading-tight">{post.title}</h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">{post.excerpt}</p>
        </div>

        <div className="mb-10 rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
          <img src={post.image} alt={post.title} className="w-full h-auto aspect-video object-cover" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="blog-content prose prose-lg max-w-none mb-12 prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-gray-100 prose-em:text-gray-300 prose-li:text-gray-300 prose-ol:text-gray-300 prose-ul:text-gray-300 prose-blockquote:text-gray-300 prose-code:text-gray-300 prose-pre:bg-gray-800 prose-a:text-red-400 hover:prose-a:text-red-300">
              {post.content && Array.isArray(post.content) && post.content.map((section, index) => {
                if (typeof section === "string") {
                  return <div key={index} className="mb-6" dangerouslySetInnerHTML={{ __html: processContentWithIds(section, index) }} />;
                }
                return (
                  <div key={index} className="mb-8">
                    {section.text && <div className="text-gray-300 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: processContentWithIds(section.text, index) }} />}
                    {section.image && <img src={section.image} alt={`Section ${index + 1}`} className="w-full rounded-xl my-6 shadow-lg shadow-black/30" />}
                  </div>
                );
              })}
            </div>

            {post.keywords && post.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                <span className="flex items-center gap-1.5 text-gray-400 mr-2"><FaTag className="w-3.5 h-3.5" />Tags:</span>
                {post.keywords.map((keyword, idx) => (
                  <span key={idx} className="text-sm bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-700 transition-colors cursor-pointer">{keyword}</span>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-b border-gray-700 mb-12">
              <div className="flex items-center gap-4">
                <button onClick={() => { if (!currentUser) { redirectToLogin("Login to like this post"); return; } likeMutation.mutate(); }} disabled={likeMutation.isPending} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isLiked ? "bg-red-900/30 text-red-400 border border-red-800" : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"} ${likeMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`} title={!currentUser ? "Login to like this post" : ""}>
                  <FaHeart className={isLiked ? "fill-red-400" : "fill-gray-400"} />
                  <span className="font-medium">{isLiked ? "Liked" : "Like"} ({likes})</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">Share:</span>
                <div className="flex gap-2">
                  {["facebook", "twitter", "linkedin", "whatsapp", "copy"].map((platform) => (
                    <button key={platform} onClick={() => handleSharePlatform(platform)} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-gray-700 transition-colors border border-gray-700" title={platform === "copy" ? "Copy link" : `Share on ${platform}`}>
                      {platform === "facebook" && <FaFacebookF />}
                      {platform === "twitter" && <FaTwitter />}
                      {platform === "linkedin" && <FaLinkedin />}
                      {platform === "whatsapp" && <FaWhatsapp />}
                      {platform === "copy" && <FaCopy />}
                    </button>
                  ))}
                </div>
                {copied && <span className="text-sm text-green-400 ml-2">Link copied!</span>}
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 mb-12 border border-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center text-2xl font-bold text-gray-300">{(post.author || post.authorName || "A")[0]}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2">{post.author || post.authorName}</h3>
                  <p className="text-gray-400">Published on {new Date(post.createdAt || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-100 mb-6">Comments ({comments.length})</h3>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-100 mb-4">Add a comment {!currentUser && <span className="text-sm text-gray-400 ml-2">(Login required)</span>}</h4>
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder={!currentUser ? "Please login to comment..." : "Share your thoughts..."} className={`w-full bg-gray-900 text-gray-100 placeholder-gray-500 p-4 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent border border-gray-700 resize-none ${!currentUser ? "cursor-not-allowed opacity-50" : ""}`} rows="4" disabled={!currentUser} />
                
                {!currentUser ? (
                  <button onClick={() => redirectToLogin("Login to post a comment")} className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition font-medium">Login to Comment</button>
                ) : (
                  <button onClick={handleAddComment} disabled={addCommentMutation.isPending} className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed">{addCommentMutation.isPending ? "Posting..." : "Post Comment"}</button>
                )}
              </div>

              <div className="space-y-6">
                {comments.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-2xl">
                    <p className="text-gray-500 mb-2">No comments yet</p>
                    <p className="text-sm">{!currentUser ? <button onClick={() => redirectToLogin("Login to be the first to comment!")} className="text-red-400 hover:text-red-300 underline">Login to be the first to comment!</button> : <span className="text-gray-600">Be the first to share your thoughts!</span>}</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment._id || comment.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center font-medium text-gray-300">{(comment.author || "U")[0]}</div>
                          <div>
                            <p className="font-semibold text-gray-100">{comment.author || "User"} {comment.userId === currentUser?.id && <span className="text-xs text-gray-400 ml-2">(You)</span>}</p>
                            <p className="text-sm text-gray-400">{comment.createdAt ? new Date(comment.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : comment.date}</p>
                          </div>
                        </div>
                        {canDeleteComment(comment) && (
                          <button onClick={() => handleDeleteComment(comment)} disabled={deleteCommentMutation.isPending} aria-label="Delete comment" className={`p-2 rounded-full bg-gray-700 text-gray-400 hover:bg-red-900/30 hover:text-red-400 transition ${deleteCommentMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`} title="Delete your comment"><FaTrashAlt size={13} /></button>
                        )}
                      </div>
                      <p className="text-gray-300 leading-relaxed">{comment.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />

              {post.childBlogs && Array.isArray(post.childBlogs) && post.childBlogs.length > 0 && (
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-100 mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {post.childBlogs.slice(0, 3).map((childBlog, idx) => (
                      <Link key={idx} to={`/blogs/${childBlog.slug}`} className="group block">
                        <div className="flex gap-4 items-start">
                          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-700">
                            <img src={childBlog.image} alt={childBlog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-100 group-hover:text-red-400 transition-colors line-clamp-2">{childBlog.title}</h4>
                            <p className="text-sm text-gray-400 mt-1">{childBlog.category}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mt-8 border border-gray-700">
      <h3 className="text-xl font-bold text-gray-100 mb-3">Stay Updated</h3>
      <p className="text-gray-400 mb-4 text-sm">
        Get the latest articles and insights delivered to your inbox.
      </p>
      <form onSubmit={handleNewsletterSubscribe} className="space-y-3">
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubscribing}
          className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isSubscribing}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubscribing ? "Subscribing..." : "Subscribe"}
        </button>
        {subscribeMsg && (
          <p
            className={`text-sm text-center ${
              subscribeMsg.type === "success"
                ? "text-green-400"
                : subscribeMsg.type === "error"
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          >
            {subscribeMsg.text}
          </p>
        )}
      </form>
    </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}