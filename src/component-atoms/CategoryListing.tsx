import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../SharedTypes";
import CategoryCard from "./CategoryCard";
import { fetchingCategories } from "../service/triviaApis/trivia";

type CategoryProps = {
  setCategory: React.Dispatch<React.SetStateAction<number>>;
};

export const checkCategoryAvailability = (categoryNumber: number) => {
  const data = localStorage.getItem("triviaInfo");

  if (data) {
    const playerData = JSON.parse(data);

    if (playerData.selectedCategories) {
      console.log(categoryNumber, "checkinggagagag");
      let index = playerData.selectedCategories.findIndex(
        (number: number) => number == categoryNumber
      );
      console.log(index, "checking the indexxxxx");
      return index >= 0 ? false : true;
    }
  }
  return true;
};
const CategoryListing = ({ setCategory }: CategoryProps) => {
  const { data } = useQuery<Category[]>({
    queryKey: ["trivia_categories"],
    queryFn: fetchingCategories,
  });

  useEffect(() => {
    const data = localStorage.getItem("triviaInfo");
    if (data) {
      const playerData = JSON.parse(data);
      if (playerData.selectedCategories) {
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="font-bangers text-6xl text-primary">SELECT A CATEGORY!</h2>
      <div className=" grid grid-cols-4 gap-4">
        {data &&
          data.map((category) => {
            return (
              <div
                onClick={() => {
                  checkCategoryAvailability(category.id)
                    ? setCategory(category.id)
                    : setCategory(0);
                }}
                className=""
              >
                <CategoryCard
                  categoryName={category.name}
                  categorNumber={category.id}
                  key={category.id}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CategoryListing;
