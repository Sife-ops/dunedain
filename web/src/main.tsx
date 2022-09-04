import ReactDOM from "react-dom/client";
import { Auth } from "@aws-amplify/auth";
import { BookmarkDetails } from "./pages/bookmark-details";
import { BookmarkNew } from "./pages/bookmark-new";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { Categories } from "./pages/categories";
import { CategoryDetails } from "./pages/category-details";
import { CategoryNew } from "./pages/category-new";
import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./pages/home";
import { Landing } from "./pages/landing";
import { Provider as UrqlProvider, createClient, defaultExchanges } from "urql";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";
import { useEffect, useState } from "react";

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
  exchanges: defaultExchanges,
  fetchOptions: () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      return {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
    } else {
      return {};
    }
  },
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

function App() {
  // todo: state change breaks routes
  const [signedIn, setSignedIn] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, []);

  if (signedIn) {
    return (
      <BrowserRouter>
        <nav
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              window.location.reload();
            }}
          >
            Sign Out
          </button>
        </nav>
        <br />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookmark/new" element={<BookmarkNew />} />
          <Route path="/bookmark/:bookmarkId" element={<BookmarkDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/new" element={<CategoryNew />} />
          <Route path="/category/:categoryId" element={<CategoryDetails />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
