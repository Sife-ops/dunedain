import React from "react";
import { SelectableCategory } from "./use-categories";

interface Props {
  categories: SelectableCategory[];
  toggleCategory: (category: SelectableCategory) => void;
}

export const Categories: React.FC<Props> = (props) => {
  if (props.categories.length < 1) {
    return (
      <div>
        <div>no categories</div>
      </div>
    );
  }

  return (
    <div>
      {props.categories.map((e) => (
        <Category
          key={e.categoryId}
          category={e}
          toggleCategory={props.toggleCategory}
        />
      ))}
    </div>
  );
};

export const Category: React.FC<{
  category: SelectableCategory;
  toggleCategory: (category: SelectableCategory) => void;
}> = (props) => {
  return (
    <div>
      <input
        type={"checkbox"}
        checked={props.category.selected}
        onClick={() => props.toggleCategory(props.category)}
      />
      <div>{props.category.title}</div>
    </div>
  );
};
