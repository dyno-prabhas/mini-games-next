"use client";

import { useState, useEffect, useCallback } from "react";

const GRAVITY = 0.5;
const LIFT = -7;
const PIPE_SPEED = 2;
const PIPE_GAP = 140;
const BIRD_X = 50;
const PIPE_WIDTH = 50;
const PIPE_INTERVAL = 90;

interface Pipe {
  x: number;
  height: number;
}

export default function FlappyBird() {
  const [birdY, setBirdY] = useState(200);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [frameCount, setFrameCount] = useState(0);

  const jump = useCallback(() => {
    if (!gameOver) {
      setVelocity(LIFT);
    }
  }, [gameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        jump();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [jump]);

  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      setBirdY((y) => Math.min(y + velocity, 400));
      setVelocity((v) => v + GRAVITY);
      setFrameCount((f) => f + 1);

      if (frameCount % PIPE_INTERVAL === 0) {
        const pipeHeight = Math.random() * (300 - 100) + 100;
        setPipes((p) => [...p, { x: 400, height: pipeHeight }]);
      }

      setPipes((p) =>
        p
          .map((pipe) => ({ ...pipe, x: pipe.x - PIPE_SPEED }))
          .filter((pipe) => pipe.x + PIPE_WIDTH > 0)
      );

      pipes.forEach((pipe) => {
        if (
          BIRD_X < pipe.x + PIPE_WIDTH &&
          BIRD_X + 30 > pipe.x &&
          (birdY < pipe.height || birdY + 30 > pipe.height + PIPE_GAP)
        ) {
          setGameOver(true);
        }
      });

      if (birdY + 30 >= 400) {
        setGameOver(true);
      }
    }, 20);

    return () => clearInterval(gameLoop);
  }, [birdY, velocity, pipes, gameOver, frameCount]);

  const resetGame = () => {
    setBirdY(200);
    setVelocity(0);
    setPipes([]);
    setGameOver(false);
    setFrameCount(0);
  };

  return (
    <div className="relative w-[400px] h-[400px] bg-blue-400 mx-auto mt-10 overflow-hidden border-4 border-black">
      <div
        className="absolute w-[30px] h-[30px] bg-yellow-400 rounded-full"
        style={{ left: BIRD_X, top: birdY }}
      ></div>
      {pipes.map((pipe, index) => (
        <>
          <div
            key={index + "top"}
            className="absolute w-[50px] bg-green-600"
            style={{ left: pipe.x, top: 0, height: pipe.height }}
          ></div>
          <div
            key={index + "bottom"}
            className="absolute w-[50px] bg-green-600"
            style={{
              left: pipe.x,
              top: pipe.height + PIPE_GAP,
              height: 400 - pipe.height - PIPE_GAP,
            }}
          ></div>
        </>
      ))}
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <p className="text-white text-2xl font-bold">Game Over!</p>
          <button className="mt-2 p-2 bg-white text-black rounded" onClick={resetGame}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
}
