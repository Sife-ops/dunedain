import { useTypedQuery } from "../urql";

export const useCategoryQuery = (categoryId: string) => {
  return useTypedQuery({
    query: {
      category: [
        {
          categoryId,
        },
        {
          __typename: true,
          userId: true,
          categoryId: true,
          title: true,
          color: true,

          bookmarks: {
            __typename: true,
            userId: true,
            bookmarkId: true,
            url: true,
            title: true,
          },
        },
      ],
    },
  });
};
