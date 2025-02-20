import {useParams} from "react-router-dom";
import {tasks} from "../../data/users";
import {Cards} from "../../services/components/cards/cards";

const RouteDynamic = () => {
    const { leId } = useParams();

    return <>
    <h2>Tâche</h2>
    {tasks.filter(leId => tasks.id === leId).map(user => <Cards key={user.id} {...user}></Cards>)}
    </>
}

export default RouteDynamic;