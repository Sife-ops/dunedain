import React from "react";
import { Category as CategoryType } from "../../../../graphql/genql/schema";
import { useCategoryForm } from "./use-category-form";
import { useNavigate } from "react-router-dom";

export const CategoryForm: React.FC<{
  category?: CategoryType;
}> = (props) => {
  const navigate = useNavigate();

  const categoryForm = useCategoryForm(props.category);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (props.category) {
          categoryForm.mutation.categoryEdit({
            categoryId: props.category.categoryId,
            title: categoryForm.state.title,
          });
        } else {
          categoryForm.mutation.categoryCreate({
            title: categoryForm.state.title,
          });
        }
      }}
    >
      <input
        onChange={(e) => categoryForm.set.setTitle(e.target.value)}
        placeholder="title"
        value={categoryForm.state.title}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <button
            type={"submit"}
            disabled={categoryForm.state.title.length < 1}
          >
            {props.category ? "Save" : "Submit"}
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </div>

        {props.category && (
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                categoryForm.mutation.categoryDelete({
                  categoryId: props.category?.categoryId!,
                });
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </form>
  );
};
