import React, { useState } from "react";
import "./ToFromSearch.css";

function ToFromSearch() {
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");

  const harbourLineStations = [
    "CST", "Dockyard Road", "Reay Road", "Cotton Green", 
    "Sewri", "Wadala", "GTB Nagar", "Chunabhatti",
    "Kurla", "Tilak Nagar", "Chembur", "Govandi", 
    "Mankhurd", "Vashi", "Sanpada", "Juinagar", 
    "Nerul", "Seawoods-Darave", "Belapur", "Kharghar", 
    "Mansarovar", "Khandeshwar", "Panvel"
  ];

  const timetable = [
    { train: "Train 1", from: "CST", to: "Panvel", departure: "08:30", arrival: "10:00" },
    { train: "Train 2", from: "Kurla", to: "Vashi", departure: "09:15", arrival: "09:45" },
    { train: "Train 3", from: "Wadala", to: "Belapur", departure: "10:00", arrival: "11:00" }
  ];

  const getTimetable = () => {
    return timetable.filter(
      (train) => train.from === fromStation && train.to === toStation
    );
  };

  return (
    <div className="tofrom-container">
      <h2>Search Stations</h2>
      <div className="station-inputs">
        <select
          className="station-selector"
          value={fromStation}
          onChange={(e) => setFromStation(e.target.value)}
        >
          <option value="">From Station</option>
          {harbourLineStations.map((station) => (
            <option key={station} value={station}>
              {station}
            </option>
          ))}
        </select>

        <select
          className="station-selector"
          value={toStation}
          onChange={(e) => setToStation(e.target.value)}
        >
          <option value="">To Station</option>
          {harbourLineStations.map((station) => (
            <option key={station} value={station}>
              {station}
            </option>
          ))}
        </select>
      </div>

      {fromStation && toStation && (
        <div className="timetable">
          <h3>Possible Trains</h3>
          {getTimetable().length > 0 ? (
            <ul>
              {getTimetable().map((train, index) => (
                <li key={index}>
                  <strong>{train.train}</strong>: {train.from} to {train.to} | Departure: {train.departure} | Arrival: {train.arrival}
                </li>
              ))}
            </ul>
          ) : (
            <p>No trains available for the selected stations.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ToFromSearch;
