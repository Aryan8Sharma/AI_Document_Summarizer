import React, { useState } from "react";
import "./Dashboard.css";
import LearningCurveChart from "./LearningCurveChart";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState({
    Maths: [
      { name: "Algebra", score: null, attempted: false, timeLeft: 300 },
      { name: "Geometry", score: 85, attempted: true, timeLeft: 0 },
    ],
    Physics: [
      { name: "Kinematics", score: null, attempted: false, timeLeft: 300 },
      { name: "Dynamics", score: 90, attempted: true, timeLeft: 0 },
    ],
    Biology: [
      { name: "Genetics", score: 80, attempted: true, timeLeft: 0 },
      { name: "Ecology", score: null, attempted: false, timeLeft: 300 },
    ],
  });

  const handleQuizClick = (className, quizName) => {
    const quiz = quizzes[className].find((q) => q.name === quizName);
    if (quiz.attempted) {
      alert("You have already attempted this quiz!");
    } else {
      navigate(`/student/quiz?quizName=${quizName}&className=${className}`);
    }
  };
  

  return (
    <div className="dashboard">
      {/* Left Panel */}
      <div className="left-panel">
        <h2>Hello, Student Name</h2>
        <h3>Quizzes</h3>
        {Object.keys(quizzes).map((className) => (
          <div key={className}>
            <h4>{className}</h4>
            <ul>
              {quizzes[className].map((quiz) => (
                <li key={quiz.name}>
                  <div className="quiz-info">
                    <span>
                      {quiz.name}{" "}
                      {quiz.score !== null && <span>- {quiz.score}%</span>}
                    </span>
                    {!quiz.attempted && (
                      <button
                        className="start-quiz-button"
                        onClick={() => handleQuizClick(className, quiz.name)}
                      >
                        Start Quiz
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="cards">
          <div className="card">
            <h4>Math Notes</h4>
            <p>Algebra, Calculus, Geometry...</p>
          </div>
          <div className="card">
            <h4>Physics Notes</h4>
            <p>Mechanics, Thermodynamics...</p>
          </div>
          <div className="card">
            <h4>Biology Notes</h4>
            <p>Cell Structure, Genetics...</p>
          </div>
        </div>

        <div className="graph">
          <h3>Learning Activity</h3>
          <LearningCurveChart />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
