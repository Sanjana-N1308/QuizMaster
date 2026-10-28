
function Result({ result, onDashboard, onRetry, onReview }) {
  const {
    topic,
    score,
    correct,
    wrong,
    totalQuestions,
    percentage,
    timeTakenSeconds
  } = result;

  const minutes = Math.floor(timeTakenSeconds / 60);
  const seconds = timeTakenSeconds % 60;

  let message = "Keep practicing! 💪";

  if (percentage >= 90) {
    message = "Outstanding performance! 🏆";
  } else if (percentage >= 70) {
    message = "Great job! 🎉";
  } else if (percentage >= 50) {
    message = "Good effort! Keep improving! 👍";
  }

  return (
    <div className="result-page">

      <div className="result-card">

        <div className="result-icon">
          {percentage >= 70 ? "🏆" : "📚"}
        </div>

        <p className="result-label">
          QUIZ COMPLETED
        </p>

        <h1>{topic}</h1>

        <p className="result-message">
          {message}
        </p>

        {/* Score */}

        <div className="score-circle">
          <div>
            <strong>{percentage}%</strong>
            <span>Score</span>
          </div>
        </div>

        <div className="score-text">
          You scored{" "}
          <strong>
            {score}/{totalQuestions}
          </strong>
        </div>

        {/* Statistics */}

        <div className="result-stats">

          <div className="result-stat correct">
            <span>✓</span>
            <small>Correct</small>
            <strong>{correct}</strong>
          </div>

          <div className="result-stat wrong">
            <span>✕</span>
            <small>Wrong</small>
            <strong>{wrong}</strong>
          </div>

          <div className="result-stat time">
            <span>⏱</span>
            <small>Time Taken</small>
            <strong>
              {minutes}:
              {String(seconds).padStart(2, "0")}
            </strong>
          </div>

        </div>

        {/* Buttons */}

        <div className="result-actions">

          <button
            className="secondary-btn"
            onClick={onDashboard}
          >
            ← Dashboard
          </button>

          <button className="secondary-btn" onClick={onReview}>
            Review Answers
          </button>

          <button
            className="primary-btn"
            onClick={onRetry}
          >
            Try Again ↻
          </button>

        </div>

      </div>

    </div>
  );
}

export default Result;