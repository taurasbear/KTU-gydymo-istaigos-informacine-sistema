import React, { createContext, useState, useEffect } from 'react';
import { fetchData, postData } from '../util/apiCalls';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchData('/user', setUser);
  }, []);

  const login = async (username, password) => {
    const response = await postData('/login', { username, password });
    setUser(response.data);
  };

  const logout = async () => {
    await fetchData('/logout', () => setUser(null));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;