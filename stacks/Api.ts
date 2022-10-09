import {
  Api as ApiGateway,
  Config,
  Function,
  StackContext,
  use,
} from "@serverless-stack/resources";

import { Automation } from "./Automation";
import { Database } from "./Database";

export function Api({ stack }: StackContext) {
  const automation = use(Automation);
  const db = use(Database);

  const secretAccessToken = new Config.Secret(stack, "SECRET_ACCESS_TOKEN");

  const routes = new ApiGateway(stack, "api", {
    authorizers: {
      lambda: {
        type: "lambda",
        responseTypes: ["simple"],
        function: new Function(stack, "authorizer", {
          handler: "functions/authentication/authorizer.handler",
          config: [secretAccessToken],
        }),
      },
    },
    defaults: {
      authorizer: "none",
    },
    routes: {
      "POST /graphql": {
        type: "pothos",
        authorizer: "lambda",
        function: {
          handler: "functions/graphql/graphql.handler",
          config: [db.tableName, automation.faviconSqsUrl],
          permissions: [db.table, automation.faviconSqs],
        },
        schema: "services/functions/graphql/schema.ts",
        output: "graphql/schema.graphql",
        commands: [
          "npx genql --output ./graphql/genql --schema ./graphql/schema.graphql --esm",
        ],
      },
      // todo: rename path to 'functions/rest/...'
      "POST /refresh": {
        function: {
          handler: "functions/authentication/refresh.handler",
          config: [secretAccessToken],
        },
      },
      "POST /sign-in": {
        function: {
          handler: "functions/authentication/sign-in.handler",
          config: [secretAccessToken, db.tableName],
          permissions: [db.table],
        },
      },
      "POST /confirm": {
        function: {
          handler: "functions/authentication/confirm.handler",
          config: [secretAccessToken, db.tableName],
          permissions: [db.table],
        },
      },
    },
  });

  new Config.Parameter(stack, "API_URL", {
    value: routes.url,
  });

  stack.addOutputs({
    API_URL_OUTPUT: routes.url,
  });

  return {
    routes,
    secretAccessToken,
  };
}
