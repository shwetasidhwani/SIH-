//Imports
const express = require("express");
const cors = require("cors");
const { AssemblyAI } = require("assemblyai");
const body_parser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

//Ash imports
const authRoutes = require("./routes/authRoutes");
const queryRoute = require("./routes/queryRoute");
const stationRoute = require('./routes/stationRoute');
const chatRoutes = require('./routes/chatMessageRoute');




//Shwets imports
const mapRoute = require("./routes/mapRoutes");

//Josh imports

//config imports
const app = express();
const port = process.env.PORT;

//Configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, //set true while deployment
  })
);

app.use("/maps", express.static("maps"));

const client = new AssemblyAI({
  apiKey: "(your-api-key)",
});

app.post("/transcribe", async (req, res) => {
  const { audioUrl } = req.body;
  const config = { audio_url: audioUrl };

  try {
    const transcript = await client.transcripts.transcribe(config);
    res.json({ text: transcript.text });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while transcribing the audio." });
  }
});

//database
mongoose
  .connect("mongodb://127.0.0.1:27017/SIH")
  .then(() => {
    console.log("Mongo Connected to SIH database");
  })
  .catch((error) => {
    console.error("Error in connecting Mongo", error);
  });

//-----------------------Routes-------------------------------

//Ash routes
app.use('/api/auth', authRoutes);
app.use('/api/llm', queryRoute);
app.use('/api/station', stationRoute);
app.use('/uploads/profilePictures', express.static(path.join(__dirname, 'uploads/profilePictures')));
app.use('/api/chat', chatRoutes);




//Shwets routes
app.use("/api/map", mapRoute);

//JOsh routes

//start
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
