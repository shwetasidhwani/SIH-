const express = require("express");
const { AssemblyAI } = require("assemblyai");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
