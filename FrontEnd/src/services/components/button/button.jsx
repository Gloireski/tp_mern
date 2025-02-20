const Bouton = ({onClick, label}) => {
    return <>
        <button onClick={onClick}> {label} </button>
    </>
}

export default Bouton;