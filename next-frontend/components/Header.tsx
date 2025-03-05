// components/Header.tsx
'use client'; // Mark this as a Client Component

import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
// import { useRouter } from 'next/navigation'
import React, { useState, useRef, useEffect } from 'react';
import { FaShoppingCart, FaUser, FaUsersCog } from 'react-icons/fa'; // Import cart icon
import { useLogout } from '@/hooks/useUsers';

export default function Header() {
  const { query, setQuery, setUser, appState } = useAppContext();
  const [ showDropDown, setShowDropDown ] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container
  // const router = useRouter();
  const logoutMutation = useLogout()

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown)
  }

  const handleLogout = async() => {
    // Call the logout mutation with the user's token
    try {
      if (appState.token) {
        await logoutMutation.mutateAsync(appState.token);
      }
      setUser(null, null)
    } catch(error) {
      if (error instanceof Error) {
        // console.error(error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }

  }
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropDown(false);
      }
    };

    // Add event listener when the dropdown is open
    if (showDropDown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropDown]);

  return (
    <header className='bg-gray-100 border-b border-gray-200 py-4'>
      <div className='max-w-7xl mx-auto flex md:flex-col justify-between items-center '>
        <Link href='/fruits'><h1 className='font-bold text-2xl text-green-500'>LE PANIER VERT</h1></Link>
          {/* Search Input and Cart Link */}
          <div className='flex md:flex-col justify-end items-center space-x-4'>
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
            <div className='relative text-gray-700 right-1' ref={dropdownRef}>
              <button onClick={toggleDropDown} className='p-1'>
                <FaUser className='w-6 h-6' />
              </button>
              {/* <!-- Dropdown menu with isolate --> */}
              {showDropDown && 
                <div className='isolate absolute right-0 sm:right-0 w-20 z-40 bg-white text-sm shadow-lg rounded-lg border
                border-gray-200 ransition-opacity duration-200 ease-in-out'>
                  {appState.isLoggedIn ? (
                  <>
                    {/* Show Users Manager Dashboard link if user is super_admin */}
                    {appState.user && appState.user.role === 'super_admin' && (
                      <Link
                        href='/fruits/admin/users'
                        className="flex items-center p-2 hover:bg-gray-100"
                      >
                        <FaUsersCog className="w-4 h-4 mr-2" />
                        <span>Manage Users</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left p-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href='/fruits/login' className="block p-2 hover:bg-gray-100">
                      Login
                    </Link>
                    <Link href='/fruits/register' className="block p-2 hover:bg-gray-100">
                      Sign Up
                    </Link>
                  </>
                )}
                </div>
              }
            </div>
         </div>
      </div>
    </header>
  );
}