import { useEffect, useState } from "react";
import { CardDisplay } from "./Card";
import mockData from "../mockData.json"

export function Game() {
    const [currentScore, setCurrentScore] = useState(0)
    const [trackedCardsList, setTrackedCardsList] = useState([])
    const [cardsList, setCardsList] = useState([])

    const [bestTime, setBestTime] = useState(Infinity)
    const [startTime, setStartTime] = useState(Date.now())
    const [count, setCount] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false)

    const [loadNewCardsTrigger, setLoadNewCardsTrigger] = useState(true);

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
        
        loadCards() // Warning: API call
        
    }, [loadNewCardsTrigger])

    useEffect(() => {
        if (!timerRunning) return;

        const timer = setInterval(() => {
            setCount(Math.floor((Date.now() - startTime) / 100) / 10)
        }, 100)

        return () => {
            clearInterval(timer)
        }

    }, [timerRunning])

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
        if (currentScore + 1 === 1) { // starting timer on first action
            startResetTimer()
        }

        if (currentScore + 1 === 10) { // clicked all possible card, game ends

            checkBestTime()
            newGame()
            shuffleCardsList()

            alert("Well done! You've found all the unique cards.")
            return
        }

        shuffleCardsList()
        if (trackedCardsList.includes(code)) { // failing to click a different card
            setCurrentScore(0) // reset current score
            setTrackedCardsList([]) // reset tracked cards
            
            stopTimer()

            alert("You've clicked on the same card twice.")
        } else {
            setTrackedCardsList([...trackedCardsList, code]) // adding to tracking
            setCurrentScore(currentScore + 1) // update currentscore

        }
    }

    function checkBestTime() {
        if (count < bestTime) {
            setBestTime(count)
        }
    }
    
    function newGame() {
        // setTrigger(true)                 get a new group of cards

        stopTimer()
        setCurrentScore(0) // reset current score
        setTrackedCardsList([]) // reset tracked cards
        

        return
    }
    
    function startResetTimer() {
        setTimerRunning(true)
        setCount(0)
        setStartTime(Date.now())
    }

    function stopTimer() {
        setTimerRunning(false)
    }

    return (
        <>
            <ControlBar newGame={() => {
                setCount(0)
                newGame()
            }} loadNewCardsTrigger={() => {
                if (loadNewCardsTrigger) {
                    setLoadNewCardsTrigger(false)
                } else setLoadNewCardsTrigger(true)
            }} shuffleCardsList={shuffleCardsList}/>
            <ScoreBoard currentScore={currentScore} count={count} bestTime={bestTime}/>
            <CardDisplay cardsList={cardsList} shuffleCardsList={shuffleCardsList} onCardClick={onCardClick}/>
        </>

    )
}




function ControlBar({newGame, loadNewCardsTrigger, shuffleCardsList}) {
    return (
        <div className="ControlBar">
            <button onClick={() => {
                newGame()
                shuffleCardsList()
            }
            }>Restart</button>
            <button onClick={() => {
                loadNewCardsTrigger()
                newGame()
            }}>New Deck</button>
        </div>
    )
}

function ScoreBoard({currentScore, count, bestTime}) {
    return (
        <div className="scoreBoard">
            <div>Unique cards to find: {10 - currentScore}</div>
            <div>Time elapsed: {count}</div>
            <div>Best time: {bestTime}</div>
        </div>
    )

}