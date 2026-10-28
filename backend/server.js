

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`QuizMaster backend running on port ${PORT}`);
});

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

const allowedTopics = [
  "Web Development",
  "Python",
  "Java",
  "SQL",
  "React JS",
  "Artificial Intelligence",
];

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function isTemporaryError(error) {
  const message = String(error?.message || error);
  const status = String(error?.status || error?.code || "");

  return (
    /503|429|UNAVAILABLE|RESOURCE_EXHAUSTED|high demand|overloaded|temporarily unavailable/i.test(
      `${status} ${message}`
    )
  );
}

function validateQuestions(parsed, questionCount) {
  const questions = parsed?.questions;

  if (!Array.isArray(questions) || questions.length !== questionCount) {
    throw new Error("AI returned an unexpected number of questions.");
  }

  return questions.map((q) => {
    if (
      !q ||
      typeof q.question !== "string" ||
      !q.question.trim() ||
      !Array.isArray(q.options) ||
      q.options.length !== 4 ||
      !q.options.every(
        (option) => typeof option === "string" && option.trim()
      ) ||
      new Set(q.options.map((option) => option.trim())).size !== 4 ||
      typeof q.answer !== "string" ||
      !q.options.some((option) => option.trim() === q.answer.trim())
    ) {
      throw new Error("The AI returned an invalid question format.");
    }

    const difficulty = ["Easy", "Medium", "Hard"].includes(q.difficulty)
      ? q.difficulty
      : "Medium";

    return {
      question: q.question.trim(),
      options: q.options.map((option) => option.trim()),
      answer: q.answer.trim(),
      difficulty,
    };
  });
}

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    aiConfigured: Boolean(ai),
  });
});

app.post("/api/generate-quiz", async (req, res) => {
  if (!ai) {
    return res.status(500).json({
      error: "Gemini API key is missing. Configure backend/.env.",
    });
  }

  const { topic, questionCount = 10 } = req.body || {};

  if (!allowedTopics.includes(topic)) {
    return res.status(400).json({ error: "Invalid quiz topic." });
  }

  if (![5, 10].includes(questionCount)) {
    return res.status(400).json({
      error: "Question count must be 5 or 10.",
    });
  }

  const prompt = `
Generate exactly ${questionCount} original college-level multiple-choice
questions about "${topic}".

Return only valid JSON in this format:
{
  "questions": [
    {
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "The exact correct option text",
      "difficulty": "Easy"
    }
  ]
}

Requirements:
- Exactly ${questionCount} questions.
- Four distinct string options per question.
- Exactly one correct option per question.
- The answer must exactly match one option.
- Difficulty must be Easy, Medium, or Hard.
- Avoid duplicates and ambiguous questions.
- Return no Markdown or additional text.
`;

  // Three attempts in total, with a short delay between attempts.
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(
        `Generating ${topic} quiz: attempt ${attempt}/${maxAttempts}`
      );

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const rawText = response.text;

      if (!rawText) {
        throw new Error("The AI returned an empty response.");
      }

      const parsed = JSON.parse(rawText);
      const questions = validateQuestions(parsed, questionCount);

      console.log(`Quiz generated successfully for ${topic}.`);

      return res.json({ topic, questions });
    } catch (error) {
      console.error(
        `Quiz generation attempt ${attempt} failed:`,
        error.message
      );

      const canRetry =
        attempt < maxAttempts &&
        (isTemporaryError(error) ||
          /invalid question format|unexpected number|empty response|JSON|parse/i.test(
            error.message || ""
          ));

      if (canRetry) {
        await sleep(attempt * 1500);
        continue;
      }

      if (isTemporaryError(error)) {
        return res.status(503).json({
          error:
            "Gemini AI is temporarily busy. Please wait a little and try again.",
        });
      }

      return res.status(502).json({
        error:
          "Gemini returned an invalid quiz response. Please try generating the quiz again.",
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`QuizMaster AI backend running at http://localhost:${PORT}`);
});
