import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../SharedTypes";
import CategoryCard from "./CategoryCard";

const CategoryListing = () => {
  const fetchingCategories = () => {
    return fetch("https://opentdb.com/api_category.php")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("checking the response", res.trivia_categories);
        return res.trivia_categories;
      });
  };

  const { data } = useQuery<Category[]>({
    queryKey: ["trivia_categories"],
    queryFn: fetchingCategories,
  });

  return (
    <div className=" grid grid-cols-4 gap-4">
      {data &&
        data.map((category) => {
          return (
            <div className="">
              <CategoryCard
                categoryName={category.name}
                categorNumber={category.id}
                key={category.id}
              />
            </div>
          );
        })}
    </div>
  );
};

export default CategoryListing;
