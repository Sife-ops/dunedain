import { useEffect } from "react";
import { useTypedMutation, useTypedQuery } from "../urql";
import { List } from "../component/article";
import { BookmarkForm } from "../component/bookmark-form";

export const Dev = () => {
  const [bookmark] = useTypedQuery({
    query: {
      bookmark: {
        userId: true,
        bookmarkId: true,
        title: true,
        url: true,

        categories: {
          userId: true,
          categoryId: true,
          title: true,
        },
      },
    },
  });

  useEffect(() => {
    if (!bookmark.fetching && bookmark.data) {
      console.log(bookmark.data);
    }
  }, [bookmark.fetching]);

  return (
    <div>
      <h3>articles</h3>
      <List />

      <h3>bookmark form</h3>
      <BookmarkForm />

      <h3>bookmark query</h3>
    </div>
  );
};
