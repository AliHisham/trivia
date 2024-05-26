import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Question } from "../SharedTypes";
import QuestionCard from "./QuestionCard";

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
  // console.log(
  //   category,
  //   "checkingg the prop from inside the questionListing component!!!"
  // );

  const [index, setIndex] = useState<number>(1);
  const [amount, setAmount] = useState<number>(3);
  const [stopWatch, setStopWatch] = useState<number>(0);

  const skippingQuestions = () => {
    setIndex((prev) => {
      return prev + 1;
    });
  };

  const fetchingQuestions = () => {
    return fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty.toLocaleLowerCase()}`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return res.results;
      });
  };
  const { data } = useQuery<Question[]>({
    queryKey: ["results"],
    queryFn: fetchingQuestions,
  });

  useEffect(() => {
    if (index <= amount) {
      let milliseconds =
        difficulty === "HARD" ? 30000 : difficulty === "MEDIUM" ? 60000 : 90000;
      setTimeout(skippingQuestions, milliseconds);
      let myInterval = setInterval(() => {
        if (stopWatch > 30 || stopWatch == 30) {
          setStopWatch(1);
          clearInterval(myInterval);
        } else {
          setStopWatch((prev) => {
            console.log(prev, "checking the numberr");
            return prev + 1;
          });
        }
      }, 1000);
    } else {
      console.log(index, "is the index greaterrrrr1rr1");
      setCategory(0);
    }
  }, [index, difficulty]);

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="text-red-500">
        {stopWatch == 30
          ? "new question"
          : stopWatch + " seconds remaining of " + 30 + " seconds"}
      </div>

      {data && index <= amount && (
        <QuestionCard
          incorrect_answres={data[index - 1].incorrect_answers}
          question={data[index - 1].question}
          correct_answer={data[index - 1].correct_answer}
        />
      )}
      <div className="flex gap-3">
        <button
          disabled={index == amount}
          onClick={() => {
            setIndex((prev) => prev + 1);
          }}
          className="p-4 bg-red-600 rounded-md"
        >
          Next
        </button>
        <button className="p-4 bg-red-600 rounded-md">Skip</button>
      </div>
    </div>
  );
};

export default QuestionListing;
