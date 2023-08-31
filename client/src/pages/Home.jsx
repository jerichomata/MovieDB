import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMovie } from "../store/movieSlice/movieSlice";
export default function Home() {
  const dispatch = useDispatch();
  const [totalMovies, setTotalMovies] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const getMovies = useCallback(async () => {
    const response = await fetch(`/api/movies?page=${currentPage}`);
    const data = await response.json();
    setTotalMovies(data.total_results);
    setTotalPages(data.total_pages);
    setMovies(data.results);
    setLoading(false);
  });
  useEffect(() => {
    getMovies();
  }, []);

  const addToWatchlist = (id, movie) => {
    dispatch(setMovie(movie));
    setMovies((prevData) => {
      const newData = prevData.map((obj) => {
        if (obj.id === id) {
          return { ...obj, watchlist: true };
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
                  onClick={() => getMovies()}
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
                  onClick={() => addToWatchlist(movie.id, movie)}
                >
                  Add to Watchlist
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <div>
          <p> Total Results : {totalMovies}</p>
          <p> Total Pages : {totalPages}</p>
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
