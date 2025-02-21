import style from "./footer.module.css"
import {Link} from "react-router-dom";

function Footer() {
    return <footer className={style.footer}>
        <div className={style.footerContent}>
            <p>© 2025 Fruit Market - All rights reserved (or consequences)</p>
<<<<<<< HEAD
        
=======
            <nav className={style.footerNav}>
                <Link to="/">About</Link>
                <Link to="/fruits">Contact</Link>
                <Link to="/">Legal Mentions</Link>
            </nav>
>>>>>>> 402aa6fcad60b409116e9cfc7926b5f63e875546
        </div>
    </footer>


}

export default Footer;