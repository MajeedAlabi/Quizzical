import React from "react";

export default function Home(props){
    return(
        <div className="homePage">
            <h1>Quizzical</h1>
            <p>Test Your Knowledge!</p>
            <select onChange={(e)=>props.setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value='21'>Sport</option>
                    <option value="27">Animals</option>
                    <option value="11">Film</option>
                    <option value="20">Mythology</option>
                    <option value="32">Cartoons</option>
            </select>
            <select onChange={(e)=>props.setDifficulty(e.target.value)}>
                    <option value="">Select Difficulty</option>
                    <option value='easy'>Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
            </select>
            <button onClick={props.beginGame}>Start quiz</button>
        </div>
    )
}