﻿import { React, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "./header.module.css";
import { AppContext } from '../../../AppContext';

function Header() {
    // const [query, setQuery] = useState("");
    const { appState, setFruits, query, setQuery } = useContext(AppContext);
    const [lefruits, setleFruits] = useState([]);
    // const [query, setQuery] = useState('');
    const navigate = useNavigate()
    // const token = localStorage.getItem('token')
    // console.log(appState)
    const fetchFruits = async () => {
        try {
            const response = await fetch("http://localhost:5000/fruits");
            if (!response.ok) {
                throw new Error(`HTTP : ${response.status}`);
            }
            const data = await response.json();
            setleFruits(data);
            setFruits(data);
        } catch (err) {
            console.log(err);
        } finally {
        }
    };
    // Handle search result click
    const handleResultClick = (fruit) => {
        navigate(`/fruits/${fruit._id}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
        
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
                    // onChange={(e) => setQuery(e.target.value)}
                    // onChange = { handleInputChange}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={style.searchInput}
                />
                {/* <button onClick={handleSearch} className={style.searchButton}>
                    Search
                </button> */}
            </div>
            <div className={style.accountContainer}>
                <button className={style.accountButton} onClick={toggleDropdown}>
                    Account
                </button>

                {showDropdown && (
                    <div className={style.dropdownMenu}>
                        {appState.isLoggedIn ? (
                            <>
                                <button
                                    className={style.dropdownItem}
                                    onClick={handleDisconnect}
                                >
                                    Log Out
                                </button>
                                <button className={style.dropdownItem}>
                                    Profile
                                </button>
                            </>
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