import React, { createContext, useState, useEffect } from 'react';
import { fetchData, postData } from '../util/apiCalls';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchData('/api/user', (data) => {
      if (data) {
        setUser(data);
      }
    });
  }, []);

  const login = async (username, password) => {
    const response = await postData('/api/login', { username, password });
    setUser(response.data);
  };

  const logout = async () => {
    await fetchData('/api/logout', () => setUser(null));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;