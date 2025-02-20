import style from "./itemCard.module.css";
import {useNavigate} from "react-router-dom";

const ItemCard = ({ name, image_url, id }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/fruits/${id}`);
    }

    return (
        <button className={style.card} onClick={handleClick} style={{ cursor: "pointer"}}>
            <img src={image_url} alt={name} />
            <h1>{name}</h1>
        </button>
    );
};


export { ItemCard };