import { useTypedMutation } from "../urql";

export const useBookmarkSearchMutation = () => {
  return useTypedMutation(
    (vars: {
      input: {
        search: string;
        categoryIds: string[];
      };
    }) => {
      return {
        bookmarkSearch: [
          vars,
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
            }
          },
        ],
      };
    }
  );
};
