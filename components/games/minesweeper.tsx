"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Tile {
  value: number | "💣";
  revealed: boolean;
  flagged: boolean;
}

const LEVELS = {
  easy: { rows: 8, cols: 8, mines: 10 },
  medium: { rows: 12, cols: 12, mines: 25 },
  hard: { rows: 16, cols: 16, mines: 50 },
};

const generateBoard = (rows: number, cols: number, mines: number): Tile[][] => {
  let board: Tile[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ value: 0, revealed: false, flagged: false }))
  );

  let minePositions = new Set<number>();
  while (minePositions.size < mines) {
    let pos = Math.floor(Math.random() * rows * cols);
    minePositions.add(pos);
  }

  minePositions.forEach((pos) => {
    let r = Math.floor(pos / cols);
    let c = pos % cols;
    board[r][c] = { value: "💣", revealed: false, flagged: false };
    
    for (let dr of [-1, 0, 1]) {
      for (let dc of [-1, 0, 1]) {
        let nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].value !== "💣") {
          board[nr][nc] = { ...board[nr][nc], value: (board[nr][nc].value as number) + 1 };
        }
      }
    }
  });
  
  return board;
};

const revealSafeTiles = (board: Tile[][]) => {
  let zeroTiles: [number, number][] = [];
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      if (board[r][c].value === 0) {
        zeroTiles.push([r, c]);
      }
    }
  }
  zeroTiles.slice(0, 3).forEach(([r, c]) => {
    board[r][c].revealed = true;
  });
  return board;
};

export default function Minesweeper() {
  const [level, setLevel] = useState<"easy" | "medium" | "hard">("easy");
  const [board, setBoard] = useState<Tile[][]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    const { rows, cols, mines } = LEVELS[level];
    let newBoard = generateBoard(rows, cols, mines);
    setBoard(revealSafeTiles(newBoard));
    setGameOver(false);
  }, [level]);

  const revealTile = (r: number, c: number) => {
    if (gameOver || board[r][c].revealed || board[r][c].flagged) return;
    if (board[r][c].value === "💣") {
      setGameOver(true);
      return;
    }
    let newBoard = [...board];
    newBoard[r][c] = { ...newBoard[r][c], revealed: true };
    setBoard(newBoard);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Minesweeper</h2>
      <div className="flex gap-2 mb-4">
        {Object.keys(LEVELS).map((lvl) => (
          <Button key={lvl} onClick={() => setLevel(lvl as "easy" | "medium" | "hard")} variant={level === lvl ? "default" : "outline"}>
            {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
          </Button>
        ))}
      </div>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${LEVELS[level].cols}, 30px)` }}>
        {board.map((row, rIdx) =>
          row.map((tile, cIdx) => (
            <button
              key={`${rIdx}-${cIdx}`}
              className={`w-8 h-8 flex items-center justify-center border text-lg font-bold ${tile.revealed ? "bg-gray-300" : "bg-gray-600"}`}
              onClick={() => revealTile(rIdx, cIdx)}
            >
              {tile.revealed ? tile.value : ""}
            </button>
          ))
        )}
      </div>
      {gameOver && <p className="text-red-600 font-bold mt-4">Game Over! Try again.</p>}
    </div>
  );
}
