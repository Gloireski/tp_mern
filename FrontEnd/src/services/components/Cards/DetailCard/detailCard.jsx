import style from "./detailCard.module.css";
import React from "react";

const DetailCard = ({ name, description, price, category, origin, image_url }) => {
    return (
        <div className={style.card}>
            <div className={style.cardContent}>
                <div className={style.cardImage}>
                    <img src={image_url} alt={name} />
                </div>
                <div className={style.cardDetails}>
                    <h1>{name}</h1>
                    <p><strong>Description :</strong> {description}</p>
                    <p><strong>Price :</strong> {price} €</p>
                    <p><strong>Catégory :</strong> {category}</p>
                    <p><strong>Origin :</strong> {origin}</p>
                </div>
            </div>
        </div>
    );
};

export default DetailCard;