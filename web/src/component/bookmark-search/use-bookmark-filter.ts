import { Bookmark } from "@dunedain/graphql/genql/schema";
import { Category } from "../../../../graphql/genql/schema";
import { useBookmarkSearchMutation } from "../../query/bookmark-search";
import { useCategories } from "../categories/use-categories";
import { useEffect, useState } from "react";

// todo: fuse.js

export const useBookmarkFilter = () => {
  const categories = useCategories();
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [categoryOpt, setCategoryOpt] = useState<"And" | "Or">("And");

  const [search, setSearch] = useState<string>("");

  const [
    bookmarkSearchState,
    bookmarkSearchMutation,
  ] = useBookmarkSearchMutation();
  const [bookmarks, setBookmarks] = useState<Bookmark[] | null>(null);

  const searchEffect = (bookmarks: Bookmark[]) => {
    if (search) {
      setBookmarks(
        bookmarks.filter((bookmark) => bookmark.title.includes(search))
      );
    } else {
      setBookmarks(bookmarks);
    }
  };

  useEffect(() => {
    const { data } = bookmarkSearchState;
    if (data?.bookmarkSearch) {
      const bookmarks = data.bookmarkSearch as Bookmark[];
      searchEffect(bookmarks);
    }
  }, [search]);

  useEffect(() => {
    const { fetching, data, error } = bookmarkSearchState;
    if (!fetching && !error && data) {
      const bookmarks = data.bookmarkSearch as Bookmark[];
      searchEffect(bookmarks);
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
      },
    });
  };

  const toggleCategory = (category: Category) => {
    const toggled = categories.toggleCategory(category);

    // todo: remove autosearch
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
    },

    categories: {
      ...categories,
      toggleCategory: toggleCategory,
      resetCategories: resetCategories,
    },
  };
};
