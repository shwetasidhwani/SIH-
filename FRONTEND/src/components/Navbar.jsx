import React, { useState, useEffect } from "react";
import "../styles/global.css";
const NavBar = () => {
  return (
    <div className="homepage-navbar">
      <ul>
        <li>
          <a href="#">Home</a>
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

      <ul className="auth-links">
        <li className="login">
          <a href="#">Log In</a>
        </li>
        <li className="signup">
          <a href="#">Sign Up</a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
