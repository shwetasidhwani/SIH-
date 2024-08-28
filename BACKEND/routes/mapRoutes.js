const express = require("express");
const router = express.Router();
const Station = require("../models/stationModel");

// Fetch all stations
router.get("/stations", async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (error) {
    console.error("Error fetching stations:", error);
    res.status(500).json({ error: "Failed to fetch stations" });
  }
});

// Fetch route to a specific station
router.get("/route", async (req, res) => {
  console.log(req.params, req.query, req.body);
  const { stationName } = req.query;

  try {
    // Fetch route data here; for now, just return a placeholder
    const route = [
      "Start at Platform 1",
      "Go through Subway",
      "Arrive at destination",
    ];
    res.json({ route });
  } catch (error) {
    console.error("Error fetching route:", error);
    res.status(500).json({ error: "Failed to fetch route" });
  }
});

module.exports = router;
