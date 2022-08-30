import React, { useEffect } from "react";
import { SelectableCategory, useCategories, Categories } from "../categories";
import { useBookmarkCreateMutation } from "../../query/bookmark-create";
import { useBookmarkForm } from "./use-bookmark-form";

export const BookmarkForm: React.FC<{
  categories: SelectableCategory[];
  setCreateMode: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const bookmarkForm = useBookmarkForm();

  const { categories, toggleCategory, setCategories } = useCategories();

  const [bookmarkCreateState, bookmarkCreate] = useBookmarkCreateMutation();

  // todo: merge if bookmark prop passed
  useEffect(() => {
    setCategories(
      props.categories.map((c) => ({
        ...c,
        selected: false,
      }))
    );
  }, []);

  useEffect(() => {
    const { fetching, data, error } = bookmarkCreateState;
    if (!fetching && !error && data) {
      props.setCreateMode(false);
    }
  }, [bookmarkCreateState.fetching]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const { title, url } = bookmarkForm.formState;
        bookmarkCreate({
          input: {
            title,
            url,
            categoryIds: categories
              .filter((e) => e.selected)
              .map((e) => e.categoryId),
          },
        });
      }}
    >
      <input
        placeholder="url"
        onChange={(e) => bookmarkForm.formSet.setUrl(e.target.value)}
      />

      <input
        placeholder="title"
        onChange={(e) => bookmarkForm.formSet.setTitle(e.target.value)}
      />

      <Categories categories={categories} toggleCategory={toggleCategory} />

      <button type={"submit"} disabled={!bookmarkForm.formState.isValidForm}>
        Submit
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          props.setCreateMode(false);
        }}
      >
        Cancel
      </button>
    </form>
  );
};
