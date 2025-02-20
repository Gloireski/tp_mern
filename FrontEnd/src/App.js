import './App.css';
import Header from "./services/components/Header/header.jsx";
import Footer from "./services/components/Footer/footer.jsx";

import {BrowserRouter as Router} from "react-router-dom";

import RoutePosts from "./services/Router/RoutePosts.jsx";


function App() {

  return <div className="App">

    <Router>
      <Header></Header>
      <main>
      <RoutePosts></RoutePosts>
      </main>
      <Footer></Footer>
    </Router>


  </div>

}

export default App;
