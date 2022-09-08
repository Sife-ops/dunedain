import React from "react";
import { Authentication, useAuthentication } from "../hook/authentication";
import { Outlet, Navigate } from "react-router-dom";

export const SelectiveRoutes: React.FC<{
  auth: Authentication;
  isPrivate?: boolean;
}> = (props) => {
  const auth = useAuthentication();

  if (props.isPrivate) {
    return auth.signedIn ? <Outlet /> : <Navigate to="/sign-in" />;
  } else {
    return !auth.signedIn ? <Outlet /> : <Navigate to="/home" />;
  }
};
