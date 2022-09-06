import React from "react";
import { Navigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { UseQueryResponse } from "urql";

export const Loading: React.FC<{
  useQueryResponse: UseQueryResponse;
  children: JSX.Element;
}> = (props) => {
  const [{ fetching, error }] = props.useQueryResponse;

  if (fetching) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <Navigate replace to="/error" />;
  }

  return props.children;
};
