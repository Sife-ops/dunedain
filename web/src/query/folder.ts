import { useTypedQuery } from "../urql";

export const useFolderQuery = (folderId: string) => {
  return useTypedQuery({
    query: {
      folder: [
        {
          folderId,
        },
        {
          __typename: true,
          userId: true,
          color: true,
          folderId: true,
          title: true,
          parentFolderId: true,
        },
      ],
    },
  });
};
