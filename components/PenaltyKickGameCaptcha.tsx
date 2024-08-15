"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BsPersonArmsUp } from "react-icons/bs";

interface ChildProps {
  setWon: React.Dispatch<React.SetStateAction<boolean>>;
}

const PenaltyKickGame: React.FC<ChildProps> = ({ setWon }) => {
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState("");
  const [ballPosition, setBallPosition] = useState({ x: 150, y: 280 });
  const [goalkeeperPosition, setGoalkeeperPosition] = useState("center");
  const [isKicking, setIsKicking] = useState(false);

  const kickBall = (direction: "left" | "center" | "right") => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    let goalkeeperDirection: "left" | "center" | "right";

    newAttempts <= 5
      ? (goalkeeperDirection = direction)
      : (goalkeeperDirection = ["left", "center", "right"][
          Math.floor(Math.random() * 3)
        ] as "left" | "center" | "right");

    setGoalkeeperPosition(goalkeeperDirection);

    const newX = direction === "left" ? 50 : direction === "center" ? 150 : 250;
    setIsKicking(true);
    setBallPosition({ x: newX, y: 50 });

    if (direction === goalkeeperDirection) {
      setResult("Saved! The goalkeeper caught.");
    } else {
      setScore(score + 1);
      setResult("Goal! You scored!");
      //delay the won state change
      const timer = setTimeout(() => {
        setWon(true);
        console.log("won");
      }, 2000);
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    if (isKicking) {
      const timer = setTimeout(() => {
        setBallPosition({ x: 150, y: 280 });
        setGoalkeeperPosition("center");
        setIsKicking(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isKicking]);

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-green-100 flex flex-col items-center justify-center p-10 rounded-lg shadow-lg h-5/6 overflow-y-auto relativ">
        <h1 className="text-4xl font-bold mb-6">Penalty Kick Game</h1>
        <div className="mb-4">
          <p>Score: {score}</p>
          <p>Attempts: {attempts}</p>
        </div>
        <svg width="300" height="300" viewBox="0 0 300 300" className="mb-4">
          {/* Goal post */}
          <rect
            x="0"
            y="0"
            width="300"
            height="100"
            fill="none"
            stroke="black"
            strokeWidth="5"
          />

          {/* Goalkeeper */}
          <BsPersonArmsUp
            size={60}
            x={
              goalkeeperPosition === "left"
                ? "20"
                : goalkeeperPosition === "center"
                  ? "120"
                  : "220"
            }
            y="25"
            className="transition-all duration-500 ease-out"
          />

          {/* Ball */}
          <circle
            cx={ballPosition.x}
            cy={ballPosition.y}
            r="10"
            fill="black"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <div className="flex space-x-4 mb-4">
          <Button onClick={() => kickBall("left")} disabled={isKicking}>
            Kick Left
          </Button>
          <Button onClick={() => kickBall("center")} disabled={isKicking}>
            Kick Center
          </Button>
          <Button onClick={() => kickBall("right")} disabled={isKicking}>
            Kick Right
          </Button>
        </div>
        {result && <p className="text-xl font-semibold">{result}</p>}
      </div>
    </div>
  );
};

export default PenaltyKickGame;
