import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Question } from "../SharedTypes";
import QuestionCard from "./QuestionCard";
import { fetchingQuestions } from "../service/triviaApis/trivia";

type QuestionListingProps = {
  category: number;
  difficulty: string;
  setCategory: React.Dispatch<React.SetStateAction<number>>;
};
const QuestionListing = ({
  category,
  difficulty,
  setCategory,
}: QuestionListingProps) => {
  const amount = 5;
  const [index, setIndex] = useState<number>(1);
  const [stopWatch, setStopWatch] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");
  const [numberOfCorrectAnsweres, setNumberOfCorrectAnsweres] =
    useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [timeoutId, setTimeOutId] = useState<NodeJS.Timeout | null>(null);

  const commonCssClass =
    "text-white font-bangers text-2xl rounded-md p-4 py-2 px-4 ";

  const { data } = useQuery<Question[]>({
    queryKey: ["results"],
    queryFn: () => fetchingQuestions(amount, category, difficulty),
  });
  const difficultyTimeValue =
    difficulty === "easy" ? 90 : difficulty === "medium" ? 60 : 30;
  const skippingQuestions = (skipType: number) => {
    if (skipType == 1) {
      setStopWatch(difficultyTimeValue);
    }
    setIndex((prev) => {
      return prev + 1;
    });
    setAnswer("");
  };

  useEffect(() => {
    if (index <= amount) {
      let milliseconds =
        difficulty === "hard" ? 30000 : difficulty === "medium" ? 60000 : 90000;

      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeOutId(setTimeout(() => skippingQuestions(0), milliseconds));
      } else {
        setTimeOutId(setTimeout(() => skippingQuestions(0), milliseconds));
      }
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(
          setInterval(() => {
            setStopWatch((prev) => {
              if (prev >= difficultyTimeValue) {
                return 1;
              } else {
                return prev + 1;
              }
            });
          }, 1000)
        );
      } else {
        setIntervalId(
          setInterval(() => {
            setStopWatch((prev) => {
              if (prev >= 30) {
                return 1;
              } else {
                return prev + 1;
              }
            });
          }, 1000)
        );
      }
    } else {
      const data = localStorage.getItem("triviaInfo");
      if (data) {
        const playerData = JSON.parse(data);

        let temp = [...playerData.selectedCategories, category];
        let totalPlayerScore = playerData.totalScore + numberOfCorrectAnsweres;
        localStorage.setItem(
          "triviaInfo",
          JSON.stringify({
            playerName: playerData.playerName,
            difficulty: playerData.difficulty,
            selectedCategories: temp,
            totalScore: totalPlayerScore,
            token: playerData.token,
            submissionDate: playerData.submissionDate,
          })
        );
      }
      setCategory(0);
    }
  }, [index]);

  return (
    <div className="flex flex-col h-screen  gap-3 items-center">
      <div className="text-primary-dark text-2xl font-bangers">
        {stopWatch == difficultyTimeValue
          ? "new question"
          : stopWatch +
            " seconds remaining of " +
            difficultyTimeValue +
            " seconds"}
      </div>

      {data && index <= amount && (
        <QuestionCard
          incorrect_answres={data[index - 1].incorrect_answers}
          question={data[index - 1].question}
          correct_answer={data[index - 1].correct_answer}
          setAnswer={setAnswer}
          answer={answer}
        />
      )}
      <div className="flex gap-3">
        <button
          disabled={answer === ""}
          onClick={() => {
            if (data && data && data[index - 1] && answer) {
              console.log(answer, data[index - 1]);
              if (answer === data[index - 1].correct_answer) {
                setNumberOfCorrectAnsweres((prev) => {
                  return prev + 1;
                });
              }
            }
            setStopWatch(difficultyTimeValue);
            setIndex((prev) => prev + 1);
            setAnswer("");
          }}
          className={`${
            answer === ""
              ? "bg-gray-400"
              : "bg-primary-dark hover:scale-110 transition-transform duration-300"
          } ${commonCssClass}`}
        >
          Next
        </button>
        <button
          onClick={() => skippingQuestions(1)}
          className="py-2 px-4  bg-primary-dark text-white font-bangers text-2xl rounded-md hover:scale-110 transition-transform duration-"
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default QuestionListing;
