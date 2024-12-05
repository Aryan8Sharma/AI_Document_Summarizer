import React, { useState, useEffect } from "react"; // Make sure useState is imported
import { useSearchParams, useNavigate } from "react-router-dom";
import "./QuizPage.css";
import api from "../../utils/api";

const QuizPage = ({ onSubmit }) => {
  const [questions, setQuestions] = useState([
  ]);
  const [answers, setAnswers] = useState({});
  const [quiz, setQuiz] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3000); // 5 minutes timer

  const [searchParams] = useSearchParams();
  
  const className = searchParams.get("className");
  const quizId = searchParams.get("quizId");
//   console.log(searchParams + "====");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get(`/student/quiz/${quizId}`);
        setQuiz(response.data.quiz); // Update questions
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Failed to load questions. Please try again later.");
      }
    };
    fetchQuestions();
  }, []);

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

  const handleSubmit = async () => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);
  
    try {
      // Prepare the payload
      const payload = {
        quizId: quiz.id, // Use the `id` from the quiz object
        answers, // The `answers` state contains the mapping of question IDs to selected options
      };
  
      // Send the submission request
      const response = await api.post(`/student/quiz`, payload);

      console.log(quiz);
      
  
      alert("Quiz submitted successfully!");
      sessionStorage.setItem(quiz.id, response.data.score + "/" + quiz.questions.length);
      navigate("/student/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Failed to submit the quiz. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        {quiz ? (
          <>
            <h1 className="quiz-title">{quiz.title}</h1>
            <p className="quiz-description">{quiz.description}</p>
            <div className="questions-section">
              {quiz.questions.map((q) => (
                <div key={q.id} className="question-block">
                  <p className="question-text">{q.question_text}</p>
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
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </>
        ) : (
          <p>Loading quiz...</p>
        )}
      </div>
      <div className="timer-section">
        <h2>Time Remaining</h2>
        <div className="timer">{formatTime(timeLeft)}</div>
      </div>
    </div>
  );
};

export default QuizPage;