import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import { Route, Routes } from "react-router";
import HeroBanner from "./components/HeroBanner";
import Home from "./pages/HomePage";
function App() {
  // const api_key = "f5dbc711dafb082ca6650b6bea42134a";
  const API_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=f5dbc711dafb082ca6650b6bea42134a`;
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    // const respose = axios.get(API_URL);
    // console.log(respose)

    const featchData = async () => {
      const respose = await axios.get(API_URL);
      // console.log(respose.data.results);
      setMovies(respose.data.results);

      console.log(`respose`, respose);
    };
    featchData();
  }, []);

  if (!movies) {
    return <>Loading...</>;
  }
  return (
    <>
      <div
        className="w-full min-h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movies[0].backdrop_path})` }}
    
        
      >
        <Navbar  />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/tv-shows" element={<>Tv shows</>} />
          <Route path="/movies" element={<>movies</>} />
          <Route path="/new-and-popular" element={<>new and popular</>} />
          <Route path="/my-list" element={<>My List</>} />

        </Routes>
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 justify-items-center">
          {movies.map(movie=>(
            <MovieCard key={movie.id} movie={movie}/>
          ))}
        </div>

        {/* < MovieCard key={movies[0].id} movie={movies[0]}/> */}
        <Home />
      </div>

    </>
  );
}

export default App;
