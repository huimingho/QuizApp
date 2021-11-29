import React from "react"

export default function QuizElement(props) {
    const answerElement = props.randAnsArr.map(answer => {
        return <button 
                    key={answer}
                    id={answer} 
                    className="quiz-options" 
                    onClick={() => props.handleClick(props.question, answer)}
                    style={{
                        backgroundColor: (props.ischecked ? 
                            (props.iscorrect ? 
                            (props.selectedans === answer ? "#94D7A2" : "white"): (props.selectedans === answer ? "#F8BCBC" : "white")) : 
                            (props.selectedans === answer ? "#D6DBF5" : "white")
                            )
                        }}
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
