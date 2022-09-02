import React from "react";
import { Category as CategoryType } from "../../../graphql/genql/schema";
import { useCategoryQuery } from "../query/category";
import { CategoryForm } from "../component/category-form";
import { useParams } from "react-router-dom";

export const CategoryDetails: React.FC = () => {
  const { categoryId } = useParams();

  const [categoryState] = useCategoryQuery(categoryId!);

  const { fetching, data, error } = categoryState;

  if (fetching) {
    return (
      <div>
        <div>loading...</div>
      </div>
    );
  }

  if (!data || error) {
    return (
      <div>
        <div>error</div>
      </div>
    );
  }

  const category = data.category as CategoryType;

  return (
    <div>
      <h3>Edit Category</h3>
      <CategoryForm category={category} />
    </div>
  );
};
