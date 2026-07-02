import { useContext } from 'react';
import { AuthContext } from '../context/authContext.js';

/**
 * Hook to access authentication state and handlers.
 * Throws an error if used outside AuthProvider.
 * @returns {Object} Authentication state and handlers
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
