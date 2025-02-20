import {useParams} from "react-router-dom";
import fruits from "../../data/fruits.json";
import DetailCard from "../../services/components/Cards/DetailCard/detailCard.jsx";
import style from "./fruitDetails.module.css";
import {useCart} from "../../services/cart/cartContext.jsx";


const FruitDetails = () => {
    const { id } = useParams();

    const { addToCart } = useCart();

    const fruit = fruits.find(fruit => fruit.id === parseInt(id));

    if (!fruit) {
        return <p>Fruit introuvable</p>; // Gère les cas où l'ID n'existe pas dans le JSON
    }



    return (
        <div>
            <DetailCard key={fruit.id} {...fruit} />
            <div className={style.buttonsContainer}>
                <button className={`${style.button} ${style.deleteButton}`}>Supprimer</button>
                <button className={`${style.button} ${style.editButton}`}>Modifier</button>
                <button className={`${style.button} ${style.addButton}`}  onClick={() => addToCart(fruit)}>Ajouter au panier</button>
            </div>

        </div>
    );
};


export default FruitDetails;