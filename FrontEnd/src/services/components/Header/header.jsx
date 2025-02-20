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

    return (
        <header className={style.header}>
            <h1 className={style.title}>Fruit Market</h1>

            <nav className={style.nav}>
                <Link to="/">Accueil</Link>
                <Link to="/fruits">Fruits</Link>
                <Link to="/">Contact</Link>
            </nav>

            <div className={style.searchContainer}>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={style.searchInput}
                />
                <button onClick={handleSearch} className={style.searchButton}>
                    Rechercher
                </button>
            </div>
        </header>
    );
}

export default Header;