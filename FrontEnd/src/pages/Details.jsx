import {tasks} from "../data/users";
import {Cards} from "../services/components/cards/cards";
import {BrowserRouter as Router, Link} from "react-router-dom";
import RoutePosts from "../services/Router/RoutePosts";

const Details = () => {
    return <>
    <h1>Details</h1>


    <h2>Toutes les tâches</h2>
        {tasks.map(user => <Cards key={user.id} {...user}></Cards>)}

    <br></br>
    <h2>Tâches finies</h2>
    {tasks.filter(user => user.fini === "Oui").map(user => <Cards key={user.id} {...user}></Cards>)}

    </>


};

export default Details;