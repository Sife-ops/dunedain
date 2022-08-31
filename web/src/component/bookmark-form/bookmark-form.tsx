import React, { useEffect } from "react";
import { Bookmark } from "../../../../graphql/genql/schema";
import { SelectableCategory, useCategories, Categories } from "../categories";
import { useBookmarkCreateMutation } from "../../query/bookmark-create";
import { useBookmarkEditMutation } from "../../query/bookmark-edit";
import { useBookmarkForm } from "./use-bookmark-form";

export const BookmarkForm: React.FC<{
  bookmark?: Bookmark;
  categories: SelectableCategory[];
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const bookmarkForm = useBookmarkForm();

  const { categories, toggleCategory, setCategories } = useCategories();

  const [bookmarkCreateState, bookmarkCreate] = useBookmarkCreateMutation();
  const [bookmarkEditState, bookmarkEdit] = useBookmarkEditMutation();

  // todo: merge if bookmark prop passed
  useEffect(() => {
    setCategories(
      props.categories.map((c) => ({
        ...c,
        selected: false,
      }))
    );

    if (props.bookmark) {
      console.log(props.bookmark);
      bookmarkForm.formSet.setUrl(props.bookmark.url);
      bookmarkForm.formSet.setTitle(props.bookmark.title);
      props.bookmark.categories.map((e) => toggleCategory(e));
    }
  }, []);

  useEffect(() => {
    const { fetching, data, error } = bookmarkCreateState;
    if (!fetching && !error && data) {
      props.setEnabled(false);
    }
  }, [bookmarkCreateState.data]);

  useEffect(() => {
    const { fetching, data, error } = bookmarkEditState;
    if (!fetching && !error && data) {
      props.setEnabled(false);
    }
  }, [bookmarkEditState.data]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const { title, url } = bookmarkForm.formState;
        const categoryIds = categories
          .filter((e) => e.selected)
          .map((e) => e.categoryId);

        if (props.bookmark) {
          bookmarkEdit({
            input: {
              bookmarkId: props.bookmark.bookmarkId,
              categoryIds,
              title,
              url,
            },
          });
        } else {
          bookmarkCreate({
            input: {
              categoryIds,
              title,
              url,
            },
          });
        }
      }}
    >
      <input
        onChange={(e) => bookmarkForm.formSet.setUrl(e.target.value)}
        placeholder="url"
        value={bookmarkForm.formState.url}
      />

      <input
        onChange={(e) => bookmarkForm.formSet.setTitle(e.target.value)}
        placeholder="title"
        value={bookmarkForm.formState.title}
      />

      <Categories categories={categories} toggleCategory={toggleCategory} />

      <button type={"submit"} disabled={!bookmarkForm.formState.isValidForm}>
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
