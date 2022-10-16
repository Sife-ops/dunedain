import React from "react";
import { UseCategoriesResponse, useCategoriesQuery } from "../query/categories";
import { UseFoldersResponse, useFoldersQuery } from "../query/folders";
import { useBookmarksFilter, BookmarksFilter } from "./bookmarks-filter";

import {
  UseSelectedFolders,
  useSelectedFolders,
} from "../hook/selected-folders";

type Context = {
  // authentication: Authentication;
  bookmarksFilter: BookmarksFilter;
  categoriesResponse: UseCategoriesResponse;
  foldersResponse: UseFoldersResponse;
  selectedFolders: UseSelectedFolders;
};

const useContext = (): Context => {
  // const authentication = useAuthentication();
  const categoriesResponse = useCategoriesQuery();
  const bookmarksFilter = useBookmarksFilter(categoriesResponse);
  const foldersResponse = useFoldersQuery();
  const selectedFolders = useSelectedFolders(foldersResponse);

  return {
    // authentication,
    bookmarksFilter,
    categoriesResponse,
    foldersResponse,
    selectedFolders,
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
