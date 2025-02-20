import React from "react";
import { useCart } from "../../services/cart/cartContext.jsx";
import fruits from "../Fruits/fruits.jsx";

const Cart = () => {


    const { cart, removeFromCart } = useCart();

    if (cart.length === 0) {
        return <p>Votre panier est vide.</p>;
    }

    return (
        <div>
            <h2>Panier</h2>
            <ul>
                {cart.map((item) => (

                    <li key={item.id}>
                        {item.name} - {item.quantity}
                        <button onClick={() => removeFromCart(item)}>Supprimer</button>
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default Cart;