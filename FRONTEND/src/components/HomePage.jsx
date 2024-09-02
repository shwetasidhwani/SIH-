import React, {useState,useEffect,useRef} from "react";
import "../styles/global.css";
import Navbar from "./NavBar";
import HeroComponent from "./HeroComponent";
import StationInfo from "../StationInfo/StationInfo";
import CoreFeatures from "./CoreFeatures/CoreFeatures";
const HomePage = () => {
  return (
    <div>
      <HeroComponent />
      <CoreFeatures />
      <StationInfo/>
    </div>
  );
};

export default HomePage;
