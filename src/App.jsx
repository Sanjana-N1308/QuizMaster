

import { useEffect, useState } from "react";
import QuizInstructions from "./components/QuizInstructions";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Quiz from "./components/Quiz";
import QuizHistory from "./components/QuizHistory";
import QuizReview from "./components/QuizReview";
import Result from "./components/Result";
import Landing from "./components/Landing";
import Leaderboard from "./components/Leaderboard";

function App() {
  const [page, setPage] = useState("landing");
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [quizResult, setQuizResult] = useState(null);
  const [reviewSource, setReviewSource] = useState("result");
  const [questionCount, setQuestionCount] = useState(10);
  const [quizMode, setQuizMode] = useState("timed");

  useEffect(() => {
    const currentUserId = localStorage.getItem(
      "quizmaster_currentUser"
    );

    if (!currentUserId) return;

    const users =
      JSON.parse(localStorage.getItem("quizmaster_users")) || [];

    const user = users.find((u) => u.id === currentUserId);

    if (user) {
      setCurrentUser(user);
      setPage("dashboard");
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setPage("dashboard");
  };

  const handleRegister = (user) => {
    setCurrentUser(user);
    setPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("quizmaster_currentUser");
    setCurrentUser(null);
    setSelectedTopic("");
    setQuizResult(null);
    setPage("landing");
  };

  const handleStartQuiz = (topic) => {
    setSelectedTopic(topic);
    setQuestionCount(10);
    setQuizMode("timed");
    setPage("instructions");
  };

  const handleQuizFinish = (result) => {
    const completedResult = {
      ...result,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    const users =
      JSON.parse(localStorage.getItem("quizmaster_users")) || [];

    const updatedUsers = users.map((user) => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          history: [
            ...(user.history || []),
            completedResult,
          ],
        };
      }

      return user;
    });

    localStorage.setItem(
      "quizmaster_users",
      JSON.stringify(updatedUsers)
    );

    const updatedUser = updatedUsers.find(
      (user) => user.id === currentUser.id
    );

    setCurrentUser(updatedUser || currentUser);
    setQuizResult(completedResult);
    setPage("result");
  };

  const handleCancelQuiz = () => {
    const confirmExit = window.confirm(
      "Are you sure you want to exit the quiz? Your current answers will be lost."
    );

    if (confirmExit) setPage("dashboard");
  };

  const handleRetry = () => {
    setQuizResult(null);
    setPage("instructions");
  };

  // Login and registration pages
  if (!currentUser) {
    if (page === "landing") {
      return (
        <Landing
          onShowLogin={() => setPage("login")}
          onShowRegister={() => setPage("register")}
        />
      );
    }

    if (page === "register") {
      return (
        <Register
          onRegister={handleRegister}
          onShowLogin={() => setPage("login")}
        />
      );
    }

    return (
      <Login
        onLogin={handleLogin}
        onShowRegister={() => setPage("register")}
      />
    );
  }

  // Quiz instructions
  if (page === "instructions") {
    return (
      <QuizInstructions
        topic={selectedTopic}
        questionCount={questionCount}
        setQuestionCount={setQuestionCount}
        quizMode={quizMode}
        setQuizMode={setQuizMode}
        onStart={() => setPage("quiz")}
        onBack={() => setPage("dashboard")}
      />
    );
  }

  // Active quiz
  if (page === "quiz") {
    return (
      <Quiz
        topic={selectedTopic}
        questionCount={questionCount}
        quizMode={quizMode}
        onFinish={handleQuizFinish}
        onCancel={handleCancelQuiz}
      />
    );
  }

  // Results
  if (page === "result") {
    return (
      <Result
        result={quizResult}
        onDashboard={() => setPage("dashboard")}
        onRetry={handleRetry}
        onReview={() => {
          setReviewSource("result");
          setPage("review");
        }}
      />
    );
  }

  // Quiz history
  if (page === "history") {
    const users =
      JSON.parse(localStorage.getItem("quizmaster_users")) || [];

    const savedUser = users.find((u) => u.id === currentUser.id);

    return (
      <QuizHistory
        history={savedUser?.history || []}
        onBack={() => setPage("dashboard")}
        onReview={(test) => {
          setQuizResult(test);
          setReviewSource("history");
          setPage("review");
        }}
      />
    );
  }

  // Answer review
  if (page === "review") {
    return (
      <QuizReview
        result={quizResult}
        onBack={() => setPage(reviewSource)}
      />
    );
  }

  // Profile
  if (page === "profile") {
    return (
      <Profile
        user={currentUser}
        onBack={() => setPage("dashboard")}
        onLogout={handleLogout}
      />
    );
  }

  // Leaderboard
  if (page === "leaderboard") {
    const users =
      JSON.parse(localStorage.getItem("quizmaster_users")) || [];

    return (
      <Leaderboard
        users={users}
        currentUser={currentUser}
        onBack={() => setPage("dashboard")}
      />
    );
  }

  // Dashboard
  return (
    <Dashboard
      user={currentUser}
      onStartQuiz={handleStartQuiz}
      onProfile={() => setPage("profile")}
      onLeaderboard={() => setPage("leaderboard")}
      onHistory={() => setPage("history")}
    />
  );
}

export default App;
