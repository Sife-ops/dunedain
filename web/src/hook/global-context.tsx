import * as React from "react";

const GlobalContext = React.createContext<
  | {
      ree: string;
      setRee: React.Dispatch<React.SetStateAction<string>>;
    }
  | undefined
>(undefined);

export const GlobalContextProvider = (props: { children: React.ReactNode }) => {
  const [ree, setRee] = React.useState<string>("ree");

  return (
    <GlobalContext.Provider value={{ ree, setRee }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};
