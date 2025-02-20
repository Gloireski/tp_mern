import React, {createContext, useState, useContext, useEffect} from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState( () => {
        const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : []
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


    const addToCart = (fruit, quantity = 1) => {
        setTimeout(() => {
            setCart((prev) => {
                const existingItem = prev.find((item) => item.id === fruit.id);

                if (!existingItem) {
                    return [...prev, { ...fruit, quantity: quantity }];
                }

                return prev.map((item) =>
                    item.id === fruit.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            });
        }, 0); // Retarde la mise à jour juste après le rendu
    };


    const removeFromCart = (fruit, quantity = -1) => {
        setTimeout(() => {
            setCart((prev) => {
                const existingItem = prev.filter((item) => item.id === fruit.id);

                if (existingItem){
                    if (quantity === -1){
                        return prev.filter((item) => item.id !== fruit.id);
                    } else {
                        return prev.map((item) =>
                            item.id === fruit.id
                                ? { ...item, quantity: item.quantity - quantity }
                                : item
                        );
                    }
                }
            });
        }, 0);
    }


    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};