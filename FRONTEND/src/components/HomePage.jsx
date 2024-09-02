import React from "react";
import "../styles/global.css";
import Navbar from "./NavBar";
import HeroComponent from "./HeroComponent";
import StationInfo from "../StationInfo/StationInfo";
const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <HeroComponent />
      <StationInfo/>
    </div>
  );
};

export default HomePage;
