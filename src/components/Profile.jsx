
function Profile({ user, onBack, onLogout }) {
  const history = user.history || [];

  const totalTests = history.length;

  const totalQuestions = history.reduce(
    (sum, test) => sum + test.totalQuestions,
    0
  );

  const totalCorrect = history.reduce(
    (sum, test) => sum + test.correct,
    0
  );

  const averageScore =
    totalTests > 0
      ? Math.round(
          history.reduce(
            (sum, test) => sum + test.percentage,
            0
          ) / totalTests
        )
      : 0;

  const bestScore =
    totalTests > 0
      ? Math.max(
          ...history.map((test) => test.percentage)
        )
      : 0;

  return (
    <div className="profile-page">

      {/* Header */}

      <div className="profile-topbar">

        <button
          className="back-btn"
          onClick={onBack}
        >
          ← Dashboard
        </button>

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          Logout
        </button>

      </div>

      {/* Profile Card */}

      <div className="profile-card">

        <div className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div className="profile-info">
          <h1>{user.name}</h1>

          <p>✉️ {user.email}</p>

          <span>
            Member since{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>

      </div>

      {/* Statistics */}

      <div className="profile-stats">

        <div className="profile-stat">
          <span>📝</span>
          <small>Total Tests</small>
          <strong>{totalTests}</strong>
        </div>

        <div className="profile-stat">
          <span>📊</span>
          <small>Average Score</small>
          <strong>{averageScore}%</strong>
        </div>

        <div className="profile-stat">
          <span>🏆</span>
          <small>Best Score</small>
          <strong>{bestScore}%</strong>
        </div>

        <div className="profile-stat">
          <span>✅</span>
          <small>Correct Answers</small>
          <strong>{totalCorrect}</strong>
        </div>

        <div className="profile-stat">
          <span>❓</span>
          <small>Questions Attempted</small>
          <strong>{totalQuestions}</strong>
        </div>

      </div>

      {/* Test History */}

      <div className="profile-history">

        <div className="profile-section-title">
          <h2>Test History</h2>
          <p>Complete record of your quiz attempts</p>
        </div>

        {history.length === 0 ? (

          <div className="no-tests">
            <div>📚</div>

            <h3>No Tests Yet</h3>

            <p>
              Complete your first quiz and your results
              will appear here.
            </p>
          </div>

        ) : (

          <div className="history-table-wrapper">

            <table className="history-table">

              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Correct</th>
                  <th>Wrong</th>
                  <th>Time</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>

                {history
                  .slice()
                  .reverse()
                  .map((test) => (

                    <tr key={test.id}>

                      <td>
                        <strong>{test.topic}</strong>
                      </td>

                      <td>
                        {test.score}/{test.totalQuestions}
                      </td>

                      <td>
                        <span
                          className={
                            test.percentage >= 70
                              ? "score-good"
                              : test.percentage >= 40
                              ? "score-average"
                              : "score-low"
                          }
                        >
                          {test.percentage}%
                        </span>
                      </td>

                      <td className="correct-text">
                        {test.correct}
                      </td>

                      <td className="wrong-text">
                        {test.wrong}
                      </td>

                      <td>
                        {Math.floor(
                          test.timeTakenSeconds / 60
                        )}
                        :
                        {String(
                          test.timeTakenSeconds % 60
                        ).padStart(2, "0")}
                      </td>

                      <td>
                        {new Date(
                          test.date
                        ).toLocaleDateString()}
                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Profile;