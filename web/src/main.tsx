import "./index.css";
import ReactDOM from "react-dom/client";
import { Auth } from "@aws-amplify/auth";
import { BookmarkDetails } from "./component/page/bookmark-details";
import { BookmarkNew } from "./component/page/bookmark-new";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Categories } from "./component/page/categories";
import { CategoryDetails } from "./component/page/category-details";
import { CategoryNew } from "./component/page/category-new";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { Dev } from "./component/page/dev";
import { Error } from "./component/page/error";
import { FolderNew } from "./component/page/folder-new";
import { Folders } from "./component/page/folders";
import { GlobalContextProvider } from "./hook/global-context";
import { Home } from "./component/page/home";
import { Navigation } from "./component/navigation";
import { SelectiveRoutes } from "./component/selective-routes";
import { SignIn } from "./component/page/sign-in";
import { SignUp } from "./component/page/sign-up";
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

Auth.configure({
  Auth: {
    identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
    region: import.meta.env.VITE_REGION,
    userPoolId: import.meta.env.VITE_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
    // mandatorySignIn: false,
    // clientMetadata: { app: "cognito-vue-bootstrap" },
  },
});

const urql = createClient({
  url: import.meta.env.VITE_GRAPHQL_URL,
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
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
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
        <Navigation />
        <Routes>
          <Route element={<SelectiveRoutes isPrivate />}>
            <Route path="/bookmark/:bookmarkId" element={<BookmarkDetails />} />
            <Route path="/bookmark/new" element={<BookmarkNew />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:categoryId" element={<CategoryDetails />} />
            <Route path="/category/new" element={<CategoryNew />} />
            <Route path="/error" element={<Error />} />
            <Route path="/folders" element={<Folders />} />
            <Route path="/folder/new" element={<FolderNew />} />
            <Route path="/home" element={<Home />} />
            {import.meta.env.VITE_STAGE === "dev" && (
              <Route path="/dev" element={<Dev />} />
            )}
          </Route>
          <Route element={<SelectiveRoutes />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
          <Route path="*" element={<Navigate replace to="/sign-in" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
