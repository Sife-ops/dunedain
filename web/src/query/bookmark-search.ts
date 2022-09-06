import { Bookmark, bookmarkSearchInput } from "@dunedain/graphql/genql";
import { UseMutationState } from "urql";
import { useTypedMutation } from "../urql";

type UseBookmarkSearchMutation = readonly [
  UseMutationState<
    {
      bookmarkSearch: Bookmark[];
    },
    {
      input: bookmarkSearchInput;
    }
  >,
  (vars: { input: bookmarkSearchInput }) => void
];

export const useBookmarkSearchMutation = () => {
  return useTypedMutation(
    (vars: {
      input: {
        categoryIds: string[];
        categoryOpt: "And" | "Or";
      };
    }) => {
      return {
        bookmarkSearch: [
          vars,
          {
            __scalar: true,
            __typename: true,
            userId: true,
            bookmarkId: true,
            url: true,
            title: true,

            categories: {
              __scalar: true,
              __typename: true,
              userId: true,
              categoryId: true,
              title: true,
            },
          },
        ],
      };
    }
  ) as UseBookmarkSearchMutation;
};
