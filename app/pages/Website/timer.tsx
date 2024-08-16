"use client"
import { useEffect, useState } from "react";
import React from "react";




const TimerButton: React.FC = () => {
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="absolute top-0 right-0 m-2">
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
        Timer: {timer} seconds
      </button>
    </div>
  );
};

export default TimerButton;