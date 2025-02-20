import { tasks } from "../../data/users.js";
import { ItemCard } from "../../services/components/ItemCard/itemCard.jsx";
import style from "./Details.module.css";


const Details = () => {
    return (
        <>
            <h1>Details</h1>

            <h2>Toutes les tâches</h2>
            <div className={style.grid}>
                {tasks.map((user) => (
                    <ItemCard key={user.id} {...user} />
                ))}
            </div>

            <br></br>
            <h2>Tâches finies</h2>
            <div className={style.grid}>
                {tasks
                    .filter((user) => user.fini === "Oui")
                    .map((user) => (
                        <ItemCard key={user.id} {...user} />
                    ))}
            </div>
        </>
    );
};

export default Details;