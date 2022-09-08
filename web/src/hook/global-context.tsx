import React from "react";
import { useBookmarksQuery, UseBookmarksResponse } from "../query/bookmarks";
import { useCategoriesQuery, UseCategoriesResponse } from "../query/categories";

import {
  useSelectableCategories,
  UseSelectableCategories,
} from "../hook/selectable-categories";

type Context = {
  bookmarksResponse: UseBookmarksResponse;
  categoriesResponse: UseCategoriesResponse;
  categories: UseSelectableCategories;
};

const useContext = (): Context => {
  const bookmarksResponse = useBookmarksQuery();
  const categoriesResponse = useCategoriesQuery();

  const categories = useSelectableCategories({
    categoriesResponse,
  });

  return {
    bookmarksResponse,
    categoriesResponse,
    categories,
  };
};

const GlobalContext = React.createContext<Context | undefined>(undefined);

export const GlobalContextProvider = (props: { children: React.ReactNode }) => {
  const context = useContext();

  return (
    <GlobalContext.Provider value={context}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a GlobalContextProvider");
  }
  return context;
};
