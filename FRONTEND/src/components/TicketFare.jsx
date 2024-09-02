import React, { useState, useEffect } from "react";
import "./TicketFare.css";
import NearestStations from "./NearestStations";

const stations = [
  "CST", "Masjid", "Sandhurst Road", "Dockyard Road", "Reay Road",
  "Cotton Green", "Sewri", "Wadala Road", "Kings Circle", "Mahim",
  "Bandra", "Kurla", "Chembur", "Govandi", "Mankhurd", "Vashi", 
  "Sanpada", "Juinagar", "Nerul", "Seawoods-Darave", "Belapur CBD", 
  "Kharghar", "Mansarovar", "Khandeshwar", "Panvel"
];

const fareData = {
  'CST-Vashi': { firstClass: 50, secondClass: 20 },
  'CST-Panvel': { firstClass: 80, secondClass: 40 },
  'Wadala Road-Vashi': { firstClass: 35, secondClass: 15 },
  'Panvel-Kharghar': { firstClass: 10, secondClass: 5 },
};

function TicketFare() {
  const [startStation, setStartStation] = useState("");
  const [endStation, setEndStation] = useState("");
  const [fare, setFare] = useState({ firstClass: null, secondClass: null });
  const [colorBlindMode, setColorBlindMode] = useState("normal");

  useEffect(() => {
    const colorSchemes = {
      normal: {
        backgroundColor: "#e0e0e0",
        backgroundImage: 'url("https://memumbai.com/wp-content/uploads/2022/10/mumbailocal.jpg")',
        containerColor: "rgba(255, 255, 255, 0.9)",
        buttonColor: "purple",
        buttonTextColor: "white",
        textColor: "#333",
        inputBackgroundColor: "#f9f9f9",
        inputBorderColor: "#ced4da"
      },
      deuteranopia: {
        backgroundColor: "#e5e5cc",
        backgroundImage: 'none',
        containerColor: "rgba(240, 240, 220, 0.9)",
        buttonColor: "#b3b300",
        buttonTextColor: "#333",
        textColor: "#333",
        inputBackgroundColor: "#e6e6e6",
        inputBorderColor: "#999966"
      },
      protanopia: {
        backgroundColor: "#e5ccff",
        backgroundImage: 'none',
        containerColor: "rgba(240, 220, 240, 0.9)",
        buttonColor: "#cc66ff",
        buttonTextColor: "#333",
        textColor: "#333",
        inputBackgroundColor: "#f2e6ff",
        inputBorderColor: "#b399cc"
      },
      tritanopia: {
        backgroundColor: "#ccffe5",
        backgroundImage: 'none',
        containerColor: "rgba(220, 240, 240, 0.9)",
        buttonColor: "#33cc99",
        buttonTextColor: "#333",
        textColor: "#333",
        inputBackgroundColor: "#e6fff2",
        inputBorderColor: "#66cc99"
      },
      achromatopsia: {
        backgroundColor: "#d0d0d0",
        backgroundImage: 'none',
        containerColor: "rgba(200, 200, 200, 0.9)",
        buttonColor: "#666666",
        buttonTextColor: "#ffffff",
        textColor: "#333",
        inputBackgroundColor: "#e0e0e0",
        inputBorderColor: "#999999"
      }
    };

    const {
      backgroundColor, backgroundImage, containerColor, buttonColor, buttonTextColor, textColor,
      inputBackgroundColor, inputBorderColor
    } = colorSchemes[colorBlindMode];

    document.documentElement.style.setProperty('--page-bg-color', backgroundColor);
    document.documentElement.style.setProperty('--page-bg-image', backgroundImage);
    document.documentElement.style.setProperty('--container-bg-color', containerColor);
    document.documentElement.style.setProperty('--button-bg-color', buttonColor);
    document.documentElement.style.setProperty('--button-text-color', buttonTextColor);
    document.documentElement.style.setProperty('--text-color', textColor);
    document.documentElement.style.setProperty('--input-bg-color', inputBackgroundColor);
    document.documentElement.style.setProperty('--input-border-color', inputBorderColor);

    // Cleanup function to revert styles when the component unmounts
    return () => {
      document.documentElement.style.removeProperty('--page-bg-color');
      document.documentElement.style.removeProperty('--page-bg-image');
      document.documentElement.style.removeProperty('--container-bg-color');
      document.documentElement.style.removeProperty('--button-bg-color');
      document.documentElement.style.removeProperty('--button-text-color');
      document.documentElement.style.removeProperty('--text-color');
      document.documentElement.style.removeProperty('--input-bg-color');
      document.documentElement.style.removeProperty('--input-border-color');
    };
  }, [colorBlindMode]);

  const calculateFare = () => {
    const routeKey = `${startStation}-${endStation}`;
    const reverseRouteKey = `${endStation}-${startStation}`;
    const routeFare = fareData[routeKey] || fareData[reverseRouteKey] || null;

    if (routeFare) {
      setFare(routeFare);
    } else {
      setFare({ firstClass: "Not Available", secondClass: "Not Available" });
    }
  };

  return (
    <div className="ticketfare-container">
      <div className="ticketfare-header">
        <h1>Mumbai Local Train Fare Calculator</h1>
      </div>
      <div className="ticketfare-form">
        <div className="form-group">
          <label>From</label>
          <select value={startStation} onChange={(e) => setStartStation(e.target.value)}>
            <option className="ticket-fare-drop-down">Select Station</option>
            {stations.map((station, index) => (
              <option key={index} value={station}>{station}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>To</label>
          <select value={endStation} onChange={(e) => setEndStation(e.target.value)}>
            <option className="ticket-fare-drop-down">Select Station</option>
            {stations.map((station, index) => (
              <option key={index} value={station}>{station}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <button onClick={calculateFare} id="fare-cal-btn">Calculate Fare</button>
        </div>
      </div>

      {fare.firstClass !== null && (
        <div className="fare-result">
          <h3>Fare Results</h3>
          <p>1st Class: ₹{fare.firstClass}</p>
          <p>2nd Class: ₹{fare.secondClass}</p>
        </div>
      )}

      <div className="colorblind-options">
        <button onClick={() => setColorBlindMode("normal")} className="ticket-fare-button">Normal Vision</button>
        <button onClick={() => setColorBlindMode("deuteranopia")} className="ticket-fare-button">Deuteranopia</button>
        <button onClick={() => setColorBlindMode("protanopia")} className="ticket-fare-button">Protanopia</button>
        <button onClick={() => setColorBlindMode("tritanopia")} className="ticket-fare-button">Tritanopia</button>
        <button onClick={() => setColorBlindMode("achromatopsia")} className="ticket-fare-button">Achromatopsia</button>
      </div>
      <NearestStations/>
    </div>
  );
}

export default TicketFare;