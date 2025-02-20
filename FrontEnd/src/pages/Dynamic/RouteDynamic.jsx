import {useParams} from "react-router-dom";
import {tasks} from "../../data/users";
import {ItemCard} from "../../services/components/ItemCard/itemCard.jsx";

const RouteDynamic = () => {
    const { leId } = useParams();

    return <>
    <h2>Tâche</h2>
    {tasks.filter(leId => tasks.id === leId).map(user => <ItemCard key={user.id} {...user}></ItemCard>)}
    </>
}

export default RouteDynamic;