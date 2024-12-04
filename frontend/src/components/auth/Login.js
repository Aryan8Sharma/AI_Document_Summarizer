import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const login = ({ userType }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Login clicked");
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }
  
    if (userType === "student") {
      console.log("Navigating to student dashboard");
      navigate("/student/dashboard");
      console.log("Navigation to student dashboard complete");
    } else if (userType === "professor") {
      console.log("Navigating to professor dashboard");
      navigate("/professor/dashboard");
      console.log("Navigation to professor dashboard complete");
    } else {
      alert("Invalid user type!");
    }
  };
  
  return (
    <div className="register-container">
      <h2>{userType === "student" ? "Student Login" : "Professor Login"}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
       title={userType + "Login"}>
        <div className="register-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <button className="user-button" type="submit">Login</button>
          {/* {message && <p className="success-message">{message}</p>} */}
        </div>
      </form>
    </div>
  );
};

export default login;
