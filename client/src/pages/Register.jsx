import React, { useState } from "react";
import { useCookies } from "react-cookie";
// Make sure to import your CSS file

import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

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
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const setNewCookie = (cookieValue) => {
      setCookie("token", cookieValue, { path: "/" });
    };
    if (response.ok) {
      localStorage.setItem("token", response.token);
      const data = await response.json();
      setNewCookie(data.token);
      window.location.replace("/");
    }
  };

  return (
    <div className="register-form">
      <h2 style={{ marginBottom: 50, textAlign: "center" }}>Register</h2>
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
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
