import React from "react";
import { Authentication, useAuthentication } from "../hook/authentication";
import { UseCategoriesResponse, useCategoriesQuery } from "../query/categories";
import { useBookmarksFilter, BookmarksFilter } from "./bookmarks-filter";
import { UseFoldersResponse, useFoldersQuery } from "../query/folders";

type Context = {
  authentication: Authentication;
  bookmarksFilter: BookmarksFilter;
  categoriesResponse: UseCategoriesResponse;
  foldersResponse: UseFoldersResponse;
};

const useContext = (): Context => {
  const authentication = useAuthentication();
  const categoriesResponse = useCategoriesQuery();
  const bookmarksFilter = useBookmarksFilter(categoriesResponse);
  // todo: expandable folders
  const foldersResponse = useFoldersQuery();

  return {
    authentication,
    bookmarksFilter,
    categoriesResponse,
    foldersResponse,
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
