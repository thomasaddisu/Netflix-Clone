import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const API_KEY = "f5dbc711dafb082ca6650b6bea42134a";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1`
        );
        // Filter to only movies and TV shows (exclude people, etc.)
        const filtered = res.data.results.filter(
          (item) => item.media_type === "movie" || item.media_type === "tv"
        );
        setResults(filtered);
      } catch (err) {
        console.error("Search failed:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const addToMyList = (item) => {
    const saved = JSON.parse(localStorage.getItem("netflixMyList") || "[]");
    if (!saved.find((s) => s.id === item.id)) {
      saved.push(item);
      localStorage.setItem("netflixMyList", JSON.stringify(saved));
      alert(`"${item.title || item.name}" added to My List!`);
    } else {
      alert(`"${item.title || item.name}" is already in your list.`);
    }
  };

  return (
    <div className="text-white min-h-screen pt-24 px-6 pb-16">
      {/* Header */}
      <div className="mb-8">
        {query ? (
          <>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              Search results for{" "}
              <span className="text-red-500">"{query}"</span>
            </h1>
            <p className="text-gray-400 text-sm">
              {loading
                ? "Searching..."
                : `${results.length} result${results.length !== 1 ? "s" : ""} found`}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Search</h1>
            <p className="text-gray-400 text-sm">
              Type something in the search bar to find movies and TV shows
            </p>
          </>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* No Results */}
      {!loading && query && results.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-16 text-center">
          <div className="text-6xl mb-6 opacity-30">🔍</div>
          <h2 className="text-xl font-semibold mb-3 text-gray-300">
            No results found
          </h2>
          <p className="text-gray-500 max-w-md mb-6">
            We couldn't find anything matching "{query}". Try a different
            search term.
          </p>
          <Link
            to="/"
            className="bg-red-600 text-white px-6 py-3 rounded font-semibold hover:bg-red-700 transition"
          >
            Back to Home
          </Link>
        </div>
      )}

      {/* Results Grid */}
      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {results.map((item) => {
            const posterUrl = item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : null;
            const displayTitle = item.title || item.name;
            const mediaLabel =
              item.media_type === "movie" ? "Movie" : "TV Show";
            const year = (
              item.release_date ||
              item.first_air_date ||
              ""
            ).slice(0, 4);

            if (!posterUrl) return null;

            return (
              <div
                key={item.id}
                className="relative group rounded-lg overflow-hidden shadow-lg cursor-pointer bg-neutral-900"
              >
                {/* Media type badge */}
                <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                  {mediaLabel}
                </span>

                <img
                  src={posterUrl}
                  alt={displayTitle}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <h3 className="text-white font-semibold text-sm truncate">
                    {displayTitle}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {item.vote_average > 0 && (
                      <span className="text-yellow-400 text-xs">
                        ⭐ {item.vote_average.toFixed(1)}
                      </span>
                    )}
                    {year && (
                      <span className="text-gray-400 text-xs">{year}</span>
                    )}
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    <a
                      className="bg-red-600 text-white hover:bg-red-800 py-1 px-2 rounded text-xs transition duration-200 hover:scale-105"
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(displayTitle)}+trailer`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Trailer
                    </a>
                    <button
                      onClick={() => addToMyList(item)}
                      className="bg-white/20 text-white hover:bg-white/40 py-1 px-2 rounded text-xs transition duration-200 hover:scale-105"
                    >
                      + List
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
