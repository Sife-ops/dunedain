import { useTypedMutation } from "../urql";

export const useBookmarkCreateMutation = () => {
  return useTypedMutation(
    (vars: {
      input: {
        categoryIds: string[];
        parentFolderId: string;
        title: string;
        url: string;
      };
    }) => {
      return {
        bookmarkCreate: [
          vars,
          {
            __typename: true,
            userId: true,
            bookmarkId: true,
            url: true,
            title: true,
            favicon: true,
            parentFolderId: true,
          },
        ],
      };
    }
  );
};
