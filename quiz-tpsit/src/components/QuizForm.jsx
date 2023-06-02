import React from "react"
import { useState, useEffect } from "react"
import "../components/QuizForm.css"

const Quiz = () =>{
    const [components, setComponents] = useState([])
    const [whichCharacter, setWhichCharacter] = useState()

    useEffect(()=>{
        const requestQuestion = async () => {
            const data = await(
                await fetch("/api/questions")
            ).json()
            setComponents(data)
        }
        requestQuestion()               
    }, [])
        
    return(
        <div className="container">
            <h1 className="title">Which horror character are you?</h1>
            <div className="quiz-container">
                {components.map((question, questionIndex) => {
                return (
                    <div key={questionIndex}>
                        <h3 className="question">{question.question}</h3>
                        {question.answer.map((answer, answerIndex) => {
                            return(
                                <div key={answerIndex} className="answer">
                                    <form>
                                        <input className="answer" type="radio" id={question.for}></input>
                                        <label htmlFor={question.for} className="answer-label">{answer.answer} </label>
                                    </form>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
            </div>
            <button className="submit-button" onClick={() =>{
            let finalAnswers = []
            let fetchAnswers = document.querySelectorAll("input[type=radio]")
            fetchAnswers.forEach(answerChecked=>{
                if(answerChecked.checked){ // all answers get pushed inside an array which will be sent to the api to calculate the score
                    finalAnswers.push({answer: answerChecked.parentNode.querySelector("label").textContent, for: answerChecked.parentNode.querySelector("label").getAttribute("for")})
                }
            
                else{
                    setWhichCharacter("Check other answers")
                }
            })

            console.log(finalAnswers)
                    fetch("/api/whichCharacter?answers=" + encodeURIComponent(JSON.stringify(finalAnswers)))
                    .then(promise => { return promise.json() })
                    .then(data =>{
                        console.log(data)
                        setWhichCharacter(data.whichcharacter)
                    })
            }}>Submit</button>

            <h3 className="which-character">{whichCharacter}</h3>
            </div>
    )
}

export default Quiz