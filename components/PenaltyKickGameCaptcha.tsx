"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BsPersonArmsUp } from "react-icons/bs";
import { FaLock } from "react-icons/fa"; // Importing a lock icon for the logo
import generateGoalkeeperSaveChanceB from "./percentage.tsx"; // Import the function to generate the goalkeeper save chance

interface ChildProps {
  setWon: React.Dispatch<React.SetStateAction<boolean>>;
}

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const PenaltyKickGame: React.FC<ChildProps> = ({ setWon }) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
}, []);

  const router = useRouter();
  const [goalKeeperSaveChance, setGoalKeeperSaveChance] = useState(generateGoalkeeperSaveChanceB());
  console.log(goalKeeperSaveChance);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState("");
  const [ballPosition, setBallPosition] = useState({ x: 150, y: 280 });
  const [goalkeeperPosition, setGoalkeeperPosition] = useState("center");
  const [isKicking, setIsKicking] = useState(false);
  const [neededScore, setNeededScore] = useState(generateRandomNumber(8, 25));
  const [maxAttempts, setMaxAttempts] = useState(generateRandomNumber(8, 40));

  const kickBall = (direction: "left" | "center" | "right") => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    let goalkeeperDirection: "left" | "center" | "right";

    const randomValue = Math.random();
    if (randomValue < goalKeeperSaveChance) {
      goalkeeperDirection = direction;
    } else {
      const otherDirections = ["left", "center", "right"].filter(
        (d) => d !== direction
      );
      goalkeeperDirection =
        otherDirections[Math.floor(Math.random() * 2)] as "left" | "center" | "right";
    }

    setGoalkeeperPosition(goalkeeperDirection);

    const newX = direction === "left" ? 50 : direction === "center" ? 150 : 250;
    setIsKicking(true);
    setBallPosition({ x: newX, y: 50 });

    if (direction === goalkeeperDirection) {
      setResult("Saved! The goalkeeper caught.");
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setResult("Goal! You scored!");

      // Check if the player has won
      if (newScore >= neededScore) {
        if (Math.random() <= 0.25) {
          setResult("You won!");
          setTimeout(() => {
            setWon(true);  
          }, 1000);
        } else {
          setResult("Oops! The authentication failed. Server Error");
          setTimeout(() => {
            router.push("/");
            setWon(false);  
          }, 1000);
        }
      }
    }

    // Check if the player has lost
    if (newAttempts >= maxAttempts) {
      setResult("You lost!");
      router.push("/");
      setWon(false);
    }

    // Reset kicking state after a short delay
    setTimeout(() => {
      setIsKicking(false);
      setBallPosition({ x: 150, y: 280 });
    }, 500);
  };

  useEffect(() => {
    if (isKicking) {
      const timer = setTimeout(() => {
        setBallPosition({ x: 150, y: 280 });
        setGoalkeeperPosition("center");
        setIsKicking(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isKicking]);

  const handleRefresh = () => {
    setScore(0);
    setAttempts(0);
    setResult("");
    setNeededScore(generateRandomNumber(1, 40));
    setMaxAttempts(generateRandomNumber(1, 50));
    setGoalKeeperSaveChance(generateGoalkeeperSaveChanceB());
    router.push("/pages/Website");
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-green-100 flex flex-col items-center justify-center p-10 rounded-lg shadow-lg h-5/6 overflow-y-auto relative">
        <div className="flex items-center justify-between w-full mb-6">
          <div className="flex items-center space-x-2">
            <FaLock size={24} />
            <h1 className="text-2xl font-bold">Captcha</h1>
          </div>
          <Button onClick={handleRefresh}>Refresh</Button>
        </div>
        <div className="flex flex-col items-start mb-6">
          <p>Needed Score: <strong>{neededScore}</strong></p>
          <p>Max Attempts: <strong>{maxAttempts}</strong></p>
        </div>
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