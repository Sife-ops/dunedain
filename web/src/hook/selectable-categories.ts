import { Bookmark, Category } from "@dunedain/graphql/genql/schema";
import { useEffect, useState } from "react";
import { UseCategoriesResponse } from "../query/categories";

export type SelectableCategory = Category & {
  selected: boolean;
};

export interface UseSelectableCategories {
  categories: SelectableCategory[] | null;
  resetCategories: () => void;
  toggleCategory: (category: Category) => SelectableCategory[] | undefined;
  updateCategories: (categories: SelectableCategory[]) => void;
}

export const useSelectableCategories = (args: {
  bookmark?: Bookmark;
  categoriesResponse: UseCategoriesResponse;
}): UseSelectableCategories => {
  const [categoriesQueryState] = args.categoriesResponse;

  const [categories, setCategories] = useState<SelectableCategory[]>([]);

  useEffect(() => {
    const { fetching, data, error } = categoriesQueryState;
    if (!fetching && data && !error) {
      // @ts-ignore
      updateCategories(data.categories);
      if (args.bookmark) {
        args.bookmark.categories.map((e) => toggleCategory(e));
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

    // categoriesQueryState,
    // setCategories,
  };
};
