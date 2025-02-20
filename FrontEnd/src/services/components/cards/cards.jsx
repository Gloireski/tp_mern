import style from "./cards.module.css"

const Cards = ({nom, fini}) => {
        return <>
            <h1 className={style.titre}>{nom}</h1>
            <p className={style.paragraphe}>Statut : {fini}</p>
            <p>-------------</p>
        </>
    };

const PostCards = ({title, body}) => {
    return <>
        <h1>{title}</h1>
        <p className={style.paragraphe}>{body}</p>
        <p>-------------</p>
    </>
};
export {Cards, PostCards};