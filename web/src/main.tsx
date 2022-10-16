import "./index.css";
import * as page from "./component/page";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "./hook/auth-context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { GlobalContextProvider } from "./hook/global-context";
import { Navigation } from "./component/navigation";
import { PrivateRoutes } from "./component/private-routes";
import { authConfig } from "./urql";
import { authExchange } from "@urql/exchange-auth";
import { useEffect } from "react";

import {
  Provider as UrqlProvider,
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from "urql";

const urql = createClient({
  url: import.meta.env.VITE_API_URL + "/graphql",
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange(authConfig),
    fetchExchange,
  ],
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <UrqlProvider value={urql}>
    <ChakraProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ChakraProvider>
  </UrqlProvider>
  // </React.StrictMode>
);

function App() {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode("dark");
  }, []);

  return (
    <div className="m-1">
      <BrowserRouter>
        <Routes>
          {/*
           * private routes
           */}
          <Route
            path="/"
            element={
              <GlobalContextProvider>
                <Navigation />
                <PrivateRoutes />
              </GlobalContextProvider>
            }
          >
            <Route
              path="/bookmark/:bookmarkId"
              element={<page.BookmarkDetails />}
            />
            <Route path="/bookmark/new" element={<page.BookmarkNew />} />
            <Route path="/categories" element={<page.Categories />} />
            <Route
              path="/category/:categoryId"
              element={<page.CategoryDetails />}
            />
            <Route path="/category/new" element={<page.CategoryNew />} />
            <Route path="/folders" element={<page.Folders />} />
            <Route path="/folder/:folderId" element={<page.FolderDetails />} />
            <Route path="/folder/new" element={<page.FolderNew />} />
            <Route path="/home" element={<page.Home />} />
            <Route path="/" element={<Navigate replace to="/home" />} />

            {import.meta.env.VITE_STAGE === "dev" && (
              <Route path="/dev" element={<page.Dev />} />
            )}
            {import.meta.env.VITE_STAGE === "dev" && (
              <Route path="/dev2" element={<page.Dev2 />} />
            )}
          </Route>

          {/*
           * public routes
           */}
          <Route path="/auth" element={<page.Auth />} />
          <Route path="/landing" element={<page.Landing />} />
          <Route path="*" element={<div>404</div>} />
          {/* <Route path="/error" element={<page.Error />} /> */}
          {/* <Route path="*" element={<Navigate replace to="/landing" />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
