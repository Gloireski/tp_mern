//components/FruitCard.tsx
import { Fruit } from '../types/fruit';
import Link from 'next/link'

interface FruitCardProps {
    fruit: Fruit
}


export default function FruitCard({ fruit }: FruitCardProps) {
    
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(fruit.price);

    return (
        <Link href={`/fruits/${fruit._id}`}>
            <div className='max-w-sm rounded overflow-hidden shadow-lg bg-white cursor-pointer
            hover:shadow-xl transition-shadow duration-300'>
                {/* Fruit Image */}
                <img
                    src={fruit.image_url}
                    alt={fruit.name}
                    className="w-full h-48 object-cover"
                />
                <div className='px-6 py-4'>
                    <div className='font-bold text-xl mb-2'>{fruit.name}</div>
                    {/* <p className='text-gray-700 text-base'>
                        Category: <span className='font-semibold'>{fruit.category}</span>
                    </p> */}
                    <p className='text-gray-700 text-base'>
                        <span className="font-semibold">Price:</span> {formattedPrice}
                    </p>
                    <p className='text-gray-700 text-base'>
                        <span className="font-semibold">Origin:</span> {fruit.origin}
                    </p>
                    <p className='text-gray-700 text-base mt-2'>
                        <span>Description:</span>{' '}
                        {
                            fruit.description.length > 50
                            ? `${fruit.description.substring(0, 50)}...` // Truncate long descriptions
                            : fruit.description
                        }
                    </p>
                </div>
            </div>
        </Link>
    )
}