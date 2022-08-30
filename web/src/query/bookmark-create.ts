import { useTypedMutation } from "../urql";

export const useBookmarkCreateMutation = () => {
  return useTypedMutation((vars: { title: string; url: string }) => {
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
  });
};
