import '../css/navbar.css';

import React, { useEffect, useState } from "react";
// import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false); // State for search visibility
  const [search, setSearch] = useState("");
  const getMovies = () => {
    navigate(`/search/${search}`);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, []);

  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <nav className="navbar">
      {/* <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div> */}
      <div className="navbar-buttons">
        <Link to="/" className="learn_button">
          HOME
        </Link>
        {/* <Link to="/watchlist" className="learn_button">
          WATCHLIST
        </Link> */}
        {/* Search Icon */}

        {!loggedIn ? (
            <>
              <Link to="/login" className="learn_button">
                LOGIN
              </Link>
              <Link to="/register" className="learn_button">
                REGISTER
              </Link>
            </>
          ) : (
            <>
              <Link to="/watchlist" className="learn_button">
                WATCHLIST
              </Link>
              <Link
                as="button"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
                className="learn_button"
              >
                LOGOUT
              </Link>
            </>
          )}

      </div>
      
      {/* seach function */ }
      <div className="search_container">
        {/* {searchVisible && ( */}
          <form onSubmit={getMovies}>
            <input
              className="search_bar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search Movies..."
            />
          </form>
        {/* )} */}
        {/* {!searchVisible ? (
          <span
            onClick={toggleSearchBar}
            className="material-symbols-outlined icon"
          >
            search
          </span>
        ) : (
          <span
            onClick={toggleSearchBar}
            className="material-symbols-outlined icon"
          >
            cancel
          </span>
        )} */}

        {/* Conditional Search Bar */}
      </div>
    </nav>
  );
};

export default Navbar;
