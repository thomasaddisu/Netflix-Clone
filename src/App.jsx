import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import TvShowsPage from "./pages/TvShowsPage";
import MoviesPage from "./pages/MoviesPage";
import NewAndPopularPage from "./pages/NewAndPopularPage";
import MyListPage from "./pages/MyListPage";
import SearchPage from "./pages/SearchPage";
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
          <Route path="/" element={<HomePage movies={movies}/>} />
          <Route path="/tv-shows" element={<TvShowsPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/new-and-popular" element={<NewAndPopularPage />} />
          <Route path="/my-list" element={<MyListPage />} />
          <Route path="/search" element={<SearchPage />} />

        </Routes>

      </div>

    </>
  );
}

export default App;
