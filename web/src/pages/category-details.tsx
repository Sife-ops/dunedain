import React from "react";
import { Category as CategoryType } from "../../../graphql/genql/schema";
import { CategoryForm } from "../component/category-form";
import { Heading } from "@chakra-ui/react";
import { Loading } from "../component/loading";
import { useCategoryQuery } from "../query/category";
import { useParams } from "react-router-dom";

export const CategoryDetails: React.FC = () => {
  const { categoryId } = useParams();

  const [{ data }] = useCategoryQuery(categoryId!);
  const category = data?.category as CategoryType;

  return (
    <div>
      <Heading textAlign={"center"}>Edit Category</Heading>
      <Loading data={category}>
        <CategoryForm category={category} />
      </Loading>
    </div>
  );
};
