import style from "./itemCard.module.css";

const ItemCard = ({ name, description, price, imageUrl }) => {
    return (
        <div className={style.card}>
            <img src={imageUrl} alt={name} />
            <h1>{name}</h1>
            <p>{price} €</p>
            <p>{description}</p>
        </div>
    );
};


export { ItemCard };