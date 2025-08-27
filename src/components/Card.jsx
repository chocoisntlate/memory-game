
export function CardDisplay({cardsList, onCardClick}) {
    
    
    return (
        <div className="card-display">
            {cardsList.map((card) => {
                const name = card.value + " OF " + card.suit;
                return <Card onClick={onCardClick} name={name} url={card.image} key={card.code} code={card.code}></Card>
            })}
        </div>
    )   
    
}

export function Card({name, url, onClick, code}) {

    return (
        <div onClick={() => {onClick(code)}} className="card">
            <img src={url}></img>
            <span>{name}</span>
        </div>
    )
}