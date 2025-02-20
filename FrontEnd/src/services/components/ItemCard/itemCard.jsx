import style from "./itemCard.module.css";

const ItemCard = ({ nom, description, imageUrl }) => {
    return (
        <div className={style.card}>
            <img src={imageUrl} alt={nom} />
            <h1>{nom}</h1>
            <p>Descrition du produit : {description}</p>
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