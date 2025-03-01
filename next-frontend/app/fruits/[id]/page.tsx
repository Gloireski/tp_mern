// app/fruits/[id]/page.tsx
'use client'
// import Link from 'next/link';
import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Fruit } from '@/types/fruit';
import { notFound } from 'next/navigation';

interface FruitDetailsPageProps {
  params: {
    _id: string;
  };
}

export default function FruitDetailsPage({ params }: FruitDetailsPageProps) {
    // const params = React.use(paramsPromise);
    // const { fruits, isLoading, error } = useAppContext();
    // const { fruits, setFruits } = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedFruit, setEditedFruit] = useState<Fruit | null>(null);
    
    const { appState, setFruits } = useAppContext();
    
    // Find the fruit by ID
    const { fruits } = appState;
    const fruit = fruits.find((f: Fruit) => f._id === params._id);
    // const fruit = fruits.find((f:Fruit) => f._id === params.id);

    // If the fruit is not found, return a 404 page
    if (!fruit) {
        notFound();
    }

    // Format the price
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(fruit.price);

     // Initialize editedFruit when fruit is found
    if (!editedFruit && fruit) {
        setEditedFruit({ ...fruit });
    }

    // Toggle edit mode
    const toggleEditMode = () => {
        setIsEditing((prev) => !prev);
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedFruit((prev) => (prev ? { ...prev, [name]: value } : null));
    };

      // Save changes
    const saveChanges = () => {
        if (editedFruit) {
        // Update the fruit in the global state
        const updatedFruits = appState.fruits.map((f: Fruit) => (f._id === editedFruit._id ? editedFruit : f));
        setFruits(updatedFruits);
        setIsEditing(false); // Exit edit mode
        }
    };

    return (
        <div className='p-6'>
            <h1 className='text-3xl font-bold mb-6'>{fruit.name}</h1>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
                {/* Fruit Image */}
                <img
                src={fruit.image_url}
                alt={fruit.name}
                className="w-full h-64 object-cover rounded-lg mb-6"
                />
                {/* Edit Mode Toggle Button */}
                <button
                onClick={toggleEditMode}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                {isEditing ? 'Cancel' : 'Edit'}
                </button>
                {isEditing ? (
                // Edit Form
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={editedFruit?.name || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={editedFruit?.category || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={editedFruit?.price || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Origin</label>
                        <input
                            type="text"
                            name="origin"
                            value={editedFruit?.origin || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Description</label>
                        <textarea
                            name="description"
                            value={editedFruit?.description || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Image URL</label>
                        <input
                            type="text"
                            name="image_url"
                            value={editedFruit?.image_url || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        onClick={saveChanges}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                        Save Changes
                    </button>
                </div>
                ) : (
                    // Display Mode
                // Display Mode
                <div className="space-y-4">
                    <p className="text-gray-700 text-lg">
                        <span className="font-semibold">Category:</span> {fruit.category}
                    </p>
                    <p className="text-gray-700 text-lg">
                        <span className="font-semibold">Price:</span> {formattedPrice}
                    </p>
                    <p className="text-gray-700 text-lg">
                        <span className="font-semibold">Origin:</span> {fruit.origin}
                    </p>
                    <p className="text-gray-700 text-lg">
                        <span className="font-semibold">Description:</span> {fruit.description}
                    </p>
                </div>
        )}
            </div>
        </div>
    )
}