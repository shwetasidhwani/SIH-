import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserCircle } from "lucide-react";
import "./Navbar.css";
const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/profile", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    fetchUserProfile();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/auth/logout", { withCredentials: true });
      setUser(null); // Clear user state
      alert(response.data.message);
    } catch (err) {
      console.error("Error logging out:", err);
      alert(response.data.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="brand">
            <Link to="/" className="brand-link">
              <span className="brand-text">
                Stationसाथी
                <span className="underline"></span>
              </span>
            </Link>
          </div>
          <div className="links desktop-only">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/inventory" className="nav-link">Inventory</Link>
            <Link to="/cart" className="nav-link">Cart</Link>
          </div>
          <div className="user-actions desktop-only">
            {user ? (
              <div className="user-info">
                {user.profilePicture ? (
                  <img
                    src={`http://localhost:3000${user.profilePicture}`}
                    alt="Profile"
                    className="profile-pic"
                  />
                ) : (
                  <UserCircle size={32} className="profile-icon" />
                )}
                <button onClick={handleLogout} className="logout-btn">Log Out</button>
              </div>
            ) : (
              <ul className="auth-links">
                <li>
                  <Link to="/login" className="auth-link">Log In</Link>
                </li>
                <li>
                  <Link to="/signup" className="auth-link">Sign Up</Link>
                </li>
              </ul>
            )}
          </div>
          <div className="menu-toggle mobile-only">
            <button onClick={toggleMenu} className="menu-btn">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/shop" className="nav-link">Shop</Link>
            <Link to="/cart" className="nav-link">Cart</Link>
          </div>
          <div className="user-menu">
            {user ? (
              <div className="user-info">
                {user.profilePicture ? (
                  <img
                    src={`http://localhost:3000${user.profilePicture}`}
                    alt="Profile"
                    className="profile-pic"
                  />
                ) : (
                  <UserCircle size={32} className="profile-icon" />
                )}
                <button onClick={handleLogout} className="logout-btn">Log Out</button>
              </div>
            ) : (
              <ul className="auth-links">
                <li>
                  <Link to="/login" className="auth-link">Log In</Link>
                </li>
                <li>
                  <Link to="/signup" className="auth-link">Sign Up</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
