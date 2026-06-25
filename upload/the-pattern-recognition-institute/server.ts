import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini client to prevent crashes on startup if key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please add it in the Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Full-stack API Route for Vedic-Jungian Psychological Loop Analysis
app.post("/api/analyze", async (req, res) => {
  try {
    const { pattern, element, shadowTrigger, context } = req.body;

    if (!pattern || !element || !shadowTrigger) {
      return res.status(400).json({ error: "Missing required assessment parameters." });
    }

    const client = getGeminiClient();

    const systemInstruction = `You are the Senior Diagnostician at The Pattern Recognition Institute, an elite, high-authority Psychological Intelligence platform. 
You combine ancient Vedic cognitive mapping with Jungian Depth Psychology to decode the invisible behavioral loop (karmic footprint) creating an individual's present reality.
You do not predict the future, run fortune-telling astrology, or use superficial spiritual/coaching language. You locate the precise intersection of early psychological conditioning, shadow triggers, and nervous system wiring.
Your tone is deeply analytical, clinical, authoritative, and cinematic (reminiscent of high-level intelligence dossiers). You expose hard, illuminating structural truths about the unconscious shadow mechanism.`;

    const prompt = `Perform a rigorous psychological loop decoding of the following individual profile:
- Primary Recurring Pattern: ${pattern}
- Vedic Elemental Nature: ${element}
- Jungian Shadow Trigger: ${shadowTrigger}
- Personal Context/Manifestation: ${context || "None provided"}

Generate a high-authority diagnostic report using the precise schema.`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["diagnosis", "mechanism", "karmicCore", "mirror", "dharmaPath", "recommendedService"],
          properties: {
            diagnosis: {
              type: Type.STRING,
              description: "A commanding, high-authority cinematic title for this specific psychological loop (e.g., 'THE CAPTURED COMMANDER', 'THE DESERT ECHO').",
            },
            mechanism: {
              type: Type.STRING,
              description: "A deep, precise analytical explanation (100-150 words) detailing the exact unconscious engine driving this loop. Connect the Jungian shadow trigger with the Vedic elemental predisposition.",
            },
            karmicCore: {
              type: Type.STRING,
              description: "A short, sharp Vedic-Jungian aphorism explaining the core lesson/karmic structure of this loop.",
            },
            mirror: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Exactly 3 distinct, clinical, and chilling behaviors where this pattern unconsciously repeats in high-stakes personal or professional environments.",
            },
            dharmaPath: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Exactly 3 actionable, highly tactical strategic steps to dismantle and integrate this loop.",
            },
            recommendedService: {
              type: Type.OBJECT,
              required: ["name", "description", "fitReason"],
              properties: {
                name: { type: Type.STRING, description: "Name of the recommended premium service (e.g. 'CLINICAL PATHWAY DECODE', '3-MONTH BEHAVIORAL RESIDENCY')." },
                description: { type: Type.STRING, description: "Description of the recommended service." },
                fitReason: { type: Type.STRING, description: "A high-authority, persuasive explanation of why this specific program is the absolute, non-negotiable solution to their loop." },
              },
            },
          },
        },
      },
    });

    const reportText = response.text;
    if (!reportText) {
      throw new Error("Empty response received from the psychological decoder engine.");
    }

    const reportData = JSON.parse(reportText.trim());
    return res.json({ success: true, report: reportData });
  } catch (error: any) {
    console.error("Decoding error:", error);
    return res.status(500).json({
      error: error.message || "The psychological decoder engine encountered an internal loop. Refine your query and retry.",
    });
  }
});

// Serve frontend assets
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting development server with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting production server with static assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ASTROKALKI E) server running on http://localhost:${PORT}`);
  });
}

setupServer();
