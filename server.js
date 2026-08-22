require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));


// ==========================================
// GEMINI CONFIGURATION
// ==========================================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const GEMINI_MODEL = "gemini-3.6-flash";


// ==========================================
// WEAVE AI SYSTEM INSTRUCTIONS
// ==========================================

const WEAVE_AI_INSTRUCTIONS = `
You are WEAVE AI, the intelligent AI assistant inside WEAVE.

WEAVE is a professional networking platform designed
primarily for students, founders and young professionals.

Your job is to help users with:

- College and academic guidance
- Internships and jobs
- Projects
- Startups
- Entrepreneurship
- Skills and learning roadmaps
- Career advice
- Networking
- Resume and interview preparation
- Market and business knowledge
- Opportunities for students

Your personality:

- Helpful
- Smart
- Practical
- Friendly
- Concise
- Encouraging

Give actionable answers instead of generic advice.

When appropriate:
- Use bullet points
- Give step-by-step instructions
- Give examples
- Explain difficult concepts simply

Do not pretend that you performed actions that you cannot actually perform.

If you don't know something, clearly say so.
`;


// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", (req, res) => {

  res.json({
    success: true,
    aiConfigured: Boolean(GEMINI_API_KEY),
    model: GEMINI_MODEL
  });

});


// ==========================================
// GEMINI AI ENDPOINT
// ==========================================
// ==========================================
// LIVE TECH NEWS
// ==========================================

app.get("/api/news", async (req, res) => {
  try {
    const rssUrl =
      "https://news.google.com/rss/search?q=AI+OR+technology+OR+startups&hl=en-IN&gl=IN&ceid=IN:en";

    const response = await fetch(rssUrl);

    if (!response.ok) {
      throw new Error(`News feed failed: ${response.status}`);
    }

    const xml = await response.text();

    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .slice(0, 10)
      .map((match) => {
        const item = match[1];

        const getValue = (tag) => {
          const found = item.match(
            new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`)
          );

          return found
            ? found[1]
                .replace(/<!\[CDATA\[|\]\]>/g, "")
                .trim()
            : "";
        };

        return {
          title: getValue("title"),
          link: getValue("link"),
          publishedAt: getValue("pubDate"),
          source: getValue("source")
        };
      });

    res.json({
      success: true,
      news: items
    });
  } catch (error) {
    console.error("News error:", error);

    res.status(500).json({
      success: false,
      error: "Unable to fetch latest news"
    });
  }
});
app.post("/api/ai", async (req, res) => {

  try {

    const { message } = req.body || {};


    // --------------------------------------
    // CHECK MESSAGE
    // --------------------------------------

    if (!message || !String(message).trim()) {

      return res.status(400).json({
        error: "Message is required"
      });

    }


    // --------------------------------------
    // CHECK API KEY
    // --------------------------------------

    if (!GEMINI_API_KEY) {

      console.error("GEMINI_API_KEY is missing.");

      return res.status(500).json({
        error: "Gemini API key is not configured."
      });

    }


    // --------------------------------------
    // CALL GEMINI
    // --------------------------------------

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY
        },

        body: JSON.stringify({

          systemInstruction: {

            parts: [
              {
                text: WEAVE_AI_INSTRUCTIONS
              }
            ]

          },

          contents: [

            {
              role: "user",

              parts: [
                {
                  text: String(message).trim()
                }
              ]

            }

          ],

          generationConfig: {

            temperature: 0.7,

            maxOutputTokens: 1200

          }

        })

      }
    );


    // --------------------------------------
    // READ GEMINI RESPONSE
    // --------------------------------------

    const data = await response.json();


    // --------------------------------------
    // HANDLE GEMINI ERROR
    // --------------------------------------

    if (!response.ok) {

      console.error(
        "Gemini API Error:",
        data
      );

      return res.status(502).json({

        error:
          data?.error?.message ||
          "Gemini could not generate a response."

      });

    }


    // --------------------------------------
    // EXTRACT AI RESPONSE
    // --------------------------------------

    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map(part => part.text || "")
        .join("")
        .trim();


    // --------------------------------------
    // EMPTY RESPONSE
    // --------------------------------------

    if (!reply) {

      console.error(
        "Gemini returned empty response:",
        data
      );

      return res.status(502).json({

        error: "Gemini returned an empty response."

      });

    }


    // --------------------------------------
    // SEND RESPONSE TO WEAVE
    // --------------------------------------

    res.json({

      reply: reply

    });

  }


  // ========================================
  // SERVER ERROR
  // ========================================

  catch (error) {

    console.error(
      "WEAVE AI ERROR:",
      error
    );

    res.status(500).json({

      error:
        "WEAVE AI could not generate a response."

    });

  }

});


// ==========================================
// LOCAL SERVER
// ==========================================

if (require.main === module) {

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {

    console.log(
      `WEAVE AI server running at http://localhost:${PORT}`
    );

  });

}


// ==========================================
// EXPORT FOR VERCEL
// ==========================================

module.exports = app;