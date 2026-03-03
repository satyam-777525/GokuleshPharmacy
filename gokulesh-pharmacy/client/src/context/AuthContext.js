import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getMe } from '../utils/api';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER': return { ...state, user: action.payload, loading: false };
    case 'LOGOUT': return { user: null, loading: false };
    case 'SET_LOADING': return { ...state, loading: action.payload };
    default: return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null, loading: true });

  useEffect(() => {
    const token = localStorage.getItem('gp_token');
    if (token) {
      getMe()
        .then(res => dispatch({ type: 'SET_USER', payload: res.data.user }))
        .catch(() => {
          localStorage.removeItem('gp_token');
          dispatch({ type: 'SET_LOADING', payload: false });
        });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem('gp_token', token);
    dispatch({ type: 'SET_USER', payload: user });
  };

  const logout = () => {
    localStorage.removeItem('gp_token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
