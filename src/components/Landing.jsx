

function Landing({ onShowLogin, onShowRegister }) {
  const topics = [
    { icon: "🌐", name: "Web Development", color: "blue" },
    { icon: "🐍", name: "Python", color: "green" },
    { icon: "☕", name: "Java", color: "orange" },
    { icon: "🗄️", name: "SQL", color: "purple" },
    { icon: "⚛️", name: "React JS", color: "cyan" },
    { icon: "🤖", name: "Artificial Intelligence", color: "pink" },
  ];

  return (
    <div className="landing-page">
      <nav className="landing-navbar">
        <button
          className="landing-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="brand-icon">Q</span>
          QuizMaster
        </button>

        <div className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#topics">Quiz Topics</a>
          <button className="nav-login" onClick={onShowLogin}>
            Login
          </button>
          <button className="nav-register" onClick={onShowRegister}>
            Get Started
          </button>
        </div>
      </nav>

      <main>
        <section className="landing-hero">
          <div className="hero-content">
            <span className="hero-badge">
              ✨ LEARN · PRACTICE · ACHIEVE
            </span>

            <h1>
              Challenge Your Mind.
              <br />
              <span>Master Your Skills.</span>
            </h1>

            <p className="hero-description">
              Test your knowledge, explore exciting topics, and track your
              progress with QuizMaster — your personal learning companion.
            </p>

            <div className="hero-actions">
              <button
                className="hero-primary-btn"
                onClick={onShowRegister}
              >
                Start Learning Free <span>→</span>
              </button>

              <button
                className="hero-secondary-btn"
                onClick={onShowLogin}
              >
                I already have an account
              </button>
            </div>

            <div className="hero-highlights">
              <div>
                <strong>06</strong>
                <span>Quiz Topics</span>
              </div>
              <div>
                <strong>10 min</strong>
                <span>Timed Challenges</span>
              </div>
              <div>
                <strong>Instant</strong>
                <span>Results</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-orbit orbit-one"></div>
            <div className="hero-orbit orbit-two"></div>

            <div className="hero-quiz-card">
              <div className="hero-card-top">
                <span>🧠</span>
                <span className="live-tag">READY TO LEARN</span>
              </div>

              <p className="hero-card-label">YOUR NEXT CHALLENGE</p>
              <h2>Level up your knowledge!</h2>
              <p className="hero-card-description">
                Choose a topic, answer questions, and discover what you know.
              </p>

              <div className="hero-card-progress">
                <span></span>
              </div>

              <div className="hero-card-footer">
                <span>🎯 Build confidence</span>
                <span>🚀 Keep improving</span>
              </div>
            </div>

            <div className="floating-note note-top">
              <span>⚡</span>
              Learn at your pace
            </div>

            <div className="floating-note note-bottom">
              <span>🏆</span>
              Track your progress
            </div>
          </div>
        </section>

        <section className="landing-features" id="features">
          <div className="section-heading">
            <span>WHY QUIZMASTER?</span>
            <h2>Everything you need to keep growing</h2>
            <p>Turn practice into progress with simple, useful tools.</p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon feature-purple">⏱️</div>
              <h3>Timed Challenges</h3>
              <p>
                Test your knowledge with timed quizzes and improve your
                ability to answer confidently.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon feature-green">📊</div>
              <h3>Instant Results</h3>
              <p>
                Review your score, correct answers, and mistakes immediately
                after completing a quiz.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon feature-orange">📈</div>
              <h3>Track Progress</h3>
              <p>
                Visit your profile to review previous attempts and see how
                your performance develops.
              </p>
            </article>
          </div>
        </section>

        <section className="landing-topics" id="topics">
          <div className="section-heading">
            <span>EXPLORE AND PRACTICE</span>
            <h2>Find your next challenge</h2>
            <p>Explore the topics available in QuizMaster.</p>
          </div>

          <div className="landing-topic-grid">
            {topics.map((topic) => (
              <article
                className={`landing-topic-card topic-${topic.color}`}
                key={topic.name}
              >
                <span className="landing-topic-icon">{topic.icon}</span>
                <h3>{topic.name}</h3>
                <p>Practice. Learn. Improve.</p>
              </article>
            ))}
          </div>

          <div className="topics-cta">
            <h2>Ready to test your knowledge?</h2>
            <p>Create your account and start your first quiz.</p>
            <button onClick={onShowRegister}>
              Get Started Now →
            </button>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-brand">
          <span className="brand-icon">Q</span>
          QuizMaster
        </div>
        <p>Learn something new. One question at a time.</p>
        <span>© {new Date().getFullYear()} QuizMaster</span>
      </footer>
    </div>
  );
}

export default Landing;
