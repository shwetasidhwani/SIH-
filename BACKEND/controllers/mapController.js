const Tesseract = require("tesseract.js");
const Station = require("../models/stationModel");

let mapElements = []; // To store detected map elements
let userLocation = null;
let destination = null;

exports.processMapImage = async (req, res) => {
  if (!req.files || !req.files.mapImage) {
    return res.status(400).json({ error: "No map image uploaded" });
  }

  const mapImage = req.files.mapImage;

  try {
    const {
      data: { text },
    } = await Tesseract.recognize(mapImage.data, "eng");
    mapElements = extractMapElements(text);
    res.json({ elements: mapElements });
  } catch (error) {
    console.error("Error processing map image:", error);
    res.status(500).json({ error: "Error processing map image" });
  }
};

exports.selectDestination = (req, res) => {
  const { destinationName } = req.body;
  destination = mapElements.find((el) => el.name === destinationName);

  if (!destination) {
    return res.status(404).json({ error: "Destination not found" });
  }

  res.json({ message: "Destination selected", destination });
};

exports.getRoute = (req, res) => {
  if (!userLocation || !destination) {
    return res
      .status(400)
      .json({ error: "User location or destination not set" });
  }

  const route = calculatePath(userLocation, destination, mapElements);
  res.json({ route });
};

// Utility functions for processing map and calculating paths
const extractMapElements = (text) => {
  // Implement text parsing logic to identify map elements (e.g., platforms, subways)
  // Example: [{ name: "Platform 1", coordinates: { x: 100, y: 200 } }, ...]
  return []; // Return parsed elements
};

const calculatePath = (start, end, elements) => {
  // Implement pathfinding logic, taking into account map elements
  // Example: Dijkstra's algorithm or A* algorithm for pathfinding
  return []; // Return computed path
};
