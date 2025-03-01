// hooks/useFruits.js
import { useQuery } from '@tanstack/react-query';

const fetchFruits = async () => {
  const response = await fetch('http://localhost:5000/fruits');
  if (!response.ok) {
    throw new Error('Failed to fetch fruits');
  }
  return response.json();
};

export const useFruits = () => {
  return useQuery({
    queryKey: ['fruits'], // Unique key for caching
    queryFn: fetchFruits, // Function to fetch data
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 2, // Retry failed requests 2 times
  });
};