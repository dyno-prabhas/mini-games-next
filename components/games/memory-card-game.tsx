// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"

// const CARD_PAIRS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"]

// interface CardType {
//   id: number
//   emoji: string
//   flipped: boolean
//   matched: boolean
// }

// export default function MemoryCardGame() {
//   const [cards, setCards] = useState<CardType[]>([])
//   const [flippedCards, setFlippedCards] = useState<number[]>([])
//   const [moves, setMoves] = useState(0)
//   const [gameOver, setGameOver] = useState(false)

//   useEffect(() => {
//     initializeGame()
//   }, [])

//   const initializeGame = () => {
//     const shuffledCards = [...CARD_PAIRS, ...CARD_PAIRS]
//       .sort(() => Math.random() - 0.5)
//       .map((emoji, index) => ({
//         id: index,
//         emoji,
//         flipped: false,
//         matched: false,
//       }))
//     setCards(shuffledCards)
//     setFlippedCards([])
//     setMoves(0)
//     setGameOver(false)
//   }

//   const handleCardClick = (id: number) => {
//     if (flippedCards.length === 2 || cards[id].flipped || cards[id].matched) return

//     const newCards = [...cards]
//     newCards[id].flipped = true
//     setCards(newCards)

//     const newFlippedCards = [...flippedCards, id]
//     setFlippedCards(newFlippedCards)

//     if (newFlippedCards.length === 2) {
//       setMoves(moves + 1)
//       checkForMatch(newFlippedCards)
//     }
//   }

//   const checkForMatch = (flippedCardIds: number[]) => {
//     const [firstCardId, secondCardId] = flippedCardIds
//     if (cards[firstCardId].emoji === cards[secondCardId].emoji) {
//       const newCards = [...cards]
//       newCards[firstCardId].matched = true
//       newCards[secondCardId].matched = true
//       setCards(newCards)
//       setFlippedCards([])

//       if (newCards.every((card) => card.matched)) {
//         setGameOver(true)
//       }
//     } else {
//       setTimeout(() => {
//         const newCards = [...cards]
//         newCards[firstCardId].flipped = false
//         newCards[secondCardId].flipped = false
//         setCards(newCards)
//         setFlippedCards([])
//       }, 1000)
//     }
//   }

//   return (
//     <Card className="w-full max-w-3xl mx-auto">
//       <CardContent className="p-6">
//         <h2 className="text-2xl font-bold mb-4">Memory Card Game</h2>
//         <div className="mb-4">Moves: {moves}</div>
//         <div className="grid grid-cols-4 gap-4">
//           {cards.map((card) => (
//             <Button
//               key={card.id}
//               onClick={() => handleCardClick(card.id)}
//               className="h-24 text-4xl"
//               variant={card.flipped || card.matched ? "default" : "outline"}
//             >
//               {card.flipped || card.matched ? card.emoji : "?"}
//             </Button>
//           ))}
//         </div>
//         {gameOver && (
//           <div className="mt-4">
//             <p>Congratulations! You completed the game in {moves} moves.</p>
//             <Button onClick={initializeGame} className="mt-2">
//               Play Again
//             </Button>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const CARD_PAIRS = [
  "/flappy-bird.png",
  "/flappy-bird.png",
  "/flappy-bird.png",
  "/flappy-bird.png",
  "/flappy-bird.png",
  "/flappy-bird.png",
  "/flappy-bird.png",
  "/flappy-bird.png",
]

interface CardType {
  id: number
  image: string
  flipped: boolean
  matched: boolean
}

export default function MemoryCardGame() {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const shuffledCards = [...CARD_PAIRS, ...CARD_PAIRS]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        id: index,
        image,
        flipped: false,
        matched: false,
      }))
    setCards(shuffledCards)
    setFlippedCards([])
    setMoves(0)
    setGameOver(false)
  }

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].flipped || cards[id].matched) return

    const newCards = [...cards]
    newCards[id].flipped = true
    setCards(newCards)

    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)
      checkForMatch(newFlippedCards)
    }
  }

  const checkForMatch = (flippedCardIds: number[]) => {
    const [firstCardId, secondCardId] = flippedCardIds
    if (cards[firstCardId].image === cards[secondCardId].image) {
      const newCards = [...cards]
      newCards[firstCardId].matched = true
      newCards[secondCardId].matched = true
      setCards(newCards)
      setFlippedCards([])

      if (newCards.every((card) => card.matched)) {
        setGameOver(true)
      }
    } else {
      setTimeout(() => {
        const newCards = [...cards]
        newCards[firstCardId].flipped = false
        newCards[secondCardId].flipped = false
        setCards(newCards)
        setFlippedCards([])
      }, 1000)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Memory Card Game</h2>
        <div className="mb-4">Moves: {moves}</div>
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <Button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="h-24 w-24 flex items-center justify-center bg-gray-200"
              variant={card.flipped || card.matched ? "default" : "outline"}
            >
              {card.flipped || card.matched ? (
                <img src={card.image} alt="Card" className="w-full h-full object-cover rounded" />
              ) : (
                "?"
              )}
            </Button>
          ))}
        </div>
        {gameOver && (
          <div className="mt-4">
            <p>Congratulations! You completed the game in {moves} moves.</p>
            <Button onClick={initializeGame} className="mt-2">
              Play Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
