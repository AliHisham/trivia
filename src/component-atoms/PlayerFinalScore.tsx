import React from "react";

type PlayerFinalScoreProps = {
  playerName: string;
  categories: number;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setCategotry: React.Dispatch<React.SetStateAction<number>>;
  setShowScore: React.Dispatch<React.SetStateAction<boolean>>;
};
const PlayerFinalScore = ({
  categories,
  playerName,
  setStart,
  setCategotry,
  setShowScore,
}: PlayerFinalScoreProps) => {
  const caluclatePercentage = () => {
    const data = localStorage.getItem("triviaInfo");
    if (data) {
      const playerInfo = JSON.parse(data);
      const totalScore = playerInfo.totalScore;
      return (totalScore / (categories * 5)) * 100;
    } else {
      return 0;
    }
  };
  return (
    <div className="h-screen font-bangers flex flex-col gap-4 items-center text-center  justify-center">
      <div className="overflow-hidden whitespace-nowrap ">
        <div className="inline-block animate-slide">
          <span className="mr-4 text-6xl text-primary-dark">
            thank you for playing{" "}
          </span>
        </div>
      </div>
      <p className="text-4xl text-primary-dark">
        {" "}
        <span className="text-black">name:</span> {playerName}
      </p>

      <p className="text-4xl text-primary-dark">
        {" "}
        <span className="text-black">score:</span>
      </p>

      <p className="text-4xl text-primary-dark">
        {" "}
        <span className="text-black">
          {" "}
          percentage: {caluclatePercentage().toFixed(1)} {" %"}
        </span>
        {}
      </p>

      <button
        onClick={() => {
          setStart(false);
          setCategotry(0);
          setShowScore(false);
          localStorage.removeItem("triviaInfo");
        }}
        className="text-4xl bg-primary-dark p-4 rounded-md"
      >
        play again
      </button>
    </div>
  );
};

export default PlayerFinalScore;
