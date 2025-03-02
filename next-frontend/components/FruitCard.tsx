//components/FruitCard.tsx
import { Fruit } from '../types/fruit';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component
// import { useMutation, useQueryClient } from '@tanstack/react-query'; // Import React Query
import { FaTrash, FaShoppingCart } from 'react-icons/fa'; // Import a delete icon from react-icons
import { useDeleteFruit } from '@/hooks/useFruitMutation';

interface FruitCardProps {
    fruit: Fruit
}


export default function FruitCard({ fruit }: FruitCardProps) {
    // const queryClient = useQueryClient(); // Access the query client
    const deleteFruitMutation = useDeleteFruit(); // Use the custom hook
    
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(fruit.price);

    // Handle delete button click
    const handleDelete = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent the Link from navigating
        event.stopPropagation(); // Stop event propagation
        if (window.confirm('Are you sure you want to delete this fruit?')) {
            deleteFruitMutation.mutate(fruit._id);
        }
    };
    // Handle add to cart button click
    const handleAddToCart = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent the Link from navigating
        event.stopPropagation(); // Stop event propagation
        // Add logic to add the fruit to the cart
        console.log('Adding to cart:', fruit);
        alert(`${fruit.name} added to cart!`);
    };

    return (
        <Link href={`/fruits/${fruit._id}`}>
            <div className='max-w-sm rounded overflow-hidden shadow-lg bg-white cursor-pointer
            hover:shadow-xl transition-shadow duration-300 h-full flex flex-col relative min-h-[300px]'>
                {/* Delete Icon */}
                <button
                    onClick={handleDelete}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 z-10" // Add z-10
                    aria-label="Delete fruit"
                >
                    <FaTrash className="w-4 h-4" />
                </button>
                {/* Cart Icon */}
                <button
                    onClick={handleAddToCart}
                    className="absolute top-2 left-2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200 z-10"
                    aria-label="Add to cart"
                >
                    <FaShoppingCart className="w-4 h-4" />
                </button>
                {/* Fruit Image */}
                <div className="w-full h-48 relative">
                {fruit.image_url ? (
                    <Image
                        src={fruit.image_url}
                        alt={fruit.name}
                        fill // Fill the container
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes
                        priority={false} // Set to true if this image is above the fold
                    />
                ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image Available</span>
                    </div>
                )}
                </div>
                <div className='px-6 py-4'>
                    <div className='font-bold text-xl mb-2'>{fruit.name}</div>
                    <p className='text-gray-700 text-base'>
                        Category: <span className='font-semibold'>{fruit.category}</span>
                    </p>
                    <p className='text-gray-700 text-base'>
                        <span className="font-semibold">Price:</span> {formattedPrice}
                    </p>
                    <p className='text-gray-700 text-base'>
                        <span className="font-semibold">Origin:</span> {fruit.origin}
                    </p>
                </div>
            </div>
        </Link>
    )
}