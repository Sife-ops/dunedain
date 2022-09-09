import React from "react";
import { useCategoriesQuery, UseCategoriesResponse } from "../query/categories";

type Context = {
  categoriesResponse: UseCategoriesResponse;
};

const useContext = (): Context => {
  const categoriesResponse = useCategoriesQuery();

  return {
    categoriesResponse,
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
