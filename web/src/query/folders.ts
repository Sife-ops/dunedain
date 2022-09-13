import { AnyVariables, UseQueryResponse } from "urql";
import { Folder } from "@dunedain/graphql/genql";
import { useTypedQuery } from "../urql";

export type UseFoldersResponse = UseQueryResponse<
  { folders: Folder[] },
  AnyVariables
>;

const fragment = {
  __typename: true,
  userId: true,
  folderId: true,
  parentFolderId: true,
  title: true,
  color: true,

  bookmarks: {
    __typename: true,
    userId: true,
    bookmarkId: true,
    title: true,
    url: true,
    favicon: true,
  },
};

export const useFoldersQuery = () => {
  return useTypedQuery({
    query: {
      folders: {
        ...fragment,
        folders: {
          ...fragment,
          folders: {
            ...fragment,
            folders: {
              ...fragment,
              folders: {
                ...fragment,
              },
            },
          },
        },
      },
    },
  }) as UseFoldersResponse;
};
