// hooks/useFruitMutations.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Fruit } from '../types/fruit';

export const useDeleteFruit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (fruitId: string) => {
            const response = await fetch(`http://localhost:5000/fruits/${fruitId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete fruit');
            }
            // Log the response for debugging
            const responseText = await response.text();
            console.log('Server Response:', responseText);

            // If the response is empty, return a success message
            return responseText ? JSON.parse(responseText) : { message: 'Fruit deleted successfully' };
        },
        onSuccess: () => {
            // Invalidate the fruits query to refetch the data
            queryClient.invalidateQueries({ queryKey: ['fruits'] });
        },
        onError: (error: Error) => {
            console.error('Error deleting fruit:', error.message);
            alert('Failed to delete fruit');
        },
    });
};

// TanStack Query mutation for updating the fruit
export const useUpdateFruit = (fruitId: string) =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (formDataToSend: FormData) => {
            const response = await fetch(`http://localhost:5000/fruits/${fruitId}`, {
                method: 'PUT',
                body: formDataToSend,
                });
                if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
                }
                return response.json();
        },
        onSuccess: (updatedFruit: Fruit) => {
            // Update the fruits query data in the cache
            queryClient.setQueryData(['fruits'], (oldFruits: Fruit[]) =>
                oldFruits.map((f) => (f._id === updatedFruit._id ? updatedFruit : f))
            );
            // redirect(`/fruits/${updatedFruit._id}`);
            },
        onError: (error: Error) => {
            console.error(`Failed to update fruit: ${error.message}`);
            throw error;
        },
    });
} 