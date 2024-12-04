import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('user');
    return {
      token: token || null,
      user: user ? JSON.parse(user) : null,
      isLoggedIn: !!token,
    };
  });

  const login = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    setAuth({ token, user, isLoggedIn: true });
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setAuth({ token: null, user: null, isLoggedIn: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
