import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import LearningCurveChart from './LearningCurveChart';
import { Line } from "react-chartjs-2";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [quizzes, setQuizzes] = useState({
  });

  const navigate = useNavigate();

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

  const handleQuizClick = (className, quizId) => {
    // Find the quiz object in the state
    const quiz = quizzes[className].find((q) => q.id === quizId);
  
    if (quiz.attempted) {
      alert("You have already attempted this quiz!");
    } else {
      navigate(`/student/quiz?quizId=${quizId}&className=${className}`);
  
      // Mark the quiz as attempted and update the score (you can customize this logic as needed)
      const updatedQuizzes = {
        ...quizzes,
        [className]: quizzes[className].map((q) =>
          q.id === quizId ? { ...q, attempted: true, score: Math.floor(Math.random() * 100) } : q
        ),
      };
  
      // Update the state with the modified quizzes
      setQuizzes(updatedQuizzes);
  
      // Log for debugging
      console.log(`Updated quizzes:`, updatedQuizzes);
    }
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        // Use Axios to fetch data
        const response = await api.get("/student/quiz", {
        });

        // let attempted = false;
        

        // Map quizzes to the required format
        const formattedQuizzes = {
          General: response.data.quizzes.map((quiz) => ({
            id: quiz.id,
            name: quiz.title, // Use "title" as the name
            score: sessionStorage.getItem(quiz.id) == null ?null : sessionStorage.getItem(quiz.id), // Assuming no score info in the response
            attempted: sessionStorage.getItem(quiz.id) == null ?false : true, // Assuming no attempted info in the response
          })),
        };
        
        setQuizzes(formattedQuizzes); // Set the transformed data
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="dashboard">
      <div className="left-panel">
        <h2>Hello, Student Name</h2>
        <h3>Quizzes</h3>
        {Object.keys(quizzes).map((className) => (
          <div key={className}>
            <h4>{className} (Click On Quiz to Start.)</h4>
            <ul>
              {quizzes[className].map((quiz) => (
                <li
                  key={quiz.id}
                  className={quiz.attempted ? "quiz-locked" : ""}
                  onClick={() => handleQuizClick(className, quiz.id)}
                >
                  {quiz.name} {quiz.score !== null && <span>- {quiz.score}</span>}
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
