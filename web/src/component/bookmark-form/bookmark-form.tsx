import React from "react";
import { Bookmark } from "../../../../graphql/genql/schema";
import { Categories } from "../categories";
import { useBookmarkForm } from "./use-bookmark-form";
import { useNavigate } from "react-router-dom";

export const BookmarkForm: React.FC<{
  bookmark?: Bookmark;
}> = (props) => {
  const navigate = useNavigate();

  const bookmarkForm = useBookmarkForm(props.bookmark);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const { title, url } = bookmarkForm.state;
        const categoryIds =
          bookmarkForm.state.categories
            ?.filter((e) => e.selected)
            .map((e) => e.categoryId) || [];

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
      {bookmarkForm.state.categoriesQueryState.fetching ? (
        <div>loading...</div>
      ) : (
        <Categories
          categories={bookmarkForm.state.categories}
          toggleCategory={bookmarkForm.set.toggleCategory}
        />
      )}

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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <button type={"submit"} disabled={!bookmarkForm.state.isValidForm}>
            {props.bookmark ? "Save" : "Submit"}
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Cancel
          </button>
        </div>

        <div>
          {/* todo: confirm delete */}
          {props.bookmark && (
            <button
              onClick={(e) => {
                e.preventDefault();
                bookmarkForm.mutation.bookmarkDelete({
                  bookmarkId: props.bookmark!.bookmarkId,
                });
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
