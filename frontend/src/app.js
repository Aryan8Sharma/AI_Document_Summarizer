import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import StudentHome from "./components/student/Home";
import Exam from "./components/student/Exam";
import ProfessorHome from "./components/prof/Home";
import UploadNotes from './components/prof/NotesUpload';
import ManageQuizzes from "./components/prof/ManageQuizzes";
import LandingPage from "./components/page/LandingPage";
import StudentDashboard from "./components/student/Dashboard";
import ProfessorDashboard from "./components/prof/ProfessorDashboard";
import HomePage from "./components/page/HomePage";

function App() {
  const location = useLocation(); // Hook to get the current path

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
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/student/exam/:id" element={<Exam />} />
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
