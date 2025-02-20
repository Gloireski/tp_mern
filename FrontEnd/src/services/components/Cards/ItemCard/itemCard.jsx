import style from "./itemCard.module.css";

const ItemCard = ({ name, description, price, image_url }) => {
    return (
        <div className={style.card}>
            <img src={image_url} alt={name} />
            <h1>{name}</h1>
            <p>{price} €</p>
            <p>{description}</p>
        </div>
    );
};


export { ItemCard };