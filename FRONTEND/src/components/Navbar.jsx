import React from "react";
import "../styles/global.css";
import {Link} from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="homepage-navbar">
      <div className="navbar-left">
        <ul>
          <li>
            <Link to = "/">Home</Link>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Services</a>
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
            <Link to = "/login">Log In</Link>
          </li>
          <li className="signup">
            <Link to = "/signup">Sign Up</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
