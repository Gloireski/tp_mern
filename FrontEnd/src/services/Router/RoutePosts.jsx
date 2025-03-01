import { Route, Routes} from "react-router-dom";
import ErrorPage from "../../pages/404/ErrorPage";
import FruitDetails from "../../pages/FruitDetails/fruitDetails.jsx";
import Fruits from "../../pages/Fruits/fruits.jsx";
import Cart from "../../pages/Cart/cart.jsx";
import AddFruit from "../../pages/AddFruit/addFruit.jsx";
import EditFruit from "../../pages/EditFruit/editFruit.jsx";
import Login from "../../pages/Login/login.jsx";
import Signin from "../../pages/Signin/signin.jsx";
import React from "react";

const RoutePosts = () => {
    return <>
            <Routes>
                <Route path="/" element={<Fruits />}></Route>
                <Route path="/fruits" element={<Fruits />}></Route>
                <Route path="/:id" element={<FruitDetails />}></Route>
                <Route path="/fruits/:id" element={<FruitDetails />}></Route>
                <Route path="/cart" element={<Cart />} />
                <Route path="/add" element={<AddFruit />} />
                <Route path="/edit/:id" element={<EditFruit />} />
                <Route path="login" element={<Login />} />
                <Route path="signin" element={<Signin />} />
                <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
    </>
}

export default RoutePosts;