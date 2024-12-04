import React, { useState, useEffect } from "react"; // Make sure useState is imported
import { useSearchParams, useNavigate } from "react-router-dom";
import "./QuizPage.css";

const QuizPage = ({ onSubmit }) => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
    },
    {
      id: 3,
      question: "Who developed the theory of relativity?",
      options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Marie Curie"],
    },
  ]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer

  const [searchParams] = useSearchParams();
  const className = searchParams.get("className");
  const quizName = searchParams.get("quizName");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Handle time up
    if (timeLeft === 0) {
      handleSubmit();
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerChange = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = () => {
    alert("Quiz submitted!");
    // Notify the parent component that the quiz is completed
    if (onSubmit) {
      onSubmit(className, quizName);
    }
    // Redirect back to the dashboard
    navigate("/student/dashboard");
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <h1 className="quiz-title">{quizName} Quiz</h1>
        <div className="questions-section">
          {questions.map((q) => (
            <div key={q.id} className="question-block">
              <p className="question-text">{q.question}</p>
              <div className="options">
                {q.options.map((option, index) => (
                  <label key={index} className="option">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      onChange={() => handleAnswerChange(q.id, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="timer-section">
        <h2>Time Remaining</h2>
        <div className="timer">{formatTime(timeLeft)}</div>
      </div>
    </div>
  );
};

export default QuizPage;
