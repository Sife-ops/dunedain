import React from "react";
import { Button, Input, Text } from "@chakra-ui/react";
import { Category as CategoryType } from "@dunedain/graphql/genql/schema";
import { useCategoryForm } from "./use-category-form";
import { useNavigate } from "react-router-dom";

export const CategoryForm: React.FC<{
  category?: CategoryType;
}> = (props) => {
  const navigate = useNavigate();

  const categoryForm = useCategoryForm(props.category);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (props.category) {
          categoryForm.mutation.categoryEdit({
            categoryId: props.category.categoryId,
            title: categoryForm.state.title,
          });
        } else {
          categoryForm.mutation.categoryCreate({
            title: categoryForm.state.title,
          });
        }
      }}
    >
      <div className="mb-1">
        <Text>Title:</Text>
        <Input
          onChange={(e) => categoryForm.set.setTitle(e.target.value)}
          placeholder="title"
          value={categoryForm.state.title}
        />
      </div>

      <div className="flex justify-between">
        <div className="flex gap-1">
          <Button
            colorScheme={"teal"}
            type={"submit"}
            disabled={categoryForm.state.title.length < 1}
          >
            {/* todo: doesn't trigger refetch */}
            {props.category ? "Save" : "Submit"}
          </Button>

          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </Button>
        </div>

        {/* todo: confirm delete */}
        {props.category && (
          <Button
            colorScheme={"red"}
            onClick={(e) => {
              e.preventDefault();
              categoryForm.mutation.categoryDelete({
                categoryId: props.category?.categoryId!,
              });
            }}
          >
            Delete
          </Button>
        )}
      </div>
    </form>
  );
};
