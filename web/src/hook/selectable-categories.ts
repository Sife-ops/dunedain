import { AnyVariables, UseQueryResponse } from "urql";
import { Bookmark, Category } from "@dunedain/graphql/genql/schema";
import { useEffect, useState } from "react";

export type SelectableCategory = Category & {
  selected: boolean;
};

export const useSelectableCategories = (args: {
  bookmark?: Bookmark;
  useCategoriesResponse: UseQueryResponse<
    { categories: Category[] },
    AnyVariables
  >;
}) => {
  const [categoriesQueryState] = args.useCategoriesResponse;

  // todo: remove 'null'
  const [selectableCategories, setSelectableCategories] = useState<
    SelectableCategory[] | null
  >(null);

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

  const updateCategories = (selectableCategories: SelectableCategory[]) => {
    setSelectableCategories((s) => {
      return selectableCategories.map((c) => {
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

    setSelectableCategories((s) => {
      return s?.map(toggleMapFn) || null;
    });

    return selectableCategories?.map(toggleMapFn);
  };

  const resetCategories = () => {
    setSelectableCategories((s) => {
      return (
        s?.map((e) => ({
          ...e,
          selected: false,
        })) || null
      );
    });
  };

  return {
    selectableCategories,
    resetCategories,
    toggleCategory,
    updateCategories,

    // categoriesQueryState,
    // setSelectableCategories,
  };
};
