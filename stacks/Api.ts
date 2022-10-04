import {
  Api as ApiGateway,
  Config,
  Function,
  StackContext,
  use,
} from "@serverless-stack/resources";

// import { Auth } from "./Auth";
import { Automation } from "./Automation";
import { Database } from "./Database";

export function Api({ stack }: StackContext) {
  // const auth = use(Auth);
  const automation = use(Automation);
  const db = use(Database);

  const api = new ApiGateway(stack, "api", {
    authorizers: {
      // jwt: {
      //   type: "user_pool",
      //   userPool: {
      //     id: auth.userPoolId,
      //     clientIds: [auth.userPoolClientId],
      //   },
      // },
      lambda: {
        type: "lambda",
        responseTypes: ["simple"],
        function: new Function(stack, "authorizer", {
          handler: "functions/auth/auth.handler",
        }),
      },
    },
    defaults: {
      // authorizer: "jwt",
      authorizer: "none",
      function: {
        permissions: [db.table, automation.fetchFaviconSqs],
        config: [db.TABLE_NAME, automation.FAVICON_SQS],
      },
    },
    routes: {
      "POST /graphql": {
        type: "pothos",
        authorizer: "lambda",
        function: {
          handler: "functions/graphql/graphql.handler",
        },
        schema: "services/functions/graphql/schema.ts",
        output: "graphql/schema.graphql",
        commands: [
          "npx genql --output ./graphql/genql --schema ./graphql/schema.graphql --esm",
        ],
      },
      "POST /sign-in": {
        function: "functions/auth/sign-in.handler",
      },
      "POST /sign-up": {
        function: "functions/auth/sign-up.handler",
      },
      "POST /refresh": {
        function: "functions/auth/refresh.handler",
      },
    },
  });

  // auth.attachPermissionsForAuthUsers(stack, [api]);

  new Config.Parameter(stack, "API_URL", {
    value: api.url,
  });

  stack.addOutputs({
    API_URL_OUTPUT: api.url,
  });

  return api;
}
