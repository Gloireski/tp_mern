import React from "react";
import {ItemCard} from "../ItemCard/itemCard.jsx";
import style from "./categoryCard.module.css";


const Category = ({ title, fruits }) => {
    return (
        <div className={style.category}>
            <h2 className={style.title}>{title}</h2>
            <div className={style.fruitgrid}>
                {fruits.map((fruit) => (
                    <ItemCard key={fruit._id} {...fruit} />
                ))}
            </div>
        </div>
    );
};
export default Category;