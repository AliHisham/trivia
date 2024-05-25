import React, { useState } from "react";
import WelcomeForm from "./WelcomeForm";
import { playerInfo } from "../SharedTypes";

const TriviaWrapper = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [start, setStart] = useState<boolean>(false);

  return (
    <div className="p-4">
      <WelcomeForm
        setPlayerName={setPlayerName}
        setDifficulty={setDifficulty}
        setStart={setStart}
        playerName={playerName}
        difficulty={difficulty}
      />
    </div>
  );
};

export default TriviaWrapper;
