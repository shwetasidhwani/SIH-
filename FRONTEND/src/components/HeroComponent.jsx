import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../styles/global.css";

const HeroComponent = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-catchphrase">
          A Railway <span className="underlined-hero">Navigation</span> System
        </h1>
        <p className="hero-supportphrase">
          With StationSathi, your travel experience becomes seamless and stress-free. Our platform offers real-time updates and intuitive guidance, making it easy to navigate stations and routes. Whether you're catching a train, finding the best platform, or checking for delays, StationSathi provides all the information you need at your fingertips. Enjoy a smoother journey with comprehensive insights and up-to-date notifications tailored to your travel needs. Say goodbye to travel uncertainties and hello to a more efficient and enjoyable trip with StationSathi.
        </p>
        <Link to="/about" className="about-us-hero">
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default HeroComponent;
