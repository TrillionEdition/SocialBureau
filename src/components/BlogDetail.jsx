import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { useParams, Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { blogAPI } from "@/services/blogServices";
import { FaHeart, FaCalendarAlt, FaUser, FaTag, FaTrashAlt, FaEdit } from "react-icons/fa";

const Seo = lazy(() => import("./Seo"));
const SchemaMarkup = lazy(() => import("./SchemaMarkup"));
const Toast = lazy(() => import("./Toast"));
import { generateBlogPostingSchema } from "@/utils/schema";
import {
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaCopy,
  FaChevronRight,
  FaArrowLeft
} from "react-icons/fa";

import { subscribeNewsletter } from "@/services/newsLetterServices";

// Utility outside component so it doesn't get recreated on render
const processContentWithIds = (html, sectionIndex) => {
  if (!html) return html;

  let processedHtml = html;

  // processedHtml = processedHtml.replace(/(?:<br\s*\/?>\s*){2,}/gi, '<br/>');
  // Remove line breaks right before a heading
  // processedHtml = processedHtml.replace(/(?:<br\s*\/?>\s*)+<h/gi, '<h');

  // Process headings
  processedHtml = processedHtml.replace(/<h([1-6])(?:\s+[^>]*)?>(.*?)<\/h\1>/gi, (match, level, content) => {
    const textContent = content.replace(/<[^>]*>/g, '').trim();
    if (!textContent) return match;
    const slug = textContent.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-');

    // Assign specific classes based on heading level (Bold and distinct sizes)
    let headingClasses = "font-bold text-gray-900 mt-10 mb-5 leading-tight max-w-3xl";
    if (level === "1") headingClasses += " text-4xl md:text-5xl";
    else if (level === "2") headingClasses += " text-3xl md:text-4xl";
    else if (level === "3") headingClasses += " text-2xl md:text-3xl";
    else headingClasses += " text-xl md:text-2xl";

    // Add exactly one <br/> before the heading
    return `<br/><h${level} id="section-${sectionIndex}-${slug}" class="${headingClasses}">${content}</h${level}>`;
  });

  // Process paragraphs to match the requested style if desired
  processedHtml = processedHtml.replace(/<p(?:\s+[^>]*)?>(.*?)<\/p>/gi, (match, content) => {
    return `<p class="text-xl text-gray-700 mb-6 leading-relaxed max-w-3xl">${content}</p>`;
  });

  // Process lists slightly as well
  processedHtml = processedHtml.replace(/<ul(?:\s+[^>]*)?>(.*?)<\/ul>/gi, (match, content) => {
    return `<ul class="text-xl text-gray-700 mb-4 leading-relaxed max-w-3xl list-disc pl-6 space-y-2">${content}</ul>`;
  });

  processedHtml = processedHtml.replace(/<ol(?:\s+[^>]*)?>(.*?)<\/ol>/gi, (match, content) => {
    return `<ol class="text-xl text-gray-700 mb-4 leading-relaxed max-w-3xl list-decimal pl-6 space-y-2">${content}</ol>`;
  });

  return processedHtml;
};

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
      <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Table of Contents</h3>
        <p className="text-gray-500 text-sm">No headings available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-200 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Table of Contents</h3>
      <ul className="space-y-2">
        {headings.map((heading, index) => {
          const indentClass = {
            1: 'ml-0', 2: 'ml-4', 3: 'ml-8', 4: 'ml-12', 5: 'ml-16', 6: 'ml-20',
          }[heading.level] || 'ml-0';

          return (
            <li key={heading.id} className={indentClass}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className="flex items-center gap-3 text-gray-700 hover:text-red-600 p-2 rounded-lg hover:bg-gray-50 transition-colors group w-full text-left"
              >
                <span className="text-sm text-red-600 font-medium min-w-[30px]">
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

// MAIN COMPONENT - PROPER STRUCTURE
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

  // REDIRECT TO LOGIN WITH PREVIOUS PAGE INFO
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscribeMsg({ type: "error", text: "Please enter a valid email" });
      return;
    }

    setIsSubscribing(true);
    try {
      const response = await subscribeNewsletter(email);
      const data = response.data;
      setSubscribeMsg({ type: "success", text: data.message || "Subscribed successfully!" });
      setEmail("");
      setTimeout(() => setSubscribeMsg(null), 3000);
    } catch (err) {
      console.error("Subscribe error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Subscription failed";
      setSubscribeMsg({ type: "error", text: errorMessage });
    } finally {
      setIsSubscribing(false);
    }
  };

  //AUTH CHECK
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

    checkAuth();
    window.addEventListener('authChange', checkAuth);
    window.addEventListener('focus', checkAuth);

    return () => {
      window.removeEventListener('authChange', checkAuth);
      window.removeEventListener('focus', checkAuth);
    };
  }, []);

  //FETCH BLOG DATA
  const { data: backendData, isLoading, error } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => blogAPI.getBlogBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });

  //FIX #5: Better like handling with proper state sync
  useEffect(() => {
    if (!backendData) return;

    const blogData = backendData.data || backendData;
    setPost(blogData);
    setLikes(blogData.likedBy?.length || 0);
    // Only set comments if they exist in the blog data, otherwise keep existing comments
    if (blogData.comments) {
      setComments(blogData.comments);
    }

    if (currentUser && blogData.likedBy && Array.isArray(blogData.likedBy)) {
      const userLiked = blogData.likedBy.some(
        userId => userId.toString() === currentUser.id.toString()
      );
      setIsLiked(userLiked);
    }
  }, [backendData, currentUser]);

  //FIX #1: Fetch comments helper and initial load
  const fetchComments = async () => {
    if (!slug) return;
    try {
      const response = await blogAPI.getComments(slug);
      setComments(response?.data?.comments || response?.comments || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setComments([]);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [slug]);

  // Memoize headings extraction to avoid extra renders
  const extractedHeadings = useMemo(() => {
    if (!post?.content || !Array.isArray(post.content)) return [];

    const h = [];
    post.content.forEach((section, sectionIndex) => {
      const textToProcess = typeof section === 'string' ? section : section.text;
      if (textToProcess && typeof textToProcess === 'string') {
        const headingRegex = /<h([1-6])(?:\s+[^>]*)?>(.*?)<\/h\1>/gi;
        let match;
        while ((match = headingRegex.exec(textToProcess)) !== null) {
          const level = parseInt(match[1]);
          const content = match[2].replace(/<[^>]*>/g, '').trim();
          if (content) {
            const headingSlug = content.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-');
            h.push({ id: `section-${sectionIndex}-${headingSlug}`, text: content, level });
          }
        }
      }
    });
    return h;
  }, [post?.content]);

  // Sync headings with legacy state if needed (or just use extractedHeadings directly)
  // For safety with other components, we'll keep the state updated
  useEffect(() => {
    setHeadings(extractedHeadings);
  }, [extractedHeadings]);

  //FIX #7: Better like mutation
  const likeMutation = useMutation({
    mutationFn: () => {
      if (!currentUser) throw new Error("AUTH_REQUIRED");
      return blogAPI.likeBlog(slug);
    },
    onSuccess: (response) => {
      const data = response.data || response;
      setIsLiked(data.isLiked);
      setLikes(data.likes || 0);
      showToast("success", data.isLiked ? "Liked" : "Unliked");
    },
    onError: (error) => {
      const msg = error?.message || error?.response?.data?.message || "Something went wrong";

      if (msg === "AUTH_REQUIRED") {
        redirectToLogin("Login required to like");
        return;
      }

      if (msg === "AUTH_EXPIRED" || /jwt expired/i.test(msg)) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('authChange'));
        redirectToLogin("Session expired — please login again");
        return;
      }

      showToast("error", msg);
    },
  });

  //FIX #6: Add comment mutation should refresh comments
  const addCommentMutation = useMutation({
    mutationFn: (text) => {
      if (!currentUser) throw new Error("AUTH_REQUIRED");
      return blogAPI.addComment(slug, text);
    },
    onSuccess: async (response) => {
      const newComment = response.data?.comment || response.comment;

      setNewComment("");
      showToast("success", "Comment posted successfully!");

      try {
        await fetchComments();
      } catch (err) {
        console.warn("Failed to refresh comments after posting:", err);
        if (newComment) {
          setComments(prevComments => [
            ...prevComments,
            {
              ...newComment,
              author: newComment.author || currentUser.name || currentUser.email || "User",
              userId: newComment.userId || currentUser.id,
              userEmail: newComment.userEmail || currentUser.email,
              createdAt: newComment.createdAt || new Date().toISOString(),
              _id: newComment._id || newComment.id
            }
          ]);
        }
      }
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || error?.message || "";

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

      showToast("error", msg || "Failed to post comment");
    },
  });

  //FIX #4: Update comments when mutation succeeds
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => {
      if (!currentUser) throw new Error("AUTH_REQUIRED");
      return blogAPI.deleteComment(slug, commentId);
    },
    onSuccess: (response, commentId) => {
      setComments(prevComments =>
        prevComments.filter(c => (c._id || c.id) !== commentId)
      );
      showToast("success", "Comment deleted successfully");
    },
    onError: (error) => {
      const msg = (error?.response?.data?.message) || error?.message || "";

      if (msg === "AUTH_EXPIRED" || /jwt expired/i.test(msg)) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('authChange'));
        redirectToLogin("Session expired — please login again");
        return;
      }

      if (msg.includes("You can only delete your own comments")) {
        showToast("error", msg);
        return;
      }

      if (msg === "AUTH_REQUIRED") {
        redirectToLogin("Login required to delete comments");
        return;
      }

      showToast("error", msg || "Failed to delete comment");
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

  //FIX #2: Proper comment deletion with better error handling
  const handleDeleteComment = (comment) => {
    if (!currentUser) {
      redirectToLogin("Login required to manage comments");
      return;
    }

    const commentUserId = comment.userId?.toString?.() || comment.userId;
    const currentUserId = currentUser.id?.toString?.() || currentUser.id;

    if (commentUserId !== currentUserId) {
      showToast("warning", "You can only delete your own comments");
      return;
    }

    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteCommentMutation.mutate(comment._id || comment.id);
    }
  };

  // ✅ FIX #3: Better canDeleteComment check
  const canDeleteComment = (comment) => {
    if (!currentUser) return false;

    const commentUserId = comment.userId?.toString?.() || comment.userId;
    const currentUserId = currentUser.id?.toString?.() || currentUser.id;

    return commentUserId === currentUserId;
  };

  // ✅ CHECK IF USER CAN EDIT THIS POST
  const canEditPost = useMemo(() => {
    if (!currentUser || !post) return false;

    // Normalizing IDs for comparison
    const postUserId = post.user?._id || post.user;
    const currentUserId = currentUser.id || currentUser._id;

    const isOwner = postUserId?.toString() === currentUserId?.toString();
    const isUserAdmin = currentUser.role?.toLowerCase() === 'admin';

    return isOwner || isUserAdmin;
  }, [currentUser, post]);

  const processedRenderedContent = useMemo(() => {
    if (!post?.content || !Array.isArray(post.content)) return null;
    return post.content.map((section, index) => {
      if (typeof section === "string") {
        return <div key={index} className="mb-6" dangerouslySetInnerHTML={{ __html: processContentWithIds(section, index) }} />;
      }
      return (
        <div key={index} className="mb-8">
          {section.text && <div className="text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl" dangerouslySetInnerHTML={{ __html: processContentWithIds(section.text, index) }} />}
          {section.image && <img src={section.image} alt={`Section ${index + 1}`} loading="lazy" decoding="async" className="w-full rounded-xl my-6 shadow-md shadow-gray-200/50" />}
        </div>
      );
    });
  }, [post?.content]);

  if (isLoading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans"><div className="text-gray-600 text-xl">Loading...</div></div>;

  if (error || !post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Suspense fallback={null}>
        <Seo
          title={post.seo?.title || post.title}
          description={post.seo?.description || post.excerpt}
          keywords={post.keywords?.join(", ") || ""}
          image={post.image}
          url={`https://www.socialbureau.in/blogs/${post.slug}`}
          canonicalUrl={`https://www.socialbureau.in/blogs/${post.slug}`}
        />
        <SchemaMarkup data={generateBlogPostingSchema(post)} />
      </Suspense>

      {toast && (
        <Suspense fallback={null}>
          <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
        </Suspense>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <Link
          to="/blog"
          state={{
            fromPage: location.state?.fromPage,
            fromCategory: location.state?.fromCategory
          }}
          className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 group transition-colors"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span>Back to all posts</span>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">{post.category}</span>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><FaCalendarAlt className="w-3.5 h-3.5" />{post.time || (post.createdAt && new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }))}</span>
              <span className="flex items-center gap-1.5"><FaUser className="w-3.5 h-3.5" />{post.author || post.authorName}</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{post.title}</h1>

            {canEditPost && (
              <button
                onClick={() => navigate('/blog/submit', { state: { editBlog: post } })}
                className="flex-shrink-0 flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-full hover:bg-red-600 transition-all shadow-lg hover:shadow-red-200"
              >
                <FaEdit />
                <span>Edit Post</span>
              </button>
            )}
          </div>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl">{post.excerpt}</p>
        </div>

        <div className="mb-10 rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50">
          <img src={post.image} alt={post.title} fetchpriority="high" decoding="async" className="w-full h-auto aspect-video object-cover" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="blog-content prose prose-lg max-w-none mb-12 prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-em:text-gray-700 prose-li:text-gray-700 prose-ol:text-gray-700 prose-ul:text-gray-700 prose-blockquote:text-gray-700 prose-code:text-gray-800 prose-pre:bg-gray-100 prose-a:text-red-600 hover:prose-a:text-red-700">
              {processedRenderedContent}
            </div>

            {post.keywords && post.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                <span className="flex items-center gap-1.5 text-gray-500 mr-2"><FaTag className="w-3.5 h-3.5" />Tags:</span>
                {post.keywords.map((keyword, idx) => (
                  <span key={idx} className="text-sm bg-gray-100 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors cursor-pointer">{keyword}</span>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-b border-gray-200 mb-12">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    if (!currentUser) {
                      redirectToLogin("Login to like this post");
                      return;
                    }
                    likeMutation.mutate();
                  }}
                  disabled={likeMutation.isPending}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                    ${isLiked
                      ? "bg-red-50 text-red-600 border border-red-200 shadow-sm"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm"}
                    ${likeMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <FaHeart className={isLiked ? "fill-red-500" : "fill-gray-400"} />
                  <span>{likes}</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-500 font-medium">Share:</span>
                <div className="flex gap-2">
                  {["facebook", "twitter", "linkedin", "whatsapp", "copy"].map((platform) => (
                    <button key={platform} onClick={() => handleSharePlatform(platform)} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 shadow-sm border border-gray-200 transition-all hover:shadow-md" title={platform === "copy" ? "Copy link" : `Share on ${platform}`}>
                      {platform === "facebook" && <FaFacebookF />}
                      {platform === "twitter" && <FaTwitter />}
                      {platform === "linkedin" && <FaLinkedin />}
                      {platform === "whatsapp" && <FaWhatsapp />}
                      {platform === "copy" && <FaCopy />}
                    </button>
                  ))}
                </div>
                {copied && <span className="text-sm text-green-600 ml-2 font-medium">Link copied!</span>}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 mb-12 border border-gray-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-700 shadow-sm">{(post.author || post.authorName || "A")[0]}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{post.author || post.authorName}</h3>
                  <p className="text-gray-500 text-sm">Published on {new Date(post.createdAt || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2 inline-block">Comments ({comments.length})</h3>

              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Add a comment {!currentUser && <span className="text-sm text-gray-500 font-normal ml-2">(Login required)</span>}</h4>
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder={!currentUser ? "Please login to comment..." : "Share your thoughts..."} className={`w-full bg-gray-50 text-gray-900 placeholder-gray-400 p-4 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 border border-gray-200 resize-none ${!currentUser ? "cursor-not-allowed opacity-50" : ""}`} rows="4" disabled={!currentUser} />

                {!currentUser ? (
                  <button onClick={() => redirectToLogin("Login to post a comment")} className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition font-medium shadow-sm hover:shadow-md">Login to Comment</button>
                ) : (
                  <button onClick={handleAddComment} disabled={addCommentMutation.isPending} className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">{addCommentMutation.isPending ? "Posting..." : "Post Comment"}</button>
                )}
              </div>

              <div className="space-y-6">
                {comments.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-200 bg-gray-50 rounded-2xl">
                    <p className="text-gray-600 mb-2 font-medium">No comments yet</p>
                    <p className="text-sm">{!currentUser ? <button onClick={() => redirectToLogin("Login to be the first to comment!")} className="text-red-600 hover:text-red-700 font-medium underline">Login to be the first to comment!</button> : <span className="text-gray-500">Be the first to share your thoughts!</span>}</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment._id || comment.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center font-medium text-gray-700 shadow-sm">{(comment.author || "U")[0]}</div>
                          <div>
                            <p className="font-semibold text-gray-900">{comment.author || "User"} {comment.userId === currentUser?.id && <span className="text-xs text-gray-500 font-normal ml-2 bg-gray-100 px-2 py-0.5 rounded-full">(You)</span>}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{comment.createdAt ? new Date(comment.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : comment.date}</p>
                          </div>
                        </div>
                        {canDeleteComment(comment) && (
                          <button onClick={() => handleDeleteComment(comment)} disabled={deleteCommentMutation.isPending} aria-label="Delete comment" className={`p-2 rounded-full bg-white border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition shadow-sm ${deleteCommentMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`} title="Delete your comment"><FaTrashAlt size={13} /></button>
                        )}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment.text}</p>
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
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Related Articles</h3>
                  <div className="space-y-4">
                    {post.childBlogs.slice(0, 3).map((childBlog, idx) => (
                      <Link key={idx} to={`/blogs/${childBlog.slug}`} className="group block">
                        <div className="flex gap-4 items-start">
                          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                            <img src={childBlog.image} alt={childBlog.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">{childBlog.title}</h4>
                            <p className="text-xs font-medium text-red-600 bg-red-50 inline-block px-2 py-0.5 rounded-full border border-red-100 mt-2">{childBlog.category}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl p-6 mt-8 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Stay Updated</h3>
                <p className="text-gray-600 mb-5 text-sm">
                  Get the latest articles and insights delivered to your inbox.
                </p>
                <form onSubmit={handleNewsletterSubscribe} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubscribing}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-50 transition-shadow"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubscribing ? "Subscribing..." : "Subscribe"}
                  </button>
                  {subscribeMsg && (
                    <p
                      className={`text-sm text-center font-medium mt-3 ${subscribeMsg.type === "success"
                        ? "text-green-600 bg-green-50 py-2 rounded-lg border border-green-100"
                        : subscribeMsg.type === "error"
                          ? "text-red-600 bg-red-50 py-2 rounded-lg border border-red-100"
                          : "text-amber-600 bg-amber-50 py-2 rounded-lg border border-amber-100"
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
    </div>
  );
}


