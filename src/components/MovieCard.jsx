function MovieCard({ movie }) {
  // Construct full image URL from TMDb poster path
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const addToMyList = (e) => {
    e.stopPropagation();
    const saved = JSON.parse(localStorage.getItem("netflixMyList") || "[]");
    if (!saved.find((item) => item.id === movie.id)) {
      saved.push(movie);
      localStorage.setItem("netflixMyList", JSON.stringify(saved));
      alert(`"${movie.title || movie.name}" added to My List!`);
    } else {
      alert(`"${movie.title || movie.name}" is already in your list.`);
    }
  };

  return (
    <div className="mt-9 shrink-0 relative w-44 sm:w-48 lg:w-52 cursor-pointer group overflow-hidden rounded-lg shadow-lg">
      
      {/* Poster Image */}
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
      />

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2">
        <h3 className="text-white font-semibold text-sm truncate">{movie.title || movie.name}</h3>
        {movie.vote_average && (
          <span className="text-yellow-400 text-xs mt-1">
            ⭐ {movie.vote_average.toFixed(1)}
          </span>
        )}
        <div className="flex gap-1.5 mt-2">
          <a className="bg-red-600 text-white hover:bg-red-800 py-1 px-2 rounded inline-block text-xs transform transition duration-200 hover:scale-105" 
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title || movie.name)}+trailer`} target="_blank" rel="noopener noreferrer">
          Trailer
        </a>
        <button
          onClick={addToMyList}
          className="bg-white/20 text-white hover:bg-white/40 py-1 px-2 rounded text-xs transition duration-200 hover:scale-105"
        >
          + List
        </button>
        </div>
      </div>
     
    </div>
  );
}

export default MovieCard;