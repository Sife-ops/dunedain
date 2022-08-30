import { useTypedQuery } from "../urql";

export const useCategoriesQuery = () => {
  return useTypedQuery({
    query: {
      categories: {
        __typename: true,
        userId: true,
        categoryId: true,
        title: true,

        bookmarks: {
          __typename: true,
          userId: true,
          bookmarkId: true,
          url: true,
          title: true,
        },
      },
    },
  });
};
