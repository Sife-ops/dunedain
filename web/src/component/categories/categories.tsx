import React from "react";
import { CategoryButton } from "./category-button";
import { SelectableCategory } from "./use-categories";

export const Categories: React.FC<{
  categories: SelectableCategory[] | null;
  toggleCategory: (category: SelectableCategory) => void;
}> = (props) => {
  if (props.categories === null) {
    return (
      <div>
        <div>loading...</div>
      </div>
    );
  }

  if (props.categories.length < 1) {
    return (
      <div>
        <div>no categories</div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-1">
      {props.categories.map((e) => (
        <CategoryButton
          key={e.categoryId}
          onChange={() => props.toggleCategory(e)}
        >
          {e.title}
        </CategoryButton>
      ))}
    </div>
  );
};
