import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryParam } from "../../hook/query-param";
import { useAuthContext } from "../../hook/auth-context";

export const Auth: React.FC = () => {
  const [accessToken, refreshToken] = useQueryParam([
    "accessToken",
    "refreshToken",
  ]);

  const authContext = useAuthContext();
  const nav = useNavigate();

  useEffect(() => {
    // setTimeout(() => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    // p.setSignedIn(true);
    authContext.setSignedIn(true);
    nav("/");
    // window.location.reload();
    // }, 3000);
  }, []);

  return (
    <div>
      loading...
      {/* <div>{accessToken}</div>
      <div>{refreshToken}</div> */}
    </div>
  );
};
