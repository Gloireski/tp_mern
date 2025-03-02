// components/Header.tsx
'use client'; // Mark this as a Client Component

import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon

export default function Header() {
  const { query, setQuery } = useAppContext();

  return (
    <header className='bg-gray-100 border-b border-gray-200 py-4'>
      <div className='max-w-7xl mx-auto px-4 flex justify-between items-center'>
        <Link href='/fruits'><h1 className='font-bold text-2xl text-green-500'>LE PANIER VERT</h1></Link>
          {/* Search Input and Cart Link */}
          <div className='flex items-center space-x-4'>
          <input
            type="text"
            placeholder="Search fruits..."
            value={query}
            onKeyDown={() => console.log('search')}
            onChange={(e) => setQuery(e.target.value)}
            className='px-4 py-2 border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <Link href='fruits/cart'
            className='flex items-center space-x-2 text-gray-700
              hover:text-green-500 transition-colors duration-200'>
            <span>Panier</span>
            <FaShoppingCart className='w-6 h-6' />
          </Link>
         </div>
      </div>
    </header>
  );
}