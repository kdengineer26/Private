import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Helper for Gemini AI client initialization
  function getGeminiClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing from environment variables.");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // API Route: Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API Route: Generate Heartfelt Love Letter or Custom Romantic Note
  app.post("/api/generate-letter", async (req, res) => {
    try {
      const { prompt, girlfriendName, senderName, vibe, relationshipHighlights } = req.body;
      const ai = getGeminiClient();

      const systemInstruction = `You are a deeply romantic, thoughtful, and expressive AI assistant helping a loving partner write a heartfelt love letter for National Girlfriend Day. 
Write in a sincere, warm, slightly poetic yet genuine tone. Incorporate any specific memories or highlights provided. Use sweet formatting with romantic line breaks and paragraphs.`;

      const userPrompt = `Write a romantic love letter for National Girlfriend Day.
Girlfriend's Name: ${girlfriendName || "My Love"}
Sender's Name: ${senderName || "Your Boy"}
Vibe/Tone: ${vibe || "Sweet, romantic, heartfelt"}
Memories/Highlights: ${relationshipHighlights || "Mirror selfies together, cafe coffee dates, laughters, stylish matching outfits, and unconditional love."}
Special Prompt or Thought: ${prompt || "Express how grateful I am to have her in my life every single day."}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.9,
        },
      });

      res.json({ letter: response.text });
    } catch (error: any) {
      console.error("Error generating love letter:", error);
      res.status(500).json({ error: error.message || "Failed to generate love letter" });
    }
  });

  // API Route: Generate Memory Photo Caption / Poem
  app.post("/api/generate-caption", async (req, res) => {
    try {
      const { photoTopic, memoryDetails, style } = req.body;
      const ai = getGeminiClient();

      const systemInstruction = `You write adorable, aesthetic, and touching photo captions or mini romantic poems (2-4 lines) for scrapbook memory photos.`;

      const userPrompt = `Write a cute ${style || "caption"} for a photo with my girlfriend.
Photo description/context: ${photoTopic || "Mirror selfie at a cafe date"}
Details: ${memoryDetails || "Looking adorable together"}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.85,
        },
      });

      res.json({ caption: response.text });
    } catch (error: any) {
      console.error("Error generating caption:", error);
      res.status(500).json({ error: error.message || "Failed to generate caption" });
    }
  });

  // Vite middleware for dev / static serving for prod
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
