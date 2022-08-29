// import "./index.css";
// import React from "react";
// import { List } from "./pages/Article";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dev } from "./pages/dev";
import { Provider as UrqlProvider, createClient, defaultExchanges } from "urql";

const urql = createClient({
  url: import.meta.env.VITE_GRAPHQL_URL,
  exchanges: defaultExchanges,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <UrqlProvider value={urql}>
    <App />
  </UrqlProvider>
  // </React.StrictMode>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dev />} />
        {/* <Route path="/" element={<Navigate to="/articles" />} />
        <Route path="articles" element={<List />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
