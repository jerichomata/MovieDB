import React, { useState } from "react";
import { useCookies } from "react-cookie";
// Make sure to import your CSS file

import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const setNewCookie = (cookieValue) => {};

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.replace("/");

      setNewCookie(data.token);
    }
  };

  return (
    <div className="register-form">
      <h2 style={{ marginBottom: 50, textAlign: "center" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
