import React, { useState } from "react";
import styles from "./signin.module.css";

const SignIn = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation simple
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Veuillez remplir tous les champs !");
            setSuccess("");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas !");
            setSuccess("");
            return;
        }

        // Pour le moment, affichez dans la console
        console.log("Nom :", formData.name);
        console.log("Email :", formData.email);
        console.log("Mot de passe :", formData.password);

        setError("");
        setSuccess("Inscription réussie !");
    };

    return (
        <div className={styles.container}>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="name">Nom :</label>
                    <br />
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
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
                    <label htmlFor="password">Mot de passe :</label>
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
                <div className={styles.inputGroup}>
                    <label htmlFor="confirmPassword">Confirmez le mot de passe :</label>
                    <br />
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}
                <button type="submit" className={styles.button}>
                    S'inscrire
                </button>
            </form>
        </div>
    );
};

export default SignIn;