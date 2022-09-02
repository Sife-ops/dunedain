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
    <div
      style={{
        display: "flex",
        gap: "2rem",
      }}
    >
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

const Category: React.FC<{
  category: SelectableCategory;
  toggleCategory: (category: SelectableCategory) => void;
}> = (props) => {
  return (
    <div>
      <label>
        <input
          checked={props.category.selected}
          onChange={() => props.toggleCategory(props.category)}
          type={"checkbox"}
        />
        {props.category.title}
      </label>
    </div>
  );
};
