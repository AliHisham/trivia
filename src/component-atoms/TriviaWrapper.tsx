import React, { useState } from "react";
import WelcomeForm from "./WelcomeForm";
import CategoryListing from "./CategoryListing";
import QuestionListing from "./QuestionListing";

const TriviaWrapper = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [start, setStart] = useState<boolean>(false);
  const [category, setCategory] = useState<number>(0);

  return (
    <div className="p-4 bg-gray-300 rounded-md box shadow-md">
      {!start && !category && (
        <WelcomeForm
          setPlayerName={setPlayerName}
          setDifficulty={setDifficulty}
          setStart={setStart}
          playerName={playerName}
          difficulty={difficulty}
        />
      )}
      {start && !category && <CategoryListing setCategory={setCategory} />}
      {category && (
        <QuestionListing
          setCategory={setCategory}
          category={category}
          difficulty={difficulty}
        />
      )}
    </div>
  );
};

export default TriviaWrapper;
