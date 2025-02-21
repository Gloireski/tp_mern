import React, { createContext, useState } from 'react';

// Create a Context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Define your global state here
    const [appInfo, setAppInfo] = useState({
      theme: 'light', // Example: theme state
      user: null,     // Example: user state
      isLoggedIn: false, // Example: authentication state
      token: null,
      cart: null
    });
  
    // Function to update the theme
    const toggleTheme = () => {
      setAppInfo((prevState) => ({
        ...prevState,
        theme: prevState.theme === 'light' ? 'dark' : 'light',
      }));
    };
  
    // Function to update the user
    const setUser = (user, token) => {
      setAppInfo((prevState) => ({
        ...prevState,
        user,
        token,
        isLoggedIn: !!user,
      }));
    };
  
    // Value to be provided to the context
    const value = {
      appInfo,
      toggleTheme,
      setUser,
    };
  
    return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    );
  };