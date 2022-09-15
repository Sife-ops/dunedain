import { useTypedMutation } from "../urql";

export const useFolderDeleteMutation = () => {
  return useTypedMutation((vars: { folderId: string }) => {
    return {
      folderDelete: [
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
  });
};
