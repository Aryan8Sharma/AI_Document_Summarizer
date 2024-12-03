
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: sessionStorage.getItem('token') || null,
    isLoggedIn: !!sessionStorage.getItem('token'),
  });

  const login = (token) => {
    sessionStorage.setItem('token', token);
    setAuth({ token, isLoggedIn: true });
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setAuth({ token: null, isLoggedIn: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
