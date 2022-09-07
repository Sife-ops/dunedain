import { useTypedMutation } from "../urql";

export const useCategoryEditMutation = () => {
  return useTypedMutation(
    (vars: { title: string; categoryId: string; color: string }) => {
      return {
        categoryEdit: [
          vars,
          {
            __typename: true,
            userId: true,
            categoryId: true,
            title: true,
            color: true,
          },
        ],
      };
    }
  );
};
