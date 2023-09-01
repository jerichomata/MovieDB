import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMovie } from "../store/movieSlice/movieSlice";
export default function Searched() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [totalMovies, setTotalMovies] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const params = useParams();
  const [movies, setMovies] = useState([]);
  const { movie } = params;

  const getMovies = async () => {
    setLoading(true);
    const response = await fetch(`/api/search/${movie}`);
    const data = await response.json();
    console.log(data);
    setMovies(data.results);
    setTotalMovies(data.total_results);
    setTotalPages(data.total_pages);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  const addToFav = (id, movie) => {
    dispatch(setMovie(movie));
    setMovies((prevData) => {
      const newData = prevData.map((obj) => {
        if (obj.id === id) {
          return { ...obj, favourite: true };
        }
        return obj;
      });

      return newData;
    });
  };
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <div className="home-page">
        <h1 className="main_heading">SEARCH RESULTS FOR {movie}</h1>
        <div className="searched-movie-list">
          {movies.map((movie, index) => (
            <div
              to={`/movie/${movie.id}`}
              style={{ position: "relative" }}
              key={index}
              className="movie-card"
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
                  alt={movie.title}
                />
                <div className="searched-movie-details">
                <h2>{movie.title}</h2>
                <p>{movie.release_date}</p>
                <p>{movie.overview.length > 100
                    ? movie.overview.slice(0, 100) + "..."
                    : movie.overview}</p>
                </div>
              </Link>
              {movie.favourite ? (
                <span
                  onClick={() => getMovies()}
                  className="material-symbols-outlined favourite_icon favourited"
                >
                  playlist_add_check
                </span>
              ) : (
                <span
                  onClick={() => addToFav(movie.id, movie)}
                  className="material-symbols-outlined favourite_icon"
                >
                  favorite
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ fontSize: "14px", marginRight: "10px" }}>
            Total Results: {totalMovies}
          </p>
          <p style={{ fontSize: "14px" }}>
            Total Pages: {totalPages}
          </p>
        </div>
        <div className="pagination_container">
          <button
            className="pagination_btns"
            onClick={async () => {
              setLoading(true);
              setCurrentPage(currentPage === 0 ? 0 : currentPage - 1);
              await getMovies();
              setLoading(false);
            }}
          >
            <span className="material-symbols-outlined">navigate_before</span>
          </button>

          <span>{currentPage}</span>
          <button
            className="pagination_btns"
            onClick={async () => {
              setLoading(true);
              setCurrentPage(currentPage + 1);
              await getMovies();
              setLoading(false);
            }}
          >
            <span className="material-symbols-outlined">navigate_next</span>
          </button>
        </div>
      </div>
    </div>
  );
}