import React, { useState, useEffect } from "react";
import { Bar, PolarArea, Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import "./Analytics.css";
import analyticsData from "./Analytics.json"; // Import the JSON file

// Register all Chart.js components
ChartJS.register(...registerables);

const Analytics = () => {
  const [data, setData] = useState(analyticsData.Monday); // Default to Monday data
  const [selectedDay, setSelectedDay] = useState("Monday"); // Default to Monday
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState({
    amountOfCrowd: true,
    averageCrowd: false,
    peakCrowd: false,
  });

  useEffect(() => {
    setData(analyticsData[selectedDay] || []);
  }, [selectedDay]);

  const filteredData = data.filter((station) =>
    station.stationName.toLowerCase().includes(selectedStation ? selectedStation.toLowerCase() : "")
  );

  const calculateStats = (data) => {
    const stats = {
      totalCrowd: 0,
      averageCrowd: 0,
      peakCrowd: 0,
      count: 0,
    };

    data.forEach(station => {
      stats.totalCrowd += station.amountOfCrowd || 0;
      stats.averageCrowd += station.averageCrowd || 0;
      stats.peakCrowd += station.peakCrowd || 0;
      stats.count += 1;
    });

    if (stats.count > 0) {
      stats.averageCrowd /= stats.count;
      stats.peakCrowd /= stats.count;
    }

    return stats;
  };

  const totalCrowdStats = calculateStats(data);
  const selectedDayStats = calculateStats(filteredData);

  const getChartData = (selected) => {
    const labels = selected
      ? [selected, "Total"]
      : data.map((station) => station.stationName);
    const datasets = [];

    if (selectedColumns.amountOfCrowd) {
      datasets.push({
        label: "Crowd",
        data: selected
          ? [
              filteredData.find((station) => station.stationName === selected)?.amountOfCrowd || 0,
              totalCrowdStats.totalCrowd - (filteredData.find((station) => station.stationName === selected)?.amountOfCrowd || 0),
            ]
          : data.map((station) => station.amountOfCrowd),
        backgroundColor: selected ? ["rgba(255,99,132,0.2)", "rgba(54,162,235,0.2)"] : ["rgba(255,99,132,0.2)"],
        borderColor: selected ? ["rgba(255,99,132,1)", "rgba(54,162,235,1)"] : ["rgba(255,99,132,1)"],
        borderWidth: 1,
      });
    }

    if (selectedColumns.averageCrowd) {
      datasets.push({
        label: "Average Crowd",
        data: selected
          ? [
              filteredData.find((station) => station.stationName === selected)?.averageCrowd || 0,
              totalCrowdStats.averageCrowd - (filteredData.find((station) => station.stationName === selected)?.averageCrowd || 0),
            ]
          : data.map((station) => station.averageCrowd),
        backgroundColor: selected ? ["rgba(153,102,255,0.2)", "rgba(255,159,64,0.2)"] : ["rgba(153,102,255,0.2)"],
        borderColor: selected ? ["rgba(153,102,255,1)", "rgba(255,159,64,1)"] : ["rgba(153,102,255,1)"],
        borderWidth: 1,
      });
    }

    if (selectedColumns.peakCrowd) {
      datasets.push({
        label: "Peak Crowd",
        data: selected
          ? [
              filteredData.find((station) => station.stationName === selected)?.peakCrowd || 0,
              totalCrowdStats.peakCrowd - (filteredData.find((station) => station.stationName === selected)?.peakCrowd || 0),
            ]
          : data.map((station) => station.peakCrowd),
        backgroundColor: selected ? ["rgba(75,192,192,0.2)", "rgba(255,159,64,0.2)"] : ["rgba(75,192,192,0.2)"],
        borderColor: selected ? ["rgba(75,192,192,1)", "rgba(255,159,64,1)"] : ["rgba(75,192,192,1)"],
        borderWidth: 1,
      });
    }

    return { labels, datasets };
  };

  const getTimeSlotData = () => {
    const timeSlots = {};
    data.forEach(station => {
      const time = station.time;
      if (!timeSlots[time]) {
        timeSlots[time] = { amountOfCrowd: 0, count: 0 };
      }
      timeSlots[time].amountOfCrowd += station.amountOfCrowd || 0;
      timeSlots[time].count += 1;
    });

    const labels = Object.keys(timeSlots);
    const crowdData = labels.map(time => timeSlots[time].amountOfCrowd / timeSlots[time].count);

    return {
      labels,
      datasets: [
        {
          label: "Average Crowd by Time Slot",
          data: crowdData,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        }
      ]
    };
  };

  const barData = getChartData(selectedStation);
  const polarData = getChartData(selectedStation);
  const timeSlotData = getTimeSlotData();

  return (
    <div className="analytics-container">
      <h1>Station Analytics</h1>
      <div className="analytics-functionality-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a station..."
            value={selectedStation || ""}
            onChange={(e) => setSelectedStation(e.target.value)}
          />
        </div>

        <div className="day-selector">
          <label htmlFor="day">Select Day:</label>
          <select
            id="day"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
            <option value="total">Entire Week</option>
          </select>
        </div>

        <div className="column-selector">
          <h3>Select Columns to Compare:</h3>
          {Object.keys(selectedColumns).map((column) => (
            <div key={column}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedColumns[column]}
                  onChange={() => setSelectedColumns((prev) => ({
                    ...prev,
                    [column]: !prev[column]
                  }))}
                />
                {column.replace(/([A-Z])/g, ' $1').toUpperCase()}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="analytics-charts-container">
        <div className="charts">
          <div className="bar-chart">
            <h2>Crowd Data (Bar)</h2>
            <Bar
              data={barData}
              options={{
                responsive: true,
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
          <div className="polar-area-chart">
            <h2>Crowd Data (Polar Area)</h2>
            <PolarArea
              data={polarData}
              options={{ responsive: true, maintainAspectRatio: false }}
              style={{ height: "300px" }}
            />
          </div>
          
        </div>

        {selectedStation && (
          <div className="charts">
            <div className="bar-chart">
              <h2>{selectedStation} (Bar)</h2>
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  scales: { y: { beginAtZero: true } },
                }}
              />
            </div>
            <div className="polar-area-chart">
              <h2>{selectedStation} (Polar Area)</h2>
              <PolarArea
                data={polarData}
                options={{ responsive: true, maintainAspectRatio: false }}
                style={{ height: "300px" }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="analytics-stats">
        <div className="statistics">
          <div className="total-stats">
            <h2>Total Stats</h2>
            <p>Total Crowd: {totalCrowdStats.totalCrowd}</p>
            <p>Average Crowd: {totalCrowdStats.averageCrowd.toFixed(2)}</p>
            <p>Peak Crowd: {totalCrowdStats.peakCrowd.toFixed(2)}</p>
          </div>
          <div className="line-chart">
            <h2>Average Crowd by Time Slot (Line)</h2>
            <Line
              data={timeSlotData}
              options={{
                responsive: true,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Time Slot'
                    }
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Average Crowd'
                    },
                    beginAtZero: true
                  }
                }
              }}
              style={{ height: "300px" }}
            />
          </div>
          <div className="total-stats">
            <h2>Selected Day Stats</h2>
            <p>Total Crowd: {selectedDayStats.totalCrowd}</p>
            <p>Average Crowd: {selectedDayStats.averageCrowd.toFixed(3)}</p>
            <p>Peak Crowd: {selectedDayStats.peakCrowd.toFixed(2)}</p>
          </div>
        </div>
        <h2>Analytics Table</h2>
        <table className="analytics-table">
          <thead>
            <tr>
              <th>Station</th>
              {selectedColumns.amountOfCrowd && <th>Crowd</th>}
              {selectedColumns.averageCrowd && <th>Average Crowd</th>}
              {selectedColumns.peakCrowd && <th>Peak Crowd</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((station, index) => (
              <tr key={index}>
                <td>{station.stationName}</td>
                {selectedColumns.amountOfCrowd && <td>{station.amountOfCrowd}</td>}
                {selectedColumns.averageCrowd && <td>{station.averageCrowd}</td>}
                {selectedColumns.peakCrowd && <td>{station.peakCrowd}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
