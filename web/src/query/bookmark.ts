import { useTypedQuery } from "../urql";

export const useBookmarkQuery = (bookmarkId: string) => {
  return useTypedQuery({
    query: {
      bookmark: [
        {
          bookmarkId,
        },
        {
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
      ],
    },
  });
};
