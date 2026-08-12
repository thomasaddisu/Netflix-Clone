import { useState, useEffect } from "react";
import axios from "axios";
import MovieRow from "../components/MovieRow";

const API_KEY = "f5dbc711dafb082ca6650b6bea42134a";

export default function TvShowsPage() {
  const [featuredShow, setFeaturedShow] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
      );
      const shows = res.data.results;
      setFeaturedShow(shows[Math.floor(Math.random() * shows.length)]);
    };
    fetchFeatured();
  }, []);

  const backdrop = featuredShow?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${featuredShow.backdrop_path}`
    : "";

  return (
    <div className="text-white">
      {/* Hero Section */}
      <div
        className="w-full h-[75vh] bg-cover bg-center flex items-end relative"
        style={{ backgroundImage: backdrop ? `url(${backdrop})` : "none" }}
      >
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

        {/* Content */}
        <div className="relative p-6 md:p-10 max-w-xl z-10">
          <span className="text-red-500 text-sm font-semibold tracking-widest uppercase mb-2 inline-block">
            TV Shows
          </span>
          {featuredShow && (
            <>
              <h1 className="text-3xl md:text-5xl font-bold mb-3">
                {featuredShow.name}
              </h1>
              <p className="text-sm md:text-base text-gray-300 line-clamp-3 mb-4">
                {featuredShow.overview}
              </p>
              <div className="flex gap-3">
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(featuredShow.name)}+trailer`}
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
          title="Popular TV Shows"
          fetchUrl="https://api.themoviedb.org/3/tv/popular"
        />
        <MovieRow
          title="Top Rated TV Shows"
          fetchUrl="https://api.themoviedb.org/3/tv/top_rated"
        />
        <MovieRow
          title="Airing Today"
          fetchUrl="https://api.themoviedb.org/3/tv/airing_today"
        />
        <MovieRow
          title="On The Air"
          fetchUrl="https://api.themoviedb.org/3/tv/on_the_air"
        />
      </div>
    </div>
  );
}
