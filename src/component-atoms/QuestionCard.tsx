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
  const commonBtnClasses =
    "rounded-md text-lg hover:bg-secondary hover:text-white";

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
    <div className="bg-primary h-56 text-white min-w-44 p-4 rounded-md flex flex-col gap-2 items-center font-bangers">
      <div className="text-2xl">{question}</div>
      <div className=" flex gap-2 items-center">
        {shuffeledAnsweres.map((answer, index) => {
          return (
            <div>
              <button
                onClick={() => handleSelectedAnswer(index, answer)}
                className={`${
                  index + 1
                }== ${activeIndex} ? bg-secondary p-4 :bg-white p-2 text-black ${commonBtnClasses}`}
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
