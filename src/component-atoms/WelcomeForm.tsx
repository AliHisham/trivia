import React, { useRef } from "react";
import { playerInfo } from "../SharedTypes";

type WelcomeFormProps = {
  setPlayerName: React.Dispatch<React.SetStateAction<string>>;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  playerName: string;
  difficulty: string;
};
const WelcomeForm = ({
  setPlayerName,
  setDifficulty,
  setStart,
  difficulty,
  playerName,
}: WelcomeFormProps) => {
  const handleSetDifficultyLevel = (level: string) => {
    setDifficulty(level);
  };
  return (
    <div>
      <div className="flex flex-col gap-3 items-center p-4">
        <input
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-1/2 rounded-md p-4"
          placeholder="Enter your name"
        ></input>
        <div className="flex gap-2">
          <button
            onClick={() => handleSetDifficultyLevel("EASY")}
            className="bg-white rounded-md p-4"
          >
            EASY
          </button>
          <button
            onClick={() => handleSetDifficultyLevel("MEDIUM")}
            className="bg-white rounded-md p-4"
          >
            MEDIUM
          </button>
          <button
            onClick={() => handleSetDifficultyLevel("HARD")}
            className="bg-white rounded-md p-4"
          >
            HARD
          </button>
        </div>
        <button
          onClick={() => setStart(true)}
          disabled={difficulty === "" && playerName === ""}
          className="bg-red-600 w-2/6 p-4 rounded-md"
        >
          PLAY
        </button>
      </div>
    </div>
  );
};

export default WelcomeForm;
