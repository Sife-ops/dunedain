import React from "react";
import { Categories as CategoriesComponent } from "../component/categories";
import { useCategoriesQuery } from "../query/categories";

export const Categories: React.FC = () => {
  const categoriesResponse = useCategoriesQuery();

  return (
    <CategoriesComponent
      buttonNew
      categoriesResponse={categoriesResponse}
    />
  );
};
