import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  console.log("Gemini API key is missing from backend/.env");
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

try {
  const models = await ai.models.list();

  for await (const model of models) {
    if (model.supportedActions?.includes("generateContent")) {
      console.log(model.name);
    }
  }
} catch (error) {
  console.error("Could not list models:", error.message);
}
