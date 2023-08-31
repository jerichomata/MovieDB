import React, { useEffect, useState } from "react";
import "./navbar.css";
// import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, []);
  return (
    <nav className="navbar">
      {/* <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div> */}
      <div className="navbar-buttons">
        <Link to="/" className="navbar-button">
          Home
        </Link>
        <Link to="/watchlist" className="navbar-button">
          Watchlist
        </Link>
        {!loggedIn ? (
          <>
            <Link to="/login" className="navbar-button">
              Login
            </Link>
            <Link to="/register" className="navbar-button">
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            className="navbar-button"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
