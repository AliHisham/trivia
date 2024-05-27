export const fetchingQuestions = (
  amount: number,
  category: number,
  difficulty: string
) => {
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

export const fetchingCategories = () => {
  return fetch("https://opentdb.com/api_category.php")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res.trivia_categories;
    });
};

export const fetchingSessionToken = () => {
  return fetch("https://opentdb.com/api_token.php?command=request")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response.token;
    });
};
