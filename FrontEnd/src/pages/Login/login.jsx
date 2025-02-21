import React, { useState, useContext } from "react";
import styles from "./login.module.css";
import {useNavigate} from "react-router-dom";
import { encode } from 'base-64'
import { AppContext } from '../../AppContext'

const LogIn = () => {
    const { appInfo, setUser } = useContext(AppContext);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError("Fill all the fields.");
            return;
        }

        const auth = encode(`${formData.email}:${formData.password}`)
        // console.log(auth)

        try {
            // Requête vers l'API de login
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "GET",
                headers: {"Content-Type": "application/json", "authorization": `Basic ${auth}`},
            });

            if (!response.ok) {
                const {message} = await response.json();
                console.log(message)
                throw new Error(message || "Login failed.");
            }

            const data = await response.json();
            console.log(data);
            const { user, token } = data
            setUser(user, token)
            setError("");
            navigate("/fruits");
            localStorage.setItem('token', data)
        } catch (err) {
            setError(err.message);
        }

    };

    return (
        <div className={styles.container}>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email :</label>
                    <br />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password :</label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.button}>
                    Log In
                </button>
            </form>
        </div>
    );
};

export default LogIn;