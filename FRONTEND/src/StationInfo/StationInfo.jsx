import React, { useState } from 'react';
import axios from 'axios';

const StationInfo = () => {
    const [stationName, setStationName] = useState('');
    const [stationData, setStationData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(stationName);
            const response = await axios.get(`http://localhost:3000/api/station/${stationName}`);
            console.log(response.data);
            setStationData(response.data);
        } catch (error) {
            console.error("Error fetching station data: ", error);
            setStationData(null);
        }
    };

    return (
        <div>
            <h2>Station Information</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={stationName}
                    onChange={(e) => setStationName(e.target.value)}
                    placeholder="Enter Station Name"
                />
                <button type="submit">Get Info</button>
            </form>

            {stationData && (
                <div>
                    <h3>{stationData.stationName}</h3>
                    <p><strong>Next Station:</strong> {stationData.nextStation} ({stationData.distanceToNextStation}, {stationData.timeToNextStation})</p>
                    <p><strong>Previous Station: </strong>{stationData.previousStation} ({stationData.distanceToPreviousStation}, {stationData.timeToPreviousStation})</p>
                    <p><strong>Nearby Attractions: </strong>{stationData.nearbyAttractions.join(', ')} 
                    </p>
                </div>
            )}
        </div>
    );
};

export default StationInfo;
