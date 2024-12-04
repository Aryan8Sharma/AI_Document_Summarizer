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
      {/* <h1>{userType === "student" ? "Student Login" : "Professor Login"}</h1> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
       title={userType + "Login"}>
        <div className="register-container">
          {/* <img src="/assets/canvas.png" alt="Logo" className="logo" /> */}

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
        {/* <button type="submit">Login</button> */}
      </form>
    </div>
  );
};

export default login;
