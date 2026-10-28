

function QuizHistory({ history = [], onBack, onReview }) {
  const sortedHistory = [...history].reverse();

  return (
    <div className="dashboard-page">
      <div className="section-heading">
        <div>
          <h2>Quiz History</h2>
          <p>View your previous quiz attempts and review your answers.</p>
        </div>

        <button className="secondary-btn" onClick={onBack}>
          ← Dashboard
        </button>
      </div>

      {sortedHistory.length === 0 ? (
        <div className="empty-history">
          <div>📚</div>
          <h3>No quiz history yet</h3>
          <p>Complete a quiz to see your results here.</p>
        </div>
      ) : (
        <div className="history-list">
          {sortedHistory.map((test) => (
            <div className="history-item" key={test.id}>
              <div>
                <strong>{test.topic}</strong>
                <span>
                  {test.date
                    ? new Date(test.date).toLocaleString()
                    : "Date unavailable"}
                </span>
                <span>
                  {test.correct}/{test.totalQuestions} correct
                  {" · "}
                  {test.quizMode === "practice"
                    ? "Practice"
                    : "Timed Challenge"}
                </span>
              </div>

              <div className="history-score">
                <strong>{test.percentage}%</strong>
                <button
                  className="secondary-btn"
                  onClick={() => onReview(test)}
                >
                  Review Answers
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuizHistory;
