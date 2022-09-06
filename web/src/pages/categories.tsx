import React from "react";
import { Categories as CategoriesComponent } from "../component/categories/categories-2";
import { useCategoriesQuery } from "../query/categories";

export const Categories: React.FC = () => {
  const useCategoriesResponse = useCategoriesQuery();

  return (
    <div>
      <CategoriesComponent
        buttonNew
        useCategoriesResponse={useCategoriesResponse}
      />
    </div>
  );
};
