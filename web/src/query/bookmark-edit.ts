import { useTypedMutation } from "../urql";

export const useBookmarkEditMutation = () => {
  return useTypedMutation(
    (vars: {
      input: {
        title: string;
        url: string;
        categoryIds: string[];
        bookmarkId: string;
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
          },
        ],
      };
    }
  );
};
