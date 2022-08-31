import { useTypedMutation } from "../urql";

export const useCategoryCreateMutation = () => {
  return useTypedMutation((vars: { title: string }) => {
    return {
      categoryCreate: [
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
