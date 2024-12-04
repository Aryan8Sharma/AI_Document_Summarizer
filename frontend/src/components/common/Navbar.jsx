import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  // Do not render "Quiz Platform" on the landing page
  if (location.pathname === "/landing") {
    return null;
  }

  return (
    <nav className="navbar">
      <h1>Quiz Platform</h1>
      {/* Additional navbar links here */}
    </nav>
  );
};

export default Navbar;
