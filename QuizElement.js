import React from "react"

export default function QuizElement(props) {
    
    const answerElement = props.randAnsArr.map(answer => {
        return <button 
                    key={answer}
                    id={answer} 
                    className="quiz-options" 
                    onClick={() => props.handleClick(props.question, answer)}
                    style={{backgroundColor: props.selectedans === answer ? "#D6DBF5" : "white"}}
                >
                    {answer}
                </button>
    })
    
    return (
        <div className="quiz-element">
            <h4 className="quiz-question">{props.question}</h4>
            <div className="quiz-options-container">
                {answerElement}
            </div>
            <hr />
        </div>
    )
}
