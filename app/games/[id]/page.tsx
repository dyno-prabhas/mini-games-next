import { games } from "@/lib/games"
import { notFound } from "next/navigation"
import GameWrapper from "@/components/game-wrapper"

export default function GamePage({ params }: { params: { id: string } }) {
  const game = games.find((g) => g.id === params.id)

  if (!game) {
    notFound()
  }

  return (
    <div className="max-wz-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
      <GameWrapper gameId={game.id} />
    </div>
  )
}

