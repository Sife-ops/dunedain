import { Bookmark } from "@dunedain/graphql/genql/schema";
import { Category } from "../../../../graphql/genql/schema";
import { useBookmarkSearchMutation } from "../../query/bookmark-search";
import { useCategories } from "../categories/use-categories";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";

// todo: autosearch debounce
export const useBookmarkFilter = () => {
  const categories = useCategories();
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [categoryOpt, setCategoryOpt] = useState<"And" | "Or">("And");

  const [search, setSearch] = useState<string | null>(null);
  // const [searchD] = useDebounce(search, 500);

  const [
    bookmarkSearchState,
    bookmarkSearchMutation,
  ] = useBookmarkSearchMutation();
  const [bookmarks, setBookmarks] = useState<Bookmark[] | null>(null);

  // useEffect(() => {
  //   if (search !== null) {
  //     searchFn();
  //   }
  // }, [searchD]);

  useEffect(() => {
    const { fetching, data, error } = bookmarkSearchState;
    if (!fetching && !error && data) {
      const bookmarks = data.bookmarkSearch as Bookmark[];
      setBookmarks(bookmarks);
    }
  }, [bookmarkSearchState.data]);

  useEffect(() => {
    setCategoryIds(
      categories.categories
        ?.filter((e) => e.selected)
        .map((e) => e.categoryId) || []
    );
  }, [categories.categories]);

  const searchDefault = () => {
    bookmarkSearchMutation({
      input: {
        categoryIds: [],
        categoryOpt,
        search: "",
      },
    });
  };

  const searchFn = (args?: {
    categoryIds?: string[];
    categoryOpt?: "And" | "Or";
  }) => {
    const options = {
      categoryIds,
      categoryOpt,
      ...args,
    };

    bookmarkSearchMutation({
      input: {
        categoryIds: options.categoryIds,
        categoryOpt: options.categoryOpt,
        // search: search || "",
        search: "",
      },
    });
  };

  const toggleCategory = (category: Category) => {
    const toggled = categories.toggleCategory(category);

    searchFn({
      categoryIds: toggled?.filter((e) => e.selected).map((e) => e.categoryId),
    });
  };

  const resetCategories = () => {
    categories.resetCategories();
    searchFn({ categoryIds: [] });
  };

  return {
    input: {
      categoryIds,
      search,
      setSearch,
      categoryOpt,
      setCategoryOpt,
    },

    bookmarks: {
      bookmarks,
      searchDefault,
      search: searchFn,

      //   bookmarkSearchMutation,
      //   bookmarkSearchState,
      //   setBookmarks,
    },

    categories: {
      ...categories,
      toggleCategory: toggleCategory,
      resetCategories: resetCategories,
    },
  };
};
