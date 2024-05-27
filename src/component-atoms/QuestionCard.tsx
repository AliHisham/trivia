import React, { useEffect, useMemo, useState } from "react";
type QuestionProps = {
  question: string;
  incorrect_answres: string[];
  correct_answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  answer: string;
};
const QuestionCard = ({
  correct_answer,
  incorrect_answres,
  question,
  setAnswer,
  answer,
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
    <div className="bg-primary h-56 text-white min-w-custom p-4 rounded-md flex flex-col gap-4 items-center font-bangers justify-center text-center">
      <div className="text-4xl">{question}</div>
      <div className=" flex gap-4 items-center">
        {shuffeledAnsweres.map((answer, index) => {
          return (
            <div key={index}>
              <button
                onClick={() => handleSelectedAnswer(index, answer)}
                className="text-black font-bangers text-2xl rounded-md p-2 bg-secondary hover:text-white hover:scale-110 transition-transform duration-300"
              >
                {answer}
              </button>
            </div>
          );
        })}
      </div>
      {answer && (
        <div className=" font-bangers text-lg text-secondary">
          {" "}
          {"You Selected: "}
          {answer}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
