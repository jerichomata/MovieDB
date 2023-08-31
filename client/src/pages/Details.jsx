import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function Details() {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const { id } = params;
  const [backgroundUrl, setBackgroundUrl] = useState("");

  const getDetails = async () => {
    const response = await fetch(`/api/movie/${id}`);
    const data = await response.json();
    console.log(data);
    setMovie(data);
    setBackgroundUrl(`https://image.tmdb.org/t/p/w500${data?.poster_path}`);
  };
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        background: "none",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backgroundUrl})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

          backgroundSize: "cover",
          filter: "blur(5px)", // Apply blur filter
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
      <div className="movie_detail">
        <div className="movie_detail__poster">
          <img
            src={backgroundUrl}
            height={400}
            width={400}
            className="detail_Poster"
          />
          <div className="detail_container">
            <p className="detail_item">Status : {movie?.status}</p>
            <p className="detail_item">
              Duration <span class="material-symbols-outlined">schedule</span> :
              {movie?.runtime}min
            </p>
            <p className="detail_item">
              Vote Count <span class="material-symbols-outlined">thumb_up</span>{" "}
              :{movie?.vote_count}
            </p>
          </div>
        </div>
        <div className="movie_Desc">
          <h1 className="main_heading">{movie?.title}</h1>
          <p className="movie_Desc__overview">{movie?.overview}</p>
          <div className="generes">
            Generes :
            {movie?.genres.map((genre) => (
              <span className="movie_Desc__genre">{genre.name},</span>
            ))}
          </div>
          <a className="more_btn" href={movie?.homepage} target="_blank">
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
