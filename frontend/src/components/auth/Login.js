import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { loginService } from "../../services/authService";
import { Role } from "../../utils/constants";

const Login = ({ userType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null); // Clear any previous errors
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const { token, user } = await loginService(email, password);
      login(token, user); // Save token and user to context

      // Navigate based on user role
      if (user.role === Role.STUDENT) {
        navigate("/student/dashboard");
      } else if (user.role === Role.PROFESSOR) {
        navigate("/professor/dashboard");
      } else {
        alert("Unknown role, please contact admin!");
      }
    } catch (err) {
      console.error("Login failed:", err.message);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        title={userType + " Login"}
      >
        <div className="register-container">
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
          <button className="user-button" type="submit">
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Login;
