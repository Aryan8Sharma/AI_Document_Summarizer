import React, { useEffect, useState } from 'react';
import axios from '../../utils/api';

const Exam = ({ match }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const quizId = match.params.id;

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(`/getExamsQuestions?quiz_id=${quizId}`);
      setQuestions(response.data);
    };
    fetchQuestions();
  }, [quizId]);

  const handleSubmit = async () => {
    await axios.post('/submitTest', { quiz_id: quizId, answers });
    alert('Exam Submitted');
    window.location = '/student/home';
  };

  return (
    <div>
      <h1>Exam</h1>
      {questions.map((q, idx) => (
        <div key={idx}>
          <p>{q.question}</p>
          {q.options.map((opt, i) => (
            <label key={i}>
              <input
                type="radio"
                name={`question-${idx}`}
                value={opt}
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Exam;
