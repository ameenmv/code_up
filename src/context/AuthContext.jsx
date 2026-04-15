import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Mock user data — no real API yet
const MOCK_USER = {
  id: 1,
  username: 'Ahmed Hassan',
  email: 'ahmed@codeup.com',
  role: 'student',
  avatar: '',
  bio: 'High school student passionate about coding.',
  enrolledCourses: [1, 3],
  certificates: 2,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setUser(MOCK_USER);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
