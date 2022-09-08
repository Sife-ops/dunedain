import { AnyVariables, UseQueryResponse } from "urql";
import { Bookmark } from "@dunedain/graphql/genql";
import { useTypedQuery } from "../urql";

export type UseBookmarksResponse = UseQueryResponse<
  { bookmarks: Bookmark[] },
  AnyVariables
>;

export const useBookmarksQuery = () => {
  return useTypedQuery({
    query: {
      bookmarks: {
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
          color: true,
        },
      },
    },
  }) as UseBookmarksResponse;
};
