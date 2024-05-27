import Reac, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { IndentStyle } from "typescript";
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
  const handleSetDifficultyLevel = (index: number) => {
    index + 1 == 1
      ? setDifficulty("easy")
      : index + 1 == 2
      ? setDifficulty("medium")
      : setDifficulty("hard");
  };

  const fetchingSessionToken = () => {
    return fetch("https://opentdb.com/api_token.php?command=request")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.token;
      });
  };

  const { data } = useQuery({
    queryKey: ["token"],
    queryFn: fetchingSessionToken,
  });
  console.log(data, "checkingggg dataaaaaaaa! of tokennn!");
  const handleStartOfTheGame = () => {
    setStart(true);
    localStorage.setItem(
      "triviaInfo",
      JSON.stringify({
        playerName: playerName,
        difficulty: difficulty,
        totalScore: 0,
        selectedCategories: [],
        token: data ? data : "",
        submissionDate: new Date().toISOString(),
      })
    );
  };

  return (
    <div>
      <div className="flex flex-col gap-8 items-center p-4 h-screen">
        <p className="font-bangers text-6xl text-primary">
          WELCOME TO THE TRIVA WORLD!
        </p>
        <input
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-1/2 rounded-md p-4 font-bangers text-secondary h-20"
          placeholder="Enter your name"
        ></input>
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((button, index) => {
            return (
              <button
                onClick={() => handleSetDifficultyLevel(index)}
                className="bg-primary rounded-md py-4 px-8 font-bangers text-lg text-black hover:text-white hover:bg-primary"
              >
                {index + 1 == 1 ? "EASY" : index + 1 == 2 ? "MEDIUM" : "HARD"}
              </button>
            );
          })}
        </div>
        {difficulty && (
          <p className="font-bangers text-lg ">Difficulty:{difficulty}</p>
        )}
        <button
          onClick={() => handleStartOfTheGame()}
          disabled={difficulty === "" || playerName === ""}
          className="bg-secondary text-black hover:text-white font-bangers text-6xl w-2/6 p-4 rounded-md"
        >
          PLAY
        </button>
      </div>
    </div>
  );
};

export default WelcomeForm;
