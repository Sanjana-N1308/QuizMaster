
function Dashboard({ user, onStartQuiz, onProfile, onLeaderboard, onHistory, }) {
  const history = user.history || [];

  const totalTests = history.length;

  const averageScore =
    totalTests > 0
      ? Math.round(
          history.reduce((sum, test) => sum + test.percentage, 0) /
            totalTests
        )
      : 0;

  const bestScore =
    totalTests > 0
      ? Math.max(...history.map((test) => test.percentage))
      : 0;

  const topics = [
    {
      name: "Web Development",
      icon: "🌐",
      description: "HTML, CSS, HTTP and web fundamentals"
    },
    {
      name: "Python",
      icon: "🐍",
      description: "Python programming and core concepts"
    },
    {
      name: "Java",
      icon: "☕",
      description: "Java programming and OOP concepts"
    },
    {
      name: "SQL",
      icon: "🗄️",
      description: "Database and SQL fundamentals"
    },
    {
      name: "React JS",
      icon: "⚛️",
      description: "React components, hooks and JSX"
    },
    {
      name: "Artificial Intelligence",
      icon: "🤖",
      description: "AI and machine learning fundamentals"
    }
  ];

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <div className="dashboard-welcome">
          <p className="welcome-label">WELCOME BACK 👋</p>
          <h1>Hello, {user.name}</h1>
          <p className="dashboard-subtitle">
            Test your knowledge and improve your skills.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button
            className="profile-btn"
            onClick={onProfile}
          >
            👤 My Profile
          </button>

          <button
            className="leaderboard-btn"
            onClick={onLeaderboard}
          >
            🏆 Leaderboard
          </button>
          <button
  className="secondary-btn"
  onClick={onHistory}
>
  📚 Quiz History
</button>
        </div>
      </div>

      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">📝</div>

          <div>
            <span>Total Tests</span>
            <strong>{totalTests}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>

          <div>
            <span>Average Score</span>
            <strong>{averageScore}%</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏆</div>

          <div>
            <span>Best Score</span>
            <strong>{bestScore}%</strong>
          </div>
        </div>
      </div>

      {/* Topics */}

      <section className="topics-section">

        <div className="section-heading">
          <div>
            <h2>Choose Your Quiz</h2>
            <p>Select a topic to begin your test.</p>
          </div>
        </div>

        <div className="topics-grid">

          {topics.map((topic) => (
            <div
              className="topic-card"
              key={topic.name}
              onClick={() => onStartQuiz(topic.name)}
            >
              <div className="topic-icon">
                {topic.icon}
              </div>

              <h3>{topic.name}</h3>

              <p>{topic.description}</p>

              <button className="start-topic-btn">
                Start Quiz →
              </button>
            </div>
          ))}

        </div>

      </section>

      {/* Recent Tests */}

      <section className="recent-section">

        <div className="section-heading">
          <div>
            <h2>Recent Tests</h2>
            <p>Your latest quiz attempts</p>
          </div>
        </div>

        {history.length === 0 ? (
          <div className="empty-history">
            <div>📚</div>

            <h3>No tests taken yet</h3>

            <p>
              Choose a topic above and take your first quiz!
            </p>
          </div>
        ) : (
          <div className="history-list">

            {history
              .slice()
              .reverse()
              .slice(0, 5)
              .map((test) => (
                <div
                  className="history-item"
                  key={test.id}
                >
                  <div>
                    <strong>{test.topic}</strong>

                    <span>
                      {new Date(test.date).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="history-score">
                    <strong>{test.percentage}%</strong>

                    <span>
                      {test.correct}/{test.totalQuestions} correct
                    </span>
                  </div>
                </div>
              ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default Dashboard;