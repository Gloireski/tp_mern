import { Route, Routes} from "react-router-dom";
import ErrorPage from "../../pages/404/ErrorPage";
import FruitDetails from "../../pages/FruitDetails/fruitDetails.jsx";
import Fruits from "../../pages/Fruits/fruits.jsx";
<<<<<<< HEAD
import AddFruit from "../../pages/AddFruit/addfruit.jsx";
=======
import Cart from "../../pages/Cart/cart.jsx";
>>>>>>> 402aa6fcad60b409116e9cfc7926b5f63e875546

const RoutePosts = () => {
    return <>
            <Routes>
                <Route path="/" element={<Fruits />}></Route>
                <Route path="/fruits" element={<Fruits />}></Route>
                <Route path="/:id" element={<FruitDetails />}></Route>
                <Route path="/fruits/:id" element={<FruitDetails />}></Route>
<<<<<<< HEAD
                <Route path="/add" element={<AddFruit />} />
=======
                <Route path="/cart" element={<Cart />} />
>>>>>>> 402aa6fcad60b409116e9cfc7926b5f63e875546
                <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
    </>
}

export default RoutePosts;