import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  const handleNavigateToLandingPage = () => {
    navigate("/landing"); // Adjust route as needed
  };

  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="hero-content">
          <h1>
            Empowering Students and Professors with{" "}
            <span className="highlight">Smarter, AI-Driven Dashboards</span>{" "}
            using <span className="highlight">DeepCanvas.</span>
          </h1>
          <p>
            Our platform leverages AI to streamline education dashboards, making
            them more intuitive and efficient.
          </p>
          <button
            className="navigate-button"
            onClick={handleNavigateToLandingPage}
          >
            Start
          </button>
        </div>
        <div className="hero-graphic">
          {/* Original Tiles */}
          <div className="graphic-box graphic-box-green"></div>
          <div className="graphic-box graphic-box-purple"></div>

          {/* Additional Tiles */}
          <div className="graphic-box graphic-box-orange"></div>
          <div className="graphic-box graphic-box-pink"></div>
          <div className="graphic-box graphic-box-blue"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
