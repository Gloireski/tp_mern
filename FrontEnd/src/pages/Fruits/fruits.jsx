import style from "./fruits.module.css";
import Category from "../../services/components/Cards/CategoryCard/categoryCard.jsx";
import { useNavigate, Link } from "react-router-dom";
import {useEffect, useState, useContext} from "react";
import { AppContext } from '../../AppContext.js';


const Fruits = () => {
    const { appState, setUser, setFruits, filteredFruits } = useContext(AppContext);
    const categories = ["Citrus", "Tropical", "Berries", "Other"];
    // const [fruits, setFruits] = useState([]);
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
        // console.log("Fruits");
        fetchFruits();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error}</p>;
    console.log('filtered',filteredFruits)
    // fruits.map((fruit) => (console.log(fruit.name + ' - ' + fruit._id)))
    // Determine which fruits to display: filteredFruits if available, otherwise all fruits
    const fruitsToDisplay = filteredFruits.length > 0 ? filteredFruits : appState.fruits;
    return (
        <>
            <div className="hero-section" style  = {{
                backgroundImage: `url("https://i.imgur.com/uv3A9bd.jpeg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "400px",
                display: "flex",
                color: "#fffef9",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
            }}>
                <div style = {{ padding: "90px 60px", color: "beige",  background: "rgba(0, 0, 0, 0.3)", zIndex: "1",  height: "400px",
                    alignItems: "center", justifyContent: "center",
                }}>
                    <h1>Welcome to <span style={{ color: "#006008" }}>LePanierVert</span> – Your Fresh Fruit Destination! 🍏🍓🍍</h1>
                    <p style = {{ size: "50px"}}>
                        At <strong>LePanierVert</strong>, we bring you the finest selection of
                        fresh, organic, and handpicked fruits sourced from the best farms. Whether
                        you're looking for juicy citrus, exotic tropical delights, or nutrient-packed
                        berries, we've got something for everyone!
                    </p>
                    <p style = {{  size: "30px"}}>🛒 Start Shopping Now & Taste the Freshness!</p>
                </div>
            </div>

            <div className={style.fruitgrid}>
                <Category
                    key={"All Fruits"}
                    title={"All Fruits"}
                    fruits={fruitsToDisplay}/>
                </div>
            <div className= {style.fruitgrid}>
                {categories.map(category => (
                    <Category
                        key={category}
                        title={category}
                        fruits={fruitsToDisplay.filter(fruit => fruit.category === category)}
                    />
                ))}
            </div>
            <div  style = {{ padding: "10px 10px", justifyContent: "center", textAlign : "center"  }}>
                <nav>
                    <Link to="/add">Add Fruit</Link>
                </nav>
            </div>

        </>
    );
};

export default Fruits;