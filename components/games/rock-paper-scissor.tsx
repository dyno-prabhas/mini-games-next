import { useState } from "react";

type Result = "You win!" | "You lose!" | "It's a tie!";

const Games = () => {
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [opponentChoice, setOpponentChoice] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  // Function to randomly generate opponent's choice
  const getOpponentChoice = (): string => {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  // Function to determine the winner
  const getWinner = (player: string, opponent: string): Result => {
    if (player === opponent) return "It's a tie!";
    if (
      (player === "rock" && opponent === "scissors") ||
      (player === "scissors" && opponent === "paper") ||
      (player === "paper" && opponent === "rock")
    ) {
      return "You win!";
    } else {
      return "You lose!";
    }
  };

  // Handle player choice and start the game
  const handleChoice = (choice: string): void => {
    const opponentChoice = getOpponentChoice();
    setPlayerChoice(choice);
    setOpponentChoice(opponentChoice);
    setResult(getWinner(choice, opponentChoice));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg w-full max-w-lg text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Rock, Paper, Scissors</h1>

        {/* Player's Choice Buttons */}
        <div className="flex justify-center space-x-4 md:space-x-6 mb-6">
          <button
            className="bg-red-600 hover:bg-red-700 p-4 md:p-6 rounded-full transition transform hover:scale-110"
            onClick={() => handleChoice("rock")}
          >
            <img src="/" alt="Rock" className="w-16 h-16 md:w-20 md:h-20" />
          </button>

          <button
            className="bg-green-600 hover:bg-green-700 p-4 md:p-6 rounded-full transition transform hover:scale-110"
            onClick={() => handleChoice("paper")}
          >
            <img src="/paper.png" alt="Paper" className="w-16 h-16 md:w-20 md:h-20" />
          </button>

          <button
            className="bg-blue-600 hover:bg-blue-700 p-4 md:p-6 rounded-full transition transform hover:scale-110"
            onClick={() => handleChoice("scissors")}
          >
            <img src="/" alt="Scissors" className="w-16 h-16 md:w-20 md:h-20" />
          </button>
        </div>

        {/* Results Section */}
        {playerChoice && opponentChoice && (
          <div className="mt-6 text-lg md:text-xl">
            <p className="font-semibold">You chose: <span className="text-yellow-400">{playerChoice}</span></p>
            <p className="font-semibold">Opponent chose: <span className="text-yellow-400">{opponentChoice}</span></p>
            <p className={`text-2xl md:text-3xl font-bold mt-4 ${result === "You win!" ? "text-green-400" : result === "You lose!" ? "text-red-400" : "text-gray-400"}`}>
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;
