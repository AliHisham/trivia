import React, { useEffect, useState } from "react";
import { checkCategoryAvailability } from "./CategoryListing";

type CategoryCardProps = {
  categoryName: string;
  categorNumber: number;
};

const CategoryCard = ({ categoryName, categorNumber }: CategoryCardProps) => {
  const [disable, setDisable] = useState(false);
  const commonCSS = "flex flex-col gap-2 rounded-md items-center m-3 p-4";

  useEffect(() => {
    !checkCategoryAvailability(categorNumber)
      ? setDisable(true)
      : setDisable(false);
  }, []);

  return (
    <div
      className={`${
        disable
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-primary-light hover:bg-primary-dark hover:text-white hover:scale-110 transition-transform duration-300"
      } ${commonCSS}`}
    >
      <h3 className="font-bangers text-xl">{categoryName}</h3>
      <h2 className="font-bangers">Number:{categorNumber}</h2>
    </div>
  );
};

export default CategoryCard;
