import React from "react";
import { useCart } from "../../services/cart/cartContext.jsx";
import fruits from "../../data/fruits.json";
import styles from "./cart.module.css"; // Import des styles

const Cart = () => {
    const { cart, addToCart, removeFromCart } = useCart();

    if (cart.length === 0) {
        return <p>Votre panier est vide.</p>;
    }

    const handleIncreaseQuantity = (item) => {
        addToCart(item, 1);
    };

    const handleDecreaseQuantity = (item) => {
        if (item.quantity > 1) {
            removeFromCart(item, 1);
        } else {
            removeFromCart(item);
        }
    };

    const total = cart.reduce(
        (acc, item) =>
            acc + item.quantity * (fruits.find((fruit) => fruit.id === item.id)?.price ?? 0),
        0
    );

    return (
        <div className={styles["cart-container"]}>
            <div className={styles["cart-items"]}>
                <h2 className={styles['title']}>Shopping Cart</h2>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {cart.map((item) => {
                        const fruitDetails = fruits.find((fruit) => fruit.id === item.id);
                        const unitPrice = fruitDetails?.price ?? 0;
                        const subtotal = (item.quantity * unitPrice).toFixed(2);

                        return (
                            <li key={item.id} className={styles["cart-item"]}>
                                <img
                                    src={fruitDetails.image_url}
                                    alt={item.name}
                                />
                                <div className={styles["cart-item-content"]}>
                                    <h4 className={styles["cart-item-title"]}>{item.name}</h4>
                                    <p className={styles["cart-item-unit-price"]}>
                                        {unitPrice.toFixed(2)}€
                                    </p>
                                    <div className={styles["cart-item-controls"]}>
                                        <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className={styles["cart-item-delete"]}
                                        onClick={() => removeFromCart(item)}
                                    >
                                        Delete
                                    </button>
                                    <p>
                                        Sub-total :{" "}
                                        <span className={styles["cart-item-subtotal"]}>
                                            {subtotal}€
                                        </span>
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className={styles["cart-summary"]}>
                <h3 className={styles["cart-total"]}>Total : {total.toFixed(2)}€</h3>
                <button className={styles["buy-button"]}>
                    Buy
                </button>
            </div>
        </div>
    );
};

export default Cart;