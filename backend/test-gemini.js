import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

try {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: 'Create one simple Python multiple-choice question. Return only JSON: {"question":"...", "options":["A","B","C","D"], "answer":"A"}',
  });

  console.log("GEMINI TEST SUCCESSFUL");
  console.log(response.text);
} catch (error) {
  console.error("GEMINI TEST FAILED");
  console.error("Status:", error.status ?? error.code ?? "unknown");
  console.error("Message:", error.message);
}

