import { useTypedMutation } from "../urql";

export const useBookmarkCreateMutation = () => {
  return useTypedMutation(
    (vars: {
      input: {
        title: string;
        url: string;
        categoryIds: string[];
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
          },
        ],
      };
    }
  );
};
