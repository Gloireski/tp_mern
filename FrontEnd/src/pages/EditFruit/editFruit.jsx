import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";


const EditFruit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const fileInputRef = useRef(null); // Ref for the file input
    const [imageFile, setImageFile] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        origin: "",
        image_url: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]); // Store the selected file
    };

    useEffect(() => {
        const fetchFruit = async () => {
            try {
                const response = await fetch(`http://localhost:5000/fruits/${id}`);
                if (!response.ok) {
                    throw new Error("Impossible de charger les informations du fruit.");
                }
                const data = await response.json();
                setFormData(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchFruit();
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const finalData = {
                name: formData.name,
                category: formData.category,
                description: formData.description,
                price: formData.price,
                origin: formData.origin,
                image_url: formData.image_url
            }
            console.log(finalData);

            console.log(`http://localhost:5000/fruits/${id}`);
            const response = await fetch(`http://localhost:5000/fruits/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: JSON.stringify(finalData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData);
                throw new Error(errorData.message);
            }
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // This is allowed
            }
            setSuccess("Fruit mis à jour avec succès !");
            navigate("/fruits/" + id)
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Modifier les Informations du Fruit</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom :</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Catégorie :</label>
                    <input
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
                    <label>Prix :</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Origine :</label>
                    <input
                        type="text"
                        name="origin"
                        value={formData.origin}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Image URL :</label>
                    <input
                        type="file"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        required
                    />
                </div>
                <button type="submit">Mettre à Jour</button>
            </form>
        </div>
    );
};

export default EditFruit;