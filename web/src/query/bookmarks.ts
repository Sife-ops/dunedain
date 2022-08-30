import { useTypedQuery } from "../urql";

export const useBookmarksQuery = () => {
  return useTypedQuery({
    query: {
      bookmarks: {
        __typename: true,
        userId: true,
        bookmarkId: true,
        url: true,
        title: true,

        categories: {
          __typename: true,
          userId: true,
          categoryId: true,
          title: true,
        },
      },
    },
  });
};
