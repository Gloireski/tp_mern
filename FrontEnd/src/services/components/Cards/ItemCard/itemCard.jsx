import style from "./itemCard.module.css";
import {useNavigate} from "react-router-dom";

const ItemCard = ({ name, image_url, _id }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/fruits/${_id}`);
    }

    return (
        <button className={style.card} onClick={handleClick} style={{ cursor: "pointer"}}>
            <img src={image_url} alt={name} className={style.image}/>
            <h1 style = {{ fontSize: "15px"}}>{name}</h1>
        </button>
    );
};


export { ItemCard };