import './App.css';
import Header from "./services/components/Header/header.jsx";
import Footer from "./services/components/Footer/footer.jsx";

import {BrowserRouter as Router, Link} from "react-router-dom";

import RoutePosts from "./services/Router/RoutePosts.jsx";
import PostsAPI from "./services/postsAPI.js";
import {useEffect, useState} from "react";

function App() {


  const [posts, setPosts] = useState([]);

  useEffect(() => {
    PostsAPI.getPosts().then(response => {setPosts(response.data);})
  }, []);
  //{posts.map(post => <PostCards key={post.id} {...post}></PostCards>)}



  return <>
    <Header></Header>

    <Router>
      <nav>
        <Link to="/">Accueil</Link> | <Link to="/details">Details</Link>
      </nav>
      <RoutePosts></RoutePosts>
    </Router>)


    <Footer></Footer>
  </>

}

export default App;
