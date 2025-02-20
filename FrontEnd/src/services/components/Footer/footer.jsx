﻿import style from "./footer.module.css"
import {Link} from "react-router-dom";

function Footer() {
    return <footer className={style.footer}>
        <div className={style.footerContent}>
            <p>© 2025 Fruit Market - All rights reserved (or consequences)</p>
            <nav className={style.footerNav}>
                <Link to="/">A Propos</Link>
                <Link to="/fruits">Contact</Link>
                <Link to="/">Mentions Légales</Link>
            </nav>
        </div>
    </footer>


}

export default Footer;