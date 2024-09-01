import React from "react";
import "../styles/global.css";
import HeroComponent from "./HeroComponent";
import StationInfo from "../StationInfo/StationInfo";
const HomePage = () => {
  return (
    <div>
      <HeroComponent />
      <StationInfo/>
    </div>
  );
};

export default HomePage;
