import React, { useEffect, useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { qaAPI } from "@/services/qaServices";
import { FaThumbsUp } from "react-icons/fa";
import Footer from "./Footer";

export default function QASection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: "", body: "", category: "General" });
  const [currentExpert, setCurrentExpert] = useState(0);
  const queryClient = useQueryClient();
  
  const experts = [
    {
      name: "Amal",
      title: "DM",
      image: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1767762347/amal_fnathg.jpg"
    },
    {
      name: "Muhsin",
      title: "SEO",
      image: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1767762340/muhsin_pcrnxx.jpg"
    }
  ];

  // Rotate experts every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExpert((prev) => (prev + 1) % experts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  // Get user ID/IP for upvoting (simple approach using localStorage)
  const getUserId = () => {
    let uid = localStorage.getItem("qa_uid");
    if (!uid) {
      uid = `user_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("qa_uid", uid);
    }
    return uid;
  };

  // Fetch questions with filters
  const { data: questionsData, isLoading } = useQuery({
    queryKey: ["questions", category, query],
    queryFn: () => qaAPI.getQuestions({ 
      category: category !== "All" ? category : undefined,
      q: query || undefined,
      limit: 50,
      sort: "-createdAt"
    }),
    refetchInterval: 20000, // Poll every 20 seconds for new questions
    placeholderData: (previousData) => previousData,
  });

  // Fetch stats
  const { data: statsData } = useQuery({
    queryKey: ["stats"],
    queryFn: () => qaAPI.getStats(),
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (data) => qaAPI.createQuestion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      setNewQuestion({ title: "", body: "", category: "General" });
      setIsModalOpen(false);
    },
  });

  const upvoteMutation = useMutation({
    mutationFn: ({ id, userId }) => qaAPI.upvoteQuestion(id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Already upvoted");
    },
  });

  const answerMutation = useMutation({
    mutationFn: ({ id, expert, expertAnswer }) => qaAPI.markAnswered(id, { expert, expertAnswer }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });

  function submitQuestion(e) {
    e.preventDefault();
    if (!newQuestion.title.trim()) return;
    
    createMutation.mutate({
      title: newQuestion.title,
      body: newQuestion.body,
      category: newQuestion.category || "General",
      author: {
        name: "Anonymous", // Replace with actual user data if auth is implemented
        email: "",
      },
    });
  }

  function upvote(id) {
    const userId = getUserId();
    upvoteMutation.mutate({ id, userId });
  }

  function markAnswered(id, expertName = "SocialBureau Expert") {
    answerMutation.mutate({ id, expert: expertName });
  }

  const categories = ["All", "General", "Meta", "Google", "Content", "API", "Tools", "Strategy"];

  const threads = questionsData?.data || [];
  const stats = statsData?.data || { threads: 0, experts: 12 };

  return (
    <>
    <div className="min-h-screen bg-black/55 text-gray-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* HERO */}
        <header className="bg-gradient-to-r from-sky-600 to-indigo-600 rounded-2xl p-8 shadow-xl">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">Live Knowledge Hub</h1>
              <h2 className="mt-2 text-xl font-semibold text-gray-100/90">Get Real Answers. From Real Experts. Instantly.</h2>
              <p className="mt-4 text-gray-100/80 max-w-2xl">
                Welcome to <strong>SocialBureau Q/A</strong>, the world’s first <em>API Marketing & Digital Strategy</em> Help Center built
                for agencies, freelancers, and global businesses. Ask questions, share marketing challenges, or learn from live
                discussions with our team and community members.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 items-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="rounded-full bg-white text-sky-700 px-4 py-2 font-semibold shadow hover:scale-[1.02] transition"
                >
                  Ask a Question
                </button>
                <button className="rounded-full border border-white/20 px-4 py-2 text-white/90">Join as Expert</button>
                <div className="ml-4 text-sm text-white/90">Explore past topics: Meta • Google • API • Content</div>
              </div>
            </div>

            <div className="hidden md:flex flex-col gap-4 items-end text-right">
              <div className="p-4 bg-white/10 rounded-lg">
                <div className="text-xs uppercase text-white/70">Community Stats</div>
                <div className="text-2xl font-bold">{stats.threads}+</div>
                <div className="text-sm text-white/70">Q/A threads answered</div>
              </div>
              <div className="p-4 bg-white/10 rounded-lg text-right">
                <div className="text-xs uppercase text-white/70">Experts</div>
                <div className="text-2xl font-bold">{stats.experts}</div>
                <div className="text-sm text-white/70">Certified contributors</div>
              </div>
            </div>
          </div>
        </header>

        {/* Controls */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex gap-2 items-center flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${category === c ? "bg-white text-sky-700" : "bg-white/5 text-white/90"}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex gap-3 items-center">
            <div className="relative flex-1 md:flex-none">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Q/A threads..."
                className="bg-white/5 placeholder-white/60 px-4 py-2 rounded-full w-full md:w-72 focus:outline-none"
              />
            </div>
            <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 text-white font-semibold whitespace-nowrap">Post</button>
          </div>
        </div>

        {/* Main layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live feed */}
          <main className="lg:col-span-2 space-y-4">
            <div className="bg-white/4 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Live Q/A Feed</h3>
                <div className="text-sm text-white/70">Real-time verified & community-reviewed</div>
              </div>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <div className="p-8 bg-white/5 rounded-xl text-center">Loading questions...</div>
              ) : threads.length === 0 ? (
                <div className="p-8 bg-white/5 rounded-xl text-center">No threads match your search.</div>
              ) : (
                threads.map((t) => (
                  <article key={t._id} className="bg-white/5 rounded-xl p-4 hover:shadow-lg transition">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center font-bold">{t.category?.[0] || "G"}</div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="text-lg font-semibold">{t.title}</h4>
                            <div className="text-sm text-white/70">{t.category} • {new Date(t.createdAt).toLocaleString()}</div>
                          </div>

                          <div className="text-right flex flex-row items-end gap-2">
                            <div className="text-sm">{t.votes} <FaThumbsUp /></div>
                            <div className="flex gap-2">
                              
                              {/* {!t.answered ? (
                                <button onClick={() => markAnswered(t._id)} className="px-2 py-1 bg-emerald-600 rounded text-sm">Mark answered</button>
                              ) : ( */}
                                {/* <div className="text-xs bg-white/6 px-2 py-1 rounded">Answered by <strong>{t.expert}</strong></div> */}
                              {/* )} */}
                            </div>
                          </div>
                        </div>

                        <p className="mt-3 text-white/80">{t.body}</p>

                        <div className="mt-3 flex items-center gap-3 text-sm text-white/70">
                          <button onClick={() => upvote(t._id)} className="px-2 py-1 bg-white/6 rounded-full"><FaThumbsUp /></button>
                          <div className="px-2 py-1 bg-white/5 rounded">#{t.category.toLowerCase()}</div>                          
                          <button className="px-2 py-1 bg-white/5 rounded">Share</button>
                          <button className="px-2 py-1 bg-white/5 rounded">Save</button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </main>

          {/* Right column: highlights + CTA */}
          <aside className="space-y-4">
            <div className="bg-white/4 rounded-xl p-4">
              <h4 className="font-semibold">Top Categories</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.slice(1).map((c) => (
                  <button key={c} onClick={() => setCategory(c)} className="px-3 py-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded">{c}</button>
                ))}
              </div>
            </div>

            <div className="bg-white/4 rounded-xl p-4">
              <h4 className="font-semibold">Featured Expert</h4>
              <div className="mt-3 flex items-center gap-4 transition-all duration-500">
                <img 
                  src={experts[currentExpert].image} 
                  alt={experts[currentExpert].name}
                  className="w-16 h-16 rounded-full "
                />
                <div>
                  <div className="font-semibold">{experts[currentExpert].name}</div>
                  <div className="text-sm text-white/70">{experts[currentExpert].title}</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-white/80">Answers verified by SocialBureau's internal specialists and certified partners.</p>
              <div className="mt-3 flex gap-2 justify-center">
                {experts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentExpert(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentExpert ? 'bg-indigo-500 w-6' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white/4 rounded-xl p-4">
              <h4 className="font-semibold">Guides</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li>• Integrate Meta API with CRM</li>
                <li>• Google Ads for Local SaaS</li>
                <li>• B2B Lead Gen Platforms (2025)</li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Footer CTA */}
        <div className="mt-10 bg-gradient-to-r from-white/3 to-white/5 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <div className="text-sm">Want to contribute answers?</div>
            <div className="text-xl font-bold">Join SocialBureau as an Expert Contributor</div>
          </div>
          <div>
            <button className="px-5 py-2 md:rounded-full rounded-md bg-white text-sky-700 font-semibold">Apply Now</button>
          </div>
        </div>
      </div>

      {/* Modal for posting a question */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsModalOpen(false)}></div>
          <form onSubmit={submitQuestion} className="relative z-10 w-full max-w-2xl bg-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Post a Question</h3>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <input
                value={newQuestion.title}
                onChange={(e) => setNewQuestion((s) => ({ ...s, title: e.target.value }))}
                placeholder="Short title (e.g. How to push Meta Ads events to CRM?)"
                className="px-4 py-2 rounded bg-gray-900"
              />
              <textarea
                value={newQuestion.body}
                onChange={(e) => setNewQuestion((s) => ({ ...s, body: e.target.value }))}
                placeholder="Describe your question in detail..."
                rows={6}
                className="px-4 py-2 rounded bg-gray-900"
              />
              <select
                value={newQuestion.category}
                onChange={(e) => setNewQuestion((s) => ({ ...s, category: e.target.value }))}
                className="px-4 py-2 rounded bg-gray-900"
              >
                <option>General</option>
                <option>Meta</option>
                <option>Google</option>
                <option>Content</option>
                <option>API</option>
                <option>Tools</option>
                <option>Strategy</option>
              </select>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded bg-white/5">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-emerald-600">Post Question</button>
            </div>
          </form>
        </div>
      )}
    </div>
    </>
  );
}


