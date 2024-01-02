import React from "react";
import { decode } from "html-entities";

export default function Question(props) {
    const buttonAnswers = props.answers.map((answer, index) => {
        return (
            <button className={`answerButton
                ${answer === props.pickedAnswer ? "selected" : ""}
                ${props.showResult && answer === props.correctAnswer ? "correct" : ''}
                ${props.showResult && answer === props.pickedAnswer && answer !== props.correctAnswer ? "incorrect" : ''}
                ${props.showResult && answer !== props.correctAnswer ? 'dimmed' : ''}
            `}
                key={index}
                onClick={()=> props.newAnswer(props.question,answer)}
                disabled = {props.showResult}
            >
                {decode(answer)}
            </button>
        )
    })
    return (
        <div className="questionElement">
            <div className="questionQuestions">{decode(props.question)}</div>
            <div className="questionButton">{buttonAnswers}</div>
        </div>
    )
}