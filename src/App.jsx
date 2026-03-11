import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Navbar from "./components/Navbar";

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
        className="w-full min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movies[Math.random().toFixed(1)* movies.length].backdrop_path})` }}
    
        
      >
        <Navbar />
      </div>
    </>
  );
}

export default App;
