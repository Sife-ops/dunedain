import React, { useEffect, useState } from "react";
import { SelectableCategory } from "../categories/use-categories";
import { useCategoryCreateMutation } from "../../query/category-create";
import { useCategoryDeleteMutation } from "../../query/category-delete";
import { useCategoryEditMutation } from "../../query/category-edit";

export const CategoryForm: React.FC<{
  category?: SelectableCategory;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setModalMode?: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const [title, setTitle] = useState("");

  const [categoryCreateState, categoryCreate] = useCategoryCreateMutation();
  const [categoryDeleteState, categoryDelete] = useCategoryDeleteMutation();
  const [categoryEditState, categoryEdit] = useCategoryEditMutation();

  useEffect(() => {
    const { fetching, data, error } = categoryCreateState;
    if (!fetching && !error && data) {
      props.setEnabled(false);
    }
  }, [categoryCreateState.data]);

  useEffect(() => {
    const { fetching, data, error } = categoryEditState;
    if (!fetching && !error && data) {
      props.setEnabled(false);
    }
  }, [categoryEditState.data]);

  useEffect(() => {
    const { fetching, data, error } = categoryDeleteState;
    if (!fetching && !error && data) {
      props.setEnabled(false);
    }
  }, [categoryDeleteState.data]);

  useEffect(() => {
    if (props.category) {
      setTitle(props.category.title);
    }
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (props.category) {
          // todo: doesn't reexec, wtf
          categoryEdit({
            categoryId: props.category.categoryId,
            title,
          });
        } else {
          categoryCreate({ title });
        }
      }}
    >
      <input
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
        value={title}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <button type={"submit"} disabled={title.length < 1}>
            Save
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              if (props.setModalMode) {
                props.setModalMode(false);
              } else {
                props.setEnabled(false);
              }
            }}
          >
            Cancel
          </button>
        </div>

        {props.category && (
          <div>
            <button
              onClick={(e) => {
                //
                e.preventDefault();
                categoryDelete({
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
