import style from "./footer.module.css"
import { Link } from "react-router-dom";
import React from "react";

function Footer() {
    return <footer className={style.footer}>
        <div className={style.footerContent}>
            <p>© 2025 Fruit Market - All rights reserved (or consequences)</p>
            <nav className={style.footerNav}>
                <Link to="/">About</Link>
                <Link to="/fruits">Contact</Link>
                <Link to="/">Legal Mentions</Link>
            </nav>
        </div>
    </footer>


}

export default Footer;