import React, { useState, useEffect } from 'react';
import "./NearestStation.css";

// Station data and fare data
const stations = [
  // Western Line
  { name: "Churchgate", lat: 18.9351, lon: 72.8277 },
  { name: "Marine Lines", lat: 18.9437, lon: 72.8234 },
  { name: "Charni Road", lat: 18.9514, lon: 72.8193 },
  { name: "Grant Road", lat: 18.9631, lon: 72.8166 },
  { name: "Mumbai Central", lat: 18.9713, lon: 72.8196 },
  { name: "Mahalaxmi", lat: 18.9828, lon: 72.8190 },
  { name: "Lower Parel", lat: 18.9929, lon: 72.8177 },
  { name: "Elphinstone Road (Parel)", lat: 19.0036, lon: 72.8412 },
  { name: "Dadar", lat: 19.0186, lon: 72.8424 },
  { name: "Matunga Road", lat: 19.0272, lon: 72.8416 },
  { name: "Mahim", lat: 19.0437, lon: 72.8409 },
  { name: "Bandra", lat: 19.0544, lon: 72.8402 },
  { name: "Khar Road", lat: 19.0653, lon: 72.8416 },
  { name: "Santacruz", lat: 19.0815, lon: 72.8410 },
  { name: "Vile Parle", lat: 19.0952, lon: 72.8442 },
  { name: "Andheri", lat: 19.1197, lon: 72.8468 },
  { name: "Jogeshwari", lat: 19.1352, lon: 72.8479 },
  { name: "Goregaon", lat: 19.1552, lon: 72.8494 },
  { name: "Malad", lat: 19.1767, lon: 72.8429 },
  { name: "Kandivali", lat: 19.1963, lon: 72.8410 },
  { name: "Borivali", lat: 19.2308, lon: 72.8595 },
  { name: "Dahisar", lat: 19.2434, lon: 72.8549 },
  { name: "Mira Road", lat: 19.2811, lon: 72.8577 },
  { name: "Bhayandar", lat: 19.3013, lon: 72.8513 },
  { name: "Naigaon", lat: 19.3445, lon: 72.8592 },
  { name: "Vasai Road", lat: 19.3679, lon: 72.8553 },
  { name: "Nallasopara", lat: 19.4176, lon: 72.8246 },
  { name: "Virar", lat: 19.4559, lon: 72.8111 },
  { name: "Vaitarna", lat: 19.5225, lon: 72.7654 },
  { name: "Saphale", lat: 19.6071, lon: 72.7528 },
  { name: "Kelve Road", lat: 19.6652, lon: 72.7359 },
  { name: "Palghar", lat: 19.6968, lon: 72.7672 },
  { name: "Umroli", lat: 19.7480, lon: 72.8132 },
  { name: "Boisar", lat: 19.8127, lon: 72.7598 },
  { name: "Vangaon", lat: 19.8782, lon: 72.7522 },
  { name: "Dahanu Road", lat: 19.9825, lon: 72.7437 },

  // Central Line
  { name: "Chhatrapati Shivaji Maharaj Terminus (CSMT)", lat: 18.9402, lon: 72.8352 },
  { name: "Masjid", lat: 18.9493, lon: 72.8397 },
  { name: "Sandhurst Road", lat: 18.9602, lon: 72.8419 },
  { name: "Byculla", lat: 18.9805, lon: 72.8336 },
  { name: "Chinchpokli", lat: 18.9935, lon: 72.8301 },
  { name: "Currey Road", lat: 19.0030, lon: 72.8305 },
  { name: "Parel", lat: 19.0134, lon: 72.8394 },
  { name: "Dadar", lat: 19.0200, lon: 72.8425 },
  { name: "Matunga", lat: 19.0312, lon: 72.8532 },
  { name: "Sion", lat: 19.0422, lon: 72.8620 },
  { name: "Kurla", lat: 19.0657, lon: 72.8798 },
  { name: "Vidyavihar", lat: 19.0780, lon: 72.8844 },
  { name: "Ghatkopar", lat: 19.0883, lon: 72.9087 },
  { name: "Vikhroli", lat: 19.1114, lon: 72.9273 },
  { name: "Kanjurmarg", lat: 19.1282, lon: 72.9338 },
  { name: "Bhandup", lat: 19.1445, lon: 72.9373 },
  { name: "Nahur", lat: 19.1597, lon: 72.9531 },
  { name: "Mulund", lat: 19.1717, lon: 72.9614 },
  { name: "Thane", lat: 19.1857, lon: 72.9755 },
  { name: "Kalwa", lat: 19.2025, lon: 73.0000 },
  { name: "Mumbra", lat: 19.2176, lon: 73.0263 },
  { name: "Diva", lat: 19.2285, lon: 73.0484 },
  { name: "Kopar", lat: 19.2290, lon: 73.0737 },
  { name: "Dombivli", lat: 19.2183, lon: 73.0867 },
  { name: "Thakurli", lat: 19.2165, lon: 73.1138 },
  { name: "Kalyan", lat: 19.2437, lon: 73.1293 },
  { name: "Shahad", lat: 19.2574, lon: 73.1461 },
  { name: "Ambivli", lat: 19.2721, lon: 73.1582 },
  { name: "Titwala", lat: 19.3374, lon: 73.2146 },
  { name: "Khadavli", lat: 19.4045, lon: 73.2585 },
  { name: "Vasind", lat: 19.4608, lon: 73.2668 },
  { name: "Asangaon", lat: 19.4963, lon: 73.2826 },
  { name: "Atgaon", lat: 19.5832, lon: 73.3097 },
  { name: "Thansit", lat: 19.6496, lon: 73.3577 },
  { name: "Khardi", lat: 19.7210, lon: 73.4111 },
  { name: "Kasara", lat: 19.7918, lon: 73.4669 },

  // Harbour Line
  { name: "Dockyard Road", lat: 18.9637, lon: 72.8484 },
  { name: "Reay Road", lat: 18.9763, lon: 72.8475 },
  { name: "Cotton Green", lat: 18.9893, lon: 72.8493 },
  { name: "Sewri", lat: 19.0054, lon: 72.8617 },
  { name: "Wadala Road", lat: 19.0179, lon: 72.8647 },
  { name: "GTB Nagar", lat: 19.0352, lon: 72.8718 },
  { name: "Chunabhatti", lat: 19.0456, lon: 72.8857 },
  { name: "Kurla", lat: 19.0657, lon: 72.8798 },
  { name: "Tilak Nagar", lat: 19.0735, lon: 72.8962 },
  { name: "Chembur", lat: 19.0626, lon: 72.8946 },
  { name: "Govandi", lat: 19.0586, lon: 72.9021 },
  { name: "Mankhurd", lat: 19.0469, lon: 72.9102 },
  { name: "Vashi", lat: 19.0722, lon: 72.9981 },
  { name: "Sanpada", lat: 19.0701, lon: 73.0097 },
  { name: "Juinagar", lat: 19.0717, lon: 73.0208 },
  { name: "Nerul", lat: 19.0330, lon: 73.0167 },
  { name: "Seawoods - Darave", lat: 19.0253, lon: 73.0222 },
  { name: "Belapur CBD", lat: 19.0198, lon: 73.0413 },
  { name: "Kharghar", lat: 19.0326, lon: 73.0691 },
  { name: "Mansarovar", lat: 19.0422, lon: 73.0858 },
  { name: "Khandeshwar", lat: 19.0564, lon: 73.1010 },
  { name: "Panvel", lat: 18.9902, lon: 73.1086 },
];

const fareData = {
  Churchgate: { "Marine Lines": 5, "Charni Road": 10, "Grant Road": 10 },
  "Marine Lines": { Churchgate: 5, "Charni Road": 5, "Grant Road": 10 },
  "Charni Road": { Churchgate: 10, "Marine Lines": 5, "Grant Road": 5 },
  "Grant Road": { Churchgate: 10, "Marine Lines": 10, "Charni Road": 5 },
  // Add more fare data for other stations here...
};

const NearestStation1 = () => {
  // State for location and nearest stations
  const [userLocation, setUserLocation] = useState({ lat: null, lon: null });
  const [nearestStations, setNearestStations] = useState([]);
  
  // State for fare calculation
  const [selectedStation, setSelectedStation] = useState('');
  const [destinationStation, setDestinationStation] = useState('');
  const [fare, setFare] = useState(null);

  // Function to get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, []);

  // Function to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => (degree * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Update nearest stations whenever user location changes
  useEffect(() => {
    if (userLocation.lat && userLocation.lon) {
      const sortedStations = [...stations].sort((a, b) => {
        const distanceA = calculateDistance(
          userLocation.lat,
          userLocation.lon,
          a.lat,
          a.lon
        );
        const distanceB = calculateDistance(
          userLocation.lat,
          userLocation.lon,
          b.lat,
          b.lon
        );
        return distanceA - distanceB;
      });
      setNearestStations(sortedStations.slice(0, 5));
    }
  }, [userLocation]);

  // Function to calculate fare between two stations
  const calculateFare = (from, to) => {
    if (from && to && fareData[from] && fareData[from][to]) {
      return fareData[from][to];
    }
    return null;
  };

  // Handle fare calculation when stations are selected
  const handleCalculateFare = () => {
    const calculatedFare = calculateFare(selectedStation, destinationStation);
    setFare(calculatedFare);
  };

  return (
    <div className="nearest-stations-container">
      <h2>Nearest Stations</h2>
      {nearestStations.length > 0 ? (
        <ul>
          {nearestStations.map((station, index) => (
            <li key={index}>{station.name}</li>
          ))}
        </ul>
      ) : (
        <p>Fetching nearest stations...</p>
      )}

      <h2>Calculate Ticket Fare</h2>
      <div className="fare-container">
        <div>
          <label htmlFor="fromStation">From:</label>
          <select
            id="fromStation"
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value)}
          >
            <option value="">Select a station</option>
            {stations.map((station, index) => (
              <option key={index} value={station.name}>
                {station.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="toStation">To:</label>
          <select
            id="toStation"
            value={destinationStation}
            onChange={(e) => setDestinationStation(e.target.value)}
          >
            <option value="">Select a station</option>
            {stations.map((station, index) => (
              <option key={index} value={station.name}>
                {station.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleCalculateFare}>Calculate Fare</button>
        {fare !== null && (
          <p>
            Fare from {selectedStation} to {destinationStation}: ₹{fare}
          </p>
        )}
      </div>
    </div>
  );
};

export default NearestStation1;
