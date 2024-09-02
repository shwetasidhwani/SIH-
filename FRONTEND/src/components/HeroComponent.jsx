import React, {useState,useEffect,useRef} from "react";

import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../styles/global.css";

const HeroComponent = () => {
  const speakTimeoutRef = useRef(null);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleMouseEnter = (e) => {
    if (speakTimeoutRef.current) {
      clearTimeout(speakTimeoutRef.current);
    }

    speakTimeoutRef.current = setTimeout(() => {
      speak(e.target.textContent);
    }, 300); // 300ms debounce time, adjust as needed
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-catchphrase" onMouseEnter={handleMouseEnter}>
          A Railway <span className="underlined-hero">Navigation</span> System{" "}
        </h1>
        <p className="hero-supportphrase" onMouseEnter={handleMouseEnter}>
          Effortlessly navigate your journeys with StationSathi. <br />
          Discover real-time guidance and simplify your travel with convenient
          insights into stations and routes.
        </p>
        <Link to="/about" className="about-us-hero">
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default HeroComponent;
