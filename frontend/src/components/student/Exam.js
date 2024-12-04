import React, { useState, useEffect } from "react";
import axios from "../../utils/api";
import Timer from "./Timer";

const Exam = ({ match }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // Default exam duration (e.g., 5 minutes)
  const quizId = match.params.id;

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(`/getExamsQuestions?quiz_id=${quizId}`);
      setQuestions(response.data);
    };
    fetchQuestions();
  }, [quizId]);

  const handleSubmit = async () => {
    await axios.post("/submitTest", { quiz_id: quizId, answers });
    alert("Exam Submitted");
    window.location = "/student/home";
  };

  const handleTimeUp = () => {
    alert("Time's up! Your exam is being submitted.");
    handleSubmit();
  };

  return (
    <div>
      <h1>Exam</h1>
      <Timer duration={timeLeft} onTimeUp={handleTimeUp} />
      {questions.map((q, idx) => (
        <div key={idx}>
          <p>{q.question}</p>
          {q.options.map((opt, i) => (
            <label key={i}>
              <input
                type="radio"
                name={`question-${idx}`}
                value={opt}
                onChange={(e) =>
                  setAnswers({ ...answers, [q.id]: e.target.value })
                }
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
