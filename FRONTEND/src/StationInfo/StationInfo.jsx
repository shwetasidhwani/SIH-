import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Stationinfo.css";

const MAX_MARKERS = 1;

const StationInfo = () => {
  const [stationName, setStationName] = useState("");
  const [stationData, setStationData] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState("");
  const mapImageRef = useRef(null); // Ref to the map image

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/api/station/${stationName}`
      );
      setStationData(response.data);
      setMarkers([]);
      setSelectedComponent("");
    } catch (error) {
      console.error("Error fetching station data: ", error);
      setStationData(null);
    }
  };

  const handleImageClick = (e) => {
    if (!stationData) return;

    if (markers.length >= MAX_MARKERS) {
      console.log(`Cannot add more than ${MAX_MARKERS} marker.`);
      return;
    }

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMarkers([
      { x: (x / rect.width) * 100, y: (y / rect.height) * 100 }
    ]);
  };

  const handleComponentSelect = (e) => {
    setSelectedComponent(e.target.value);
  };

  const getHighlightPosition = () => {
    if (!mapImageRef.current || !selectedComponent) return { left: 0, top: 0 };

    const rect = mapImageRef.current.getBoundingClientRect();
    const selectedComponentData = stationData.components.find(
      (component) => component.name === selectedComponent
    );

    if (selectedComponentData) {
      return {
        left: `${(selectedComponentData.x / rect.width) * 100}%`,
        top: `${(selectedComponentData.y / rect.height) * 100}%`
      };
    }
    return { left: 0, top: 0 };
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
              {/* Dropdown for Components */}
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
                  ref={mapImageRef} // Attach ref to the map image
                />
                {markers.map((marker, index) => (
                  <div
                    key={index}
                    className="marker"
                    style={{
                      left: `${marker.x}%`,
                      top: `${marker.y}%`
                    }}
                  >
                    <div className="marker-tooltip">Marker {index + 1}</div>
                  </div>
                ))}
                {/* Highlight the selected component */}
                {selectedComponent && (
                  <div
                    className="highlight"
                    style={{
                      position: "absolute",
                      width: "20px",
                      height: "20px",
                      backgroundColor: "rgba(255, 0, 0, 0.5)",
                      borderRadius: "50%",
                      ...getHighlightPosition(), // Calculate position
                    }}
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
