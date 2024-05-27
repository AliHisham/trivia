import React from "react";

type CategoryCardProps = {
  categoryName: string;
  categorNumber: number;
};
const CategoryCard = ({ categoryName, categorNumber }: CategoryCardProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-md bg-primary-light items-center m-3 p-4 cursor-pointer hover:bg-primary-dark hover:text-white hover:scale-110 transition-transform duration-300">
      <h3 className="font-bangers text-xl">{categoryName}</h3>
      <h2 className="font-bangers">Number:{categorNumber}</h2>
    </div>
  );
};

export default CategoryCard;
