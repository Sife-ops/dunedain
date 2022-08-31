import { useTypedMutation } from "../urql";

export const useBookmarkDeleteMutation = () => {
  return useTypedMutation((vars: { bookmarkId: string }) => {
    return {
      bookmarkDelete: [
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
  });
};
