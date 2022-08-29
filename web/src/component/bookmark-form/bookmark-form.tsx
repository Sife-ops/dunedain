import { useBookmarkForm } from "./use-bookmark-form";

export const BookmarkForm = () => {
  const bookmarkForm = useBookmarkForm();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
        <button type={"submit"}>Submit</button>
      </form>
    </div>
  );
};
