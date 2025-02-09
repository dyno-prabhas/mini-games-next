import React, { useRef, useEffect, useState } from "react";

const PADDLE_SPEED = 6;
const BALL_SPEED = 4;
const WINNING_SCORE = 5;

export default function PingPong() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ballRef = useRef({ x: 300, y: 200, dx: BALL_SPEED, dy: BALL_SPEED, radius: 10 });
  const paddle1Ref = useRef({ x: 10, y: 150, width: 10, height: 80, dy: 0 });
  const paddle2Ref = useRef({ x: 580, y: 150, width: 10, height: 80, dy: 0 });
  const scoreRef = useRef({ player1: 0, player2: 0 });

  const [gameMode, setGameMode] = useState<"single" | "multi" | null>(null);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameActive || !gameMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resetBall = () => {
      ballRef.current = { x: 300, y: 200, dx: BALL_SPEED, dy: BALL_SPEED, radius: 10 };
    };

    const checkGameOver = () => {
      if (scoreRef.current.player1 >= WINNING_SCORE || scoreRef.current.player2 >= WINNING_SCORE) {
        setGameOver(true);
        setGameActive(false);
      }
    };

    const drawBall = () => {
      const { x, y, radius } = ballRef.current;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.closePath();
    };

    const drawPaddles = () => {
      const p1 = paddle1Ref.current;
      const p2 = paddle2Ref.current;
      ctx.fillStyle = "#fff";
      ctx.fillRect(p1.x, p1.y, p1.width, p1.height);
      ctx.fillRect(p2.x, p2.y, p2.width, p2.height);
    };

    const drawScores = () => {
      ctx.fillStyle = "#fff";
      ctx.font = "20px Arial";
      ctx.fillText(`Player 1: ${scoreRef.current.player1}`, 50, 30);
      ctx.fillText(`Player 2: ${scoreRef.current.player2}`, canvas.width - 150, 30);
    };

    const moveBall = () => {
      const ball = ballRef.current;
      ball.x += ball.dx;
      ball.y += ball.dy;

      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
      }

      const p1 = paddle1Ref.current;
      const p2 = paddle2Ref.current;

      if (
        (ball.x - ball.radius < p1.x + p1.width &&
          ball.y > p1.y &&
          ball.y < p1.y + p1.height) ||
        (ball.x + ball.radius > p2.x &&
          ball.y > p2.y &&
          ball.y < p2.y + p2.height)
      ) {
        ball.dx *= -1;
      }

      if (ball.x - ball.radius < 0) {
        scoreRef.current.player2 += 1;
        resetBall();
        checkGameOver();
      }
      if (ball.x + ball.radius > canvas.width) {
        scoreRef.current.player1 += 1;
        resetBall();
        checkGameOver();
      }
    };

    const movePaddles = () => {
      const p1 = paddle1Ref.current;
      const p2 = paddle2Ref.current;

      p1.y += p1.dy;
      p2.y += p2.dy;

      p1.y = Math.max(0, Math.min(p1.y, canvas.height - p1.height));
      p2.y = Math.max(0, Math.min(p2.y, canvas.height - p2.height));
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawPaddles();
      drawScores();
      moveBall();
      movePaddles();

      if (gameMode === "single") {
        const p2 = paddle2Ref.current;
        const ball = ballRef.current;
        if (p2.y + p2.height / 2 < ball.y) {
          p2.y += PADDLE_SPEED / 2;
        } else {
          p2.y -= PADDLE_SPEED / 2;
        }
      }

      if (!gameOver) {
        animationFrameId = requestAnimationFrame(gameLoop);
      }
    };

    gameLoop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [gameActive, gameMode]);

  const handleKeyDown = (e: KeyboardEvent) => {
    const p1 = paddle1Ref.current;
    const p2 = paddle2Ref.current;

    if (e.key === "w") p1.dy = -PADDLE_SPEED;
    if (e.key === "s") p1.dy = PADDLE_SPEED;
    if (gameMode === "multi") {
      if (e.key === "ArrowUp") p2.dy = -PADDLE_SPEED;
      if (e.key === "ArrowDown") p2.dy = PADDLE_SPEED;
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    const p1 = paddle1Ref.current;
    const p2 = paddle2Ref.current;

    if (e.key === "w" || e.key === "s") p1.dy = 0;
    if (e.key === "ArrowUp" || e.key === "ArrowDown") p2.dy = 0;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameMode]);

  const startGame = (mode: "single" | "multi") => {
    setGameMode(mode);
    setGameActive(true);
    setGameOver(false);
    scoreRef.current = { player1: 0, player2: 0 };
    ballRef.current = { x: 300, y: 200, dx: BALL_SPEED, dy: BALL_SPEED, radius: 10 };
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#000",
      }}
    >
      {!gameActive && (
        <div style={{ color: "#fff", textAlign: "center" }}>
          <h1>Pong Game</h1>
          {gameOver && (
            <h2>
              {scoreRef.current.player1 >= WINNING_SCORE ? "Player 1 Wins!" : "Player 2 Wins!"}
            </h2>
          )}
          <button onClick={() => startGame("single")} style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}>
            Single Player
          </button>
          <button onClick={() => startGame("multi")} style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}>
            Two Players
          </button>
        </div>
      )}
      <canvas ref={canvasRef} width={600} height={400} style={{ border: "1px solid #fff" }} />
    </div>
  );
}
