import React from "react";
import { CategoryForm } from "../component/category-form";
import { Heading } from "@chakra-ui/react";

export const CategoryNew: React.FC = () => {
  return (
    <div>
      <Heading>New Category</Heading>
      <CategoryForm />
    </div>
  );
};
