import React, { useEffect, useState } from "react";
import Question from "./Question";

export default function Quiz({ play,category,difficulty }) {

    const [quizData, setQuizData] = useState([])
    const [warning, setWarning] = React.useState(false)
    const [numOfCorrectAnswers, setNumOfCorrectAnswers] = React.useState(0)
    const [showResult, setShowResult] = React.useState(false)

    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}`)
            .then(res => res.json())
            .then(data => {
                let dataArray = []
                data.results.map((result) => {
                    return dataArray.push({
                        question: result.question,
                        incorrect_answers: result.incorrect_answers,
                        correct_answer: result.correct_answer,
                        options: result.incorrect_answers.concat(result.correct_answer).sort(() => Math.random() - 0.5),
                        my_answer: ""
                    })
                })
                setQuizData(dataArray)
            })
    }, [])

    function clickOption(currentQuestion, answer) {
        setQuizData(
            quizData.map((data) => {
                return data.question === currentQuestion ?
                    { ...data, my_answer: answer } :
                    data
            })
        )
    }

    function checkOptions() {
        const notAnsweredAll = quizData.some(data => data.my_answer === "")
        setWarning(notAnsweredAll)

        if (!notAnsweredAll) {
            quizData.forEach((data) => {
                if (data.correct_answer === data.my_answer)
                    setNumOfCorrectAnswers((prevNum) => prevNum + 1)
            })
            setShowResult(true)
        }
    }

    const questionEl = quizData.map((question, index) => {
        return (
            <Question
                key={index}
                question={question.question}
                options={question.options}
                clickOption={clickOption}
                selectedOption ={question.my_answer}
                correctOption ={question.correct_answer}
                showResult ={showResult}
            />
        )
    })

    return (
        <div className="quiz-conatiner">
            <div>{questionEl}</div>
            <div className="check-answers">
                {warning && (
                    <p className="warning-message">
                        Please answer all questions
                    </p>
                )}
                {quizData.length > 0 && !showResult ? (
                    <button className="check-btn" onClick={checkOptions}>
                        Check Answers
                    </button>
                ) : null}
                {showResult && (
                    <div className="results-container">
                        <p className="results-text">
                            You scored {numOfCorrectAnswers}/5 correct answers
                        </p>
                        <button className="play-again-btn" onClick={play}>
                            Play again
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}