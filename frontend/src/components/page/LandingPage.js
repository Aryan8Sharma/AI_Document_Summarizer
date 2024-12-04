import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (userType) => {
    if (userType === "student") {
      navigate("/login/student");
    } else if (userType === "professor") {
      navigate("/login/professor");
    }
  };

  const generateTileRows = () => {
    return Array(5) // Generate 5 rows of tiles to fit the page
      .fill(0)
      .map((_, rowIndex) => (
        <div key={rowIndex} className="tile-row">
          {Array(10) // Each row will have 10 tiles
            .fill(0)
            .map((_, tileIndex) => (
              <div
                key={tileIndex}
                className="tile"
                style={{
                  backgroundColor: `hsl(${Math.random() * 360}, 70%, ${
                    60 + Math.random() * 20
                  }%)`, // Random colors
                }}
              ></div>
            ))}
        </div>
      ));
  };

  return (
    <div className="landing-page">
      {/* Tile Section */}
      <div className="tiles-section">{generateTileRows()}</div>

      {/* "I am" Section */}
      <div className="user-selection-section">
        <h1 className="heading">I am</h1>
        <div className="button-group">
          <button
            className="user-button"
            onClick={() => handleNavigation("student")}
          >
            Student
          </button>
          <button
            className="user-button"
            onClick={() => handleNavigation("professor")}
          >
            Professor
          </button>
        </div>
        <p className="register-link">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="register-link-text"
          >
            Register here!
          </span>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
