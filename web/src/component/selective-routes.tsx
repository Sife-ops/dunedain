import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthentication, Authentication } from "../hook/authentication";

export const SelectiveRoutes: React.FC<{
  auth: Authentication;
  isPrivate?: boolean;
}> = (props) => {
  //   const auth = useAuthentication();
  if (props.isPrivate) {
    return props.auth.sync() ? <Outlet /> : <Navigate to="/sign-in" />;
  } else {
    return !props.auth.sync() ? <Outlet /> : <Navigate to="/home" />;
  }
};
