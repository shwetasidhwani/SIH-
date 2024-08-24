//Imports 
const express = require("express");
const cors = require("cors");
const { AssemblyAI } = require("assemblyai");
const body_parser = require('body-parser');
const cookie_parser = require("cookie-parser");
const mongoose = require('mongoose');
const session = require('express-session');

//Ash imports 







//Shwets imports







//Josh imports 









//config imports
const app = express();
const port = process.env.PORT || 3001;


//Configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended : true}));
app.use(express.json());

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








//-----------------------Routes-------------------------------







//start
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
