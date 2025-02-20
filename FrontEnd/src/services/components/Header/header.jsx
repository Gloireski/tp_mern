import style from "./header.module.css"

function Header(){
    return <header className={style.header}>
        <div className={style.headerContainer}>
            <div className={style.logo}>
                <a href="/app-tp1/public">Mon Magnifique Site</a>
            </div>
            <nav>
                <ul className={style.navList}>
                    <li><a href="#">Accueil</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">À propos</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>
}

export default Header;