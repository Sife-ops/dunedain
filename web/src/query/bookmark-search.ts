import { Bookmark, bookmarkSearchInput } from "@dunedain/graphql/genql";
import { UseMutationResponse } from "urql";
import { useTypedMutation } from "../urql";

export type UseBookmarkSearchMutation = UseMutationResponse<
  {
    bookmarkSearch: Bookmark[];
  },
  {
    input: bookmarkSearchInput;
  }
>;

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
              color: true,
            },
          },
        ],
      };
    }
  ) as UseBookmarkSearchMutation;
};
