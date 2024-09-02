import React, { useState } from "react";
import axios from "axios";
import "../styles/global.css";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formValues);
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formValues,
        { withCredentials: true }
      );
      alert(response.data.message);
      onLogin(response.data.token);
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error("Error in handleSubmit in Login: ", err);
      alert(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="login-outer-container">
      <div className="login-container">
        <div className="login-left">
          <div className="login-left-content">
            <h1>Welcome back to Station Sathi</h1>
            <p className="login-description">Connecting people..</p>
          </div>
        </div>
        <div className="login-right">
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="login-input"
            />

            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="login-input"
            />

            <button type="submit" className="login-button">
              Sign In
            </button>

            <Link to="/signup" id="loginpage-signup-link">
              {" "}
              Don't have an account?{" "}
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
