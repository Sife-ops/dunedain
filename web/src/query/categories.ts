import { Category } from "@dunedain/graphql/genql";
import { AnyVariables, UseQueryResponse } from "urql";
import { useTypedQuery } from "../urql";

export type UseCategoriesResponse = UseQueryResponse<
  { categories: Category[] },
  AnyVariables
>;

export const useCategoriesQuery = () => {
  return useTypedQuery({
    query: {
      categories: {
        __scalar: true,
        __typename: true,
        userId: true,
        categoryId: true,
        title: true,

        bookmarks: {
          __scalar: true,
          __typename: true,
          userId: true,
          bookmarkId: true,
          url: true,
          title: true,
        },
      },
    },
  }) as UseCategoriesResponse;
};
