
function QuizReview({ result, onBack }) {
  const questions = result?.questions || [];

  return (
    <div className="result-page">
      <div className="result-card review-card">
        <p className="result-label">ANSWER REVIEW</p>
        <h1>{result.topic}</h1>

        <p>
          Score: <strong>{result.score}/{result.totalQuestions}</strong>
          {" "}({result.percentage}%)
        </p>

        {questions.length === 0 ? (
          <p>
            Detailed answers are unavailable for this attempt. New quiz
            attempts will include answer details.
          </p>
        ) : (
          <div className="review-questions">
            {questions.map((question, index) => {
              const isCorrect =
                question.selectedAnswer === question.correctAnswer;

              return (
                <div className="question-card" key={index}>
                  <p className="question-number">
                    QUESTION {index + 1} · {question.difficulty}
                  </p>

                  <h3>{question.question}</h3>

                  <p>
                    Your answer:{" "}
                    <strong>
                      {question.selectedAnswer ?? "Not answered"}
                    </strong>
                  </p>

                  <p>
                    Correct answer:{" "}
                    <strong>{question.correctAnswer}</strong>
                  </p>

                  <p>
                    {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <button className="primary-btn" onClick={onBack}>
          ← Back to Results
        </button>
      </div>
    </div>
  );
}

export default QuizReview;
