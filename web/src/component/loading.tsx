import React from "react";
import { Navigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { UseMutationState, UseQueryState } from "urql";

export const Loading: React.FC<{
  operationState: UseMutationState | UseQueryState;
  children: JSX.Element;
}> = (props) => {
  const { fetching, error } = props.operationState;

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
