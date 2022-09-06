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
import { Error } from "./pages/error";
import { Home } from "./pages/home";
import { Landing } from "./pages/landing";
import { Navigation } from "./component/navigation";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";
import { authConfig } from "./urql";
import { authExchange } from "@urql/exchange-auth";
import { useEffect, useState } from "react";

import {
  Provider as UrqlProvider,
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  makeOperation,
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

// todo: authExchange
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
      <App />
    </ChakraProvider>
  </UrqlProvider>
  // </React.StrictMode>
);

// todo: state change breaks routes
function App() {
  const [signedIn, setSignedIn] = useState(true);

  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode("dark");

    const token = localStorage.getItem("accessToken");
    if (token) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, []);

  return (
    <div className="m-1">
      <BrowserRouter>
        {signedIn ? (
          <>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bookmark/new" element={<BookmarkNew />} />
              <Route
                path="/bookmark/:bookmarkId"
                element={<BookmarkDetails />}
              />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/new" element={<CategoryNew />} />
              <Route
                path="/category/:categoryId"
                element={<CategoryDetails />}
              />
              <Route path="/error" element={<Error />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}
