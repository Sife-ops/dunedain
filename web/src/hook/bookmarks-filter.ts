import Fuse from "fuse.js";
import { Bookmark } from "@dunedain/graphql/genql/schema";
import { UseCategoriesResponse } from "../query/categories";
import { useEffect, useState } from "react";

import {
  useBookmarkSearchMutation,
  UseBookmarkSearchMutation,
} from "../query/bookmark-search";

import {
  useSelectableCategories,
  UseSelectableCategories,
} from "./selectable-categories";

export interface BookmarksFilter {
  input: {
    categoryIds: string[];
    categoryOpt: "And" | "Or";
    filter: string;
    filterOpt: "title" | "URL" | "both";
    setCategoryIds: React.Dispatch<React.SetStateAction<string[]>>;
    setCategoryOpt: React.Dispatch<React.SetStateAction<"And" | "Or">>;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    setFilterOpt: React.Dispatch<
      React.SetStateAction<"title" | "URL" | "both">
    >;
  };
  showCategories: {
    state: boolean;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  };
  action: {
    searchDefault: () => void;
    search: (
      args?:
        | {
            categoryIds?: string[] | undefined;
            categoryOpt?: "And" | "Or" | undefined;
          }
        | undefined
    ) => void;
  };
  bookmarkSearchMutation: UseBookmarkSearchMutation;
  selectableCategories: UseSelectableCategories;
  bookmarks: Bookmark[] | undefined;
}

export const useBookmarksFilter = (
  categoriesResponse: UseCategoriesResponse
): BookmarksFilter => {
  const selectableCategories = useSelectableCategories({
    categoriesResponse,
  });

  const [filter, setFilter] = useState<string>("");
  const [filterOpt, setFilterOpt] = useState<"title" | "URL" | "both">("title");
  const [showCategories, setShowCategories] = useState<boolean>(false);

  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [categoryOpt, setCategoryOpt] = useState<"And" | "Or">("And");

  const bookmarkSearchMutation = useBookmarkSearchMutation();
  const [
    bookmarkSearchResponseState,
    bookmarkSearchRequest,
  ] = bookmarkSearchMutation;

  const [bookmarks, setBookmarks] = useState<Bookmark[]>();

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
    searchDefault();
  }, []);

  useEffect(() => {
    const { data } = bookmarkSearchResponseState;
    if (data?.bookmarkSearch) {
      const bookmarks = data.bookmarkSearch as Bookmark[];
      filterEffect(bookmarks);
    }
  }, [filter, filterOpt]);

  useEffect(() => {
    const { fetching, data, error } = bookmarkSearchResponseState;
    if (!fetching && !error && data) {
      const bookmarks = data.bookmarkSearch as Bookmark[];
      filterEffect(bookmarks);
    }
  }, [bookmarkSearchResponseState.data]);

  useEffect(() => {
    setCategoryIds(
      selectableCategories.categories
        ?.filter((e) => e.selected)
        .map((e) => e.categoryId) || []
    );
  }, [selectableCategories.categories]);

  const searchDefault = () => {
    bookmarkSearchRequest({
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

    bookmarkSearchRequest({
      input: {
        categoryIds: options.categoryIds,
        categoryOpt: options.categoryOpt,
      },
    });
  };

  const resetCategories = () => {
    selectableCategories.resetCategories();
    searchFn({ categoryIds: [] });
  };

  return {
    input: {
      categoryIds,
      categoryOpt,
      filter,
      filterOpt,
      setCategoryIds,
      setCategoryOpt,
      setFilter,
      setFilterOpt,
    },

    action: {
      searchDefault,
      search: searchFn,
    },

    bookmarkSearchMutation,

    showCategories: {
      set: setShowCategories,
      state: showCategories,
    },

    selectableCategories: {
      ...selectableCategories,
      resetCategories,
    },

    bookmarks,
  };
};
