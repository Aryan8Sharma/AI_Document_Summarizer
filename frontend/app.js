import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Login from './components/Auth/Login';
import StudentHome from './components/Student/Home';
import Exam from './components/Student/Exam';
import ProfessorHome from './components/Professor/Home';
import UploadNotes from './components/Professor/UploadNotes';
import ManageQuizzes from './components/Professor/ManageQuizzes';
import PrivateRoute from './utils/PrivateRoute';
import './app.css';


function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Switch>
        {/* Public Route */}
        <Route exact path="/login" component={Login} />

        {/* Student Routes */}
        <PrivateRoute path="/student/home" roles={['student']} component={StudentHome} />
        <PrivateRoute path="/student/exam/:id" roles={['student']} component={Exam} />

        {/* Professor Routes */}
        <PrivateRoute path="/professor/home" roles={['professor']} component={ProfessorHome} />
        <PrivateRoute path="/professor/upload" roles={['professor']} component={UploadNotes} />
        <PrivateRoute path="/professor/manage" roles={['professor']} component={ManageQuizzes} />
      </Switch>
      <Footer />
    </AuthProvider>
  );
}

export default App;
