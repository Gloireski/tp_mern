import {useParams} from "react-router-dom";
import fruits from "../../data/fruits.json";
import DetailCard from "../../services/components/Cards/DetailCard/detailCard.jsx";
import style from "./fruitDetails.module.css";
import {useCart} from "../../services/cart/cartContext.jsx";
import {useState} from "react";


const FruitDetails = () => {
    const { id } = useParams();

    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);

    const fruit = fruits.find(fruit => fruit.id === parseInt(id));

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