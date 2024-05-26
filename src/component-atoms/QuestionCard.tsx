import React, { useEffect, useMemo, useState } from "react";
type QuestionProps = {
  question: string;
  incorrect_answres: string[];
  correct_answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
};
const QuestionCard = ({
  correct_answer,
  incorrect_answres,
  question,
  setAnswer,
}: QuestionProps) => {
  const [activeIndex, setActiveIndex] = useState<number>();

  let answers = [...incorrect_answres, correct_answer];

  const shuffeledAnsweres = useMemo(() => {
    return answers.sort(() => Math.random() - 0.5);
  }, [question, incorrect_answres.toString(), correct_answer]);

  const handleSelectedAnswer = (index: number, answer: string) => {
    setActiveIndex(index + 1);
    setAnswer(answer);
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [correct_answer]);

  return (
    <div className="bg-white p-4 rounded-md flex flex-col gap-2 items-center">
      <div>{question}</div>
      <div className=" flex gap-2 items-center">
        {shuffeledAnsweres.map((answer, index) => {
          return (
            <div>
              <button
                onClick={() => handleSelectedAnswer(index, answer)}
                className={
                  activeIndex == index + 1
                    ? "bg-red-500 p-2 rounded-md"
                    : "bg-red-200 p-2 rounded-md"
                }
              >
                {answer}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
