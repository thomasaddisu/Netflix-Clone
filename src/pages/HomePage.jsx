import HeroBanner from "../components/HeroBanner";
import { useState, useEffect } from "react";
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

    </div>
  );
}
