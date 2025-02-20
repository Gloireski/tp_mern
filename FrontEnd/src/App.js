import './App.css';
import Header from "./services/components/Header/header.jsx";
import Footer from "./services/components/Footer/footer.jsx";

import {BrowserRouter as Router, Link} from "react-router-dom";

import RoutePosts from "./services/Router/RoutePosts.jsx";


function App() {

  return <>

    <Router>
      <Header></Header>

      <RoutePosts></RoutePosts>

      <Footer></Footer>
    </Router>


  </>

}

export default App;
