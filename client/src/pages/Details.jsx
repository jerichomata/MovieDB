import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function Details() {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const { id } = params;

  const getDetails = async () => {
    const response = await fetch(`/api/movie/${id}`);
    const data = await response.json();
    setMovie(data);
  };
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div></div>
    </div>
  );
}
