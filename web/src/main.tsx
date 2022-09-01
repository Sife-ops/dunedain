import ReactDOM from "react-dom/client";
import { Auth } from "@aws-amplify/auth";
import { Bookmark } from "../../graphql/genql/schema";
import { BookmarkDetails } from "./pages/bookmark-details";
import { BookmarkNew } from "./pages/bookmark-new";
import { Home } from "./pages/home";
import { Landing } from "./pages/landing";
import { Provider as UrqlProvider, createClient, defaultExchanges } from "urql";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";
import { useBookmarksQuery } from "./query/bookmarks";
import { useCategories, Categories } from "./component/categories";
import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

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
    <App />
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookmark/new" element={<BookmarkNew />} />
          <Route path="/bookmark/:bookmarkId" element={<BookmarkDetails />} />
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
