import Bouton from "../services/components/button/button";
import {useState} from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import RoutePosts from "../services/Router/RoutePosts";

const Accueil = () => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        setCount(count - 1);
    };

    return <>
    <h1>Accueil</h1>


    <h1>{count}</h1>
    <Bouton label="Increment" onClick={handleIncrement}></Bouton>
    <Bouton label="Decrement" onClick={handleDecrement}></Bouton>
    </>
};

export default Accueil;