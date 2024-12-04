import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./register.css";
import { Role } from "../../utils/constants";
import { signupService } from "../../services/authService";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(Role.STUDENT);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await signupService(name, email, password, userType);
      const { token, user } = response;
      login(token, user);
      // Show success message and redirect to login
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate(`/${user.role}/dashboard`);
      }, 2000); // Redirect to login page after 2 seconds
    } catch (error) {
      // Handle error during registration
      setError("Registration failed. Please try again.");
      setMessage(""); // Clear any success messages if an error occurs
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="userType">I am a:</label>
        <select
          id="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value={Role.STUDENT}>Student</option>
          <option value={Role.PROFESSOR}>Professor</option>
        </select>
        <button type="submit">Register</button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Register;
