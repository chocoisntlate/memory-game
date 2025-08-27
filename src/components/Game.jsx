import { useEffect, useState } from "react";

export function Game() {
    const [highScore, setHighScore] = useState(0)
    const [currentScore, setCurrentScore] = useState(0)
    const [trackedCardsList, setTrackedCardsList] = useState([])
    const [cardsList, setCardsList] = useState([])

    useEffect(() => {
        async function loadCards() {
            const numOfCards = 10;
            const url = `https://www.deckofcardsapi.com/api/deck/new/draw/?count=${numOfCards}`

            const res = await fetch(url); // TODO: error handling?
            const data = await res.json()

            if (data.success) {
                setCardsList(data.cards);
                console.log(data.cards);
            } // TODO: err hand

        }
        loadCards()
    }, [])

    return (
        <>
            <ScoreBoard currentScore={currentScore} highScore={highScore}/>
        </>

    )

}

function ScoreBoard({currentScore, highScore}) {
    return (
        <>
            <div>current score: {currentScore}</div>
            <div>high score: {highScore}</div>
        </>
    )

}