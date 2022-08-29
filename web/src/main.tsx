// import "./index.css";
// import React from "react";
// import { List } from "./pages/Article";
import ReactDOM from "react-dom/client";
import { Auth } from "@aws-amplify/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dev } from "./pages/dev";
import { Provider as UrqlProvider, createClient, defaultExchanges } from "urql";
import { getAccessToken } from "./token";

Auth.configure({
  Auth: {
    // identityPoolId: process.env.IDENTITY_POOL_ID,
    identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
    // region: process.env.AWS_REGION,
    region: import.meta.env.VITE_REGION,
    // userPoolId: process.env.USER_POOL_ID,
    userPoolId: import.meta.env.VITE_USER_POOL_ID,
    // userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID,
    userPoolWebClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,

    // mandatorySignIn: false,
    // clientMetadata: { app: "cognito-vue-bootstrap" },
  },
});

const urql = createClient({
  url: import.meta.env.VITE_GRAPHQL_URL,
  exchanges: defaultExchanges,
  fetchOptions: () => {
    const token = getAccessToken();
    return {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
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
