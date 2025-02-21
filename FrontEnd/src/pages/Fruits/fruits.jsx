import fruits from "../../data/fruits.json";
// import { ItemCard } from "../../services/components/Cards/ItemCard/itemCard.jsx";
import style from "./fruits.module.css";
import Category from "../../services/components/Cards/CategoryCard/categoryCard.jsx";
import { useNavigate, Link } from "react-router-dom";


const Fruits = () => {
    const categories = ["Citrus", "Tropical", "Berries", "Other"];
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
           <div className= {style.fruitgrid}>
            {categories.map(category => (
                    <Category 
                        key={category} 
                        title={category} 
                        fruits={fruits.filter(fruit => fruit.category === category)} 
                    />
                ))}
            </div>
            <div  style = {{ padding: "10px 10px", justifyContent: "center", textAlign : "center"  }}>
                <nav>
                        <Link to="/cart">Panier | </Link>
                        <Link to="/add">Add Fruit</Link>
                </nav>
            </div>
             
        </>
    );
};

export default Fruits;