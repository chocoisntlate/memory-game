export function Card({name, url}) {

    return (
        <div className="card">
            <img src={url}></img>
            <span>{name}</span>
        </div>
    )
}

export function CardDisplay({cardsList}) {
    return (
        <div className="card-display">
            {cardsList.map((card) => {
                const name = card.value + " OF " + card.suit;
                return <Card name={name} url={card.image} key={card.code}></Card>
            })}
        </div>
    )   

}