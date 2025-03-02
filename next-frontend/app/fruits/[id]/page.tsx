// app/fruits/[id]/page.tsx
'use client'
// import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useUpdateFruit } from '@/hooks/useFruitMutation'; // Import the custom hook
import { Fruit } from '@/types/fruit';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link'
import Image from 'next/image';

interface Params {
    id?: string; // `id` is optional
}

interface PageProps {
  params: Promise<Params>
}

export default function FruitDetailsPage({ params }: PageProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        origin: "",
    });

    const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the file input
   
    const { id } = React.use(params) as { id: string };;
    // console.log(id);
    const { appState } = useAppContext();
    
    // Find the fruit by ID
    const { fruits } = appState;
    const fruit = fruits.find((f: Fruit) => f._id === id);

    // If the fruit is not found, return a 404 page
    if (!fruit) {
        notFound();
    }


    // Format the price
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(fruit.price);

    // Initialize formData when fruit is found
    if (!formData.name && fruit) {
        setFormData({
        name: fruit.name,
        category: fruit.category,
        description: fruit.description,
        price: fruit.price.toString(),
        origin: fruit.origin,
        });
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]); // Store the selected file
        }
    };

    // Toggle edit mode
    const toggleEditMode = () => {
        setIsEditing((prev) => !prev);
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // const { name, value } = e.target;
        // setEditedFruit((prev) => (prev ? { ...prev, [name]: value } : null));
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    // Use the custom hook for updating the fruit
    const updateFruitMutation = useUpdateFruit(id);
      // Save changes
    const saveChanges = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('origin', formData.origin);
        if (imageFile) {
        formDataToSend.append('image', imageFile);
        }

        // Trigger the mutation
        try {
            const updatedFruit = await updateFruitMutation.mutateAsync(formDataToSend)
            // Reset the file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            // Exit edit mode
            setIsEditing(false);
            // Redirect to the updated fruit page
            redirect(`/fruits/${updatedFruit._id}`);
        } catch(error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
        // updateFruitMutation.mutate(formDataToSend);
    };

    return (
        <div className='p-6 max-w-xl self-center'>
            <Link className='p-2 mb-6 bg-green-500 text-white rounded-sm shadow-gray-600 hover:bg-green-500/80' href='/fruits'>All Fruits</Link>
            <h1 className='text-3xl font-bold my-6'>{fruit.name}</h1>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
                {/* Fruit Image */}
                {fruit.image_url? (
                    <Image
                        src={fruit.image_url}
                        alt='fruit.name'
                        // fill // Fill the container
                        width={500}
                        height={50}
                        className="object-cover w-full h-64"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes
                    />
                ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image Available</span>
                    </div>
                )}
                {/* Edit Mode Toggle Button */}
                <button
                onClick={toggleEditMode}
                className="my-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
                            value={formData?.name || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData?.category || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData?.price || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Origin</label>
                        <input
                            type="text"
                            name="origin"
                            value={formData?.origin || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Description</label>
                        <textarea
                            name="description"
                            value={formData?.description || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Upload Image</label>
                        <input
                            type="file"
                            name="image_url"
                            // value={editedFruit?.image_url || ''}
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            // onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        onClick={saveChanges}
                        disabled={updateFruitMutation.isPending}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                        {updateFruitMutation.isPending ? 'Saving...' : 'Save Changes'}
                    </button>
                    {/* Display error message if editing fails */}
                    {error && (
                            <p className="text-red-500 text-sm mt-2">
                                Error: {error}
                            </p>
                    )}
                </div>
                ) : (
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