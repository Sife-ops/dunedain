import React, { useEffect } from "react";
import { Bookmark } from "../../../../graphql/genql/schema";
import { Categories } from "../categories";
import { useBookmarkForm } from "./use-bookmark-form";
import { useNavigate } from "react-router-dom";

export const BookmarkForm: React.FC<{
  bookmark?: Bookmark;
}> = (props) => {
  const navigate = useNavigate();

  const bookmarkForm = useBookmarkForm();

  useEffect(() => {
    if (props.bookmark) {
      bookmarkForm.set.setUrl(props.bookmark.url);
      bookmarkForm.set.setTitle(props.bookmark.title);
    }
  }, []);

  useEffect(() => {
    const { fetching, data, error } = bookmarkForm.state.categoriesQueryState;
    if (props.bookmark && !fetching && data && !error) {
      props.bookmark.categories.map((e) => bookmarkForm.set.toggleCategory(e));
    }
  }, [bookmarkForm.state.categoriesQueryState.data]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const { title, url } = bookmarkForm.state;
        const categoryIds = bookmarkForm.state.categories
          .filter((e) => e.selected)
          .map((e) => e.categoryId);

        if (props.bookmark) {
          bookmarkForm.mutation.bookmarkEdit({
            input: {
              bookmarkId: props.bookmark.bookmarkId,
              categoryIds,
              title,
              url,
            },
          });
        } else {
          bookmarkForm.mutation.bookmarkCreate({
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
        onChange={(e) => bookmarkForm.set.setUrl(e.target.value)}
        placeholder="url"
        value={bookmarkForm.state.url}
      />

      <input
        onChange={(e) => bookmarkForm.set.setTitle(e.target.value)}
        placeholder="title"
        value={bookmarkForm.state.title}
      />

      {bookmarkForm.state.categoriesQueryState.fetching ? (
        <div>loading...</div>
      ) : (
        <Categories
          categories={bookmarkForm.state.categories}
          toggleCategory={bookmarkForm.set.toggleCategory}
        />
      )}

      <button type={"submit"} disabled={!bookmarkForm.state.isValidForm}>
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
