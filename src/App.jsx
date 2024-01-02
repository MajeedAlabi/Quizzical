import React from "react";
import { useState } from "react";

import YelloBlob from "./assets/blob-yellow.png"
import BlueBlob from "./assets/blob-blue.png"

import Homepage from "./components/Homepage";
import Quiz from "./components/Quiz";


export default function App() {
  const [quiz, setQuiz] = useState(false)
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("")

  function startQuiz() {
    setQuiz((prevState) => !prevState)
  }

  return (
    <>
      <img src={YelloBlob} className="blob-yellow" />
      <img src={BlueBlob} className="blob-blue" />
      {quiz ? <Quiz play={startQuiz} category={category} difficulty={difficulty}/>: <Homepage start={startQuiz} setCategory={setCategory} setDifficulty={setDifficulty}/>}
    </>
  )
}