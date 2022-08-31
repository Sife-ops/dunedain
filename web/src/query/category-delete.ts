import { useTypedMutation } from "../urql";

export const useCategoryDeleteMutation = () => {
  return useTypedMutation((vars: { categoryId: string }) => {
    return {
      categoryDelete: [
        vars,
        {
          __typename: true,
          userId: true,
          categoryId: true,
          title: true,
        },
      ],
    };
  });
};
