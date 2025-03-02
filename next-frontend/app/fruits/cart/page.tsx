// app/fruits/cart/page.tsx
'use client';

import { useCart } from '@/context/CartContext';
import { Fruit } from '@/types/fruit';
import Link from 'next/link';

export default function CartPage() {
    const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useCart();

    // Calculate total price
    const totalPrice = cart.reduce(
        (total, item) => total + item.fruit.price * item.quantity,
        0
    );

    return (
        <div className='p-6 max-w-7xl mx-auto'>
            <h1 className='text-3xl font-bold mb-6'>Your Cart</h1>

            {cart.length === 0 ? (
                <p className='text-gray-700'>Your cart is empty.</p>
            ) : (
                <div className='space-y-4'>
                    {/* Cart Items */}
                    {cart.map((item) => (
                        <div
                            key={item.fruit._id}
                            className='bg-white p-4 rounded-lg shadow-lg flex justify-between items-center'
                        >
                            <div>
                                <h2 className='font-bold text-xl'>{item.fruit.name}</h2>
                                <p className='text-gray-700'>{item.fruit.category}</p>
                                <p className='text-gray-700'>
                                    {item.fruit.price.toFixed(2)} € x {item.quantity}
                                </p>
                                <p className='text-gray-700 font-bold'>
                                    Total: {(item.fruit.price * item.quantity).toFixed(2)} €
                                </p>
                            </div>
                            <div className='flex items-center space-x-4'>
                                {/* Decrement Quantity */}
                                <button
                                    onClick={() => decrementQuantity(item.fruit._id)}
                                    className='px-2 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200'
                                >
                                    -
                                </button>

                                {/* Quantity Display */}
                                <span className='text-lg'>{item.quantity}</span>

                                {/* Increment Quantity */}
                                <button
                                    onClick={() => incrementQuantity(item.fruit._id)}
                                    className='px-2 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200'
                                >
                                    +
                                </button>

                                {/* Remove Button */}
                                <button
                                    onClick={() => removeFromCart(item.fruit._id)}
                                    className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200'
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Total Price */}
                    <div className='bg-white p-4 rounded-lg shadow-lg'>
                        <p className='text-xl font-bold'>
                            Total: {totalPrice.toFixed(2)} €
                        </p>
                    </div>

                    {/* Checkout Button */}
                    <Link
                        href='/fruits/checkout'
                        className='block w-full text-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200'
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            )}
        </div>
    );
}