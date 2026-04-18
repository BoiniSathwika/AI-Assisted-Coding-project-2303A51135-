import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getMyProfile } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const token   = localStorage.getItem('glowco_token');
    const cached  = localStorage.getItem('glowco_user');
    if (token && cached) {
      setUser(JSON.parse(cached));
      // Optionally re-fetch fresh profile from API
      getMyProfile()
        .then(res => { setUser(res.data.user); localStorage.setItem('glowco_user', JSON.stringify(res.data.user)); })
        .catch(() => { localStorage.removeItem('glowco_token'); localStorage.removeItem('glowco_user'); setUser(null); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await loginUser({ email, password });
    const { token, user } = res.data;
    localStorage.setItem('glowco_token', token);
    localStorage.setItem('glowco_user', JSON.stringify(user));
    setUser(user);
    return user;
  };

  const signup = async (name, email, password) => {
    const res = await registerUser({ name, email, password });
    const { token, user } = res.data;
    localStorage.setItem('glowco_token', token);
    localStorage.setItem('glowco_user', JSON.stringify(user));
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('glowco_token');
    localStorage.removeItem('glowco_user');
    setUser(null);
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('glowco_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
