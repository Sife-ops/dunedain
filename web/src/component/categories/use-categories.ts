import { Category } from "../../../../graphql/genql/schema";
import { useCategoriesQuery } from "../../query/categories";
import { useEffect } from "react";
import { useState } from "react";

export type SelectableCategory = Category & {
  selected: boolean;
};

export const useCategories = () => {
  const [categoriesQueryState] = useCategoriesQuery();

  const [categories, setCategories] = useState<SelectableCategory[]>([]);

  useEffect(() => {
    const { fetching, data } = categoriesQueryState;
    if (!fetching && data) {
      // @ts-ignore
      updateCategories(data.categories);
    }
  }, [categoriesQueryState.data]);

  const updateCategories = (categories: SelectableCategory[]) => {
    setCategories((s) => {
      return categories.map((c) => {
        const found = s.find((e) => e.categoryId === c.categoryId);
        if (found) {
          return found;
        } else {
          return {
            ...c,
            selected: c.selected === undefined ? false : c.selected,
          };
        }
      });
    });
  };

  const toggleCategory = (category: Category) => {
    setCategories((s) => {
      return s.map((c) => {
        if (c.categoryId === category.categoryId) {
          return {
            ...c,
            selected: !c.selected,
          };
        } else {
          return c;
        }
      });
    });
  };

  return {
    categories,
    categoriesQueryState,
    setCategories,
    toggleCategory,
    updateCategories,
  };
};
