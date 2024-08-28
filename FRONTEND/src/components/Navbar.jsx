  import React, { useState, useEffect } from "react";
  import "../styles/global.css";
  import { Link } from "react-router-dom";
  import axios from "axios";

  const NavBar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/auth/profile", {
            withCredentials: true,
          });
          console.log(response.data);
          setUser(response.data);
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      };
      fetchUserProfile();
    }, []);

    return (
      <div className="homepage-navbar">
        <div className="navbar-left">
          <ul>
            <li>
              <Link to="/">Home</Link>
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
          {user ? (
            <div className="user-profile">
              <img
                src={`http://localhost:3000${user.profilePicture}`}
                alt="Profile"
                className="profile-picture"
              />
              <span>{user.email}</span>
            </div>
          ) : (
            <ul className="auth-links">
              <li className="login">
                <Link to="/login">Log In</Link>
              </li>
              <li className="signup">
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  };

  export default NavBar;
