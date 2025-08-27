import { useEffect, useState } from "react";
import { CardDisplay } from "./Card";
import mockData from "../mockData.json"

export function Game() {
    const [highScore, setHighScore] = useState(0)
    const [currentScore, setCurrentScore] = useState(0)
    const [trackedCardsList, setTrackedCardsList] = useState([])
    const [cardsList, setCardsList] = useState([1])

    useEffect(() => {
        async function loadCards() {
            const numOfCards = 10;
            const url = `https://www.deckofcardsapi.com/api/deck/new/draw/?count=${numOfCards}`

            const res = await fetch(url); // TODO: error handling?
            const data = await res.json()

            if (data.success) {
                setCardsList(data.cards);
                console.log(data.cards);
                // console.log(JSON.stringify(data.cards, null, 2)) 
            } // TODO: err hand

        }
        // UNCOMMENT LATER: loadCards()
        
        // For testing
        setCardsList(mockData)
    }, [])

    return (
        <>
            <ScoreBoard currentScore={currentScore} highScore={highScore}/>
            <CardDisplay cardsList={cardsList}/>
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