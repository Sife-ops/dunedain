import Fuse from "fuse.js";
import { Bookmark } from "@dunedain/graphql/genql/schema";
import { useBookmarkSearchMutation } from "../../query/bookmark-search";
import { useCategories } from "../categories/use-categories";
import { useEffect, useState } from "react";

export const useBookmarkFilter = () => {
  const categories = useCategories();
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [categoryOpt, setCategoryOpt] = useState<"And" | "Or">("And");

  const [filter, setSearch] = useState<string>("");

  const [
    bookmarkSearchState,
    bookmarkSearchMutation,
  ] = useBookmarkSearchMutation();
  const [bookmarks, setBookmarks] = useState<Bookmark[] | null>(null);

  const searchEffect = (bookmarks: Bookmark[]) => {
    if (filter) {
      const fuse = new Fuse(bookmarks, {
        includeScore: true,
        keys: ["title"],
      });
      const result = fuse.search(filter);

      setBookmarks(result.map((e) => e.item));
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
  }, [filter]);

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

  const resetCategories = () => {
    categories.resetCategories();
    searchFn({ categoryIds: [] });
  };

  return {
    input: {
      categoryIds,
      categoryOpt,
      filter,
      setCategoryOpt,
      setSearch,
    },

    bookmarks: {
      bookmarks,
      searchDefault,
      search: searchFn,
    },

    categories: {
      ...categories,
      resetCategories: resetCategories,
    },
  };
};
