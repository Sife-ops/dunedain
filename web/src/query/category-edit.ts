import { useTypedMutation } from "../urql";

export const useCategoryEditMutation = () => {
  return useTypedMutation(
    (args: { title: string; categoryId: string; color: string }) => {
      return {
        categoryEdit: [
          args,
          {
            __typename: true,
            userId: true,
            categoryId: true,
            title: true,
            color: true,

            bookmarks: {
              __typename: true,
              bookmarkId: true,
              title: true,
              url: true,
              userId: true,
            },
          },
        ],
      };
    }
  );
};
