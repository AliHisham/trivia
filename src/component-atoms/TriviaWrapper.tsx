import React, { useState } from "react";
import WelcomeForm from "./WelcomeForm";
import CategoryListing from "./CategoryListing";

const TriviaWrapper = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [start, setStart] = useState<boolean>(false);

  return (
    <div className="p-4 bg-gray-300 rounded-md box shadow-md">
      <WelcomeForm
        setPlayerName={setPlayerName}
        setDifficulty={setDifficulty}
        setStart={setStart}
        playerName={playerName}
        difficulty={difficulty}
      />
      <CategoryListing />
    </div>
  );
};

export default TriviaWrapper;
