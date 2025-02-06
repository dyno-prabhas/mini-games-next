// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"

// type Player = "X" | "O" | null

// export default function TicTacToe() {
//   const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
//   const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")
//   const [winner, setWinner] = useState<Player>(null)

//   const checkWinner = (squares: Player[]): Player => {
//     const lines = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ]

//     for (let i = 0; i < lines.length; i++) {
//       const [a, b, c] = lines[i]
//       if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//         return squares[a]
//       }
//     }

//     return null
//   }

//   const handleClick = (index: number) => {
//     if (board[index] || winner) return

//     const newBoard = [...board]
//     newBoard[index] = currentPlayer
//     setBoard(newBoard)

//     const newWinner = checkWinner(newBoard)
//     if (newWinner) {
//       setWinner(newWinner)
//     } else {
//       setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
//     }
//   }

//   const resetGame = () => {
//     setBoard(Array(9).fill(null))
//     setCurrentPlayer("X")
//     setWinner(null)
//   }

//   const renderSquare = (index: number) => (
//     <Button onClick={() => handleClick(index)} className="h-24 text-4xl" variant={board[index] ? "default" : "outline"}>
//       {board[index]}
//     </Button>
//   )

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardContent className="p-6">
//         <h2 className="text-2xl font-bold mb-4">Tic-Tac-Toe</h2>
//         <div className="grid grid-cols-3 gap-2 mb-4">{board.map((_, index) => renderSquare(index))}</div>
//         {winner ? (
//           <div>
//             <p className="text-xl font-bold mb-2">Winner: {winner}</p>
//             <Button onClick={resetGame}>Play Again</Button>
//           </div>
//         ) : board.every(Boolean) ? (
//           <div>
//             <p className="text-xl font-bold mb-2">It's a draw!</p>
//             <Button onClick={resetGame}>Play Again</Button>
//           </div>
//         ) : (
//           <p className="text-xl">Current player: {currentPlayer}</p>
//         )}
//       </CardContent>
//     </Card>
//   )
// }


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

type Player = "X" | "O" | null

const X_IMAGE = "/tic-tac-toe-X.png" // Replace with your image path
const O_IMAGE = "/og-2.png" // Replace with your image path

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")
  const [winner, setWinner] = useState<Player>(null)

  const checkWinner = (squares: Player[]): Player => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]
    ]

    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }

    return null
  }

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer("X")
    setWinner(null)
  }

  const renderSquare = (index: number) => (
    <Button
      onClick={() => handleClick(index)}
      className="h-24 w-24 flex items-center justify-center bg-gray-200"
      variant={board[index] ? "default" : "outline"}
    >
      {board[index] ? (
        <Image src={board[index] === "X" ? X_IMAGE : O_IMAGE}  alt={board[index]} width={90} height={90} className="object-cover" />
      ) : (
        "?"
      )}
    </Button>
  )

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Tic-Tac-Toe</h2>
        <div className="grid grid-cols-3 gap-2 mb-4">{board.map((_, index) => renderSquare(index))}</div>
        {winner ? (
          <div>
            <p className="text-xl font-bold mb-2">Winner: {winner}</p>
            <Button onClick={resetGame}>Play Again</Button>
          </div>
        ) : board.every(Boolean) ? (
          <div>
            <p className="text-xl font-bold mb-2">It's a draw!</p>
            <Button onClick={resetGame}>Play Again</Button>
          </div>
        ) : (
          <p className="text-xl">Current player: <img src={currentPlayer === "X" ? X_IMAGE : O_IMAGE} alt={currentPlayer} className="w-8 h-8 inline-block" /></p>
        )}
      </CardContent>
    </Card>
  )
}

