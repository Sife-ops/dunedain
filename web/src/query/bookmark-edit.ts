import { useTypedMutation } from "../urql";

export const useBookmarkEditMutation = () => {
  return useTypedMutation(
    (vars: {
      input: {
        bookmarkId: string;
        categoryIds: string[];
        parentFolderId: string;
        title: string;
        url: string;
      };
    }) => {
      return {
        bookmarkEdit: [
          vars,
          {
            __typename: true,
            userId: true,
            bookmarkId: true,
            url: true,
            title: true,
            favicon: true,
            parentFolderId: true,

            categories: {
              __typename: true,
              __scalar: true,
              categoryId: true,
              color: true,
              title: true,
              userId: true,
            },
          },
        ],
      };
    }
  );
};
