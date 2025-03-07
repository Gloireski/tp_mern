import React, { useState } from "react";
import styles from "./addFruit.module.css";

const AddFruit = () => {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        origin: "",
    });
    const [imageFile, setImageFile] = useState(null);


    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]); // Store the selected file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("origin", formData.origin);
        formDataToSend.append("image", imageFile);

        for (let pair of formDataToSend.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }


        try {
            const response = await fetch("http://localhost:5000/fruits", {
                method: "POST",
                body: formDataToSend,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData);
                throw new Error(errorData.message);
            }

            const data = await response.json();
            setSuccess("Fruit Added Successfully.");
            setFormData({
                name: "",
                category: "",
                description: "",
                price: "",
                origin: "",
            });
            setImageFile(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.addForm}>
            <h2>Add Fruit</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name :</label>
                    <input className={styles.addInput}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Category :</label>
                    <input className={styles.addInput}
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Description :</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Price :</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Origin :</label>
                    <input
                        type="text"
                        name="origin"
                        value={formData.origin}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Image :</label>
                    <input
                        type="file"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddFruit;