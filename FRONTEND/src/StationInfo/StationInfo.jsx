import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import L from "leaflet";
import "./Statioinfo.css";

const StationInfo = () => {
  const [stationName, setStationName] = useState("");
  const [stationData, setStationData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);

  //getting the user ka lat and long
  // useEffect (() => {
  //     if(navigaor.geolocation){
  //         navigator.geolocation.getCurrentPosition((position) => {
  //             setUserLocation({
  //                 latitude : position.coords.latitude,
  //                 longitude : position.coords.longitude,
  //             });
  //         }), (error) => {
  //             console.error("Error in useEffect in navigator : ", error);
  //         }
  //     }
  //     else{
  //         console.error("SOme oter error in navigator");
  //     }
  // } , []);

  //     //setting the lat and log onto the map
  //     useEffect(() => {
  //         if(stationData && userLocation && mapRef.current){
  //             const map = L.map(mapRef.current , {
  //                 center : [stationData.latitude , stationData.longitude],
  //                 zoom : 16 ,
  //                 layers : [
  //                     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //                         attribution: '&copy; OpenStreetMap contributors',
  //                     }),
  //                 ],
  //             })
  //         }
  //     })

  //     //marker
  //     // Marker for the station
  //     L.marker([stationData.latitude, stationData.longitude]).addTo(map)
  //     .bindPopup(`<b>${stationData.stationName}</b>`)
  //     .openPopup();
  //     //user loc
  //     L.marker([userLocation.latitude, userLocation.longitude]).addTo(map)
  //     .bindPopup("<b>You are here</b>")
  //     .openPopup();

  //     return () => {
  //         map.remove();
  //     };
  // }, [stationData, userLocation];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(stationName);
      const response = await axios.get(
        `http://localhost:3000/api/station/${stationName}`
      );
      console.log(response.data);
      setStationData(response.data);
    } catch (error) {
      console.error("Error fetching station data: ", error);
      setStationData(null);
    }
  };

  return (
    <>
      <div className="station-info-outercontainer">
        <form onSubmit={handleSubmit} className="station-info-form-container">
          <h3>Station Information</h3>
          <p>Get information regarding the station you want to visit</p>
          <input
            type="text"
            value={stationName}
            onChange={(e) => setStationName(e.target.value)}
            placeholder="Enter Station Name"
            id="station-info-form-input"
          />
          <button type="submit" id="station-info-form-button" >Get Info</button>
        </form>

        {stationData && (
          <div className="station-info-output-container">
            <div className="station-info-information">
              <h3 id="station-infostation-name">{stationData.stationName}</h3>
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
            </div>
            <div className="station-info-station-map-image-container">
              <h2 id="station-info-station-layout-heading">Station Layout</h2>
              <img
                src={`http://localhost:3000${stationData.mapUrl}`}
                alt="Station Map"
                id="station-info-map-image"
              />
              {/* <h4>Nearby Station Map</h4>
                        <img src={`http://localhost:3000${stationData.nearbyMapUrl}`} alt="NearbyStation Map" /> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StationInfo;
