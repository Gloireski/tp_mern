import { Route, Routes} from "react-router-dom";
import Accueil from "../../pages/Accueil";
import Details from "../../pages/Details";
import ErrorPage from "../../pages/404/ErrorPage";
import RouteDynamic from "../../pages/Dynamic/RouteDynamic";

const RoutePosts = () => {
    return <>
            <Routes>
                <Route path="/" element={<Accueil />}></Route>
                <Route path="/details" element={<Details />}></Route>
                <Route path="/details/:id" element={<RouteDynamic />}></Route>
                <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
    </>
}

export default RoutePosts;