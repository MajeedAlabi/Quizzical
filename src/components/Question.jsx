import React from "react";
import { decode } from "html-entities";

export default function Question({question,options,clickOption,selectedOption,showResult,correctOption}){
    const eachOption = options.map((optionBtn,index) => {
        return(
            <button
                className={`optionBtn 
                ${optionBtn === selectedOption ? "selected" : ""}
                ${showResult && optionBtn === correctOption ? "correct" : ""}
                ${showResult && optionBtn === selectedOption && optionBtn !== correctOption ? "incorrect" : ""}
                ${showResult && optionBtn !== correctOption ? "dimmed" : ""}
            `} 
                key={index}
                onClick={() => clickOption(question, optionBtn)}
                disabled={showResult}
            >
                {decode(optionBtn)}
            </button>
        )
    })
    
    return(
        <div className="questions">
            <h1>{decode(question)}</h1>
            <div className="eachOption">{eachOption}</div>
        </div>
    )
}