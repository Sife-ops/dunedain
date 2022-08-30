import { useBookmarkForm } from "./use-bookmark-form";
import { useBookmarkCreateMutation } from "../../query/bookmark-create";

export const BookmarkForm = () => {
  const bookmarkForm = useBookmarkForm();

  const [_, bookmarkCreate] = useBookmarkCreateMutation();

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
