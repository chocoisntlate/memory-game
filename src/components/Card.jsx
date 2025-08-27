function Card({name, src}) {
    return (
        <div className="card">
            <img src={src}></img>
            <span>{name}</span>
        </div>
    )
}