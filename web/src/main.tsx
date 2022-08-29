import ReactDOM from "react-dom/client";
import { Auth } from "@aws-amplify/auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dev } from "./pages/dev";
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
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, []);

  return (
    <BrowserRouter>
      {signedIn ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dev" element={<Dev />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
