import { useLocation } from "react-router-dom";
import "./Navbar.css"; // External CSS file for styling

const Navbar = () => {
  const location = useLocation();

  // Do not render "Quiz Platform" on the landing page
  if (location.pathname === "/landing") {
    return null;
  }

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Quiz Platform</h1>
    </nav>
  );
};

export default Navbar;
