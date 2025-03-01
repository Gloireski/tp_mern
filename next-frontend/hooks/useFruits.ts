// hooks/useFruits.ts
'use client'; // Mark this as a Client Component

import { useQuery } from '@tanstack/react-query';
import { Fruit } from '@/types/fruit';

const fetchFruits = async (): Promise<Fruit[]> => {
  const response = await fetch('http://localhost:5000/fruits');
  if (!response.ok) {
    throw new Error('Failed to fetch fruits');
  }
  return response.json();
};

export const useFruits = () => {
  return useQuery<Fruit[]>({
    queryKey: ['fruits'],
    queryFn: fetchFruits,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 2, // Retry failed requests 2 times
  });
};