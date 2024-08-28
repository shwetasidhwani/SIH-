import React from "react";
import "../styles/global.css";

const NavBar = () => {
  return (
    <div className="homepage-navbar">
      <div className="navbar-left">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
      <div className="navbar-center">
        <a href="#" className="website-name">
          StationSathi
        </a>
      </div>
      <div className="navbar-right">
        <ul className="auth-links">
          <li className="login">
            <a href="#">Log In</a>
          </li>
          <li className="signup">
            <a href="#">Sign Up</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
