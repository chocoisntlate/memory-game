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

    function shuffleCardsList() {
        const array = [...cardsList]
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        setCardsList(array)
    }

    function onCardClick(code) {
        shuffleCardsList()
        if (trackedCardsList.includes(code)) {
            setCurrentScore(0) // reset current score
            setTrackedCardsList([]) // reset tracked cards
        } else {
            setTrackedCardsList([...trackedCardsList, code]) // adding to tracking
            setCurrentScore(currentScore + 1) // update currentscore

            if ((currentScore + 1) > highScore) { // update highscore
                setHighScore(currentScore + 1)
            }
        }
    }

    return (
        <>
            <ScoreBoard currentScore={currentScore} highScore={highScore}/>
            <CardDisplay cardsList={cardsList} shuffleCardsList={shuffleCardsList} onCardClick={onCardClick}/>
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