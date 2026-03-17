import HeroBanner from "../components/HeroBanner";
import { useState, useEffect } from "react";
import MovieRow from "../components/MovieRow";
export default function HomePage({movies}) {
     const [randomMovie, setRandomMovie] = useState(null);

  useEffect(() => {
    if (movies && movies.length > 0) {
      const movie = movies[Math.floor(Math.random() * movies.length)];
      setRandomMovie(movie);
    }
  }, []);
  return (
    <div className="text-white text-3xl">
      
      <HeroBanner randomMovie={randomMovie}/>
        <div className="px-6 space-y-8 mt-10">
        <MovieRow
          title="Trending Now"
          fetchUrl="https://api.themoviedb.org/3/trending/movie/day"
        />

        <MovieRow
          title="Top Rated"
          fetchUrl="https://api.themoviedb.org/3/movie/top_rated"
        />

        <MovieRow
          title="Popular Movies"
          fetchUrl="https://api.themoviedb.org/3/movie/popular"
        />
      </div>
    </div>
  );
}
