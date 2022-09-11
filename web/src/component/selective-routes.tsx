import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useGlobalContext } from "../hook/global-context";

export const SelectiveRoutes: React.FC<{ isPrivate?: boolean }> = (props) => {
  const { authentication } = useGlobalContext();

  if (props.isPrivate) {
    return authentication.signedIn ? <Outlet /> : <Navigate to="/sign-in" />;
  } else {
    return !authentication.signedIn ? <Outlet /> : <Navigate to="/home" />;
  }
};
