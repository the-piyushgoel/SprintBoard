import { useReducer, useEffect, useCallback } from 'react';
import { AuthContext } from './authContext.js';
import * as authService from '../services/authService.js';

// Initial state matching the objective
const initialState = {
  user: null,
  loading: true,
  isAuthenticated: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'AUTH_FAIL':
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // checkAuth: checks current session on mount or refresh
  const checkAuth = useCallback(async () => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await authService.getMe();
      if (response?.success && response?.data?.user) {
        dispatch({ type: 'AUTH_SUCCESS', payload: response.data.user });
      } else {
        dispatch({ type: 'AUTH_FAIL' });
      }
    } catch {
      dispatch({ type: 'AUTH_FAIL' });
    }
  }, []);

  // login: logs in user and triggers state update
  const login = async (credentials) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await authService.login(credentials);
      if (response?.success && response?.data?.user) {
        dispatch({ type: 'AUTH_SUCCESS', payload: response.data.user });
        return response;
      }
      throw response;
    } catch (error) {
      dispatch({ type: 'AUTH_FAIL' });
      throw error;
    }
  };

  // register: registers user and automatically logs them in (since backend sets cookie on registration success)
  const register = async (userData) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await authService.register(userData);
      if (response?.success && response?.data?.user) {
        dispatch({ type: 'AUTH_SUCCESS', payload: response.data.user });
        return response;
      }
      throw response;
    } catch (error) {
      dispatch({ type: 'AUTH_FAIL' });
      throw error;
    }
  };

  // logout: logs out user and clears local state
  const logout = async () => {
    dispatch({ type: 'AUTH_START' });
    try {
      await authService.logout();
      dispatch({ type: 'LOGOUT' });
    } catch {
      // Even if network call fails, we still clean the frontend state to preserve security
      dispatch({ type: 'LOGOUT' });
    }
  };

  // Auto-restore session on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
