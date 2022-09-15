import { useTypedMutation } from "../urql";

export const useFolderEditMutation = () => {
  return useTypedMutation(
    (args: {
      folderId: string;
      title: string;
      color: string;
      parentFolderId: string;
    }) => {
      return {
        folderEdit: [
          args,
          {
            __typename: true,
            userId: true,
            parentFolderId: true,
            title: true,
            color: true,
          },
        ],
      };
    }
  );
};
