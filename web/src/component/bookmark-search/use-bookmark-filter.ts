import Fuse from "fuse.js";
import { Bookmark } from "@dunedain/graphql/genql/schema";
import { useBookmarkSearchMutation } from "../../query/bookmark-search";
import { useCategoriesQuery } from "../../query/categories";
import { useEffect, useState } from "react";
import { useSelectableCategories } from "../../hook/selectable-categories";

export const useBookmarkFilter = () => {
  const useCategoriesResponse = useCategoriesQuery();
  const useSelectableCategories_ = useSelectableCategories({
    useCategoriesResponse,
  });

  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [categoryOpt, setCategoryOpt] = useState<"And" | "Or">("And");

  const [filter, setFilter] = useState<string>("");
  const [filterOpt, setFilterOpt] = useState<"title" | "URL" | "both">("title");

  const useBookmarkSearchMutation_ = useBookmarkSearchMutation();
  const [
    bookmarkSearchState,
    bookmarkSearchMutation,
  ] = useBookmarkSearchMutation_;

  const [bookmarks, setBookmarks] = useState<Bookmark[] | null>(null);

  const filterEffect = (bookmarks: Bookmark[]) => {
    if (filter) {
      const fuse = new Fuse(bookmarks, {
        includeScore: true,
        keys: (() => {
          switch (filterOpt) {
            case "title":
              return ["title"];
            case "URL":
              return ["url"];
            case "both":
              return ["title", "url"];
            default:
              return ["title"];
          }
        })(),
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
      filterEffect(bookmarks);
    }
  }, [filter, filterOpt]);

  useEffect(() => {
    const { fetching, data, error } = bookmarkSearchState;
    if (!fetching && !error && data) {
      const bookmarks = data.bookmarkSearch as Bookmark[];
      filterEffect(bookmarks);
    }
  }, [bookmarkSearchState.data]);

  useEffect(() => {
    setCategoryIds(
      useSelectableCategories_.selectableCategories
        ?.filter((e) => e.selected)
        .map((e) => e.categoryId) || []
    );
  }, [useSelectableCategories_.selectableCategories]);

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
    useSelectableCategories_.resetCategories();
    searchFn({ categoryIds: [] });
  };

  return {
    input: {
      categoryIds,
      categoryOpt,
      filter,
      setCategoryOpt,
      setFilter,
      setFilterOpt,
    },

    bookmarks: {
      bookmarks,
      searchDefault,
      search: searchFn,
      useBookmarkSearchMutation: useBookmarkSearchMutation_,
    },

    categories: {
      useCategoriesResponse,
      useSelectableCategories: {
        ...useSelectableCategories_,
        resetCategories,
      },
    },
  };
};
