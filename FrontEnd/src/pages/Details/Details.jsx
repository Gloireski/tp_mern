import fruits from "../../data/fruits.json";
import { ItemCard } from "../../services/components/ItemCard/itemCard.jsx";
import style from "./Details.module.css";


const Details = () => {
    return (
        <>
            <h1>Fruits</h1>

            <h2>Fruits List</h2>
            <div className={style.grid}>
                {fruits.map((fruit) => (
                    <ItemCard key={fruit.id} {...fruit} />
                ))}
            </div>

            <br></br>
            <h2>Citrus</h2>
            <div className={style.grid}>
                {fruits
                    .filter((fruit) => fruit.category === "Citrus")
                    .map((fruit) => (
                        <ItemCard key={fruit.id} {...fruit} />
                    ))}
            </div>
        </>
    );
};

export default Details;