import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
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
          <Route path="/tv-shows" element={<>Tv shows</>} />
          <Route path="/movies" element={<>movies</>} />
          <Route path="/new-and-popular" element={<>new and popular</>} />
          <Route path="/my-list" element={<>My List</>} />

        </Routes>

      </div>

    </>
  );
}

export default App;
