// app/fruits/page.tsx
'use client'; // Mark this as a Client Component

import { useAppContext } from '@/context/AppContext';
import FruitCard from '@/components/FruitCard';
import { FaPlus } from 'react-icons/fa'; // Import the plus icon
// import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function FruitsPage() {
  const { filteredFruits, isLoading, error } = useAppContext();

  const router = useRouter();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
 
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default Link behavior
    // redirect(`/fruits`);
    router.push('/fruits/add');
  }

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
      <Link href='/fruit/add'>
        <button onClick={handleClick} className='flex items-center mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg
          hover:bg-blue-600 transition-colors duration-200'>
          <FaPlus className='mr-2'/>
          Add fruit
        </button>
      </Link>
    </div>
  );
}