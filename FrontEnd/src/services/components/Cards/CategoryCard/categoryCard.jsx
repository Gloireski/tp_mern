//Coming soon
//Maybe

import React from "react";
import ItemCard from "../ItemCard/itemCard.jsx"; // Import your existing ItemCard component
import style from "./categoryCard.module.css"; 


const Category = ({ title, fruits }) => {
    return (
        <div className={style.category}>
            <h2 className={style.title}>{title}</h2>
            <div className={style.fruitgrid}>
                {fruits.map((fruit) => (
                    <ItemCard key={fruit.id} {...fruit} />
                ))}
            </div>
        </div>
    );
};
export default Category;
