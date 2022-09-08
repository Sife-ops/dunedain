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

  const [input, setInput] = React.useState("");

  return (
    <div>
      <div>{globalContext.ree}</div>
      <input onChange={(e) => setInput(e.target.value)} value={input} />
      <br />
      <button onClick={() => globalContext.setRee(input)}>set</button>
      <br />
      <button onClick={() => console.log(globalContext.ree)}>print</button>
    </div>
  );
};
