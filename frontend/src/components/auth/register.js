import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student"); // Default to "student"
  const [message, setMessage] = useState(""); // For success message
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Simulate a registration process
    const registrationData = {
      username,
      email,
      password,
      userType,
    };

    console.log("Registration Data:", registrationData);

    // Mock API call (replace with real API call if needed)
    setTimeout(() => {
      setMessage("Registered successfully! Redirecting to the login page...");
      setTimeout(() => navigate("/"), 2000); // Redirect to the landing page after 2 seconds
    }, 1000);
  };

  return (
    <div className="register-container">
      <img src="/assets/canvas.png" alt="Logo" className="logo" />
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          <option value="student">Student</option>
          <option value="professor">Professor</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default Register;
