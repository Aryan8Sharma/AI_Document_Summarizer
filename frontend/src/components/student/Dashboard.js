import React, { useState, useContext, useEffect } from "react";
import "./Dashboard.css";
import LearningCurveChart from './LearningCurveChart';
import { Line } from "react-chartjs-2";
import { AuthContext } from "../../contexts/AuthContext";
import { Role } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState({
    Maths: [
      { name: "Algebra", score: null, attempted: false },
      { name: "Geometry", score: 85, attempted: true },
    ],
    Physics: [
      { name: "Kinematics", score: null, attempted: false },
      { name: "Dynamics", score: 90, attempted: true },
    ],
    Biology: [
      { name: "Genetics", score: 80, attempted: true },
      { name: "Ecology", score: null, attempted: false },
    ],
  });

  const activityData = {
    labels: ["Aug", "Sept", "Oct", "Nov", "Dec", "Jan"],
    datasets: [
      {
        label: "Materials",
        data: [40, 60, 80, 62, 70, 90],
        borderColor: "#7367F0",
        backgroundColor: "rgba(115, 103, 240, 0.2)",
        tension: 0.4,
      },
      {
        label: "Exams",
        data: [20, 40, 50, 42, 60, 70],
        borderColor: "#EA5455",
        backgroundColor: "rgba(234, 84, 85, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const handleQuizClick = (className, quizName) => {
    const quiz = quizzes[className].find((q) => q.name === quizName);
    if (quiz.attempted) {
      alert("You have already attempted this quiz!");
    } else {
      // Redirect to quiz page (to be implemented)
      alert(`Starting ${quizName} quiz for ${className}`);
    }
  };

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/landing");
    }
    if (auth.user.role == Role.PROFESSOR) {
      navigate("/professor/dashboard");
    }
  }, []);

  if (!auth.isLoggedIn) {
    return null;
  }

  return (
    <div className="dashboard">
      <div className="left-panel">
        <h2>Hello, {auth.user.name}</h2>
        <h3>Quizzes</h3>
        {Object.keys(quizzes).map((className) => (
          <div key={className}>
            <h4>{className}</h4>
            <ul>
              {quizzes[className].map((quiz) => (
                <li
                  key={quiz.name}
                  className={quiz.attempted ? "quiz-locked" : ""}
                  onClick={() => handleQuizClick(className, quiz.name)}
                >
                  {quiz.name} {quiz.score !== null && <span>- {quiz.score}%</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
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
          <Line data={activityData} />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
