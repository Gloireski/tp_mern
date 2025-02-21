import React, { useState } from "react";
import styles from "./signin.module.css";

const SignIn = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/users/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    firstname: formData.firstName,
                    lastname: formData.lastName,
                    role: "admin",
                }),
            });

            if (!response.ok) {
                const {message} = await response.json();
                console.log(message)
                throw new Error(message || "Sign up failed.");
            }

            const data = await response.json();
            console.log(data);

            setError("");
            setSuccess("Inscription réussie !");
            // Actions supplémentaires (ex: redirection ou sauvegarde de l'utilisateur)
        } catch (err) {
            setError(err.message);
            setSuccess("");
        }


        setError("");
        setSuccess("Inscription réussie !");
    };

    return (
        <div className={styles.container}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="name">Name :</label>
                    <br />
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
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
                <div className={styles.inputGroup}>
                    <label htmlFor="confirmPassword">First Name :</label>
                    <br />
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="confirmPassword">Last Name :</label>
                    <br />
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}
                <button type="submit" className={styles.button}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignIn;