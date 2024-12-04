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
    } else if (userType === "professor") {
      console.log("Navigating to professor dashboard");
      navigate("/professor/dashboard");
    } else {
      alert("Invalid user type!");
    }
  };

  return (
    <div>
      <h1>{userType === "student" ? "Student Login" : "Professor Login"}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default login;
