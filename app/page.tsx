import GameCard from "@/components/game-card"
import { games } from "@/lib/games"

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Welcome to Mini-Games</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  )
}

