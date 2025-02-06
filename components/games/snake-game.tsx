"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION = { x: 1, y: 0 }
const INITIAL_FOOD = { x: 15, y: 15 }

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [food, setFood] = useState(INITIAL_FOOD)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)

  const moveSnake = useCallback(() => {
    if (gameOver) return

    const newSnake = [...snake]
    const head = { ...newSnake[0] }

    head.x += direction.x
    head.y += direction.y

    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      setGameOver(true)
      return
    }

    if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true)
      return
    }

    newSnake.unshift(head)

    if (head.x === food.x && head.y === food.y) {
      setScore((prevScore) => prevScore + 1)
      setFood({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      })
    } else {
      newSnake.pop()
    }

    setSnake(newSnake)
  }, [snake, direction, food, gameOver])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection({ x: 0, y: -1 })
          break
        case "ArrowDown":
          setDirection({ x: 0, y: 1 })
          break
        case "ArrowLeft":
          setDirection({ x: -1, y: 0 })
          break
        case "ArrowRight":
          setDirection({ x: 1, y: 0 })
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)

    const gameLoop = setInterval(moveSnake, 100)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      clearInterval(gameLoop)
    }
  }, [moveSnake])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setFood(INITIAL_FOOD)
    setGameOver(false)
    setScore(0)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Snake Game</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">Score: {score}</div>
        <div
          style={{
            width: GRID_SIZE * CELL_SIZE,
            height: GRID_SIZE * CELL_SIZE,
            position: "relative",
            border: "1px solid #ccc",
          }}
        >
          {snake.map((segment, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                backgroundColor: "green",
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: "red",
              borderRadius: "50%",
            }}
          />
        </div>
        {gameOver && (
          <div className="mt-4">
            <p>Game Over! Your score: {score}</p>
            <Button onClick={resetGame} className="mt-2">
              Play Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

