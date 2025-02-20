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

const PostCards = ({ title, body, imageUrl }) => {
    return (
        <div className={style.card}>
            <img src={imageUrl} alt={title} />
            <h1>{title}</h1>
            <p>Descrition du produit : {body}</p>
        </div>
    );
};

export { ItemCard, PostCards };