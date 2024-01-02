import React, { useState } from "react"
import Home from "./components/Home"
import Quiz from "./components/Quiz"

function App() {

  const [startGame, setStartGame] = useState(false)
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  function beginGame() {
    setStartGame(prev => !prev)
  }
  return (
    <>
      {!startGame ? <Home beginGame={beginGame}
        setCategory={setCategory}
        setDifficulty={setDifficulty}
      /> : <Quiz beginGame={beginGame} category={category} difficulty={difficulty} />}
    </>
  )
}

export default App
