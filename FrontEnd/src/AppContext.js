import React, { createContext, useState, useEffect } from 'react';
import { useFruits } from './hooks/useFruits';
// Create a Context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [filteredFruits, setFilteredFruits] = useState([]);
   // Use the useFruits hook to fetch fruits
   const { data: fruits, isLoading, error } = useFruits();
  // Retrieve data from localStorage or use default values
  const getInitialState = () => {
    const savedState = localStorage.getItem('appState');
    return savedState
      ? JSON.parse(savedState)
      : {
          theme: 'light',
          fruits: [],
          user: null,
          isLoggedIn: false,
          token: null,
          cart: null,
        };
  };
  // definition de l'état global de l'app
  const [appState, setAppState] = useState(getInitialState);

  useEffect(()=> {
    localStorage.setItem('appState', JSON.stringify(appState)); 
    console.log('state updated')
  }, [appState])
  // Update filteredFruits whenever the query changes
  useEffect(() => {
  
    const delayDebounceFn = setTimeout(() => {
      if (!appState.fruits || !Array.isArray(appState.fruits)) {
          alert("Fruits data is not available.");
          console.log("Fruits data is not available.");
          return;
      }
      // If the query is empty
      if (!query.trim()) {
          setFilteredFruits(appState.fruits);
          // fetchFruits()
          return;
      }
      console.log(appState.fruits)
      // Filter fruits whose names start with the query
      const results = appState.fruits.filter((fruit) =>
          fruit.name.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredFruits(results);
      }, 300); // 300ms delay

      // Cleanup the timeout on query change
      return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Function to update the theme
  const toggleTheme = () => {
    setAppState((prevState) => ({
      ...prevState,
      theme: prevState.theme === 'light' ? 'dark' : 'light',
    }));
  };

  // Function to update the user
  const setUser = (user, token) => {
    setAppState((prevState) => ({
      ...prevState,
      user,
      token,
      isLoggedIn: !!user,
    }));
  };

  // fonction pour update fruits
  const setFruits = (fruits) => {
    setAppState((prevState) => ({
      ...prevState,
      fruits
    }));
  };

  // Value to be provided to the context
  const value = {
    appState,
    toggleTheme,
    setUser,
    setFruits,
    setQuery,
    query,
    filteredFruits,
    setFilteredFruits
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
  };