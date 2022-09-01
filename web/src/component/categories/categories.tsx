import React from "react";
import { CategoryForm } from "../category-form";
import { SelectableCategory } from "./use-categories";

interface Props {
  categories: SelectableCategory[];
  categoryEditMode?: boolean;
  setModalComponent?: React.Dispatch<React.SetStateAction<JSX.Element>>;
  setModalMode?: React.Dispatch<React.SetStateAction<boolean>>;
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
          categoryEditMode={props.categoryEditMode}
          setModalComponent={props.setModalComponent}
          setModalMode={props.setModalMode}
          toggleCategory={props.toggleCategory}
        />
      ))}
    </div>
  );
};

const Category: React.FC<{
  category: SelectableCategory;
  categoryEditMode?: boolean;
  setModalComponent?: React.Dispatch<React.SetStateAction<JSX.Element>>;
  setModalMode?: React.Dispatch<React.SetStateAction<boolean>>;
  toggleCategory: (category: SelectableCategory) => void;
}> = (props) => {
  if (props.categoryEditMode !== undefined && props.categoryEditMode === true) {
    return (
      <div>
        <button
          onClick={() => {
            props.setModalComponent!(
              <div>
                <h3>Edit Category</h3>
                <CategoryForm
                  category={props.category}
                  setEnabled={props.setModalMode!}
                  setModalMode={props.setModalMode}
                />
              </div>
            );
            props.setModalMode!(true);
          }}
        >
          {props.category.title}
        </button>
      </div>
    );
  }

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
