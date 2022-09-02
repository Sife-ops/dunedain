import React from "react";
import { Category as CategoryType } from "../../../graphql/genql/schema";
import { useCategoriesQuery } from "../query/categories";
import { useNavigate } from "react-router-dom";

export const Categories: React.FC = () => {
  const [categoriesQueryState] = useCategoriesQuery();

  const { fetching, data, error } = categoriesQueryState;

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

  const categories = data.categories as CategoryType[];

  return (
    <div>
      <CategoryList categories={categories} />
    </div>
  );
};

const CategoryList: React.FC<{
  categories: CategoryType[];
}> = (props) => {
  return (
    <div>
      {props.categories.map((e) => (
        <Category key={e.categoryId} category={e} />
      ))}
    </div>
  );
};

const Category: React.FC<{
  category: CategoryType;
}> = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <div>{props.category.title}</div>
      <button
        onClick={(e) => {
          e.preventDefault();
          navigate(`/category/${props.category.categoryId}`);
        }}
      >
        Edit
      </button>
    </div>
  );
};
