import { ItemCard } from "../../services/components/Cards/ItemCard/itemCard.jsx";
import style from "./fruits.module.css";
import {useEffect, useState} from "react";

const Fruits = () => {

    const [fruits, setFruits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFruits = async () => {
        try {
            const response = await fetch("http://localhost:5000/fruits");
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            const data = await response.json();
            setFruits(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("Fruits");

        fetchFruits();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error}</p>;

    fruits.map((fruit) => (console.log(fruit.name + ' - ' + fruit._id)))

    return (
        <>
            <h1>Fruits</h1>

            <h2>Fruits List</h2>
            <div className={style.grid}>
                {fruits.map((fruit) => (
                    <ItemCard key={fruit._id} {...fruit} />
                ))}
            </div>

            <br></br>
            <h2>Citrus</h2>
            <div className={style.grid}>
                {fruits
                    .filter((fruit) => fruit.category === "Citrus")
                    .map((fruit) => (
                        <ItemCard key={fruit._id} {...fruit} />
                    ))}
            </div>
        </>
    );
};

export default Fruits;