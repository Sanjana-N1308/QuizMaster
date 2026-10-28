
import "./QuizInstructions.css";

function QuizInstructions({
  topic,
  questionCount,
  setQuestionCount,
  quizMode,
  setQuizMode,
  onStart,
  onBack,
}) {
  return (
    <div className="instructions-page">
      <div className="instructions-card">
        <div className="instructions-icon">🧠</div>
        <p className="instructions-label">AI-POWERED QUIZ</p>
        <h1>{topic} Quiz</h1>
        <p className="instructions-subtitle">
          Gemini AI generates fresh questions for every quiz.
        </p>

        <div className="settings-section">
          <h3>Choose your quiz settings</h3>

          <p>Number of questions</p>
          <div className="settings-options">
            {[5, 10].map((count) => (
              <button
                type="button"
                key={count}
                className={`settings-btn ${
                  Number(questionCount) === count ? "active" : ""
                }`}
                aria-pressed={Number(questionCount) === count}
                onClick={() => setQuestionCount(count)}
              >
                {count} Questions
              </button>
            ))}
          </div>

          <p>Quiz mode</p>
          <div className="settings-options">
            {[
              { value: "practice", label: "Practice — No Timer" },
              { value: "timed", label: "Timed Challenge" },
            ].map((mode) => (
              <button
                type="button"
                key={mode.value}
                className={`settings-btn ${
                  quizMode === mode.value ? "active" : ""
                }`}
                aria-pressed={quizMode === mode.value}
                onClick={() => setQuizMode(mode.value)}
              >
                {mode.label}
              </button>
            ))}
          </div>

          <p className="settings-summary">
            Selected: {questionCount} questions ·{" "}
            {quizMode === "practice" ? "No timer" : `${questionCount} minutes`}
          </p>
        </div>

        <div className="rules-box">
          <h3>Quiz rules</h3>
          <ul>
            <li>Questions cover Easy, Medium, and Hard difficulty levels.</li>
            <li>Each question has four options and one correct answer.</li>
            <li>Your results are saved after submission.</li>
            {quizMode === "timed" && (
              <li>You have {questionCount} minutes to complete the quiz.</li>
            )}
            {quizMode === "practice" && (
              <li>Practice mode has no countdown timer.</li>
            )}
          </ul>
        </div>

        <div className="instructions-actions">
          <button type="button" className="secondary-btn" onClick={onBack}>
            ← Back to Dashboard
          </button>
          <button type="button" className="primary-btn" onClick={onStart}>
            Generate Quiz &amp; Start →
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizInstructions;

