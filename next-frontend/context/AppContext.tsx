// context/AppContext.tsx
'use client'; // Mark this as a Client Component

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useFruits } from '@/hooks/useFruits';
import { Fruit } from '@/types/fruit';
import { User } from '@/types/user';

interface AppContextType {
  query: string;
  setQuery: (query: string) => void;
  filteredFruits: Fruit[];
  isLoading: boolean;
  error: Error | null;
  appState: AppState;
  setAppState: (appState: AppState) => void;
  setFruits: (newFruits: Fruit[]) => void;
}

interface AppState {
  theme: string;
  fruits: Fruit[];
  user: User | null;
  isLoggedIn: boolean;
  token: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState('');
  const [filteredFruits, setFilteredFruits] = useState<Fruit[]>([]);

  // Fetch fruits using the useFruits hook
  const { data: fruits, isLoading, error } = useFruits();
  console.log('data ', fruits)
  
  // Retrieve data from localStorage or use default values
  const getInitialState = () => {
    let savedState;
    if (typeof window !== 'undefined') {
        savedState = localStorage.getItem('appState');
    }
      return savedState
        ? JSON.parse(savedState)
          : {
              theme: 'light',
                fruits: [], // Initialize fruits as an empty array
                user: null,
                isLoggedIn: false,
                token: null,
                cart: null,
            };
        };
  const [appState, setAppState] = useState(getInitialState);
  // Update appState.fruits when fruits are fetched
  useEffect(() => {
    if (fruits) {
    setAppState((prevState: AppState) => ({
      ...prevState,
      fruits, // Update fruits in appState
    }));
    }
  }, [fruits]);
  const setFruits = (newFruits: Fruit[]) => {
    setAppState((prevState: AppState) => ({
      ...prevState,
      fruits: newFruits,
    }));
  };
  useEffect(()=> {
    localStorage.setItem('appState', JSON.stringify(appState)); 
    console.log('state updated')
    console.log(appState)
  }, [appState])
  // Update filteredFruits whenever the query or fruits change
  useEffect(() => {
    if (!fruits) return;

    const delayDebounceFn = setTimeout(() => {
      if (!query.trim()) {
        setFilteredFruits(fruits); // Show all fruits if the query is empty
      } else {
        const results = fruits.filter((fruit) =>
          fruit.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredFruits(results); // Filter fruits based on the query
      }
    }, 300); // Debounce the search by 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [query, fruits]);

  return (
    <AppContext.Provider
      value={{
        query,
        setQuery,
        filteredFruits,
        isLoading,
        error,
        appState,
        setFruits,
        setAppState
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};