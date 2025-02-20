import style from "./footer.module.css"

function Footer() {
    return <footer className={style.footer}>
        <div className={style.footerContent}>
            <p>© 2023 Coucou c'est moi Paul - Tous droits réservés sinon conséquences.</p>
            <nav className={style.footerNav}>
                <a href="#">À propos</a>
                <a href="#">Contact</a>
                <a href="#">Conditions</a>
            </nav>
        </div>
    </footer>


}

export default Footer;