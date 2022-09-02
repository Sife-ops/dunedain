import { Categories } from "./categories";
import { useCategories } from "./use-categories";

export const CategoriesContainer = () => {
  const { categories, toggleCategory, categoriesQueryState } = useCategories();

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

  return <Categories categories={categories} toggleCategory={toggleCategory} />;
};
