import { useTypedQuery } from "../urql";

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
  });
};
