"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GuessTheNumber() {
  const [targetNumber, setTargetNumber] = useState(0)
  const [guess, setGuess] = useState("")
  const [message, setMessage] = useState("")
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    resetGame()
  }, [])

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1)
    setGuess("")
    setMessage("Try to guess the number between 1 and 100!")
    setAttempts(0)
  }

  const handleGuess = () => {
    const guessNumber = Number.parseInt(guess)
    setAttempts(attempts + 1)

    if (isNaN(guessNumber)) {
      setMessage("Please enter a valid number.")
    } else if (guessNumber === targetNumber) {
      setMessage(`Congratulations! You guessed the number in ${attempts + 1} attempts.`)
    } else if (guessNumber < targetNumber) {
      setMessage("Too low! Try a higher number.")
    } else {
      setMessage("Too high! Try a lower number.")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Guess the Number</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{message}</p>
        <div className="space-y-4">
          <Input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess"
          />
          <div className="flex space-x-2">
            <Button onClick={handleGuess}>Guess</Button>
            <Button variant="outline" onClick={resetGame}>
              New Game
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

