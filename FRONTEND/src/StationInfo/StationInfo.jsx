import React, { useState, useEffect, useRef } from "react";
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
  const [isSpeaking, setIsSpeaking] = useState(false); // Track speech state
  const mapImageRef = useRef(null);

  useEffect(() => {
    if (stationData) {
      // Read out the station name and other dynamic information
      speak(`Station Name: ${stationData.stationName}`);
      speak(`Next Station: ${stationData.nextStation}`);
      speak(`Previous Station: ${stationData.previousStation}`);
      
      stationData.nearbyAttractions.forEach(attraction => {
        speak(`Nearby Attraction: ${attraction}`);
      });
    }
  }, [stationData]);

  const speak = (text) => {
    if (!text || !isSpeaking) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false); // Set to false to stop speaking
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/api/station/${stationName}`
      );
      setStationData(response.data);
      setUserMarker(null);
      setSelectedComponent("");
      setIsSpeaking(true); // Enable speaking
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
    speak("User location set on the map");
  };

  const handleComponentSelect = (e) => {
    setSelectedComponent(e.target.value);
    speak(`Selected component: ${e.target.value}`);
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
      width: `${distance + 1.75}%`,  // Increase the line length to ensure it reaches the destination icon
      height: "1.5px",  // Adjust the thickness of the line if needed
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
          <p>1.Type in the name of the station you want to know more about.</p>
          <p>2.Select one of the components and check the Station Layout 
             </p>
          <p>3.For a better view of the station You can also view its 3d model</p>
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
              <div className="station-info-next-stn-container"><p className="station-info-ptags">
                <strong>Next Station:</strong> {stationData.nextStation} (
                {stationData.distanceToNextStation},{" "}
                {stationData.timeToNextStation})
              </p>
               <p className="station-info-ptags">
                <strong>Previous Station: </strong>
                {stationData.previousStation} (
                {stationData.distanceToPreviousStation},{" "}
                {stationData.timeToPreviousStation})
              </p></div>
              <div className="station-info-nearby-attraction-container"> <p className="station-info-pts">
                <strong id="nearbyattraction-title">Nearby Attractions: </strong>
              </p>
              <ul>
                {stationData.nearbyAttractions.map((attraction, index) => (
                  <li key={index} className="station-info-li-tags">{attraction}</li>
                ))}
              </ul></div>
              <div className="station-info-functionalities">
              <label htmlFor="componentsDropdown" className="componentsDropdown-label"><strong>Select Component:</strong></label>
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
                      width: "40px", // Adjust size as needed
                      height: "40px",
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
                      width: "40px", // Adjust size as needed
                      height: "40px",
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
              <button onClick={stopSpeaking} id="stop-voice-button">Stop Voice Assistance</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StationInfo;
