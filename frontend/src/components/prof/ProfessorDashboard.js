import React, { useState, useContext, useEffect } from "react";
import "./ProfessorDashboard.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Role } from "../../utils/constants";
import { generateQuizQuestions } from "../../services/profService";

const ProfessorDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [scores, setScores] = useState([
    { student: "Alice", quiz: "Maths Quiz", score: 85 },
    { student: "Bob", quiz: "Physics Quiz", score: 90 },
  ]);
  const [file, setFile] = useState(null);
  const [numQuestions, setNumQuestions] = useState("");
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Store the selected file
    }
  };

  const handleNumberChange = (event) => {
    setNumQuestions(event.target.value); // Store the number input
  };

  const handleGenerateQuiz = async (event) => {
    event.preventDefault();

    if (!file || !numQuestions) {
      alert("Please select a file and enter number of questions.");
      return;
    }

    try {
      setLoading(true);
      const {quiz, questions} = await generateQuizQuestions(file, numQuestions); // Call the service to upload the file and text
      quiz.questions = questions;
      setQuizzes([quiz]);
      console.log(quiz);

    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Quiz generation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditScore = (index, newScore) => {
    const updatedScores = [...scores];
    updatedScores[index].score = newScore;
    setScores(updatedScores);
  };

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/landing");
    }
    if (auth.user.role === Role.STUDENT) {
      navigate("/student/dashboard");
    }
  }, [auth, navigate]);

  if (!auth.isLoggedIn) {
    return null;
  }

  return (
    <div className="dashboard-container">
      {/* Left Panel */}
      <div className="left-panel">
        <h2>Welcome, {auth.user.name}</h2>

        {/* Notes Upload Section */}
        <h3>Upload Notes</h3>
        <form>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            onChange={handleFileUpload}
          />
          <input
            type="number"
            placeholder="Number of questions"
            value={numQuestions}
            onChange={handleNumberChange}
          />
        </form>
        <ul>
          {file &&
            <li>
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </li>
          }
        </ul>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        {/* Quiz Section */}
        <div className="quizzes-section">
          <h3>Generate Quizzes</h3>
          <button onClick={handleGenerateQuiz}>Generate Quiz</button>
          {loading && <div>Loading...</div>}
          <ul>
            {quizzes.map((quiz, index) => (
              <li key={index}>
                Title: {quiz.title}
                <ul>
                  {quiz.questions.map((question, qIndex) => (
                    <>
                    <li key={qIndex}>
                      {qIndex+1}.{question.question}
                      <br />
                      <ul>
                        {quiz.questions[qIndex].options.map((option, oIndex) => (
                          <li key={oIndex}>
                            - {option}
                          </li>
                        ))}
                      </ul>
                    </li>
                    <br />
                    </>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* Scores Section */}
        <div className="scores-section">
          <h3>Scores</h3>
          <ul>
            {scores.map((score, index) => (
              <li key={index}>
                {score.student} - {score.quiz}: {score.score}%
                <button
                  onClick={() => {
                    const newScore = prompt("Enter new score:", score.score);
                    if (newScore) handleEditScore(index, parseInt(newScore));
                  }}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashboard;
