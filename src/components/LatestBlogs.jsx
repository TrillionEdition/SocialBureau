import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { blogAPI } from "../../services/blogServices";

export default function LatestBlogs() {
  const { data, isLoading } = useQuery({
    queryKey: ["latestBlogs"],
    queryFn: () => blogAPI.getLatestBlogs({ limit: 3 }),
  });

  const latestPosts = data?.data || [];

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:mt-10 mt-20 bg-gradient-to-tl from-black via-black to-red-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6 border-b border-red-600 pb-2">
        <h2 className="text-2xl font-bold text-white">Latest Blogs</h2>
        <a className="text-md text-[#ff0000] font-semibold" href="/blog">
          View More <i className="fas fa-arrow-right ml-1"></i>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {latestPosts.map((post) => (
          <Link
            key={post._id}
            to={`/blogs/${post.slug}`}
            className="relative group bg-black rounded-lg overflow-hidden shadow-md hover:shadow-red-600 transition"
          >
            <img src={post.image} alt={post.title} />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/50 opacity-0 group-hover:opacity-100 transition p-4 flex flex-col justify-end">
              <span className="text-xs bg-red-700 px-2 py-1 rounded-full text-white w-fit mb-2">
                {post.category}
              </span>
              <h3 className="text-lg text-white font-semibold mb-2">
                {post.title}
              </h3>
              <p className="text-gray-300 text-sm line-clamp-3 mb-3">
                {post.excerpt}
              </p>
              <div className="flex justify-between text-gray-400 text-xs">
                <span>{post.authorName}</span>
                <span>
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
