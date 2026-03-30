import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";

const Partnership = () => {
  // Sample portfolio data
  const portfolioData = [
    {
      id: 1,
      title: "SIVAPRASAD",
      category: "Media",
      status: "Completed",
      image: "/assets/home/Siva Prasad.jpg",
      link: "/partnership/Sivaprasad",
      subtitle: "Media Entrepreneur · Visionary Leader · Industry Pioneer",
      day: "ENTREPRENEUR",
      month: "VISIONARY LEADER",
      year: "2026",
    },
    {
      id: 2,
      title: "RANJIT",
      category: "Photography",
      status: "Completed",
      image:
        "https://res.cloudinary.com/dtwcgfmar/image/upload/v1769774256/IMG-20251226-WA0002_ch9qzi.jpg",
      link: "/partnership/Ranjit",
      subtitle: "Capturing moments through lenses",
      day: "COPYWRITER",
      month: "CONTENT WRITER",
      year: "2025",
    },
    {
      id: 3,
      title: "JIGNESH RANA",
      category: "Marketing",
      status: "Completed",
      image:
        "https://res.cloudinary.com/dtwcgfmar/image/upload/v1774880077/copy_of_image-gen_18_qt9ikl_8b856d.webp",
      link: "https://www.jigneshrana.com",
      subtitle: "Digital Entrepreneur · Marketing Expert · Media Architect",
      day: "ENTREPRENEUR",
      month: "MARKETING EXPERT",
      year: "2026",
    },
  ];

  //state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveHeroIndex((prev) =>
        prev === portfolioData.length - 1 ? 0 : prev + 1,
      );
    }, 4000); // 4s per slide

    return () => clearInterval(interval);
  }, [isPlaying, portfolioData.length]);

  const itemsPerPage = 8;

  const categories = [
    "All",
    "Design",
    "Development",
    "Photography",
    "Video",
    "Marketing",
    "Media",
  ];
  const activeHeroItem = portfolioData[activeHeroIndex];
  // Filter logic
  const filteredData = useMemo(() => {
    return portfolioData.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleCardClick = (item) => {
    // Navigate immediately without animation
    window.location.href = item.link;
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchTerm("");
    setCurrentPage(1);
  };

  const getStatusColor = (status) => {
    return status === "Completed"
      ? "from-lime-300 to-emerald-400"
      : "from-cyan-300 to-blue-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 text-white">
      {/* HERO SECTION - Fashion Exhibition Style */}
      <section className="relative min-h-screen md:h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-transparent to-gray-800 z-10"></div>
          <img
            key={activeHeroItem.id}
            src={activeHeroItem.image}
            alt={activeHeroItem.title}
            className="w-full h-full object-cover opacity-40 transition-all duration-700"
          />
        </div>

        {/* Navigation Bar */}
        <nav className="absolute top-0 left-0 right-0 z-30 p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-lime-300"></div>
            <span className="text-lime-300 text-xs font-bold tracking-widest">
              — PORTFOLIO
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-8 text-sm font-medium">
            <a href="/about" className="hover:text-lime-300 transition">
              Visit Us
            </a>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-20 w-full">
          <div className="max-w-7xl mx-auto">
            {/* Left Column - Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6 md:space-y-8">
                {/* Number Badge */}
                <div className="inline-block">
                  <div className="bg-lime-300 text-gray-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black px-4 sm:px-6 py-2 sm:py-3 inline-block">
                    {String(activeHeroIndex + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Subtitle */}
                <div className="text-xs sm:text-sm text-gray-400 tracking-wide">
                  {activeHeroItem.subtitle}
                </div>

                {/* Main Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
                  {activeHeroItem.title}
                </h1>
              </div>

              {/* Right Column - Responsive */}
              <div className="flex flex-col items-start lg:items-end space-y-6 md:space-y-8">
                {/* Big Title */}
                <div className="w-full lg:text-right">
                  <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-lime-300 leading-tight break-words">
                    OUR PARTNERS
                  </h2>
                </div>

                {/* Right Info */}
                <div className="lg:text-right space-y-3 md:space-y-4">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-lime-300">
                    {activeHeroItem.year}
                  </div>

                  <div className="text-xs sm:text-sm text-gray-400">
                    {activeHeroItem.month} — {activeHeroItem.day}
                  </div>

                  <div className="text-xs text-gray-500">
                    {activeHeroItem.category}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Controls - Responsive */}
        <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Play Button */}
            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition flex-shrink-0"
            >
              {isPlaying ? (
                <div className="flex gap-1">
                  <div className="w-2 h-5 sm:h-6 bg-white rounded"></div>
                  <div className="w-2 h-5 sm:h-6 bg-white rounded"></div>
                </div>
              ) : (
                <div className="w-0 h-0 border-l-6 sm:border-l-8 border-l-white border-t-4 sm:border-t-5 border-t-transparent border-b-4 sm:border-b-5 border-b-transparent ml-1"></div>
              )}
            </button>

            {/* Progress Bar */}
            <div className="flex-1 hidden sm:block mx-4 md:mx-6">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-400 to-pink-300 rounded-full transition-all duration-300"
                  style={{
                    width: `${((activeHeroIndex + 1) / portfolioData.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION WITH PATTERN */}
      <section className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black py-16 sm:py-20 px-4 sm:px-6 md:px-8 overflow-hidden">
        {/* Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="pattern"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
              >
                <path
                  d="M0 0h40v40H0z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <circle cx="20" cy="20" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#pattern)"
              stroke="currentColor"
              className="text-lime-300"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2">
                  Featured{" "}
                  <span className="bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text text-transparent">
                    Partners
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-gray-400">
                  Explore amazing projects from talented creators
                </p>
              </div>
              <div className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                Showing {paginatedData.length} of {filteredData.length}
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-3 sm:top-3.5 text-lime-400 w-4 sm:w-5 h-4 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 sm:pl-12 pr-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-transparent transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${selectedCategory === cat
                    ? "bg-gradient-to-r from-lime-300 to-emerald-400 text-gray-900"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                    }`}
                >
                  {cat}
                </button>
              ))}
              {(selectedCategory !== "All" || searchTerm) && (
                <button
                  onClick={resetFilters}
                  className="ml-auto flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm text-gray-400 hover:text-lime-300 hover:bg-gray-800 transition-all flex-shrink-0"
                >
                  <X className="w-3 sm:w-4 h-3 sm:h-4" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Portfolio Grid */}
          {paginatedData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {paginatedData.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className="group relative overflow-hidden rounded-lg sm:rounded-2xl bg-gray-800 border border-gray-700 hover:border-lime-300 cursor-pointer transition-all duration-300 h-56 sm:h-64 hover:shadow-2xl hover:shadow-lime-300/30 animate-fadeIn"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Image Container */}
                  <div className="relative h-full overflow-hidden bg-gray-700">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={
                        item.id === 3
                          ? "w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                          : "w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                      }
                      style={item.id === 3 ? { objectPosition: "center 65%" } : {}}
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                    {/* Category Badge */}
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
                      <span
                        className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold text-black bg-gradient-to-r ${getStatusColor(item.status)} shadow-lg`}
                      >
                        {item.category}
                      </span>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                      <h3 className="text-base sm:text-lg font-black text-white mb-1 sm:mb-2 line-clamp-2 group-hover:text-lime-300 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <div className="text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 sm:gap-2">
                        <span>View</span>
                        <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <p className="text-gray-400 text-base sm:text-lg mb-4">
                No projects found matching your criteria.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-lime-300 to-emerald-400 hover:from-lime-400 hover:to-emerald-500 text-gray-900 font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 border-t border-gray-700 pt-6 sm:pt-8">
              <div className="text-gray-500 text-xs sm:text-sm">
                Showing page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center justify-center sm:justify-end gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 transition-all border border-gray-700 hover:border-gray-600"
                >
                  <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium transition-all ${currentPage === page
                          ? "bg-gradient-to-r from-lime-300 to-emerald-400 text-gray-900"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                          }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 transition-all border border-gray-700 hover:border-gray-600"
                >
                  <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
            opacity: 0;
          }

          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>
    </div>
  );
};

export default Partnership;