import React, { useState, useEffect } from 'react';

// List of Western Line stations with their coordinates
const stations = [
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
  { name: "Virar", lat: 19.4559, lon: 72.8111 }
];

// Function to calculate the distance between two coordinates using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

const NearestStations = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestStations, setNearestStations] = useState([]);

  // Fetch the user's location when the component is mounted
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setUserLocation({ lat, lon });
        findNearestStations(lat, lon);
      }, error => {
        console.error("Error fetching geolocation: ", error);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  // Find the nearest stations by calculating the distance to each station
  const findNearestStations = (userLat, userLon) => {
    const nearbyStations = stations.map(station => {
      const distance = calculateDistance(userLat, userLon, station.lat, station.lon);
      return { ...station, distance };
    });

    // Sort stations by distance
    nearbyStations.sort((a, b) => a.distance - b.distance);

    // Limit to top 5 closest stations
    setNearestStations(nearbyStations.slice(0, 5));
  };

  return (
    <div>
      <h2>Nearest Mumbai Western Line Stations</h2>
      {userLocation ? (
        <div>
          <h4>Your Location: {userLocation.lat}, {userLocation.lon}</h4>
          <ul>
            {nearestStations.map((station, index) => (
              <li key={index}>
                {station.name} - {station.distance.toFixed(2)} km away
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Fetching your location...</p>
      )}
    </div>
  );
};

export default NearestStations;
