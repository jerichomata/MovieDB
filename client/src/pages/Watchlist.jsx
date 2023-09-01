import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeMovie } from "../store/movieSlice/movieSlice";
export default function Watchlist() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movie);

  return (
    <div>
      <div className="home-page">
        <h1 className="main_heading">WATCHLIST</h1>
        <div className="movie-list">
          {movies.map((movie, index) => (
            <div
              style={{ position: "relative" }}
              key={index}
              className="movie-card"
            >
              <img
                src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
                alt={movie.title}
              />
              <h2 style={
                  {
                    fontSize: movie.title.length > 23 ? "14px" : "20px",
                    position:"absolute",
                    bottom:10
                  }
                }>{movie.title}</h2>
              {/* <p>{movie.overview.length > 100
                    ? movie.overview.slice(0, 100) + "..."
                    : movie.overview}</p> */}
              {movie.watchlist ? (
                <span
                onClick={() => dispatch(removeMovie(movie.id))}
                className="material-symbols-outlined favourite_icon favourited"
              >
                playlist_add_check
              </span>
              ) : (
                <button
                  style={{
                    position: "absolute",
                    bottom: 2,
                    left: 0,
                    width: "100%",
                  }}
                >
                  Add to Watch List
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
