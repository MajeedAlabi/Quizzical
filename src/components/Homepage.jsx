import React from "react";

export default function Homepage({ start, setCategory, setDifficulty }) {
    return (
        <div className="homepage">
            <h1>Quizzical</h1>
            <h3>Test Your Knowledge!</h3>
            <select onChange={(event) => setCategory(event.target.value)}>
                <option value="">Select a category</option>
                <option value="31">Anime/Manga</option>
                <option value="20">Mythology</option>
                <option value="22">Geography</option>
                <option value="21">Sports</option>
                <option value="27">Animals</option>
            </select>

            <select onChange={(event) => setDifficulty(event.target.value)}>
                <option value="">Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            <button onClick={start}>Start Quiz</button>
        </div>
    )
}