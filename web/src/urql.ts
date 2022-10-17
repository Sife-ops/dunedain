import axios from "axios";
import jwt_decode from "jwt-decode";
import { AuthConfig } from "@urql/exchange-auth";
import { useEffect, useState } from "react";

import {
  OperationContext,
  RequestPolicy,
  useQuery,
  useMutation,
  makeOperation,
} from "urql";

import {
  generateQueryOp,
  generateMutationOp,
  QueryRequest,
  QueryResult,
  MutationRequest,
  MutationResult,
} from "@dunedain/graphql/genql";

export function useTypedQuery<Query extends QueryRequest>(opts: {
  query: Query;
  requestPolicy?: RequestPolicy;
  context?: Partial<OperationContext>;
  pause?: boolean;
}) {
  const { query, variables } = generateQueryOp(opts.query);
  return useQuery<QueryResult<Query>>({
    ...opts,
    query,
    variables,
  });
}

export function useTypedMutation<
  Variables extends Record<string, any>,
  Mutation extends MutationRequest
>(builder: (vars: Variables) => Mutation) {
  const [mutation, setMutation] = useState<string>();
  const [variables, setVariables] = useState<any>();
  const [result, execute] = useMutation<MutationResult<Mutation>, Variables>(
    mutation as any
  );

  function executeWrapper(vars: Variables) {
    const mut = builder(vars);
    const { query, variables } = generateMutationOp(mut);
    setMutation(query);
    setVariables(variables);
  }

  useEffect(() => {
    if (!mutation) return;
    execute(variables).then(() => setMutation(undefined));
  }, [mutation]);

  return [result, executeWrapper] as const;
}

export const authConfig: AuthConfig<{ accessToken: string }> = {
  willAuthError: ({ authState }) => {
    if (!authState) return true;

    const decoded = jwt_decode<{ exp: number }>(authState.accessToken);
    const now = Date.now() / 1000;
    const secsRemaining = decoded.exp - now;
    console.log(`session time remaining: ${secsRemaining} seconds`);
    if (secsRemaining < 10) return true;

    return false;
  },

  getAuth: async ({ authState }) => {
    if (!authState) {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) return { accessToken };
      return null;
    }

    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/refresh", {
        refreshToken,
      });
      const { success, accessToken } = res.data;
      if (success) {
        localStorage.setItem("accessToken", accessToken);
        return { accessToken };
      }
    }

    localStorage.clear();
    window.location.reload();
    return null;
  },

  addAuthToOperation: ({ authState, operation }: any) => {
    if (!authState || !authState.accessToken) {
      return operation;
    }

    const fetchOptions =
      typeof operation.context.fetchOptions === "function"
        ? operation.context.fetchOptions()
        : operation.context.fetchOptions || {};

    return makeOperation(operation.kind, operation, {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: authState.accessToken,
        },
      },
    });
  },

  didAuthError: ({ error }) => {
    return error.response.status === 401;
  },
};
