import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
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

      {/* {props.categories.map((e) => (
        <Button
          //
          key={e.categoryId}
          onClick={() => props.toggleCategory(e)}
        >
          {e.title}
        </Button>
      ))} */}
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
