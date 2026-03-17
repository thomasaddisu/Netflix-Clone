import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import "./MovieRow.css";

function MovieRow({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  const API_KEY = "f5dbc711dafb082ca6650b6bea42134a";

  useEffect(()=>{
    const getMovies = async () => {
      const respose =await axios.get(`${fetchUrl}?api_key=${API_KEY}`);
      // console.log(title,respose.data);
      setMovies(respose.data.results)

    }

    getMovies();
  },[])



  return (
    <div className="text-white">
      {/* Row Title */}
      <h2 className="text-xl font-semibold mb-3">{title}</h2>

      {/* Horizontal Scroll Container */}
      <div className="movie-row flex gap-3  overflow-x-scroll scrollbar-hide pb-3 scroll-smooth">
        {movies && movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieRow;