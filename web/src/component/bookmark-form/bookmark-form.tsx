import React, { useEffect } from "react";
import { Bookmark } from "../../../../graphql/genql/schema";
import { SelectableCategory, useCategories, Categories } from "../categories";
import { useBookmarkCreateMutation } from "../../query/bookmark-create";
import { useBookmarkEditMutation } from "../../query/bookmark-edit";
import { useBookmarkForm } from "./use-bookmark-form";
import { useNavigate } from "react-router-dom";

export const BookmarkForm: React.FC<{
  bookmark?: Bookmark;
}> = (props) => {
  const navigate = useNavigate();

  const bookmarkForm = useBookmarkForm();

  const { categories, toggleCategory, setCategories } = useCategories();

  const [bookmarkCreateState, bookmarkCreate] = useBookmarkCreateMutation();
  const [bookmarkEditState, bookmarkEdit] = useBookmarkEditMutation();

  // todo: merge if bookmark prop passed
  useEffect(() => {
    // setCategories(
    //   props.categories.map((c) => ({
    //     ...c,
    //     selected: false,
    //   }))
    // );

    if (props.bookmark) {
      bookmarkForm.formSet.setUrl(props.bookmark.url);
      bookmarkForm.formSet.setTitle(props.bookmark.title);
      props.bookmark.categories.map((e) => toggleCategory(e));
    }
  }, []);

  useEffect(() => {
    const { fetching, data, error } = bookmarkCreateState;
    if (!fetching && !error && data) {
      navigate("/");
    }
  }, [bookmarkCreateState.data]);

  useEffect(() => {
    const { fetching, data, error } = bookmarkEditState;
    if (!fetching && !error && data) {
      // props.setEnabled(false);
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
          navigate("/");
        }}
      >
        Cancel
      </button>
    </form>
  );
};
