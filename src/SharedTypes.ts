export type playerInfo = {
  name: string;
  level: string;
};

export type Category = {
  name: string;
  id: number;
};

export type Question = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};
