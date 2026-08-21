require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/ai", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const response = await client.responses.create({
      model: "gpt-5.6-luna",

      instructions: `
You are WEAVE AI, the intelligent AI assistant inside WEAVE,
a professional networking platform designed for students.

Your job is to help students with:
- College and academic guidance
- Internships and jobs
- Projects and startups
- Skills and learning roadmaps
- Networking
- Career advice

Be helpful, practical, concise and encouraging.
Give actionable answers rather than generic advice.
      `,

      input: message,
    });

    res.json({
      reply: response.output_text,
    });

  } catch (error) {
    console.error("OpenAI API Error:", error);

    res.status(500).json({
      error: "WEAVE AI could not generate a response.",
    });
  }
});

app.use(express.static(__dirname));


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`WEAVE AI server running at http://localhost:${PORT}`);
});