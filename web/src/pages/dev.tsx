import React from "react";

import {
  GlobalContextProvider,
  useGlobalContext,
} from "../hook/global-context";

export const Dev = () => {
  return (
    <GlobalContextProvider>
      <Dev2></Dev2>
    </GlobalContextProvider>
  );
};

const Dev2 = () => {
  const globalContext = useGlobalContext();

  React.useEffect(() => {
    console.log(globalContext.categoriesResponse);
  }, []);

  return (
    <div>
      <div>a</div>
    </div>
  );
};
