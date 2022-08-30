import { useBookmarkForm } from "./use-bookmark-form";
import { useBookmarkCreateMutation } from "../../query/bookmark-create";
import { useCategoriesQuery } from "../../query/categories";

export const BookmarkForm = () => {
  const bookmarkForm = useBookmarkForm();

  const [_, bookmarkCreate] = useBookmarkCreateMutation();
  const [categoriesQueryState] = useCategoriesQuery();

  if (categoriesQueryState.fetching) {
    <div>
      <div>loading...</div>
    </div>;
  }

  if (categoriesQueryState.error || !categoriesQueryState.data) {
    return (
      <div>
        <div>Error...</div>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const { title, url } = bookmarkForm.formState;
          bookmarkCreate({ title, url });
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
        <button type={"submit"} disabled={!bookmarkForm.formState.isValidForm}>
          Submit
        </button>
      </form>
    </div>
  );
};
