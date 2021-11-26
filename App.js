import React from "react"
import QuizElement from "./QuizElement"
import {nanoid} from "nanoid"

export default function App() {

    const [game, setGame] = React.useState(false)
    const [quizItems, setQuizItems] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [checked, setChecked] = React.useState(false)
    const [isNewGame, setIsNewGame] = React.useState(false)
    const [isLoading, setLoading] = React.useState(true)

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setQuizItems(data.results))
        setLoading(false)
    }, [isNewGame])
    
    function startGame() {
        setGame(prevGame => !prevGame)
        setChecked(false)
        setScore(0)
        setQuizItems(prevItems => {
            return prevItems.map(item => {
                const correctAns = [item.correct_answer]
                const incorrectAns = item.incorrect_answers
                const ansArr = correctAns.concat(incorrectAns)
                
                return {
                    ...item,
                    randAnsArr: shuffle(ansArr)
                }
            })
        })
    }
    
    function newGame() {
        setIsNewGame(prevNewGame => !prevNewGame)
        startGame()
    }
    
    // Custom shuffle function to shuffle answers within array
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        const randArr = arr
        return randArr;
    }
    // Custom shuffle function to shuffle answers within array
    
    function handleClick(qns, selectedans) {
        setQuizItems(prevItems => {
            return prevItems.map(item => {
                if (item.question === qns) {
                    return {
                        ...item,
                        selectedans: selectedans
                    }
                } else return item
            })
        })        
    }
    
    function checkAnswer() {
        if (checked === true) {
            alert("You can only do this once!")
        } else {
            let correctScore = 0
            for (let i=0; i < quizItems.length; i++) {
                if (quizItems[i].selectedans === quizItems[i].correct_answer) {
                    correctScore += 1
                } else {
                    continue
                }
            }
            setScore(prevScore => prevScore + correctScore)
            setChecked(true)
        }
    }
    
    const quizElement = quizItems.map(item => {
        return <QuizElement 
                    key={nanoid()}
                    question={item.question}
                    selectedans={item.selectedans}
                    randAnsArr={item.randAnsArr}
                    handleClick={handleClick}
                />
    })

    return (
        <main>
            {game && quizItems.length > 0 ?  
                <div className="quiz-container">
                    {quizElement}
                    <button 
                        className="checkans-button" 
                        onClick={checkAnswer}
                    >
                        Check Answers!
                    </button>
                    {checked && <h4>Your Score: {score}/{quizItems.length}</h4>}
                    {checked && 
                        <button 
                            className="newgame-button" 
                            onClick={newGame}
                        >
                            New Game
                        </button>}
                </div>
                :
                <div className="intro-container">
                    <h1 className="intro-title">Quizzical</h1>
                    <h4 className="intro-desc">A quick quiz to test your general knowledge!</h4>
                    <button className="intro-startbutton" onClick={startGame}>Start Quiz!</button>
                </div>
            }
        </main>
    )
}
