"use client"

import { useState } from "react"
import { useLocalStorage } from "@/lib/use-local-storage"
import SnakeGame from "./games/snake-game"
import TicTacToe from "./games/tic-tac-toe"
import MemoryCardGame from "./games/memory-card-game"
import GuessTheNumber from "./games/guess-the-number"
import Minesweeper from "./games/minesweeper"
import FlappyBird from "./games/flappy-bird"
import RockPaperScissors from "./games/rock-paper-scissor"


export default function GameWrapper({ gameId }) {
  const [highScore, setHighScore] = useLocalStorage(`highscore-${gameId}`, 0)
  const [showGameOver, setShowGameOver] = useState(false)
  const [currentScore, setCurrentScore] = useState(0)

  const handleGameOver = (score) => {
    setCurrentScore(score)
    if (score > highScore) {
      setHighScore(score)
    }
    setShowGameOver(true)
  }

  const restartGame = () => {
    setShowGameOver(false)
    setCurrentScore(0)
  }

  // Implement other games here...
  const games = {
    snake: SnakeGame,
    tic_tac_toe: TicTacToe,
    memory_card: MemoryCardGame,
    guess_the_number: GuessTheNumber,
    minesweeper: Minesweeper,
    flappy_bird: FlappyBird,
    rock_paper_scissors: RockPaperScissors,
  }

  const GameComponent = games[gameId];

  if (!GameComponent) {
    return <div>Game not implemented yet</div>
  }

  return (
    <div className="relative">
      <GameComponent onGameOver={handleGameOver} />
      {showGameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-background p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Game Over</h2>
            <p className="mb-2">Your score: {currentScore}</p>
            <p className="mb-4">High score: {highScore}</p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded" onClick={restartGame}>
              Start Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

