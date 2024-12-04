
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const UploadNotes = () => {
  const { auth } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [numQuestions, setNumQuestions] = useState(7);
  const [quiz, setQuiz] = useState([]);

  const handleGenerateQuiz = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('numQuestions', numQuestions);

    try {
      const response = await fetch(
        'http://localhost:3000/professor/upload-and-generate-quiz',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (data.quiz) {
        setQuiz(data.quiz);
        alert('Quiz generated successfully!');
      } else {
        alert('Failed to generate quiz.');
      }
    } catch (error) {
      alert('Error generating quiz: ' + error);
    }
  };

  return (
    <div>
      <h2>Upload Notes</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerateQuiz();
        }}
      >
        <label>Upload File:</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <br />
        <label>Number of Questions:</label>
        <input
          type="number"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          required
        />
        <br />
        <button type="submit">Generate Quiz</button>
      </form>

      <div>
        <h3>Generated Quiz</h3>
        {quiz.map((question, index) => (
          <div key={index} className="quiz-card">
            <p>
              <strong>Question:</strong> {question.text}
            </p>
            <p>
              <strong>Options:</strong> {question.options.join(', ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadNotes;
