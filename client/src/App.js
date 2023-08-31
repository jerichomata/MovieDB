import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import Register from "./pages/Register";

import Login from "./pages/Login";
import { useEffect } from "react";
function App() {
  const loggedIn = localStorage.getItem("token");
  useEffect(() => {
    console.log("loggedIn", loggedIn);
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={loggedIn ? <Home /> : <Navigate replace to={"/login"} />}
      />
      <Route
        path="/watchlist"
        element={loggedIn ? <Watchlist /> : <Navigate replace to="/login" />}
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
