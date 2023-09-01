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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">

      <div className="navbar-buttons">
        <Link to="/" className="learn_button">
          HOME
        </Link>
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
              placeholder="Search movies..."
              style={{ textAlign: "center", "::placeholder": { textAlign: "center" } }}
            />
          </form>

        {/* Hamburger menu icon for smaller screens */}
            <div className="hamburger-icon" onClick={toggleMenu}>
              <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
              <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
              <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
            </div>

            {/* Menu items */}
            <div className={`navbar-buttons ${isMenuOpen ? 'show' : ''}`}>
              {/* ... Your navigation links */}
            </div>
      </div>
    </nav>
  );
};

export default Navbar;
