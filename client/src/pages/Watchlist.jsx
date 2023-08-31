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
        <h1>Movie List</h1>
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
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              {movie.watchlist ? (
                <button
                  style={{
                    position: "absolute",
                    backgroundColor: "red",
                    bottom: 2,
                    left: 0,
                    width: "100%",
                  }}
                  onClick={() => dispatch(removeMovie(movie.id))}
                >
                  Remove From Watchlist
                </button>
              ) : (
                <button
                  style={{
                    position: "absolute",
                    bottom: 2,
                    left: 0,
                    width: "100%",
                  }}
                >
                  Add to Watchlist
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
