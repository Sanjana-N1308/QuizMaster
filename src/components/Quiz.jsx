
import { useCallback, useEffect, useRef, useState } from "react";

const QUIZ_API = "http://localhost:5000/api/generate-quiz";

function Quiz({ topic, questionCount = 10, quizMode = "timed", onFinish, onCancel }) {
  const quizTime = quizMode === "timed" ? questionCount * 60 : null;

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quizTime);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const submittedRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    async function generateQuestions() {
      setLoading(true);
      setError("");
      setQuestions([]);
      setAnswers({});
      setCurrentQuestion(0);
      setTimeLeft(quizTime);
      submittedRef.current = false;

      try {
        const response = await fetch(QUIZ_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, questionCount }),
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Could not generate questions.");
        }

        if (!Array.isArray(data.questions) || data.questions.length !== questionCount) {
          throw new Error("The AI returned an unexpected set of questions.");
        }

        setQuestions(data.questions);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to generate questions. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    generateQuestions();
    return () => controller.abort();
  }, [topic, questionCount, quizTime]);

  const submitQuiz = useCallback(() => {
    if (questions.length === 0 || submittedRef.current) return;

    submittedRef.current = true;

    let correct = 0;

    questions.forEach((question, index) => {
      if (answers[index] === question.answer) correct++;
    });

    const totalQuestions = questions.length;
    const wrong = totalQuestions - correct;
    const percentage = Math.round((correct / totalQuestions) * 100);

    const timeTakenSeconds =
      quizMode === "timed" ? Math.max(0, quizTime - timeLeft) : 0;

    onFinish({
      topic,
      score: correct,
      correct,
      wrong,
      totalQuestions,
      percentage,
      timeTakenSeconds,
      quizMode,
      difficultyBreakdown: ["Easy", "Medium", "Hard"].reduce((result, level) => {
        const levelQuestions = questions.filter((q) => q.difficulty === level);
        result[level] = {
          total: levelQuestions.length,
          correct: levelQuestions.filter((q) => {
            const index = questions.indexOf(q);
            return answers[index] === q.answer;
          }).length,
        };
        return result;
      }, {}),
      questions: questions.map((question, index) => ({
        question: question.question,
        options: question.options,
        difficulty: question.difficulty || "Medium",
        selectedAnswer: answers[index] ?? null,
        correctAnswer: question.answer,
      })),
    });
  }, [questions, answers, topic, quizMode, quizTime, timeLeft, onFinish]);

  useEffect(() => {
    if (loading || error || questions.length === 0 || quizMode !== "timed") return;

    if (timeLeft <= 0) {
      submitQuiz();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [loading, error, questions.length, quizMode, timeLeft, submitQuiz]);

  if (loading) {
    return (
      <div className="quiz-loading">
        <div className="loading-icon">🧠</div>
        <h2>Gemini AI is preparing your quiz...</h2>
        <p>Creating {questionCount} new {topic} questions across difficulty levels.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-loading">
        <div className="loading-icon">⚠️</div>
        <h2>Unable to generate your quiz</h2>
        <p>{error}</p>
        <p>Check that the backend is running and your Gemini API key is configured.</p>
        <button className="primary-btn" onClick={() => window.location.reload()}>
          Retry
        </button>
        <button className="secondary-btn" onClick={onCancel}>
          ← Back
        </button>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const question = questions[currentQuestion];
  const minutes = Math.floor((timeLeft || 0) / 60);
  const seconds = (timeLeft || 0) % 60;
  const answeredCount = Object.keys(answers).length;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <div>
          <span className="quiz-label">QUIZMASTER AI</span>
          <h1>{topic}</h1>
          <p>{question.difficulty || "Mixed"} difficulty</p>
        </div>

        {quizMode === "timed" ? (
          <div className={timeLeft <= 60 ? "timer danger" : "timer"}>
            ⏱️ {minutes}:{String(seconds).padStart(2, "0")}
          </div>
        ) : (
          <div className="timer">Practice Mode</div>
        )}
      </div>

      <div className="quiz-progress-section">
        <div className="progress-info">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{answeredCount}/{questions.length} answered</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="question-card">
        <div className="question-number">
          QUESTION {currentQuestion + 1} · {question.difficulty || "Mixed"}
        </div>
        <h2>{question.question}</h2>

        <div className="options">
          {question.options.map((option, index) => {
            const selected = answers[currentQuestion] === option;

            return (
              <button
                key={`${index}-${option}`}
                className={selected ? "option selected" : "option"}
                onClick={() =>
                  setAnswers((previous) => ({
                    ...previous,
                    [currentQuestion]: option,
                  }))
                }
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
                {selected && <span className="selected-check">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="quiz-navigation">
        <button
          className="secondary-btn"
          onClick={() => setCurrentQuestion((previous) => previous - 1)}
          disabled={currentQuestion === 0}
        >
          ← Previous
        </button>

        <button className="cancel-btn" onClick={onCancel}>
          Exit Quiz
        </button>

        {currentQuestion === questions.length - 1 ? (
          <button className="submit-btn" onClick={submitQuiz}>
            Submit Quiz ✓
          </button>
        ) : (
          <button
            className="primary-btn"
            onClick={() => setCurrentQuestion((previous) => previous + 1)}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;

