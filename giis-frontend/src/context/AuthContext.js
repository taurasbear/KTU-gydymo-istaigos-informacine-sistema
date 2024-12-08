import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/user').then(response => {
      setUser(response.data);
    });
  }, []);

  const login = async (username, password) => {
    const response = await axios.post('/login', { username, password });
    setUser(response.data);
  };

  const logout = async () => {
    await axios.get('/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;