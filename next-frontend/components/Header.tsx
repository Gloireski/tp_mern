// components/Header.tsx
'use client'; // Mark this as a Client Component

import { useAppContext } from '@/context/AppContext';

export default function Header() {
  const { query, setQuery } = useAppContext();

  return (
    <header className='bg-gray-100 border-b border-gray-200 py-4'>
      <div className='max-w-7xl mx-auto px-4 flex justify-between items-center'>
        <h1 className='font-bold text-2xl text-green-500'>LE PANIER VERT</h1>
        <input
          type="text"
          placeholder="Search fruits..."
          value={query}
          onKeyDown={() => console.log('search')}
          onChange={(e) => setQuery(e.target.value)}
          className='px-4 py-2 border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
    </header>
  );
}