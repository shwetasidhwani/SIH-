import React from "react";
import { Link } from "react-router-dom";

import "../styles/global.css";

import Navbar from "./Navbar";
import HeroComponent from "./HeroComponent";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroComponent />
    </div>
  );
};

export default HomePage;
