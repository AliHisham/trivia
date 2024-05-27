import React, { useState, useEffect } from "react";
import WelcomeForm from "./WelcomeForm";
import CategoryListing from "./CategoryListing";
import QuestionListing from "./QuestionListing";
import PlayerFinalScore from "./PlayerFinalScore";

const TriviaWrapper = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [start, setStart] = useState<boolean>(false);
  const [category, setCategory] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [numberOfCorrectAnsweres, setNumberOfCorrectAnsweres] = useState<{
    correctAnsweres: number;
    categories: number;
  }>({ correctAnsweres: 0, categories: 0 });

  useEffect(() => {
    const data = localStorage.getItem("triviaInfo");
    if (data) {
      let playerData = JSON.parse(data);

      let date1 = new Date(playerData.submissionDate);
      let date2 = new Date();
      let differenceInMilliseconds = Math.abs(
        date1.getTime() - date2.getTime()
      );
      let differenceInHour = differenceInMilliseconds / (60 * 60 * 1000);
      if (differenceInHour >= 6) {
        setStart(false);
        localStorage.removeItem("triviaInfo");
      } else {
        setStart(true);
        setPlayerName(playerData.playerName);
        setDifficulty(playerData.difficulty);
      }
    }
  }, [start]);

  return (
    <div className="p-4 bg-background rounded-md box shadow-md">
      {!start && !category && !showScore && (
        <WelcomeForm
          setPlayerName={setPlayerName}
          setDifficulty={setDifficulty}
          setStart={setStart}
          playerName={playerName}
          difficulty={difficulty}
        />
      )}
      {start && !category && !showScore && (
        <CategoryListing
          setShowScore={setShowScore}
          setCategory={setCategory}
          setNumberOfCorrectAnsweres={setNumberOfCorrectAnsweres}
        />
      )}
      {category && !showScore ? (
        <QuestionListing
          numberOfCorrectAnsweres={numberOfCorrectAnsweres.correctAnsweres}
          setNumberOfCorrectAnsweres={setNumberOfCorrectAnsweres}
          setCategory={setCategory}
          category={category}
          difficulty={difficulty}
        />
      ) : (
        <></>
      )}
      {showScore && (
        <PlayerFinalScore
          numberOfCorrectAnsweresCount={numberOfCorrectAnsweres.correctAnsweres}
          numberOfCorrectAnsweresPercentage={numberOfCorrectAnsweres.categories}
          playerName={playerName}
          setStart={setStart}
        />
      )}
    </div>
  );
};

export default TriviaWrapper;
