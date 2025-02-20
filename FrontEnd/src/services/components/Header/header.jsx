import style from "./header.module.css"

function Header(){
    return <header className={style.header}>
        <div className={style.headerContainer}>
            <div className={style.logo}>
                <a href="/">Le Panier Vert</a>
            </div>
        </div>
    </header>
}

export default Header;