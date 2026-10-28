
import { useState } from "react";

function Login({ onLogin, onShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("quizmaster_users")) || [];

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem(
      "quizmaster_currentUser",
      user.id
    );

    onLogin(user);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-icon">
          🧠
        </div>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to continue your QuizMaster journey
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="primary-btn auth-btn"
          >
            Login →
          </button>

        </form>

        <div className="auth-switch">
          Don't have an account?

          <button onClick={onShowRegister}>
            Create Account
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;