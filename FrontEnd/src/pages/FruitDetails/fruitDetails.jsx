﻿import {useParams} from "react-router-dom";
import fruits from "../../data/fruits.json";
import DetailCard from "../../services/components/Cards/DetailCard/detailCard.jsx";
import style from "./fruitDetails.module.css";
import {useCart} from "../../services/cart/cartContext.jsx";
import {useEffect, useState} from "react";


const FruitDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const [fruit, setFruit] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFruitFromId = async () => {
        try {
            const response = await fetch(`http://localhost:5000/fruits/${id}`);
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }
            const data = await response.json();
            setFruit(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFruitFromId();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error}</p>;


    if (!fruit) {
        return <p>Fruit introuvable</p>; // Gère les cas où l'ID n'existe pas dans le JSON
    }


    const incrementQuantity = () => setQuantity(prev => prev + 1);

    // Fonction pour gérer la décrémentation (s'arrête à 1 minimum)
    const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : prev));

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) { // Empêche les valeurs non numériques ou négatives
            setQuantity(value);
        }
    };



    return (
        <div className={style.detailContainer}>
        <DetailCard key={fruit.id} {...fruit} />

    <div className={style.addToCartSide}>
        <button
            className={`${style.button} ${style.addButton}`}
            onClick={() => addToCart(fruit, quantity)}
        >
            Add to cart
        </button>

        <div className={style.quantityContainer}>
            <button
                className={`${style.button} ${style.decrementButton}`}
                onClick={decrementQuantity}
            >
                -
            </button>
            <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                className={style.quantityInput}
            />
            <button
                className={`${style.button} ${style.incrementButton}`}
                onClick={incrementQuantity}
            >
                +
            </button>
        </div>

        <div className={style.editButtonsContainer}>
            <button className={`${style.button} ${style.editButton}`}>
                Edit
            </button>
            <button className={`${style.button} ${style.deleteButton}`}>
                Delete
            </button>
        </div>
    </div>
</div>
    );
};


export default FruitDetails;