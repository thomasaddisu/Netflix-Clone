import { useState, useEffect } from "react";
import axios from "axios";
import MovieRow from "../components/MovieRow";

const API_KEY = "f5dbc711dafb082ca6650b6bea42134a";

export default function NewAndPopularPage() {
  const [featuredItem, setFeaturedItem] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
      );
      const items = res.data.results;
      setFeaturedItem(items[Math.floor(Math.random() * items.length)]);
    };
    fetchFeatured();
  }, []);

  const backdrop = featuredItem?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${featuredItem.backdrop_path}`
    : "";

  const displayTitle = featuredItem?.title || featuredItem?.name || "";

  return (
    <div className="text-white">
      {/* Hero Section */}
      <div
        className="w-full h-[75vh] bg-cover bg-center flex items-end relative"
        style={{ backgroundImage: backdrop ? `url(${backdrop})` : "none" }}
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

        <div className="relative p-6 md:p-10 max-w-xl z-10">
          <span className="text-red-500 text-sm font-semibold tracking-widest uppercase mb-2 inline-block">
            🔥 New &amp; Popular
          </span>
          {featuredItem && (
            <>
              <h1 className="text-3xl md:text-5xl font-bold mb-3">
                {displayTitle}
              </h1>
              <p className="text-sm md:text-base text-gray-300 line-clamp-3 mb-4">
                {featuredItem.overview}
              </p>
              <div className="flex gap-3">
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(displayTitle)}+trailer`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-red-600 text-white px-5 py-2 rounded font-semibold hover:bg-red-800 transition">
                    ▶ Trailer
                  </button>
                </a>
                <button className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded font-semibold hover:bg-white/30 transition">
                  More Info
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content Rows */}
      <div className="px-6 space-y-8 mt-10 pb-16">
        <MovieRow
          title="🔥 Trending Today"
          fetchUrl="https://api.themoviedb.org/3/trending/movie/day"
        />
        <MovieRow
          title="📈 Trending This Week"
          fetchUrl="https://api.themoviedb.org/3/trending/movie/week"
        />
        <MovieRow
          title="🎬 Upcoming Movies"
          fetchUrl="https://api.themoviedb.org/3/movie/upcoming"
        />
        <MovieRow
          title="📺 Popular TV Shows"
          fetchUrl="https://api.themoviedb.org/3/tv/popular"
        />
      </div>
    </div>
  );
}
