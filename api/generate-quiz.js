const allowedTopics = [
  "Web Development",
  "Python",
  "Java",
  "SQL",
  "React JS",
  "Artificial Intelligence",
];

function validateQuestions(parsed, questionCount) {
  const questions = parsed?.questions;

  if (!Array.isArray(questions) || questions.length !== questionCount) {
    throw new Error("AI returned an unexpected number of questions.");
  }

  return questions.map((question) => {
    if (
      !question ||
      typeof question.question !== "string" ||
      !question.question.trim() ||
      !Array.isArray(question.options) ||
      question.options.length !== 4 ||
      !question.options.every(
        (option) => typeof option === "string" && option.trim()
      ) ||
      new Set(question.options.map((option) => option.trim())).size !== 4 ||
      typeof question.answer !== "string" ||
      !question.options.some(
        (option) => option.trim() === question.answer.trim()
      )
    ) {
      throw new Error("The AI returned an invalid question format.");
    }

    return {
      question: question.question.trim(),
      options: question.options.map((option) => option.trim()),
      answer: question.answer.trim(),
      difficulty: ["Easy", "Medium", "Hard"].includes(question.difficulty)
        ? question.difficulty
        : "Medium",
    };
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "Gemini API key is missing. Configure GEMINI_API_KEY.",
    });
  }

  const { topic, questionCount = 10 } = req.body || {};
  if (!allowedTopics.includes(topic)) {
    return res.status(400).json({ error: "Invalid quiz topic." });
  }
  if (![5, 10].includes(questionCount)) {
    return res.status(400).json({ error: "Question count must be 5 or 10." });
  }

  const prompt = `Generate exactly ${questionCount} original college-level multiple-choice questions about "${topic}".

Return only valid JSON in this format:
{"questions":[{"question":"Question text","options":["Option A","Option B","Option C","Option D"],"answer":"The exact correct option text","difficulty":"Easy"}]}

Requirements:
- Exactly ${questionCount} questions.
- Four distinct string options per question.
- Exactly one correct option per question.
- The answer must exactly match one option.
- Difficulty must be Easy, Medium, or Hard.
- Avoid duplicates and ambiguous questions.
- Return no Markdown or additional text.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" },
        }),
      }
    );

    if (!response.ok) {
      const temporary = response.status === 429 || response.status >= 500;
      return res.status(temporary ? 503 : 502).json({
        error: temporary
          ? "Gemini AI is temporarily busy. Please wait a little and try again."
          : "Gemini could not generate a quiz. Please try again.",
      });
    }

    const result = await response.json();
    const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      throw new Error("The AI returned an empty response.");
    }

    const questions = validateQuestions(JSON.parse(rawText), questionCount);
    return res.status(200).json({ topic, questions });
  } catch (error) {
    console.error("Quiz generation failed:", error);
    return res.status(502).json({
      error: "Gemini returned an invalid quiz response. Please try again.",
    });
  }
}
