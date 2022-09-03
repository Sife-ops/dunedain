import { Bookmark } from "../../../../graphql/genql/schema";
import { useBookmarkSearchMutation } from "../../query/bookmark-search";
import { useCategories } from "../categories/use-categories";
import { useEffect, useState } from "react";

// todo: autosearch debounce
export const useBookmarkFilter = () => {
  const [
    bookmarkSearchState,
    bookmarkSearchMutation,
  ] = useBookmarkSearchMutation();
  const [bookmarks, setBookmarks] = useState<Bookmark[] | null>(null);

  const categories = useCategories();

  const [search, setSearch] = useState("");
  const [categoryIds, setCategoryIds] = useState<string[]>([]);

  useEffect(() => {
    const { fetching, data, error } = bookmarkSearchState;
    if (!fetching && !error && data) {
      const bookmarks = data.bookmarkSearch as Bookmark[];
      setBookmarks(bookmarks);
    }
  }, [bookmarkSearchState.data]);

  useEffect(() => {
    setCategoryIds(categories.categories?.map((e) => e.categoryId) || []);
  }, [categories.categories]);

  const searchDefault = () => {
    bookmarkSearchMutation({
      input: {
        categoryIds: [],
        search: "",
      },
    });
  };

  const searchFn = () => {
    bookmarkSearchMutation({
      input: {
        categoryIds,
        search,
      },
    });
  };

  return {
    input: {
      categoryIds,
      search,
      setSearch,
    },

    bookmarks: {
      bookmarks,
      searchDefault,
      search: searchFn,

      //   bookmarkSearchMutation,
      //   bookmarkSearchState,
      //   setBookmarks,
    },

    categories,
  };
};
