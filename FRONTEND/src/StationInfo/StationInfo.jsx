import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Stationinfo.css";

import sourceIcon from './source.png';
import destinationIcon from './destination.png';

const StationInfo = () => {
  const [stationName, setStationName] = useState("");
  const [stationData, setStationData] = useState(null);
  const [userMarker, setUserMarker] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState("");
  const mapImageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/api/station/${stationName}`
      );
      setStationData(response.data);
      setUserMarker(null);
      setSelectedComponent("");
    } catch (error) {
      console.error("Error fetching station data: ", error);
      setStationData(null);
    }
  };

  const handleImageClick = (e) => {
    if (!stationData) return;

    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 100;
    const y = (e.clientY - rect.top) / rect.height * 100;

    setUserMarker({ x, y });
  };

  const handleComponentSelect = (e) => {
    setSelectedComponent(e.target.value);
  };

  const getSelectedComponentPosition = () => {
    if (!mapImageRef.current || !selectedComponent) return null;

    const rect = mapImageRef.current.getBoundingClientRect();
    const selectedComponentData = stationData.components.find(
      (component) => component.name === selectedComponent
    );

    if (selectedComponentData) {
      return {
        x: (selectedComponentData.x / rect.width) * 100,
        y: (selectedComponentData.y / rect.height) * 100
      };
    }
    return null;
  };

  const getLineStyle = () => {
    if (!userMarker || !selectedComponent) return {};
  
    const selectedComponentPos = getSelectedComponentPosition();
    if (!selectedComponentPos) return {};
  
    const deltaX = selectedComponentPos.x - userMarker.x;
    const deltaY = selectedComponentPos.y - userMarker.y;
    
    // Calculate the angle and the full distance between the points
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  
    return {
      position: "absolute",
      left: `${userMarker.x}%`,
      top: `${userMarker.y}%`,
      width: `${distance + 1}%`,  // Slightly extend the line to account for rounding issues
      height: "1px",
      backgroundColor: "blue",
      transform: `rotate(${angle}deg)`,
      transformOrigin: "0 0",
    };
  };
  

  return (
    <>
      <div className="station-info-outercontainer">
        <form onSubmit={handleSubmit} className="station-info-form-container">
          <h3 id="station-info-station-input-container-heading">Station Information</h3>
          <p>Get information regarding the station you want to visit</p>
          <input
            type="text"
            value={stationName}
            onChange={(e) => setStationName(e.target.value)}
            placeholder="Enter Station Name"
            id="station-info-form-input"
          />
          <button type="submit" id="station-info-form-button">Get Info</button>
        </form>

        {stationData && (
          <div className="station-info-output-container">
            <div className="station-info-information">
              <h3 id="station-info-station-name">{stationData.stationName}</h3>
              <p className="station-info-ptags">
                <strong>Next Station:</strong> {stationData.nextStation} (
                {stationData.distanceToNextStation},{" "}
                {stationData.timeToNextStation})
              </p>
              <p className="station-info-ptags">
                <strong>Previous Station: </strong>
                {stationData.previousStation} (
                {stationData.distanceToPreviousStation},{" "}
                {stationData.timeToPreviousStation})
              </p>
              <p className="station-info-pts">
                <strong>Nearby Attractions: </strong>
              </p>
              <ul>
                {stationData.nearbyAttractions.map((attraction, index) => (
                  <li key={index} className="station-info-li-tags">{attraction}</li>
                ))}
              </ul>
              <label htmlFor="componentsDropdown"><strong>Select Component:</strong></label>
              <select
                id="componentsDropdown"
                value={selectedComponent}
                onChange={handleComponentSelect}
              >
                <option value="">-- Select a Component --</option>
                {stationData.components.map((component, index) => (
                  <option key={index} value={component.name}>
                    {component.name}
                  </option>
                ))}
              </select>

              {/* New Button for 3D View */}
              <Link to="/model" className="view-in-3d-button">View in 3D</Link>
 {/* Placeholder href */}
            </div>
            <div className="station-info-station-map-image-container">
              <h2 id="station-info-station-layout-heading">Station Layout</h2>
              <div
                className="map-container"
                onClick={handleImageClick}
              >
                <img
                  src={`http://localhost:3000${stationData.mapUrl}`}
                  alt="Station Map"
                  id="station-info-map-image"
                  ref={mapImageRef}
                />
                {userMarker && (
                  <img
                    src={sourceIcon}
                    alt="User Location"
                    style={{
                      position: "absolute",
                      left: `${userMarker.x}%`,
                      top: `${userMarker.y}%`,
                      width: "20px", // Adjust size as needed
                      height: "20px",
                      transform: "translate(-50%, -100%)", // Centers the icon
                    }}
                  />
                )}
                {selectedComponent && (
                  <img
                    src={destinationIcon}
                    alt="Destination"
                    style={{
                      position: "absolute",
                      left: `${getSelectedComponentPosition()?.x}%`,
                      top: `${getSelectedComponentPosition()?.y}%`,
                      width: "10px", // Adjust size as needed
                      height: "10px",
                      transform: "translate(-50%, -100%)", // Centers the icon
                    }}
                  />
                )}
                {userMarker && selectedComponent && (
                  <div
                    className="route-line"
                    style={getLineStyle()}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StationInfo;
