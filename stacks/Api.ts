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

  const api = new ApiGateway(stack, "api", {
    authorizers: {
      lambda: {
        type: "lambda",
        responseTypes: ["simple"],
        function: new Function(stack, "authorizer", {
          handler: "functions/auth/auth.handler",
          config: [secretAccessToken],
        }),
      },
    },
    defaults: {
      authorizer: "none",
      function: {
        // todo: move default permissions
        permissions: [db.table, automation.fetchFaviconSqs],
        config: [db.tableName, automation.FAVICON_SQS],
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
      // todo: rename path to 'functions/rest/...'
      "POST /refresh": {
        function: {
          handler: "functions/auth/refresh.handler",
          config: [secretAccessToken],
        },
      },
      "POST /sign-in": {
        function: {
          handler: "functions/auth/sign-in.handler",
          config: [secretAccessToken],
        },
      },
      "POST /sign-up": {
        function: {
          handler: "functions/auth/sign-up.handler",
          config: [
            new Config.Secret(stack, "EMAILJS_SERVICE_ID"),
            new Config.Secret(stack, "EMAILJS_TEMPLATE_ID"), // todo: remove from secrets
            new Config.Secret(stack, "EMAILJS_USER_ID"),
            // new Config.Secret(stack, "EMAILJS_ACCESSTOKEN"),
          ],
        },
      },
    },
  });

  new Config.Parameter(stack, "API_URL", {
    value: api.url,
  });

  stack.addOutputs({
    API_URL_OUTPUT: api.url,
  });

  return api;
}
