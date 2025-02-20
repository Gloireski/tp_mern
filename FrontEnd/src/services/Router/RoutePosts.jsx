import { Route, Routes} from "react-router-dom";
import ErrorPage from "../../pages/404/ErrorPage";
import FruitDetails from "../../pages/FruitDetails/fruitDetails.jsx";
import Fruits from "../../pages/Fruits/fruits.jsx";

const RoutePosts = () => {
    return <>
            <Routes>
                <Route path="/" element={<Fruits />}></Route>
                <Route path="/fruits" element={<Fruits />}></Route>
                <Route path="/:id" element={<FruitDetails />}></Route>
                <Route path="/fruits/:id" element={<FruitDetails />}></Route>
                <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
    </>
}

export default RoutePosts;