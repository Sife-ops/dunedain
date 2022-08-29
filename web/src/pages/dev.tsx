import { List } from "../component/article";
import { BookmarkForm } from "../component/bookmark-form";

export const Dev = () => {
  return (
    <div>
      <h3>articles</h3>
      <List />

      <h3>bookmark form</h3>
      <BookmarkForm />
    </div>
  );
};
