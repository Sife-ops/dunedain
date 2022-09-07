import React from "react";
import { Authentication } from "../hook/authentication";
import { Outlet, Navigate } from "react-router-dom";

// todo: has warning
export const SelectiveRoutes: React.FC<{
  auth: Authentication;
  isPrivate?: boolean;
}> = (props) => {
  if (props.isPrivate) {
    return props.auth.sync() ? <Outlet /> : <Navigate to="/sign-in" />;
  } else {
    return !props.auth.sync() ? <Outlet /> : <Navigate to="/home" />;
  }
};
