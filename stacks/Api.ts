import {
  Api as ApiGateway,
  Config,
  Function,
  StackContext,
  use,
} from "@serverless-stack/resources";

import { Automation } from "./Automation";
import { Database } from "./Database";

export function Api({ stack, app }: StackContext) {
  const automation = use(Automation);
  const db = use(Database);

  const mandosUrl = new Config.Secret(stack, "MANDOS_URL");

  const routes = new ApiGateway(stack, "api", {
    authorizers: {
      lambda: {
        type: "lambda",
        responseTypes: ["simple"],
        function: new Function(stack, "authorizer", {
          handler: "functions/graphql/authorizer.handler",
          environment: {
            STAGE: app.stage,
          },
          config: [mandosUrl],
        }),
      },
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
      "POST /refresh": {
        function: {
          handler: "functions/rest/refresh.handler",
          environment: {
            STAGE: app.stage,
          },
          config: [mandosUrl],
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
  };
}
