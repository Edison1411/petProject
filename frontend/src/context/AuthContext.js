import React, { createContext, useState } from 'react';
import petsService from '../services/petsService';
import orderService from '../services/orderService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);


  const login = async (username, password) => {

    const response = await fetch(`http://localhost:3001/api/user/login?username=${username}&password=${password}`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    const data = await response.json();
    setToken(data.token);
    // Pass token to all services
    petsService.setToken(data.token);
    orderService.setToken(data.token);
  };
  
  const logout = () => {
    setToken(null);
    petsService.setToken(null);
    orderService.setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
