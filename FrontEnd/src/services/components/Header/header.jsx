﻿import { useState } from "react";
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

    const [isConnected, setIsConnected] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const handleDisconnect = () => {
        setIsConnected(false);
        setShowDropdown(false);
    };


    return (
        <header className={style.header}>
            <h1 className={style.title}>
                <Link to="/">
                    <img src="https://i.imgur.com/6RTXEns.png" alt="LePanierVert Logo" className={style.logo} />
                </Link>
            </h1>

            <nav>
                <Link to="/cart">
                    <img src="https://i.imgur.com/HP7klMt.png" alt="Panier" width="20" height="20" className={style.panier} />
                </Link>
            </nav>

            <div className={style.searchContainer}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={style.searchInput}
                />
                <button onClick={handleSearch} className={style.searchButton}>
                    Search
                </button>
            </div>
            <div className={style.accountContainer}>
                <button className={style.accountButton} onClick={toggleDropdown}>
                    Account
                </button>

                {showDropdown && (
                    <div className={style.dropdownMenu}>
                        {isConnected ? (
                            <button
                                className={style.dropdownItem}
                                onClick={handleDisconnect}
                            >
                                Log Out
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={style.dropdownItem}
                                    onClick={() => setShowDropdown(false)}
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/signin"
                                    className={style.dropdownItem}
                                    onClick={() => setShowDropdown(false)}
                                >
                                    Sign In
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>

        </header>
    );
}

export default Header;