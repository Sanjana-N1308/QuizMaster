

function Leaderboard({ users, currentUser, onBack }) {
  const rankings = users
    .map((user) => {
      const history = user.history || [];
      const totalTests = history.length;

      const averageScore =
        totalTests > 0
          ? history.reduce(
              (sum, result) => sum + (result.percentage || 0),
              0
            ) / totalTests
          : 0;

      return {
        id: user.id,
        name: user.name,
        totalTests,
        averageScore,
      };
    })
    .filter((user) => user.totalTests > 0)
    .sort((a, b) => b.averageScore - a.averageScore);

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-header">
        <button onClick={onBack} className="leaderboard-back">
          ← Dashboard
        </button>

        <span className="leaderboard-badge">🏆 QUIZMASTER RANKINGS</span>
        <h1>Leaderboard</h1>
        <p>Celebrate progress and discover the top quiz performers.</p>
      </div>

      <div className="leaderboard-card">
        <div className="leaderboard-table-header">
          <span>Rank</span>
          <span>Participant</span>
          <span>Quizzes</span>
          <span>Average Score</span>
        </div>

        {rankings.length === 0 ? (
          <div className="leaderboard-empty">
            <span>📚</span>
            <h2>No rankings yet</h2>
            <p>Complete a quiz to appear on the leaderboard.</p>
          </div>
        ) : (
          rankings.map((user, index) => (
            <div
              className={`leaderboard-row ${
                user.id === currentUser.id ? "current-user-row" : ""
              }`}
              key={user.id}
            >
              <span className="leaderboard-rank">
                {index === 0
                  ? "🥇"
                  : index === 1
                    ? "🥈"
                    : index === 2
                      ? "🥉"
                      : `#${index + 1}`}
              </span>

              <div className="leaderboard-participant">
                <div className="leaderboard-avatar">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>

                <div>
                  <strong>{user.name}</strong>
                  {user.id === currentUser.id && (
                    <span className="you-label">You</span>
                  )}
                </div>
              </div>

              <span>{user.totalTests}</span>

              <div className="leaderboard-score">
                <strong>{user.averageScore.toFixed(1)}%</strong>
                <div className="leaderboard-progress">
                  <span
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(0, user.averageScore)
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <p className="leaderboard-note">
        Rankings are based on each participant's average quiz percentage.
      </p>
    </div>
  );
}

export default Leaderboard;
