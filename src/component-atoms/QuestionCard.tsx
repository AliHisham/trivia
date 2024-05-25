import React from "react";
type QuestionProps = {
  question: string;
  incorrect_answres: string[];
  correct_answer: string;
};
const QuestionCard = ({
  correct_answer,
  incorrect_answres,
  question,
}: QuestionProps) => {
  let answers = [...incorrect_answres, correct_answer];

  return (
    <div className="bg-white p-4 rounded-md flex flex-col gap-2 items-center">
      <div>{question}</div>
      <div className=" flex gap-2 items-center">
        {answers.map((answer) => {
          return (
            <div>
              <button className="p-2 bg-red-700 ">{answer}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
