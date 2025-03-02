// context/CartContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Fruit } from '../types/fruit';

interface CartItem {
    fruit: Fruit;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (fruit: Fruit) => void;
    removeFromCart: (fruitId: string) => void;
    incrementQuantity: (fruitId: string) => void;
    decrementQuantity: (fruitId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Add a fruit to the cart or increment its quantity if it already exists
    const addToCart = (fruit: Fruit) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.fruit._id === fruit._id);
            if (existingItem) {
                // If the fruit already exists in the cart, increment its quantity
                return prevCart.map((item) =>
                    item.fruit._id === fruit._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // If the fruit is not in the cart, add it with a quantity of 1
                return [...prevCart, { fruit, quantity: 1 }];
            }
        });
    };

    // Remove a fruit from the cart
    const removeFromCart = (fruitId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.fruit._id !== fruitId));
    };

    // Increment the quantity of a fruit in the cart
    const incrementQuantity = (fruitId: string) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.fruit._id === fruitId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // Decrement the quantity of a fruit in the cart
    const decrementQuantity = (fruitId: string) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.fruit._id === fruitId
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) } // Ensure quantity doesn't go below 1
                    : item
            )
        );
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};