import React from "react";

type CategoryCardProps = {
  categoryName: string;
  categorNumber: number;
};
const CategoryCard = ({ categoryName, categorNumber }: CategoryCardProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-md bg-white items-center m-3 p-4">
      <h3>{categoryName}</h3>
      <h2>Number:{categorNumber}</h2>
    </div>
  );
};

export default CategoryCard;
