import { useState, useEffect } from "react";

export default function MyListPage() {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("netflixMyList");
    if (saved) {
      setMyList(JSON.parse(saved));
    }
  }, []);

  const removeFromList = (id) => {
    const updated = myList.filter((item) => item.id !== id);
    setMyList(updated);
    localStorage.setItem("netflixMyList", JSON.stringify(updated));
  };

  return (
    <div className="text-white min-h-screen pt-24 px-6 pb-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">My List</h1>
      <p className="text-gray-400 mb-8">
        Movies and TV shows you've saved to watch later
      </p>

      {myList.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <div className="text-6xl mb-6 opacity-30">🎬</div>
          <h2 className="text-2xl font-semibold mb-3 text-gray-300">
            Your list is empty
          </h2>
          <p className="text-gray-500 max-w-md mb-6">
            Browse movies and TV shows, then add them to your list to watch
            later. Your saved items will appear here.
          </p>
          <a
            href="/"
            className="bg-red-600 text-white px-6 py-3 rounded font-semibold hover:bg-red-700 transition"
          >
            Browse Content
          </a>
        </div>
      ) : (
        /* Saved Items Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {myList.map((item) => {
            const posterUrl = item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image";

            return (
              <div
                key={item.id}
                className="relative group rounded-lg overflow-hidden shadow-lg cursor-pointer"
              >
                <img
                  src={posterUrl}
                  alt={item.title || item.name}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <h3 className="text-white font-semibold text-sm truncate">
                    {item.title || item.name}
                  </h3>
                  {item.vote_average && (
                    <span className="text-yellow-400 text-xs mt-1">
                      ⭐ {item.vote_average.toFixed(1)}
                    </span>
                  )}
                  <button
                    onClick={() => removeFromList(item.id)}
                    className="bg-red-600 text-white text-xs px-3 py-1.5 rounded mt-2 hover:bg-red-800 transition font-medium"
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
