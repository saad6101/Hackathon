"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import stats from "./stats";
import PenaltyKickGame from "@/components/PenaltyKickGameCaptcha";

export default function Page() {
  const [won, setWon] = useState<boolean>(true);
  // const [game1, setGame1] = useState<boolean>(false)
  const players = stats;

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [showStats, setShowStats] = useState(false);

  const handlePrevPlayer = () => {
    setCurrentPlayerIndex((prevIndex) =>
      prevIndex === 0 ? players.length - 1 : prevIndex - 1,
    );
    setShowStats(false); // Reset showStats when changing player
  };

  const handleNextPlayer = () => {
    setCurrentPlayerIndex((prevIndex) =>
      prevIndex === players.length - 1 ? 0 : prevIndex + 1,
    );
    setShowStats(false); // Reset showStats when changing player
  };

  const handlePlayerClick = () => {
    setWon(false);
    setShowStats(true); // Show stats when player is clicked
  };

  const handleCloseModal = () => {
    setShowStats(false);
  };

  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="flex flex-col items-center h-screen m-2 rounded-lg">
      <div className="flex justify-center items-center w-full">
        <h1 className="text-4xl font-bold text-amber-300">
          The Incredible Ballan D&apos;or
        </h1>
      </div>
      <div className="relative w-full h-full flex items-center justify-center">
        <button
          className="absolute left-0 bg-amber-300 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePrevPlayer}
        >
          &lt;
        </button>
        <div className="relative hover:scale-105 transition-transform duration-300">
          <Image
            src={currentPlayer.imageSrc}
            alt={currentPlayer.name}
            width={currentPlayer.width}
            height={currentPlayer.height}
            layout="responsive"
            className="cursor-pointer rounded-lg border-4 border-amber-500"
            onClick={handlePlayerClick}
          />
          <h2 className="absolute bottom-0 w-full text-center text-4xl font-bold text-slate-50 bg-amber-500 bg-opacity-50 py-2 rounded-lg">
            {currentPlayer.name}
          </h2>
        </div>
        <button
          className="absolute right-0 bg-amber-400 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNextPlayer}
        >
          &gt;
        </button>
      </div>
      {!won && <PenaltyKickGame setWon={setWon} />}
      {won && showStats && currentPlayer.stats && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-10 rounded-lg shadow-lg max-w-2xl w-full h-5/6 overflow-y-auto relative scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500 scrollbar-track-rounded">
            <button
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              onClick={handleCloseModal}
            >
              <FaTimes size={24} />
            </button>
            <h3 className="text-2xl text-amber-300 font-bold mb-4 text-center">
              Player Stats
            </h3>
            <table className="min-w-full bg-white">
              <tbody>
                {Object.entries(currentPlayer.stats).map(([key, value]) => (
                  <tr key={key} className="w-full border-b">
                    <td className="px-4 py-2 text-xl text-teal-600 font-semibold">
                      {key}
                    </td>
                    <td
                      className={`px-4 py-2 text-2xl text-orange-500 ${key === "Accolades" ? "whitespace-pre-line" : ""}`}
                    >
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
