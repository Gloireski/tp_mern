import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import fruits from "../../../data/fruits.json";
import style from "./header.module.css";

function Header() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        const fruit = fruits.find(
            (fruit) =>
                fruit.name.toLowerCase() === query.toLowerCase() ||
                fruit.id.toString() === query
        );

        if (fruit) {
            navigate(`/fruits/${fruit.id}`);
        } else {
            alert("Aucun fruit correspondant.");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    /*
    <nav className={style.nav}>

        <Link to="/">Accueil</Link>
        <Link to="/fruits">Fruits</Link>
        <Link to="/">Contact</Link>

    </nav>
    */

    return (
        <header className={style.header}>
<<<<<<< HEAD
            <h1 className={style.title}>
                <Link to="/">
                    <img src="https://i.imgur.com/6RTXEns.png" alt="LePanierVert Logo" className={style.logo} />
                </Link>
            </h1>
        
=======
            <h1 className={style.title}><Link to="/">Fruit Market</Link></h1>

            <nav>
                <Link to="/cart">Panier</Link>
            </nav>

>>>>>>> 402aa6fcad60b409116e9cfc7926b5f63e875546
            <div className={style.searchContainer}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={style.searchInput}/>
                <button onClick={handleSearch} className={style.searchButton}>
                    Search
                </button>
            </div>
            <Link to="/cart">
                <img src="https://i.imgur.com/HP7klMt.png" alt="Panier" width="20" height="20" className={style.panier} />
            </Link>
        </header>
    );
}

export default Header;