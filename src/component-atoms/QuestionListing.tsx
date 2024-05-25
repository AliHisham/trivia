import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Question } from "../SharedTypes";
import QuestionCard from "./QuestionCard";

type QuestionListingProps = {
  category: number;
  difficulty: string;
};
const QuestionListing = ({ category, difficulty }: QuestionListingProps) => {
  console.log(
    category,
    "checkingg the prop from inside the questionListing component!!!"
  );
  const [index, setIndex] = useState<number>(0);

  const fetchingQuestions = () => {
    return fetch(
      `https://opentdb.com/api.php?amount=${20}&category=${category}&difficulty=${difficulty.toLocaleLowerCase()}`
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

  return (
    <div className="flex flex-col gap-3 items-center">
      {data && (
        <QuestionCard
          incorrect_answres={data[index].incorrect_answers}
          question={data[index].question}
          correct_answer={data[index].correct_answer}
        />
      )}
      <div className="flex gap-3">
        <button
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
