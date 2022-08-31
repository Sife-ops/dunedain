import React, { useEffect, useState } from "react";
import { useCategoryCreateMutation } from "../../query/category-create";

export const CategoryForm: React.FC<{
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const [title, setTitle] = useState("");
  const [categoryCreateState, categoryCreate] = useCategoryCreateMutation();

  useEffect(() => {
    const { fetching, data, error } = categoryCreateState;
    if (!fetching && !error && data) {
      props.setEnabled(false);
    }
  }, [categoryCreateState.data]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        categoryCreate({ title });
      }}
    >
      <input
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
        value={title}
      />

      <button type={"submit"} disabled={title.length < 1}>
        Submit
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          props.setEnabled(false);
        }}
      >
        Cancel
      </button>
    </form>
  );
};
