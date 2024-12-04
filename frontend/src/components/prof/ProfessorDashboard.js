import React, { useState } from "react";
import "./ProfessorDashboard.css";

const ProfessorDashboard = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [scores, setScores] = useState([
    { student: "Alice", quiz: "Maths Quiz", score: 85 },
    { student: "Bob", quiz: "Physics Quiz", score: 90 },
  ]);

  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const newFile = { name: file.name, size: file.size };
      setUploadedFiles([...uploadedFiles, newFile]);
    }
  };

  const handleGenerateQuiz = () => {
    const newQuiz = {
      name: `Quiz ${quizzes.length + 1}`,
      questions: ["Question 1", "Question 2", "Question 3"],
    };
    setQuizzes([...quizzes, newQuiz]);
  };

  const handleEditScore = (index, newScore) => {
    const updatedScores = [...scores];
    updatedScores[index].score = newScore;
    setScores(updatedScores);
  };

  return (
    <div className="dashboard-container">
      {/* Left Panel */}
      <div className="left-panel">
        <h2>Welcome, Professor</h2>

        {/* Notes Upload Section */}
        <h3>Upload Notes</h3>
        <form>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            onChange={handleFileUpload}
          />
        </form>
        <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index}>
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        {/* Quiz Section */}
        <div className="quizzes-section">
          <h3>Generate Quizzes</h3>
          <button onClick={handleGenerateQuiz}>Generate Quiz</button>
          <ul>
            {quizzes.map((quiz, index) => (
              <li key={index}>
                {quiz.name}
                <ul>
                  {quiz.questions.map((question, qIndex) => (
                    <li key={qIndex}>{question}</li>
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
