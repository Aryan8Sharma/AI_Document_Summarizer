import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { logoutService } from '../../services/authService';
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);

  // Do not render "Quiz Platform" on the landing page
  if (location.pathname === "/landing") {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logoutService();
      logout();
      navigate('/landing');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="navbar">
      <h1>Quiz Platform</h1>
      {/* Additional navbar links here */}
      {auth.isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
