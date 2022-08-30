import { Category } from "../../../../graphql/genql/schema";
import { useState } from "react";

export type SelectableCategory = Category & {
  selected: boolean;
};

export const useCategories = () => {
  const [categories, setCategories] = useState<SelectableCategory[]>([]);

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

  const toggleCategory = (category: SelectableCategory) => {
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
    setCategories,
    toggleCategory,
    updateCategories,
  };
};
