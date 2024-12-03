import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
    <nav>
      <Link to="/student/home">Student Home</Link>
      <Link to="/professor/home">Professor Home</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navbar;
