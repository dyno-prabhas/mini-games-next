// pages/games.tsx

import { useState } from 'react';

type Result = 'You win!' | 'You lose!' | "It's a tie!";

const Games = () => {
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [opponentChoice, setOpponentChoice] = useState<string | null>(null);
  const [result, setResult] = useState<Result>();

  // Function to randomly generate opponent's choice
  const getOpponentChoice = (): string => {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  // Function to determine the winner
  const getWinner = (player: string, opponent: string): Result => {
    if (player === opponent) {
      return "It's a tie!";
    }
    if (
      (player === 'rock' && opponent === 'scissors') ||
      (player === 'scissors' && opponent === 'paper') ||
      (player === 'paper' && opponent === 'rock')
    ) {
      return 'You win!';
    } else {
      return 'You lose!';
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6">Rock, Paper, Scissors Game</h1>

        {/* Player's Choice */}
        <div className="flex justify-center space-x-8 mb-6">
          <div
            className="choice-circle bg-blue-500 p-6 rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => handleChoice('rock')}
          >
            <img src="/rock-icon.svg" alt="Rock" className="w-16 h-16" />
          </div>
          <div
            className="choice-circle bg-green-500 p-6 rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => handleChoice('paper')}
          >
            <img src="/paper-icon.svg" alt="Paper" className="w-16 h-16" />
          </div>
          <div
            className="choice-circle bg-red-500 p-6 rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => handleChoice('scissors')}
          >
            <img src="/scissors-icon.svg" alt="Scissors" className="w-16 h-16" />
          </div>
        </div>

        {/* Results */}
        {playerChoice && opponentChoice && (
          <div className="mt-6">
            <p className="text-lg font-semibold">Your choice: {playerChoice}</p>
            <p className="text-lg font-semibold">Opponent's choice: {opponentChoice}</p>
            <p className="text-xl font-bold mt-4">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;
