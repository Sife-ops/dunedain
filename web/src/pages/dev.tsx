import { useEffect } from "react";
import { useTypedMutation, useTypedQuery } from "../urql";
import { BookmarkForm } from "../component/bookmark-form";

export const Dev = () => {
  const [bookmarks] = useTypedQuery({
    query: {
      bookmarks: {
        userId: true,
        bookmarkId: true,
        url: true,
        title: true,

        categories: {
          userId: true,
          categoryId: true,
          title: true,
        },
      },
    },
  });

  const [categories] = useTypedQuery({
    query: {
      categories: {
        userId: true,
        categoryId: true,
        title: true,

        bookmarks: {
          userId: true,
          bookmarkId: true,
          url: true,
          title: true,
        },
      },
    },
  });

  useEffect(() => {
    if (!bookmarks.fetching && bookmarks.data) {
      console.log(bookmarks.data);
    }
  }, [bookmarks.fetching]);

  useEffect(() => {
    if (!categories.fetching && categories.data) {
      console.log(categories.data);
    }
  }, [categories.fetching]);

  return (
    <div>
      <h3>bookmark form</h3>
      {/* <BookmarkForm /> */}

      <h3>bookmark query</h3>
    </div>
  );
};
