import style from "./itemCard.module.css";

const ItemCard = ({ name, image_url }) => {
    return (
        <div className={style.card}>
            <img src={image_url} alt={name} />
            <h1>{name}</h1>
        </div>
    );
};


export { ItemCard };