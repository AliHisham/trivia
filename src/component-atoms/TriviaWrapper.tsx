import React, { useState, useEffect } from "react";
import WelcomeForm from "./WelcomeForm";
import CategoryListing from "./CategoryListing";
import QuestionListing from "./QuestionListing";

const TriviaWrapper = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [start, setStart] = useState<boolean>(false);
  const [category, setCategory] = useState<number>(0);

  useEffect(() => {
    const data = localStorage.getItem("triviaInfo");
    if (data) {
      let playerData = JSON.parse(data);
      setStart(true);
      setPlayerName(playerData.playerName);
      setDifficulty(playerData.difficulty);
      let date1 = new Date(playerData.submissionDate);
      let date2 = new Date();
      let differenceInMilliseconds = Math.abs(
        date1.getTime() - date2.getTime()
      );
      let differenceInHour = differenceInMilliseconds / (60 * 60 * 1000);
      if (differenceInHour >= 6) {
        setStart(false);
        localStorage.removeItem("triviaInfo");
      }
    }
  }, []);

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
