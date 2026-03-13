export default function HeroBanner({ randomMovie }) {
  console.log(randomMovie);
  if (!randomMovie) {
    return <div>Loading...</div>;
  }

  const backdrop = `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`;

  return (
    <div
      className=" w-full h-[85vh] bg-cover bg-center flex items end "
      style={{ backgroundImage: `url(${backdrop})` }}
    >
      <div className="relative w-full h-full flex items-end">
        {/* TOP RED FADE */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-600 to-transparent"></div>

        {/* BOTTOM DARK FADE */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

        {/* CONTENT */}
        <div className="relative p-6 md:p-10 max-w-xl text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {randomMovie.title}
          </h1>

          <p className="text-sm md:text-base text-gray-300 line-clamp-3 mb-4">
            {randomMovie.overview}
          </p>

          <div className="flex gap-3">
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(randomMovie.title)}+trailer`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-red-600 text-white px-5 py-2 rounded font-semibold hover:bg-red-800">
                ▶ Trailer
              </button>
            </a>

            <button className="bg-red-600 px-5 py-2 rounded font-semibold hover:bg-red-500">
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
