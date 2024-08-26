import React from "react";

import "../styles/global.css";

const HeroComponent = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-catchphrase">
          A Railway <span className="underlined-hero">Navigation</span> System{" "}
        </h1>
        <p className="hero-supportphrase">
          Effortlessly navigate your journeys with StationSathi. <br />
          Discover real-time guidance and simplify your travel with convenient
          insights into stations and routes.
        </p>
      </div>
    </div>
  );
};

export default HeroComponent;
