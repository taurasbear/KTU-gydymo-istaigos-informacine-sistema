import React, { createContext, useState, useEffect } from 'react';
import { fetchData, postData } from '../util/apiCalls';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData('/api/user', (data) => {
      if (data) {
        setUser(data);
      }
      setLoading(false);
    });
  }, []);

  const login = async (username, password) => {
    try {
      const user = await postData('/api/login', { username, password });
      setUser(user);
    } catch (error) {
      console.error('Error logging in:', error);
      setUser(null);
    }
  };

  const logout = async () => {
    await fetchData('/api/logout', () => setUser(null));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;