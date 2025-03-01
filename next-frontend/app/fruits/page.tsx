// app/fruits/page.tsx
'use client'; // Mark this as a Client Component

import { useAppContext } from '@/context/AppContext';
import FruitCard from '@/components/FruitCard';

export default function FruitsPage() {
  const { filteredFruits, isLoading, error } = useAppContext();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-6'>Fruits</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {
          filteredFruits.map((fruit) => (
            <FruitCard key={fruit._id} fruit={fruit}/>
          ))
        }
      </div>
      {filteredFruits.length === 0 && (
            <div className='text-center mt-4'>
                <p className='text-xl text-red-300'>Aucun fruit correspondant.</p>
            </div>
            )}
    </div>
  );
}