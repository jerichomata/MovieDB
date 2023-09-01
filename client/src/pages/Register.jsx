import '../css/form.css';

import React, { useState } from "react";
import { useCookies } from "react-cookie";
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

    // Sending registration request
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

    // Define function for setting cookies
    const setNewCookie = (cookieValue) => {
      setCookie("token", cookieValue, { path: "/" });
    };

    // Handling successful registration response
    if (response.ok) {
      localStorage.setItem("token", response.token);
      const data = await response.json();
      setNewCookie(data.token);
      window.location.replace("/");
    }
  };

  return (
    <div className="form-container">
      <h2 style={{ fontSize: 40, marginBottom: 30, textAlign: "center" }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="the-form">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="the-form">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="the-form">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            placeholder='Re enter your password'
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
