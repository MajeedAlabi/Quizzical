import React, { useState } from "react";
import { nanoid } from 'nanoid';
import Question from "./Question";

export default function Quiz(props) {
    const [quizResult, setQuizResult] = useState([])
    const [userScore, setUserScore] = useState(0)
    const [alertError, setAlertError] = useState(false)
    const [showResult,setShowResult] = useState(false)
    React.useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=5&category=${props.category}&difficulty=${props.difficulty}`)
            .then(res => res.json())
            .then(data => {
                let answerArray = []
                data.results.map((answer) => {
                    return answerArray.push({
                        id: nanoid(),
                        question: answer.question,
                        correctAnswer: answer.correct_answer,
                        answers: answer.incorrect_answers
                            .concat(answer.correct_answer)
                            .sort(
                                () => Math.random() - 0.5
                            ),
                        pickedAnswer: ''
                    })
                })
                console.log(answerArray)
                setQuizResult(answerArray)
            })
    }, [])

    function newAnswer(currentQuestion, answer) {
        setQuizResult(
            quizResult.map((result) => {
                return result.question == currentQuestion ? { ...result, pickedAnswer: answer } : result
            })
        )
        console.log(quizResult)
    }

    function checkSolution() {
        const missingAnswer = quizResult.some(result => result.pickedAnswer === '')
        setAlertError(missingAnswer)

        if (!missingAnswer) { 
            quizResult.forEach((result) => {
                if (result.correctAnswer === result.pickedAnswer) {
                    setUserScore(prev => prev + 1)
                }
            })
            setShowResult(true)
        }
    }

    const quizStructure = quizResult.map((result, index) => {
        return (
            <Question
                key={index}
                question={result.question}
                answers={result.answers}
                correctAnswer={result.correctAnswer}
                pickedAnswer={result.pickedAnswer}
                newAnswer={newAnswer}
                showResult = {showResult}
            />
        )
    })
    return (
        <div className="yes">
            <div className="quizPage">{quizStructure}</div>
            <div className="check-answers">
                {alertError && (
                    <p className="warning-message">
                        Please answer all questions
                    </p>
                )}
                {quizResult.length > 0 && !showResult?(
                    <button onClick={checkSolution} className="check-btn">Check Answers</button>
                ):null}
                {showResult && (
                    <div className="results-container">
                        <p className="results-text">
                            You scored {userScore}/5 correct answers
                        </p>
                        <button onClick={props.beginGame} className="play-again-btn">
                            Play again
                        </button>
                    </div>
                )}
            </div>
        </div>
    )


}