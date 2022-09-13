import { useTypedMutation } from "../urql";

export const useFolderCreateMutation = () => {
  return useTypedMutation(
    (vars: { title: string; color: string; parentFolderId: string }) => {
      return {
        folderCreate: [
          vars,
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
