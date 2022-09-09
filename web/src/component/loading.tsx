import React from "react";
import { Navigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { UseMutationState, UseQueryState } from "urql";

// todo: spinner centered in window
export const Loading: React.FC<{
  // operationState: UseMutationState | UseQueryState;
  data?: any;
  children: JSX.Element;
}> = (props) => {
  // const { error } = props.operationState;

  const [data, setData] = React.useState(props.data);

  React.useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);

  // todo: center spinner
  if (!data) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  // if (error) {
  //   return <Navigate replace to="/error" />;
  // }

  return props.children;
};
