import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";


import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/register";
import StudentHome from "./components/student/Home";
import QuizPage from "./components/student/QuizPage";
import ProfessorHome from "./components/prof/Home";
import UploadNotes from './components/prof/NotesUpload';
import ManageQuizzes from "./components/prof/ManageQuizzes";
import LandingPage from "./components/page/LandingPage";
import StudentDashboard from "./components/student/Dashboard";
import ProfessorDashboard from "./components/prof/ProfessorDashboard";
import HomePage from "./components/page/HomePage";

function App() {
  const location = useLocation(); // Hook to get the current path

  // Define the quizzes state
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

  // Function to update quiz state after submission
  const handleQuizSubmission = (className, quizName) => {
    setQuizzes((prevQuizzes) => {
      const updatedQuizzes = { ...prevQuizzes };
      const quizIndex = updatedQuizzes[className].findIndex((q) => q.name === quizName);
      if (quizIndex !== -1) {
        updatedQuizzes[className][quizIndex].attempted = true;
        updatedQuizzes[className][quizIndex].timeLeft = 0;
      }
      return updatedQuizzes;
    });
    console.log(`Quiz "${quizName}" in "${className}" marked as attempted`);
  };

  // Define routes where the navbar should not appear
  const noNavbarRoutes = ["/", "/landing"];

  return (
    <AuthProvider>
      {/* Conditionally render Navbar */}
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login/student" element={<Login userType="student" />} />
        <Route path="/login/professor" element={<Login userType="professor" />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/student/dashboard"
          element={<StudentDashboard quizzes={quizzes} />}
        />
        <Route 
  path="/student/quiz" 
  element={<QuizPage onSubmit={(className, quizName) => handleQuizSubmission(className, quizName)} />} 
/>

        <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/professor/home" element={<ProfessorHome />} />
        <Route path="/professor/upload" element={<UploadNotes />} />
        <Route path="/professor/manage" element={<ManageQuizzes />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
