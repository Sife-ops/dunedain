import { Bookmark, Category } from "@dunedain/graphql/genql/schema";
import { UseCategoriesResponse } from "../query/categories";
import { useEffect, useState } from "react";

export type SelectableCategory = Category & {
  selected: boolean;
};

export interface UseSelectableCategories {
  categories: SelectableCategory[] | undefined;
  resetCategories: () => void;
  toggleCategory: (category: Category) => SelectableCategory[] | undefined;
  updateCategories: (categories: SelectableCategory[]) => void;
}

export const useSelectableCategories = ({
  bookmark,
  categoriesResponse: [categoriesResponseState],
}: {
  bookmark?: Bookmark;
  categoriesResponse: UseCategoriesResponse;
}): UseSelectableCategories => {
  const [categories, setCategories] = useState<SelectableCategory[]>();

  useEffect(() => {
    const { fetching, data, error } = categoriesResponseState;
    if (!fetching && data && !error) {
      // @ts-ignore
      updateCategories(data.categories);
      if (bookmark) {
        bookmark.categories.map((e) => toggleCategory(e));
      }
    }
  }, [categoriesResponseState.data]);

  const updateCategories = (categories: SelectableCategory[]) => {
    setCategories((s) => {
      return categories.map((c) => {
        const found = s?.find((e) => e.categoryId === c.categoryId);
        if (found) {
          return {
            ...c,
            selected: found.selected,
          };
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
      return s?.map(toggleMapFn);
    });

    return categories?.map(toggleMapFn);
  };

  const resetCategories = () => {
    setCategories((s) => {
      return s?.map((e) => ({
        ...e,
        selected: false,
      }));
    });
  };

  return {
    categories,
    resetCategories,
    toggleCategory,
    updateCategories,
  };
};
