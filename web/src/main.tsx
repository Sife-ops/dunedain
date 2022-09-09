import "./index.css";
import ReactDOM from "react-dom/client";
import { Auth } from "@aws-amplify/auth";
import { BookmarkDetails } from "./pages/bookmark-details";
import { BookmarkNew } from "./pages/bookmark-new";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Categories } from "./pages/categories";
import { CategoryDetails } from "./pages/category-details";
import { CategoryNew } from "./pages/category-new";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { Dev } from "./pages/dev";
import { Error } from "./pages/error";
import { Home } from "./pages/home";
import { Navigation } from "./component/navigation";
import { SelectiveRoutes } from "./component/selective-routes";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";
import { authConfig } from "./urql";
import { authExchange } from "@urql/exchange-auth";
import { useAuthentication } from "./hook/authentication";
import { useEffect } from "react";
import { GlobalContextProvider } from "./hook/global-context";

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
  const auth = useAuthentication();
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode("dark");
  }, []);

  return (
    <div className="m-1">
      <BrowserRouter>
        <Navigation auth={auth} />
        <Routes>
          <Route element={<SelectiveRoutes isPrivate auth={auth} />}>
            <Route path="/home" element={<Home />} />
            {/* <Route path="/bookmark/new" element={<BookmarkNew />} />
            <Route path="/bookmark/:bookmarkId" element={<BookmarkDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/new" element={<CategoryNew />} />
            <Route path="/category/:categoryId" element={<CategoryDetails />} />
            <Route path="/error" element={<Error />} /> */}
            <Route path="/dev" element={<Dev />} />
          </Route>
          <Route element={<SelectiveRoutes auth={auth} />}>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn auth={auth} />} />
          </Route>
          <Route path="*" element={<Navigate replace to="/sign-in" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
