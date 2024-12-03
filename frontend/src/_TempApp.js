import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Login from './components/auth/Login';
import StudentHome from './components/student/Home';
import Exam from './components/student/Exam';
import ProfessorHome from './components/prof/Home';
import UploadNotes from './components/prof/UploadNotes';
import ManageQuizzes from './components/prof/ManageQuizzes';
import Register from './components/auth/register';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/student/home" element={<StudentHome />} />
          <Route path="/student/exam/:id" element={<Exam />} />
          <Route path="/professor/home" element={<ProfessorHome />} />
          <Route path="/professor/upload" element={<UploadNotes />} />
          <Route path="/professor/manage" element={<ManageQuizzes />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
