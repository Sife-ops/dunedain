import { Bookmark } from "../../../../graphql/genql/schema";
import { Category } from "../../../../graphql/genql/schema";
import { useCategoriesQuery } from "../../query/categories";
import { useEffect } from "react";
import { useState } from "react";

export type SelectableCategory = Category & {
  selected: boolean;
};

export const useCategories = (bookmark?: Bookmark) => {
  const [categoriesQueryState] = useCategoriesQuery();

  const [categories, setCategories] = useState<SelectableCategory[] | null>(
    null
  );

  useEffect(() => {
    const { fetching, data, error } = categoriesQueryState;
    if (!fetching && data && !error) {
      // @ts-ignore
      updateCategories(data.categories);
      if (bookmark) {
        bookmark.categories.map((e) => toggleCategory(e));
      }
    }
  }, [categoriesQueryState.data]);

  const updateCategories = (categories: SelectableCategory[]) => {
    setCategories((s) => {
      return categories.map((c) => {
        const found = s?.find((e) => e.categoryId === c.categoryId);
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
    const toggleMapFn = (c: SelectableCategory) => {
      if (c.categoryId === category.categoryId) {
        return {
          ...c,
          selected: !c.selected,
        };
      } else {
        return c;
      }
    };

    setCategories((s) => {
      return s?.map(toggleMapFn) || null;
    });

    return categories?.map(toggleMapFn);
  };

  const resetCategories = () => {
    setCategories((s) => {
      return (
        s?.map((e) => ({
          ...e,
          selected: false,
        })) || null
      );
    });
  };

  return {
    categories,
    resetCategories,
    toggleCategory,
    updateCategories,

    categoriesQueryState,
    setCategories,
  };
};
