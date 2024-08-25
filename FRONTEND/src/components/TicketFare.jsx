import React, { useState, useEffect } from "react";
import "./TicketFare.css";

const stations = [
  "CST", "Masjid", "Sandhurst Road", "Dockyard Road", "Reay Road",
  "Cotton Green", "Sewri", "Wadala Road", "Kings Circle", "Mahim",
  "Bandra", "Kurla", "Chembur", "Govandi", "Mankhurd", "Vashi", 
  "Sanpada", "Juinagar", "Nerul", "Seawoods-Darave", "Belapur CBD", 
  "Kharghar", "Mansarovar", "Khandeshwar", "Panvel"
];

// Example fare data for first-class and second-class
const fareData = {
  'CST-Vashi': { firstClass: 50, secondClass: 20 },
  'CST-Panvel': { firstClass: 80, secondClass: 40 },
  'Wadala Road-Vashi': { firstClass: 35, secondClass: 15 },
  'Panvel-Kharghar': { firstClass: 10, secondClass: 5 },
  // Add more routes...
};

function TicketFare() {
  const [startStation, setStartStation] = useState("");
  const [endStation, setEndStation] = useState("");
  const [fare, setFare] = useState({ firstClass: null, secondClass: null });

  // Apply custom styles to the body when the component mounts
  useEffect(() => {
    const originalBodyStyles = document.body.style;
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#e0e0e0";
    document.body.style.backgroundImage = 'url("https://memumbai.com/wp-content/uploads/2022/10/mumbailocal.jpg")';
    document.body.style.backgroundSize = "cover";
    document.body.style.height = "100%";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    // Cleanup function to revert styles when the component unmounts
    return () => {
      document.body.style = originalBodyStyles;
    };
  }, []);

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
            <option value="">Select Station</option>
            {stations.map((station, index) => (
              <option key={index} value={station}>{station}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>To</label>
          <select value={endStation} onChange={(e) => setEndStation(e.target.value)}>
            <option value="">Select Station</option>
            {stations.map((station, index) => (
              <option key={index} value={station}>{station}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <button onClick={calculateFare}>Calculate Fare</button>
        </div>
      </div>

      {fare.firstClass !== null && (
        <div className="fare-result">
          <h3>Fare Results</h3>
          <p>1st Class: ₹{fare.firstClass}</p>
          <p>2nd Class: ₹{fare.secondClass}</p>
        </div>
      )}
    </div>
  );
}

export default TicketFare;
