// src/hooks/useAuth.ts
import { AuthContext } from '../auth';
import { useContext, useDebugValue } from 'react';

export const useAuth = () => {
  const context = useContext(AuthContext);

  // Ensuring context exists (for better error handling)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { isAuthenticated } = context;

  // Provide more clarity in the React DevTools
  useDebugValue(isAuthenticated, (isAuthenticated) => (isAuthenticated ? 'Logged In' : 'Logged Out'));

  return context;
};
